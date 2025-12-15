"use client";
import * as Switch from "@radix-ui/react-switch";
import Dropdown from "../common/Dropdown";
import HorizontalCardContainer from "../common/container/HorizontalCardContainer";
import Avatar from "../common/Avatar";
import FormModalContainer from "../common/container/FormModalContainer";
import { FormLabelAndContent } from "../common/FormLabelAndContent";
import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";
import { activePositionIcons, POSITION, positionIcons } from "@/types/position";
import TextInput from "../common/TextInput";
import { BoxButton } from "../common/button/BoxButton";
import { Asterisk } from "lucide-react";
import FindPositionCheckList from "./FindPositionCheckList";

type FindCreateFormType = "create" | "modify";

interface FindCreateFormProps {
  type: FindCreateFormType;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function FindCreateForm({
  type,
  isOpen,
  onOpenChange,
}: FindCreateFormProps) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="data-[state=open]:animate-overlayShow fixed inset-0 bg-black/60" />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-1/2 left-1/2 max-h-[85vh] w-[90vw] max-w-123.5 -translate-x-1/2 -translate-y-1/2 rounded-md focus:outline-none">
          <FormModalContainer className="text-content-primary w-142">
            <Dialog.Title className="mb-7.5 text-2xl font-bold">
              모집글 {type === "create" ? "작성" : "수정"}
            </Dialog.Title>

            <Dialog.Description className="sr-only">
              모집할 내용을 작성해주세요.
            </Dialog.Description>

            <form action="" className="flex flex-col gap-7.5">
              <div className="flex items-center gap-7.5">
                <FormLabelAndContent labelText="연동된 게임 아이디">
                  <HorizontalCardContainer className="flex items-center gap-3 px-4 py-2">
                    <Avatar src="" type="profile" size="sm" />
                    <div className="flex items-center gap-1">
                      <span className="text-lg font-bold">게임닉네임</span>
                      <span className="text-content-secondary text-sm">
                        #1234
                      </span>
                    </div>
                  </HorizontalCardContainer>
                </FormLabelAndContent>
                <FormLabelAndContent labelText="마이크" labelFor="micOption">
                  <input
                    type="checkbox"
                    name=""
                    id="micOption"
                    className="sr-only"
                  />
                  <Switch.Root
                    className="bg-bg-primary data-[state=checked]:bg-accent border-border-primary relative h-8 w-14 cursor-pointer rounded-full border outline-none"
                    id="micOption"
                  >
                    <Switch.Thumb className="block size-6 translate-x-1 rounded-full bg-white transition-transform duration-100 will-change-transform data-[state=checked]:translate-x-7" />
                  </Switch.Root>
                </FormLabelAndContent>
              </div>

              <div className="flex gap-7.5">
                <FormLabelAndContent labelText="게임 모드" labelFor="gameMode">
                  <Dropdown
                    name="gameMode"
                    placeholder="게임 모드를 선택해주세요"
                    onValueChange={() => {}}
                    items={[
                      { value: "SR", label: "소환사의 협곡" },
                      { value: "ARAM", label: "칼바람 나락" },
                    ]}
                    className="min-w-50"
                  />
                </FormLabelAndContent>
                <FormLabelAndContent labelText="큐 타입" labelFor="queueType">
                  <Dropdown
                    name="queueType"
                    placeholder="큐 타입을 선택해주세요"
                    value="SOLO"
                    onValueChange={() => {}}
                    items={[
                      { value: "SOLO", label: "솔로 랭크" },
                      { value: "FLEX", label: "자유 랭크" },
                      { value: "GENERAL", label: "일반" },
                    ]}
                    className="min-w-50"
                  />
                </FormLabelAndContent>
              </div>

              <div className="flex gap-7.5">
                <div className="flex w-full flex-col gap-4">
                  <FormLabelAndContent labelText="주 포지션">
                    <FindPositionCheckList type="my" />
                  </FormLabelAndContent>
                  <FormLabelAndContent labelText="찾는 포지션">
                    <FindPositionCheckList type="find" />
                  </FormLabelAndContent>
                </div>

                <FormLabelAndContent
                  labelText="모집 인원"
                  labelFor="recruitCount"
                  className="w-full"
                >
                  <Dropdown
                    name="recruitCount"
                    placeholder="모집 인원을 선택해주세요"
                    onValueChange={() => {}}
                    items={[
                      { value: "1", label: "1" },
                      { value: "2", label: "2" },
                      { value: "3", label: "3" },
                    ]}
                  />
                </FormLabelAndContent>
              </div>

              <FormLabelAndContent labelText="모집 내용">
                <TextInput
                  placeholder="모집 내용을 작성해주세요"
                  className="h-10 text-sm"
                />
              </FormLabelAndContent>

              <div className="flex justify-end gap-2">
                <Dialog.Close asChild>
                  <BoxButton text="작성" size="sm" tone="color" />
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
