import Image from "next/image";
import logo from "@/assets/images/logo.svg";
import HeaderMenuTab from "./HeaderMenuTab";

export default function Header() {
  return (
    <nav className="bg-bg-primary flex h-(--header-h) justify-center">
      <div className="flex h-full w-(--content-area) items-center">
        <div className="flex items-center gap-13">
          <Image
            src={logo}
            alt="logo"
            width={140}
            className="h-auto object-contain"
          />
          <ul className="flex gap-5">
            <HeaderMenuTab text="듀오 찾기" isActive />
            <HeaderMenuTab text="유저 검색" />
            <HeaderMenuTab text="유저 리뷰" />
            <HeaderMenuTab text="채팅" />
          </ul>
        </div>
      </div>
    </nav>
  );
}
