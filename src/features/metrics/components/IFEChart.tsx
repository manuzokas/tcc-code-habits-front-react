import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useIFE } from "../hooks/useIFE";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

export const IFEChart = () => {
  const { data, isLoading, error } = useIFE();

  if (isLoading) {
    return (
      <div className="h-80 w-full flex items-center justify-center bg-gray-800/50 rounded-lg text-gray-400">
        Carregando dados...
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
    <div className="p-6 bg-gray-900 border border-gray-700 rounded-xl shadow-lg">
      <h3 className="text-xl font-bold text-white mb-1">
        Índice de Foco Efetivo (IFE)
      </h3>
      <p className="text-sm text-gray-400 mb-6">
        Sua porcentagem de tempo focado vs. tempo perdido com interrupções nos
        últimos 30 dias.
      </p>
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <LineChart
            data={formattedData}
            margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="day" stroke="#9ca3af" fontSize={12} />
            <YAxis stroke="#9ca3af" fontSize={12} unit="%" domain={[0, 100]} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1f2937",
                borderColor: "#4b5563",
                borderRadius: "0.5rem",
              }}
              labelStyle={{ color: "#d1d5db" }}
              itemStyle={{ fontWeight: "bold" }}
            />
            <Legend wrapperStyle={{ fontSize: "14px" }} />
            <Line
              type="monotone"
              dataKey="ife"
              name="Foco Efetivo"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ r: 4, fill: "#3b82f6" }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
