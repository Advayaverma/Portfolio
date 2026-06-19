import { motion, useReducedMotion } from "framer-motion";
import { HiDownload } from "react-icons/hi";
import { profile } from "../data/portfolio";
import { scrollToSection } from "../hooks/useActiveSection";

export function Hero() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="hero"
      className="hero-glow relative flex min-h-screen items-center justify-center px-4 pt-20 md:px-6"
    >
      <div className="mx-auto max-w-4xl text-center">
        <motion.p
          className="mb-4 text-sm font-medium uppercase tracking-widest text-cyan-400"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Portfolio
        </motion.p>

        <motion.h1
          className="text-5xl font-bold tracking-tight md:text-7xl"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <span className="gradient-text">{profile.name}</span>
        </motion.h1>

        <motion.p
          className="mt-6 text-lg text-zinc-400 md:text-xl"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {profile.tagline}
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <button
            type="button"
            onClick={() => scrollToSection("projects")}
            className="w-full rounded-lg bg-gradient-to-r from-cyan-500 to-violet-500 px-8 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 sm:w-auto"
          >
            View Projects
          </button>
          <a
            href={profile.resumeFile}
            download
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 px-8 py-3 text-sm font-semibold text-zinc-200 transition-colors hover:border-cyan-400/50 hover:text-cyan-400 sm:w-auto"
          >
            <HiDownload size={18} />
            Download Resume
          </a>
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <motion.div
          className="h-8 w-5 rounded-full border-2 border-zinc-600"
          animate={prefersReducedMotion ? {} : { y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="mx-auto mt-1.5 h-1.5 w-1 rounded-full bg-zinc-500" />
        </motion.div>
      </div>
    </section>
  );
}
