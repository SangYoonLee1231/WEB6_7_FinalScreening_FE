import Avatar from "@/components/common/Avatar";
import CircleBtn from "@/components/common/button/CircleBtn";
import ClientApi from "@/lib/clientApi";
import { Pencil } from "lucide-react";
import { ChangeEvent, useOptimistic, useRef, useState, useTransition } from "react";

interface ProfileImageProps {
  initialProfileImage: string;
}

export default function ProfileImageSection(initialProfileImage: ProfileImageProps) {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [optimisticProfileImage, addOptimisticProfileImage] = useOptimistic<
    string | null,
    string
  >(profileImage, (_: string | null, nextValue: string) => nextValue);
  const [isImagePending, startImageTransition] = useTransition();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleEditClick = () => {
    fileInputRef?.current?.click();
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
    <div className="relative">
      <Avatar size="xl" src={optimisticProfileImage ?? ""} type="profile" />
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
  );
}
