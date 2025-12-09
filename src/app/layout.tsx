import type { Metadata } from "next";
import localFont from "next/font/local";
import "../css/globals.css";
import Header from "@/components/common/Nav/Header";

const pretendard = localFont({
  src: "../fonts/pretendard/PretendardVariable.woff2",
  display: "swap",
  weight: "100 900",
  variable: "--font-pretendard",
});

export const metadata: Metadata = {
  title: "매치마이듀오",
  description: "게임 플레이어들이 쉽고 빠르게 듀오를 찾을 수 있는 서비스",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${pretendard.variable}`}>
      <body className={`${pretendard.className} dark bg-bg-secondary`}>
        <Header />
        <div className="m-auto min-h-dvh w-(--content-area) max-w-full">
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
