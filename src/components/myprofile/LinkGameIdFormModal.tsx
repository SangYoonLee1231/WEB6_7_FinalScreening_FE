"use client";

import { useState } from "react";
import { CircleAlert } from "lucide-react";
import TextInput from "@/components/common/TextInput";
import Dropdown from "@/components/common/Dropdown";
import { BoxButton } from "@/components/common/button/BoxButton";
import FormModalContainer from "../common/container/FormModalContainer";
import * as Dialog from "@radix-ui/react-dialog";

const items = [
  { value: "lol", label: "리그 오브 레전드" },
  { value: "overwatch", label: "오버 워치" },
  { value: "valorant", label: "발로란트" },
];

export default function LinkGameIdFormModal({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="data-[state=open]:animate-overlayShow fixed inset-0 bg-black/60" />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-1/2 left-1/2 max-h-[85vh] w-[90vw] max-w-123.5 -translate-x-1/2 -translate-y-1/2 rounded-md focus:outline-none">
          <FormModalContainer className="flex flex-col gap-7.5">
            <Dialog.Title className="text-2xl font-bold">
              게임 아이디 연동
            </Dialog.Title>

            <Dialog.Description className="sr-only">
              연동할 게임을 선택하고 닉네임, 태그를 입력해주세요.
            </Dialog.Description>

            <form
              action=""
              className="[&>div>label]:text-content-secondary space-y-3 [&>.gameIdFormRow]:flex [&>.gameIdFormRow]:flex-col [&>.gameIdFormRow]:gap-2 [&>div>label]:text-sm"
            >
              <div className="gameIdFormRow">
                <label htmlFor="gameType">게임 종류</label>
                <Dropdown
                  placeholder="연동할 게임 종류를 선택해주세요"
                  items={items}
                  onValueChange={() => {}}
                  name="gameType"
                  className="w-full"
                />
              </div>

              <div className="gameIdFormRow">
                <label htmlFor="gameNickname">닉네임</label>
                <TextInput
                  placeholder="닉네임"
                  className="h-10 text-sm"
                  id="gameNickname"
                />
              </div>

              <div className="gameIdFormRow">
                <label htmlFor="gameTag">태그</label>
                <TextInput
                  placeholder="#을 뺀 숫자만 입력해주세요"
                  className="h-10 text-sm"
                  id="gameIdFormRow"
                />
              </div>

              <div className="text-negative flex items-center gap-2 text-base">
                <CircleAlert size={18} />
                <p>
                  타인의 아이디를 도용하는 경우 서비스 이용이 제한될 수 있습니다
                </p>
              </div>

              <div className="mt-7.5 flex justify-end gap-2">
                <Dialog.Close asChild>
                  <BoxButton text="연동" size="sm" tone="color" />
                </Dialog.Close>
                <Dialog.Close asChild>
                  <BoxButton
                    text="닫기"
                    size="sm"
                    tone="black"
                    aria-label="Close"
                  />
                </Dialog.Close>
              </div>
            </form>
          </FormModalContainer>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
