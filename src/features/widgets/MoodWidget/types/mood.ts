export type MoodOption = {
  emoji: string;
  label: string;
  title: string;
};

export type MoodWidgetProps = {
  className?: string;
};

export type MoodEntry = {
  id: string;
  user_id: string;
  mood: string;
  notes: string | null;
  recorded_at: string;
};