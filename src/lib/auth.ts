const API_BASE = "http://localhost:8080";

export async function signUp(email: string, code: string, password: string) {
  const res = await fetch(`${API_BASE}/api/v1/users/signup`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: email,
      password: password,
      passwordConfirm: password,
      verification_code: code,
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => null);
    const msg = err?.message ?? `회원가입 실패 (${res.status})`;
    throw new Error(msg);
  }

  return {
    ok: true,
  };
}

export async function loginWithEmail(email: string, password: string) {
  const res = await fetch(`${API_BASE}/api/v1/users/login`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });

  if (!res.ok) {
    return {
      ok: false,
      status: res.status,
    };
  }

  const data = await res.json();

  return {
    ok: true,
    data,
  };
}

// export async function logOut() {}

export async function sendEmailCode(email: string) {
  const res = await fetch(
    `${API_BASE}/api/v1/users/email/verify-request?email=${email}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
}
