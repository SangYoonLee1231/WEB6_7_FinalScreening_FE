"use client";

import { Headset } from "lucide-react";
import Avatar from "../common/Avatar";
import FindCardContainer from "../common/container/FindCardContainer";
import { PostDetail } from "@/types/post";
import { twMerge } from "tailwind-merge";
import TierSet from "../profile/TierSet";
import { isRank, isTier } from "@/types/tier";
import IntroduceBubble from "../profile/IntroduceBubble";
import PositionSet from "./PositionSet";
import MostChampion from "../profile/MostChampion";
import Champion from "@/assets/images/test_champion_thumb.png";
import WinRate from "../profile/WinRate";
import { BoxButton } from "../common/button/BoxButton";
import formatRelativeTime from "@/utils/formatRelativeTime";
import { useState } from "react";
import FindMemberCard from "./FindMemberCard";
import { Position } from "@/types/position";
import MiniProfile from "../profile/MiniProfile";

interface FindCardProps {
  data: PostDetail;
}

export default function FindCard({ data }: FindCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { writer, options, statistics } = data;
  const [tier, rank] = writer.gameAccount.tier.split(" ");
  const validTier = isTier(tier) ? tier : "UNRANKED";
  const validRank = isRank(rank) ? rank : "";

  // 샘플 데이터
  interface sampleMemberType {
    userId: number;
    nickname: string;
    profileImageUrl: string;
    comment: string;
    gameAccount: {
      summonerName: string;
      tag: string;
      tier: string;
      winRate: number;
      kda: number;
      favoriteChampions: string[];
      mainPosition: Position;
    };
  }
  const champions = [
    { id: 0, src: Champion.src, percent: 50 },
    { id: 1, src: Champion.src, percent: 50 },
    { id: 2, src: Champion.src, percent: 50 },
  ];
  const userId = writer.userId;
  const members: sampleMemberType[] = [
    {
      userId: 20,
      nickname: "커뮤니티닉네임",
      profileImageUrl: "https://cdn.example.com/profile/20.png",
      // 프로필에서 사용자가 업로드한 이미지
      // 업로드 안 했으면 null

      comment: "롤만 하는 개발자입니다.",

      gameAccount: {
        summonerName: "게임닉네임",
        tag: "#KR1",
        tier: "EMERALD IV",
        winRate: 52.3, // 시즌 전체 승률(%)
        kda: 3.21, // 계산된 KDA

        favoriteChampions: ["다리우스", "가렌", "야스오"],
        // Riot API 기반 '최근 선호 챔피언 Top3'
        // 대부분 유저는 값이 있음,
        // 데이터가 없는 신규 계정일 때만 null 가능

        mainPosition: "JUNGLE", // TOP/JUNGLE/MID/ADC/SUPPORT
      },
    },
    {
      userId: 21,
      nickname: "홍길동",
      profileImageUrl: "https://cdn.example.com/profile/20.png",
      // 프로필에서 사용자가 업로드한 이미지
      // 업로드 안 했으면 null

      comment: "롤만 하는 개발자입니다.",

      gameAccount: {
        summonerName: "동길홍",
        tag: "#KR1",
        tier: "EMERALD IV",
        winRate: 52.3, // 시즌 전체 승률(%)
        kda: 3.21, // 계산된 KDA

        favoriteChampions: ["다리우스", "가렌", "야스오"],
        // Riot API 기반 '최근 선호 챔피언 Top3'
        // 대부분 유저는 값이 있음,
        // 데이터가 없는 신규 계정일 때만 null 가능

        mainPosition: "MID", // TOP/JUNGLE/MID/ADC/SUPPORT
      },
    },
  ];

  const filled = statistics.currentMemberCount;
  const empty = options.recruitCount - filled;

  return (
    <div className="flex flex-col">
      <FindCardContainer className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="relative flex items-center gap-3">
            <div className="group">
              <Avatar
                type="profile"
                src={writer.profileImageUrl}
                size="md"
                className="cursor-pointer"
              />
              <MiniProfile className="invisible absolute bottom-13 z-10 group-hover:visible" />
            </div>

            <div>
              <div className="flex items-center gap-1">
                <h3 className="text-lg">{writer.gameAccount.summonerName}</h3>
                <h3 className="text-content-secondary text-sm">
                  {writer.gameAccount.tag}
                </h3>
                <Headset
                  size={18}
                  strokeWidth={3}
                  className={twMerge(
                    "text-content-secondary",
                    options.mic && "text-accent",
                  )}
                />
              </div>
              <h4 className="text-accent/50 text-sm">{writer.nickname}</h4>
            </div>
          </div>
          <TierSet
            tier={validTier}
            rank={validRank}
            type="mini"
            className="text-xs"
          />
        </div>

        <div className="flex flex-col gap-1">
          <IntroduceBubble content={options.memo} />
          <span className="text-content-secondary text-right text-xs">
            {formatRelativeTime(statistics.createdAt)}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <PositionSet
            type="my"
            data={options.myPosition}
            isActive={true}
            size="default"
          />
          <PositionSet
            type="looking"
            data={options.lookingPositions}
            isActive={true}
            size="default"
          />
          <MostChampion data={champions} type="mastery" size="sm" />
          {/* <MostChampion data={writer.gameAccount.favoriteChampions} />  */}
        </div>

        <div className="flex justify-between gap-10">
          <div className="flex flex-col gap-1">
            <SubTitleAndData
              title="승률"
              data={`${writer.gameAccount.winRate}%`}
            />
            <WinRate type="horizontal" winRate={writer.gameAccount.winRate} />
          </div>
          <SubTitleAndData
            title="KDA"
            data={writer.gameAccount.kda.toString()}
          />
        </div>

        <div className="bg-accent/10 border-accent/50 flex flex-col gap-3.5 rounded-xl border px-4 py-2">
          <SubTitleAndData
            title="인원"
            data={`${statistics.currentMemberCount}/${options.recruitCount}`}
          />
          <div className="flex justify-between">
            <div className="flex items-center gap-5">
              {Array.from({ length: filled }).map((_, i) => (
                <svg
                  key={`filledMember${i}`}
                  width="17"
                  height="20"
                  viewBox="0 0 17 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M11.9668 10.7694C13.4008 9.67298 14.3258 7.94452 14.3258 6C14.3258 2.68629 11.6395 0 8.32584 0C5.01213 0 2.32584 2.68629 2.32584 6C2.32584 7.94452 3.25085 9.67298 4.68485 10.7694C3.67937 11.2142 2.75434 11.8436 1.96188 12.636C1.34995 13.248 0.835182 13.939 0.42761 14.6851C-0.324507 16.0619 -0.0177813 17.4657 0.829231 18.4584C1.64464 19.414 2.95086 20 4.32584 20H12.3258C13.7008 20 15.007 19.414 15.8224 18.4584C16.6695 17.4657 16.9762 16.0619 16.2241 14.6851C15.8165 13.939 15.3017 13.248 14.6898 12.636C13.8973 11.8436 12.9723 11.2142 11.9668 10.7694Z"
                    fill="#2FD3B1"
                  />
                </svg>
              ))}
              {Array.from({ length: empty }).map((_, i) => (
                <svg
                  key={`emptyMember${i}`}
                  width="17"
                  height="20"
                  viewBox="0 0 17 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M8.32584 2C6.1167 2 4.32584 3.79086 4.32584 6C4.32584 8.20914 6.1167 10 8.32584 10C10.535 10 12.3258 8.20914 12.3258 6C12.3258 3.79086 10.535 2 8.32584 2ZM11.9668 10.7694C13.4008 9.67298 14.3258 7.94452 14.3258 6C14.3258 2.68629 11.6395 0 8.32584 0C5.01213 0 2.32584 2.68629 2.32584 6C2.32584 7.94452 3.25085 9.67298 4.68485 10.7694C3.67937 11.2142 2.75434 11.8436 1.96188 12.636C1.34995 13.248 0.835182 13.939 0.42761 14.6851C-0.324507 16.0619 -0.0177813 17.4657 0.829231 18.4584C1.64464 19.414 2.95086 20 4.32584 20H12.3258C13.7008 20 15.007 19.414 15.8224 18.4584C16.6695 17.4657 16.9762 16.0619 16.2241 14.6851C15.8165 13.939 15.3017 13.248 14.6898 12.636C13.8973 11.8436 12.9723 11.2142 11.9668 10.7694ZM8.32584 12C6.46932 12 4.68885 12.7375 3.37609 14.0503C2.90009 14.5263 2.49977 15.0637 2.18279 15.6439C1.87583 16.2058 1.97485 16.7198 2.35064 17.1602C2.75804 17.6376 3.49168 18 4.32584 18H12.3258C13.16 18 13.8936 17.6376 14.301 17.1602C14.6768 16.7198 14.7758 16.2058 14.4689 15.6439C14.1519 15.0637 13.7516 14.5263 13.2756 14.0503C11.9628 12.7375 10.1824 12 8.32584 12Z"
                    fill="#62748E"
                  />
                </svg>
              ))}
            </div>
            <BoxButton
              size="xs"
              tone="color"
              text="참여하기"
              onClick={() => {
                setIsOpen((prev) => !prev);
              }}
            />
          </div>
        </div>
      </FindCardContainer>

      {isOpen && (
        <FindCardContainer className="flex flex-col gap-5 border-t-0">
          <div className="flex flex-col">
            <h3 className="text-content-primary flex w-full items-center justify-between text-xl font-bold">
              인원 정보
              <span>{`${statistics.currentMemberCount}/${options.recruitCount}`}</span>
            </h3>
          </div>
          {Array.from({ length: options.recruitCount }).map((_, i) => (
            <FindMemberCard
              key={`member${i}`}
              masterUser={userId}
              data={members[i]}
            />
          ))}
        </FindCardContainer>
      )}
    </div>
  );
}

function SubTitleAndData({
  title,
  data,
  className,
}: {
  title: string;
  data: string;
  className?: string;
}) {
  return (
    <h5
      className={twMerge(
        "text-content-primary flex w-full items-center justify-between text-sm font-normal",
        className,
      )}
    >
      {title}
      <span className="font-semibold">{data}</span>
    </h5>
  );
}
