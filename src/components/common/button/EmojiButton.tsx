import Image from "next/image";
import { cva, VariantProps } from "class-variance-authority";
import { ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

import emojiGood from "@/assets/images/emoji/emoji_good.png";
import emojiNormal from "@/assets/images/emoji/emoji_normal.png";
import emojiBad from "@/assets/images/emoji/emoji_bad.png";

import { EmojiType as Expression } from "@/types/emoji";

interface EmojiRadioButtonProps
  extends
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onChange">,
    VariantProps<typeof emojiButtonVariants> {
  expression: Expression;
  selected: boolean;
}

const EMOJI_SRC_MAP: Record<Expression, string> = {
  good: emojiGood.src,
  normal: emojiNormal.src,
  bad: emojiBad.src,
};

interface EmojiRadioGroupProps {
  value: Expression;
  onChange: (value: Expression) => void;
  size?: "lg" | "md" | "sm" | "xs";
}

export function EmojiRadioButton({
  size,
  expression,
  selected,
  className,
  ...props
}: EmojiRadioButtonProps) {
  return (
    <button
      type="button"
      role="radio"
      className={twMerge(
        emojiButtonVariants({ size }),
        selected && "opacity-100 grayscale-0",
        className,
      )}
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

const EXPRESSIONS: Expression[] = ["good", "normal", "bad"];

export function EmojiRadioGroup({
  value,
  onChange,
  size = "md",
}: EmojiRadioGroupProps) {
  return (
    <div role="radiogroup" className="flex gap-6">
      {EXPRESSIONS.map((expression) => {
        const selected = value === expression;

        return (
          <EmojiRadioButton
            key={expression}
            size={size}
            expression={expression}
            selected={selected}
            onClick={() => onChange(expression)}
          />
        );
      })}
    </div>
  );
}

const emojiButtonVariants = cva(
  [
    "relative inline-flex items-center justify-center rounded-full transition-transform overflow-hidden grayscale opacity-40",
    "hover:grayscale-0 hover:opacity-60",
  ].join(" "),
  {
    variants: {
      size: {
        lg: "w-25 h-25",
        md: "w-10 h-10",
        sm: "w-7.5 h-7.5",
        xs: "w-5 h-5",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);
