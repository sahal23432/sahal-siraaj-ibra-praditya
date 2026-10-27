'use client';

import { ReactNode, useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Layers,
  User,
  Mail,
  Sparkles,
  Milestone,
  Lock,
  LogOut,
  KeyRound,
  ShieldCheck,
} from 'lucide-react';
import { changeAdminPin } from '@/lib/services/auth';

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname === '/admin/login';
  const [showPinModal, setShowPinModal] = useState(false);
  const [oldPin, setOldPin] = useState('');
  const [newPin, setNewPin] = useState('');
  const [pinStatus, setPinStatus] = useState<{ success: boolean; message: string } | null>(null);

  // Check session in admin area
  useEffect(() => {
    if (!isLoginPage && typeof window !== 'undefined') {
      const session = localStorage.getItem('admin-session');
      if (!session) {
        router.push('/admin/login');
      }
    }
  }, [isLoginPage, router]);

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('admin-session');
      localStorage.removeItem('admin-unlocked-at');
    }
    router.push('/admin/login');
  };

  const handlePinChangeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await changeAdminPin(oldPin, newPin);
    setPinStatus(res);
    if (res.success) {
      setTimeout(() => {
        setShowPinModal(false);
        setOldPin('');
        setNewPin('');
        setPinStatus(null);
      }, 1800);
    }
  };

  if (isLoginPage) {
    return <div className="min-h-screen bg-[#070709] text-[#F4F4F6]">{children}</div>;
  }

  const navItems = [
    { label: 'Pesan & Metrik', href: '/admin', icon: Mail },
    { label: 'Kelola Karya', href: '/admin/karya', icon: Layers },
    { label: 'Profil & Bio', href: '/admin/profil', icon: User },
    { label: 'Keahlian (Skills)', href: '/admin/skills', icon: Sparkles },
    { label: 'Lini Masa', href: '/admin/journeys', icon: Milestone },
  ];

  return (
    <div className="min-h-screen bg-[#070709] text-[#F4F4F6] flex flex-col">
      {/* Top Admin Telemetry Bar */}
      <header className="h-16 border-b border-white/[0.08] bg-[#0D0E12] px-6 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-xs font-mono text-[#A1A1AA] hover:text-[#F4F4F6] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">SITUS PUBLIK</span>
          </Link>
          <span className="text-[#63636E]">|</span>
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-[#10B981]" />
            <span className="font-semibold text-[#F4F4F6]">TELEMETRY COCKPIT</span>
            <span className="text-[#63636E] hidden md:inline">·</span>
            <span className="text-[#A1A1AA] hidden md:inline">SAHAL SIRAAJ</span>
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
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono transition-colors ${
                  isActive
                    ? 'bg-[#14161D] text-[#F4F4F6] border border-white/[0.12]'
                    : 'text-[#A1A1AA] hover:text-[#F4F4F6]'
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
            className="flex items-center gap-1 px-2.5 py-1.5 rounded bg-[#14161D] hover:bg-[#1a1c24] border border-white/[0.06] text-xs font-mono text-[#A1A1AA] hover:text-[#F4F4F6] transition-colors"
          >
            <KeyRound className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">GANTI PIN</span>
          </button>

          <button
            onClick={handleLogout}
            type="button"
            title="Kunci sesi admin"
            className="flex items-center gap-1 px-2.5 py-1.5 rounded bg-[#14161D] hover:bg-red-500/10 border border-white/[0.06] hover:border-red-500/20 text-xs font-mono text-[#A1A1AA] hover:text-red-400 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">KUNCI</span>
          </button>
        </div>
      </header>

      {/* Mobile Subnav Row */}
      <div className="lg:hidden bg-[#0D0E12] border-b border-white/[0.06] px-4 py-2 flex items-center gap-1 overflow-x-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono whitespace-nowrap transition-colors ${
                isActive
                  ? 'bg-[#14161D] text-[#F4F4F6] border border-white/[0.1]'
                  : 'text-[#A1A1AA]'
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
        <div className="fixed inset-0 z-50 bg-[#070709]/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-[#0D0E12] border border-white/[0.12] rounded-2xl p-6">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.06] mb-4">
              <h3 className="text-sm font-mono font-medium text-[#F4F4F6] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#10B981]" />
                <span>GANTI PIN KEAMANAN ADMIN</span>
              </h3>
              <button
                type="button"
                onClick={() => {
                  setShowPinModal(false);
                  setPinStatus(null);
                }}
                className="text-[#63636E] hover:text-[#F4F4F6]"
              >
                ✕
              </button>
            </div>

            {pinStatus && (
              <div
                className={`p-2.5 rounded text-xs font-mono mb-4 ${
                  pinStatus.success
                    ? 'bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/20'
                    : 'bg-red-500/10 text-red-400 border border-red-500/20'
                }`}
              >
                {pinStatus.message}
              </div>
            )}

            <form onSubmit={handlePinChangeSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-[#A1A1AA] uppercase mb-1">
                  PIN Lama *
                </label>
                <input
                  type="password"
                  required
                  maxLength={8}
                  value={oldPin}
                  onChange={(e) => setOldPin(e.target.value)}
                  placeholder="Masukkan PIN lama"
                  className="w-full bg-[#14161D] border border-white/[0.08] rounded px-3 py-2 text-xs font-mono text-[#F4F4F6] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-[#A1A1AA] uppercase mb-1">
                  PIN Baru (4-8 Digit Angka) *
                </label>
                <input
                  type="password"
                  required
                  maxLength={8}
                  value={newPin}
                  onChange={(e) => setNewPin(e.target.value)}
                  placeholder="Masukkan PIN baru"
                  className="w-full bg-[#14161D] border border-white/[0.08] rounded px-3 py-2 text-xs font-mono text-[#F4F4F6] outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowPinModal(false);
                    setPinStatus(null);
                  }}
                  className="px-3.5 py-1.5 rounded bg-[#14161D] text-xs font-mono text-[#A1A1AA]"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded bg-[#EDEDEF] text-[#070709] text-xs font-mono font-medium hover:bg-white"
                >
                  Perbarui PIN
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
