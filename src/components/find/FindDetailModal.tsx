import HorizontalCardContainer from "../common/container/HorizontalCardContainer";
import Avatar from "../common/Avatar";
import FormModalContainer from "../common/container/FormModalContainer";
import { FormLabelAndContent } from "../common/FormLabelAndContent";
import * as Dialog from "@radix-ui/react-dialog";
import { BoxButton } from "../common/button/BoxButton";
import { Headset } from "lucide-react";
import { twMerge } from "tailwind-merge";
import PositionSet from "./main-card/PositionSet";

interface FindDetailModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function FindDetailModal({
  isOpen,
  onOpenChange,
}: FindDetailModalProps) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="data-[state=open]:animate-overlayShow fixed inset-0 bg-black/60" />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-1/2 left-1/2 max-h-[85vh] w-[90vw] max-w-123.5 -translate-x-1/2 -translate-y-1/2 rounded-md focus:outline-none">
          <FormModalContainer className="text-content-primary w-142">
            <Dialog.Title className="mb-7.5 text-2xl font-bold">
              모집글 상세 정보
            </Dialog.Title>

            <Dialog.Description className="sr-only">
              모집글 상세 정보 내용
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
                  <Headset
                    size={18}
                    strokeWidth={3}
                    className={twMerge(
                      "text-content-secondary",
                      // options.mic && "text-accent",
                    )}
                  />
                </FormLabelAndContent>
              </div>

              <div className="flex gap-7.5">
                <FormLabelAndContent labelText="게임 모드" labelFor="gameMode">
                  <span className="text-sm font-normal">소환사의 협곡</span>
                </FormLabelAndContent>
                <FormLabelAndContent labelText="큐 타입" labelFor="queueType">
                  <span className="text-sm font-normal">솔로 랭크</span>
                </FormLabelAndContent>
              </div>

              <div className="flex gap-7.5">
                <div className="flex w-full flex-col items-center gap-4">
                  <PositionSet
                    type="my"
                    size="mini"
                    data={"MID"}
                    isActive={true}
                  />
                  <PositionSet
                    type="find"
                    size="mini"
                    data={["ADC", "JUNGLE"]}
                    isActive={true}
                  />
                </div>

                <FormLabelAndContent
                  labelText="모집 인원"
                  labelFor="recruitCount"
                  className="w-full"
                >
                  <span className="text-sm font-normal">1/2</span>
                </FormLabelAndContent>
              </div>

              <FormLabelAndContent labelText="모집 내용">
                <span className="text-sm font-normal">모집 내용 텍스트</span>
              </FormLabelAndContent>

              <div className="flex justify-between gap-2">
                <Dialog.Close asChild>
                  <div className="space-x-2">
                    <BoxButton text="수정" size="sm" tone="color" />
                    <BoxButton text="삭제" size="sm" tone="negative" />
                  </div>
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
