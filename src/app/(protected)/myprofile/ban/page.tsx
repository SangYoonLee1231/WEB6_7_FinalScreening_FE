import Avatar from "@/components/common/Avatar";
import { BoxButton } from "@/components/common/button/BoxButton";

type Ban = {
  id: number;
  date: string;
  nickname: string;
  profileImageURL: string;
};

const bans: Ban[] = [
  {
    id: 1,
    date: "2025-12-07",
    nickname: "커뮤니티닉네임",
    profileImageURL: "",
  },
  {
    id: 2,
    date: "2025-12-07",
    nickname: "커뮤니티닉네임",
    profileImageURL: "",
  },
  {
    id: 3,
    date: "2025-12-07",
    nickname: "커뮤니티닉네임",
    profileImageURL: "",
  },
  {
    id: 4,
    date: "2025-12-07",
    nickname: "커뮤니티닉네임",
    profileImageURL: "",
  },
];

export default async function BanPage() {
  return (
    <div className="flex flex-col">
      <p className="text-content-main text-4xl font-bold">차단 목록</p>
      <div className="mt-7.5">
        <p className="text-content-secondary text-base text-center">총 {bans.length}명의 유저</p>
        {/* 차단 목록 카드 */}
        <div className="border-border-primary mt-7.5 w-full overflow-hidden rounded-xl border text-base">
          {/* Header */}
          <div className="text-content-secondary bg-bg-primary grid h-13 grid-cols-[270px_1fr] px-5 py-4">
            <span>차단일시</span>
            <span>대상 유저</span>
          </div>

          {/* Body */}
          <div>
            {bans.map((ban) => (
              <div
                key={ban.id}
                className="border-border-primary grid h-17 grid-cols-[270px_1fr_120px] items-center border-t px-5 py-4"
              >
                <p className="text-content-secondary">{ban.date}</p>
                {/* 유저 닉네임 */}
                <div className="flex items-center gap-2">
                  <Avatar src={ban.profileImageURL} size="xs" type="profile" />
                  <span className="text-content-primary">{ban.nickname}</span>
                </div>
                <BoxButton
                  tone="black"
                  text="해제"
                  className="h-9 w-15.5 justify-self-end px-4 py-2 text-sm"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
