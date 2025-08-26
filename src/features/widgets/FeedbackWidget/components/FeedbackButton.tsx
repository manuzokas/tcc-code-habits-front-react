interface FeedbackButtonProps {
  rating: number;
  label: string;
  colorClass: string;
  isSelected?: boolean;
  onClick: () => void;
}

export const FeedbackButton = ({
  rating,
  label,
  colorClass,
  isSelected = false,
  onClick,
}: FeedbackButtonProps) => (
  <button
    className={`
      p-3 rounded-xl transition-all duration-200
      hover:scale-105 hover:bg-white/10 hover:shadow-md
      active:scale-95 active:bg-white/20
      border ${isSelected ? "border-purple-400/50 bg-white/5" : "border-transparent hover:border-purple-400/30"}
      flex flex-col items-center justify-center aspect-square gap-1
    `}
    title={label}
    onClick={onClick}
    aria-label={label}
  >
    <span className={`text-lg font-bold ${colorClass}`}>{rating}</span>
    <span className="text-xs text-gray-300 opacity-80">{label}</span>
  </button>
);
