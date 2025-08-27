export type InterruptionType = "MEETING" | "BUG";

export type InterruptionOutcome =
  | "RESOLVED"
  | "UNRESOLVED"
  | "PRODUCTIVE"
  | "UNPRODUCTIVE";

export interface ActiveInterruption {
  id: string;
  type: InterruptionType;
  start_time: string;
}
