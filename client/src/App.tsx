import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { AuthProvider, useAuth } from "./lib/auth";
import { Toaster } from "@/components/ui/toaster";

// Layouts and Routes
import Layout from "@/components/Layout";
import ProtectedRoute from "@/components/ProtectedRoute";

// Pages
import AuthPage from "@/pages/auth/auth";
import Dashboard from "@/pages/dashboard";
import Workers from "@/pages/workers";
import ClockIn from "@/pages/clock-in";
import Headcount from "@/pages/headcount";
import Settings from "@/pages/settings";
import NotFound from "@/pages/not-found";

// Component to handle protected routes with user role check
function ProtectedContent() {
  const { user } = useAuth();

  return (
    <Routes>
      {/* Auth Route */}
      <Route 
        path="/auth" 
        element={<AuthPage />} 
      />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          {/* Dashboard route - only for admin */}
          <Route 
            path="/" 
            element={
              user?.role === 'worker' ? (
                <Navigate to="/clock-in" replace />
              ) : (
                <Dashboard />
              )
            } 
          />
          <Route 
            path="/dashboard" 
            element={
              user?.role === 'worker' ? (
                <Navigate to="/clock-in" replace />
              ) : (
                <Dashboard />
              )
            } 
          />
          <Route path="/workers" element={<Workers />} />
          <Route path="/clock-in" element={<ClockIn />} />
          <Route path="/headcount" element={<Headcount />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Route>

      {/* Catch-all route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <ProtectedContent />
        </Router>
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;