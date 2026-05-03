import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const plans = [
  { code: "basic_25", name: "Plan Básico", monthly: 25, setup: 90 },
  { code: "pro_40", name: "Plan Pro", monthly: 40, setup: 90 },
  { code: "socio_america", name: "Socio América", monthly: 0, setup: 0 },
];

const Plans = () => (
  <div className="space-y-4">
    <h1 className="text-2xl font-bold">Planes</h1>
    <div className="grid gap-3 md:grid-cols-3">
      {plans.map((p) => (
        <Card key={p.code}>
          <CardHeader>
            <CardTitle className="text-base">{p.name}</CardTitle>
            <p className="text-xs text-muted-foreground">{p.code}</p>
          </CardHeader>
          <CardContent className="space-y-1 text-sm">
            <p>Mensual: <strong>${p.monthly}</strong></p>
            <p>Instalación: <strong>${p.setup}</strong></p>
          </CardContent>
        </Card>
      ))}
    </div>
    <p className="text-xs text-muted-foreground">
      Edición pendiente de conexión a NocoDB.
    </p>
  </div>
);

export default Plans;
