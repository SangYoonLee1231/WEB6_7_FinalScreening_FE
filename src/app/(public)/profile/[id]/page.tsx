import ProfilePageContent from "@/components/profile/ProfilePageContent";
import { getOtherGameAccount, getUserProfile } from "@/services/users";

export default async function ProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const profileData = await getUserProfile(id);
  const gameAccountData = await getOtherGameAccount(
    profileData?.gameAccountId ?? 0,
  );

  return (
    <ProfilePageContent
      profileData={profileData}
      gameAccountData={gameAccountData}
    />
  );
}
