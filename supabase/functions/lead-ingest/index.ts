// Public lead ingest — replaces (or shadows) the external webhook.
import { corsHeaders, json } from "../_shared/http.ts";
import { ncInsert } from "../_shared/nocodb.ts";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  let body: Record<string, any> = {};
  try {
    if (req.method === "POST") body = await req.json();
  } catch { /* ignore */ }

  // Also support query params for GET pixel-style calls
  const url = new URL(req.url);
  for (const [k, v] of url.searchParams.entries()) {
    if (!(k in body)) body[k] = v;
  }

  const record = {
    event_type: body.event_type ?? body.event ?? "lead_form_opened",
    source: body.source ?? null,
    full_name: body.full_name ?? null,
    email: body.email ?? null,
    phone: body.phone ?? null,
    niche: body.niche ?? null,
    message: body.message ?? null,
    ip: body.ip ?? body.geo_ip ?? null,
    country: body.country ?? body.geo_country ?? null,
    region: body.region ?? body.geo_region ?? null,
    city: body.city ?? body.geo_city ?? null,
    latitude: body.latitude ?? body.geo_latitude ?? null,
    longitude: body.longitude ?? body.geo_longitude ?? null,
    timezone: body.timezone ?? body.geo_timezone ?? null,
    org: body.org ?? body.geo_org ?? null,
    utm_source: body.utm_source ?? null,
    utm_medium: body.utm_medium ?? null,
    utm_campaign: body.utm_campaign ?? null,
    utm_term: body.utm_term ?? null,
    utm_content: body.utm_content ?? null,
    user_agent: body.userAgent ?? body.user_agent ?? null,
    screen: body.screen ?? null,
    language: body.language ?? null,
    referrer: body.referrer ?? null,
    raw_payload: body,
  };

  try {
    await ncInsert("form_interactions", record);
  } catch (e) {
    return json({ ok: false, error: (e as Error).message }, 500);
  }
  return json({ ok: true });
});
