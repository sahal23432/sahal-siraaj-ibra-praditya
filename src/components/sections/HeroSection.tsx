'use client';

import Canvas3DWrapper from '@/components/canvas/Canvas3DWrapper';
import { ArrowDown, Download, Sparkles } from 'lucide-react';
import { Profile } from '@/types/portfolio';
import { motion } from 'motion/react';
import { usePerformanceMode } from '@/lib/hooks/usePerformanceMode';
import ScrollReveal from '@/components/ui/ScrollReveal';

interface HeroSectionProps {
  profile: Profile;
}

export default function HeroSection({ profile }: HeroSectionProps) {
  const { isEcoMode, prefersReducedMotion } = usePerformanceMode();
  const headlineWords = profile.hero_display_title.split(' ');

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
    <section id="hero" className="relative bg-[#FFFFFF] pt-28 sm:pt-36 pb-20 sm:pb-28 overflow-hidden">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 flex flex-col items-center text-center">
        {/* Nimbus Pill Hook: JetBrains Mono 12px, rounded-full */}
        <ScrollReveal duration={0.4}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E0F2FE] border border-[#BAE6FD] text-xs font-mono font-semibold text-[#0369A1] uppercase tracking-wide mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0E74E9]" />
            <span>NEW · PORTOFOLIO SISTEM TERINTEGRASI</span>
          </div>
        </ScrollReveal>

        {/* Display Headline: Inter 64px, 500 weight, line-height 1.04 */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-medium tracking-tight text-[#111827] max-w-4xl leading-[1.04] mb-6">
          {isEcoMode || prefersReducedMotion ? (
            headlineWords.join(' ')
          ) : (
            headlineWords.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.55,
                  delay: 0.08 + i * 0.035,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="inline-block mr-2.5 sm:mr-3.5"
              >
                {word}
              </motion.span>
            ))
          )}
        </h1>

        {/* Body Narrative: Inter 16px, 400 weight, line-height 1.6 */}
        <ScrollReveal delay={0.25}>
          <p className="text-base sm:text-lg text-[#4B5563] max-w-2xl leading-[1.6] mb-10 font-normal">
            Halo, saya <strong className="text-[#111827] font-semibold">{profile.full_name}</strong>,{' '}
            pengembang perangkat lunak dan eksplorator perangkat keras dari Semarang. Saya
            merancang alur sistem terintegrasi, mulai dari perakitan terminal fisik berbasis RFID
            hingga aplikasi web Front-End dan Back-End.
          </p>
        </ScrollReveal>

        {/* Pill Action Buttons (Nimbus 9999px pill) */}
        <ScrollReveal delay={0.35}>
          <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
            <a
              href="#karya"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0E74E9] text-white text-xs font-mono font-semibold hover:bg-[#0256B4] hover:shadow-[0_4px_16px_rgba(14,116,233,0.35)] transition-all active:scale-[0.98]"
            >
              <span>Lihat Karya Sistem</span>
              <span>⮡</span>
            </a>

            <button
              onClick={handleDownloadCV}
              type="button"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-[#E5E7EB] text-[#111827] text-xs font-mono font-semibold hover:border-[#0E74E9]/40 hover:text-[#0E74E9] hover:bg-[#F8FAFC] transition-all active:scale-[0.98] shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Unduh CV Resmi (.PDF)</span>
              <span>⮡</span>
            </button>
          </div>
        </ScrollReveal>

        {/* Bento Hero 3D Card: Surface #082F49 with Unseen "Drag to explore" & Cyan RFID Signals */}
        <ScrollReveal delay={0.4} className="w-full">
          <div className="w-full relative rounded-2xl bg-[#082F49] border border-[#22D3EE]/25 shadow-2xl p-6 sm:p-8 min-h-[460px] sm:min-h-[540px] flex flex-col justify-between overflow-hidden text-left group">
            {/* 3D WebGL Canvas Layer */}
            <Canvas3DWrapper />

            {/* Top Bar inside Bento 3D Card */}
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/[0.08]">
              <div className="flex items-center gap-2 font-mono text-xs text-[#94A3B8]">
                <span className="w-2 h-2 rounded-full bg-[#22D3EE] animate-pulse" />
                <span className="text-[#F8FAFC] font-semibold">TELEMETRY STAGE · 3D HARDWARE / RFID</span>
              </div>
              <div className="flex items-center gap-2 font-mono text-xs">
                <span className="px-2.5 py-0.5 rounded-full bg-[#22D3EE]/15 border border-[#22D3EE]/30 text-[#22D3EE] text-[11px] font-semibold">
                  [ LIVE 4.0 ]
                </span>
                <span className="text-[#94A3B8] hidden sm:inline">SMKN 9 SEMARANG</span>
              </div>
            </div>

            {/* Center "Drag to Explore" Unseen Studio cue */}
            <div className="relative z-10 pointer-events-none flex flex-col items-center justify-center my-auto py-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#041624]/80 backdrop-blur-md border border-[#22D3EE]/30 text-xs font-mono text-[#22D3EE] shadow-lg tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-[#22D3EE]" />
                <span>[ DRAG UNTUK MENJELAJAHI SISTEM ]</span>
              </div>
            </div>

            {/* Bottom Bar inside Bento 3D Card */}
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/[0.08] text-xs font-mono text-[#94A3B8]">
              <div className="flex items-center gap-2">
                <span className="text-[#F8FAFC]">CONSOLE CORE:</span>
                <span className="text-[#22D3EE]">AKTIF</span>
                <span className="text-white/20">·</span>
                <span>MIKROKONTROLER TERHUBUNG</span>
              </div>
              <div className="text-[11px] text-[#22D3EE] bg-[#041624]/60 px-2.5 py-1 rounded-md border border-white/[0.06]">
                RESPONSIF KURSOR · 60 FPS
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Scroll Down Indicator */}
      <div className="flex justify-center mt-12">
        <a
          href="#karya"
          className="inline-flex items-center gap-2 text-xs font-mono text-[#64748B] hover:text-[#0E74E9] transition-colors"
        >
          <span>Jelajahi Galeri Karya</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
        </a>
      </div>
    </section>
  );
}
