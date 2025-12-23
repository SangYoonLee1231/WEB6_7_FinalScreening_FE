import ClientApi from "@/lib/clientApi";
import { MatchDataResponse } from "@/types/game-account";

export async function gameAccountRefreshAll({
  gameAccountId,
  matchCount,
}: {
  gameAccountId: number;
  matchCount?: number;
}) {
  const res = await ClientApi(
    `/api/game-accounts/${gameAccountId}/refresh-all${
      matchCount && `?matchCount=${matchCount}`
    }`,
    {
      method: "POST",
    },
  );

  if (!res.ok) {
    if (res.status === 400) {
      alert("게임 계정에 puuid가 없습니다. 먼저 게임 계정을 등록해주세요.");
      return null;
    }

    if (res.status === 404) {
      alert("게임 계정을 찾을 수 없습니다.");
      return null;
    }

    if (res.status === 500) {
      alert("랭크 정보 또는 매치 정보를 가져오는데 실패했습니다.");
      return null;
    }
  }

  return (await res.json()) as MatchDataResponse;
}
