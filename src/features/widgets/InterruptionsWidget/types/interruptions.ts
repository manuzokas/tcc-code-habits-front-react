export type InterruptionType = "MEETING" | "BUG" | "PERSONAL_BREAK";

export type InterruptionOutcome =
  | "RESOLVED"
  | "UNRESOLVED"
  | "PRODUCTIVE"
  | "UNPRODUCTIVE"
  | "REFRESHING"
  | "NOT_REFRESHING";

export interface ActiveInterruption {
  id: string;
  type: InterruptionType;
  start_time: string;
}
