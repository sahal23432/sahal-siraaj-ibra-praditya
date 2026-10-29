'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { usePerformanceMode } from '@/lib/hooks/usePerformanceMode';

export default function Preloader() {
  const { prefersReducedMotion } = usePerformanceMode();
  const [percent, setPercent] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    // If reduced motion, complete immediately
    if (prefersReducedMotion) {
      setPercent(100);
      setIsComplete(true);
      setShouldRender(false);
      return;
    }

    const duration = 1100; // ~1.1s
    const startTime = performance.now();

    const updateCounter = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Smooth ease-out count
      const currentPercent = Math.round(progress * 100);
      setPercent(currentPercent);

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        setTimeout(() => {
          setIsComplete(true);
        }, 120);
      }
    };

    const frameId = requestAnimationFrame(updateCounter);
    return () => cancelAnimationFrame(frameId);
  }, [prefersReducedMotion]);

  if (!shouldRender) return null;

  const formattedPercent = `[${String(percent).padStart(2, '0')}%]`;

  return (
    <AnimatePresence onExitComplete={() => setShouldRender(false)}>
      {!isComplete && (
        <motion.div
          key="preloader-curtain"
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-between p-8 sm:p-12 bg-[#05070B] text-[#F8FAFC] pointer-events-auto select-none"
        >
          {/* Top telemetry indicator */}
          <div className="w-full flex items-center justify-between text-xs font-mono text-[#94A3B8]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#22D3EE] animate-pulse" />
              <span>SAHAL SIRAAJ · SMKN 9</span>
            </div>
            <span>INITIALIZING 3D STAGE</span>
          </div>

          {/* Center Monospace Percentage Counter */}
          <div className="flex flex-col items-center text-center">
            <span
              style={{ fontFamily: 'var(--font-serif, "Instrument Serif", Georgia, serif)' }}
              className="text-2xl sm:text-3xl italic text-white/80 mb-2"
            >
              Creating the unexpected
            </span>
            <div className="text-6xl sm:text-8xl md:text-9xl font-mono font-bold tracking-tighter text-[#22D3EE] drop-shadow-[0_0_30px_rgba(34,211,238,0.35)]">
              {formattedPercent}
            </div>
            <div className="w-48 sm:w-64 h-[2px] bg-white/[0.08] rounded-full mt-6 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#0E74E9] to-[#22D3EE] transition-all duration-75 ease-out"
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>

          {/* Bottom telemetry detail */}
          <div className="w-full flex items-center justify-between text-[11px] font-mono text-[#64748B]">
            <span>SYSTEM ONLINE // 2026</span>
            <span>THREE.JS · WEBGL · IOT</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
