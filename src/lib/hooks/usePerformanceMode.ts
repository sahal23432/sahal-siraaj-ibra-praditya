'use client';

import { createContext, useContext, useState, useEffect, useCallback, ReactNode, createElement } from 'react';

interface PerformanceContextValue {
  isEcoMode: boolean;
  toggleEcoMode: () => void;
  prefersReducedMotion: boolean;
  fps: number;
  setFps: (fps: number) => void;
}

const PerformanceContext = createContext<PerformanceContextValue>({
  isEcoMode: false,
  toggleEcoMode: () => {},
  prefersReducedMotion: false,
  fps: 60,
  setFps: () => {},
});

export function PerformanceProvider({ children }: { children: ReactNode }) {
  const [isEcoMode, setIsEcoMode] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [fps, setFps] = useState(60);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);

    const saved = localStorage.getItem('portfolio-eco-mode');
    if (saved === 'true' || mediaQuery.matches) {
      setIsEcoMode(true);
    }

    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const toggleEcoMode = useCallback(() => {
    setIsEcoMode((prev) => {
      const next = !prev;
      localStorage.setItem('portfolio-eco-mode', String(next));
      return next;
    });
  }, []);

  return createElement(
    PerformanceContext.Provider,
    { value: { isEcoMode, toggleEcoMode, prefersReducedMotion, fps, setFps } },
    children
  );
}

export function usePerformanceMode() {
  return useContext(PerformanceContext);
}
