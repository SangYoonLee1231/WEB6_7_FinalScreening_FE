"use Client";

import logo from "@/assets/images/logo.svg";
import { BoxButton } from "@/components/common/button/BoxButton";
import TextInput from "@/components/common/TextInput";
import Image from "next/image";
import googleIcon from "@/assets/icons/google.svg";
import discordIcon from "@/assets/icons/discord.svg";
import facebookIcon from "@/assets/icons/facebook.svg";

export default function page() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex w-full max-w-md flex-col items-center">
        <Image src={logo} alt="match-my-duo logo" width={400} height={153} />
        <p className="text-content-secondary mt-5 mb-6 text-center text-lg">
          로그인하고 나에게 딱 맞는 듀오를 찾아보세요
        </p>
        {/* 로그인 Form */}
        <div className="flex flex-col">
          <TextInput
            type="email"
            placeholder="이메일 주소"
            className="outline-border-primary h-15 w-125 outline-1 shadow-black shadow-md/25"
          />
          <TextInput
            type="password"
            placeholder="비밀번호"
            className="outline-border-primary mt-4 mb-2 h-15 w-125 outline-1  shadow-black shadow-md/25"
          />
          <div className="flex flex-row gap-1 text-left text-base">
            <p className="text-content-secondary ml-2">
              비밀번호를 잊으셨나요?
            </p>
            <a href="#" className="text-accent hover:underline">
              비밀번호 찾기
            </a>
          </div>
          <BoxButton
            type="submit"
            text="로그인"
            tone="black"
            size="xl"
            className="mt-5 text-xl font-bold shadow-black shadow-md/25"
          />
        </div>

        {/* 회원가입 */}
        <p className="text-content-secondary mt-6 mb-6 text-base">
          아직 계정이 없으시다면
        </p>

        <BoxButton text="회원가입" tone="color" size="xl" className="text-xl font-bold shadow-black shadow-md/25">
          회원가입
        </BoxButton>
        <div className="flex items-center gap-3 w-125 mt-6 mb-6">
          <div className="flex-1 h-px bg-content-tertiary" />
          <p className="text-lg text-content-secondary">또는</p>
          <div className="flex-1 h-px bg-content-tertiary" />
        </div>
        {/* 소셜 로그인 */}
        <div className="flex gap-12">
          <button className="rounded-full bg-white w-15 h-15 p-4 shadow-black shadow-md/25">
            <Image src={googleIcon} alt="Google" width={30} height={30} />
          </button>

          <button className="rounded-full bg-[#5865F2] w-15 h-15 p-4 shadow-black shadow-md/25">
            <Image src={discordIcon} alt="Discord" width={30} height={23} className="invert brightness-0"/>
          </button>

          <button className="rounded-full bg-[#0761F7] w-15 h-15 p-4 shadow-black shadow-md/25">
            <Image src={facebookIcon} alt="Facebook" width={24} height={30}/>
          </button>
        </div>
      </div>
      </div>
  );
}
