import type { Metadata } from "next";
import localFont from "next/font/local";
import "./src/css/globals.css";

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
      <body className={`${pretendard.className} dark`}>{children}</body>
    </html>
  );
}
