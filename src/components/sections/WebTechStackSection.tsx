'use client';

import { useState } from 'react';
import ScrollReveal from '@/components/ui/ScrollReveal';
import {
  Code2,
  Database,
  Cpu,
  Boxes,
} from 'lucide-react';

interface TechItem {
  name: string;
  category: string;
  role: string;
  badge: string;
  description: string;
}

export default function WebTechStackSection() {
  const [activeTab, setActiveTab] = useState<string>('semua');

  const techDomains: {
    id: string;
    label: string;
    icon: any;
    items: TechItem[];
  }[] = [
    {
      id: 'frontend',
      label: 'Front-End & Framework',
      icon: Code2,
      items: [
        {
          name: 'Next.js 16 (App Router)',
          category: 'Framework Utama',
          role: 'Server Components, Turbopack & Static Generation',
          badge: 'PRODUCTION READY',
          description:
            'Menyajikan halaman publik secara instan dengan waktu muat cepat, SEO ramah mesin pencari, dan mutasi data aman tanpa API terpisah.',
        },
        {
          name: 'React 19',
          category: 'UI Library',
          role: 'Komponen Deklaratif & Optimasi State',
          badge: 'CORE UI',
          description:
            'Menyusun antarmuka modular yang terisolasi, menangani pembaruan state reaktif, dan memastikan interaktivitas mulus di berbagai perangkat.',
        },
        {
          name: 'TypeScript',
          category: 'Bahasa Pemrograman',
          role: 'Type-Safety Ketat & Pencegahan Bug',
          badge: 'STRICT TYPING',
          description:
            'Memastikan seluruh aliran data dari database hingga komponen memiliki tipe data valid, mengeliminasi kesalahan runtime sejak tahap kompilasi.',
        },
        {
          name: 'Tailwind CSS v4',
          category: 'Styling Engine',
          role: 'Desain Responsif & Sistem Token Bento',
          badge: 'UTILITY FIRST',
          description:
            'Membangun sistem desain bertema High-End Obsidian Studio yang ringan, konsisten, dan fleksibel pada layar ponsel 375px hingga desktop lebar.',
        },
        {
          name: 'HTML5 Semantik & CSS3',
          category: 'Fondasi Web',
          role: 'Struktur Aksesibel & Tata Letak Presisi',
          badge: 'STANDAR WEB',
          description:
            'Menjamin kode HTML memenuhi standar aksesibilitas dan kemudahan navigasi bagi pembaca layar maupun mesin pencari.',
        },
      ],
    },
    {
      id: 'graphics3d',
      label: 'WebGL 3D & Gerak',
      icon: Boxes,
      items: [
        {
          name: 'Three.js',
          category: '3D WebGL Library',
          role: 'Render Grafis 3D di Peramban',
          badge: 'HARDWARE ACCELERATED',
          description:
            'Membangun adegan 3D prosedural, simulasi cincin sinyal RFID, dan kalkulasi matematika kamera yang merespons posisi kursor.',
        },
        {
          name: '@react-three/fiber & Drei',
          category: 'React 3D Bridge',
          role: 'Integrasi Kanvas 3D ke Komponen React',
          badge: 'DECLARATIVE 3D',
          description:
            'Menghubungkan siklus hidup 3D dengan state aplikasi, didukung Adaptive DPR untuk menghemat baterai perangkat seluler.',
        },
        {
          name: 'Framer Motion (motion/react)',
          category: 'Mesin Gerak & Easing',
          role: 'Animasi Scroll Reveal & Mikro-interaksi',
          badge: '60 FPS ANIMATION',
          description:
            'Menggerakkan elemen antarmuka secara halus dengan kurva easing natural dan otomatis menyesuaikan diri dengan prefers-reduced-motion.',
        },
        {
          name: 'Lenis Smooth Scroll',
          category: 'Engine Momentum Scroll',
          role: 'Inertial Smooth Scrolling & Anchor Alignment',
          badge: 'AWWWARDS STANDARD',
          description:
            'Memberikan pengalaman navigasi scroll vertikal yang ultra-mulus seperti website studio kelas dunia tanpa lagging.',
        },
      ],
    },
    {
      id: 'backend',
      label: 'Backend & Data',
      icon: Database,
      items: [
        {
          name: 'Supabase (PostgreSQL)',
          category: 'Database Relasional',
          role: 'Penyimpanan Proyek, Profil & Autentikasi',
          badge: 'MANAGED CLOUD',
          description:
            'Menyimpan skema relasional tabel karya, lini masa pengalaman, profil, serta otorisasi Row Level Security (RLS) untuk keamanan data.',
        },
        {
          name: 'Next.js Route Handlers',
          category: 'API Engine',
          role: 'Endpoint Kontak & Autentikasi Admin',
          badge: 'SERVER-SIDE',
          description:
            'Menangani pengiriman formulir kontak dengan proteksi honeypot anti-spam dan verifikasi PIN Cockpit Admin menggunakan session cookie aman.',
        },
        {
          name: 'Zod & React Hook Form',
          category: 'Validasi Skema',
          role: 'Verifikasi Data Klien & Server',
          badge: 'SCHEMA DRIVEN',
          description:
            'Mencegah masukan data yang tidak sesuai format dengan validasi deklaratif cepat pada formulir kontak dan form editor admin.',
        },
        {
          name: 'Resend API',
          category: 'Layanan Notifikasi',
          role: 'Pengiriman Notifikasi Email Instan',
          badge: 'TRANSACTIONAL EMAIL',
          description:
            'Mengirimkan pemberitahuan langsung ke email pemilik portofolio saat pengunjung mengirimkan pesan melalui formulir kontak.',
        },
      ],
    },
    {
      id: 'hardware',
      label: 'Integrasi Hardware & IoT',
      icon: Cpu,
      items: [
        {
          name: 'Mikrokontroler ESP32 / Arduino',
          category: 'Embedded Controller',
          role: 'Pemrosesan Sinyal Sensor & Jaringan WiFi',
          badge: 'EMBEDDED C/C++',
          description:
            'Membaca UID kartu RFID secara real-time dan mengirimkan data presensi melalui protokol HTTP/WebSocket ke server web.',
        },
        {
          name: 'Modul Sensor RFID RC522',
          category: 'Sensor Fisik',
          role: 'Deteksi Frekuensi 13.56 MHz',
          badge: 'CONTACTLESS HARDWARE',
          description:
            'Komponen fisik yang mendeteksi kartu identitas siswa dengan respon instan di bawah 300ms pada Console Box presensi.',
        },
        {
          name: 'LCD 16x2 I2C Display',
          category: 'Antarmuka Fisik',
          role: 'Umpan Balik Visual Langsung',
          badge: 'HARDWARE TELEMETRY',
          description:
            'Menampilkan status presensi siswa, nama, dan waktu verifikasi langsung pada perangkat fisik Console Box.',
        },
        {
          name: 'Integrasi Webhook Presensi',
          category: 'Protokol Jaringan',
          role: 'Sinkronisasi Hardware ke Web Database',
          badge: 'REALTIME SYNC',
          description:
            'Menghubungkan ketukan kartu fisik siswa di gerbang sekolah langsung ke basis data cloud skanilan.tech dalam hitungan detik.',
        },
      ],
    },
  ];

  const visibleDomains =
    activeTab === 'semua'
      ? techDomains
      : techDomains.filter((d) => d.id === activeTab);

  return (
    <section id="tech-stack" className="py-24 sm:py-32 bg-[#05070B] border-t border-white/[0.08] relative">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* Header with Monospace Telemetry */}
        <ScrollReveal>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14">
            <div>
              <div className="flex items-center gap-2 font-mono text-xs text-[#22D3EE] uppercase tracking-widest mb-3">
                <span className="font-bold">02.5</span>
                <span className="text-white/20">·</span>
                <span className="font-semibold">WEB ENGINEERING STACK</span>
              </div>
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-medium tracking-tight text-[#F8FAFC] leading-[1.04]">
                Teknologi Pembangun Sistem & Aplikasi Web
              </h2>
            </div>
            <div className="font-mono text-xs">
              <span className="px-3 py-1.5 rounded-full bg-[#090E17] border border-white/[0.08] text-[#22D3EE] font-semibold">
                17 TEKNOLOGI TERPADU
              </span>
            </div>
          </div>
        </ScrollReveal>

        {/* Filter Tabs */}
        <ScrollReveal delay={0.1}>
          <div className="flex flex-wrap items-center gap-2 mb-12">
            <button
              type="button"
              onClick={() => setActiveTab('semua')}
              className={`px-4 py-2 rounded-full text-xs font-mono transition-all ${
                activeTab === 'semua'
                  ? 'bg-[#22D3EE] text-[#05070B] font-bold shadow-[0_0_20px_rgba(34,211,238,0.35)]'
                  : 'bg-[#090E17] text-[#94A3B8] border border-white/[0.08] hover:text-[#F8FAFC] hover:border-[#22D3EE]/40'
              }`}
            >
              Semua Domain (17)
            </button>
            {techDomains.map((dom) => (
              <button
                key={dom.id}
                type="button"
                onClick={() => setActiveTab(dom.id)}
                className={`px-4 py-2 rounded-full text-xs font-mono transition-all ${
                  activeTab === dom.id
                    ? 'bg-[#22D3EE] text-[#05070B] font-bold shadow-[0_0_20px_rgba(34,211,238,0.35)]'
                    : 'bg-[#090E17] text-[#94A3B8] border border-white/[0.08] hover:text-[#F8FAFC] hover:border-[#22D3EE]/40'
                }`}
              >
                {dom.label}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Domain Groups Grid: Bento Cards in Obsidian Surface #090E17 */}
        <div className="space-y-8">
          {visibleDomains.map((dom, domIdx) => {
            const Icon = dom.icon;
            return (
              <ScrollReveal key={dom.id} delay={domIdx * 0.1}>
                <div className="bg-[#090E17] border border-white/[0.08] hover:border-[#22D3EE]/40 transition-colors rounded-2xl p-6 sm:p-8 shadow-2xl">
                  {/* Domain Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#04060A] border border-[#22D3EE]/30 flex items-center justify-center text-[#22D3EE]">
                        <Icon className="w-4 h-4 text-[#22D3EE]" />
                      </div>
                      <div>
                        <h3 className="text-base sm:text-lg font-medium text-[#F8FAFC]">
                          {dom.label}
                        </h3>
                        <p className="text-[11px] font-mono text-[#94A3B8]">
                          {dom.items.length} INSTRUMEN REKAYASA
                        </p>
                      </div>
                    </div>
                    <span className="hidden sm:inline-block text-[11px] font-mono text-[#22D3EE]">
                      0{domIdx + 1} // DOMAIN
                    </span>
                  </div>

                  {/* Items in this domain */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {dom.items.map((item, itemIdx) => (
                      <div
                        key={itemIdx}
                        className="p-5 rounded-xl bg-[#04060A]/80 border border-white/[0.06] hover:border-[#22D3EE]/40 transition-all flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <h4 className="text-sm font-mono font-semibold text-[#F8FAFC]">
                              {item.name}
                            </h4>
                            <span className="text-[10px] font-mono text-[#22D3EE] bg-[#22D3EE]/15 px-2.5 py-0.5 rounded-full border border-[#22D3EE]/30">
                              {item.badge}
                            </span>
                          </div>
                          <div className="text-xs font-mono text-[#22D3EE]/80 mb-2 font-medium">
                            {item.role}
                          </div>
                          <p className="text-xs text-[#94A3B8] leading-relaxed font-normal">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
