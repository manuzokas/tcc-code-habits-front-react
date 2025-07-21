import { icons, type LucideProps } from "lucide-react";
import type { ComponentType } from "react";

type IconName = keyof typeof icons;

interface IconProps {
  name: IconName;
  className?: string;
  color?: string;
  size?: number;
}

const iconCache = new Map<string, ComponentType<LucideProps>>();

export const Icon = ({
  name,
  className = "w-5 h-5",
  color,
  size,
}: IconProps) => {

  if (!iconCache.has(name)) {
    const icon = icons[name];
    if (!icon) {
      if (process.env.NODE_ENV === "development") {
        console.warn(`Ícone "${name}" não encontrado`);
      }
      return null;
    }
    iconCache.set(name, icon);
  }

  const IconComponent = iconCache.get(name)!;

  return (
    <IconComponent
      className={`${className} ${color ? `text-${color}` : ""}`}
      size={size}
    />
  );
};

export type { IconName };
