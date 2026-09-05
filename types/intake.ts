export type Sex = "male" | "female" | "prefer-not-to-say" | "";

export type Goal =
  | "strength"
  | "aesthetics"
  | "weight-loss"
  | "conditioning"
  | "athleticism"
  | "general"
  | "";

export type Split =
  | "full-body"
  | "upper-lower"
  | "push-pull-legs"
  | "body-part-split"
  | "athletic-hybrid"
  | "";

export type Diet =
  | "none"
  | "vegetarian"
  | "protein-prioritization"
  | "carbohydrate-prioritization"
  | "other"
  | "";

export type SportHistory = {
  name: string;
  years: number | null;
};

export interface IntakeData {
  name: string;
  age: number | null;
  sex: Sex;
  heightFt: number | null;
  heightIn: number | null;
  weight: number | null;
  highSchoolSports: SportHistory[];
  otherSport: string;
  favoriteActivities: string[];
  favoriteActivityOther: string;
  primaryGoal: Goal;
  primaryAestheticsAreas: string[];
  secondaryGoal: Goal;
  secondaryAestheticsAreas: string[];
  daysPerWeek: number | null;
  hoursPerDay: number | null;
  trainingSplit: Split;
  trainingMethods: string[];
  sportSkillSports: string[];
  sportSkillOther: string;
  trainingRestrictions: string;
  dietPlan: Diet;
  dietPlanOther: string;
  dietaryRestrictions: string;
}
