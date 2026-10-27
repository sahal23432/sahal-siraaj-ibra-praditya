import { NextRequest, NextResponse } from 'next/server';
import { contactSchema } from '@/lib/validations/contact';
import { submitContactMessage } from '@/lib/services/contact';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Honeypot spam defense
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
    const saved = await submitContactMessage({
      sender_name,
      sender_email,
      subject: subject || null,
      message,
    });

    // Optional email dispatch with Resend
    if (process.env.RESEND_API_KEY) {
      try {
        const { Resend } = await import('resend');
        const resend = new Resend(process.env.RESEND_API_KEY);
        await resend.emails.send({
          from: 'Portofolio Sahal <onboarding@resend.dev>',
          to: process.env.CONTACT_RECEIVER_EMAIL || 'sahalsiraaj44@gmail.com',
          subject: `Pesan Portofolio: ${subject || 'Kontak Baru'} — ${sender_name}`,
          text: `Dari: ${sender_name} (${sender_email})\nSubjek: ${subject || '-'}\n\nPesan:\n${message}`,
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
