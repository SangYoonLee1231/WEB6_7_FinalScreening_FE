"use client";

import Image from "next/image";
import LolLogo from "@/assets/images/games/lol/lol-logo.png";
import OverwatchLogo from "@/assets/images/games/overwatch/overwatch-logo.png";
import ValorantLogo from "@/assets/images/games/valorant/valorant-logo.png";
import { BoxButton } from "@/components/common/button/BoxButton";
import { twMerge } from "tailwind-merge";
import HorizontalCardContainer from "@/components/common/container/HorizontalCardContainer";
import formatDateToDot from "@/utils/formatDateToDot";

interface GameIdItemProps {
  game: gameType;
  userData: {
    nickname: string;
    tag: string;
    time: string;
  };

  className?: string;
}

type gameType = "lol" | "overwatch" | "valorant";

const gameIcons: Record<gameType, string> = {
  lol: LolLogo.src,
  overwatch: OverwatchLogo.src,
  valorant: ValorantLogo.src,
};

export default function LinkedGameIdCard({
  game,
  userData,
  className,
}: GameIdItemProps) {
  const { nickname, tag, time } = userData;
  return (
    <HorizontalCardContainer
      className={twMerge(
        "flex h-28 w-223.5 items-center justify-between border-none",
        className,
      )}
    >
      {/* Left: Icon + Texts */}
      <div className="flex items-center gap-5">
        <div className="h-20 w-20 overflow-hidden rounded-xl bg-black p-4">
          <Image
            src={gameIcons[game]}
            alt={`${game} icon`}
            width={50}
            height={50}
            className="object-cover"
          />
        </div>

        <div className="flex flex-col">
          <span className="text-xl font-semibold">
            {game === "lol"
              ? "리그 오브 레전드"
              : game === "valorant"
                ? "발로란트"
                : "오버워치"}
          </span>
          <span className="text-content-secondary text-base">
            {nickname} #{tag}
          </span>
        </div>
      </div>

      {/* Right: Date + Button */}
      <div className="flex items-center gap-3">
        <span className="text-content-secondary text-base">
          연동 날짜: {formatDateToDot(time)}
        </span>

        <BoxButton
          tone="black"
          text="연동 수정"
          className="h-9 w-21 rounded-xl px-4 py-2 text-sm"
          size="sm"
        />
        <BoxButton
          tone="negative"
          text="연동 해제"
          className="h-9 w-21 rounded-xl px-4 py-2 text-sm"
          size="sm"
        />
      </div>
    </HorizontalCardContainer>
  );
}
