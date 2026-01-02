import { Fab } from "@/components/common/Fab";
import Header from "@/components/common/Nav/Header";
import { getMyProfile } from "@/services/users";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userData = await getMyProfile();

  return (
    <div className="flex h-dvh flex-col">
      <Header type="full" userData={userData} />
      <div className="m-auto w-(--content-area) max-w-full flex-1">
        <main className="scrollbar-hide h-full w-full overflow-y-auto">
          {children}
        </main>
      </div>
      <Fab currentUserData={userData} />
    </div>
  );
}
