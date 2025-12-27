import { BoxButton } from "@/components/common/button/BoxButton";
import TextInput from "@/components/common/TextInput";
import IntroduceBubble from "@/components/profile/IntroduceBubble";
import ClientApi from "@/lib/clientApi";
import { useEffect, useState } from "react";

interface CommentProps {
  initialComment: string;
}

export default function CommentSection({ initialComment }: CommentProps) {
  const [comment, setComment] = useState<string>("");
  const [tempComment, setTempComment] = useState<string>("");
  const [isCommentEditing, setIsCommentEditing] = useState<boolean>(false);

  useEffect(() => {
    setComment(initialComment);
  });

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

  return (
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
  );
}
