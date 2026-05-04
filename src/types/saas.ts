// Tipos del modelo SaaS — espejo de schema.sql
export type ResellerTierCode =
  | "reseller_full"
  | "reseller_white_label"
  | "marketing_agency";

export type CommissionModel =
  | "percent_of_base"
  | "first_payment_pct"
  | "recurring_pct";

export type AgencyCommissionChoice = "one_time_30" | "recurring_10";

export type UserRole = "admin" | "reseller";

export type ResellerTier = {
  id: string;
  code: ResellerTierCode;
  name: string;
  description: string;
  commission_model: CommissionModel;
  commission_pct: number;
  can_override_price: boolean;
  allows_commission_choice: boolean;
  is_active: boolean;
};

export type Plan = {
  id: string;
  code: "basic_25" | "pro_40" | "socio_america";
  name: string;
  monthly_price: number;
  setup_fee: number;
  currency: string;
};

// Catálogo seed (espejo del SQL) usado mientras NocoDB no está conectado.
export const RESELLER_TIERS_SEED: ResellerTier[] = [
  {
    id: "seed-full",
    code: "reseller_full",
    name: "Reseller Full",
    description:
      "50% sobre los precios base publicados (setup + mensualidad). No puede modificar precios de venta.",
    commission_model: "percent_of_base",
    commission_pct: 50,
    can_override_price: false,
    allows_commission_choice: false,
    is_active: true,
  },
  {
    id: "seed-wl",
    code: "reseller_white_label",
    name: "Reseller White-Label",
    description:
      "50% sobre los precios base. Único tier autorizado a definir su propio precio de venta por cuenta.",
    commission_model: "percent_of_base",
    commission_pct: 50,
    can_override_price: true,
    allows_commission_choice: false,
    is_active: true,
  },
  {
    id: "seed-agency",
    code: "marketing_agency",
    name: "Agencia de Marketing",
    description:
      "Elige por cada cuenta: 30% sobre el primer pago O 10% recurrente sobre cada mensualidad.",
    commission_model: "first_payment_pct",
    commission_pct: 30,
    can_override_price: false,
    allows_commission_choice: true,
    is_active: true,
  },
];

export type CalcInput = {
  plan: Pick<Plan, "monthly_price" | "setup_fee">;
  tier: Pick<ResellerTier, "code" | "commission_model" | "commission_pct">;
  /** Solo aplica si tier.code === "marketing_agency" */
  choice?: AgencyCommissionChoice;
  /** Override de precios (solo respetado si tier es white_label) */
  override?: { monthly_price?: number | null; setup_fee?: number | null };
};

export type CalcResult = {
  effectiveMonthly: number;
  effectiveSetup: number;
  /** Comisión sobre el primer pago (setup + 1ra mensualidad) */
  firstPayment: number;
  /** Comisión recurrente por cada mensualidad posterior */
  recurringMonthly: number;
  /** Modelo y % efectivos aplicados */
  appliedModel: CommissionModel;
  appliedPct: number;
};

export function calcCommission(input: CalcInput): CalcResult {
  const { plan, tier, choice, override } = input;

  const effectiveMonthly =
    tier.code === "reseller_white_label" && override?.monthly_price != null
      ? Number(override.monthly_price)
      : Number(plan.monthly_price);
  const effectiveSetup =
    tier.code === "reseller_white_label" && override?.setup_fee != null
      ? Number(override.setup_fee)
      : Number(plan.setup_fee);

  let model: CommissionModel = tier.commission_model;
  let pct = tier.commission_pct;

  if (tier.code === "marketing_agency") {
    if (choice === "one_time_30") {
      model = "first_payment_pct";
      pct = 30;
    } else {
      model = "recurring_pct";
      pct = 10;
    }
  }

  let firstPayment = 0;
  let recurringMonthly = 0;

  if (model === "percent_of_base") {
    firstPayment = (effectiveSetup + effectiveMonthly) * (pct / 100);
    recurringMonthly = effectiveMonthly * (pct / 100);
  } else if (model === "first_payment_pct") {
    firstPayment = (effectiveSetup + effectiveMonthly) * (pct / 100);
    recurringMonthly = 0;
  } else if (model === "recurring_pct") {
    firstPayment = effectiveMonthly * (pct / 100);
    recurringMonthly = effectiveMonthly * (pct / 100);
  }

  return {
    effectiveMonthly,
    effectiveSetup,
    firstPayment,
    recurringMonthly,
    appliedModel: model,
    appliedPct: pct,
  };
}

export const TIER_LABEL: Record<ResellerTierCode, string> = {
  reseller_full: "Reseller Full",
  reseller_white_label: "Reseller White-Label",
  marketing_agency: "Agencia de Marketing",
};
