import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import { getProjectBySlug, getAllProjects } from '@/lib/services/projects';
import { ArrowLeft, CheckCircle2, Cpu, Wrench } from 'lucide-react';
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
    <main className="min-h-screen bg-[#05070B] text-[#F8FAFC] pt-12 pb-24 relative selection:bg-[#22D3EE]/30 selection:text-white">
      <ScrollProgressBar />

      {/* Top Navigation Back */}
      <div className="max-w-5xl mx-auto px-5 sm:px-8 mb-10">
        <Link
          href="/#karya"
          className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-[#22D3EE] hover:text-white transition-colors py-1"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>⮡ KEMBALI KE GALERI KARYA</span>
        </Link>
      </div>

      {/* Case Study Header on Obsidian Background */}
      <header className="max-w-5xl mx-auto px-5 sm:px-8 mb-14 text-left">
        <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-[#94A3B8] mb-4">
          <span className="text-[#22D3EE] font-bold text-sm tracking-wider">{project.index_code}</span>
          <span>·</span>
          <span>{project.year}</span>
          <span>·</span>
          <span className="uppercase text-[#F8FAFC] font-semibold">{project.category}</span>
          <span>·</span>
          <span className="px-2.5 py-0.5 rounded-full bg-[#090E17] border border-[#22D3EE]/30 text-[#22D3EE] font-semibold inline-flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#22D3EE] animate-pulse" />
            {project.status_badge}
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-medium tracking-tight text-[#F8FAFC] mb-5 leading-[1.06]">
          {project.title}
        </h1>

        <p className="text-base sm:text-lg text-[#94A3B8] leading-relaxed max-w-3xl mb-8 font-normal">
          {project.summary}
        </p>

        {/* Live URL Link Button */}
        {project.live_url && (
          <a
            href={project.live_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0E74E9] hover:bg-[#0284C7] text-white text-xs font-mono font-semibold transition-all shadow-[0_0_20px_rgba(14,116,233,0.35)]"
          >
            <span>KUNJUNGI WEBSITE LANGSUNG</span>
            <span>⮡</span>
          </a>
        )}
      </header>

      {/* Architecture & Pipeline Telemetry Block: Surface #090E17 */}
      {project.pipeline_steps && project.pipeline_steps.length > 0 && (
        <section className="max-w-5xl mx-auto px-5 sm:px-8 mb-16 text-left">
          <div className="bg-[#090E17] border border-white/[0.08] rounded-2xl p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between text-xs font-mono text-[#94A3B8] uppercase tracking-wider mb-6 pb-3 border-b border-white/[0.08]">
              <span className="flex items-center gap-2 text-[#22D3EE] font-semibold">
                <Cpu className="w-4 h-4 text-[#22D3EE]" />
                DIAGRAM ALUR SISTEM (TELEMETRY PIPELINE)
              </span>
              <span className="text-white/40">4 TAHAPAN KERJA</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {project.pipeline_steps.map((st, i) => (
                <div
                  key={i}
                  className="bg-[#04060A] rounded-xl p-4 border border-white/[0.06] flex flex-col justify-between hover:border-[#22D3EE]/40 transition-colors"
                >
                  <div className="flex items-center justify-between text-xs font-mono text-[#94A3B8] mb-2">
                    <span className="text-[#22D3EE] font-bold">{st.step}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#22D3EE]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-mono font-semibold text-[#F8FAFC] mb-1">
                      {st.label}
                    </h4>
                    <p className="text-xs text-[#94A3B8] leading-snug">{st.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Main Content Layout: Story narrative + Sticky Sidebar */}
      <div className="max-w-5xl mx-auto px-5 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-20 text-left">
        {/* Left Column: Structured Narrative Bento Cards */}
        <div className="lg:col-span-8 space-y-6">
          {storySections.map((sec, i) => (
            <div key={i} className="bg-[#090E17] border border-white/[0.08] rounded-2xl p-6 sm:p-8 shadow-xl">
              <h3 className="text-base sm:text-lg font-medium text-[#F8FAFC] mb-4 pb-3 border-b border-white/[0.08] font-mono flex items-center gap-2">
                <span className="text-[#22D3EE]">0{i + 1} //</span>
                <span>{sec.title}</span>
              </h3>
              <div className="text-sm sm:text-base text-[#94A3B8] leading-relaxed whitespace-pre-line space-y-4 font-normal">
                {sec.content}
              </div>
            </div>
          ))}
        </div>

        {/* Right Column: Sticky Sidebar (Peran & Alat) */}
        <div className="lg:col-span-4 sticky top-24 space-y-6">
          {/* Role Box */}
          <div className="bg-[#090E17] border border-white/[0.08] rounded-2xl p-6 shadow-xl">
            <div className="text-xs font-mono uppercase tracking-widest text-[#22D3EE] mb-2 font-semibold">
              PERAN SAYA DALAM SISTEM
            </div>
            <div className="text-sm font-medium text-[#F8FAFC] leading-snug">
              {project.role}
            </div>
          </div>

          {/* Tools & Stack Box */}
          <div className="bg-[#090E17] border border-white/[0.08] rounded-2xl p-6 shadow-xl">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#94A3B8] mb-4">
              <Wrench className="w-3.5 h-3.5 text-[#22D3EE]" />
              <span>ALAT & TEKNOLOGI</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.tools.map((tool, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg bg-[#04060A] border border-white/[0.06] text-xs font-mono text-[#F8FAFC]"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* Verification Badge */}
          <div className="bg-[#090E17] border border-white/[0.08] rounded-2xl p-6 shadow-xl">
            <div className="text-xs font-mono text-[#94A3B8] mb-1.5">STATUS VALIDASI</div>
            <div className="text-xs font-mono text-[#22D3EE] font-semibold flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#22D3EE] animate-pulse" />
              <span>TERVERIFIKASI & AKTIF</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation between Projects */}
      <footer className="max-w-5xl mx-auto px-5 sm:px-8 pt-10 border-t border-white/[0.08] flex items-center justify-between text-left">
        {prevProject ? (
          <Link
            href={`/karya/${prevProject.slug}`}
            className="flex flex-col items-start gap-1 text-xs font-mono text-[#94A3B8] hover:text-[#22D3EE] transition-colors"
          >
            <span className="text-[#64748B]">← KARYA SEBELUMNYA</span>
            <span className="text-sm font-medium text-[#F8FAFC]">{prevProject.title}</span>
          </Link>
        ) : (
          <div />
        )}

        {nextProject && (
          <Link
            href={`/karya/${nextProject.slug}`}
            className="flex flex-col items-end gap-1 text-xs font-mono text-[#94A3B8] hover:text-[#22D3EE] transition-colors"
          >
            <span className="text-[#64748B]">KARYA BERIKUTNYA →</span>
            <span className="text-sm font-medium text-[#F8FAFC]">{nextProject.title}</span>
          </Link>
        )}
      </footer>
    </main>
  );
}
