"use client";

import { loginAction } from "@/app/(auth)/login/action";
import { BoxButton } from "@/components/common/button/BoxButton";
import TextInput from "@/components/common/TextInput";
import { useActionState } from "react";
import AuthErrorMsg from "../AuthErrorMsg";

export default function LoginForm() {
  const [state, action, isPending] = useActionState(loginAction, {
    success: false,
  });

  return (
    <form className="flex flex-col" action={action}>
      <TextInput
        type="email"
        name="email"
        placeholder="이메일 주소"
        className="outline-border-primary h-15 w-125 outline-1"
        defaultValue={state.values?.email ?? ""}
      />
      {state.errors?.email?.[0] && (
        <AuthErrorMsg message={state.errors?.email?.[0]} />
      )}
      <TextInput
        type="password"
        name="password"
        placeholder="비밀번호"
        className="outline-border-primary mt-4 mb-2 h-15 w-125 outline-1"
      />
      {state.errors?.password?.[0] && (
        <AuthErrorMsg message={state.errors?.password?.[0]} className="my-1" />
      )}
      <div className="flex flex-row gap-1 text-left text-base">
        <p className="text-content-secondary ml-2">비밀번호를 잊으셨나요?</p>
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
    </form>
  );
}
