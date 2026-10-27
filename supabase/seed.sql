-- ==============================================================================
-- PORTOFOLIO 3D INTERAKTIF — SAHAL SIRAAJ IBRA PRADITYA
-- Seed Data SQL (100% Data Asli Sahal Siraaj)
-- ==============================================================================

-- 1. SEED PROFIL UTAMA
INSERT INTO profile (
  id,
  full_name,
  headline_greeting,
  hero_display_title,
  short_bio,
  about_markdown,
  principles,
  avatar_url,
  cv_url,
  email,
  phone_or_whatsapp,
  location,
  availability_status,
  social_links
) VALUES (
  1,
  'Sahal Siraaj Ibra Praditya',
  'PENGEMBANGAN PERANGKAT LUNAK DAN GIM · SMKN 9 SEMARANG',
  'Merancang sistem yang menghubungkan perangkat keras fisik dengan antarmuka web modern.',
  'Siswa jurusan Pengembangan Perangkat Lunak dan Gim (PPLG) di SMK Negeri 9 Semarang yang berfokus pada pengembangan aplikasi web (Front-End & Back-End) serta integrasi perangkat keras berbasis RFID.',
  $$Saya adalah siswa SMK Negeri 9 Semarang jurusan Pengembangan Perangkat Lunak dan Gim (PPLG) yang memiliki antusiasme tinggi terhadap integrasi perangkat lunak dan eksplorasi komponen hardware.

Terbiasa merancang alur sistem terintegrasi dan aplikasi berbasis web, saya senang membangun solusi yang menghubungkan perangkat fisik di dunia nyata seperti terminal Console Box RFID dengan antarmuka web yang cepat, rapi, dan mudah digunakan.$$,
  $$[
    {
      "index": "01",
      "title": "Integrasi Fisik & Digital",
      "headline": "Sistem terbaik menjembatani perangkat keras dan layar pengguna.",
      "body": "Saya merakit komponen sensor elektronika sekaligus membangun antarmuka webnya agar perangkat fisik dan sistem digital berjalan selaras.",
      "proof": "Console Box RFID · SMK Negeri 9 Semarang"
    },
    {
      "index": "02",
      "title": "Alur Sistem Terstruktur",
      "headline": "Memetakan alur data yang jernih sebelum menulis kode.",
      "body": "Setiap proyek dimulai dari perancangan alur sistem yang terukur dari proses input, pengolahan Back-End, hingga penyajian Front-End.",
      "proof": "Front-End & Back-End Architecture"
    },
    {
      "index": "03",
      "title": "Belajar Cepat & Kolaboratif",
      "headline": "Mengubah eksplorasi teknis menjadi solusi nyata bersama tim.",
      "body": "Melalui Project-Based Learning, saya terbiasa beradaptasi cepat dengan teknologi baru dan berkomunikasi aktif dalam menyelesaikan masalah.",
      "proof": "Project-Based Learning · skanilan.tech"
    }
  ]$$::jsonb,
  '/images/sahal-avatar.png',
  '/files/CV_Sahal_Siraaj_Ibra_Praditya.pdf',
  'sahalsiraaj44@gmail.com',
  '+62 856-4044-4923',
  'Jl. Tunggu Raya Timur II, Semarang, Jawa Tengah',
  'Terbuka untuk Kolaborasi Proyek, Magang (PKL), & Eksplorasi Web/IoT',
  $$[
    {"platform": "Website Proyek", "url": "https://skanilan.tech", "icon": "Globe"},
    {"platform": "Email", "url": "mailto:sahalsiraaj44@gmail.com", "icon": "Mail"},
    {"platform": "WhatsApp", "url": "https://wa.me/6285640444923", "icon": "Phone"}
  ]$$::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  headline_greeting = EXCLUDED.headline_greeting,
  hero_display_title = EXCLUDED.hero_display_title,
  short_bio = EXCLUDED.short_bio,
  about_markdown = EXCLUDED.about_markdown,
  principles = EXCLUDED.principles,
  avatar_url = EXCLUDED.avatar_url,
  cv_url = EXCLUDED.cv_url,
  email = EXCLUDED.email,
  phone_or_whatsapp = EXCLUDED.phone_or_whatsapp,
  location = EXCLUDED.location,
  availability_status = EXCLUDED.availability_status,
  social_links = EXCLUDED.social_links,
  updated_at = now();

-- 2. SEED DAFTAR KARYA / PROYEK
INSERT INTO projects (
  id,
  index_code,
  year,
  slug,
  title,
  summary,
  category,
  status_badge,
  thumbnail_url,
  pipeline_steps,
  story_behind,
  role,
  tools,
  live_url,
  repo_url,
  is_featured,
  display_order,
  published
) VALUES
(
  'proj-rfid-console-2026',
  '01',
  '2026',
  'console-box-rfid-presensi-smkn9',
  'Console Box RFID — Sistem Presensi Siswa',
  'Perangkat keras terminal presensi berbasis RFID yang terintegrasi dengan sistem pencatatan kehadiran siswa SMK Negeri 9 Semarang.',
  'IoT & Hardware',
  'Digunakan di SMKN 9 Semarang',
  '/images/projects/rfid-console.webp',
  $$[
    {"step": "01", "label": "TAP KARTU", "detail": "Pemindaian kartu RFID siswa"},
    {"step": "02", "label": "AKUISISI UID", "detail": "Pembacaan sensor & validasi sinyal"},
    {"step": "03", "label": "TRANSMISI", "detail": "Pengiriman data ke layanan web"},
    {"step": "04", "label": "REKAPITULASI", "detail": "Pencatatan kehadiran otomatis"}
  ]$$::jsonb,
  $$### 01 Konteks & Masalah
Proses presensi siswa membutuhkan perangkat terminal fisik yang cepat, tahan pakai, dan terhubung langsung dengan sistem informasi sekolah agar tidak terjadi antrean maupun kesalahan pencatatan manual.

### 02 Pendekatan & Arsitektur
Dalam program Project-Based Learning (April Juni 2026), saya merancang dan merakit **Console Box RFID** yang mengintegrasikan modul pembaca RFID dan rangkaian elektronika dasar ke dalam boks konsol yang siap ditempatkan di lingkungan sekolah.

### 03 Hasil & Dampak
Unit Console Box RFID berhasil digunakan secara langsung untuk presensi siswa SMK Negeri 9 Semarang dan terhubung dengan ekosistem pengembangan web sekolah.$$,
  'Perancang Hardware Console Box RFID & Alur Sistem Presensi',
  ARRAY['RFID Hardware Module', 'Basic Electronic & Hardware', 'System Flowchart', 'Hardware-Web Integration'],
  'https://skanilan.tech',
  NULL,
  true,
  1,
  true
),
(
  'proj-skanilan-tech-2026',
  '02',
  '2026',
  'pengembangan-website-skanilan-tech',
  'Pengembangan Website skanilan.tech',
  'Kolaborasi pengembangan antarmuka dan sistem web pada platform digital skanilan.tech dalam program Project-Based Learning.',
  'Fullstack',
  'Live Production',
  '/images/projects/skanilan-web.webp',
  $$[
    {"step": "01", "label": "WEB DESIGN", "detail": "Perancangan tata letak antarmuka"},
    {"step": "02", "label": "FRONT-END", "detail": "Implementasi komponen responsif"},
    {"step": "03", "label": "BACK-END", "detail": "Integrasi alur data & logika sistem"},
    {"step": "04", "label": "RILIS", "detail": "Publikasi di domain skanilan.tech"}
  ]$$::jsonb,
  $$### 01 Konteks & Masalah
Mendukung kebutuhan ekosistem digital dan presensi di SMK Negeri 9 Semarang melalui platform web yang dapat diakses dengan cepat dari berbagai perangkat.

### 02 Pendekatan & Arsitektur
Berkontribusi dalam penulisan kode Front-End & Back-End serta penataan desain halaman web (Web Design) agar alur navigasi dan penyajian informasi berjalan intuitif.

### 03 Hasil & Dampak
Website dapat diakses secara publik di skanilan.tech dan menjadi fondasi kolaborasi pengembangan perangkat lunak berbasis proyek nyata.$$,
  'Kontributor Web Developer (Front-End & Back-End Coding)',
  ARRAY['Web Design', 'Front-End Coding', 'Back-End Coding', 'Responsive UI'],
  'https://skanilan.tech',
  NULL,
  true,
  2,
  true
),
(
  'proj-portfolio-3d-2026',
  '03',
  '2026',
  'portofolio-3d-interaktif-sahal',
  'Portofolio 3D Interaktif & Telemetry CMS',
  'Platform portofolio web 3D berbasis Next.js 15 dan Three.js dengan mode Hemat Animasi serta panel manajemen konten mandiri.',
  'Web 3D',
  'Active System',
  '/images/projects/portfolio-3d.webp',
  $$[
    {"step": "01", "label": "SHADER 3D", "detail": "Kanvas React Three Fiber"},
    {"step": "02", "label": "ECO MODE", "detail": "Adaptive DPR & Reduced Motion"},
    {"step": "03", "label": "DATA LAYER", "detail": "Skema terpadu Supabase"},
    {"step": "04", "label": "ADMIN CMS", "detail": "Kelola karya & profil mandiri"}
  ]$$::jsonb,
  $$### 01 Konteks & Masalah
Menyajikan portofolio gabungan antara rekayasa perangkat lunak (Web) dan eksplorasi perangkat keras (Hardware/RFID) dalam tampilan 3D interaktif yang tetap mulus di HP maupun PC.

### 02 Pendekatan & Arsitektur
Menggunakan Next.js 15 App Router, React Three Fiber, Tailwind CSS v4, dan estetika hitam obsidian terinspirasi Opale UI dengan fitur penghentian render otomatis saat di luar layar.

### 03 Hasil & Dampak
Menghadirkan pengalaman eksplorasi karya yang responsif, hemat daya, dan dapat diperbarui kapan saja melalui panel Admin CMS.$$,
  'Perancang Arsitektur & Full-Stack Web Developer',
  ARRAY['Next.js 15', 'TypeScript', 'Three.js', 'React Three Fiber', 'Tailwind CSS v4', 'Supabase'],
  NULL,
  NULL,
  true,
  3,
  true
)
ON CONFLICT (id) DO UPDATE SET
  index_code = EXCLUDED.index_code,
  year = EXCLUDED.year,
  slug = EXCLUDED.slug,
  title = EXCLUDED.title,
  summary = EXCLUDED.summary,
  category = EXCLUDED.category,
  status_badge = EXCLUDED.status_badge,
  thumbnail_url = EXCLUDED.thumbnail_url,
  pipeline_steps = EXCLUDED.pipeline_steps,
  story_behind = EXCLUDED.story_behind,
  role = EXCLUDED.role,
  tools = EXCLUDED.tools,
  live_url = EXCLUDED.live_url,
  repo_url = EXCLUDED.repo_url,
  is_featured = EXCLUDED.is_featured,
  display_order = EXCLUDED.display_order,
  published = EXCLUDED.published,
  updated_at = now();

-- 3. SEED PERJALANAN / RIWAYAT (JOURNEYS)
INSERT INTO journeys (
  id,
  type,
  title,
  organization,
  location,
  start_date,
  end_date,
  description,
  display_order
) VALUES
(
  'j-exp-1',
  'experience',
  'Presensi Berbasis RFID & Web Development (Project-Based Learning)',
  'SMK Negeri 9 Semarang',
  'Semarang, Jawa Tengah',
  'April 2026',
  'Juni 2026',
  'Membuat perangkat keras Console Box RFID yang dipergunakan untuk sistem presensi siswa SMK Negeri 9 Semarang serta berkontribusi dalam mengembangkan website skanilan.tech.',
  1
),
(
  'j-edu-1',
  'education',
  'Jurusan Pengembangan Perangkat Lunak dan Gim (PPLG)',
  'SMK Negeri 9 Semarang',
  'Semarang, Jawa Tengah',
  '2025',
  'Sekarang',
  'Mempelajari pengembangan aplikasi berbasis web (Front-End & Back-End), perancangan alur sistem terintegrasi, desain antarmuka web, serta eksplorasi komponen perangkat keras.',
  2
),
(
  'j-edu-2',
  'education',
  'Pendidikan Menengah Pertama',
  'SMP Negeri 33 Semarang',
  'Semarang, Jawa Tengah',
  '2022',
  '2025',
  'Menyelesaikan pendidikan menengah pertama dengan penguatan minat pada literasi komputer dan teknologi.',
  3
),
(
  'j-edu-3',
  'education',
  'Pendidikan Dasar',
  'MI Nasrul Fajar',
  'Semarang, Jawa Tengah',
  '2016',
  '2022',
  'Menyelesaikan pendidikan tingkat dasar di Semarang.',
  4
)
ON CONFLICT (id) DO UPDATE SET
  type = EXCLUDED.type,
  title = EXCLUDED.title,
  organization = EXCLUDED.organization,
  location = EXCLUDED.location,
  start_date = EXCLUDED.start_date,
  end_date = EXCLUDED.end_date,
  description = EXCLUDED.description,
  display_order = EXCLUDED.display_order;

-- 4. SEED MATRIKS KEAHLIAN (SKILLS)
INSERT INTO skills (
  id,
  name,
  category,
  proficiency,
  display_order
) VALUES
('s1', 'Front-End & Back-End Coding', 'Web & Software', 88, 1),
('s2', 'Web Design & Responsive UI', 'Web & Software', 90, 2),
('s3', 'Perancangan Alur Sistem Terintegrasi', 'Web & Software', 88, 3),
('s5', 'Perakitan Console Box RFID', 'Hardware & IoT', 90, 4),
('s7', 'Problem Solving Teknis', 'Profesional & Kolaborasi', 92, 5),
('s8', 'Strong Communication & Teamwork', 'Profesional & Kolaborasi', 90, 6),
('s9', 'Computer Literacy', 'Profesional & Kolaborasi', 94, 7),
('s10', 'Fast Learner', 'Profesional & Kolaborasi', 95, 8)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  category = EXCLUDED.category,
  proficiency = EXCLUDED.proficiency,
  display_order = EXCLUDED.display_order;
