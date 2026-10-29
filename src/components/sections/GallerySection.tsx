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
      '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹',
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
    <section id="karya" className="py-24 sm:py-32 bg-[#05070B] border-t border-white/[0.08] relative">
      {/* Background Subtle Ambience */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#0E74E9]/10 blur-[130px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <ScrollReveal>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14">
            <div>
              <div className="flex items-center gap-2 font-mono text-xs text-[#22D3EE] uppercase tracking-widest mb-3">
                <span className="font-bold">02</span>
                <span className="text-white/20">·</span>
                <span className="font-semibold">GALERI KARYA SISTEM BENTO</span>
              </div>
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-medium tracking-tight text-[#F8FAFC] leading-[1.04]">
                Sistem Terintegrasi & Rekayasa Perangkat
              </h2>
            </div>
            <div className="font-mono text-xs flex items-center gap-2">
              <span className="px-3 py-1.5 rounded-full bg-[#090E17] border border-white/[0.08] font-semibold text-[#22D3EE]">
                {filteredProjects.length.toString().padStart(2, '0')} DOKUMENTASI SISTEM
              </span>
            </div>
          </div>
        </ScrollReveal>

        {/* Unseen Category Filter & Search Bar */}
        <ScrollReveal delay={0.1}>
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-12">
            {/* Category Pills with Superscript count */}
            <div className="flex flex-wrap items-center gap-2">
              {categoriesWithCount.map((cat) => (
                <button
                  key={cat.name}
                  type="button"
                  onClick={() => setActiveCategory(cat.name)}
                  className={`px-4 py-2 rounded-full text-xs font-mono transition-all flex items-baseline gap-1.5 ${
                    activeCategory === cat.name
                      ? 'bg-[#22D3EE] text-[#05070B] font-bold shadow-[0_0_20px_rgba(34,211,238,0.35)]'
                      : 'bg-[#090E17] text-[#94A3B8] border border-white/[0.08] hover:text-[#F8FAFC] hover:border-[#22D3EE]/40'
                  }`}
                >
                  <span>{cat.name}</span>
                  <span className={`text-[10px] font-mono ${activeCategory === cat.name ? 'text-[#05070B]/80' : 'text-[#64748B]'}`}>
                    {toSuperscript(cat.count)}
                  </span>
                </button>
              ))}
            </div>

            {/* Quick Search */}
            <div className="relative min-w-[260px]">
              <Search className="w-3.5 h-3.5 text-[#64748B] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari alat, peran, atau kata kunci..."
                className="w-full bg-[#090E17] border border-white/[0.08] focus:border-[#22D3EE] rounded-full pl-9 pr-8 py-2 text-xs font-mono text-[#F8FAFC] placeholder-[#64748B] outline-none transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-white"
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {filteredProjects.map((project, idx) => {
              const isFlagship = project.index_code === '01' && activeCategory === 'Semua';
              const isConsoleBox = project.slug === 'console-box-rfid-presensi-smkn9';
              return (
                <ScrollReveal key={project.id} delay={idx * 0.1}>
                  <div id={isConsoleBox ? 'console-box' : undefined} className="scroll-mt-28">
                    <ProjectCard project={project} isFeaturedSpan={isFlagship} />
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        ) : (
          /* Empty State */
          <div className="p-12 text-center rounded-2xl bg-[#090E17] border border-white/[0.08]">
            <p className="text-sm font-mono text-[#94A3B8] mb-3">
              Tidak ada karya yang sesuai dengan kriteria pencarian &quot;{searchQuery}&quot;
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveCategory('Semua');
                setSearchQuery('');
              }}
              className="text-xs font-mono text-[#22D3EE] font-semibold underline underline-offset-4 hover:text-white"
            >
              Reset filter dan pencarian ⮡
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
