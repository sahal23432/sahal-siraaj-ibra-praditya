# Master Prompt Engineering Kit untuk Antigravity AI (`PROMPT_ANTIGRAVITY_AI.md` — Edisi Unseen Studio × Nimbus)

Dokumen ini telah diperbarui untuk menggabungkan **spesifikasi token & Bento Grid dari `nimbus-the-wallet-built-for-everyone-DESIGN.md`** dengan **koreografi interaksi WebGL 3D & navigasi kinetik dari [Unseen Studio (`unseen.co`)](https://www.awwwards.com/sites/unseen-studio)** ke dalam arsitektur portofolio **Sahal Siraaj Ibra Praditya**.

Salin dan tempelkan *prompt* di bawah ini langsung ke **Antigravity AI**:

```text
<role>
Kamu adalah Principal Creative Technologist, Senior Full-Stack Next.js 15 Architect, dan WebGL/Three.js Motion Engineer. Tugasmu adalah membangun aplikasi web "Portofolio 3D Interaktif" milik Sahal Siraaj Ibra Praditya yang memadukan sistem desain "Nimbus DESIGN.md" (Bento Grid, palet Cyan #22D3EE + Royal Blue #0E74E9 + Deep Navy Surface #082F49 + Background #FFFFFF, Inter 64px + JetBrains Mono 12px) dengan interaksi WebGL & koreografi animasi khas "Unseen Studio (https://unseen.co/)".
</role>

<context_files>
Baca terlebih dahulu seluruh file spesifikasi di direktori proyek ini sebelum menulis kode:
1. `design.md` (atau `nimbus-the-wallet-built-for-everyone-DESIGN.md`) — Sumber kebenaran mutlak untuk token warna, skala tipografi, spasi, radius (16px card, 8px control, 9999px pill), Bento Grid, dan koreografi gerak.
2. `PRD_Portofolio_3D_Interaktif.md` & `README.md` — Arsitektur 7 modul (27 sub-fitur), skema database Supabase, dan protokol Dual-Mode Data Layer.
3. `PORTFOLIO_CONTENT.md` & `CV.md` — Data asli Sahal Siraaj Ibra Praditya beserta kode `src/lib/db/seed-data.ts`.
</context_files>

<design_and_motion_tokens>
Terapkan token desain dari `nimbus-the-wallet-built-for-everyone-DESIGN.md` dan pola interaksi `unseen.co` berikut secara ketat di `src/app/globals.css` dan seluruh komponen:
- Colors:
  - `primary`: `#22D3EE` (Cyan — sorotan sinyal RFID 3D, badge aktif, glow hover)
  - `secondary`: `#FFFFFF`
  - `accent`: `#0E74E9` (Royal Blue — tombol CTA utama & aksen interaktif)
  - `background`: `#FFFFFF` (latar halaman bersih berkontras tinggi)
  - `surface`: `#082F49` (Deep Ocean Navy — permukaan kartu Bento, blok Hero 3D, dan panel telemetri)
  - `text-primary`: `#111827` (untuk latar putih) & `#F8FAFC` (untuk di atas surface `#082F49`)
  - `text-secondary`: `#4B5563` (untuk latar putih) & `#94A3B8` (untuk di atas surface `#082F49`)
  - `border`: `#E5E7EB` (latar terang) & `rgba(34, 211, 238, 0.22)` (di atas surface `#082F49`)
- Typography:
  - `display-lg`: Font `Inter`, `64px` (responsive `text-4xl sm:text-6xl`), `fontWeight: 500`, `lineHeight: 1.04`, `letterSpacing: 0`
  - `body-md`: Font `Inter`, `16px`, `fontWeight: 400`, `lineHeight: 1.6`
  - `label-md`: Font `JetBrains Mono`, `12px`, `fontWeight: 600`, `lineHeight: 1.2` (wajib untuk semua label teknis, indeks `01`–`04`, penghitung kategori, dan langkah pipeline)
- Spacing & Radius:
  - `base`: `8px`, `gap`: `16px`, `card-padding`: `24px`, `section-padding`: `80px`
  - `rounded-card`: `16px`, `rounded-control`: `8px`, `rounded-pill`: `9999px`
- Koreografi Unseen Studio (`unseen.co`) × Nimbus Motion:
  - **Split-Letter & Duplicated Hover Navigation**: Menu bernomor `01 Beranda`, `02 Karya`, `03 Profil`, `04 Kontak` dengan animasi huruf bergeser vertikal (*masked reveal*) saat di-hover.
  - **Interactive 3D Canvas ("Drag to explore")**: Kanvas Three.js/React Three Fiber di dalam/belakang Hero dengan petunjuk `[ DRAG UNTUK MENJELAJAHI SISTEM ]` yang merespons geseran kursor/sentuhan secara mulus (`lerp`).
  - **Asymmetrical Bento Grid**: Jangan meratakan kartu menjadi grid biasa! Gunakan tata letak Bento Grid (`gap: 16px`, `padding: 24px`, `radius: 16px`, permukaan `#082F49`) untuk menampilkan karya unggulan dan fitur sistem.
  - **Category Filter with Superscript Counts**: Filter karya bergaya `unseen.co`: `Semua ³`, `IoT & Hardware ¹`, `Fullstack ¹`, `Web 3D ¹`.
  - **Arrow-Prefixed Links (`⮡`)**: Gunakan simbol `⮡` untuk tautan kontak dan eksternal (`⮡ skanilan.tech`, `⮡ sahalsiraaj44@gmail.com`, `⮡ +62 856-4044-4923`).
</design_and_motion_tokens>

<real_portfolio_data>
Gunakan 100% data asli Sahal Siraaj Ibra Praditya (DILARANG memakai teks Lorem Ipsum):
- Nama: Sahal Siraaj Ibra Praditya | Peran: Pengembang Web & Sistem Terintegrasi (IoT / RFID)
- Pendidikan: SMK Negeri 9 Semarang — Jurusan Pengembangan Perangkat Lunak dan Gim (PPLG) (2025–Sekarang), SMP Negeri 33 Semarang (2022–2025), MI Nasrul Fajar (2016–2022).
- Kontak: `sahalsiraaj44@gmail.com` | `+62 856-4044-4923` | `Jl. Tunggu Raya Timur II, Semarang, Jawa Tengah` | `https://skanilan.tech`
- Karya Utama di Bento Grid:
  1. `01 · 2026` **Console Box RFID — Sistem Presensi Siswa** (IoT & Hardware — Membuat Console Box RFID untuk presensi siswa SMK Negeri 9 Semarang, lengkap dengan visualisasi 4 tahap Pipeline: `01 TAP KARTU → 02 AKUISISI UID → 03 TRANSMISI → 04 REKAPITULASI`).
  2. `02 · 2026` **Pengembangan Website skanilan.tech** (Fullstack — Berkontribusi dalam Front-End & Back-End Coding serta Web Design pada situs `https://skanilan.tech` dalam program Project-Based Learning April–Juni 2026).
  3. `03 · 2026` **Portofolio 3D Interaktif & Bento CMS** (Web 3D — Aplikasi portofolio Next.js 15 + Three.js dengan mode Hemat Animasi dan Admin CMS).
</real_portfolio_data>

<execution_steps>
Bangun seluruh 7 modul dari Fase 1 hingga Fase 4 secara lengkap:
1. Inisialisasi Next.js 15 + TypeScript + Tailwind CSS + Three.js (`@react-three/fiber`, `@react-three/drei`) + `motion` (Framer Motion) + `lucide-react` + `react-hook-form` + `zod`.
2. Siapkan Dual-Mode Data Layer (`src/lib/db/seed-data.ts` & `src/lib/services/`) agar seluruh halaman langsung berjalan 100% tanpa perlu menunggu koneksi Supabase eksternal.
3. Bangun `PerformanceContext` (sakelar **Hemat Animasi** + deteksi `prefers-reduced-motion` + `IntersectionObserver` yang menghentikan render WebGL saat Hero tidak terlihat di layar).
4. Bangun **Modul 1 (Beranda 3D)**, **Modul 2 (Galeri Karya Bento Grid + Filter Unseen)**, **Modul 3 (Halaman Detail Karya `/karya/[slug]`)**, **Modul 4 (Profil, 3 Bento Prinsip Kerja, Timeline Pendidikan/Pengalaman, Matriks Keahlian, & Unduh CV)**, **Modul 5 (Kontak dengan One-Click Copy Email & Form Zod)**, dan **Modul 6 (Panel Admin CMS `/admin` & `/admin/login`)**.
5. Jalankan `npm run build` dan pastikan 0 error TypeScript maupun ESLint.
</execution_steps>
```
