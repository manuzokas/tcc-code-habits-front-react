import { useState } from "react";
import { cn } from "@/assets/styles/utils/tw";

export interface TooltipProps {
  content: string;
  children: React.ReactNode;
  position?: "top" | "right" | "bottom" | "left";
}

export function Tooltip({ content, children, position = "top" }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  const positionClasses = {
    top: "bottom-full mb-2 left-1/2 transform -translate-x-1/2",
    right: "left-full ml-2 top-1/2 transform -translate-y-1/2",
    bottom: "top-full mt-2 left-1/2 transform -translate-x-1/2",
    left: "right-full mr-2 top-1/2 transform -translate-y-1/2",
  };

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onClick={() => setIsVisible(!isVisible)}
      >
        {children}
      </div>

      {isVisible && (
        <div
          className={cn(
            "absolute z-50 px-3 py-1.5 rounded-md bg-gray-800 text-xs text-gray-200",
            "border border-gray-700 shadow-lg whitespace-nowrap",
            positionClasses[position]
          )}
        >
          {content}
        </div>
      )}
    </div>
  );
}
