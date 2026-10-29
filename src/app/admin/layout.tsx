'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Layers,
  User,
  Sparkles,
  Milestone,
  LogOut,
  ArrowLeft,
  KeyRound,
  ShieldCheck,
  LayoutDashboard,
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();

  // Change PIN modal state
  const [showPinModal, setShowPinModal] = useState(false);
  const [oldPin, setOldPin] = useState('');
  const [newPin, setNewPin] = useState('');
  const [pinStatus, setPinStatus] = useState<{ success: boolean; message: string } | null>(null);
  const [isUpdatingPin, setIsUpdatingPin] = useState(false);

  // Skip chrome on login page
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth/logout', { method: 'POST' });
    } catch {
      // Ignore network errors on logout
    }
    router.push('/admin/login');
  };

  const handlePinChangeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdatingPin(true);
    setPinStatus(null);

    try {
      const res = await fetch('/api/admin/auth/change-pin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ oldPin, newPin }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setPinStatus({ success: true, message: 'PIN berhasil diperbarui.' });
        setOldPin('');
        setNewPin('');
        setTimeout(() => {
          setShowPinModal(false);
          setPinStatus(null);
        }, 1500);
      } else {
        setPinStatus({
          success: false,
          message: data.error?.message || 'Gagal mengubah PIN.',
        });
      }
    } catch {
      setPinStatus({
        success: false,
        message: 'Terjadi gangguan jaringan.',
      });
    } finally {
      setIsUpdatingPin(false);
    }
  };

  const navItems = [
    { label: 'Ringkasan', href: '/admin', icon: LayoutDashboard },
    { label: 'Karya', href: '/admin/karya', icon: Layers },
    { label: 'Profil', href: '/admin/profil', icon: User },
    { label: 'Skills', href: '/admin/skills', icon: Sparkles },
    { label: 'Lini Masa', href: '/admin/journeys', icon: Milestone },
  ];

  return (
    <div className="min-h-screen bg-[#041624] text-[#F8FAFC] flex flex-col">
      {/* Top Admin Telemetry Bar */}
      <header className="h-16 border-b border-white/[0.08] bg-[#082F49] px-6 flex items-center justify-between sticky top-0 z-30 shadow-md">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-xs font-mono text-[#94A3B8] hover:text-[#22D3EE] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">⮡ SITUS PUBLIK</span>
          </Link>
          <span className="text-white/20">|</span>
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-[#22D3EE] animate-pulse" />
            <span className="font-semibold text-[#F8FAFC]">TELEMETRY COCKPIT</span>
            <span className="text-[#94A3B8] hidden md:inline">·</span>
            <span className="text-[#22D3EE] hidden md:inline">SAHAL SIRAAJ</span>
          </div>
        </div>

        {/* Center: Module Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                  isActive
                    ? 'bg-[#041624] text-[#22D3EE] border border-[#22D3EE]/30 font-semibold'
                    : 'text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-white/[0.04]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right: Security & Session Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowPinModal(true)}
            type="button"
            title="Ubah PIN Admin"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#041624] hover:bg-[#062438] border border-white/[0.08] text-xs font-mono text-[#94A3B8] hover:text-[#22D3EE] transition-colors"
          >
            <KeyRound className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">GANTI PIN</span>
          </button>

          <button
            onClick={handleLogout}
            type="button"
            title="Kunci sesi admin"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#041624] hover:bg-red-500/20 border border-white/[0.08] hover:border-red-500/30 text-xs font-mono text-[#94A3B8] hover:text-red-300 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">KUNCI</span>
          </button>
        </div>
      </header>

      {/* Mobile Subnav Row */}
      <div className="lg:hidden bg-[#082F49] border-b border-white/[0.08] px-4 py-2 flex items-center gap-1 overflow-x-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono whitespace-nowrap transition-colors ${
                isActive
                  ? 'bg-[#041624] text-[#22D3EE] border border-[#22D3EE]/30 font-semibold'
                  : 'text-[#94A3B8]'
              }`}
            >
              <Icon className="w-3 h-3" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>

      {/* Modal Change PIN */}
      {showPinModal && (
        <div className="fixed inset-0 z-50 bg-[#041624]/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-[#082F49] border border-[#22D3EE]/30 rounded-2xl p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08] mb-4">
              <h3 className="text-sm font-mono font-medium text-[#F8FAFC] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#22D3EE]" />
                <span>GANTI PIN KEAMANAN ADMIN</span>
              </h3>
              <button
                type="button"
                onClick={() => {
                  setShowPinModal(false);
                  setPinStatus(null);
                }}
                className="text-[#94A3B8] hover:text-[#F8FAFC]"
              >
                ✕
              </button>
            </div>

            {pinStatus && (
              <div
                className={`p-2.5 rounded-xl text-xs font-mono mb-4 ${
                  pinStatus.success
                    ? 'bg-[#22D3EE]/15 text-[#22D3EE] border border-[#22D3EE]/30'
                    : 'bg-red-500/15 text-red-300 border border-red-500/30'
                }`}
              >
                {pinStatus.message}
              </div>
            )}

            <form onSubmit={handlePinChangeSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-[#94A3B8] uppercase mb-1">
                  PIN Lama *
                </label>
                <input
                  type="password"
                  required
                  maxLength={8}
                  value={oldPin}
                  onChange={(e) => setOldPin(e.target.value)}
                  placeholder="Masukkan PIN lama"
                  className="w-full bg-[#041624] border border-white/[0.08] focus:border-[#22D3EE] rounded-lg px-3 py-2 text-xs font-mono text-[#F8FAFC] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-[#94A3B8] uppercase mb-1">
                  PIN Baru (4-8 Digit Angka) *
                </label>
                <input
                  type="password"
                  required
                  maxLength={8}
                  value={newPin}
                  onChange={(e) => setNewPin(e.target.value)}
                  placeholder="Masukkan PIN baru"
                  className="w-full bg-[#041624] border border-white/[0.08] focus:border-[#22D3EE] rounded-lg px-3 py-2 text-xs font-mono text-[#F8FAFC] outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  disabled={isUpdatingPin}
                  onClick={() => {
                    setShowPinModal(false);
                    setPinStatus(null);
                  }}
                  className="px-3.5 py-1.5 rounded-lg bg-[#041624] text-xs font-mono text-[#94A3B8] hover:text-white"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isUpdatingPin}
                  className="px-4 py-1.5 rounded-full bg-[#0E74E9] text-white text-xs font-mono font-semibold hover:bg-[#0256B4] disabled:opacity-50"
                >
                  {isUpdatingPin ? 'Menyimpan...' : 'Perbarui PIN ⮡'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-5 sm:p-8">{children}</main>
    </div>
  );
}
