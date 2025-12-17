"use client";

import { useMenuStore, useMyProfileMenuStore } from "@/stores/menuStore";
import MyProfileMenuTab from "./MyProfileMenuTab";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function MyProfileNav() {
  const { setMenu: setGnbMenu } = useMenuStore();
  const { currentMenu, setMenu } = useMyProfileMenuStore();

  const pathName = usePathname().split("/");
  const newPath = `/${pathName[1]}/`;

  useEffect(() => {
    setGnbMenu("");
  }, []);

  return (
    <nav className="flex min-w-55 flex-col gap-11">
      <h1 className="text-content-main text-5xl font-bold">마이 프로필</h1>
      <ul className="flex flex-col gap-5.5">
        <MyProfileMenuTab
          path={`account`}
          text="계정 관리"
          isActive={currentMenu === "account"}
          onClick={() => {
            setMenu("account");
          }}
        />
        <MyProfileMenuTab
          path={`link`}
          text="게임 아이디 연동"
          isActive={currentMenu === "link"}
          onClick={() => {
            setMenu("link");
          }}
        />
        <MyProfileMenuTab
          path={`reviews`}
          text="리뷰 조회"
          isActive={currentMenu === "reviews"}
          onClick={() => {
            setMenu("reviews");
          }}
        />
        <MyProfileMenuTab
          path={`find-history`}
          text="모집 참여 내역"
          isActive={currentMenu === "find-history"}
          onClick={() => {
            setMenu("find-history");
          }}
        />
        <MyProfileMenuTab
          path={`ban`}
          text="차단 목록"
          isActive={currentMenu === "ban"}
          onClick={() => {
            setMenu("ban");
          }}
        />
      </ul>
    </nav>
  );
}
