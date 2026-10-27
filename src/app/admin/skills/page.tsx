'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getSkills, createSkill, updateSkill, deleteSkill } from '@/lib/services/profile';
import { Skill } from '@/types/portfolio';
import { Plus, Trash2, Edit3, Sparkles, X, Check } from 'lucide-react';

export default function AdminSkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingSkill, setEditingSkill] = useState<Partial<Skill> | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [filterCat, setFilterCat] = useState<string>('Semua');

  useEffect(() => {
    loadSkills();
  }, []);

  const loadSkills = async () => {
    try {
      const data = await getSkills();
      setSkills(data);
    } catch (err) {
      console.error('Failed to load skills:', err);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['Semua', 'Web & Software', 'Hardware & IoT', 'Profesional & Kolaborasi'];

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSkill) return;

    if (isCreating) {
      const newSk = await createSkill({
        name: editingSkill.name || 'Keahlian Baru',
        category: editingSkill.category || 'Web & Software',
        proficiency: Number(editingSkill.proficiency) || 85,
        display_order: skills.length + 1,
      });
      setSkills([...skills, newSk]);
    } else if (editingSkill.id) {
      const updated = await updateSkill(editingSkill.id, {
        name: editingSkill.name,
        category: editingSkill.category,
        proficiency: Number(editingSkill.proficiency),
      });
      setSkills(skills.map((s) => (s.id === updated.id ? updated : s)));
    }

    setEditingSkill(null);
    setIsCreating(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Hapus keahlian ini?')) {
      await deleteSkill(id);
      setSkills(skills.filter((s) => s.id !== id));
    }
  };

  const visibleSkills =
    filterCat === 'Semua' ? skills : skills.filter((s) => s.category === filterCat);

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
            <span>KELOLA KEAHLIAN (SKILLS)</span>
          </div>
          <h1 className="text-2xl font-medium tracking-tight text-[#F4F4F6]">
            Matriks Keahlian & Teknologi
          </h1>
        </div>

        <button
          onClick={() => {
            setIsCreating(true);
            setEditingSkill({
              name: '',
              category: 'Web & Software',
              proficiency: 90,
            });
          }}
          type="button"
          className="inline-flex items-center gap-2 px-4 py-2 rounded bg-[#EDEDEF] hover:bg-white text-[#070709] text-xs font-mono font-medium transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>TAMBAH KEAHLIAN BARU</span>
        </button>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setFilterCat(cat)}
            className={`px-3 py-1.5 rounded text-xs font-mono transition-colors ${
              filterCat === cat
                ? 'bg-[#F4F4F6] text-[#070709] font-medium'
                : 'bg-[#14161D] text-[#A1A1AA] border border-white/[0.06] hover:text-[#F4F4F6]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Editor Modal / Card */}
      {editingSkill && (
        <div className="bg-[#0D0E12] border border-white/[0.15] rounded-xl p-6 sm:p-7 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
            <h3 className="text-sm font-mono font-medium text-[#F4F4F6] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#10B981]" />
              <span>{isCreating ? 'TAMBAH KEAHLIAN' : 'EDIT KEAHLIAN'}</span>
            </h3>
            <button
              onClick={() => {
                setEditingSkill(null);
                setIsCreating(false);
              }}
              type="button"
              className="text-[#63636E] hover:text-[#F4F4F6]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <form onSubmit={handleSave} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-mono text-[#A1A1AA] mb-1">
                Nama Keahlian / Teknologi *
              </label>
              <input
                type="text"
                required
                value={editingSkill.name || ''}
                onChange={(e) =>
                  setEditingSkill({ ...editingSkill, name: e.target.value })
                }
                placeholder="cth. React 19 / TypeScript"
                className="w-full bg-[#14161D] border border-white/[0.08] rounded px-3 py-2 text-xs font-mono text-[#F4F4F6] outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-[#A1A1AA] mb-1">
                Kategori Domain *
              </label>
              <select
                value={editingSkill.category || 'Web & Software'}
                onChange={(e) =>
                  setEditingSkill({ ...editingSkill, category: e.target.value })
                }
                className="w-full bg-[#14161D] border border-white/[0.08] rounded px-3 py-2 text-xs font-mono text-[#F4F4F6] outline-none"
              >
                <option value="Web & Software">Web & Software</option>
                <option value="Hardware & IoT">Hardware & IoT</option>
                <option value="Profesional & Kolaborasi">Profesional & Kolaborasi</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono text-[#A1A1AA] mb-1">
                Tingkat Kemahiran ({editingSkill.proficiency || 85}%)
              </label>
              <input
                type="range"
                min="50"
                max="100"
                value={editingSkill.proficiency || 85}
                onChange={(e) =>
                  setEditingSkill({
                    ...editingSkill,
                    proficiency: Number(e.target.value),
                  })
                }
                className="w-full mt-2"
              />
            </div>

            <div className="sm:col-span-3 flex justify-end gap-2 pt-2 border-t border-white/[0.06]">
              <button
                type="button"
                onClick={() => {
                  setEditingSkill(null);
                  setIsCreating(false);
                }}
                className="px-3.5 py-1.5 rounded bg-[#14161D] text-xs font-mono text-[#A1A1AA]"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded bg-[#EDEDEF] text-[#070709] text-xs font-mono font-medium hover:bg-white"
              >
                Simpan
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Skills Table */}
      <div className="bg-[#0D0E12] border border-white/[0.08] rounded-xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/[0.08] bg-[#14161D]/50 text-[11px] font-mono text-[#63636E]">
              <th className="py-3 px-4">NO</th>
              <th className="py-3 px-4">NAMA KEAHLIAN</th>
              <th className="py-3 px-4">KATEGORI</th>
              <th className="py-3 px-4">KEMAHIRAN</th>
              <th className="py-3 px-4 text-right">AKSI</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04] text-xs font-mono">
            {visibleSkills.map((sk, idx) => (
              <tr key={sk.id} className="hover:bg-[#14161D]/30 transition-colors">
                <td className="py-3.5 px-4 text-[#63636E]">{idx + 1}</td>
                <td className="py-3.5 px-4 font-medium text-[#F4F4F6]">{sk.name}</td>
                <td className="py-3.5 px-4 text-[#A1A1AA]">{sk.category}</td>
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-2">
                    <div className="w-20 bg-[#14161D] rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-[#10B981] h-full rounded-full"
                        style={{ width: `${sk.proficiency}%` }}
                      />
                    </div>
                    <span className="text-[11px] text-[#A1A1AA]">{sk.proficiency}%</span>
                  </div>
                </td>
                <td className="py-3.5 px-4 text-right">
                  <div className="inline-flex items-center gap-2">
                    <button
                      onClick={() => {
                        setIsCreating(false);
                        setEditingSkill(sk);
                      }}
                      type="button"
                      className="p-1 text-[#A1A1AA] hover:text-[#F4F4F6]"
                      title="Edit"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(sk.id)}
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
