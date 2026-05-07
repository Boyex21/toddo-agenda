import { corsHeaders, err, json } from "../_shared/http.ts";
import { ncFindOne, ncUpdate } from "../_shared/nocodb.ts";
import { comparePassword, hashPassword, signJwt } from "../_shared/auth.ts";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return err("Method not allowed", 405);

  const url = new URL(req.url);
  if (url.searchParams.get("genhash")) {
    const { password } = await req.json().catch(() => ({}));
    if (!password) return err("password required", 400);
    return json({ hash: await hashPassword(password) });
  }

  const { email, password } = await req.json().catch(() => ({}));
  if (!email || !password) return err("Email y contraseña requeridos", 400);

  const user = await ncFindOne<any>("resellers", `(email,eq,${email})`);
  if (!user) return err("Credenciales inválidas", 401);
  if (!user.password_hash) return err("Credenciales inválidas", 401);
  if (user.is_active === false || user.is_active === 0)
    return err("Cuenta desactivada", 403);

  const ok = await comparePassword(password, user.password_hash);
  if (!ok) return err("Credenciales inválidas", 401);

  const token = await signJwt({
    sub: String(user.id ?? user.Id),
    email: user.email,
    role: (user.role as "admin" | "reseller") ?? "reseller",
    tier_id: user.tier_id ?? null,
    full_name: user.full_name,
  });

  try {
    await ncUpdate("resellers", { Id: user.id ?? user.Id, last_login_at: new Date().toISOString() });
  } catch { /* noop */ }

  return json({
    token,
    user: {
      id: String(user.id ?? user.Id),
      email: user.email,
      full_name: user.full_name,
      role: user.role ?? "reseller",
      tier_id: user.tier_id ?? null,
    },
  });
});
