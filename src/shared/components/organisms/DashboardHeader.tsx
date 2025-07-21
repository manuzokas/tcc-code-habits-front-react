import { MissionButton } from "@/shared/components/molecules/MissionButton/index";
import { useMissions } from "@/shared/hooks/useMissions";
import { USER_PROGRESS } from "@/shared/constants/userProgress";
import { Icon } from "@/shared/components/atoms/Icon";

interface DashboardHeaderProps {
  sidebarOpen: boolean;
}

export const DashboardHeader = ({ sidebarOpen }: DashboardHeaderProps) => {
  const { missions, handleAdd, handleComplete, calculateTotalXp } =
    useMissions();
  const totalXp = calculateTotalXp();

  return (
    <header
      className={`sticky top-0 z-30 bg-gray-950 backdrop-blur-md border-b border-emerald-500/30 shadow-lg shadow-emerald-600 transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-0"}`}
    >
      <div className="container mx-auto px-9 py-7">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          {/* section de progresso (lado esquerdo da header) */}
          <div className="flex items-center gap-4 p-4 bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
            {/* Badge de Nível - Estilo Gamificado */}
            <div className="relative shrink-0">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center 
      bg-gradient-to-br from-gray-50 to-white dark:from-blue-900 dark:to-green-900
      border-2 border-emerald-200 dark:border-emerald-400/50
      shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)]"
              >
                <span className="text-2xl font-bold text-emerald-600 dark:text-green-300">
                  {USER_PROGRESS.level}
                </span>
                {/* Decoração sutil - mantendo o cyan original */}
                <div className="absolute -bottom-1 -right-1 bg-yellow-400 rounded-full p-1 border-2 border-white dark:border-gray-800">
                  <Icon name="Star" className="w-3 h-3 text-white" />
                </div>
              </div>
            </div>

            {/* Conteúdo do Progresso */}
            <div className="flex-1 min-w-0 space-y-2">
              {/* Título com tag */}
              <div className="flex items-center justify-between gap-2">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 truncate">
                  Seu Progresso
                </h2>
                <span className="text-xs font-medium bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 px-2.5 py-1 rounded-full whitespace-nowrap flex items-center gap-1">
                  <Icon name="Sparkles" className="w-3 h-3" />
                  <span> complete missões</span>
                </span>
              </div>

              {/* Barra de Progresso Moderna */}
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-2.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-teal-400 transition-all duration-300"
                      style={{ width: `${USER_PROGRESS.progress}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400 whitespace-nowrap bg-gray-100 dark:bg-gray-700/50 px-2 py-0.5 rounded">
                    {USER_PROGRESS.progress}%
                  </span>
                </div>

                {/* Meta de XP */}
                <div className="flex justify-between">
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                    <span className="text-teal-500 dark:text-teal-400">
                      {USER_PROGRESS.xpToNextLevel} XP
                    </span>{" "}
                    para próximo nível
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                    Nível:{" "}
                    <span className="text-cyan-500 dark:text-cyan-400">
                      Trainee
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* section de missões */}
          <div className="flex-1 w-full min-w-0">
            {/* Adicione este título acima dos botões de missão */}
            <div className="flex justify-end mb-3">
              <h3 className="text-sm font-semibold text-yellow-300 bg-emerald-900/30 px-3 py-1 rounded-full inline-flex items-center gap-1 border border-yellow-400">
                <Icon name="Sparkles" className="w-3 h-3" />
                Complete suas missões para ganhar XPs!
              </h3>
            </div>

            <div className="flex flex-wrap gap-2 justify-end">
              <MissionButton
                mission={missions.water}
                onAdd={() => handleAdd("water")}
                onComplete={() => handleComplete("water")}
              />

              <MissionButton
                mission={missions.stretch}
                onAdd={() => handleAdd("stretch")}
                onComplete={() => handleComplete("stretch")}
              />

              <MissionButton
                mission={missions.eyeRest}
                onAdd={() => handleAdd("eyeRest")}
                onComplete={() => handleComplete("eyeRest")}
              />

              {/* XP Total */}
              <div className="flex items-center gap-2 bg-yellow-600/90 px-3 py-2 rounded-lg border border-gray-700">
                <span className="text-sm text-gray-300">Total:</span>
                <span className="text-sm font-mono text-yellow-400 font-bold">
                  {Math.round(totalXp)} XP
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
