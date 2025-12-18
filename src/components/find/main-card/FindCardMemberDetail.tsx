import { Participant, Post, PostDetail } from "@/types/post";
import FindCardContainer from "../../common/container/FindCardContainer";
import { sampleMemberType } from "./FindCard";
import FindMemberCard from "@/components/find/FindMemberCard";

export default function FindCardMemberDetail({
  userId,
  participantsData,
  currentParticipants,
  recruitCount,
}: {
  userId: number;
  participantsData: Participant[];
  currentParticipants: number;
  recruitCount: number;
}) {
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
          currentUserId={Number(p.userId)}
          masterUser={userId}
          data={p}
        />
      ))}
    </FindCardContainer>
  );
}
