"use client";

import * as Avatar from "@radix-ui/react-avatar";
import * as Tooltip from "@radix-ui/react-tooltip";
import * as ContextMenu from "@radix-ui/react-context-menu";

import formatRelativeTime from "@/utils/formatRelativeTime";

export type ChatBubbleSide = "me" | "other";

export type ChatBubbleMenuItem = {
  label: string;
  onSelect: () => void;
  disabled?: boolean;
};

export type ChatBubbleProps = {
  side: ChatBubbleSide;

  // 말풍선 텍스트
  message: string;

  // 시간(ISO string 권장). 기본은 formatRelativeTime 사용
  createdAt: string;

  // 상대방일 때만 사용
  nickname?: string;
  avatarSrc?: string;
  avatarAlt?: string;

  // 우클릭 메뉴(선택)
  menuItems?: ChatBubbleMenuItem[];

  // 추가 스타일 확장
  className?: string;
};

export default function ChatBubble({
  side,
  message,
  createdAt,
  nickname,
  avatarSrc,
  avatarAlt = "avatar",
  menuItems,
  className,
}: ChatBubbleProps) {
  const isMe = side === "me";
  const hasMenu = !!menuItems && menuItems.length > 0;

  const bubbleBg = isMe
    ? "bg-[var(--color-bg-primary)]"
    : "bg-[var(--color-bg-tertiary)]";

  const bubbleText = isMe
    ? "text-[var(--color-content-primary)]"
    : "text-[var(--color-content-primary)]";

  // 상대/나 공통: 말풍선 최대 폭 (필요하면 숫자만 바꾸면 됨)
  const bubbleMaxW = "max-w-[32rem]"; // 512px

  const Bubble = (
    <Tooltip.Provider delayDuration={150}>
      <div
        className={[
          // row
          "flex w-full items-end gap-3",
          isMe ? "justify-end" : "justify-start",
          className ?? "",
        ].join(" ")}
      >
        {/* 상대방: 아바타 */}
        {!isMe && (
          <Avatar.Root className="h-10 w-10 shrink-0 overflow-hidden rounded-full">
            <Avatar.Image
              src={avatarSrc}
              alt={avatarAlt}
              className="h-full w-full object-cover"
            />
            <Avatar.Fallback
              className="bg-bg-quaternary text-content-main flex h-full w-full items-center justify-center text-sm"
              delayMs={200}
            >
              {nickname?.[0] ?? "?"}
            </Avatar.Fallback>
          </Avatar.Root>
        )}

        {/* 본문 영역(상대면 닉네임 + 말풍선, 나는 말풍선만) */}
        <div
          className={["flex flex-col", isMe ? "items-end" : "items-start"].join(
            " ",
          )}
        >
          {/* 상대방: 닉네임 */}
          {!isMe && (
            <p className="text-content-main mb-1 text-sm font-semibold">
              {nickname ?? "알 수 없음"}
            </p>
          )}

          {/* 말풍선 + 시간 */}
          <div
            className={[
              "flex items-end gap-2",
              isMe ? "flex-row-reverse" : "flex-row",
            ].join(" ")}
          >
            <div
              className={[
                bubbleMaxW,
                bubbleBg,
                bubbleText,
                // 말풍선 모양
                "rounded-xl",
                // figma 느낌: 상대는 좌측 라운드 강조, 나는 우측 라운드 강조 (필요시 조정)
                isMe ? "rounded-br-sm" : "rounded-bl-sm",
                // padding
                "px-4 py-3",
                // 긴 텍스트 줄바꿈
                "wrap-break-word whitespace-pre-wrap",
              ].join(" ")}
            >
              {message}
            </div>

            {/* 시간: 툴팁으로 정확한 시간 보여주고, 기본은 상대시간 */}
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <time
                  dateTime={createdAt}
                  className="text-content-secondary shrink-0 text-xs select-none"
                >
                  {formatRelativeTime(createdAt)}
                </time>
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Content
                  side={isMe ? "left" : "right"}
                  sideOffset={6}
                  className="bg-bg-quaternary text-content-main rounded-md px-2 py-1 text-xs"
                >
                  {new Date(createdAt).toLocaleString()}
                  <Tooltip.Arrow className="fill-bg-quaternary" />
                </Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root>
          </div>
        </div>
      </div>
    </Tooltip.Provider>
  );

  // 우클릭 메뉴가 있으면 ContextMenu로 감싸기
  if (!hasMenu) return Bubble;

  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger asChild>{Bubble}</ContextMenu.Trigger>
      <ContextMenu.Portal>
        <ContextMenu.Content className="min-w-40 rounded-lg border border-(--color-border-primary) bg-(--color-bg-secondary) p-1 shadow-lg">
          {menuItems!.map((item) => (
            <ContextMenu.Item
              key={item.label}
              disabled={item.disabled}
              onSelect={item.onSelect}
              className="text-content-primary rounded-md px-3 py-2 text-sm outline-none select-none data-disabled:opacity-50 data-highlighted:bg-(--color-bg-tertiary)"
            >
              {item.label}
            </ContextMenu.Item>
          ))}
        </ContextMenu.Content>
      </ContextMenu.Portal>
    </ContextMenu.Root>
  );
}
