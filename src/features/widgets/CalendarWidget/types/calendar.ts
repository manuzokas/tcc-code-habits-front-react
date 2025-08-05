export type CalendarEvent = {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  start_time: string;
  end_time: string;
  is_all_day: boolean;
  location: string | null;
  created_at: string;
  updated_at: string;
};

export type NewCalendarEvent = Omit<
  CalendarEvent,
  "id" | "user_id" | "created_at" | "updated_at"
>;
