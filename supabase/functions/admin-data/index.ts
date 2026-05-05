// Generic CRUD-ish endpoints for admin entities. Restrict to admin role.
import { corsHeaders, err, json } from "../_shared/http.ts";
import { getAuth } from "../_shared/auth.ts";
import { ncList, ncInsert, ncUpdate, ncDelete, type TableKey } from "../_shared/nocodb.ts";
import { hashPassword } from "../_shared/auth.ts";

const ALLOWED: Record<string, TableKey> = {
  resellers: "resellers",
  plans: "plans",
  "reseller-tiers": "reseller_tiers",
  accounts: "accounts",
  leads: "form_interactions",
  events: "account_events",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  const claims = await getAuth(req);
  if (!claims) return err("Unauthorized", 401);

  const url = new URL(req.url);
  // path looks like /admin-data/<entity>[/<id>]
  const parts = url.pathname.split("/").filter(Boolean);
  const idx = parts.indexOf("admin-data");
  const entity = parts[idx + 1];
  const id = parts[idx + 2];

  const table = ALLOWED[entity];
  if (!table) return err("Unknown entity", 404);

  const isAdmin = claims.role === "admin";
  // Reseller-scoped read for accounts / leads / events
  const scopedTables: TableKey[] = ["accounts", "form_interactions", "account_events"];

  try {
    if (req.method === "GET") {
      const where = url.searchParams.get("where") ?? undefined;
      const limit = Number(url.searchParams.get("limit") ?? "100");
      const offset = Number(url.searchParams.get("offset") ?? "0");
      const sort = url.searchParams.get("sort") ?? "-created_at";

      let finalWhere = where;
      if (!isAdmin && scopedTables.includes(table)) {
        // Filter accounts by reseller; leads/events filter by account.reseller is harder via NocoDB
        if (table === "accounts") {
          const scope = `(reseller_id,eq,${claims.sub})`;
          finalWhere = where ? `${where}~and${scope}` : scope;
        } else {
          // For leads/events, only admin gets a list for now
          return err("Forbidden", 403);
        }
      }

      const data = await ncList(table, { where: finalWhere, limit, offset, sort });
      return json(data);
    }

    if (req.method === "POST") {
      if (!isAdmin && table !== "accounts") return err("Forbidden", 403);
      const body = await req.json();

      if (table === "resellers" && body.password) {
        body.password_hash = await hashPassword(body.password);
        delete body.password;
      }
      if (table === "accounts" && !isAdmin) {
        body.reseller_id = claims.sub;
      }
      const created = await ncInsert(table, body);
      return json(created, 201);
    }

    if (req.method === "PATCH") {
      if (!isAdmin && table !== "accounts") return err("Forbidden", 403);
      if (!id) return err("Id required", 400);
      const body = await req.json();
      if (table === "resellers" && body.password) {
        body.password_hash = await hashPassword(body.password);
        delete body.password;
      }
      const updated = await ncUpdate(table, { Id: id, ...body });
      return json(updated);
    }

    if (req.method === "DELETE") {
      if (!isAdmin) return err("Forbidden", 403);
      if (!id) return err("Id required", 400);
      await ncDelete(table, [id]);
      return json({ ok: true });
    }

    return err("Method not allowed", 405);
  } catch (e) {
    return err((e as Error).message, 500);
  }
});
