"use client";

import Avatar from "@/components/common/Avatar";
import { BoxButton } from "@/components/common/button/BoxButton";
import HorizontalCardContainer from "@/components/common/container/HorizontalCardContainer";
import IntroduceBubble from "@/components/profile/IntroduceBubble";
import TierSet from "@/components/profile/TierSet";
import WinRate from "@/components/profile/WinRate";
import ReviewCard from "@/components/review/ReviewCard";
import ReviewPercent from "@/components/review/ReviewPercent";
import Image from "next/image";
import LolLogo from "@/assets/images/games/lol/lol-logo.png";
import { UserProfile } from "@/types/profile";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { GameAccount } from "@/types/game-account";
import { Unlink } from "lucide-react";

export default function ProfilePageContent({
  profileData,
  gameAccountData,
}: {
  profileData: UserProfile | null;
  gameAccountData: GameAccount[] | null;
}) {
  const router = useRouter();
  const rations = { GOOD: 3, NORMAL: 6, BAD: 1 };

  useEffect(() => {
    if (!profileData) {
      alert("유저 프로필을 불러올 수 없습니다.");
      router.back();
      return;
    }
  }, []);

  if (!profileData) return null;

  const { nickname, profile_image, comment } = profileData;

  const lolData = gameAccountData?.filter(
    (item) =>
      item.gameType === "LEAGUE_OF_LEGEND" ||
      item.gameType === "리그 오브 레전드",
  )[0];

  return (
    <section className="flex h-full w-full">
      <div className="flex h-full w-full flex-col gap-9">
        {/* 프로필 정보 */}
        <div className="mt-20 flex flex-col gap-5">
          <div className="flex flex-row gap-1 text-4xl font-bold">
            <p className="text-content-main">
              <span className="text-accent">{nickname}</span>
              님의 프로필
            </p>
          </div>
          <div className="flex flex-row items-center gap-8">
            <Avatar size="xl" src={profile_image ?? ""} type="profile" />
            <div className="flex flex-col gap-4">
              <div className="flex flex-row items-center justify-between">
                <span className="text-content-primary text-2xl font-semibold">
                  {nickname}
                </span>
                <BoxButton
                  size="sm"
                  tone="negative"
                  className="w-12 py-3"
                  text="차단"
                />
              </div>
              <IntroduceBubble size="lg" content={comment} />
            </div>
          </div>
        </div>
        {/* 연동된 게임 정보 */}
        <div className="flex flex-col gap-4">
          <p className="text-content-main text-3xl font-bold">
            연동된 게임 정보
          </p>
          {/* 게임 탭*/}
          <div className="border-accent w-fit border-b-2">
            <div className="text-accent m-2 flex items-center gap-1 font-semibold">
              <Image src={LolLogo} alt="LoL logo" width={24} />
              <span>리그 오브 레전드</span>
            </div>
          </div>
          {lolData ? (
            <div className="flex flex-col justify-center gap-8">
              {/* 게임 프로필 정보 및 전적 갱신 버튼 */}
              <div className="flex items-center gap-8">
                <div className="flex items-center gap-3">
                  <Avatar type="profile" src="" />
                  <div className="flex items-center gap-1">
                    <span className="text-content-primary text-xl font-semibold">
                      {lolData.gameNickname}
                    </span>
                    <span className="text-content-secondary text-sm">
                      #{lolData.gameTag}
                    </span>
                  </div>
                </div>
                <BoxButton
                  tone="color"
                  size="sm"
                  className="w-20 py-3"
                  text="전적 갱신"
                />
              </div>
              {/* 랭크 및 승률 정보 */}
              <div className="m-auto grid w-[90%] grid-cols-[1fr_1fr_1fr] gap-5">
                <HorizontalCardContainer className="flex flex-col items-center justify-center gap-2 border-none px-12 py-6">
                  <p className="text-semibold text-xl">개인/2인 랭크 게임</p>
                  <div className="flex flex-col">
                    <TierSet tier="DIAMOND" rank="I" />
                  </div>
                </HorizontalCardContainer>
                <HorizontalCardContainer className="flex flex-col items-center justify-center gap-2 border-none px-12 py-6">
                  <p className="text-semibold text-xl">자유 랭크 게임</p>
                  <div className="flex flex-col">
                    <TierSet tier="DIAMOND" rank="I" />
                  </div>
                </HorizontalCardContainer>
                <HorizontalCardContainer className="flex flex-col items-center justify-center gap-5.5 border-none px-12 py-6">
                  <p className="text-semibold text-xl">승률</p>
                  <WinRate type="donut" className="w-25" />
                </HorizontalCardContainer>
              </div>
              {/* 최근선호 챔피언 */}
              {/* 최근 게임 내역 */}
            </div>
          ) : (
            <div className="m-auto flex w-full flex-col items-center justify-center gap-6">
              <Unlink size={80} className="text-bg-tertiary" />
              <p className="text-content-secondary text-xl font-bold">
                연동된 계정이 없습니다
              </p>
            </div>
          )}
        </div>

        {/* 리뷰 내역 */}
        <div className="flex flex-col gap-4">
          <p className="text-content-main text-3xl font-bold">리뷰 내역</p>
          <div className="m-auto flex w-[90%] flex-col gap-12.5">
            {/* 리뷰 분포 */}
            <ReviewPercent type="default" ratios={rations} />
            {/* 리뷰 상세 내역 */}
            <div className="flex flex-col gap-7.5">
              <p className="text-content-secondary text-center text-base">
                총 12개의 리뷰
              </p>
              <div className="flex flex-col gap-2">
                <ReviewCard
                  mode="received"
                  gameName="lol"
                  communityName="커뮤니티 닉네임"
                  content="리뷰내용"
                  emotion="good"
                  createdAt="2025-12-12T00:12:00.000Z"
                  profileImageURL=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
