// '모집 상태' 토글 버튼 세트

"use client";

import * as TogglePrimitive from "@radix-ui/react-toggle";
import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

// 모집 상태 타입
export type RecruitStatus = "recruiting" | "completed";

// 공통 버튼 스타일 (크기만 variant로 제어)
const segmentBtn = cva(
  "inline-flex items-center justify-center rounded-xl border transition-all duration-150 active:scale-95 select-none font-semibold cursor-pointer",
  {
    variants: {
      size: {
        sm: "h-9 px-5 text-sm",
        md: "h-11 px-8 text-sm",
        lg: "h-12 px-10 text-base",
      },
    },
    defaultVariants: {
      size: "sm",
    },
  },
);

type SegmentBtnVariants = VariantProps<typeof segmentBtn>;

interface ToggleBtnProps extends SegmentBtnVariants {
  value: RecruitStatus; // 현재 선택된 상태
  onChange: (next: RecruitStatus) => void; // 상태 변경 콜백
  className?: string; // 래퍼 div에 줄 className (선택)
}

export default function ToggleBtn({
  value,
  onChange,
  size = "sm",
  className,
}: ToggleBtnProps) {
  const isRecruiting = value === "recruiting";
  const isCompleted = value === "completed";

  return (
    <div className={twMerge("inline-flex gap-3", className)}>
      {/* 모집중 버튼 */}
      <TogglePrimitive.Root
        // pressed는 현재 value 기준으로만 제어 (Radix 내부 상태에 의존 X)
        pressed={isRecruiting}
        onPressedChange={() => onChange("recruiting")}
        className={twMerge(
          segmentBtn({ size }),
          isRecruiting
            ? // 선택된 상태 (이미지에서 왼쪽 버튼)
              "bg-accent/10 border-accent/50 text-accent hover:border-border-primary"
            : // 비선택 상태
              "bg-bg-primary text-content-secondary border-border-primary hover:bg-bg-tertiary hover:border-border-primary",
        )}
      >
        모집중
      </TogglePrimitive.Root>

      {/* 모집완료 버튼 */}
      <TogglePrimitive.Root
        pressed={isCompleted}
        onPressedChange={() => onChange("completed")}
        className={twMerge(
          segmentBtn({ size }),
          isCompleted
            ? // 선택된 상태 (이미지에서 오른쪽이 활성일 때)
              "bg-accent/10 border-accent/50 text-accent hover:border-border-primary"
            : // 비선택 상태
              "bg-bg-primary text-content-secondary border-border-primary hover:bg-bg-tertiary hover:border-border-primary",
        )}
      >
        모집완료
      </TogglePrimitive.Root>
    </div>
  );
}

/* 사용법 예시 1

import { useState } from "react";
import ToggleBtn, { RecruitStatus } from "@/components/button/ToggleBtn";

export default function PostListPage() {
  const [status, setStatus] = useState<RecruitStatus>("recruiting");

  // status 값에 따라 게시글 필터링
  const filteredPosts = allPosts.filter((post) =>
    status === "recruiting" ? post.isOpen : !post.isOpen,
  );

  return (
    <div>
      <ToggleBtn value={status} onChange={setStatus} size="md" />

      <ul className="mt-6 space-y-3">
        {filteredPosts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}

*/

/* 사용법 예시 2

"use client";

import { useState } from "react";
import ToggleBtn, { RecruitStatus } from "@/components/common/button/ToggleBtn";

export default function Home() {
  const [status, setStatus] = useState<RecruitStatus>("completed");

  return (
    <>
      <ToggleBtn value={status} onChange={setStatus} />
    </>
  );
}

*/
