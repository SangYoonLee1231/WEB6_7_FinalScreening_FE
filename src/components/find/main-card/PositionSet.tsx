import { activePositionIcons, Position, positionIcons } from "@/types/position";
import Image from "next/image";

type PositionSetType = "my" | "looking";
type PositionSetSize = "default" | "mini";

interface PositionSetProps {
  type: PositionSetType;
  size: PositionSetSize;
  data: Position | Position[];
  isActive: boolean;
}

export default function PositionSet({
  type,
  size = "default",
  data,
  isActive,
}: PositionSetProps) {
  const h = size === "default" ? 40 : 24;
  return (
    <div className="flex flex-col items-center justify-center gap-2 font-semibold">
      <span className="text-sm">
        {type === "my" ? "주 포지션" : "찾는 포지션"}
      </span>
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
