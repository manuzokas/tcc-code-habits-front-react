import React from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import type { CommitHistoryData, Period } from "../hooks/useCommitHistory";

// Tooltip customizado (pode usar o mesmo do outro gráfico)
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-800 border border-gray-600 rounded-lg p-2 text-sm">
        <p className="label text-gray-300">{`Data: ${label}`}</p>
        <p className="intro text-green-400 font-semibold">{`${payload[0].value} commits`}</p>
      </div>
    );
  }
  return null;
};

// Formata a data para o eixo X
const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return `${date.getUTCDate().toString().padStart(2, "0")}/${(date.getUTCMonth() + 1).toString().padStart(2, "0")}`;
};

interface CommitHistoryChartProps {
  history: CommitHistoryData[];
  period: Period;
}

export const CommitHistoryChart: React.FC<CommitHistoryChartProps> = ({
  history,
  period,
}) => {
  // Para 7 dias, um gráfico de barras fica bom. Para 30 dias, um de linha é melhor.
  const ChartComponent = period === "7days" ? BarChart : LineChart;
  const ChartElement =
    period === "7days" ? (
      <Bar dataKey="commits" fill="#34d399" radius={[4, 4, 0, 0]} />
    ) : (
      <Line
        type="monotone"
        dataKey="commits"
        stroke="#34d399"
        strokeWidth={2}
        dot={{ r: 4 }}
        activeDot={{ r: 8 }}
      />
    );

  return (
    <div className="mt-4 h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <ChartComponent
          data={history}
          margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(255, 255, 255, 0.1)"
          />
          <XAxis
            dataKey="date"
            fontSize={12}
            tick={{ fill: "#9ca3af" }}
            stroke="#4b5563"
            tickFormatter={formatDate}
          />
          <YAxis
            allowDecimals={false}
            fontSize={12}
            tick={{ fill: "#9ca3af" }}
            stroke="#4b5563"
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: "rgba(139, 92, 246, 0.1)" }}
          />
          {ChartElement}
        </ChartComponent>
      </ResponsiveContainer>
    </div>
  );
};
