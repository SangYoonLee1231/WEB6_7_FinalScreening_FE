import FindCardContainer from "../../common/container/FindCardContainer";
import FindMemberCard from "@/components/find/main-card/FindMemberCard";
import { PostPartyMemberDetail } from "@/types/party";

export default function FindCardMemberDetail({
  currentCount,
  maxCount,
  partyMembersData,
}: {
  currentCount: number;
  maxCount: number;
  partyMembersData: PostPartyMemberDetail[];
}) {
  return (
    <FindCardContainer className="flex flex-col gap-5 border-t-0">
      <div className="flex flex-col">
        <h3 className="text-content-primary flex w-full items-center justify-between text-xl font-bold">
          인원 정보
          <span>{`${currentCount}/${maxCount}`}</span>
        </h3>
      </div>
      {partyMembersData.map((p, i) => (
        <FindMemberCard
          key={`member${i}`}
          type="default"
          PartyMemberData={p}
          isLeader={p.role === "LEADER"}
        />
      ))}
    </FindCardContainer>
  );
}
