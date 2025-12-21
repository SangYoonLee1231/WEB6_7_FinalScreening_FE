import { SearchUser } from "@/types/userList";
import { ChevronRight, Link } from "lucide-react";
import IntroduceBubble from "../profile/IntroduceBubble";
import Avatar from "../common/Avatar";
import HorizontalCardContainer from "../common/container/HorizontalCardContainer";

export default function SearchUserCard({ userData }: { userData: SearchUser }) {
  return (
    <HorizontalCardContainer
      className="grid h-19 w-full grid-cols-[160px_1fr_auto_40px] items-center gap-8"
      key={userData.userId}
    >
      <div className="flex items-center gap-2">
        <Avatar size="xs" type="profile" src={userData.profileImageUrl ?? ""} />
        <p>{userData.nickname}</p>
      </div>
      <IntroduceBubble
        type="message"
        content={userData.bio ?? "아직 자기소개를 작성하지 않았어요."}
        className="h-11 w-full overflow-hidden"
      />
      {userData.gameAccount.linked ? (
        <div className="border-accent/50 bg-accent/10 flex h-8 items-center justify-center gap-1 rounded-xl border px-4 py-2 whitespace-nowrap">
          <Link className="text-accent" size={14} />
          <span className="text-content-primary text-sm">
            {userData.gameAccount.gameName}
          </span>
          <span className="text-content-secondary text-xs">
            {userData.gameAccount.tagLine}
          </span>
        </div>
      ) : (
        <div className="border-border-primary text-content-primary bg-bg-secondary flex h-8 items-center justify-center gap-1 rounded-xl border px-4 py-2 whitespace-nowrap">
          <Link size={14} />
          <span className="text-sm">연동 데이터 없음</span>
        </div>
      )}
      <ChevronRight size={30} className="text-content-secondary" />
    </HorizontalCardContainer>
  );
}
