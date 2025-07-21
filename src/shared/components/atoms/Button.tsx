import { cn } from "@/features/theme/utils/tw";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={cn(
        "bg-blue-600 text-white rounded-lg font-semibold shadow px-4 py-2 transition",
        className
      )}
    >
      {children}
    </button>
  );
}
