"use client";

import SearchInput from "@/components/common/SearchInput";
import { ChevronRight, Link } from "lucide-react";
import { useState } from "react";
import { userListMock } from "@/mocks/userList.mock";
import { UserRoundSearch } from "lucide-react";
import HorizontalCardContainer from "@/components/common/container/HorizontalCardContainer";
import Avatar from "@/components/common/Avatar";
import IntroduceBubble from "@/components/profile/IntroduceBubble";

export default function SearchPage() {
  const [value, setValue] = useState("");
  return (
    <section className="flex h-full w-full flex-col items-center justify-center">
      <div className="leading-1.4 flex flex-col items-center gap-2">
        <Link size={50} className="text-accent" />
        <p className="text-content-main text-5xl font-bold">유저 검색</p>
        {value.trim() === "" && (
          <div className="text-content-secondary flex flex-row gap-1 text-xl">
            <p>매치마이듀오 닉네임으로 유저의</p>
            <p className="text-accent">리그오브레전드</p>
            <p> 전적과 리뷰를 검색해보세요.</p>
          </div>
        )}
      </div>
      <SearchInput
        inputSize="lg"
        placeholder="매치마이듀오 닉네임"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="border-border-primary mt-11 border"
      />
      {userListMock.totalCount === 0 ? (
        <div className="leading-1.4 mt-28 justify-items-center">
          <UserRoundSearch
            size={168}
            strokeWidth={1}
            className="text-content-tertiary"
          />
          <p className="text-content-primary mt-10.5 text-[32px] font-semibold">
            검색된 유저가 없습니다
          </p>
          <p className="text-content-secondary mt-2 text-2xl font-semibold">
            다른 검색어로 다시 시도해보세요
          </p>
        </div>
      ) : (
        <div className="mt-12.5 flex flex-col items-center justify-items-center gap-7.5">
          <div className="text-content-secondary flex flex-row text-xl">
            <p className="text-accent">검색어</p>
            <p className="mr-1">에 대한</p>
            <p className="text-accent">{userListMock.totalCount}명</p>
            <p>의 유저를 찾았어요</p>
          </div>
          <div className="flex flex-col gap-2">
            {userListMock.users.map((user) => (
              <HorizontalCardContainer
                className="grid h-19 w-full grid-cols-[160px_1fr_190px_40px] items-center gap-8"
                key={user.userId}
              >
                <div className="flex flex-row gap-2">
                  <Avatar
                    size="xs"
                    type="profile"
                    src={user.profileImageUrl ?? ""}
                  />
                  <p>{user.nickname}</p>
                </div>
                <IntroduceBubble
                  type="message"
                  content={user.bio}
                  className="h-11 w-full overflow-hidden"
                />
                {user.gameAccount.linked ? (
                  <div className="border-accent/50 bg-accent/10 flex h-8 flex-row items-center justify-center gap-1 rounded-xl border px-4 py-2 whitespace-nowrap">
                    {/* 아이콘 */}
                    <Link className="text-accent" size={14} />

                    {/* 텍스트 */}
                    <span className="text-content-primary text-sm">
                      {user.gameAccount.gameName}
                    </span>
                    <span className="text-content-second text-xs">
                      {user.gameAccount.tagLine}
                    </span>
                  </div>
                ) : (
                  <div className="border-border-primary bg-bg-secondary flex h-8 flex-row items-center justify-center gap-1 rounded-xl border px-4 py-2 whitespace-nowrap">
                    {/* 아이콘 */}
                    <Link className="text-content-primary" size={14} />

                    {/* 텍스트 */}
                    <span className="text-content-primary text-sm">
                      연동 데이터 없음
                    </span>
                  </div>
                )}
                <ChevronRight size={30} className="text-content-secondary" />
              </HorizontalCardContainer>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
