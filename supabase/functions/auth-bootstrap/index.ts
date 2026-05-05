import { corsHeaders, err, json } from "../_shared/http.ts";
import { ncFindOne, ncInsert } from "../_shared/nocodb.ts";
import { hashPassword } from "../_shared/auth.ts";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  const secret = req.headers.get("x-bootstrap-secret");
  if (!secret || secret !== Deno.env.get("BOOTSTRAP_SECRET")) {
    return err("Forbidden", 403);
  }

  const { email, password, full_name } = await req.json().catch(() => ({}));
  if (!email || !password) return err("email & password required", 400);

  const existing = await ncFindOne("resellers", `(email,eq,${email})`);
  if (existing) return err("Already exists", 409);

  const password_hash = await hashPassword(password);
  const created = await ncInsert("resellers", {
    email,
    password_hash,
    full_name: full_name || email.split("@")[0],
    role: "admin",
    is_active: true,
  });
  return json({ ok: true, user: { email, role: "admin" }, raw: created });
});
