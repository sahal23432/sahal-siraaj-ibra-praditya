---
version: "sahal-portfolio-unseen-nimbus-2026"
name: "Sahal Siraaj — Interactive 3D Portfolio (Unseen Studio × Nimbus Design System)"
description: "Sistem desain hibrida yang memadukan struktur Bento Feature Grid, tipografi Inter + JetBrains Mono, dan palet Cyan/Deep Navy dari Nimbus DESIGN.md dengan koreografi WebGL 3D interaktif, kinetic split-letter navigation, dan filter proyek bergaya Unseen Studio (unseen.co)."
colors:
  primary: "#22D3EE"
  secondary: "#FFFFFF"
  accent: "#0E74E9"
  background: "#FFFFFF"
  surface: "#082F49"
  surface-dark: "#041624"
  text-primary: "#111827"
  text-secondary: "#4B5563"
  text-on-surface: "#F8FAFC"
  border: "#E5E7EB"
  border-on-surface: "rgba(34, 211, 238, 0.22)"
typography:
  display-lg:
    fontFamily: "Inter"
    fontSize: "64px"
    fontWeight: 500
    lineHeight: "1.04"
    letterSpacing: "-0.02em"
  body-md:
    fontFamily: "Inter"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: "1.6"
  label-md:
    fontFamily: "JetBrains Mono"
    fontSize: "12px"
    fontWeight: 600
    lineHeight: "1.2"
spacing:
  base: "8px"
  gap: "16px"
  card-padding: "24px"
  section-padding: "80px"
rounded:
  card: "16px"
  control: "8px"
  pill: "9999px"
components:
  card:
    background: "Gunakan token surface (#082F49) dengan border halus rgba(34, 211, 238, 0.22), cahaya aksen #22D3EE, dan radius 16px (Bento Grid)."
    radius: "16px"
  button:
    background: "Gunakan primary (#22D3EE) atau accent (#0E74E9) dengan radius pill (9999px) untuk CTA utama dan control (8px) untuk tombol utilitas."
    radius: "9999px / 8px"
---

# Design System & UI/UX Specification (`design.md` — Unseen Studio × Nimbus Edition)

**Sumber Referensi Utama:**
1. **File `nimbus-the-wallet-built-for-everyone-DESIGN.md`** — Fondasi token warna (`#22D3EE`, `#0E74E9`, `#082F49`, `#FFFFFF`), tipografi (`Inter` 64px + `JetBrains Mono` 12px), tata letak **Bento Grid** (`rounded: 16px`, `card-padding: 24px`, `section-padding: 80px`), dan *guardrails* komponen.
2. **Website [Unseen Studio](https://www.awwwards.com/sites/unseen-studio)** ([Dev Insights](https://unread.unseen.co/the-symphony-of-vines-dev-insights-c284cc4e8aa0) · [GitHub](https://github.com/craftedbygc)) — Koreografi animasi *split-letter* (`S A H A L`), navigasi bernomor (`01 Index`, `02 Projects`, `03 Profile`, `04 Contact`), interaksi kanvas 3D *"Drag to explore"*, filter proyek dengan angka *superscript* jumlah karya, dan tautan berikon panah siku (`⮡`).

## 1. Sintesis Konsep Visual: *Nimbus Bento Structure* × *Unseen 3D Motion*

Perpaduan kedua referensi ini menghasilkan identitas visual yang sangat kuat untuk portofolio **Sahal Siraaj Ibra Praditya** (Pengembang Web & Sistem Terintegrasi IoT/RFID):
* **Kontras Dua Dunia (Terang & Samudra Gelap)**: Mengikuti `nimbus-DESIGN.md`, halaman memiliki ritme kontras yang tegas antara latar bersih (`#FFFFFF` dengan teks `#111827`) dan kartu/kanvas permukaan **Deep Navy (`#082F49`)** yang disinari aksen **Electric Cyan (`#22D3EE`)** dan **Ocean Blue (`#0E74E9`)**—warna yang sangat identik dengan lampu indikator LED modul sensor RFID dan sirkuit elektronik.
* **Koreografi Interaksi ala Unseen Studio**: Mengadopsi pengalaman imersif `unseen.co` melalui layar sambutan singkat (*Loading / Enter*), kanvas 3D interaktif yang dapat digeser (*"Drag to explore system"*), efek teks menduplikasi diri saat di-*hover*, serta filter kategori karya dengan angka jumlah item di atasnya.

## 2. Token Warna, Tipografi & Spasi (Wajib di `globals.css`)

| Kategori Token | Variabel / Kelas | Nilai Spesifik (`nimbus-DESIGN.md`) | Penerapan pada Portofolio Sahal |
| :--- | :--- | :--- | :--- |
| **Primary Accent** | `--color-primary` | `#22D3EE` (Cyan) | Sorotan sinyal RFID 3D, lencana aktif, indikator kursor, dan *glow* kartu Bento. |
| **Secondary / Light** | `--color-secondary` | `#FFFFFF` (White) | Latar bagian terang, teks utama di atas kartu `#082F49`, dan permukaan tombol kontras. |
| **Action Accent** | `--color-accent` | `#0E74E9` (Royal Blue) | Tombol CTA utama (*Get Started / Lihat Karya*), tautan aktif, dan gradien pendukung. |
| **Surface (Bento Card)** | `--color-surface` | `#082F49` (Deep Navy) | Latar kartu Bento proyek, blok *Pipeline Telemetry*, dan kanvas Hero 3D. |
| **Text Primary & Secondary** | `--text-primary` / `--text-secondary` | `#111827` / `#4B5563` | Tipografi utama pada bagian berlatar putih agar sangat nyaman dibaca rekruter. |
| **Border & Radius** | `--border` / `--radius-card` | `#E5E7EB` / `16px` (`8px` control, `9999px` pill) | Seluruh kartu Bento menggunakan `rounded-2xl` (`16px`) dan *pill badge* menggunakan `rounded-full` (`9999px`). |
| **Display Typography** | `Inter` (`64px`, `500`, `lh: 1.04`) | `text-4xl sm:text-6xl font-medium leading-[1.04]` | Judul utama Hero dan judul bagian (*Section Headings*). |
| **Mono Label** | `JetBrains Mono` (`12px`, `600`, `lh: 1.2`) | `font-mono text-xs font-semibold leading-[1.2]` | Label indeks `01`–`04`, lencana status (`[LIVE 4.0]`), *tech stack*, dan langkah *pipeline*. |

## 3. Pemetaan ke 7 Modul PRD (Gaya Unseen Studio × Nimbus Bento)

### Modul 1: Beranda 3D Interaktif (Fase 1)
1. **Menu Navigasi Utama (*Unseen Numbered Nav + Nimbus Pill CTA*)**:
   - Sisi kiri: Logo teks **SAHAL** dengan efek *split-letter stagger* (`S · A · H · A · L`) saat di-*hover*.
   - Sisi tengah: Navigasi bernomor bergaya `unseen.co` (`01 Beranda`, `02 Karya [03]`, `03 Profil`, `04 Kontak`) dengan animasi teks ganda yang bergeser vertikal saat disentuh kursor.
   - Sisi kanan: Sakelar **Hemat Animasi** (`rounded-full` / `9999px`) dan tombol CTA biru `#0E74E9` (`Mari Kolaborasi`).
2. **Hero Animasi 3D (*"Drag to Explore" WebGL Layer*)**:
   - Sesuai bagian **WebGL & Effects** pada `nimbus-DESIGN.md`, kanvas Three.js/React Three Fiber berperan sebagai lapisan atmosferik pendukung di belakang antarmuka kartu `#082F49`.
   - Menampilkan model/shader **Konsol & Gelombang Orbit RFID** berwarna Cyan `#22D3EE` dan Biru `#0E74E9` dengan petunjuk interaktif berhuruf mono: `[ DRAG UNTUK MENJELAJAHI SISTEM ]`.
3. **Sapaan & Ringkasan Diri**:
   - Lencana pil di atas judul: `NEW · PORTOFOLIO SISTEM TERINTEGRASI` (`rounded-full`, font `JetBrains Mono` 12px).
   - Judul `Inter` 64px (`line-height: 1.04`): *"Merancang sistem yang menghubungkan perangkat keras fisik dengan web modern."*

### Modul 2: Galeri Karya — *Nimbus Bento Grid* + *Unseen Filter* (Fase 1)
1. **Filter Kategori Bergaya Unseen Studio**:
   - Menampilkan tombol filter dengan angka jumlah karya berukuran kecil di kanan atas setiap label: `Semua ³`, `IoT & Hardware ¹`, `Fullstack ¹`, `Web 3D ¹`.
2. **Daftar Karya dalam Tata Letak *Bento Grid* (`gap: 16px`, `card-padding: 24px`, `rounded: 16px`)**:
   - Sesuai *Guardrails* `nimbus-DESIGN.md` (*"Do not flatten the source into a generic card grid"*), tata letak karya menggunakan **Asymmetrical Bento Grid** (Karya unggulan `01 Console Box RFID` menempati 2 kolom lebar `col-span-2`, berdampingan dengan `02 Website skanilan.tech` dan `03 Portofolio 3D`).
   - Setiap kartu menggunakan permukaan `#082F49`, aksen cahaya `#22D3EE`, animasi *hover lift* (`-translate-y-1`), dan blok visualisasi 4 langkah *Pipeline*.

### Modul 3: Detail Karya (`/karya/[slug]`) (Fase 2)
* Menggunakan struktur **Bento Feature Breakdown** seperti pada `nimbus-DESIGN.md`:
  - Kartu Bento Utama: Galeri Gambar & Video dengan *masked reveal*.
  - Kartu Bento Pipeline: 4 tahap alur kerja perangkat keras/lunak dengan font `JetBrains Mono` 12px.
  - Kartu Bento Peran & Alat: Menampilkan `Peran saya:` dan lencana teknologi ber-radius `8px` (`control`).
  - Tautan eksternal menggunakan awalan panah khas Unseen Studio: `⮡ skanilan.tech`.

### Modul 4: Profil & Perjalanan (Fase 2)
* **3 Prinsip Kerja (*Bento Value Cards*)**: Menampilkan `01 Integrasi Fisik & Digital`, `02 Alur Sistem Terstruktur`, dan `03 Belajar Cepat & Kolaboratif` dalam 3 kartu Bento sejajar (`padding: 24px`, `radius: 16px`).
* **Lini Masa Pendidikan & Pengalaman**: Menampilkan riwayat **SMK Negeri 9 Semarang (PPLG)**, **SMP Negeri 33 Semarang**, dan **MI Nasrul Fajar** beserta tombol pil **Unduh CV (`CV_Sahal_Siraaj_Ibra_Praditya.pdf`)**.

### Modul 5, 6 & 7: Kontak, Admin CMS & Performa (Fase 3 & Fase 4)
* **Kontak**: Menggunakan gaya sapaan besar *"Say hello — mari berdiskusi"* dari `unseen.co` dengan tautan kontak berawalan simbol `⮡`:
  - `⮡ sahalsiraaj44@gmail.com` (dilengkapi fitur salin satu klik)
  - `⮡ +62 856-4044-4923 (WhatsApp)`
  - `⮡ skanilan.tech`
* **Admin CMS (`/admin`)**: Menggunakan kartu permukaan `#082F49` dan tombol aksi `#0E74E9` dengan radius `8px` (`control`).
* **Animasi & Performa**: Mematuhi kurva gerak halus (*masked reveals, staggered entrance, hover lift, scroll-triggered transitions*) dan menonaktifkan beban WebGL seketika saat sakelar **Hemat Animasi** diaktifkan.

## 4. Guardrails Wajib bagi Antigravity AI (Dari `nimbus-DESIGN.md` & `unseen.co`)
* **Jangan Meratakan Bento Grid**: Dilarang mengubah bagian **Galeri Karya** atau **Prinsip Kerja** menjadi deretan kartu seragam yang membosankan; pertahankan proporsi *Bento Grid* asimetris dengan `gap: 16px`, `card-padding: 24px`, dan `rounded: 16px`.
* **Jaga Peran Warna Secara Ketat**: Gunakan `#FFFFFF` untuk latar bersih, `#082F49` untuk permukaan kartu dalam, `#22D3EE` untuk sorotan utama/sinyal, dan `#0E74E9` untuk aksi utama.
* **WebGL Sebagai Lapisan Pendukung yang Responsif**: Kanvas Three.js harus selalu berada di belakang teks antarmuka, berjalan mulus 60 FPS, dan tunduk pada sakelar **Hemat Animasi**.
