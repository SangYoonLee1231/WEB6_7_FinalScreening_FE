import { EMOJI_SRC_MAP } from "@/types/emoji";
import { Review } from "@/types/review";
import Image from "next/image";
import IntroduceBubble from "../profile/IntroduceBubble";
import formatRelativeTime from "@/utils/formatRelativeTime";
import Avatar from "../common/Avatar";
import { useRouter } from "next/navigation";

export default function ReviewRow({ review }: { review: Review }) {
  const router = useRouter();
  const { revieweeNickname, emoji, content, createdAt, revieweeProfileImage } =
    review;
  return (
    <div className="border-border-primary grid h-19 grid-cols-[120px_200px_1fr_120px] items-center border-t px-5">
      {/* 평가 (Emoji) */}
      <div>
        <Image src={EMOJI_SRC_MAP[emoji]} alt={emoji} width={40} height={40} />
      </div>

      {/* 유저 닉네임 */}
      <div className="group flex items-center gap-2 hover:cursor-pointer">
        <Avatar src={revieweeProfileImage ?? ""} size="xs" type="profile" />
        <span className="text-content-primary group-hover:text-accent text-sm">
          {revieweeNickname}
        </span>
      </div>

      {/* 리뷰 내용 */}
      <IntroduceBubble content={content} className="truncate" />

      {/* Time */}
      <span className="text-content-secondary text-right text-sm">
        {formatRelativeTime(createdAt)}
      </span>
    </div>
  );
}
