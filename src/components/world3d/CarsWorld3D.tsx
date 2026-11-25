import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { HiViewGrid } from "react-icons/hi";
import { RadiatorSpringsScene } from "./RadiatorSpringsScene";
import { Lightning95Badge } from "../Lightning95Badge";
import { PIT_STOPS, PitStopOverlay } from "./PitStopOverlay";

interface CarsWorld3DProps {
  onSwitchToClassic: () => void;
}

export default function CarsWorld3D({ onSwitchToClassic }: CarsWorld3DProps) {
  const [progress, setProgress] = useState(0.04);
  const touchStartY = useRef<number | null>(null);

  const activeStopIndex = useMemo(() => {
    let closestIdx = 0;
    let minDiff = Infinity;
    PIT_STOPS.forEach((stop, idx) => {
      const diff = Math.abs(stop.progress - progress);
      if (diff < minDiff) {
        minDiff = diff;
        closestIdx = idx;
      }
    });
    return closestIdx;
  }, [progress]);

  const jumpToStop = (index: number) => {
    const target = PIT_STOPS[index];
    if (target) setProgress(target.progress);
  };

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if ((e.target as HTMLElement | null)?.closest("[data-pit-overlay]")) {
        return;
      }
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

      {/* Right-side Track Navigation Dots */}
      <nav
        aria-label="3D Route stops"
        className="fixed right-4 top-1/2 z-30 flex -translate-y-1/2 flex-col items-end gap-3 md:right-6"
      >
        {PIT_STOPS.map((stop, idx) => {
          const isActive = idx === activeStopIndex;
          return (
            <button
              key={stop.id}
              type="button"
              onClick={() => jumpToStop(idx)}
              className="group flex items-center gap-2.5"
              aria-label={`Jump to ${stop.label}`}
            >
              <span
                className={`hidden rounded-md px-2 py-0.5 text-[11px] font-medium transition-all md:inline-block ${
                  isActive
                    ? "bg-orange-500/20 text-orange-300 opacity-100"
                    : "bg-[#111113]/80 text-zinc-400 opacity-0 group-hover:opacity-100"
                }`}
              >
                {stop.label}
              </span>
              <span
                className={`block rounded-full transition-all ${
                  isActive
                    ? "h-3.5 w-3.5 bg-gradient-to-br from-red-500 to-yellow-400 ring-2 ring-orange-400/50 shadow-[0_0_10px_rgba(249,115,22,0.8)]"
                    : "h-2.5 w-2.5 bg-white/30 group-hover:bg-orange-400/80"
                }`}
              />
            </button>
          );
        })}
      </nav>

      {/* Pit-Stop Telemetry Overlay */}
      <PitStopOverlay
        activeStopIndex={activeStopIndex}
        onJumpToStop={jumpToStop}
      />

      {/* Bottom Drive Hint & Progress */}
      <div className="pointer-events-none fixed inset-x-0 bottom-3 z-20 flex flex-col items-center gap-1.5 px-4">
        <div className="hidden rounded-full border border-white/10 bg-[#111113]/75 px-4 py-1 text-[11px] text-zinc-400 backdrop-blur-md md:block">
          Scroll or click a track dot to drive · Sunset to Night
        </div>
        <div className="h-1 w-44 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-red-600 via-orange-500 to-yellow-400 transition-all duration-150"
            style={{ width: `${Math.round(progress * 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
}
