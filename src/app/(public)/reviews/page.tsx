"use client";

import { BoxButton } from "@/components/common/button/BoxButton";
import Dropdown from "@/components/common/Dropdown";
import { useEffect } from "react";
import { useMenuStore } from "@/stores/menuStore";
import useGetAllReviews from "@/hooks/reviews/useGetAllReviews";
import LoadingBouncy from "@/components/common/loading/LoadingBouncy";
import ReviewRow from "@/components/review/ReviewRow";
import Link from "next/link";

const items = [
  {
    value: "ALL",
    label: "리뷰 전체",
  },
  {
    value: "GOOD",
    label: "좋아요",
  },
  {
    value: "NORMAL",
    label: "보통",
  },
  {
    value: "BAD",
    label: "싫어요",
  },
];

export default function ReviewsPage() {
  const { setMenu } = useMenuStore();

  const { data: reviewData, isLoading } = useGetAllReviews();

  useEffect(() => {
    setMenu("reviews");
  }, []);

  if (!reviewData || isLoading)
    return (
      <div className="flex h-full items-center justify-center">
        <LoadingBouncy />
      </div>
    );

  return (
    <section className="mt-17.5 flex h-full w-full flex-col items-center">
      <div className="mt-4 flex w-full items-center justify-between">
        <Dropdown
          placeholder="리뷰 전체"
          items={items}
          onValueChange={() => {}}
          name="reviewType"
          className="w-75 rounded-xl"
        />
        <div className="flex w-[390px] items-center gap-4">
          <p className="text-content-secondary text-sm">
            최근 함께한 유저에게 리뷰를 남기려면
          </p>
          <div className="h-px flex-1 bg-slate-500" />
          <Link href="/myprofile/find-history">
            <BoxButton
              tone="gradient_positive"
              text="리뷰 작성하러 가기"
              className="h-10 w-34 text-sm font-semibold"
            />
          </Link>
        </div>
      </div>
      {/* 리뷰 카드 */}
      <div className="border-border-primary mt-8 w-full overflow-hidden rounded-xl border text-base">
        {/* Header */}
        <div className="text-content-secondary bg-bg-primary grid h-13 grid-cols-[120px_200px_1fr_120px] items-center px-5">
          <span>평가</span>
          <span>유저 닉네임</span>
          <span>리뷰 내용</span>
          <span className="text-right">등록시간</span>
        </div>

        {/* Body */}
        <div>
          {reviewData.map((review, index) => (
            <ReviewRow key={index} review={review} />
          ))}
        </div>
      </div>
    </section>
  );
}
