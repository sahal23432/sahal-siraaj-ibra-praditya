'use client';

import { ReactNode } from 'react';
import { motion } from 'motion/react';
import { usePerformanceMode } from '@/lib/hooks/usePerformanceMode';

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  className?: string;
}

export default function ScrollReveal({
  children,
  delay = 0,
  duration = 0.55,
  direction = 'up',
  className = '',
}: ScrollRevealProps) {
  const { isEcoMode, prefersReducedMotion } = usePerformanceMode();

  if (isEcoMode || prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const offsetMap = {
    up: { y: 28, x: 0 },
    down: { y: -28, x: 0 },
    left: { x: 28, y: 0 },
    right: { x: -28, y: 0 },
    none: { x: 0, y: 0 },
  };

  const offset = offsetMap[direction];

  return (
    <motion.div
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
