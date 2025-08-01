export type Alarm = {
  id: string;
  user_id: string;
  title: string;
  time: string; 
  days_of_week: string[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type NewAlarm = {
  title: string;
  time: string;
  days_of_week: string[];
  is_active: boolean;
};