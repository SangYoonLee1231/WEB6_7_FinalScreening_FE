// export default function Home() {
//   return <h1>Home</h1>;
// }

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
