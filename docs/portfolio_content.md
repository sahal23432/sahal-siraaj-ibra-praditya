# Konten & Data Portofolio Website: Sahal Siraaj Ibra Praditya (`PORTFOLIO_CONTENT.md`)

> **INSTRUKSI UNTUK AI CODING AGENT:**  
> Dokumen ini berisi **transformasi lengkap dari CV asli Sahal Siraaj Ibra Praditya** menjadi konten siap pakai dan kode `src/lib/db/seed-data.ts` untuk website **Portofolio 3D Interaktif** bergaya [melboucierayane.com](https://www.melboucierayane.com/) (`design.md` & `PRD_Portofolio_3D_Interaktif.md`). Gunakan data di dokumen ini sebagai isi utama website tanpa mengubah fakta identitas, pendidikan, kontak, maupun proyek yang tercantum.

## 1. Pemetaan Konten CV ke 7 Modul Website Portofolio

### Modul 1: Beranda 3D Interaktif (Fase 1)
* **Nama Identitas (Navbar Kiri)**: `Sahal Siraaj`
* **Indikator Telemetri Navbar**: `RFID · WEB · 3D SYSTEM ONLINE` (atau penghitung waktu nyata sesi pengunjung)
* **Hero Pre-Title (Monospace Hook)**: `PENGEMBANGAN PERANGKAT LUNAK DAN GIM · SMKN 9 SEMARANG`
* **Hero Display Headline (*Word-by-Word Reveal*)**: `Merancang sistem yang menghubungkan perangkat keras fisik dengan antarmuka web modern.`
* **Sapaan & Ringkasan Diri (`short_bio`)**:
  > Halo, saya **Sahal Siraaj Ibra Praditya** — pengembang perangkat lunak dan eksplorator perangkat keras dari Semarang. Saya merancang alur sistem terintegrasi mulai dari perakitan terminal fisik berbasis RFID hingga aplikasi web Front-End & Back-End.
* **Konsep Visual Hero 3D (`<HeroScene3D />`)**:
  Karena keahlian unik Sahal adalah perpaduan **Hardware/RFID + Web Development**, objek 3D prosedural di Beranda menampilkan **Modul Konsol Sirkuit & Gelombang Sinyal RFID 3D (*Interactive Wireframe Node & Signal Pulse*)** yang bereaksi terhadap gerakan kursor dan memancarkan gelombang cincin halus saat disentuh.

### Modul 2 & Modul 3: Galeri Karya & Detail Karya (Fase 1 & Fase 2)

Dari pengalaman di CV dan ekosistem pembelajarannya di jurusan PPLG SMK Negeri 9 Semarang, berikut adalah **3 kartu karya terstruktur** (2 proyek nyata langsung dari CV + 1 proyek sistem portofolio 3D ini sendiri) lengkap dengan blok **Alur Sistem (*Pipeline Telemetry*)** khas `melboucierayane.com`:

#### Karya 01 · 2026 — Sistem Presensi Pintar Berbasis Console Box RFID
* **Kategori**: `IoT & Hardware` / `Fullstack`
* **Status Lencana**: `DIIMPLEMENTASIKAN DI SMKN 9 SEMARANG` (`--status-live`)
* **Ringkasan 1 Kalimat**: Terminal perangkat keras *Console Box RFID* terintegrasi untuk otomatisasi pencatatan kehadiran siswa secara *real-time* di SMK Negeri 9 Semarang.
* **Blok Alur Sistem (*Pipeline Telemetry*)**:
  `01 TAP KARTU RFID → 02 AKUISISI UID SENSOR → 03 VALIDASI & TRANSMISI DATA → 04 LOG PRESENSI SISWA`
* **Cerita di Balik Karya (`story_behind`)**:
  - **01 Konteks & Masalah**: Proses pencatatan kehadiran manual di lingkungan sekolah membutuhkan waktu dan rentan terhadap antrean maupun kesalahan rekapitulasi. Dibutuhkan perangkat fisik yang tangguh dan mudah dioperasikan langsung oleh siswa.
  - **02 Pendekatan & Arsitektur**: Merancang dan merakit **Console Box RFID** mandiri yang membungkus modul pembaca kartu RFID dan komponen elektronika dalam satu konsol pelindung. Alur sistem dirancang agar setiap pemindaian kartu langsung meneruskan identitas unik (UID) menuju sistem pencatatan terpusat.
  - **03 Hasil & Dampak**: Digunakan secara nyata untuk presensi siswa SMK Negeri 9 Semarang pada program *Project-Based Learning* (April – Juni 2026), mempercepat proses absensi harian dan membuktikan keandalan integrasi *hardware-ke-software*.
* **Peran Saya (`role`)**: Perancang Perangkat Keras (*Console Box RFID*) & Arsitek Alur Integrasi Sistem.
* **Alat & Teknologi (`tools`)**: `RFID Reader Module · Mikrokontroler · Elektronika Dasar · Hardware Prototyping · System Flowchart · Web Integration`

#### Karya 02 · 2026 — Pengembangan Platform Web `skanilan.tech`
* **Kategori**: `Frontend` / `Fullstack`
* **Status Lencana**: `LIVE PRODUCTION` (`--status-live`)
* **Ringkasan 1 Kalimat**: Pengembangan antarmuka dan fungsionalitas aplikasi web pada domain ekosistem teknologi SMK Negeri 9 Semarang (`skanilan.tech`).
* **Blok Alur Sistem (*Pipeline Telemetry*)**:
  `01 DESAIN UI/UX → 02 KOMPONEN FRONT-END → 03 INTEGRASI BACK-END → 04 DEPLOYMENT SKANILAN.TECH`
* **Cerita di Balik Karya (`story_behind`)**:
  - **01 Konteks & Masalah**: Sistem terintegrasi di lingkungan sekolah memerlukan antarmuka web yang bersih, responsif di perangkat seluler maupun komputer, serta mudah diakses oleh pengguna.
  - **02 Pendekatan & Arsitektur**: Berkolaborasi dalam tim *Project-Based Learning* (April – Juni 2026) untuk membangun struktur halaman, antarmuka pengguna (*Web Design & Front-End*), serta logika pengolahan data (*Back-End Coding*) pada domain `skanilan.tech`.
  - **03 Hasil & Dampak**: Menghasilkan antarmuka web yang terstruktur dan memperkuat fondasi kolaborasi pengembangan perangkat lunak standar industri di jurusan PPLG.
* **Peran Saya (`role`)**: Kontributor Pengembang Web (*Front-End & Back-End Coding* serta *Web Design*).
* **Alat & Teknologi (`tools`)**: `HTML5 · CSS3 · JavaScript · Front-End & Back-End Coding · Responsive Web Design`
* **Tautan Eksternal (`live_url`)**: `https://skanilan.tech`

#### Karya 03 · 2026 — Ekosistem Portofolio 3D Interaktif & Telemetry CMS
* **Kategori**: `Web 3D`
* **Status Lencana**: `ARSITEKTUR AKTIF` (`--status-live`)
* **Ringkasan 1 Kalimat**: Aplikasi web portofolio 3D berbasis React Three Fiber dengan mode *Hemat Animasi* dan panel manajemen konten mandiri (*Admin CMS*).
* **Blok Alur Sistem (*Pipeline Telemetry*)**:
  `01 DATA LAYER SUPABASE → 02 WEBGL SHADER HERO → 03 ADAPTIVE DPR & ECO MODE → 04 ADMIN CMS CRUD`
* **Cerita di Balik Karya (`story_behind`)**:
  - **01 Konteks & Masalah**: Menyajikan rekam jejak rekayasa perangkat lunak dan eksplorasi perangkat keras dalam satu ruang digital yang imersif namun tetap ringan di perangkat seluler.
  - **02 Pendekatan & Arsitektur**: Membangun arsitektur *full-stack* menggunakan Next.js 15, TypeScript, Three.js (`@react-three/fiber`), dan Supabase, dilengkapi fitur penghentian render otomatis saat di luar layar serta sakelar *Hemat Animasi*.
  - **03 Hasil & Dampak**: Menyatukan dokumentasi studi kasus teknis, lini masa perjalanan akademik, dan panel pengelolaan konten dinamis dalam satu platform.
* **Peran Saya (`role`)**: Perancang Sistem & Pengembang Full-Stack.
* **Alat & Teknologi (`tools`)**: `Next.js 15 · TypeScript · Three.js · React Three Fiber · Tailwind CSS v4 · Supabase`

### Modul 4: Profil & Perjalanan (Fase 2)

#### Tentang Saya & 3 Kartu Prinsip Kerja (*"Cara Saya Membangun"*)
* **Narasi Tentang Saya (`about_markdown`)**:
  > Saya adalah siswa jurusan **Pengembangan Perangkat Lunak dan Gim (PPLG)** di **SMK Negeri 9 Semarang** yang memiliki ketertarikan mendalam pada titik temu antara **kode perangkat lunak** dan **komponen perangkat keras fisik**.
  >
  > Bagi saya, perangkat lunak menjadi jauh lebih menarik ketika dapat berinteraksi langsung dengan dunia nyata—seperti membaca kartu RFID pada konsol fisik dan menerjemahkannya menjadi data kehadiran di layar web dalam hitungan milidetik. Saya senang mempelajari cara kerja sistem dari hulu ke hilir, memecahkan masalah teknis secara sistematis, dan bekerja sama dalam tim untuk menghadirkan solusi yang benar-benar dipakai orang.
* **3 Kartu Prinsip Kerja (Adaptasi *"How I Build"* `melboucierayane.com`)**:
  1. **`01 Integrasi Fisik & Digital`**:
     *Headline*: Sistem terbaik menjembatani perangkat keras dan layar pengguna.
     *Isi*: Saya tidak hanya menulis kode di balik layar, tetapi juga merakit sensor dan komponen elektronika agar perangkat fisik dan aplikasi web berjalan sebagai satu kesatuan yang utuh.
     *Proof Badge*: `Console Box RFID · Integrasi Web`
  2. **`02 Alur Sistem Sebelum Kode`**:
     *Headline*: Memetakan alur data yang jernih sebelum mulai merakit.
     *Isi*: Setiap proyek dimulai dari perancangan alur sistem yang terukur—memastikan bagaimana input ditangkap, diproses di sisi belakang, dan ditampilkan secara intuitif di antarmuka pengguna.
     *Proof Badge*: `Front-End & Back-End Architecture`
  3. **`03 Belajar Cepat & Kolaboratif`**:
     *Headline*: Mengubah rasa ingin tahu menjadi solusi nyata bersama tim.
     *Isi*: Melalui pendekatan *Project-Based Learning*, saya terbiasa mempelajari teknologi baru dengan cepat, berkomunikasi terbuka, dan menyelesaikan kendala teknis langsung di lapangan.
     *Proof Badge*: `Project-Based Learning · skanilan.tech`

#### Lini Masa Pengalaman & Pendidikan (`journeys`)
* **Pengalaman Proyek (`experience`)**:
  - **April 2026 – Juni 2026** | **Pengembang Sistem Presensi RFID & Web (Project-Based Learning)** — *SMK Negeri 9 Semarang, Semarang*
    Merancang dan membuat perangkat keras *Console Box RFID* yang digunakan untuk presensi siswa SMK Negeri 9 Semarang, serta berkontribusi dalam pengembangan website `skanilan.tech`.
* **Pendidikan (`education`)**:
  - **2025 – Sekarang** | **Jurusan Pengembangan Perangkat Lunak dan Gim (PPLG)** — *SMK Negeri 9 Semarang, Semarang*
    Mendalami rekayasa perangkat lunak, pemrograman web (*Front-End & Back-End*), desain antarmuka, dan sistem terintegrasi berbasis perangkat keras.
  - **2022 – 2025** | **Pendidikan Menengah Pertama** — *SMP Negeri 33 Semarang, Semarang*
  - **2016 – 2022** | **Pendidikan Dasar** — *MI Nasrul Fajar, Semarang*

#### Matriks Keahlian (`skills`)
* **Kategori `Web & Software`**: `Front-End Coding`, `Back-End Coding`, `Web Design`, `Perancangan Alur Sistem`, `HTML / CSS / JavaScript`, `Next.js & TypeScript`
* **Kategori `Hardware & IoT`**: `Basic Electronic & Hardware`, `Perakitan Console Box RFID`, `Integrasi Sensor & Mikrokontroler`, `Hardware-to-Web Communication`
* **Kategori `Tools & Core`**: `Computer Literacy`, `Problem Solving`, `Strong Communication`, `Fast Learner`, `Git & Kolaborasi Tim`

### Modul 5: Kontak & Kolaborasi (Fase 3)
* **Headline Ajakan**: `Tertarik berdiskusi tentang pengembangan web atau proyek perangkat keras terintegrasi? Mari terhubung.`
* **Status Ketersediaan**: `Terbuka untuk Kolaborasi Proyek, Magang (PKL), & Eksplorasi Teknologi`
* **Email Utama**: `sahalsiraaj44@gmail.com`
* **Telepon / WhatsApp**: `+62 856-4044-4923`
* **Lokasi**: `Jl. Tunggu Raya Timur II, Semarang, Jawa Tengah`

## 2. Kode Siap Pakai `src/lib/db/seed-data.ts` untuk AI Coding Agent

AI Coding Agent dapat langsung menyalin kode TypeScript berikut ke dalam `src/lib/db/seed-data.ts`:

```typescript
export const SEED_PROFILE = {
  id: 1,
  full_name: "Sahal Siraaj Ibra Praditya",
  headline_greeting: "PENGEMBANGAN PERANGKAT LUNAK DAN GIM · SMKN 9 SEMARANG",
  hero_display_title:
    "Merancang sistem yang menghubungkan perangkat keras fisik dengan antarmuka web modern.",
  short_bio:
    "Siswa jurusan Pengembangan Perangkat Lunak dan Gim (PPLG) di SMK Negeri 9 Semarang yang berfokus pada pengembangan aplikasi web (Front-End & Back-End) serta integrasi perangkat keras berbasis RFID.",
  about_markdown:
    "Saya adalah siswa SMK Negeri 9 Semarang jurusan Pengembangan Perangkat Lunak dan Gim (PPLG) yang memiliki antusiasme tinggi terhadap integrasi perangkat lunak dan eksplorasi komponen hardware.\n\nTerbiasa merancang alur sistem terintegrasi dan aplikasi berbasis web, saya senang membangun solusi yang menghubungkan perangkat fisik di dunia nyata—seperti terminal Console Box RFID—dengan antarmuka web yang cepat, rapi, dan mudah digunakan.",
  principles: [
    {
      index: "01",
      title: "Integrasi Fisik & Digital",
      headline: "Sistem terbaik menjembatani perangkat keras dan layar pengguna.",
      body: "Saya merakit komponen sensor elektronika sekaligus membangun antarmuka webnya agar perangkat fisik dan sistem digital berjalan selaras.",
      proof: "Console Box RFID · SMK Negeri 9 Semarang",
    },
    {
      index: "02",
      title: "Alur Sistem Terstruktur",
      headline: "Memetakan alur data yang jernih sebelum menulis kode.",
      body: "Setiap proyek dimulai dari perancangan alur sistem yang terukur dari proses input, pengolahan Back-End, hingga penyajian Front-End.",
      proof: "Front-End & Back-End Architecture",
    },
    {
      index: "03",
      title: "Belajar Cepat & Kolaboratif",
      headline: "Mengubah eksplorasi teknis menjadi solusi nyata bersama tim.",
      body: "Melalui Project-Based Learning, saya terbiasa beradaptasi cepat dengan teknologi baru dan berkomunikasi aktif dalam menyelesaikan masalah.",
      proof: "Project-Based Learning · skanilan.tech",
    },
  ],
  avatar_url: "/images/sahal-avatar.png",
  cv_url: "/files/CV_Sahal_Siraaj_Ibra_Praditya.pdf",
  email: "sahalsiraaj44@gmail.com",
  phone_or_whatsapp: "+62 856-4044-4923",
  location: "Jl. Tunggu Raya Timur II, Semarang, Jawa Tengah",
  availability_status:
    "Terbuka untuk Kolaborasi Proyek, Magang (PKL), & Eksplorasi Web/IoT",
  social_links: [
    { platform: "Website Proyek", url: "https://skanilan.tech", icon: "Globe" },
    { platform: "Email", url: "mailto:sahalsiraaj44@gmail.com", icon: "Mail" },
    { platform: "WhatsApp", url: "https://wa.me/6285640444923", icon: "Phone" },
  ],
};

export const SEED_PROJECTS = [
  {
    id: "proj-rfid-console-2026",
    index_code: "01",
    year: "2026",
    slug: "console-box-rfid-presensi-smkn9",
    title: "Console Box RFID — Sistem Presensi Siswa",
    summary:
      "Perangkat keras terminal presensi berbasis RFID yang terintegrasi dengan sistem pencatatan kehadiran siswa SMK Negeri 9 Semarang.",
    category: "IoT & Hardware",
    status_badge: "Digunakan di SMKN 9 Semarang",
    thumbnail_url: "/images/projects/rfid-console.webp",
    pipeline_steps: [
      { step: "01", label: "TAP KARTU", detail: "Pemindaian kartu RFID siswa" },
      { step: "02", label: "AKUISISI UID", detail: "Pembacaan sensor & validasi sinyal" },
      { step: "03", label: "TRANSMISI", detail: "Pengiriman data ke layanan web" },
      { step: "04", label: "REKAPITULASI", detail: "Pencatatan kehadiran otomatis" },
    ],
    story_behind: `### 01 Konteks & Masalah
Proses presensi siswa membutuhkan perangkat terminal fisik yang cepat, tahan pakai, dan terhubung langsung dengan sistem informasi sekolah agar tidak terjadi antrean maupun kesalahan pencatatan manual.

### 02 Pendekatan & Arsitektur
Dalam program Project-Based Learning (April – Juni 2026), saya merancang dan merakit **Console Box RFID** yang mengintegrasikan modul pembaca RFID dan rangkaian elektronika dasar ke dalam boks konsol yang siap ditempatkan di lingkungan sekolah.

### 03 Hasil & Dampak
Unit Console Box RFID berhasil digunakan secara langsung untuk presensi siswa SMK Negeri 9 Semarang dan terhubung dengan ekosistem pengembangan web sekolah.`,
    role: "Perancang Hardware Console Box RFID & Alur Sistem Presensi",
    tools: [
      "RFID Hardware Module",
      "Basic Electronic & Hardware",
      "System Flowchart",
      "Hardware-Web Integration",
    ],
    live_url: "https://skanilan.tech",
    repo_url: null,
    is_featured: true,
    display_order: 1,
    published: true,
  },
  {
    id: "proj-skanilan-tech-2026",
    index_code: "02",
    year: "2026",
    slug: "pengembangan-website-skanilan-tech",
    title: "Pengembangan Website skanilan.tech",
    summary:
      "Kolaborasi pengembangan antarmuka dan sistem web pada platform digital skanilan.tech dalam program Project-Based Learning.",
    category: "Fullstack",
    status_badge: "Live Production",
    thumbnail_url: "/images/projects/skanilan-web.webp",
    pipeline_steps: [
      { step: "01", label: "WEB DESIGN", detail: "Perancangan tata letak antarmuka" },
      { step: "02", label: "FRONT-END", detail: "Implementasi komponen responsif" },
      { step: "03", label: "BACK-END", detail: "Integrasi alur data & logika sistem" },
      { step: "04", label: "RILIS", detail: "Publikasi di domain skanilan.tech" },
    ],
    story_behind: `### 01 Konteks & Masalah
Mendukung kebutuhan ekosistem digital dan presensi di SMK Negeri 9 Semarang melalui platform web yang dapat diakses dengan cepat dari berbagai perangkat.

### 02 Pendekatan & Arsitektur
Berkontribusi dalam penulisan kode Front-End & Back-End serta penataan desain halaman web (Web Design) agar alur navigasi dan penyajian informasi berjalan intuitif.

### 03 Hasil & Dampak
Website dapat diakses secara publik di skanilan.tech dan menjadi fondasi kolaborasi pengembangan perangkat lunak berbasis proyek nyata.`,
    role: "Kontributor Web Developer (Front-End & Back-End Coding)",
    tools: [
      "Web Design",
      "Front-End Coding",
      "Back-End Coding",
      "Responsive UI",
    ],
    live_url: "https://skanilan.tech",
    repo_url: null,
    is_featured: true,
    display_order: 2,
    published: true,
  },
  {
    id: "proj-portfolio-3d-2026",
    index_code: "03",
    year: "2026",
    slug: "portofolio-3d-interaktif-sahal",
    title: "Portofolio 3D Interaktif & Telemetry CMS",
    summary:
      "Platform portofolio web 3D berbasis Next.js 15 dan Three.js dengan mode Hemat Animasi serta panel manajemen konten mandiri.",
    category: "Web 3D",
    status_badge: "Active System",
    thumbnail_url: "/images/projects/portfolio-3d.webp",
    pipeline_steps: [
      { step: "01", label: "SHADER 3D", detail: "Kanvas React Three Fiber" },
      { step: "02", label: "ECO MODE", detail: "Adaptive DPR & Reduced Motion" },
      { step: "03", label: "DATA LAYER", detail: "Skema terpadu Supabase" },
      { step: "04", label: "ADMIN CMS", detail: "Kelola karya & profil mandiri" },
    ],
    story_behind: `### 01 Konteks & Masalah
Menyajikan portofolio gabungan antara rekayasa perangkat lunak (Web) dan eksplorasi perangkat keras (Hardware/RFID) dalam tampilan 3D interaktif yang tetap mulus di HP maupun PC.

### 02 Pendekatan & Arsitektur
Menggunakan Next.js 15 App Router, React Three Fiber, Tailwind CSS v4, dan estetika hitam obsidian terinspirasi Opale UI dengan fitur penghentian render otomatis saat di luar layar.

### 03 Hasil & Dampak
Menghadirkan pengalaman eksplorasi karya yang responsif, hemat daya, dan dapat diperbarui kapan saja melalui panel Admin CMS.`,
    role: "Perancang Arsitektur & Full-Stack Web Developer",
    tools: [
      "Next.js 15",
      "TypeScript",
      "Three.js",
      "React Three Fiber",
      "Tailwind CSS v4",
      "Supabase",
    ],
    live_url: null,
    repo_url: null,
    is_featured: true,
    display_order: 3,
    published: true,
  },
];

export const SEED_JOURNEYS = [
  {
    id: "j-exp-1",
    type: "experience" as const,
    title: "Presensi Berbasis RFID & Web Development (Project-Based Learning)",
    organization: "SMK Negeri 9 Semarang",
    location: "Semarang, Jawa Tengah",
    start_date: "April 2026",
    end_date: "Juni 2026",
    description:
      "Membuat perangkat keras Console Box RFID yang dipergunakan untuk sistem presensi siswa SMK Negeri 9 Semarang serta berkontribusi dalam mengembangkan website skanilan.tech.",
    display_order: 1,
  },
  {
    id: "j-edu-1",
    type: "education" as const,
    title: "Jurusan Pengembangan Perangkat Lunak dan Gim (PPLG)",
    organization: "SMK Negeri 9 Semarang",
    location: "Semarang, Jawa Tengah",
    start_date: "2025",
    end_date: "Sekarang",
    description:
      "Mempelajari pengembangan aplikasi berbasis web (Front-End & Back-End), perancangan alur sistem terintegrasi, desain antarmuka web, serta eksplorasi komponen perangkat keras.",
    display_order: 2,
  },
  {
    id: "j-edu-2",
    type: "education" as const,
    title: "Pendidikan Menengah Pertama",
    organization: "SMP Negeri 33 Semarang",
    location: "Semarang, Jawa Tengah",
    start_date: "2022",
    end_date: "2025",
    description:
      "Menyelesaikan pendidikan menengah pertama dengan penguatan minat pada literasi komputer dan teknologi.",
    display_order: 3,
  },
  {
    id: "j-edu-3",
    type: "education" as const,
    title: "Pendidikan Dasar",
    organization: "MI Nasrul Fajar",
    location: "Semarang, Jawa Tengah",
    start_date: "2016",
    end_date: "2022",
    description: "Menyelesaikan pendidikan tingkat dasar di Semarang.",
    display_order: 4,
  },
];

export const SEED_SKILLS = [
  { id: "s1", name: "Front-End & Back-End Coding", category: "Web & Software", proficiency: 88, display_order: 1 },
  { id: "s2", name: "Web Design & Responsive UI", category: "Web & Software", proficiency: 90, display_order: 2 },
  { id: "s3", name: "Perancangan Alur Sistem Terintegrasi", category: "Web & Software", proficiency: 88, display_order: 3 },
  { id: "s4", name: "Basic Electronic & Hardware", category: "Hardware & IoT", proficiency: 86, display_order: 4 },
  { id: "s5", name: "Perakitan Console Box RFID", category: "Hardware & IoT", proficiency: 90, display_order: 5 },
  { id: "s6", name: "Integrasi Sensor ke Aplikasi Web", category: "Hardware & IoT", proficiency: 85, display_order: 6 },
  { id: "s7", name: "Problem Solving Teknis", category: "Profesional & Kolaborasi", proficiency: 92, display_order: 7 },
  { id: "s8", name: "Strong Communication & Teamwork", category: "Profesional & Kolaborasi", proficiency: 90, display_order: 8 },
  { id: "s9", name: "Computer Literacy", category: "Profesional & Kolaborasi", proficiency: 94, display_order: 9 },
  { id: "s10", name: "Fast Learner", category: "Profesional & Kolaborasi", proficiency: 95, display_order: 10 },
];
```
