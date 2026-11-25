import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Html, Sky } from "@react-three/drei";
import * as THREE from "three";
import { GlbModel } from "./GlbModel";
import { RaceCar95 } from "./RaceCar95";
import { RadiatorSpringsTown } from "./RadiatorSpringsTown";
import { roadCurve, STOP_PROGRESS } from "./roadPath";
import { PIT_CREW_NPCS, type PitCrewNPC } from "./PitCrewDialogue";

export interface DriveInput {
  forward: boolean;
  backward: boolean;
  left: boolean;
  right: boolean;
  boost: boolean;
}

interface RadiatorSpringsSceneProps {
  targetProgress: number;
  exploreMode: boolean;
  driveInputRef: React.MutableRefObject<DriveInput>;
  onNearbyNpcChange: (npc: PitCrewNPC | null) => void;
  onSelectNpc: (npc: PitCrewNPC) => void;
}

const MORNING_SKY = new THREE.Color("#8ecae6");
const MORNING_GROUND = new THREE.Color("#c27849");

const CACTUS_POSITIONS: [number, number, number][] = [
  [-11, 0, 38],
  [9, 0, 30],
  [-14, 0, 16],
  [12, 0, -4],
  [-12, 0, -28],
  [14, 0, -48],
  [-10, 0, -60],
];

const SHRUB_AND_ROCK_PROPS: { pos: [number, number, number]; type: "bush" | "rock"; scale: number }[] = [
  { pos: [-16, 0, 42], type: "bush", scale: 1.1 },
  { pos: [14, 0, 40], type: "rock", scale: 1.4 },
  { pos: [-19, 0, 22], type: "rock", scale: 1.8 },
  { pos: [17, 0, 20], type: "bush", scale: 1.2 },
  { pos: [-18, 0, 2], type: "bush", scale: 1.0 },
  { pos: [20, 0, -14], type: "rock", scale: 2.1 },
  { pos: [-17, 0, -36], type: "bush", scale: 1.3 },
  { pos: [18, 0, -56], type: "rock", scale: 1.7 },
  { pos: [-22, 0, -70], type: "bush", scale: 1.4 },
  { pos: [22, 0, -72], type: "rock", scale: 2.0 },
];

const CLOUD_PUFFS: { pos: [number, number, number]; scale: number }[] = [
  { pos: [-45, 36, -110], scale: 1.2 },
  { pos: [15, 42, -130], scale: 1.5 },
  { pos: [55, 34, -105], scale: 1.1 },
  { pos: [-25, 38, -75], scale: 0.9 },
];

const DISTANT_HORIZON_FINS = [
  { x: -85, z: -155, h: 42, w: 18, rotZ: -0.42 },
  { x: -45, z: -165, h: 54, w: 20, rotZ: -0.4 },
  { x: 0, z: -172, h: 60, w: 22, rotZ: -0.43 },
  { x: 46, z: -162, h: 48, w: 19, rotZ: -0.39 },
  { x: 88, z: -152, h: 38, w: 17, rotZ: -0.44 },
];

function buildRoadGeometry(curve: THREE.CatmullRomCurve3, width: number, segments = 120) {
  const positions: number[] = [];
  const indices: number[] = [];
  const up = new THREE.Vector3(0, 1, 0);

  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const pt = curve.getPointAt(t);
    const tangent = curve.getTangentAt(t).normalize();
    const right = new THREE.Vector3().crossVectors(tangent, up).normalize();

    const leftPt = pt.clone().addScaledVector(right, -width / 2);
    const rightPt = pt.clone().addScaledVector(right, width / 2);

    positions.push(leftPt.x, 0.02, leftPt.z);
    positions.push(rightPt.x, 0.02, rightPt.z);

    if (i < segments) {
      const a = i * 2;
      const b = a + 1;
      const c = a + 2;
      const d = a + 3;
      indices.push(a, b, c, b, d, c);
    }
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geo.setIndex(indices);
  geo.computeVertexNormals();
  return geo;
}

function buildRoadEdgeRibbon(
  curve: THREE.CatmullRomCurve3,
  offsetFromCenter: number,
  stripWidth: number,
  yHeight: number,
  segments = 140
) {
  const positions: number[] = [];
  const indices: number[] = [];
  const up = new THREE.Vector3(0, 1, 0);

  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const pt = curve.getPointAt(t);
    const tangent = curve.getTangentAt(t).normalize();
    const right = new THREE.Vector3().crossVectors(tangent, up).normalize();

    const inner = pt.clone().addScaledVector(right, offsetFromCenter - stripWidth / 2);
    const outer = pt.clone().addScaledVector(right, offsetFromCenter + stripWidth / 2);

    positions.push(inner.x, yHeight, inner.z);
    positions.push(outer.x, yHeight, outer.z);

    if (i < segments) {
      const a = i * 2;
      const b = a + 1;
      const c = a + 2;
      const d = a + 3;
      indices.push(a, b, c, b, d, c);
    }
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geo.setIndex(indices);
  geo.computeVertexNormals();
  return geo;
}

export function RadiatorSpringsScene({
  targetProgress,
  exploreMode,
  driveInputRef,
  onNearbyNpcChange,
  onSelectNpc,
}: RadiatorSpringsSceneProps) {
  const { scene, camera } = useThree();
  const smoothProgress = useRef(0.04);
  const carGroupRef = useRef<THREE.Group>(null);
  const ambientRef = useRef<THREE.AmbientLight>(null);
  const sunRef = useRef<THREE.DirectionalLight>(null);
  const groundMatRef = useRef<THREE.MeshStandardMaterial>(null);

  const freePos = useRef(new THREE.Vector3(0, 0, 40));
  const freeRotY = useRef(Math.PI);
  const freeSpeed = useRef(0);
  const lastNearbyId = useRef<string | null>(null);

  const [carSpeed, setCarSpeed] = useState(0);
  const nightFactor = 0;

  // Sync free-drive starting position when entering exploreMode
  useEffect(() => {
    if (exploreMode && carGroupRef.current) {
      freePos.current.copy(carGroupRef.current.position);
      freeRotY.current = carGroupRef.current.rotation.y;
      freeSpeed.current = 0;
    } else {
      if (lastNearbyId.current !== null) {
        lastNearbyId.current = null;
        onNearbyNpcChange(null);
      }
    }
  }, [exploreMode, onNearbyNpcChange]);

  const roadGeometry = useMemo(() => buildRoadGeometry(roadCurve, 6.2, 140), []);
  const leftCurbGeo = useMemo(
    () => buildRoadEdgeRibbon(roadCurve, -3.35, 0.55, 0.035, 140),
    []
  );
  const rightCurbGeo = useMemo(
    () => buildRoadEdgeRibbon(roadCurve, 3.35, 0.55, 0.035, 140),
    []
  );
  const leftLineGeo = useMemo(
    () => buildRoadEdgeRibbon(roadCurve, -2.85, 0.14, 0.03, 140),
    []
  );
  const rightLineGeo = useMemo(
    () => buildRoadEdgeRibbon(roadCurve, 2.85, 0.14, 0.03, 140),
    []
  );

  const stopGates = useMemo(() => {
    return STOP_PROGRESS.map((t) => {
      const pt = roadCurve.getPointAt(t);
      const tan = roadCurve.getTangentAt(t).normalize();
      return {
        pos: [pt.x, 0, pt.z] as [number, number, number],
        rotY: Math.atan2(tan.x, tan.z),
      };
    });
  }, []);

  const dashes = useMemo(() => {
    const items: { pos: [number, number, number]; rotY: number }[] = [];
    const count = 42;
    for (let i = 0; i < count; i++) {
      const t = i / count;
      const pt = roadCurve.getPointAt(t);
      const tan = roadCurve.getTangentAt(t);
      items.push({
        pos: [pt.x, 0.035, pt.z],
        rotY: Math.atan2(tan.x, tan.z),
      });
    }
    return items;
  }, []);

  const lamps = useMemo(() => {
    const items: { pos: [number, number, number]; rotY: number }[] = [];
    const up = new THREE.Vector3(0, 1, 0);
    for (let i = 1; i <= 10; i++) {
      const t = i / 11;
      const pt = roadCurve.getPointAt(t);
      const tan = roadCurve.getTangentAt(t).normalize();
      const right = new THREE.Vector3().crossVectors(tan, up).normalize();
      const side = i % 2 === 0 ? 1 : -1;
      const lampPos = pt.clone().addScaledVector(right, side * 4.2);
      items.push({
        pos: [lampPos.x, 0, lampPos.z],
        rotY: Math.atan2(tan.x, tan.z) + (side === 1 ? Math.PI : 0),
      });
    }
    return items;
  }, []);

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05);

    if (exploreMode) {
      const inp = driveInputRef.current;
      const maxSpeed = inp.boost ? 24 : 14;
      const accel = inp.boost ? 28 : 18;

      if (inp.forward) {
        freeSpeed.current = Math.min(maxSpeed, freeSpeed.current + accel * dt);
      } else if (inp.backward) {
        freeSpeed.current = Math.max(-8, freeSpeed.current - accel * dt);
      } else {
        freeSpeed.current = THREE.MathUtils.lerp(freeSpeed.current, 0, dt * 4);
      }

      if (Math.abs(freeSpeed.current) > 0.25) {
        const steerDir = freeSpeed.current >= 0 ? 1 : -1;
        if (inp.left) freeRotY.current += 2.1 * dt * steerDir;
        if (inp.right) freeRotY.current -= 2.1 * dt * steerDir;
      }

      const forwardVec = new THREE.Vector3(
        Math.sin(freeRotY.current),
        0,
        Math.cos(freeRotY.current)
      );
      freePos.current.addScaledVector(forwardVec, freeSpeed.current * dt);
      freePos.current.x = THREE.MathUtils.clamp(freePos.current.x, -85, 85);
      freePos.current.z = THREE.MathUtils.clamp(freePos.current.z, -85, 85);

      if (carGroupRef.current) {
        carGroupRef.current.position.copy(freePos.current);
        carGroupRef.current.rotation.y = freeRotY.current;
      }

      setCarSpeed(Math.abs(freeSpeed.current) * 0.4);

      const desiredCamPos = freePos.current
        .clone()
        .addScaledVector(forwardVec, -10)
        .add(new THREE.Vector3(0, 4.8, 0));
      camera.position.lerp(desiredCamPos, Math.min(1, dt * 6));
      const lookTarget = freePos.current
        .clone()
        .addScaledVector(forwardVec, 5)
        .add(new THREE.Vector3(0, 1.2, 0));
      camera.lookAt(lookTarget);

      // Check proximity to Pit-Crew NPCs
      let closestNpc: PitCrewNPC | null = null;
      let closestDist = 7.5;
      for (const npc of PIT_CREW_NPCS) {
        const dist = freePos.current.distanceTo(
          new THREE.Vector3(npc.position[0], 0, npc.position[2])
        );
        if (dist < closestDist) {
          closestDist = dist;
          closestNpc = npc;
        }
      }
      const nextId = closestNpc?.id ?? null;
      if (nextId !== lastNearbyId.current) {
        lastNearbyId.current = nextId;
        onNearbyNpcChange(closestNpc);
      }
      return;
    }

    const prev = smoothProgress.current;
    smoothProgress.current = THREE.MathUtils.lerp(
      smoothProgress.current,
      targetProgress,
      Math.min(1, dt * 4.5)
    );
    const t = THREE.MathUtils.clamp(smoothProgress.current, 0.01, 0.99);
    const velocity = Math.abs(smoothProgress.current - prev) / Math.max(dt, 0.001);
    setCarSpeed(velocity * 12);

    scene.background = MORNING_SKY;

    // Position #95 car on spline
    const carPt = roadCurve.getPointAt(t);
    const carTan = roadCurve.getTangentAt(t).normalize();
    if (carGroupRef.current) {
      carGroupRef.current.position.copy(carPt);
      carGroupRef.current.rotation.y = Math.atan2(carTan.x, carTan.z);
    }

    // Smooth trailing camera
    const up = new THREE.Vector3(0, 1, 0);
    const right = new THREE.Vector3().crossVectors(carTan, up).normalize();
    const desiredCamPos = carPt
      .clone()
      .addScaledVector(carTan, -9.5)
      .addScaledVector(right, 2.4)
      .add(new THREE.Vector3(0, 4.2, 0));
    camera.position.lerp(desiredCamPos, Math.min(1, dt * 5));

    const lookTarget = carPt.clone().addScaledVector(carTan, 6).add(new THREE.Vector3(0, 1.1, 0));
    camera.lookAt(lookTarget);
  });

  return (
    <>
      <Sky
        distance={450}
        sunPosition={[45, 24, -110]}
        turbidity={5}
        rayleigh={1.1}
        mieCoefficient={0.005}
        mieDirectionalG={0.82}
      />
      <fog attach="fog" args={["#e8d5c4", 95, 260]} />
      <ambientLight ref={ambientRef} intensity={1.15} color="#fff7ed" />
      <hemisphereLight args={["#e0f2fe", "#c27849", 0.85]} />
      <directionalLight
        ref={sunRef}
        position={[24, 36, 18]}
        intensity={1.8}
        color="#fffbeb"
      />

      {/* Fluffy Morning Clouds */}
      {CLOUD_PUFFS.map((c, idx) => (
        <group key={idx} position={c.pos} scale={c.scale}>
          <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[4.5, 10, 10]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.88} />
          </mesh>
          <mesh position={[-4, -0.8, 0]}>
            <sphereGeometry args={[3.4, 10, 10]} />
            <meshBasicMaterial color="#f8fafc" transparent opacity={0.85} />
          </mesh>
          <mesh position={[4.2, -0.6, 0]}>
            <sphereGeometry args={[3.6, 10, 10]} />
            <meshBasicMaterial color="#f8fafc" transparent opacity={0.85} />
          </mesh>
        </group>
      ))}

      {/* Distant Hazy Cadillac Range Horizon */}
      {DISTANT_HORIZON_FINS.map((fin, idx) => (
        <mesh
          key={idx}
          position={[fin.x, fin.h * 0.38, fin.z]}
          rotation={[0.06, 0, fin.rotZ]}
        >
          <boxGeometry args={[fin.w, fin.h, 14]} />
          <meshStandardMaterial color="#b46345" roughness={0.95} flatShading />
        </mesh>
      ))}

      {/* Desert Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -10]}>
        <planeGeometry args={[360, 360]} />
        <meshStandardMaterial ref={groundMatRef} color={MORNING_GROUND} roughness={0.95} />
      </mesh>

      {/* Desert Scrub Bushes & Sandstone Boulders */}
      {SHRUB_AND_ROCK_PROPS.map((prop, idx) =>
        prop.type === "bush" ? (
          <mesh key={idx} position={[prop.pos[0], 0.4 * prop.scale, prop.pos[2]]} scale={prop.scale}>
            <dodecahedronGeometry args={[0.65, 0]} />
            <meshStandardMaterial color="#4d7c0f" roughness={0.9} flatShading />
          </mesh>
        ) : (
          <mesh key={idx} position={[prop.pos[0], 0.45 * prop.scale, prop.pos[2]]} scale={[prop.scale * 1.3, prop.scale * 0.8, prop.scale]}>
            <dodecahedronGeometry args={[0.75, 0]} />
            <meshStandardMaterial color="#9a4a2b" roughness={0.92} flatShading />
          </mesh>
        )
      )}

      {/* Route 66 Black Asphalt Road + Curbs & White Edge Stripes */}
      <mesh geometry={roadGeometry}>
        <meshStandardMaterial color="#111113" roughness={0.9} side={THREE.DoubleSide} />
      </mesh>
      <mesh geometry={leftCurbGeo}>
        <meshStandardMaterial color="#d6d3d1" roughness={0.85} side={THREE.DoubleSide} />
      </mesh>
      <mesh geometry={rightCurbGeo}>
        <meshStandardMaterial color="#d6d3d1" roughness={0.85} side={THREE.DoubleSide} />
      </mesh>
      <mesh geometry={leftLineGeo}>
        <meshStandardMaterial color="#f8fafc" side={THREE.DoubleSide} />
      </mesh>
      <mesh geometry={rightLineGeo}>
        <meshStandardMaterial color="#f8fafc" side={THREE.DoubleSide} />
      </mesh>

      {/* Dashed white center stripes */}
      {dashes.map((d, i) => (
        <mesh key={i} position={d.pos} rotation={[0, d.rotY, 0]}>
          <boxGeometry args={[0.16, 0.025, 1.35]} />
          <meshStandardMaterial color="#f8fafc" />
        </mesh>
      ))}

      {/* Radiator Springs Town Landmarks (Courthouse, Cozy Cone, Flo's V8, Luigi's, Ramone's) */}
      <RadiatorSpringsTown nightFactor={nightFactor} />

      {/* Desert Cacti */}
      {CACTUS_POSITIONS.map((pos, idx) => (
        <group key={idx} position={pos}>
          <mesh position={[0, 1.1, 0]} castShadow>
            <cylinderGeometry args={[0.2, 0.24, 2.2, 6]} />
            <meshStandardMaterial color="#15803d" roughness={0.85} flatShading />
          </mesh>
          <mesh position={[0.35, 1.25, 0]} rotation={[0, 0, -0.5]}>
            <cylinderGeometry args={[0.12, 0.14, 0.75, 6]} />
            <meshStandardMaterial color="#15803d" roughness={0.85} flatShading />
          </mesh>
        </group>
      ))}

      {/* Roadside Neon Lamp Posts */}
      {lamps.map((lamp, idx) => (
        <group key={idx} position={lamp.pos} rotation={[0, lamp.rotY, 0]}>
          <mesh position={[0, 2.2, 0]}>
            <cylinderGeometry args={[0.07, 0.1, 4.4, 6]} />
            <meshStandardMaterial color="#3f3f46" metalness={0.6} roughness={0.4} />
          </mesh>
          <mesh position={[-0.4, 4.3, 0]}>
            <boxGeometry args={[0.9, 0.1, 0.14]} />
            <meshStandardMaterial color="#3f3f46" metalness={0.6} roughness={0.4} />
          </mesh>
          <mesh position={[-0.75, 4.18, 0]}>
            <boxGeometry args={[0.28, 0.14, 0.22]} />
            <meshStandardMaterial
              color="#fdba74"
              emissive="#f97316"
              emissiveIntensity={0.4 + nightFactor * 2.6}
            />
          </mesh>
          {nightFactor > 0.3 && (
            <pointLight
              position={[-0.75, 3.9, 0]}
              intensity={nightFactor * 4.5}
              distance={14}
              color="#fb923c"
            />
          )}
        </group>
      ))}

      {/* Pit-Stop Roadside Arches */}
      {stopGates.map((gate, idx) => (
        <group key={idx} position={gate.pos} rotation={[0, gate.rotY, 0]}>
          <mesh position={[-3.4, 2.3, 0]}>
            <boxGeometry args={[0.2, 4.6, 0.2]} />
            <meshStandardMaterial color="#27272a" metalness={0.6} roughness={0.4} />
          </mesh>
          <mesh position={[3.4, 2.3, 0]}>
            <boxGeometry args={[0.2, 4.6, 0.2]} />
            <meshStandardMaterial color="#27272a" metalness={0.6} roughness={0.4} />
          </mesh>
          <mesh position={[0, 4.65, 0]}>
            <boxGeometry args={[7.2, 0.22, 0.28]} />
            <meshStandardMaterial
              color="#f97316"
              emissive="#e11d2e"
              emissiveIntensity={0.6 + nightFactor * 1.4}
            />
          </mesh>
        </group>
      ))}

      {/* Cars Movie NPCs (GLB models stationed off-track) */}
      {PIT_CREW_NPCS.map((npc) => (
        <group
          key={npc.id}
          position={npc.position}
          rotation={[0, npc.rotY, 0]}
          onClick={(e) => {
            e.stopPropagation();
            onSelectNpc(npc);
          }}
        >
          {/* Glowing Pit Ring */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.04, 0]}>
            <ringGeometry args={[2.0, 2.25, 28]} />
            <meshBasicMaterial color={npc.color} transparent opacity={0.65} />
          </mesh>

          <GlbModel
            url={npc.modelUrl}
            targetLength={npc.targetLength}
            fallback={
              <mesh position={[0, 0.55, 0]} castShadow>
                <boxGeometry args={[1.6, 0.9, 3.0]} />
                <meshStandardMaterial color={npc.color} />
              </mesh>
            }
          />

          {/* Guido next to Luigi */}
          {npc.variant === "luigi" && (
            <group position={[1.8, 0, 0.2]}>
              <GlbModel url="/models/guido.glb" targetLength={1.65} />
            </group>
          )}

          <Html
            position={[0, 2.35, 0]}
            center
            distanceFactor={18}
            occlude
            zIndexRange={[10, 0]}
          >
            <button
              type="button"
              onClick={() => onSelectNpc(npc)}
              className="whitespace-nowrap rounded-full border border-orange-500/50 bg-[#111113]/90 px-2.5 py-0.5 text-[11px] font-semibold text-orange-300 shadow-lg backdrop-blur-sm hover:border-orange-400 hover:text-white"
            >
              {npc.name}
            </button>
          </Html>
        </group>
      ))}

      {/* Lightning McQueen-inspired #95 Car */}
      <group ref={carGroupRef}>
        <RaceCar95 nightFactor={nightFactor} speed={carSpeed} />
      </group>
    </>
  );
}
