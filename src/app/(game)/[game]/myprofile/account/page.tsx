import Avatar from "@/components/common/Avatar";
import { BoxButton } from "@/components/common/button/BoxButton";
import CircleBtn from "@/components/common/button/CircleBtn";
import TextInput from "@/components/common/TextInput";
import IntroduceBubble from "@/components/profile/IntroduceBubble";
import { CircleAlert, Pencil } from "lucide-react";

export default function AccountPage() {
  return (
    <div className="flex flex-col gap-11 [&_h3]:text-xl [&_h3]:font-semibold">
      <h2 className="text-4xl font-bold">계정 관리</h2>
      <div className="flex flex-col gap-9">
        <div className="flex items-center gap-10">
          <div className="relative">
            <Avatar size="xl" src="" type="profile" />
            <CircleBtn
              size="xs"
              className="bg-accent absolute right-0 bottom-0"
            >
              <Pencil size={15} strokeWidth={3} />
            </CircleBtn>
          </div>
          <div className="space-y-4">
            <h3>닉네임</h3>
            <div className="space-y-2">
              <div className="space-x-4">
                <span>커뮤니티닉네임</span>
                <button className="text-accent cursor-pointer hover:underline">
                  수정
                </button>
              </div>
              <div className="text-content-secondary flex items-center gap-2 text-base">
                <CircleAlert size={18} />
                <p>닉네임은 7일 단위로 변경할 수 있습니다</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h3>소개</h3>
          <IntroduceBubble content="프로필 소개" type="message" />
          <BoxButton
            text="수정"
            tone="color"
            size="xs"
            className="flex-nowrap self-end"
          />
        </div>
        <div className="flex flex-col gap-2">
          <h3>이메일</h3>
          <span>abcd@email.com</span>
        </div>
        <div className="flex flex-col gap-2">
          <h3>비밀번호</h3>
          <TextInput placeholder="abcd@email.com" />
        </div>
        <div className="flex flex-col gap-2">
          <h3>비밀번호 변경</h3>
          <form action="" className="flex flex-col gap-2">
            <TextInput placeholder="현재 비밀번호" />
            <TextInput placeholder="새 비밀번호" />
            <TextInput placeholder="새 비밀번호 확인" />
            <BoxButton
              text="수정"
              tone="color"
              size="xs"
              className="mt-3 flex-nowrap self-end"
            />
          </form>
        </div>
      </div>
    </div>
  );
}
