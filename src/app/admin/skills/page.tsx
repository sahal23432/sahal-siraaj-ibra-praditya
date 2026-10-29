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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#22D3EE]/15">
        <div>
          <div className="flex items-center gap-2 font-mono text-[11px] text-[#94A3B8] uppercase tracking-wider mb-1">
            <Link href="/admin" className="hover:text-[#22D3EE] transition-colors">
              COCKPIT ADMIN
            </Link>
            <span className="text-[#22D3EE]/40">/</span>
            <span className="text-[#22D3EE]">KELOLA KEAHLIAN (SKILLS)</span>
          </div>
          <h1 className="text-2xl font-medium tracking-tight text-[#F8FAFC]">
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
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0E74E9] hover:bg-[#0256B4] text-white text-xs font-mono font-medium transition-all shadow-md shadow-[#0E74E9]/20"
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
            className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all ${
              filterCat === cat
                ? 'bg-[#22D3EE] text-[#082F49] font-semibold shadow-sm'
                : 'bg-[#082F49]/60 text-[#94A3B8] border border-[#22D3EE]/15 hover:text-[#F8FAFC] hover:border-[#22D3EE]/40'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Editor Modal / Card */}
      {editingSkill && (
        <div className="bg-[#082F49] border border-[#22D3EE]/30 rounded-2xl p-6 sm:p-7 space-y-4 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-[#22D3EE]/15">
            <h3 className="text-sm font-mono font-medium text-[#F8FAFC] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#22D3EE]" />
              <span>{isCreating ? 'TAMBAH KEAHLIAN BARU' : 'EDIT KEAHLIAN'}</span>
            </h3>
            <button
              onClick={() => {
                setEditingSkill(null);
                setIsCreating(false);
              }}
              type="button"
              className="text-[#94A3B8] hover:text-[#F8FAFC] p-1 rounded-md"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <form onSubmit={handleSave} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-mono text-[#94A3B8] mb-1">
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
                className="w-full bg-[#041624] border border-[#22D3EE]/20 rounded-lg px-3.5 py-2 text-xs font-mono text-[#F8FAFC] focus:outline-none focus:border-[#22D3EE]"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-[#94A3B8] mb-1">
                Kategori Domain *
              </label>
              <select
                value={editingSkill.category || 'Web & Software'}
                onChange={(e) =>
                  setEditingSkill({ ...editingSkill, category: e.target.value })
                }
                className="w-full bg-[#041624] border border-[#22D3EE]/20 rounded-lg px-3.5 py-2 text-xs font-mono text-[#F8FAFC] focus:outline-none focus:border-[#22D3EE]"
              >
                <option value="Web & Software">Web & Software</option>
                <option value="Hardware & IoT">Hardware & IoT</option>
                <option value="Profesional & Kolaborasi">Profesional & Kolaborasi</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono text-[#94A3B8] mb-1">
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
                className="w-full mt-2 accent-[#22D3EE]"
              />
            </div>

            <div className="sm:col-span-3 flex justify-end gap-2 pt-3 border-t border-[#22D3EE]/15">
              <button
                type="button"
                onClick={() => {
                  setEditingSkill(null);
                  setIsCreating(false);
                }}
                className="px-4 py-2 rounded-full bg-[#041624] text-xs font-mono text-[#94A3B8] hover:text-[#F8FAFC] border border-[#22D3EE]/15"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-full bg-[#0E74E9] hover:bg-[#0256B4] text-white text-xs font-mono font-medium transition-colors"
              >
                Simpan Keahlian
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Skills Table */}
      <div className="bg-[#082F49] border border-[#22D3EE]/20 rounded-2xl overflow-hidden shadow-lg">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#22D3EE]/15 bg-[#041624]/70 text-[11px] font-mono text-[#94A3B8] tracking-wider uppercase">
              <th className="py-3.5 px-5">NO</th>
              <th className="py-3.5 px-5">NAMA KEAHLIAN</th>
              <th className="py-3.5 px-5">KATEGORI</th>
              <th className="py-3.5 px-5">KEMAHIRAN</th>
              <th className="py-3.5 px-5 text-right">AKSI</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#22D3EE]/10 text-xs font-mono">
            {visibleSkills.map((sk, idx) => (
              <tr key={sk.id} className="hover:bg-[#041624]/40 transition-colors">
                <td className="py-3.5 px-5 text-[#94A3B8]">{idx + 1}</td>
                <td className="py-3.5 px-5 font-medium text-[#F8FAFC]">{sk.name}</td>
                <td className="py-3.5 px-5 text-[#94A3B8]">{sk.category}</td>
                <td className="py-3.5 px-5">
                  <div className="flex items-center gap-3">
                    <div className="w-24 bg-[#041624] rounded-full h-2 overflow-hidden border border-[#22D3EE]/20">
                      <div
                        className="bg-[#22D3EE] h-full rounded-full transition-all"
                        style={{ width: `${sk.proficiency}%` }}
                      />
                    </div>
                    <span className="text-[11px] text-[#22D3EE] font-mono">{sk.proficiency}%</span>
                  </div>
                </td>
                <td className="py-3.5 px-5 text-right">
                  <div className="inline-flex items-center gap-2">
                    <button
                      onClick={() => {
                        setIsCreating(false);
                        setEditingSkill(sk);
                      }}
                      type="button"
                      className="p-1.5 text-[#94A3B8] hover:text-[#22D3EE] transition-colors"
                      title="Edit"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(sk.id)}
                      type="button"
                      className="p-1.5 text-red-400/70 hover:text-red-400 transition-colors"
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
