// Shared NocoDB client used by all edge functions.

const BASE = Deno.env.get("NOCODB_BASE_URL")!;
const TOKEN = Deno.env.get("NOCODB_TOKEN")!;

export const TABLES = {
  resellers: "mxjtg0nwrh8cfo9",
  reseller_tiers: "mzmbpj78h7j3qdl",
  accounts: "mxrkiaobiowk31a",
  plans: "mq4kxwg3i2oozct",
  form_interactions: "mjof2s5ew16d0d1",
  account_events: "mzlb995b5i56l5f",
  sessions: "mes4ql7nie3l3ui",
  account_billing_view: "mxzqy9pyvuxkwtf",
} as const;

export type TableKey = keyof typeof TABLES;

const headers = () => ({
  "xc-token": TOKEN,
  "Content-Type": "application/json",
});

const url = (path: string) => `${BASE}/api/v2/${path}`;

export async function ncList<T = any>(
  table: TableKey,
  opts: { where?: string; fields?: string; limit?: number; offset?: number; sort?: string } = {}
): Promise<{ list: T[]; pageInfo: any }> {
  const params = new URLSearchParams();
  if (opts.where) params.set("where", opts.where);
  if (opts.fields) params.set("fields", opts.fields);
  if (opts.sort) params.set("sort", opts.sort);
  params.set("limit", String(opts.limit ?? 100));
  params.set("offset", String(opts.offset ?? 0));
  const res = await fetch(url(`tables/${TABLES[table]}/records?${params.toString()}`), {
    headers: headers(),
  });
  if (!res.ok) throw new Error(`NocoDB list ${table} ${res.status}: ${await res.text()}`);
  return await res.json();
}

export async function ncRead<T = any>(table: TableKey, id: string | number): Promise<T> {
  const res = await fetch(url(`tables/${TABLES[table]}/records/${id}`), { headers: headers() });
  if (!res.ok) throw new Error(`NocoDB read ${table}/${id} ${res.status}`);
  return await res.json();
}

export async function ncInsert<T = any>(table: TableKey, body: Record<string, any> | Record<string, any>[]): Promise<T> {
  const res = await fetch(url(`tables/${TABLES[table]}/records`), {
    method: "POST",
    headers: headers(),
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`NocoDB insert ${table} ${res.status}: ${await res.text()}`);
  return await res.json();
}

export async function ncUpdate<T = any>(table: TableKey, body: Record<string, any> | Record<string, any>[]): Promise<T> {
  // NocoDB v2 PATCH expects array with `Id` field
  const res = await fetch(url(`tables/${TABLES[table]}/records`), {
    method: "PATCH",
    headers: headers(),
    body: JSON.stringify(Array.isArray(body) ? body : [body]),
  });
  if (!res.ok) throw new Error(`NocoDB update ${table} ${res.status}: ${await res.text()}`);
  return await res.json();
}

export async function ncDelete(table: TableKey, ids: (string | number)[]): Promise<void> {
  const res = await fetch(url(`tables/${TABLES[table]}/records`), {
    method: "DELETE",
    headers: headers(),
    body: JSON.stringify(ids.map((Id) => ({ Id }))),
  });
  if (!res.ok) throw new Error(`NocoDB delete ${table} ${res.status}: ${await res.text()}`);
}

export async function ncFindOne<T = any>(table: TableKey, where: string): Promise<T | null> {
  const r = await ncList<T>(table, { where, limit: 1 });
  return r.list[0] ?? null;
}
