import { HiExternalLink, HiCode } from "react-icons/hi";
import { FaGithub } from "react-icons/fa";
import { projects } from "../data/portfolio";
import { FadeIn } from "./FadeIn";
import { SectionHeading } from "./SectionHeading";

export function Projects() {
  return (
    <section id="projects" className="px-4 py-20 md:px-6 md:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          title="Projects"
          subtitle="Things I've built and shipped"
        />

        <div className="grid gap-8 md:grid-cols-2">
          {projects.map((project, index) => (
            <FadeIn key={project.title} delay={index * 0.1}>
              <article className="glass-card group flex h-full flex-col rounded-2xl p-6 transition-transform hover:-translate-y-1 md:p-8">
                <div className="mb-4 flex items-start justify-between gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500/20 to-violet-500/20 text-cyan-400">
                    <HiCode size={20} />
                  </div>
                  <div className="flex gap-2">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-lg p-2 text-zinc-400 transition-colors hover:bg-white/5 hover:text-cyan-400"
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
                        className="rounded-lg p-2 text-zinc-400 transition-colors hover:bg-white/5 hover:text-cyan-400"
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
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" />
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
                        className="flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2 text-sm text-zinc-300 transition-colors hover:border-cyan-400/50 hover:text-cyan-400"
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
                        className="flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2 text-sm text-zinc-300 transition-colors hover:border-cyan-400/50 hover:text-cyan-400"
                      >
                        <HiExternalLink size={16} />
                        Live Demo
                      </a>
                    )}
                  </div>
                )}
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
