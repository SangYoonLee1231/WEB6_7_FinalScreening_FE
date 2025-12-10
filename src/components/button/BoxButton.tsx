import { cva } from "class-variance-authority";
import { ButtonHTMLAttributes } from "react";
import { VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

interface ButtonProps
  extends
    ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}
export function BoxButton({ size, tone, className, ...props }: ButtonProps) {
  return (
    <button
      className={twMerge(buttonVariants({ size, tone }), className)}
      {...props}
    />
  );
}

const buttonVariants = cva(
  "relative inline-flex items-center justify-center rounded-md font-medium text-white transition overflow-hidden hover: cursor-pointer",

  {
    variants: {
      size: {
        xs: "w-18 h-9 px-2 text-xs",
        sm_long: "w-63 h-10 px-3 text-sm",
        sm: "w-18 h-10 px-3 text-sm",
        md: "w-24 h-13 px-4 text-base",
        lg: "w-63 h-15 px-6 text-lg",
        xl: "w-125 h-15 px-6 text-lg",
      },
      tone: {
        tertiary: "bg-bg-tertiary hover:bg-bg-tertiary/50",
        accent: "bg-accent hover:bg-accent/50",
        positive: "bg-positive hover:bg-positive/50",
        negative: "bg-negative hover:bg-negative/50",
        gradient_positive: "bg-gradient-positive",
        gradient_negative: "bg-gradient-negative",
      },
    },

    defaultVariants: {
      size: "md",
      tone: "tertiary",
    },
  },
);
