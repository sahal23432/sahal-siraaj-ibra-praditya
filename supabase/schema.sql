-- ==============================================================================
-- PORTOFOLIO 3D INTERAKTIF — SAHAL SIRAAJ IBRA PRADITYA
-- Skema Database PostgreSQL / Supabase
-- ==============================================================================

-- Ekstensi UUID
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 1. TABEL PROYEK / KARYA
CREATE TABLE IF NOT EXISTS projects (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  index_code TEXT NOT NULL DEFAULT '01',
  year TEXT NOT NULL DEFAULT '2026',
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  summary TEXT NOT NULL,
  category TEXT NOT NULL,
  status_badge TEXT NOT NULL DEFAULT 'Active System',
  thumbnail_url TEXT NOT NULL DEFAULT '/images/projects/rfid-console.webp',
  pipeline_steps JSONB NOT NULL DEFAULT '[]'::jsonb,
  story_behind TEXT NOT NULL,
  role TEXT NOT NULL,
  tools TEXT[] NOT NULL DEFAULT '{}',
  live_url TEXT,
  repo_url TEXT,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  display_order INTEGER NOT NULL DEFAULT 0,
  published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. TABEL PROFIL UTAMA (SINGLETON ID = 1)
CREATE TABLE IF NOT EXISTS profile (
  id INTEGER PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  full_name TEXT NOT NULL,
  headline_greeting TEXT NOT NULL,
  hero_display_title TEXT NOT NULL,
  short_bio TEXT NOT NULL,
  about_markdown TEXT NOT NULL,
  principles JSONB NOT NULL DEFAULT '[]'::jsonb,
  avatar_url TEXT NOT NULL DEFAULT '/images/sahal-avatar.png',
  cv_url TEXT NOT NULL DEFAULT '/files/CV_Sahal_Siraaj_Ibra_Praditya.pdf',
  email TEXT NOT NULL,
  phone_or_whatsapp TEXT,
  location TEXT,
  availability_status TEXT DEFAULT 'Terbuka untuk Kolaborasi Proyek & Eksplorasi Web/IoT',
  social_links JSONB NOT NULL DEFAULT '[]'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3. TABEL RIWAYAT / PERJALANAN (EXPERIENCE & EDUCATION)
CREATE TABLE IF NOT EXISTS journeys (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  type TEXT NOT NULL CHECK (type IN ('experience', 'education')),
  title TEXT NOT NULL,
  organization TEXT NOT NULL,
  location TEXT,
  start_date TEXT NOT NULL,
  end_date TEXT,
  description TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 4. TABEL MATRIKS KEAHLIAN (SKILLS)
CREATE TABLE IF NOT EXISTS skills (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  proficiency INTEGER NOT NULL DEFAULT 90,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 5. TABEL KOTAK MASUK PESAN KONTAK
CREATE TABLE IF NOT EXISTS contact_messages (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  sender_name TEXT NOT NULL,
  sender_email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  is_read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- INDEKS PERFORMA
CREATE INDEX IF NOT EXISTS idx_projects_slug ON projects (slug);
CREATE INDEX IF NOT EXISTS idx_projects_order ON projects (display_order);
CREATE INDEX IF NOT EXISTS idx_journeys_order ON journeys (display_order);
CREATE INDEX IF NOT EXISTS idx_skills_order ON skills (display_order);
CREATE INDEX IF NOT EXISTS idx_contact_created ON contact_messages (created_at DESC);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE journeys ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Kebijakan Akses Baca Publik (Semua Pengunjung Website)
DROP POLICY IF EXISTS "Public read access for projects" ON projects;
CREATE POLICY "Public read access for projects" ON projects FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public read access for profile" ON profile;
CREATE POLICY "Public read access for profile" ON profile FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public read access for journeys" ON journeys;
CREATE POLICY "Public read access for journeys" ON journeys FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public read access for skills" ON skills;
CREATE POLICY "Public read access for skills" ON skills FOR SELECT USING (true);

-- Kebijakan Kirim Pesan Publik (Formulir Kontak)
DROP POLICY IF EXISTS "Public can submit contact messages" ON contact_messages;
CREATE POLICY "Public can submit contact messages" ON contact_messages FOR INSERT WITH CHECK (true);

-- Kebijakan Pengelolaan Cockpit Admin (CRUD penuh dengan Anon / Service Role Key)
DROP POLICY IF EXISTS "Allow all for projects" ON projects;
CREATE POLICY "Allow all for projects" ON projects FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow all for profile" ON profile;
CREATE POLICY "Allow all for profile" ON profile FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow all for journeys" ON journeys;
CREATE POLICY "Allow all for journeys" ON journeys FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow all for skills" ON skills;
CREATE POLICY "Allow all for skills" ON skills FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow read contact messages" ON contact_messages;
CREATE POLICY "Allow read contact messages" ON contact_messages FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow update contact messages" ON contact_messages;
CREATE POLICY "Allow update contact messages" ON contact_messages FOR UPDATE USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow delete contact messages" ON contact_messages;
CREATE POLICY "Allow delete contact messages" ON contact_messages FOR DELETE USING (true);
