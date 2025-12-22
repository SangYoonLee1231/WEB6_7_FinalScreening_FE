import ProfilePageContent from "@/components/profile/ProfilePageContent";
import { getGameAccount, getUserProfile } from "@/services/users";

export default async function ProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const profileData = await getUserProfile(id);
  const gameAccountData = await getGameAccount();

  return (
    <ProfilePageContent
      profileData={profileData}
      gameAccountData={gameAccountData}
    />
  );
}
