"use client";

import * as Popover from "@radix-ui/react-popover";
import Image from "next/image";
import logo from "@/assets/images/logo.svg";
import Link from "next/link";
import Avatar from "../Avatar";
import { Bell } from "lucide-react";
import { useMenuStore } from "@/stores/menuStore";
import { BoxButton } from "../button/BoxButton";
import HeaderMenuTab from "./HeaderMenuTab";
import GameSelectDropdown from "./GameSelectDropdown";
import ThemeToggleBtn from "./ThemeToggleBtn";
import { twMerge } from "tailwind-merge";

export default function Header({ type }: { type: "compact" | "full" }) {
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
              />
            </Link>

            <ul className="flex gap-5">
              <HeaderMenuTab
                text="듀오 찾기"
                path={`${currentGame}/find`}
                isActive={currentMenu === "find"}
                onClick={() => {
                  setMenu("find");
                }}
              />
              <HeaderMenuTab
                text="유저 검색"
                path="search"
                isActive={currentMenu === "search"}
                onClick={() => {
                  setMenu("search");
                }}
              />
              <HeaderMenuTab
                text="유저 리뷰"
                path="reviews"
                isActive={currentMenu === "reviews"}
                onClick={() => {
                  setMenu("reviews");
                }}
              />
              <HeaderMenuTab
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
            <Popover.Root>
              <Popover.Trigger asChild>
                <button className="cursor-pointer">
                  <Avatar
                    src=""
                    type="profile"
                    size="sm"
                    className={twMerge(
                      "hover:border-accent hover:border-2",
                      currentMenu === "profile" && "border-accent border-2",
                    )}
                  />
                </button>
              </Popover.Trigger>
              <Popover.Portal>
                <Popover.Content
                  className="data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=top]:animate-slideDownAndFade bg-bg-primary border-border-primary rounded-xl border p-2 will-change-[transform,opacity]"
                  sideOffset={5}
                >
                  <div className="[&>:is(a,button)]:hover:bg-bg-secondary flex flex-col gap-1 text-sm [&>:is(a,button)]:cursor-pointer [&>:is(a,button)]:rounded-xl [&>:is(a,button)]:px-3 [&>:is(a,button)]:py-2">
                    <Popover.Close asChild>
                      <Link href={`/myprofile`}>계정 관리</Link>
                    </Popover.Close>
                    <Popover.Close asChild>
                      <Link href={`/myprofile/link`}>게임 아이디 연동</Link>
                    </Popover.Close>
                    <Popover.Close asChild>
                      <Link href={`/myprofile/reviews`}>리뷰 조회</Link>
                    </Popover.Close>
                    <Popover.Close asChild>
                      <Link href={`/myprofile/find-history`}>
                        모집 참여 내역
                      </Link>
                    </Popover.Close>
                    <Popover.Close asChild>
                      <Link href={`/myprofile/ban`}>차단 목록</Link>
                    </Popover.Close>
                    <hr
                      aria-hidden="true"
                      className="text-bg-tertiary w-full"
                    />
                    <button className="flex" onClick={() => {}}>
                      로그아웃
                    </button>
                  </div>
                  <Popover.Arrow
                    className="fill-border-primary"
                    width={14}
                    height={8}
                  />
                  <Popover.Arrow
                    className="fill-bg-primary -mt-px mr-px"
                    width={12}
                    height={7}
                  />
                </Popover.Content>
              </Popover.Portal>
            </Popover.Root>
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
