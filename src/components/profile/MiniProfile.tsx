"use client";

import Avatar from "../common/Avatar";
import { BoxButton } from "../common/button/BoxButton";
import FindCardContainer from "../common/container/FindCardContainer";
import IntroduceBubble from "./IntroduceBubble";
import { twMerge } from "tailwind-merge";
import { useState } from "react";
import ClientApi from "@/lib/clientApi";
import { UserProfile } from "@/types/profile";
import { ReviewDistribution } from "@/types/review";
import ReviewPercent from "../review/ReviewPercent";

interface MiniProfileProps extends React.ComponentPropsWithoutRef<"div"> {
  userData: UserProfile;
  reviewDistributionData: ReviewDistribution;
  className?: string;
}

export default function MiniProfile({
  userData,
  reviewDistributionData,
  className,
}: MiniProfileProps) {
  const [isUserBlocked, setIsUserBlocked] = useState<boolean>(false);

  const userBanHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    const res = await ClientApi(`/api/v1/users/${userData.id}/blocks`, {
      method: "POST",
    });

    if (res.ok) {
      setIsUserBlocked(true);
    }
  };

  if (!userData) return null;

  return (
    <FindCardContainer className={twMerge("flex flex-col gap-2", className)}>
      <div className="flex gap-2">
        <Avatar type="profile" src={userData.profile_image ?? ""} size="sm" />
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
      <ReviewPercent type="mini" distributionData={reviewDistributionData} />
    </FindCardContainer>
  );
}
