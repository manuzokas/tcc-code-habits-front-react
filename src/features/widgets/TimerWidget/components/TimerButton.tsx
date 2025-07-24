import { Button } from "@/shared/components/atoms/Button";
import { Play, Pause, RefreshCw } from "lucide-react";

interface TimerButtonProps {
  isActive: boolean;
  onToggle: () => void;
  onReset: () => void;
}

export function TimerButtons({
  isActive,
  onToggle,
  onReset,
}: TimerButtonProps) {
  return (
    <div className="flex gap-4">
      <Button
        onClick={onToggle}
        className={`flex-1 ${
          isActive
            ? "bg-white text-blue-600 hover:bg-blue-50"
            : "bg-blue-500 hover:bg-blue-600 text-white"
        }`}
      >
        {isActive ? (
          <>
            <Pause className="mr-2" />
            Pausar
          </>
        ) : (
          <>
            <Play className="mr-2" />
            Iniciar Sessão
          </>
        )}
      </Button>

      <Button
        onClick={onReset}
        className="border-white/20 text-white hover:bg-white/10"
      >
        <RefreshCw className="mr-2" />
        Reiniciar
      </Button>
    </div>
  );
}
