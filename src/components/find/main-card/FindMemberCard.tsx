import { Crown, Minus, Plus } from "lucide-react";
import Avatar from "../../common/Avatar";
import CircleBtn from "../../common/button/CircleBtn";
import InviteMemberModal from "../InviteMemberModal";
import { useInviteStore } from "@/stores/inviteStore";
import { Participant } from "@/types/post";

type FindMemberCardType = "default" | "modal";
interface FindMemberCardProps {
  type: FindMemberCardType;
  currentUserId: number | null;
  leaderId: number;
  data: Participant;
}

export default function FindMemberCard({
  type = "default",
  currentUserId,
  leaderId,
  data,
}: FindMemberCardProps) {
  const isLeader = currentUserId === leaderId;
  const { openInviteForm } = useInviteStore();
  const { userId, communityNickname, communityProfileImageUrl, role } = data;

  if (data)
    return (
      <div className="bg-accent/10 border-accent/50 flex items-center justify-between rounded-xl border px-4 py-2">
        <div className="flex items-center gap-2">
          <Avatar type="profile" src={communityProfileImageUrl} size="sm" />
          <div className="flex items-center">
            <h4 className="flex items-center gap-1 font-bold">
              {communityNickname}
            </h4>
          </div>
        </div>
        {role === "LEADER" ? (
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
