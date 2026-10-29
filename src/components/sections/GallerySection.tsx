'use client';

import { useState, useMemo } from 'react';
import { Project } from '@/types/portfolio';
import ProjectCard from '@/components/cards/ProjectCard';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { Search, X } from 'lucide-react';

interface GallerySectionProps {
  projects: Project[];
}

export default function GallerySection({ projects }: GallerySectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Extract distinct categories with counts for Unseen Studio superscript style
  const categoriesWithCount = useMemo(() => {
    const counts: Record<string, number> = {
      Semua: projects.length,
    };
    projects.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });

    const cats = Array.from(new Set(projects.map((p) => p.category)));
    return ['Semua', ...cats].map((cat) => ({
      name: cat,
      count: counts[cat] || 0,
    }));
  }, [projects]);

  // Convert number to superscript unicode
  const toSuperscript = (num: number) => {
    const supers: Record<string, string> = {
      '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴',
      '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹'
    };
    return num.toString().split('').map((ch) => supers[ch] || ch).join('');
  };

  // Filter projects by category and search query
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchCategory =
        activeCategory === 'Semua' || project.category === activeCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchSearch =
        query === '' ||
        project.title.toLowerCase().includes(query) ||
        project.summary.toLowerCase().includes(query) ||
        project.tools.some((t) => t.toLowerCase().includes(query)) ||
        project.role.toLowerCase().includes(query);
      return matchCategory && matchSearch;
    });
  }, [projects, activeCategory, searchQuery]);

  return (
    <section id="karya" className="py-20 sm:py-28 bg-[#FFFFFF] border-t border-[#E5E7EB]">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <ScrollReveal>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <div className="flex items-center gap-2 font-mono text-xs text-[#0E74E9] uppercase tracking-wider mb-3">
                <span className="font-bold">02</span>
                <span className="text-[#D1D5DB]">·</span>
                <span className="font-semibold">GALERI KARYA SISTEM BENTO</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-[#111827] leading-[1.04]">
                Sistem Terintegrasi & Rekayasa Perangkat
              </h2>
            </div>
            <div className="font-mono text-xs text-[#64748B] flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-full bg-[#F1F5F9] border border-[#E2E8F0] font-semibold text-[#111827]">
                {filteredProjects.length.toString().padStart(2, '0')} DOKUMENTASI
              </span>
            </div>
          </div>
        </ScrollReveal>

        {/* Unseen Category Filter & Search Bar */}
        <ScrollReveal delay={0.1}>
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-10">
            {/* Category Pills with Superscript count */}
            <div className="flex flex-wrap items-center gap-2">
              {categoriesWithCount.map((cat) => (
                <button
                  key={cat.name}
                  type="button"
                  onClick={() => setActiveCategory(cat.name)}
                  className={`px-4 py-2 rounded-full text-xs font-mono transition-all flex items-baseline gap-1.5 ${
                    activeCategory === cat.name
                      ? 'bg-[#0E74E9] text-white font-semibold shadow-[0_4px_12px_rgba(14,116,233,0.3)]'
                      : 'bg-[#F8FAFC] text-[#4B5563] border border-[#E2E8F0] hover:text-[#0E74E9] hover:border-[#0E74E9]/30'
                  }`}
                >
                  <span>{cat.name}</span>
                  <span className={`text-[10px] font-mono ${activeCategory === cat.name ? 'text-white/80' : 'text-[#94A3B8]'}`}>
                    {toSuperscript(cat.count)}
                  </span>
                </button>
              ))}
            </div>

            {/* Quick Search */}
            <div className="relative min-w-[260px]">
              <Search className="w-3.5 h-3.5 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari alat, peran, atau kata kunci..."
                className="w-full bg-[#F8FAFC] border border-[#E2E8F0] focus:border-[#0E74E9] focus:bg-white rounded-full pl-9 pr-8 py-2 text-xs font-mono text-[#111827] placeholder-[#94A3B8] outline-none transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#111827]"
                  aria-label="Hapus pencarian"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </ScrollReveal>

        {/* Asymmetrical Bento Grid Layout */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
            {filteredProjects.map((project, idx) => {
              // The first flagship project (Console Box RFID) spans 2 columns in the Bento Grid when showing "Semua" or multiple
              const isFlagship = project.index_code === '01' && activeCategory === 'Semua';
              return (
                <ScrollReveal key={project.id} delay={idx * 0.1}>
                  <ProjectCard project={project} isFeaturedSpan={isFlagship} />
                </ScrollReveal>
              );
            })}
          </div>
        ) : (
          /* Empty State */
          <div className="p-12 text-center rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0]">
            <p className="text-sm font-mono text-[#4B5563] mb-3">
              Tidak ada karya yang sesuai dengan kriteria pencarian &quot;{searchQuery}&quot;
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveCategory('Semua');
                setSearchQuery('');
              }}
              className="text-xs font-mono text-[#0E74E9] font-semibold underline underline-offset-4 hover:text-[#0256B4]"
            >
              Reset filter dan pencarian ⮡
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
