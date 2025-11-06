const API_BASE = import.meta.env.VITE_CTFD_API_URL ?? "/api/v1";

function getCsrfTokenFromCookie(): string | undefined {
  if (typeof document === "undefined") return undefined;
  const match = document.cookie
    .split(";")
    .map((c) => c.trim())
    .find((c) => c.startsWith("CSRF-Token="));
  if (!match) return undefined;
  const [, value] = match.split("=");
  return decodeURIComponent(value);
}

async function ctfdRequest(path: string, init?: RequestInit) {
  const url = path.startsWith("http") ? path : `${API_BASE}${path.startsWith("/") ? path : `/${path}`}`;
  const csrf = getCsrfTokenFromCookie();
  const headers = new Headers(init?.headers ?? {});
  if (init?.method && init.method !== "GET" && csrf) {
    headers.set("CSRF-Token", csrf);
  }
  const res = await fetch(url, {
    ...init,
    headers,
    credentials: "include",
  });
  return res;
}

type CTFDChallenge = {
  id: number;
  name: string;
  category: string;
  value: number;
  type: string;
  description?: string;
};

type CTFDListResponse<T> = {
  success: boolean;
  data: T[];
};

type CTFDItemResponse<T> = {
  success: boolean;
  data: T;
};

export async function fetchChallenges(): Promise<CTFDChallenge[]> {
  const res = await ctfdRequest(`/challenges`);
  if (!res.ok) throw new Error(`Failed to fetch challenges (${res.status})`);
  const json = (await res.json()) as CTFDListResponse<CTFDChallenge>;
  if (!json.success) throw new Error("CTFd returned unsuccessful response");
  return json.data;
}

export async function fetchChallengeById(id: number): Promise<CTFDChallenge> {
  const res = await ctfdRequest(`/challenges/${id}`);
  if (!res.ok) throw new Error(`Failed to fetch challenge (${res.status})`);
  const json = (await res.json()) as CTFDItemResponse<CTFDChallenge>;
  if (!json.success) throw new Error("CTFd returned unsuccessful response");
  return json.data;
}

export async function submitFlag(challengeId: number, submission: string): Promise<boolean> {
  const res = await ctfdRequest(`/challenges/attempt`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ challenge_id: challengeId, submission }),
  });
  if (!res.ok) throw new Error(`Failed to submit flag (${res.status})`);
  const json = (await res.json()) as { success: boolean };
  return json.success === true;
}

export async function login(username: string, password: string): Promise<boolean> {
  // Use web login route to establish session; requires CSRF header
  const csrf = getCsrfTokenFromCookie();
  const form = new URLSearchParams();
  form.set("name", username);
  form.set("password", password);
  const res = await fetch(`/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      ...(csrf ? { "CSRF-Token": csrf } : {}),
    },
    body: form.toString(),
    credentials: "include",
    redirect: "manual",
  });
  // 302 is expected on success; 200 with JSON may indicate error
  return res.status === 302 || res.ok;
}

export async function currentUser() {
  const res = await ctfdRequest(`/users/me`);
  if (!res.ok) return null;
  const json = await res.json();
  return json?.data ?? null;
}


