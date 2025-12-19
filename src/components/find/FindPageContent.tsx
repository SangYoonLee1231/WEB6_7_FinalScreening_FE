"use client";

import { BoxButton } from "@/components/common/button/BoxButton";
import ToggleBtn from "@/components/common/button/ToggleBtn";
import Dropdown from "@/components/common/Dropdown";
import FindCard from "@/components/find/main-card/FindCard";
import PositionFilterBtns from "@/components/find/PositionFilterBtns";
import { useEffect, useState } from "react";
import FindDetailModal from "./FindDetailModal";
import { useMenuStore } from "@/stores/menuStore";
import { Post } from "@/types/post";
import { Unlink } from "lucide-react";
import gameIconLol from "@/assets/images/game-icon-lol.png";
import gameIconAram from "@/assets/images/game-icon-aram.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { QUEUE_TYPES, QUEUE_TYPES_LABEL } from "@/types/party";
import { TIERS, TIERS_LABEL } from "@/types/tier";

export default function FindPageContent({
  postData,
  isLogin,
}: {
  postData: Post[];
  isLogin: boolean;
}) {
  const router = useRouter();

  const [isOpenFindDetailModal, setIsOpenFindDetailModal] = useState(false);
  const { currentGame, setMenu } = useMenuStore();

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
            value="1"
            items={[
              {
                value: "1",
                label: (
                  <div className="flex items-center gap-2.5">
                    {" "}
                    <Image
                      src={gameIconLol}
                      alt={`lol icon`}
                      width={20}
                      className="object-cover"
                    />
                    <span>소환사의 협곡</span>
                  </div>
                ),
              },
              {
                value: "2",
                label: (
                  <div className="flex items-center gap-2.5">
                    <Image
                      src={gameIconAram}
                      alt={`aram icon`}
                      width={20}
                      className="object-cover"
                    />
                    <span>칼바람 나락</span>
                  </div>
                ),
              },
            ]}
            className="min-w-50"
          />
          <Dropdown
            name="queueType"
            placeholder="큐 타입을 선택해주세요"
            value={QUEUE_TYPES[0]}
            onValueChange={() => {}}
            items={QUEUE_TYPES.map((t) => ({
              value: t,
              label: QUEUE_TYPES_LABEL[t],
            }))}
            className="min-w-50"
          />
          <Dropdown
            name="tiers"
            placeholder="티어를 선택해주세요"
            value="ALL"
            onValueChange={() => {}}
            items={[
              { value: "ALL", label: "전체 티어" },
              ...TIERS.map((t) => ({ value: t, label: TIERS_LABEL[t] })),
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
            onClick={() => {
              if (!isLogin) {
                alert("로그인이 필요한 기능입니다.");
                return;
              }
              router.push(`/${currentGame}/post`);
            }}
          />
        </div>
      </div>
      {postData.length < 1 ? (
        <div className="m-auto flex w-full flex-col items-center justify-center gap-10.5">
          <Unlink size={160} className="text-bg-tertiary" />
          <p className="text-content-secondary text-[32px] font-bold">
            등록된 모집글이 없습니다
          </p>
        </div>
      ) : (
        <div className="flex flex-wrap justify-between gap-y-7.5 px-7.5">
          {postData.map((post, index) => (
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
