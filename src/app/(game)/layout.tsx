import Header from "@/components/common/nav/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header type="full" />
      <div className="m-auto min-h-dvh w-(--content-area) max-w-full">
        <main>{children}</main>
      </div>
    </>
  );
}
