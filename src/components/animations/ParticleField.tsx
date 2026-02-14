import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Particles({ count = 300, color = '#3B82F6', spread = 10 }: { count?: number; color?: string; spread?: number }) {
  const meshRef = useRef<THREE.Points>(null!);

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const speeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * spread;
      positions[i * 3 + 1] = (Math.random() - 0.5) * spread;
      positions[i * 3 + 2] = (Math.random() - 0.5) * spread;
      sizes[i] = Math.random() * 0.05 + 0.02;
      speeds[i] = Math.random() * 0.5 + 0.2;
    }
    return { positions, sizes, speeds };
  }, [count, spread]);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    const pos = meshRef.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 1] += Math.sin(t * particles.speeds[i] + i) * 0.002;
      pos[i * 3] += Math.cos(t * particles.speeds[i] * 0.5 + i) * 0.001;
    }
    meshRef.current.geometry.attributes.position.needsUpdate = true;
    meshRef.current.rotation.y = t * 0.03;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={particles.positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.04} color={color} transparent opacity={0.6} sizeAttenuation blending={THREE.AdditiveBlending} />
    </points>
  );
}

export function ParticleField({ className = '', color = '#3B82F6', count = 200 }: { className?: string; color?: string; count?: number }) {
  return (
    <div className={`absolute inset-0 ${className}`} aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }} dpr={[1, 1.5]} gl={{ alpha: true, antialias: false }} style={{ background: 'transparent' }}>
        <Particles count={count} color={color} />
      </Canvas>
    </div>
  );
}
