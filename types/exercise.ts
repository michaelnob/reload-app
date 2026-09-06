export type ExerciseBlockKind =
  | "compound"
  | "accessory"
  | "core"
  | "conditioning"
  | "skill";

export type MovementPattern =
  | "squat"
  | "hinge"
  | "push-horizontal"
  | "push-vertical"
  | "pull-horizontal"
  | "pull-vertical"
  | "carry"
  | "rotation"
  | "locomotion"
  | "jump"
  | "isometric"
  | "skill-drill";

export interface Exercise {
  id: string;
  name: string;
  blockKind: ExerciseBlockKind;
  movementPattern: MovementPattern;
  compatibleSplitDayTypes: string[];
  goalTags: string[];
  sportTags?: string[];
  restrictionTags?: string[];
}

export type ExerciseLibrary = Exercise[];
