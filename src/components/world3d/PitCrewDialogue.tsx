import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import * as THREE from "three";
import { HiX } from "react-icons/hi";
import {
  certifications,
  education,
  experience,
  profile,
  projects,
  skills,
} from "../../data/portfolio";
import { roadCurve } from "./roadPath";

export type CarsNpcVariant =
  | "mater"
  | "fillmore"
  | "flo"
  | "doc"
  | "luigi"
  | "ramone"
  | "sally";

export interface PitCrewNPC {
  id: string;
  name: string;
  role: string;
  color: string;
  variant: CarsNpcVariant;
  modelUrl: string;
  targetLength: number;
  position: [number, number, number];
  rotY: number;
  greeting: string;
  qa: { question: string; answer: string }[];
}

function roadsideSpot(
  t: number,
  side: -1 | 1,
  distance = 5.8
): { position: [number, number, number]; rotY: number } {
  const pt = roadCurve.getPointAt(t);
  const tan = roadCurve.getTangentAt(t).normalize();
  const up = new THREE.Vector3(0, 1, 0);
  const right = new THREE.Vector3().crossVectors(tan, up).normalize();
  const pos = pt.clone().addScaledVector(right, side * distance);
  const toRoad = pt.clone().sub(pos).normalize();
  const rotY = Math.atan2(toRoad.x, toRoad.z);
  return { position: [pos.x, 0, pos.z], rotY };
}

const materSpot = roadsideSpot(0.22, -1, 5.8);
const fillmoreSpot = roadsideSpot(0.34, 1, 5.8);
const sallySpot = roadsideSpot(0.42, -1, 5.8);
const docSpot = roadsideSpot(0.52, 1, 5.8);
const luigiSpot = roadsideSpot(0.64, -1, 5.8);
const floSpot = roadsideSpot(0.68, 1, 6.2);
const ramoneSpot = roadsideSpot(0.82, 1, 5.8);

export const PIT_CREW_NPCS: PitCrewNPC[] = [
  {
    id: "mater",
    name: "Mater",
    role: "Tow-Truck Pit Pal",
    color: "#9a5b32",
    variant: "mater",
    modelUrl: "/models/mater.glb",
    targetLength: 3.7,
    ...materSpot,
    greeting:
      "Dad-gum! Welcome to Radiator Springs, McQueen! Ask me about the driver.",
    qa: [
      { question: "Who is Advaya?", answer: profile.summary },
      {
        question: "Where does he study?",
        answer: `${education[0].degree} at ${education[0].institution} (${education[0].period}) — ${education[0].details}.`,
      },
    ],
  },
  {
    id: "fillmore",
    name: "Fillmore",
    role: "Organic Fuel Shop",
    color: "#14b8a6",
    variant: "fillmore",
    modelUrl: "/models/fillmore.glb",
    targetLength: 3.5,
    ...fillmoreSpot,
    greeting:
      "Man, this portfolio runs on pure clean data and organic ML pipelines.",
    qa: [
      {
        question: "What's his ML / AI stack?",
        answer: skills["ML / AI"].join(", "),
      },
      {
        question: "Tell me about his RAG Assistant",
        answer: `${projects[5].title}: ${projects[5].description}`,
      },
    ],
  },
  {
    id: "flo",
    name: "Flo",
    role: "Flo's V8 Café",
    color: "#22d3ee",
    variant: "flo",
    modelUrl: "/models/flo.glb",
    targetLength: 3.6,
    ...floSpot,
    greeting:
      "Welcome to Flo's V8 Café, honey! Need a refuel on Advaya's engineering highlights?",
    qa: [
      {
        question: "What's his Software Engineering background?",
        answer: skills["Software Engineering"].join(", "),
      },
      {
        question: "What DevOps tools does he use?",
        answer: skills.DevOps.join(", "),
      },
    ],
  },
  {
    id: "doc",
    name: "Doc Hudson",
    role: "Fabulous Hudson Hornet · Crew Chief",
    color: "#1e3a8a",
    variant: "doc",
    modelUrl: "/models/doc.glb",
    targetLength: 3.8,
    ...docSpot,
    greeting:
      "Turn right to go left, rookie. Want to inspect the engineering builds under the hood?",
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
    id: "luigi",
    name: "Luigi & Guido",
    role: "Casa Della Tires · Pit Stop",
    color: "#facc15",
    variant: "luigi",
    modelUrl: "/models/luigi.glb",
    targetLength: 2.7,
    ...luigiSpot,
    greeting:
      "Pit stop! Fresh Lightyear tires in 2.5 seconds. Want to check his certifications?",
    qa: [
      {
        question: "What certifications does he have?",
        answer: certifications
          .map((c) => `${c.title} (${c.issuer}, ${c.date})`)
          .join(" · "),
      },
      {
        question: "What Data Engineering tools?",
        answer: skills["Data Engineering"].join(", "),
      },
    ],
  },
  {
    id: "ramone",
    name: "Ramone",
    role: "House of Body Art",
    color: "#9333ea",
    variant: "ramone",
    modelUrl: "/models/ramone.glb",
    targetLength: 3.8,
    ...ramoneSpot,
    greeting:
      "Low and slow, baby. Check out the full-stack and frontend paint job!",
    qa: [
      {
        question: "What Web & Backend skills?",
        answer: skills["Web & Backend"].join(", "),
      },
      {
        question: "Tell me about Digital Library Cloud",
        answer: `${projects[3].title}: ${projects[3].description}`,
      },
    ],
  },
  {
    id: "sally",
    name: "Sally Carrera",
    role: "Cozy Cone · Route 66 Guide",
    color: "#38bdf8",
    variant: "sally",
    modelUrl: "/models/sally.glb",
    targetLength: 3.6,
    ...sallySpot,
    greeting:
      "You made it past the sunset stretch! Want to check his internship experience or reach out?",
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
