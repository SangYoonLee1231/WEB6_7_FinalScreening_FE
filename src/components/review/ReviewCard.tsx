"use client";

import Image, { type StaticImageData } from "next/image";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

import emojiGood from "@/assets/images/emoji/emoji_good.png";
import emojiNormal from "@/assets/images/emoji/emoji_normal.png";
import emojiBad from "@/assets/images/emoji/emoji_bad.png";

type ReviewMode = "received" | "written";
type Emotion = "good" | "normal" | "bad";

const EMOJI_MAP: Record<Emotion, StaticImageData> = {
  good: emojiGood,
  normal: emojiNormal,
  bad: emojiBad,
};

interface ReviewCardProps {
  mode: ReviewMode; // "received" | "written"
  gameIconSrc: string;
  communityName: string;
  content: string;
  emotion: Emotion; // 밖에서는 이 값만 넘기면 됨
  time: string; // 시간 안내 문구 (예: "5분 전")
}

export default function ReviewCard({
  mode,
  gameIconSrc,
  communityName,
  content,
  emotion,
  time,
}: ReviewCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  // 작성한 리뷰만 토글 가능
  const isToggleable = mode === "written";

  const handleToggle = () => {
    if (!isToggleable) return; // 받은 리뷰면 클릭 무시
    setIsOpen((prev) => !prev);
  };

  const emotionSrc = EMOJI_MAP[emotion];

  return (
    <article className="bg-bg-secondary w-full rounded-xl px-4 py-3">
      {/* 상단 바 */}
      <button
        type="button"
        onClick={handleToggle}
        disabled={!isToggleable}
        className="flex w-full items-center gap-3 text-left"
      >
        {/* 좌측 게임 아이콘 */}
        <div className="shrink-0">
          <img
            src={gameIconSrc}
            alt=""
            className="h-10 w-10 rounded-md object-cover"
          />
        </div>

        {/* 커뮤니티 닉네임 + 내용 */}
        <div className="flex flex-1 items-center gap-3">
          <div className="flex shrink-0 items-center gap-2">
            <div className="bg-bg-quaternary h-8 w-8 rounded-full" />
            <span className="text-content-primary text-sm">
              {communityName}
            </span>
          </div>

          <div className="bg-bg-tertiary text-content-primary flex-1 rounded-md px-4 py-2 text-sm">
            {content}
          </div>
        </div>

        {/* 이모지 */}
        <div className="relative mx-3 h-6 w-6">
          <Image
            src={emotionSrc}
            alt={`${emotion} emoji`}
            fill
            className="object-contain"
          />
        </div>

        {/* 시간 + 화살표 */}
        <div className="text-content-secondary flex items-center gap-1 text-xs">
          <span>{time}</span>
          {isToggleable && (
            // 안 펼쳐짐 → 아래 화살표, 펼쳐짐 → 위 화살표
            <span className="text-base">
              {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </span>
          )}
        </div>
      </button>

      {/* 하단 수정/삭제 영역 (작성한 리뷰 + 펼쳐진 상태에서만) */}
      {isToggleable && isOpen && (
        <div className="mt-3 flex justify-end gap-2">
          <button className="rounded-full bg-slate-500 px-4 py-1 text-sm text-white">
            수정
          </button>
          <button className="bg-negative rounded-full px-4 py-1 text-sm text-white">
            삭제
          </button>
        </div>
      )}
    </article>
  );
}

/* 사용법 예시

import ReviewCard from "@/components/review/ReviewCard";

export default function Home() {
  return (
    <>
      // 받은 리뷰 리스트
      <ReviewCard
        mode="received"
        gameIconSrc="/lol.png"
        communityName="커뮤니티닉네임"
        content="리뷰내용"
        emotion="good"
        time="5분 전"
      />

      // 작성한 리뷰 리스트
      <ReviewCard
        mode="written"
        gameIconSrc="/lol.png"
        communityName="커뮤니티닉네임"
        content="리뷰내용"
        emotion="bad"
        time="5분 전"
      />
    </>
  );
}

*/
