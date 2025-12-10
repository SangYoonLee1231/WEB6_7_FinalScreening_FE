import Image from "next/image";
import { cva, VariantProps } from "class-variance-authority";
import { ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

type Expression = "good" | "normal" | "bad";

interface EmojiButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof emojiButtonVariants> {
  expression: Expression;
}

const EMOJI_SRC_MAP: Record<Expression, string> = {
  good: "/emojis/emoji_good.png",
  normal: "/emojis/emoji_normal.png",
  bad: "/emojis/emoji_bad.png",
};

export function EmojiButton({
  size,
  expression,
  className,
  ...props
}: EmojiButtonProps) {
  return (
    <button
      type="button"
      className={twMerge(emojiButtonVariants({ size }), className)}
      {...props}
    >
      <Image
        src={EMOJI_SRC_MAP[expression]}
        alt={expression}
        fill
        className="object-contain"
      />
    </button>
  );
}

const emojiButtonVariants = cva(
  "relative inline-flex items-center justify-center rounded-full transition-transform overflow-hidden hover:scale-105 active:scale-95",
  {
    variants: {
      size: {
        lg: "h-16 w-16",
        md: "h-12 w-12",
        sm: "h-9 w-9",
        xs: "h-7 w-7",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);