"use client";

import * as React from "react";
import type { PostStatus } from "@/types/post";
import { getChatRooms } from "@/services/chats.client";
import type { ChatMessage } from "@/components/common/chat/ChatFrame";

export type ChatRoom = {
  id: string;
  game: string;
  title: string;
  state: PostStatus;
  headerUser: {
    profileImageUrl: string | null;
    gameNickname: string;
    gameTag?: string;
    communityNickname: string;
  };
  lastMessage: string;
  createdAt: string;
  unreadCount: number;
  messages: ChatMessage[]; // A-1에서는 비어 있음
};

export function useChatRooms(game: string) {
  const [rooms, setRooms] = React.useState<ChatRoom[]>([]);
  const [selectedRoomId, setSelectedRoomId] = React.useState<string>("");

  const [isLoadingRooms, setIsLoadingRooms] = React.useState<boolean>(true);
  const [tab, setTab] = React.useState<"all" | "unread">("all");

  React.useEffect(() => {
    let cancelled = false;

    async function fetchRoomsOnce() {
      try {
        setIsLoadingRooms(true);

        const data = await getChatRooms(); // GET /api/v1/chats
        if (cancelled) return;

        const nextRooms: ChatRoom[] = data.chatRooms.map((r) => ({
          id: String(r.chatRoomId),
          game,
          title: r.memo ?? "",
          state: (r.isActive ? "RECRUITING" : "EXPIRED") as PostStatus,
          headerUser: {
            profileImageUrl: r.otherUser.profileImage,
            // 목록 응답에는 gameNickname/gameTag가 없어서 nickname으로 임시 표시
            gameNickname: r.otherUser.nickname,
            gameTag: undefined,
            communityNickname: r.otherUser.nickname,
          },
          lastMessage: r.lastMessage?.content ?? "",
          createdAt: r.lastActivityAt,
          unreadCount: r.unreadCount ?? 0,
          messages: [],
        }));

        setRooms(nextRooms);
        setSelectedRoomId((prev) => prev || nextRooms[0]?.id || "");
      } catch (e) {
        console.warn(e);
        if (!cancelled) setRooms([]);
      } finally {
        if (!cancelled) setIsLoadingRooms(false);
      }
    }

    fetchRoomsOnce();
    return () => {
      cancelled = true;
    };
  }, [game]);

  const filteredRooms = React.useMemo(() => {
    if (tab === "unread") return rooms.filter((r) => r.unreadCount > 0);
    return rooms;
  }, [rooms, tab]);

  return {
    rooms,
    setRooms,
    selectedRoomId,
    setSelectedRoomId,
    isLoadingRooms,
    tab,
    setTab,
    filteredRooms,
  };
}
