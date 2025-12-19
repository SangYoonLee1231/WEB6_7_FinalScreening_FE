"use client";

import { activePositionIcons, POSITION, positionIcons } from "@/types/position";
import { Asterisk } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

export default function PositionFilterBtns() {
  const [selected, setSelected] = useState<string[]>([]);

  const isChecked = (value: string) => selected.includes(value);

  const toggleItem = (value: string) => {
    setSelected((prev) => {
      const hasANY = prev.includes("ANY");

      // 5개 포지션 선택한 경우 ANY로 변경
      if (value !== "ANY" && !hasANY && selected.length === 4) {
        return ["ANY"];
      }

      // ANY 선택했었다가 다른 포지션 선택할 경우 (ANY 해제)
      if (hasANY && value !== "ANY") {
        return [value];
      }

      // 다른 포지션 선택했다가 ANY 선택할 경우
      if (!hasANY && value === "ANY") {
        return ["ANY"];
      }

      return prev.includes(value)
        ? prev.filter((v) => v !== value)
        : [...prev, value];
    });
  };

  return (
    <div className="flex items-center gap-2">
      {POSITION.map((p, index) =>
        p === "ANY" ? (
          <label key={index} className="cursor-pointer">
            <input
              id="test"
              type="checkbox"
              aria-label="Any position"
              className="sr-only"
              value={p}
              name={`${p} position`}
              checked={isChecked("ANY") ?? false}
              onChange={(e) => {
                toggleItem(e.target.value);
              }}
            />
            <Asterisk
              size={28}
              viewBox="4.5 4.5 15 15"
              className={twMerge(
                "text-content-secondary",
                isChecked("ANY") && "text-accent",
              )}
            />
          </label>
        ) : (
          <label key={index} className="cursor-pointer">
            <input
              type="checkbox"
              aria-label={`${p} position`}
              className="sr-only"
              value={p}
              name={`${p} position`}
              checked={isChecked(p) ?? false}
              onChange={(e) => {
                toggleItem(e.target.value);
              }}
            />
            <Image
              src={isChecked(p) ? activePositionIcons[p] : positionIcons[p]}
              alt={`${p} position icon`}
              height={25}
            />
          </label>
        ),
      )}
    </div>
  );
}
