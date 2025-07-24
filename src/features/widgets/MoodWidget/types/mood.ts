export type MoodOption = {
    emoji: string;
    label: string;
    title: string;
  };
  
  export type MoodWidgetProps = {
    currentMood?: string;
    onMoodSelect?: (mood: string) => void;
    className?: string;
  };