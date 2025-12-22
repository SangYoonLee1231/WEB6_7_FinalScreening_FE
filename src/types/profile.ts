export interface MyProfile {
  id: number;
  email: string;
  profile_image: string | null;
  nickname: string;
  comment: string | null;
}

export interface UserProfile {
  id: number;
  nickname: string;
  profile_image: string | null;
  comment: string | null;
}
