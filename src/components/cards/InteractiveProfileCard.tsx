'use client';

import { useState, useRef } from 'react';
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
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [transformStyle, setTransformStyle] = useState('');
  const [imgError, setImgError] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isEcoMode || prefersReducedMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;

    setTransformStyle(
      `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.015, 1.015, 1.015)`
    );
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setTransformStyle('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: isEcoMode || prefersReducedMotion ? 'none' : transformStyle,
        transformStyle: 'preserve-3d',
        transition: isHovered
          ? 'transform 0.08s ease-out, border-color 0.2s ease'
          : 'transform 0.45s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.2s ease',
      }}
      className="relative rounded-2xl bg-[#082F49] border border-[#22D3EE]/25 hover:border-[#22D3EE]/60 p-6 sm:p-7 overflow-hidden shadow-2xl transition-colors select-none text-left"
    >
      {/* 3D Holographic Glare Layer */}
      {!isEcoMode && !prefersReducedMotion && isHovered && (
        <div
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(380px circle at ${mousePos.x}px ${mousePos.y}px, rgba(34,211,238,0.15), transparent 75%)`,
          }}
        />
      )}

      {/* Card Header Telemetry */}
      <div
        style={{ transform: isHovered && !isEcoMode ? 'translateZ(25px)' : 'none' }}
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
        style={{ transform: isHovered && !isEcoMode ? 'translateZ(35px)' : 'none' }}
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
        style={{ transform: isHovered && !isEcoMode ? 'translateZ(20px)' : 'none' }}
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
  );
}
