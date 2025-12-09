import { twMerge } from "tailwind-merge";

export default function HeaderMenuTab({
  text,
  isActive,
}: {
  text: string;
  isActive?: true;
}) {
  return (
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
  );
}
