import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Accounts = () => (
  <div className="space-y-4">
    <h1 className="text-2xl font-bold">Cuentas</h1>
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">Listado de cuentas</CardTitle>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground">
        Pendiente de conexión a NocoDB.
      </CardContent>
    </Card>
  </div>
);

export default Accounts;
