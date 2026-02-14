import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function Orb({ color = '#3B82F6', speed = 2, distort = 0.4 }: { color?: string; speed?: number; distort?: number }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const glowRef = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.3;
      meshRef.current.rotation.y = t * 0.2;
    }
    if (glowRef.current) {
      const s = 1.3 + Math.sin(t * 1.5) * 0.1;
      glowRef.current.scale.setScalar(s);
      const mat = glowRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.08 + Math.sin(t * 2) * 0.04;
    }
  });

  return (
    <group>
      <mesh ref={glowRef}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshBasicMaterial color={color} transparent opacity={0.1} side={THREE.BackSide} />
      </mesh>
      <mesh ref={meshRef}>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial color={color} emissive={color} emissiveIntensity={0.4} roughness={0.2} metalness={0.8} distort={distort} speed={speed} />
      </mesh>
    </group>
  );
}

function FloatingRings({ color = '#6366F1' }: { color?: string }) {
  const ring1Ref = useRef<THREE.Mesh>(null!);
  const ring2Ref = useRef<THREE.Mesh>(null!);
  const ring3Ref = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = t * 0.5;
      ring1Ref.current.rotation.z = t * 0.3;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = t * 0.4;
      ring2Ref.current.rotation.x = Math.PI / 3 + t * 0.2;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.z = t * 0.6;
      ring3Ref.current.rotation.y = Math.PI / 4 + t * 0.15;
    }
  });

  return (
    <group>
      <mesh ref={ring1Ref}>
        <torusGeometry args={[1.8, 0.015, 16, 100]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} transparent opacity={0.6} />
      </mesh>
      <mesh ref={ring2Ref}>
        <torusGeometry args={[2.1, 0.012, 16, 100]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} transparent opacity={0.4} />
      </mesh>
      <mesh ref={ring3Ref}>
        <torusGeometry args={[2.4, 0.01, 16, 100]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.2} transparent opacity={0.3} />
      </mesh>
    </group>
  );
}

export function GlowingOrb3D({ className = '', color = '#3B82F6', size = 'md' }: { className?: string; color?: string; size?: 'sm' | 'md' | 'lg' }) {
  const heights = { sm: 'h-[200px]', md: 'h-[300px]', lg: 'h-[400px]' };

  return (
    <div className={`w-full ${heights[size]} ${className}`} aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 4], fov: 50 }} dpr={[1, 1.5]} gl={{ alpha: true, antialias: true }} style={{ background: 'transparent' }}>
        <ambientLight intensity={0.2} />
        <pointLight position={[5, 5, 5]} intensity={0.8} color={color} />
        <pointLight position={[-5, -5, -5]} intensity={0.3} color="#8B5CF6" />
        <Orb color={color} />
        <FloatingRings color={color} />
      </Canvas>
    </div>
  );
}
