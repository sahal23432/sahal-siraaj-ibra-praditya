'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { Project } from '@/types/portfolio';
import { usePerformanceMode } from '@/lib/hooks/usePerformanceMode';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const { isEcoMode } = usePerformanceMode();
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [transformStyle, setTransformStyle] = useState('');

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isEcoMode || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });

    // Subtle 3D tilt calculation (max 3 degrees)
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -3;
    const rotateY = ((x - centerX) / centerX) * 3;
    setTransformStyle(
      `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`
    );
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTransformStyle('perspective(1000px) rotateX(0deg) rotateY(0deg)');
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: isEcoMode ? 'none' : transformStyle,
        transition: isHovered ? 'border-color 0.15s ease' : 'transform 0.4s ease, border-color 0.2s ease',
      }}
      className="relative group rounded-xl bg-[#0D0E12] border border-white/[0.08] hover:border-white/[0.22] p-6 sm:p-8 flex flex-col justify-between overflow-hidden active:scale-[0.99]"
    >
      {/* Radial Spotlight on Hover */}
      {!isEcoMode && isHovered && (
        <div
          className="pointer-events-none absolute -inset-px rounded-xl opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.06), transparent 80%)`,
          }}
        />
      )}

      <div>
        {/* Top Metadata Row: Index + Year on left, Status Badge on right */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2 font-mono text-xs text-[#63636E] tabular-nums">
            <span className="text-[#A1A1AA] font-semibold">{project.index_code}</span>
            <span>·</span>
            <span>{project.year}</span>
            <span>·</span>
            <span className="uppercase text-[#A1A1AA]">{project.category}</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#14161D] border border-white/[0.06] text-[11px] font-mono text-[#10B981]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
            <span className="uppercase tracking-wider">{project.status_badge}</span>
          </div>
        </div>

        {/* Title and Summary */}
        <h3 className="text-xl sm:text-2xl font-medium tracking-tight text-[#F4F4F6] group-hover:text-white transition-colors mb-2.5">
          <Link href={`/karya/${project.slug}`} className="hover:underline focus:outline-none">
            {project.title}
          </Link>
        </h3>
        <p className="text-sm text-[#A1A1AA] leading-relaxed mb-6">
          {project.summary}
        </p>

        {/* 4-Step Pipeline Telemetry Block */}
        {project.pipeline_steps && project.pipeline_steps.length > 0 && (
          <div className="bg-[#14161D]/90 rounded-lg p-4 mb-6 border border-white/[0.06]">
            <div className="text-[10px] font-mono uppercase tracking-widest text-[#63636E] mb-3 flex items-center justify-between">
              <span>ALUR SISTEM (TELEMETRY PIPELINE)</span>
              <span>4 TAHAPAN</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {project.pipeline_steps.map((st, i) => (
                <div
                  key={i}
                  className="bg-[#0D0E12] p-2.5 rounded border border-white/[0.04] flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between text-[10px] font-mono text-[#63636E] mb-1">
                    <span>{st.step}</span>
                    <CheckCircle2 className="w-3 h-3 text-[#10B981]/70" />
                  </div>
                  <div className="text-xs font-mono font-medium text-[#F4F4F6] mb-0.5">
                    {st.label}
                  </div>
                  <div className="text-[10px] text-[#A1A1AA] line-clamp-1">{st.detail}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Explicit Role Row */}
        <div className="text-xs font-mono text-[#A1A1AA] mb-4 pb-4 border-b border-white/[0.06]">
          <span className="text-[#63636E]">Peran saya: </span>
          <span className="text-[#F4F4F6] font-medium">{project.role}</span>
        </div>
      </div>

      <div>
        {/* Tools separated by middle dot */}
        <div className="text-xs font-mono text-[#63636E] mb-6 flex flex-wrap gap-x-2 gap-y-1">
          {project.tools.map((tool, idx) => (
            <span key={idx} className="inline-flex items-center">
              <span className="text-[#A1A1AA]">{tool}</span>
              {idx < project.tools.length - 1 && (
                <span className="ml-2 text-[#63636E]">·</span>
              )}
            </span>
          ))}
        </div>

        {/* Bottom Actions */}
        <div className="flex items-center justify-between pt-2">
          <Link
            href={`/karya/${project.slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-mono text-[#F4F4F6] hover:text-white transition-colors py-1 group-hover:translate-x-0.5 duration-150"
          >
            <span>Buka Detail Studi Kasus</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#A1A1AA] group-hover:text-white" />
          </Link>

          {project.live_url && (
            <a
              href={project.live_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-mono text-[#A1A1AA] hover:text-[#F4F4F6] transition-colors"
            >
              <span>Kunjungi Web</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
