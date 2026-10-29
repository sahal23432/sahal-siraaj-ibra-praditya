'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema, ContactFormData } from '@/lib/validations/contact';
import { Profile } from '@/types/portfolio';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { Mail, Phone, MapPin, Copy, Check, ArrowUpRight, Send, AlertCircle } from 'lucide-react';

interface ContactSectionProps {
  profile: Profile;
}

export default function ContactSection({ profile }: ContactSectionProps) {
  const [copied, setCopied] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      sender_name: '',
      sender_email: '',
      subject: '',
      message: '',
      honeypot: '',
    },
  });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const onSubmit = async (data: ContactFormData) => {
    setStatusMessage(null);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (res.ok && result.success) {
        setStatusMessage({
          type: 'success',
          text: 'Pesan Anda berhasil terkirim. Terima kasih, saya akan segera membalasnya.',
        });
        reset();
      } else {
        setStatusMessage({
          type: 'error',
          text: result.error?.message || 'Gagal mengirim pesan. Silakan coba lagi.',
        });
      }
    } catch {
      setStatusMessage({
        type: 'error',
        text: 'Terjadi gangguan jaringan. Silakan hubungi langsung via WhatsApp atau Email.',
      });
    }
  };

  return (
    <section id="kontak" className="py-24 max-w-6xl mx-auto px-5 sm:px-8 border-t border-white/[0.08]">
      {/* Section Header with Scroll Reveal */}
      <ScrollReveal>
        <div className="flex items-center gap-2 font-mono text-xs text-[#63636E] uppercase tracking-wider mb-2">
          <span>04</span>
          <span>·</span>
          <span>KONTAK & KOLABORASI</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-16">
          <h2 className="text-2xl sm:text-4xl font-medium tracking-tight text-[#F4F4F6] max-w-2xl leading-tight">
            Tertarik berdiskusi tentang pengembangan web atau proyek perangkat keras terintegrasi? Mari terhubung.
          </h2>

          {/* Availability Status Badge (Steady dot per antislop-ui R-31) */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#38BDF8]/10 border border-[#38BDF8]/30 text-xs font-mono text-[#38BDF8] self-start sm:self-auto">
            <span className="w-2 h-2 rounded-full bg-[#38BDF8]" />
            <span>{profile.availability_status}</span>
          </div>
        </div>
      </ScrollReveal>

      {/* 2-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Direct Contact & Social Links */}
        <ScrollReveal direction="left" className="lg:col-span-5 space-y-6">
          {/* Email Copy Card */}
          <div className="bg-[#0D0E12] border border-white/[0.08] rounded-xl p-6 sm:p-7">
            <div className="flex items-center gap-2 text-xs font-mono text-[#63636E] uppercase tracking-wider mb-2">
              <Mail className="w-3.5 h-3.5 text-[#EDEDEF]" />
              <span>EMAIL UTAMA</span>
            </div>
            <div className="text-base sm:text-lg font-mono font-medium text-[#F4F4F6] mb-4 break-all">
              {profile.email}
            </div>
            <button
              onClick={handleCopyEmail}
              type="button"
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded bg-[#14161D] hover:bg-[#1a1c24] border border-white/[0.08] text-xs font-mono text-[#F4F4F6] transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#38BDF8]" />
                  <span className="text-[#38BDF8]">Email Tersalin ke Clipboard</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[#A1A1AA]" />
                  <span>Salin Alamat Email</span>
                </>
              )}
            </button>
          </div>

          {/* WhatsApp & Location Card with explicit clean spacing */}
          <div className="bg-[#0D0E12] border border-white/[0.08] rounded-xl p-6 sm:p-7 space-y-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#63636E] uppercase tracking-wider mb-1">
                <Phone className="w-3.5 h-3.5 text-[#EDEDEF]" />
                <span>TELEPON / WHATSAPP</span>
              </div>
              <a
                href={`https://wa.me/${profile.phone_or_whatsapp.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-mono text-[#F4F4F6] hover:underline"
              >
                {profile.phone_or_whatsapp}
              </a>
            </div>

            <div className="pt-3 border-t border-white/[0.06]">
              <div className="flex items-center gap-2 text-xs font-mono text-[#63636E] uppercase tracking-wider mb-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#38BDF8]" />
                <span>Alamat Rumah</span>
              </div>
              <p className="text-sm font-mono text-[#F4F4F6] pl-5 leading-relaxed">
                {profile.location}
              </p>
            </div>
          </div>

          {/* External Links */}
          <div className="bg-[#0D0E12] border border-white/[0.08] rounded-xl p-6">
            <div className="text-xs font-mono text-[#63636E] uppercase tracking-wider mb-3">
              TAUTAN EKSTERNAL
            </div>
            <div className="flex flex-col gap-2">
              {profile.social_links.map((link, idx) => (
                <a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between text-xs font-mono text-[#A1A1AA] hover:text-[#F4F4F6] p-2 rounded hover:bg-[#14161D] transition-colors"
                >
                  <span>{link.platform}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Right Column: Contact Form */}
        <ScrollReveal direction="right" delay={0.15} className="lg:col-span-7 bg-[#0D0E12] border border-white/[0.08] rounded-xl p-6 sm:p-8">
          <div className="text-xs font-mono text-[#63636E] uppercase tracking-wider mb-6 pb-2 border-b border-white/[0.06]">
            FORMULIR PENGIRIMAN PESAN
          </div>

          {statusMessage && (
            <div
              className={`p-4 rounded mb-6 text-xs font-mono flex items-center gap-2.5 ${
                statusMessage.type === 'success'
                  ? 'bg-[#38BDF8]/10 text-[#38BDF8] border border-[#38BDF8]/30'
                  : 'bg-red-500/10 text-red-400 border border-red-500/30'
              }`}
            >
              {statusMessage.type === 'success' ? (
                <Check className="w-4 h-4 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 shrink-0" />
              )}
              <span>{statusMessage.text}</span>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Honeypot field (hidden) */}
            <input
              type="text"
              {...register('honeypot')}
              className="hidden"
              autoComplete="off"
              tabIndex={-1}
            />

            {/* Nama */}
            <div>
              <label
                htmlFor="sender_name"
                className="block text-xs font-mono text-[#A1A1AA] uppercase tracking-wider mb-2"
              >
                Nama Lengkap *
              </label>
              <input
                id="sender_name"
                type="text"
                {...register('sender_name')}
                placeholder="cth. Budi Setiawan"
                className="w-full bg-[#14161D] border border-white/[0.08] focus:border-[#38BDF8]/50 focus:ring-1 focus:ring-[#38BDF8]/30 rounded px-3.5 py-2.5 text-sm text-[#F4F4F6] placeholder-[#63636E] outline-none transition-colors"
              />
              {errors.sender_name && (
                <p className="mt-1 text-xs font-mono text-red-400">
                  {errors.sender_name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="sender_email"
                className="block text-xs font-mono text-[#A1A1AA] uppercase tracking-wider mb-2"
              >
                Alamat Email *
              </label>
              <input
                id="sender_email"
                type="email"
                {...register('sender_email')}
                placeholder="nama@domain.com"
                className="w-full bg-[#14161D] border border-white/[0.08] focus:border-[#38BDF8]/50 focus:ring-1 focus:ring-[#38BDF8]/30 rounded px-3.5 py-2.5 text-sm text-[#F4F4F6] placeholder-[#63636E] outline-none transition-colors"
              />
              {errors.sender_email && (
                <p className="mt-1 text-xs font-mono text-red-400">
                  {errors.sender_email.message}
                </p>
              )}
            </div>

            {/* Subjek */}
            <div>
              <label
                htmlFor="subject"
                className="block text-xs font-mono text-[#A1A1AA] uppercase tracking-wider mb-2"
              >
                Subjek Kolaborasi
              </label>
              <input
                id="subject"
                type="text"
                {...register('subject')}
                placeholder="cth. Diskusi Proyek Presensi RFID / Magang Web"
                className="w-full bg-[#14161D] border border-white/[0.08] focus:border-[#38BDF8]/50 focus:ring-1 focus:ring-[#38BDF8]/30 rounded px-3.5 py-2.5 text-sm text-[#F4F4F6] placeholder-[#63636E] outline-none transition-colors"
              />
              {errors.subject && (
                <p className="mt-1 text-xs font-mono text-red-400">
                  {errors.subject.message}
                </p>
              )}
            </div>

            {/* Pesan */}
            <div>
              <label
                htmlFor="message"
                className="block text-xs font-mono text-[#A1A1AA] uppercase tracking-wider mb-2"
              >
                Isi Pesan *
              </label>
              <textarea
                id="message"
                rows={5}
                {...register('message')}
                placeholder="Ceritakan detail kebutuhan sistem atau rencana kolaborasi Anda..."
                className="w-full bg-[#14161D] border border-white/[0.08] focus:border-[#38BDF8]/50 focus:ring-1 focus:ring-[#38BDF8]/30 rounded px-3.5 py-2.5 text-sm text-[#F4F4F6] placeholder-[#63636E] outline-none transition-colors resize-none"
              />
              {errors.message && (
                <p className="mt-1 text-xs font-mono text-red-400">
                  {errors.message.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded bg-[#2563EB] hover:bg-[#3B82F6] text-[#F4F4F6] text-xs font-mono font-medium transition-all shadow-sm shadow-[#2563EB]/25 active:scale-[0.99] disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isSubmitting ? 'MENGIRIM PESAN...' : 'KIRIM PESAN SEKARANG'}</span>
            </button>
          </form>
        </ScrollReveal>
      </div>
    </section>
  );
}
