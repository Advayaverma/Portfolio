import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HiX } from "react-icons/hi";
import {
  certifications,
  education,
  experience,
  profile,
  projects,
} from "../../data/portfolio";

export interface PitCrewNPC {
  id: string;
  name: string;
  role: string;
  color: string;
  position: [number, number, number];
  greeting: string;
  qa: { question: string; answer: string }[];
}

export const PIT_CREW_NPCS: PitCrewNPC[] = [
  {
    id: "chief",
    name: "Crew Chief",
    role: "Pit Lane Strategist",
    color: "#e11d2e",
    position: [-6.5, 0, 34],
    greeting:
      "Welcome to Radiator Springs! Ask me about the driver behind #95.",
    qa: [
      {
        question: "Who is Advaya?",
        answer: profile.summary,
      },
      {
        question: "Where does he study?",
        answer: `${education[0].degree} at ${education[0].institution} (${education[0].period}) — ${education[0].details}.`,
      },
      {
        question: "Any certifications?",
        answer: certifications
          .map((c) => `${c.title} (${c.issuer}, ${c.date})`)
          .join(" · "),
      },
    ],
  },
  {
    id: "mechanic",
    name: "Garage Mechanic",
    role: "Lead Systems Builder",
    color: "#f97316",
    position: [8.5, 0, -2],
    greeting:
      "Pop the hood! Want to hear about the AI and Data Engineering builds?",
    qa: [
      {
        question: "Tell me about AI-CDSS",
        answer: `${projects[0].title}: ${projects[0].description}`,
      },
      {
        question: "Tell me about GraphMind",
        answer: `${projects[1].title}: ${projects[1].description}`,
      },
      {
        question: "Tell me about the Lakehouse pipeline",
        answer: `${projects[2].title}: ${projects[2].description}`,
      },
    ],
  },
  {
    id: "scout",
    name: "Track Scout",
    role: "Telemetry & Recruitment",
    color: "#facc15",
    position: [-7.5, 0, -50],
    greeting:
      "You made it to the night stretch! Curious about internship experience or contact?",
    qa: [
      {
        question: "What's his internship experience?",
        answer: `${experience[0].role} at ${experience[0].company} (${experience[0].period}, ${experience[0].location}): ${experience[0].highlights[0]}`,
      },
      {
        question: "How can I contact him?",
        answer: `Email: ${profile.email} · Phone: ${profile.phone}`,
      },
    ],
  },
];

interface PitCrewDialogueProps {
  npc: PitCrewNPC | null;
  onClose: () => void;
}

export function PitCrewDialogue({ npc, onClose }: PitCrewDialogueProps) {
  const [selectedQaIdx, setSelectedQaIdx] = useState<number | null>(null);

  return (
    <AnimatePresence>
      {npc && (
        <motion.div
          key={npc.id}
          initial={{ opacity: 0, y: 20, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.96 }}
          transition={{ duration: 0.22 }}
          className="pointer-events-auto fixed bottom-24 left-1/2 z-40 w-[92vw] max-w-md -translate-x-1/2 rounded-2xl border border-orange-500/35 bg-[#141418]/95 p-5 shadow-[0_20px_50px_rgba(0,0,0,0.75)] backdrop-blur-xl"
        >
          <div className="mb-3 flex items-start justify-between gap-3 border-b border-orange-500/20 pb-2.5">
            <div>
              <span className="font-racing text-xs font-bold uppercase tracking-wider text-orange-400">
                {npc.name}
              </span>
              <p className="text-[11px] text-zinc-400">{npc.role}</p>
            </div>
            <button
              type="button"
              onClick={() => {
                setSelectedQaIdx(null);
                onClose();
              }}
              className="rounded-lg p-1 text-zinc-400 transition-colors hover:bg-white/10 hover:text-white"
              aria-label="Close dialogue"
            >
              <HiX size={18} />
            </button>
          </div>

          <p className="text-xs leading-relaxed text-zinc-200">
            {selectedQaIdx !== null && npc.qa[selectedQaIdx]
              ? npc.qa[selectedQaIdx].answer
              : npc.greeting}
          </p>

          <div className="mt-3.5 space-y-1.5">
            {npc.qa.map((item, idx) => (
              <button
                key={item.question}
                type="button"
                onClick={() => setSelectedQaIdx(idx)}
                className={`w-full rounded-lg border px-3 py-2 text-left text-xs transition-colors ${
                  selectedQaIdx === idx
                    ? "border-orange-400/60 bg-orange-500/20 text-orange-200"
                    : "border-white/10 bg-white/5 text-zinc-300 hover:border-orange-400/40 hover:text-white"
                }`}
              >
                &rsaquo; {item.question}
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
