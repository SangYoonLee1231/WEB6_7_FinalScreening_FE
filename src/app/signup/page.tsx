"use Client";

import logo from "@/assets/images/logo.svg";
import { BoxButton } from "@/components/common/button/BoxButton";
import TextInput from "@/components/common/TextInput";
import Image from "next/image";

export default function page() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex w-full max-w-md flex-col items-center">
        <Image src={logo} alt="match-my-duo logo" width={400} height={153} />
        <p className="text-content-primary mt-2 mb-2 text-5xl font-bold">
          회원가입
        </p>
        <p className="text-content-secondary text-center text-lg">
          지금 가입하고 매치마이파티와 함께해요
        </p>
        <form className="mt-12 flex flex-col">
          <TextInput
            type="email"
            placeholder="이메일 주소"
            className="outline-border-primary w-125 outline-1"
          />
          <div className="mt-3 mb-2 flex flex-row items-center justify-between gap-3">
            <TextInput
              type="password"
              placeholder="이메일 주소로 받은 인증 번호"
              className="outline-border-primary w-98 outline-1"
            />
            <BoxButton size="md" tone="color" text="인증" className="text-lg" />
          </div>
          <div className="flex flex-row gap-1 text-base">
            <p className="text-content-secondary ml-2">
              인증번호를 받지 못하셨나요?
            </p>
            <a href="#" className="text-accent hover:underline">
              재전송
            </a>
          </div>
          <TextInput
            type="password"
            placeholder="비밀번호"
            className="outline-border-primary mt-3 mb-3 w-125 outline-1"
          />
          <TextInput
            type="password"
            placeholder="비밀번호 확인"
            className="outline-border-primary w-125 outline-1"
          />
          <label className="text-content-primary mt-12 mb-12 flex flex-row items-center justify-center gap-1 text-center text-sm">
            <input type="checkbox" name="agreement" className="peer hidden" />
            <div className="border-content-secondary peer-checked:border-accent peer-checked:bg-accent mt-px h-4 w-4 rounded-full border-2"></div>
            <p className="text-content-primary text-sm">
              (필수){" "}
              <a href="#" className="text-accent hover:underline">
                이용약관
              </a>
              과{" "}
              <a href="#" className="text-accent hover:underline">
                개인정보처리방침
              </a>
              에 동의합니다.
            </p>
          </label>

          <BoxButton
            text="회원가입"
            tone="color"
            size="xl"
            className="text-xl"
          >
            회원가입
          </BoxButton>
        </form>
      </div>
    </div>
  );
}
