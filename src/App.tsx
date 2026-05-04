import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LeadFormProvider } from "@/components/landing/LeadFormContext";
import { CurrencyProvider } from "@/components/landing/CurrencyContext";
import LeadFormModal from "@/components/landing/LeadFormModal";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/admin/ProtectedRoute";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminLogin from "@/pages/admin/Login";
import AdminDashboard from "@/pages/admin/Dashboard";
import AdminAccounts from "@/pages/admin/Accounts";
import AdminResellers from "@/pages/admin/Resellers";
import AdminPlans from "@/pages/admin/Plans";
import AdminResellerTiers from "@/pages/admin/ResellerTiers";
import AdminLeads from "@/pages/admin/Leads";
import AdminStats from "@/pages/admin/Stats";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CurrencyProvider>
        <LeadFormProvider>
          <AuthProvider>
            <Toaster />
            <Sonner />
            <LeadFormModal />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute>
                      <AdminLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<AdminDashboard />} />
                  <Route path="dashboard" element={<AdminDashboard />} />
                  <Route path="accounts" element={<AdminAccounts />} />
                  <Route path="leads" element={<AdminLeads />} />
                  <Route path="stats" element={<AdminStats />} />
                  <Route
                    path="resellers"
                    element={
                      <ProtectedRoute requireRole="admin">
                        <AdminResellers />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="plans"
                    element={
                      <ProtectedRoute requireRole="admin">
                        <AdminPlans />
                      </ProtectedRoute>
                    }
                  />
                </Route>
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </AuthProvider>
        </LeadFormProvider>
      </CurrencyProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
