interface TimerProgressProps {
  current: number;
  max: number;
  className?: string;
}

export function TimerProgress({ current, max, className }: TimerProgressProps) {
  return (
    <div className={`w-full ${className}`}>
      <div className="flex justify-between text-sm text-blue-100 mb-2">
        <span>Progresso</span>
        <span>
          {Math.min(Math.floor(current / 60), max)}/{max} min
        </span>
      </div>
      <div className="w-full bg-blue-800/30 rounded-full h-2.5">
        <div
          className="h-2.5 rounded-full bg-white transition-all duration-300"
          style={{
            width: `${Math.min(100, (current / 60 / max) * 100)}%`,
          }}
        />
      </div>
    </div>
  );
}
