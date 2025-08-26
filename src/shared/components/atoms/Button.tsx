import { cn } from "@/assets/styles/utils/tw";

const sizeClasses = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2 text-sm", 
  lg: "px-6 py-3 text-base",
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  size?: keyof typeof sizeClasses; 
}

export function Button({
  children,
  className,
  size = "md",
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={cn(
        "bg-blue-600 text-white rounded-lg font-semibold shadow transition",

        sizeClasses[size],

        className
      )}
    >
      {children}
    </button>
  );
}
