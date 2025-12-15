import { PostDetail } from "@/types/post";
import FindCardContainer from "../../common/container/FindCardContainer";
import { sampleMemberType } from "./FindCard";
import FindMemberCard from "@/components/find/FindMemberCard";

export default function FindCardMemberDetail({
  userId,
  postData,
  memberData,
}: {
  userId: number;
  postData: PostDetail;
  memberData: sampleMemberType[];
}) {
  const { writer, options, statistics } = postData;
  return (
    <FindCardContainer className="flex flex-col gap-5 border-t-0">
      <div className="flex flex-col">
        <h3 className="text-content-primary flex w-full items-center justify-between text-xl font-bold">
          인원 정보
          <span>{`${statistics.currentMemberCount}/${options.recruitCount}`}</span>
        </h3>
      </div>
      {Array.from({ length: options.recruitCount }).map((_, i) => (
        <FindMemberCard
          key={`member${i}`}
          type="default"
          currentUserId={writer.userId}
          masterUser={userId}
          data={memberData[i]}
        />
      ))}
    </FindCardContainer>
  );
}
