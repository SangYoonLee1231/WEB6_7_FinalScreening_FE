import * as RadixAvatar from "@radix-ui/react-avatar";
import Image from "next/image";
import profile from "../../assets/images/profile_default.jpg";
import { cva, VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

const avatar = cva(
  "overflow-hidden rounded-full align-middle select-none inline-flex",
  {
    variants: {
      size: {
        xs: "size-7.5",
        sm: "size-10",
        md: "size-12.5",
        lg: "size-17",
        xl: "size-25.5",
        xxl: "size-32.5",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

interface AvatarProps
  extends React.ComponentPropsWithoutRef<"img">, VariantProps<typeof avatar> {
  src: string;
  className?: string;
}

export default function Avatar({
  size,
  src,
  className,
  ...props
}: AvatarProps) {
  return (
    <RadixAvatar.Root
      className={twMerge(avatar({ size }), className)}
      {...props}
    >
      <RadixAvatar.Image
        className="size-full rounded-[inherit] object-cover"
        src={src}
        alt="user profile"
      />
      <RadixAvatar.Fallback delayMs={600}>
        <Image src={profile} alt="user default image" />
      </RadixAvatar.Fallback>
    </RadixAvatar.Root>
  );
}
