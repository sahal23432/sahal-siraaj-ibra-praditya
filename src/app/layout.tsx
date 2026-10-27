import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { PerformanceProvider } from '@/lib/hooks/usePerformanceMode';

const geistSans = Geist({
  variable: '--font-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Sahal Siraaj Ibra Praditya · Portofolio 3D & Sistem Terintegrasi',
  description:
    'Siswa PPLG SMK Negeri 9 Semarang. Perancang Console Box RFID & Pengembang Web (skanilan.tech). Menghubungkan perangkat keras fisik dengan antarmuka web modern.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  openGraph: {
    title: 'Sahal Siraaj Ibra Praditya · Portofolio 3D & Sistem Terintegrasi',
    description:
      'Portofolio 3D Interaktif & Telemetry System Sahal Siraaj Ibra Praditya (SMKN 9 Semarang).',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${geistSans.variable} ${geistMono.variable} scroll-smooth`}>
      <body className="bg-[#070709] text-[#F4F4F6] min-h-screen antialiased selection:bg-white/15">
        <PerformanceProvider>{children}</PerformanceProvider>
      </body>
    </html>
  );
}
