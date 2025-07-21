import { cn } from "@/features/theme/utils/tw";
import { forwardRef } from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "flex h-10 w-full rounded-md border px-3 py-2 text-sm",
          "bg-gray-800 border-gray-700 text-gray-200",
          "focus:outline-none focus:ring-2 focus:ring-blue-500/50",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";
