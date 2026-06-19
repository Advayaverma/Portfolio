import { useState } from "react";
import { HiChevronDown } from "react-icons/hi";
import { education } from "../data/portfolio";
import { FadeIn } from "./FadeIn";
import { SectionHeading } from "./SectionHeading";

export function Education() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  return (
    <section id="education" className="px-4 py-20 md:px-6 md:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          title="Education"
          subtitle="Academic background and coursework"
        />

        <div className="space-y-4">
          {education.map((item, index) => {
            const hasCoursework = item.coursework.length > 0;
            const isExpanded = expandedIndex === index;

            return (
              <FadeIn key={`${item.degree}-${item.period}`} delay={index * 0.08}>
                <div className="glass-card rounded-2xl p-6 transition-transform hover:-translate-y-0.5 md:p-8">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-zinc-100">
                        {item.institution}
                      </h3>
                      <p className="mt-1 text-sm text-cyan-400">{item.degree}</p>
                      {item.details && (
                        <p className="mt-1 text-sm text-zinc-400">
                          {item.details}
                        </p>
                      )}
                    </div>
                    <span className="shrink-0 text-sm text-zinc-500">
                      {item.period}
                    </span>
                  </div>

                  {hasCoursework && (
                    <>
                      <button
                        type="button"
                        onClick={() =>
                          setExpandedIndex(isExpanded ? null : index)
                        }
                        className="mt-4 flex items-center gap-1 text-sm text-zinc-400 transition-colors hover:text-cyan-400"
                      >
                        Relevant Coursework
                        <HiChevronDown
                          size={16}
                          className={`transition-transform ${isExpanded ? "rotate-180" : ""}`}
                        />
                      </button>

                      {isExpanded && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {item.coursework.map((course) => (
                            <span
                              key={course}
                              className="rounded-md bg-white/5 px-3 py-1 text-xs text-zinc-400"
                            >
                              {course}
                            </span>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
