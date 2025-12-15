import MyProfileNav from "@/components/myprofile/MyProfileNav";

export default function MyprofileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-62.5 px-20 py-15">
      <MyProfileNav />
      <div className="mt-16">{children}</div>
    </div>
  );
}
