# Conexión NocoDB → Mini SaaS

Tablas detectadas en NocoDB (base `ppg6m5yw76ne32j`):

| Tabla | Table ID |
|---|---|
| resellers | mxjtg0nwrh8cfo9 |
| reseller_tiers | mzmbpj78h7j3qdl |
| accounts | mxrkiaobiowk31a |
| plans | mq4kxwg3i2oozct |
| form_interactions | mjof2s5ew16d0d1 |
| account_events | mzlb995b5i56l5f |
| sessions | mes4ql7nie3l3ui |
| account_billing_view | mxzqy9pyvuxkwtf |

Columnas verificadas en `resellers`: `id, email, password_hash, full_name, phone, country, role, tier_id, is_active, last_login_at, created_at, updated_at`.

## Decisión arquitectónica

El token de NocoDB **no puede vivir en el frontend** (lo expone a cualquier visitante). Se enruta todo vía **edge functions de Lovable Cloud**, que ya está disponible. El frontend llama a las funciones con el JWT del usuario; las funciones llaman a NocoDB con `xc-token`.

```text
[React Admin] --JWT--> [Edge Function] --xc-token--> [NocoDB] --> [Postgres]
```

## Pasos

### 1. Lovable Cloud + secretos
Habilitar Lovable Cloud y registrar:
- `NOCODB_BASE_URL` = `https://sesotecndb.sesotec.com.ec`
- `NOCODB_TOKEN` = `8uN5KZLCfCMSxnC9YYkcIFZ0v_pIE-AuqOeq30L_`
- `JWT_SECRET` = (generado, 64 chars random)
- `BOOTSTRAP_ADMIN_EMAIL` / `BOOTSTRAP_ADMIN_PASSWORD` (para el primer seed)

### 2. Cliente NocoDB compartido
`supabase/functions/_shared/nocodb.ts`: helper con IDs de tabla y wrappers `ncList/ncRead/ncInsert/ncUpdate` que añaden header `xc-token`.

### 3. Edge functions
- `auth-bootstrap` — crea el primer admin si la tabla `resellers` no tiene admin (usa bcrypt vía `bcrypt` de Deno).
- `auth-login` — busca por email en NocoDB, verifica bcrypt, firma JWT (HS256, 12 h), guarda registro en `sessions`, devuelve `{ token, user }`.
- `auth-me` — verifica JWT y devuelve usuario actual + tier.
- `me-accounts` — lista cuentas del reseller (admin ve todo).
- `me-stats` — agrega `account_events` y `form_interactions` para el reseller (o globales si admin).
- `admin-resellers` — CRUD de resellers + asignación de tier (solo admin).
- `admin-plans`, `admin-reseller-tiers` — CRUD básico (solo admin).
- `admin-accounts` — crear/editar cuenta aplicando reglas de override y `agency_commission_choice`.
- `leads-list` — lectura de `form_interactions` con filtros.
- `lead-ingest` (público) — reemplaza el webhook actual del landing; inserta en `form_interactions` con geo/UTM.

Todas con CORS y validación Zod.

### 4. Frontend
- `src/lib/api.ts` — cliente fetch que añade `Authorization: Bearer <token>` y apunta a las edge functions de Lovable Cloud.
- `AuthContext.tsx` — reemplazar mock por `auth-login` + `auth-me` al montar; persistir token en `localStorage`.
- `Login.tsx` — sin cambios visuales.
- `Accounts.tsx` — además del simulador, cargar lista real desde `me-accounts` y permitir crear vía `admin-accounts`.
- `Resellers.tsx`, `Plans.tsx`, `ResellerTiers.tsx` — conectar a sus endpoints.
- `Leads.tsx` y `Stats.tsx` — consumir `leads-list` y `me-stats`.
- `LeadFormContext.tsx` — apuntar el webhook actual a `lead-ingest` (manteniendo compatibilidad con el webhook externo si aún se usa).

### 5. Bootstrap del primer admin
Tras desplegar, llamar una vez a `POST /functions/v1/auth-bootstrap` con header `x-bootstrap-secret`. Devuelve credenciales del admin inicial.

## Detalles técnicos

- **JWT**: HS256 con `JWT_SECRET`, claims `{ sub, email, role, tier_id, exp }`. Verificación con `djwt` de Deno.
- **Hashing**: `https://deno.land/x/bcrypt`, cost 10.
- **Filtros NocoDB**: usar `where=(email,eq,foo@bar)` y `fields=` para limitar payload.
- **Paginación**: `limit/offset`, default 50.
- **Roles**: `admin` ve todo; `reseller` se filtra por `reseller_id = claims.sub` server-side (nunca client-side).
- **Errores**: respuestas `{ error: string, code?: string }` con status correctos.
- **Reglas de comisión**: ya implementadas en `src/types/saas.ts` — se replican en `admin-accounts` antes de persistir (snapshot de `commission_pct`/`commission_model` al crear).

## Lo que NO se toca aún

- Edición directa de schema (eso ya vive en Postgres).
- UI del landing público — solo se redirige el webhook.
- Pagos / facturación real.

Una vez aprobado, implemento todo en una sola pasada.
