import Header from "@/components/common/Nav/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-dvh flex-col">
      <Header type="compact" />
      <div className="m-auto w-(--content-area) max-w-full flex-1">
        <main className="w-full h-full">{children}</main>
      </div>
    </div>
  );
}
