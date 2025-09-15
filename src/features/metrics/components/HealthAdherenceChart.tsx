import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { useHealthAdherence } from "../hooks/useHealthAdherence";
import { Icon } from "@/shared/components/atoms/Icon";

export const HealthAdherenceChart = () => {
  const { data, isLoading, error } = useHealthAdherence();

  if (isLoading) {
    return (
      <div className="h-96 w-full flex items-center justify-center bg-gray-800/50 rounded-lg text-gray-400">
        <Icon name="Hourglass" className="w-6 h-6 animate-spin mr-2" />
        Carregando análise de hábitos...
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-96 w-full flex items-center justify-center bg-red-900/50 rounded-lg text-red-300">
        {error}
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="h-96 w-full flex flex-col items-center justify-center bg-gray-800/50 rounded-lg text-gray-400">
        <Icon name="ClipboardX" className="w-8 h-8 mb-2" />
        <p>Nenhum dado de hábitos de saúde encontrado.</p>
        <p className="text-xs text-gray-500">
          Complete missões no Hub para ver seus dados aqui.
        </p>
      </div>
    );
  }

  const formattedData = data.map((item) => ({
    habit: item.habit_name,
    percentage: item.adherence_percentage,
    fullMark: 100,
  }));

  return (
    <div className="p-6 bg-gray-900 border border-gray-700 rounded-xl shadow-lg h-full flex flex-col">
      <h3 className="text-xl font-bold text-white mb-1">
        Adesão aos Hábitos de Saúde
      </h3>
      <p className="text-sm text-gray-400 mb-6">
        Seu equilíbrio de autocuidado nos últimos 30 dias. Um radar balanceado
        indica uma rotina saudável.
      </p>
      <div className="flex-grow" style={{ width: "100%", minHeight: 350 }}>
        <ResponsiveContainer>
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={formattedData}>
            <PolarGrid stroke="#4b5563" />
            <PolarAngleAxis dataKey="habit" stroke="#d1d5db" fontSize={14} />
            <PolarRadiusAxis
              angle={30}
              domain={[0, 100]}
              stroke="#4b5563"
              fontSize={10}
            />
            <Radar
              name="Adesão (%)"
              dataKey="percentage"
              stroke="#22c55e"
              fill="#22c55e"
              fillOpacity={0.6}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1f2937",
                borderColor: "#4b5563",
                borderRadius: "0.5rem",
              }}
              labelStyle={{ color: "#d1d5db", fontWeight: "bold" }}
            />
            <Legend wrapperStyle={{ fontSize: "14px", paddingTop: "20px" }} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
