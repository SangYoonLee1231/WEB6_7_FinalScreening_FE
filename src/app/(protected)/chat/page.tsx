"use client";

import * as React from "react";
import * as Tabs from "@radix-ui/react-tabs";
import { MessageCircle } from "lucide-react";

import ChatCard from "@/components/common/chat/ChatCard";
import ChatFrame, {
  type ChatMessage,
} from "@/components/common/chat/ChatFrame";
import { PostStatus } from "@/types/post";
import { useMenuStore } from "@/stores/menuStore";

type ChatRoom = {
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
  messages: ChatMessage[];
};

function nowISO() {
  return new Date().toISOString();
}

function buildMockRooms(game: string): ChatRoom[] {
  const t1 = nowISO();
  const t2 = nowISO();

  return [
    {
      id: "room-1",
      game,
      title: "칼바람나라락 같이 하실 분 매너유저만",
      state: "RECRUIT",
      headerUser: {
        profileImageUrl: "/dummy-profile.png",
        gameNickname: "게임닉네임",
        gameTag: "#1234",
        communityNickname: "커뮤니티닉네임",
      },
      lastMessage: "님아 저 미드 가는데 같이하실래여 어쩌구저쩌...",
      createdAt: t1,
      unreadCount: 1,
      messages: [
        {
          id: "m-1",
          side: "other",
          message:
            "칼바람저요저요저요저요저요저요저요저요저요저요저요\n저요저요저요저요저요저요저요저요저요저요저요",
          createdAt: t1,
          nickname: "커뮤니티닉네임",
          avatarSrc: "/dummy-profile.png",
        },
        {
          id: "m-2",
          side: "me",
          message: "진정하시고 닉네임좀",
          createdAt: t2,
        },
      ],
    },
    {
      id: "room-2",
      game,
      title: "칼바람나라락 같이 하실 분 매너유저만",
      state: "RECRUIT",
      headerUser: {
        profileImageUrl: "/dummy-profile-2.png",
        gameNickname: "게임닉네임",
        gameTag: "#1234",
        communityNickname: "커뮤니티닉네임",
      },
      lastMessage: "칼바람저요저요저요저요저요저요저요저요저요...",
      createdAt: t2,
      unreadCount: 0,
      messages: [
        {
          id: "m-3",
          side: "other",
          message: "칼바람저요저요저요저요저요저요저요저요저요...",
          createdAt: t2,
          nickname: "커뮤니티닉네임",
          avatarSrc: "/dummy-profile-2.png",
        },
      ],
    },
  ];
}

function SegmentedTabs() {
  return (
    <Tabs.List className="bg-bg-primary inline-flex rounded-full p-1">
      <Tabs.Trigger
        value="all"
        className={[
          "rounded-full px-4 py-2 text-sm",
          "text-content-secondary",
          "data-[state=active]:bg-bg-tertiary",
          "data-[state=active]:text-content-main",
          "outline-none",
        ].join(" ")}
      >
        전체
      </Tabs.Trigger>
      <Tabs.Trigger
        value="unread"
        className={[
          "rounded-full px-4 py-2 text-sm",
          "text-content-secondary",
          "data-[state=active]:bg-bg-tertiary",
          "data-[state=active]:text-content-main",
          "outline-none",
        ].join(" ")}
      >
        안 읽은 채팅방
      </Tabs.Trigger>
    </Tabs.List>
  );
}

function EmptyChatPanel() {
  return (
    <div className="border-border-primary bg-bg-secondary flex h-full w-full items-center justify-center rounded-xl border">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="bg-bg-tertiary grid size-28 place-items-center rounded-2xl">
          <MessageCircle className="text-content-secondary size-10" />
        </div>
        <p className="text-content-secondary text-xl leading-relaxed">
          도착한 채팅을 확인하고
          <br />
          함께 파티를 즐겨봐요
        </p>
      </div>
    </div>
  );
}

export default function ChatPage({ params }: { params: { game: string } }) {
  const { setMenu } = useMenuStore();

  React.useEffect(() => {
    setMenu("chat");
  }, []);

  const game = params.game;

  const [rooms, setRooms] = React.useState<ChatRoom[]>(() =>
    buildMockRooms(game),
  );
  const [selectedRoomId, setSelectedRoomId] = React.useState<string>(
    rooms[0]?.id ?? "",
  );
  const [tab, setTab] = React.useState<"all" | "unread">("all");

  const selectedRoom = React.useMemo(
    () => rooms.find((r) => r.id === selectedRoomId) ?? null,
    [rooms, selectedRoomId],
  );

  const filteredRooms = React.useMemo(() => {
    if (tab === "unread") return rooms.filter((r) => r.unreadCount > 0);
    return rooms;
  }, [rooms, tab]);

  const handleSend = async (message: string) => {
    if (!selectedRoom) return;

    setRooms((prev) =>
      prev.map((r) => {
        if (r.id !== selectedRoom.id) return r;

        const createdAt = nowISO();
        const nextMessage: ChatMessage = {
          id: `m-${Math.random().toString(16).slice(2)}`,
          side: "me",
          message,
          createdAt,
        };

        return {
          ...r,
          lastMessage: message,
          createdAt,
          messages: [...r.messages, nextMessage],
        };
      }),
    );
  };

  return (
    <main className="w-full px-6 py-8">
      <div className="flex w-full flex-col gap-8 lg:flex-row lg:items-start lg:justify-center">
        {/* Left: Chat room list */}
        <section className="w-full lg:w-[25rem]">
          <Tabs.Root
            value={tab}
            onValueChange={(v) => setTab(v as "all" | "unread")}
          >
            <div className="mb-4 flex items-center">
              <SegmentedTabs />
            </div>

            <Tabs.Content value="all" className="outline-none">
              <div className="flex max-h-[70vh] flex-col gap-4 overflow-auto pr-1 lg:max-h-[38.125rem]">
                {filteredRooms.map((room) => (
                  <ChatCard
                    key={room.id}
                    avatarSrc={
                      room.headerUser.profileImageUrl ?? "/default-avatar.png"
                    }
                    nickname={room.headerUser.communityNickname}
                    createdAt={room.createdAt}
                    message={room.lastMessage}
                    subMessage={room.title}
                    unreadCount={room.unreadCount}
                    onClick={() => setSelectedRoomId(room.id)}
                    isSelected={room.id === selectedRoomId}
                  />
                ))}
              </div>
            </Tabs.Content>

            <Tabs.Content value="unread" className="outline-none">
              <div className="flex max-h-[70vh] flex-col gap-4 overflow-auto pr-1 lg:max-h-[38.125rem]">
                {filteredRooms.length === 0 ? (
                  <p className="text-content-secondary px-2 py-6 text-sm">
                    안 읽은 채팅방이 없어요.
                  </p>
                ) : (
                  filteredRooms.map((room) => (
                    <ChatCard
                      key={room.id}
                      avatarSrc={
                        room.headerUser.profileImageUrl ?? "/default-avatar.png"
                      }
                      nickname={room.headerUser.communityNickname}
                      createdAt={room.createdAt}
                      message={room.lastMessage}
                      subMessage={room.title}
                      unreadCount={room.unreadCount}
                      onClick={() => setSelectedRoomId(room.id)}
                      isSelected={room.id === selectedRoomId}
                    />
                  ))
                )}
              </div>
            </Tabs.Content>
          </Tabs.Root>
        </section>

        {/* Right: Chat panel */}
        <section className="w-full lg:w-[56.25rem]">
          {selectedRoom ? (
            <ChatFrame
              widthClassName="w-full"
              headerUser={selectedRoom.headerUser}
              title={
                <>
                  <span className="text-accent">칼바람나라락</span>
                  <span className="text-content-secondary">
                    {" "}
                    같이 하실 분 매너유저만
                  </span>
                </>
              }
              state={selectedRoom.state}
              messages={selectedRoom.messages}
              onSend={handleSend}
            />
          ) : (
            <div className="h-[60vh] lg:h-[53.6875rem]">
              <EmptyChatPanel />
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
