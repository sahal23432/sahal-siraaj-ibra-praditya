'use client';

import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { AdaptiveDpr } from '@react-three/drei';
import * as THREE from 'three';
import { usePerformanceMode } from '@/lib/hooks/usePerformanceMode';

function RFIDSignalRings() {
  const groupRef = useRef<THREE.Group>(null);
  const { isEcoMode } = usePerformanceMode();

  const rings = useMemo(() => {
    return [0.9, 1.5, 2.2, 2.9].map((radius, i) => {
      const geo = new THREE.TorusGeometry(radius, 0.015, 8, 90);
      const mat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(0xf4f4f6),
        transparent: true,
        opacity: 0.16 - i * 0.03,
      });
      return { geo, mat, index: i };
    });
  }, []);

  useFrame(({ clock }) => {
    if (isEcoMode || !groupRef.current) return;
    const t = clock.getElapsedTime();
    groupRef.current.children.forEach((child, i) => {
      const mesh = child as THREE.Mesh;
      const mat = mesh.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.08 + Math.sin(t * 1.0 + i * 0.8) * 0.06;
      mesh.rotation.x = Math.sin(t * 0.2 + i * 0.4) * 0.12;
      mesh.rotation.z = t * 0.06 * (i % 2 === 0 ? 1 : -1);
    });
  });

  return (
    <group ref={groupRef}>
      {rings.map(({ geo, mat }, i) => (
        <mesh key={i} geometry={geo} material={mat} />
      ))}
    </group>
  );
}

function CircuitNodes() {
  const groupRef = useRef<THREE.Group>(null);
  const { isEcoMode } = usePerformanceMode();

  const nodes = useMemo(() => {
    const coords: [number, number, number][] = [
      [1.7, 0.7, 0.1],
      [-1.8, 0.9, -0.2],
      [0.6, -1.6, 0.3],
      [-0.9, -1.4, -0.1],
      [1.4, -1.0, 0.2],
      [-1.5, 0.2, 0.2],
      [1.1, 1.8, -0.1],
      [-0.5, 1.9, 0.2],
    ];
    return coords;
  }, []);

  useFrame(({ clock }) => {
    if (isEcoMode || !groupRef.current) return;
    const t = clock.getElapsedTime();
    groupRef.current.children.forEach((child, i) => {
      const mesh = child as THREE.Mesh;
      const mat = mesh.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.3 + Math.sin(t * 1.5 + i * 0.9) * 0.25;
    });
  });

  return (
    <group ref={groupRef}>
      {nodes.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.045, 10, 10]} />
          <meshBasicMaterial color={0x38bdf8} transparent opacity={0.6} />
        </mesh>
      ))}
    </group>
  );
}

function CenterConsoleCore() {
  const meshRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const { isEcoMode } = usePerformanceMode();

  useFrame(({ clock }) => {
    if (isEcoMode) return;
    const t = clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.35;
      meshRef.current.rotation.x = Math.sin(t * 0.25) * 0.2;
      const mat = meshRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.45 + Math.sin(t * 1.8) * 0.2;
    }
    if (innerRef.current) {
      innerRef.current.rotation.y = -t * 0.5;
      innerRef.current.rotation.z = Math.cos(t * 0.3) * 0.25;
    }
  });

  return (
    <group>
      {/* Outer Console Node Wireframe */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[0.38, 1]} />
        <meshBasicMaterial color={0xf4f4f6} wireframe transparent opacity={0.55} />
      </mesh>
      {/* Inner Circuit Chip Node */}
      <mesh ref={innerRef}>
        <boxGeometry args={[0.16, 0.16, 0.16]} />
        <meshBasicMaterial color={0x38bdf8} wireframe transparent opacity={0.85} />
      </mesh>
    </group>
  );
}

function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);
  const { isEcoMode } = usePerformanceMode();

  const { positions, velocities } = useMemo(() => {
    const count = 100;
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 6;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 4;
      vel[i * 3] = (Math.random() - 0.5) * 0.003;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.003;
      vel[i * 3 + 2] = 0;
    }
    return { positions: pos, velocities: vel };
  }, []);

  useFrame(() => {
    if (isEcoMode || !pointsRef.current) return;
    const pos = pointsRef.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < pos.length / 3; i++) {
      pos[i * 3] += velocities[i * 3];
      pos[i * 3 + 1] += velocities[i * 3 + 1];
      if (Math.abs(pos[i * 3]) > 4.5) velocities[i * 3] *= -1;
      if (Math.abs(pos[i * 3 + 1]) > 3.5) velocities[i * 3 + 1] *= -1;
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color={0xf4f4f6}
        size={0.025}
        transparent
        opacity={0.3}
        sizeAttenuation
      />
    </points>
  );
}

function SceneController() {
  const groupRef = useRef<THREE.Group>(null);
  const { isEcoMode } = usePerformanceMode();
  const targetRotation = useRef({ x: 0, y: 0 });
  const { gl } = useThree();

  useFrame(() => {
    if (!groupRef.current || isEcoMode) return;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetRotation.current.y,
      0.05
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      targetRotation.current.x,
      0.05
    );
  });

  const handlePointerMove = (e: MouseEvent) => {
    if (isEcoMode) return;
    const canvas = gl.domElement;
    const rect = canvas.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    targetRotation.current.y = x * 0.35;
    targetRotation.current.x = -y * 0.25;
  };

  useMemo(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('mousemove', handlePointerMove);
    }
  }, [isEcoMode, gl]);

  return (
    <group ref={groupRef}>
      <CenterConsoleCore />
      <RFIDSignalRings />
      <CircuitNodes />
      <ParticleField />
    </group>
  );
}

export default function HeroScene3D() {
  return (
    <>
      <AdaptiveDpr pixelated />
      <ambientLight intensity={0.2} />
      <SceneController />
    </>
  );
}
