import { lazy, Suspense, useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { HiDownload } from "react-icons/hi";
import { profile } from "../data/portfolio";
import { scrollToSection } from "../hooks/useActiveSection";
import SplitText from "./reactbits/SplitText";
import DecryptedText from "./reactbits/DecryptedText";
import { Lightning95Badge } from "./Lightning95Badge";

const Aurora = lazy(() => import("./reactbits/Aurora"));

export function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const stripeLeft = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const stripeRight = useTransform(scrollYProgress, [0, 1], [0, 140]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="hero-glow relative flex min-h-screen items-center justify-center overflow-hidden px-4 pt-20 md:px-6"
    >
      {!prefersReducedMotion && (
        <div className="pointer-events-none absolute inset-0 opacity-60">
          <Suspense fallback={null}>
            <Aurora
              colorStops={["#E11D2E", "#F97316", "#FACC15"]}
              blend={0.55}
              amplitude={1.0}
              speed={0.5}
            />
          </Suspense>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#111113]" />
        </div>
      )}

      {!prefersReducedMotion && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <motion.div
            style={{ x: stripeLeft }}
            className="absolute top-[24%] -left-24 h-px w-[55%] bg-gradient-to-r from-transparent via-red-500/35 to-transparent"
          />
          <motion.div
            style={{ x: stripeRight }}
            className="absolute top-[74%] -right-24 h-px w-[55%] bg-gradient-to-r from-transparent via-orange-400/35 to-transparent"
          />
        </div>
      )}

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <motion.div
          className="mb-4 flex items-center justify-center gap-3"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="font-racing text-sm font-semibold uppercase tracking-widest text-orange-400">
            Portfolio
          </p>
          <Lightning95Badge />
        </motion.div>

        {prefersReducedMotion ? (
          <h1 className="font-racing text-5xl font-extrabold tracking-tight md:text-7xl">
            <span className="gradient-text">{profile.name}</span>
          </h1>
        ) : (
          <SplitText
            text={profile.name}
            tag="h1"
            trigger="load"
            effect="rise"
            splitType="chars"
            delay={40}
            duration={0.7}
            color="#ffffff"
            accentColor="#f97316"
            className="font-racing text-5xl font-extrabold tracking-tight drop-shadow-[0_4px_24px_rgba(225,29,46,0.35)] md:text-7xl"
          />
        )}

        <div className="mt-6">
          {prefersReducedMotion ? (
            <p className="text-lg text-zinc-300 md:text-xl">{profile.tagline}</p>
          ) : (
            <DecryptedText
              text={profile.tagline}
              animateOn="view"
              sequential
              speed={35}
              scrambleColor="#f97316"
              className="text-lg text-zinc-300 md:text-xl"
              parentClassName="text-lg md:text-xl"
            />
          )}
        </div>

        <motion.div
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <button
            type="button"
            onClick={() => scrollToSection("projects")}
            className="w-full rounded-lg bg-gradient-to-r from-red-600 to-orange-500 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-red-600/20 transition-opacity hover:opacity-90 sm:w-auto"
          >
            View Projects
          </button>
          <a
            href={profile.resumeFile}
            download
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-orange-500/20 bg-white/5 px-8 py-3 text-sm font-semibold text-zinc-200 transition-colors hover:border-orange-400/60 hover:text-orange-400 sm:w-auto"
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
