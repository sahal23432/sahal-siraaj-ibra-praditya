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
    <section id="profil" className="py-20 sm:py-28 bg-[#FFFFFF] border-t border-[#E5E7EB]">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <ScrollReveal>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-16">
            <div>
              <div className="flex items-center gap-2 font-mono text-xs text-[#0E74E9] uppercase tracking-wider mb-3">
                <span className="font-bold">03</span>
                <span className="text-[#D1D5DB]">·</span>
                <span className="font-semibold">PROFIL & MANIFESTO REKAYASA</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-[#111827] leading-[1.04]">
                Tentang Saya & Cara Saya Membangun
              </h2>
            </div>
            <button
              onClick={handleDownloadCV}
              type="button"
              className="inline-flex items-center gap-2 self-start sm:self-auto px-5 py-2.5 rounded-full bg-white border border-[#E5E7EB] hover:border-[#0E74E9]/40 hover:text-[#0E74E9] text-xs font-mono font-semibold text-[#111827] transition-all shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Unduh CV Resmi (.PDF)</span>
              <span>⮡</span>
            </button>
          </div>
        </ScrollReveal>

        {/* Part A: 3D Interactive Photo Card + Tentang Saya Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20 items-stretch">
          {/* Left Column: Interactive 3D Photo Card */}
          <ScrollReveal direction="left" className="lg:col-span-5 h-full">
            <InteractiveProfileCard profile={profile} />
          </ScrollReveal>

          {/* Right Column: Editorial Narrative in Surface #082F49 */}
          <ScrollReveal direction="right" delay={0.15} className="lg:col-span-7 flex flex-col justify-between">
            <div className="h-full p-6 sm:p-8 rounded-2xl bg-[#082F49] border border-[#22D3EE]/22 text-[#94A3B8] shadow-xl flex flex-col justify-between space-y-6 text-left">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 font-mono text-xs text-[#22D3EE] uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#22D3EE]" />
                  <span>JURUSAN PPLG · SMKN 9 SEMARANG</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-medium text-[#F8FAFC] leading-snug">
                  Menghubungkan Sentuhan Fisik dengan Layar Digital
                </h3>
                <p className="text-sm sm:text-base leading-relaxed font-normal">
                  Saya adalah siswa jurusan{' '}
                  <strong className="text-[#F8FAFC] font-semibold">
                    Pengembangan Perangkat Lunak dan Gim (PPLG)
                  </strong>{' '}
                  di SMK Negeri 9 Semarang yang memiliki ketertarikan mendalam pada titik temu antara{' '}
                  <span className="text-[#22D3EE] font-medium">kode perangkat lunak</span> dan{' '}
                  <span className="text-[#22D3EE] font-medium">komponen perangkat keras fisik</span>.
                </p>
                <p className="text-sm sm:text-base leading-relaxed font-normal">
                  Bagi saya, perangkat lunak menjadi jauh lebih bermakna ketika dapat berinteraksi langsung
                  dengan dunia nyata—seperti membaca kartu RFID pada konsol fisik dan menerjemahkannya
                  menjadi data kehadiran siswa di layar web dalam hitungan milidetik.
                </p>
                <p className="text-sm sm:text-base leading-relaxed font-normal">
                  Saya senang mempelajari cara kerja sistem dari hulu ke hilir, merancang alur yang bersih,
                  dan bekerja sama dalam tim Project-Based Learning untuk menghasilkan solusi yang teruji
                  di lapangan.
                </p>
              </div>

              {/* Quick Metrics Bar */}
              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/[0.08]">
                <div className="p-3.5 rounded-xl bg-[#041624] border border-white/[0.06]">
                  <div className="text-[10px] font-mono text-[#94A3B8] uppercase">INSTITUSI</div>
                  <div className="text-xs font-mono font-semibold text-[#F8FAFC] mt-1">SMKN 9 SEMARANG</div>
                </div>
                <div className="p-3.5 rounded-xl bg-[#041624] border border-white/[0.06]">
                  <div className="text-[10px] font-mono text-[#94A3B8] uppercase">FOKUS UTAMA</div>
                  <div className="text-xs font-mono font-semibold text-[#22D3EE] mt-1">WEB & RFID IOT</div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Part B: 3 Kartu Prinsip Kerja (Bento Value Cards) */}
        <div className="mb-20">
          <ScrollReveal>
            <div className="text-xs font-mono text-[#0E74E9] uppercase tracking-wider mb-6 flex items-center gap-2">
              <span className="font-bold">MANIFESTO REKAYASA</span>
              <span className="text-[#D1D5DB]">·</span>
              <span className="text-[#64748B]">3 PRINSIP CARA SAYA MEMBANGUN SISTEM</span>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {profile.principles.map((pr, idx) => (
              <ScrollReveal key={pr.index} delay={idx * 0.1}>
                <div className="bg-[#082F49] border border-[#22D3EE]/22 hover:border-[#22D3EE]/50 rounded-2xl p-6 sm:p-7 flex flex-col justify-between h-full shadow-xl transition-all hover:-translate-y-1 text-left">
                  <div>
                    <div className="font-mono text-xs text-[#22D3EE] font-bold mb-3 tracking-wider">
                      {pr.index} / PRINSIP KERJA
                    </div>
                    <h4 className="text-lg font-medium text-[#F8FAFC] mb-2">{pr.title}</h4>
                    <div className="text-xs font-mono text-[#94A3B8] mb-3 leading-snug">
                      {pr.headline}
                    </div>
                    <p className="text-xs sm:text-sm text-[#94A3B8]/90 leading-relaxed mb-6 font-normal">
                      {pr.body}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-white/[0.08] flex items-center gap-2 text-xs font-mono text-[#22D3EE]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#22D3EE]" />
                    <span className="font-medium">{pr.proof}</span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Part C: Lini Masa Pengalaman & Pendidikan */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20 text-left">
          {/* Pengalaman Rekayasa */}
          <ScrollReveal direction="left">
            <div>
              <div className="flex items-center gap-2 font-mono text-xs text-[#111827] uppercase tracking-wider mb-6 pb-2 border-b border-[#E5E7EB]">
                <Cpu className="w-3.5 h-3.5 text-[#0E74E9]" />
                <span className="font-semibold">PENGALAMAN PROYEK REKAYASA</span>
              </div>
              <div className="space-y-4">
                {experiences.map((exp) => (
                  <div
                    key={exp.id}
                    className="bg-[#082F49] border border-[#22D3EE]/22 rounded-2xl p-6 shadow-md"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-2">
                      <h4 className="text-base font-medium text-[#F8FAFC]">{exp.title}</h4>
                      <span className="font-mono text-xs text-[#22D3EE] tabular-nums font-semibold">
                        {exp.start_date} {exp.end_date ? `· ${exp.end_date}` : ''}
                      </span>
                    </div>
                    <div className="text-xs font-mono text-[#94A3B8] mb-3">
                      {exp.organization} {exp.location ? `· ${exp.location}` : ''}
                    </div>
                    <p className="text-xs sm:text-sm text-[#94A3B8]/90 leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Pendidikan */}
          <ScrollReveal direction="right">
            <div>
              <div className="flex items-center gap-2 font-mono text-xs text-[#111827] uppercase tracking-wider mb-6 pb-2 border-b border-[#E5E7EB]">
                <Award className="w-3.5 h-3.5 text-[#0E74E9]" />
                <span className="font-semibold">RIWAYAT PENDIDIKAN</span>
              </div>
              <div className="space-y-4">
                {educations.map((edu) => (
                  <div
                    key={edu.id}
                    className="bg-[#082F49] border border-[#22D3EE]/22 rounded-2xl p-5 shadow-md"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1">
                      <h4 className="text-sm font-medium text-[#F8FAFC]">{edu.title}</h4>
                      <span className="font-mono text-xs text-[#22D3EE] tabular-nums font-semibold">
                        {edu.start_date} {edu.end_date ? `· ${edu.end_date}` : ''}
                      </span>
                    </div>
                    <div className="text-xs font-mono text-[#94A3B8] mb-2">{edu.organization}</div>
                    <p className="text-xs text-[#94A3B8]/80 leading-relaxed">{edu.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Part D: Matriks Keahlian per Kategori */}
        <ScrollReveal>
          <div id="keahlian" className="pt-6 text-left">
            <div className="flex items-center gap-2 font-mono text-xs text-[#111827] uppercase tracking-wider mb-8 pb-2 border-b border-[#E5E7EB]">
              <Sparkles className="w-3.5 h-3.5 text-[#0E74E9]" />
              <span className="font-semibold">KEAHLIAN DASAR & KOMPETENSI INTI</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Object.entries(skillsByCategory).map(([category, catSkills]) => (
                <div key={category} className="p-6 rounded-2xl bg-[#082F49] border border-[#22D3EE]/22 shadow-md space-y-4">
                  <h4 className="text-xs font-mono font-semibold uppercase tracking-widest text-[#22D3EE] pb-2 border-b border-white/[0.08]">
                    {category}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {catSkills.map((sk) => (
                      <div
                        key={sk.id}
                        className="px-3 py-1.5 rounded-lg bg-[#041624] border border-white/[0.08] hover:border-[#22D3EE]/40 transition-colors text-xs font-mono text-[#F8FAFC] flex items-center justify-between gap-2.5"
                      >
                        <span>{sk.name}</span>
                        <span className="text-[10px] font-bold text-[#22D3EE]">{sk.proficiency}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
