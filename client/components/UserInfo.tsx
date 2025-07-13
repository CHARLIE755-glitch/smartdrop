import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { User, LogOut, Mail, Calendar, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { User as SupabaseUser } from "@supabase/supabase-js";

export default function UserInfo() {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const getUser = async () => {
      try {
        console.log("👤 Checking current user session...");
        const { data, error } = await supabase.auth.getUser();

        if (error) {
          console.error("❌ Error fetching user:", error);
        } else {
          console.log(
            "📋 Current user:",
            data?.user ? `${data.user.email}` : "No user",
          );
          setUser(data?.user || null);
        }
      } catch (error) {
        console.error("💥 Exception fetching user:", error);
      } finally {
        setLoading(false);
      }
    };

    getUser();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      console.log(
        "🔄 Auth state change:",
        event,
        session?.user?.email || "no user",
      );
      setUser(session?.user || null);

      if (event === "SIGNED_IN") {
        toast({
          title: "Welcome!",
          description: "You have been signed in successfully.",
        });
      } else if (event === "SIGNED_OUT") {
        toast({
          title: "Goodbye!",
          description: "You have been signed out.",
        });
      } else if (event === "TOKEN_REFRESHED") {
        console.log("🔄 Token refreshed");
      } else if (event === "USER_UPDATED") {
        console.log("👤 User updated");
      }
    });

    return () => subscription.unsubscribe();
  }, [toast]);

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        toast({
          title: "Error",
          description: "Failed to sign out: " + error.message,
          variant: "destructive",
        });
      } else {
        setUser(null);
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <Card className="w-full max-w-md">
        <CardContent className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-walmart-blue"></div>
          <span className="ml-2 text-muted-foreground">Loading...</span>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5 text-walmart-blue" />
          User Information
        </CardTitle>
        <CardDescription>
          {user ? "Account details and session info" : "No active session"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {user ? (
          <div className="space-y-4">
            {/* User Status */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Status:</span>
              <Badge className="bg-status-success text-white">
                🟢 Authenticated
              </Badge>
            </div>

            {/* Email */}
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">{user.email}</p>
                <p className="text-xs text-muted-foreground">Email Address</p>
              </div>
            </div>

            {/* User ID */}
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-mono font-medium">
                  {user.id.substring(0, 8)}...
                </p>
                <p className="text-xs text-muted-foreground">User ID</p>
              </div>
            </div>

            {/* Created Date */}
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">
                  {new Date(user.created_at).toLocaleDateString()}
                </p>
                <p className="text-xs text-muted-foreground">Account Created</p>
              </div>
            </div>

            {/* Email Verified */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Email Verified:
              </span>
              <Badge
                variant={user.email_confirmed_at ? "default" : "destructive"}
              >
                {user.email_confirmed_at ? "✅ Verified" : "❌ Pending"}
              </Badge>
            </div>

            {/* Last Sign In */}
            {user.last_sign_in_at && (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    Last Sign In:
                  </span>
                  <span className="text-sm font-medium">
                    {new Date(user.last_sign_in_at).toLocaleString()}
                  </span>
                </div>
              </div>
            )}

            {/* Logout Button */}
            <Button
              onClick={logout}
              variant="destructive"
              className="w-full mt-6"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        ) : (
          <div className="text-center py-6">
            <User className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
            <p className="text-muted-foreground font-medium">Not logged in</p>
            <p className="text-sm text-muted-foreground mt-1">
              Use the authentication form above to sign in
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
