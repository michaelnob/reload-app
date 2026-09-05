"use client";

import { useState } from "react";

interface IntakeData {
  age: number | null;
  heightFt: number | null;
  heightIn: number | null;
  weight: number | null;
  sex: "male" | "female" | "other" | "prefer-not-to-say" | "";
  highSchoolSports: string[];
  otherSport: string;
  favoriteActivities: string[];
  favoriteActivityOther: string;
  fitnessGoal: "strength" | "hypertrophy" | "conditioning" | "general" | "";
  daysPerWeek: number | null;
  trainingSplit: "full-body" | "upper-lower" | "push-pull-legs" | "sport-specific" | "";
  trainingMethods: string[];
  dietPreference: "no-restriction" | "vegetarian" | "high-protein" | "other" | "";
}

const INITIAL_DATA: IntakeData = {
  age: null,
  heightFt: null,
  heightIn: null,
  weight: null,
  sex: "",
  highSchoolSports: [],
  otherSport: "",
  favoriteActivities: [],
  favoriteActivityOther: "",
  fitnessGoal: "",
  daysPerWeek: null,
  trainingSplit: "",
  trainingMethods: [],
  dietPreference: "",
};

const SPORTS = [
  "Football",
  "Basketball",
  "Baseball",
  "Soccer",
  "Track & Field",
  "Wrestling",
  "Swimming",
  "Volleyball",
  "Tennis",
];

const ACTIVITIES = [
  "Sprints",
  "Distance running",
  "Weightlifting",
  "Agility drills",
  "Team practices",
  "Game-day competition",
  "Conditioning / circuits",
];

const METHODS = [
  "Strength training",
  "Cardio / endurance",
  "Specific sport skill work",
  "Combat sport",
  "Mixed / variety",
];

const STEPS = [
  { title: "About You", description: "Basic info" },
  { title: "HS Sports", description: "Your athletic background" },
  { title: "Goals", description: "What you're training for" },
  { title: "Preferences", description: "How you like to train" },
  { title: "Diet", description: "Fueling your training" },
  { title: "Review", description: "Confirm your info" },
];

function toggleArrayItem(arr: string[], item: string): string[] {
  return arr.includes(item) ? arr.filter((i) => i !== item) : [...arr, item];
}

export default function GetStartedPage() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<IntakeData>(INITIAL_DATA);

  const update = <K extends keyof IntakeData>(field: K, value: IntakeData[K]) =>
    setData((prev) => ({ ...prev, [field]: value }));

  const isStepValid = (): boolean => {
    switch (step) {
      case 0:
        return (
          data.age !== null &&
          data.age > 0 &&
          (data.heightFt !== null || data.heightIn !== null) &&
          data.weight !== null &&
          data.weight > 0 &&
          data.sex !== ""
        );
      case 1:
        return data.highSchoolSports.length > 0 || data.otherSport.trim() !== "";
      case 2:
        return data.fitnessGoal !== "" && data.daysPerWeek !== null && data.daysPerWeek >= 1 && data.daysPerWeek <= 7;
      case 3:
        return data.trainingSplit !== "" && data.trainingMethods.length > 0;
      case 4:
        return data.dietPreference !== "";
      default:
        return true;
    }
  };

  const next = () => {
    if (step < STEPS.length - 1 && isStepValid()) setStep(step + 1);
  };

  const back = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleSubmit = () => {
    console.log("Intake form data:", data);
    alert("Form submitted! Check the console for your data.");
  };

  const labelClass = "block text-sm font-medium mb-1.5";
  const inputClass =
    "w-full rounded-lg border border-zinc-300 bg-white px-3.5 py-2.5 text-base outline-none transition-colors focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-zinc-400 dark:focus:ring-zinc-400/10";
  const radioCardClass = (selected: boolean) =>
    `flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 text-left transition-all ${
      selected
        ? "border-zinc-900 bg-zinc-900/5 ring-2 ring-zinc-900/10 dark:border-zinc-400 dark:bg-zinc-400/10 dark:ring-zinc-400/20"
        : "border-zinc-200 bg-white hover:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:border-zinc-500"
    }`;
  const checkboxClass = (checked: boolean) =>
    `flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-2.5 text-left transition-all ${
      checked
        ? "border-zinc-900 bg-zinc-900/5 ring-2 ring-zinc-900/10 dark:border-zinc-400 dark:bg-zinc-400/10 dark:ring-zinc-400/20"
        : "border-zinc-200 bg-white hover:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:border-zinc-500"
    }`;

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="age" className={labelClass}>
                  Age
                </label>
                <input
                  id="age"
                  type="number"
                  min={14}
                  max={100}
                  placeholder="e.g. 28"
                  className={inputClass}
                  value={data.age ?? ""}
                  onChange={(e) => update("age", e.target.value ? Number(e.target.value) : null)}
                />
              </div>
              <div>
                <label htmlFor="weight" className={labelClass}>
                  Weight (lbs)
                </label>
                <input
                  id="weight"
                  type="number"
                  min={80}
                  max={500}
                  placeholder="e.g. 185"
                  className={inputClass}
                  value={data.weight ?? ""}
                  onChange={(e) => update("weight", e.target.value ? Number(e.target.value) : null)}
                />
              </div>
            </div>
            <div>
              <label className={labelClass}>Height</label>
              <div className="grid grid-cols-2 gap-3">
                <div className="relative">
                  <input
                    id="heightFt"
                    type="number"
                    min={3}
                    max={8}
                    placeholder="ft"
                    className={inputClass}
                    value={data.heightFt ?? ""}
                    onChange={(e) => update("heightFt", e.target.value ? Number(e.target.value) : null)}
                  />
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-zinc-400">
                    ft
                  </span>
                </div>
                <div className="relative">
                  <input
                    id="heightIn"
                    type="number"
                    min={0}
                    max={11}
                    placeholder="in"
                    className={inputClass}
                    value={data.heightIn ?? ""}
                    onChange={(e) => update("heightIn", e.target.value ? Number(e.target.value) : null)}
                  />
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-zinc-400">
                    in
                  </span>
                </div>
              </div>
            </div>
            <div>
              <label htmlFor="sex" className={labelClass}>
                Sex
              </label>
              <select
                id="sex"
                className={inputClass}
                value={data.sex}
                onChange={(e) => update("sex", e.target.value as IntakeData["sex"])}
              >
                <option value="">Select...</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                <option value="prefer-not-to-say">Prefer not to say</option>
              </select>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label className={labelClass}>Which sports did you play in high school?</label>
              <div className="grid grid-cols-2 gap-2">
                {SPORTS.map((sport) => {
                  const checked = data.highSchoolSports.includes(sport);
                  return (
                    <label key={sport} className={checkboxClass(checked)}>
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-zinc-300 accent-zinc-900 dark:border-zinc-600 dark:accent-zinc-400"
                        checked={checked}
                        onChange={() => update("highSchoolSports", toggleArrayItem(data.highSchoolSports, sport))}
                      />
                      <span className="text-sm">{sport}</span>
                    </label>
                  );
                })}
              </div>
              <div className="mt-2">
                <label className={checkboxClass(data.otherSport.trim() !== "")}>
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-zinc-300 accent-zinc-900 dark:border-zinc-600 dark:accent-zinc-400"
                    checked={data.otherSport.trim() !== ""}
                    onChange={() => update("otherSport", data.otherSport.trim() !== "" ? "" : "")}
                  />
                  <span className="text-sm">Other</span>
                </label>
                {data.otherSport.trim() !== "" || true ? (
                  <input
                    type="text"
                    placeholder="Type your sport..."
                    className={`${inputClass} mt-2`}
                    value={data.otherSport}
                    onChange={(e) => update("otherSport", e.target.value)}
                  />
                ) : null}
              </div>
            </div>
            <div>
              <label className={labelClass}>Favorite athletic activities</label>
              <p className="mb-2 text-xs text-zinc-500 dark:text-zinc-400">
                What did you enjoy most?
              </p>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {ACTIVITIES.map((activity) => {
                  const checked = data.favoriteActivities.includes(activity);
                  return (
                    <label key={activity} className={checkboxClass(checked)}>
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-zinc-300 accent-zinc-900 dark:border-zinc-600 dark:accent-zinc-400"
                        checked={checked}
                        onChange={() =>
                          update("favoriteActivities", toggleArrayItem(data.favoriteActivities, activity))
                        }
                      />
                      <span className="text-sm">{activity}</span>
                    </label>
                  );
                })}
              </div>
              <div className="mt-2">
                <label className={checkboxClass(data.favoriteActivityOther.trim() !== "")}>
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-zinc-300 accent-zinc-900 dark:border-zinc-600 dark:accent-zinc-400"
                    checked={data.favoriteActivityOther.trim() !== ""}
                    onChange={() =>
                      update("favoriteActivityOther", data.favoriteActivityOther.trim() !== "" ? "" : "")
                    }
                  />
                  <span className="text-sm">Other</span>
                </label>
                {data.favoriteActivityOther.trim() !== "" || true ? (
                  <input
                    type="text"
                    placeholder="Describe what you enjoyed..."
                    className={`${inputClass} mt-2`}
                    value={data.favoriteActivityOther}
                    onChange={(e) => update("favoriteActivityOther", e.target.value)}
                  />
                ) : null}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <label className={labelClass}>What&apos;s your main fitness goal?</label>
              <div className="space-y-2">
                {(
                  [
                    ["strength", "Strength", "Get stronger — focus on lifting heavier numbers"],
                    ["hypertrophy", "Hypertrophy", "Build muscle size and definition"],
                    ["conditioning", "Conditioning", "Improve endurance, stamina, and work capacity"],
                    ["general", 'General "Get Back in Shape"', "Just want to feel athletic again — a mix of everything"],
                  ] as const
                ).map(([value, label, desc]) => (
                  <label key={value} className={radioCardClass(data.fitnessGoal === value)}>
                    <input
                      type="radio"
                      name="fitnessGoal"
                      className="h-4 w-4 border-zinc-300 accent-zinc-900 dark:border-zinc-600 dark:accent-zinc-400"
                      checked={data.fitnessGoal === value}
                      onChange={() => update("fitnessGoal", value)}
                    />
                    <div>
                      <div className="text-sm font-medium">{label}</div>
                      <div className="text-xs text-zinc-500 dark:text-zinc-400">{desc}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label htmlFor="daysPerWeek" className={labelClass}>
                Days per week available to train
              </label>
              <input
                id="daysPerWeek"
                type="number"
                min={1}
                max={7}
                placeholder="e.g. 4"
                className={inputClass}
                value={data.daysPerWeek ?? ""}
                onChange={(e) => update("daysPerWeek", e.target.value ? Number(e.target.value) : null)}
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <label className={labelClass}>Preferred training split</label>
              <div className="space-y-2">
                {(
                  [
                    ["full-body", "Full Body", "Hit all muscle groups each session"],
                    ["upper-lower", "Upper / Lower", "Alternate upper and lower body days"],
                    ["push-pull-legs", "Push / Pull / Legs", "Three-day rotation by movement pattern"],
                    ["sport-specific", "Sport-Specific Hybrid", "Mix of general strength and sport skill work"],
                  ] as const
                ).map(([value, label, desc]) => (
                  <label key={value} className={radioCardClass(data.trainingSplit === value)}>
                    <input
                      type="radio"
                      name="trainingSplit"
                      className="h-4 w-4 border-zinc-300 accent-zinc-900 dark:border-zinc-600 dark:accent-zinc-400"
                      checked={data.trainingSplit === value}
                      onChange={() => update("trainingSplit", value)}
                    />
                    <div>
                      <div className="text-sm font-medium">{label}</div>
                      <div className="text-xs text-zinc-500 dark:text-zinc-400">{desc}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className={labelClass}>Preferred training methods</label>
              <p className="mb-2 text-xs text-zinc-500 dark:text-zinc-400">Select all that apply</p>
              <div className="space-y-2">
                {METHODS.map((method) => {
                  const checked = data.trainingMethods.includes(method);
                  return (
                    <label key={method} className={checkboxClass(checked)}>
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-zinc-300 accent-zinc-900 dark:border-zinc-600 dark:accent-zinc-400"
                        checked={checked}
                        onChange={() =>
                          update("trainingMethods", toggleArrayItem(data.trainingMethods, method))
                        }
                      />
                      <span className="text-sm">{method}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-2">
            <label className={labelClass}>Diet preference</label>
            {(
              [
                ["no-restriction", "No Restriction", "I eat everything"],
                ["vegetarian", "Vegetarian", "No meat, but I eat dairy/eggs"],
                ["high-protein", "High-Protein Focus", "Prioritize protein intake in my meals"],
                ["other", "Other", "Custom diet approach"],
              ] as const
            ).map(([value, label, desc]) => (
              <label key={value} className={radioCardClass(data.dietPreference === value)}>
                <input
                  type="radio"
                  name="dietPreference"
                  className="h-4 w-4 border-zinc-300 accent-zinc-900 dark:border-zinc-600 dark:accent-zinc-400"
                  checked={data.dietPreference === value}
                  onChange={() => update("dietPreference", value)}
                />
                <div>
                  <div className="text-sm font-medium">{label}</div>
                  <div className="text-xs text-zinc-500 dark:text-zinc-400">{desc}</div>
                </div>
              </label>
            ))}
          </div>
        );

      case 5:
        return (
          <div className="space-y-5">
            <ReviewSection
              title="About You"
              onEdit={() => setStep(0)}
              items={[
                { label: "Age", value: data.age !== null ? `${data.age} years old` : "—" },
                {
                  label: "Height",
                  value:
                    data.heightFt !== null || data.heightIn !== null
                      ? `${data.heightFt ?? 0}'${data.heightIn ?? 0}"`
                      : "—",
                },
                { label: "Weight", value: data.weight !== null ? `${data.weight} lbs` : "—" },
                {
                  label: "Sex",
                  value: data.sex
                    ? data.sex.charAt(0).toUpperCase() + data.sex.slice(1).replace(/-/g, " ")
                    : "—",
                },
              ]}
            />
            <ReviewSection
              title="High School Experience"
              onEdit={() => setStep(1)}
              items={[
                {
                  label: "Sports",
                  value:
                    data.highSchoolSports.length > 0 || data.otherSport
                      ? [...data.highSchoolSports, data.otherSport].filter(Boolean).join(", ")
                      : "—",
                },
                {
                  label: "Favorite activities",
                  value:
                    data.favoriteActivities.length > 0 || data.favoriteActivityOther
                      ? [...data.favoriteActivities, data.favoriteActivityOther].filter(Boolean).join(", ")
                      : "—",
                },
              ]}
            />
            <ReviewSection
              title="Training Goals"
              onEdit={() => setStep(2)}
              items={[
                {
                  label: "Goal",
                  value: data.fitnessGoal
                    ? data.fitnessGoal.charAt(0).toUpperCase() + data.fitnessGoal.slice(1).replace(/-/g, " ")
                    : "—",
                },
                { label: "Days per week", value: data.daysPerWeek !== null ? `${data.daysPerWeek}` : "—" },
              ]}
            />
            <ReviewSection
              title="Training Preferences"
              onEdit={() => setStep(3)}
              items={[
                {
                  label: "Split",
                  value: data.trainingSplit
                    ? data.trainingSplit
                        .split("-")
                        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                        .join("-")
                    : "—",
                },
                {
                  label: "Methods",
                  value: data.trainingMethods.length > 0 ? data.trainingMethods.join(", ") : "—",
                },
              ]}
            />
            <ReviewSection
              title="Diet"
              onEdit={() => setStep(4)}
              items={[
                {
                  label: "Preference",
                  value: data.dietPreference
                    ? data.dietPreference
                        .split("-")
                        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                        .join(" ")
                    : "—",
                },
              ]}
            />
          </div>
        );
    }
  };

  return (
    <div className="flex flex-1 flex-col bg-zinc-50 dark:bg-black">
      <main className="mx-auto flex w-full max-w-lg flex-1 flex-col px-4 py-8 sm:px-6">
        <div className="mb-2 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Let&apos;s Get You Started
          </h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Tell us about your background so we can build your plan.
          </p>
        </div>

        {/* Progress indicator */}
        <div className="mb-8 mt-6">
          <div className="flex items-center justify-between">
            {STEPS.map((s, i) => (
              <div key={i} className="flex flex-1 items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold transition-colors ${
                      i < step
                        ? "bg-zinc-900 text-white dark:bg-zinc-400 dark:text-zinc-900"
                        : i === step
                          ? "bg-zinc-900 text-white ring-2 ring-zinc-900/20 ring-offset-2 dark:bg-zinc-400 dark:text-zinc-900 dark:ring-zinc-400/30"
                          : "bg-zinc-200 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400"
                    }`}
                  >
                    {i < step ? "✓" : i + 1}
                  </div>
                  <span className="mt-1 hidden text-[10px] font-medium text-zinc-500 dark:text-zinc-400 sm:block">
                    {s.title}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div
                    className={`mx-1 h-0.5 flex-1 transition-colors ${
                      i < step ? "bg-zinc-900 dark:bg-zinc-400" : "bg-zinc-200 dark:bg-zinc-800"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step content */}
        <div className="flex-1">
          <h2 className="mb-1 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            {STEPS[step].title}
          </h2>
          <p className="mb-5 text-sm text-zinc-500 dark:text-zinc-400">{STEPS[step].description}</p>
          {renderStep()}
        </div>

        {/* Navigation */}
        <div className="mt-8 flex gap-3 border-t border-zinc-200 pt-5 dark:border-zinc-800">
          {step > 0 && (
            <button
              type="button"
              onClick={back}
              className="flex-1 rounded-lg border border-zinc-300 bg-white px-4 py-3 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
            >
              Back
            </button>
          )}
          {step < STEPS.length - 1 ? (
            <button
              type="button"
              onClick={next}
              disabled={!isStepValid()}
              className="flex-1 rounded-lg bg-zinc-900 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white dark:disabled:opacity-30"
            >
              Next
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              className="flex-1 rounded-lg bg-zinc-900 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
            >
              Submit
            </button>
          )}
        </div>
      </main>
    </div>
  );
}

function ReviewSection({
  title,
  onEdit,
  items,
}: {
  title: string;
  onEdit: () => void;
  items: { label: string; value: string }[];
}) {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{title}</h3>
        <button
          type="button"
          onClick={onEdit}
          className="text-xs font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
        >
          Edit
        </button>
      </div>
      <dl className="space-y-1">
        {items.map((item) => (
          <div key={item.label} className="flex justify-between text-sm">
            <dt className="text-zinc-500 dark:text-zinc-400">{item.label}</dt>
            <dd className="font-medium text-zinc-900 dark:text-zinc-100">{item.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
