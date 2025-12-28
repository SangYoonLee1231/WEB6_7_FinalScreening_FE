import TextInput from "@/components/common/TextInput";
import ClientApi from "@/lib/clientApi";
import { nicknameSchema } from "@/lib/validation/nicknameSchema";
import { CircleAlert } from "lucide-react";
import {
  useEffect,
  useOptimistic,
  useRef,
  useState,
  useTransition,
} from "react";
import dayjs from 'dayjs';

interface NicknameProps {
  initialNickname: string;
  nicknameUpdatedAt: string | null;
}

export default function NicknameSection({ initialNickname, nicknameUpdatedAt }: NicknameProps) {
  const [nickname, setNickname] = useState<string>("");
  const [modifyNickname, setModifyNickname] = useState<string>("");
  const [isNicknameEditing, setIsNicknameEditing] = useState<boolean>(false);
  const [nicknameError, setNicknameError] = useState<string | null>(null);

  const [isNicknamePending, startNicknameTransition] = useTransition();
  const [optimisticNickname, addOptimisticNickname] = useOptimistic<
    string | null,
    string
  >(nickname, (_: string | null, nextValue: string) => nextValue);

  const nicknameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setNickname(initialNickname);
  }, [initialNickname]);

  useEffect(() => {
    if (isNicknameEditing && nicknameInputRef.current) {
      nicknameInputRef.current.focus();
    }
  }, [isNicknameEditing]);

  const handleNicknameModifyButtonClick = () => {
    setModifyNickname(nickname ?? "");
    setIsNicknameEditing(true);
    if (nicknameUpdatedAt) {
      const lastUpdate = dayjs(nicknameUpdatedAt);
      const now = dayjs();
      const availableAt = lastUpdate.add(7, 'day');
      const formattedAvailableAt = dayjs(availableAt).format('YYYY년 M월 D일 H시 m분');
      if (now.isBefore(availableAt)) {
        alert(`닉네임 변경은 ${formattedAvailableAt}부터 가능합니다.`);
        return;
      }
    }
  };

  const handleNicknameSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setNicknameError(null);
    if (isNicknamePending) return;
    const parsedNickname = nicknameSchema.safeParse(modifyNickname);

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
          setNickname(modifyNickname);
          setIsNicknameEditing(false);
        } else {
          alert("닉네임 변경에 실패했습니다.");
        }
      } catch (error) {
        alert("서버 통신 중 오류가 발생했습니다.");
      }
    });
  };
  return (
    <div className="space-y-4">
      <h3>닉네임</h3>
      <div className="space-y-2">
        {isNicknameEditing ? (
          <form
            className="flex flex-row items-center space-x-4"
            onSubmit={handleNicknameSubmit}
          >
            <TextInput
              ref={nicknameInputRef}
              value={modifyNickname}
              onChange={(e) => setModifyNickname(e.target.value)}
              placeholder={nickname ?? ""}
              className="h-4 w-29 px-[9px] py-3 text-base"
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
              onClick={handleNicknameModifyButtonClick}
            >
              수정
            </button>
          </div>
        )}
        {nicknameError && (
          <p className="text-negative ml-2 text-sm">{nicknameError}</p>
        )}
        <div className="text-content-secondary flex items-center gap-2 text-base">
          <CircleAlert size={18} />
          <p>닉네임은 7일 단위로 변경할 수 있습니다</p>
        </div>
      </div>
    </div>
  );
}
