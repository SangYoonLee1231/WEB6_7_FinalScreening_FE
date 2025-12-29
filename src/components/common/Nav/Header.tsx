"use client";

import Image from "next/image";
import logo from "@/assets/images/logo.svg";
import Link from "next/link";
import { Bell } from "lucide-react";
import { useMenuStore } from "@/stores/menuStore";
import HeaderMenuTab from "./HeaderMenuTab";
import GameSelectDropdown from "./GameSelectDropdown";
import ThemeToggleBtn from "./ThemeToggleBtn";
import ProfilePopover from "./ProfilePopover";
import { BoxButton } from "../button/BoxButton";
import { MyProfile } from "@/types/profile";

interface HeaderProps {
  type: "compact" | "full";
  userData: MyProfile | null;
}

export default function Header({ type, userData }: HeaderProps) {
  const { currentGame, currentMenu, setMenu } = useMenuStore();
  return (
    <nav className="bg-bg-primary flex h-(--header-h) shrink-0 justify-center">
      <div className="flex h-full w-(--content-area) items-center justify-between">
        {type === "compact" ? (
          <Link href={`/`}>
            <Image
              src={logo}
              alt="logo"
              width={140}
              className="h-auto object-contain"
              priority
            />
          </Link>
        ) : (
          <div className="flex items-center gap-13">
            <Link href={`/`}>
              <Image
                src={logo}
                alt="logo"
                width={140}
                className="h-auto object-contain"
                priority
              />
            </Link>

            <ul className="flex gap-5">
              <HeaderMenuTab
                text="듀오 찾기"
                path={`${currentGame}/find`}
                isActive={currentMenu === "find"}
              />
              <HeaderMenuTab
                text="유저 검색"
                path="search"
                isActive={currentMenu === "search"}
              />
              <HeaderMenuTab
                text="유저 리뷰"
                path="reviews"
                isActive={currentMenu === "reviews"}
              />
              <HeaderMenuTab
                text="채팅"
                path="chat"
                isActive={currentMenu === "chat"}
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
          {userData ? (
            <ProfilePopover
              currentMenu={currentMenu}
              profileImage={userData.profileImage ?? undefined}
            />
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
