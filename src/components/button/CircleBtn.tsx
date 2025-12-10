// 원형 버튼 컴포넌트

"use client";

import { Sun } from "lucide-react";
import { twMerge } from "tailwind-merge";

interface CircleBtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size: number | "xl" | "lg" | "md" | "sm" | "xs";
}

const SIZE_MAP: Record<string, number> = {
  xl: 120,
  lg: 80,
  md: 60,
  sm: 40,
  xs: 24,
};

// size prop을 통해 크기 조절 가능 (number 또는 predefined size)
export default function CircleBtn({
  size,
  className,
  ...props
}: CircleBtnProps) {
  const finalSize = typeof size === "number" ? size : SIZE_MAP[size];

  return (
    <button
      {...props}
      style={{
        width: finalSize,
        height: finalSize,
      }}
      className={twMerge(
        "bg-bg-tertiary text-content-main flex items-center justify-center rounded-full",
        "hover:bg-bg-quaternary transition-all duration-150 active:scale-95",
        className,
      )}
    >
      <Sun width={finalSize * 0.45} height={finalSize * 0.45} strokeWidth={1} />
    </button>
  );
}

/* 사용법 예시
    <CircleBtn size={120} />
    <CircleBtn size={80} />
    <CircleBtn size={60} />
    <CircleBtn size={40} />
    <CircleBtn size={xl} />
*/
