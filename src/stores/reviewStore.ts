import { EmojiType } from "@/types/emoji";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type ReviewStore = {
  initialData: { emoji: EmojiType; content: string };
  setInitialData: (emoji: EmojiType, content?: string) => void;
};

export const useReviewStore = create<ReviewStore>()(
  devtools(
    immer((set) => ({
      initialData: {
        emoji: "GOOD",
        content: "",
      },
      setInitialData: (emoji, content) =>
        set({
          initialData: {
            emoji: emoji,
            content: content ?? "",
          },
        }),
    })),
  ),
);
