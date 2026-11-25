import { useMemo } from "react";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { GlbModel } from "./GlbModel";
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
  const entranceGate = useMemo(() => getRoadsideTransform(0.06, 1, 0), []);
  // Left side (South): Curios (start) -> Mater's Salvage -> Cozy Cone -> Luigi's
  const curiosSpot = useMemo(() => getRoadsideTransform(0.12, -1, 12.0), []);
  const matersJunkyard = useMemo(() => getRoadsideTransform(0.22, -1, 13.0), []);
  const cozyCone = useMemo(() => getRoadsideTransform(0.42, -1, 12.5), []);
  const luigisTires = useMemo(() => getRoadsideTransform(0.64, -1, 12.0), []);

  // Right side (North): Fillmore's -> Flo's V8 -> Ramone's
  const fillmoresSpot = useMemo(() => getRoadsideTransform(0.34, 1, 13.5), []);
  const flosCafe = useMemo(() => getRoadsideTransform(0.68, 1, 13.0), []);
  const ramonesArt = useMemo(() => getRoadsideTransform(0.82, 1, 12.5), []);

  const neonGlow = 0.45 + nightFactor * 2.0;

  return (
    <group>
      {/* 1. GREEN HIGHWAY ENTRANCE GANTRY ("Radiator Springs") */}
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
        <Html position={[0, 5.9, 0.35]} center distanceFactor={16} zIndexRange={[10, 0]}>
          <div className="pointer-events-none whitespace-nowrap rounded border-2 border-white/80 bg-[#14532d] px-3 py-1 text-xs font-bold tracking-wide text-white shadow-lg">
            Radiator Springs ↘
          </div>
        </Html>
      </group>

      {/* 2. RADIATOR SPRINGS CURIOS (curios.glb) */}
      <group position={curiosSpot.position} rotation={[0, curiosSpot.rotY + Math.PI, 0]}>
        <GlbModel url="/models/curios.glb" targetLength={10} />
      </group>

      {/* 3. MATER'S TOWING & SALVAGE (Built from mater_junkyard.jpg — Left side) */}
      <group position={matersJunkyard.position} rotation={[0, matersJunkyard.rotY - Math.PI / 2, 0]}>
        {/* Wooden plank fence wings */}
        <mesh position={[-5.2, 1.1, 3.5]} castShadow>
          <boxGeometry args={[4.2, 2.2, 0.25]} />
          <meshStandardMaterial color="#78553a" roughness={0.95} />
        </mesh>
        <mesh position={[5.2, 1.1, 3.5]} castShadow>
          <boxGeometry args={[4.2, 2.2, 0.25]} />
          <meshStandardMaterial color="#78553a" roughness={0.95} />
        </mesh>

        {/* Gate posts + Tow-Truck Shaped Signboard */}
        <mesh position={[-2.6, 2.2, 3.5]}>
          <cylinderGeometry args={[0.16, 0.2, 4.4, 8]} />
          <meshStandardMaterial color="#5c4028" roughness={0.9} />
        </mesh>
        <mesh position={[2.6, 2.2, 3.5]}>
          <cylinderGeometry args={[0.16, 0.2, 4.4, 8]} />
          <meshStandardMaterial color="#5c4028" roughness={0.9} />
        </mesh>
        <mesh position={[0, 4.4, 3.5]} castShadow>
          <boxGeometry args={[5.8, 1.8, 0.25]} />
          <meshStandardMaterial color="#6b4c35" roughness={0.9} />
        </mesh>
        {/* Truck cab silhouette on top of sign */}
        <mesh position={[0.4, 5.65, 3.5]}>
          <boxGeometry args={[2.2, 1.1, 0.25]} />
          <meshStandardMaterial color="#6b4c35" roughness={0.9} />
        </mesh>
        {/* Two sign tires */}
        <mesh position={[-1.7, 3.4, 3.65]}>
          <torusGeometry args={[0.52, 0.2, 8, 16]} />
          <meshStandardMaterial color="#18181b" roughness={0.9} />
        </mesh>
        <mesh position={[1.7, 3.4, 3.65]}>
          <torusGeometry args={[0.52, 0.2, 8, 16]} />
          <meshStandardMaterial color="#18181b" roughness={0.9} />
        </mesh>
        <Html position={[0, 4.6, 3.8]} center distanceFactor={18} zIndexRange={[10, 0]}>
          <div className="pointer-events-none whitespace-nowrap rounded border border-amber-700/80 bg-[#3f2a1d]/90 px-2.5 py-0.5 text-center text-[10px] font-extrabold tracking-wider text-amber-100 shadow">
            TOW MATER · SALVAGE
          </div>
        </Html>

        {/* Rusty Oil Barrels flanking entrance */}
        {[
          [-3.4, 0.55, 2.8, "#b45309"],
          [-3.9, 0.55, 2.1, "#9a3412"],
          [-3.4, 1.45, 2.5, "#78350f"],
          [3.4, 0.55, 2.8, "#9a3412"],
          [3.9, 0.55, 2.1, "#3f3f46"],
          [3.4, 1.45, 2.5, "#b45309"],
        ].map(([bx, by, bz, col], idx) => (
          <mesh key={idx} position={[bx as number, by as number, bz as number]} castShadow>
            <cylinderGeometry args={[0.38, 0.38, 1.05, 10]} />
            <meshStandardMaterial color={col as string} roughness={0.85} />
          </mesh>
        ))}

        {/* Mater's Rusty Shack in back */}
        <mesh position={[0, 1.6, -2.5]} castShadow receiveShadow>
          <boxGeometry args={[5.4, 3.2, 4.6]} />
          <meshStandardMaterial color="#5c4028" roughness={0.95} />
        </mesh>
        <mesh position={[0, 3.7, -2.5]} rotation={[0, Math.PI / 4, 0]} castShadow>
          <coneGeometry args={[4.2, 1.6, 4]} />
          <meshStandardMaterial color="#452c1a" roughness={0.95} />
        </mesh>
      </group>

      {/* 4. COZY CONE MOTEL (cozy_cone.glb signboard + Cone Cabins & Office from Cozy_Cone_Motel.jpg) */}
      <group position={cozyCone.position} rotation={[0, cozyCone.rotY - Math.PI / 2, 0]}>
        {/* Signboard GLB placed at roadside front */}
        <group position={[-4.5, 0, 4.2]}>
          <GlbModel url="/models/cozy_cone.glb" targetLength={3.4} />
        </group>

        {/* Tilted Tan/Orange Office + Angled Glass Front */}
        <mesh position={[3.8, 1.45, 2.0]} castShadow receiveShadow>
          <boxGeometry args={[5.2, 2.9, 4.2]} />
          <meshStandardMaterial color="#3f3f46" roughness={0.45} metalness={0.35} />
        </mesh>
        <mesh position={[4.2, 3.1, 2.2]} rotation={[0, 0, -0.09]} castShadow>
          <boxGeometry args={[7.4, 0.28, 5.4]} />
          <meshStandardMaterial color="#d97706" roughness={0.4} />
        </mesh>

        {/* 4 Iconic Orange Traffic-Cone Cabins (truncated cones + white doors + awnings) */}
        {[
          [-3.6, -2.6],
          [-0.2, -3.6],
          [3.2, -3.6],
          [6.6, -2.6],
        ].map(([cx, cz], i) => (
          <group key={i} position={[cx, 0, cz]}>
            <mesh position={[0, 0.18, 0]}>
              <boxGeometry args={[3.4, 0.36, 3.4]} />
              <meshStandardMaterial color="#ea580c" roughness={0.5} />
            </mesh>
            <mesh position={[0, 2.5, 0]} castShadow>
              <cylinderGeometry args={[0.45, 1.75, 4.6, 18]} />
              <meshStandardMaterial
                color="#f97316"
                emissive="#ea580c"
                emissiveIntensity={0.08 + nightFactor * 0.22}
                roughness={0.45}
              />
            </mesh>
            {/* White garage door */}
            <mesh position={[0, 1.0, 1.42]}>
              <boxGeometry args={[1.45, 1.7, 0.14]} />
              <meshStandardMaterial color="#e4e4e7" roughness={0.4} />
            </mesh>
            {/* Striped awning */}
            <mesh position={[0, 1.95, 1.58]} rotation={[0.3, 0, 0]}>
              <boxGeometry args={[1.65, 0.1, 0.6]} />
              <meshStandardMaterial color="#fef2f2" roughness={0.5} />
            </mesh>
          </group>
        ))}
      </group>

      {/* 5. FILLMORE'S TASTE-IN (Geodesic Psychedelic Dome + Windmill from fillmores.jpg) */}
      <group position={fillmoresSpot.position} rotation={[0, fillmoresSpot.rotY + Math.PI / 2, 0]}>
        {/* Geodesic Dome (colorful panels + steel frame) */}
        <mesh position={[0, 0.2, 0]} castShadow receiveShadow>
          <sphereGeometry args={[4.4, 8, 5, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial
            color="#6d28d9"
            emissive="#db2777"
            emissiveIntensity={0.12 + nightFactor * 0.28}
            roughness={0.4}
            flatShading
          />
        </mesh>
        <mesh position={[0, 0.22, 0]}>
          <sphereGeometry args={[4.45, 8, 5, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#18181b" wireframe />
        </mesh>
        {/* Pitched Wooden Entrance Tunnel */}
        <mesh position={[0, 1.15, 4.1]} castShadow>
          <boxGeometry args={[2.5, 2.3, 1.8]} />
          <meshStandardMaterial color="#b45309" roughness={0.85} />
        </mesh>
        {/* Peace Emblem */}
        <mesh position={[0, 2.6, 3.65]}>
          <torusGeometry args={[0.72, 0.1, 8, 18]} />
          <meshStandardMaterial
            color="#38bdf8"
            emissive="#0ea5e9"
            emissiveIntensity={neonGlow * 0.5}
          />
        </mesh>
        {/* Tall Desert Windmill */}
        <group position={[5.2, 0, 1.2]}>
          <mesh position={[0, 3.2, 0]}>
            <cylinderGeometry args={[0.25, 1.0, 6.4, 4]} />
            <meshStandardMaterial color="#3f3f46" wireframe />
          </mesh>
          <mesh position={[0, 6.3, 0.45]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[1.45, 1.45, 0.14, 12]} />
            <meshStandardMaterial color="#94a3b8" metalness={0.6} roughness={0.4} />
          </mesh>
        </group>
      </group>

      {/* 6. FLO'S V8 CAFÉ (flos_cafe.glb) */}
      <group position={flosCafe.position} rotation={[0, flosCafe.rotY - Math.PI / 2, 0]}>
        <GlbModel url="/models/flos_cafe.glb" targetLength={14} />
      </group>

      {/* 7. LUIGI'S CASA DELLA TIRES (luigis.glb) */}
      <group position={luigisTires.position} rotation={[0, luigisTires.rotY - Math.PI / 2, 0]}>
        <GlbModel url="/models/luigis.glb" targetLength={11.5} />
      </group>

      {/* 8. RAMONE'S HOUSE OF BODY ART (ramones.glb) */}
      <group position={ramonesArt.position} rotation={[0, ramonesArt.rotY + Math.PI / 2, 0]}>
        <GlbModel url="/models/ramones.glb" targetLength={12} />
      </group>

      {/* 9. RADIATOR SPRINGS COURTHOUSE & FIRE STATION (Built from courthouse.jpg) */}
      <group position={[0, 0, -78]}>
        {/* Main red-brick two-wing facade */}
        <mesh position={[0, 3.4, 0]} castShadow receiveShadow>
          <boxGeometry args={[13.6, 6.8, 7.2]} />
          <meshStandardMaterial color="#881337" roughness={0.85} />
        </mesh>
        {/* Cream stone top cornices */}
        <mesh position={[-4.5, 6.9, 0]}>
          <boxGeometry args={[4.8, 0.4, 7.6]} />
          <meshStandardMaterial color="#d6d3d1" roughness={0.7} />
        </mesh>
        <mesh position={[4.5, 6.9, 0]}>
          <boxGeometry args={[4.8, 0.4, 7.6]} />
          <meshStandardMaterial color="#d6d3d1" roughness={0.7} />
        </mesh>
        {/* Center arched pediment */}
        <mesh position={[0, 7.2, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[2.5, 2.5, 7.4, 18, 1, false, -Math.PI / 2, Math.PI]} />
          <meshStandardMaterial color="#9f1239" roughness={0.8} />
        </mesh>
        {/* Large Circular Art-Deco Window */}
        <mesh position={[0, 5.5, 3.65]}>
          <torusGeometry args={[1.25, 0.16, 10, 24]} />
          <meshStandardMaterial color="#e7e5e4" roughness={0.6} />
        </mesh>
        <mesh position={[0, 5.5, 3.62]}>
          <circleGeometry args={[1.18, 20]} />
          <meshStandardMaterial
            color="#fef3c7"
            emissive="#fbbf24"
            emissiveIntensity={0.3 + nightFactor * 1.4}
          />
        </mesh>
        {/* Red vertical stripe inside circle window */}
        <mesh position={[0, 5.5, 3.66]}>
          <boxGeometry args={[0.14, 1.9, 0.04]} />
          <meshStandardMaterial color="#b91c1c" />
        </mesh>
        {/* Stone pediment shelf above center bay */}
        <mesh position={[0, 3.3, 3.9]}>
          <boxGeometry args={[4.8, 0.55, 0.7]} />
          <meshStandardMaterial color="#d6d3d1" roughness={0.7} />
        </mesh>
        {/* 3 White Arched Garage Doors */}
        {[-4.2, 0, 4.2].map((x) => (
          <mesh key={x} position={[x, 1.5, 3.64]}>
            <boxGeometry args={[2.8, 2.9, 0.14]} />
            <meshStandardMaterial color="#f5f5f4" roughness={0.45} />
          </mesh>
        ))}
        {/* Upper Arched Windows (2 left, 2 right) */}
        {[-5.2, -3.6, 3.6, 5.2].map((x) => (
          <mesh key={x} position={[x, 4.9, 3.64]}>
            <boxGeometry args={[0.95, 1.5, 0.12]} />
            <meshStandardMaterial
              color="#fef3c7"
              emissive="#fbbf24"
              emissiveIntensity={0.25 + nightFactor * 1.3}
            />
          </mesh>
        ))}
        {/* Stanley's Statue Pedestal + Tire Flower Planters */}
        <group position={[-3.0, 0, 5.6]}>
          <mesh position={[0, 0.65, 0]} castShadow>
            <boxGeometry args={[1.3, 1.3, 1.3]} />
            <meshStandardMaterial color="#a8a29e" roughness={0.85} />
          </mesh>
          <mesh position={[0, 1.65, 0]} castShadow>
            <boxGeometry args={[0.9, 0.75, 1.4]} />
            <meshStandardMaterial color="#44403c" metalness={0.5} roughness={0.6} />
          </mesh>
        </group>
        {[-5.2, -1.2, 2.2, 4.8].map((x) => (
          <group key={x} position={[x, 0, 5.3]}>
            <mesh position={[0, 0.22, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[0.38, 0.16, 8, 14]} />
              <meshStandardMaterial color="#18181b" roughness={0.9} />
            </mesh>
            <mesh position={[0, 0.45, 0]}>
              <sphereGeometry args={[0.32, 8, 8]} />
              <meshStandardMaterial color="#ef4444" roughness={0.8} />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
}
