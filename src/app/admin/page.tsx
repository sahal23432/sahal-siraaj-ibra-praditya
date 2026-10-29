'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getAllProjects } from '@/lib/services/projects';
import { getProfile } from '@/lib/services/profile';
import { getAllMessages, markMessageRead, deleteMessage } from '@/lib/services/contact';
import { ContactMessage, Project, Profile } from '@/types/portfolio';
import {
  Mail,
  Check,
  Layers,
  User,
  Sparkles,
  Milestone,
  Trash2,
  KeyRound,
  ShieldCheck,
  ExternalLink,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [msgs, projs, prof] = await Promise.all([
          getAllMessages(),
          getAllProjects(),
          getProfile(),
        ]);
        setMessages(msgs);
        setProjects(projs);
        setProfile(prof);
      } catch (err) {
        console.error('Failed to load admin dashboard data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleMarkRead = async (id: string) => {
    await markMessageRead(id);
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, is_read: true } : m))
    );
  };

  const handleDeleteMsg = async (id: string) => {
    if (confirm('Hapus pesan ini dari kotak masuk?')) {
      await deleteMessage(id);
      setMessages((prev) => prev.filter((m) => m.id !== id));
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center font-mono text-xs text-[#A1A1AA]">
        MEMUAT TELEMETRY COCKPIT...
      </div>
    );
  }

  const unreadCount = messages.filter((m) => !m.is_read).length;

  return (
    <div className="space-y-8">
      {/* Metric Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#0D0E12] border border-white/[0.08] rounded-xl p-5">
          <div className="text-[11px] font-mono text-[#63636E] uppercase mb-1">
            TOTAL KARYA SISTEM
          </div>
          <div className="text-2xl font-mono font-semibold text-[#F4F4F6]">
            {projects.length.toString().padStart(2, '0')}
          </div>
          <div className="mt-2 text-[10px] font-mono text-[#38BDF8]">
            100% TERDOKUMENTASI
          </div>
        </div>

        <div className="bg-[#0D0E12] border border-white/[0.08] rounded-xl p-5">
          <div className="text-[11px] font-mono text-[#63636E] uppercase mb-1">
            PESAN PENGUNJUNG
          </div>
          <div className="text-2xl font-mono font-semibold text-[#F4F4F6]">
            {messages.length.toString().padStart(2, '0')}
          </div>
          <div className="mt-2 text-[10px] font-mono text-[#F59E0B]">
            {unreadCount} BELUM DIBACA
          </div>
        </div>

        <div className="bg-[#0D0E12] border border-white/[0.08] rounded-xl p-5">
          <div className="text-[11px] font-mono text-[#63636E] uppercase mb-1">
            STATUS KETERSEDIAAN
          </div>
          <div className="text-xs font-mono text-[#38BDF8] truncate">
            {profile?.availability_status || 'Aktif'}
          </div>
          <div className="mt-2 text-[10px] font-mono text-[#63636E]">
            SEMARANG, ID
          </div>
        </div>

        <div className="bg-[#0D0E12] border border-white/[0.08] rounded-xl p-5">
          <div className="text-[11px] font-mono text-[#63636E] uppercase mb-1">
            KEAMANAN COCKPIT
          </div>
          <div className="text-xs font-mono text-[#38BDF8] flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>PIN TERKUNCI AMAN</span>
          </div>
          <div className="mt-2 text-[10px] font-mono text-[#63636E]">
            AUTH PIN AKTIF
          </div>
        </div>
      </div>

      {/* Full Control Navigation Hub */}
      <div className="bg-[#0D0E12] border border-white/[0.08] rounded-2xl p-6 sm:p-7">
        <div className="text-xs font-mono text-[#63636E] uppercase tracking-wider mb-4">
          MODUL PENGELOLAAN SELURUH ISI WEBSITE
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <Link
            href="/admin/karya"
            className="p-4 rounded-xl bg-[#14161D] border border-white/[0.06] hover:border-white/20 transition-colors flex flex-col justify-between group"
          >
            <div>
              <div className="w-8 h-8 rounded-lg bg-[#0D0E12] border border-white/[0.08] flex items-center justify-center text-[#38BDF8] mb-3">
                <Layers className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-mono font-medium text-[#F4F4F6] group-hover:text-white mb-1">
                Kelola Karya (CRUD)
              </h3>
              <p className="text-[11px] text-[#A1A1AA] leading-relaxed">
                Tambah, edit judul, alur pipeline, cerita studi kasus, dan tautan live.
              </p>
            </div>
            <span className="text-[10px] font-mono text-[#38BDF8] mt-3 block">
              BUKA KARYA →
            </span>
          </Link>

          <Link
            href="/admin/profil"
            className="p-4 rounded-xl bg-[#14161D] border border-white/[0.06] hover:border-white/20 transition-colors flex flex-col justify-between group"
          >
            <div>
              <div className="w-8 h-8 rounded-lg bg-[#0D0E12] border border-white/[0.08] flex items-center justify-center text-[#EDEDEF] mb-3">
                <User className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-mono font-medium text-[#F4F4F6] group-hover:text-white mb-1">
                Profil & Manifesto
              </h3>
              <p className="text-[11px] text-[#A1A1AA] leading-relaxed">
                Ubah nama, bio hero, narasi profil, 3 prinsip kerja, kontak & CV.
              </p>
            </div>
            <span className="text-[10px] font-mono text-[#EDEDEF] mt-3 block">
              BUKA PROFIL →
            </span>
          </Link>

          <Link
            href="/admin/skills"
            className="p-4 rounded-xl bg-[#14161D] border border-white/[0.06] hover:border-white/20 transition-colors flex flex-col justify-between group"
          >
            <div>
              <div className="w-8 h-8 rounded-lg bg-[#0D0E12] border border-white/[0.08] flex items-center justify-center text-[#F59E0B] mb-3">
                <Sparkles className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-mono font-medium text-[#F4F4F6] group-hover:text-white mb-1">
                Matriks Keahlian
              </h3>
              <p className="text-[11px] text-[#A1A1AA] leading-relaxed">
                Kelola daftar keahlian, persentase kemahiran, dan kategori domain.
              </p>
            </div>
            <span className="text-[10px] font-mono text-[#F59E0B] mt-3 block">
              BUKA SKILLS →
            </span>
          </Link>

          <Link
            href="/admin/journeys"
            className="p-4 rounded-xl bg-[#14161D] border border-white/[0.06] hover:border-white/20 transition-colors flex flex-col justify-between group"
          >
            <div>
              <div className="w-8 h-8 rounded-lg bg-[#0D0E12] border border-white/[0.08] flex items-center justify-center text-[#38BDF8] mb-3">
                <Milestone className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-mono font-medium text-[#F4F4F6] group-hover:text-white mb-1">
                Lini Masa Riwayat
              </h3>
              <p className="text-[11px] text-[#A1A1AA] leading-relaxed">
                Atur rekam jejak pengalaman proyek rekayasa dan riwayat akademik.
              </p>
            </div>
            <span className="text-[10px] font-mono text-[#38BDF8] mt-3 block">
              BUKA LINI MASA →
            </span>
          </Link>
        </div>
      </div>

      {/* Messages Inbox Table */}
      <div className="bg-[#0D0E12] border border-white/[0.08] rounded-2xl p-6 sm:p-8">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/[0.06]">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-[#EDEDEF]" />
            <h2 className="text-base font-mono font-medium text-[#F4F4F6]">
              KOTAK MASUK PESAN PENGUNJUNG
            </h2>
          </div>
          <span className="text-xs font-mono text-[#63636E]">
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
                    ? 'bg-[#14161D]/40 border-white/[0.04]'
                    : 'bg-[#14161D] border-white/[0.12]'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        msg.is_read ? 'bg-[#63636E]' : 'bg-[#38BDF8]'
                      }`}
                    />
                    <span className="font-medium text-sm text-[#F4F4F6]">
                      {msg.sender_name}
                    </span>
                    <span className="text-xs font-mono text-[#A1A1AA]">
                      &lt;{msg.sender_email}&gt;
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-[#63636E]">
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
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-[10px] font-mono text-[#F4F4F6] transition-colors"
                      >
                        <Check className="w-3 h-3" />
                        <span>Tandai Dibaca</span>
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteMsg(msg.id)}
                      type="button"
                      className="p-1 rounded text-[#63636E] hover:text-red-400 transition-colors"
                      title="Hapus Pesan"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {msg.subject && (
                  <div className="text-xs font-mono text-[#EDEDEF] mb-2 font-medium">
                    Subjek: {msg.subject}
                  </div>
                )}

                <p className="text-xs text-[#A1A1AA] leading-relaxed whitespace-pre-wrap bg-[#070709]/50 p-3.5 rounded-lg border border-white/[0.04]">
                  {msg.message}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 font-mono text-xs text-[#63636E]">
            Belum ada pesan masuk dari pengunjung. Formulir kontak siap menerima pesan.
          </div>
        )}
      </div>
    </div>
  );
}
