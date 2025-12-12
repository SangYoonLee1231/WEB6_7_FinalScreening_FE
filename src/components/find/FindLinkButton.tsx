import { CornerDownRight } from "lucide-react";

export default function FindLinkButton() {
  return (
    <div className="flex items-center gap-1">
      <CornerDownRight
        size={17}
        className="text-content-secondary ml-1 shrink-0"
      />
      <p className="text-accent/50 overflow-hidden text-sm text-ellipsis whitespace-nowrap">
        솔로랭크
        <span className="text-content-secondary ml-1">
          아무 라인 같이 할 사람 구합니다 아무 라인 같이 할 사람 구합니다 아무
          라인 같이 할 사람 구합니다
        </span>
      </p>
    </div>
  );
}
