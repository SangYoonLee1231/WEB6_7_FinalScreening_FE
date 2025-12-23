"use client";

import { Crown } from "lucide-react";
import CircleBtn from "../common/button/CircleBtn";
import Dropdown from "../common/Dropdown";
import FindHistoryCard from "./FindHistoryCard";
import { useEffect } from "react";
import { useMenuStore, useMyProfileMenuStore } from "@/stores/menuStore";
import { useMyParties } from "@/hooks/useMyParties";
import LoadingBouncy from "../common/loading/LoadingBouncy";

export default function FindHistoryContainer() {
  const { setMenu } = useMenuStore();
  const { setMenu: setProfileMenu } = useMyProfileMenuStore();

  useEffect(() => {
    setMenu("profile");
    setProfileMenu("find-history");
  }, []);

  const { data, isLoading, error, refetch } = useMyParties();

  const parties = data?.data.parties ?? [];

  return (
    <div>
      <div className="mb-5 flex items-center gap-2">
        <CircleBtn size="xs" className="bg-bg-quaternary">
          <Crown size={16} />
        </CircleBtn>
        <Dropdown
          placeholder="게임을 선택해주세요"
          items={[
            { value: "all", label: "전체 게임" },
            { value: "lol", label: "리그 오브 레전드" },
          ]}
          value="all"
          name="gameType"
          onValueChange={() => {}}
          className="min-w-42"
        />
        <Dropdown
          placeholder="모집글의 상태를 선택해주세요"
          items={[
            { value: "all", label: "전체 상태" },
            { value: "recruiting", label: "모집중" },
            { value: "completed", label: "모집완료" },
            { value: "done", label: "게임완료" },
          ]}
          value="all"
          name="gameType"
          onValueChange={() => {}}
          className="min-w-30"
        />
      </div>
      {isLoading ? (
        <div className="flex h-full w-full items-center justify-center">
          <LoadingBouncy />
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {parties.map((p, index) => (
            <FindHistoryCard
              key={index}
              mode="written"
              gameName="lol"
              communityName="커뮤니티닉네임"
              content="파티 모집글 내용"
              gameMode="솔로 랭크"
              createdAt="2025-12-12T00:12:00.000Z"
            />
          ))}
        </div>
      )}
    </div>
  );
}
