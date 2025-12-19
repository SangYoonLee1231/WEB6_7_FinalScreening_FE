import { MyProfile } from "@/types/profile";
import { ServerApi } from "../lib/serverApi";

export async function getMyProfile() {
  const res = await ServerApi("/api/v1/users/me");

  if (!res.ok) return null;

  return (await res.json()) as MyProfile;
}
