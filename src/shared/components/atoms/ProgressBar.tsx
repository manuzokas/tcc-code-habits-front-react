interface ProgressBarProps {
  progress: number;
  className?: string;
  showPercentage?: boolean;
  striped?: boolean;
  animated?: boolean;
}

export const ProgressBar = ({
  progress,
  className = "",
  showPercentage = false,
  striped = false,
  animated = false,
}: ProgressBarProps) => (
  <div className={`space-y-1 ${className}`}>
    <div className="w-full h-3 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden shadow-inner">
      <div
        className={`h-full rounded-full 
            bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500
            ${striped ? "bg-stripes bg-stripes-white" : ""}
            ${animated ? "animate-pulse" : ""}
            transition-all duration-300 ease-out`}
        style={{
          width: `${progress}%`,
          backgroundSize: striped ? "1rem 1rem" : undefined,
        }}
      />
    </div>
    {showPercentage && (
      <div className="text-right text-xs font-medium text-gray-500 dark:text-gray-400">
        {Math.round(progress)}%
      </div>
    )}
  </div>
);
