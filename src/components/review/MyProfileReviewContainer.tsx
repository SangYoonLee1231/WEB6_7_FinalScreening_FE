"use client";
import { useEffect, useState } from "react";
import MyReviewFilterToggle, { MessageDirection } from "./MyReviewFilterToggle";
import ReviewPercent from "./ReviewPercent";
import ReviewCard from "./ReviewCard";
import { useMenuStore, useMyProfileMenuStore } from "@/stores/menuStore";

export default function MyProfileReviewContainer() {
  const [status, setStatus] = useState<MessageDirection>("received");
  const { setMenu } = useMenuStore();
  const { setMenu: setProfileMenu } = useMyProfileMenuStore();

  useEffect(() => {
    setMenu("profile");
    setProfileMenu("reviews");
  }, []);

  return (
    <div>
      <MyReviewFilterToggle
        value={status}
        onChange={setStatus}
        className="mb-7.5"
      />
      {status === "received" ? (
        <>
          {" "}
          <ReviewPercent
            type="default"
            ratios={{ GOOD: 75, NORMAL: 17, BAD: 8 }}
          />
          <div className="mt-13.5 flex flex-col items-center justify-center gap-7.5">
            <span className="text-content-secondary text-base">
              총 N개의 리뷰
            </span>
            <div className="space-y-2">
              <ReviewCard
                mode="received"
                gameName="lol"
                communityName="커뮤니티닉네임"
                content="리뷰내용"
                emotion="good"
                createdAt="2025-12-12T00:12:00.000Z"
              />
              <ReviewCard
                mode="received"
                gameName="lol"
                communityName="커뮤니티닉네임"
                content="리뷰내용"
                emotion="normal"
                createdAt="2025-12-12T00:12:00.000Z"
              />
              <ReviewCard
                mode="received"
                gameName="lol"
                communityName="커뮤니티닉네임"
                content="리뷰내용"
                emotion="bad"
                createdAt="2025-12-12T00:12:00.000Z"
              />
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center gap-7.5">
          <span className="text-content-secondary text-base">
            총 N개의 리뷰
          </span>
          <div className="space-y-2">
            <ReviewCard
              mode="written"
              gameName="lol"
              communityName="커뮤니티닉네임"
              content="리뷰내용"
              emotion="good"
              createdAt="2025-12-12T00:12:00.000Z"
            />
            <ReviewCard
              mode="written"
              gameName="lol"
              communityName="커뮤니티닉네임"
              content="리뷰내용"
              emotion="normal"
              createdAt="2025-12-12T00:12:00.000Z"
            />
            <ReviewCard
              mode="written"
              gameName="lol"
              communityName="커뮤니티닉네임"
              content="리뷰내용"
              emotion="bad"
              createdAt="2025-12-12T00:12:00.000Z"
            />
          </div>
        </div>
      )}
    </div>
  );
}
