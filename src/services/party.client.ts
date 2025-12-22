import ClientApi from "@/lib/clientApi";
import {
  MyPartyListResponse,
  PartyMembersResponse,
  PostPartyDetail,
} from "@/types/party";

export async function getMyParties() {
  const res = await ClientApi(`/api/v1/users/me/parties`, {
    method: "GET",
  });

  if (!res.ok) {
    alert("참여한 파티 목록을 조회할 수 없습니다.");
    return null;
  }

  return (await res.json()) as MyPartyListResponse;
}

export async function getPartyDetail(postId: number) {
  const res = await ClientApi(`/api/v1/posts/${postId}/party`, {
    method: "GET",
  });

  if (!res.ok) {
    console.error(`postId: ${postId} 파티 세부 정보를 불러올 수 없습니다.`);
    return null;
  }

  return (await res.json()) as PostPartyDetail;
}

export async function getPartyMembers(partyId: number | null) {
  const res = await ClientApi(`/api/v1/parties/${partyId}/members`, {
    method: "GET",
  });

  if (!res.ok) {
    alert("참여한 파티원 목록을 조회할 수 없습니다.");
    return null;
  }

  return (await res.json()) as PartyMembersResponse;
}
