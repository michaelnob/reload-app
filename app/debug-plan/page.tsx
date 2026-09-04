import { generatePlan } from "@/lib/planGenerator";

const SAMPLES = [
  {
    name: "Strength / Full-Body / 3-day",
    intake: {
      fitnessGoal: "strength" as const,
      daysPerWeek: 3,
      trainingSplit: "full-body" as const,
      favoriteActivities: ["Weightlifting"],
      favoriteActivityOther: "",
      trainingMethods: ["Strength training"],
    },
  },
  {
    name: "Combat Sport / Sport-Specific / 5-day",
    intake: {
      fitnessGoal: "conditioning" as const,
      daysPerWeek: 5,
      trainingSplit: "sport-specific" as const,
      favoriteActivities: ["Wrestling", "Sprints"],
      favoriteActivityOther: "",
      trainingMethods: ["Combat sport", "Strength training"],
    },
  },
  {
    name: "Hypertrophy / Push-Pull-Legs / 4-day",
    intake: {
      fitnessGoal: "hypertrophy" as const,
      daysPerWeek: 4,
      trainingSplit: "push-pull-legs" as const,
      favoriteActivities: ["Conditioning / circuits"],
      favoriteActivityOther: "",
      trainingMethods: ["Cardio / endurance"],
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
