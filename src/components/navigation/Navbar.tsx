'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePerformanceMode } from '@/lib/hooks/usePerformanceMode';
import { Zap, Leaf } from 'lucide-react';
import { motion } from 'motion/react';
import ScrollProgressBar from '@/components/ui/ScrollProgressBar';
import SplitTextRoll from '@/components/ui/SplitTextRoll';
import NavigationDrawer from './NavigationDrawer';

const navItems = [
  { num: '01', label: 'Beranda', href: '#hero', count: '' },
  { num: '02', label: 'Karya', href: '#karya', count: '[03]' },
  { num: '03', label: 'Profil', href: '#profil', count: '' },
  { num: '04', label: 'Kontak', href: '#kontak', count: '' },
];

export default function Navbar() {
  const { isEcoMode, toggleEcoMode } = usePerformanceMode();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <ScrollProgressBar />

      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-[#05070B]/85 backdrop-blur-xl border-b border-white/[0.08] py-3.5 shadow-2xl'
            : 'bg-transparent py-5 sm:py-6'
        }`}
      >
        <div className="max-w-6xl mx-auto px-5 sm:px-8 flex items-center justify-between">
          {/* Left: Split-letter SAHAL studio logo */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="group flex items-center gap-0.5 text-base font-mono font-bold tracking-widest text-[#F8FAFC]"
            >
              {'SAHAL'.split('').map((letter, idx) => (
                <span
                  key={idx}
                  className="inline-block transition-transform duration-300 group-hover:-translate-y-0.5 text-[#F8FAFC] group-hover:text-[#22D3EE]"
                  style={{ transitionDelay: `${idx * 35}ms` }}
                >
                  {letter}
                </span>
              ))}
            </Link>
          </div>

          {/* Center: Top Navbar Split-Character Stagger Roll Links */}
          <nav
            onMouseLeave={() => setHoveredIndex(null)}
            className="hidden md:flex items-center gap-1.5 p-1 rounded-full bg-[#090E17]/60 backdrop-blur-md border border-white/[0.06] relative"
          >
            {navItems.map((item, idx) => {
              const isHovered = hoveredIndex === idx;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onMouseEnter={() => setHoveredIndex(idx)}
                  className={`relative px-4 py-1.5 rounded-full text-xs font-mono transition-colors flex items-center gap-1.5 z-10 ${
                    isHovered ? 'text-white font-medium' : 'text-[#94A3B8] hover:text-[#F8FAFC]'
                  }`}
                >
                  {/* Sliding Magnetic Capsule Pill */}
                  {isHovered && (
                    <motion.div
                      layoutId="nav-sliding-pill"
                      transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                      className="absolute inset-0 rounded-full bg-[#0E74E9]/20 border border-[#22D3EE]/50 shadow-[0_0_15px_rgba(34,211,238,0.25)] -z-10"
                    />
                  )}

                  <span className="text-[10px] text-[#22D3EE] font-semibold">{item.num}</span>

                  {/* Character Stagger Roll */}
                  <SplitTextRoll text={item.label} isHovered={isHovered} />

                  {item.count && (
                    <span className="text-[10px] text-[#64748B] font-normal">{item.count}</span>
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right: Eco Mode Toggle & Round ••• Drawer Button */}
          <div className="flex items-center gap-3">
            {/* Eco Mode Toggle */}
            <button
              onClick={toggleEcoMode}
              type="button"
              title={isEcoMode ? 'Beralih ke Mode 60 FPS' : 'Beralih ke Mode Hemat Animasi'}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono border transition-all ${
                isEcoMode
                  ? 'bg-[#0E74E9]/20 border-[#22D3EE]/40 text-[#22D3EE]'
                  : 'bg-[#090E17] border-white/[0.08] text-[#94A3B8] hover:text-[#22D3EE] hover:border-[#22D3EE]/40'
              }`}
            >
              {isEcoMode ? (
                <>
                  <Leaf className="w-3.5 h-3.5 text-[#22D3EE]" />
                  <span className="font-semibold">ECO</span>
                </>
              ) : (
                <>
                  <Zap className="w-3.5 h-3.5 text-[#22D3EE]" />
                  <span>60 FPS</span>
                </>
              )}
            </button>

            {/* Inverted Round ••• Navigation Drawer Button ala Unseen Studio */}
            <button
              onClick={() => setDrawerOpen(true)}
              type="button"
              aria-label="Buka menu navigasi slide-over"
              className="w-10 h-10 rounded-full bg-white text-slate-900 shadow-[0_0_20px_rgba(255,255,255,0.25)] flex items-center justify-center hover:scale-105 active:scale-95 transition-all group"
            >
              <span className="text-base font-bold tracking-widest text-slate-900 group-hover:scale-110 transition-transform">
                •••
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Half-Screen Slide-Over Navigation Drawer */}
      <NavigationDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}
