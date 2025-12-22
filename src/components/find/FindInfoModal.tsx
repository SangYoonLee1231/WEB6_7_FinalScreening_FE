"use client";

import { PostDetail, PostStatus } from "@/types/post";
import FindCardContainer from "../common/container/FindCardContainer";
import StateBadge from "../common/StateBadge";
import { BoxButton } from "../common/button/BoxButton";
import FindLinkButton from "./FindLinkButton";
import { getMyParties, getPartyMembers } from "@/services/party.client";
import { useQuery } from "@tanstack/react-query";
import LoadingBouncy from "../common/loading/LoadingBouncy";
import FindMemberCard from "./main-card/FindMemberCard";

interface FindInfoModalProps extends React.HTMLAttributes<HTMLDivElement> {
  currentUserId: number;
  postData: PostDetail;
}

export default function FindInfoModal({
  currentUserId,
  postData,
}: FindInfoModalProps) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["me", "parties"],
    queryFn: getMyParties,
    staleTime: 30_000,
  });

  const currentPartyData =
    data?.data.parties.filter((party) => party.status === "RECRUIT")[0] ?? null;

  const currentPartyId = currentPartyData?.partyId;

  const {
    data: partyMembersResponse,
    isLoading: partyMembersLoading,
    error: partyMembersError,
    refetch: partyMembersRefetch,
  } = useQuery({
    queryKey: [currentPartyId, "PartyMembers"],
    queryFn: () => getPartyMembers(currentPartyId ?? null),
    enabled: !!currentPartyId,
    staleTime: 30_000,
  });

  const partyMembersData = partyMembersResponse?.data;

  return (
    <FindCardContainer className="flex h-123 w-110 flex-col items-center justify-between p-7.5">
      {isLoading && partyMembersLoading ? (
        <div className="flex h-full items-center">
          <LoadingBouncy />
        </div>
      ) : (
        <>
          <div className="flex w-full flex-col gap-3">
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between text-xl">
                <h5 className="text-content-primary flex items-center gap-2 font-bold">
                  모집 정보
                  {currentPartyData?.myRole === "LEADER" && (
                    <StateBadge
                      state={currentPartyData.status as PostStatus}
                      className="px-3 py-1.5"
                    />
                  )}
                </h5>
                <span className="font-semibold">{`${partyMembersData?.currentCount}/${partyMembersData?.maxCount}`}</span>
              </div>
              <FindLinkButton
                gameMode={
                  // api 수정 후 gameModeId로 라벨명 매핑
                  currentPartyData?.gameMode ? currentPartyData?.gameMode : ""
                }
                postTitle={currentPartyData?.postTitle ?? ""}
              />
            </div>

            {Array.from({ length: partyMembersData?.maxCount ?? 0 }).map(
              (_, i) => (
                <FindMemberCard
                  type="modal"
                  key={`member${i}`}
                  PartyMemberData={partyMembersData?.members[i] ?? null}
                  isLeader={currentPartyData?.myRole === "LEADER"}
                />
              ),
            )}
          </div>
          <BoxButton
            size="sm_long"
            tone="gradient_negative"
            text={
              currentPartyData?.myRole === "LEADER"
                ? "파티 종료"
                : "파티 나가기"
            }
          />
        </>
      )}
    </FindCardContainer>
  );
}
