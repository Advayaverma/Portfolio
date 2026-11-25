import { Component, Suspense, useMemo, type ReactNode } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

interface GlbModelProps {
  url: string;
  targetLength?: number;
  rotationY?: number;
  fallback?: ReactNode;
}

class ModelErrorBoundary extends Component<
  { fallback: ReactNode; children: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

function NormalizedGlb({
  url,
  targetLength = 3.6,
  rotationY = 0,
}: {
  url: string;
  targetLength: number;
  rotationY: number;
}) {
  const { scene } = useGLTF(url);

  const { cloned, scale, offset, autoRotY } = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((obj) => {
      if ((obj as THREE.Mesh).isMesh) {
        obj.castShadow = true;
        obj.receiveShadow = true;
      }
    });

    const box = new THREE.Box3().setFromObject(clone);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);

    // If model was exported sideways (wider along X than Z), rotate 90deg
    const sideRot = size.x > size.z * 1.15 ? Math.PI / 2 : 0;
    const majorLen = Math.max(size.x, size.z, 0.001);
    const s = targetLength / majorLen;

    return {
      cloned: clone,
      scale: s,
      offset: [-center.x * s, -box.min.y * s, -center.z * s] as [
        number,
        number,
        number,
      ],
      autoRotY: sideRot + rotationY,
    };
  }, [scene, targetLength, rotationY]);

  return (
    <group rotation={[0, autoRotY, 0]}>
      <primitive object={cloned} scale={scale} position={offset} />
    </group>
  );
}

export function GlbModel({
  url,
  targetLength = 3.6,
  rotationY = 0,
  fallback = null,
}: GlbModelProps) {
  return (
    <ModelErrorBoundary fallback={fallback}>
      <Suspense fallback={fallback}>
        <NormalizedGlb
          url={url}
          targetLength={targetLength}
          rotationY={rotationY}
        />
      </Suspense>
    </ModelErrorBoundary>
  );
}
