import { Crown } from "lucide-react";
import Avatar from "../common/Avatar";
import Image from "next/image";
import { activePositionIcons, Position } from "@/types/position";

export default function FindMemberCard({
  masterUser,
  data,
}: {
  masterUser: number;
  data: {
    userId: number;
    nickname: string;
    profileImageUrl: string;
    comment: string;
    gameAccount: {
      summonerName: string;
      tag: string;
      tier: string;
      winRate: number;
      kda: number;
      favoriteChampions: string[];
      mainPosition: Position;
    };
  };
}) {
  if (data)
    return (
      <div className="bg-accent/10 border-accent/50 flex items-center justify-between rounded-xl border px-4 py-2">
        <div className="flex items-center gap-2">
          <Avatar type="profile" src={data.profileImageUrl} size="sm" />
          <div className="flex items-center">
            <h4 className="flex items-center gap-1 font-bold">
              {data.gameAccount.summonerName}
              <span className="text-content-secondary text-sm font-medium">
                {data.gameAccount.tag}
              </span>
            </h4>
          </div>
          <h5 className="text-accent/50 text-sm">{data.nickname}</h5>
        </div>
        {masterUser === data.userId ? (
          <Crown size={18} strokeWidth={3} className="text-accent" />
        ) : (
          <Image
            src={activePositionIcons[data.gameAccount.mainPosition]}
            alt={`${data.gameAccount.mainPosition} position icon`}
            height={18}
          />
        )}
      </div>
    );
  else
    return (
      <div className="bg-bg-secondary border-bg-tertiary flex items-center justify-between rounded-xl border px-4 py-2">
        <div className="flex items-center gap-2">
          <Avatar type="profile" src="" size="sm" />
          <h4 className="flex items-center gap-1 font-bold">빈자리</h4>
        </div>
      </div>
    );
}
