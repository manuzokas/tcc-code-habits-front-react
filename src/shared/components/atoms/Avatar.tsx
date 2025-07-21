import { cn } from "@/features/theme/utils/tw";
import { UserIcon } from "lucide-react";

interface AvatarProps {
  src?: string | null;
  alt?: string;
  fallback?: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function Avatar({
  src,
  alt,
  fallback,
  className,
  size = "md",
}: AvatarProps) {
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-10 w-10",
  };

  return (
    <div
      className={cn(
        "relative inline-flex items-center justify-center rounded-full bg-gray-700 overflow-hidden",
        sizeClasses[size],
        className
      )}
    >
      {src ? (
        <img
          src={src}
          alt={alt || "User avatar"}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="flex items-center justify-center w-full h-full text-gray-300">
          {fallback || <UserIcon className="h-4 w-4" />}
        </div>
      )}
    </div>
  );
}
