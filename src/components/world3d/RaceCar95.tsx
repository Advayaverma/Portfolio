import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type * as THREE from "three";

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

export function RaceCar95({ nightFactor, speed = 0 }: RaceCar95Props) {
  const wheelRefs = useRef<(THREE.Group | null)[]>([]);
  const bodyRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    const spin = speed * delta * 8;
    for (const w of wheelRefs.current) {
      if (w) w.rotation.x -= spin;
    }
    if (bodyRef.current) {
      bodyRef.current.position.y = Math.sin(performance.now() * 0.008) * 0.012;
    }
  });

  const headlightIntensity = 0.6 + nightFactor * 3.5;

  return (
    <group>
      <group ref={bodyRef}>
        {/* Main lower chassis */}
        <mesh position={[0, 0.52, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.76, 0.48, 3.8]} />
          <meshStandardMaterial color="#e11d2e" roughness={0.25} metalness={0.45} />
        </mesh>

        {/* Sculpted hood slope */}
        <mesh position={[0, 0.68, 0.98]} rotation={[0.12, 0, 0]} castShadow>
          <boxGeometry args={[1.64, 0.22, 1.5]} />
          <meshStandardMaterial color="#e11d2e" roughness={0.25} metalness={0.45} />
        </mesh>

        {/* Cabin / greenhouse */}
        <mesh position={[0, 0.98, -0.18]} castShadow>
          <boxGeometry args={[1.42, 0.48, 1.72]} />
          <meshStandardMaterial color="#c81525" roughness={0.25} metalness={0.4} />
        </mesh>

        {/* Windshield */}
        <mesh position={[0, 0.98, 0.69]} rotation={[-0.22, 0, 0]}>
          <boxGeometry args={[1.3, 0.36, 0.08]} />
          <meshStandardMaterial color="#1e293b" roughness={0.1} metalness={0.8} />
        </mesh>

        {/* Rear window */}
        <mesh position={[0, 0.98, -1.05]} rotation={[0.25, 0, 0]}>
          <boxGeometry args={[1.26, 0.32, 0.08]} />
          <meshStandardMaterial color="#18181b" roughness={0.15} metalness={0.75} />
        </mesh>

        {/* Side lightning bolt stripes */}
        <mesh position={[-0.89, 0.56, 0.15]} rotation={[0, 0, 0]}>
          <boxGeometry args={[0.03, 0.14, 2.3]} />
          <meshStandardMaterial
            color="#facc15"
            emissive="#f97316"
            emissiveIntensity={0.25}
          />
        </mesh>
        <mesh position={[0.89, 0.56, 0.15]}>
          <boxGeometry args={[0.03, 0.14, 2.3]} />
          <meshStandardMaterial
            color="#facc15"
            emissive="#f97316"
            emissiveIntensity={0.25}
          />
        </mesh>

        {/* Rear spoiler */}
        <mesh position={[-0.62, 0.92, -1.68]} castShadow>
          <boxGeometry args={[0.1, 0.34, 0.18]} />
          <meshStandardMaterial color="#b91c1c" roughness={0.3} />
        </mesh>
        <mesh position={[0.62, 0.92, -1.68]} castShadow>
          <boxGeometry args={[0.1, 0.34, 0.18]} />
          <meshStandardMaterial color="#b91c1c" roughness={0.3} />
        </mesh>
        <mesh position={[0, 1.1, -1.72]} castShadow>
          <boxGeometry args={[1.68, 0.08, 0.34]} />
          <meshStandardMaterial color="#e11d2e" roughness={0.25} metalness={0.45} />
        </mesh>

        {/* Headlights */}
        <mesh position={[-0.58, 0.54, 1.91]}>
          <boxGeometry args={[0.34, 0.14, 0.05]} />
          <meshStandardMaterial
            color="#fef08a"
            emissive="#fde047"
            emissiveIntensity={headlightIntensity}
          />
        </mesh>
        <mesh position={[0.58, 0.54, 1.91]}>
          <boxGeometry args={[0.34, 0.14, 0.05]} />
          <meshStandardMaterial
            color="#fef08a"
            emissive="#fde047"
            emissiveIntensity={headlightIntensity}
          />
        </mesh>
        {nightFactor > 0.25 && (
          <spotLight
            position={[0, 0.7, 1.95]}
            angle={0.45}
            penumbra={0.6}
            intensity={nightFactor * 18}
            distance={22}
            color="#fef3c7"
          />
        )}

        {/* Taillights */}
        <mesh position={[-0.58, 0.56, -1.91]}>
          <boxGeometry args={[0.38, 0.12, 0.05]} />
          <meshStandardMaterial
            color="#ef4444"
            emissive="#ef4444"
            emissiveIntensity={1.2 + nightFactor * 1.6}
          />
        </mesh>
        <mesh position={[0.58, 0.56, -1.91]}>
          <boxGeometry args={[0.38, 0.12, 0.05]} />
          <meshStandardMaterial
            color="#ef4444"
            emissive="#ef4444"
            emissiveIntensity={1.2 + nightFactor * 1.6}
          />
        </mesh>
      </group>

      {/* 4 Wheels */}
      {WHEEL_POSITIONS.map((pos, idx) => (
        <group
          key={idx}
          position={pos}
          ref={(el) => {
            wheelRefs.current[idx] = el;
          }}
        >
          <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.32, 0.32, 0.26, 16]} />
            <meshStandardMaterial color="#18181b" roughness={0.85} />
          </mesh>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.17, 0.17, 0.28, 12]} />
            <meshStandardMaterial color="#e4e4e7" roughness={0.25} metalness={0.85} />
          </mesh>
        </group>
      ))}
    </group>
  );
}
