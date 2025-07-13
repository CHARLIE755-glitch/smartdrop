import { useState } from "react";
import { supabase } from "@/lib/supabase";
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
import { Mail, Lock, UserPlus, LogIn } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

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

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      console.log("📋 Signup response:", { data, error });

      if (error) {
        console.error("❌ Signup error:", error);

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
      toast({
        title: "Network Error",
        description:
          "Failed to connect to authentication service. Please check your internet connection.",
        variant: "destructive",
      });
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

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      console.log("��� Signin response:", { data, error });

      if (error) {
        console.error("❌ Signin error:", error);

        // Handle specific error types
        let errorMessage = error.message;
        if (error.message.includes("Invalid login credentials")) {
          errorMessage = "Incorrect email or password. Please try again.";
        } else if (error.message.includes("Email not confirmed")) {
          errorMessage =
            "Please check your email and click the confirmation link before signing in.";
        } else if (error.message.includes("User not found")) {
          errorMessage =
            "No account found with this email. Please sign up first.";
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
          window.location.href = "/dashboard";
        }
      }
    } catch (err: any) {
      console.error("💥 Signin exception:", err);
      toast({
        title: "Network Error",
        description:
          "Failed to connect to authentication service. Please check your internet connection.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
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
      </CardContent>
    </Card>
  );
}
