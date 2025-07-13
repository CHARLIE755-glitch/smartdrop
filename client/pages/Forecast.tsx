import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  BarChart3,
  Settings,
  TrendingUp,
  Calendar,
  Search,
  Download,
  Play,
  ArrowUp,
  ArrowDown,
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
import { Badge } from "@/components/ui/badge";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

// Mock forecast data
const generateForecastData = (baseValue: number, days: number) => {
  const data = [];
  for (let i = 0; i < days; i++) {
    const trend = Math.sin(i * 0.2) * 20;
    const noise = (Math.random() - 0.5) * 30;
    const value = Math.max(0, Math.round(baseValue + trend + noise));

    data.push({
      day: `Day ${i + 1}`,
      date: new Date(Date.now() + i * 24 * 60 * 60 * 1000).toLocaleDateString(),
      predicted: value,
      confidence: Math.round(85 + Math.random() * 10),
    });
  }
  return data;
};

// Seasonal trending data
const upcomingTrends = {
  january: [
    {
      category: "Cold Beverages",
      change: "+35%",
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      category: "Heaters & Warmers",
      change: "+28%",
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      category: "Winter Clothing",
      change: "+22%",
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      category: "Ice Cream",
      change: "-15%",
      color: "text-red-600",
      bgColor: "bg-red-100",
    },
  ],
  february: [
    {
      category: "Valentine's Day Items",
      change: "+45%",
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      category: "Chocolate & Candy",
      change: "+38%",
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      category: "Red & Pink Apparel",
      change: "+25%",
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
  ],
  march: [
    {
      category: "Spring Cleaning",
      change: "+40%",
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      category: "Gardening Supplies",
      change: "+32%",
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      category: "Allergy Medications",
      change: "+28%",
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
  ],
};

const seasonalData = [
  { month: "Jan", beverages: 135, seasonal: 180, clothing: 95 },
  { month: "Feb", beverages: 125, seasonal: 220, clothing: 110 },
  { month: "Mar", beverages: 140, seasonal: 190, clothing: 130 },
  { month: "Apr", beverages: 155, seasonal: 160, clothing: 145 },
  { month: "May", beverages: 175, seasonal: 140, clothing: 160 },
  { month: "Jun", beverages: 195, seasonal: 120, clothing: 180 },
];

export default function Forecast() {
  const navigate = useNavigate();
  const [selectedStore, setSelectedStore] = useState("");
  const [selectedSku, setSelectedSku] = useState("");
  const [forecastPeriod, setForecastPeriod] = useState("");
  const [showForecast, setShowForecast] = useState(false);
  const [forecastData, setForecastData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState("january");

  const generateForecast = async () => {
    if (!selectedStore || !selectedSku || !forecastPeriod) {
      alert("Please fill in all fields to generate forecast");
      return;
    }

    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const days = parseInt(forecastPeriod);
    const baseValue = 150 + Math.random() * 100;
    const data = generateForecastData(baseValue, days);

    setForecastData(data);
    setShowForecast(true);
    setLoading(false);
  };

  const downloadCsv = () => {
    const headers = ["Day", "Date", "Predicted Units", "Confidence %"];
    const csvContent = [
      headers.join(","),
      ...forecastData.map(
        (row) =>
          `"${row.day}","${row.date}",${row.predicted},${row.confidence}`,
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `forecast-${selectedStore}-${selectedSku}-${new Date().toISOString().split("T")[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const totalPredicted = forecastData.reduce(
    (sum, item) => sum + item.predicted,
    0,
  );
  const avgConfidence = forecastData.length
    ? Math.round(
        forecastData.reduce((sum, item) => sum + item.confidence, 0) /
          forecastData.length,
      )
    : 0;
  const changePercent =
    forecastData.length > 1
      ? Math.round(
          ((forecastData[forecastData.length - 1].predicted -
            forecastData[0].predicted) /
            forecastData[0].predicted) *
            100,
        )
      : 0;

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <nav className="bg-white border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/dashboard" className="flex items-center gap-3 ml-4">
                <div>
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets%2F4cbca4b77bf64fb889cd6f8b4523b770%2F4dbe26d9efbf4fdf98f7e6391b9ff452?format=webp&width=800"
                    alt="Wall-E Logo"
                    className="h-12 w-auto"
                  />
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
                onClick={() => navigate("/auth")}
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
                <Select value={selectedStore} onValueChange={setSelectedStore}>
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
                    placeholder="Enter SKU (e.g., SKU-1101)"
                    value={selectedSku}
                    onChange={(e) => setSelectedSku(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium text-foreground mb-3 block">
                  Forecast Period
                </Label>
                <Select
                  value={forecastPeriod}
                  onValueChange={setForecastPeriod}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7">Next 7 days</SelectItem>
                    <SelectItem value="14">Next 14 days</SelectItem>
                    <SelectItem value="30">Next 30 days</SelectItem>
                    <SelectItem value="60">Next 60 days</SelectItem>
                    <SelectItem value="90">Next 90 days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="mt-6">
              <Button
                onClick={generateForecast}
                disabled={
                  loading || !selectedStore || !selectedSku || !forecastPeriod
                }
                className="bg-walmart-blue hover:bg-walmart-dark text-white px-8 py-3 text-base font-semibold"
              >
                <Play className="h-4 w-4 mr-2" />
                {loading ? "Generating Forecast..." : "Generate AI Forecast"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Forecast Results Section */}
        {showForecast && (
          <>
            {/* Stats Summary */}
            <Card className="mt-8">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      📈 Forecast Results
                      <Badge className="bg-green-100 text-green-800">
                        {avgConfidence}% Confidence
                      </Badge>
                    </CardTitle>
                    <CardDescription>
                      AI-generated demand prediction for {selectedSku} (
                      {forecastPeriod} days)
                    </CardDescription>
                  </div>
                  <Button
                    onClick={downloadCsv}
                    variant="outline"
                    className="border-walmart-blue text-walmart-blue hover:bg-walmart-blue hover:text-white"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download CSV
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-500 rounded-lg">
                        <TrendingUp className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-blue-600 font-medium">
                          Total Projected Units
                        </p>
                        <p className="text-2xl font-bold text-blue-900">
                          {totalPredicted.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`p-6 rounded-xl border ${changePercent >= 0 ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded-lg ${changePercent >= 0 ? "bg-green-500" : "bg-red-500"}`}
                      >
                        {changePercent >= 0 ? (
                          <ArrowUp className="h-5 w-5 text-white" />
                        ) : (
                          <ArrowDown className="h-5 w-5 text-white" />
                        )}
                      </div>
                      <div>
                        <p
                          className={`text-sm font-medium ${changePercent >= 0 ? "text-green-600" : "text-red-600"}`}
                        >
                          Trend Change
                        </p>
                        <p
                          className={`text-2xl font-bold ${changePercent >= 0 ? "text-green-900" : "text-red-900"}`}
                        >
                          {changePercent > 0 ? "+" : ""}
                          {changePercent}%
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-purple-50 p-6 rounded-xl border border-purple-200">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-purple-500 rounded-lg">
                        <BarChart3 className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-purple-600 font-medium">
                          Avg Daily Demand
                        </p>
                        <p className="text-2xl font-bold text-purple-900">
                          {Math.round(
                            totalPredicted / forecastData.length,
                          ).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Chart Section */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Demand Prediction Chart</CardTitle>
                <CardDescription>
                  Daily predicted demand over the selected forecast period
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={forecastData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      className="opacity-30"
                    />
                    <XAxis dataKey="day" fontSize={12} tickMargin={10} />
                    <YAxis fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "white",
                        border: "1px solid #e2e8f0",
                        borderRadius: "8px",
                        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                      }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="predicted"
                      stroke="#0071CE"
                      strokeWidth={3}
                      name="Predicted Demand"
                      dot={{ fill: "#0071CE", strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, stroke: "#0071CE", strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </>
        )}

        {/* Seasonal Patterns Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              🗓️ Seasonal Patterns & Upcoming Trends
              <Badge className="bg-orange-100 text-orange-800">
                Predictive Analytics
              </Badge>
            </CardTitle>
            <CardDescription>
              AI-powered seasonal demand predictions based on historical
              patterns and market trends
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Monthly Trending Products */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    📈 Upcoming Trends
                  </h3>
                  <Select
                    value={selectedMonth}
                    onValueChange={setSelectedMonth}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="january">January</SelectItem>
                      <SelectItem value="february">February</SelectItem>
                      <SelectItem value="march">March</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  {upcomingTrends[selectedMonth].map((trend, index) => (
                    <div
                      key={index}
                      className={`flex items-center justify-between p-4 rounded-lg border ${trend.bgColor} border-gray-200`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-3 h-3 rounded-full ${trend.change.includes("+") ? "bg-green-500" : "bg-red-500"}`}
                        />
                        <span className="font-medium text-gray-800">
                          {trend.category}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`font-bold text-lg ${trend.color}`}>
                          {trend.change}
                        </span>
                        {trend.change.includes("+") ? (
                          <TrendingUp className="h-4 w-4 text-green-600" />
                        ) : (
                          <ArrowDown className="h-4 w-4 text-red-600" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-800 mb-2">
                    💡 Market Insights
                  </h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>
                      • Seasonal demand patterns based on 3-year historical data
                    </li>
                    <li>
                      • External factors: weather, holidays, economic trends
                    </li>
                    <li>• Real-time market analysis and competitor tracking</li>
                  </ul>
                </div>
              </div>

              {/* Seasonal Chart */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  📊 Category Performance Trends
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={seasonalData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      className="opacity-30"
                    />
                    <XAxis dataKey="month" fontSize={12} />
                    <YAxis fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "white",
                        border: "1px solid #e2e8f0",
                        borderRadius: "8px",
                        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                      }}
                    />
                    <Legend />
                    <Bar
                      dataKey="beverages"
                      fill="#0071CE"
                      name="Cold Beverages"
                      radius={[2, 2, 0, 0]}
                    />
                    <Bar
                      dataKey="seasonal"
                      fill="#FFC220"
                      name="Seasonal Items"
                      radius={[2, 2, 0, 0]}
                    />
                    <Bar
                      dataKey="clothing"
                      fill="#10B981"
                      name="Apparel"
                      radius={[2, 2, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
