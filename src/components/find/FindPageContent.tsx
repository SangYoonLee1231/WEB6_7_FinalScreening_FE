"use client";

import { BoxButton } from "@/components/common/button/BoxButton";
import ToggleBtn from "@/components/common/button/ToggleBtn";
import Dropdown from "@/components/common/Dropdown";
import FindCard from "@/components/find/main-card/FindCard";
import PositionFilterBtns from "@/components/find/PositionFilterBtns";
import { useEffect } from "react";
import { useMenuStore } from "@/stores/menuStore";
import { Post } from "@/types/post";
import { Unlink } from "lucide-react";
import gameIconLol from "@/assets/images/game-icon-lol.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { QUEUE_TYPES, QUEUE_TYPES_LABEL } from "@/types/party";
import { TIERS, TIERS_LABEL } from "@/types/tier";
import { MyProfile } from "@/types/profile";
import { GameAccount } from "@/types/game-account";
import { useMyParties } from "@/hooks/useMyParties";
import LoadingBouncy from "../common/loading/LoadingBouncy";

export default function FindPageContent({
  postData,
  loginData,
  gameAccountData,
}: {
  postData: Post[] | null;
  loginData: MyProfile | null;
  gameAccountData: GameAccount[] | null;
}) {
  const router = useRouter();

  const { data, isLoading } = useMyParties();
  const { currentGame, setMenu } = useMenuStore();

  const currentParty =
    data?.data.parties.filter((party) => party.status === "RECRUIT")[0] ?? null;

  useEffect(() => {
    setMenu("find");
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <LoadingBouncy />
      </div>
    );
  }

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
            value="SUMMONERS_RIFT"
            items={[
              {
                value: "SUMMONERS_RIFT",
                label: (
                  <div className="flex items-center gap-2.5">
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
              if (!loginData) {
                alert("로그인이 필요한 기능입니다.");
                return;
              }
              if (gameAccountData?.length === 0) {
                alert("게임 아이디 연동 후 이용할 수 있는 기능입니다.");
                router.push(`/myprofile/link`);
                return;
              }
              if (currentParty) {
                alert("현재 모집중인 파티가 있습니다.");
                return;
              }
              router.push(`/${currentGame}/post`);
            }}
          />
        </div>
      </div>
      {postData && postData.length > 0 ? (
        <div className="flex flex-wrap justify-between gap-y-7.5 px-7.5">
          {postData.map((post, index) => (
            <FindCard
              key={index}
              data={post}
              gameAccountData={gameAccountData ?? null}
              currentUserId={loginData?.id ?? null}
            />
          ))}
        </div>
      ) : (
        <div className="m-auto flex w-full flex-col items-center justify-center gap-10.5">
          <Unlink size={160} className="text-bg-tertiary" />
          <p className="text-content-secondary text-[32px] font-bold">
            등록된 모집글이 없습니다
          </p>
        </div>
      )}
    </div>
  );
}
