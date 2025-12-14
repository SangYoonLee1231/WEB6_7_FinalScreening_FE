// export default function Home() {
//   return <h1>Home</h1>;
// }

"use client";

import ChatInput from "@/components/common/chat/ChatInput";

export default function Home() {
  return (
    <div className="p-6">
      <ChatInput
        onSend={(msg) => {
          console.log("send:", msg);
        }}
      />
    </div>
  );
}
