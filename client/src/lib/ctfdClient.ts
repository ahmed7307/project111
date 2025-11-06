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
  // Use API sessions per requirement
  const csrf = getCsrfTokenFromCookie();
  const res = await fetch(`/api/v1/sessions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(csrf ? { 'CSRF-Token': csrf } : {}),
    },
    credentials: 'include',
    body: JSON.stringify({ name: username, password }),
  });
  if (!res.ok) return false;
  const json = await res.json();
  return json?.success === true;
}

export async function currentUser() {
  const res = await ctfdRequest(`/users/me`);
  if (!res.ok) return null;
  const json = await res.json();
  return json?.data ?? null;
}

export async function logout(): Promise<void> {
  const csrf = getCsrfTokenFromCookie();
  await fetch(`/api/v1/sessions`, {
    method: 'DELETE',
    headers: csrf ? { 'CSRF-Token': csrf } : undefined,
    credentials: 'include',
  });
}

export async function fetchLeaderboard(): Promise<{ rank: number; name: string; score: number }[]> {
  const res = await ctfdRequest(`/scoreboard`);
  if (!res.ok) throw new Error(`Failed to fetch leaderboard (${res.status})`);
  const json = await res.json();
  const items = (json?.data ?? []) as any[];
  return items.map((it, idx) => ({ rank: idx + 1, name: it?.name ?? it?.user_id ?? 'User', score: it?.score ?? 0 }));
}

export async function fetchSolves(): Promise<number[]> {
  const res = await ctfdRequest(`/solves`);
  if (!res.ok) return [];
  const json = await res.json();
  const solves = (json?.data ?? []) as any[];
  return solves.map((s) => s.challenge_id);
}

// Local JSON storage for blogs & writeups via localStorage
import blogsSeed from '@/data/blogs.json';
import writeupsSeed from '@/data/writeups.json';

const BLOGS_KEY = 'hv.blogs.v1';
const WRITEUPS_KEY = 'hv.writeups.v1';

function safeParse<T>(v: string | null, fallback: T): T {
  try {
    return v ? (JSON.parse(v) as T) : fallback;
  } catch {
    return fallback;
  }
}

export type Blog = { id: string; title: string; content: string; category?: string; author: string; createdAt: string };
export type Writeup = { id: string; title: string; content: string; challengeId?: number; challengeName?: string; author: string; tags?: string[]; createdAt: string };

export async function getBlogs(): Promise<Blog[]> {
  const local = safeParse<Blog[]>(typeof window !== 'undefined' ? localStorage.getItem(BLOGS_KEY) : null, blogsSeed as any);
  return local;
}

export async function addBlog(input: Omit<Blog, 'id' | 'createdAt'>): Promise<Blog> {
  const current = await getBlogs();
  const next: Blog = { ...input, id: `${Date.now()}`, createdAt: new Date().toISOString() };
  const updated = [next, ...current];
  if (typeof window !== 'undefined') localStorage.setItem(BLOGS_KEY, JSON.stringify(updated));
  return next;
}

export async function getWriteups(): Promise<Writeup[]> {
  const local = safeParse<Writeup[]>(typeof window !== 'undefined' ? localStorage.getItem(WRITEUPS_KEY) : null, writeupsSeed as any);
  return local;
}

export async function addWriteup(input: Omit<Writeup, 'id' | 'createdAt'>): Promise<Writeup> {
  const current = await getWriteups();
  const next: Writeup = { ...input, id: `${Date.now()}`, createdAt: new Date().toISOString() };
  const updated = [next, ...current];
  if (typeof window !== 'undefined') localStorage.setItem(WRITEUPS_KEY, JSON.stringify(updated));
  return next;
}


