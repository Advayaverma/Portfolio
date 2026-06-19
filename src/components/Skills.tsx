import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { skills } from "../data/portfolio";
import { FadeIn } from "./FadeIn";
import { SectionHeading } from "./SectionHeading";

const categories = Object.keys(skills) as (keyof typeof skills)[];

export function Skills() {
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const prefersReducedMotion = useReducedMotion();
  const activeSkills = skills[activeCategory];

  return (
    <section id="skills" className="px-4 py-20 md:px-6 md:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          title="Technical Skills"
          subtitle="Languages, frameworks, and tools I work with"
        />

        <FadeIn>
          <div className="mb-8 flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  activeCategory === category
                    ? "bg-gradient-to-r from-cyan-500/20 to-violet-500/20 text-cyan-400 ring-1 ring-cyan-400/30"
                    : "bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-zinc-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="glass-card rounded-2xl p-6 md:p-8">
            <h3 className="mb-4 text-lg font-semibold text-zinc-100">
              {activeCategory}
            </h3>
            <div className="flex flex-wrap gap-3">
              {activeSkills.map((skill, index) => (
                <motion.span
                  key={skill}
                  className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-300 transition-colors hover:border-cyan-400/30 hover:text-cyan-300"
                  initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.04 }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </div>

          <div className="mt-8 hidden gap-4 md:grid md:grid-cols-2 lg:grid-cols-3">
            {categories.map((category, catIndex) => (
              <FadeIn key={category} delay={catIndex * 0.08}>
                <div className="glass-card h-full rounded-2xl p-6 transition-transform hover:-translate-y-1">
                  <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-cyan-400">
                    {category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skills[category].map((skill) => (
                      <span
                        key={skill}
                        className="rounded-md bg-white/5 px-3 py-1 text-xs text-zinc-400"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
