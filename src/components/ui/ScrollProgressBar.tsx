'use client';

import { motion, useScroll, useSpring } from 'motion/react';
import { usePerformanceMode } from '@/lib/hooks/usePerformanceMode';

export default function ScrollProgressBar() {
  const { isEcoMode, prefersReducedMotion } = usePerformanceMode();
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  if (isEcoMode || prefersReducedMotion) {
    return null;
  }

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#2563EB] via-[#38BDF8] to-[#7DD3FC] origin-left z-50 pointer-events-none shadow-[0_0_8px_rgba(56,189,248,0.4)]"
      aria-hidden="true"
    />
  );
}
