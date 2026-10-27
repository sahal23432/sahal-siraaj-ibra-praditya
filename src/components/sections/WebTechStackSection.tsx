'use client';

import { useState } from 'react';
import ScrollReveal from '@/components/ui/ScrollReveal';
import {
  Code2,
  Layers,
  Database,
  Cpu,
  Boxes,
  Sparkles,
  GitBranch,
  CheckCircle2,
  ArrowUpRight,
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
          name: 'Next.js 15 (App Router)',
          category: 'Framework Utama',
          role: 'Server Components, Server Actions & Static Generation',
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
          role: 'Desain Responsif & Token Warna Obsidian',
          badge: 'UTILITY FIRST',
          description:
            'Membangun sistem desain bertema gelap obsidian yang ringan, konsisten, dan fleksibel pada layar HP 375px hingga monitor desktop lebar.',
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
          badge: 'CUBIC-BEZIER',
          description:
            'Menggerakkan elemen antarmuka menggunakan kurva presisi cubic-bezier(0.22, 1, 0.36, 1) dengan dukungan otomatis prefers-reduced-motion.',
        },
        {
          name: 'Zero GPU Waste Architecture',
          category: 'Strategi Efisiensi',
          role: 'IntersectionObserver & Mode Hemat Animasi',
          badge: 'PERFORMANCE FIRST',
          description:
            'Menghentikan loop render WebGL saat kanvas berada di luar layar pengguna dan menyediakan opsi Eco Mode langsung dari bilah navigasi.',
        },
      ],
    },
    {
      id: 'backend',
      label: 'Back-End & Database',
      icon: Database,
      items: [
        {
          name: 'Node.js',
          category: 'Server Runtime',
          role: 'Eksekusi Logika & Route Handlers',
          badge: 'BACK-END CORE',
          description:
            'Menjalankan logika pemrosesan data, validasi formulir kontak, dan komunikasi antar-layanan di sisi server.',
        },
        {
          name: 'Supabase & PostgreSQL',
          category: 'Database & Auth',
          role: 'Penyimpanan Terpadu & Row Level Security',
          badge: 'RELATIONAL DB',
          description:
            'Menyimpan data proyek, pesan pengunjung, dan riwayat perjalanan dalam skema relasional terstruktur dengan proteksi izin akses.',
        },
        {
          name: 'RESTful API & Server Actions',
          category: 'Komunikasi Data',
          role: 'Endpoint Terstandar & Pengiriman Cepat',
          badge: 'DATA LAYER',
          description:
            'Merancang format pertukaran data JSON yang teratur untuk menghubungkan formulir web maupun perangkat luar.',
        },
        {
          name: 'Zod Validation Schema',
          category: 'Integritas Data',
          role: 'Sanitasi Masukan & Proteksi Anti-Spam',
          badge: 'SECURITY GATE',
          description:
            'Memvalidasi data formulir di sisi klien dan server secara bersamaan, dilengkapi perlindungan honeypot terhadap bot.',
        },
      ],
    },
    {
      id: 'bridge',
      label: 'Hardware Bridge & Tooling',
      icon: Cpu,
      items: [
        {
          name: 'Integrasi Hardware-ke-Web',
          category: 'Spesialisasi Unik',
          role: 'Jembatan RFID Sensor ke Dashboard Web',
          badge: 'RFID INTEGRATION',
          description:
            'Menghubungkan pembacaan fisik kartu RFID pada Console Box menuju database web sekolah untuk pencatatan kehadiran real-time.',
        },
        {
          name: 'Git & GitHub',
          category: 'Version Control',
          role: 'Pelacakan Riwayat Kode & Kolaborasi Tim',
          badge: 'COLLABORATION',
          description:
            'Mengelola cabang fitur, riwayat komit terstruktur, dan integrasi berkelanjutan pada proyek bersama Project-Based Learning.',
        },
        {
          name: 'VS Code & Web Tooling',
          category: 'Lingkungan Pengembangan',
          role: 'Turbopack, ESLint & TypeScript Compiler',
          badge: 'DEV ENVIRONMENT',
          description:
            'Memaksimalkan kecepatan build lokal dengan Turbopack dan menjaga konsistensi gaya kode melalui konfigurasi linter ketat.',
        },
        {
          name: 'Standar Aksesibilitas WCAG AA',
          category: 'Kualitas Rekayasa',
          role: 'Kontras Warna & Navigasi Keyboard',
          badge: 'ACCESSIBLE UI',
          description:
            'Memastikan kontras teks minimal 4.5:1 pada latar belakang gelap dan seluruh kontrol interaktif dapat dioperasikan via keyboard.',
        },
      ],
    },
  ];

  const visibleDomains =
    activeTab === 'semua'
      ? techDomains
      : techDomains.filter((d) => d.id === activeTab);

  return (
    <section id="tech-stack" className="py-24 max-w-6xl mx-auto px-5 sm:px-8 border-t border-white/[0.08]">
      {/* Header with Monospace Telemetry */}
      <ScrollReveal>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-[#63636E] uppercase tracking-wider mb-2">
              <span>02</span>
              <span>·</span>
              <span>WEB ENGINEERING STACK</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-medium tracking-tight text-[#F4F4F6]">
              Teknologi yang Saya Gunakan untuk Membangun Website
            </h2>
          </div>
          <div className="font-mono text-xs text-[#63636E]">
            <span>ARSITEKTUR LENGKAP</span>
            <span className="mx-2">·</span>
            <span className="text-[#10B981]">17 TEKNOLOGI TERPADU</span>
          </div>
        </div>
      </ScrollReveal>

      {/* Filter Tabs */}
      <ScrollReveal delay={0.1}>
        <div className="flex flex-wrap items-center gap-2 mb-12">
          <button
            type="button"
            onClick={() => setActiveTab('semua')}
            className={`px-3.5 py-1.5 rounded text-xs font-mono transition-all ${
              activeTab === 'semua'
                ? 'bg-[#F4F4F6] text-[#070709] font-medium'
                : 'bg-[#14161D] text-[#A1A1AA] border border-white/[0.06] hover:text-[#F4F4F6] hover:border-white/20'
            }`}
          >
            Semua Domain (17)
          </button>
          {techDomains.map((dom) => (
            <button
              key={dom.id}
              type="button"
              onClick={() => setActiveTab(dom.id)}
              className={`px-3.5 py-1.5 rounded text-xs font-mono transition-all ${
                activeTab === dom.id
                  ? 'bg-[#F4F4F6] text-[#070709] font-medium'
                  : 'bg-[#14161D] text-[#A1A1AA] border border-white/[0.06] hover:text-[#F4F4F6] hover:border-white/20'
              }`}
            >
              {dom.label}
            </button>
          ))}
        </div>
      </ScrollReveal>

      {/* Domain Groups Grid */}
      <div className="space-y-12">
        {visibleDomains.map((dom, domIdx) => {
          const Icon = dom.icon;
          return (
            <ScrollReveal key={dom.id} delay={domIdx * 0.1}>
              <div className="bg-[#0D0E12] border border-white/[0.08] rounded-2xl p-6 sm:p-8">
                {/* Domain Header */}
                <div className="flex items-center justify-between pb-4 border-b border-white/[0.06] mb-6">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#14161D] border border-white/[0.08] flex items-center justify-center text-[#F4F4F6]">
                      <Icon className="w-4 h-4 text-[#10B981]" />
                    </div>
                    <div>
                      <h3 className="text-base font-medium text-[#F4F4F6]">
                        {dom.label}
                      </h3>
                      <p className="text-[11px] font-mono text-[#63636E]">
                        {dom.items.length} INSTRUMEN REKAYASA
                      </p>
                    </div>
                  </div>
                  <span className="hidden sm:inline-block text-[11px] font-mono text-[#63636E]">
                    0{domIdx + 1} // DOMAIN
                  </span>
                </div>

                {/* Items in this domain */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {dom.items.map((item, itemIdx) => (
                    <div
                      key={itemIdx}
                      className="p-4 rounded-xl bg-[#14161D]/50 border border-white/[0.04] hover:border-white/[0.15] hover:bg-[#14161D] transition-colors flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <h4 className="text-sm font-mono font-semibold text-[#F4F4F6]">
                            {item.name}
                          </h4>
                          <span className="text-[9px] font-mono text-[#10B981] bg-[#10B981]/10 px-2 py-0.5 rounded border border-[#10B981]/20">
                            {item.badge}
                          </span>
                        </div>
                        <div className="text-xs font-mono text-[#A1A1AA] mb-2 font-medium">
                          {item.role}
                        </div>
                        <p className="text-xs text-[#63636E] leading-relaxed">
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
    </section>
  );
}
