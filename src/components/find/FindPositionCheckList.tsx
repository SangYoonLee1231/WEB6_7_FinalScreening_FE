"use client";

import { activePositionIcons, POSITION, positionIcons } from "@/types/position";
import { Asterisk } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

type FindPositionType = "my" | "find";

interface FindPositionCheckListProps {
  type: FindPositionType;
}

export default function FindPositionCheckList({
  type,
}: FindPositionCheckListProps) {
  const [selected, setSelected] = useState<string[]>([]);

  const isChecked = (value: string) => selected.includes(value);

  const toggleItem = (value: string) => {
    setSelected((prev) => {
      const hasAll = prev.includes("ALL");

      // 5개 포지션 선택한 경우 ALL로 변경
      if (value !== "ALL" && !hasAll && selected.length === 4) {
        return ["ALL"];
      }

      // ALL 선택했었다가 다른 포지션 선택할 경우 (ALL 해제)
      if (hasAll && value !== "ALL") {
        return [value];
      }

      // 다른 포지션 선택했다가 ALL 선택할 경우
      if (!hasAll && value === "ALL") {
        return ["ALL"];
      }

      return prev.includes(value)
        ? prev.filter((v) => v !== value)
        : [...prev, value];
    });
  };

  return (
    <div className="flex gap-3">
      <label className="cursor-pointer">
        <input
          id="test"
          type="checkbox"
          aria-label="all position"
          className="sr-only"
          value="ALL"
          name={type === "my" ? "myPosition" : "findPosition"}
          checked={isChecked("ALL") ?? false}
          onChange={(e) => {
            toggleItem(e.target.value);
          }}
        />
        <Asterisk
          size={28}
          viewBox="4.5 4.5 15 15"
          className={twMerge(
            "text-content-secondary",
            isChecked("ALL") && "text-accent",
          )}
        />
      </label>

      {POSITION.map((p, index) => (
        <label key={index} className="cursor-pointer">
          <input
            type="checkbox"
            aria-label={`${p} position`}
            className="sr-only"
            value={p}
            name={type === "my" ? "myPosition" : "findPosition"}
            checked={isChecked(p) ?? false}
            onChange={(e) => {
              toggleItem(e.target.value);
            }}
          />
          <Image
            src={isChecked(p) ? activePositionIcons[p] : positionIcons[p]}
            alt={`${p} position icon`}
            height={30}
          />
        </label>
      ))}
    </div>
  );
}
