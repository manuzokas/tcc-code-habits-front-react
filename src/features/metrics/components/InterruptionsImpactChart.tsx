import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useInterruptionsSummary } from "../hooks/useInterruptionsSummary";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Icon } from "@/shared/components/atoms/Icon";

export const InterruptionsImpactChart = () => {
  const { data, isLoading, error } = useInterruptionsSummary();

  if (isLoading) {
    return (
      <div className="h-80 w-full flex items-center justify-center bg-gray-800/50 rounded-lg text-gray-400">
        <Icon name="Hourglass" className="w-6 h-6 animate-spin mr-2" />
        Carregando análise de interrupções...
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-80 w-full flex items-center justify-center bg-red-900/50 rounded-lg text-red-300">
        {error}
      </div>
    );
  }

  const formattedData = data.map((item) => ({
    ...item,
    day: format(parseISO(item.day), "dd/MM", { locale: ptBR }),
  }));

  return (
    <div className="p-6 bg-gray-900 border border-gray-700 rounded-xl shadow-lg h-full flex flex-col">
      <h3 className="text-xl font-bold text-white mb-1">
        Análise de Interrupções
      </h3>
      <p className="text-sm text-gray-400 mb-6">
        Frequência e tipo de interrupções que fragmentam seu foco diário.
      </p>
      <div className="flex-grow" style={{ width: "100%", minHeight: 300 }}>
        <ResponsiveContainer>
          <BarChart
            data={formattedData}
            margin={{ top: 5, right: 20, left: -20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="day" stroke="#9ca3af" fontSize={12} />
            <YAxis allowDecimals={false} stroke="#9ca3af" fontSize={12} />
            <Tooltip
              cursor={{ fill: "rgba(107, 114, 128, 0.1)" }}
              contentStyle={{
                backgroundColor: "#1f2937",
                borderColor: "#4b5563",
                borderRadius: "0.5rem",
              }}
              labelStyle={{ color: "#d1d5db", fontWeight: "bold" }}
            />
            <Legend wrapperStyle={{ fontSize: "14px", paddingTop: "10px" }} />

            <Bar
              dataKey="bug_count"
              name="Bugs Urgentes"
              stackId="a"
              fill="#ef4444"
            />
            <Bar
              dataKey="meeting_count"
              name="Reuniões"
              stackId="a"
              fill="#3b82f6"
            />
            <Bar
              dataKey="personal_break_count"
              name="Pausas Pessoais"
              stackId="a"
              fill="#f59e0b"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
