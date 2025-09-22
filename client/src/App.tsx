import { Switch, Route } from "wouter";
import { Suspense, lazy } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/hooks/useAuth";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";

// Lazy-load admin pages to reduce initial bundle size
const AdminLogin = lazy(() => import("@/pages/admin-login"));
const AdminDashboard = lazy(() => import("@/pages/admin-dashboard"));

// Loading component for admin routes
const AdminLoadingFallback = () => (
  <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
    <div className="animate-pulse">
      <div className="h-8 bg-muted rounded w-48 mb-4"></div>
      <div className="h-32 bg-muted rounded w-80"></div>
    </div>
  </div>
);

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/admin/login">
        <Suspense fallback={<AdminLoadingFallback />}>
          <AdminLogin />
        </Suspense>
      </Route>
      <Route path="/admin">
        <Suspense fallback={<AdminLoadingFallback />}>
          <AdminDashboard />
        </Suspense>
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
