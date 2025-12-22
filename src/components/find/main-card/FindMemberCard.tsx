import { Crown, Minus, Plus } from "lucide-react";
import Avatar from "../../common/Avatar";
import CircleBtn from "../../common/button/CircleBtn";
import InviteMemberModal from "../InviteMemberModal";
import { useInviteStore } from "@/stores/inviteStore";
import { PostPartyMemberDetail } from "@/types/party";

type FindMemberCardType = "default" | "modal";
interface FindMemberCardProps {
  type: FindMemberCardType;
  PartyMemberData: PostPartyMemberDetail | null;
  isLeader: boolean;
}

export default function FindMemberCard({
  type = "default",
  PartyMemberData,
  isLeader,
}: FindMemberCardProps) {
  const { openInviteForm } = useInviteStore();

  if (PartyMemberData)
    return (
      <div className="bg-accent/10 border-accent/50 flex items-center justify-between rounded-xl border px-4 py-2">
        <div className="flex items-center gap-2">
          <Avatar type="profile" src={PartyMemberData.profileImage} size="sm" />
          <div className="flex items-center">
            <h4 className="flex items-center gap-1 font-bold">
              {PartyMemberData.nickname}
            </h4>
          </div>
        </div>
        {PartyMemberData.role === "LEADER" ? (
          <Crown size={18} strokeWidth={3} className="text-accent" />
        ) : (
          type === "default" &&
          isLeader && (
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
        {type === "modal" && isLeader && (
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
