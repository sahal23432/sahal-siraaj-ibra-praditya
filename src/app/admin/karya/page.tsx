'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getAllProjects, createProject, updateProject, deleteProject } from '@/lib/services/projects';
import { Project, PipelineStep } from '@/types/portfolio';
import { Plus, Trash2, Edit3, X, ArrowLeft, ExternalLink, Layers } from 'lucide-react';

export default function AdminKaryaPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const data = await getAllProjects();
      setProjects(data);
    } catch (err) {
      console.error('Failed to load projects:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;

    const formattedTools = typeof editingProject.tools === 'string'
      ? (editingProject.tools as string).split(',').map((s) => s.trim()).filter(Boolean)
      : editingProject.tools || [];

    if (isCreating) {
      const newProj = await createProject({
        index_code: editingProject.index_code || `0${projects.length + 1}`,
        year: editingProject.year || '2026',
        slug: editingProject.slug || `karya-${Date.now()}`,
        title: editingProject.title || 'Karya Baru',
        summary: editingProject.summary || '',
        category: editingProject.category || 'Web 3D',
        status_badge: editingProject.status_badge || 'Active System',
        thumbnail_url: editingProject.thumbnail_url || '/images/default.webp',
        pipeline_steps: editingProject.pipeline_steps || [
          { step: '01', label: 'INPUT', detail: 'Tahap Masukan' },
          { step: '02', label: 'PROSES', detail: 'Pengolahan Logika' },
          { step: '03', label: 'EVALUASI', detail: 'Pengujian Hasil' },
          { step: '04', label: 'OUTPUT', detail: 'Penyajian Sistem' },
        ],
        story_behind: editingProject.story_behind || '### 01 Konteks & Masalah\n...\n### 02 Pendekatan & Arsitektur\n...\n### 03 Hasil & Dampak\n...',
        role: editingProject.role || 'Perancang Sistem',
        tools: formattedTools,
        live_url: editingProject.live_url || null,
        repo_url: editingProject.repo_url || null,
        is_featured: !!editingProject.is_featured,
        display_order: projects.length + 1,
        published: true,
      });
      setProjects([...projects, newProj]);
    } else if (editingProject.id) {
      const updated = await updateProject(editingProject.id, {
        ...editingProject,
        tools: formattedTools,
      });
      setProjects(projects.map((p) => (p.id === updated.id ? updated : p)));
    }

    setEditingProject(null);
    setIsCreating(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Yakin ingin menghapus karya ini?')) {
      await deleteProject(id);
      setProjects(projects.filter((p) => p.id !== id));
    }
  };

  const handleStepChange = (
    index: number,
    field: keyof PipelineStep,
    value: string
  ) => {
    if (!editingProject) return;
    const steps = [...(editingProject.pipeline_steps || [])];
    steps[index] = { ...steps[index], [field]: value };
    setEditingProject({ ...editingProject, pipeline_steps: steps });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-[#63636E] uppercase mb-1">
            <Link href="/admin" className="hover:text-[#F4F4F6]">
              PANEL ADMIN
            </Link>
            <span>/</span>
            <span>KELOLA KARYA SISTEM</span>
          </div>
          <h1 className="text-2xl font-medium tracking-tight text-[#F4F4F6]">
            Daftar & Pengelolaan Karya Lengkap
          </h1>
        </div>

        <button
          onClick={() => {
            setIsCreating(true);
            setEditingProject({
              title: '',
              slug: '',
              summary: '',
              category: 'Web 3D',
              status_badge: 'Active System',
              role: 'Perancang Sistem',
              tools: [],
              live_url: '',
              repo_url: '',
              thumbnail_url: '',
              story_behind: '### 01 Konteks & Masalah\n\n### 02 Pendekatan & Arsitektur\n\n### 03 Hasil & Dampak',
              pipeline_steps: [
                { step: '01', label: 'INPUT', detail: 'Tahap masukan' },
                { step: '02', label: 'PROSES', detail: 'Logika sistem' },
                { step: '03', label: 'TRANSMISI', detail: 'Pengiriman data' },
                { step: '04', label: 'HASIL', detail: 'Penyajian akhir' },
              ],
              is_featured: false,
            });
          }}
          type="button"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0E74E9] hover:bg-[#0256B4] text-white text-xs font-mono font-semibold transition-all shadow-[0_4px_12px_rgba(14,116,233,0.3)]"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>TAMBAH KARYA BARU ⮡</span>
        </button>
      </div>

      {/* Editor Modal / Drawer */}
      {editingProject && (
        <div className="bg-[#082F49] border border-[#22D3EE]/25 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl">
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
            <h3 className="text-sm font-mono font-medium text-[#F8FAFC] flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#22D3EE]" />
              <span>{isCreating ? 'TAMBAH KARYA BARU' : 'EDIT DETAIL KARYA'}</span>
            </h3>
            <button
              onClick={() => {
                setEditingProject(null);
                setIsCreating(false);
              }}
              type="button"
              className="text-[#63636E] hover:text-[#F4F4F6]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-mono text-[#A1A1AA] uppercase mb-1">
                Judul Karya *
              </label>
              <input
                type="text"
                required
                value={editingProject.title || ''}
                onChange={(e) =>
                  setEditingProject({ ...editingProject, title: e.target.value })
                }
                className="w-full bg-[#14161D] border border-white/[0.08] rounded px-3 py-2 text-xs font-mono text-[#F4F4F6] outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-[#A1A1AA] uppercase mb-1">
                Slug URL (Hanya huruf kecil dan tanda hubung) *
              </label>
              <input
                type="text"
                required
                value={editingProject.slug || ''}
                onChange={(e) =>
                  setEditingProject({ ...editingProject, slug: e.target.value })
                }
                className="w-full bg-[#14161D] border border-white/[0.08] rounded px-3 py-2 text-xs font-mono text-[#F4F4F6] outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-[#A1A1AA] uppercase mb-1">
                Kategori
              </label>
              <input
                type="text"
                value={editingProject.category || ''}
                onChange={(e) =>
                  setEditingProject({ ...editingProject, category: e.target.value })
                }
                placeholder="IoT & Hardware, Fullstack, atau Web 3D"
                className="w-full bg-[#14161D] border border-white/[0.08] rounded px-3 py-2 text-xs font-mono text-[#F4F4F6] outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-[#A1A1AA] uppercase mb-1">
                Lencana Status
              </label>
              <input
                type="text"
                value={editingProject.status_badge || ''}
                onChange={(e) =>
                  setEditingProject({ ...editingProject, status_badge: e.target.value })
                }
                placeholder="Live Production / Active System"
                className="w-full bg-[#14161D] border border-white/[0.08] rounded px-3 py-2 text-xs font-mono text-[#F4F4F6] outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-mono text-[#A1A1AA] uppercase mb-1">
                Ringkasan Singkat (Tampil di kartu galeri) *
              </label>
              <input
                type="text"
                required
                value={editingProject.summary || ''}
                onChange={(e) =>
                  setEditingProject({ ...editingProject, summary: e.target.value })
                }
                className="w-full bg-[#14161D] border border-white/[0.08] rounded px-3 py-2 text-xs font-mono text-[#F4F4F6] outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-[#A1A1AA] uppercase mb-1">
                Peran Saya dalam Proyek *
              </label>
              <input
                type="text"
                required
                value={editingProject.role || ''}
                onChange={(e) =>
                  setEditingProject({ ...editingProject, role: e.target.value })
                }
                placeholder="Perancang Hardware & Web"
                className="w-full bg-[#14161D] border border-white/[0.08] rounded px-3 py-2 text-xs font-mono text-[#F4F4F6] outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-[#A1A1AA] uppercase mb-1">
                Alat & Stack (Pisahkan Koma)
              </label>
              <input
                type="text"
                value={
                  Array.isArray(editingProject.tools)
                    ? editingProject.tools.join(', ')
                    : typeof editingProject.tools === 'string'
                    ? editingProject.tools
                    : ''
                }
                onChange={(e) =>
                  setEditingProject({
                    ...editingProject,
                    tools: e.target.value as any,
                  })
                }
                placeholder="RFID, Next.js, TypeScript, Tailwind"
                className="w-full bg-[#14161D] border border-white/[0.08] rounded px-3 py-2 text-xs font-mono text-[#F4F4F6] outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-[#A1A1AA] uppercase mb-1">
                Tautan Website (Live URL)
              </label>
              <input
                type="url"
                value={editingProject.live_url || ''}
                onChange={(e) =>
                  setEditingProject({ ...editingProject, live_url: e.target.value })
                }
                placeholder="https://..."
                className="w-full bg-[#14161D] border border-white/[0.08] rounded px-3 py-2 text-xs font-mono text-[#F4F4F6] outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-[#A1A1AA] uppercase mb-1">
                Tautan Repositori (Repo URL)
              </label>
              <input
                type="url"
                value={editingProject.repo_url || ''}
                onChange={(e) =>
                  setEditingProject({ ...editingProject, repo_url: e.target.value })
                }
                placeholder="https://github.com/..."
                className="w-full bg-[#14161D] border border-white/[0.08] rounded px-3 py-2 text-xs font-mono text-[#F4F4F6] outline-none"
              />
            </div>

            {/* 4 Steps Telemetry Pipeline Editor */}
            <div className="md:col-span-2 p-4 rounded-xl bg-[#041624] border border-[#22D3EE]/20 space-y-3">
              <div className="text-xs font-mono text-[#22D3EE] uppercase font-semibold">
                ALUR SISTEM (4 TAHAPAN TELEMETRY PIPELINE)
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {(editingProject.pipeline_steps || [
                  { step: '01', label: '', detail: '' },
                  { step: '02', label: '', detail: '' },
                  { step: '03', label: '', detail: '' },
                  { step: '04', label: '', detail: '' },
                ]).map((st, i) => (
                  <div key={i} className="space-y-1.5 p-3 rounded-lg bg-[#082F49] border border-white/[0.06]">
                    <div className="text-[10px] font-mono text-[#22D3EE] font-bold">TAHAP {st.step || `0${i+1}`}</div>
                    <input
                      type="text"
                      placeholder="Label (cth. INPUT)"
                      value={st.label}
                      onChange={(e) => handleStepChange(i, 'label', e.target.value)}
                      className="w-full bg-[#041624] border border-white/[0.08] focus:border-[#22D3EE] rounded px-2 py-1 text-xs font-mono text-[#F8FAFC] outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Detail ringkas"
                      value={st.detail}
                      onChange={(e) => handleStepChange(i, 'detail', e.target.value)}
                      className="w-full bg-[#041624] border border-white/[0.08] focus:border-[#22D3EE] rounded px-2 py-1 text-[11px] font-mono text-[#94A3B8] outline-none"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Story Behind Markdown */}
            <div className="md:col-span-2">
              <label className="block text-xs font-mono text-[#94A3B8] uppercase mb-1">
                Cerita di Balik Karya (Studi Kasus Naratif Markdown)
              </label>
              <textarea
                rows={7}
                value={editingProject.story_behind || ''}
                onChange={(e) =>
                  setEditingProject({ ...editingProject, story_behind: e.target.value })
                }
                className="w-full bg-[#041624] border border-white/[0.08] focus:border-[#22D3EE] rounded px-3 py-2 text-xs font-mono text-[#F8FAFC] outline-none resize-none"
              />
            </div>

            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 text-xs font-mono text-[#94A3B8] cursor-pointer">
                <input
                  type="checkbox"
                  checked={!!editingProject.is_featured}
                  onChange={(e) =>
                    setEditingProject({ ...editingProject, is_featured: e.target.checked })
                  }
                  className="rounded bg-[#041624] border-white/20"
                />
                <span>Tandai sebagai Karya Unggulan</span>
              </label>
            </div>

            <div className="md:col-span-2 flex justify-end gap-3 pt-4 border-t border-white/[0.06]">
              <button
                type="button"
                onClick={() => {
                  setEditingProject(null);
                  setIsCreating(false);
                }}
                className="px-4 py-2 rounded-lg bg-[#041624] hover:bg-[#062438] text-xs font-mono text-[#94A3B8]"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-full bg-[#0E74E9] hover:bg-[#0256B4] text-white text-xs font-mono font-semibold shadow-md"
              >
                Simpan Perubahan ⮡
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Projects Table */}
      <div className="bg-[#082F49] border border-[#22D3EE]/25 rounded-2xl overflow-hidden shadow-xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/[0.08] bg-[#041624] text-[11px] font-mono text-[#94A3B8]">
              <th className="py-3 px-4">KODE</th>
              <th className="py-3 px-4">JUDUL KARYA</th>
              <th className="py-3 px-4">KATEGORI</th>
              <th className="py-3 px-4">STATUS</th>
              <th className="py-3 px-4 text-right">AKSI</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04] text-xs font-mono">
            {projects.map((proj) => (
              <tr key={proj.id} className="hover:bg-[#041624]/50 transition-colors">
                <td className="py-3.5 px-4 text-[#22D3EE] font-bold">{proj.index_code}</td>
                <td className="py-3.5 px-4">
                  <div className="font-medium text-[#F8FAFC]">{proj.title}</div>
                  <div className="text-[11px] text-[#94A3B8] line-clamp-1">{proj.summary}</div>
                </td>
                <td className="py-3.5 px-4 text-[#94A3B8]">{proj.category}</td>
                <td className="py-3.5 px-4">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#041624] border border-[#22D3EE]/30 text-[#22D3EE] text-[10px] font-semibold">
                    <span className="w-1 h-1 rounded-full bg-[#22D3EE]" />
                    {proj.status_badge}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-right">
                  <div className="inline-flex items-center gap-2">
                    <Link
                      href={`/karya/${proj.slug}`}
                      target="_blank"
                      className="p-1 text-[#63636E] hover:text-[#F4F4F6]"
                      title="Lihat Halaman Publik"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                    <button
                      onClick={() => {
                        setIsCreating(false);
                        setEditingProject(proj);
                      }}
                      type="button"
                      className="p-1 text-[#A1A1AA] hover:text-[#F4F4F6]"
                      title="Edit"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(proj.id)}
                      type="button"
                      className="p-1 text-red-400/70 hover:text-red-400"
                      title="Hapus"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
