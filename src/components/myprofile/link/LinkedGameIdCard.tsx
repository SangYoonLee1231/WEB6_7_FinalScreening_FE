"use client";

import Image from "next/image";
import LolLogo from "@/assets/images/games/lol/lol-logo.png";
import OverwatchLogo from "@/assets/images/games/overwatch/overwatch-logo.png";
import ValorantLogo from "@/assets/images/games/valorant/valorant-logo.png";
import { BoxButton } from "@/components/common/button/BoxButton";
import { twMerge } from "tailwind-merge";
import HorizontalCardContainer from "@/components/common/container/HorizontalCardContainer";
import formatDateToDot from "@/utils/formatDateToDot";
import { GameAccount } from "@/types/game-account";
import { UnlinkGameAccount } from "@/services/game-account/link.client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import LinkGameIdFormModal from "./LinkGameIdFormModal";

interface GameIdItemProps {
  gameAccountData: GameAccount;
  className?: string;
}

type gameType = "LEAGUE_OF_LEGENDS" | "OVERWATCH" | "VALORANT";

const gameIcons: Record<gameType, string> = {
  LEAGUE_OF_LEGENDS: LolLogo.src,
  OVERWATCH: OverwatchLogo.src,
  VALORANT: ValorantLogo.src,
};

export default function LinkedGameIdCard({
  gameAccountData,
  className,
}: GameIdItemProps) {
  const router = useRouter();
  const { gameAccountId, gameType, gameNickname, gameTag, updatedAt } =
    gameAccountData;
  const [isOpen, setIsOpen] = useState(false);

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
            src={gameIcons[gameType as gameType]}
            alt={`${gameType} icon`}
            width={50}
            height={50}
            className="object-cover"
          />
        </div>

        <div className="flex flex-col">
          <span className="text-xl font-semibold">
            {gameType === "LEAGUE_OF_LEGENDS"
              ? "리그 오브 레전드"
              : gameType === "VALORANT"
                ? "발로란트"
                : "오버워치"}
          </span>
          <span className="text-content-secondary text-base">
            {gameNickname} #{gameTag}
          </span>
        </div>
      </div>

      {/* Right: Date + Button */}
      <div className="flex items-center gap-3">
        <span className="text-content-secondary text-base">
          연동 날짜: {formatDateToDot(updatedAt)}
        </span>

        <BoxButton
          tone="black"
          text="연동 수정"
          className="h-9 w-21 rounded-xl px-4 py-2 text-sm"
          size="sm"
          onClick={() => {
            setIsOpen(true);
          }}
        />
        <BoxButton
          tone="negative"
          text="연동 해제"
          className="h-9 w-21 rounded-xl px-4 py-2 text-sm"
          size="sm"
          onClick={async () => {
            const yes = confirm("정말 해제하시겠습니까?");
            if (yes) {
              await UnlinkGameAccount(String(gameAccountId));
            }

            router.replace("/myprofile/link");
          }}
        />
      </div>
      <LinkGameIdFormModal
        mode="modify"
        initialData={gameAccountData}
        isOpen={isOpen}
        onOpenChange={(open) => setIsOpen(open)}
      />
    </HorizontalCardContainer>
  );
}
