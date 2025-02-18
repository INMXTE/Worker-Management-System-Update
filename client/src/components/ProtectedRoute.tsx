import { PropsWithChildren } from "react";
import { useAuth } from "@/lib/auth";
import { Loader2 } from "lucide-react";
import { Redirect } from "wouter";

export default function ProtectedRoute({ children }: PropsWithChildren) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <Redirect to="/auth" />;
  }

  return <>{children}</>;
}