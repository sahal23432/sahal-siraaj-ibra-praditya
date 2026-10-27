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

  // Extract distinct categories
  const categories = useMemo(() => {
    const cats = Array.from(new Set(projects.map((p) => p.category)));
    return ['Semua', ...cats];
  }, [projects]);

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
    <section id="karya" className="py-24 max-w-6xl mx-auto px-5 sm:px-8 border-t border-white/[0.08]">
      {/* Section Header */}
      <ScrollReveal>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-[#63636E] uppercase tracking-wider mb-2">
              <span>01</span>
              <span>·</span>
              <span>KARYA SISTEM TERPILIH</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-medium tracking-tight text-[#F4F4F6]">
              Sistem Terintegrasi & Rekayasa Perangkat
            </h2>
          </div>
          <div className="font-mono text-xs text-[#63636E]">
            <span>DOKUMENTASI SISTEM</span>
            <span className="mx-2">·</span>
            <span className="text-[#A1A1AA]">{filteredProjects.length.toString().padStart(2, '0')} KARYA</span>
          </div>
        </div>
      </ScrollReveal>

      {/* Filter & Search Bar */}
      <ScrollReveal delay={0.1}>
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-10">
          {/* Category Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded text-xs font-mono transition-all ${
                  activeCategory === cat
                    ? 'bg-[#F4F4F6] text-[#070709] font-medium'
                    : 'bg-[#14161D] text-[#A1A1AA] border border-white/[0.06] hover:text-[#F4F4F6] hover:border-white/20'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Quick Search */}
          <div className="relative min-w-[260px]">
            <Search className="w-3.5 h-3.5 text-[#63636E] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari alat, peran, atau kata kunci..."
              className="w-full bg-[#0D0E12] border border-white/[0.08] focus:border-white/30 rounded pl-9 pr-8 py-1.5 text-xs font-mono text-[#F4F4F6] placeholder-[#63636E] outline-none transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                type="button"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#63636E] hover:text-[#F4F4F6]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </ScrollReveal>

      {/* Projects Grid with Staggered Scroll Reveals */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {filteredProjects.map((project, idx) => (
            <ScrollReveal key={project.id} delay={idx * 0.12}>
              <ProjectCard project={project} />
            </ScrollReveal>
          ))}
        </div>
      ) : (
        /* Empty State (R-27) */
        <div className="p-12 text-center rounded-xl bg-[#0D0E12] border border-white/[0.06]">
          <p className="text-sm font-mono text-[#A1A1AA] mb-3">
            Tidak ada karya yang sesuai dengan kriteria pencarian &quot;{searchQuery}&quot;
          </p>
          <button
            type="button"
            onClick={() => {
              setActiveCategory('Semua');
              setSearchQuery('');
            }}
            className="text-xs font-mono text-[#EDEDEF] underline underline-offset-4 hover:text-white"
          >
            Reset filter dan pencarian
          </button>
        </div>
      )}
    </section>
  );
}
