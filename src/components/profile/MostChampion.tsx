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
  { id: 0, src: Champion.src, percent: 50 },
  { id: 1, src: Champion.src, percent: 50 },
  { id: 2, src: Champion.src, percent: 50 },
];

type MostChampionType = "recent" | "mastery";

interface MostChampionProps extends VariantProps<typeof container> {
  data: { id: number; src: string; percent: number }[]; // 데이터 확정되면 변경
  type: MostChampionType;
  className?: string;
}

export default function MostChampion({
  size = "sm",
  type,
  data = champions,
  className,
}: MostChampionProps) {
  return (
    <div className={twMerge(container({ size }), className)}>
      <p className={twMerge(title({ size }), className)}>
        {type === "recent" ? "최근 선호 챔피언" : "챔피언 숙련도 TOP 3"}
      </p>
      <div className="flex items-center justify-between">
        {data.map((champ) => (
          <div className="relative flex">
            {" "}
            <Avatar
              key={champ.id}
              type="champion"
              src={Champion.src}
              size={size === "sm" ? "sm" : "lg"}
            />
            <div className="bg-bg-tertiary absolute right-0 bottom-0 flex items-center justify-center">
              <span
                className={twMerge(
                  "text-accent px-1 py-0.5 text-[8px]",
                  size === "lg" && "px-1.5 text-[11px]",
                )}
              >
                {champ.percent}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
