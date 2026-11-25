import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  HiArrowDown,
  HiArrowLeft,
  HiArrowRight,
  HiArrowUp,
  HiLightningBolt,
  HiViewGrid,
} from "react-icons/hi";
import {
  RadiatorSpringsScene,
  type DriveInput,
} from "./RadiatorSpringsScene";
import { Lightning95Badge } from "../Lightning95Badge";
import { PIT_STOPS, PitStopOverlay } from "./PitStopOverlay";
import { PitCrewDialogue, type PitCrewNPC } from "./PitCrewDialogue";

interface CarsWorld3DProps {
  onSwitchToClassic: () => void;
}

export default function CarsWorld3D({ onSwitchToClassic }: CarsWorld3DProps) {
  const [progress, setProgress] = useState(0.04);
  const [exploreMode, setExploreMode] = useState(false);
  const [nearbyNpc, setNearbyNpc] = useState<PitCrewNPC | null>(null);
  const [activeNpc, setActiveNpc] = useState<PitCrewNPC | null>(null);
  const touchStartY = useRef<number | null>(null);

  const driveInputRef = useRef<DriveInput>({
    forward: false,
    backward: false,
    left: false,
    right: false,
    boost: false,
  });

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
      if (exploreMode) return;
      if ((e.target as HTMLElement | null)?.closest("[data-pit-overlay]")) {
        return;
      }
      e.preventDefault();
      setProgress((prev) =>
        Math.min(0.98, Math.max(0.02, prev + e.deltaY * 0.00045))
      );
    };

    const onTouchStart = (e: TouchEvent) => {
      if (exploreMode) return;
      touchStartY.current = e.touches[0]?.clientY ?? null;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (exploreMode || touchStartY.current === null) return;
      const currentY = e.touches[0]?.clientY ?? touchStartY.current;
      const delta = touchStartY.current - currentY;
      touchStartY.current = currentY;
      setProgress((prev) =>
        Math.min(0.98, Math.max(0.02, prev + delta * 0.0012))
      );
    };

    const onKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();

      if (key === "e") {
        setExploreMode((prev) => !prev);
        setActiveNpc(null);
        return;
      }
      if (key === "f" && nearbyNpc) {
        setActiveNpc(nearbyNpc);
        return;
      }
      if (e.key === "Escape") {
        setActiveNpc(null);
        return;
      }

      if (exploreMode) {
        if (e.key === "ArrowUp" || key === "w") driveInputRef.current.forward = true;
        if (e.key === "ArrowDown" || key === "s") driveInputRef.current.backward = true;
        if (e.key === "ArrowLeft" || key === "a") driveInputRef.current.left = true;
        if (e.key === "ArrowRight" || key === "d") driveInputRef.current.right = true;
        if (e.key === "Shift") driveInputRef.current.boost = true;
      } else {
        // Up / W moves car forward along Route 66; Down / S moves backward
        if (e.key === "ArrowUp" || key === "w" || e.key === "ArrowRight") {
          setProgress((prev) => Math.min(0.98, prev + 0.04));
        } else if (e.key === "ArrowDown" || key === "s" || e.key === "ArrowLeft") {
          setProgress((prev) => Math.max(0.02, prev - 0.04));
        }
      }
    };

    const onKeyUp = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (e.key === "ArrowUp" || key === "w") driveInputRef.current.forward = false;
      if (e.key === "ArrowDown" || key === "s") driveInputRef.current.backward = false;
      if (e.key === "ArrowLeft" || key === "a") driveInputRef.current.left = false;
      if (e.key === "ArrowRight" || key === "d") driveInputRef.current.right = false;
      if (e.key === "Shift") driveInputRef.current.boost = false;
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, [exploreMode, nearbyNpc]);

  const setPad = (field: keyof DriveInput, value: boolean) => {
    driveInputRef.current[field] = value;
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-[#111113]">
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ fov: 52, near: 0.1, far: 250, position: [0, 5, 56] }}
      >
        <RadiatorSpringsScene
          targetProgress={progress}
          exploreMode={exploreMode}
          driveInputRef={driveInputRef}
          onNearbyNpcChange={setNearbyNpc}
          onSelectNpc={setActiveNpc}
        />
      </Canvas>

      {/* Top HUD (Classic view always preserved) */}
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

      {/* Journey Mode: Track Dots & Dynamic Pit-Stop Overlay */}
      {!exploreMode && (
        <>
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

          <PitStopOverlay
            activeStopIndex={activeStopIndex}
            onJumpToStop={jumpToStop}
          />
        </>
      )}

      {/* Free Drive Mode: Nearby NPC Prompt + Mobile/On-screen Controls */}
      {exploreMode && (
        <>
          {nearbyNpc && !activeNpc && (
            <button
              type="button"
              onClick={() => setActiveNpc(nearbyNpc)}
              className="fixed bottom-28 left-1/2 z-30 -translate-x-1/2 rounded-full border border-orange-400/60 bg-[#111113]/90 px-4 py-2 text-xs font-semibold text-orange-300 shadow-lg backdrop-blur-md hover:bg-orange-500/20"
            >
              Talk to {nearbyNpc.name} [F]
            </button>
          )}

          {/* On-screen Drive Pad */}
          <div className="fixed bottom-5 left-5 z-30 flex items-center gap-2 select-none">
            <button
              type="button"
              aria-label="Steer Left"
              onPointerDown={() => setPad("left", true)}
              onPointerUp={() => setPad("left", false)}
              onPointerLeave={() => setPad("left", false)}
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-[#141418]/80 text-zinc-200 backdrop-blur-md active:border-orange-400 active:text-orange-400"
            >
              <HiArrowLeft size={18} />
            </button>
            <div className="flex flex-col gap-1.5">
              <button
                type="button"
                aria-label="Accelerate Forward"
                onPointerDown={() => setPad("forward", true)}
                onPointerUp={() => setPad("forward", false)}
                onPointerLeave={() => setPad("forward", false)}
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-orange-500/35 bg-[#141418]/85 text-orange-300 backdrop-blur-md active:bg-orange-500/30"
              >
                <HiArrowUp size={18} />
              </button>
              <button
                type="button"
                aria-label="Reverse"
                onPointerDown={() => setPad("backward", true)}
                onPointerUp={() => setPad("backward", false)}
                onPointerLeave={() => setPad("backward", false)}
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-[#141418]/80 text-zinc-200 backdrop-blur-md active:border-orange-400 active:text-orange-400"
              >
                <HiArrowDown size={18} />
              </button>
            </div>
            <button
              type="button"
              aria-label="Steer Right"
              onPointerDown={() => setPad("right", true)}
              onPointerUp={() => setPad("right", false)}
              onPointerLeave={() => setPad("right", false)}
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-[#141418]/80 text-zinc-200 backdrop-blur-md active:border-orange-400 active:text-orange-400"
            >
              <HiArrowRight size={18} />
            </button>
            <button
              type="button"
              aria-label="Turbo Boost"
              onPointerDown={() => setPad("boost", true)}
              onPointerUp={() => setPad("boost", false)}
              onPointerLeave={() => setPad("boost", false)}
              className="ml-1 flex h-11 items-center gap-1 rounded-xl border border-yellow-400/40 bg-red-600/25 px-3 text-xs font-semibold text-yellow-300 backdrop-blur-md active:bg-red-600/45"
            >
              <HiLightningBolt size={16} />
              Boost
            </button>
          </div>
        </>
      )}

      {/* NPC Dialogue Modal */}
      <PitCrewDialogue npc={activeNpc} onClose={() => setActiveNpc(null)} />

      {/* Bottom Right Explore / Free Drive Toggle */}
      <button
        type="button"
        onClick={() => {
          setExploreMode((prev) => !prev);
          setActiveNpc(null);
        }}
        className="fixed bottom-4 right-4 z-30 rounded-full border border-orange-500/35 bg-[#111113]/85 px-4 py-2 text-xs font-semibold text-orange-300 shadow-lg backdrop-blur-md transition-all hover:border-orange-400 hover:text-white md:bottom-6 md:right-6"
      >
        {exploreMode ? "Back to journey [E]" : "Explore / Free Drive [E]"}
      </button>

      {/* Bottom Drive Hint & Progress */}
      <div className="pointer-events-none fixed inset-x-0 bottom-3 z-20 hidden flex-col items-center gap-1.5 px-4 md:flex">
        <div className="rounded-full border border-white/10 bg-[#111113]/75 px-4 py-1 text-[11px] text-zinc-400 backdrop-blur-md">
          {exploreMode
            ? "WASD / Arrow keys to drive · Shift to Boost · Click or press [F] near Pit Crew"
            : "Scroll or W / Up Arrow to drive forward · Click track dots to jump"}
        </div>
        {!exploreMode && (
          <div className="h-1 w-44 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-red-600 via-orange-500 to-yellow-400 transition-all duration-150"
              style={{ width: `${Math.round(progress * 100)}%` }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
