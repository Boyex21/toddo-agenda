import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Resellers = () => (
  <div className="space-y-4">
    <h1 className="text-2xl font-bold">Resellers</h1>
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">Gestión de resellers</CardTitle>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground">
        Solo admin. Pendiente de conexión a NocoDB.
      </CardContent>
    </Card>
  </div>
);

export default Resellers;
