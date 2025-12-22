import ClientApi from "@/lib/clientApi";

export async function deletePost(postId: number) {
  const res = await ClientApi(`/api/v1/posts/${postId}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    if (res.status === 403) {
      alert("자신이 작성한 게시물만 삭제할 수 있습니다.");
      return;
    }
    alert("게시글 삭제에 실패했습니다.");
    return;
  }

  return alert("게시글이 삭제되었습니다.");
}
