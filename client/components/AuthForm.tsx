import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { networkDiagnostics, fallbackAuth } from "@/lib/network-diagnostics";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, Lock, UserPlus, LogIn, Wifi, WifiOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [networkStatus, setNetworkStatus] = useState<{
    connected: boolean;
    supabaseReachable: boolean;
    lastChecked: Date | null;
  }>({
    connected: true,
    supabaseReachable: true,
    lastChecked: null,
  });
  const { toast } = useToast();

  // Test network and Supabase connection on component mount
  useEffect(() => {
    const testConnection = async () => {
      try {
        console.log("🔗 Testing connections...");

        // First, run network diagnostics
        const diagnostics = await networkDiagnostics.runFullDiagnostics(
          import.meta.env.VITE_SUPABASE_URL,
        );

        setNetworkStatus({
          connected: diagnostics.internet,
          supabaseReachable: diagnostics.overall,
          lastChecked: new Date(),
        });

        if (!diagnostics.internet) {
          toast({
            title: "Network Error",
            description:
              "No internet connection detected. Using offline demo mode.",
            variant: "destructive",
          });
          return;
        }

        if (!diagnostics.overall) {
          toast({
            title: "Service Unavailable",
            description:
              "Supabase service is unreachable. Demo mode is available.",
            variant: "destructive",
          });
          return;
        }

        // Test Supabase auth specifically
        const { data, error } = await supabase.auth.getSession();

        if (error) {
          console.error("❌ Supabase auth error:", error);
          setNetworkStatus((prev) => ({ ...prev, supabaseReachable: false }));
          toast({
            title: "Auth Service Warning",
            description:
              "Authentication service is having issues. Demo mode is available.",
            variant: "destructive",
          });
        } else {
          console.log("✅ Supabase auth connection successful");
          console.log(
            "Session:",
            data.session ? "Active session found" : "No active session",
          );
        }
      } catch (err) {
        console.error("💥 Connection test failed:", err);
        setNetworkStatus((prev) => ({ ...prev, supabaseReachable: false }));
        toast({
          title: "Connection Failed",
          description: "Cannot connect to services. Demo mode is available.",
          variant: "destructive",
        });
      }
    };

    testConnection();
  }, [toast]);

  // Email validation
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Password validation
  const isValidPassword = (password: string) => {
    return password.length >= 6;
  };

  const signUp = async () => {
    console.log("🚀 Starting signup process...");

    // Validation
    if (!email || !password) {
      console.log("❌ Missing email or password");
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    if (!isValidEmail(email)) {
      console.log("❌ Invalid email format");
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    if (!isValidPassword(password)) {
      console.log("❌ Password too weak");
      toast({
        title: "Weak Password",
        description: "Password must be at least 6 characters long",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      console.log("📧 Attempting to sign up with email:", email);

      // Check network status first
      if (!networkStatus.connected) {
        throw new Error("No internet connection");
      }

      // Try Supabase signup
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      console.log("📋 Signup response:", { data, error });

      if (error) {
        console.error("❌ Signup error:", error);

        // Check if it's a network error
        if (
          error.message.includes("Failed to fetch") ||
          error.name === "AuthRetryableFetchError"
        ) {
          throw new Error("Network connection failed");
        }

        // Handle specific error types
        let errorMessage = error.message;
        if (error.message.includes("already registered")) {
          errorMessage =
            "This email is already registered. Try signing in instead.";
        } else if (error.message.includes("invalid email")) {
          errorMessage = "Please enter a valid email address.";
        } else if (error.message.includes("password")) {
          errorMessage = "Password must be at least 6 characters long.";
        }

        toast({
          title: "Signup Error",
          description: errorMessage,
          variant: "destructive",
        });
      } else {
        console.log("✅ Signup successful:", data);
        toast({
          title: "Signup Successful!",
          description: data.user?.email_confirmed_at
            ? "Account created successfully! You can now sign in."
            : "Check your email to confirm your account before signing in.",
        });

        // Clear form on success
        if (data.user && !data.user.email_confirmed_at) {
          setEmail("");
          setPassword("");
        }
      }
    } catch (err: any) {
      console.error("💥 Signup exception:", err);

      // Check if this is a network error - offer demo mode
      if (
        err.message.includes("Failed to fetch") ||
        err.message.includes("Network connection failed") ||
        err.message.includes("No internet connection")
      ) {
        toast({
          title: "Connection Failed",
          description:
            "Can't reach authentication servers. Try demo mode below or check your connection.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Signup Error",
          description:
            "Failed to create account. Please try again or use demo mode.",
          variant: "destructive",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const signIn = async () => {
    console.log("🔐 Starting signin process...");

    // Validation
    if (!email || !password) {
      console.log("❌ Missing email or password");
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    if (!isValidEmail(email)) {
      console.log("❌ Invalid email format");
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      console.log("🔑 Attempting to sign in with email:", email);

      // Check for demo credentials first
      if (fallbackAuth.validateDemoCredentials(email, password)) {
        console.log("🎭 Using demo authentication for:", email);

        // Set demo session
        const session = fallbackAuth.setDemoSession(email);

        toast({
          title: "Demo Login Successful!",
          description: `Logged in as ${email} (Demo Mode)`,
        });

        // Redirect to dashboard
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 1000);

        return;
      }

      // Check network status
      if (!networkStatus.connected) {
        throw new Error("No internet connection");
      }

      // Try Supabase signin
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      console.log("📋 Signin response:", { data, error });

      if (error) {
        console.error("❌ Signin error:", error);

        // Check if it's a network error
        if (
          error.message.includes("Failed to fetch") ||
          error.name === "AuthRetryableFetchError"
        ) {
          throw new Error("Network connection failed");
        }

        // Handle specific error types
        let errorMessage = error.message;
        if (error.message.includes("Invalid login credentials")) {
          errorMessage =
            "Incorrect email or password. Try demo credentials: admin@walmart.com / password";
        } else if (error.message.includes("Email not confirmed")) {
          errorMessage =
            "Please check your email and click the confirmation link before signing in.";
        } else if (error.message.includes("User not found")) {
          errorMessage =
            "No account found with this email. Please sign up first or try demo mode.";
        } else if (error.message.includes("invalid email")) {
          errorMessage = "Please enter a valid email address.";
        } else if (error.message.includes("Too many requests")) {
          errorMessage =
            "Too many login attempts. Please wait a moment and try again.";
        }

        toast({
          title: "Login Error",
          description: errorMessage,
          variant: "destructive",
        });
      } else {
        console.log("✅ Signin successful:", data);

        if (data.user) {
          toast({
            title: "Welcome back!",
            description: `Successfully logged in as ${data.user.email}`,
          });

          // Redirect to dashboard on successful login
          setTimeout(() => {
            window.location.href = "/dashboard";
          }, 1000);
        }
      }
    } catch (err: any) {
      console.error("💥 Signin exception:", err);

      // Check if this is a network error - offer demo mode
      if (
        err.message.includes("Failed to fetch") ||
        err.message.includes("Network connection failed") ||
        err.message.includes("No internet connection")
      ) {
        toast({
          title: "Connection Failed",
          description:
            "Can't reach authentication servers. Try demo credentials: admin@walmart.com / password",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Login Error",
          description:
            "Failed to sign in. Please try again or use demo credentials.",
          variant: "destructive",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            {networkStatus.connected ? (
              <Wifi className="h-4 w-4 text-green-500" />
            ) : (
              <WifiOff className="h-4 w-4 text-red-500" />
            )}
            <span className="text-xs text-muted-foreground">
              {networkStatus.connected
                ? networkStatus.supabaseReachable
                  ? "Online"
                  : "Limited"
                : "Offline"}
            </span>
          </div>
          {networkStatus.lastChecked && (
            <span className="text-xs text-muted-foreground">
              Checked: {networkStatus.lastChecked.toLocaleTimeString()}
            </span>
          )}
        </div>
        <CardTitle className="text-center text-walmart-blue">
          Join SmartDrop
        </CardTitle>
        <CardDescription className="text-center">
          Create your account to get started, or sign in if you already have one
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="signup" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signup" className="flex items-center gap-2">
              <UserPlus className="h-4 w-4" />
              Sign Up
            </TabsTrigger>
            <TabsTrigger value="signin" className="flex items-center gap-2">
              <LogIn className="h-4 w-4" />
              Sign In
            </TabsTrigger>
          </TabsList>

          <div className="space-y-4 mt-4">
            <div>
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="password" className="flex items-center gap-2">
                <Lock className="h-4 w-4" />
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1"
              />
            </div>
          </div>

          <TabsContent value="signup" className="mt-4">
            <Button
              onClick={signUp}
              disabled={loading}
              className="w-full bg-status-success hover:bg-status-success/90 text-white"
            >
              <UserPlus className="h-4 w-4 mr-2" />
              {loading ? "Creating Account..." : "Sign Up"}
            </Button>
          </TabsContent>

          <TabsContent value="signin" className="mt-4">
            <Button
              onClick={signIn}
              disabled={loading}
              className="w-full bg-walmart-blue hover:bg-walmart-dark text-white"
            >
              <LogIn className="h-4 w-4 mr-2" />
              {loading ? "Signing In..." : "Sign In"}
            </Button>
          </TabsContent>
        </Tabs>

        {/* Demo Credentials Section */}
        <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <h4 className="text-sm font-semibold text-blue-800 mb-2">
            🎭 Demo Mode Available
          </h4>
          <p className="text-xs text-blue-700 mb-2">
            If you can't connect to the servers, try these demo credentials:
          </p>
          <div className="space-y-1 text-xs text-blue-600">
            <div>• admin@walmart.com / password</div>
            <div>• demo@smartdrop.com / demo123</div>
            <div>• test@example.com / test123</div>
          </div>
        </div>

        {/* Debug Section - Remove in production */}
        {import.meta.env.DEV && (
          <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
            <h4 className="text-xs font-semibold text-gray-600 mb-2">
              🔧 Debug Tools
            </h4>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={async () => {
                  console.log("🧪 Running full diagnostics...");
                  try {
                    const diagnostics =
                      await networkDiagnostics.runFullDiagnostics(
                        import.meta.env.VITE_SUPABASE_URL,
                      );
                    toast({
                      title: "Diagnostics Complete",
                      description: `Internet: ${diagnostics.internet ? "✅" : "❌"} | Supabase: ${diagnostics.overall ? "✅" : "❌"}`,
                      variant: diagnostics.overall ? "default" : "destructive",
                    });
                  } catch (err: any) {
                    console.error("Diagnostics failed:", err);
                    toast({
                      title: "Diagnostics Failed",
                      description: err.message,
                      variant: "destructive",
                    });
                  }
                }}
                className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded hover:bg-blue-200"
              >
                Run Diagnostics
              </button>
              <button
                onClick={async () => {
                  console.log("🧪 Testing auth connection...");
                  try {
                    const { data, error } = await supabase.auth.getSession();
                    console.log("Session test:", { data, error });
                    toast({
                      title: "Auth Test",
                      description: error
                        ? `Error: ${error.message}`
                        : "Connection OK",
                      variant: error ? "destructive" : "default",
                    });
                  } catch (err: any) {
                    console.error("Auth test failed:", err);
                    toast({
                      title: "Auth Test Failed",
                      description: err.message,
                      variant: "destructive",
                    });
                  }
                }}
                className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded hover:bg-green-200"
              >
                Test Auth
              </button>
              <button
                onClick={() => {
                  console.log("🔍 Current state:");
                  console.log("Email:", email);
                  console.log("Password length:", password.length);
                  console.log("Loading:", loading);
                  console.log("Network:", networkStatus);
                }}
                className="text-xs px-2 py-1 bg-purple-100 text-purple-800 rounded hover:bg-purple-200"
              >
                Log State
              </button>
              <button
                onClick={() => {
                  // Test demo auth
                  if (fallbackAuth.validateDemoCredentials(email, password)) {
                    toast({
                      title: "Demo Valid",
                      description: "These are valid demo credentials!",
                    });
                  } else {
                    toast({
                      title: "Demo Invalid",
                      description:
                        "Not valid demo credentials. Try: admin@walmart.com / password",
                      variant: "destructive",
                    });
                  }
                }}
                className="text-xs px-2 py-1 bg-yellow-100 text-yellow-800 rounded hover:bg-yellow-200"
              >
                Test Demo
              </button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
