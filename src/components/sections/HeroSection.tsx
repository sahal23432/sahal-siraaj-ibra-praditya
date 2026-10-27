'use client';

import Canvas3DWrapper from '@/components/canvas/Canvas3DWrapper';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
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

  return (
    <section className="relative min-h-[94vh] flex flex-col justify-center items-center overflow-hidden pt-24 pb-16">
      {/* 3D WebGL Canvas Layer */}
      <Canvas3DWrapper />

      {/* Radial Vignette Overlay to guarantee high contrast */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(7,7,9,0.2) 0%, rgba(7,7,9,0.7) 65%, #070709 100%)',
        }}
      />

      {/* Foreground Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 text-center flex flex-col items-center">
        {/* Monospace Pre-title Hook */}
        <ScrollReveal duration={0.4}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#14161D]/80 border border-white/[0.08] text-xs font-mono tracking-wider text-[#A1A1AA] uppercase mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
            <span>{profile.headline_greeting}</span>
          </div>
        </ScrollReveal>

        {/* Display Headline with Word Reveal */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#F4F4F6] max-w-4xl leading-[1.12] mb-6">
          {isEcoMode || prefersReducedMotion ? (
            headlineWords.join(' ')
          ) : (
            headlineWords.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.1 + i * 0.04,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="inline-block mr-2.5 sm:mr-3.5"
              >
                {word}
              </motion.span>
            ))
          )}
        </h1>

        {/* Narrative Summary without em-dashes */}
        <ScrollReveal delay={0.3}>
          <p className="text-sm sm:text-base text-[#A1A1AA] max-w-2xl leading-relaxed mb-10 font-normal">
            Halo, saya{' '}
            <strong className="text-[#F4F4F6] font-medium">{profile.full_name}</strong>,
            pengembang perangkat lunak dan eksplorator perangkat keras dari Semarang. Saya
            merancang alur sistem terintegrasi, mulai dari perakitan terminal fisik berbasis RFID
            hingga aplikasi web Front-End dan Back-End.
          </p>
        </ScrollReveal>

        {/* Action Buttons */}
        <ScrollReveal delay={0.4}>
          <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
            <a
              href="#karya"
              className="inline-flex items-center gap-2 px-5 py-3 rounded bg-[#EDEDEF] text-[#070709] text-xs font-mono font-medium hover:bg-white transition-transform active:scale-[0.98]"
            >
              <span>Lihat Karya Sistem</span>
              <span className="text-[#070709]/70">(03)</span>
            </a>

            <a
              href="#kontak"
              className="inline-flex items-center gap-2 px-5 py-3 rounded bg-[#0D0E12] border border-white/[0.12] text-[#F4F4F6] text-xs font-mono font-medium hover:border-white/30 hover:bg-[#14161D] transition-all active:scale-[0.98]"
            >
              <span>Mari Berkolaborasi</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#A1A1AA]" />
            </a>
          </div>
        </ScrollReveal>

        {/* Bottom Telemetry Meta */}
        <ScrollReveal delay={0.5}>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-mono text-[#63636E]">
            <span>LOKASI: SEMARANG, ID</span>
            <span>·</span>
            <span>STATUS: TERSEDIA</span>
          </div>
        </ScrollReveal>
      </div>

      {/* Scroll Down Indicator */}
      <a
        href="#karya"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-1.5 text-xs font-mono text-[#63636E] hover:text-[#A1A1AA] transition-colors"
      >
        <span>scroll down</span>
        <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
      </a>
    </section>
  );
}
