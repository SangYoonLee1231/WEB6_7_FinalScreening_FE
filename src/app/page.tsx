// export default function Home() {
//   return <h1>Home</h1>;
// }

import ChatCard from "@/components/common/chat/ChatCard";

export default function Home() {
  return (
    <>
      <ChatCard
        avatarSrc="/images/profile.png"
        nickname="커뮤니티닉네임"
        createdAt="2025-01-12T10:30:00Z"
        message="저 미드 가는데 같이하실래여?"
        unreadCount={1}
        isSelected
      />
      <ChatCard
        avatarSrc="/images/profile.png"
        nickname="다른 유저"
        createdAt="2025-01-12T09:10:00Z"
        message="솔랭 아무 라인 같이 할 사람"
      />
    </>
  );
}
