import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Stats = () => (
  <div className="space-y-4">
    <h1 className="text-2xl font-bold">Estadísticas</h1>
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">Eventos por cuenta</CardTitle>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground">
        Gráficos pendientes — se conectarán a la tabla <code>account_events</code>.
      </CardContent>
    </Card>
  </div>
);

export default Stats;
