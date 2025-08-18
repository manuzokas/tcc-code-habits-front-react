export type Alarm = {
  id: string;
  user_id: string;
  title: string;
  time: string;
  days_of_week: string[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
  last_triggered_at?: string | null;
};

export type NewAlarm = {
  title: string;
  time: string;
  days_of_week: string[];
  is_active: boolean;
};
