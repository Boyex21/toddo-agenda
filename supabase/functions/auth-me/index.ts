import { corsHeaders, err, json } from "../_shared/http.ts";
import { getAuth } from "../_shared/auth.ts";
import { ncRead } from "../_shared/nocodb.ts";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  const claims = await getAuth(req);
  if (!claims) return err("Unauthorized", 401);
  try {
    const u = await ncRead<any>("resellers", claims.sub);
    return json({
      user: {
        id: String(u.id ?? u.Id),
        email: u.email,
        full_name: u.full_name,
        role: u.role ?? "reseller",
        tier_id: u.tier_id ?? null,
      },
    });
  } catch {
    return err("User not found", 404);
  }
});
