"use Client";

import logo from "@/assets/images/logo.svg";
import { BoxButton } from "@/components/common/button/BoxButton";
import TextInput from "@/components/common/TextInput";
import Image from "next/image";
import googleIcon from "@/assets/icons/google.svg";
import discordIcon from "@/assets/icons/discord.svg";
import CircleBtn from "@/components/common/button/CircleBtn";
import Link from "next/link";

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
            className="outline-border-primary h-15 w-125 outline-1"
          />
          <TextInput
            type="password"
            placeholder="비밀번호"
            className="outline-border-primary mt-4 mb-2 h-15 w-125 outline-1"
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
            className="mt-5 text-xl font-bold"
          />
        </div>

        {/* 회원가입 */}
        <p className="text-content-secondary mt-6 mb-6 text-base">
          아직 계정이 없으시다면
        </p>

        <Link href="/signup">
          <BoxButton
            text="회원가입"
            tone="color"
            size="xl"
            className="text-xl font-bold"
          >
            회원가입
          </BoxButton>
        </Link>
        <div className="mt-6 mb-6 flex w-125 items-center gap-3">
          <div className="bg-content-tertiary h-px flex-1" />
          <p className="text-content-secondary text-lg">또는</p>
          <div className="bg-content-tertiary h-px flex-1" />
        </div>
        {/* 소셜 로그인 */}
        <div className="flex gap-12">
          <CircleBtn className="h-15 w-15 bg-white">
            <Image src={googleIcon} alt="Google" width={30} height={30} />
          </CircleBtn>

          <CircleBtn className="h-15 w-15 bg-[#5865F2]">
            <Image
              src={discordIcon}
              alt="Discord"
              width={30}
              className="brightness-0 invert"
            />
          </CircleBtn>

          <CircleBtn className="h-15 w-15 bg-[#0761F7]">
            <svg
              viewBox="0 0 2389 2389"
              xmlns="http://www.w3.org/2000/svg"
              fill="white"
              width={40}
              className="pb-1"
            >
              <path d="M746.667 1317h199v960h396v-960h266l35-331h-299V821q0-38 3.5-58.5t16-40 39.5-27 72-7.5h166V357h-265q-230 0-330 109t-100 321v199h-199v331z" />
            </svg>
          </CircleBtn>
        </div>
      </div>
    </div>
  );
}
