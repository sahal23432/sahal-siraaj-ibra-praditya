'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getProfile, updateProfile } from '@/lib/services/profile';
import { Profile, Principle, SocialLink } from '@/types/portfolio';
import { Save, Check, User, Link as LinkIcon, Compass, FileText } from 'lucide-react';

export default function AdminProfilPage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const data = await getProfile();
        setProfile(data);
      } catch (err) {
        console.error('Failed to load profile:', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;
    try {
      const updated = await updateProfile(profile);
      setProfile(updated);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (err) {
      console.error('Failed to update profile:', err);
    }
  };

  const handlePrincipleChange = (
    index: number,
    field: keyof Principle,
    value: string
  ) => {
    if (!profile) return;
    const nextPrinciples = [...profile.principles];
    nextPrinciples[index] = {
      ...nextPrinciples[index],
      [field]: value,
    };
    setProfile({ ...profile, principles: nextPrinciples });
  };

  const handleSocialLinkChange = (
    index: number,
    field: keyof SocialLink,
    value: string
  ) => {
    if (!profile) return;
    const nextSocials = [...profile.social_links];
    nextSocials[index] = {
      ...nextSocials[index],
      [field]: value,
    };
    setProfile({ ...profile, social_links: nextSocials });
  };

  if (loading || !profile) {
    return (
      <div className="py-20 text-center font-mono text-xs text-[#A1A1AA]">
        MEMUAT DATA PROFIL LENGKAP...
      </div>
    );
  }

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
            <span>KELOLA PROFIL & ISI SITUS</span>
          </div>
          <h1 className="text-2xl font-medium tracking-tight text-[#F4F4F6]">
            Profil Pemilik, Manifesto & Tautan
          </h1>
        </div>

        {savedSuccess && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#38BDF8]/10 text-[#38BDF8] border border-[#38BDF8]/30 text-xs font-mono">
            <Check className="w-3.5 h-3.5" />
            <span>Seluruh Perubahan Berhasil Disimpan</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {/* Section 1: Identitas & Teks Beranda */}
        <div className="bg-[#0D0E12] border border-white/[0.08] rounded-2xl p-6 sm:p-8 space-y-5">
          <div className="flex items-center gap-2 pb-3 border-b border-white/[0.06] text-xs font-mono uppercase tracking-wider text-[#F4F4F6]">
            <User className="w-4 h-4 text-[#38BDF8]" />
            <span>1. IDENTITAS UTAMA & SAPAAN HERO</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-mono text-[#A1A1AA] uppercase mb-1.5">
                Nama Lengkap *
              </label>
              <input
                type="text"
                required
                value={profile.full_name}
                onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
                className="w-full bg-[#14161D] border border-white/[0.08] rounded px-3.5 py-2 text-xs font-mono text-[#F4F4F6] outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-[#A1A1AA] uppercase mb-1.5">
                Status Ketersediaan Kolaborasi *
              </label>
              <input
                type="text"
                required
                value={profile.availability_status}
                onChange={(e) =>
                  setProfile({ ...profile, availability_status: e.target.value })
                }
                className="w-full bg-[#14161D] border border-white/[0.08] rounded px-3.5 py-2 text-xs font-mono text-[#38BDF8] outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-mono text-[#A1A1AA] uppercase mb-1.5">
                Greeting Hook (Pre-Title di atas Judul Hero) *
              </label>
              <input
                type="text"
                required
                value={profile.headline_greeting}
                onChange={(e) =>
                  setProfile({ ...profile, headline_greeting: e.target.value })
                }
                className="w-full bg-[#14161D] border border-white/[0.08] rounded px-3.5 py-2 text-xs font-mono text-[#F4F4F6] outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-mono text-[#A1A1AA] uppercase mb-1.5">
                Judul Display Hero (Statement Utama di Beranda) *
              </label>
              <input
                type="text"
                required
                value={profile.hero_display_title}
                onChange={(e) =>
                  setProfile({ ...profile, hero_display_title: e.target.value })
                }
                className="w-full bg-[#14161D] border border-white/[0.08] rounded px-3.5 py-2 text-xs font-mono text-[#F4F4F6] outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-mono text-[#A1A1AA] uppercase mb-1.5">
                Ringkasan Diri (Short Bio di bawah Judul Hero)
              </label>
              <textarea
                rows={3}
                value={profile.short_bio}
                onChange={(e) => setProfile({ ...profile, short_bio: e.target.value })}
                className="w-full bg-[#14161D] border border-white/[0.08] rounded px-3.5 py-2 text-xs font-mono text-[#F4F4F6] outline-none resize-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-mono text-[#A1A1AA] uppercase mb-1.5">
                Narasi Lengkap &quot;Tentang Saya&quot; (Tampil di Menu Profil)
              </label>
              <textarea
                rows={5}
                value={profile.about_markdown}
                onChange={(e) =>
                  setProfile({ ...profile, about_markdown: e.target.value })
                }
                className="w-full bg-[#14161D] border border-white/[0.08] rounded px-3.5 py-2 text-xs font-mono text-[#F4F4F6] outline-none resize-none"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Kontak, Berkas & Alamat */}
        <div className="bg-[#0D0E12] border border-white/[0.08] rounded-2xl p-6 sm:p-8 space-y-5">
          <div className="flex items-center gap-2 pb-3 border-b border-white/[0.06] text-xs font-mono uppercase tracking-wider text-[#F4F4F6]">
            <FileText className="w-4 h-4 text-[#EDEDEF]" />
            <span>2. INFORMASI KONTAK, BERKAS & LOKASI</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-mono text-[#A1A1AA] uppercase mb-1.5">
                Alamat Email Utama *
              </label>
              <input
                type="email"
                required
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="w-full bg-[#14161D] border border-white/[0.08] rounded px-3.5 py-2 text-xs font-mono text-[#F4F4F6] outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-[#A1A1AA] uppercase mb-1.5">
                Nomor Telepon / WhatsApp *
              </label>
              <input
                type="text"
                required
                value={profile.phone_or_whatsapp}
                onChange={(e) =>
                  setProfile({ ...profile, phone_or_whatsapp: e.target.value })
                }
                className="w-full bg-[#14161D] border border-white/[0.08] rounded px-3.5 py-2 text-xs font-mono text-[#F4F4F6] outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-mono text-[#A1A1AA] uppercase mb-1.5">
                Alamat Rumah *
              </label>
              <input
                type="text"
                required
                value={profile.location}
                onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                className="w-full bg-[#14161D] border border-white/[0.08] rounded px-3.5 py-2 text-xs font-mono text-[#F4F4F6] outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-[#A1A1AA] uppercase mb-1.5">
                Foto Profil URL (Avatar)
              </label>
              <input
                type="text"
                value={profile.avatar_url || ''}
                onChange={(e) => setProfile({ ...profile, avatar_url: e.target.value })}
                placeholder="/images/sahal-avatar.png"
                className="w-full bg-[#14161D] border border-white/[0.08] rounded px-3.5 py-2 text-xs font-mono text-[#F4F4F6] outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-[#A1A1AA] uppercase mb-1.5">
                Berkas CV URL (.PDF)
              </label>
              <input
                type="text"
                value={profile.cv_url || ''}
                onChange={(e) => setProfile({ ...profile, cv_url: e.target.value })}
                placeholder="/files/CV_Sahal_Siraaj_Ibra_Praditya.pdf"
                className="w-full bg-[#14161D] border border-white/[0.08] rounded px-3.5 py-2 text-xs font-mono text-[#F4F4F6] outline-none"
              />
            </div>
          </div>
        </div>

        {/* Section 3: 3 Prinsip Kerja / Manifesto Rekayasa */}
        <div className="bg-[#0D0E12] border border-white/[0.08] rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-2 pb-3 border-b border-white/[0.06] text-xs font-mono uppercase tracking-wider text-[#F4F4F6]">
            <Compass className="w-4 h-4 text-[#F59E0B]" />
            <span>3. TIGA PRINSIP KERJA (MANIFESTO REKAYASA &quot;CARA SAYA MEMBANGUN&quot;)</span>
          </div>

          <div className="space-y-6">
            {profile.principles.map((pr, idx) => (
              <div
                key={pr.index || idx}
                className="p-5 rounded-xl bg-[#14161D]/60 border border-white/[0.06] space-y-3"
              >
                <div className="text-xs font-mono text-[#38BDF8] font-semibold">
                  PRINSIP {pr.index}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-mono text-[#63636E] mb-1">
                      Judul Kartu Prinsip
                    </label>
                    <input
                      type="text"
                      value={pr.title}
                      onChange={(e) =>
                        handlePrincipleChange(idx, 'title', e.target.value)
                      }
                      className="w-full bg-[#0D0E12] border border-white/[0.08] rounded px-3 py-1.5 text-xs font-mono text-[#F4F4F6] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-[#63636E] mb-1">
                      Proof Badge Bukti Lapangan
                    </label>
                    <input
                      type="text"
                      value={pr.proof}
                      onChange={(e) =>
                        handlePrincipleChange(idx, 'proof', e.target.value)
                      }
                      className="w-full bg-[#0D0E12] border border-white/[0.08] rounded px-3 py-1.5 text-xs font-mono text-[#F4F4F6] outline-none"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-mono text-[#63636E] mb-1">
                      Headline Inti Pernyataan
                    </label>
                    <input
                      type="text"
                      value={pr.headline}
                      onChange={(e) =>
                        handlePrincipleChange(idx, 'headline', e.target.value)
                      }
                      className="w-full bg-[#0D0E12] border border-white/[0.08] rounded px-3 py-1.5 text-xs font-mono text-[#EDEDEF] outline-none"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-mono text-[#63636E] mb-1">
                      Uraian Penjelasan Filosofi
                    </label>
                    <textarea
                      rows={2}
                      value={pr.body}
                      onChange={(e) =>
                        handlePrincipleChange(idx, 'body', e.target.value)
                      }
                      className="w-full bg-[#0D0E12] border border-white/[0.08] rounded px-3 py-1.5 text-xs font-mono text-[#A1A1AA] outline-none resize-none"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 4: Tautan Media Sosial / Eksternal */}
        <div className="bg-[#0D0E12] border border-white/[0.08] rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-white/[0.06] text-xs font-mono uppercase tracking-wider text-[#F4F4F6]">
            <LinkIcon className="w-4 h-4 text-[#EDEDEF]" />
            <span>4. TAUTAN MEDIA SOSIAL & EKSTERNAL</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {profile.social_links.map((link, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-[#14161D]/50 border border-white/[0.06] space-y-2"
              >
                <div>
                  <label className="block text-[10px] font-mono text-[#63636E] uppercase mb-1">
                    Label Platform
                  </label>
                  <input
                    type="text"
                    value={link.platform}
                    onChange={(e) =>
                      handleSocialLinkChange(idx, 'platform', e.target.value)
                    }
                    className="w-full bg-[#0D0E12] border border-white/[0.08] rounded px-2.5 py-1.5 text-xs font-mono text-[#F4F4F6] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono text-[#63636E] uppercase mb-1">
                    URL Tautan
                  </label>
                  <input
                    type="text"
                    value={link.url}
                    onChange={(e) =>
                      handleSocialLinkChange(idx, 'url', e.target.value)
                    }
                    className="w-full bg-[#0D0E12] border border-white/[0.08] rounded px-2.5 py-1.5 text-xs font-mono text-[#A1A1AA] outline-none"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Bar */}
        <div className="sticky bottom-6 flex justify-end p-4 rounded-xl bg-[#0D0E12]/90 backdrop-blur-md border border-white/[0.12] shadow-2xl">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded bg-[#2563EB] hover:bg-[#3B82F6] text-[#F4F4F6] text-xs font-mono font-medium transition-colors"
          >
            <Save className="w-3.5 h-3.5" />
            <span>SIMPAN SEMUA PERUBAHAN PROFIL</span>
          </button>
        </div>
      </form>
    </div>
  );
}
