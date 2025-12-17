import LinkedGameIdContainer from "@/components/myprofile/link/LinkedGameIdContainer";

import { CircleAlert } from "lucide-react";

export default async function LinkPage() {
  return (
    <div className="flex flex-col gap-11 [&_h3]:text-xl [&_h3]:font-semibold">
      <h2 className="text-4xl font-bold">게임 아이디 연동</h2>
      <LinkedGameIdContainer />
      <div className="space-y-1">
        <p className="text-content-secondary flex items-center gap-2 text-base">
          <CircleAlert size={18} />
          연동된 계정은 3개월 단위로 변경할 수 있습니다.
        </p>
        <p className="text-negative flex items-center gap-2 text-base">
          <CircleAlert size={18} />
          타인의 아이디를 도용하는 경우 서비스 이용이 제한될 수 있습니다
        </p>
      </div>
    </div>
  );
}
