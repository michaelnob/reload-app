import type { Goal } from "@/types/intake";

export interface Prescription {
  scheme: string;
  rest: string;
}

type PrescriptionGoal = Exclude<Goal, "">;
export type PrescriptionBlockKind = "compound" | "accessory" | "core" | "conditioning" | "skill";
type NonSkillBlockKind = Exclude<PrescriptionBlockKind, "skill">;

const SKILL_PRESCRIPTION: Prescription = {
  scheme: "Skill / Drills",
  rest: "As needed",
};

const PRESCRIPTION_TABLE: Record<PrescriptionGoal, Record<NonSkillBlockKind, Prescription>> = {
  strength: {
    compound: { scheme: "3–5 × 4–6", rest: "2–3 min" },
    accessory: { scheme: "3–4 × 6–10", rest: "90 sec" },
    core: { scheme: "3 × 30–45 sec hold", rest: "45 sec" },
    conditioning: { scheme: "2–3 easy rounds, finisher only", rest: "45–60 sec" },
  },
  aesthetics: {
    compound: { scheme: "3–4 × 8–12", rest: "60–90 sec" },
    accessory: { scheme: "3–4 × 10–15", rest: "45–60 sec" },
    core: { scheme: "3 × 12–15", rest: "45 sec" },
    conditioning: { scheme: "2–3 rounds, light finisher", rest: "45–60 sec" },
  },
  "weight-loss": {
    compound: { scheme: "3 × 10–15", rest: "45–60 sec" },
    accessory: { scheme: "3 × 12–15", rest: "30–45 sec" },
    core: { scheme: "3 × 15", rest: "30 sec" },
    conditioning: { scheme: "3–4 rounds intervals", rest: "30–45 sec" },
  },
  conditioning: {
    compound: { scheme: "3–4 rounds × intervals", rest: "45–60 sec" },
    accessory: { scheme: "3–4 rounds × intervals", rest: "45–60 sec" },
    core: { scheme: "3 rounds × 30–45 sec, circuit-style", rest: "30–45 sec" },
    conditioning: { scheme: "3–4 rounds × intervals", rest: "45–60 sec" },
  },
  athleticism: {
    compound: { scheme: "4–5 × 3–5 (explosive/power)", rest: "2–3 min" },
    accessory: { scheme: "3 × 6–10", rest: "90 sec" },
    core: { scheme: "3 × 10–12 rotational/anti-rotation", rest: "45–60 sec" },
    conditioning: { scheme: "agility/mobility drills, 3–4 rounds", rest: "60 sec" },
  },
  general: {
    compound: { scheme: "3–4 × 8–12", rest: "60–90 sec" },
    accessory: { scheme: "3 × 10–12", rest: "60 sec" },
    core: { scheme: "3 × 12–15", rest: "45 sec" },
    conditioning: { scheme: "2–3 rounds", rest: "60 sec" },
  },
};

export function getPrescription(goal: PrescriptionGoal, blockKind: PrescriptionBlockKind): Prescription {
  if (blockKind === "skill") {
    return SKILL_PRESCRIPTION;
  }

  return PRESCRIPTION_TABLE[goal][blockKind];
}
