import { twMerge } from "tailwind-merge";

interface TextInputProps extends React.ComponentPropsWithoutRef<"input"> {
  placeholder: string;
  className?: string;
}

export default function TextInput({ placeholder, className }: TextInputProps) {
  return (
    <div
      className={twMerge(
        "bg-bg-primary placeholder:text-content-tertiary text-content-primary flex h-15 items-center gap-3 rounded-xl px-5 py-5 text-lg",
        className,
      )}
    >
      <input
        type="text"
        placeholder={placeholder}
        className="placeholder:text-content-tertiary w-full py-2 outline-0"
      />
    </div>
  );
}
