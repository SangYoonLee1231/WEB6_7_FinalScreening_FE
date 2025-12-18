import { API_BASE } from "@/lib/clientApi";
import { NextResponse } from "next/server";

export async function POST() {
  const res = await fetch(`${API_BASE}/api/v1/auth/logout`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
    credentials: "include",
  });

  if (!res.ok) {
    const err = await res.text();
    return new NextResponse(err, { status: res.status });
  }

  const response = NextResponse.json({ ok: true });

  response.cookies.set("access_token", "", {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });

  response.cookies.set("refresh_token", "", {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });

  return response;
}
