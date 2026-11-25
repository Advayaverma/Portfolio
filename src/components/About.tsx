import { profile } from "../data/portfolio";
import { FadeIn } from "./FadeIn";
import { SectionHeading } from "./SectionHeading";
import SpotlightCard from "./reactbits/SpotlightCard";

export function About() {
  return (
    <section id="about" className="px-4 py-20 md:px-6 md:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading title="About Me" subtitle="Who I am and what I do" />
        <FadeIn>
          <SpotlightCard
            spotlightColor="rgba(249, 115, 22, 0.22)"
            className="glass-card mx-auto max-w-3xl rounded-2xl p-8 md:p-10"
          >
            <p className="text-center text-base leading-relaxed text-zinc-300 md:text-lg">
              {profile.summary}
            </p>
          </SpotlightCard>
        </FadeIn>
      </div>
    </section>
  );
}
