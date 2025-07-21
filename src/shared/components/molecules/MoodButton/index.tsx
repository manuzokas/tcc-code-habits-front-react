import type { MoodOption } from "../../../types/mood";

interface MoodButtonProps extends MoodOption {
  isSelected?: boolean;
  onClick: () => void;
}

export const MoodButton = ({
  emoji,
  label,
  title,
  isSelected = false,
  onClick,
}: MoodButtonProps) => (
  <button
    className={`
      p-3 rounded-xl text-3xl transition-all duration-200
      hover:scale-105 hover:bg-white/10 hover:shadow-md
      active:scale-95 active:bg-white/20
      border ${isSelected ? "border-purple-400/50" : "border-transparent hover:border-purple-400/30"}
      flex flex-col items-center
    `}
    title={title}
    onClick={onClick}
    aria-label={title}
  >
    {emoji}
    <span className="text-xs mt-1 text-gray-300 opacity-80">{label}</span>
  </button>
);
