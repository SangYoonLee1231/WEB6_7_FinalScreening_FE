import { PostPartyDetail } from "@/types/party";
import { PostListResponse } from "@/types/post";
import { PostDetail } from "@/types/post";

export const postListResponseMock: PostListResponse = {
  posts: [
    {
      postId: 123,

      gameModeId: 1,
      gameMode: "SR",

      queueType: "DUO",

      myPosition: "JUNGLE",
      lookingPositions: ["MID"],

      mic: true,

      recruitCount: 2,
      currentParticipants: 1,

      status: "RECRUITING",

      memo: "정글 듀오 구합니다!",
      createdAt: "2025-12-10T12:30:12",

      writer: {
        userId: 10,

        communityNickname: "커뮤니티닉네임",
        communityProfileImageUrl: "",

        gameAccount: {
          gameType: "LEAGUE_OF_LEGENDS",
          gameNickname: "게임닉네임",
          gameTag: "KR1",
          profileIconUrl:
            "https://ddragon.leagueoflegends.com/cdn/15.24.1/img/profileicon/1234.png",
        },

        gameSummary: {
          tier: "DIAMOND",
          division: "I",
          winRate: 70.0, // 해당 파트에서 아직 미구현이라 이렇게 표시해둠
          kda: 3.78, // 해당 파트에서 아직 미구현이라 이렇게 표시해둠
          favoriteChampions: ["141", "64", "234"], // 해당 파트에서 아직 미구현이라 이렇게 표시해둠        }
        },
      },
      participants: [
        {
          userId: 10,
          communityNickname: "커뮤니티닉네임",
          communityProfileImageUrl: "",
          role: "LEADER",
        },
        {
          userId: 20,
          communityNickname: "참여자닉네임",
          communityProfileImageUrl: "https://...",
          role: "MEMBER",
        },
      ],
    },
  ],
  nextCursor: 122,
  hasNext: true,
};

export const PostPartyDetailMock: PostPartyDetail = {
  partyId: 9007199254740991,
  postId: 9007199254740991,
  status: "ACTIVE",
  currentCount: 1073741824,
  maxCount: 1073741824,
  createdAt: "2025-12-18T04:48:43.452Z",
  isJoined: true,
  members: [
    {
      partyMemberId: 9007199254740991,
      userId: 9007199254740991,
      nickname: "string",
      profileImage: "string",
      role: "LEADER",
    },
  ],
};

export const postDetailMock: PostDetail = {
  postId: 101,

  writer: {
    userId: 20,
    nickname: "커뮤니티닉네임",
    profileImageUrl: "https://cdn.example.com/profile/20.png",
    // 프로필에서 사용자가 업로드한 이미지
    // 업로드 안 했으면 null

    comment: "롤만 하는 개발자입니다.",

    gameAccount: {
      summonerName: "게임닉네임",
      tag: "#KR1",
      tier: "EMERALD IV",
      winRate: 52.3, // 시즌 전체 승률(%)
      kda: 3.21, // 계산된 KDA

      favoriteChampions: ["다리우스", "가렌", "야스오"],
      // Riot API 기반 '최근 선호 챔피언 Top3'
      // 대부분 유저는 값이 있음,
      // 데이터가 없는 신규 계정일 때만 null 가능

      mainPosition: "JUNGLE", // TOP/JUNGLE/MID/ADC/SUPPORT
    },
  },

  gameMode: "SR", // SR / ARAM / ARENA

  options: {
    // 공통
    mic: true,
    recruitCount: 2,
    memo: "편하게 즐겜하실 분만 구해요.",

    // SR 전용 필드
    myPosition: "JUNGLE", // 내 포지션
    lookingPositions: ["MID"], // 찾는 포지션(여러 개 가능)
    queueType: "SOLO_RANK", // SOLO_RANK / FLEX_RANK / NORMAL

    // ARENA 전용 (아레나일 때만 사용, 그 외 모드는 null)
    duoChampions: null, // ["다리우스", "가렌"]
  },

  statistics: {
    status: "RECRUITING", // RECRUITING / FILLED / GAME_FINISHED
    currentMemberCount: 1, // 현재 참여 인원 (파티 쪽과 조인해서 계산)
    createdAt: "2025-02-18T10:30:00",
    updatedAt: "2025-02-18T10:30:00",
  },
};
