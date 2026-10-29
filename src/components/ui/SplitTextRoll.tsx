'use client';

import { motion } from 'motion/react';

interface SplitTextRollProps {
  text: string;
  isHovered: boolean;
  className?: string;
  italicClassName?: string;
  staggerDelay?: number;
  duration?: number;
}

export default function SplitTextRoll({
  text,
  isHovered,
  className = '',
  italicClassName = 'text-[#22D3EE] italic',
  staggerDelay = 0.022,
  duration = 0.42,
}: SplitTextRollProps) {
  const letters = text.split('');

  return (
    <span className={`relative inline-flex overflow-hidden select-none leading-none ${className}`}>
      {/* Primary Upright Text Line (rolls up to y: -105% on hover) */}
      <span className="inline-flex" aria-hidden={isHovered}>
        {letters.map((char, index) => (
          <motion.span
            key={`upright-${index}`}
            initial={false}
            animate={{ y: isHovered ? '-105%' : '0%' }}
            transition={{
              duration,
              ease: [0.22, 1, 0.36, 1],
              delay: index * staggerDelay,
            }}
            className="inline-block"
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </span>

      {/* Duplicate Italic Serif Line (rolls up from y: 105% to 0% on hover) */}
      <span
        className="absolute inset-0 inline-flex"
        style={{ fontFamily: 'var(--font-serif, "Instrument Serif", Georgia, serif)' }}
        aria-hidden={!isHovered}
      >
        {letters.map((char, index) => (
          <motion.span
            key={`italic-${index}`}
            initial={false}
            animate={{ y: isHovered ? '0%' : '105%' }}
            transition={{
              duration,
              ease: [0.22, 1, 0.36, 1],
              delay: index * staggerDelay,
            }}
            className={`inline-block font-normal ${italicClassName}`}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </span>
    </span>
  );
}
