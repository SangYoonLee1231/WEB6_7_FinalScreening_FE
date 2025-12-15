import { activePositionIcons, Position, positionIcons } from "@/types/position";
import Image from "next/image";
import { twMerge } from "tailwind-merge";

type PositionSetType = "my" | "find";
type PositionSetSize = "default" | "mini";

interface PositionSetProps {
  type: PositionSetType;
  size: PositionSetSize;
  data: Position | Position[];
  isActive: boolean;
  className?: string;
}

export default function PositionSet({
  type,
  size = "default",
  data,
  isActive,
  className,
}: PositionSetProps) {
  const h = size === "default" ? 40 : 30;
  return (
    <div
      className={twMerge(
        "flex flex-col items-center justify-center gap-2 font-semibold",
        size === "mini" && "w-full justify-start gap-3",
        className,
      )}
    >
      <p className={twMerge("text-sm", size === "mini" && "w-full")}>
        {type === "my" ? "주 포지션" : "찾는 포지션"}
      </p>
      <div
        className={twMerge(
          "flex w-full items-center justify-center gap-4",
          size === "mini" && "justify-start",
          className,
        )}
      >
        {typeof data === "object" ? (
          data.map((d, index) => (
            <Image
              key={index}
              src={isActive ? activePositionIcons[d] : positionIcons[d]}
              alt={`${d} position icon`}
              height={h}
            />
          ))
        ) : (
          <Image
            src={isActive ? activePositionIcons[data] : positionIcons[data]}
            alt={`${data} position icon`}
            height={h}
          />
        )}
      </div>
    </div>
  );
}

type PositionIconProps = {
  position: Position;
  className?: string;
};

export function PositionIcon({ position, className }: PositionIconProps) {
  const Icon = positionIcons[position];

  return <Icon className={className} />;
}
