
## Corrección: separar "Planes de servicio" de "Tipos de reseller"

Confusión actual: la tabla `plans` mezcla dos conceptos. Hay que separar:

- **Planes de servicio** (lo que paga el cliente final): Básico $25, Pro $40, Socio América $0 → siguen en `plans` y se asocian a `accounts`.
- **Tipos de reseller** (modelo de comisión del partner): Reseller Full, Reseller White-Label, Agencia de Marketing → nueva tabla `reseller_tiers` asociada a `resellers`.

---

### Reglas de negocio a modelar

| Tipo de reseller            | Comisión                                  | Puede editar precio de venta |
|-----------------------------|-------------------------------------------|------------------------------|
| `reseller_full`             | 50% del precio base publicado             | No                           |
| `reseller_white_label`      | 50% del precio base publicado             | Sí (override por cuenta)     |
| `marketing_agency`          | 30% primer pago **o** 10% recurrente      | No                           |

- Para `marketing_agency` se elige al crear la cuenta cuál de los dos esquemas aplica (`one_time_30` o `recurring_10`), guardado en la cuenta.
- "Precio base" = `plans.monthly_price` y `plans.setup_fee`.
- Solo `reseller_white_label` puede setear `accounts.monthly_price` / `accounts.setup_fee` (override). Para los demás se ignora el override y se usa el del plan.

---

### Cambios en `schema.sql`

1. **Nuevo enum** `reseller_tier_code`: `reseller_full | reseller_white_label | marketing_agency`.
2. **Nuevo enum** `commission_model`: `percent_of_base | first_payment_pct | recurring_pct`.
3. **Nuevo enum** `agency_commission_choice`: `one_time_30 | recurring_10` (solo aplica si tier = marketing_agency).
4. **Nueva tabla `reseller_tiers`** (catálogo, seed con los 3 tipos):
   - `code` (enum), `name`, `description`
   - `commission_model`, `commission_pct` (50 / 30 / 10)
   - `can_override_price` boolean
   - `allows_commission_choice` boolean (true para marketing_agency)
   - `is_active`, timestamps
5. **`resellers`**:
   - quitar `commission_pct` (ahora vive en tier).
   - agregar `tier_id uuid NOT NULL REFERENCES reseller_tiers(id)`.
   - quitar `plan_id` (los planes son del cliente, no del reseller).
6. **`accounts`**:
   - agregar `agency_commission_choice agency_commission_choice` (nullable, requerido solo si el reseller es agencia).
   - agregar columnas calculadas/generadas para snapshot de comisión:
     - `commission_pct_snapshot numeric(5,2)` — congela el % al crear la cuenta.
     - `commission_model_snapshot commission_model`.
   - mantener `monthly_price` / `setup_fee` como override, pero documentar que solo se respeta si el tier permite override.
7. **Vista `account_billing_view`** que devuelve para cada cuenta:
   - `effective_monthly_price`, `effective_setup_fee` (override si white-label, si no del plan).
   - `reseller_commission_first_payment`, `reseller_commission_recurring` (calculados según tier + choice).
8. **Función `fn_calc_commission(account_id, payment_type)`** que retorna el monto de comisión para un pago dado (`setup` o `monthly`, ocurrencia 1 o N).
9. **Trigger en `accounts`**:
   - valida que `monthly_price` / `setup_fee` solo se permitan setear si el tier del reseller tiene `can_override_price = true`; si no, los fuerza a NULL.
   - valida que `agency_commission_choice` esté presente si tier = `marketing_agency`, y NULL en otros casos.
   - al insertar, copia `commission_pct` y `commission_model` del tier al snapshot.
10. **Seed de `reseller_tiers`** con los 3 tipos y sus parámetros.
11. **Migración suave**: como aún no estás en producción, el script se mantiene re-ejecutable (`CREATE TABLE IF NOT EXISTS`, enums con `DO $$ … duplicate_object`).

Entrego el `schema.sql` actualizado en `/mnt/documents/schema.sql` y un `migration_reseller_tiers.sql` por si ya corriste el anterior.

---

### Cambios en el panel admin (frontend)

1. **Nueva página** `/admin/reseller-tiers` (solo admin) — CRUD de los 3 tipos de reseller (editar % y reglas).
2. **`/admin/resellers`** — al crear/editar reseller:
   - selector de "Tipo de reseller" (dropdown del catálogo).
   - badge visible del tier y % de comisión.
3. **`/admin/accounts`** — al crear cuenta:
   - si reseller es `white_label` → mostrar campos de override de precio.
   - si reseller es `marketing_agency` → mostrar selector "Esquema de comisión" (30% primer pago / 10% recurrente).
   - en otros casos, ocultar ambos.
   - mostrar "Comisión estimada" en vivo calculada en cliente.
4. **`/admin/plans`** — aclarar copy: "Planes de servicio (cliente final)". Quitar cualquier referencia que mezcle con resellers.
5. **`/admin/dashboard`** — añadir KPI "Comisiones a pagar (mes)" agrupado por reseller.
6. **`/admin/stats`** — gráfico de comisiones por tier.
7. **Tipos TS** en `src/types/saas.ts`:
   - `ResellerTier`, `ResellerTierCode`, `CommissionModel`, `AgencyCommissionChoice`.
   - helper `calcCommission(plan, tier, choice, paymentKind, occurrence)` reutilizable en formularios.

---

### Detalles técnicos

- `ON CONFLICT (code) DO NOTHING` en seed de tiers para idempotencia.
- La validación de "solo white-label puede editar precio" se hace **doble**: en el trigger SQL (autoritativo) y en el formulario React (UX).
- `commission_pct_snapshot` evita que cambiar el tier del reseller mañana altere comisiones de cuentas ya vendidas.
- La función `fn_calc_commission` permitirá más adelante generar reportes de payout sin lógica duplicada en el frontend.
- Sigue sin haber dependencia con NocoDB para esta corrección estructural; cuando conectes la DB, NocoDB expondrá la nueva tabla `reseller_tiers` y los nuevos campos automáticamente.

---

### Orden de ejecución al aprobar

1. Reescribir `/mnt/documents/schema.sql` con los cambios (idempotente).
2. Generar `/mnt/documents/migration_reseller_tiers.sql` por si ya corriste el original.
3. Actualizar `AuthContext` (mock) para incluir `tier` en el usuario.
4. Crear `src/types/saas.ts` con tipos y helpers de comisión.
5. Crear página `/admin/reseller-tiers` y agregarla al sidebar (solo admin).
6. Refactor `/admin/resellers`, `/admin/accounts`, `/admin/plans` con la nueva lógica condicional.
7. Actualizar `.lovable/plan.md` con la corrección.

¿Apruebas?
