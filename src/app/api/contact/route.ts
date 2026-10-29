import { NextRequest, NextResponse } from 'next/server';
import { contactSchema } from '@/lib/validations/contact';
import { submitContactMessage } from '@/lib/services/contact';

// Rate limiting map: max 5 messages per 10 minutes per IP
const contactRateLimits = new Map<string, { count: number; firstAt: number }>();

function sanitize(str: string): string {
  return str.replace(/<[^>]*>?/gm, '').trim();
}

export async function POST(req: NextRequest) {
  try {
    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
      req.headers.get('x-real-ip') ||
      '127.0.0.1';

    const now = Date.now();
    const rate = contactRateLimits.get(ip);

    if (rate) {
      if (now - rate.firstAt < 10 * 60 * 1000) {
        if (rate.count >= 5) {
          return NextResponse.json(
            { error: { message: 'Terlalu banyak pengiriman pesan. Silakan coba kembali dalam 10 menit.' } },
            { status: 429 }
          );
        }
        rate.count += 1;
      } else {
        contactRateLimits.set(ip, { count: 1, firstAt: now });
      }
    } else {
      contactRateLimits.set(ip, { count: 1, firstAt: now });
    }

    const body = await req.json();

    // Honeypot spam defense (silent reject)
    if (body.honeypot) {
      return NextResponse.json({ success: true, message: 'Diterima' });
    }

    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { sender_name, sender_email, subject, message } = parsed.data;

    // XSS Sanitization
    const cleanName = sanitize(sender_name);
    const cleanSubject = subject ? sanitize(subject) : null;
    const cleanMessage = sanitize(message);

    const saved = await submitContactMessage({
      sender_name: cleanName,
      sender_email: sender_email.toLowerCase().trim(),
      subject: cleanSubject,
      message: cleanMessage,
    });

    // Optional email dispatch with Resend
    if (process.env.RESEND_API_KEY) {
      try {
        const { Resend } = await import('resend');
        const resend = new Resend(process.env.RESEND_API_KEY);
        await resend.emails.send({
          from: 'Portofolio Sahal <onboarding@resend.dev>',
          to: process.env.CONTACT_RECEIVER_EMAIL || 'sahalsiraaj44@gmail.com',
          subject: `Pesan Portofolio: ${cleanSubject || 'Kontak Baru'} — ${cleanName}`,
          text: `Dari: ${cleanName} (${sender_email})\nSubjek: ${cleanSubject || '-'}\n\nPesan:\n${cleanMessage}`,
        });
      } catch (emailErr) {
        console.warn('[Resend] Pengiriman email opsional dilewati:', emailErr);
      }
    }

    return NextResponse.json({ success: true, id: saved.id });
  } catch (err) {
    console.error('[Contact API] Error:', err);
    return NextResponse.json({ error: 'Terjadi kesalahan sistem.' }, { status: 500 });
  }
}
