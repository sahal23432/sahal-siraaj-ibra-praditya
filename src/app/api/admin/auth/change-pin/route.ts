import { NextRequest, NextResponse } from 'next/server';
import { verifySessionToken } from '@/lib/auth/security';
import { changeAdminPin } from '@/lib/services/auth';

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get('admin_session')?.value;
    const isAuth = await verifySessionToken(token);

    if (!isAuth) {
      return NextResponse.json(
        { success: false, error: 'Akses ditolak. Sesi Anda tidak valid atau telah berakhir.' },
        { status: 401 }
      );
    }

    const body = await req.json().catch(() => ({}));
    const { oldPin, newPin } = body;

    if (!oldPin || !newPin) {
      return NextResponse.json(
        { success: false, error: 'PIN lama dan PIN baru wajib diisi.' },
        { status: 400 }
      );
    }

    const result = await changeAdminPin(String(oldPin), String(newPin));
    if (!result.success) {
      return NextResponse.json({ success: false, error: result.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, message: result.message });
  } catch (err) {
    console.error('[Change PIN API] Error:', err);
    return NextResponse.json({ success: false, error: 'Gagal mengubah PIN.' }, { status: 500 });
  }
}
