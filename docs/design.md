# Design System & UI/UX Specification (`design.md`)

**Referensi Visual Utama:** [Elyes Rayane Melbouci Portfolio](https://www.melboucierayane.com/) ([Awwwards Showcase](https://www.awwwards.com/sites/elyes-rayane-portfolio) · [Opale UI Design System](https://opale-ui.design/))  
**Diselaraskan dengan:** `PRD_Portofolio_3D_Interaktif.md` (Fase 1 s.d. Fase 4)  
**Target Pembaca:** AI Coding Agent (Cursor, Windsurf, Claude Code, v0, Bolt) & Frontend Engineer

## 1. Filosofi Desain & Karakter Visual (*Editorial Engineering & Shader Craft*)

Gaya visual [melboucierayane.com](https://www.melboucierayane.com/) mengusung estetika **Editorial Engineering & Dark Telemetry** yang dibangun di atas sistem desain [Opale UI](https://opale-ui.design/) (Next.js, React, Three.js Shader Scenes, Tailwind CSS v4, Framer Motion, dan GSAP). Alih-alih menampilkan dekorasi 3D yang ramai dan mengganggu keterbacaan, desain ini memadukan:

1. **Kanvas 3D Berbasis Shader yang Atmosferik**: Objek 3D/WebGL di latar Beranda bertindak sebagai *focal point* yang tenang, bereaksi halus terhadap kursor dan *scroll*, serta memberikan kedalaman ruang di balik tipografi utama.
2. **Tipografi Editorial Berkontras Tinggi**: Perpaduan antara *judul display* berukuran besar yang tegas, teks narasi pendek yang padat makna, serta label metadata berhuruf *monospace* (nomor urut `01`, `02`, tahun `2026`, status `In production`, dan metrik telemetri).
3. **Bukti Kerja Interaktif (*Live Telemetry & Artifact Cards*)**: Setiap karya tidak hanya memajang gambar statis, tetapi juga menampilkan visualisasi alur sistem (*pipeline steps*, log evaluasi, atau cuplikan struktur data/JSON) berdampingan dengan galeri media.
4. **Kejelasan Peran & Dampak (*Zero-Fluff Case Studies*)**: Setiap kartu karya secara eksplisit memisahkan cerita masalah/solusi, baris **"Peran Saya (*My part*)"**, deretan alat yang dipakai (*dipisahkan titik tengah `·`*), dan tautan eksternal berikon panah diagonal (`↗`).

## 2. Sistem Token Desain (Tailwind CSS v4 & CSS Variables)

AI Coding Agent wajib mendeklarasikan token warna, tipografi, dan efek permukaan berikut di `src/app/globals.css` agar seluruh halaman publik dan panel Admin CMS memiliki nuansa visual yang seragam:

### Palet Warna (*Obsidian Monochrome & Precision Accents*)

| Token CSS / Tailwind | Nilai Hex / RGBA | Penggunaan Spesifik pada Komponen |
| :--- | :--- | :--- |
| `--bg-canvas` | `#070709` | Latar belakang utama halaman dan warna dasar `<Canvas>` Three.js. |
| `--bg-surface-1` | `#0D0E12` | Permukaan kartu karya, panel lini masa profil, dan kotak formulir kontak. |
| `--bg-surface-2` | `#14161D` | Permukaan sub-elemen di dalam kartu (blok telemetri/kode, *pill* keahlian, *hover state*). |
| `--bg-glass` | `rgba(13, 14, 18, 0.72)` | *Floating navbar*, panel *sticky* Detail Karya, dan *modal lightbox* (`backdrop-blur-md`). |
| `--border-subtle` | `rgba(255, 255, 255, 0.08)` | Garis tepi kartu (`1px solid`), pembatas antar-pengalaman, dan garis kisi (*grid lines*). |
| `--border-hover` | `rgba(255, 255, 255, 0.22)` | Garis tepi aktif saat kartu karya disentuh/di-*hover* atau input formulir difokuskan. |
| `--text-primary` | `#F4F4F6` | Judul utama, nama pemilik portofolio, judul karya, dan teks *highlight*. |
| `--text-secondary` | `#A1A1AA` | Paragraf cerita di balik karya, deskripsi pengalaman, dan ringkasan diri. |
| `--text-muted` | `#63636E` | Nomor indeks (`01`, `02`), tahun (`2026`), label bagian, dan pemisah titik (`·`). |
| `--accent-primary` | `#EDEDEF` | Tombol CTA utama (*high-contrast light pill button* dengan teks `#070709`). |
| `--status-live` | `#10B981` | Indikator hijau (*In production*, *Shipped*, *VERIFIED*, dan status *Tersedia Berkolaborasi*). |
| `--status-beta` | `#F59E0B` | Indikator kuning/amber (*Private beta*, *PENDING*, atau mode *Hemat Animasi* aktif). |

### Sistem Tipografi & Skala Ukuran

Gunakan kombinasi 3 keluarga huruf melalui `next/font/google` atau *local font*:
* **Font Display & Heading (`--font-display`)**: `Inter Tight`, `Geist`, atau `Instrument Serif` (untuk aksen kata kunci di judul Hero) — `tracking-tight` (`-0.03em`), `font-medium` hingga `font-semibold`.
* **Font Body (`--font-sans`)**: `Geist Sans` atau `Inter` — keterbacaan tinggi pada latar gelap, `leading-relaxed` (`1.65`).
* **Font Telemetry & Metadata (`--font-mono`)**: `Geist Mono` atau `JetBrains Mono` — wajib digunakan untuk penomoran (`01`, `02`), rentang tanggal (`Jul 2025 — Present`), lencana status (`IN PRODUCTION`), daftar *tech stack*, dan penghitung telemetri di *navbar*.

| Elemen Tipografi | Kelas Tailwind Standar | Karakteristik Gaya [melboucierayane.com](https://www.melboucierayane.com/) |
| :--- | :--- | :--- |
| **Hero Hook (Pre-title)** | `font-mono text-xs uppercase tracking-widest text-zinc-400` | Kalimat pembuka singkat di atas judul besar (contoh: *"I learned engineering from broken things"*). |
| **Hero Display Title** | `text-4xl sm:text-6xl lg:text-7xl font-medium tracking-tight leading-[1.05]` | Kalimat pernyataan diri yang kuat dengan animasi *word-by-word reveal*. |
| **Section Header** | `text-2xl sm:text-4xl font-medium tracking-tight text-zinc-100` | Disertai penghitung jumlah item dalam huruf mono di sampingnya (contoh: `Systems` · `04 systems`). |
| **Project Index & Year** | `font-mono text-xs text-zinc-500 tabular-nums` | Format dua digit nomor + tahun (contoh: `01 / 2026` atau `[ENG-001]`). |
| **Body Narrative** | `text-sm sm:text-base text-zinc-400 leading-relaxed max-w-2xl` | Paragraf pendek (maksimal 3–4 kalimat per blok) agar mudah dipindai rekruter. |
| **Tech Stack Bar** | `font-mono text-xs text-zinc-400` | Item dipisahkan oleh titik tengah `·` (contoh: `Next.js · React 19 · Three.js · Tailwind v4`). |

## 3. Pemetaan Desain Komponen ke 7 Modul PRD

Bagian ini menerjemahkan pola UI/UX [melboucierayane.com](https://www.melboucierayane.com/) langsung ke dalam 7 modul dan 27 sub-fitur pada `PRD_Portofolio_3D_Interaktif.md`:

### Modul 1: Beranda 3D Interaktif (Fase 1)

1. **Menu Navigasi Utama (*Top Telemetry Navbar*)**:
   - Bilah navigasi *sticky* di bagian atas (`h-16 px-6 backdrop-blur-md bg-[#070709]/70 border-b border-white/[0.06]`).
   - **Sisi Kiri**: Nama pemilik portofolio + indikator telemetri interaktif berhuruf *monospace* (mengadaptasi elemen *"97.9 trillion synapses fired while you're here"* menjadi penghitung waktu nyata seperti jumlah *frame* WebGL yang dirender atau waktu kunjungan aktif).
   - **Sisi Tengah**: Tautan jangkar huruf kecil/bersih (`karya`, `profil`, `keahlian`, `kontak`).
   - **Sisi Kanan**: Sakelar **Hemat Animasi** (pil berikon petir/baterai dengan status `60 FPS` / `ECO`) dan tombol CTA primer `Mari Bicara ↗`.
2. **Hero Animasi 3D**:
   - Kanvas `<Canvas3DWrapper />` memenuhi latar bagian Hero (`min-h-[92vh]`).
   - Menampilkan objek/medan 3D berbasis *custom shader* atau geometri organik gelap bertekstur *wireframe/point-cloud/glass* yang bergeser halus mengikuti posisi kursor (*mouse parallax lerping*) dan kedalaman gulir (*scroll progress*).
   - Di atas kanvas 3D, terapkan *radial vignette gradient* (`bg-radial from-transparent via-[#070709]/40 to-[#070709]`) agar teks putih di atasnya selalu memiliki kontras sempurna.
3. **Sapaan & Ringkasan Diri**:
   - Baris atas: Kalimat pembuka filosofis singkat (`profile.headline_greeting`).
   - Baris utama: Pernyataan nilai utama berukuran besar (mengadaptasi gaya *"I build machines that read the world"*).
   - Baris metadata bawah: `Nama Lengkap` — `Peran Utama / Spesialisasi / Lokasi` (contoh: `Creative Frontend & 3D Web Developer / Jawa Tengah, Indonesia`).
4. **Tombol Aksi Utama (CTA) & Indikator Gulir**:
   - Tombol primer kontras tinggi (`Lihat Karya`) dan tombol sekunder bergaris tepi tipis (`Mari Berkolaborasi`), dilengkapi indikator `scroll down ↓` berhuruf *monospace* di tepi bawah layar.

### Modul 2: Galeri Karya (Fase 1)

1. **Header Bagian & Filter Kategori**:
   - Mengadaptasi pengelompokan karya pada [melboucierayane.com](https://www.melboucierayane.com/) (*Systems* vs *Open Source*) menjadi bilah **Filter Kategori** interaktif (`Semua`, `Web 3D`, `Fullstack`, `UI/UX`, `Open Source`) lengkap dengan lencana jumlah proyek (`06 karya`).
   - Dilengkapi kolom pencarian cepat berhuruf *monospace* di sisi kanan bilah filter.
2. **Daftar Karya (*Numbered Editorial Project Cards*)**:
   - Setiap kartu proyek menampilkan struktur 4 lapis khas [melboucierayane.com](https://www.melboucierayane.com/):
     - **Baris Metadata Atas**: Nomor urut dua digit + tahun (`01 · 2026`) di kiri, dan lencana status di kanan (`Unggulan`, `Live Production`, atau `Open Source`).
     - **Judul & Subjudul Satu Baris**: Judul karya berukuran `text-2xl font-medium text-zinc-100` diikuti satu kalimat proposisi nilai (`project.summary`).
     - **Pratinjau Visual / Interaktif**: Thumbnail gambar/video resolusi tinggi **atau** blok pratinjau alur sistem interaktif (*pipeline preview* / struktur skema).
     - **Baris Peran & Alat**: Kalimat `Peran saya: [project.role]` di atas deretan teknologi yang dipisahkan titik tengah (`Next.js · Three.js · TypeScript · Supabase`) serta tautan aksi `Lihat Detail ↗` dan `Live Demo ↗`.
3. **Kartu Bereaksi Saat Disentuh (*Hover & Touch Micro-interactions*)**:
   - Saat kursor menyentuh kartu di PC: garis tepi kartu menyala halus (`border-white/20`), sorotan cahaya radial (*spotlight radial gradient*) mengikuti posisi kursor di permukaan kartu, dan kemiringan perspektif 3D halus (*max tilt 3 derajat*) aktif.
   - Saat disentuh di HP: kartu memberikan respons tekan `scale-[0.99]` yang responsif tanpa mengganggu gerakan gulir vertikal.

### Modul 3: Detail Karya — Rute `/karya/[slug]` (Fase 2)

1. **Header Studi Kasus & Status Proyek**:
   - Menampilkan nomor indeks proyek, tahun, lencana kategori, judul besar, ringkasan eksekutif, serta tombol cepat menuju `Live Site ↗` dan `Source Code ↗` (beserta jumlah bintang GitHub jika ada).
2. **Galeri Gambar, Video & Blok Telemetri Arsitektur**:
   - Menyajikan *carousel* atau *grid* gambar dan video karya dengan fitur *lightbox zoom*.
   - Mengadopsi fitur khas [melboucierayane.com](https://www.melboucierayane.com/): menyediakan komponen **Diagram Alur Sistem / Pipeline Block** (misal: `01 INPUT → 02 PROSES 3D → 03 OPTIMASI → 04 HASIL`) dengan gaya terminal/telemetri gelap agar rekruter memahami cara kerja sistem di balik layar.
3. **Cerita di Balik Karya (*Structured Narrative*)**:
   - Dibagi menjadi blok bernomor `01 Konteks & Masalah`, `02 Pendekatan & Arsitektur`, dan `03 Hasil & Metrik Performa` agar tidak berupa dinding teks panjang.
4. **Sidebar Peran & Alat yang Dipakai**:
   - Panel *sticky* di sisi kanan (desktop) yang menampilkan secara tegas **Peran Spesifik (`My part`)**, daftar alat/teknologi dengan lencana *monospace*, serta navigasi **Karya Selanjutnya →** di bagian bawah.

### Modul 4: Profil & Perjalanan (Fase 2)

1. **Tentang Saya & Prinsip Kerja (*"How I Build" 3-Column Manifesto*)**:
   - Mengadaptasi bagian *"How I build"* dari [melboucierayane.com](https://www.melboucierayane.com/): selain paragraf biografi singkat dan tombol **Unduh CV (PDF)**, tampilkan 3 kartu prinsip kerja bernomor (`01`, `02`, `03`):
     - Contoh: `01 Arsitektur Sebelum Visual`, `02 Performa yang Terukur`, `03 Detail Interaksi`.
     - Setiap kartu memiliki judul tegas, penjelasan 2–3 kalimat, dan satu baris *proof badge* berhuruf *monospace* di bagian bawah kartu.
2. **Pengalaman & Pendidikan (*Grouped Organization Timeline*)**:
   - Mengikuti pola lini masa [melboucierayane.com](https://www.melboucierayane.com/) yang mengelompokkan riwayat berdasarkan **Institusi/Perusahaan & Lokasi** (misal: `Nama Perusahaan / Kota`), lalu mendaftar setiap jabatan di bawahnya lengkap dengan rentang bulan-tahun (`Mei 2024 — Sekarang`) di sisi kanan dan paragraf dampak kerja yang konkret.
   - Menyediakan tab atau pemisah bersih antara **Pengalaman Kerja** dan **Pendidikan & Sertifikasi**.
3. **Keahlian (*Interactive Stack Matrix*)**:
   - Menampilkan matriks keahlian yang dikelompokkan per domain (`3D & WebGL`, `Frontend`, `Backend`, `Tools`) dalam bentuk *pill* minimalis bergaris tepi `border-white/10` yang menyala saat di-*hover* (mengadaptasi deretan *Stack* `Go`, `Python`, `TypeScript`, `React`, `Next.js`, `Three.js` di bagian bawah halaman referensi).

### Modul 5: Kontak & Kolaborasi (Fase 3)

1. **Headline Ajakan Kolaborasi**:
   - Mengadaptasi kalimat penutup lugas *"If you're building something that matters, let's talk."* menjadi pernyataan ajakan kolaborasi yang hangat dan profesional, disertai lencana **Status Ketersediaan** (titik hijau berdenyut + teks dari `profile.availability_status`).
2. **Formulir Kontak & Info Kontak Langsung (Tata Letak 2 Kolom)**:
   - **Kolom Kiri**: Info kontak langsung berupa tombol salin email satu klik (`email@domain.com` + ikon salin dengan umpan balik *toast* `"Email disalin"`), lokasi/zona waktu (`WIB / UTC+7`), serta deretan **Tautan Media Sosial** (`GitHub ↗`, `LinkedIn ↗`, `Instagram ↗`, `X ↗`).
   - **Kolom Kanan**: **Formulir Kontak** minimalis bergaya *dark-surface* (`Nama`, `Email`, `Subjek`, `Pesan`) dengan garis tepi tipis `border-white/10`, fokus cincin putih halus, validasi pesan *error* berhuruf *monospace*, dan tombol kirim kontras tinggi.

### Modul 6: Kelola Konten / Admin CMS (Fase 3)

Agar panel `/admin/*` menyatu dengan estetika portofolio utama, gunakan bahasa desain **Telemetry Cockpit** yang terinspirasi dari blok evaluasi pada [melboucierayane.com](https://www.melboucierayane.com/):
1. **Masuk Admin (`/admin/login`)**: Kartu autentikasi minimalis di tengah layar dengan latar belakang *dot-grid* gelap, input berhuruf *monospace* untuk email/kata sandi, dan proteksi sesi penuh.
2. **Dashboard & Kotak Masuk Pesan (`/admin`)**: Menampilkan kartu metrik ringkas (`Total Karya`, `Karya Unggulan`, `Pesan Belum Dibaca`, `Status Ketersediaan`) serta tabel pesan masuk dari pengunjung.
3. **Kelola Daftar Karya & Isi Profil (`/admin/karya` & `/admin/profil`)**:
   - Tabel daftar karya menggunakan lencana status bergaya telemetri (`PUBLISHED` hijau, `DRAFT` abu-abu, `FEATURED` emas).
   - Formulir editor dilengkapi *live Markdown preview* berdampingan untuk menulis **Cerita di Balik Karya** dan pengunggah *drag-and-drop* untuk gambar, video, CV, serta model `.glb`.

### Modul 7: Animasi & Performa (Fase 4 — Diintegrasikan Sejak Awal)

1. **Mulus di HP & PC**:
   - Tata letak menggunakan kontainer `max-w-5xl mx-auto px-5 sm:px-8` sehingga baris teks tidak pernah terlalu lebar di monitor besar dan tetap lega di layar HP (`375px`).
   - Kanvas 3D menurunkan *pixel ratio* ke `dpr={[1, 1.5]}` secara otomatis pada layar kepadatan tinggi.
2. **Hemat Animasi (*Eco / Reduced Motion Mode*)**:
   - Jika pengguna mengaktifkan tombol **Hemat Animasi** di *navbar* atau sistem operasi mengirim `prefers-reduced-motion: reduce`:
     - Kanvas Three.js beralih ke `frameloop="demand"` (hanya merender 1 *frame* statis tanpa membebani GPU/baterai).
     - Penghitung telemetri cepat dan animasi *tilt* kartu dinonaktifkan, digantikan transisi *opacity* sederhana.
3. **Muat Cepat**:
   - Kanvas WebGL dimuat secara *lazy* (`next/dynamic` tanpa SSR), sedangkan seluruh teks **Sapaan**, **Daftar Karya**, dan **Profil** langsung tampil dari *Server Component* dalam waktu `< 1,2 detik`.

## 4. Spesifikasi Gerak & Easing (Framer Motion / GSAP)

AI Coding Agent wajib menggunakan parameter kurva gerak berikut agar transisi terasa tenang, presisi, dan tidak memantul berlebihan (*no bouncy springs*):

* **Kurva Easing Standar**: `cubic-bezier(0.22, 1, 0.36, 1)` (atau `[0.22, 1, 0.36, 1]` di Framer Motion) dengan durasi `0.5s` untuk kemunculan elemen saat digulir (*scroll reveal*).
* **Reveals Berurutan (*Staggered Children*)**: Jeda `0.06s` antar-kata pada judul Hero dan `0.08s` antar-kartu pada **Galeri Karya** serta **Pengalaman & Pendidikan**.
* **Interaksi Sentuh & Hover Kartu**: Transisi `150ms ease-out` untuk perubahan warna *border* dan sorotan cahaya kursor (*radial spotlight*).
* **Kemiringan Kamera 3D (*Mouse Parallax*)**: Gunakan interpolasi linear (`THREE.MathUtils.lerp(current, target, 0.05)`) di dalam `useFrame` agar pergerakan objek 3D selalu mulus tanpa patah-patah.

## 5. Checklist Kepatuhan Visual bagi AI Coding Agent

Sebelum menyelesaikan setiap tahap kode pada PRD, AI Agent wajib memastikan:
* [ ] Tidak ada warna latar ungu/biru neon generik; gunakan palet hitam obsidian (`#070709` dan `#0D0E12`) dengan garis tepi tipis `border-white/[0.08]`.
* [ ] Setiap bagian utama memiliki nomor urut dua digit (`01`, `02`, `03`, `04`) dan penghitung jumlah item berhuruf *monospace* seperti pada [melboucierayane.com](https://www.melboucierayane.com/).
* [ ] Setiap kartu karya wajib mencantumkan baris eksplisit **"Peran saya:"** dan deretan **Alat yang Dipakai** yang dipisahkan oleh titik tengah (`·`).
* [ ] Sakelar **Hemat Animasi** terlihat jelas di bilah navigasi atas dan benar-benar menghentikan *render loop* Three.js saat diaktifkan.
