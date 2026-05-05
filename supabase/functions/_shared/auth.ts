// JWT (HS256) helpers using djwt + bcrypt for password hashing.
import { create, verify, getNumericDate, type Payload } from "https://deno.land/x/djwt@v3.0.2/mod.ts";
import * as bcrypt from "https://deno.land/x/bcrypt@v0.4.1/mod.ts";

const SECRET = Deno.env.get("JWT_SECRET") ?? "dev-secret-change-me";

let _key: CryptoKey | null = null;
async function key() {
  if (_key) return _key;
  _key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );
  return _key;
}

export type Claims = {
  sub: string; // reseller id
  email: string;
  role: "admin" | "reseller";
  tier_id?: string | number | null;
  full_name?: string;
};

export async function signJwt(claims: Claims, ttlSec = 60 * 60 * 12): Promise<string> {
  const payload: Payload = { ...claims, exp: getNumericDate(ttlSec) };
  return await create({ alg: "HS256", typ: "JWT" }, payload, await key());
}

export async function verifyJwt(token: string): Promise<Claims> {
  const payload = await verify(token, await key());
  return payload as unknown as Claims;
}

export async function getAuth(req: Request): Promise<Claims | null> {
  const h = req.headers.get("Authorization") || req.headers.get("authorization");
  if (!h?.startsWith("Bearer ")) return null;
  try {
    return await verifyJwt(h.slice(7));
  } catch {
    return null;
  }
}

export async function hashPassword(plain: string): Promise<string> {
  return await bcrypt.hash(plain);
}
export async function comparePassword(plain: string, hash: string): Promise<boolean> {
  try {
    return await bcrypt.compare(plain, hash);
  } catch {
    return false;
  }
}
