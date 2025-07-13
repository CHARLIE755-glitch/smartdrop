import { Link, useNavigate } from "react-router-dom";
import { BarChart3, Settings, TrendingUp, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import AuthForm from "@/components/AuthForm";
import UserInfo from "@/components/UserInfo";

export default function Auth() {
  const navigate = useNavigate();

  // Debug environment variables in development
  if (import.meta.env.DEV) {
    console.log("🔧 Environment Variables Check:");
    console.log(
      "VITE_SUPABASE_URL:",
      import.meta.env.VITE_SUPABASE_URL ? "✅ Set" : "❌ Missing",
    );
    console.log(
      "VITE_SUPABASE_ANON_KEY:",
      import.meta.env.VITE_SUPABASE_ANON_KEY ? "✅ Set" : "❌ Missing",
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-walmart-light via-white to-walmart-light">
      {/* Top Navigation */}
      <nav className="bg-white border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/dashboard" className="flex items-center gap-3 ml-4">
                <div>
                  <div className="flex items-center gap-3">
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets%2F4cbca4b77bf64fb889cd6f8b4523b770%2F4dbe26d9efbf4fdf98f7e6391b9ff452?format=webp&width=800"
                      alt="Wall-E Logo"
                      className="h-8 w-auto"
                    />
                    <h1 className="text-xl font-bold text-walmart-blue">
                      Wall-E
                    </h1>
                  </div>
                  <p className="text-xs text-muted-foreground -mt-1">
                    Inventory Intelligence
                  </p>
                </div>
              </Link>
            </div>

            <div className="hidden lg:flex items-center space-x-8">
              <Link
                to="/dashboard"
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-500 hover:text-walmart-blue hover:bg-walmart-light rounded-lg transition-colors"
              >
                <BarChart3 className="h-4 w-4" />
                Dashboard
              </Link>
              <Link
                to="/forecast"
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-500 hover:text-walmart-blue hover:bg-walmart-light rounded-lg transition-colors"
              >
                <TrendingUp className="h-4 w-4" />
                Forecast
              </Link>
              <Link
                to="/admin"
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-500 hover:text-walmart-blue hover:bg-walmart-light rounded-lg transition-colors"
              >
                <Settings className="h-4 w-4" />
                Admin
              </Link>
            </div>

            <div className="flex items-center">
              <Button
                onClick={() => navigate("/dashboard")}
                variant="outline"
                size="sm"
                className="border-walmart-blue text-walmart-blue hover:bg-walmart-blue hover:text-white"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Go to Dashboard
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] p-6">
        <div className="w-full max-w-4xl">
          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Welcome to Wall-E
            </h1>
            <p className="text-muted-foreground">
              Get started with your inventory intelligence platform - Sign up
              for a new account or sign in to continue
            </p>
          </div>

          {/* Authentication Components */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Authentication Form */}
            <div className="flex justify-center">
              <AuthForm />
            </div>

            {/* User Information */}
            <div className="flex justify-center">
              <UserInfo />
            </div>
          </div>

          {/* Instructions */}
          <div className="mt-12 bg-white/50 backdrop-blur-sm rounded-lg p-6 border border-border">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              🚀 Getting Started:
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
              <div>
                <h3 className="font-medium text-foreground mb-2">
                  New User? Sign Up:
                </h3>
                <ul className="space-y-1">
                  <li>• Enter your business email address</li>
                  <li>• Create a secure password (6+ characters)</li>
                  <li>• Click "Sign Up" to create your account</li>
                  <li>• Check your email for confirmation</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-foreground mb-2">
                  Existing User? Sign In:
                </h3>
                <ul className="space-y-1">
                  <li>• Enter your registered email & password</li>
                  <li>• Click "Sign In" to access your dashboard</li>
                  <li>• Or use demo: admin@walmart.com / password</li>
                  <li>
                    <button
                      onClick={() => navigate("/dashboard")}
                      className="text-walmart-blue hover:text-walmart-dark font-medium underline"
                    >
                      Skip auth and go to demo dashboard
                    </button>
                  </li>
                  <li>• Access full inventory management features</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center text-xs text-muted-foreground">
            <p>© 2024 Wall-E - Powered by Supabase Authentication</p>
          </div>
        </div>
      </div>
    </div>
  );
}
