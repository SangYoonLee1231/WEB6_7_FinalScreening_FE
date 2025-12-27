"use client";

import { useMenuStore, useMyProfileMenuStore } from "@/stores/menuStore";
import { useEffect, useState } from "react";
import ClientApi from "@/lib/clientApi";
import NicknameSection from "./NicknameSection";
import ProfileImageSection from "./ProfileImageSection";
import CommentSection from "./CommentSection";
import PasswordSection from "./PasswordSection";

interface profileDataProps {
  email: string;
  profile_image: string | null;
  nickname: string;
  comment: string | null;
}

export default function AccountPageContent() {
  const { setMenu } = useMenuStore();
  const { setMenu: setProfileMenu } = useMyProfileMenuStore();

  const [profileData, setProfileData] = useState<profileDataProps>({
    email: "",
    profile_image: null,
    nickname: "",
    comment: "",
  });

  useEffect(() => {
    setMenu("profile");
    setProfileMenu("account");

    const fetchMyProfile = async () => {
      try {
        const res = await ClientApi("/api/v1/users/me", {
          method: "GET",
        });
        if (!res.ok) {
          throw new Error("서버 응답 에러");
        }
        const data = await res.json();
        setProfileData(data);
        console.log("set profileData", data);
      } catch (error) {
        if (error instanceof Error) {
          alert(error.message);
        } else {
          alert("알 수 없는 오류가 발생했습니다.");
        }
      }
    };

    fetchMyProfile();
  }, [setMenu, setProfileMenu]);

  // useEffect(() => {
  //   console.log("profileImage", profileImage)
  // }, [profileImage]);

  return (
    <div className="flex w-125 flex-col gap-11 [&_h3]:text-xl [&_h3]:font-semibold">
      <h2 className="text-4xl font-bold">계정 관리</h2>
      <div className="flex flex-col gap-9">
        <div className="flex items-center gap-10">
          <ProfileImageSection
            initialProfileImage={profileData.profile_image ?? ""}
          />
          <NicknameSection initialNickname={profileData.nickname} />
        </div>

        <div className="flex flex-col gap-2">
          <h3>이메일</h3>
          <span>{profileData.email}</span>
        </div>

        <CommentSection initialComment={profileData.comment ?? ""} />
        <PasswordSection />
      </div>
    </div>
  );
}
