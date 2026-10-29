'use client';

import { useState } from 'react';
import Canvas3DWrapper from '@/components/canvas/Canvas3DWrapper';
import { Download, Eye, Globe, Radio, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Profile } from '@/types/portfolio';
import { usePerformanceMode } from '@/lib/hooks/usePerformanceMode';
import ScrollReveal from '@/components/ui/ScrollReveal';
import LiquidWaterHeadline from '@/components/ui/LiquidWaterHeadline';
import Preloader from '@/components/ui/Preloader';

interface HeroSectionProps {
  profile: Profile;
}

export default function HeroSection({ profile }: HeroSectionProps) {
  const { isEcoMode, toggleEcoMode } = usePerformanceMode();
  const [freeCameraMode, setFreeCameraMode] = useState(false);
  const [portalHovered, setPortalHovered] = useState(false);

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

  const handleScrollToConsoleBox = () => {
    const el = document.getElementById('karya') || document.getElementById('console-box');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Item 7: Lightweight Preloader Curtain with [00%] -> [100%] counter */}
      <Preloader />

      <section
        id="hero"
        className="relative min-h-[96vh] sm:min-h-screen bg-[#05070B] pt-28 sm:pt-36 pb-10 flex flex-col justify-between overflow-hidden text-center bg-radial-telemetry bg-noise"
      >
        {/* Item 1 & 5: Immersive Full-Bleed 3D WebGL Canvas Layer */}
        <div className="absolute inset-0 z-0">
          <Canvas3DWrapper freeCameraMode={freeCameraMode} />
        </div>

        {/* Ambient Atmospheric Glow Halos */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#0E74E9]/20 blur-[130px] rounded-full pointer-events-none -z-10" />
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#22D3EE]/15 blur-[120px] rounded-full pointer-events-none -z-10" />

        {/* Hero Foreground Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 flex flex-col items-center my-auto pointer-events-none w-full">
          {/* Interactive Liquid Water Headline ala Unseen Studio */}
          <ScrollReveal delay={0.05} duration={0.6} className="pointer-events-auto w-full">
            <LiquidWaterHeadline
              firstName="SAHAL SIRAAJ"
              lastName="IBRA PRADITYA"
              roleBadge="A BRAND, WEB 3D & IOT SYSTEMS ARCHITECT · SMKN 9"
              tagline={profile.short_bio}
            />
          </ScrollReveal>

          {/* Item 6: Inverted Fill Pill CTA Button dengan Panah Diagonal */}
          <ScrollReveal delay={0.2} duration={0.45}>
            <div className="pointer-events-auto flex flex-wrap items-center justify-center gap-4 mt-2 sm:mt-3">
              {/* Inverted Fill Pill Button: Lihat Karya Saya ↘ */}
              <a
                href="#karya"
                className="group relative inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-white/95 text-slate-900 font-mono text-xs font-bold tracking-wide overflow-hidden shadow-[0_0_25px_rgba(255,255,255,0.25)] hover:shadow-[0_0_30px_rgba(34,211,238,0.45)] transition-all duration-300 active:scale-[0.98]"
              >
                {/* Dark Inverted Fill Slide-up Layer */}
                <span className="absolute inset-0 bg-[#082F49] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />

                <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                  Lihat Karya Saya
                </span>

                <span className="relative z-10 text-sm font-bold group-hover:text-[#22D3EE] group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-all duration-300">
                  ↘
                </span>
              </a>

              {/* Secondary CTA: Unduh CV Resmi */}
              <button
                onClick={handleDownloadCV}
                type="button"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#090E17]/85 backdrop-blur-md border border-white/[0.14] hover:border-[#22D3EE]/50 text-[#F8FAFC] hover:text-[#22D3EE] text-xs font-mono font-semibold transition-all active:scale-[0.98] shadow-xl"
              >
                <Download className="w-3.5 h-3.5 text-[#22D3EE]" />
                <span>Unduh CV Resmi (.PDF)</span>
                <span>⮡</span>
              </button>
            </div>
          </ScrollReveal>
        </div>

        {/* Item 5 & 7: Floating Bottom Dock ala Unseen Studio */}
        <div className="relative z-20 max-w-6xl mx-auto px-5 sm:px-8 w-full mt-6 pt-4 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-[#94A3B8]">
          {/* Item 7: Bottom-Left Controls (Signal wave/Eco Toggle ((•)) & Proyek Unggulan 2026 Pill) */}
          <div className="flex items-center gap-3">
            {/* Round signal wave / eco button ((•)) */}
            <button
              onClick={toggleEcoMode}
              type="button"
              title={isEcoMode ? 'Beralih ke 60 FPS Penuh' : 'Beralih ke Mode Hemat Animasi (ECO)'}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-lg backdrop-blur-md ${
                isEcoMode
                  ? 'bg-[#0E74E9]/25 border border-[#22D3EE]/50 text-[#22D3EE]'
                  : 'bg-[#090E17]/85 border border-white/[0.12] hover:border-[#22D3EE]/60 text-[#22D3EE] hover:scale-105'
              }`}
            >
              <Radio className="w-4 h-4 animate-pulse" />
            </button>

            {/* Pill button: Proyek Unggulan 2026 (Inverted dark hover, smooth scroll to Bento Console Box) */}
            <button
              onClick={handleScrollToConsoleBox}
              type="button"
              className="group relative inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/95 text-slate-900 font-mono text-[11px] font-semibold overflow-hidden shadow-md transition-all active:scale-95"
            >
              {/* Inverted dark fill */}
              <span className="absolute inset-0 bg-[#082F49] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />

              <span className="relative z-10 w-1.5 h-1.5 rounded-full bg-[#0E74E9] group-hover:bg-[#22D3EE] transition-colors" />
              <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                Proyek Unggulan 2026
              </span>
              <span className="relative z-10 group-hover:text-[#22D3EE] transition-colors">↘</span>
            </button>
          </div>

          {/* Item 5: Bottom-Center "Portal / Mode" Eye-to-Globe Button (SAHAL 🌐 SYSTEM) */}
          <div
            onMouseEnter={() => setPortalHovered(true)}
            onMouseLeave={() => setPortalHovered(false)}
            className="flex items-center justify-center my-2 md:my-0"
          >
            <div className="relative flex items-center">
              {/* Symmetrical Left Text: SAHAL */}
              <motion.span
                animate={{
                  x: portalHovered ? -10 : 25,
                  opacity: portalHovered ? 1 : 0,
                }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="font-mono text-xs font-bold text-white tracking-widest mr-2 select-none pointer-events-none"
              >
                SAHAL
              </motion.span>

              {/* Center Eye-to-Globe Button */}
              <button
                onClick={() => setFreeCameraMode(!freeCameraMode)}
                type="button"
                title={
                  freeCameraMode
                    ? 'Nonaktifkan Kamera Bebas (Kembali ke Parallax)'
                    : 'Aktifkan Mode Eksplorasi Kamera Bebas 3D (OrbitControls)'
                }
                className={`relative z-10 w-11 h-11 rounded-full flex items-center justify-center shadow-[0_0_25px_rgba(255,255,255,0.35)] transition-all ${
                  freeCameraMode
                    ? 'bg-[#22D3EE] text-[#05070B] ring-4 ring-[#22D3EE]/30 scale-105'
                    : 'bg-white text-slate-900 hover:scale-110 active:scale-95'
                }`}
              >
                <AnimatePresence mode="wait">
                  {portalHovered || freeCameraMode ? (
                    <motion.div
                      key="globe-icon"
                      initial={{ rotate: -90, scale: 0.5, opacity: 0 }}
                      animate={{ rotate: 0, scale: 1, opacity: 1 }}
                      exit={{ rotate: 90, scale: 0.5, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <Globe className="w-5 h-5 animate-spin" style={{ animationDuration: '8s' }} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="eye-icon"
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.5, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Eye className="w-5 h-5 text-slate-900" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>

              {/* Symmetrical Right Text: SYSTEM */}
              <motion.span
                animate={{
                  x: portalHovered ? 10 : -25,
                  opacity: portalHovered ? 1 : 0,
                }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="font-mono text-xs font-bold text-[#22D3EE] tracking-widest ml-2 select-none pointer-events-none"
              >
                SYSTEM
              </motion.span>
            </div>
          </div>

          {/* Bottom-Right: Telemetry Copyright */}
          <div className="flex items-center gap-2 text-[11px] text-[#64748B] tracking-wider">
            {freeCameraMode ? (
              <span className="text-[#22D3EE] font-mono font-semibold animate-pulse">
                [ 3D ORBIT FREE CAM ON ]
              </span>
            ) : (
              <span>©2026 SAHAL SIRAAJ</span>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
