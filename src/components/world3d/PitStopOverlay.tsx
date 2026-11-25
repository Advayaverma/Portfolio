import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  HiBadgeCheck,
  HiDownload,
  HiExternalLink,
  HiMail,
  HiPhone,
  HiRefresh,
} from "react-icons/hi";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import {
  certifications,
  education,
  experience,
  profile,
  projects,
  skills,
} from "../../data/portfolio";

export interface PitStopMeta {
  id: string;
  badge: string;
  label: string;
  progress: number;
  positionClass: string;
}

export const PIT_STOPS: PitStopMeta[] = [
  {
    id: "ignition",
    badge: "START LINE",
    label: "Ignition",
    progress: 0.04,
    positionClass: "items-end justify-start pb-10 md:pb-4",
  },
  {
    id: "about",
    badge: "PIT STOP 01",
    label: "About & Skills",
    progress: 0.26,
    positionClass: "items-start justify-start pt-16 md:pt-18",
  },
  {
    id: "projects",
    badge: "THE GARAGE",
    label: "Projects",
    progress: 0.5,
    positionClass: "items-end justify-end pb-10 md:pb-4 md:pr-10",
  },
  {
    id: "record",
    badge: "TRACK RECORD",
    label: "Experience",
    progress: 0.74,
    positionClass: "items-start justify-end pt-16 md:pt-18 md:pr-10",
  },
  {
    id: "contact",
    badge: "FINISH LINE",
    label: "Contact",
    progress: 0.94,
    positionClass: "items-end justify-center pb-10 md:pb-6",
  },
];

interface PitStopOverlayProps {
  activeStopIndex: number;
  onJumpToStop: (index: number) => void;
}

export function PitStopOverlay({
  activeStopIndex,
  onJumpToStop,
}: PitStopOverlayProps) {
  const [selectedProjectIdx, setSelectedProjectIdx] = useState(0);
  const [recordTab, setRecordTab] = useState<"experience" | "education" | "certs">(
    "experience"
  );
  const [activeSkillCat, setActiveSkillCat] = useState<keyof typeof skills>(
    Object.keys(skills)[0] as keyof typeof skills
  );

  const stop = PIT_STOPS[activeStopIndex] ?? PIT_STOPS[0];
  const selectedProject = projects[selectedProjectIdx] ?? projects[0];
  const skillCategories = Object.keys(skills) as (keyof typeof skills)[];

  return (
    <div
      className={`pointer-events-none fixed inset-4 z-30 flex md:inset-6 ${stop.positionClass}`}
    >
      <motion.div
        layout
        transition={{
          layout: { type: "spring", stiffness: 150, damping: 24 },
        }}
        className="pointer-events-auto w-full rounded-2xl border border-orange-500/30 bg-[#141418]/90 p-5 shadow-[0_18px_50px_rgba(0,0,0,0.65)] backdrop-blur-xl md:w-[430px]"
        data-pit-overlay="true"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={stop.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
          {/* Pit-board Header */}
          <div className="mb-3 flex items-center justify-between border-b border-orange-500/20 pb-2.5">
            <span className="font-number rounded bg-red-600/20 px-2 py-0.5 text-[11px] tracking-widest text-orange-300 ring-1 ring-orange-500/35">
              {stop.badge}
            </span>
            <span className="font-racing text-[11px] uppercase tracking-wider text-zinc-400">
              {stop.label}
            </span>
          </div>

          {/* STOP 0: IGNITION / HERO */}
          {stop.id === "ignition" && (
            <div>
              <h1 className="font-racing text-2xl font-extrabold tracking-tight text-white md:text-3xl">
                <span className="gradient-text">{profile.name}</span>
              </h1>
              <p className="mt-2 text-xs leading-relaxed text-zinc-300 md:text-sm">
                {profile.tagline}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                <a
                  href={profile.resumeFile}
                  download
                  className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-red-600 to-orange-500 px-3.5 py-2 text-xs font-semibold text-white transition-opacity hover:opacity-90"
                >
                  <HiDownload size={14} />
                  Resume
                </a>
                {profile.links.github && (
                  <a
                    href={profile.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-zinc-200 transition-colors hover:border-orange-400/50 hover:text-orange-400"
                  >
                    <FaGithub size={14} />
                    GitHub
                  </a>
                )}
                {profile.links.linkedin && (
                  <a
                    href={profile.links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-zinc-200 transition-colors hover:border-orange-400/50 hover:text-orange-400"
                  >
                    <FaLinkedin size={14} />
                    LinkedIn
                  </a>
                )}
              </div>
            </div>
          )}

          {/* STOP 1: ABOUT & SKILLS */}
          {stop.id === "about" && (
            <div className="space-y-4">
              <p className="line-clamp-4 text-xs leading-relaxed text-zinc-300">
                {profile.summary}
              </p>

              <div className="border-t border-white/10 pt-3">
                <div className="flex flex-wrap gap-1.5">
                  {skillCategories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setActiveSkillCat(cat)}
                      className={`rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors ${
                        activeSkillCat === cat
                          ? "bg-orange-500/25 text-orange-300 ring-1 ring-orange-400/40"
                          : "bg-white/5 text-zinc-400 hover:text-zinc-200"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                <div className="mt-3.5 border-t border-white/5 pt-3 flex flex-wrap gap-2">
                  {skills[activeSkillCat].slice(0, 8).map((skill) => (
                    <span
                      key={skill}
                      className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-zinc-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STOP 2: PROJECTS GARAGE */}
          {stop.id === "projects" && (
            <div className="space-y-3">
              <div className="flex flex-wrap gap-1.5">
                {projects.map((proj, idx) => (
                  <button
                    key={proj.title}
                    type="button"
                    onClick={() => setSelectedProjectIdx(idx)}
                    className={`rounded-lg px-2 py-1 text-[11px] font-medium transition-colors ${
                      selectedProjectIdx === idx
                        ? "bg-gradient-to-r from-red-600/30 to-orange-500/30 text-orange-300 ring-1 ring-orange-400/40"
                        : "bg-white/5 text-zinc-400 hover:text-zinc-200"
                    }`}
                  >
                    {String(idx + 1).padStart(2, "0")}
                  </button>
                ))}
              </div>

              <div>
                <h2 className="font-racing text-sm font-bold text-zinc-100">
                  {selectedProject.title}
                </h2>
                <p className="mt-1.5 line-clamp-3 text-xs leading-relaxed text-zinc-400">
                  {selectedProject.description}
                </p>
                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  {selectedProject.tech.slice(0, 6).map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] text-zinc-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-3 flex gap-2">
                  {selectedProject.github && (
                    <a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-zinc-200 transition-colors hover:border-orange-400/50 hover:text-orange-400"
                    >
                      <FaGithub size={13} />
                      GitHub
                    </a>
                  )}
                  {selectedProject.demo && (
                    <a
                      href={selectedProject.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-zinc-200 transition-colors hover:border-orange-400/50 hover:text-orange-400"
                    >
                      <HiExternalLink size={13} />
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* STOP 3: EXPERIENCE, EDUCATION & CERTIFICATIONS */}
          {stop.id === "record" && (
            <div className="space-y-3">
              <div className="flex gap-1.5">
                {(
                  [
                    { key: "experience", label: "Experience" },
                    { key: "education", label: "Education" },
                    { key: "certs", label: "Certificates" },
                  ] as const
                ).map((tab) => (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setRecordTab(tab.key)}
                    className={`rounded-lg px-2.5 py-1 text-[11px] font-medium transition-colors ${
                      recordTab === tab.key
                        ? "bg-orange-500/25 text-orange-300 ring-1 ring-orange-400/40"
                        : "bg-white/5 text-zinc-400 hover:text-zinc-200"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {recordTab === "experience" && (
                <div className="space-y-2">
                  {experience.map((exp) => (
                    <div key={`${exp.company}-${exp.period}`}>
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="text-sm font-semibold text-zinc-100">
                            {exp.role}
                          </h3>
                          <p className="text-xs text-orange-400">
                            {exp.company} · {exp.location}
                          </p>
                        </div>
                        <span className="shrink-0 text-[11px] text-zinc-500">
                          {exp.period}
                        </span>
                      </div>
                      <ul className="mt-2 space-y-1">
                        {exp.highlights.slice(0, 2).map((h) => (
                          <li
                            key={h.slice(0, 30)}
                            className="flex gap-1.5 text-[11px] leading-relaxed text-zinc-400"
                          >
                            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-orange-400" />
                            <span className="line-clamp-2">{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}

              {recordTab === "education" && (
                <div className="space-y-2">
                  {education.map((edu) => (
                    <div
                      key={`${edu.degree}-${edu.period}`}
                      className="rounded-lg border border-white/5 bg-white/[0.03] px-2.5 py-2"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-xs font-semibold text-zinc-100">
                          {edu.institution}
                        </h3>
                        <span className="shrink-0 text-[10px] text-zinc-500">
                          {edu.period}
                        </span>
                      </div>
                      <p className="mt-0.5 text-[11px] text-orange-400">
                        {edu.degree}
                        {edu.details ? ` · ${edu.details}` : ""}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {recordTab === "certs" && (
                <div className="space-y-2">
                  {certifications.map((cert) => (
                    <div
                      key={cert.title}
                      className="flex items-start gap-2 rounded-lg border border-white/5 bg-white/[0.03] px-2.5 py-2"
                    >
                      <HiBadgeCheck
                        size={16}
                        className="mt-0.5 shrink-0 text-orange-400"
                      />
                      <div>
                        <h3 className="text-xs font-semibold text-zinc-100">
                          {cert.title}
                        </h3>
                        <p className="mt-0.5 text-[11px] text-zinc-400">
                          {cert.issuer} · {cert.date}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* STOP 4: FINISH LINE / CONTACT */}
          {stop.id === "contact" && (
            <div className="space-y-3">
              <p className="text-xs leading-relaxed text-zinc-300">
                Open to software engineering, data engineering, and ML roles.
              </p>

              <div className="space-y-2">
                <a
                  href={`mailto:${profile.email}`}
                  className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-zinc-200 transition-colors hover:border-orange-400/50 hover:text-orange-400"
                >
                  <HiMail size={15} />
                  {profile.email}
                </a>
                <a
                  href={`tel:${profile.phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-zinc-200 transition-colors hover:border-orange-400/50 hover:text-orange-400"
                >
                  <HiPhone size={15} />
                  {profile.phone}
                </a>
              </div>

              <div className="flex items-center justify-between pt-1">
                <div className="flex gap-2">
                  <a
                    href={profile.links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-zinc-300 transition-colors hover:border-orange-400/50 hover:text-orange-400"
                  >
                    <FaLinkedin size={16} />
                  </a>
                  <a
                    href={profile.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-zinc-300 transition-colors hover:border-orange-400/50 hover:text-orange-400"
                  >
                    <FaGithub size={16} />
                  </a>
                  <a
                    href={profile.links.leetcode}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LeetCode"
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-zinc-300 transition-colors hover:border-orange-400/50 hover:text-orange-400"
                  >
                    <SiLeetcode size={16} />
                  </a>
                </div>

                <button
                  type="button"
                  onClick={() => onJumpToStop(0)}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-red-600 to-orange-500 px-3 py-2 text-xs font-semibold text-white transition-opacity hover:opacity-90"
                >
                  <HiRefresh size={14} />
                  Drive again
                </button>
              </div>
            </div>
          )}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
