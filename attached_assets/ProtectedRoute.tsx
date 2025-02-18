import { Navigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import Spinner from "@/components/Spinner"; // Import Spinner component

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuth();

  if (loading) {
    return <Spinner />; // Use Spinner component instead of plain text
  }

  if (!user) {
    return <Navigate to="/auth/login" />;
  }

  return <>{children}</>;
}
