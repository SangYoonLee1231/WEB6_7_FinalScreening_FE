"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnchorHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface HeaderMenuTabProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  gameType?: string;
  text: string;
  path: string;
  isActive?: boolean;
}

export default function HeaderMenuTab({
  gameType,
  text,
  path,
  isActive,
  ...props
}: HeaderMenuTabProps) {
  return (
    <Link href={`/${gameType}/${path}`} {...props}>
      <li
        className={twMerge(
          "flex items-stretch",
          isActive && "border-accent border-b-2",
        )}
      >
        <span
          className={twMerge(
            "text-content-primary px-3 py-3 text-base font-semibold",
            isActive && "text-accent",
          )}
        >
          {text}
        </span>
      </li>
    </Link>
  );
}
