import { API_BASE } from "@/lib/client";
import { PostListResponse } from "@/types/post";

export async function GetPosts() {
  const res = await fetch(`${API_BASE}/api/v1/posts`);

  if (!res.ok) {
    throw new Error(`getPosts failed(${res.status}): ${res.statusText}`);
  }

  return (await res.json()) as PostListResponse;
}
