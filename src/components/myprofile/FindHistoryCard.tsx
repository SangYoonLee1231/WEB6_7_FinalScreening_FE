"use client";

import lolLogo from "@/assets/images/games/lol/lol-logo.png";
import overwatchLogo from "@/assets/images/games/overwatch/overwatch-logo.png";
import valorantLogo from "@/assets/images/games/valorant/valorant-logo.png";
import Image, { StaticImageData } from "next/image";
import { useState } from "react";
import formatRelativeTime from "@/utils/formatRelativeTime";
import { ChevronDown, ChevronUp, Crown } from "lucide-react";
import IntroduceBubble from "../profile/IntroduceBubble";
import HorizontalCardContainer from "../common/container/HorizontalCardContainer";
import StateBadge from "../common/StateBadge";
import Avatar from "../common/Avatar";
import { BoxButton } from "../common/button/BoxButton";
import { twMerge } from "tailwind-merge";
import { MyPartySummary, QUEUE_TYPES_LABEL } from "@/types/party";
import { PostStatus } from "@/types/post";
import { useGetPartyDetail } from "@/hooks/useGetPartyDetail";
import { useRouter } from "next/navigation";
import { useMenuStore } from "@/stores/menuStore";
import { deletePost } from "@/services/posts.client";
import { useGetRequestReviews } from "@/hooks/reviews/useGetRequestReviews";
import { showToast } from "@/lib/toast";

type GameName = "lol" | "overwatch" | "valorant";

const GAME_LOGO_MAP: Record<GameName, StaticImageData> = {
  lol: lolLogo,
  overwatch: overwatchLogo,
  valorant: valorantLogo,
};

export default function FindHistoryCard({
  PartyData,
  currentUserId,
}: {
  PartyData: MyPartySummary;
  currentUserId: number;
}) {
  const router = useRouter();

  const { currentGame } = useMenuStore();

  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const { postId, postTitle, queueType, status, myRole, joinedAt } = PartyData;

  const { data: detailParty, isLoading: detailPartyIsLoading } =
    useGetPartyDetail(postId);

  const gameLogoSrc = GAME_LOGO_MAP["lol"];

  const members =
    detailParty?.members.sort((a, b) => a.partyMemberId - b.partyMemberId) ??
    [];
  const leader = members.filter((m) => m.role === "LEADER")[0];

  const { data: RequestReviewsData, isLoading: RequestReviewsIsLoading } =
    useGetRequestReviews();

  const currentRequestReview = RequestReviewsData
    ? RequestReviewsData?.filter((r) => r.partyId === detailParty?.partyId)
    : null;

  if (detailPartyIsLoading || RequestReviewsIsLoading) return null;

  return (
    <div>
      <HorizontalCardContainer
        className={twMerge(
          "flex w-full cursor-pointer items-center justify-between gap-3 text-left text-base",
          isOpen && "rounded-b-none",
        )}
      >
        <button
          type="button"
          onClick={handleToggle}
          className="flex w-full cursor-pointer items-center justify-between gap-3 text-left text-base"
        >
          <Image
            src={gameLogoSrc}
            alt={`lol logo`}
            width={40}
            height={40}
            className="h-10 w-10 rounded-md object-cover"
          />

          {/* 커뮤니티 닉네임 + 내용 */}
          <div className="flex shrink-0 items-center gap-2">
            <Avatar
              type="profile"
              src={leader.profileImage}
              alt="leader profile image"
              width={32}
              height={32}
              className="h-8 w-8"
            />

            <span className="text-content-primary">{leader.nickname}</span>
          </div>
          <span className="text-accent font-semibold">
            {QUEUE_TYPES_LABEL[queueType]}
          </span>
          <IntroduceBubble content={postTitle} size="sm" />

          <StateBadge state={status as PostStatus} className="w-21" />

          {/* 시간 + 화살표 */}
          <div className="text-content-secondary flex w-15.5 items-center justify-end gap-1 text-xs">
            <span>{formatRelativeTime(joinedAt)}</span>
            <span className="text-base">
              {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </span>
          </div>
        </button>
      </HorizontalCardContainer>
      {isOpen && (
        <>
          <HorizontalCardContainer
            className={isOpen && "rounded-t-none border-t-0"}
          >
            {/* 하단 수정/삭제 영역 (작성한 리뷰 + 펼쳐진 상태에서만) */}
            <div className="space-y-4">
              <p className="text-sm font-bold">함께 플레이 한 유저</p>
              {members &&
                members.map((m, index) => (
                  <div
                    key={`member${index}`}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      {m.profileImage ? (
                        <Avatar src={m.profileImage} type="profile" size="xs" />
                      ) : (
                        <Avatar src="" type="profile" size="xs" />
                      )}

                      <span>{m.nickname}</span>
                      {m.role === "LEADER" && (
                        <Crown size={18} className="text-accent" />
                      )}
                    </div>
                    {currentUserId !== m.userId &&
                      status === "CLOSED" &&
                      (!currentRequestReview ||
                      currentRequestReview.length === 0 ? (
                        <span className="text-accent text-xs">작성 완료</span>
                      ) : (
                        <BoxButton
                          text="리뷰 작성"
                          size="xs"
                          className="bg-accent text-xs"
                          onClick={() => {
                            router.push(
                              `/myprofile/reviews/post/${PartyData.partyId}?revieweeId=${m.userId}`,
                            );
                          }}
                        />
                      ))}
                  </div>
                ))}
            </div>{" "}
            {leader.userId === currentUserId && (
              <div className="mt-3 flex justify-end gap-2">
                <BoxButton
                  text="수정"
                  tone="black"
                  size="xs"
                  onClick={() => {
                    if (status === "CLOSED") {
                      showToast.error(
                        "게임을 완료한 모집글은 수정할 수 없습니다.",
                      );
                      return;
                    }

                    router.push(`/${currentGame}/modify/${postId}`);
                  }}
                />
                <BoxButton
                  text="삭제"
                  tone="negative"
                  size="xs"
                  onClick={async () => {
                    if (status === "CLOSED") {
                      showToast.error(
                        "게임을 완료한 모집글은 삭제할 수 없습니다.",
                      );
                      return;
                    }
                    await deletePost(postId);
                    router.push(`/${currentGame}/find`);
                  }}
                />
              </div>
            )}
          </HorizontalCardContainer>
        </>
      )}
    </div>
  );
}
