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
        {/* Main glossy Lightning McQueen red chassis */}
        <mesh position={[0, 0.52, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.8, 0.48, 3.85]} />
          <meshStandardMaterial color="#e11d2e" roughness={0.2} metalness={0.5} />
        </mesh>

        {/* Sculpted hood + Rust-eze yellow-orange flame accent */}
        <mesh position={[0, 0.68, 0.98]} rotation={[0.12, 0, 0]} castShadow>
          <boxGeometry args={[1.68, 0.22, 1.52]} />
          <meshStandardMaterial color="#e11d2e" roughness={0.2} metalness={0.5} />
        </mesh>
        <mesh position={[0, 0.79, 1.12]} rotation={[0.12, 0, 0]}>
          <boxGeometry args={[0.92, 0.03, 0.72]} />
          <meshStandardMaterial
            color="#facc15"
            emissive="#f97316"
            emissiveIntensity={0.35}
          />
        </mesh>

        {/* Cabin / roof */}
        <mesh position={[0, 0.98, -0.18]} castShadow>
          <boxGeometry args={[1.44, 0.48, 1.72]} />
          <meshStandardMaterial color="#dc2626" roughness={0.22} metalness={0.45} />
        </mesh>
        {/* Roof #95 yellow-orange number plate */}
        <mesh position={[0, 1.23, -0.18]}>
          <boxGeometry args={[0.78, 0.02, 0.78]} />
          <meshStandardMaterial color="#facc15" emissive="#f97316" emissiveIntensity={0.25} />
        </mesh>

        {/* Expressive Windshield Eyes (McQueen signature) */}
        <mesh position={[0, 0.98, 0.69]} rotation={[-0.22, 0, 0]}>
          <boxGeometry args={[1.32, 0.36, 0.08]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.15} />
        </mesh>
        {/* Eyebrow lid */}
        <mesh position={[0, 1.13, 0.66]} rotation={[-0.22, 0, 0]}>
          <boxGeometry args={[1.34, 0.09, 0.1]} />
          <meshStandardMaterial color="#dc2626" roughness={0.25} />
        </mesh>
        {/* Left & Right blue irises + dark pupils */}
        <mesh position={[-0.3, 0.97, 0.735]} rotation={[-0.22, 0, 0]}>
          <boxGeometry args={[0.24, 0.16, 0.03]} />
          <meshStandardMaterial color="#2563eb" />
        </mesh>
        <mesh position={[-0.3, 0.97, 0.75]} rotation={[-0.22, 0, 0]}>
          <boxGeometry args={[0.11, 0.1, 0.02]} />
          <meshStandardMaterial color="#09090b" />
        </mesh>
        <mesh position={[0.3, 0.97, 0.735]} rotation={[-0.22, 0, 0]}>
          <boxGeometry args={[0.24, 0.16, 0.03]} />
          <meshStandardMaterial color="#2563eb" />
        </mesh>
        <mesh position={[0.3, 0.97, 0.75]} rotation={[-0.22, 0, 0]}>
          <boxGeometry args={[0.11, 0.1, 0.02]} />
          <meshStandardMaterial color="#09090b" />
        </mesh>

        {/* Rear window */}
        <mesh position={[0, 0.98, -1.05]} rotation={[0.25, 0, 0]}>
          <boxGeometry args={[1.26, 0.32, 0.08]} />
          <meshStandardMaterial color="#18181b" roughness={0.15} metalness={0.75} />
        </mesh>

        {/* Friendly grinning front bumper */}
        <mesh position={[0, 0.38, 1.94]}>
          <boxGeometry args={[0.92, 0.14, 0.05]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.2} />
        </mesh>

        {/* Side Lightning Bolt Stripes + #95 Door Plates */}
        <mesh position={[-0.91, 0.56, 0.12]}>
          <boxGeometry args={[0.03, 0.15, 2.45]} />
          <meshStandardMaterial
            color="#facc15"
            emissive="#f97316"
            emissiveIntensity={0.35}
          />
        </mesh>
        <mesh position={[0.91, 0.56, 0.12]}>
          <boxGeometry args={[0.03, 0.15, 2.45]} />
          <meshStandardMaterial
            color="#facc15"
            emissive="#f97316"
            emissiveIntensity={0.35}
          />
        </mesh>
        {/* Orange flame tip behind front wheel */}
        <mesh position={[-0.92, 0.58, 0.88]}>
          <boxGeometry args={[0.04, 0.22, 0.52]} />
          <meshStandardMaterial color="#f97316" emissive="#ea580c" emissiveIntensity={0.3} />
        </mesh>
        <mesh position={[0.92, 0.58, 0.88]}>
          <boxGeometry args={[0.04, 0.22, 0.52]} />
          <meshStandardMaterial color="#f97316" emissive="#ea580c" emissiveIntensity={0.3} />
        </mesh>

        {/* Rear spoiler */}
        <mesh position={[-0.64, 0.92, -1.72]} castShadow>
          <boxGeometry args={[0.1, 0.34, 0.18]} />
          <meshStandardMaterial color="#b91c1c" roughness={0.3} />
        </mesh>
        <mesh position={[0.64, 0.92, -1.72]} castShadow>
          <boxGeometry args={[0.1, 0.34, 0.18]} />
          <meshStandardMaterial color="#b91c1c" roughness={0.3} />
        </mesh>
        <mesh position={[0, 1.1, -1.75]} castShadow>
          <boxGeometry args={[1.72, 0.08, 0.36]} />
          <meshStandardMaterial color="#e11d2e" roughness={0.22} metalness={0.45} />
        </mesh>

        {/* Headlight stickers */}
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
        {nightFactor > 0.25 && (
          <spotLight
            position={[0, 0.7, 1.98]}
            angle={0.45}
            penumbra={0.6}
            intensity={nightFactor * 18}
            distance={22}
            color="#fef3c7"
          />
        )}

        {/* Taillights */}
        <mesh position={[-0.58, 0.56, -1.93]}>
          <boxGeometry args={[0.38, 0.12, 0.05]} />
          <meshStandardMaterial
            color="#ef4444"
            emissive="#ef4444"
            emissiveIntensity={1.2 + nightFactor * 1.6}
          />
        </mesh>
        <mesh position={[0.58, 0.56, -1.93]}>
          <boxGeometry args={[0.38, 0.12, 0.05]} />
          <meshStandardMaterial
            color="#ef4444"
            emissive="#ef4444"
            emissiveIntensity={1.2 + nightFactor * 1.6}
          />
        </mesh>
      </group>

      {/* 4 Lightyear Racing Wheels with Red Rims */}
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
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.18, 0.18, 0.29, 12]} />
            <meshStandardMaterial color="#e11d2e" roughness={0.25} metalness={0.7} />
          </mesh>
        </group>
      ))}
    </group>
  );
}
