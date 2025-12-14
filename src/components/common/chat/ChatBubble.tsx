"use client";

import * as Avatar from "@radix-ui/react-avatar";
import * as Tooltip from "@radix-ui/react-tooltip";
import * as ContextMenu from "@radix-ui/react-context-menu";

// 시간 포맷: '오후 N:NN'
function formatKoreanTime(date: string) {
  const d = new Date(date);
  const hours = d.getHours();
  const minutes = d.getMinutes().toString().padStart(2, "0");

  const isPM = hours >= 12;
  const displayHour = hours % 12 === 0 ? 12 : hours % 12;

  return `${isPM ? "오후" : "오전"} ${displayHour}:${minutes}`;
}

export type ChatBubbleSide = "me" | "other";

export type ChatBubbleMenuItem = {
  label: string;
  onSelect: () => void;
  disabled?: boolean;
};

export type ChatBubbleProps = {
  side: ChatBubbleSide;
  message: string;
  createdAt: string;

  // other일 때만 의미 있음
  nickname?: string;
  avatarSrc?: string;
  avatarAlt?: string;

  // 우클릭 메뉴(선택)
  menuItems?: ChatBubbleMenuItem[];
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

  const bubbleBg = isMe ? "bg-bg-primary" : "bg-bg-tertiary";
  const bubbleText = "text-content-primary";
  const bubbleMaxW = "max-w-[32rem]";

  const Bubble = (
    <Tooltip.Provider delayDuration={150}>
      <div
        className={[
          "flex w-full items-end gap-3",
          isMe ? "justify-end" : "justify-start",
          className ?? "",
        ].join(" ")}
      >
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

        <div
          className={["flex flex-col", isMe ? "items-end" : "items-start"].join(
            " ",
          )}
        >
          {!isMe && (
            <p className="text-content-main mb-1 text-sm font-semibold">
              {nickname ?? "알 수 없음"}
            </p>
          )}

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
                "rounded-xl",
                isMe ? "rounded-br-sm" : "rounded-bl-sm",
                "px-4 py-3",
                "break-words whitespace-pre-wrap",
              ].join(" ")}
            >
              {message}
            </div>

            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <time
                  dateTime={createdAt}
                  className="text-content-secondary shrink-0 text-xs select-none"
                >
                  {formatKoreanTime(createdAt)}
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
