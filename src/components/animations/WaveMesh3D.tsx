import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Wave({ color = '#3B82F6', opacity = 0.3, yOffset = 0, speed = 1 }: { color?: string; opacity?: number; yOffset?: number; speed?: number }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const geometryRef = useRef<THREE.PlaneGeometry>(null!);

  const { originalPositions } = useMemo(() => {
    const geo = new THREE.PlaneGeometry(16, 8, 64, 32);
    return { originalPositions: new Float32Array(geo.attributes.position.array) };
  }, []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime() * speed;
    const pos = meshRef.current.geometry.attributes.position;
    const arr = pos.array as Float32Array;
    for (let i = 0; i < pos.count; i++) {
      const x = originalPositions[i * 3];
      const y = originalPositions[i * 3 + 1];
      arr[i * 3 + 2] = Math.sin(x * 0.5 + t) * 0.3 + Math.sin(y * 0.3 + t * 0.8) * 0.2 + Math.sin((x + y) * 0.2 + t * 0.6) * 0.15;
    }
    pos.needsUpdate = true;
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 3, 0, 0]} position={[0, yOffset, -2]}>
      <planeGeometry ref={geometryRef} args={[16, 8, 64, 32]} />
      <meshStandardMaterial color={color} transparent opacity={opacity} wireframe side={THREE.DoubleSide} emissive={color} emissiveIntensity={0.2} />
    </mesh>
  );
}

export function WaveMesh3D({ className = '', variant = 'default' }: { className?: string; variant?: 'default' | 'security' | 'pricing' }) {
  const colors = {
    default: { wave1: '#3B82F6', wave2: '#8B5CF6' },
    security: { wave1: '#10B981', wave2: '#3B82F6' },
    pricing: { wave1: '#6366F1', wave2: '#EC4899' },
  };
  const c = colors[variant];

  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`} aria-hidden="true">
      <Canvas camera={{ position: [0, 2, 5], fov: 60 }} dpr={[1, 1.5]} gl={{ alpha: true, antialias: false }} style={{ background: 'transparent' }}>
        <ambientLight intensity={0.3} />
        <Wave color={c.wave1} opacity={0.15} yOffset={-1} speed={0.8} />
        <Wave color={c.wave2} opacity={0.1} yOffset={-1.5} speed={0.6} />
      </Canvas>
    </div>
  );
}
