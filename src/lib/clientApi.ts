export const API_BASE = process.env.NEXT_PUBLIC_API_URL;

export default async function ClientApi(path: string, init: RequestInit) {
  // base 끝의 / 제거
  const base = (API_BASE || "").replace(/\/+$/, "");
  // path 앞에 / 보장
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  return await fetch(`${base}${normalizedPath}`, {
    ...init,
    headers: {
      ...(init.headers || {}),
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
}
