import { cn } from "@/features/theme/utils/tw";
import { Tooltip, type TooltipProps } from "@/shared/components/atoms/Tooltip";

interface BadgeProps {
  content: string | number;
  variant?: "primary" | "secondary" | "danger";
  className?: string;
  children?: React.ReactNode;
  tooltip?: string;
  tooltipProps?: Omit<TooltipProps, "content" | "children">;
}

export function Badge({
  content,
  variant = "primary",
  className,
  children,
  tooltip,
  tooltipProps,
}: BadgeProps) {
  const variantClasses = {
    primary: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    secondary: "bg-gray-500/20 text-gray-400 border-gray-500/30",
    danger: "bg-red-500/20 text-red-400 border-red-500/30",
  };

  const badge = (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border",
        variantClasses[variant],
        className
      )}
    >
      {children && <span className="mr-1">{children}</span>}
      {content}
    </span>
  );

  return tooltip ? (
    <Tooltip content={tooltip} {...tooltipProps}>
      {badge}
    </Tooltip>
  ) : (
    badge
  );
}
