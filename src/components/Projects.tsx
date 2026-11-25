import { HiExternalLink, HiCode } from "react-icons/hi";
import { FaGithub } from "react-icons/fa";
import { projects } from "../data/portfolio";
import { FadeIn } from "./FadeIn";
import { ProjectShelf3D } from "./ProjectShelf3D";
import { SectionHeading } from "./SectionHeading";
import SpotlightCard from "./reactbits/SpotlightCard";

export function Projects() {
  return (
    <section id="projects" className="px-4 py-20 md:px-6 md:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          title="Projects"
          subtitle="Things I've built and shipped"
        />

        <ProjectShelf3D />

        <div className="grid gap-8 md:grid-cols-2">
          {projects.map((project, index) => (
            <FadeIn
              key={project.title}
              delay={index * 0.08}
              direction={index % 2 === 0 ? "left" : "right"}
            >
              <SpotlightCard
                spotlightColor="rgba(249, 115, 22, 0.2)"
                className="glass-card group flex h-full flex-col rounded-2xl p-6 transition-transform hover:-translate-y-1 md:p-8"
              >
                <div className="mb-4 flex items-center justify-between gap-4 border-b border-orange-500/15 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-red-600/25 to-orange-500/25 text-orange-400">
                      <HiCode size={20} />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-number rounded bg-red-600/20 px-2 py-0.5 text-xs tracking-widest text-orange-300 ring-1 ring-orange-500/30">
                        LAP {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="text-xs text-zinc-500">
                        {project.tech.length} stack
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-lg p-2 text-zinc-400 transition-colors hover:bg-white/5 hover:text-orange-400"
                        aria-label={`${project.title} GitHub`}
                      >
                        <FaGithub size={18} />
                      </a>
                    )}
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-lg p-2 text-zinc-400 transition-colors hover:bg-white/5 hover:text-orange-400"
                        aria-label={`${project.title} live demo`}
                      >
                        <HiExternalLink size={18} />
                      </a>
                    )}
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-zinc-100">
                  {project.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                  {project.description}
                </p>

                <ul className="mt-4 flex-1 space-y-2">
                  {project.highlights.map((highlight) => (
                    <li
                      key={highlight.slice(0, 40)}
                      className="flex gap-2 text-sm text-zinc-400"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-400" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full bg-white/5 px-3 py-1 text-xs text-zinc-400"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {(project.github || project.demo) && (
                  <div className="mt-6 flex gap-3">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2 text-sm text-zinc-300 transition-colors hover:border-orange-400/50 hover:text-orange-400"
                      >
                        <FaGithub size={16} />
                        GitHub
                      </a>
                    )}
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2 text-sm text-zinc-300 transition-colors hover:border-orange-400/50 hover:text-orange-400"
                      >
                        <HiExternalLink size={16} />
                        Live Demo
                      </a>
                    )}
                  </div>
                )}
              </SpotlightCard>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
