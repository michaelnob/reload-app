import { generatePlan } from "@/lib/planGenerator";
import type { IntakeData } from "@/types/intake";

const BASE_INTAKE: IntakeData = {
  name: "Debug Athlete",
  age: 30,
  sex: "prefer-not-to-say",
  heightFt: 5,
  heightIn: 10,
  weight: 180,
  highSchoolSports: [{ name: "Football", years: 4 }],
  otherSport: "",
  favoriteActivities: [],
  favoriteActivityOther: "",
  primaryGoal: "general",
  primaryAestheticsAreas: [],
  secondaryGoal: "",
  secondaryAestheticsAreas: [],
  daysPerWeek: 3,
  hoursPerDay: 1,
  trainingSplit: "full-body",
  trainingMethods: [],
  sportSkillSports: [],
  sportSkillOther: "",
  trainingRestrictions: "",
  dietPlan: "none",
  dietPlanOther: "",
  dietaryRestrictions: "",
};

const SAMPLES: { name: string; intake: IntakeData }[] = [
  {
    name: "Strength / Full-Body / 3-day",
    intake: {
      ...BASE_INTAKE,
      primaryGoal: "strength",
      daysPerWeek: 3,
      trainingSplit: "full-body" as const,
      favoriteActivities: ["Weightlifting"],
      trainingMethods: ["Free weight training"],
    },
  },
  {
    name: "Sport Skill / Athletic Hybrid / 5-day",
    intake: {
      ...BASE_INTAKE,
      primaryGoal: "conditioning",
      daysPerWeek: 5,
      trainingSplit: "athletic-hybrid",
      favoriteActivities: ["Sprinting"],
      trainingMethods: ["Free weight training", "Sport-specific skill work"],
      sportSkillSports: ["Wrestling"],
    },
  },
  {
    name: "Aesthetics / Push-Pull-Legs / 4-day",
    intake: {
      ...BASE_INTAKE,
      primaryGoal: "aesthetics",
      daysPerWeek: 4,
      trainingSplit: "push-pull-legs" as const,
      favoriteActivities: ["Calisthenics"],
      trainingMethods: ["Cardio"],
    },
  },
];

export default function DebugPlanPage() {
  return (
    <div className="min-h-screen bg-zinc-50 p-6 font-sans dark:bg-black">
      <main className="mx-auto max-w-4xl space-y-10">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          Plan Generator Debug
        </h1>
        {SAMPLES.map((sample) => {
          const plan = generatePlan(sample.intake);
          return (
            <section
              key={sample.name}
              className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900"
            >
              <h2 className="mb-3 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                {sample.name}
              </h2>
              <details className="mb-3">
                <summary className="cursor-pointer text-sm text-zinc-500 dark:text-zinc-400">
                  Input intake object
                </summary>
                <pre className="mt-2 overflow-x-auto rounded-lg bg-zinc-100 p-3 text-xs text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
                  {JSON.stringify(sample.intake, null, 2)}
                </pre>
              </details>
              <pre className="overflow-x-auto rounded-lg bg-zinc-900 p-4 text-xs leading-relaxed text-zinc-100 dark:bg-black">
                {JSON.stringify(plan, null, 2)}
              </pre>
            </section>
          );
        })}
      </main>
    </div>
  );
}
