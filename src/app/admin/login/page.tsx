'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck, Lock, Delete } from 'lucide-react';
import { getDefaultPinHint } from '@/lib/services/auth';

export default function AdminLoginPage() {
  const router = useRouter();
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [lockoutSeconds, setLockoutSeconds] = useState(0);

  const maxDigits = 6;
  const isLocked = lockoutSeconds > 0;

  // Countdown timer for lockout
  useEffect(() => {
    if (lockoutSeconds <= 0) return;
    const timer = setInterval(() => {
      setLockoutSeconds((prev) => {
        if (prev <= 1) {
          setError('');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [lockoutSeconds]);

  const handleDigit = (digit: string) => {
    if (isLocked || loading) return;
    if (pin.length < maxDigits) {
      const nextPin = pin + digit;
      setPin(nextPin);
      setError('');
      if (nextPin.length === maxDigits) {
        submitPin(nextPin);
      }
    }
  };

  const handleDelete = () => {
    if (isLocked || loading) return;
    setPin((prev) => prev.slice(0, -1));
    setError('');
  };

  const handleClear = () => {
    if (isLocked || loading) return;
    setPin('');
    setError('');
  };

  const submitPin = async (code: string) => {
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin: code }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        if (typeof window !== 'undefined') {
          localStorage.setItem('admin-session', 'active');
          localStorage.setItem('admin-unlocked-at', new Date().toISOString());
        }
        router.push('/admin');
        router.refresh();
      } else {
        setError(data.error || 'PIN tidak valid. Silakan coba lagi.');
        setPin('');
        if (data.isLocked && data.lockoutSeconds) {
          setLockoutSeconds(data.lockoutSeconds);
        }
      }
    } catch {
      setError('Gangguan jaringan saat memverifikasi PIN.');
      setPin('');
    } finally {
      setLoading(false);
    }
  };

  // Physical keyboard support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isLocked || loading) return;
      if (/^[0-9]$/.test(e.key)) {
        handleDigit(e.key);
      } else if (e.key === 'Backspace') {
        handleDelete();
      } else if (e.key === 'Escape') {
        handleClear();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [pin, isLocked, loading]);

  const devPinHint = getDefaultPinHint();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 bg-[#070709] text-[#F4F4F6]">
      <div className="w-full max-w-sm bg-[#0D0E12] border border-white/[0.08] rounded-2xl p-6 sm:p-8">
        {/* Header Bar */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/[0.06]">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-[#A1A1AA] hover:text-[#F4F4F6] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Beranda</span>
          </Link>
          <span className="text-[10px] font-mono text-[#38BDF8] flex items-center gap-1 bg-[#14161D] px-2 py-0.5 rounded border border-[#38BDF8]/20">
            <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8]" />
            SECURE PIN LOCK
          </span>
        </div>

        {/* Title and Icon */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-xl bg-[#14161D] border border-white/[0.08] flex items-center justify-center mx-auto mb-3 text-[#EDEDEF]">
            <Lock className="w-5 h-5 text-[#38BDF8]" />
          </div>
          <h1 className="text-lg font-medium tracking-tight text-[#F4F4F6]">
            PIN Akses Cockpit Admin
          </h1>
          <p className="text-xs font-mono text-[#63636E] mt-1">
            Masukkan PIN 6-digit untuk otentikasi sesi aman
          </p>
        </div>

        {/* PIN Indicators */}
        <div className="flex justify-center items-center gap-3 my-6">
          {Array.from({ length: maxDigits }).map((_, i) => (
            <div
              key={i}
              className={`w-3.5 h-3.5 rounded-full transition-all duration-150 border ${
                i < pin.length
                  ? 'bg-[#38BDF8] border-[#38BDF8] scale-110 shadow-sm shadow-[#38BDF8]/40'
                  : 'bg-[#14161D] border-white/[0.15]'
              }`}
            />
          ))}
        </div>

        {/* Error / Lockout message */}
        {error && (
          <div className="p-2.5 rounded mb-4 text-xs font-mono text-center bg-red-500/10 text-red-400 border border-red-500/20">
            {error}
            {isLocked && (
              <div className="mt-1 font-semibold text-red-300">
                Tunggu {Math.floor(lockoutSeconds / 60)}m {lockoutSeconds % 60}d sebelum mencoba kembali.
              </div>
            )}
          </div>
        )}

        {/* Tactile Keypad (0-9, Clear, Backspace) */}
        <div className="grid grid-cols-3 gap-2.5 mb-6">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
            <button
              key={digit}
              type="button"
              disabled={loading || isLocked}
              onClick={() => handleDigit(digit)}
              className="h-12 rounded-xl bg-[#14161D] border border-white/[0.06] hover:border-white/20 hover:bg-[#1a1c24] active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed text-base font-mono font-medium text-[#F4F4F6] transition-all flex items-center justify-center"
            >
              {digit}
            </button>
          ))}

          <button
            type="button"
            disabled={loading || isLocked || pin.length === 0}
            onClick={handleClear}
            className="h-12 rounded-xl bg-[#14161D]/50 border border-white/[0.04] hover:bg-[#14161D] disabled:opacity-30 disabled:cursor-not-allowed text-[11px] font-mono text-[#A1A1AA] transition-all flex items-center justify-center"
          >
            CLEAR
          </button>

          <button
            key="0"
            type="button"
            disabled={loading || isLocked}
            onClick={() => handleDigit('0')}
            className="h-12 rounded-xl bg-[#14161D] border border-white/[0.06] hover:border-white/20 hover:bg-[#1a1c24] active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed text-base font-mono font-medium text-[#F4F4F6] transition-all flex items-center justify-center"
          >
            0
          </button>

          <button
            type="button"
            disabled={loading || isLocked || pin.length === 0}
            onClick={handleDelete}
            className="h-12 rounded-xl bg-[#14161D]/50 border border-white/[0.04] hover:bg-[#14161D] disabled:opacity-30 disabled:cursor-not-allowed text-xs font-mono text-[#A1A1AA] transition-all flex items-center justify-center"
            aria-label="Hapus satu angka"
          >
            <Delete className="w-4 h-4" />
          </button>
        </div>

        {/* Development Hint (Only shown in development mode) */}
        {devPinHint && (
          <div className="pt-4 border-t border-white/[0.04] text-[11px] font-mono text-center text-[#63636E]">
            PIN pengembangan: <span className="text-[#38BDF8] font-medium">{devPinHint}</span>
          </div>
        )}
      </div>
    </div>
  );
}
