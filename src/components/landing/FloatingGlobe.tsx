import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Line } from '@react-three/drei';
import * as THREE from 'three';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { useIsMobile } from '@/hooks/use-mobile';

function GlobeMesh({ reducedMotion }: { reducedMotion: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const innerGlowRef = useRef<THREE.Mesh>(null!);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const materialRef = useRef<any>(null!);
  const { pointer } = useThree();

  const colorA = useMemo(() => new THREE.Color('#6366F1'), []);
  const colorB = useMemo(() => new THREE.Color('#06B6D4'), []);
  const tempColor = useMemo(() => new THREE.Color(), []);

  useFrame(({ clock }) => {
    if (reducedMotion) return;
    const t = clock.getElapsedTime();

    if (meshRef.current) {
      const targetRotY = t * 0.15 + pointer.x * 0.3;
      const targetRotX = Math.sin(t * 0.1) * 0.1 + pointer.y * 0.2;
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y, targetRotY, 0.05
      );
      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x, targetRotX, 0.05
      );
    }

    if (materialRef.current) {
      materialRef.current.distort = 0.25 + Math.sin(t * 0.8) * 0.1;
      const lerpFactor = (Math.sin(t * 0.3) + 1) / 2;
      tempColor.lerpColors(colorA, colorB, lerpFactor);
      materialRef.current.emissive = tempColor;
      materialRef.current.emissiveIntensity = 0.3 + Math.sin(t * 0.5) * 0.15;
    }

    if (innerGlowRef.current) {
      const scale = 1 + Math.sin(t * 0.6) * 0.03;
      innerGlowRef.current.scale.setScalar(scale);
    }
  });

  return (
    <Float speed={reducedMotion ? 0 : 2} rotationIntensity={0.3} floatIntensity={1}>
      <group>
        <mesh ref={innerGlowRef}>
          <sphereGeometry args={[2.0, 32, 32]} />
          <meshBasicMaterial
            color="#3B82F6"
            transparent
            opacity={0.06}
            side={THREE.BackSide}
          />
        </mesh>
        <mesh ref={meshRef}>
          <icosahedronGeometry args={[2.2, 8]} />
          <MeshDistortMaterial
            ref={materialRef}
            color="#3B82F6"
            emissive="#6366F1"
            emissiveIntensity={0.3}
            roughness={0.2}
            metalness={0.8}
            distort={0.25}
            speed={2}
            wireframe
          />
        </mesh>
      </group>
    </Float>
  );
}

function Particles({ reducedMotion, isMobile }: { reducedMotion: boolean; isMobile: boolean }) {
  const particlesRef = useRef<THREE.Points>(null!);
  const count = isMobile ? 100 : 200;
  const connectionDistance = 2.5;
  const maxConnections = 40;

  const { positions, connections } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 12;
    }

    const conns: Array<{
      start: [number, number, number];
      end: [number, number, number];
    }> = [];
    if (!isMobile) {
      for (let i = 0; i < count && conns.length < maxConnections; i++) {
        for (let j = i + 1; j < count && conns.length < maxConnections; j++) {
          const dx = pos[i * 3] - pos[j * 3];
          const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
          const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
          if (dist < connectionDistance) {
            conns.push({
              start: [pos[i * 3], pos[i * 3 + 1], pos[i * 3 + 2]],
              end: [pos[j * 3], pos[j * 3 + 1], pos[j * 3 + 2]],
            });
          }
        }
      }
    }
    return { positions: pos, connections: conns };
  }, [count, isMobile]);

  useFrame(({ clock }) => {
    if (reducedMotion) return;
    const t = clock.getElapsedTime();

    if (particlesRef.current) {
      particlesRef.current.rotation.y = t * 0.02;
      particlesRef.current.rotation.x = Math.sin(t * 0.05) * 0.05;
      const mat = particlesRef.current.material as THREE.PointsMaterial;
      mat.size = 0.03 + Math.sin(t * 1.5) * 0.015;
      mat.opacity = 0.5 + Math.sin(t * 2) * 0.2;
    }
  });

  return (
    <group>
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={count}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.03}
          color="#8B5CF6"
          transparent
          opacity={0.6}
          sizeAttenuation
        />
      </points>

      {connections.map((seg, i) => (
        <Line
          key={i}
          points={[seg.start, seg.end]}
          color="#8B5CF6"
          lineWidth={0.5}
          transparent
          opacity={0.15}
        />
      ))}
    </group>
  );
}

function OrbitingSphere({
  color,
  index,
  total,
  reducedMotion,
}: {
  color: string;
  index: number;
  total: number;
  reducedMotion: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const angle = (index / total) * Math.PI * 2;
  const radius = 3.5;
  const baseSize = 0.15 + index * 0.03;

  useFrame(({ clock }) => {
    if (reducedMotion || !meshRef.current) return;
    const t = clock.getElapsedTime();
    meshRef.current.rotation.x = t * (1 + index * 0.5);
    meshRef.current.rotation.y = t * (0.8 + index * 0.3);
    const scale = 1 + Math.sin(t * 2 + index * 1.2) * 0.2;
    meshRef.current.scale.setScalar(scale);
  });

  return (
    <Float speed={reducedMotion ? 0 : 1.5 + index * 0.3} floatIntensity={0.5}>
      <mesh
        ref={meshRef}
        position={[
          Math.cos(angle) * radius,
          Math.sin(angle * 0.5 + index * 0.4) * 0.8,
          Math.sin(angle) * radius,
        ]}
      >
        <sphereGeometry args={[baseSize, 16, 16]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
          toneMapped={false}
        />
      </mesh>
    </Float>
  );
}

function OrbitingSpheres({ reducedMotion }: { reducedMotion: boolean }) {
  const groupRef = useRef<THREE.Group>(null!);
  const sphereColors = ['#EC4899', '#10B981', '#F59E0B', '#6366F1', '#14B8A6'];

  useFrame(({ clock }) => {
    if (reducedMotion || !groupRef.current) return;
    groupRef.current.rotation.y = clock.getElapsedTime() * 0.3;
  });

  return (
    <group ref={groupRef}>
      {sphereColors.map((color, i) => (
        <OrbitingSphere
          key={i}
          color={color}
          index={i}
          total={sphereColors.length}
          reducedMotion={reducedMotion}
        />
      ))}
    </group>
  );
}

function RotatingLight({ reducedMotion }: { reducedMotion: boolean }) {
  const lightRef = useRef<THREE.PointLight>(null!);

  useFrame(({ clock }) => {
    if (reducedMotion || !lightRef.current) return;
    const t = clock.getElapsedTime();
    lightRef.current.position.x = Math.sin(t * 0.4) * 5;
    lightRef.current.position.z = Math.cos(t * 0.4) * 5;
    lightRef.current.position.y = Math.sin(t * 0.2) * 2;
    const hue = 0.7 + Math.sin(t * 0.15) * 0.1;
    lightRef.current.color.setHSL(hue, 0.8, 0.6);
  });

  return <pointLight ref={lightRef} intensity={0.6} distance={15} decay={2} />;
}

export function FloatingGlobe() {
  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile();

  return (
    <div className="w-full h-[400px] md:h-[500px] -mt-8" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 50 }}
        dpr={isMobile ? [1, 1] : [1, 1.5]}
        gl={{ antialias: !isMobile, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <pointLight position={[-5, -5, -5]} intensity={0.3} color="#8B5CF6" />
        <RotatingLight reducedMotion={reducedMotion} />
        <GlobeMesh reducedMotion={reducedMotion} />
        <Particles reducedMotion={reducedMotion} isMobile={isMobile} />
        <OrbitingSpheres reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  );
}
