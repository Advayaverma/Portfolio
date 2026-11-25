import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type FadeDirection = "up" | "left" | "right" | "zoom";

interface FadeInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: FadeDirection;
}

const initialOffsets: Record<FadeDirection, { opacity: number; x?: number; y?: number; scale?: number }> = {
  up: { opacity: 0, y: 24 },
  left: { opacity: 0, x: -32 },
  right: { opacity: 0, x: 32 },
  zoom: { opacity: 0, scale: 0.94, y: 16 },
};

export function FadeIn({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: FadeInProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={initialOffsets[direction]}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
