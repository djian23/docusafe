import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

function ShieldMesh() {
  const groupRef = useRef<THREE.Group>(null!);
  const shieldRef = useRef<THREE.Mesh>(null!);
  const glowRef = useRef<THREE.Mesh>(null!);

  const shieldShape = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 1.2);
    shape.bezierCurveTo(0.6, 1.1, 1, 0.8, 1, 0.3);
    shape.bezierCurveTo(1, -0.2, 0.6, -0.8, 0, -1.2);
    shape.bezierCurveTo(-0.6, -0.8, -1, -0.2, -1, 0.3);
    shape.bezierCurveTo(-1, 0.8, -0.6, 1.1, 0, 1.2);
    return shape;
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.5) * 0.3;
    }
    if (glowRef.current) {
      const s = 1.1 + Math.sin(t * 2) * 0.05;
      glowRef.current.scale.setScalar(s);
      const mat = glowRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.12 + Math.sin(t * 3) * 0.05;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.8}>
      <group ref={groupRef}>
        <mesh ref={glowRef}>
          <sphereGeometry args={[1.5, 32, 32]} />
          <meshBasicMaterial color="#3B82F6" transparent opacity={0.12} side={THREE.BackSide} />
        </mesh>
        <mesh ref={shieldRef}>
          <extrudeGeometry args={[shieldShape, { depth: 0.2, bevelEnabled: true, bevelThickness: 0.05, bevelSize: 0.05, bevelSegments: 3 }]} />
          <meshStandardMaterial color="#3B82F6" emissive="#6366F1" emissiveIntensity={0.3} metalness={0.9} roughness={0.1} />
        </mesh>
        {/* Lock icon center */}
        <mesh position={[0, 0.1, 0.15]}>
          <boxGeometry args={[0.35, 0.3, 0.08]} />
          <meshStandardMaterial color="#1E40AF" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[0, 0.35, 0.15]}>
          <torusGeometry args={[0.15, 0.04, 16, 32, Math.PI]} />
          <meshStandardMaterial color="#1E40AF" metalness={0.8} roughness={0.2} />
        </mesh>
      </group>
    </Float>
  );
}

function OrbitalParticles() {
  const groupRef = useRef<THREE.Group>(null!);
  const count = 30;

  const particles = useMemo(() => {
    const arr = [];
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const radius = 2 + Math.random() * 0.5;
      arr.push({
        position: [Math.cos(angle) * radius, Math.sin(angle) * radius * 0.6, Math.sin(angle * 2) * 0.5] as [number, number, number],
        size: 0.03 + Math.random() * 0.03,
        speed: 0.5 + Math.random() * 0.5,
      });
    }
    return arr;
  }, []);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = clock.getElapsedTime() * 0.2;
      groupRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.3) * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      {particles.map((p, i) => (
        <mesh key={i} position={p.position}>
          <sphereGeometry args={[p.size, 8, 8]} />
          <meshBasicMaterial color="#60A5FA" transparent opacity={0.6} />
        </mesh>
      ))}
    </group>
  );
}

export function Shield3D({ className = '' }: { className?: string }) {
  return (
    <div className={`w-full h-[300px] md:h-[350px] ${className}`} aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 4], fov: 50 }} dpr={[1, 1.5]} gl={{ alpha: true, antialias: true }} style={{ background: 'transparent' }}>
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <pointLight position={[-3, 3, 3]} intensity={0.5} color="#3B82F6" />
        <pointLight position={[3, -3, 3]} intensity={0.3} color="#8B5CF6" />
        <ShieldMesh />
        <OrbitalParticles />
      </Canvas>
    </div>
  );
}
