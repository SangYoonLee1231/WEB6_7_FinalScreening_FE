import FindHistoryContainer from "@/components/myprofile/FindHistoryContainer";

export default async function FindHistoryPage() {
  return (
    <div className="flex flex-col gap-5 [&_h3]:text-xl [&_h3]:font-semibold">
      <h2 className="text-4xl font-bold">모집 참여 내역</h2>
      <FindHistoryContainer />
    </div>
  );
}
