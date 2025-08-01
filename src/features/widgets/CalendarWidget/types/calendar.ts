
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

export type NewCalendarEvent = {
  title: string;
  description?: string;
  start_time: string;
  end_time: string;
  is_all_day?: boolean;
  location?: string;
};