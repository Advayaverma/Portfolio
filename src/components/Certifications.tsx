import { HiBadgeCheck } from "react-icons/hi";
import { certifications } from "../data/portfolio";
import { FadeIn } from "./FadeIn";
import { SectionHeading } from "./SectionHeading";

export function Certifications() {
  return (
    <section id="certifications" className="px-4 py-20 md:px-6 md:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          title="Certifications"
          subtitle="Professional credentials"
        />

        <div className="space-y-4">
          {certifications.map((cert, index) => (
            <FadeIn key={cert.title} delay={index * 0.08}>
              <div className="glass-card flex items-start gap-4 rounded-2xl p-6 transition-transform hover:-translate-y-0.5 md:p-8">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/20 to-violet-500/20 text-cyan-400">
                  <HiBadgeCheck size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-zinc-100">
                    {cert.title}
                  </h3>
                  <p className="mt-1 text-sm text-zinc-400">
                    {cert.issuer} &middot; {cert.date}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
