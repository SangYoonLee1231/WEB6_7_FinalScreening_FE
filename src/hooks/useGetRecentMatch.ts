import { getRecentMatches } from "@/services/game-account/data.client";
import { Match } from "@/types/game-account";
import { useQuery } from "@tanstack/react-query";

export function useGetRecentMatch({
  gameAccountId,
  matchCount,
}: {
  gameAccountId: number;
  matchCount?: number;
}) {
  return useQuery<Match[] | null>({
    queryKey: [gameAccountId, "recentMatchData"],
    enabled: !!gameAccountId,
    queryFn: () =>
      getRecentMatches({
        gameAccountId: gameAccountId,
        ...(matchCount !== undefined && {
          matchCount,
        }),
      }),
    staleTime: 5 * 60 * 1000,
  });
}
