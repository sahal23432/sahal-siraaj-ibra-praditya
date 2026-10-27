import { z } from 'zod';

export const loginSchema = z.object({
  password: z.string().min(1, 'Kata sandi wajib diisi'),
});

export const projectSchema = z.object({
  title: z.string().min(3, 'Judul minimal 3 karakter'),
  summary: z.string().min(10),
  category: z.string().min(1),
  status_badge: z.string().min(1),
  slug: z.string().min(3).regex(/^[a-z0-9-]+$/, 'Hanya huruf kecil, angka, dan tanda hubung'),
  role: z.string().min(3),
  tools: z.string().transform((val) => val.split(',').map((t) => t.trim()).filter(Boolean)),
  live_url: z.string().url().optional().or(z.literal('')),
  repo_url: z.string().url().optional().or(z.literal('')),
  is_featured: z.boolean().default(false),
  published: z.boolean().default(true),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type ProjectFormData = z.infer<typeof projectSchema>;
