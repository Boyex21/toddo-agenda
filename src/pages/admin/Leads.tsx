import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Leads = () => (
  <div className="space-y-4">
    <h1 className="text-2xl font-bold">Leads del landing</h1>
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">Form interactions</CardTitle>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground">
        Pendiente de conexión a NocoDB. Se mostrarán: fecha, evento, país, ciudad, UTMs, fuente.
      </CardContent>
    </Card>
  </div>
);

export default Leads;
