"use client";

import * as React from "react";
import type { PostStatus } from "@/types/post";
import type {
  ChatHeaderUser,
  ChatMessage,
} from "@/components/common/chat/ChatFrame";
import { getChatMessages, getChatRoomDetail } from "@/services/chats.client";
import type { ChatRoom } from "@/hooks/chat/useChatRooms";

function mergeMessages(
  prev: ChatMessage[],
  next: ChatMessage[],
): ChatMessage[] {
  const map = new Map<string, ChatMessage>();

  // prev 먼저 넣고 next로 덮어쓰기(동일 id면 최신 값 반영)
  prev.forEach((m) => map.set(m.id, m));
  next.forEach((m) => map.set(m.id, m));

  // 시간순 정렬
  return Array.from(map.values()).sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
  );
}

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

  // polling 시에도 other/me 판별 및 표시를 하려면 detail 정보가 필요해서 ref로 보관
  const otherUserIdRef = React.useRef<number | null>(null);
  const otherNicknameRef = React.useRef<string | null>(null);
  const otherAvatarRef = React.useRef<string | null>(null);

  const pollTimerRef = React.useRef<number | null>(null);

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

        // polling용 ref 업데이트
        otherUserIdRef.current = detail.otherUser.userId;
        otherNicknameRef.current = detail.otherUser.nickname;
        otherAvatarRef.current = detail.otherUser.profileImage;

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

    async function pollMessages(chatId: string) {
      const otherUserId = otherUserIdRef.current;
      if (!otherUserId) return; // detail 아직 안 들어왔으면 스킵

      try {
        const messageRes = await getChatMessages(chatId, { size: 30 });

        const otherNickname = otherNicknameRef.current ?? undefined;
        const otherAvatar = otherAvatarRef.current ?? "/default-avatar.png";

        const mapped: ChatMessage[] = messageRes.messages.map((m) => {
          const isOther = m.senderId === otherUserId;
          return {
            id: String(m.chatMessageId),
            side: isOther ? "other" : "me",
            message: m.content,
            createdAt: m.createdAt,
            nickname: isOther ? otherNickname : undefined,
            avatarSrc: isOther ? otherAvatar : undefined,
          };
        });

        setRightMessages((prev) => mergeMessages(prev, mapped));
      } catch (e) {
        // 폴링 실패는 화면 초기화하지 않고 로그만
        console.warn("pollMessages failed", e);
      }
    }

    // 선택된 방이 없으면 우측 초기화 + 폴링 정리
    if (!selectedRoomId) {
      setRightHeaderUser(null);
      setRightTitle(null);
      setRightState(null);
      setRightMessages([]);

      otherUserIdRef.current = null;
      otherNicknameRef.current = null;
      otherAvatarRef.current = null;

      if (pollTimerRef.current) {
        window.clearInterval(pollTimerRef.current);
        pollTimerRef.current = null;
      }
      return;
    }

    // 방이 바뀔 때 이전 폴링 제거
    if (pollTimerRef.current) {
      window.clearInterval(pollTimerRef.current);
      pollTimerRef.current = null;
    }

    // 1) 최초 로딩
    fetchRightPanel(selectedRoomId);

    // 2) 주기적 갱신(폴링)
    pollTimerRef.current = window.setInterval(() => {
      pollMessages(selectedRoomId);
    }, 5000); // 5초 (원하면 2000~5000 사이로 조정)

    return () => {
      cancelled = true;
      if (pollTimerRef.current) {
        window.clearInterval(pollTimerRef.current);
        pollTimerRef.current = null;
      }
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

    // TODO: 실제 전송 API 붙이면 여기서 호출
    // 실패 시 optimistic 롤백/토스트 처리 권장
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
