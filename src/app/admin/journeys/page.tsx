'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getJourneys, createJourney, updateJourney, deleteJourney } from '@/lib/services/profile';
import { Journey } from '@/types/portfolio';
import { Plus, Trash2, Edit3, Milestone, X, Briefcase, GraduationCap } from 'lucide-react';

export default function AdminJourneysPage() {
  const [journeys, setJourneys] = useState<Journey[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingJourney, setEditingJourney] = useState<Partial<Journey> | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [filterType, setFilterType] = useState<'all' | 'experience' | 'education'>('all');

  useEffect(() => {
    loadJourneys();
  }, []);

  const loadJourneys = async () => {
    try {
      const data = await getJourneys();
      setJourneys(data);
    } catch (err) {
      console.error('Failed to load journeys:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingJourney) return;

    if (isCreating) {
      const newJ = await createJourney({
        type: editingJourney.type || 'experience',
        title: editingJourney.title || 'Posisi / Gelar Baru',
        organization: editingJourney.organization || 'Nama Institusi',
        location: editingJourney.location || 'Semarang, Jawa Tengah',
        start_date: editingJourney.start_date || '2026',
        end_date: editingJourney.end_date || 'Sekarang',
        description: editingJourney.description || '',
        display_order: journeys.length + 1,
      });
      setJourneys([...journeys, newJ]);
    } else if (editingJourney.id) {
      const updated = await updateJourney(editingJourney.id, {
        type: editingJourney.type,
        title: editingJourney.title,
        organization: editingJourney.organization,
        location: editingJourney.location,
        start_date: editingJourney.start_date,
        end_date: editingJourney.end_date,
        description: editingJourney.description,
      });
      setJourneys(journeys.map((j) => (j.id === updated.id ? updated : j)));
    }

    setEditingJourney(null);
    setIsCreating(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Hapus riwayat ini?')) {
      await deleteJourney(id);
      setJourneys(journeys.filter((j) => j.id !== id));
    }
  };

  const visibleJourneys =
    filterType === 'all'
      ? journeys
      : journeys.filter((j) => j.type === filterType);

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
            <span>KELOLA LINI MASA</span>
          </div>
          <h1 className="text-2xl font-medium tracking-tight text-[#F4F4F6]">
            Riwayat Pengalaman & Pendidikan
          </h1>
        </div>

        <button
          onClick={() => {
            setIsCreating(true);
            setEditingJourney({
              type: 'experience',
              title: '',
              organization: '',
              location: 'Semarang, Jawa Tengah',
              start_date: '',
              end_date: 'Sekarang',
              description: '',
            });
          }}
          type="button"
          className="inline-flex items-center gap-2 px-4 py-2 rounded bg-[#2563EB] hover:bg-[#3B82F6] text-[#F4F4F6] text-xs font-mono font-medium transition-colors shadow-sm shadow-[#2563EB]/20"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>TAMBAH RIWAYAT BARU</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setFilterType('all')}
          className={`px-3 py-1.5 rounded text-xs font-mono transition-colors ${
            filterType === 'all'
              ? 'bg-[#F4F4F6] text-[#070709] font-medium'
              : 'bg-[#14161D] text-[#A1A1AA] border border-white/[0.06] hover:text-[#F4F4F6]'
          }`}
        >
          Semua Riwayat ({journeys.length})
        </button>
        <button
          type="button"
          onClick={() => setFilterType('experience')}
          className={`px-3 py-1.5 rounded text-xs font-mono transition-colors ${
            filterType === 'experience'
              ? 'bg-[#F4F4F6] text-[#070709] font-medium'
              : 'bg-[#14161D] text-[#A1A1AA] border border-white/[0.06] hover:text-[#F4F4F6]'
          }`}
        >
          Pengalaman Kerja & Proyek
        </button>
        <button
          type="button"
          onClick={() => setFilterType('education')}
          className={`px-3 py-1.5 rounded text-xs font-mono transition-colors ${
            filterType === 'education'
              ? 'bg-[#F4F4F6] text-[#070709] font-medium'
              : 'bg-[#14161D] text-[#A1A1AA] border border-white/[0.06] hover:text-[#F4F4F6]'
          }`}
        >
          Pendidikan
        </button>
      </div>

      {/* Editor Modal / Card */}
      {editingJourney && (
        <div className="bg-[#0D0E12] border border-white/[0.15] rounded-xl p-6 sm:p-7 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
            <h3 className="text-sm font-mono font-medium text-[#F4F4F6] flex items-center gap-2">
              <Milestone className="w-4 h-4 text-[#38BDF8]" />
              <span>{isCreating ? 'TAMBAH RIWAYAT' : 'EDIT RIWAYAT'}</span>
            </h3>
            <button
              onClick={() => {
                setEditingJourney(null);
                setIsCreating(false);
              }}
              type="button"
              className="text-[#63636E] hover:text-[#F4F4F6]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-[#A1A1AA] mb-1">
                Tipe Riwayat *
              </label>
              <select
                value={editingJourney.type || 'experience'}
                onChange={(e) =>
                  setEditingJourney({
                    ...editingJourney,
                    type: e.target.value as 'experience' | 'education',
                  })
                }
                className="w-full bg-[#14161D] border border-white/[0.08] rounded px-3 py-2 text-xs font-mono text-[#F4F4F6] outline-none"
              >
                <option value="experience">Pengalaman Proyek / Kerja (Experience)</option>
                <option value="education">Pendidikan / Akademik (Education)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono text-[#A1A1AA] mb-1">
                Judul Posisi / Jurusan / Gelar *
              </label>
              <input
                type="text"
                required
                value={editingJourney.title || ''}
                onChange={(e) =>
                  setEditingJourney({ ...editingJourney, title: e.target.value })
                }
                placeholder="cth. Pengembang Sistem Presensi RFID"
                className="w-full bg-[#14161D] border border-white/[0.08] rounded px-3 py-2 text-xs font-mono text-[#F4F4F6] outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-[#A1A1AA] mb-1">
                Nama Organisasi / Sekolah / Perusahaan *
              </label>
              <input
                type="text"
                required
                value={editingJourney.organization || ''}
                onChange={(e) =>
                  setEditingJourney({ ...editingJourney, organization: e.target.value })
                }
                placeholder="cth. SMK Negeri 9 Semarang"
                className="w-full bg-[#14161D] border border-white/[0.08] rounded px-3 py-2 text-xs font-mono text-[#F4F4F6] outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-[#A1A1AA] mb-1">
                Lokasi
              </label>
              <input
                type="text"
                value={editingJourney.location || ''}
                onChange={(e) =>
                  setEditingJourney({ ...editingJourney, location: e.target.value })
                }
                placeholder="Semarang, Jawa Tengah"
                className="w-full bg-[#14161D] border border-white/[0.08] rounded px-3 py-2 text-xs font-mono text-[#F4F4F6] outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-[#A1A1AA] mb-1">
                Tanggal / Tahun Mulai *
              </label>
              <input
                type="text"
                required
                value={editingJourney.start_date || ''}
                onChange={(e) =>
                  setEditingJourney({ ...editingJourney, start_date: e.target.value })
                }
                placeholder="cth. April 2026 atau 2025"
                className="w-full bg-[#14161D] border border-white/[0.08] rounded px-3 py-2 text-xs font-mono text-[#F4F4F6] outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-[#A1A1AA] mb-1">
                Tanggal / Tahun Selesai
              </label>
              <input
                type="text"
                value={editingJourney.end_date || ''}
                onChange={(e) =>
                  setEditingJourney({ ...editingJourney, end_date: e.target.value })
                }
                placeholder="cth. Juni 2026 atau Sekarang"
                className="w-full bg-[#14161D] border border-white/[0.08] rounded px-3 py-2 text-xs font-mono text-[#F4F4F6] outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-mono text-[#A1A1AA] mb-1">
                Deskripsi Riwayat / Pencapaian
              </label>
              <textarea
                rows={3}
                value={editingJourney.description || ''}
                onChange={(e) =>
                  setEditingJourney({ ...editingJourney, description: e.target.value })
                }
                placeholder="Uraikan tanggung jawab dan hasil kerja..."
                className="w-full bg-[#14161D] border border-white/[0.08] rounded px-3 py-2 text-xs font-mono text-[#F4F4F6] outline-none resize-none"
              />
            </div>

            <div className="md:col-span-2 flex justify-end gap-2 pt-2 border-t border-white/[0.06]">
              <button
                type="button"
                onClick={() => {
                  setEditingJourney(null);
                  setIsCreating(false);
                }}
                className="px-3.5 py-1.5 rounded bg-[#14161D] text-xs font-mono text-[#A1A1AA]"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded bg-[#2563EB] text-[#F4F4F6] text-xs font-mono font-medium hover:bg-[#3B82F6]"
              >
                Simpan Riwayat
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Journeys List Cards */}
      <div className="space-y-4">
        {visibleJourneys.map((j) => (
          <div
            key={j.id}
            className="p-5 rounded-xl bg-[#0D0E12] border border-white/[0.08] hover:border-white/[0.15] transition-colors flex flex-col sm:flex-row sm:items-start justify-between gap-4"
          >
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#14161D] border border-white/[0.08] flex items-center justify-center shrink-0 text-[#38BDF8]">
                {j.type === 'experience' ? (
                  <Briefcase className="w-4 h-4 text-[#38BDF8]" />
                ) : (
                  <GraduationCap className="w-4 h-4 text-[#F59E0B]" />
                )}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-mono font-medium text-[#F4F4F6]">{j.title}</h4>
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[#14161D] text-[#A1A1AA]">
                    {j.type}
                  </span>
                </div>
                <div className="text-xs font-mono text-[#38BDF8] mt-0.5">
                  {j.organization} {j.location ? `· ${j.location}` : ''}
                </div>
                <div className="text-[11px] font-mono text-[#63636E] mt-0.5">
                  {j.start_date} {j.end_date ? `· ${j.end_date}` : ''}
                </div>
                {j.description && (
                  <p className="text-xs text-[#A1A1AA] mt-2 leading-relaxed max-w-2xl">
                    {j.description}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-start shrink-0">
              <button
                onClick={() => {
                  setIsCreating(false);
                  setEditingJourney(j);
                }}
                type="button"
                className="p-1.5 rounded hover:bg-[#14161D] text-[#A1A1AA] hover:text-[#F4F4F6]"
                title="Edit"
              >
                <Edit3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(j.id)}
                type="button"
                className="p-1.5 rounded hover:bg-red-500/10 text-red-400/70 hover:text-red-400"
                title="Hapus"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
