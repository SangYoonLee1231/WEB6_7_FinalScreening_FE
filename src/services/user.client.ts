import ClientApi from "@/lib/clientApi";
import { MyProfile, UserProfile } from "@/types/profile";

export async function getUserProfile(userId: number) {
  const res = await ClientApi(`/api/v1/users/${userId}`, {
    method: "GET",
  });

  if (!res.ok) {
    alert("유저 프로필 정보를 불러올 수 없습니다.");
    return null;
  }

  return (await res.json()) as UserProfile;
}

export async function getMyProfile() {
  const res = await ClientApi(`/api/v1/users/me`, {
    method: "GET",
  });

  if (!res.ok) {
    alert("유저 프로필 정보를 불러올 수 없습니다.");
    return null;
  }

  return (await res.json()) as MyProfile;
}