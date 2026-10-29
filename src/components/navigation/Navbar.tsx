'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePerformanceMode } from '@/lib/hooks/usePerformanceMode';
import { Zap, Leaf, Menu, X, ArrowUpRight } from 'lucide-react';
import ScrollProgressBar from '@/components/ui/ScrollProgressBar';

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

  const navLinks = [
    { label: 'Karya', href: '#karya' },
    { label: 'Tech Stack', href: '#tech-stack' },
    { label: 'Profil', href: '#profil' },
    { label: 'Keahlian', href: '#keahlian' },
    { label: 'Kontak', href: '#kontak' },
  ];

  return (
    <>
      {/* Scroll Progress Bar at very top */}
      <ScrollProgressBar />

      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-[#070709]/85 backdrop-blur-md border-b border-white/[0.08] py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-6xl mx-auto px-5 sm:px-8 flex items-center justify-between">
          {/* Left: Brand + Telemetry Status */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-base font-semibold tracking-tight text-[#F4F4F6] hover:text-white transition-colors"
            >
              Sahal Siraaj
            </Link>
            <span className="hidden sm:inline-block text-[#63636E]">/</span>
            <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-[#A1A1AA] bg-[#14161D] px-2.5 py-1 rounded border border-white/[0.06]">
              {/* Steady indicator dot per antislop-ui R-31 (no endless pulse) */}
              <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8]" />
              <span className="text-[#38BDF8]">SYS ONLINE</span>
              <span className="text-[#63636E]">·</span>
              <span className="tabular-nums">{uptimeSeconds}s</span>
            </div>
          </div>

          {/* Center: Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs font-mono text-[#A1A1AA] hover:text-[#38BDF8] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right: Eco Mode Toggle & CTA */}
          <div className="flex items-center gap-3">
            {/* Hemat Animasi Toggle */}
            <button
              onClick={toggleEcoMode}
              type="button"
              title={isEcoMode ? 'Beralih ke Mode 60 FPS' : 'Beralih ke Hemat Animasi'}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono border transition-all ${
                isEcoMode
                  ? 'bg-[#38BDF8]/10 border-[#38BDF8]/30 text-[#38BDF8]'
                  : 'bg-[#14161D] border-white/[0.08] text-[#A1A1AA] hover:text-[#38BDF8] hover:border-[#38BDF8]/20'
              }`}
            >
              {isEcoMode ? (
                <>
                  <Leaf className="w-3.5 h-3.5" />
                  <span>ECO</span>
                </>
              ) : (
                <>
                  <Zap className="w-3.5 h-3.5" />
                  <span>60 FPS</span>
                </>
              )}
            </button>

            {/* CTA Link with bright blue accent */}
            <a
              href="#kontak"
              className="hidden sm:inline-flex items-center gap-1.5 bg-[#2563EB] text-[#F4F4F6] px-3.5 py-1.5 rounded text-xs font-mono font-medium hover:bg-[#3B82F6] hover:shadow-[0_0_12px_rgba(59,130,246,0.35)] transition-all"
            >
              <span>Mari Bicara</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="md:hidden p-2 text-[#A1A1AA] hover:text-[#F4F4F6] focus:outline-none"
              aria-label="Buka navigasi mobile"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#0D0E12] border-b border-white/[0.08] px-6 py-5 flex flex-col gap-4">
            <div className="flex items-center gap-2 text-xs font-mono text-[#A1A1AA] pb-3 border-b border-white/[0.06]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8]" />
              <span className="text-[#38BDF8]">SYS ONLINE</span>
              <span className="text-[#63636E]">·</span>
              <span>{isEcoMode ? 'MODE HEMAT ANIMASI' : '60 FPS AKTIF'}</span>
            </div>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-mono text-[#F4F4F6] hover:text-white transition-colors py-1"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#kontak"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-1.5 bg-[#2563EB] hover:bg-[#3B82F6] text-[#F4F4F6] py-2.5 rounded text-xs font-mono font-medium shadow-sm shadow-[#2563EB]/25"
            >
              <span>Mari Bicara</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        )}
      </header>
    </>
  );
}
