import { cn } from "@/assets/styles/utils/tw";

interface ProgressProps {
  value: number;
  className?: string;
  indicatorClassName?: string;
}

export function Progress({
  value,
  className,
  indicatorClassName,
}: ProgressProps) {
  return (
    <div
      className={cn(
        "w-full h-1.5 bg-gray-700 rounded-full overflow-hidden",
        className
      )}
    >
      <div
        className={cn(
          "h-full bg-blue-500 rounded-full transition-all duration-300",
          indicatorClassName
        )}
        style={{ width: `${value}%` }}
      />
    </div>
  );
}
