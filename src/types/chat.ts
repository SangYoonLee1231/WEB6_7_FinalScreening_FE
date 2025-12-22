export type ChatRoomsResponseDto = {
  chatRooms: ChatRoomListItemDto[];
  nextCursor: string | null;
  hasNext: boolean;
};

export type ChatRoomListItemDto = {
  chatRoomId: number;
  postId: number;
  otherUser: {
    userId: number;
    nickname: string;
    profileImage: string | null;
  };
  lastMessage: null | {
    chatMessageId: number;
    senderId: number;
    content: string;
    messageType: "TEXT" | string;
    createdAt: string;
  };
  unreadCount: number;
  queueType: string;
  memo: string | null;
  isActive: boolean;
  lastActivityAt: string;
};