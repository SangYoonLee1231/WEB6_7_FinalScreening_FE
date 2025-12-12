"use client";

import { PostDetail } from "@/types/post";
import FindCardContainer from "../common/container/FindCardContainer";
import FindMemberCard from "./FindMemberCard";
import { sampleMemberType } from "./FindCard";
import StateBadge from "../common/StateBadge";
import { BoxButton } from "../common/button/BoxButton";
import ToggleBtn, { RecruitStatus } from "../common/button/ToggleBtn";
import { useState } from "react";
import FindLinkButton from "./FindLinkButton";

export default function FindInfoModal({
  currentUserId,
  postData,
  memberData,
}: {
  currentUserId: number;
  postData: PostDetail;
  memberData: sampleMemberType[];
}) {
  const { writer, options, statistics } = postData;
  const isMaster = currentUserId === postData.writer.userId;
  const [status, setStatus] = useState<RecruitStatus>("recruiting");

  return (
    <FindCardContainer className="flex h-123 w-110 flex-col items-center justify-between p-7.5">
      <div className="flex w-full flex-col gap-5">
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between text-xl">
            <h5 className="text-content-primary flex items-center gap-2 font-bold">
              모집 정보
              {!isMaster && (
                <StateBadge state={statistics.status} className="px-3 py-1.5" />
              )}
            </h5>
            <span className="font-semibold">{`${statistics.currentMemberCount}/${options.recruitCount}`}</span>
          </div>
          <FindLinkButton />
        </div>

        <ToggleBtn value={status} onChange={setStatus} size="sm" />

        {Array.from({ length: 3 }).map((_, i) => (
          <FindMemberCard
            type="modal"
            key={`member${i}`}
            currentUserId={currentUserId}
            masterUser={postData.writer.userId}
            data={memberData[i]}
          />
        ))}
      </div>
      <BoxButton
        size="sm_long"
        tone="gradient_negative"
        text={isMaster ? "파티 종료" : "파티 나가기"}
      />
    </FindCardContainer>
  );
}
