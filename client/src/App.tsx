import { AuthProvider } from "./lib/auth";
import { Toaster } from "@/components/ui/toaster";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Route, Switch } from "wouter";
import Layout from "@/components/Layout";
import ProtectedRoute from "@/components/ProtectedRoute";
import AuthPage from "@/pages/auth/auth";
import Dashboard from "@/pages/dashboard";
import Workers from "@/pages/workers";
import NotFound from "@/pages/not-found";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Switch>
          <Route path="/auth" component={AuthPage} />
          
          <Route path="/">
            <ProtectedRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          </Route>

          <Route path="/workers">
            <ProtectedRoute>
              <Layout>
                <Workers />
              </Layout>
            </ProtectedRoute>
          </Route>

          <Route component={NotFound} />
        </Switch>
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
