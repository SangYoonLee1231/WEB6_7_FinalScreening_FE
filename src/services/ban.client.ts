import ClientApi from "@/lib/clientApi";
import { BanUser } from "@/types/userList";

export async function getBanUsers() {
  const res = await ClientApi(`/api/v1/users/me/blocks`, {
    method: "GET",
  });

  if (!res.ok) {
    alert("내가 차단한 사용자 목록을 조회할 수 없습니다.");
    return null;
  }

  const json = (await res.json()) as BanUser[];
  return json;
}