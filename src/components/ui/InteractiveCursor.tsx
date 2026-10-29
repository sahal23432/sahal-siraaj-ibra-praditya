'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { usePerformanceMode } from '@/lib/hooks/usePerformanceMode';

export default function CustomCursor() {
  const { isEcoMode, prefersReducedMotion } = usePerformanceMode();
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Raw mouse coordinates
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Inertial spring coordinates (stiffness: 280, damping: 24)
  const springConfig = { stiffness: 280, damping: 24 };
  const ringX = useSpring(mouseX, springConfig);
  const ringY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Only active on desktop fine pointer devices
    if (isEcoMode || prefersReducedMotion || !window.matchMedia('(pointer: fine)').matches) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const isInteractive = Boolean(
        target.closest('a, button, input, textarea, select, [role="button"], [data-cursor-hover]')
      );
      setIsHovered(isInteractive);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isEcoMode, prefersReducedMotion, isVisible, mouseX, mouseY]);

  if (isEcoMode || prefersReducedMotion || !isVisible) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden="true">
      {/* Center 1:1 Tracking Micro-Dot */}
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-[#22D3EE] shadow-[0_0_8px_#22D3EE]"
      />

      {/* Inertial Spring Ring (w-7 h-7 with scale: 1.6 on interactive hover) */}
      <motion.div
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovered ? 1.6 : 1.0,
          borderColor: isHovered ? 'rgba(34, 211, 238, 0.85)' : 'rgba(34, 211, 238, 0.35)',
          backgroundColor: isHovered ? 'rgba(34, 211, 238, 0.12)' : 'rgba(34, 211, 238, 0.02)',
        }}
        transition={{ type: 'spring', stiffness: 280, damping: 24 }}
        className="fixed top-0 left-0 w-7 h-7 rounded-full border border-current/40 shadow-[0_0_15px_rgba(34,211,238,0.2)]"
      />
    </div>
  );
}

// Named alias for backward compatibility
export { CustomCursor as InteractiveCursor };
