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
