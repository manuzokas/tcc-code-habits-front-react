/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { useDailySummary } from "../hooks/useDailySummary";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

export const DailySummaryChart = () => {
  const { data, isLoading, error } = useDailySummary();

  if (isLoading) {
    return (
      <div className="h-80 w-full flex items-center justify-center bg-gray-800/50 rounded-lg text-gray-400">
        Carregando dados de correlação...
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

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-3 bg-gray-700 border border-gray-600 rounded-lg shadow-lg text-sm">
          <p className="label text-white font-bold">{`Dia: ${label}`}</p>
          {payload.map((pld: any) => (
            <p key={pld.dataKey} style={{ color: pld.color }}>
              {`${pld.name}: ${pld.value !== null ? pld.value + (pld.dataKey === "ife" ? "%" : "") : "N/A"}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-6 bg-gray-900 border border-gray-700 rounded-xl shadow-lg">
      <h3 className="text-xl font-bold text-white mb-1">
        Correlação: Foco, Humor e Produtividade
      </h3>
      <p className="text-sm text-gray-400 mb-6">
        Analise como seu foco, humor e percepção de produtividade se conectam ao
        longo do tempo.
      </p>
      <div style={{ width: "100%", height: 350 }}>
        <ResponsiveContainer>
          <LineChart
            data={formattedData}
            margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="day" stroke="#9ca3af" fontSize={12} />

            <YAxis
              yAxisId="left"
              stroke="#3b82f6"
              fontSize={12}
              unit="%"
              domain={[0, 100]}
            />

            <YAxis
              yAxisId="right"
              orientation="right"
              stroke="#10b981"
              fontSize={12}
              domain={[0, 5]}
              ticks={[1, 2, 3, 4, 5]}
            />

            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: "14px", paddingTop: "20px" }} />

            <Line
              yAxisId="left"
              type="monotone"
              dataKey="ife"
              name="Foco (IFE)"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 8 }}
              connectNulls
            />

            <Line
              yAxisId="right"
              type="monotone"
              dataKey="productivity_rating"
              name="Produtividade (Nota)"
              stroke="#10b981"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 8 }}
              connectNulls
            />

            <Line
              yAxisId="right"
              type="monotone"
              dataKey="mood_score"
              name="Humor (Score)"
              stroke="#f59e0b"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 8 }}
              connectNulls
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
