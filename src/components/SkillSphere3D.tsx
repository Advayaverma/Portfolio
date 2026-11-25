import { useEffect, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { skills } from "../data/portfolio";

interface TagPoint {
  label: string;
  x: number;
  y: number;
  z: number;
}

export function SkillSphere3D() {
  const prefersReducedMotion = useReducedMotion();
  const allSkills = useMemo(() => Object.values(skills).flat(), []);
  const [rot, setRot] = useState({ x: 0.2, y: 0 });
  const dragging = useRef(false);
  const lastMouse = useRef({ x: 0, y: 0 });

  const points = useMemo<TagPoint[]>(() => {
    const n = allSkills.length;
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));
    return allSkills.map((label, i) => {
      const y = 1 - (i / Math.max(1, n - 1)) * 2;
      const radiusAtY = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = goldenAngle * i;
      return {
        label,
        x: Math.cos(theta) * radiusAtY,
        y,
        z: Math.sin(theta) * radiusAtY,
      };
    });
  }, [allSkills]);

  useEffect(() => {
    if (prefersReducedMotion) return;
    let rafId: number;
    const tick = () => {
      if (!dragging.current) {
        setRot((prev) => ({ x: prev.x, y: prev.y + 0.004 }));
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [prefersReducedMotion]);

  const radius = 148;
  const sinX = Math.sin(rot.x);
  const cosX = Math.cos(rot.x);
  const sinY = Math.sin(rot.y);
  const cosY = Math.cos(rot.y);

  return (
    <div
      className="glass-card relative mx-auto mb-10 flex h-[340px] max-w-md cursor-grab items-center justify-center overflow-hidden rounded-2xl select-none active:cursor-grabbing"
      onPointerDown={(e) => {
        dragging.current = true;
        lastMouse.current = { x: e.clientX, y: e.clientY };
      }}
      onPointerMove={(e) => {
        if (!dragging.current) return;
        const dx = e.clientX - lastMouse.current.x;
        const dy = e.clientY - lastMouse.current.y;
        lastMouse.current = { x: e.clientX, y: e.clientY };
        setRot((prev) => ({
          x: Math.max(-1.2, Math.min(1.2, prev.x + dy * 0.006)),
          y: prev.y + dx * 0.006,
        }));
      }}
      onPointerUp={() => {
        dragging.current = false;
      }}
      onPointerLeave={() => {
        dragging.current = false;
      }}
    >
      <div className="pointer-events-none absolute inset-x-0 top-3 text-center">
        <span className="font-racing text-[10px] uppercase tracking-widest text-orange-400/80">
          3D Telemetry Sphere · Drag to spin
        </span>
      </div>

      <div className="relative h-full w-full">
        {points.map((pt) => {
          // Rotate around Y then X
          const x1 = pt.x * cosY - pt.z * sinY;
          const z1 = pt.x * sinY + pt.z * cosY;
          const y2 = pt.y * cosX - z1 * sinX;
          const z2 = pt.y * sinX + z1 * cosX;

          const scale = (z2 + 2.2) / 3.2;
          const opacity = Math.max(0.22, Math.min(1, (z2 + 1.2) / 2.1));

          return (
            <span
              key={pt.label}
              style={{
                transform: `translate(-50%, -50%) translate3d(${x1 * radius}px, ${y2 * radius}px, 0) scale(${scale.toFixed(2)})`,
                opacity,
                zIndex: Math.round((z2 + 1) * 50),
              }}
              className="pointer-events-none absolute top-1/2 left-1/2 whitespace-nowrap rounded-full border border-orange-500/25 bg-[#1a1a1e]/90 px-2.5 py-0.5 text-xs font-medium text-zinc-200 shadow-sm"
            >
              {pt.label}
            </span>
          );
        })}
      </div>
    </div>
  );
}
