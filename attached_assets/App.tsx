import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./lib/auth";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Workers from "./pages/Workers";
import Departments from "./pages/Departments";
import Payroll from "./pages/Payroll";
import Messages from "./pages/Messages";
import Settings from "./pages/Settings";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/auth/login" element={<Login />} />

            <Route path="/auth/register" element={<Register />} />

            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Dashboard />
                  </Layout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/workers"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Workers />
                  </Layout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/departments"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Departments />
                  </Layout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/payroll"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Payroll />
                  </Layout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/messages"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Messages />
                  </Layout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Settings />
                  </Layout>
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
