import { Fab } from "@/components/common/Fab";

export default function LolLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Fab />
    </>
  );
}
