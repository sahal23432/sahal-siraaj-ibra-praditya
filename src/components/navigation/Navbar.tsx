'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePerformanceMode } from '@/lib/hooks/usePerformanceMode';
import { Zap, Leaf, Menu, X, ArrowUpRight } from 'lucide-react';
import ScrollProgressBar from '@/components/ui/ScrollProgressBar';

const navItems = [
  { num: '01', label: 'Beranda', href: '#hero', count: '' },
  { num: '02', label: 'Karya', href: '#karya', count: '[03]' },
  { num: '03', label: 'Profil', href: '#profil', count: '' },
  { num: '04', label: 'Kontak', href: '#kontak', count: '' },
];

export default function Navbar() {
  const { isEcoMode, toggleEcoMode } = usePerformanceMode();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [uptimeSeconds, setUptimeSeconds] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Telemetry session counter
  useEffect(() => {
    const timer = setInterval(() => {
      setUptimeSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <ScrollProgressBar />

      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-white/90 backdrop-blur-md border-b border-[#E5E7EB] py-3.5 shadow-xs'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-6xl mx-auto px-5 sm:px-8 flex items-center justify-between">
          {/* Left: Split-letter SAHAL logo + Status */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="group flex items-center gap-0.5 text-base font-mono font-bold tracking-wider text-[#111827]"
            >
              {'SAHAL'.split('').map((letter, idx) => (
                <span
                  key={idx}
                  className="inline-block transition-transform duration-300 group-hover:-translate-y-0.5 text-[#111827] group-hover:text-[#0E74E9]"
                  style={{ transitionDelay: `${idx * 40}ms` }}
                >
                  {letter}
                </span>
              ))}
            </Link>

            <span className="hidden sm:inline-block text-[#D1D5DB]">/</span>

            {/* Live Telemetry Pill */}
            <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-[#4B5563] bg-[#F1F5F9] px-2.5 py-1 rounded-full border border-[#E2E8F0]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0E74E9]" />
              <span className="text-[#0E74E9] font-medium">SYS ONLINE</span>
              <span className="text-[#94A3B8]">·</span>
              <span className="tabular-nums font-medium">{uptimeSeconds}s</span>
            </div>
          </div>

          {/* Center: Unseen Numbered Navigation with kinetic dual-layer hover */}
          <nav className="hidden md:flex items-center gap-7">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="group relative flex items-baseline gap-1.5 text-xs font-mono text-[#4B5563] hover:text-[#111827] transition-colors py-1 overflow-hidden"
              >
                <span className="text-[10px] text-[#0E74E9] font-semibold">{item.num}</span>
                <span className="font-medium relative overflow-hidden inline-block h-4 leading-4">
                  <span className="block transition-transform duration-300 ease-out group-hover:-translate-y-full">
                    {item.label}
                  </span>
                  <span className="absolute inset-0 block text-[#0E74E9] font-semibold transition-transform duration-300 ease-out translate-y-full group-hover:translate-y-0">
                    {item.label}
                  </span>
                </span>
                {item.count && (
                  <span className="text-[10px] text-[#94A3B8] font-normal">{item.count}</span>
                )}
              </a>
            ))}
          </nav>

          {/* Right: Eco Mode Toggle & Pill CTA */}
          <div className="flex items-center gap-3">
            {/* Eco Mode Toggle (Pill 9999px) */}
            <button
              onClick={toggleEcoMode}
              type="button"
              title={isEcoMode ? 'Beralih ke Mode 60 FPS' : 'Beralih ke Mode Hemat Animasi'}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono border transition-all ${
                isEcoMode
                  ? 'bg-[#E0F2FE] border-[#38BDF8] text-[#0369A1]'
                  : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#64748B] hover:text-[#0E74E9] hover:border-[#0E74E9]/30'
              }`}
            >
              {isEcoMode ? (
                <>
                  <Leaf className="w-3.5 h-3.5 text-[#0284C7]" />
                  <span className="font-semibold">ECO</span>
                </>
              ) : (
                <>
                  <Zap className="w-3.5 h-3.5 text-[#0E74E9]" />
                  <span>60 FPS</span>
                </>
              )}
            </button>

            {/* Nimbus Pill CTA: Royal Blue #0E74E9 */}
            <a
              href="#kontak"
              className="hidden sm:inline-flex items-center gap-1.5 bg-[#0E74E9] text-white px-4 py-1.5 rounded-full text-xs font-mono font-medium hover:bg-[#0256B4] hover:shadow-[0_4px_12px_rgba(14,116,233,0.3)] transition-all"
            >
              <span>Mari Kolaborasi</span>
              <span>⮡</span>
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="md:hidden p-2 text-[#4B5563] hover:text-[#111827] focus:outline-none"
              aria-label="Buka navigasi mobile"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-[#E5E7EB] px-6 py-5 flex flex-col gap-4 shadow-lg animate-in slide-in-from-top-2 duration-200">
            <div className="flex items-center gap-2 text-xs font-mono text-[#4B5563] pb-3 border-b border-[#F1F5F9]">
              <span className="w-2 h-2 rounded-full bg-[#0E74E9]" />
              <span className="text-[#0E74E9] font-medium">SYS ONLINE · SMKN 9</span>
              <span className="text-[#94A3B8]">·</span>
              <span>{isEcoMode ? 'MODE HEMAT' : '60 FPS AKTIF'}</span>
            </div>

            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between text-sm font-mono text-[#111827] hover:text-[#0E74E9] py-1.5 border-b border-[#F8FAFC]"
              >
                <span className="flex items-center gap-2">
                  <span className="text-xs text-[#0E74E9]">{item.num}</span>
                  <span>{item.label}</span>
                </span>
                {item.count && <span className="text-xs text-[#94A3B8]">{item.count}</span>}
              </a>
            ))}

            <a
              href="#kontak"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-2 bg-[#0E74E9] text-white py-2.5 rounded-full text-xs font-mono font-medium shadow-sm"
            >
              <span>Mari Kolaborasi</span>
              <span>⮡</span>
            </a>
          </div>
        )}
      </header>
    </>
  );
}
