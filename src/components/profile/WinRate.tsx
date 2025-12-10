"use client";

import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

// 백엔드 data 형식 확인하면 수정하기
const data = [
  { name: "win", value: 70 },
  { name: "lose", value: 30 },
];

const COLORS = ["#51a2ff", "#ff6467"];

export default function WinRate() {
  return (
    <div className="flex w-32.5 flex-col items-center justify-center">
      <ResponsiveContainer
        width="100%"
        aspect={1}
        className="stroke-0 outline-0"
      >
        <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius="65%"
            outerRadius="80%"
            paddingAngle={0}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={entry.name} fill={COLORS[index]} />
            ))}
          </Pie>
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-content-primary text-xs"
          >
            {Math.round(
              // (win / total) * 100
              (data[0].value / (data[0].value + data[1].value)) * 100,
            )}
            %
          </text>
        </PieChart>
      </ResponsiveContainer>

      <span className="text-content-secondary text-sm">
        {data[0].value}W {data[1].value}L
      </span>
    </div>
  );
}
