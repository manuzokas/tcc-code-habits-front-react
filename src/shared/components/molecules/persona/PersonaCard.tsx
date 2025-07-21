import type { PersonaType } from "@/shared/types/personas";

interface PersonaCardProps {
  persona: PersonaType;
  isResult?: boolean;
}

export const PersonaCard = ({
  persona,
  isResult = false,
}: PersonaCardProps) => {
  return (
    <div
      className={`rounded-xl bg-gray-900/50 border ${isResult ? "border-green-500/30" : "border-gray-800/30"} p-6`}
    >
      <div className="flex items-start gap-4 mb-4">
        <div className={`p-2 rounded-lg bg-gradient-to-br ${persona.color}`}>
          {/* Ícone pode ser substituído por um apropriado */}
          <span className="text-white">👨‍💻</span>
        </div>
        <div>
          <h4 className="text-lg font-bold text-white">{persona.name}</h4>
          <p className="text-gray-400 text-sm">{persona.description}</p>
        </div>
      </div>

      {isResult && (
        <>
          <div className="mb-4">
            <h5 className="text-sm font-semibold text-gray-300 mb-2">
              Seus traços:
            </h5>
            <ul className="space-y-1">
              {persona.traits.map((trait, i) => (
                <li
                  key={i}
                  className="flex items-center gap-2 text-sm text-gray-400"
                >
                  <span
                    className={`w-2 h-2 rounded-full bg-gradient-to-br ${persona.color}`}
                  />
                  {trait}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="text-sm font-semibold text-gray-300 mb-2">
              Recomendações para você:
            </h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <RecommendationBox
                title="Hidratação"
                items={persona.recommendations.hydration}
                color={persona.color}
              />
              <RecommendationBox
                title="Pausas"
                items={persona.recommendations.breaks}
                color={persona.color}
              />
              <RecommendationBox
                title="Pausas"
                items={persona.recommendations.exercise}
                color={persona.color}
              />
              <RecommendationBox
                title="Pausas"
                items={persona.recommendations.nutrition}
                color={persona.color}
              />
              <RecommendationBox
                title="Pausas"
                items={persona.recommendations.sleep}
                color={persona.color}
              />
              <RecommendationBox
                title="Pausas"
                items={persona.recommendations.mental}
                color={persona.color}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const RecommendationBox = ({
  title,
  items,
  color,
}: {
  title: string;
  items: string[];
  color: string;
}) => {
  return (
    <div className="bg-gray-800/30 rounded-lg p-4 border border-gray-700/50">
      <h6
        className={`text-xs font-mono mb-2 text-transparent bg-clip-text bg-gradient-to-br ${color}`}
      >
        {title}
      </h6>
      <ul className="space-y-1">
        {items.map((item, i) => (
          <li key={i} className="text-xs text-gray-400">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
