import ClientApi from "@/lib/clientApi";
import type { ChatRoomsResponseDto } from "@/types/chat";

// 내가 속한 채팅방 목록 조회 (cursor/size는 추후 확장 대비)
export async function getChatRooms(params?: {
  cursor?: string;
  size?: number;
}): Promise<ChatRoomsResponseDto> {
  const qs = new URLSearchParams();

  if (params?.size) qs.set("size", String(params.size));
  if (params?.cursor) qs.set("cursor", params.cursor);

  const query = qs.toString();
  const path = query ? `/api/v1/chats?${query}` : `/api/v1/chats`;

  const res = await ClientApi(path, {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`getChatRooms failed: ${res.status} ${text}`);
  }

  return (await res.json()) as ChatRoomsResponseDto;
}

// 채팅방 메시지 조회
export async function getChatMessages(
  chatId: string,
  params?: {
    cursor?: string;
    size?: number;
  },
) {
  const qs = new URLSearchParams();

  if (params?.size) qs.set("size", String(params.size));
  if (params?.cursor) qs.set("cursor", params.cursor);

  const query = qs.toString();
  const path = query
    ? `/api/v1/chats/${chatId}/messages?${query}`
    : `/api/v1/chats/${chatId}/messages`;

  const res = await ClientApi(path, {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(
      `getChatMessages failed(chatId=${chatId}): ${res.status} ${text}`,
    );
  }

  return await res.json();
}
