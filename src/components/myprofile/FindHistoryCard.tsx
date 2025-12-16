"use client";

import emojiGood from "@/assets/images/emoji/emoji_good.png";
import emojiNormal from "@/assets/images/emoji/emoji_normal.png";
import emojiBad from "@/assets/images/emoji/emoji_bad.png";

import lolLogo from "@/assets/images/games/lol/lol-logo.png";
import overwatchLogo from "@/assets/images/games/overwatch/overwatch-logo.png";
import valorantLogo from "@/assets/images/games/valorant/valorant-logo.png";

import type { EmojiType as Emotion } from "@/types/emoji";
import Image, { StaticImageData } from "next/image";
import { useState } from "react";
import formatRelativeTime from "@/utils/formatRelativeTime";
import { ChevronDown, ChevronUp, Crown } from "lucide-react";
import IntroduceBubble from "../profile/IntroduceBubble";
import HorizontalCardContainer from "../common/container/HorizontalCardContainer";
import StateBadge from "../common/StateBadge";
import Avatar from "../common/Avatar";
import { BoxButton } from "../common/button/BoxButton";
import { twMerge } from "tailwind-merge";

type ReviewMode = "received" | "written";
type GameName = "lol" | "overwatch" | "valorant";

const EMOJI_MAP: Record<Emotion, StaticImageData> = {
  good: emojiGood,
  normal: emojiNormal,
  bad: emojiBad,
};

const GAME_LOGO_MAP: Record<GameName, StaticImageData> = {
  lol: lolLogo,
  overwatch: overwatchLogo,
  valorant: valorantLogo,
};

interface FindHistoryCardProps {
  mode: ReviewMode; // "received" | "written"
  gameName: GameName;
  communityName: string;
  gameMode: string;
  content: string;
  createdAt: string; // ISO 날짜 문자열
}

export default function FindHistoryCard({
  gameName,
  communityName,
  gameMode,
  content,
  createdAt,
}: FindHistoryCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  let hasReviewed = true;

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const gameLogoSrc = GAME_LOGO_MAP[gameName];
  return (
    <div>
      <HorizontalCardContainer
        className={twMerge(
          "flex w-full cursor-pointer items-center justify-between gap-3 text-left text-base",
          isOpen && "rounded-b-none",
        )}
      >
        <button
          type="button"
          onClick={handleToggle}
          className="flex w-full cursor-pointer items-center justify-between gap-3 text-left text-base"
        >
          <Image
            src={gameLogoSrc}
            alt={`${gameName} logo`}
            width={40}
            height={40}
            className="h-10 w-10 rounded-md object-cover"
          />

          {/* 커뮤니티 닉네임 + 내용 */}
          <div className="flex shrink-0 items-center gap-2">
            <div className="bg-bg-quaternary h-8 w-8 rounded-full" />
            <span className="text-content-primary">{communityName}</span>
          </div>
          <span className="text-accent font-semibold">{gameMode}</span>
          <IntroduceBubble content={content} size="sm" />

          <StateBadge state="RECRUITING" />

          {/* 시간 + 화살표 */}
          <div className="text-content-secondary flex items-center gap-1 text-xs">
            <span>{formatRelativeTime(createdAt)}</span>
            <span className="text-base">
              {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </span>
          </div>
        </button>
      </HorizontalCardContainer>
      {isOpen && (
        <>
          <HorizontalCardContainer
            className={isOpen && "rounded-t-none border-t-0"}
          >
            {/* 하단 수정/삭제 영역 (작성한 리뷰 + 펼쳐진 상태에서만) */}
            <div className="space-y-4">
              <p className="text-sm font-bold">함께 플레이 한 유저</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Avatar src="" type="profile" size="xs" />
                  <span>커뮤니티닉네임</span>
                  <Crown size={18} className="text-accent" />
                </div>
                {hasReviewed ? (
                  <span className="text-accent text-xs">작성 완료</span>
                ) : (
                  <BoxButton
                    text="리뷰 작성"
                    size="xs"
                    className="bg-accent text-xs"
                  />
                )}
              </div>
            </div>
          </HorizontalCardContainer>
          <div className="mt-3 flex justify-end gap-2">
            <BoxButton text="수정" tone="black" size="xs" />
            <BoxButton text="삭제" tone="negative" size="xs" />
          </div>
        </>
      )}
    </div>
  );
}
