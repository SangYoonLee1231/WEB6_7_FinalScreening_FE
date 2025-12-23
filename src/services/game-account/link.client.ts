import ClientApi from "@/lib/clientApi";

type gameAccountRequestType = {
  gameType: string;
  gameNickname: string;
  gameTag: string;
};

export async function LinkGameAccount({
  gameType,
  gameNickname,
  gameTag,
}: gameAccountRequestType) {
  const payload = {
    gameType: gameType,
    gameNickname: gameNickname,
    gameTag: gameTag,
  };

  const res = await ClientApi("/api/game-accounts", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    if (res.status === 404) {
      alert("해당 게임 계정을 찾을 수 없습니다. 닉네임과 태그를 확인해주세요.");
      return res.ok;
    }
    if (res.status === 409) {
      alert("이미 해당 게임 계정이 등록되어 있습니다.");
      return res.ok;
    }
    alert("게임 아이디 연동에 실패했습니다.");
    return res.ok;
  }

  alert("게임 아이디를 연동했습니다.");
  return res.ok;
}

export async function ModifyGameAccount(
  gameAccountId: string,
  { gameNickname, gameTag }: { gameNickname: string; gameTag: string },
) {
  const payload = {
    gameNickname: gameNickname,
    gameTag: gameTag,
  };
  const res = await ClientApi(`/api/game-accounts/${gameAccountId}`, {
    method: "PUT",
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  if (!res.ok) {
    alert("게임 아이디 연동 수정에 실패했습니다.");
    return;
  }

  alert("게임 아이디 연동 수정에 성공했습니다.");
  return;
}

export async function UnlinkGameAccount(gameAccountId: string) {
  const res = await ClientApi(`/api/game-accounts/${gameAccountId}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    alert("게임 아이디 연동 해제에 실패했습니다.");
    return;
  }

  alert("게임 아이디 연동을 해제했습니다.");
  return;
}
