import { z } from 'zod';

export const contactSchema = z.object({
  sender_name: z.string().min(2, 'Nama minimal 2 karakter').max(100),
  sender_email: z.string().email('Format email tidak valid'),
  subject: z.string().min(3, 'Subjek minimal 3 karakter').max(200).optional(),
  message: z.string().min(10, 'Pesan minimal 10 karakter').max(2000),
  honeypot: z.string().max(0, 'Bot terdeteksi').optional(),
});

export type ContactFormData = z.infer<typeof contactSchema>;
