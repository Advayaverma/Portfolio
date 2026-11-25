import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { HiViewGrid } from "react-icons/hi";
import { RadiatorSpringsScene } from "./RadiatorSpringsScene";
import { Lightning95Badge } from "../Lightning95Badge";

interface CarsWorld3DProps {
  onSwitchToClassic: () => void;
}

export default function CarsWorld3D({ onSwitchToClassic }: CarsWorld3DProps) {
  const [progress, setProgress] = useState(0.04);
  const touchStartY = useRef<number | null>(null);

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      setProgress((prev) => Math.min(0.98, Math.max(0.02, prev + e.deltaY * 0.00045)));
    };

    const onTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0]?.clientY ?? null;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (touchStartY.current === null) return;
      const currentY = e.touches[0]?.clientY ?? touchStartY.current;
      const delta = touchStartY.current - currentY;
      touchStartY.current = currentY;
      setProgress((prev) => Math.min(0.98, Math.max(0.02, prev + delta * 0.0012)));
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        setProgress((prev) => Math.min(0.98, prev + 0.04));
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        setProgress((prev) => Math.max(0.02, prev - 0.04));
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-[#111113]">
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ fov: 52, near: 0.1, far: 250, position: [0, 5, 56] }}
      >
        <RadiatorSpringsScene targetProgress={progress} />
      </Canvas>

      {/* Top HUD */}
      <div className="pointer-events-none fixed inset-x-0 top-0 z-30 flex items-center justify-between p-4 md:p-6">
        <div className="pointer-events-auto flex items-center gap-3 rounded-full border border-orange-500/25 bg-[#111113]/75 px-4 py-2 backdrop-blur-md">
          <span className="font-racing text-xs font-semibold uppercase tracking-widest text-orange-400">
            Route 66 · Radiator Springs
          </span>
          <Lightning95Badge />
        </div>

        <button
          type="button"
          onClick={onSwitchToClassic}
          className="pointer-events-auto flex items-center gap-2 rounded-full border border-orange-500/30 bg-[#111113]/85 px-4 py-2 text-xs font-semibold text-zinc-100 shadow-lg backdrop-blur-md transition-all hover:border-orange-400 hover:text-orange-400 md:text-sm"
        >
          <HiViewGrid size={16} />
          Classic view
        </button>
      </div>

      {/* Bottom Drive Hint & Progress */}
      <div className="pointer-events-none fixed inset-x-0 bottom-5 z-30 flex flex-col items-center gap-2 px-4">
        <div className="rounded-full border border-white/10 bg-[#111113]/75 px-4 py-1.5 text-xs text-zinc-300 backdrop-blur-md">
          Scroll or use Arrow keys to drive · Sunset to Night
        </div>
        <div className="h-1 w-48 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-red-600 via-orange-500 to-yellow-400 transition-all duration-150"
            style={{ width: `${Math.round(progress * 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
}
