import { BoxButton } from "@/components/button/BoxButton";

const TONES = [
  "tertiary",
  "accent",
  "positive",
  "negative",
  "gradient_positive",
  "gradient_negative",
] as const;

const SIZES = [
  { label: "xl", size: "xl" },
  { label: "lg", size: "lg" },
  { label: "md", size: "md" },
  { label: "sm", size: "sm" },
  { label: "sm-long", size: "sm_long" },
  { label: "xs", size: "xs" },
] as const;

export default function BoxButtonShowcase() {
  return (
    <div className="mt-30 flex h-[550px] w-[1700px] justify-center gap-12 bg-white">
      {SIZES.map(({ label, size }) => (
        <div key={size} className="mt-5 flex flex-col items-center gap-4">
          <span className="text-lg font-semibold">{label}</span>
          <div className="flex flex-col gap-3 rounded-lg border border-dashed border-violet-400 p-3">
            {TONES.map((tone) => (
              <BoxButton key={tone} size={size} tone={tone}>
                button
              </BoxButton>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
