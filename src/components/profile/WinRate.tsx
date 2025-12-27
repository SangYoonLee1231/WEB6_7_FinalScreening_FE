"use client";

import {
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { twMerge } from "tailwind-merge";

// 백엔드 data 형식 확인하면 수정하기

const COLORS = ["#51a2ff", "#ff6467"];

type WinRateType = "horizontal" | "donut";

// winRate 나중에 데이터 확정되면 수정하기. 현재 임시 데이터
export default function WinRate({
  type,
  winRate = 50,
  win,
  lose,
  className,
}: {
  type: WinRateType;
  winRate: number;
  win: number;
  lose: number;
  className?: string;
}) {
  const data = [
    { name: "win", value: win },
    { name: "lose", value: lose },
  ];

  if (type === "donut")
    return (
      <div
        className={twMerge(
          "flex flex-col items-center justify-center",
          className,
        )}
      >
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
              {winRate}%
            </text>
          </PieChart>
        </ResponsiveContainer>

        <span className="text-content-secondary text-xs">
          {data[0].value}W {data[1].value}L
        </span>
      </div>
    );
  else {
    const horizontalData = [
      {
        name: "percentBar",
        win: winRate / 100,
        lose: (100 - winRate) / 100,
      },
    ];
    return (
      <div className={twMerge("mb-3.5 flex h-7 min-w-62.5", className)}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={horizontalData}
            layout="vertical"
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
            stackOffset="expand"
          >
            <XAxis type="number" hide domain={[0, 1]} />
            <YAxis type="category" dataKey="name" hide />

            {/* 승률 부분 */}
            <Bar
              dataKey="win"
              stackId="a"
              className="fill-positive"
              radius={[50, 0, 0, 50]} // 왼쪽 라운드
            />

            {/* 패배 부분 */}
            <Bar
              dataKey="lose"
              stackId="a"
              className="fill-negative"
              radius={[0, 50, 50, 0]} // 오른쪽 라운드
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
