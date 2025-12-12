"use client";

import Image from "next/image";
import LolLogo from "@/assets/images/games/lol/lol-logo.png";
import OverwatchLogo from "@/assets/images/games/overwatch/overwatch-logo.png";
import ValorantLogo from "@/assets/images/games/valorant/valorant-logo.png";
import { BoxButton } from "@/components/common/button/BoxButton";
import { twMerge } from "tailwind-merge";
import HorizontalCardContainer from "@/components/common/container/HorizontalCardContainer";

interface GameIdItemProps {
  game: gameType;
  nickname: string;
  tag: string;
  time: string;
  className: string;
  onUnlink: () => void; // "연동 해제" 버튼 클릭 핸들러
}

type gameType = "lol" | "overwatch" | "valorant";

const gameIcons: Record<gameType, string> = {
  lol: LolLogo.src,
  overwatch: OverwatchLogo.src,
  valorant: ValorantLogo.src,
};

export default function LinkedGameIdCard({
  game,
  nickname,
  tag,
  time,
  className,
  onUnlink,
}: GameIdItemProps) {
  return (
    <HorizontalCardContainer className={twMerge("flex w-223.5 h-28 items-center border-none justify-between", className)}>
      
      {/* Left: Icon + Texts */}
      <div className="flex items-center gap-5">
        <div className="h-20 w-20 p-4 overflow-hidden rounded-xl bg-black">
          <Image
            src={gameIcons[game]}
            alt={`${game} icon`}
            width={50}
            height={50}
            className="object-cover"
          />
        </div>

        <div className="flex flex-col">
          <span className="text-xl font-semibold">{game}</span>
          <span className="text-base text-content-secondary">
            {nickname} #{tag}
          </span>
        </div>
      </div>

      {/* Right: Date + Button */}
      <div className="flex items-center gap-5">
        <span className="text-base text-content-secondary">Date: {time}</span>

        <BoxButton
          tone="negative"
          text="연동 해제"
          onClick={onUnlink}
          className="rounded-xl w-21 h-9 px-4 py-2 text-sm"
        />
      </div>

    </HorizontalCardContainer>
  );
}