export type UserList = {
  totalCount: number;

  users: {
    userId: number;

    nickname: string;
    profileImageUrl: null;
    bio: string;
    gameAccount:
      | {
          linked: true;

          gameName: string;
          tagLine: string;
        }
      | {
          linked: false;
        };
  }[];
};
