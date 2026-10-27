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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://portofolio-sahal.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Sahal Siraaj Ibra Praditya · Portofolio 3D & Web Developer',
    template: '%s · Sahal Siraaj Ibra Praditya',
  },
  description:
    'Portofolio resmi Sahal Siraaj Ibra Praditya, siswa PPLG SMK Negeri 9 Semarang. Perancang Console Box RFID presensi dan Web Developer skanilan.tech. Berfokus pada Next.js, Three.js 3D interaktif, dan integrasi hardware.',
  keywords: [
    'Sahal Siraaj',
    'Sahal Siraaj Ibra Praditya',
    'Sahal Siraaj Semarang',
    'Portofolio Sahal Siraaj',
    'SMK Negeri 9 Semarang',
    'SMKN 9 Semarang PPLG',
    'Console Box RFID',
    'skanilan.tech',
    'Web Developer Semarang',
    'Frontend Developer Next.js',
    'Three.js Portfolio',
    'Web 3D Interaktif',
    'Siswa PPLG SMKN 9 Semarang',
  ],
  authors: [{ name: 'Sahal Siraaj Ibra Praditya', url: siteUrl }],
  creator: 'Sahal Siraaj Ibra Praditya',
  publisher: 'Sahal Siraaj Ibra Praditya',
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: 'Sahal Siraaj Ibra Praditya · Portofolio 3D & Web Developer',
    description:
      'Portofolio resmi Sahal Siraaj Ibra Praditya (SMKN 9 Semarang). Menghubungkan perangkat keras fisik RFID dengan antarmuka web modern 3D.',
    url: siteUrl,
    siteName: 'Sahal Siraaj Ibra Praditya Portfolio',
    locale: 'id_ID',
    type: 'profile',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Sahal Siraaj Ibra Praditya — Portofolio 3D Interaktif',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sahal Siraaj Ibra Praditya · Portofolio 3D & Web Developer',
    description:
      'Portofolio resmi Sahal Siraaj Ibra Praditya (SMKN 9 Semarang). Perancang Console Box RFID & Web Developer skanilan.tech.',
    images: ['/opengraph-image'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: 'technology',
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  dateCreated: '2026-10-27T00:00:00+07:00',
  mainEntity: {
    '@type': 'Person',
    name: 'Sahal Siraaj Ibra Praditya',
    alternateName: 'Sahal Siraaj',
    jobTitle: 'Web Developer & IoT Engineer',
    description:
      'Siswa jurusan Pengembangan Perangkat Lunak dan Gim (PPLG) di SMK Negeri 9 Semarang. Perancang Console Box RFID presensi dan kontributor skanilan.tech.',
    image: `${siteUrl}/images/sahal-avatar.jpg`,
    url: siteUrl,
    email: 'sahalsiraaj44@gmail.com',
    telephone: '+62-856-4044-4923',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Semarang',
      addressRegion: 'Jawa Tengah',
      addressCountry: 'ID',
    },
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: 'SMK Negeri 9 Semarang',
    },
    knowsAbout: [
      'Web Development',
      'Next.js 15',
      'React',
      'TypeScript',
      'Three.js',
      'Tailwind CSS',
      'Supabase',
      'Console Box RFID',
      'Hardware-Web Integration',
    ],
    sameAs: [
      'https://github.com/sahal23432',
      'https://skanilan.tech',
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${geistSans.variable} ${geistMono.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-[#070709] text-[#F4F4F6] min-h-screen antialiased selection:bg-white/15">
        <PerformanceProvider>{children}</PerformanceProvider>
      </body>
    </html>
  );
}
