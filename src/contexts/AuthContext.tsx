import { createContext, useCallback, useContext, useEffect, useState, ReactNode } from "react";
import { api, getToken, setToken } from "@/lib/api";

export type AuthUser = {
  id: string;
  email: string;
  full_name: string;
  role: "admin" | "reseller";
  tier_id?: string | number | null;
};

type AuthContextType = {
  user: AuthUser | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const t = getToken();
      if (!t) { setIsLoading(false); return; }
      try {
        const r = await api.me();
        setUser(r.user);
      } catch {
        setToken(null);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    if (!email || !password) throw new Error("Email y contraseña requeridos");
    const r = await api.login(email, password);
    setToken(r.token);
    setUser(r.user);
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
