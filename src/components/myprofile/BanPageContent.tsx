"use client";

import Avatar from "@/components/common/Avatar";
import { BoxButton } from "@/components/common/button/BoxButton";
import { useMenuStore, useMyProfileMenuStore } from "@/stores/menuStore";
import { formatDateToDash } from "@/utils/formatDateToDot";
import { useEffect, useOptimistic, useState, useTransition } from "react";

type Ban = {
  userId: number;
  nickname: string;
  profileImage: string;
  blockedAt: string;
};

export default function BanPageContent() {
  const { setMenu } = useMenuStore();
  const { setMenu: setProfileMenu } = useMyProfileMenuStore();
  const [banList, setBanList] = useState<Ban[]>([]);
  const [isPending, startTransition] = useTransition();

  const [optimisticBanList, addOptimistic] = useOptimistic(
    banList,
    (_: Ban[], nextValue: Ban[]) => nextValue,
  );

  useEffect(() => {
    setMenu("profile");
    setProfileMenu("ban");
    const fetchBanList = async () => {
      const res = await fetch("http://localhost:8080/api/v1/users/me/blocks", {
        method: "GET",
        credentials: "include",
      });

      const data: Ban[] = await res.json();
      setBanList(data);
    };

    fetchBanList();
  }, []);
  const cancelBan = (targetUserId: number) => {
    if (isPending) return;
    startTransition(async () => {

      const next = banList.filter((ban) => ban.userId != targetUserId);

      addOptimistic(next);

      const res = await fetch(
        `http://localhost:8080/api/v1/users/me/blocks/${targetUserId}`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );

      if (res.ok) {
        setBanList(next);
      }

    });
  };
  return (
    <div className="flex flex-col">
      <p className="text-content-main text-4xl font-bold">차단 목록</p>
      <div className="mt-7.5">
        <p className="text-content-secondary text-center text-base">
          총 {banList.length}명의 유저
        </p>
        {/* 차단 목록 카드 */}

        {banList.length > 0 && (
          <div className="border-border-primary mt-7.5 w-full overflow-hidden rounded-xl border text-base">
            {/* Header */}
            <div className="text-content-secondary bg-bg-primary grid h-13 grid-cols-[270px_1fr] px-5 py-4">
              <span>차단일시</span>
              <span>대상 유저</span>
            </div>

            {/* Body */}
            <div>
              {optimisticBanList.map((ban) => (
                <div
                  key={ban.userId}
                  className="border-border-primary grid h-17 grid-cols-[270px_1fr_120px] items-center border-t px-5 py-4"
                >
                  <p className="text-content-secondary">
                    {formatDateToDash(ban.blockedAt)}
                  </p>
                  {/* 유저 닉네임 */}
                  <div className="flex items-center gap-2">
                    <Avatar src={ban.profileImage} size="xs" type="profile" />
                    <span className="text-content-primary">{ban.nickname}</span>
                  </div>
                  <BoxButton
                    tone="black"
                    text="해제"
                    className="h-9 w-15.5 justify-self-end px-4 py-2 text-sm"
                    onClick={() => cancelBan(ban.userId)}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
