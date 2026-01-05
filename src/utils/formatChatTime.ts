import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import "dayjs/locale/ko";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale("ko");

const KST = "Asia/Seoul";

export default function formatChatTime(date: string) {
  // 서버 createdAt(UTC, Z 포함)이 와도 KST로 변환해서 표시
  return dayjs(date).tz(KST).format("A h:mm"); // 예: 오전 11:18
}
