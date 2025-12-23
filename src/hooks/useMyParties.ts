import { useQuery } from "@tanstack/react-query";
import { getMyParties } from "@/services/party.client";
import type { MyPartyListResponse } from "@/types/party";

export function useMyParties() {
  return useQuery<MyPartyListResponse | null>({
    queryKey: ["me", "parties"],
    queryFn: getMyParties,
  });
}
