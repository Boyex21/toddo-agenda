// Thin API client that talks to the Lovable Cloud edge functions.
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const ANON = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;

const TOKEN_KEY = "toddo_admin_token";

export const setToken = (t: string | null) => {
  if (t) localStorage.setItem(TOKEN_KEY, t);
  else localStorage.removeItem(TOKEN_KEY);
};
export const getToken = () => localStorage.getItem(TOKEN_KEY);

async function call<T = any>(
  path: string,
  opts: { method?: string; body?: unknown; query?: Record<string, string | number | undefined>; headers?: Record<string, string> } = {}
): Promise<T> {
  const url = new URL(`${SUPABASE_URL}/functions/v1${path}`);
  if (opts.query) {
    Object.entries(opts.query).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== "") url.searchParams.set(k, String(v));
    });
  }
  const token = getToken();
  const res = await fetch(url.toString(), {
    method: opts.method ?? "GET",
    headers: {
      "Content-Type": "application/json",
      apikey: ANON,
      Authorization: token ? `Bearer ${token}` : `Bearer ${ANON}`,
      ...(opts.headers ?? {}),
    },
    body: opts.body !== undefined ? JSON.stringify(opts.body) : undefined,
  });
  const text = await res.text();
  const data = text ? (() => { try { return JSON.parse(text); } catch { return text; } })() : null;
  if (!res.ok) {
    const msg = (data && typeof data === "object" && "error" in data) ? (data as any).error : `HTTP ${res.status}`;
    throw new Error(msg);
  }
  return data as T;
}

export const api = {
  login: (email: string, password: string) =>
    call<{ token: string; user: any }>("/auth-login", { method: "POST", body: { email, password } }),
  me: () => call<{ user: any }>("/auth-me"),

  list: (entity: string, params?: Record<string, string | number | undefined>) =>
    call<{ list: any[]; pageInfo: any }>(`/admin-data/${entity}`, { query: params }),
  create: (entity: string, body: any) =>
    call(`/admin-data/${entity}`, { method: "POST", body }),
  update: (entity: string, id: string | number, body: any) =>
    call(`/admin-data/${entity}/${id}`, { method: "PATCH", body }),
  remove: (entity: string, id: string | number) =>
    call(`/admin-data/${entity}/${id}`, { method: "DELETE" }),

  bootstrap: (secret: string, body: { email: string; password: string; full_name?: string }) =>
    call("/auth-bootstrap", { method: "POST", body, headers: { "x-bootstrap-secret": secret } }),

  ingestLead: (body: Record<string, any>) =>
    call("/lead-ingest", { method: "POST", body }),
};
