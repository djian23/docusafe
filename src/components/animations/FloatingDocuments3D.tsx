import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

function Document3D({ position, color, rotation, speed, index }: { position: [number, number, number]; color: string; rotation: number; speed: number; index: number }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const foldRef = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(t * speed + index * 2) * 0.3 + rotation;
      meshRef.current.rotation.x = Math.cos(t * speed * 0.7 + index) * 0.15;
      meshRef.current.rotation.z = Math.sin(t * speed * 0.5 + index * 1.5) * 0.1;
    }
  });

  return (
    <Float speed={speed * 2} rotationIntensity={0.4} floatIntensity={0.8}>
      <group ref={meshRef} position={position}>
        {/* Document body */}
        <RoundedBox args={[0.8, 1.1, 0.04]} radius={0.03} smoothness={4}>
          <meshStandardMaterial color="white" roughness={0.3} metalness={0.1} />
        </RoundedBox>
        {/* Corner fold */}
        <mesh ref={foldRef} position={[0.28, 0.43, 0.025]}>
          <planeGeometry args={[0.22, 0.22]} />
          <meshStandardMaterial color="#e5e7eb" side={THREE.DoubleSide} />
        </mesh>
        {/* Content lines */}
        {[-0.2, -0.05, 0.1, 0.25].map((y, i) => (
          <mesh key={i} position={[-0.05, y, 0.025]}>
            <planeGeometry args={[0.5 - i * 0.08, 0.04]} />
            <meshStandardMaterial color={i === 0 ? color : '#d1d5db'} />
          </mesh>
        ))}
        {/* Color accent bar */}
        <mesh position={[-0.35, 0, 0.025]}>
          <planeGeometry args={[0.04, 0.8]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} />
        </mesh>
      </group>
    </Float>
  );
}

function FloatingShield({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Mesh>(null!);
  const glowRef = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (ref.current) {
      ref.current.rotation.y = t * 0.5;
      const s = 1 + Math.sin(t * 2) * 0.05;
      ref.current.scale.setScalar(s);
    }
    if (glowRef.current) {
      const mat = glowRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.15 + Math.sin(t * 3) * 0.08;
    }
  });

  return (
    <Float speed={1.5} floatIntensity={1.2}>
      <group position={position}>
        <mesh ref={glowRef}>
          <sphereGeometry args={[0.6, 16, 16]} />
          <meshBasicMaterial color="#3B82F6" transparent opacity={0.15} />
        </mesh>
        <mesh ref={ref}>
          <octahedronGeometry args={[0.35, 0]} />
          <meshStandardMaterial color="#3B82F6" emissive="#6366F1" emissiveIntensity={0.5} metalness={0.9} roughness={0.1} />
        </mesh>
      </group>
    </Float>
  );
}

export function FloatingDocuments3D({ className = '' }: { className?: string }) {
  const documents = useMemo(() => [
    { position: [-3, 1.5, -1] as [number, number, number], color: '#3B82F6', rotation: 0.3, speed: 0.8 },
    { position: [3, -0.5, -2] as [number, number, number], color: '#8B5CF6', rotation: -0.5, speed: 0.6 },
    { position: [-2.5, -1.5, -1.5] as [number, number, number], color: '#10B981', rotation: 0.8, speed: 0.7 },
    { position: [2.5, 1.8, -0.5] as [number, number, number], color: '#F59E0B', rotation: -0.3, speed: 0.9 },
    { position: [0, -2, -2] as [number, number, number], color: '#EC4899', rotation: 0.5, speed: 0.5 },
  ], []);

  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`} aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }} dpr={[1, 1.5]} gl={{ alpha: true, antialias: true }} style={{ background: 'transparent' }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <pointLight position={[-3, 3, 3]} intensity={0.4} color="#8B5CF6" />
        {documents.map((doc, i) => (
          <Document3D key={i} {...doc} index={i} />
        ))}
        <FloatingShield position={[0, 0.5, 0]} />
      </Canvas>
    </div>
  );
}
