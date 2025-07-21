import type { PersonaType } from "@/shared/types/personas";

interface PersonaRecommendationsProps {
  persona: PersonaType;
}

export function PersonaRecommendations({
  persona,
}: PersonaRecommendationsProps) {
  return (
    <div
      className={`bg-gradient-to-br ${persona.color} p-6 rounded-xl border border-gray-700/50 backdrop-blur-sm`}
    >
      <h3 className="text-lg font-bold text-white mb-4 flex items-center">
        <span>Recomendações Personalizadas</span>
      </h3>

      <div className="space-y-4">
        {Object.entries(persona.recommendations).map(([category, items]) => (
          <div key={category} className="bg-gray-900/30 p-4 rounded-lg">
            <h4 className="font-semibold text-white capitalize mb-2">
              {category === "mental" ? "Saúde Mental" : category}
            </h4>
            <ul className="space-y-2">
              {items.map((item, i) => (
                <li key={i} className="flex items-start">
                  <span className="text-green-300 mr-2">•</span>
                  <span className="text-sm text-gray-200">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
