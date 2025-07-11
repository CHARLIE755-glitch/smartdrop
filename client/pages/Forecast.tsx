import { Link, useNavigate } from "react-router-dom";
import {
  Package,
  BarChart3,
  Settings,
  TrendingUp,
  Calendar,
  Search,
} from "lucide-react";
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

export default function Forecast() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
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
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-walmart-blue bg-walmart-light rounded-lg"
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
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Demand Forecasting
          </h1>
          <p className="text-muted-foreground">
            Advanced AI-powered demand prediction and time-series analysis
          </p>
        </div>

        {/* Filters Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Forecast Filters</CardTitle>
            <CardDescription>
              Select parameters to generate detailed demand forecasts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <Label className="text-sm font-medium text-foreground mb-3 block">
                  Store Selection
                </Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select store" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="store-001">
                      Walmart Supercenter - Dallas TX
                    </SelectItem>
                    <SelectItem value="store-002">
                      Walmart Supercenter - Houston TX
                    </SelectItem>
                    <SelectItem value="store-003">
                      Walmart Supercenter - San Jose CA
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-medium text-foreground mb-3 block">
                  SKU Search
                </Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search SKU or product"
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium text-foreground mb-3 block">
                  Forecast Period
                </Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">Next 30 days</SelectItem>
                    <SelectItem value="60">Next 60 days</SelectItem>
                    <SelectItem value="90">Next 90 days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="mt-6">
              <Button className="bg-walmart-blue hover:bg-walmart-dark text-white">
                Generate Forecast
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Placeholder Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-walmart-blue" />
                Time Series Analysis
              </CardTitle>
              <CardDescription>
                Detailed forecast charts will be displayed here
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-gradient-to-br from-walmart-light to-white rounded-lg border border-border flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="h-12 w-12 text-walmart-blue mx-auto mb-4" />
                  <p className="text-muted-foreground font-medium">
                    Forecast Chart Placeholder
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Interactive time-series visualization
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-walmart-blue" />
                Seasonal Patterns
              </CardTitle>
              <CardDescription>
                Historical demand patterns and seasonality trends
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-gradient-to-br from-walmart-yellow/10 to-white rounded-lg border border-border flex items-center justify-center">
                <div className="text-center">
                  <Calendar className="h-12 w-12 text-walmart-yellow mx-auto mb-4" />
                  <p className="text-muted-foreground font-medium">
                    Seasonal Analysis Placeholder
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Pattern recognition and trends
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Feature Preview */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Coming Soon - Advanced Forecasting Features</CardTitle>
            <CardDescription>
              Enhanced AI capabilities for better demand prediction
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border border-border rounded-lg">
                <h3 className="font-semibold text-foreground mb-2">
                  Multi-Factor Analysis
                </h3>
                <p className="text-sm text-muted-foreground">
                  Weather, events, and economic indicators
                </p>
              </div>
              <div className="p-4 border border-border rounded-lg">
                <h3 className="font-semibold text-foreground mb-2">
                  Real-time Updates
                </h3>
                <p className="text-sm text-muted-foreground">
                  Live forecast adjustments based on current sales
                </p>
              </div>
              <div className="p-4 border border-border rounded-lg">
                <h3 className="font-semibold text-foreground mb-2">
                  Confidence Intervals
                </h3>
                <p className="text-sm text-muted-foreground">
                  Prediction accuracy ranges and risk assessment
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
