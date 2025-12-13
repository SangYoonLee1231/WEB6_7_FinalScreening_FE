import { BoxButton } from "../common/button/BoxButton";
import FormModalContainer from "../common/container/FormModalContainer";
import * as Dialog from "@radix-ui/react-dialog";
import InviteMemberCard from "./InviteMemberCard";
import { useInviteStore } from "@/stores/inviteStore";

export interface SampleDataType {
  id: number;
  nickname: string;
  profileImage: string | null;
  lastUpdatedAt: string;
}

const sampleData: SampleDataType[] = [
  {
    id: 1,
    nickname: "닉네임1",
    profileImage: null,
    lastUpdatedAt: "2025-03-14T12:28:00.000Z",
  },
  {
    id: 2,
    nickname: "닉네임2",
    profileImage: null,
    lastUpdatedAt: "2025-03-14T12:10:00.000Z",
  },
  {
    id: 3,
    nickname: "닉네임3",
    profileImage: null,
    lastUpdatedAt: "2025-03-14T11:43:00.000Z",
  },
  {
    id: 4,
    nickname: "닉네임4",
    profileImage: null,
    lastUpdatedAt: "2025-12-13T07:03:49.937Z",
  },
];

export default function InviteMemberModal() {
  const { isInviteOpen, setInviteOpen } = useInviteStore();
  return (
    <Dialog.Root open={isInviteOpen} onOpenChange={setInviteOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="data-[state=open]:animate-overlayShow fixed inset-0 bg-black/60" />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-1/2 left-1/2 max-h-[85vh] w-[90vw] max-w-123.5 -translate-x-1/2 -translate-y-1/2 rounded-md focus:outline-none">
          <FormModalContainer className="flex flex-col gap-7.5">
            <Dialog.Title className="text-2xl font-bold">
              멤버 초대
            </Dialog.Title>
            <fieldset className="flex flex-col gap-2">
              <legend className="sr-only">초대할 멤버</legend>
              {sampleData?.map((d) => (
                <InviteMemberCard key={d.id} data={d} />
              ))}
            </fieldset>
            <div className="mt-[25px] flex justify-end gap-2">
              <Dialog.Close asChild>
                <BoxButton text="초대" size="sm" tone="color" />
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
          </FormModalContainer>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
