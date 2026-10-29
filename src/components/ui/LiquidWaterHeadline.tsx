'use client';

import { useRef, useEffect, useCallback } from 'react';
import { usePerformanceMode } from '@/lib/hooks/usePerformanceMode';

interface LiquidWaterHeadlineProps {
  firstName?: string;
  lastName?: string;
  roleBadge?: string;
  tagline?: string;
}

export default function LiquidWaterHeadline({
  firstName = 'SAHAL SIRAAJ',
  lastName = 'IBRA PRADITYA',
  roleBadge = 'A BRAND, WEB 3D & IOT SYSTEMS ARCHITECT · SMKN 9',
  tagline = 'Merancang sistem terintegrasi yang menghubungkan perangkat keras fisik dengan antarmuka web modern 3D.',
}: LiquidWaterHeadlineProps) {
  const { isEcoMode, prefersReducedMotion } = usePerformanceMode();
  const containerRef = useRef<HTMLDivElement>(null);
  const turbRef = useRef<SVGFETurbulenceElement>(null);
  const dispRef = useRef<SVGFEDisplacementMapElement>(null);

  // Physics refs for zero-react-render 60fps animation
  const mouseState = useRef({
    currentX: -200,
    currentY: -200,
    targetX: -200,
    targetY: -200,
    prevX: -200,
    prevY: -200,
    velocity: 0,
    proximity: 0,
    intensity: 0,
  });

  const waveOverlayRef = useRef<HTMLDivElement>(null);
  const causticRingRef = useRef<HTMLDivElement>(null);
  const rafId = useRef<number | null>(null);

  // Calculate distance from cursor to container rectangle
  const calculateProximity = useCallback((clientX: number, clientY: number, rect: DOMRect) => {
    const dx = Math.max(rect.left - clientX, 0, clientX - rect.right);
    const dy = Math.max(rect.top - clientY, 0, clientY - rect.bottom);
    const dist = Math.sqrt(dx * dx + dy * dy);

    // Activates wave smoothly within 160px approach distance, 1.0 when directly over text
    const maxThreshold = 160;
    if (dist <= 0) return 1.0;
    if (dist > maxThreshold) return 0;
    return 1 - dist / maxThreshold;
  }, []);

  useEffect(() => {
    if (isEcoMode || prefersReducedMotion) return;

    let time = 0;

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();

      let clientX = 0;
      let clientY = 0;

      if ('touches' in e && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else if ('clientX' in e) {
        clientX = e.clientX;
        clientY = e.clientY;
      }

      const relX = clientX - rect.left;
      const relY = clientY - rect.top;

      const prox = calculateProximity(clientX, clientY, rect);
      mouseState.current.proximity = prox;

      // Track cursor velocity to scale wave turbulence
      const vx = clientX - mouseState.current.prevX;
      const vy = clientY - mouseState.current.prevY;
      const speed = Math.sqrt(vx * vx + vy * vy);
      mouseState.current.velocity = Math.min(speed * 0.08, 1.8);

      mouseState.current.prevX = clientX;
      mouseState.current.prevY = clientY;

      mouseState.current.targetX = relX;
      mouseState.current.targetY = relY;
    };

    const handlePointerLeave = () => {
      mouseState.current.proximity = 0;
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });
    document.addEventListener('mouseleave', handlePointerLeave);

    // Main 60fps Wave Loop (Displacement waves localized specifically around cursor)
    const animateWave = () => {
      time += 0.025;

      const m = mouseState.current;

      // Smooth lerp cursor position
      m.currentX += (m.targetX - m.currentX) * 0.22;
      m.currentY += (m.targetY - m.currentY) * 0.22;

      // Decay velocity when cursor slows down
      m.velocity *= 0.88;

      // Target intensity combines proximity and motion velocity
      const targetIntensity = m.proximity * (0.15 + m.velocity * 0.85);
      m.intensity += (targetIntensity - m.intensity) * 0.12;

      // Update SVG Turbulence & Displacement only when wave is active
      if (turbRef.current && dispRef.current && m.intensity > 0.01) {
        // Dynamic wave oscillation math
        const waveFreqX = 0.016 + Math.sin(time * 2.8) * 0.007;
        const waveFreqY = 0.032 + Math.cos(time * 2.2) * 0.012;
        turbRef.current.setAttribute('baseFrequency', `${waveFreqX.toFixed(4)} ${waveFreqY.toFixed(4)}`);

        // Wave displacement scale (0 when cursor still/far, ripples up to 26px upon cursor sweep)
        const scaleVal = m.intensity * (14 + m.velocity * 16);
        dispRef.current.setAttribute('scale', scaleVal.toFixed(2));
      }

      // Update localized mask on the wave overlay layer
      if (waveOverlayRef.current) {
        const radius = Math.round(140 + m.intensity * 70);
        const curX = Math.round(m.currentX);
        const curY = Math.round(m.currentY);

        waveOverlayRef.current.style.opacity = (m.intensity * 1.05).toFixed(3);
        const maskStyle = `radial-gradient(circle ${radius}px at ${curX}px ${curY}px, black 0%, rgba(0,0,0,0.7) 45%, transparent 85%)`;
        waveOverlayRef.current.style.webkitMaskImage = maskStyle;
        waveOverlayRef.current.style.maskImage = maskStyle;
      }

      // Update specular caustic light follower ring
      if (causticRingRef.current) {
        causticRingRef.current.style.opacity = (m.intensity * 0.85).toFixed(3);
        causticRingRef.current.style.transform = `translate3d(${m.currentX}px, ${m.currentY}px, 0) translate(-50%, -50%)`;
      }

      rafId.current = requestAnimationFrame(animateWave);
    };

    rafId.current = requestAnimationFrame(animateWave);

    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
      document.removeEventListener('mouseleave', handlePointerLeave);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [isEcoMode, prefersReducedMotion, calculateProximity]);

  return (
    <div
      ref={containerRef}
      className="relative select-none flex flex-col items-center text-center cursor-default py-2 sm:py-4 w-full max-w-5xl mx-auto px-2 sm:px-4"
    >
      {/* SVG Liquid Refraction Wave Filter (Active only when cursor moves near) */}
      {!isEcoMode && !prefersReducedMotion && (
        <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
          <defs>
            <filter id="cursor-water-wave-filter" x="-20%" y="-20%" width="140%" height="140%">
              <feTurbulence
                ref={turbRef}
                type="turbulence"
                baseFrequency="0.02 0.04"
                numOctaves={3}
                result="waveTurbulence"
              />
              <feDisplacementMap
                ref={dispRef}
                in="SourceGraphic"
                in2="waveTurbulence"
                scale={0}
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>
          </defs>
        </svg>
      )}

      {/* Caustic Specular Wave Halo (Follows cursor point in real-time) */}
      {!isEcoMode && !prefersReducedMotion && (
        <div
          ref={causticRingRef}
          className="pointer-events-none absolute top-0 left-0 w-64 h-64 rounded-full bg-radial-at-c from-[#22D3EE]/35 via-[#0E74E9]/15 to-transparent blur-xl transition-opacity duration-150 z-0 opacity-0"
          aria-hidden="true"
        />
      )}

      {/* Over-title Sub-heading (Responsive pill badge) */}
      <div className="relative z-10 mb-3 sm:mb-4">
        <span className="inline-flex items-center gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-[#22D3EE]/10 border border-[#22D3EE]/25 backdrop-blur-md text-[10px] sm:text-xs font-mono font-semibold tracking-[0.18em] sm:tracking-[0.25em] text-[#22D3EE] uppercase shadow-[0_0_15px_rgba(34,211,238,0.15)]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#22D3EE] animate-pulse" />
          <span className="truncate max-w-[85vw] sm:max-w-none">{roleBadge}</span>
        </span>
      </div>

      {/* Headline Wrapper with Stacked Base & Localized Wave Layers */}
      <div className="relative z-10 flex flex-col items-center tracking-tighter w-full">
        {/* Layer 1: Base Ultra-Crisp Typography (Always 100% sharp and readable) */}
        <div className="flex flex-col items-center w-full">
          {/* Editorial Serif Italic Catchphrase ala Unseen Studio */}
          <span
            style={{ fontFamily: 'var(--font-serif, "Instrument Serif", Georgia, serif)' }}
            className="italic text-[clamp(1.75rem,5.2vw,4.5rem)] font-normal text-white/90 tracking-tight leading-tight mb-1 sm:mb-2 drop-shadow-[0_2px_12px_rgba(255,255,255,0.2)]"
          >
            Creating the unexpected
          </span>

          {/* First Line: SAHAL SIRAAJ (Fluid Responsive Scale: clamp(2.3rem, 8.4vw, 8rem)) */}
          <h1 className="text-[clamp(2.3rem,8.4vw,8rem)] font-black uppercase leading-[0.9] text-transparent bg-clip-text bg-gradient-to-b from-[#FFFFFF] via-[#F0F9FF] to-[#38BDF8] drop-shadow-[0_4px_28px_rgba(34,211,238,0.35)] w-full text-center">
            {firstName}
          </h1>

          {/* Second Line: IBRA PRADITYA (Fluid Responsive Scale: clamp(1.4rem, 5.6vw, 5.5rem)) */}
          <h2 className="text-[clamp(1.4rem,5.6vw,5.5rem)] font-extrabold uppercase leading-[0.95] tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#22D3EE] via-[#7DD3FC] to-[#0E74E9] mt-1.5 sm:mt-3 drop-shadow-[0_2px_22px_rgba(14,116,233,0.45)] w-full text-center">
            {lastName}
          </h2>
        </div>

        {/* Layer 2: Localized Fluid Wave Overlay (Activated ONLY around cursor movement) */}
        {!isEcoMode && !prefersReducedMotion && (
          <div
            ref={waveOverlayRef}
            style={{
              filter: 'url(#cursor-water-wave-filter)',
              willChange: 'filter, mask-image, opacity',
            }}
            className="absolute inset-0 flex flex-col items-center pointer-events-none opacity-0 transition-opacity duration-150 select-none z-10 w-full"
            aria-hidden="true"
          >
            <span
              style={{ fontFamily: 'var(--font-serif, "Instrument Serif", Georgia, serif)' }}
              className="italic text-[clamp(1.75rem,5.2vw,4.5rem)] font-normal text-[#22D3EE] tracking-tight leading-tight mb-1 sm:mb-2 drop-shadow-[0_0_20px_rgba(34,211,238,0.8)]"
            >
              Creating the unexpected
            </span>

            <div className="text-[clamp(2.3rem,8.4vw,8rem)] font-black uppercase leading-[0.9] text-transparent bg-clip-text bg-gradient-to-b from-[#22D3EE] via-[#BAE6FD] to-[#0E74E9] drop-shadow-[0_0_35px_rgba(34,211,238,0.9)] w-full text-center">
              {firstName}
            </div>

            <div className="text-[clamp(1.4rem,5.6vw,5.5rem)] font-extrabold uppercase leading-[0.95] tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#38BDF8] via-[#22D3EE] to-[#60A5FA] mt-1.5 sm:mt-3 drop-shadow-[0_0_30px_rgba(34,211,238,0.85)] w-full text-center">
              {lastName}
            </div>
          </div>
        )}
      </div>

      {/* Subtitle: High-clarity Editorial Description (Fluid Responsive Layout) */}
      <p className="relative z-10 text-xs sm:text-sm md:text-base lg:text-lg text-[#94A3B8] font-normal leading-relaxed max-w-xl sm:max-w-2xl px-3 mt-4 sm:mt-5 mb-5 sm:mb-7">
        {tagline}
      </p>
    </div>
  );
}
