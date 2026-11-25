import { motion, useReducedMotion } from "framer-motion";

export function FlameGradientDivider() {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return (
      <div className="mx-auto my-2 max-w-4xl px-6">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-orange-500/40 to-transparent" />
      </div>
    );
  }

  return (
    <div className="mx-auto my-2 max-w-4xl px-6" aria-hidden="true">
      <div className="relative flex items-center justify-center py-2">
        <motion.div
          className="h-px w-full origin-center bg-gradient-to-r from-transparent via-red-600/60 to-transparent"
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        />
        <motion.span
          className="absolute h-2 w-2 rotate-45 rounded-[2px] bg-gradient-to-br from-yellow-400 to-orange-500 shadow-[0_0_12px_rgba(250,204,21,0.8)]"
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4, delay: 0.25 }}
        />
      </div>
    </div>
  );
}
