import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
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
import { AlertCircle, ArrowRight } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // TODO: Replace with Supabase authentication
    // const { data, error } = await supabase.auth.signInWithPassword({
    //   email,
    //   password,
    // });

    // Simulate authentication - replace with actual Supabase auth
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (email === "admin@walmart.com" && password === "password") {
        navigate("/dashboard");
      } else {
        setError("Invalid email or password");
      }
    } catch (err) {
      setError("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-walmart-light via-white to-walmart-light flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="mb-4">
            <h1 className="text-3xl font-bold text-walmart-blue">SmartDrop</h1>
            <p className="text-sm text-muted-foreground">
              Inventory Intelligence
            </p>
          </div>
        </div>

        <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-2xl font-bold text-center text-foreground">
              Admin Login
            </CardTitle>
            <CardDescription className="text-center text-muted-foreground">
              Enter your credentials to access the SmartDrop dashboard
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@walmart.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-11 bg-white border-2 border-gray-200 focus:border-walmart-blue focus:ring-walmart-blue"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-11 bg-white border-2 border-gray-200 focus:border-walmart-blue focus:ring-walmart-blue"
                />
              </div>

              {error && (
                <div className="flex items-center gap-2 p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg">
                  <AlertCircle className="h-4 w-4" />
                  {error}
                </div>
              )}

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 bg-walmart-yellow hover:bg-walmart-yellow/90 text-gray-900 font-semibold text-base border-0 shadow-lg hover:shadow-xl transition-all duration-200"
              >
                {isLoading ? "Signing in..." : "Login"}
              </Button>

              <div className="pt-4 text-center space-y-3">
                <p className="text-xs text-muted-foreground">
                  Demo credentials: admin@walmart.com / password
                </p>
                <div className="border-t pt-3">
                  <p className="text-sm text-muted-foreground mb-2">
                    Don't have an account?
                  </p>
                  <Link
                    to="/auth"
                    className="inline-flex items-center gap-2 text-sm font-medium text-walmart-blue hover:text-walmart-dark transition-colors"
                  >
                    Create Account
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="mt-8 text-center text-xs text-muted-foreground">
          <p>© 2024 SmartDrop - Walmart Inventory Intelligence Platform</p>
        </div>
      </div>
    </div>
  );
}
