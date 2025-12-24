import { twMerge } from "tailwind-merge";
import Avatar from "../common/Avatar";
import { cva, VariantProps } from "class-variance-authority";
import { Champion } from "@/types/game-account";

const container = cva("text-content-primary flex flex-col", {
  variants: {
    size: {
      sm: "w-34 h-17",
      lg: "w-55 h-28",
    },
  },
  defaultVariants: {
    size: "sm",
  },
});

const title = cva("font-semibold", {
  variants: {
    size: {
      sm: "text-sm text-center mb-2",
      lg: "text-xl text-start mb-4.5",
    },
  },
  defaultVariants: {
    size: "sm",
  },
});
interface MostChampionProps extends VariantProps<typeof container> {
  data: Champion[];
  className?: string;
}

export default function MostChampion({
  size = "sm",
  data,
  className,
}: MostChampionProps) {
  return (
    <div className={twMerge(container({ size }), className)}>
      <div className="flex items-center justify-between">
        {data?.map((champ) => (
          <Avatar
            key={champ.championId}
            type="champion"
            src={champ.championImageUrl}
            alt={champ.championName}
            size={size === "sm" ? "sm" : "lg"}
          />
        ))}
      </div>
    </div>
  );
}
