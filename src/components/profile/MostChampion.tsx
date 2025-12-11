import { twMerge } from "tailwind-merge";
import Avatar from "../common/Avatar";
import Champion from "@/assets/images/test_champion_thumb.png";
import { cva, VariantProps } from "class-variance-authority";

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

const champions = [
  { id: 0, src: Champion.src },
  { id: 1, src: Champion.src },
  { id: 2, src: Champion.src },
];

interface MostChampionProps extends VariantProps<typeof container> {
  data: { id: number; src: string }[]; // 데이터 확정되면 변경
  className?: string;
}

export default function MostChampion({
  size,
  data = champions,
  className,
}: MostChampionProps) {
  return (
    <div className={twMerge(container({ size }), className)}>
      <p className={twMerge(title({ size }), className)}>최근 선호 챔피언</p>
      <div className="flex items-center justify-between">
        {champions.map((champ) => (
          <Avatar
            key={champ.id}
            type="champion"
            src={Champion.src}
            size={size === "sm" ? "sm" : "lg"}
          />
        ))}
      </div>
    </div>
  );
}
