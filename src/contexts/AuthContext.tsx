import { createContext, useCallback, useContext, useEffect, useState, ReactNode } from "react";

export type AuthUser = {
  id: string;
  email: string;
  full_name: string;
  role: "admin" | "reseller";
};

type AuthContextType = {
  user: AuthUser | null;
  accessToken: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = "toddo_admin_session";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setUser(parsed.user);
        setAccessToken(parsed.accessToken);
      }
    } catch {
      // ignore
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    // TODO: reemplazar por llamada a edge function `auth-login` cuando NocoDB esté conectado.
    // Por ahora, mock local para construir UI:
    if (!email || !password) throw new Error("Email y contraseña requeridos");

    // Mock — cualquier credencial funciona en modo desarrollo
    const mockUser: AuthUser = {
      id: "mock-admin",
      email,
      full_name: email.split("@")[0],
      role: email.includes("admin") ? "admin" : "reseller",
    };
    const mockToken = "mock-jwt-token";
    setUser(mockUser);
    setAccessToken(mockToken);
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ user: mockUser, accessToken: mockToken })
    );
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setAccessToken(null);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return (
    <AuthContext.Provider value={{ user, accessToken, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
