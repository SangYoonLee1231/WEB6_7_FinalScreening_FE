import { BoxButton } from "@/components/common/button/BoxButton";
import LinkedGameIdCard from "./LinkedGameIdCard";
import LinkGameIdBox from "./LinkGameIdBox";

export default function LinkedGameIdContainer() {
  const hasData = false;

  return (
    <div>
      {hasData ? (
        <LinkGameIdBox />
      ) : (
        <div className="flex flex-col gap-3">
          <div className="space-y-2">
            <LinkedGameIdCard
              game="lol"
              userData={{
                nickname: "닉네임",
                tag: "1234",
                time: "2025-02-18T10:30:00",
              }}
            />
            <LinkedGameIdCard
              game="valorant"
              userData={{
                nickname: "닉네임",
                tag: "1234",
                time: "2025-02-18T10:30:00",
              }}
            />
          </div>
          <BoxButton
            text="새로운 아이디 연동"
            tone="color"
            size="lg"
            className="self-center"
          />
        </div>
      )}
    </div>
  );
}
