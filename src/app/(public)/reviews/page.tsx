"use client";

import Avatar from "@/components/common/Avatar";
import { BoxButton } from "@/components/common/button/BoxButton";
import HorizontalCardContainer from "@/components/common/container/HorizontalCardContainer";
import Dropdown from "@/components/common/Dropdown";
import SearchInput from "@/components/common/SearchInput";
import emojiGood from "@/assets/images/emoji/emoji_good.png";
import emojiNormal from "@/assets/images/emoji/emoji_normal.png";
import emojiBad from "@/assets/images/emoji/emoji_bad.png";
import Image from "next/image";
import { EmojiType as Expression } from "@/types/emoji";

const items = [
  {
    value: "good",
    label: "좋아요",
  },
  {
    value: "normal",
    label: "보통",
  },
  {
    value: "bad",
    label: "싫어요",
  },
  {
    value: "all",
    label: "리뷰 전체",
  },
];

type Review = {
  id: number;
  expression: Expression;
  nickname: string;
  content: string;
  time: string;
  highlight?: boolean;
};

const reviews: Review[] = [
  {
    id: 1,
    expression: "good",
    nickname: "커뮤니티닉네임",
    content: "리뷰내용1",
    time: "5분 전",
  },
  {
    id: 2,
    expression: "normal",
    nickname: "커뮤니티닉네임",
    content: "리뷰내용2",
    time: "5분 전",
  },
  {
    id: 3,
    expression: "bad",
    nickname: "커뮤니티닉네임",
    content: "리뷰내용3",
    time: "5분 전",
  },
  {
    id: 4,
    expression: "good",
    nickname: "커뮤니티닉네임",
    content:
      "리뷰내용4 정말로 아주 진짜 엄청나게 긴 문장은 이렇게 줄임표가 생깁니다 정말로 아주 진짜 엄청나게 긴 문장은 이렇게 줄임표가 생깁니다",
    time: "5분 전",
  },
];

const EMOJI_SRC_MAP: Record<Expression, string> = {
  good: emojiGood.src,
  normal: emojiNormal.src,
  bad: emojiBad.src,
};

export default function ReviewsPage() {
  return (
    <section className="flex h-full w-full">
      <div className="flex h-full w-full flex-col items-center">
        <div className="flex h-full w-3/4 flex-col">
          <div>
            <SearchInput
              inputSize="md"
              placeholder="유저 닉네임으로 검색"
              className="border-border-primary mt-20 border"
            />
          </div>
          <div className="mt-4 flex w-full flex-row items-center justify-between">
            <Dropdown
              placeholder="리뷰 전체"
              items={items}
              onValueChange={() => {}}
              name="reviewType"
              className="w-75 rounded-md"
            />
            <div className="flex w-[390px] flex-row items-center gap-4">
              <p className="text-sm text-slate-500">
                최근 함께한 유저에게 리뷰를 남기려면
              </p>
              <div className="h-px flex-1 bg-slate-500" />
              <BoxButton
                tone="gradient_positive"
                text="리뷰 작성하러 가기"
                className="h-8 w-34 text-sm font-semibold"
              />
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
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="border-border-primary grid h-19 grid-cols-[120px_200px_1fr_120px] items-center border-t px-5"
                >
                  {/* 평가 (Emoji) */}
                  <div>
                    <Image
                      src={EMOJI_SRC_MAP[review.expression]}
                      alt={review.expression}
                      width={40}
                      height={40}
                    />
                  </div>

                  {/* 유저 닉네임 */}
                  <div className="flex items-center gap-2">
                    <Avatar src="" size="xs" type="profile" />
                    <span className="text-content-primary hover:text-accent text-sm hover:cursor-pointer">
                      {review.nickname}
                    </span>
                  </div>

                  {/* 리뷰 내용 */}
                  <HorizontalCardContainer className="bg-bg-tertiary h-11 max-w-100 truncate border-none py-3 text-sm">
                    {review.content}
                  </HorizontalCardContainer>

                  {/* Time */}
                  <span className="text-content-secondary text-right">
                    {review.time}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
