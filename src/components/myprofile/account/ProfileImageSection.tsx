import Avatar from "@/components/common/Avatar";
import CircleBtn from "@/components/common/button/CircleBtn";
import ClientApi, { API_BASE } from "@/lib/clientApi";
import { Pencil } from "lucide-react";
import {
  ChangeEvent,
  useOptimistic,
  useRef,
  useState,
  useTransition,
} from "react";

interface ProfileImageProps {
  initialProfileImage: string;
}

export default function ProfileImageSection({
  initialProfileImage,
}: ProfileImageProps) {
  const [profileImage, setProfileImage] = useState<string>(initialProfileImage);
  const [optimisticProfileImage, addOptimisticProfileImage] = useOptimistic<
    string,
    string
  >(profileImage, (_, nextValue) => nextValue);
  const [isImagePending, startImageTransition] = useTransition();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleEditClick = () => {
    fileInputRef?.current?.click();
  };

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || isImagePending) return;

    const previewUrl = URL.createObjectURL(file);

    startImageTransition(async () => {
      addOptimisticProfileImage(previewUrl);
      await uploadImageToServer(file, previewUrl);
    });
  };

  const uploadImageToServer = async (file: File, previewUrl: string) => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await fetch(`${API_BASE}/api/v1/users/me/image`, {
        method: "PUT",
        body: formData,
        credentials: "include",
      });

      if (res.ok) {
        const data = await res.json();
        console.log("data.profileImage", data.profileImage);
        setProfileImage(data.profileImage);
        alert("프로필 이미지가 변경되었습니다.");
      } else {
        alert("이미지 업로드에 실패했습니다.");
        throw new Error("업로드 실패");
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log("error.message", error.message);
      }
      alert("이미지 업로드에 실패했습니다. 다시 시도해주세요.");
    } finally {
      URL.revokeObjectURL(previewUrl);
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
        accept="*/*"
        style={{ display: "none" }}
      />
    </div>
  );
}
