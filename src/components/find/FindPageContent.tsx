"use client";

import { BoxButton } from "@/components/common/button/BoxButton";
import ToggleBtn from "@/components/common/button/ToggleBtn";
import Dropdown from "@/components/common/Dropdown";
import FindCard from "@/components/find/main-card/FindCard";
import PositionFilterBtns from "@/components/find/PositionFilterBtns";
import { useEffect, useState } from "react";
import FindCreateForm from "./FindCreateForm";
import FindDetailModal from "./FindDetailModal";
import { useMenuStore } from "@/stores/menuStore";
import { Post } from "@/types/post";
import { Unlink } from "lucide-react";
import { postListResponseMock } from "@/mocks/post.mock";

export default function FindPageContent({ postData }: { postData: Post[] }) {
  // 라우팅으로 변경 예정
  const [isOpenFindCreateForm, setIsOpenFindCreateForm] = useState(false);
  const [isOpenFindDetailModal, setIsOpenFindDetailModal] = useState(false);
  const { setMenu } = useMenuStore();
  const postDataMock = postListResponseMock.posts;

  useEffect(() => {
    setMenu("find");
  }, []);

  return (
    <div className="flex h-full flex-col gap-7.5">
      <ToggleBtn value="recruiting" onChange={() => {}} className="mt-17.5" />
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <PositionFilterBtns />
          <Dropdown
            name="gameMode"
            placeholder="게임 모드를 선택해주세요"
            onValueChange={() => {}}
            items={[
              { value: "SR", label: "소환사의 협곡" },
              { value: "ARAM", label: "칼바람 나락" },
            ]}
            className="min-w-50"
          />
          <Dropdown
            name="queueType"
            placeholder="큐 타입을 선택해주세요"
            onValueChange={() => {}}
            items={[
              { value: "SOLO", label: "솔로 랭크" },
              { value: "FLEX", label: "자유 랭크" },
              { value: "GENERAL", label: "일반" },
            ]}
            className="min-w-50"
          />
          <Dropdown
            name="tiers"
            placeholder="티어를 선택해주세요"
            onValueChange={() => {}}
            items={[
              { value: "ALL", label: "전체 티어" },
              { value: "BRONZE", label: "브론즈" },
              { value: "SILVER", label: "실버" },
            ]}
            className="min-w-50"
          />
        </div>
        <div className="text-content-secondary flex items-center gap-4">
          <span>나만의 듀오를 찾고 싶다면</span>
          <span className="font-light">―</span>
          <BoxButton
            text="모집글 작성"
            size="sm"
            tone={"gradient_positive"}
            className="font-semibold"
            onClick={() => setIsOpenFindCreateForm(true)}
          />
        </div>
        <FindCreateForm
          type="create"
          isOpen={isOpenFindCreateForm}
          onOpenChange={(open: boolean) => {
            setIsOpenFindCreateForm(open);
          }}
        />
      </div>
      {postDataMock.length < 1 ? (
        <div className="m-auto flex w-full flex-col items-center justify-center gap-10.5">
          <Unlink size={160} className="text-bg-tertiary" />
          <p className="text-content-secondary text-[32px] font-bold">
            등록된 모집글이 없습니다
          </p>
        </div>
      ) : (
        <div className="flex flex-wrap justify-between gap-y-7.5 px-7.5">
          {postDataMock.map((post, index) => (
            <FindCard
              key={index}
              data={post}
              onClick={() => setIsOpenFindDetailModal(true)}
            />
          ))}

          <FindDetailModal
            isOpen={isOpenFindDetailModal}
            onOpenChange={(open: boolean) => {
              setIsOpenFindDetailModal(open);
            }}
          />
        </div>
      )}
    </div>
  );
}
