// 원형 버튼 컴포넌트

"use client";

import { Sun } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import React from "react";

const circleBtn = cva(
  // 공통 스타일
  "inline-flex items-center justify-center rounded-full bg-bg-tertiary text-content-main",
  {
    variants: {
      size: {
        xs: "size-7.5", // 30px 정도라고 가정
        sm: "size-10", // 40px
        md: "size-12.5", // 50px
        lg: "size-17", // 68px
        xl: "size-25.5", // 102px
        xxl: "size-32.5", // 130px
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

type CircleBtnVariants = VariantProps<typeof circleBtn>;

interface CircleBtnProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, CircleBtnVariants {}

const ICON_SIZE_MAP: Record<NonNullable<CircleBtnVariants["size"]>, number> = {
  xs: 14,
  sm: 18,
  md: 22,
  lg: 26,
  xl: 32,
  xxl: 40,
};

export default function CircleBtn({
  size = "md",
  className,
  ...props
}: CircleBtnProps) {
  const safeSize: NonNullable<CircleBtnVariants["size"]> = size ?? "md";
  const iconSize = ICON_SIZE_MAP[safeSize];

  return (
    <button
      {...props}
      className={twMerge(
        circleBtn({ size }),
        "hover:bg-bg-quaternary transition-all duration-150 active:scale-95",
        className,
      )}
    >
      <Sun width={iconSize} height={iconSize} strokeWidth={2} />
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
