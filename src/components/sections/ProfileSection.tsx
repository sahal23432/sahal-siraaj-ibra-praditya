'use client';

import { Profile, Journey, Skill } from '@/types/portfolio';
import { Download, CheckCircle2, Cpu, Award, Sparkles } from 'lucide-react';
import InteractiveProfileCard from '@/components/cards/InteractiveProfileCard';
import ScrollReveal from '@/components/ui/ScrollReveal';

interface ProfileSectionProps {
  profile: Profile;
  journeys: Journey[];
  skills: Skill[];
}

export default function ProfileSection({
  profile,
  journeys,
  skills,
}: ProfileSectionProps) {
  const experiences = journeys.filter((j) => j.type === 'experience');
  const educations = journeys.filter((j) => j.type === 'education');

  // Group skills by category
  const skillsByCategory = skills.reduce<Record<string, Skill[]>>((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {});

  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = profile.cv_url || '/files/CV_Sahal_Siraaj_Ibra_Praditya.pdf';
    link.download = 'CV_Sahal_Siraaj_Ibra_Praditya.pdf';
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="profil" className="py-24 max-w-6xl mx-auto px-5 sm:px-8 border-t border-white/[0.08]">
      {/* Section Header with Scroll Reveal */}
      <ScrollReveal>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-16">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-[#63636E] uppercase tracking-wider mb-2">
              <span>03</span>
              <span>·</span>
              <span>PROFIL & REKAYASA SISTEM</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-medium tracking-tight text-[#F4F4F6]">
              Tentang Saya & Prinsip Kerja
            </h2>
          </div>
          <button
            onClick={handleDownloadCV}
            type="button"
            className="inline-flex items-center gap-2 self-start sm:self-auto px-4 py-2 rounded bg-[#14161D] border border-white/[0.08] hover:border-white/30 text-xs font-mono text-[#F4F4F6] transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>UNDUH CV RESMI (.PDF)</span>
          </button>
        </div>
      </ScrollReveal>

      {/* Part A: 3D Interactive Photo Card + Tentang Saya Narrative */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-20 items-start">
        {/* Left Column: Interactive 3D Photo Card (User Request) */}
        <ScrollReveal direction="left" className="lg:col-span-5">
          <InteractiveProfileCard profile={profile} />
        </ScrollReveal>

        {/* Right Column: Editorial Narrative */}
        <ScrollReveal direction="right" delay={0.15} className="lg:col-span-7 flex flex-col justify-center space-y-5 text-sm sm:text-base text-[#A1A1AA] leading-relaxed">
          <div className="p-6 sm:p-8 rounded-2xl bg-[#0D0E12] border border-white/[0.08] space-y-4">
            <h3 className="text-lg font-medium text-[#F4F4F6]">
              Menghubungkan Sentuhan Fisik dengan Layar Digital
            </h3>
            <p>
              Saya adalah siswa jurusan{' '}
              <strong className="text-[#F4F4F6] font-medium">
                Pengembangan Perangkat Lunak dan Gim (PPLG)
              </strong>{' '}
              di SMK Negeri 9 Semarang yang memiliki ketertarikan mendalam pada titik temu antara{' '}
              <span className="text-[#F4F4F6]">kode perangkat lunak</span> dan{' '}
              <span className="text-[#F4F4F6]">komponen perangkat keras fisik</span>.
            </p>
            <p>
              Bagi saya, perangkat lunak menjadi jauh lebih bermakna ketika dapat berinteraksi langsung
              dengan dunia nyata, seperti membaca kartu RFID pada konsol fisik dan menerjemahkannya
              menjadi data kehadiran siswa di layar web dalam hitungan milidetik.
            </p>
            <p>
              Saya senang mempelajari cara kerja sistem dari hulu ke hilir, merancang alur yang bersih,
              dan bekerja sama dalam tim Project-Based Learning untuk menghasilkan solusi yang teruji
              di lapangan.
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 rounded-xl bg-[#0D0E12] border border-white/[0.06]">
              <div className="text-[10px] font-mono text-[#63636E] uppercase">INSTITUSI</div>
              <div className="text-xs font-mono font-medium text-[#F4F4F6] mt-1">SMKN 9 SEMARANG</div>
            </div>
            <div className="p-4 rounded-xl bg-[#0D0E12] border border-white/[0.06]">
              <div className="text-[10px] font-mono text-[#63636E] uppercase">FOKUS UTAMA</div>
              <div className="text-xs font-mono font-medium text-[#10B981] mt-1">WEB DEVELOPMENT</div>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Part B: 3 Kartu Prinsip Kerja ("Cara Saya Membangun" / How I Build) */}
      <div className="mb-20">
        <ScrollReveal>
          <div className="text-xs font-mono text-[#63636E] uppercase tracking-widest mb-6">
            MANIFESTO REKAYASA (CARA SAYA MEMBANGUN)
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {profile.principles.map((pr, idx) => (
            <ScrollReveal key={pr.index} delay={idx * 0.1}>
              <div className="bg-[#0D0E12] border border-white/[0.08] hover:border-white/[0.2] rounded-xl p-6 sm:p-7 flex flex-col justify-between h-full transition-colors">
                <div>
                  <div className="font-mono text-xs text-[#63636E] mb-3">{pr.index} / PRINSIP</div>
                  <h4 className="text-lg font-medium text-[#F4F4F6] mb-2">{pr.title}</h4>
                  <div className="text-xs font-medium text-[#EDEDEF] mb-3 leading-snug">
                    {pr.headline}
                  </div>
                  <p className="text-xs text-[#A1A1AA] leading-relaxed mb-6">{pr.body}</p>
                </div>
                <div className="pt-3 border-t border-white/[0.06] flex items-center gap-1.5 text-[11px] font-mono text-[#10B981]">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{pr.proof}</span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Part C: Lini Masa Pengalaman & Pendidikan (Grouped Organization) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
        {/* Pengalaman Rekayasa */}
        <ScrollReveal direction="left">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-[#63636E] uppercase tracking-wider mb-6 pb-2 border-b border-white/[0.08]">
              <Cpu className="w-3.5 h-3.5 text-[#10B981]" />
              <span>PENGALAMAN PROYEK REKAYASA</span>
            </div>
            <div className="space-y-6">
              {experiences.map((exp) => (
                <div
                  key={exp.id}
                  className="bg-[#0D0E12] border border-white/[0.08] rounded-xl p-6"
                >
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-2">
                    <h4 className="text-base font-medium text-[#F4F4F6]">{exp.title}</h4>
                    <span className="font-mono text-xs text-[#A1A1AA] tabular-nums">
                      {exp.start_date} {exp.end_date ? `· ${exp.end_date}` : ''}
                    </span>
                  </div>
                  <div className="text-xs font-mono text-[#10B981] mb-3">
                    {exp.organization} · {exp.location}
                  </div>
                  <p className="text-xs text-[#A1A1AA] leading-relaxed">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Pendidikan */}
        <ScrollReveal direction="right">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-[#63636E] uppercase tracking-wider mb-6 pb-2 border-b border-white/[0.08]">
              <Award className="w-3.5 h-3.5 text-[#F59E0B]" />
              <span>RIWAYAT PENDIDIKAN</span>
            </div>
            <div className="space-y-4">
              {educations.map((edu) => (
                <div
                  key={edu.id}
                  className="bg-[#0D0E12] border border-white/[0.08] rounded-xl p-5"
                >
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1">
                    <h4 className="text-sm font-medium text-[#F4F4F6]">{edu.title}</h4>
                    <span className="font-mono text-xs text-[#63636E] tabular-nums">
                      {edu.start_date} {edu.end_date ? `· ${edu.end_date}` : ''}
                    </span>
                  </div>
                  <div className="text-xs font-mono text-[#A1A1AA] mb-2">{edu.organization}</div>
                  <p className="text-xs text-[#63636E] leading-relaxed">{edu.description}</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Part D: Matriks Keahlian per Kategori */}
      <ScrollReveal>
        <div id="keahlian" className="pt-8">
          <div className="flex items-center gap-2 font-mono text-xs text-[#63636E] uppercase tracking-wider mb-8 pb-2 border-b border-white/[0.08]">
            <Sparkles className="w-3.5 h-3.5 text-[#EDEDEF]" />
            <span>KEAHLIAN DASAR & KOMPETENSI INTI</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Object.entries(skillsByCategory).map(([category, catSkills]) => (
              <div key={category} className="space-y-3">
                <h4 className="text-xs font-mono uppercase tracking-widest text-[#A1A1AA]">
                  {category}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {catSkills.map((sk) => (
                    <div
                      key={sk.id}
                      className="px-3 py-1.5 rounded bg-[#14161D] border border-white/[0.06] hover:border-white/20 transition-colors text-xs font-mono text-[#F4F4F6] flex items-center justify-between gap-2"
                    >
                      <span>{sk.name}</span>
                      <span className="text-[10px] text-[#63636E]">{sk.proficiency}%</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
