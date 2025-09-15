/* eslint-disable @typescript-eslint/no-explicit-any */
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
import type { CommitMoodData, Mood } from "../hooks/useCommitMood";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

const moodToEmojiMap: Record<NonNullable<Mood>, string> = {
  Motivado: "😊",
  Neutro: "😐",
  Preocupado: "😟",
  Esgotado: "😫",
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload as CommitMoodData;
    return (
      <div className="bg-gray-800 border border-gray-600 rounded-lg p-3 text-sm shadow-lg">
        <p className="label text-gray-300 font-bold">
          {format(parseISO(data.day_out), "EEEE, dd/MM/yyyy", { locale: ptBR })}
        </p>
        <p className="intro text-green-400 font-semibold">
          {data.commit_count_out} commits
        </p>
        {data.mood_out && (
          <p className="text-amber-400">
            Humor: {data.mood_out} {moodToEmojiMap[data.mood_out]}
          </p>
        )}
      </div>
    );
  }
  return null;
};

interface CommitMoodChartProps {
  data: CommitMoodData[];
}

export const CommitMoodChart: React.FC<CommitMoodChartProps> = ({ data }) => {

  const CustomXAxisTick = (props: any) => {
    const { x, y, payload } = props;

    const dataPoint = data[payload.index];

    if (!dataPoint) {
      return null;
    }

    const { day_out, mood_out } = dataPoint;
    const formattedDate = format(parseISO(day_out), "dd/MM", { locale: ptBR });

    return (
      <g transform={`translate(${x},${y})`}>
        {mood_out && (
          <text x={0} y={-5} dy={16} textAnchor="middle" fontSize={14}>
            {moodToEmojiMap[mood_out]}
          </text>
        )}
        <text
          x={0}
          y={10}
          dy={16}
          textAnchor="middle"
          fill="#9ca3af"
          fontSize={12}
        >
          {formattedDate}
        </text>
      </g>
    );
  };

  return (
    <div className="h-[300px] w-full mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 10, right: 10, left: -20, bottom: 45 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(255, 255, 255, 0.1)"
          />
          <XAxis
            dataKey="day_out"
            tick={<CustomXAxisTick />}
            interval={0}
            axisLine={{ stroke: "#4b5563" }}
            tickLine={false}
          />
          <YAxis
            allowDecimals={false}
            fontSize={12}
            tick={{ fill: "#9ca3af" }}
            stroke="#4b5563"
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: "rgba(107, 114, 128, 0.1)" }}
          />
          <Bar
            dataKey="commit_count_out"
            name="Commits"
            fill="#34d399"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
