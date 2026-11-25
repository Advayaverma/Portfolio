import { useMemo, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import * as THREE from "three";
import { RaceCar95 } from "./RaceCar95";
import { roadCurve, STOP_PROGRESS } from "./roadPath";

interface RadiatorSpringsSceneProps {
  targetProgress: number;
}

const SUNSET_SKY = new THREE.Color("#7c2d12");
const TWILIGHT_SKY = new THREE.Color("#2e1065");
const NIGHT_SKY = new THREE.Color("#07070f");
const SUNSET_GROUND = new THREE.Color("#451a12");
const NIGHT_GROUND = new THREE.Color("#141115");

interface MesaProp {
  position: [number, number, number];
  scale: [number, number, number];
  color: string;
}

const MESAS: MesaProp[] = [
  { position: [-22, 4.5, 28], scale: [12, 9, 10], color: "#9a3412" },
  { position: [24, 6, 14], scale: [14, 12, 12], color: "#7c2d12" },
  { position: [-26, 7, -8], scale: [15, 14, 13], color: "#9a3412" },
  { position: [22, 5, -28], scale: [12, 10, 11], color: "#b45309" },
  { position: [-24, 6.5, -52], scale: [16, 13, 12], color: "#7c2d12" },
  { position: [26, 8, -62], scale: [15, 16, 14], color: "#9a3412" },
];

const CACTUS_POSITIONS: [number, number, number][] = [
  [-11, 0, 38],
  [9, 0, 30],
  [-14, 0, 16],
  [12, 0, -4],
  [-12, 0, -28],
  [14, 0, -48],
  [-10, 0, -60],
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
      indices.push(a, c, b, b, c, d);
    }
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geo.setIndex(indices);
  geo.computeVertexNormals();
  return geo;
}

export function RadiatorSpringsScene({ targetProgress }: RadiatorSpringsSceneProps) {
  const { scene, camera } = useThree();
  const smoothProgress = useRef(0.04);
  const carGroupRef = useRef<THREE.Group>(null);
  const ambientRef = useRef<THREE.AmbientLight>(null);
  const sunRef = useRef<THREE.DirectionalLight>(null);
  const groundMatRef = useRef<THREE.MeshStandardMaterial>(null);

  const [nightFactor, setNightFactor] = useState(0);
  const [carSpeed, setCarSpeed] = useState(0);

  const roadGeometry = useMemo(() => buildRoadGeometry(roadCurve, 6.2, 140), []);

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
    const prev = smoothProgress.current;
    smoothProgress.current = THREE.MathUtils.lerp(
      smoothProgress.current,
      targetProgress,
      Math.min(1, delta * 4.5)
    );
    const t = THREE.MathUtils.clamp(smoothProgress.current, 0.01, 0.99);
    const velocity = Math.abs(smoothProgress.current - prev) / Math.max(delta, 0.001);
    setCarSpeed(velocity * 12);

    const nf = THREE.MathUtils.smoothstep(t, 0.2, 0.85);
    setNightFactor(nf);

    // Sky & fog color interpolation (sunset -> twilight -> night)
    const skyColor = new THREE.Color();
    if (t < 0.5) {
      skyColor.lerpColors(SUNSET_SKY, TWILIGHT_SKY, t * 2);
    } else {
      skyColor.lerpColors(TWILIGHT_SKY, NIGHT_SKY, (t - 0.5) * 2);
    }
    scene.background = skyColor;
    if (scene.fog instanceof THREE.FogExp2) {
      scene.fog.color.copy(skyColor);
    }

    if (groundMatRef.current) {
      groundMatRef.current.color.lerpColors(SUNSET_GROUND, NIGHT_GROUND, nf);
    }

    if (ambientRef.current) {
      ambientRef.current.intensity = THREE.MathUtils.lerp(0.85, 0.35, nf);
    }
    if (sunRef.current) {
      sunRef.current.intensity = THREE.MathUtils.lerp(2.0, 0.35, nf);
      sunRef.current.position.set(18, THREE.MathUtils.lerp(12, 3, nf), -30);
    }

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
    camera.position.lerp(desiredCamPos, Math.min(1, delta * 5));

    const lookTarget = carPt.clone().addScaledVector(carTan, 6).add(new THREE.Vector3(0, 1.1, 0));
    camera.lookAt(lookTarget);
  });

  return (
    <>
      <fogExp2 attach="fog" args={["#7c2d12", 0.016]} />
      <ambientLight ref={ambientRef} intensity={0.85} color="#fed7aa" />
      <directionalLight
        ref={sunRef}
        position={[18, 12, -30]}
        intensity={2}
        color="#fb923c"
        castShadow
      />

      {nightFactor > 0.2 && (
        <Stars
          radius={90}
          depth={40}
          count={Math.round(1400 * nightFactor)}
          factor={3.5}
          saturation={0.2}
          fade
        />
      )}

      {/* Desert Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -10]} receiveShadow>
        <planeGeometry args={[260, 260]} />
        <meshStandardMaterial ref={groundMatRef} color="#451a12" roughness={0.95} />
      </mesh>

      {/* Route 66 Asphalt Road */}
      <mesh geometry={roadGeometry} receiveShadow>
        <meshStandardMaterial color="#18181b" roughness={0.85} />
      </mesh>

      {/* Dashed yellow center lines */}
      {dashes.map((d, i) => (
        <mesh key={i} position={d.pos} rotation={[0, d.rotY, 0]}>
          <boxGeometry args={[0.16, 0.02, 1.2]} />
          <meshStandardMaterial
            color="#facc15"
            emissive="#f59e0b"
            emissiveIntensity={0.2 + nightFactor * 0.4}
          />
        </mesh>
      ))}

      {/* Red-rock Mesas */}
      {MESAS.map((m, idx) => (
        <mesh key={idx} position={m.position} castShadow receiveShadow>
          <cylinderGeometry args={[m.scale[0] * 0.55, m.scale[0], m.scale[1], 7]} />
          <meshStandardMaterial color={m.color} roughness={0.9} flatShading />
        </mesh>
      ))}

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

      {/* Lightning McQueen-inspired #95 Car */}
      <group ref={carGroupRef}>
        <RaceCar95 nightFactor={nightFactor} speed={carSpeed} />
      </group>
    </>
  );
}
