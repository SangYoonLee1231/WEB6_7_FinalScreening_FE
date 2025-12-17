"use client";

import Image from "next/image";
import logo from "@/assets/images/logo.svg";
import Link from "next/link";
import Avatar from "../Avatar";
import { usePathname } from "next/navigation";
import { Bell } from "lucide-react";
import { useMenuStore } from "@/stores/menuStore";
import { BoxButton } from "../button/BoxButton";
import HeaderMenuTab from "./HeaderMenuTab";
import GameSelectDropdown from "./GameSelectDropdown";
import ThemeToggleBtn from "./ThemeToggleBtn";
import { twMerge } from "tailwind-merge";

export default function Header({ type }: { type: "compact" | "full" }) {
  const gameType = usePathname().split("/")[1];
  const { currentMenu, setMenu } = useMenuStore();
  return (
    <nav className="bg-bg-primary flex h-(--header-h) justify-center">
      <div className="flex h-full w-(--content-area) items-center justify-between">
        {type === "compact" ? (
          <Link href={`/`}>
            <Image
              src={logo}
              alt="logo"
              width={140}
              className="h-auto object-contain"
            />
          </Link>
        ) : (
          <div className="flex items-center gap-13">
            <Link href={`/${gameType}`}>
              <Image
                src={logo}
                alt="logo"
                width={140}
                className="h-auto object-contain"
              />
            </Link>

            <ul className="flex gap-5">
              <HeaderMenuTab
                gameType={gameType}
                text="듀오 찾기"
                path=""
                isActive={currentMenu === "find"}
                onClick={() => {
                  setMenu("find");
                }}
              />
              <HeaderMenuTab
                gameType={gameType}
                text="유저 검색"
                path="search"
                isActive={currentMenu === "search"}
                onClick={() => {
                  setMenu("search");
                }}
              />
              <HeaderMenuTab
                gameType={gameType}
                text="유저 리뷰"
                path="reviews"
                isActive={currentMenu === "reviews"}
                onClick={() => {
                  setMenu("reviews");
                }}
              />
              <HeaderMenuTab
                gameType={gameType}
                text="채팅"
                path="chat"
                isActive={currentMenu === "chat"}
                onClick={() => {
                  setMenu("chat");
                }}
              />
            </ul>
          </div>
        )}
        <div className="flex items-center gap-4">
          {type === "full" && (
            <>
              {" "}
              <GameSelectDropdown />
              <button className="cursor-pointer">
                <Bell
                  size={25}
                  className="fill-bg-tertiary text-bg-tertiary hover:fill-bg-quaternary hover:text-bg-quaternary"
                />
              </button>
            </>
          )}

          <ThemeToggleBtn />
          {type === "full" ? (
            <Link href={`/${gameType}/myprofile`} className="flex">
              <Avatar
                src=""
                type="profile"
                size="sm"
                className={twMerge(
                  "hover:border-accent hover:border-2",
                  currentMenu === "profile" && "border-accent border-2",
                )}
              />
            </Link>
          ) : (
            <Link href="/login">
              <BoxButton text="로그인" tone="color" size="sm" />
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
