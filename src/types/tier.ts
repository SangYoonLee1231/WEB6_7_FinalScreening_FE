import Unranked from "@/assets/images/tiers/Rank=Unranked.png";
import Iron from "@/assets/images/tiers/Rank=Iron.png";
import Bronze from "@/assets/images/tiers/Rank=Bronze.png";
import Silver from "@/assets/images/tiers/Rank=Silver.png";
import Gold from "@/assets/images/tiers/Rank=Gold.png";
import Platinum from "@/assets/images/tiers/Rank=Platinum.png";
import Emerald from "@/assets/images/tiers/Rank=Emerald.png";
import Diamond from "@/assets/images/tiers/Rank=Diamond.png";
import Master from "@/assets/images/tiers/Rank=Master.png";
import Grandmaster from "@/assets/images/tiers/Rank=Grandmaster.png";
import Challenger from "@/assets/images/tiers/Rank=Challenger.png";

const TIERS = [
  "IRON",
  "BRONZE",
  "SILVER",
  "GOLD",
  "PLATINUM",
  "EMERALD",
  "DIAMOND",
  "MASTER",
  "GRANDMASTER",
  "CHALLENGER",
] as const;

export type Tier = (typeof TIERS)[number];

export function isTier(value: string): value is Tier {
  return TIERS.includes(value as Tier);
}

export const tierIcons = {
  UNRANKED: Unranked,
  IRON: Iron,
  BRONZE: Bronze,
  SILVER: Silver,
  GOLD: Gold,
  PLATINUM: Platinum,
  EMERALD: Emerald,
  DIAMOND: Diamond,
  MASTER: Master,
  GRANDMASTER: Grandmaster,
  CHALLENGER: Challenger,
} as const;

const RANKS = ["I", "II", "III", "IV"] as const;

export type Rank = (typeof RANKS)[number];

export function isRank(value: string): value is Rank {
  return RANKS.includes(value as Rank);
}
