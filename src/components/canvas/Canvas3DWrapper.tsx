'use client';

import { Suspense, useRef, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Canvas } from '@react-three/fiber';
import WebGLErrorBoundary from './WebGLErrorBoundary';
import FallbackHero2D from './FallbackHero2D';
import { usePerformanceMode } from '@/lib/hooks/usePerformanceMode';

const HeroScene3D = dynamic(() => import('./HeroScene3D'), { ssr: false });

export default function Canvas3DWrapper() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const { isEcoMode } = usePerformanceMode();

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Compute frameloop to conserve GPU:
  // When off-screen: 'never'
  // When Eco Mode: 'demand'
  // When visible & standard: 'always'
  let frameloop: 'always' | 'demand' | 'never' = 'always';
  if (!isVisible) {
    frameloop = 'never';
  } else if (isEcoMode) {
    frameloop = 'demand';
  }

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {isEcoMode ? (
        <FallbackHero2D />
      ) : (
        <WebGLErrorBoundary>
          <Canvas
            dpr={[1, 1.5]}
            frameloop={frameloop}
            camera={{ position: [0, 0, 5], fov: 48 }}
            gl={{
              antialias: true,
              alpha: true,
              powerPreference: 'high-performance',
            }}
            style={{ background: 'transparent' }}
          >
            <Suspense fallback={null}>
              <HeroScene3D />
            </Suspense>
          </Canvas>
        </WebGLErrorBoundary>
      )}
    </div>
  );
}
