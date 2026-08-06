import { HiBriefcase } from "react-icons/hi";
import { experience } from "../data/portfolio";
import { FadeIn } from "./FadeIn";
import { SectionHeading } from "./SectionHeading";

export function Experience() {
  return (
    <section id="experience" className="px-4 py-20 md:px-6 md:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          title="Experience"
          subtitle="Professional work and internships"
        />

        <div className="space-y-8">
          {experience.map((item, index) => (
            <FadeIn key={`${item.company}-${item.period}`} delay={index * 0.1}>
              <article className="glass-card rounded-2xl p-6 transition-transform hover:-translate-y-0.5 md:p-8">
                <div className="mb-4 flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500/20 to-violet-500/20 text-cyan-400">
                    <HiBriefcase size={20} />
                  </div>
                  <div className="flex flex-1 flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-zinc-100">
                        {item.role}
                      </h3>
                      <p className="mt-1 text-sm text-cyan-400">{item.company}</p>
                      {item.location && (
                        <p className="mt-1 text-sm text-zinc-500">{item.location}</p>
                      )}
                    </div>
                    <span className="shrink-0 text-sm text-zinc-500">
                      {item.period}
                    </span>
                  </div>
                </div>

                <ul className="space-y-2">
                  {item.highlights.map((highlight) => (
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
                  {item.tech.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full bg-white/5 px-3 py-1 text-xs text-zinc-400"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
