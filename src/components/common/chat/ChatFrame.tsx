"use client";

import * as React from "react";
import { twMerge } from "tailwind-merge";

import * as ScrollArea from "@radix-ui/react-scroll-area";
import * as Separator from "@radix-ui/react-separator";

import Avatar from "@/components/common/Avatar";
import StateBadge from "@/components/common/StateBadge";
import ChatBubble, {
  ChatBubbleSide,
} from "@/components/common/chat/ChatBubble";
import ChatInput from "@/components/common/chat/ChatInput";

import type { PostStatus } from "@/types/post";

// '오늘' 같은 날짜 구분 뱃지
function DateDivider({ label }: { label: string }) {
  return (
    <div className="my-4 flex justify-center">
      <span className="bg-bg-primary text-content-secondary rounded-full px-4 py-1 text-xs">
        {label}
      </span>
    </div>
  );
}

export type ChatHeaderUser = {
  profileImageUrl: string | null;
  gameNickname: string;
  gameTag?: string;
  communityNickname: string;
};

export type ChatMessage = {
  id: string;
  side: ChatBubbleSide; // "me" | "other"
  message: string;
  createdAt: string;
  nickname?: string;
  avatarSrc?: string;
};

export type ChatFrameProps = {
  widthClassName?: string;
  headerUser: ChatHeaderUser;
  title: React.ReactNode;
  state: PostStatus;
  messages: ChatMessage[];
  onSend: (message: string) => void | Promise<void>;
  inputPlaceholder?: string;
  isSending?: boolean;
  messageAreaClassName?: string;
  className?: string;
};

export default function ChatFrame({
  widthClassName = "w-[56.25rem]", // 900px
  headerUser,
  title,
  state,
  messages,
  onSend,
  inputPlaceholder = "보낼 메시지를 입력하세요",
  isSending = false,
  messageAreaClassName,
  className,
}: ChatFrameProps) {
  const viewportRef = React.useRef<HTMLDivElement | null>(null);

  // 메시지 목록이 바뀌면 하단으로 스크롤(초기/새메시지 기본 UX)
  React.useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages.length]);

  return (
    <section
      className={twMerge(
        widthClassName,
        "rounded-xl border",
        "bg-bg-secondary border-bg-primary",
        "overflow-hidden",
        "flex flex-col",
        className,
      )}
    >
      {/* Header */}
      <header className="bg-bg-primary flex items-center justify-between px-6 py-4">
        {/* 좌측: FindCard 닉네임 파트 느낌 */}
        <div className="flex min-w-0 items-center gap-3">
          <Avatar
            type="profile"
            src={headerUser.profileImageUrl ?? "/default-avatar.png"}
            size="md"
            className="shrink-0"
          />

          <div className="min-w-0">
            <div className="flex min-w-0 items-center gap-2">
              <h3 className="text-content-main truncate text-lg">
                {headerUser.gameNickname}
              </h3>
              {headerUser.gameTag ? (
                <span className="text-content-secondary shrink-0 text-sm">
                  {headerUser.gameTag}
                </span>
              ) : null}
            </div>

            <p className="text-accent/50 truncate text-sm">
              {headerUser.communityNickname}
            </p>
          </div>
        </div>

        {/* 가운데: 제목 */}
        <div className="min-w-0 flex-1 px-6">
          <p className="text-content-primary truncate text-base">{title}</p>
        </div>

        {/* 우측: 모집상태 */}
        <StateBadge state={state} />
      </header>

      {/* Header 아래 구분선 */}
      <Separator.Root className="bg-bg-primary h-px" />

      {/* Body (ScrollArea) */}
      <div className={twMerge("min-h-0 flex-1", messageAreaClassName)}>
        <ScrollArea.Root className="h-full w-full">
          <ScrollArea.Viewport
            ref={viewportRef}
            className="h-full w-full px-6 py-6"
          >
            <div className="flex flex-col gap-8">
              {/* '오늘' 같은 날짜 뱃지 */}
              <DateDivider label="오늘" />

              {messages.map((m) => (
                <ChatBubble
                  key={m.id}
                  side={m.side}
                  message={m.message}
                  createdAt={m.createdAt}
                  nickname={m.nickname}
                  avatarSrc={m.avatarSrc}
                />
              ))}
            </div>
          </ScrollArea.Viewport>

          {/* 스크롤바(최소화) */}
          <ScrollArea.Scrollbar
            orientation="vertical"
            className="flex touch-none bg-transparent p-1 select-none"
          >
            <ScrollArea.Thumb className="bg-bg-quaternary flex-1 rounded-full opacity-60" />
          </ScrollArea.Scrollbar>
          <ScrollArea.Corner />
        </ScrollArea.Root>
      </div>

      {/* Footer(Input) 위 구분선 제거 (요청사항) */}

      {/* Footer (Input) */}
      <footer className="px-6 py-4">
        <ChatInput
          placeholder={inputPlaceholder}
          onSend={onSend}
          isSending={isSending}
        />
      </footer>
    </section>
  );
}
/* 사용법 예시 (꼭 필요해서 올립니다)   


"use client";

import ChatFrame, { ChatMessage } from "@/components/common/chat/ChatFrame";

export default function ChatPage() {
  const headerUser = {
    profileImageUrl: "https://example.com/profile.png",
    gameNickname: "게임닉네임",
    gameTag: "#1234",
    communityNickname: "커뮤니티닉네임",
  };

  const messages: ChatMessage[] = [
    {
      id: "m1",
      side: "other",
      message: "칼바람저요저요저요...",
      createdAt: new Date().toISOString(),
      nickname: "커뮤니티닉네임",
      avatarSrc: "https://example.com/profile.png",
    },
    {
      id: "m2",
      side: "me",
      message: "진정하시고 닉네임좀",
      createdAt: new Date().toISOString(),
    },
  ];

  return (
    <ChatFrame
      headerUser={headerUser}
      title={
        <>
          <span className="text-accent">칼바람나라락</span>
          <span className="text-content-secondary">
            {" "}
            같이 하실 분 매너유저만
          </span>
        </>
      }
      state="RECRUITING"
      messages={messages}
      onSend={(text) => {
        console.log("send:", text);
        // 여기서 서버로 보내고, 성공하면 messages에 append하는 구조로 확장
      }}
    />
  );
}

*/
