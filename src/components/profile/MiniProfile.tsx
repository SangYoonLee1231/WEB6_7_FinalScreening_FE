import Avatar from "../common/Avatar";
import { BoxButton } from "../common/button/BoxButton";
import FindCardContainer from "../common/container/FindCardContainer";
import ReviewPercent from "../review/ReviewPercent";
import { ReviewDistributionMock } from "@/mocks/review.mock";
import IntroduceBubble from "./IntroduceBubble";
import { twMerge } from "tailwind-merge";

// 샘플 데이터
const userData = {
  userId: 88,
  nickname: "탑신병자",
  profileImageUrl: "https://cdn.example.com/profile/20.png",
  // 프로필에서 사용자가 업로드한 이미지
  // 업로드 안 했으면 null

  comment: "롤만 하는 개발자입니다.",

  gameAccount: {
    summonerName: "게임닉네임",
    tag: "#KR1",
    tier: "EMERALD IV",
    winRate: 52.3, // 시즌 전체 승률(%)
    kda: 3.21, // 계산된 KDA

    favoriteChampions: ["다리우스", "가렌", "야스오"],
    // Riot API 기반 '최근 선호 챔피언 Top3'
    // 대부분 유저는 값이 있음,
    // 데이터가 없는 신규 계정일 때만 null 가능

    mainPosition: "JUNGLE", // TOP/JUNGLE/MID/ADC/SUPPORT
  },
};

interface MiniProfileProps extends React.ComponentPropsWithoutRef<"div"> {
  className?: string;
}

export default function MiniProfile({ className }: MiniProfileProps) {
  return (
    <FindCardContainer className={twMerge("flex flex-col gap-2", className)}>
      <div className="flex gap-2">
        <Avatar type="profile" src={userData.profileImageUrl} size="sm" />
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold">{userData.nickname}</h3>
            <BoxButton size="xs" tone="negative" text="차단하기" />
          </div>
          <IntroduceBubble
            type="message"
            size="sm"
            content={userData.comment}
            className="w-full"
          />
        </div>
      </div>
      <ReviewPercent type="mini" ratios={ReviewDistributionMock.ratios} />
    </FindCardContainer>
  );
}
