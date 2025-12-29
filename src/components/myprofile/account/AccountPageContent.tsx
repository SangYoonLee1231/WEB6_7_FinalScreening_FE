"use client";

import { useMenuStore, useMyProfileMenuStore } from "@/stores/menuStore";
import { useEffect, useState } from "react";
import NicknameSection from "./NicknameSection";
import ProfileImageSection from "./ProfileImageSection";
import CommentSection from "./CommentSection";
import PasswordSection from "./PasswordSection";
import { useQuery } from "@tanstack/react-query";
import { getMyProfile } from "@/services/user.client"
import LoadingBouncy from "@/components/common/loading/LoadingBouncy";

export default function AccountPageContent() {
  const { setMenu } = useMenuStore();
  const { setMenu: setProfileMenu } = useMyProfileMenuStore();
  
  const { data: profileData, isLoading, refetch } = useQuery({ 
    queryKey: ['user'], 
    queryFn: getMyProfile,
  });

  useEffect(() => {
    setMenu("profile");
    setProfileMenu("account");
  }, [setMenu, setProfileMenu]);

 if (isLoading) {
  return <LoadingBouncy />;
 }
  return (
    <div className="flex w-125 flex-col gap-11 [&_h3]:text-xl [&_h3]:font-semibold">
      <h2 className="text-4xl font-bold">계정 관리</h2>
      <div className="flex flex-col gap-9">
        <div className="flex items-center gap-10">
          <ProfileImageSection
            profileImage={profileData?.profileImage ?? undefined} refetch={refetch}
          />
          <NicknameSection initialNickname={profileData?.nickname ?? ""} nicknameUpdatedAt={profileData?.nicknameUpdatedAt ?? null} />
        </div>

        <div className="flex flex-col gap-2">
          <h3>이메일</h3>
          <span>{profileData?.email}</span>
        </div>

        <CommentSection initialComment={profileData?.comment ?? ""} />
        <PasswordSection />
      </div>
    </div>
  );
}
