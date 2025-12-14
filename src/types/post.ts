import { Position } from "./position";

export type PostState = "RECRUITING" | "FILLED" | "GAME_FINISHED";

export type PostDetail = {
  postId: number;
  writer: {
    userId: number;
    nickname: string;
    profileImageUrl: string;
    comment: string;
    gameAccount: {
      summonerName: string;
      tag: string;
      tier: string;
      winRate: number;
      kda: number;
      favoriteChampions: string[];
      mainPosition: string;
    };
  };
  gameMode: string;
  options: {
    mic: boolean;
    recruitCount: number;
    memo: string;
    myPosition: Position;
    lookingPositions: Position[];
    queueType: string;
    duoChampions: null;
  };
  statistics: {
    status: PostState;
    currentMemberCount: number;
    createdAt: string;
    updatedAt: string;
  };
};
