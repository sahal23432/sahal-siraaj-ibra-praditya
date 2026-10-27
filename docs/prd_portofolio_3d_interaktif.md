# Product Requirements Document (PRD): Website Portofolio 3D Interaktif

**Dokumen Spesifikasi Teknis & Instruksi Eksekusi untuk AI Coding Agent**  
**Status Proyek:** Perencanaan Menuju Implementasi  
**Target Pembaca:** AI Software Engineer (Cursor, Windsurf, Claude Code, v0, Bolt) & Developer Pengembang

## 1. Konteks & Tujuan Proyek

Dokumen ini adalah spesifikasi lengkap (*Product Requirements Document*) untuk membangun aplikasi web **Portofolio 3D Interaktif** yang memadukan visual 3D imersif di peramban dengan studi kasus proyek yang mendalam, profil profesional, serta panel manajemen konten mandiri (*Admin CMS*).

Agar AI Coding Agent dapat membangun aplikasi ini tanpa kerja dua kali (*refactoring*) atau masalah performa di akhir proyek, arsitektur ini menerapkan **dua prinsip mitigasi utama**:
1. **Skema Data Terpadu Sejak Fase 1 (*Unified Data Layer*)**: Meskipun antarmuka **Kelola Konten (CMS)** baru dibangun pada Fase 3, seluruh komponen publik pada Fase 1 dan Fase 2 wajib membaca data melalui lapisan layanan (*data access layer*) dan skema database yang sudah final, bukan *hardcode* statis di dalam komponen UI.
2. **Arsitektur 3D Sadar-Performa Sejak Hari Pertama (*Performance-First 3D*)**: Spesifikasi pada **Fase 4 (Animasi & Performa)** seperti batas *pixel ratio* perangkat, pendeteksi visibilitas layar (*IntersectionObserver*), dan mode **Hemat Animasi** wajib diimplementasikan langsung di komponen pembungkus `<Canvas3DWrapper />` pada Fase 1.

## 2. Rekomendasi Tech Stack (Optimal untuk AI & Performa WebGL)

Tech stack berikut dipilih karena memiliki ekosistem *type-safety* yang kuat, dokumentasi yang sangat dikenali oleh model AI modern, serta performa tinggi untuk beban kerja grafik 3D dan aplikasi *full-stack*:

| Lapisan Arsitektur | Teknologi Utama | Alasan Pemilihan & Peran dalam Sistem |
| :--- | :--- | :--- |
| **Framework Utama** | **Next.js 15 (App Router) + TypeScript** | Mendukung *Server Components* untuk SEO dan muat cepat (*Muat Cepat*), *Server Actions* untuk mutasi data CMS, serta *strict typing* agar kode buatan AI bebas dari *bug* tipe data. |
| **Mesin 3D & WebGL** | **Three.js + React Three Fiber (`@react-three/fiber`) + `@react-three/drei`** | Deklaratif di dalam ekosistem React, mudah diinstruksikan ke AI melalui komponen JSX, memiliki utilitas siap pakai (`useGLTF`, `AdaptiveDpr`, `AdaptiveEvents`, `PerformanceMonitor`, `Float`, `Environment`). |
| **Styling & Komponen UI** | **Tailwind CSS v4 + shadcn/ui + Lucide Icons** | Memudahkan AI menghasilkan antarmuka konsisten, gelap/terang (*dark-mode native*), responsif di HP dan PC, serta aksesibel. |
| **Animasi Antarmuka (2D/DOM)** | **Framer Motion (`motion/react`)** | Menangani transisi halaman, kartu yang bereaksi saat disentuh (*hover/tap*), serta mudah dinonaktifkan secara otomatis melalui hook `useReducedMotion()`. |
| **Database, Auth & Penyimpanan** | **Supabase (PostgreSQL + Auth + Storage) + Drizzle ORM / Prisma** | Menyediakan autentikasi siap pakai untuk **Masuk Admin**, database relasional untuk proyek & profil, serta penyimpanan objek (*bucket*) untuk gambar, video, CV, dan model `.glb`. |
| **Formulir & Layanan Email** | **React Hook Form + Zod + Resend** | Validasi skema ketat di sisi klien dan server untuk **Formulir Kontak**, dengan pengiriman notifikasi email instan ke pemilik portofolio. |
| **Optimasi Aset & Deployment** | **Vercel + `gltf-transform` (Draco / Meshopt)** | Kompresi model 3D hingga 80% lebih ringan agar waktu muat awal tetap di bawah 2,5 detik pada jaringan seluler. |

## 3. Arsitektur Direktori Proyek

AI Agent wajib mengikuti struktur direktori berikut agar pemisahan antara antarmuka publik, kanvas 3D, panel admin, dan lapisan data tetap bersih:

```text
src/
├── app/
│   ├── (public)/                 # Rute publik portofolio (Fase 1, 2, 3)
│   │   ├── page.tsx              # Beranda 3D, Galeri Karya, Profil, Kontak
│   │   └── karya/[slug]/page.tsx # Halaman Detail Karya (Fase 2)
│   ├── admin/                    # Rute Kelola Konten / CMS (Fase 3)
│   │   ├── login/page.tsx        # Masuk Admin
│   │   ├── layout.tsx            # Guard autentikasi admin
│   │   ├── page.tsx              # Dashboard ringkasan & pesan masuk
│   │   ├── karya/page.tsx        # Kelola Daftar Karya (CRUD)
│   │   └── profil/page.tsx       # Kelola Isi Profil (CRUD)
│   ├── api/                      # Route handlers (unggah media, kontak)
│   └── layout.tsx                # Root layout + Provider Hemat Animasi
├── components/
│   ├── canvas/                   # Seluruh komponen 3D (React Three Fiber)
│   │   ├── Canvas3DWrapper.tsx   # Pembungkus WebGL dengan AdaptiveDpr & Pause Offscreen
│   │   ├── HeroScene3D.tsx       # Objek 3D interaktif utama di Beranda
│   │   └── FallbackHero2D.tsx    # Tampilan alternatif saat mode Hemat Animasi aktif
│   ├── sections/                 # Bagian halaman utama (Hero, Gallery, Profile, Contact)
│   ├── cards/                    # ProjectCard dengan efek sentuh/hover 3D tilt
│   └── ui/                       # Komponen dasar shadcn/ui
├── lib/
│   ├── db/                       # Konfigurasi Drizzle/Prisma & skema tabel
│   ├── services/                 # Fungsi query data (projects.ts, profile.ts, contact.ts)
│   ├── validations/              # Skema Zod untuk form kontak & form admin
│   └── hooks/                    # usePerformanceMode.ts (pengatur Hemat Animasi)
└── public/
    └── models/                   # File 3D terkompresi (.glb) & tekstur KTX2/WebP
```

## 4. Skema Database Terpadu (PostgreSQL / Supabase)

AI Agent wajib menyiapkan 4 tabel inti berikut sebelum membangun komponen UI:

```sql
-- 1. Tabel Karya Portofolio (Mendukung Galeri Karya, Detail Karya, dan Kelola Daftar Karya)
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  summary TEXT NOT NULL,
  category TEXT NOT NULL, -- Contoh: 'Web 3D', 'Frontend', 'Fullstack', 'UI/UX'
  thumbnail_url TEXT NOT NULL,
  media_gallery JSONB NOT NULL DEFAULT '[]', -- Array objek: [{type: 'image'|'video', url: string, caption: string}]
  story_behind TEXT NOT NULL, -- Markdown cerita di balik karya (Masalah, Solusi, Hasil)
  role TEXT NOT NULL, -- Peran dalam proyek
  tools TEXT[] NOT NULL DEFAULT '{}', -- Array alat/tech stack yang dipakai
  live_url TEXT,
  repo_url TEXT,
  is_featured BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Tabel Profil Utama (Mendukung Sapaan Beranda, Tentang Saya, Info Kontak, dan Kelola Isi Profil)
CREATE TABLE profile (
  id INTEGER PRIMARY KEY DEFAULT 1 CHECK (id = 1), -- Singleton row
  full_name TEXT NOT NULL,
  headline_greeting TEXT NOT NULL, -- Sapaan di Hero
  short_bio TEXT NOT NULL, -- Ringkasan diri di Hero
  about_markdown TEXT NOT NULL, -- Tentang Saya lengkap
  avatar_url TEXT,
  cv_url TEXT,
  email TEXT NOT NULL,
  phone_or_whatsapp TEXT,
  location TEXT,
  availability_status TEXT DEFAULT 'Tersedia untuk Proyek & Kolaborasi',
  social_links JSONB NOT NULL DEFAULT '[]', -- [{platform: string, url: string, icon: string}]
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Tabel Perjalanan Karier & Pendidikan (Mendukung Pengalaman & Pendidikan)
CREATE TABLE journeys (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL CHECK (type IN ('experience', 'education')),
  title TEXT NOT NULL, -- Jabatan atau Gelar
  organization TEXT NOT NULL, -- Nama Perusahaan atau Institusi
  location TEXT,
  start_date TEXT NOT NULL,
  end_date TEXT, -- NULL atau 'Sekarang' jika masih aktif
  description TEXT NOT NULL,
  display_order INTEGER DEFAULT 0
);

-- 4. Tabel Keahlian & Pesan Kontak
CREATE TABLE skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT NOT NULL, -- '3D & Graphics', 'Frontend', 'Backend', 'Tools'
  proficiency INTEGER DEFAULT 90,
  icon_name TEXT,
  display_order INTEGER DEFAULT 0
);

CREATE TABLE contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_name TEXT NOT NULL,
  sender_email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

## 5. Spesifikasi Fungsional Berdasarkan Modul & Fase

Setiap modul pada diagram memiliki 4 sub-fitur (kecuali Modul 7 yang memiliki 3 sub-fitur). Enam sub-fitur ke-4 yang tersembunyi di balik tombol *Lihat semua (4) >* pada diagram telah dilengkapi secara logis di bawah ini agar AI dapat membangun fitur yang utuh:

### Fase 1: Fondasi Visual & Eksplorasi Utama

#### Modul 1: Beranda 3D Interaktif
1. **Hero Animasi 3D**:
   - Menampilkan adegan 3D interaktif menggunakan `<Canvas>` dari `@react-three/fiber` yang merespons gerakan kursor di PC atau kemiringan/sentuhan di HP secara halus (*lerping*).
   - Wajib dibungkus `<Suspense>` dengan *skeleton/progress loader* ringan agar teks sapaan tetap langsung terbaca sembari model `.glb` dimuat.
2. **Sapaan & Ringkasan Diri**:
   - Menampilkan nama, *headline* peran, serta *elevator pitch* singkat yang diambil secara dinamis dari tabel `profile`.
   - Memiliki kontras tipografi tinggi (WCAG AA ≥ 4.5:1) di atas latar kanvas 3D menggunakan efek *backdrop blur* halus bila diperlukan.
3. **Menu Navigasi Utama**:
   - *Floating glassmorphism navbar* yang memuat tautan ke Beranda, Galeri Karya, Profil & Perjalanan, Kontak, serta tombol cepat **Hemat Animasi** (ikon baterai/kilat).
   - Mendukung *smooth scroll* ke setiap bagian dan menu *drawer* responsif pada layar HP.
4. **Tombol Aksi Utama (CTA) & Indikator Eksplorasi *(Sub-Fitur ke-4)***:
   - Menyediakan tombol primer *"Lihat Karya"* (menggulir ke Galeri Karya) dan tombol sekunder *"Mari Berkolaborasi"* (menggulir ke Formulir Kontak) beserta indikator gulir interaktif.

#### Modul 2: Galeri Karya
1. **Daftar Karya**:
   - Menampilkan *grid* responsif (1 kolom di HP, 2 di tablet, 3 di desktop) berisi kartu proyek yang dipublikasikan (`published = true`), diurutkan berdasarkan `is_featured` dan `display_order`.
2. **Filter Kategori**:
   - Baris tombol filter kategori dinamis (*Semua*, *Web 3D*, *Frontend*, *Fullstack*, *UI/UX*) dengan animasi transisi tata letak (`layoutId` Framer Motion) tanpa memuat ulang halaman.
3. **Kartu Bereaksi Saat Disentuh (*Interactive Card Micro-interactions*)**:
   - Pada PC: Efek *3D perspective tilt* halus mengikuti posisi kursor disertai sorotan cahaya (*radial glare*).
   - Pada HP: Umpan balik skala sentuhan (*active press scale `0.98`*) dan pratinjau singkat yang nyaman bagi layar sentuh tanpa menghalangi pengguliran layar.
4. **Pencarian Cepat & Penanda Karya Unggulan *(Sub-Fitur ke-4)***:
   - Menyediakan input pencarian instan berdasarkan judul/alat yang dipakai serta lencana khusus (*Featured Badge*) untuk menonjolkan karya terbaik.

### Fase 2: Kedalaman Studi Kasus & Kredibilitas Profesional

#### Modul 3: Detail Karya (Rute: `/karya/[slug]`)
1. **Galeri Gambar & Video**:
   - Menampilkan *carousel* atau *masonry grid* media resolusi tinggi dengan fitur *lightbox zoom* untuk gambar dan pemutar video *lazy-loaded* (`preload="metadata"`).
2. **Cerita di Balik Karya (*Case Study Narrative*)**:
   - Merender konten Markdown terstruktur yang mengulas **Latar Belakang Masalah**, **Pendekatan & Solusi Teknis**, **Tantangan 3D/Rekayasa**, serta **Hasil/Dampak Proyek**.
3. **Peran & Alat yang Dipakai (*Role & Tech Stack*)**:
   - Menampilkan panel informasi samping (*sticky sidebar* di desktop) yang merinci peran spesifik pemilik portofolio, waktu pengerjaan, dan lencana (*badges*) teknologi/alat yang digunakan.
4. **Tautan Demo Langsung & Navigasi Antar-Karya *(Sub-Fitur ke-4)***:
   - Menyediakan tombol menuju *Live Demo* dan *Source Code / Repository* (jika publik), serta navigasi *"Karya Sebelumnya / Selanjutnya"* di bagian bawah halaman.

#### Modul 4: Profil & Perjalanan
1. **Tentang Saya**:
   - Menyajikan narasi personal, filosofi desain/rekayasa, dan foto atau avatar pemilik portofolio dari tabel `profile`.
2. **Pengalaman & Pendidikan**:
   - Menampilkan lini masa vertikal interaktif (*interactive timeline*) yang memisahkan atau menggabungkan riwayat kerja (`experience`) dan akademik (`education`) secara kronologis.
3. **Keahlian (*Skills*)**:
   - Mengelompokkan keahlian ke dalam kategori terstruktur (*3D & WebGL*, *Frontend Engineering*, *Backend & Database*, *Design & Workflow Tools*) menggunakan indikator visual yang bersih.
4. **Unduh CV & Sorotan Pencapaian *(Sub-Fitur ke-4)***:
   - Menyediakan tombol unduh CV/Resume terbaru (PDF dari `profile.cv_url`) dan daftar sertifikasi atau penghargaan utama.

### Fase 3: Konversi Klien & Manajemen Konten Mandiri (CMS)

#### Modul 5: Kontak & Kolaborasi
1. **Formulir Kontak**:
   - Input Nama, Email, Subjek/Jenis Kolaborasi, dan Pesan dengan validasi Zod, proteksi *honeypot/rate-limit* anti-spam, penyimpanan ke tabel `contact_messages`, serta pengiriman notifikasi email via Resend.
2. **Tautan Media Sosial**:
   - Deretan tombol ikon sosial (GitHub, LinkedIn, Instagram, Dribbble/Behance, X) yang diambil secara dinamis dari `profile.social_links`.
3. **Info Kontak Langsung**:
   - Menampilkan alamat email dan lokasi/zona waktu beserta fitur *"Salin Email"* satu klik (*one-click copy to clipboard* dengan notifikasi *toast*).
4. **Status Ketersediaan Kolaborasi *(Sub-Fitur ke-4)***:
   - Menampilkan indikator lencana aktif (misal: titik hijau berdenyut *"Tersedia untuk Proyek Freelance / Full-time"*) yang dapat diubah langsung dari panel Admin.

#### Modul 6: Kelola Konten (Rute: `/admin/*`)
1. **Masuk Admin**:
   - Halaman autentikasi aman (`/admin/login`) menggunakan Supabase Auth (Email/Password atau Magic Link/OAuth) yang dilindungi oleh *Next.js Middleware* agar hanya akun pemilik yang dapat mengakses `/admin/*`.
2. **Kelola Daftar Karya (*CRUD Projects*)**:
   - Antarmuka tabel dan formulir untuk menambah, mengedit, menyembunyikan (*draft/publish*), mengubah urutan tampil, dan menghapus proyek, lengkap dengan pengunggah gambar/video/model 3D ke Supabase Storage.
3. **Kelola Isi Profil (*CRUD Profile, Journey, Skills*)**:
   - Formulir editor untuk memperbarui teks sapaan beranda, biografi Tentang Saya, file CV terbaru, daftar Pengalaman & Pendidikan, daftar Keahlian, serta status ketersediaan kolaborasi.
4. **Kotak Masuk Pesan & Pratinjau Perubahan *(Sub-Fitur ke-4)***:
   - Menampilkan daftar pesan dari pengunjung yang masuk lewat Formulir Kontak (tandai sudah dibaca/hapus) serta pemicu `revalidatePath()` otomatis agar setiap perubahan konten langsung tampil di halaman publik.

### Fase 4: Standar Animasi, Aksesibilitas & Performa (Diintegrasikan Lintas Fase)

#### Modul 7: Animasi & Performa
1. **Mulus di HP & PC (*Cross-Device Smoothness*)**:
   - Menggunakan `<AdaptiveDpr pixelated />` dan batas `dpr={[1, 1.5]}` pada kanvas 3D agar GPU ponsel tidak kepanasan.
   - Menyesuaikan geometri dan pencahayaan 3D secara otomatis berdasarkan lebar layar dan kemampuan perangkat.
2. **Hemat Animasi (*Reduced Motion & Power Saving Mode*)**:
   - Mendeteksi preferensi sistem operasi (`prefers-reduced-motion: reduce`) secara otomatis **dan** menyediakan tombol sakelar manual *"Hemat Animasi"* di bilah navigasi (disimpan di `localStorage`).
   - Saat mode **Hemat Animasi** aktif: putaran/animasi 3D kontinu dihentikan (diganti render statis *on-demand* `frameloop="demand"` atau ilustrasi pratinjau ringan), dan transisi gerak berlebih dinonaktifkan.
3. **Muat Cepat (*Fast Loading Architecture*)**:
   - Menghentikan proses *render loop* WebGL (`frameloop="never"`) secara otomatis ketika bagian Hero 3D tidak terlihat di layar menggunakan `IntersectionObserver`.
   - Menerapkan *code-splitting* (`next/dynamic` dengan `ssr: false` untuk kanvas 3D), gambar format WebP/AVIF melalui `next/image`, dan *preloading* model `.glb` terkompresi Draco.

## 6. Kriteria Penerimaan Teknis (Non-Functional Requirements)

| Parameter Kualitas | Target Metrik | Strategi Implementasi Wajib bagi AI Agent |
| :--- | :--- | :--- |
| **Lighthouse Performance** | Skor ≥ 90 (Desktop), ≥ 80 (Mobile) | Gunakan `next/dynamic` untuk memisahkan *bundle* Three.js dari *initial HTML payload* halaman utama. |
| **First Contentful Paint (FCP)** | < 1,2 detik | Teks **Sapaan & Ringkasan Diri** serta **Menu Navigasi Utama** harus dirender oleh Server Component tanpa menunggu aset 3D selesai diunduh. |
| **Frame Rate Kanvas 3D** | Stabil 60 FPS (PC) / ≥ 30–60 FPS (HP) | Batasi jumlah *draw calls*, gunakan tekstur maksimal `1024x1024`, hindari *real-time shadows* berat di perangkat seluler, dan gunakan `<PerformanceMonitor>` dari `@react-three/drei`. |
| **Ukuran Aset Model 3D** | < 1,5 MB total untuk Hero `.glb` | Kompres geometri dengan Draco/Meshopt dan gunakan pencahayaan berbasis *environment preset* ringan. |
| **Keamanan CMS Admin** | 100% Rute Mutasi Terlindungi | Validasi sesi pengguna di setiap *Server Action* dan terapkan *Row Level Security (RLS)* pada tabel Supabase (publik hanya `SELECT`, `INSERT` hanya untuk `contact_messages`, dan `ALL` hanya untuk admin terautentikasi). |

## 7. Urutan Instruksi Eksekusi untuk AI Coding Agent

Gunakan urutan langkah berikut saat menginstruksikan AI Coding Agent untuk membangun proyek ini secara bertahap:

* **Langkah 1 — Inisialisasi & Lapisan Data (Fondasi Anti-Refactor)**:
  Inisialisasi proyek Next.js 15 + TypeScript + Tailwind CSS + shadcn/ui. Buat skema database (`projects`, `profile`, `journeys`, `skills`, `contact_messages`) beserta *seed data* realistis dan fungsi layanan baca/tulis di `src/lib/services/`.
* **Langkah 2 — Sistem Performa & Kanvas 3D (`Fase 1 + Fase 4`)**:
  Bangun `PerformanceContext` (pendeteksi `prefers-reduced-motion` + tombol *toggle* **Hemat Animasi**) dan komponen `<Canvas3DWrapper />` yang dilengkapi `IntersectionObserver` (jeda render saat di luar layar), `<AdaptiveDpr />`, serta `<HeroScene3D />` interaktif.
* **Langkah 3 — Beranda & Galeri Karya (`Fase 1`)**:
  Bangun **Menu Navigasi Utama**, bagian **Hero (Sapaan & Ringkasan Diri + Hero 3D)**, serta bagian **Galeri Karya** lengkap dengan **Filter Kategori**, pencarian, dan **Kartu Bereaksi Saat Disentuh** (*3D tilt* & *touch feedback*).
* **Langkah 4 — Halaman Detail Karya & Bagian Profil (`Fase 2`)**:
  Bangun halaman dinamis `/karya/[slug]` yang memuat **Galeri Gambar & Video**, **Cerita di Balik Karya**, dan **Peran & Alat yang Dipakai**, lalu tambahkan bagian **Profil & Perjalanan** (**Tentang Saya**, lini masa **Pengalaman & Pendidikan**, matriks **Keahlian**, dan tombol unduh CV).
* **Langkah 5 — Kontak & Panel Admin CMS (`Fase 3`)**:
  Bangun bagian **Kontak & Kolaborasi** (**Formulir Kontak** bervalidasi Zod, **Tautan Media Sosial**, **Info Kontak Langsung** dengan fitur salin email), lalu bangun rute `/admin` (**Masuk Admin**, **Kelola Daftar Karya**, **Kelola Isi Profil**, dan kotak masuk pesan).
* **Langkah 6 — Audit Akhir & Polishing (`Fase 4`)**:
  Uji responsivitas di layar HP (`375px`) hingga desktop lebar (`1440px+`), pastikan sakelar **Hemat Animasi** menghentikan beban GPU seketika, dan pastikan seluruh form CMS memicu pembaruan cache halaman publik secara instan.
