import { cva, VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

const stateBadgeVariant = cva("rounded-xl px-4 py-2 inline-flex", {
  variants: {
    state: {
      open: "text-accent bg-accent/10 border border-accent/50",
      closed:
        "text-content-primary bg-bg-secondary border border-border-primary",
      done: "text-negative bg-negative/10 border border-border-negative/50",
    },
  },
  defaultVariants: {
    state: "open",
  },
});

type stateBadgeType = "open" | "closed" | "done";

interface StateBadgeProps
  extends
    React.ComponentPropsWithoutRef<"img">,
    VariantProps<typeof stateBadgeVariant> {
  state: stateBadgeType;
  className?: string;
}

export default function StateBadge({ state, className }: StateBadgeProps) {
  return (
    <div className={twMerge(stateBadgeVariant({ state }), className)}>
      <span>
        {state === "open"
          ? "모집중"
          : state === "closed"
            ? "모집완료"
            : "게임완료"}
      </span>
    </div>
  );
}
