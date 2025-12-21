"use client";

import { SearchUser } from "@/types/userList";
import { ChevronRight, LinkIcon } from "lucide-react";
import Link from "next/link";
import IntroduceBubble from "../profile/IntroduceBubble";
import Avatar from "../common/Avatar";
import HorizontalCardContainer from "../common/container/HorizontalCardContainer";
import { useRouter } from "next/navigation";

export default function SearchUserCard({ userData }: { userData: SearchUser }) {
  const router = useRouter();
  return (
    <Link href={`/profile/${userData.userId}`}>
      <HorizontalCardContainer className="hover:border-accent/50 grid h-19 w-full grid-cols-[160px_1fr_auto_40px] items-center gap-8 transition-all duration-150 hover:cursor-pointer">
        <div className="flex items-center gap-2">
          <Avatar
            size="xs"
            type="profile"
            src={userData.profileImageUrl ?? ""}
          />
          <p>{userData.nickname}</p>
        </div>
        <IntroduceBubble
          type="message"
          content={userData.bio ?? "아직 자기소개를 작성하지 않았어요."}
          className="h-11 w-full overflow-hidden"
        />
        {userData.gameAccount.linked ? (
          <div className="border-accent/50 bg-accent/10 flex h-8 items-center justify-center gap-1 rounded-xl border px-4 py-2 whitespace-nowrap">
            <LinkIcon className="text-accent" size={14} />
            <span className="text-content-primary text-sm">
              {userData.gameAccount.gameName}
            </span>
            <span className="text-content-secondary text-xs">
              {userData.gameAccount.tagLine}
            </span>
          </div>
        ) : (
          <div className="border-border-primary text-content-primary bg-bg-secondary flex h-8 items-center justify-center gap-1 rounded-xl border px-4 py-2 whitespace-nowrap">
            <LinkIcon size={14} />
            <span className="text-sm">연동 데이터 없음</span>
          </div>
        )}
        <ChevronRight size={30} className="text-content-secondary" />
      </HorizontalCardContainer>
    </Link>
  );
}
