"use client";

import * as React from "react";
import type { PostStatus } from "@/types/post";
import type {
  ChatHeaderUser,
  ChatMessage,
} from "@/components/common/chat/ChatFrame";
import { getChatMessages, getChatRoomDetail } from "@/services/chats.client";
import type { ChatRoom } from "@/hooks/chat/useChatRooms";

export function useChatRoomPanel(
  selectedRoomId: string,
  setRooms: React.Dispatch<React.SetStateAction<ChatRoom[]>>,
) {
  const [isLoadingRight, setIsLoadingRight] = React.useState<boolean>(false);

  const [rightHeaderUser, setRightHeaderUser] =
    React.useState<ChatHeaderUser | null>(null);
  const [rightTitle, setRightTitle] = React.useState<React.ReactNode>(null);
  const [rightState, setRightState] = React.useState<PostStatus | null>(null);
  const [rightMessages, setRightMessages] = React.useState<ChatMessage[]>([]);

  React.useEffect(() => {
    let cancelled = false;

    async function fetchRightPanel(chatId: string) {
      try {
        setIsLoadingRight(true);
        setRightMessages([]);

        const [detail, messageRes] = await Promise.all([
          getChatRoomDetail(chatId), // GET /api/v1/chats/{chatId}
          getChatMessages(chatId, { size: 30 }), // GET /api/v1/chats/{chatId}/messages
        ]);

        if (cancelled) return;

        setRightHeaderUser({
          profileImageUrl: detail.otherUser.profileImage,
          gameNickname: detail.otherUser.gameNickname,
          gameTag: detail.otherUser.gameTag,
          communityNickname: detail.otherUser.nickname,
        });

        setRightTitle(`${detail.queueType} ${detail.memo}`);

        setRightState(detail.postStatus as PostStatus);

        const mapped: ChatMessage[] = messageRes.messages.map((m) => {
          const isOther = m.senderId === detail.otherUser.userId;
          return {
            id: String(m.chatMessageId),
            side: isOther ? "other" : "me",
            message: m.content,
            createdAt: m.createdAt,
            nickname: isOther ? detail.otherUser.nickname : undefined,
            avatarSrc: isOther
              ? (detail.otherUser.profileImage ?? "/default-avatar.png")
              : undefined,
          };
        });

        setRightMessages(mapped);
      } catch (e) {
        console.warn(e);
        if (!cancelled) {
          setRightHeaderUser(null);
          setRightTitle(null);
          setRightState(null);
          setRightMessages([]);
        }
      } finally {
        if (!cancelled) setIsLoadingRight(false);
      }
    }

    if (!selectedRoomId) {
      setRightHeaderUser(null);
      setRightTitle(null);
      setRightState(null);
      setRightMessages([]);
      return;
    }

    fetchRightPanel(selectedRoomId);

    return () => {
      cancelled = true;
    };
  }, [selectedRoomId]);

  const handleSend = async (message: string) => {
    if (!selectedRoomId) return;

    const createdAt = new Date().toISOString();
    const optimistic: ChatMessage = {
      id: `m-${Math.random().toString(16).slice(2)}`,
      side: "me",
      message,
      createdAt,
    };

    // 우측 채팅창 즉시 반영
    setRightMessages((prev) => [...prev, optimistic]);

    // 좌측 목록 프리뷰 갱신
    setRooms((prev) =>
      prev.map((r) =>
        r.id === selectedRoomId
          ? {
              ...r,
              lastMessage: message,
              createdAt,
            }
          : r,
      ),
    );

    // TODO: 전송 API 생기면 여기서 호출
  };

  return {
    isLoadingRight,
    rightHeaderUser,
    rightTitle,
    rightState,
    rightMessages,
    handleSend,
  };
}
