"use client";

import { z } from "zod";
import Avatar from "@/components/common/Avatar";
import { BoxButton } from "@/components/common/button/BoxButton";
import CircleBtn from "@/components/common/button/CircleBtn";
import TextInput from "@/components/common/TextInput";
import IntroduceBubble from "@/components/profile/IntroduceBubble";
import { useMenuStore, useMyProfileMenuStore } from "@/stores/menuStore";
import { CircleAlert, Pencil } from "lucide-react";
import {
  ChangeEvent,
  useEffect,
  useOptimistic,
  useRef,
  useState,
  useTransition,
} from "react";
import ClientApi, { API_BASE } from "@/lib/clientApi";

interface profileDataProps {
  email: string;
  profile_image: string | null;
  nickname: string;
  comment: string | null;
}

export const nicknameSchema = z
  .string()
  .regex(
    /^[a-zA-Z0-9가-힣]+$/,
    "공백이나 특수 문자는 사용할 수 없으며 한글, 영어, 숫자만 가능합니다.",
  )
  .min(2, "닉네임은 2글자 이상이어야 합니다.")
  .max(8, "닉네임은 8글자 이하여야 합니다.");

export const passwordSchema = z
  .string()
  .regex(
    /^[a-zA-Z0-9가-힣!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+$/,
    "공백 문자는 사용할 수 없으며 한글, 영어, 숫자, 특수문자만 가능합니다.",
  )
  .min(8, "비밀번호는 8글자 이상이어야 합니다.");

export default function AccountPageContent() {
  const { setMenu } = useMenuStore();
  const { setMenu: setProfileMenu } = useMyProfileMenuStore();

  const [nickname, setNickname] = useState<string>("");
  const [tempNickname, setTempNickname] = useState<string>("");
  const [isNicknameEditing, setIsNicknameEditing] = useState<boolean>(false);
  const [optimisticNickname, addOptimisticNickname] = useOptimistic<
    string | null,
    string
  >(nickname, (_: string | null, nextValue: string) => nextValue);
  const [isNicknamePending, startNicknameTransition] = useTransition();
  const [nicknameError, setNicknameError] = useState<string | null>(null);

  const [email, setEmail] = useState<string>("");

  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [optimisticProfileImage, addOptimisticProfileImage] = useOptimistic<
    string | null,
    string
  >(profileImage, (_: string | null, nextValue: string) => nextValue);
  const [isImagePending, startImageTransition] = useTransition();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [comment, setComment] = useState<string>("");
  const [tempComment, setTempComment] = useState<string>("");
  const [isCommentEditing, setIsCommentEditing] = useState<boolean>(false);

  const [password, setPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string | null>(null);

  useEffect(() => {
    setMenu("profile");
    setProfileMenu("account");
    const fetchMyProfile = async () => {
      const res = await ClientApi(`/api/v1/users/me`, {
        method: "GET",
      });

      const profileData: profileDataProps = await res.json();

      if (res.ok) {
        // console.log("profileData", profileData);
        setNickname(profileData.nickname);
        setProfileImage(profileData.profile_image);
        setEmail(profileData.email);
        setComment(profileData.comment ?? "");
      }
    };

    fetchMyProfile();
  }, []);

  // useEffect(() => {
  //   console.log("profileImage", profileImage)
  // }, [profileImage]);

  const handleNicknameSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setNicknameError(null);
    if (isNicknamePending) return;
    const parsedNickname = nicknameSchema.safeParse(tempNickname);

    if (!parsedNickname.success) {
      setNicknameError(parsedNickname.error.issues[0]?.message);
      return;
    }

    startNicknameTransition(async () => {
      addOptimisticNickname(parsedNickname.data);
      try {
        const res = await ClientApi("/api/v1/users/me/nickname", {
          method: "PATCH",
          body: JSON.stringify({ nickname: parsedNickname.data }),
        });

        if (res.ok) {
          setNickname(tempNickname);
          setIsNicknameEditing(false);
        } else {
          alert("닉네임 변경에 실패했습니다.");
        }
      } catch (error) {
        alert("서버 통신 중 오류가 발생했습니다.");
      }
    });
  };

  const handleEditClick = () => {
    fileInputRef?.current?.click();
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await ClientApi("/api/v1/users/me/comment", {
        method: "PATCH",
        body: JSON.stringify({ comment: tempComment }),
      });

      if (res.ok) {
        setComment(tempComment);
        setIsCommentEditing(false);
      } else {
        alert("소개 변경에 실패했습니다.");
      }
    } catch (error) {
      alert("서버 통신 중 오류가 발생했습니다.");
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== newPasswordConfirm) {
      alert("새 비밀번호와 새 비밀번호 확인이 일치하지 않습니다.");
      setPasswordError("새 비밀번호와 새 비밀번호 확인이 일치하지 않습니다.");
      return;
    }
    const parsedNewPW = passwordSchema.safeParse(newPassword);
    if (!parsedNewPW.success) {
      setPasswordError(parsedNewPW.error.issues[0]?.message);
      return;
    }

    try {
      const res = await ClientApi("/api/v1/users/me/password", {
        method: "PATCH",
        body: JSON.stringify({
          password: password,
          newPassword: newPassword,
          newPasswordConfirm: newPasswordConfirm,
        }),
      });

      if (res.ok) {
        alert("비밀번호 변경 성공!");
      } else {
        alert("비밀번호 변경에 실패했습니다.");
      }
    } catch (error) {
      alert("서버 통신 중 오류가 발생했습니다.");
    }
  };

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || isImagePending) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      const base64String = ev.target?.result as string;
      // console.log("base64String", base64String);
      if (!base64String) return;

      startImageTransition(async () => {
        addOptimisticProfileImage(base64String);
        await uploadImageToServer(base64String);
      });
    };
    reader.readAsDataURL(file);
  };

  const uploadImageToServer = async (base64String: string) => {
    const formData = new FormData();
    formData.append("profileImage", base64String);
    try {
      // const res = await fetch(`${API_BASE}/api/v1/users/me/image`, {
      //   method: "PUT",
      //   headers: {
      //     "Content-Type": "multipart/form-data"
      //   },
      //   body: formData,
      //   credentials: "include",
      // });

      const res = await ClientApi("/api/v1/users/me/image", {
        method: "PUT",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      });

      if (res.ok) {
        setProfileImage(base64String);
        alert("프로필 이미지가 변경되었습니다.");
      } else {
        alert("이미지 업로드에 실패했습니다.");
        throw new Error("업로드 실패");
      }
    } catch (error) {
      // console.error("업로드 실패:", error);
      alert("이미지 업로드에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="flex w-125 flex-col gap-11 [&_h3]:text-xl [&_h3]:font-semibold">
      <h2 className="text-4xl font-bold">계정 관리</h2>
      <div className="flex flex-col gap-9">
        <div className="flex items-center gap-10">
          <div className="relative">
            <Avatar
              size="xl"
              src={optimisticProfileImage ?? ""}
              type="profile"
            />
            <CircleBtn
              size="xs"
              className="bg-accent absolute right-0 bottom-0"
              onClick={handleEditClick}
              disabled={isImagePending}
            >
              <Pencil size={15} strokeWidth={3} />
            </CircleBtn>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              style={{ display: "none" }}
            />
          </div>
          <div className="space-y-4">
            <h3>닉네임</h3>
            <div className="space-y-2">
              {isNicknameEditing ? (
                <form
                  className="flex flex-row items-center space-x-4"
                  onSubmit={handleNicknameSubmit}
                >
                  <TextInput
                    value={tempNickname}
                    onChange={(e) => setTempNickname(e.target.value)}
                    placeholder={nickname}
                    className="h-5 w-42 py-4"
                  />

                  <button
                    type="submit"
                    className="text-accent cursor-pointer hover:underline"
                  >
                    {isNicknamePending ? "저장 중..." : "저장"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsNicknameEditing(false);
                      setTempNickname(nickname);
                      setNicknameError(null);
                    }}
                    className="text-content-secondary cursor-pointer hover:underline"
                  >
                    취소
                  </button>
                </form>
              ) : (
                <div className="flex flex-row space-x-4">
                  <span>{optimisticNickname}</span>
                  <button
                    className="text-accent cursor-pointer hover:underline"
                    onClick={() => {
                      setTempNickname(nickname);
                      setIsNicknameEditing(true);
                    }}
                  >
                    수정
                  </button>
                </div>
              )}
              {/* 에러 메시지 표시 */}
              {nicknameError && (
                <p className="text-negative ml-2 text-sm">{nicknameError}</p>
              )}
              <div className="text-content-secondary flex items-center gap-2 text-base">
                <CircleAlert size={18} />
                <p>닉네임은 7일 단위로 변경할 수 있습니다</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h3>소개</h3>
          {isCommentEditing ? (
            <form
              className="flex flex-row items-center space-x-4"
              onSubmit={handleCommentSubmit}
            >
              <TextInput
                value={tempComment}
                onChange={(e) => setTempComment(e.target.value)}
                placeholder={comment}
                className="h-11 w-90 py-4"
              />

              <button
                type="submit"
                className="text-accent cursor-pointer hover:underline"
              >
                저장
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsCommentEditing(false);
                  setTempComment(comment);
                }}
                className="text-content-secondary cursor-pointer hover:underline"
              >
                취소
              </button>
            </form>
          ) : (
            <div className="flex flex-row justify-items-center space-x-4">
              <IntroduceBubble content={comment ?? ""} type="message" />
              <BoxButton
                text="수정"
                tone="color"
                size="xs"
                className="flex-nowrap self-end"
                onClick={() => {
                  setTempComment(comment);
                  setIsCommentEditing(true);
                }}
              />
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <h3>이메일</h3>
          <span>{email}</span>
        </div>
        <div className="flex flex-col gap-2">
          <h3>비밀번호 변경</h3>
          <form className="flex flex-col gap-2">
            <TextInput
              placeholder="현재 비밀번호"
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextInput
              placeholder="새 비밀번호"
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <TextInput
              placeholder="새 비밀번호 확인"
              onChange={(e) => setNewPasswordConfirm(e.target.value)}
            />
            <span className="ml-2">{passwordError}</span>
            <BoxButton
              text="수정"
              tone="color"
              size="xs"
              className="mt-3 flex-nowrap self-end"
              onClick={handlePasswordSubmit}
            />
          </form>
        </div>
      </div>
    </div>
  );
}
