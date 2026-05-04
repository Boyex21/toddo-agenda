import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RESELLER_TIERS_SEED } from "@/types/saas";

const Resellers = () => (
  <div className="space-y-4">
    <div>
      <h1 className="text-2xl font-bold">Resellers</h1>
      <p className="text-sm text-muted-foreground">
        Cada reseller pertenece a un tipo (tier) que define su modelo de comisión.
      </p>
    </div>

    <Card>
      <CardHeader>
        <CardTitle className="text-sm">Tipos disponibles al asignar</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {RESELLER_TIERS_SEED.map((t) => (
          <div key={t.code} className="flex items-start justify-between gap-3 rounded-md border border-border p-3">
            <div>
              <p className="text-sm font-semibold">{t.name}</p>
              <p className="text-xs text-muted-foreground">{t.description}</p>
            </div>
            <Badge variant="secondary" className="shrink-0">{t.commission_pct}%</Badge>
          </div>
        ))}
      </CardContent>
    </Card>

    <p className="text-xs text-muted-foreground">
      CRUD pendiente de conexión a NocoDB.
    </p>
  </div>
);

export default Resellers;
