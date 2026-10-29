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
    <div className="min-h-screen flex flex-col justify-center items-center px-4 bg-[#041624] text-[#F8FAFC]">
      <div className="w-full max-w-sm bg-[#082F49] border border-[#22D3EE]/25 rounded-2xl p-6 sm:p-8 shadow-2xl">
        {/* Header Bar */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/[0.08]">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-[#94A3B8] hover:text-[#22D3EE] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>⮡ Beranda</span>
          </Link>
          <span className="text-[10px] font-mono text-[#22D3EE] flex items-center gap-1 bg-[#041624] px-2.5 py-0.5 rounded-full border border-[#22D3EE]/30">
            <span className="w-1.5 h-1.5 rounded-full bg-[#22D3EE] animate-pulse" />
            SECURE PIN LOCK
          </span>
        </div>

        {/* Title and Icon */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-xl bg-[#041624] border border-[#22D3EE]/25 flex items-center justify-center mx-auto mb-3 text-[#22D3EE]">
            <Lock className="w-5 h-5 text-[#22D3EE]" />
          </div>
          <h1 className="text-lg font-medium tracking-tight text-[#F8FAFC]">
            PIN Akses Cockpit Admin
          </h1>
          <p className="text-xs font-mono text-[#94A3B8] mt-1">
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
                  ? 'bg-[#22D3EE] border-[#22D3EE] scale-110 shadow-sm shadow-[#22D3EE]/50'
                  : 'bg-[#041624] border-white/[0.15]'
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
              className="h-12 rounded-xl bg-[#041624] border border-white/[0.08] hover:border-[#22D3EE]/40 hover:bg-[#062438] active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed text-base font-mono font-medium text-[#F8FAFC] transition-all flex items-center justify-center"
            >
              {digit}
            </button>
          ))}

          <button
            type="button"
            disabled={loading || isLocked || pin.length === 0}
            onClick={handleClear}
            className="h-12 rounded-xl bg-[#041624]/60 border border-white/[0.04] hover:bg-[#041624] disabled:opacity-30 disabled:cursor-not-allowed text-[11px] font-mono text-[#94A3B8] transition-all flex items-center justify-center"
          >
            CLEAR
          </button>

          <button
            key="0"
            type="button"
            disabled={loading || isLocked}
            onClick={() => handleDigit('0')}
            className="h-12 rounded-xl bg-[#041624] border border-white/[0.08] hover:border-[#22D3EE]/40 hover:bg-[#062438] active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed text-base font-mono font-medium text-[#F8FAFC] transition-all flex items-center justify-center"
          >
            0
          </button>

          <button
            type="button"
            disabled={loading || isLocked || pin.length === 0}
            onClick={handleDelete}
            className="h-12 rounded-xl bg-[#041624]/60 border border-white/[0.04] hover:bg-[#041624] disabled:opacity-30 disabled:cursor-not-allowed text-xs font-mono text-[#94A3B8] transition-all flex items-center justify-center"
            aria-label="Hapus satu angka"
          >
            <Delete className="w-4 h-4" />
          </button>
        </div>

        {/* Development Hint (Only shown in development mode) */}
        {devPinHint && (
          <div className="pt-4 border-t border-white/[0.06] text-[11px] font-mono text-center text-[#94A3B8]">
            PIN pengembangan: <span className="text-[#22D3EE] font-medium">{devPinHint}</span>
          </div>
        )}
      </div>
    </div>
  );
}
