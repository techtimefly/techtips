import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import { useRef } from 'react';
import type { Group } from 'three';

/** A drifting cluster of low-poly shapes that reacts gently to the pointer. */
function FloatingShapes() {
  const group = useRef<Group>(null);

  useFrame((state) => {
    const g = group.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    g.rotation.y = Math.sin(t * 0.12) * 0.18 + state.pointer.x * 0.18;
    g.rotation.x = -state.pointer.y * 0.1;
  });

  // Shapes are biased to the right and the far corners, keeping the
  // left-hand text column clear and legible.
  return (
    <group ref={group}>
      <Float speed={1.5} rotationIntensity={0.9} floatIntensity={1.3}>
        <mesh position={[-3.4, 2.4, -2.4]}>
          <icosahedronGeometry args={[0.8, 0]} />
          <meshStandardMaterial color="#7c5cff" flatShading roughness={0.35} metalness={0.15} />
        </mesh>
      </Float>

      <Float speed={1.1} rotationIntensity={1.1} floatIntensity={1.6}>
        <mesh position={[3.3, 0.1, -1.2]} rotation={[0.4, 0.6, 0]}>
          <torusGeometry args={[0.72, 0.27, 12, 32]} />
          <meshStandardMaterial color="#2bd6c4" flatShading roughness={0.3} metalness={0.2} />
        </mesh>
      </Float>

      <Float speed={1.9} rotationIntensity={0.7} floatIntensity={1.0}>
        <mesh position={[2.6, 2.2, -2.6]}>
          <octahedronGeometry args={[0.58, 0]} />
          <meshStandardMaterial color="#38bdf8" flatShading roughness={0.4} metalness={0.1} />
        </mesh>
      </Float>

      <Float speed={1.3} rotationIntensity={1.0} floatIntensity={1.2}>
        <mesh position={[3.5, -2.4, -2.8]} rotation={[0.5, 0.2, 0.3]}>
          <dodecahedronGeometry args={[0.56, 0]} />
          <meshStandardMaterial color="#fbbf24" flatShading roughness={0.45} metalness={0.1} />
        </mesh>
      </Float>

      <Float speed={2.1} rotationIntensity={0.6} floatIntensity={0.9}>
        <mesh position={[1.6, -2.5, -3.2]}>
          <tetrahedronGeometry args={[0.5, 0]} />
          <meshStandardMaterial color="#fb7185" flatShading roughness={0.4} metalness={0.1} />
        </mesh>
      </Float>
    </group>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.55} />
      <directionalLight position={[4, 6, 5]} intensity={2.4} />
      <directionalLight position={[-6, -3, -2]} intensity={1.3} color="#7c5cff" />
      <FloatingShapes />
    </Canvas>
  );
}
