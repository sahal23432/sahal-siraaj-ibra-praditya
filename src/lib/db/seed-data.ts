export const SEED_PROFILE = {
  id: 1,
  full_name: "Sahal Siraaj Ibra Praditya",
  headline_greeting: "PENGEMBANGAN PERANGKAT LUNAK DAN GIM · SMKN 9 SEMARANG",
  hero_display_title:
    "Merancang sistem yang menghubungkan perangkat keras fisik dengan antarmuka web modern.",
  short_bio:
    "Siswa jurusan Pengembangan Perangkat Lunak dan Gim (PPLG) di SMK Negeri 9 Semarang yang berfokus pada pengembangan aplikasi web (Front-End & Back-End) serta integrasi perangkat keras berbasis RFID.",
  about_markdown:
    "Saya adalah siswa SMK Negeri 9 Semarang jurusan Pengembangan Perangkat Lunak dan Gim (PPLG) yang memiliki antusiasme tinggi terhadap integrasi perangkat lunak dan eksplorasi komponen hardware.\n\nTerbiasa merancang alur sistem terintegrasi dan aplikasi berbasis web, saya senang membangun solusi yang menghubungkan perangkat fisik di dunia nyata seperti terminal Console Box RFID dengan antarmuka web yang cepat, rapi, dan mudah digunakan.",
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
Dalam program Project-Based Learning (April Juni 2026), saya merancang dan merakit **Console Box RFID** yang mengintegrasikan modul pembaca RFID dan rangkaian elektronika dasar ke dalam boks konsol yang siap ditempatkan di lingkungan sekolah.

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
  { id: "s5", name: "Perakitan Console Box RFID", category: "Hardware & IoT", proficiency: 90, display_order: 4 },
  { id: "s7", name: "Problem Solving Teknis", category: "Profesional & Kolaborasi", proficiency: 92, display_order: 5 },
  { id: "s8", name: "Strong Communication & Teamwork", category: "Profesional & Kolaborasi", proficiency: 90, display_order: 6 },
  { id: "s9", name: "Computer Literacy", category: "Profesional & Kolaborasi", proficiency: 94, display_order: 7 },
  { id: "s10", name: "Fast Learner", category: "Profesional & Kolaborasi", proficiency: 95, display_order: 8 },
];
