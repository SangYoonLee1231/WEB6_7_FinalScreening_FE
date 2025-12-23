import Avatar from "../common/Avatar";
import { BoxButton } from "../common/button/BoxButton";
import FindCardContainer from "../common/container/FindCardContainer";
import ReviewPercent from "../review/ReviewPercent";
import { ReviewDistributionMock } from "@/mocks/review.mock";
import IntroduceBubble from "./IntroduceBubble";
import { twMerge } from "tailwind-merge";
import { useState } from "react";

// 샘플 데이터
// userId 받을 수 있도록 api 수정될 경우 대체 예정
const userData = {
  userId: 2,
  nickname: "탑신병자",
  profileImageUrl: "",
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
  const [isUserBlocked, setIsUserBlocked] = useState<boolean>(false);

  const userBanHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    
    const res = await fetch(
      `http://localhost:8080/api/v1/users/${userData.userId}/blocks`,
      {
        method: "POST",
        credentials: "include",
      },
    );
    if (res.ok) {
      setIsUserBlocked(true);
    }
  };
  return (
    <FindCardContainer className={twMerge("flex flex-col gap-2", className)}>
      <div className="flex gap-2">
        <Avatar type="profile" src={userData.profileImageUrl} size="sm" />
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold">{userData.nickname}</h3>
            <BoxButton
              size="xs"
              tone="negative"
              text={isUserBlocked ? "차단됨" : "차단하기"}
              onClick={userBanHandler}
            />
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
