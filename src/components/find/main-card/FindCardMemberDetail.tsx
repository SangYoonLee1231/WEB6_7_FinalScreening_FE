import { Participant, Post, PostDetail } from "@/types/post";
import FindCardContainer from "../../common/container/FindCardContainer";
import FindMemberCard from "@/components/find/main-card/FindMemberCard";

export default function FindCardMemberDetail({
  currentUserId,
  participantsData,
  currentParticipants,
  recruitCount,
}: {
  currentUserId: number | null;
  participantsData: Participant[];
  currentParticipants: number;
  recruitCount: number;
}) {
  const leaderId = participantsData.find((p) => p.role === "LEADER")?.userId;

  return (
    <FindCardContainer className="flex flex-col gap-5 border-t-0">
      <div className="flex flex-col">
        <h3 className="text-content-primary flex w-full items-center justify-between text-xl font-bold">
          인원 정보
          <span>{`${currentParticipants}/${recruitCount}`}</span>
        </h3>
      </div>
      {participantsData.map((p, i) => (
        <FindMemberCard
          key={`member${i}`}
          type="default"
          currentUserId={currentUserId ? Number(currentUserId) : null}
          leaderId={Number(leaderId) ?? 0}
          data={p}
        />
      ))}
    </FindCardContainer>
  );
}
