import Header from "@/components/common/Nav/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-dvh flex-col">
      <Header type="full" />
      <div className="m-auto w-(--content-area) max-w-full flex-1">
        <main className="h-full w-full">{children}</main>
      </div>
    </div>
  );
}
