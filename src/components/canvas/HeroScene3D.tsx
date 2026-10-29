'use client';

import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import {
  AdaptiveDpr,
  MeshReflectorMaterial,
  OrbitControls,
} from '@react-three/drei';
import * as THREE from 'three';
import { usePerformanceMode } from '@/lib/hooks/usePerformanceMode';

interface HeroScene3DProps {
  freeCameraMode?: boolean;
}

// 1. 3D Camera Mouse Parallax Controller
function CameraParallaxController({ freeCameraMode }: { freeCameraMode: boolean }) {
  const { isEcoMode, prefersReducedMotion } = usePerformanceMode();

  useFrame((state) => {
    if (freeCameraMode || isEcoMode || prefersReducedMotion) return;

    // Shift camera position smoothly following normalized pointer
    const targetX = state.pointer.x * 0.4;
    const targetY = state.pointer.y * 0.25;

    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, targetX, 0.04);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY, 0.04);
    state.camera.lookAt(0, 0, 0);
  });

  return null;
}

// 3. Reflective Water / RFID Grid Stage Floor
function ReflectiveWaterFloor() {
  const { isEcoMode, prefersReducedMotion } = usePerformanceMode();

  return (
    <group position={[0, -1.9, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      {/* Reflective Ground Mirror */}
      {!isEcoMode && !prefersReducedMotion ? (
        <mesh position={[0, 0, -0.01]}>
          <planeGeometry args={[16, 16]} />
          <MeshReflectorMaterial
            blur={[300, 100]}
            resolution={512}
            mirror={0.35}
            mixBlur={1}
            mixStrength={1.4}
            roughness={0.45}
            depthScale={1.2}
            minDepthThreshold={0.4}
            maxDepthThreshold={1.4}
            color="#050a12"
            metalness={0.85}
          />
        </mesh>
      ) : (
        <mesh position={[0, 0, -0.01]}>
          <planeGeometry args={[16, 16]} />
          <meshStandardMaterial color={0x050a12} roughness={0.4} metalness={0.8} />
        </mesh>
      )}

      {/* Cybernetic RFID Telemetry Grid Lines */}
      <gridHelper args={[16, 24, 0x0e74e9, 0x1e293b]} position={[0, 0, 0.01]} rotation={[Math.PI / 2, 0, 0]} />
    </group>
  );
}

// 4. Concentric Liquid & RFID Ripple Waves
function RadialLiquidRipples() {
  const ripplesGroup = useRef<THREE.Group>(null);
  const { isEcoMode } = usePerformanceMode();

  const rippleCount = 4;
  const ripplesRef = useRef<(THREE.Mesh | null)[]>([]);

  useFrame(({ clock }) => {
    if (isEcoMode || !ripplesGroup.current) return;
    const t = clock.getElapsedTime();

    ripplesRef.current.forEach((mesh, i) => {
      if (!mesh) return;
      const phase = (t * 0.45 + i / rippleCount) % 1;
      const currentScale = 0.8 + phase * 3.2;
      mesh.scale.set(currentScale, currentScale, currentScale);
      mesh.position.y = -1.45 + Math.sin(t * 1.5 + i * 0.8) * 0.08;

      const material = mesh.material as THREE.MeshBasicMaterial;
      if (material) {
        material.opacity = Math.sin(phase * Math.PI) * 0.35;
      }
    });
  });

  return (
    <group ref={ripplesGroup} rotation={[-Math.PI / 2.3, 0, 0]}>
      {Array.from({ length: rippleCount }).map((_, i) => (
        <mesh
          key={i}
          ref={(el) => {
            ripplesRef.current[i] = el;
          }}
          position={[0, 0, 0]}
        >
          <torusGeometry args={[1.0, 0.012, 16, 96]} />
          <meshBasicMaterial
            color={i % 2 === 0 ? 0x22d3ee : 0x0e74e9}
            transparent
            opacity={0.3}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}

// 5. Central Holographic Core Globe & Gyroscopic Orbit Rings
function UnseenHoloGlobe() {
  const globeGroupRef = useRef<THREE.Group>(null);
  const innerCoreRef = useRef<THREE.Mesh>(null);
  const cageRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Group>(null);
  const ring2Ref = useRef<THREE.Group>(null);
  const ring3Ref = useRef<THREE.Group>(null);
  const satellite1Ref = useRef<THREE.Mesh>(null);
  const satellite2Ref = useRef<THREE.Mesh>(null);
  const { isEcoMode } = usePerformanceMode();

  useFrame(({ clock }) => {
    if (isEcoMode) return;
    const t = clock.getElapsedTime();

    if (globeGroupRef.current) {
      globeGroupRef.current.position.y = 0.2 + Math.sin(t * 1.2) * 0.1;
    }

    if (cageRef.current) {
      cageRef.current.rotation.y = t * 0.25;
      cageRef.current.rotation.x = Math.sin(t * 0.3) * 0.15;
    }

    if (innerCoreRef.current) {
      innerCoreRef.current.rotation.y = -t * 0.4;
      const pulseScale = 1 + Math.sin(t * 2.2) * 0.035;
      innerCoreRef.current.scale.set(pulseScale, pulseScale, pulseScale);
    }

    if (ring1Ref.current) {
      ring1Ref.current.rotation.z = t * 0.35;
      ring1Ref.current.rotation.x = Math.PI / 2.4 + Math.sin(t * 0.5) * 0.12;
    }

    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = -t * 0.42;
      ring2Ref.current.rotation.x = Math.PI / 4 + Math.cos(t * 0.4) * 0.15;
    }

    if (ring3Ref.current) {
      ring3Ref.current.rotation.z = -t * 0.28;
      ring3Ref.current.rotation.y = Math.PI / 3 + Math.sin(t * 0.6) * 0.1;
    }

    if (satellite1Ref.current) {
      const a1 = t * 1.4;
      satellite1Ref.current.position.set(Math.cos(a1) * 1.35, Math.sin(a1) * 1.35, 0);
    }
    if (satellite2Ref.current) {
      const a2 = -t * 1.1 + 1.5;
      satellite2Ref.current.position.set(Math.cos(a2) * 1.68, Math.sin(a2) * 1.68, 0);
    }
  });

  return (
    <group ref={globeGroupRef} position={[0, 0.2, 0]}>
      {/* Geodesic Wireframe Globe */}
      <mesh ref={cageRef}>
        <icosahedronGeometry args={[0.95, 2]} />
        <meshBasicMaterial color={0x22d3ee} wireframe transparent opacity={0.4} depthWrite={false} />
      </mesh>

      {/* Glowing Liquid Crystal Core Sphere */}
      <mesh ref={innerCoreRef}>
        <sphereGeometry args={[0.62, 36, 36]} />
        <meshStandardMaterial
          color={0x0e74e9}
          roughness={0.15}
          metalness={0.9}
          emissive={0x1e3a8a}
          emissiveIntensity={0.65}
        />
      </mesh>

      {/* Gyroscopic Rings */}
      <group ref={ring1Ref}>
        <mesh>
          <torusGeometry args={[1.35, 0.012, 16, 96]} />
          <meshBasicMaterial color={0x22d3ee} transparent opacity={0.65} />
        </mesh>
        <mesh ref={satellite1Ref}>
          <sphereGeometry args={[0.045, 16, 16]} />
          <meshBasicMaterial color={0xffffff} />
        </mesh>
      </group>

      <group ref={ring2Ref}>
        <mesh>
          <torusGeometry args={[1.68, 0.01, 16, 96]} />
          <meshBasicMaterial color={0x0e74e9} transparent opacity={0.55} />
        </mesh>
        <mesh ref={satellite2Ref}>
          <sphereGeometry args={[0.04, 16, 16]} />
          <meshBasicMaterial color={0x22d3ee} />
        </mesh>
      </group>

      <group ref={ring3Ref}>
        <mesh>
          <torusGeometry args={[2.05, 0.008, 16, 96]} />
          <meshBasicMaterial color={0x22d3ee} transparent opacity={0.3} />
        </mesh>
      </group>
    </group>
  );
}

// 6. Secondary Floating Crystal Orb on the Left
function LeftFloatingOrb() {
  const orbRef = useRef<THREE.Mesh>(null);
  const { isEcoMode } = usePerformanceMode();

  useFrame(({ clock }) => {
    if (isEcoMode || !orbRef.current) return;
    const t = clock.getElapsedTime();
    orbRef.current.position.y = -0.35 + Math.cos(t * 1.5) * 0.14;
    orbRef.current.rotation.y = -t * 0.4;
  });

  return (
    <mesh ref={orbRef} position={[-2.5, -0.25, -0.6]}>
      <sphereGeometry args={[0.34, 28, 28]} />
      <meshStandardMaterial
        color={0x0e74e9}
        roughness={0.18}
        metalness={0.9}
        emissive={0x22d3ee}
        emissiveIntensity={0.25}
      />
    </mesh>
  );
}

// 7. Cosmic Stardust Particles
function CosmicDustParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const { isEcoMode } = usePerformanceMode();

  const { positions } = useMemo(() => {
    const count = 180;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 1] = -2.5 + Math.random() * 5.5;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return { positions: pos };
  }, []);

  useFrame(({ clock }) => {
    if (isEcoMode || !pointsRef.current) return;
    const t = clock.getElapsedTime();
    pointsRef.current.rotation.y = t * 0.025;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color={0x22d3ee}
        size={0.035}
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

// 8. 360° Drag & Smooth Parallax Scene Controller
function SceneController({ freeCameraMode }: { freeCameraMode: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const { isEcoMode } = usePerformanceMode();

  const dragRotation = useRef({ x: 0, y: 0 });
  const dragVelocity = useRef({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });

  const parallaxTarget = useRef({ x: 0, y: 0 });
  const parallaxCurrent = useRef({ x: 0, y: 0 });
  const smoothRotation = useRef({ x: 0, y: 0 });

  useFrame(() => {
    if (!groupRef.current || isEcoMode || freeCameraMode) return;

    if (!isDragging.current) {
      dragRotation.current.y += dragVelocity.current.x;
      dragRotation.current.x += dragVelocity.current.y;
      dragVelocity.current.x *= 0.93;
      dragVelocity.current.y *= 0.93;
    }

    dragRotation.current.x = Math.max(-0.55, Math.min(0.55, dragRotation.current.x));

    parallaxCurrent.current.x = THREE.MathUtils.lerp(parallaxCurrent.current.x, parallaxTarget.current.x, 0.06);
    parallaxCurrent.current.y = THREE.MathUtils.lerp(parallaxCurrent.current.y, parallaxTarget.current.y, 0.06);

    const targetY = dragRotation.current.y + parallaxCurrent.current.x;
    const targetX = dragRotation.current.x + parallaxCurrent.current.y;

    smoothRotation.current.y = THREE.MathUtils.lerp(smoothRotation.current.y, targetY, 0.1);
    smoothRotation.current.x = THREE.MathUtils.lerp(smoothRotation.current.x, targetX, 0.1);

    groupRef.current.rotation.y = smoothRotation.current.y;
    groupRef.current.rotation.x = smoothRotation.current.x;

    if (typeof window !== 'undefined') {
      const scrollOffset = Math.min(window.scrollY * 0.0018, 1.2);
      groupRef.current.position.y = -scrollOffset;
    }
  });

  useEffect(() => {
    if (freeCameraMode) return;

    const handlePointerDown = (e: PointerEvent) => {
      if (e.button !== 0 && e.pointerType === 'mouse') return;
      const target = e.target as HTMLElement | null;
      if (target?.closest('button, a, input, select, textarea, [role="button"], [data-no-drag]')) {
        return;
      }
      isDragging.current = true;
      dragStart.current = { x: e.clientX, y: e.clientY };
      dragVelocity.current = { x: 0, y: 0 };
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (isEcoMode) return;

      if (isDragging.current) {
        const deltaX = (e.clientX - dragStart.current.x) * 0.0055;
        const deltaY = (e.clientY - dragStart.current.y) * 0.0055;

        dragRotation.current.y += deltaX;
        dragRotation.current.x += deltaY;

        dragVelocity.current = { x: deltaX * 0.6, y: deltaY * 0.6 };
        dragStart.current = { x: e.clientX, y: e.clientY };
      }

      parallaxTarget.current.x = (e.clientX / window.innerWidth - 0.5) * 0.35;
      parallaxTarget.current.y = -(e.clientY / window.innerHeight - 0.5) * 0.22;
    };

    const handlePointerUp = () => {
      isDragging.current = false;
    };

    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointercancel', handlePointerUp);

    return () => {
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointercancel', handlePointerUp);
    };
  }, [isEcoMode, freeCameraMode]);

  return (
    <group ref={groupRef}>
      <UnseenHoloGlobe />
      <LeftFloatingOrb />
      <RadialLiquidRipples />
      <CosmicDustParticles />
    </group>
  );
}

export default function HeroScene3D({ freeCameraMode = false }: HeroScene3DProps) {
  return (
    <>
      <AdaptiveDpr pixelated />

      {/* Studio Illumination */}
      <ambientLight intensity={0.85} />
      <directionalLight position={[5, 8, 5]} intensity={1.8} color={0xffffff} />
      <directionalLight position={[-5, -4, -3]} intensity={1.1} color={0x0e74e9} />
      <pointLight position={[-4, 3, 2]} intensity={2.4} color={0x22d3ee} distance={14} />
      <pointLight position={[4, -2, 2]} intensity={1.8} color={0x0e74e9} distance={12} />

      {/* Free Camera Exploration (Item 5: OrbitControls) */}
      {freeCameraMode ? (
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          maxPolarAngle={Math.PI / 1.7}
          minPolarAngle={Math.PI / 3.2}
          dampingFactor={0.08}
        />
      ) : (
        <CameraParallaxController freeCameraMode={freeCameraMode} />
      )}

      {/* Reflective Ground Floor */}
      <ReflectiveWaterFloor />

      {/* Main 3D Model Nexus */}
      <SceneController freeCameraMode={freeCameraMode} />
    </>
  );
}
