import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import { getProjectBySlug, getAllProjects } from '@/lib/services/projects';
import { ArrowLeft, ArrowUpRight, CheckCircle2, Cpu, Wrench } from 'lucide-react';

import ScrollProgressBar from '@/components/ui/ScrollProgressBar';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: 'Karya Tidak Ditemukan' };

  return {
    title: `${project.title} · Sahal Siraaj`,
    description: project.summary,
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const allProjects = await getAllProjects();
  const currentIndex = allProjects.findIndex((p) => p.slug === slug);
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
  const nextProject =
    currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null;

  // Split narrative blocks from markdown string
  const storySections = project.story_behind
    .split('###')
    .filter((s) => s.trim().length > 0)
    .map((block) => {
      const lines = block.trim().split('\n');
      const title = lines[0].trim();
      const content = lines.slice(1).join('\n').trim();
      return { title, content };
    });

  return (
    <main className="min-h-screen bg-[#070709] text-[#F4F4F6] pt-12 pb-24">
      <ScrollProgressBar />
      {/* Top Navigation */}
      <div className="max-w-5xl mx-auto px-5 sm:px-8 mb-10">
        <Link
          href="/#karya"
          className="inline-flex items-center gap-2 text-xs font-mono text-[#A1A1AA] hover:text-[#F4F4F6] transition-colors py-1"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>KEMBALI KE GALERI KARYA</span>
        </Link>
      </div>

      {/* Case Study Header */}
      <header className="max-w-5xl mx-auto px-5 sm:px-8 mb-14">
        <div className="flex items-center gap-3 font-mono text-xs text-[#63636E] mb-4">
          <span className="text-[#A1A1AA] font-semibold">{project.index_code}</span>
          <span>·</span>
          <span>{project.year}</span>
          <span>·</span>
          <span className="uppercase text-[#A1A1AA]">{project.category}</span>
          <span>·</span>
          <span className="text-[#10B981] inline-flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
            {project.status_badge}
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-medium tracking-tight text-[#F4F4F6] mb-4 leading-tight">
          {project.title}
        </h1>

        <p className="text-base sm:text-lg text-[#A1A1AA] leading-relaxed max-w-3xl mb-8">
          {project.summary}
        </p>

        {/* Live URL Link */}
        {project.live_url && (
          <a
            href={project.live_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded bg-[#EDEDEF] text-[#070709] text-xs font-mono font-medium hover:bg-white transition-colors"
          >
            <span>KUNJUNGI WEBSITE LANGSUNG</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        )}
      </header>

      {/* Architecture & Pipeline Telemetry Block */}
      {project.pipeline_steps && project.pipeline_steps.length > 0 && (
        <section className="max-w-5xl mx-auto px-5 sm:px-8 mb-16">
          <div className="bg-[#0D0E12] border border-white/[0.08] rounded-xl p-6 sm:p-8">
            <div className="flex items-center justify-between text-xs font-mono text-[#63636E] uppercase tracking-wider mb-6 pb-3 border-b border-white/[0.06]">
              <span className="flex items-center gap-2 text-[#F4F4F6]">
                <Cpu className="w-4 h-4 text-[#10B981]" />
                DIAGRAM ALUR SISTEM (TELEMETRY PIPELINE)
              </span>
              <span>4 TAHAPAN KERJA</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {project.pipeline_steps.map((st, i) => (
                <div
                  key={i}
                  className="bg-[#14161D] rounded-lg p-4 border border-white/[0.06] flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between text-xs font-mono text-[#63636E] mb-2">
                    <span className="text-[#A1A1AA] font-semibold">{st.step}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-mono font-semibold text-[#F4F4F6] mb-1">
                      {st.label}
                    </h4>
                    <p className="text-xs text-[#A1A1AA] leading-snug">{st.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Main Content Layout: Story narrative + Sticky Sidebar */}
      <div className="max-w-5xl mx-auto px-5 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
        {/* Left Column: Structured Narrative */}
        <div className="lg:col-span-8 space-y-12">
          {storySections.map((sec, i) => (
            <div key={i} className="bg-[#0D0E12] border border-white/[0.08] rounded-xl p-6 sm:p-8">
              <h3 className="text-base sm:text-lg font-medium text-[#F4F4F6] mb-4 pb-3 border-b border-white/[0.06] font-mono">
                {sec.title}
              </h3>
              <div className="text-sm sm:text-base text-[#A1A1AA] leading-relaxed whitespace-pre-line space-y-4">
                {sec.content}
              </div>
            </div>
          ))}
        </div>

        {/* Right Column: Sticky Sidebar (Peran & Alat) */}
        <div className="lg:col-span-4 sticky top-24 space-y-6">
          {/* Role Box */}
          <div className="bg-[#0D0E12] border border-white/[0.08] rounded-xl p-6">
            <div className="text-xs font-mono uppercase tracking-widest text-[#63636E] mb-2">
              PERAN SAYA DALAM SISTEM
            </div>
            <div className="text-sm font-medium text-[#F4F4F6] leading-snug">
              {project.role}
            </div>
          </div>

          {/* Tools & Stack Box */}
          <div className="bg-[#0D0E12] border border-white/[0.08] rounded-xl p-6">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#63636E] mb-4">
              <Wrench className="w-3.5 h-3.5 text-[#EDEDEF]" />
              <span>ALAT & TEKNOLOGI</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.tools.map((tool, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded bg-[#14161D] border border-white/[0.06] text-xs font-mono text-[#F4F4F6]"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* Verification Badge */}
          <div className="bg-[#0D0E12] border border-white/[0.08] rounded-xl p-6">
            <div className="text-xs font-mono text-[#63636E] mb-1">STATUS VALIDASI</div>
            <div className="text-xs font-mono text-[#10B981] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
              <span>TERVERIFIKASI & AKTIF</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation between Projects */}
      <footer className="max-w-5xl mx-auto px-5 sm:px-8 pt-10 border-t border-white/[0.08] flex items-center justify-between">
        {prevProject ? (
          <Link
            href={`/karya/${prevProject.slug}`}
            className="flex flex-col items-start gap-1 text-xs font-mono text-[#A1A1AA] hover:text-[#F4F4F6]"
          >
            <span className="text-[#63636E]">← KARYA SEBELUMNYA</span>
            <span className="text-sm font-medium text-[#F4F4F6]">{prevProject.title}</span>
          </Link>
        ) : (
          <div />
        )}

        {nextProject && (
          <Link
            href={`/karya/${nextProject.slug}`}
            className="flex flex-col items-end gap-1 text-xs font-mono text-[#A1A1AA] hover:text-[#F4F4F6]"
          >
            <span className="text-[#63636E]">KARYA BERIKUTNYA →</span>
            <span className="text-sm font-medium text-[#F4F4F6]">{nextProject.title}</span>
          </Link>
        )}
      </footer>
    </main>
  );
}
