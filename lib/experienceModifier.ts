import type { SportHistory } from "@/types/intake";

export type ExperienceTier = "low" | "moderate" | "high";

export const SPORT_TAG_TO_HIGH_SCHOOL_SPORT: Record<string, string> = {
  wrestling: "Wrestling",
  "combat-sports": "Wrestling",
  sprinting: "Track & Field",
  swimming: "Swim & Dive",
};

export function getExperienceTier(years: number): ExperienceTier {
  if (years >= 4) {
    return "high";
  }
  if (years >= 2) {
    return "moderate";
  }
  return "low";
}

export function getGlobalExperienceNote(tier: ExperienceTier): string {
  switch (tier) {
    case "low":
      return "You're rebuilding a foundation — favor the lower end of these ranges and prioritize form as you get back into training.";
    case "moderate":
      return "You've got a solid training base to work from — these ranges should feel achievable within a few weeks of consistency.";
    case "high":
      return "You've got a real training background — feel free to push toward the higher end of these ranges from week one.";
  }
}

export function getSkillNoteOverride(tier: ExperienceTier): string {
  switch (tier) {
    case "low":
      return "Note: less experience in this specific sport — start conservative with these drills.";
    case "moderate":
      return "Note: moderate experience in this specific sport.";
    case "high":
      return "Note: strong background in this specific sport — feel free to push intensity here.";
  }
}

export function getGlobalExperienceTier(highSchoolSports: SportHistory[]): ExperienceTier | undefined {
  if (highSchoolSports.length === 0) {
    return undefined;
  }

  const highestYears = Math.max(...highSchoolSports.map((sport) => sport.years ?? 0));
  return getExperienceTier(highestYears);
}
