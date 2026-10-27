# Portofolio 3D Interaktif — Master AI Execution Guide (`README.md`)

> **INSTRUKSI UTAMA UNTUK AI CODING AGENT (Cursor, Windsurf, Claude Code, Copilot, v0, Bolt):**  
> File `README.md` ini adalah **titik masuk utama (*Master System Prompt & Execution Blueprint*)** untuk membangun aplikasi web **Portofolio 3D Interaktif**. Sebelum menulis atau memodifikasi kode apa pun, kamu **WAJIB** membaca file ini bersama dua dokumen spesifikasi pendamping di direktori utama:
> 1. `PRD_Portofolio_3D_Interaktif.md` — Spesifikasi fungsional 7 modul (27 sub-fitur), skema database PostgreSQL/Supabase, dan arsitektur direktori.
> 2. `design.md` — Sistem desain UI/UX, token warna hitam obsidian (`#070709`), tipografi editorial + telemetri *monospace*, dan spesifikasi gerak yang mengadaptasi [Elyes Rayane Melbouci Portfolio](https://www.melboucierayane.com/) ([Opale UI](https://opale-ui.design/)).

## 1. Ringkasan Arsitektur & Peta Modul

Proyek ini adalah website **Portofolio 3D Interaktif** berkecepatan tinggi dengan panel manajemen konten mandiri (**Kelola Konten / Admin CMS**) yang dibagi ke dalam **4 Fase dan 7 Modul Utama**:

| Fase | Modul Utama | Rute / Lokasi Komponen | Ringkasan Fitur Wajib (Total 27 Sub-Fitur) |
| :--- | :--- | :--- | :--- |
| **Fase 1** | **1. Beranda 3D Interaktif** | `/` (`HeroSection`, `Canvas3DWrapper`, `Navbar`) | • Hero Animasi 3D (WebGL/Three.js)<br>• Sapaan & Ringkasan Diri<br>• Menu Navigasi Utama + Toggle *Hemat Animasi*<br>• Tombol Aksi Utama (CTA) & Indikator Gulir |
| **Fase 1** | **2. Galeri Karya** | `/#karya` (`GallerySection`, `ProjectCard`) | • Daftar Karya (Grid Bernomor `01 · 2026`)<br>• Filter Kategori Dinamis<br>• Kartu Bereaksi Saat Disentuh (*3D Tilt & Spotlight*)<br>• Pencarian Cepat & Lencana Karya Unggulan |
| **Fase 2** | **3. Detail Karya** | `/karya/[slug]` (`ProjectDetailView`) | • Galeri Gambar & Video + Blok Alur *Pipeline*<br>• Cerita di Balik Karya (*Masalah, Arsitektur, Hasil*)<br>• Peran (`Peran saya:`) & Alat yang Dipakai (`·`)<br>• Tautan Live Demo, Source Code & Navigasi Karya |
| **Fase 2** | **4. Profil & Perjalanan** | `/#profil` (`ProfileSection`, `Timeline`, `SkillMatrix`) | • Tentang Saya + 3 Kartu Prinsip Kerja (*How I Build*)<br>• Pengalaman & Pendidikan (Dikelompokkan per Institusi)<br>• Keahlian (*Categorized Monospace Stack Matrix*)<br>• Unduh CV (`.pdf`) & Sorotan Pencapaian |
| **Fase 3** | **5. Kontak & Kolaborasi** | `/#kontak` (`ContactSection`, `ContactForm`) | • Formulir Kontak (Validasi Zod + Anti-Spam)<br>• Tautan Media Sosial (`↗`)<br>• Info Kontak Langsung (*One-Click Copy Email*)<br>• Lencana Status Ketersediaan Kolaborasi |
| **Fase 3** | **6. Kelola Konten (CMS)** | `/admin/*` (`AdminDashboard`, `ProjectCRUD`, `ProfileCRUD`) | • Masuk Admin (Supabase Auth + Middleware Guard)<br>• Kelola Daftar Karya (CRUD + Unggah Media)<br>• Kelola Isi Profil (CRUD Bio, Timeline, Skills, CV)<br>• Kotak Masuk Pesan & Revalidasi Cache Instan |
| **Fase 4** | **7. Animasi & Performa** | Lintas Komponen (`PerformanceContext`, `Canvas3DWrapper`) | • Mulus di HP & PC (`AdaptiveDpr`, `dpr={[1, 1.5]}`)<br>• Hemat Animasi (`prefers-reduced-motion` + Toggle UI)<br>• Muat Cepat (`next/dynamic`, Jeda WebGL saat *Off-screen*) |

## 2. Perintah Inisialisasi Proyek & Instalasi Paket

Saat memulai dari repositori kosong, AI Agent wajib menjalankan perintah berikut secara berurutan:

```bash
# 1. Inisialisasi Next.js 15 (App Router, TypeScript, Tailwind CSS, ESLint, direktori src/)
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm

# 2. Instalasi mesin 3D (Three.js + React Three Fiber + Drei) & Animasi (Motion)
npm install three @types/three @react-three/fiber @react-three/drei motion lucide-react clsx tailwind-merge

# 3. Instalasi Formulir, Validasi, Database Client (Supabase), dan Email (Resend)
npm install react-hook-form zod @hookform/resolvers @supabase/supabase-js @supabase/ssr resend

# 4. Inisialisasi komponen dasar shadcn/ui
npx shadcn@latest init -d
```

## 3. Strategi Dual-Mode Data Layer (Wajib agar Proyek Jalan Tanpa Blocker)

Agar aplikasi dapat langsung dijalankan dan diuji pada **Fase 1 & Fase 2** bahkan sebelum pengguna memasukkan kunci API Supabase atau Resend di `.env.local`, AI Agent **WAJIB** membangun lapisan akses data (`src/lib/services/`) dengan mekanisme **Automatic Fallback**:

1. **Mode Lokal Otomatis (Default saat `.env.local` kosong)**:
   - Buat file `src/lib/db/seed-data.ts` yang berisi data awal lengkap dan realistis (profil pemilik, 3 prinsip kerja, 6 karya portofolio lengkap dengan langkah *pipeline* telemetri dan cerita Markdown, 4 riwayat pengalaman/pendidikan, dan 16 keahlian).
   - Jika variabel `NEXT_PUBLIC_SUPABASE_URL` belum diisi, seluruh fungsi di `src/lib/services/projects.ts` dan `src/lib/services/profile.ts` secara otomatis mengembalikan data dari `seed-data.ts` (dan menyimpan perubahan sementara di memori/state lokal saat menguji CMS).
2. **Mode Produksi Supabase (Saat `.env.local` terisi)**:
   - Begitu `NEXT_PUBLIC_SUPABASE_URL` dan `NEXT_PUBLIC_SUPABASE_ANON_KEY` terdeteksi, layanan otomatis membaca dan menulis langsung ke tabel PostgreSQL Supabase (`projects`, `profile`, `journeys`, `skills`, `contact_messages`).

### Template `.env.example`

AI Agent wajib membuat file `.env.example` berikut di akar proyek:

```env
# Mode Data: Biarkan kosong saat pengembangan awal untuk memakai seed-data.ts otomatis
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Layanan Email Kontak (Opsional saat pengembangan lokal)
RESEND_API_KEY=
CONTACT_RECEIVER_EMAIL=emailkamu@domain.com

# Konfigurasi Situs
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## 4. Aturan Arsitektur & Visual yang Tidak Boleh Dilanggar AI Agent

Setiap baris kode yang ditulis oleh AI Agent wajib mematuhi 6 aturan keras (*Hard Guardrails*) berikut:

* **Aturan 1 — Hero 3D Prosedural Tanpa Ketergantungan File Eksternal**:
  Jangan membuat aplikasi gagal dimuat (*crash*) karena mencari file `.glb` yang belum ada. Bangun `<HeroScene3D />` menggunakan **geometri prosedural / *custom shader* / *icosahedron wireframe & particle field*** di React Three Fiber yang langsung tampil memukau tanpa file eksternal, sembari menyediakan prop opsional `modelUrl?: string` jika pengguna nantinya mengunggah file `.glb` dari panel Admin.
* **Aturan 2 — Pelindung Error WebGL (`<WebGLErrorBoundary />`)**:
  Bungkus `<Canvas3DWrapper />` dengan *Error Boundary*. Jika peramban pengguna tidak mendukung WebGL atau sedang mengaktifkan mode **Hemat Animasi**, tampilkan komponen `<FallbackHero2D />` (visual kisi-kisi *radial glow* CSS/SVG berestetika gelap yang ringan).
* **Aturan 3 — Penghentian Render Otomatis (*Zero GPU Waste*)**:
  Di dalam `<Canvas3DWrapper />`, gunakan `IntersectionObserver` untuk memantau apakah bagian Hero sedang terlihat di layar. Saat pengguna menggulir ke bawah melewati Hero, ubah prop `<Canvas frameloop="never">` agar GPU berhenti bekerja 100%. Saat mode **Hemat Animasi** aktif, gunakan `frameloop="demand"`.
* **Aturan 4 — Kepatuhan Ketat pada Estetika `design.md` ([melboucierayane.com](https://www.melboucierayane.com/))**:
  - Gunakan latar belakang hitam obsidian `#070709`, permukaan kartu `#0D0E12`, dan garis tepi tipis `border-white/[0.08]` (`hover:border-white/[0.22]`). Dilarang menggunakan gradien ungu/biru neon generik.
  - Gunakan huruf *monospace* (`font-mono tabular-nums`) untuk seluruh penomoran indeks (`01 · 2026`), penghitung jumlah item (`06 karya`), rentang tanggal pengalaman, lencana status (`IN PRODUCTION`, `SHIPPED`, `VERIFIED`), dan penghitung telemetri di *navbar*.
  - Setiap kartu karya dan halaman Detail Karya wajib menampilkan baris eksplisit **`Peran saya:`** (*My part*) dan daftar teknologi yang dipisahkan oleh titik tengah (`Next.js · Three.js · TypeScript · Tailwind v4`).
* **Aturan 5 — Blok Bukti Sistem (*Interactive Pipeline / Telemetry Block*)**:
  Sesuai pola khas [melboucierayane.com](https://www.melboucierayane.com/), setiap proyek di **Galeri Karya** dan **Detail Karya** wajib memiliki visualisasi tahapan sistem bernomor (`01 INPUT → 02 PROSES → 03 EVALUASI → 04 OUTPUT`) atau cuplikan metrik terstruktur di samping galeri gambar/video.
* **Aturan 6 — Tipografi & Bahasa**:
  Seluruh antarmuka pengguna menggunakan **Bahasa Indonesia** yang ringkas, lugas, dan profesional sesuai terminologi pada diagram perencanaan (`Beranda`, `Galeri Karya`, `Detail Karya`, `Profil & Perjalanan`, `Kontak & Kolaborasi`, `Kelola Konten`, `Hemat Animasi`).

## 5. Protokol Eksekusi Bertahap untuk AI Coding Agent

AI Agent harus mengeksekusi pembangunan website ini dalam **6 tahap berurutan**. Jangan melompat ke tahap berikutnya sebelum kriteria kelulusan (*Verification Gate*) pada tahap berjalan terpenuhi:

### Tahap 1: Fondasi Proyek, Token Desain & Lapisan Data Dual-Mode
* **Tugas AI**:
  1. Siapkan konfigurasi font (`Geist Sans` & `Geist Mono` / `JetBrains Mono`) dan variabel CSS warna obsidian di `src/app/globals.css` sesuai `design.md`.
  2. Buat tipe data TypeScript (`src/types/portfolio.ts`), file skema SQL (`supabase/schema.sql`), data awal lengkap (`src/lib/db/seed-data.ts`), dan layanan data *dual-mode* (`src/lib/services/projects.ts`, `profile.ts`, `contact.ts`).
* **Verification Gate**: `npm run build` berjalan sukses tanpa *error* TypeScript.

### Tahap 2: Sistem Performa, Mode Hemat Animasi & Kanvas 3D (`Fase 1 & Fase 4`)
* **Tugas AI**:
  1. Buat `src/lib/hooks/usePerformanceMode.ts` (`PerformanceProvider`) yang mendeteksi `prefers-reduced-motion`, menyimpan preferensi **Hemat Animasi** di `localStorage`, dan menyediakan penghitung FPS/telemetri sederhana.
  2. Bangun `<Canvas3DWrapper />`, `<HeroScene3D />` (geometri 3D interaktif yang merespons kursor dengan `THREE.MathUtils.lerp`), dan `<FallbackHero2D />`.
* **Verification Gate**: Kanvas 3D tampil mulus 60 FPS di Beranda, berhenti merender saat digulir ke luar layar, dan langsung beralih ke mode statis/2D saat tombol **Hemat Animasi** diklik.

### Tahap 3: Beranda 3D Interaktif & Galeri Karya (`Fase 1`)
* **Tugas AI**:
  1. Bangun `<Navbar />` dengan penghitung telemetri *real-time*, tautan navigasi, dan sakelar **Hemat Animasi**.
  2. Bangun `<HeroSection />` (Sapaan, judul *display* besar dengan *word reveal*, ringkasan diri, tombol CTA, dan indikator `scroll down ↓`).
  3. Bangun `<GallerySection />` lengkap dengan **Filter Kategori**, pencarian instan, dan `<ProjectCard />` bernomor `01 · 2026` yang memiliki efek sorotan radial (*spotlight*) + kemiringan 3D saat disentuh/di-*hover* serta blok pratinjau *pipeline*.
* **Verification Gate**: Filter kategori dan pencarian bekerja instan tanpa *reload*, dan kartu merespons sentuhan di HP maupun kursor di PC.

### Tahap 4: Halaman Detail Karya & Bagian Profil & Perjalanan (`Fase 2`)
* **Tugas AI**:
  1. Bangun halaman `/karya/[slug]/page.tsx` yang menampilkan **Galeri Gambar & Video** (dengan *lightbox*), **Diagram Alur Pipeline**, **Cerita di Balik Karya** (`01 Masalah`, `02 Arsitektur & Solusi`, `03 Hasil`), sidebar *sticky* **Peran & Alat yang Dipakai**, serta navigasi antar-karya.
  2. Bangun `<ProfileSection />` di halaman utama yang memuat **Tentang Saya**, 3 kartu prinsip kerja bernomor (*Cara Saya Membangun*), lini masa **Pengalaman & Pendidikan** yang dikelompokkan per institusi, matriks **Keahlian** per kategori, dan tombol **Unduh CV**.
* **Verification Gate**: Seluruh tautan `/karya/[slug]` dapat dibuka dengan mulus dan kembali ke Galeri Karya tanpa *error*.

### Tahap 5: Kontak & Kolaborasi + Panel Admin CMS (`Fase 3`)
* **Tugas AI**:
  1. Bangun `<ContactSection />` dengan lencana **Status Ketersediaan** (titik hijau aktif), tombol **Salin Email** satu klik (dengan notifikasi *toast*), **Tautan Media Sosial** (`↗`), dan **Formulir Kontak** bervalidasi Zod.
  2. Bangun rute `/admin/login` (**Masuk Admin**) dan dashboard `/admin` (**Kelola Daftar Karya**, **Kelola Isi Profil**, serta **Kotak Masuk Pesan**) dengan tema visual *Telemetry Cockpit* sesuai `design.md`.
* **Verification Gate**: Pengiriman formulir kontak tervalidasi dengan benar, dan perubahan data karya/profil di `/admin` langsung memperbarui tampilan halaman publik.

### Tahap 6: Audit Performa, SEO & Responsivitas Akhir (`Fase 4`)
* **Tugas AI**:
  1. Tambahkan metadata SEO lengkap dan generator gambar pratinjau otomatis di `src/app/opengraph-image.tsx`.
  2. Pastikan tata letak rapi pada lebar layar `375px` (HP), `768px` (Tablet), hingga `1440px+` (Desktop), serta jalankan `npm run lint` dan `npm run build` hingga bersih dari peringatan.

## 6. Prompt Cepat untuk Memulai Bersama AI Coding Agent

Salin dan tempelkan *prompt* berikut ke ruang obrolan AI Coding Agent kamu untuk memulai eksekusi:

```text
Baca file README.md, PRD_Portofolio_3D_Interaktif.md, dan design.md secara menyeluruh.
Ikuti seluruh arsitektur, token desain hitam obsidian (#070709) bergaya melboucierayane.com, serta protokol Dual-Mode Data Layer yang tertulis di README.md.
Mulai eksekusi dari Tahap 1 dan Tahap 2 terlebih dahulu, pastikan kode bebas dari error TypeScript, lalu laporkan hasilnya sebelum lanjut ke Tahap 3.
```
