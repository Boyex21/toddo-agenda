import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RESELLER_TIERS_SEED } from "@/types/saas";

const ResellerTiers = () => (
  <div className="space-y-4">
    <div>
      <h1 className="text-2xl font-bold">Tipos de Reseller</h1>
      <p className="text-sm text-muted-foreground">
        Catálogo de modelos de comisión asignables a cada reseller. La edición se
        habilitará cuando NocoDB esté conectado.
      </p>
    </div>

    <div className="grid gap-3 md:grid-cols-3">
      {RESELLER_TIERS_SEED.map((t) => (
        <Card key={t.code}>
          <CardHeader>
            <CardTitle className="text-base">{t.name}</CardTitle>
            <p className="text-xs text-muted-foreground">{t.code}</p>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p className="text-muted-foreground">{t.description}</p>
            <div className="flex flex-wrap gap-1.5 pt-2">
              <Badge variant="secondary">{t.commission_pct}%</Badge>
              <Badge variant="outline">{t.commission_model}</Badge>
              {t.can_override_price && <Badge>Edita precio</Badge>}
              {t.allows_commission_choice && (
                <Badge variant="destructive">30% 1er pago / 10% recurrente</Badge>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>

    <Card>
      <CardHeader>
        <CardTitle className="text-sm">Reglas aplicadas automáticamente</CardTitle>
      </CardHeader>
      <CardContent className="space-y-1 text-sm text-muted-foreground">
        <p>• Solo White-Label puede definir precios de venta personalizados por cuenta.</p>
        <p>• Marketing Agency requiere elegir esquema de comisión al crear cada cuenta.</p>
        <p>• Al crear una cuenta, el % y modelo se congelan (snapshot) en la cuenta.</p>
      </CardContent>
    </Card>
  </div>
);

export default ResellerTiers;
