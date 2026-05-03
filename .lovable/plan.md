## Mini SaaS — Fase 1: DB + Login + Panel base

### Arquitectura
```
Postgres (tu server)  ──►  NocoDB (API REST + token)  ──►  Lovable Frontend (Admin + Reseller panel)
                                                                │
Landing actual ────────────────────────────────────────────────►│ POST form_interactions
                                                                │
Webhook n8n (sigue activo en paralelo)
```
Login custom contra Postgres vía NocoDB API. JWT firmado en el cliente no es seguro, así que el JWT lo emitiremos desde una **Edge Function** de Lovable Cloud (solo se usa como "backend ligero" para hashing bcrypt + firmar/verificar JWT, NO para almacenar usuarios). Los datos viven 100% en tu Postgres.

---

### 1. Script SQL para tu Postgres

Te entrego un `schema.sql` listo para ejecutar. Estructura:

**Tablas**
- `plans` — catálogo de los 3 planes (seed incluido)
- `resellers` — usuarios login (admin + reseller). Password hasheado bcrypt
- `accounts` — cuentas finales de clientes, FK a `reseller_id` y `plan_id`
- `form_interactions` — leads del landing + tracking (geo, utm, source)
- `account_events` — interacciones/estadísticas por cuenta (mensajes, conversiones, etc.)
- `sessions` — refresh tokens / sesiones activas (opcional pero recomendado)

**Enums**
- `user_role`: `admin`, `reseller`
- `account_status`: `active`, `paused`, `cancelled`, `trial`
- `plan_code`: `basic_25`, `pro_40`, `socio_america`

**Seed de planes**
| code | name | monthly_price | setup_fee | currency |
|---|---|---|---|---|
| basic_25 | Plan Básico | 25 | 90 | USD |
| pro_40 | Plan Pro | 40 | 90 | USD |
| socio_america | Socio América | 0 | 0 | USD |

**Índices** en `accounts.reseller_id`, `form_interactions.created_at`, `account_events.account_id + created_at`.

**Usuario admin inicial** se inserta al final con un placeholder de hash que generaremos juntos.

---

### 2. NocoDB
Una vez ejecutes el SQL y conectes la DB a NocoDB:
- Me pasas: URL base de NocoDB, API token, y el `base_id` (o nombres de tablas como NocoDB las expone).
- Yo creo un cliente HTTP centralizado (`src/lib/nocodb.ts`) que lee `VITE_NOCODB_URL` y un secret `NOCODB_TOKEN` (el token va en Edge Function, nunca en el bundle).

---

### 3. Auth (Edge Function + JWT)
Lovable Cloud habilitado solo como runtime de funciones (no como DB). Endpoints:
- `POST /auth-login` → valida email+password contra NocoDB, devuelve JWT (15min) + refresh token
- `POST /auth-refresh` → rota refresh token
- `POST /auth-me` → valida JWT y devuelve perfil
- `POST /auth-register-reseller` → solo admin puede crear resellers

Hash con bcrypt. JWT con `JWT_SECRET` (te lo pediré como secret cuando llegue el momento).

Estado en frontend: `AuthContext` con `accessToken` en memoria + refresh token en `httpOnly` no es posible sin dominio propio → usaremos `localStorage` con rotación corta (aceptable para panel admin interno).

---

### 4. Acceso al login (semi-oculto en footer)
- Pequeño link "·" o ícono discreto en `Footer.tsx` esquina inferior derecha.
- Click abre `/admin/login` (ruta nueva).
- Sin cambios al header del landing.

---

### 5. Panel admin SaaS (mobile-first)
Rutas protegidas bajo `/admin/*`:
- `/admin/login` — form email + password
- `/admin/dashboard` — KPIs (cuentas activas, MRR estimado, leads último 7/30 días, conversiones)
- `/admin/resellers` — solo admin: lista, crear, editar, asignar plan
- `/admin/accounts` — lista cuentas, filtro por reseller (admin ve todas, reseller solo las suyas), crear/editar
- `/admin/plans` — solo admin: ver/editar parámetros de los 3 planes
- `/admin/leads` — tabla de `form_interactions` con filtros (fecha, país, utm)
- `/admin/stats` — gráficos (recharts) de eventos por cuenta y conversión de leads

Layout: sidebar colapsable en desktop, bottom tab bar en mobile. Tema oscuro consistente con el landing.

---

### 6. Form interactions del landing
Modificar `LeadFormContext` y `LeadFormModal`:
- Mantener el webhook de n8n (sin cambios).
- Añadir en paralelo un `POST` a Edge Function `ingest-lead` que guarda en NocoDB → tabla `form_interactions` (no exponer token al cliente).

---

### Detalles técnicos

**Stack añadido**
- Lovable Cloud (solo edge functions)
- `bcryptjs`, `jose` (JWT) en edge functions
- `recharts` para gráficos
- `zod` para validación

**Archivos nuevos clave**
- `schema.sql` (te lo entrego para ejecutar manualmente)
- `src/lib/nocodb.ts` — cliente HTTP (solo usado desde edge functions)
- `src/contexts/AuthContext.tsx`
- `src/components/admin/AdminLayout.tsx`, `Sidebar.tsx`, `MobileTabBar.tsx`
- `src/pages/admin/Login.tsx`, `Dashboard.tsx`, `Resellers.tsx`, `Accounts.tsx`, `Plans.tsx`, `Leads.tsx`, `Stats.tsx`
- `supabase/functions/auth-login/index.ts`
- `supabase/functions/auth-refresh/index.ts`
- `supabase/functions/auth-me/index.ts`
- `supabase/functions/auth-register-reseller/index.ts`
- `supabase/functions/ingest-lead/index.ts`
- Modificar: `Footer.tsx` (link oculto), `App.tsx` (rutas + AuthProvider), `LeadFormContext.tsx` (llamada paralela)

---

### Orden de ejecución propuesto
1. Te entrego `schema.sql` → tú lo corres en Postgres.
2. Conectas Postgres a NocoDB → me das URL + token.
3. Habilito Lovable Cloud, creo edge functions de auth e ingest-lead, configuro secrets (`NOCODB_URL`, `NOCODB_TOKEN`, `JWT_SECRET`).
4. Construyo `AuthContext`, ruta `/admin/login` y link semi-oculto en footer.
5. Construyo layout admin + páginas (Dashboard, Resellers, Accounts, Plans, Leads, Stats).
6. Conecto landing form → `ingest-lead`.
7. Genero hash bcrypt para tu primer admin y te paso el `INSERT` para crearlo.

### Lo que NO incluye esta fase
- Pagos/cobros automáticos a resellers
- Integración con WhatsApp Business API desde el panel
- Multi-idioma del panel (será solo español)
- Logs de auditoría avanzados

¿Aprobamos y arranco con el `schema.sql` + estructura del panel?