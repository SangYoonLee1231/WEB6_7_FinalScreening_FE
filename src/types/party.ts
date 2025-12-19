import gameIconLol from "@/assets/images/game-icon-lol.png";
import gameIconAram from "@/assets/images/game-icon-aram.svg";

export type PartyStatus = "ACTIVE" | "INACTIVE" | "CLOSED" | string;
export type PartyRole = "LEADER" | "MEMBER" | string;

export interface PostPartyDetail {
  partyId: number | string;
  postId: number | string;
  status: string;
  currentCount: number;
  maxCount: number;
  createdAt: string;
  isJoined: boolean;
  members: PostPartyMemberDetail[];
}

export interface PostPartyMemberDetail {
  partyMemberId: number | string;
  userId: number | string;
  nickname: string;
  profileImage: string;
  role: PartyMemberRole;
}

export type PartyMemberRole = "LEADER" | "MEMBER";

export interface MyPartyListResponse {
  status: string;
  message: string;
  data: {
    parties: MyPartySummary[];
  };
}

export interface MyPartySummary {
  partyId: number | string;
  postId: number | string;
  postTitle: string;
  gameMode: string;
  status: PartyStatus;
  myRole: PartyRole;
  joinedAt: string;
}

export const GAME_MODE_IDS = ["1", "2"] as const;
export type GameMode = (typeof GAME_MODE_IDS)[number];
export const GAME_MODE_META = {
  "1": {
    label: "소환사의 협곡",
    icon: gameIconLol,
  },
  "2": {
    label: "칼바람 나락",
    icon: gameIconAram,
  },
} as const;

export const QUEUE_TYPES = ["DUO", "FLEX", "NORMAL"] as const;
export type QueueType = (typeof QUEUE_TYPES)[number];
export const QUEUE_TYPES_LABEL: Record<QueueType, string> = {
  DUO: "솔로 랭크",
  FLEX: "자유 랭크",
  NORMAL: "일반",
};

export const RECRUIT_COUNT_OPTIONS: Record<QueueType, readonly number[]> = {
  DUO: [2],
  FLEX: [2, 3, 5],
  NORMAL: [2, 3, 4, 5],
} as const;
