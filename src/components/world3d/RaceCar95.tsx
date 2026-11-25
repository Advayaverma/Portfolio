import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type * as THREE from "three";
import { GlbModel } from "./GlbModel";

interface RaceCar95Props {
  nightFactor: number;
  speed?: number;
}

const WHEEL_POSITIONS: [number, number, number][] = [
  [-0.92, 0.32, 1.15],
  [0.92, 0.32, 1.15],
  [-0.92, 0.32, -1.12],
  [0.92, 0.32, -1.12],
];

function FallbackMcQueen({
  nightFactor,
  speed = 0,
}: RaceCar95Props) {
  const wheelRefs = useRef<(THREE.Group | null)[]>([]);
  const headlightIntensity = 0.6 + nightFactor * 3.5;

  useFrame((_, delta) => {
    const spin = speed * delta * 8;
    for (const w of wheelRefs.current) {
      if (w) w.rotation.x -= spin;
    }
  });

  return (
    <group>
      <mesh position={[0, 0.52, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.8, 0.48, 3.85]} />
        <meshStandardMaterial color="#e11d2e" roughness={0.2} metalness={0.5} />
      </mesh>
      <mesh position={[0, 0.98, -0.18]} castShadow>
        <boxGeometry args={[1.44, 0.48, 1.72]} />
        <meshStandardMaterial color="#dc2626" roughness={0.22} metalness={0.45} />
      </mesh>
      <mesh position={[-0.62, 0.54, 1.93]}>
        <boxGeometry args={[0.32, 0.14, 0.05]} />
        <meshStandardMaterial
          color="#fef08a"
          emissive="#fde047"
          emissiveIntensity={headlightIntensity}
        />
      </mesh>
      <mesh position={[0.62, 0.54, 1.93]}>
        <boxGeometry args={[0.32, 0.14, 0.05]} />
        <meshStandardMaterial
          color="#fef08a"
          emissive="#fde047"
          emissiveIntensity={headlightIntensity}
        />
      </mesh>
      {WHEEL_POSITIONS.map((pos, idx) => (
        <group
          key={idx}
          position={pos}
          ref={(el) => {
            wheelRefs.current[idx] = el;
          }}
        >
          <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.33, 0.33, 0.27, 16]} />
            <meshStandardMaterial color="#18181b" roughness={0.85} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

export function RaceCar95({ nightFactor, speed = 0 }: RaceCar95Props) {
  const bodyRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (bodyRef.current) {
      bodyRef.current.position.y =
        speed > 0.2 ? Math.sin(performance.now() * 0.012) * 0.014 : 0;
    }
  });

  return (
    <group ref={bodyRef}>
      <GlbModel
        url="/models/mcqueen.glb"
        targetLength={3.9}
        fallback={<FallbackMcQueen nightFactor={nightFactor} speed={speed} />}
      />
      {nightFactor > 0.25 && (
        <spotLight
          position={[0, 0.75, 2.0]}
          angle={0.45}
          penumbra={0.6}
          intensity={nightFactor * 20}
          distance={24}
          color="#fef3c7"
        />
      )}
    </group>
  );
}
