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
