export type User = {
  email: string;
  password: string;
  nickname: string;
  comment: string;
  profile_image: string;
};

export type MiniProfile = {
  userId: number;
  nickname: string;
  profileImageUrl: string;
  comment: string;
  reviewSummary: {
    totalCount: number;
    goodCount: number;
    normalCount: number;
    badCount: number;
    goodRate: number;
    normalRate: number;
    badRate: number;
  };
  isBlockedByMe: boolean;
};

export type GameAccount = {
  gameAccountId: number;
  gameNickname: string;
  gameTag: string;
  gameType: string;
  puuid: string;
  profileIconId: number;
  profileIconUrl: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
};
