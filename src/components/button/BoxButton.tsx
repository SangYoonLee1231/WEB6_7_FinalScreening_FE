import { ButtonHTMLAttributes } from "react";
import { VariantProps } from "class-variance-authority";
import { buttonVariants } from "./variants";
import { cn } from "@/lib/cn"; // tailwind-merge 래퍼

interface ButtonProps
  extends
    ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}
export function BoxButton({ size, tone, className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ size, tone }), className)}
      {...props}
    />
  );
}
