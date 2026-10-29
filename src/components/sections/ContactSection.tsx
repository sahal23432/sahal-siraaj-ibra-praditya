'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema, ContactFormData } from '@/lib/validations/contact';
import { Profile } from '@/types/portfolio';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { Mail, Phone, MapPin, Copy, Check, Send, AlertCircle } from 'lucide-react';
import InteractiveBentoCard from '@/components/cards/InteractiveBentoCard';

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
    <section id="kontak" className="py-24 sm:py-32 bg-[#05070B] border-t border-white/[0.08] relative">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* Section Header with Unseen Studio "Say hello" headline */}
        <ScrollReveal>
          <div className="flex items-center gap-2 font-mono text-xs text-[#22D3EE] uppercase tracking-widest mb-3">
            <span className="font-bold">04</span>
            <span className="text-white/20">·</span>
            <span className="font-semibold">KONTAK & KOLABORASI</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
            <div>
              <h2 className="text-4xl sm:text-6xl md:text-7xl font-medium tracking-tight text-[#F8FAFC] leading-[1.04] mb-4">
                Say hello — mari berdiskusi.
              </h2>
              <p className="text-base sm:text-lg text-[#94A3B8] max-w-2xl leading-relaxed">
                Tertarik berdiskusi tentang pengembangan web 3D, integrasi mikrokontroler RFID, atau proyek rekayasa sistem? Mari terhubung.
              </p>
            </div>

            {/* Availability Status Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#090E17] border border-[#22D3EE]/30 text-xs font-mono text-[#22D3EE] self-start lg:self-auto shadow-[0_0_15px_rgba(34,211,238,0.15)]">
              <span className="w-2 h-2 rounded-full bg-[#22D3EE] animate-pulse" />
              <span className="font-semibold">{profile.availability_status}</span>
            </div>
          </div>
        </ScrollReveal>

        {/* 2-Column Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-left">
          {/* Left Column: Direct Contact & External Links */}
          <ScrollReveal direction="left" className="lg:col-span-5 space-y-6">
            {/* Email Copy Bento Card */}
            <InteractiveBentoCard className="p-6 sm:p-7 bg-[#090E17] border-white/[0.08]">
              <div className="flex items-center gap-2 text-xs font-mono text-[#22D3EE] uppercase tracking-widest mb-3">
                <Mail className="w-3.5 h-3.5" />
                <span className="font-semibold">EMAIL UTAMA</span>
              </div>
              <div className="text-base sm:text-lg font-mono font-medium text-[#F8FAFC] mb-5 break-all">
                {profile.email}
              </div>
              <button
                onClick={handleCopyEmail}
                type="button"
                className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-full bg-[#04060A] hover:bg-[#070B12] border border-white/[0.08] hover:border-[#22D3EE]/40 text-xs font-mono font-medium text-[#F8FAFC] transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#22D3EE]" />
                    <span className="text-[#22D3EE] font-semibold">Email Tersalin ke Clipboard</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#94A3B8]" />
                    <span>Salin Alamat Email ⮡</span>
                  </>
                )}
              </button>
            </InteractiveBentoCard>

            {/* WhatsApp & Location Card */}
            <InteractiveBentoCard className="p-6 sm:p-7 space-y-5 bg-[#090E17] border-white/[0.08]">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-[#22D3EE] uppercase tracking-widest mb-2">
                  <Phone className="w-3.5 h-3.5" />
                  <span className="font-semibold">TELEPON / WHATSAPP</span>
                </div>
                <a
                  href={`https://wa.me/${profile.phone_or_whatsapp.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base font-mono text-[#F8FAFC] hover:text-[#22D3EE] transition-colors flex items-center gap-2"
                >
                  <span>⮡ {profile.phone_or_whatsapp}</span>
                </a>
              </div>

              <div className="pt-4 border-t border-white/[0.08]">
                <div className="flex items-center gap-2 text-xs font-mono text-[#94A3B8] uppercase tracking-widest mb-2">
                  <MapPin className="w-3.5 h-3.5 text-[#22D3EE]" />
                  <span>ALAMAT RUMAH</span>
                </div>
                <p className="text-sm font-mono text-[#F8FAFC] pl-5 leading-relaxed">
                  {profile.location}
                </p>
              </div>
            </InteractiveBentoCard>

            {/* Unseen Arrow-Prefixed External Links */}
            <InteractiveBentoCard className="p-6 bg-[#090E17] border-white/[0.08]">
              <div className="text-xs font-mono text-[#94A3B8] uppercase tracking-widest mb-4 pb-2 border-b border-white/[0.08]">
                TAUTAN EKSTERNAL RESMI
              </div>
              <div className="flex flex-col gap-2.5">
                {profile.social_links.map((link, idx) => (
                  <a
                    key={idx}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between text-xs font-mono text-[#94A3B8] hover:text-[#F8FAFC] p-3 rounded-lg bg-[#04060A]/80 hover:bg-[#04060A] border border-white/[0.04] hover:border-[#22D3EE]/30 transition-colors"
                  >
                    <span>⮡ {link.platform}</span>
                    <span className="text-[#22D3EE]">↗</span>
                  </a>
                ))}
              </div>
            </InteractiveBentoCard>
          </ScrollReveal>

          {/* Right Column: Contact Form */}
          <ScrollReveal direction="right" delay={0.15} className="lg:col-span-7 bg-[#090E17] border border-white/[0.08] hover:border-[#22D3EE]/30 transition-colors rounded-2xl p-6 sm:p-9 shadow-2xl">
            <div className="text-xs font-mono text-[#22D3EE] font-semibold uppercase tracking-widest mb-6 pb-3 border-b border-white/[0.08]">
              FORMULIR PENGIRIMAN PESAN LANGSUNG
            </div>

            {statusMessage && (
              <div
                className={`p-4 rounded-xl mb-6 text-xs font-mono flex items-center gap-2.5 ${
                  statusMessage.type === 'success'
                    ? 'bg-[#22D3EE]/15 text-[#22D3EE] border border-[#22D3EE]/30'
                    : 'bg-red-500/15 text-red-300 border border-red-500/30'
                }`}
              >
                {statusMessage.type === 'success' ? (
                  <Check className="w-4 h-4 shrink-0 text-[#22D3EE]" />
                ) : (
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-300" />
                )}
                <span>{statusMessage.text}</span>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                  className="block text-xs font-mono text-[#94A3B8] uppercase tracking-widest mb-2"
                >
                  Nama Lengkap *
                </label>
                <input
                  id="sender_name"
                  type="text"
                  {...register('sender_name')}
                  placeholder="cth. Budi Setiawan"
                  className="w-full bg-[#04060A] border border-white/[0.08] focus:border-[#22D3EE] focus:ring-1 focus:ring-[#22D3EE]/30 rounded-xl px-4 py-3.5 text-sm text-[#F8FAFC] placeholder-[#64748B] outline-none transition-colors"
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
                  className="block text-xs font-mono text-[#94A3B8] uppercase tracking-widest mb-2"
                >
                  Alamat Email *
                </label>
                <input
                  id="sender_email"
                  type="email"
                  {...register('sender_email')}
                  placeholder="nama@domain.com"
                  className="w-full bg-[#04060A] border border-white/[0.08] focus:border-[#22D3EE] focus:ring-1 focus:ring-[#22D3EE]/30 rounded-xl px-4 py-3.5 text-sm text-[#F8FAFC] placeholder-[#64748B] outline-none transition-colors"
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
                  className="block text-xs font-mono text-[#94A3B8] uppercase tracking-widest mb-2"
                >
                  Subjek Kolaborasi
                </label>
                <input
                  id="subject"
                  type="text"
                  {...register('subject')}
                  placeholder="cth. Diskusi Proyek Presensi RFID / Magang Web"
                  className="w-full bg-[#04060A] border border-white/[0.08] focus:border-[#22D3EE] focus:ring-1 focus:ring-[#22D3EE]/30 rounded-xl px-4 py-3.5 text-sm text-[#F8FAFC] placeholder-[#64748B] outline-none transition-colors"
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
                  className="block text-xs font-mono text-[#94A3B8] uppercase tracking-widest mb-2"
                >
                  Isi Pesan *
                </label>
                <textarea
                  id="message"
                  rows={5}
                  {...register('message')}
                  placeholder="Ceritakan detail kebutuhan sistem atau rencana kolaborasi Anda..."
                  className="w-full bg-[#04060A] border border-white/[0.08] focus:border-[#22D3EE] focus:ring-1 focus:ring-[#22D3EE]/30 rounded-xl px-4 py-3.5 text-sm text-[#F8FAFC] placeholder-[#64748B] outline-none transition-colors resize-none"
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
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-[#0E74E9] hover:bg-[#0284C7] text-white text-xs font-mono font-semibold transition-all shadow-[0_0_25px_rgba(14,116,233,0.35)] active:scale-[0.99] disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isSubmitting ? 'MENGIRIM PESAN...' : 'KIRIM PESAN SEKARANG ⮡'}</span>
              </button>
            </form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
