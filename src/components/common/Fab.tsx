"use client";

import * as React from "react";
import * as Popover from "@radix-ui/react-popover";
import "@/css/pab.css";
import FindInfoModal from "../find/FindInfoModal";
import CircleBtn from "./button/CircleBtn";
import { MessageCircleMore, Plus, Users } from "lucide-react";
import { postDetailMock } from "@/mocks/post.mock";
import { sampleMemberType } from "../find/main-card/FindCard";

type View = "actions" | "find" | "chat";

// 샘플 데이터
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

export function Fab() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [view, setView] = React.useState<View>("actions");

  const handleMouseEnter = () => setIsOpen(true);
  const handleMouseLeave = () => {
    setIsOpen(false);
    setView("actions");
  };

  return (
    <>
      <div
        className="fixed right-6 bottom-6"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Popover.Root open={isOpen} onOpenChange={setIsOpen}>
          <Popover.Trigger asChild>
            <CircleBtn className="bg-gradient-positive h-13 w-13 transition-all outline-none hover:scale-[1.03] hover:shadow-[0px_0px_10px] hover:shadow-[#71E9D0]">
              <Plus size={35} />
            </CircleBtn>
          </Popover.Trigger>

          <Popover.Portal>
            <Popover.Content
              side="top"
              align="center"
              sideOffset={10}
              className="PabContent"
            >
              {view === "actions" ? (
                <>
                  <CircleBtn
                    onClick={() => setView("find")}
                    className="bg-bg-primary hover:shadow-bg-tertiary h-13 w-13 transition-all outline-none hover:scale-[1.03] hover:shadow-[0px_0px_10px]"
                  >
                    <Users size={25} strokeWidth={3} />
                  </CircleBtn>
                  <CircleBtn
                    onClick={() => setView("chat")}
                    className="bg-bg-primary hover:shadow-bg-tertiary h-13 w-13 transition-all outline-none hover:scale-[1.03] hover:shadow-[0px_0px_10px]"
                  >
                    <MessageCircleMore size={25} strokeWidth={3} />
                  </CircleBtn>
                </>
              ) : view === "find" ? (
                <FindInfoModal
                  currentUserId={20}
                  postData={postDetailMock}
                  memberData={[]}
                />
              ) : (
                <></>
              )}
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>
      </div>
    </>
  );
}
