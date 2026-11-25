import { useMemo } from "react";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { roadCurve } from "./roadPath";

interface RadiatorSpringsTownProps {
  nightFactor: number;
}

function getRoadsideTransform(t: number, side: -1 | 1, offset: number) {
  const pt = roadCurve.getPointAt(t);
  const tan = roadCurve.getTangentAt(t).normalize();
  const up = new THREE.Vector3(0, 1, 0);
  const right = new THREE.Vector3().crossVectors(tan, up).normalize();
  const pos = pt.clone().addScaledVector(right, side * offset);
  const rotY = Math.atan2(tan.x, tan.z);
  return { position: [pos.x, 0, pos.z] as [number, number, number], rotY };
}

export function RadiatorSpringsTown({ nightFactor }: RadiatorSpringsTownProps) {
  const entranceGate = useMemo(() => getRoadsideTransform(0.08, 1, 0), []);
  const cozyCone = useMemo(() => getRoadsideTransform(0.24, -1, 11.5), []);
  const flosCafe = useMemo(() => getRoadsideTransform(0.42, 1, 12.5), []);
  const luigisTires = useMemo(() => getRoadsideTransform(0.58, -1, 11), []);
  const ramonesArt = useMemo(() => getRoadsideTransform(0.74, 1, 11.5), []);

  const neonGlow = 0.45 + nightFactor * 2.2;

  return (
    <group>
      {/* 1. RADIATOR SPRINGS COURTHOUSE (End of Main Street) */}
      <group position={[0, 0, -76]}>
        <mesh position={[0, 3.2, 0]} castShadow receiveShadow>
          <boxGeometry args={[12, 6.4, 7]} />
          <meshStandardMaterial color="#7f1d1d" roughness={0.85} />
        </mesh>
        {/* Center pediment & clock */}
        <mesh position={[0, 7.2, 0]} castShadow>
          <cylinderGeometry args={[2.2, 2.6, 2.2, 8]} />
          <meshStandardMaterial color="#991b1b" roughness={0.8} />
        </mesh>
        <mesh position={[0, 5.4, 3.56]}>
          <circleGeometry args={[1.05, 16]} />
          <meshStandardMaterial
            color="#fef3c7"
            emissive="#fbbf24"
            emissiveIntensity={0.4 + nightFactor * 1.4}
          />
        </mesh>
        {/* White arched garage bays */}
        {[-3.4, 0, 3.4].map((x) => (
          <mesh key={x} position={[x, 1.5, 3.55]}>
            <boxGeometry args={[2.2, 2.8, 0.12]} />
            <meshStandardMaterial color="#e4e4e7" roughness={0.5} />
          </mesh>
        ))}
      </group>

      {/* 4. GREEN HIGHWAY ENTRANCE GANTRY ("Radiator Springs") */}
      <group position={entranceGate.position} rotation={[0, entranceGate.rotY, 0]}>
        <mesh position={[-4.2, 3.2, 0]}>
          <cylinderGeometry args={[0.14, 0.16, 6.4, 8]} />
          <meshStandardMaterial color="#71717a" metalness={0.7} roughness={0.35} />
        </mesh>
        <mesh position={[4.2, 3.2, 0]}>
          <cylinderGeometry args={[0.14, 0.16, 6.4, 8]} />
          <meshStandardMaterial color="#71717a" metalness={0.7} roughness={0.35} />
        </mesh>
        <mesh position={[0, 6.3, 0]}>
          <boxGeometry args={[8.8, 0.24, 0.24]} />
          <meshStandardMaterial color="#71717a" metalness={0.7} roughness={0.35} />
        </mesh>
        <mesh position={[0, 5.9, 0.18]}>
          <boxGeometry args={[4.6, 1.8, 0.14]} />
          <meshStandardMaterial color="#14532d" roughness={0.6} />
        </mesh>
        <Html position={[0, 5.9, 0.35]} center distanceFactor={16}>
          <div className="pointer-events-none whitespace-nowrap rounded border-2 border-white/80 bg-[#14532d] px-3 py-1 text-xs font-bold tracking-wide text-white shadow-lg">
            Radiator Springs ↘
          </div>
        </Html>
      </group>

      {/* 5. COZY CONE MOTEL (Orange traffic-cone cabins + yellow canopy + neon sign) */}
      <group position={cozyCone.position} rotation={[0, cozyCone.rotY, 0]}>
        {/* Office building + angled yellow roof */}
        <mesh position={[0, 1.6, 3.5]} castShadow receiveShadow>
          <boxGeometry args={[5.5, 3.2, 4.5]} />
          <meshStandardMaterial color="#27272a" roughness={0.6} />
        </mesh>
        <mesh position={[1.2, 3.3, 3.5]} rotation={[0, 0, -0.08]} castShadow>
          <boxGeometry args={[7.4, 0.28, 5.4]} />
          <meshStandardMaterial color="#eab308" roughness={0.4} />
        </mesh>
        {/* 3 Iconic Orange Traffic Cone Cabins */}
        {[-3.2, -0.2, 2.8].map((zOff, i) => (
          <group key={i} position={[-1.8, 0, zOff - 3.5]}>
            <mesh position={[0, 0.18, 0]}>
              <boxGeometry args={[3.1, 0.36, 3.1]} />
              <meshStandardMaterial color="#f97316" roughness={0.5} />
            </mesh>
            <mesh position={[0, 2.3, 0]} castShadow>
              <coneGeometry args={[1.55, 4.2, 16]} />
              <meshStandardMaterial
                color="#ea580c"
                emissive="#f97316"
                emissiveIntensity={0.08 + nightFactor * 0.25}
                roughness={0.45}
              />
            </mesh>
          </group>
        ))}
        {/* Cozy Cone Neon Sign */}
        <group position={[4.0, 0, 1.2]}>
          <mesh position={[0, 2.6, 0]}>
            <cylinderGeometry args={[0.12, 0.14, 5.2, 8]} />
            <meshStandardMaterial color="#52525b" metalness={0.6} />
          </mesh>
          <mesh position={[0, 4.5, 0]}>
            <boxGeometry args={[2.6, 1.4, 0.3]} />
            <meshStandardMaterial
              color="#f97316"
              emissive="#ef4444"
              emissiveIntensity={neonGlow}
            />
          </mesh>
          <Html position={[0, 4.5, 0.3]} center distanceFactor={18}>
            <div className="pointer-events-none whitespace-nowrap rounded border border-orange-300/70 bg-[#18181b]/90 px-2 py-0.5 text-[10px] font-extrabold tracking-wider text-orange-300 shadow-[0_0_12px_rgba(249,115,22,0.8)]">
              COZY CONE MOTEL
            </div>
          </Html>
        </group>
      </group>

      {/* 6. FLO'S V8 CAFÉ (Round diner + fuel canopies + pink/cyan V8 neon) */}
      <group position={flosCafe.position} rotation={[0, flosCafe.rotY, 0]}>
        {/* Main round diner */}
        <mesh position={[0, 1.9, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[4.4, 4.6, 3.8, 18]} />
          <meshStandardMaterial color="#0f766e" roughness={0.35} metalness={0.4} />
        </mesh>
        {/* Chrome roof rim */}
        <mesh position={[0, 3.9, 0]}>
          <cylinderGeometry args={[5.2, 5.2, 0.35, 18]} />
          <meshStandardMaterial
            color="#e4e4e7"
            emissive="#22d3ee"
            emissiveIntensity={nightFactor * 0.65}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
        {/* Two angled golden fuel canopies */}
        {[-5.4, 5.4].map((zOff, i) => (
          <group key={i} position={[-2.2, 0, zOff]}>
            <mesh position={[0, 1.7, 0]}>
              <boxGeometry args={[0.45, 3.4, 0.45]} />
              <meshStandardMaterial color="#3f3f46" metalness={0.6} />
            </mesh>
            <mesh position={[0, 3.3, 0]} rotation={[0, 0, 0.14]} castShadow>
              <boxGeometry args={[4.2, 0.24, 3.6]} />
              <meshStandardMaterial color="#eab308" roughness={0.35} metalness={0.3} />
            </mesh>
            {/* Spark-plug spire */}
            <mesh position={[0, 4.0, 0]}>
              <cylinderGeometry args={[0.14, 0.26, 1.1, 8]} />
              <meshStandardMaterial
                color="#fef08a"
                emissive="#facc15"
                emissiveIntensity={neonGlow * 0.7}
              />
            </mesh>
          </group>
        ))}
        {/* Giant V8 Neon Sign */}
        <group position={[-4.5, 5.8, 0]}>
          <mesh position={[-0.6, 0, 0]} rotation={[0, 0, 0.32]}>
            <boxGeometry args={[0.24, 2.8, 0.24]} />
            <meshStandardMaterial
              color="#f472b6"
              emissive="#ec4899"
              emissiveIntensity={neonGlow}
            />
          </mesh>
          <mesh position={[0.6, 0, 0]} rotation={[0, 0, -0.32]}>
            <boxGeometry args={[0.24, 2.8, 0.24]} />
            <meshStandardMaterial
              color="#f472b6"
              emissive="#ec4899"
              emissiveIntensity={neonGlow}
            />
          </mesh>
          <Html position={[0, -0.6, 0]} center distanceFactor={18}>
            <div className="pointer-events-none whitespace-nowrap rounded-full border border-cyan-300/70 bg-[#0f172a]/90 px-2.5 py-0.5 text-[10px] font-bold text-cyan-300 shadow-[0_0_14px_rgba(34,211,238,0.75)]">
              FLO&apos;S V8 CAFÉ
            </div>
          </Html>
        </group>
      </group>

      {/* 7. LUIGI'S CASA DELLA TIRES (Cream stucco + green awning + Leaning Tower of Tires) */}
      <group position={luigisTires.position} rotation={[0, luigisTires.rotY, 0]}>
        <mesh position={[0, 1.8, 0]} castShadow receiveShadow>
          <boxGeometry args={[5.5, 3.6, 8.2]} />
          <meshStandardMaterial color="#e7e5e4" roughness={0.85} />
        </mesh>
        {/* Terracotta roof */}
        <mesh position={[0, 3.75, 0]}>
          <boxGeometry args={[5.9, 0.4, 8.6]} />
          <meshStandardMaterial color="#9a3412" roughness={0.8} />
        </mesh>
        {/* Green awning */}
        <mesh position={[3.3, 2.3, 0]} rotation={[0, 0, -0.35]}>
          <boxGeometry args={[1.6, 0.14, 4.4]} />
          <meshStandardMaterial color="#16a34a" roughness={0.7} />
        </mesh>
        {/* Leaning Tower of Stacked Tires */}
        <group position={[3.6, 0, 3.6]} rotation={[0.04, 0, -0.05]}>
          {Array.from({ length: 9 }).map((_, idx) => (
            <mesh key={idx} position={[0, 0.35 + idx * 0.62, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
              <torusGeometry args={[0.68, 0.28, 10, 18]} />
              <meshStandardMaterial color="#18181b" roughness={0.9} />
            </mesh>
          ))}
        </group>
      </group>

      {/* 8. RAMONE'S HOUSE OF BODY ART (Art-deco teal/purple shop + tall neon obelisk) */}
      <group position={ramonesArt.position} rotation={[0, ramonesArt.rotY, 0]}>
        <mesh position={[0, 1.9, 0]} castShadow receiveShadow>
          <boxGeometry args={[5.2, 3.8, 7.6]} />
          <meshStandardMaterial color="#1e1b4b" roughness={0.4} metalness={0.4} />
        </mesh>
        {/* Neon cyan/emerald roofline strip */}
        <mesh position={[0, 3.9, 0]}>
          <boxGeometry args={[5.5, 0.25, 7.9]} />
          <meshStandardMaterial
            color="#34d399"
            emissive="#10b981"
            emissiveIntensity={neonGlow}
          />
        </mesh>
        {/* Tall Art-Deco Obelisk Tower */}
        <mesh position={[-2.2, 6.2, 0]} castShadow>
          <boxGeometry args={[1.1, 5.2, 1.1]} />
          <meshStandardMaterial
            color="#a855f7"
            emissive="#9333ea"
            emissiveIntensity={neonGlow * 0.85}
          />
        </mesh>
        <mesh position={[-2.2, 9.2, 0]}>
          <sphereGeometry args={[0.45, 12, 12]} />
          <meshStandardMaterial
            color="#34d399"
            emissive="#10b981"
            emissiveIntensity={neonGlow}
          />
        </mesh>
      </group>
    </group>
  );
}
