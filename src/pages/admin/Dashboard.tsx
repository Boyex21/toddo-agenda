import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";

const stats = [
  { label: "Cuentas activas", value: "—" },
  { label: "MRR estimado", value: "—" },
  { label: "Leads (7d)", value: "—" },
  { label: "Conversión", value: "—" },
];

const Dashboard = () => {
  const { user } = useAuth();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Hola, {user?.full_name}</h1>
        <p className="text-sm text-muted-foreground">Resumen general del SaaS</p>
      </div>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-medium text-muted-foreground">
                {s.label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{s.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Pendiente de conexión</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>1. Ejecuta el script <code>schema.sql</code> en tu Postgres.</p>
          <p>2. Conecta esa DB a NocoDB y comparte la URL + API token.</p>
          <p>3. Habilitaré las edge functions para auth e ingest-lead.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
