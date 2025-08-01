export type TimerConfig = {
  id: string;
  user_id: string;
  focus_duration_minutes: number;
  short_break_duration_minutes: number;
  long_break_duration_minutes: number;
  pomodoros_before_long_break: number;
  created_at: string;
  updated_at: string;
};

export type NewTimerConfig = Omit<TimerConfig, "id" | "user_id" | "created_at" | "updated_at">;