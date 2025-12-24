import { EmojiType } from "./emoji";

export type ReviewDistribution = {
  userId: number;
  nickname: string;
  totalReviews: number;
  distribution: {
    GOOD: number;
    NORMAL: number;
    BAD: number;
  };
  ratios: {
    GOOD: number;
    NORMAL: number;
    BAD: number;
  };
};

export type Review = {
  reviewId: number;
  reviewerId: number;
  reviewerNickname: string;
  emoji: EmojiType;
  content: string;
  createdAt: string;
};
