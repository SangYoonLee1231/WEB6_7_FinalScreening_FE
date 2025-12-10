import Image from "next/image";
import tierImage from "../../assets/images/tiers/Diamond.png";
import { Rank, Tier, tierIcons } from "@/types/tier";

interface TierSetProps {
  tier: Tier;
  rank: Rank;
}

export default function TierSet({ tier, rank }: TierSetProps) {
  return (
    <div className="flex w-32.5 flex-col items-center justify-center">
      <Image src={tierIcons[tier]} alt={`${tier} tier image`} />
      <span className="text-content-secondary text-sm">
        {tier} {rank}
      </span>
    </div>
  );
}
