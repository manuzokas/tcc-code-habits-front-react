import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

interface CommitActivityChartProps {
  timestamps: string[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-800 border border-gray-600 rounded-lg p-2 text-sm">
        <p className="label text-gray-300">{`${label}`}</p>
        <p className="intro text-green-400 font-semibold">{`${payload[0].value} commits`}</p>
      </div>
    );
  }
  return null;
};

export const CommitActivityChart: React.FC<CommitActivityChartProps> = ({
  timestamps,
}) => {
  const processData = () => {
    const hourlyCounts = Array.from({ length: 24 }, (_, i) => ({
      hour: `${i.toString().padStart(2, "0")}:00`,
      commits: 0,
    }));

    timestamps.forEach((ts) => {
      const date = new Date(ts);
      const hour = date.getHours();
      if (hourlyCounts[hour]) {
        hourlyCounts[hour].commits++;
      }
    });

    return hourlyCounts;
  };

  const chartData = processData();

  return (
    <div className="mt-4 h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(255, 255, 255, 0.1)"
          />
          <XAxis
            dataKey="hour"
            fontSize={12}
            tick={{ fill: "#9ca3af" }}
            stroke="#4b5563"
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
          <Bar dataKey="commits" fill="#34d399" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
