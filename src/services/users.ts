import { MyProfile } from "@/types/profile";
import { ServerApi } from "../lib/serverApi";
import { GameAccount } from "@/types/user";

export async function getMyProfile() {
  const res = await ServerApi("/api/v1/users/me");

  if (!res.ok) return null;

  return (await res.json()) as MyProfile;
}

export async function getGameAccount() {
  const res = await ServerApi("/api/game-accounts");

  if (!res.ok) return null;

  return (await res.json()) as GameAccount[];
}
