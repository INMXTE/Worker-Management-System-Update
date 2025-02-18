import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "react-router-dom";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"worker" | "hr_admin">("worker");
  const { signIn, signUp, loading, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await signIn(email, password);
      } else {
        await signUp(email, password, role);
      }
    } catch (error) {
      console.error("Authentication error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm">
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold">
                {isLogin ? "Welcome back" : "Create an account"}
              </CardTitle>
              <CardDescription>
                {isLogin
                  ? "Sign in to access your account"
                  : "Enter your details to get started"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                {!isLogin && (
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Select value={role} onValueChange={(value: "worker" | "hr_admin") => setRole(value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="worker">Worker</SelectItem>
                        <SelectItem value="hr_admin">HR Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading
                    ? "Loading..."
                    : isLogin
                    ? "Sign in"
                    : "Create account"}
                </Button>
                <p className="text-sm text-center text-gray-500">
                  {isLogin ? "Don't have an account? " : "Already have an account? "}
                  <button
                    type="button"
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-primary hover:underline"
                  >
                    {isLogin ? "Sign up" : "Sign in"}
                  </button>
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="hidden lg:block relative w-0 flex-1">
        <div className="absolute inset-0 h-full w-full bg-gradient-to-br from-primary to-primary-foreground opacity-90" />
        <div className="absolute inset-0 flex items-center justify-center text-white p-12">
          <div className="max-w-lg">
            <h1 className="text-4xl font-bold mb-6">
              HR Management System
            </h1>
            <p className="text-lg">
              A comprehensive solution for managing your workforce, handling payroll,
              and streamlining HR processes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}