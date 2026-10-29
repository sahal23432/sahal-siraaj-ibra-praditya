'use client';

import { useRef, useEffect, ReactNode } from 'react';
import { usePerformanceMode } from '@/lib/hooks/usePerformanceMode';

interface InteractiveBentoCardProps {
  children: ReactNode;
  className?: string;
}

export default function InteractiveBentoCard({
  children,
  className = '',
}: InteractiveBentoCardProps) {
  const { isEcoMode, prefersReducedMotion } = usePerformanceMode();
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const rectRef = useRef<DOMRect | null>(null);
  const rafId = useRef<number | null>(null);

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
      glareRef.current.style.background = `radial-gradient(350px circle at ${x}px ${y}px, rgba(34,211,238,0.12), transparent 75%)`;
      glareRef.current.style.opacity = '1';
    }
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
      if (glareRef.current) {
        glareRef.current.style.background = `radial-gradient(350px circle at ${x}px ${y}px, rgba(34,211,238,0.12), transparent 75%)`;
        glareRef.current.style.opacity = '1';
      }
    });
  };

  const handleMouseLeave = () => {
    if (rafId.current) cancelAnimationFrame(rafId.current);
    rectRef.current = null;

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
      className={`relative overflow-hidden rounded-2xl bg-[#082F49] border border-[#22D3EE]/22 hover:border-[#22D3EE]/60 shadow-xl transition-all duration-300 hover:-translate-y-1.5 ${className}`}
    >
      {/* Interactive Telemetry Spotlight */}
      {!isEcoMode && !prefersReducedMotion && (
        <div
          ref={glareRef}
          aria-hidden="true"
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 z-0"
        />
      )}

      <div className="relative z-10 h-full flex flex-col justify-between">
        {children}
      </div>
    </div>
  );
}
