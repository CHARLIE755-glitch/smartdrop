import { Link, useNavigate } from "react-router-dom";
import { BarChart3, Settings, TrendingUp, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import AuthForm from "@/components/AuthForm";
import UserInfo from "@/components/UserInfo";

export default function Auth() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-walmart-light via-white to-walmart-light">
      {/* Top Navigation */}
      <nav className="bg-white border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/dashboard" className="flex items-center gap-3 ml-4">
                <div>
                  <h1 className="text-xl font-bold text-walmart-blue">
                    SmartDrop
                  </h1>
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
                onClick={() => navigate("/login")}
                variant="outline"
                size="sm"
                className="border-walmart-blue text-walmart-blue hover:bg-walmart-blue hover:text-white"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Login
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
              Welcome to SmartDrop
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
              🧪 How to Test:
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
              <div>
                <h3 className="font-medium text-foreground mb-2">Sign Up:</h3>
                <ul className="space-y-1">
                  <li>• Enter a valid email address</li>
                  <li>• Choose a secure password (6+ chars)</li>
                  <li>• Click "Sign Up"</li>
                  <li>• Check email for confirmation link</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-foreground mb-2">Sign In:</h3>
                <ul className="space-y-1">
                  <li>• Use registered email & password</li>
                  <li>• Click "Sign In"</li>
                  <li>• View user info in right panel</li>
                  <li>• Use "Sign Out" to logout</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center text-xs text-muted-foreground">
            <p>© 2024 SmartDrop - Powered by Supabase Authentication</p>
          </div>
        </div>
      </div>
    </div>
  );
}
