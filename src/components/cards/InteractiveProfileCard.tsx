'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Profile } from '@/types/portfolio';
import { usePerformanceMode } from '@/lib/hooks/usePerformanceMode';
import { MapPin, Terminal } from 'lucide-react';

interface InteractiveProfileCardProps {
  profile: Profile;
}

export default function InteractiveProfileCard({ profile }: InteractiveProfileCardProps) {
  const { isEcoMode, prefersReducedMotion } = usePerformanceMode();
  const cardRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const rectRef = useRef<DOMRect | null>(null);
  const rafId = useRef<number | null>(null);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isEcoMode || prefersReducedMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    rectRef.current = rect;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (glareRef.current) {
      glareRef.current.style.background = `radial-gradient(420px circle at ${x}px ${y}px, rgba(34,211,238,0.18), transparent 75%)`;
      glareRef.current.style.opacity = '1';
    }

    if (innerRef.current) {
      innerRef.current.style.transition = 'transform 0.08s ease-out';
    }
    cardRef.current.style.transition = 'border-color 0.2s ease, box-shadow 0.3s ease';
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isEcoMode || prefersReducedMotion || !cardRef.current) return;

    if (!rectRef.current) {
      rectRef.current = cardRef.current.getBoundingClientRect();
    }

    const rect = rectRef.current;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (rafId.current) cancelAnimationFrame(rafId.current);

    rafId.current = requestAnimationFrame(() => {
      if (!innerRef.current) return;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;

      innerRef.current.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.015, 1.015, 1.015)`;

      if (glareRef.current) {
        glareRef.current.style.background = `radial-gradient(420px circle at ${x}px ${y}px, rgba(34,211,238,0.18), transparent 75%)`;
        glareRef.current.style.opacity = '1';
      }
    });
  };

  const handleMouseLeave = () => {
    if (rafId.current) cancelAnimationFrame(rafId.current);
    rectRef.current = null;

    if (innerRef.current) {
      innerRef.current.style.transition = 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)';
      innerRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    }

    if (glareRef.current) {
      glareRef.current.style.opacity = '0';
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative rounded-2xl bg-[#082F49] border border-[#22D3EE]/25 hover:border-[#22D3EE]/60 overflow-hidden shadow-2xl transition-colors select-none text-left"
    >
      {/* 3D Holographic Glare Layer */}
      {!isEcoMode && !prefersReducedMotion && (
        <div
          ref={glareRef}
          aria-hidden="true"
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 z-0"
        />
      )}

      {/* 3D Transform Space Inner Container */}
      <div
        ref={innerRef}
        style={{
          transformStyle: 'preserve-3d',
          transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
          willChange: isEcoMode || prefersReducedMotion ? 'auto' : 'transform',
        }}
        className="relative z-10 p-6 sm:p-7"
      >
        {/* Card Header Telemetry */}
        <div
          style={{ transform: !isEcoMode && !prefersReducedMotion ? 'translateZ(20px)' : 'none' }}
          className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-5 transition-transform duration-200"
        >
          <div className="flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-[#22D3EE]" />
            <span className="text-[11px] font-mono tracking-wider text-[#94A3B8] uppercase">
              ID: SAHAL-28
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#22D3EE] bg-[#041624] px-2.5 py-0.5 rounded-full border border-[#22D3EE]/30">
            <span className="w-1.5 h-1.5 rounded-full bg-[#22D3EE] animate-pulse" />
            <span>VERIFIED ARCHITECT</span>
          </div>
        </div>

        {/* 3D Photo & Holographic Portrait Area */}
        <div
          style={{ transform: !isEcoMode && !prefersReducedMotion ? 'translateZ(30px)' : 'none' }}
          className="relative aspect-[4/4.2] w-full rounded-xl bg-[#041624] border border-white/[0.08] overflow-hidden flex flex-col items-center justify-center p-4 mb-6 transition-transform duration-200 group"
        >
          {/* Corner Crosshair Accents */}
          <span className="absolute top-2 left-2 text-[10px] font-mono text-[#22D3EE]/50">┌</span>
          <span className="absolute top-2 right-2 text-[10px] font-mono text-[#22D3EE]/50">┐</span>
          <span className="absolute bottom-2 left-2 text-[10px] font-mono text-[#22D3EE]/50">└</span>
          <span className="absolute bottom-2 right-2 text-[10px] font-mono text-[#22D3EE]/50">┘</span>

          {/* User avatar photo */}
          {profile.avatar_url && !imgError ? (
            <div className="relative w-full h-full rounded-lg overflow-hidden border border-white/[0.08]">
              <Image
                src={profile.avatar_url}
                alt={profile.full_name}
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                onError={() => setImgError(true)}
                priority
              />
              {/* Subtle Vignette & telemetry sheen */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#041624]/75 via-transparent to-transparent pointer-events-none" />
              <div
                className="absolute inset-0 pointer-events-none opacity-15"
                style={{
                  backgroundImage:
                    'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.4) 2px, rgba(0,0,0,0.4) 4px)',
                }}
              />
            </div>
          ) : (
            /* Procedural Geometric Portrait */
            <div className="relative flex flex-col items-center justify-center text-center w-full h-full">
              <svg
                className="absolute inset-0 w-full h-full opacity-35 pointer-events-none"
                viewBox="0 0 200 200"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="100" cy="100" r="40" stroke="#22D3EE" strokeWidth="0.8" fill="none" opacity="0.6" />
                <circle cx="100" cy="100" r="65" stroke="#0E74E9" strokeWidth="0.6" fill="none" opacity="0.4" strokeDasharray="4 3" />
                <circle cx="100" cy="100" r="90" stroke="#22D3EE" strokeWidth="0.4" fill="none" opacity="0.25" />
                <line x1="100" y1="10" x2="100" y2="190" stroke="#22D3EE" strokeWidth="0.4" opacity="0.3" />
                <line x1="10" y1="100" x2="190" y2="100" stroke="#22D3EE" strokeWidth="0.4" opacity="0.3" />
              </svg>

              <div className="relative z-10 w-20 h-20 rounded-2xl bg-[#041624] border border-[#22D3EE]/30 shadow-2xl flex flex-col items-center justify-center mb-3">
                <span className="font-mono text-2xl font-bold tracking-tight text-[#F8FAFC]">
                  SS
                </span>
                <span className="text-[9px] font-mono text-[#22D3EE] font-semibold">SMKN 9</span>
              </div>

              <div className="relative z-10">
                <div className="text-xs font-mono font-medium text-[#F8FAFC]">
                  {profile.full_name}
                </div>
                <div className="text-[10px] font-mono text-[#94A3B8] mt-0.5">
                  Pengembang Web & IoT
                </div>
              </div>
            </div>
          )}

          {/* Bottom Tag inside photo frame */}
          <div className="absolute bottom-3 inset-x-3 bg-[#041624]/90 backdrop-blur-sm border border-white/[0.08] px-2.5 py-1.5 rounded-lg flex items-center justify-between text-[10px] font-mono">
            <span className="text-[#94A3B8]">WEB SYS</span>
            <span className="text-[#22D3EE] font-semibold">ONLINE · 60 FPS</span>
          </div>
        </div>

        {/* Metadata Detail Rows */}
        <div
          style={{ transform: !isEcoMode && !prefersReducedMotion ? 'translateZ(15px)' : 'none' }}
          className="space-y-3 font-mono text-xs transition-transform duration-200"
        >
          {/* Fokus Row */}
          <div className="p-3 rounded-xl bg-[#041624]/80 border border-white/[0.06] flex items-center justify-between">
            <span className="text-[#94A3B8] text-[11px] uppercase">FOKUS UTAMA</span>
            <span className="text-[#F8FAFC] font-semibold text-[11px]">
              Web & IoT Integration
            </span>
          </div>

          {/* Location Row */}
          <div className="p-3 rounded-xl bg-[#041624]/80 border border-white/[0.06] flex flex-col gap-1">
            <div className="flex items-center gap-1.5 text-[11px] text-[#94A3B8] uppercase">
              <MapPin className="w-3 h-3 text-[#22D3EE]" />
              <span>Alamat Rumah</span>
            </div>
            <p className="text-xs text-[#F8FAFC] font-medium leading-relaxed pl-4">
              {profile.location}
            </p>
          </div>

          {/* Status Row */}
          <div className="p-3 rounded-xl bg-[#041624]/80 border border-white/[0.06] flex items-center justify-between">
            <span className="text-[#94A3B8] text-[11px] uppercase">STATUS</span>
            <span className="text-[#22D3EE] font-semibold text-[11px] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#22D3EE]" />
              Terbuka PKL / Magang
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
