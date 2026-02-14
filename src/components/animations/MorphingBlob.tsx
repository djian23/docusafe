import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function Blob({ color, position, size, speed }: { color: string; position: [number, number, number]; size: number; speed: number }) {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(t * speed) * 0.3;
      ref.current.rotation.x = t * speed * 0.2;
      ref.current.rotation.z = t * speed * 0.15;
    }
  });

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[size, 32, 32]} />
      <MeshDistortMaterial color={color} emissive={color} emissiveIntensity={0.2} roughness={0.4} metalness={0.6} distort={0.5} speed={speed * 3} transparent opacity={0.7} />
    </mesh>
  );
}

export function MorphingBlob({ className = '' }: { className?: string }) {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`} aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }} dpr={[1, 1.5]} gl={{ alpha: true }} style={{ background: 'transparent' }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} intensity={0.6} />
        <Blob color="#3B82F6" position={[-2, 0, 0]} size={0.8} speed={0.5} />
        <Blob color="#8B5CF6" position={[2, 1, -1]} size={0.6} speed={0.7} />
        <Blob color="#EC4899" position={[0, -1.5, -0.5]} size={0.5} speed={0.6} />
        <Blob color="#10B981" position={[-1.5, 1.5, -1]} size={0.4} speed={0.8} />
      </Canvas>
    </div>
  );
}
