import { cva, VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

const introduceBubble = cva(
  "bg-bg-tertiary text-content-primary inline-block px-3 py-2 rounded-xl",
  {
    variants: {
      type: {
        message: "rounded-tl-none",
        default: "",
      },
      size: {
        sm: "min-h-10 min-w-65.5",
        md: "min-h-11 min-w-90",
        lg: "min-h-12 min-w-125",
      },
    },
    defaultVariants: {
      type: "default",
      size: "md",
    },
  },
);

interface IntroduceBubbleProps extends VariantProps<typeof introduceBubble> {
  content: string;
  className?: string;
}

export default function IntroduceBubble({
  type,
  size,
  content,
  className,
}: IntroduceBubbleProps) {
  return (
    <div className={twMerge(introduceBubble({ type, size }), className)}>
      <span className="shrink-0 break-words">{content}</span>
    </div>
  );
}
