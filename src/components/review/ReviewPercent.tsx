"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import good from "@/assets/images/emoji/emoji_good.png";
import normal from "@/assets/images/emoji/emoji_normal.png";
import bad from "@/assets/images/emoji/emoji_bad.png";
import Image from "next/image";
import { twMerge } from "tailwind-merge";

type ReviewPercentType = "default" | "mini";

interface ReviewPercentProps {
  type: ReviewPercentType;
  ratios: { GOOD: number; NORMAL: number; BAD: number };
}

export default function ReviewPercent({
  type = "default",
  ratios,
}: ReviewPercentProps) {
  const reviewData = [{ name: "percentBar", ...ratios }];
  return (
    <div
      className={twMerge(
        "text-content-primary flex flex-col",
        type === "mini" && "min-w-77.5",
      )}
    >
      <p
        className={twMerge(
          "mb-5 text-center text-xl font-semibold",
          type === "mini" && "mb-2 w-77.5 text-start text-sm",
        )}
      >
        리뷰 분포
      </p>

      <div
        className={twMerge(
          "mb-3.5 h-7.5 w-full",
          type === "mini" && "mb-2 h-5",
        )}
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={reviewData}
            layout="vertical"
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
            stackOffset="expand"
          >
            <XAxis type="number" hide domain={[0, 1]} />
            <YAxis type="category" dataKey="name" hide />

            <Bar
              dataKey="GOOD"
              stackId="a"
              fill="#03AEDD"
              radius={[50, 0, 0, 50]}
            ></Bar>

            <Bar dataKey="NORMAL" stackId="a" fill="#FF9D00"></Bar>

            <Bar
              dataKey="BAD"
              stackId="a"
              fill="#FA084D"
              radius={[0, 50, 50, 0]}
            ></Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div
        className={twMerge(
          "flex items-center justify-between text-base [&>div>img]:w-7.5",
          type === "mini" && "text-xs [&>div>img]:w-5",
        )}
      >
        <div className="flex items-center gap-2">
          <Image src={good} alt="good review emoji" />
          <span className="">
            {reviewData[0].GOOD}개<span className="text-[#10B5DC]"> (75%)</span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Image src={normal} alt="normal review emoji" />
          <span className="">
            {reviewData[0].NORMAL}개
            <span className="text-[#FFA106]"> (75%)</span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Image src={bad} alt="bad review emoji" />
          <span className="">
            {reviewData[0].BAD}개<span className="text-[#FC3665]"> (75%)</span>
          </span>
        </div>
      </div>
    </div>
  );
}
