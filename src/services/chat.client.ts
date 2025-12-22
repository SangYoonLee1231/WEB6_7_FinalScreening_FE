import ClientApi from "@/lib/clientApi";
import { createChatRoomResponse } from "@/types/chat";

export async function CreateChat(postId: number) {
  const res = await ClientApi(`/api/v1/chats`, {
    method: "POST",
    body: JSON.stringify({
      postId: postId,
    }),
  });

  if (!res.ok) {
    alert("모집글 생성에 실패했습니다.");
    return null;
  }

  // 채팅방 구현 후 수정 필요
  alert("모집글 생성이 완료되었습니다.");
  return (await res.json()) as createChatRoomResponse;
}
