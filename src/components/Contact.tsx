import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { HiMail, HiPhone } from "react-icons/hi";
import { profile } from "../data/portfolio";
import { FadeIn } from "./FadeIn";
import { SectionHeading } from "./SectionHeading";

const socialLinks = [
  {
    key: "linkedin" as const,
    label: "LinkedIn",
    icon: FaLinkedin,
    href: profile.links.linkedin,
  },
  {
    key: "github" as const,
    label: "GitHub",
    icon: FaGithub,
    href: profile.links.github,
  },
  {
    key: "leetcode" as const,
    label: "LeetCode",
    icon: SiLeetcode,
    href: profile.links.leetcode,
  },
].filter((link) => link.href);

export function Contact() {
  return (
    <section id="contact" className="px-4 py-20 md:px-6 md:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          title="Get In Touch"
          subtitle="Open to software engineering and ML internship opportunities"
        />

        <FadeIn>
          <div className="glass-card mx-auto max-w-2xl rounded-2xl p-8 text-center md:p-10">
            <p className="text-base text-zinc-400">
              Feel free to reach out — I&apos;d love to connect about
              internships, projects, or collaboration.
            </p>

            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-5 py-3 text-sm text-zinc-300 transition-colors hover:border-cyan-400/50 hover:text-cyan-400"
              >
                <HiMail size={18} />
                {profile.email}
              </a>
              <a
                href={`tel:${profile.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-5 py-3 text-sm text-zinc-300 transition-colors hover:border-cyan-400/50 hover:text-cyan-400"
              >
                <HiPhone size={18} />
                {profile.phone}
              </a>
            </div>

            {socialLinks.length > 0 && (
              <div className="mt-8 flex justify-center gap-4">
                {socialLinks.map(({ key, label, icon: Icon, href }) => (
                  <a
                    key={key}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-zinc-400 transition-all hover:-translate-y-0.5 hover:border-cyan-400/50 hover:text-cyan-400"
                    aria-label={label}
                  >
                    <Icon size={22} />
                  </a>
                ))}
              </div>
            )}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
