import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type InviteStore = {
  isInviteOpen: boolean;
  openInviteForm: () => void;
  closeInviteForm: () => void;
  setInviteOpen: (open: boolean) => void;
  selectedMemberId: number | null;
  setSelectMember: (id: number | null) => void;
};

export const useInviteStore = create<InviteStore>()(
  devtools(
    immer((set) => ({
      isInviteOpen: false,
      openInviteForm: () => set({ isInviteOpen: true }),
      closeInviteForm: () => set({ isInviteOpen: false }),
      setInviteOpen: (open) => set({ isInviteOpen: open }),
      selectedMemberId: null,
      setSelectMember: (id) => set({ selectedMemberId: id }),
    })),
  ),
);
