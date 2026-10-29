'use client';

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import { Project } from '@/types/portfolio';
import { usePerformanceMode } from '@/lib/hooks/usePerformanceMode';
import { CheckCircle2, Cpu, Globe, Layers } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  isFeaturedSpan?: boolean;
}

export default function ProjectCard({ project, isFeaturedSpan = false }: ProjectCardProps) {
  const { isEcoMode, prefersReducedMotion } = usePerformanceMode();
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const rectRef = useRef<DOMRect | null>(null);
  const rafId = useRef<number | null>(null);

  // Clean up RAF on unmount
  useEffect(() => {
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isEcoMode || prefersReducedMotion || !cardRef.current) return;
    // Cache bounding rect on enter so tilting doesn't shift coordinates (fixes oscillation/jitter bug)
    const rect = cardRef.current.getBoundingClientRect();
    rectRef.current = rect;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (glareRef.current) {
      glareRef.current.style.background = `radial-gradient(550px circle at ${x}px ${y}px, rgba(34,211,238,0.15), transparent 75%)`;
      glareRef.current.style.opacity = '1';
    }

    // Set responsive transition while hovering
    cardRef.current.style.transition = 'transform 0.08s ease-out, border-color 0.2s ease, box-shadow 0.3s ease';
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
      if (!cardRef.current) return;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      // Smooth tilt limits: max 3.5 degrees
      const rotateX = ((y - centerY) / centerY) * -3.5;
      const rotateY = ((x - centerX) / centerX) * 3.5;

      cardRef.current.style.transform = `perspective(1000px) translateY(-5px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`;

      if (glareRef.current) {
        glareRef.current.style.background = `radial-gradient(550px circle at ${x}px ${y}px, rgba(34,211,238,0.15), transparent 75%)`;
        glareRef.current.style.opacity = '1';
      }
    });
  };

  const handleMouseLeave = () => {
    if (rafId.current) cancelAnimationFrame(rafId.current);
    rectRef.current = null;

    if (!cardRef.current) return;

    // Smooth return to neutral without snapping
    cardRef.current.style.transition = 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.25s ease, box-shadow 0.3s ease';
    cardRef.current.style.transform = 'perspective(1000px) translateY(0px) rotateX(0deg) rotateY(0deg)';

    if (glareRef.current) {
      glareRef.current.style.opacity = '0';
    }
  };

  // Determine icon based on category
  const renderCategoryIcon = () => {
    if (project.category.includes('IoT') || project.category.includes('Hardware')) {
      return <Cpu className="w-4 h-4 text-[#22D3EE]" />;
    }
    if (project.category.includes('Web 3D')) {
      return <Layers className="w-4 h-4 text-[#22D3EE]" />;
    }
    return <Globe className="w-4 h-4 text-[#22D3EE]" />;
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: 'perspective(1000px) translateY(0px) rotateX(0deg) rotateY(0deg)',
        willChange: isEcoMode || prefersReducedMotion ? 'auto' : 'transform',
      }}
      className={`relative group rounded-2xl bg-[#082F49] border border-[#22D3EE]/22 hover:border-[#22D3EE]/60 p-6 sm:p-8 flex flex-col justify-between overflow-hidden shadow-xl text-left select-none ${
        isFeaturedSpan ? 'lg:col-span-2' : 'col-span-1'
      }`}
    >
      {/* Radial Hover Spotlight (Hardware Telemetry Glare) */}
      {!isEcoMode && !prefersReducedMotion && (
        <div
          ref={glareRef}
          aria-hidden="true"
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 z-0"
        />
      )}

      <div className="relative z-10">
        {/* Top Header Row: Index + Year + Category on left, Live Status Pill on right */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-2 font-mono text-xs text-[#94A3B8]">
            <span className="text-[#22D3EE] font-bold text-sm tracking-wider">{project.index_code}</span>
            <span>·</span>
            <span>{project.year}</span>
            <span>·</span>
            <span className="uppercase tracking-wider text-[#F8FAFC] flex items-center gap-1.5">
              {renderCategoryIcon()}
              <span>{project.category}</span>
            </span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#041624] border border-[#22D3EE]/30 text-[11px] font-mono text-[#22D3EE] shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#22D3EE] animate-pulse" />
            <span className="uppercase font-semibold tracking-wider">{project.status_badge}</span>
          </div>
        </div>

        {/* Title and Summary */}
        <h3 className="text-xl sm:text-2xl lg:text-3xl font-medium tracking-tight text-[#F8FAFC] group-hover:text-white transition-colors mb-3">
          <Link href={`/karya/${project.slug}`} className="hover:underline focus:outline-none">
            {project.title}
          </Link>
        </h3>
        <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed mb-6 font-normal max-w-3xl">
          {project.summary}
        </p>

        {/* 4-Step Pipeline Telemetry Visualizer */}
        {project.pipeline_steps && project.pipeline_steps.length > 0 && (
          <div className="bg-[#041624]/90 rounded-xl p-4 sm:p-5 mb-6 border border-[#22D3EE]/20 shadow-inner">
            <div className="text-[11px] font-mono uppercase tracking-widest text-[#94A3B8] mb-3 flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-[#22D3EE] font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#22D3EE]" />
                ALUR SISTEM (TELEMETRY PIPELINE)
              </span>
              <span className="text-white/40">4 TAHAPAN KERJA</span>
            </div>

            <div className={`grid gap-2.5 ${isFeaturedSpan ? 'grid-cols-2 lg:grid-cols-4' : 'grid-cols-2'}`}>
              {project.pipeline_steps.map((st, i) => (
                <div
                  key={i}
                  className="bg-[#082F49] p-3 rounded-lg border border-white/[0.08] flex flex-col justify-between hover:border-[#22D3EE]/40 transition-colors"
                >
                  <div className="flex items-center justify-between text-[11px] font-mono text-[#94A3B8] mb-1.5">
                    <span className="font-bold text-[#22D3EE]">{st.step}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#22D3EE]" />
                  </div>
                  <div className="text-xs font-mono font-semibold text-[#F8FAFC] mb-0.5">
                    {st.label}
                  </div>
                  <div className="text-[11px] text-[#94A3B8] line-clamp-1">{st.detail}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Role Meta Row */}
        <div className="text-xs font-mono text-[#94A3B8] mb-4 pb-4 border-b border-white/[0.08] flex flex-wrap items-baseline gap-1.5">
          <span className="text-[#94A3B8]/70 uppercase tracking-wider">Peran saya:</span>
          <span className="text-[#F8FAFC] font-medium">{project.role}</span>
        </div>
      </div>

      <div className="relative z-10">
        {/* Tools Badges (rounded: 8px control) */}
        <div className="text-xs font-mono mb-6 flex flex-wrap gap-2">
          {project.tools.map((tool, idx) => (
            <span
              key={idx}
              className="px-2.5 py-1 rounded-lg bg-[#041624] border border-white/[0.08] text-[#94A3B8] hover:text-[#F8FAFC] hover:border-[#22D3EE]/40 transition-colors text-[11px]"
            >
              {tool}
            </span>
          ))}
        </div>

        {/* Bottom Unseen Arrow Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-white/[0.08]">
          <Link
            href={`/karya/${project.slug}`}
            className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-[#22D3EE] hover:text-white transition-colors group-hover:translate-x-1 duration-200"
          >
            <span>Buka Detail Studi Kasus</span>
            <span>⮡</span>
          </Link>

          {project.live_url && (
            <a
              href={project.live_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-[#F8FAFC] hover:text-[#22D3EE] transition-colors"
            >
              <span>Kunjungi Website</span>
              <span>⮡</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
