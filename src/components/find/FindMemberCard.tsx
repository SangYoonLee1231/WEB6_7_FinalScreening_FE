import { Crown, Minus, Plus } from "lucide-react";
import Avatar from "../common/Avatar";
import Image from "next/image";
import { activePositionIcons, Position } from "@/types/position";
import CircleBtn from "../common/button/CircleBtn";
import InviteMemberModal from "./InviteMemberModal";
import { useInviteStore } from "@/stores/inviteStore";

type FindMemberCardType = "default" | "modal";
interface FindMemberCardProps {
  type: FindMemberCardType;
  currentUserId: number;
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
}

export default function FindMemberCard({
  type = "default",
  currentUserId,
  masterUser,
  data,
}: FindMemberCardProps) {
  const isMaster = currentUserId === masterUser;
  const { openInviteForm } = useInviteStore();

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
        ) : type === "default" ? (
          <Image
            src={activePositionIcons[data.gameAccount.mainPosition]}
            alt={`${data.gameAccount.mainPosition} position icon`}
            height={18}
          />
        ) : (
          isMaster && (
            <CircleBtn className="bg-negative hover:bg-negative/50 h-5 w-5">
              <Minus />
            </CircleBtn>
          )
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
        {type === "modal" && isMaster && (
          <CircleBtn
            className="bg-accent hover:bg-accent/50 h-5 w-5"
            onClick={() => {
              openInviteForm();
            }}
          >
            <Plus />
          </CircleBtn>
        )}
        <InviteMemberModal />
      </div>
    );
}
