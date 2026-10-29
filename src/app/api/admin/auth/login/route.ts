import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminPin } from '@/lib/services/auth';
import {
  createSessionToken,
  checkRateLimit,
  recordFailedAttempt,
  resetRateLimit,
} from '@/lib/auth/security';

export async function POST(req: NextRequest) {
  try {
    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
      req.headers.get('x-real-ip') ||
      '127.0.0.1';

    // 1. Rate Limiting Check
    const rateCheck = checkRateLimit(ip);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: `Akses ditolak sementara karena terlalu banyak percobaan salah. Coba lagi dalam ${rateCheck.lockoutSeconds} detik.`,
          isLocked: true,
          lockoutSeconds: rateCheck.lockoutSeconds,
        },
        { status: 429 }
      );
    }

    // 2. Parse & Validate Payload
    const body = await req.json().catch(() => ({}));
    const pin = typeof body.pin === 'string' ? body.pin.trim() : '';

    if (!pin) {
      return NextResponse.json(
        { success: false, error: 'PIN tidak boleh kosong.' },
        { status: 400 }
      );
    }

    // 3. Verify PIN
    const isValid = await verifyAdminPin(pin);
    if (!isValid) {
      const failed = recordFailedAttempt(ip);
      const message = failed.isLocked
        ? `PIN salah. Batas percobaan terlampaui. Akses dikunci selama ${Math.ceil(failed.lockoutSeconds / 60)} menit.`
        : `PIN tidak valid. Sisa percobaan: ${failed.remainingAttempts} kali.`;

      return NextResponse.json(
        {
          success: false,
          error: message,
          isLocked: failed.isLocked,
          remainingAttempts: failed.remainingAttempts,
          lockoutSeconds: failed.lockoutSeconds,
        },
        { status: 401 }
      );
    }

    // 4. Success: Reset rate limiter and generate signed session token
    resetRateLimit(ip);
    const sessionToken = await createSessionToken(7200); // 2 hours

    const response = NextResponse.json({
      success: true,
      message: 'Autentikasi berhasil. Sesi cockpit aktif.',
    });

    response.cookies.set('admin_session', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7200,
    });

    return response;
  } catch (err) {
    console.error('[Admin Auth API] Error:', err);
    return NextResponse.json(
      { success: false, error: 'Terjadi kesalahan sistem saat memproses login.' },
      { status: 500 }
    );
  }
}
