import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  RESELLER_TIERS_SEED,
  calcCommission,
  type AgencyCommissionChoice,
  type ResellerTierCode,
} from "@/types/saas";

const PLANS = [
  { id: "basic_25", name: "Plan Básico", monthly_price: 25, setup_fee: 90 },
  { id: "pro_40", name: "Plan Pro", monthly_price: 40, setup_fee: 90 },
  { id: "socio_america", name: "Socio América", monthly_price: 0, setup_fee: 0 },
];

const Accounts = () => {
  const [tierCode, setTierCode] = useState<ResellerTierCode>("reseller_full");
  const [planId, setPlanId] = useState(PLANS[0].id);
  const [overrideMonthly, setOverrideMonthly] = useState<string>("");
  const [overrideSetup, setOverrideSetup] = useState<string>("");
  const [choice, setChoice] = useState<AgencyCommissionChoice>("one_time_30");

  const tier = RESELLER_TIERS_SEED.find((t) => t.code === tierCode)!;
  const plan = PLANS.find((p) => p.id === planId)!;

  const calc = useMemo(
    () =>
      calcCommission({
        plan,
        tier,
        choice: tier.code === "marketing_agency" ? choice : undefined,
        override:
          tier.code === "reseller_white_label"
            ? {
                monthly_price: overrideMonthly ? Number(overrideMonthly) : null,
                setup_fee: overrideSetup ? Number(overrideSetup) : null,
              }
            : undefined,
      }),
    [plan, tier, choice, overrideMonthly, overrideSetup]
  );

  const fmt = (n: number) =>
    n.toLocaleString("en-US", { style: "currency", currency: "USD" });

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold">Cuentas</h1>
        <p className="text-sm text-muted-foreground">
          Simulador de creación. La persistencia se habilitará al conectar NocoDB.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Nueva cuenta</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label>Tipo de Reseller</Label>
            <Select value={tierCode} onValueChange={(v) => setTierCode(v as ResellerTierCode)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {RESELLER_TIERS_SEED.map((t) => (
                  <SelectItem key={t.code} value={t.code}>{t.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">{tier.description}</p>
          </div>

          <div className="space-y-2">
            <Label>Plan</Label>
            <Select value={planId} onValueChange={setPlanId}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {PLANS.map((p) => (
                  <SelectItem key={p.id} value={p.id}>
                    {p.name} — ${p.monthly_price}/mes + ${p.setup_fee} setup
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {tier.can_override_price && (
            <>
              <div className="space-y-2">
                <Label>Precio mensual (override)</Label>
                <Input
                  type="number"
                  placeholder={String(plan.monthly_price)}
                  value={overrideMonthly}
                  onChange={(e) => setOverrideMonthly(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Setup (override)</Label>
                <Input
                  type="number"
                  placeholder={String(plan.setup_fee)}
                  value={overrideSetup}
                  onChange={(e) => setOverrideSetup(e.target.value)}
                />
              </div>
            </>
          )}

          {tier.allows_commission_choice && (
            <div className="space-y-2 md:col-span-2">
              <Label>Esquema de comisión</Label>
              <Select value={choice} onValueChange={(v) => setChoice(v as AgencyCommissionChoice)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="one_time_30">30% sobre el primer pago</SelectItem>
                  <SelectItem value="recurring_10">10% recurrente sobre cada mensualidad</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Comisión estimada</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-3 text-sm md:grid-cols-4">
          <Stat label="Mensual efectivo" value={fmt(calc.effectiveMonthly)} />
          <Stat label="Setup efectivo" value={fmt(calc.effectiveSetup)} />
          <Stat label="Comisión 1er pago" value={fmt(calc.firstPayment)} />
          <Stat label="Comisión recurrente" value={fmt(calc.recurringMonthly)} />
          <div className="col-span-2 flex flex-wrap gap-1.5 md:col-span-4">
            <Badge variant="secondary">{calc.appliedPct}%</Badge>
            <Badge variant="outline">{calc.appliedModel}</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const Stat = ({ label, value }: { label: string; value: string }) => (
  <div className="rounded-md border border-border p-3">
    <p className="text-xs text-muted-foreground">{label}</p>
    <p className="text-lg font-bold">{value}</p>
  </div>
);

export default Accounts;
