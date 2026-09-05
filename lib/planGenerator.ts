import type { IntakeData } from "@/types/intake";

export type GoalKey = "strength" | "hypertrophy" | "conditioning" | "general";

export type SplitKey =
  | "full-body"
  | "upper-lower"
  | "push-pull-legs"
  | "sport-specific";

export type BlockKind =
  | "strength"
  | "hypertrophy"
  | "conditioning"
  | "skill"
  | "core";

export interface Block {
  kind: BlockKind;
  name: string;
  scheme: string;
  rest: string;
  notes?: string;
}

export interface Day {
  label: string;
  focus: string;
  blocks: Block[];
}

export interface Plan {
  goal: GoalKey;
  goalLabel: string;
  daysPerWeek: number;
  split: SplitKey;
  days: Day[];
}

export type SlotCategory = "compound" | "accessory" | "core" | "conditioning";

interface GoalTemplate {
  key: GoalKey;
  label: string;
  presets: {
    sets: string;
    reps: string;
    rest: string;
  };
  slots: Record<SlotCategory, string[]>;
}

const GOAL_TEMPLATES: Record<GoalKey, GoalTemplate> = {
  strength: {
    key: "strength",
    label: "Strength",
    presets: { sets: "3–5", reps: "4–6", rest: "2–3 min" },
    slots: {
      compound: ["Barbell Squat", "Deadlift", "Bench Press", "Overhead Press", "Barbell Row"],
      accessory: ["Dumbbell Row", "Walking Lunge", "Lat Pulldown", "Chest Fly", "Romanian Deadlift"],
      core: ["Plank", "Hanging Knee Raise", "Cable Woodchopper", "Ab Wheel Rollout"],
      conditioning: ["Sled Push", "Farmer's Carry", "Kettlebell Swing", "Battle Ropes"],
    },
  },
  hypertrophy: {
    key: "hypertrophy",
    label: "Hypertrophy",
    presets: { sets: "3–4", reps: "8–12", rest: "60–90 sec" },
    slots: {
      compound: ["Squat", "Bench Press", "Romanian Deadlift", "Incline Press", "Seated Cable Row"],
      accessory: ["Lateral Raise", "Bicep Curl", "Tricep Pushdown", "Chest Fly", "Leg Extension"],
      core: ["Plank", "Cable Crunch", "Hanging Leg Raise", "Russian Twist"],
      conditioning: ["Jump Rope", "Assault Bike Sprints", "Kettlebell Swing", "Rowing Intervals"],
    },
  },
  conditioning: {
    key: "conditioning",
    label: "Conditioning",
    presets: { sets: "3–4 rounds", reps: "intervals", rest: "45–60 sec between rounds" },
    slots: {
      compound: ["Front Squat", "Power Clean", "Push Press", "Clean & Jerk", "Trap Bar Deadlift"],
      accessory: ["Box Jump", "Sled Drag", "Sandbag Carry", "Med Ball Slams"],
      core: ["Plank", "Dead Bug", "Hollow Hold", "Side Plank"],
      conditioning: ["Sprint Intervals", "Rowing Intervals", "Assault Bike Sprints", "Burpee Ladders"],
    },
  },
  general: {
    key: "general",
    label: "Get Back in Shape",
    presets: { sets: "3–4", reps: "8–12", rest: "60–90 sec" },
    slots: {
      compound: ["Goblet Squat", "Dumbbell Bench Press", "Kettlebell Deadlift", "Seated Cable Row", "Dumbbell Shoulder Press"],
      accessory: ["Lat Pulldown", "Walking Lunge", "Chest Fly", "Face Pull", "Leg Press"],
      core: ["Plank", "Bird Dog", "Dead Bug", "Pallof Press"],
      conditioning: ["Rowing Intervals", "Assault Bike Sprints", "Walking Lunge Carry", "Jump Rope"],
    },
  },
};

const DAY_LABELS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const ACTIVITY_MAP: Record<string, { slot: "conditioning"; name: string }> = {
  "sprints": { slot: "conditioning", name: "Sprint Intervals" },
  "distance running": { slot: "conditioning", name: "Distance Running" },
  "weightlifting": { slot: "conditioning", name: "Loading Work" },
  "agility drills": { slot: "conditioning", name: "Agility Drills" },
  "team practices": { slot: "conditioning", name: "Team-Style Conditioning" },
  "game-day competition": { slot: "conditioning", name: "Competitive Conditioning" },
  "wrestling": { slot: "conditioning", name: "Wrestling Drills" },
  "conditioning / circuits": { slot: "conditioning", name: "Conditioning Circuits" },
};

const METHOD_SLOT: Record<string, Exclude<SlotCategory, "core">> = {
  "strength training": "compound",
  "cardio / endurance": "conditioning",
  "specific sport skill work": "conditioning",
  "combat sport": "conditioning",
  "mixed / variety": "compound",
};

const FALLBACK = "Bodyweight Circuit";

function resolve(name: string): string {
  return name.trim();
}

function conditionName(template: GoalTemplate, intake: IntakeData): string {
  const method = intake.trainingMethods.find(
    (m) => METHOD_SLOT[m.toLowerCase()] === "conditioning"
  );
  if (method) {
    const mapped = ACTIVITY_MAP[method.toLowerCase()];
    if (mapped) return mapped.name;
  }
  const activity = intake.favoriteActivities.find(
    (a) => ACTIVITY_MAP[a.toLowerCase()]?.slot === "conditioning"
  );
  if (activity) return ACTIVITY_MAP[activity.toLowerCase()].name;
  return template.slots.conditioning[0] ?? FALLBACK;
}

function pickCompound(template: GoalTemplate, intake: IntakeData): string {
  if (
    intake.trainingMethods.some((m) => METHOD_SLOT[m.toLowerCase()] === "compound")
  ) {
    return template.slots.compound[0] ?? FALLBACK;
  }
  return template.slots.compound[0] ?? FALLBACK;
}

function strengthKind(template: GoalTemplate): BlockKind {
  return template.key === "hypertrophy" ? "hypertrophy" : "strength";
}

function strengthBlock(
  template: GoalTemplate,
  name: string,
  extra?: Partial<Block>
): Block {
  return {
    kind: strengthKind(template),
    name: resolve(name),
    scheme: template.presets.sets + " × " + template.presets.reps,
    rest: template.presets.rest,
    ...extra,
  };
}

function conditioningBlock(
  template: GoalTemplate,
  name: string,
  extra?: Partial<Block>
): Block {
  return {
    kind: "conditioning",
    name: resolve(name),
    scheme: template.presets.sets + " × " + template.presets.reps,
    rest: template.presets.rest,
    ...extra,
  };
}

function skillBlock(template: GoalTemplate): Block {
  return {
    kind: "skill",
    name: template.key === "conditioning" ? "Conditioning Drills" : "Sport-Specific Skill Work",
    scheme: "Skill / Drills",
    rest: "As needed",
    notes: "Focus on movement quality and sport transfer.",
  };
}

function dayFromBlocks(index: number, focus: string, blocks: Block[]): Day {
  return {
    label: DAY_LABELS[index % DAY_LABELS.length],
    focus,
    blocks,
  };
}

function planFullBody(days: number, template: GoalTemplate, intake: IntakeData): Day[] {
  return Array.from({ length: days }, (_, i) => {
    const blocks: Block[] = [
      strengthBlock(template, pickCompound(template, intake)),
      strengthBlock(
        template,
        template.slots.compound[Math.min(1, template.slots.compound.length - 1)]
      ),
      strengthBlock(template, template.slots.accessory[0] ?? FALLBACK),
    ];
    if (template.key === "strength" || template.key === "general") {
      blocks.push(strengthBlock(template, template.slots.core[0] ?? FALLBACK, { kind: "core" }));
    }
    if (i % 2 === 0) {
      blocks.push(conditioningBlock(template, conditionName(template, intake)));
    }
    return dayFromBlocks(i, "Full Body", blocks);
  });
}

function planUpperLower(days: number, template: GoalTemplate, intake: IntakeData): Day[] {
  return Array.from({ length: days }, (_, i) => {
    const upper = i % 2 === 0;
    const blocks: Block[] = upper
      ? [
          strengthBlock(template, template.slots.compound[1] ?? template.slots.compound[0]),
          strengthBlock(template, template.slots.accessory[0] ?? FALLBACK),
        ]
      : [
          strengthBlock(template, template.slots.compound[0]),
          strengthBlock(template, template.slots.accessory[1] ?? template.slots.accessory[0]),
        ];
    if (i >= 2) {
      blocks.push(conditioningBlock(template, conditionName(template, intake)));
    }
    return dayFromBlocks(i, upper ? "Upper" : "Lower", blocks);
  });
}

function planPushPullLegs(days: number, template: GoalTemplate, intake: IntakeData): Day[] {
  const rotation: { focus: string; blocks: Block[] }[] = [
    {
      focus: "Push",
      blocks: [
        strengthBlock(template, template.slots.compound[1] ?? template.slots.compound[0]),
        strengthBlock(template, template.slots.accessory[0] ?? FALLBACK),
      ],
    },
    {
      focus: "Pull",
      blocks: [
        strengthBlock(template, template.slots.compound[3] ?? template.slots.compound[0]),
        strengthBlock(template, template.slots.accessory[1] ?? template.slots.accessory[0]),
      ],
    },
    {
      focus: "Legs",
      blocks: [
        strengthBlock(template, template.slots.compound[0]),
        strengthBlock(template, template.slots.accessory[2] ?? template.slots.accessory[0]),
      ],
    },
  ];

  return Array.from({ length: days }, (_, i) => {
    const base = rotation[i % rotation.length];
    const blocks = [...base.blocks];
    if (i >= 3) {
      blocks.push(conditioningBlock(template, conditionName(template, intake)));
    }
    return dayFromBlocks(i, base.focus, blocks);
  });
}

function planSportSpecific(days: number, template: GoalTemplate, intake: IntakeData): Day[] {
  return Array.from({ length: days }, (_, i) => {
    const isSkillDay = i % 2 === 1;
    const blocks: Block[] = [
      strengthBlock(template, pickCompound(template, intake)),
      strengthBlock(template, template.slots.accessory[0] ?? FALLBACK),
    ];
    if (isSkillDay) {
      blocks.push(skillBlock(template));
    } else {
      blocks.push(conditioningBlock(template, conditionName(template, intake)));
    }
    return dayFromBlocks(i, isSkillDay ? "Hybrid — Strength + Skill" : "Strength + Conditioning", blocks);
  });
}

function resolveGoal(goal: IntakeData["primaryGoal"]): GoalKey {
  switch (goal) {
    case "strength":
      return "strength";
    case "conditioning":
      return "conditioning";
    default:
      return "general";
  }
}

function resolveSplit(split: IntakeData["trainingSplit"]): SplitKey {
  switch (split) {
    case "upper-lower":
    case "push-pull-legs":
      return split;
    case "full-body":
      return "full-body";
    default:
      return "full-body";
  }
}

export function generatePlan(intake: IntakeData): Plan {
  const goal = resolveGoal(intake.primaryGoal);
  const split = resolveSplit(intake.trainingSplit);
  const days = intake.daysPerWeek === null || intake.daysPerWeek < 1 ? 3 : Math.min(intake.daysPerWeek, 7);
  const template = GOAL_TEMPLATES[goal];

  let daysOut: Day[];
  switch (split) {
    case "upper-lower":
      daysOut = planUpperLower(days, template, intake);
      break;
    case "push-pull-legs":
      daysOut = planPushPullLegs(days, template, intake);
      break;
    case "sport-specific":
      daysOut = planSportSpecific(days, template, intake);
      break;
    case "full-body":
    default:
      daysOut = planFullBody(days, template, intake);
      break;
  }

  const wantsStrength = intake.trainingMethods.some((m) =>
    m.toLowerCase().includes("strength")
  );
  const wantsCombat = intake.trainingMethods.some((m) =>
    m.toLowerCase().includes("combat")
  );
  const hasFavoriteStrengthActivity = intake.favoriteActivities.some((a) =>
    a.toLowerCase() === "weightlifting"
  );

  if (wantsStrength && goal !== "strength" && (hasFavoriteStrengthActivity || days < 4)) {
    daysOut = daysOut.map((d) => ({
      ...d,
      blocks: d.blocks.map((b) =>
        b.kind === "strength"
          ? { ...b, scheme: "3–5 × 4–6", rest: "2–3 min" }
          : b
      ),
    }));
  }

  if (wantsCombat) {
    daysOut = daysOut.map((d, i) => {
      if (i >= 2 && i % 2 === 0) {
        return {
          ...d,
          blocks: [
            ...d.blocks,
            conditioningBlock(template, "Combat Sport Drills", {
              notes: "Finisher — light sparring / drills for 8–10 min.",
            }),
          ],
        };
      }
      return d;
    });
  }

  return {
    goal,
    goalLabel: template.label,
    daysPerWeek: days,
    split,
    days: daysOut,
  };
}
