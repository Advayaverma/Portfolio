import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HiCode, HiExternalLink, HiX } from "react-icons/hi";
import { FaGithub } from "react-icons/fa";
import { projects } from "../data/portfolio";

export function ProjectShelf3D() {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const selected = selectedIdx !== null ? projects[selectedIdx] : null;

  return (
    <div className="mb-10">
      <div className="glass-card rounded-2xl p-6 md:p-8">
        <div className="mb-5 flex items-center justify-between border-b border-orange-500/15 pb-3">
          <span className="font-racing text-xs font-semibold uppercase tracking-widest text-orange-400">
            Pit-Garage Shelf · Click a build manual to inspect
          </span>
          <span className="font-number text-xs tracking-wider text-yellow-400">
            {projects.length} BUILDS
          </span>
        </div>

        {/* 3D-tilted shelf row */}
        <div className="flex gap-3 overflow-x-auto pb-4 [perspective:900px]">
          {projects.map((project, idx) => (
            <button
              key={project.title}
              type="button"
              onClick={() => setSelectedIdx(idx)}
              className="group relative flex h-44 w-32 shrink-0 flex-col justify-between rounded-xl border border-orange-500/25 bg-gradient-to-b from-[#232329] to-[#141418] p-3.5 text-left shadow-lg transition-all duration-300 hover:-translate-y-2 hover:border-orange-400 hover:shadow-[0_12px_28px_rgba(249,115,22,0.25)] [transform:rotateY(-8deg)] hover:[transform:rotateY(0deg)]"
            >
              <div className="flex items-center justify-between">
                <span className="font-number rounded bg-red-600/25 px-1.5 py-0.5 text-[10px] tracking-widest text-orange-300">
                  #{String(idx + 1).padStart(2, "0")}
                </span>
                <HiCode
                  size={15}
                  className="text-zinc-500 transition-colors group-hover:text-orange-400"
                />
              </div>

              <h3 className="line-clamp-3 text-xs font-semibold leading-snug text-zinc-100 group-hover:text-orange-300">
                {project.title}
              </h3>

              <span className="text-[10px] text-zinc-500">
                {project.tech.slice(0, 2).join(" · ")}
              </span>
            </button>
          ))}
        </div>

        {/* Shelf ledge */}
        <div
          aria-hidden="true"
          className="h-2 w-full rounded-full bg-gradient-to-r from-red-600/40 via-orange-500/40 to-yellow-400/40 shadow-[0_6px_18px_rgba(249,115,22,0.2)]"
        />
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
            onClick={() => setSelectedIdx(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 16 }}
              transition={{ duration: 0.22 }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[82vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-orange-500/35 bg-[#141418] p-6 shadow-2xl md:p-8"
            >
              <div className="mb-4 flex items-start justify-between gap-4 border-b border-orange-500/20 pb-3">
                <div>
                  <span className="font-number rounded bg-red-600/20 px-2 py-0.5 text-xs tracking-widest text-orange-300">
                    LAP {String((selectedIdx ?? 0) + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-racing mt-2 text-xl font-bold text-zinc-100">
                    {selected.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedIdx(null)}
                  className="rounded-lg p-1.5 text-zinc-400 transition-colors hover:bg-white/10 hover:text-white"
                  aria-label="Close modal"
                >
                  <HiX size={20} />
                </button>
              </div>

              <p className="text-sm leading-relaxed text-zinc-300">
                {selected.description}
              </p>

              <ul className="mt-4 space-y-2">
                {selected.highlights.map((h) => (
                  <li
                    key={h.slice(0, 40)}
                    className="flex gap-2 text-sm text-zinc-400"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-400" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex flex-wrap gap-2">
                {selected.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-white/5 px-3 py-1 text-xs text-zinc-300"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {(selected.github || selected.demo) && (
                <div className="mt-6 flex gap-3">
                  {selected.github && (
                    <a
                      href={selected.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2 text-sm text-zinc-200 transition-colors hover:border-orange-400/50 hover:text-orange-400"
                    >
                      <FaGithub size={16} />
                      GitHub
                    </a>
                  )}
                  {selected.demo && (
                    <a
                      href={selected.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2 text-sm text-zinc-200 transition-colors hover:border-orange-400/50 hover:text-orange-400"
                    >
                      <HiExternalLink size={16} />
                      Live Demo
                    </a>
                  )}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
