import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

type Props = {
  children: React.ReactNode;
  requireRole?: "admin" | "reseller";
};

const ProtectedRoute = ({ children, requireRole }: Props) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-muted-foreground">
        Cargando…
      </div>
    );
  }

  if (!user) return <Navigate to="/admin/login" replace />;
  if (requireRole && user.role !== requireRole && user.role !== "admin") {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
