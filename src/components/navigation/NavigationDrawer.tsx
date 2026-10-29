'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Globe, X } from 'lucide-react';

interface NavigationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const drawerMenuItems = [
  { num: '01', label: 'Beranda', href: '#hero', hasGlobe: false },
  { num: '02', label: 'Karya', href: '#karya', hasGlobe: false },
  { num: '03', label: 'Profil', href: '#profil', hasGlobe: false },
  { num: '04', label: 'Kontak & Sistem', href: '#kontak', hasGlobe: true },
];

export default function NavigationDrawer({ isOpen, onClose }: NavigationDrawerProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [isExiting, setIsExiting] = useState(false);

  // Handle close sequence with staggered letter dissolve
  const handleInitiateClose = () => {
    setIsExiting(true);
    // Allow letter dissolve animation to begin before closing panel
    setTimeout(() => {
      onClose();
      setIsExiting(false);
    }, 280);
  };

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleInitiateClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Subtle Dim Backdrop */}
          <motion.div
            key="drawer-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={handleInitiateClose}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Half-Screen Slide-Over Panel */}
          <motion.aside
            key="drawer-panel"
            initial={{ x: '100%' }}
            animate={{ x: '0%' }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 right-0 h-screen w-full md:w-[46vw] z-50 bg-[#05070B] border-l border-white/[0.08] shadow-2xl flex flex-col justify-between p-7 sm:p-12 overflow-y-auto"
            aria-label="Navigasi Menu Lengkap"
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-8 border-b border-white/[0.08]">
              <div className="flex items-center gap-2 text-xs font-mono text-[#94A3B8]">
                <span className="w-2 h-2 rounded-full bg-[#22D3EE] animate-pulse" />
                <span>UNSEEN NAVIGATION MATRIX</span>
              </div>

              {/* Close Button Inside Drawer */}
              <button
                onClick={handleInitiateClose}
                type="button"
                className="w-10 h-10 rounded-full bg-white text-slate-900 shadow-md flex items-center justify-center hover:scale-110 active:scale-95 transition-transform"
                aria-label="Tutup menu navigasi"
              >
                <X className="w-5 h-5 text-slate-900 stroke-[2.5]" />
              </button>
            </div>

            {/* Menu List with Numbered Headings & 3D Character Wave Roll */}
            <nav className="my-auto py-8 flex flex-col gap-6 sm:gap-8">
              {drawerMenuItems.map((item, idx) => {
                const isHovered = hoveredIdx === idx;
                const letters = item.label.split('');

                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={handleInitiateClose}
                    onMouseEnter={() => setHoveredIdx(idx)}
                    onMouseLeave={() => setHoveredIdx(null)}
                    className="group relative flex flex-col items-start select-none py-1"
                  >
                    {/* Small Telemetry Number (12px JetBrains Mono) */}
                    <span className="text-xs font-mono font-semibold text-[#22D3EE] tracking-widest mb-1 opacity-80 group-hover:opacity-100 transition-opacity">
                      {item.num} //
                    </span>

                    {/* Large Word Display with Character Roll & Staggered Exit Dissolve */}
                    <div className="relative overflow-hidden flex items-center gap-3 text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
                      {/* Character Display Wrapper */}
                      <span className="relative inline-flex overflow-hidden leading-none">
                        {/* Upright Letter Line */}
                        <span className="inline-flex">
                          {letters.map((char, charIdx) => (
                            <motion.span
                              key={`upright-${charIdx}`}
                              animate={{
                                y: isHovered ? '-110%' : '0%',
                                opacity: isExiting ? 0 : 1,
                                filter: isExiting ? 'blur(6px)' : 'blur(0px)',
                              }}
                              transition={{
                                y: { duration: 0.42, ease: [0.22, 1, 0.36, 1], delay: charIdx * 0.02 },
                                opacity: { duration: 0.2, delay: charIdx * 0.015 },
                                filter: { duration: 0.2, delay: charIdx * 0.015 },
                              }}
                              className="inline-block text-[#F8FAFC]"
                            >
                              {char === ' ' ? '\u00A0' : char}
                            </motion.span>
                          ))}
                        </span>

                        {/* Italic Serif Duplicate Line */}
                        <span
                          className="absolute inset-0 inline-flex"
                          style={{ fontFamily: 'var(--font-serif, "Instrument Serif", Georgia, serif)' }}
                        >
                          {letters.map((char, charIdx) => (
                            <motion.span
                              key={`italic-${charIdx}`}
                              animate={{
                                y: isHovered ? '0%' : '110%',
                                opacity: isExiting ? 0 : 1,
                              }}
                              transition={{
                                y: { duration: 0.42, ease: [0.22, 1, 0.36, 1], delay: charIdx * 0.02 },
                                opacity: { duration: 0.2, delay: charIdx * 0.015 },
                              }}
                              className="inline-block italic font-normal text-[#22D3EE] drop-shadow-[0_0_20px_rgba(34,211,238,0.5)]"
                            >
                              {char === ' ' ? '\u00A0' : char}
                            </motion.span>
                          ))}
                        </span>
                      </span>

                      {/* Optional Wireframe Globe Icon for "Kontak & Sistem" */}
                      {item.hasGlobe && (
                        <Globe
                          className={`w-7 h-7 sm:w-8 sm:h-8 text-[#22D3EE] transition-transform duration-700 ${
                            isHovered ? 'rotate-180 scale-110' : ''
                          }`}
                        />
                      )}
                    </div>
                  </a>
                );
              })}
            </nav>

            {/* Drawer Footer: Direct Contact & Social Links */}
            <div className="pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 text-xs font-mono">
              {/* Left Column: Direct Inquiries */}
              <div className="flex flex-col gap-1.5 text-[#94A3B8]">
                <span className="text-[10px] text-[#64748B] tracking-wider uppercase">Direct Inquiries</span>
                <a
                  href="mailto:sahalsiraaj44@gmail.com"
                  className="text-[#F8FAFC] hover:text-[#22D3EE] transition-colors"
                >
                  sahalsiraaj44@gmail.com
                </a>
                <a
                  href="tel:+6285640444923"
                  className="text-[#F8FAFC] hover:text-[#22D3EE] transition-colors"
                >
                  +62 856-4044-4923
                </a>
              </div>

              {/* Right Column: Social Links */}
              <div className="flex flex-col sm:items-end gap-1.5">
                <span className="text-[10px] text-[#64748B] tracking-wider uppercase">Social Orbit</span>
                <div className="flex items-center gap-4 text-[#F8FAFC]">
                  <a
                    href="https://github.com/sahal23432"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#22D3EE] transition-colors"
                  >
                    GITHUB ↗
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#22D3EE] transition-colors"
                  >
                    LINKEDIN ↗
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#22D3EE] transition-colors"
                  >
                    INSTAGRAM ↗
                  </a>
                </div>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
