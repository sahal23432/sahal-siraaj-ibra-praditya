'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Project, Profile, ContactMessage } from '@/types/portfolio';
import {
  Layers,
  User,
  Sparkles,
  Milestone,
  Mail,
  Check,
  Trash2,
  ShieldCheck,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [sessionRes, msgRes] = await Promise.all([
          fetch('/api/admin/auth/session'), // Session check
          fetch('/api/contact'), // Recent messages
        ]);

        // Fallback or read from services
        const [localProjects, localProfile] = await Promise.all([
          import('@/lib/services/projects').then((m) => m.getAllProjects()),
          import('@/lib/services/profile').then((m) => m.getProfile()),
        ]);

        setProjects(localProjects);
        setProfile(localProfile);

        if (msgRes.ok) {
          const msgData = await msgRes.json();
          if (msgData.success && msgData.data) {
            setMessages(msgData.data);
          }
        }
      } catch (err) {
        console.error('Error loading admin dashboard data:', err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  const handleMarkRead = (id: string) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, is_read: true } : m))
    );
  };

  const handleDeleteMsg = (id: string) => {
    if (!confirm('Hapus pesan ini secara permanen?')) return;
    setMessages((prev) => prev.filter((m) => m.id !== id));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24 text-xs font-mono text-[#94A3B8]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#22D3EE] animate-pulse" />
          <span>MEMUAT TELEMETRY COCKPIT...</span>
        </div>
      </div>
    );
  }

  const unreadCount = messages.filter((m) => !m.is_read).length;

  return (
    <div className="space-y-8 text-left">
      {/* Metric Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#082F49] border border-[#22D3EE]/25 rounded-2xl p-5 shadow-lg">
          <div className="text-[11px] font-mono text-[#94A3B8] uppercase mb-1">
            TOTAL KARYA SISTEM
          </div>
          <div className="text-2xl font-mono font-semibold text-[#F8FAFC]">
            {projects.length.toString().padStart(2, '0')}
          </div>
          <div className="mt-2 text-[10px] font-mono text-[#22D3EE] font-semibold">
            100% TERDOKUMENTASI
          </div>
        </div>

        <div className="bg-[#082F49] border border-[#22D3EE]/25 rounded-2xl p-5 shadow-lg">
          <div className="text-[11px] font-mono text-[#94A3B8] uppercase mb-1">
            PESAN PENGUNJUNG
          </div>
          <div className="text-2xl font-mono font-semibold text-[#F8FAFC]">
            {messages.length.toString().padStart(2, '0')}
          </div>
          <div className="mt-2 text-[10px] font-mono text-[#F59E0B] font-semibold">
            {unreadCount} BELUM DIBACA
          </div>
        </div>

        <div className="bg-[#082F49] border border-[#22D3EE]/25 rounded-2xl p-5 shadow-lg">
          <div className="text-[11px] font-mono text-[#94A3B8] uppercase mb-1">
            STATUS KETERSEDIAAN
          </div>
          <div className="text-xs font-mono text-[#22D3EE] font-semibold truncate">
            {profile?.availability_status || 'Aktif'}
          </div>
          <div className="mt-2 text-[10px] font-mono text-[#94A3B8]">
            SEMARANG, ID
          </div>
        </div>

        <div className="bg-[#082F49] border border-[#22D3EE]/25 rounded-2xl p-5 shadow-lg">
          <div className="text-[11px] font-mono text-[#94A3B8] uppercase mb-1">
            KEAMANAN COCKPIT
          </div>
          <div className="text-xs font-mono text-[#22D3EE] font-semibold flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#22D3EE]" />
            <span>PIN TERKUNCI AMAN</span>
          </div>
          <div className="mt-2 text-[10px] font-mono text-[#94A3B8]">
            AUTH PIN AKTIF
          </div>
        </div>
      </div>

      {/* Full Control Navigation Hub */}
      <div className="bg-[#082F49] border border-[#22D3EE]/25 rounded-2xl p-6 sm:p-7 shadow-xl">
        <div className="text-xs font-mono text-[#22D3EE] font-semibold uppercase tracking-wider mb-4">
          MODUL PENGELOLAAN SELURUH ISI WEBSITE
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <Link
            href="/admin/karya"
            className="p-4 rounded-xl bg-[#041624] border border-white/[0.08] hover:border-[#22D3EE]/50 transition-colors flex flex-col justify-between group"
          >
            <div>
              <div className="w-8 h-8 rounded-lg bg-[#082F49] border border-[#22D3EE]/30 flex items-center justify-center text-[#22D3EE] mb-3">
                <Layers className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-mono font-medium text-[#F8FAFC] group-hover:text-[#22D3EE] mb-1">
                Kelola Karya (CRUD)
              </h3>
              <p className="text-[11px] text-[#94A3B8] leading-relaxed">
                Tambah, edit judul, alur pipeline, cerita studi kasus, dan tautan live.
              </p>
            </div>
            <span className="text-[10px] font-mono text-[#22D3EE] font-semibold mt-3 block">
              BUKA KARYA ⮡
            </span>
          </Link>

          <Link
            href="/admin/profil"
            className="p-4 rounded-xl bg-[#041624] border border-white/[0.08] hover:border-[#22D3EE]/50 transition-colors flex flex-col justify-between group"
          >
            <div>
              <div className="w-8 h-8 rounded-lg bg-[#082F49] border border-[#22D3EE]/30 flex items-center justify-center text-[#22D3EE] mb-3">
                <User className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-mono font-medium text-[#F8FAFC] group-hover:text-[#22D3EE] mb-1">
                Profil & Manifesto
              </h3>
              <p className="text-[11px] text-[#94A3B8] leading-relaxed">
                Ubah nama, bio hero, narasi profil, 3 prinsip kerja, kontak & CV.
              </p>
            </div>
            <span className="text-[10px] font-mono text-[#22D3EE] font-semibold mt-3 block">
              BUKA PROFIL ⮡
            </span>
          </Link>

          <Link
            href="/admin/skills"
            className="p-4 rounded-xl bg-[#041624] border border-white/[0.08] hover:border-[#22D3EE]/50 transition-colors flex flex-col justify-between group"
          >
            <div>
              <div className="w-8 h-8 rounded-lg bg-[#082F49] border border-[#22D3EE]/30 flex items-center justify-center text-[#22D3EE] mb-3">
                <Sparkles className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-mono font-medium text-[#F8FAFC] group-hover:text-[#22D3EE] mb-1">
                Matriks Keahlian
              </h3>
              <p className="text-[11px] text-[#94A3B8] leading-relaxed">
                Kelola daftar keahlian, persentase kemahiran, dan kategori domain.
              </p>
            </div>
            <span className="text-[10px] font-mono text-[#22D3EE] font-semibold mt-3 block">
              BUKA SKILLS ⮡
            </span>
          </Link>

          <Link
            href="/admin/journeys"
            className="p-4 rounded-xl bg-[#041624] border border-white/[0.08] hover:border-[#22D3EE]/50 transition-colors flex flex-col justify-between group"
          >
            <div>
              <div className="w-8 h-8 rounded-lg bg-[#082F49] border border-[#22D3EE]/30 flex items-center justify-center text-[#22D3EE] mb-3">
                <Milestone className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-mono font-medium text-[#F8FAFC] group-hover:text-[#22D3EE] mb-1">
                Lini Masa Riwayat
              </h3>
              <p className="text-[11px] text-[#94A3B8] leading-relaxed">
                Atur rekam jejak pengalaman proyek rekayasa dan riwayat akademik.
              </p>
            </div>
            <span className="text-[10px] font-mono text-[#22D3EE] font-semibold mt-3 block">
              BUKA LINI MASA ⮡
            </span>
          </Link>
        </div>
      </div>

      {/* Messages Inbox Table */}
      <div className="bg-[#082F49] border border-[#22D3EE]/25 rounded-2xl p-6 sm:p-8 shadow-xl">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/[0.08]">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-[#22D3EE]" />
            <h2 className="text-base font-mono font-medium text-[#F8FAFC]">
              KOTAK MASUK PESAN PENGUNJUNG
            </h2>
          </div>
          <span className="text-xs font-mono text-[#94A3B8]">
            {messages.length} TOTAL PESAN
          </span>
        </div>

        {messages.length > 0 ? (
          <div className="space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`p-5 rounded-xl border transition-colors ${
                  msg.is_read
                    ? 'bg-[#041624]/60 border-white/[0.06]'
                    : 'bg-[#041624] border-[#22D3EE]/30 shadow-md'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        msg.is_read ? 'bg-[#94A3B8]' : 'bg-[#22D3EE] animate-pulse'
                      }`}
                    />
                    <span className="font-medium text-sm text-[#F8FAFC]">
                      {msg.sender_name}
                    </span>
                    <span className="text-xs font-mono text-[#94A3B8]">
                      &lt;{msg.sender_email}&gt;
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-[#94A3B8]">
                      {new Date(msg.created_at).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                    {!msg.is_read && (
                      <button
                        onClick={() => handleMarkRead(msg.id)}
                        type="button"
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#0E74E9] text-white text-[10px] font-mono transition-colors"
                      >
                        <Check className="w-3 h-3" />
                        <span>Tandai Dibaca</span>
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteMsg(msg.id)}
                      type="button"
                      className="p-1 rounded text-[#94A3B8] hover:text-red-400 transition-colors"
                      title="Hapus Pesan"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {msg.subject && (
                  <div className="text-xs font-mono text-[#22D3EE] mb-2 font-medium">
                    Subjek: {msg.subject}
                  </div>
                )}

                <p className="text-xs text-[#94A3B8] leading-relaxed whitespace-pre-wrap bg-[#082F49] p-3.5 rounded-lg border border-white/[0.06]">
                  {msg.message}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 font-mono text-xs text-[#94A3B8]">
            Belum ada pesan masuk dari pengunjung. Formulir kontak siap menerima pesan.
          </div>
        )}
      </div>
    </div>
  );
}
