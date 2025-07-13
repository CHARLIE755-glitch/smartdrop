import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  BarChart3,
  Map,
  Settings,
  Menu,
  X,
  ChevronDown,
  Search,
  Calendar,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  MapPin,
  RefreshCw,
  Filter,
  Eye,
  EyeOff,
  Download,
  ArrowDown,
  ArrowUp,
  Play,
} from "lucide-react";
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
  AreaChart,
  Area,
} from "recharts";

// Mock data
const demandData = [
  { month: "Jan", actual: 1200, predicted: 1100 },
  { month: "Feb", actual: 1900, predicted: 1800 },
  { month: "Mar", actual: 800, predicted: 850 },
  { month: "Apr", actual: 1400, predicted: 1300 },
  { month: "May", actual: 2000, predicted: 1950 },
  { month: "Jun", actual: 1700, predicted: 1750 },
];

const reorderData = [
  {
    sku: "SKU-001234",
    product: "Great Value Milk 1 Gal",
    stock: 45,
    predicted: 120,
    status: "critical",
    reorderPoint: 50,
    optimalStock: 180,
    leadTimeDays: 3,
    safetyStock: 30,
    dailyDemand: 15,
    supplierLeadTime: "2-3 days",
    reorderQuantity: 165,
    reorderDate: "2024-01-18",
    daysUntilStockout: 3,
    footfallMultiplier: 1.2,
  },
  {
    sku: "SKU-005678",
    product: "Wonder Bread Loaf",
    stock: 78,
    predicted: 90,
    status: "low",
    reorderPoint: 75,
    optimalStock: 140,
    leadTimeDays: 2,
    safetyStock: 25,
    dailyDemand: 12,
    supplierLeadTime: "1-2 days",
    reorderQuantity: 87,
    reorderDate: "2024-01-19",
    daysUntilStockout: 6,
    footfallMultiplier: 1.1,
  },
  {
    sku: "SKU-009012",
    product: "Coca-Cola 12pk",
    stock: 156,
    predicted: 200,
    status: "good",
    reorderPoint: 100,
    optimalStock: 280,
    leadTimeDays: 5,
    safetyStock: 40,
    dailyDemand: 25,
    supplierLeadTime: "4-5 days",
    reorderQuantity: 164,
    reorderDate: "2024-01-21",
    daysUntilStockout: 6,
    footfallMultiplier: 1.3,
  },
  {
    sku: "SKU-003456",
    product: "Tide Detergent 150oz",
    stock: 23,
    predicted: 85,
    status: "critical",
    reorderPoint: 40,
    optimalStock: 120,
    leadTimeDays: 7,
    safetyStock: 20,
    dailyDemand: 8,
    supplierLeadTime: "5-7 days",
    reorderQuantity: 153,
    reorderDate: "2024-01-17",
    daysUntilStockout: 2,
    footfallMultiplier: 0.9,
  },
];

const stores = [
  { id: "store-001", name: "Walmart Supercenter - Dallas TX", status: "good" },
  {
    id: "store-002",
    name: "Walmart Supercenter - Houston TX",
    status: "warning",
  },
  {
    id: "store-003",
    name: "Walmart Supercenter - San Jose CA",
    status: "critical",
  },
];

// Comprehensive store inventory data
const storeInventoryData = {
  "store-001": [
    {
      id: "1",
      sku: "SKU-1101",
      productName: "Great Value Milk",
      category: "Dairy",
      unitsInStock: 18,
      reorderLevel: 20,
      status: "low",
      lastRestocked: "2024-01-15",
      supplier: "Dairy Fresh LLC",
    },
    {
      id: "2",
      sku: "SKU-2134",
      productName: "Equate Hand Sanitizer",
      category: "Health",
      unitsInStock: 65,
      reorderLevel: 30,
      status: "good",
      lastRestocked: "2024-01-12",
      supplier: "Health Plus Inc",
    },
    {
      id: "3",
      sku: "SKU-3345",
      productName: "Mainstays LED Bulbs",
      category: "Electronics",
      unitsInStock: 2,
      reorderLevel: 10,
      status: "critical",
      lastRestocked: "2024-01-10",
      supplier: "TechLite Corp",
    },
    {
      id: "4",
      sku: "SKU-4112",
      productName: "Fresh Produce - Apples",
      category: "Grocery",
      unitsInStock: 90,
      reorderLevel: 60,
      status: "good",
      lastRestocked: "2024-01-16",
      supplier: "Farm Fresh Co",
    },
    {
      id: "5",
      sku: "SKU-1177",
      productName: "Great Value Bread",
      category: "Bakery",
      unitsInStock: 5,
      reorderLevel: 25,
      status: "low",
      lastRestocked: "2024-01-14",
      supplier: "Wonder Bread Inc",
    },
    {
      id: "6",
      sku: "SKU-5567",
      productName: "Tide Laundry Detergent",
      category: "Household",
      unitsInStock: 42,
      reorderLevel: 15,
      status: "good",
      lastRestocked: "2024-01-13",
      supplier: "P&G Supplies",
    },
    {
      id: "7",
      sku: "SKU-6678",
      productName: "Coca-Cola 12pk",
      category: "Beverages",
      unitsInStock: 0,
      reorderLevel: 50,
      status: "critical",
      lastRestocked: "2024-01-08",
      supplier: "Coca-Cola Co",
    },
    {
      id: "8",
      sku: "SKU-7789",
      productName: "iPhone Charger Cable",
      category: "Electronics",
      unitsInStock: 23,
      reorderLevel: 20,
      status: "good",
      lastRestocked: "2024-01-11",
      supplier: "TechAccessories Inc",
    },
  ],
  "store-002": [
    {
      id: "9",
      sku: "SKU-1101",
      productName: "Great Value Milk",
      category: "Dairy",
      unitsInStock: 45,
      reorderLevel: 20,
      status: "good",
      lastRestocked: "2024-01-15",
      supplier: "Dairy Fresh LLC",
    },
    {
      id: "10",
      sku: "SKU-2134",
      productName: "Equate Hand Sanitizer",
      category: "Health",
      unitsInStock: 12,
      reorderLevel: 30,
      status: "low",
      lastRestocked: "2024-01-09",
      supplier: "Health Plus Inc",
    },
    {
      id: "11",
      sku: "SKU-3345",
      productName: "Mainstays LED Bulbs",
      category: "Electronics",
      unitsInStock: 25,
      reorderLevel: 10,
      status: "good",
      lastRestocked: "2024-01-14",
      supplier: "TechLite Corp",
    },
  ],
  "store-003": [
    {
      id: "12",
      sku: "SKU-1101",
      productName: "Great Value Milk",
      category: "Dairy",
      unitsInStock: 3,
      reorderLevel: 20,
      status: "critical",
      lastRestocked: "2024-01-07",
      supplier: "Dairy Fresh LLC",
    },
    {
      id: "13",
      sku: "SKU-4112",
      productName: "Fresh Produce - Apples",
      category: "Grocery",
      unitsInStock: 8,
      reorderLevel: 60,
      status: "critical",
      lastRestocked: "2024-01-05",
      supplier: "Farm Fresh Co",
    },
  ],
};

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedStore, setSelectedStore] = useState("store-001");
  const [selectedSku, setSelectedSku] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showSalesTrend, setShowSalesTrend] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const navigate = useNavigate();

  // Auto-refresh functionality
  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(
        () => {
          setLastRefresh(new Date());
          // In a real app, this would trigger a data refetch
        },
        5 * 60 * 1000,
      ); // 5 minutes

      return () => clearInterval(interval);
    }
  }, [autoRefresh]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "critical":
        return "bg-status-danger text-white";
      case "low":
      case "warning":
        return "bg-status-warning text-white";
      case "good":
        return "bg-status-success text-white";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "critical":
        return <AlertTriangle className="h-4 w-4" />;
      case "low":
      case "warning":
        return <AlertTriangle className="h-4 w-4" />;
      case "good":
        return <CheckCircle className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <nav className="bg-white border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-walmart-blue lg:hidden"
              >
                <Menu className="h-6 w-6" />
              </button>

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
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-walmart-blue bg-walmart-light rounded-lg"
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

      <div className="flex">
        {/* Enhanced Walmart-style Sidebar */}
        <div
          className={`fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-gray-200 shadow-lg transform ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
        >
          {/* Mobile Header */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 bg-walmart-blue lg:hidden">
            <span className="text-lg font-bold text-white">Control Panel</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(false)}
              className="text-white hover:bg-white/20"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Sidebar Content */}
          <div className="p-6 space-y-8 bg-gray-50/50 h-full">
            {/* Store Selection Section */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-walmart-blue/10 rounded-lg">
                  <MapPin className="h-4 w-4 text-walmart-blue" />
                </div>
                <Label className="text-sm font-bold text-gray-800 uppercase tracking-wide">
                  Store Location
                </Label>
              </div>
              <Select value={selectedStore} onValueChange={setSelectedStore}>
                <SelectTrigger className="w-full h-11 border-2 border-gray-200 hover:border-walmart-blue transition-colors">
                  <SelectValue placeholder="Select store location" />
                </SelectTrigger>
                <SelectContent>
                  {stores.map((store) => (
                    <SelectItem key={store.id} value={store.id}>
                      <div className="flex items-center gap-3 py-1">
                        <div
                          className={`w-2.5 h-2.5 rounded-full ${
                            store.status === "good"
                              ? "bg-green-500"
                              : store.status === "warning"
                                ? "bg-amber-500"
                                : "bg-red-500"
                          }`}
                        />
                        <span className="font-medium">{store.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Product Search Section */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-walmart-yellow/20 rounded-lg">
                  <Search className="h-4 w-4 text-walmart-blue" />
                </div>
                <Label className="text-sm font-bold text-gray-800 uppercase tracking-wide">
                  Product Search
                </Label>
              </div>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search SKU or product name..."
                  value={selectedSku}
                  onChange={(e) => setSelectedSku(e.target.value)}
                  className="pl-12 h-11 border-2 border-gray-200 focus:border-walmart-blue hover:border-gray-300 transition-colors"
                />
              </div>
            </div>

            {/* Date Range Section */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Calendar className="h-4 w-4 text-walmart-blue" />
                </div>
                <Label className="text-sm font-bold text-gray-800 uppercase tracking-wide">
                  Time Period
                </Label>
              </div>
              <div className="space-y-3">
                <button className="w-full flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-walmart-blue hover:bg-walmart-blue/5 transition-all duration-200 group">
                  <Calendar className="h-4 w-4 text-gray-500 group-hover:text-walmart-blue" />
                  <span className="text-sm font-medium text-gray-700 group-hover:text-walmart-blue">
                    Last 30 days
                  </span>
                  <ChevronDown className="h-4 w-4 text-gray-400 ml-auto group-hover:text-walmart-blue" />
                </button>
              </div>
            </div>

            {/* Smart Filters Section */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-purple-50 rounded-lg">
                  <Filter className="h-4 w-4 text-purple-600" />
                </div>
                <Label className="text-sm font-bold text-gray-800 uppercase tracking-wide">
                  Smart Filters
                </Label>
              </div>
              <div className="space-y-3">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full h-10 border-2 border-gray-200 hover:border-purple-300 transition-colors">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">🔍 All Products</SelectItem>
                    <SelectItem value="critical">🚨 Critical Stock</SelectItem>
                    <SelectItem value="low">⚠️ Low Stock</SelectItem>
                    <SelectItem value="good">✅ Healthy Stock</SelectItem>
                  </SelectContent>
                </Select>

                <Select
                  value={categoryFilter}
                  onValueChange={setCategoryFilter}
                >
                  <SelectTrigger className="w-full h-10 border-2 border-gray-200 hover:border-purple-300 transition-colors">
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">📦 All Categories</SelectItem>
                    <SelectItem value="Dairy">🥛 Dairy</SelectItem>
                    <SelectItem value="Bakery">🍞 Bakery</SelectItem>
                    <SelectItem value="Beverages">🥤 Beverages</SelectItem>
                    <SelectItem value="Electronics">📱 Electronics</SelectItem>
                    <SelectItem value="Health">💊 Health</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Analytics Overview */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-indigo-50 rounded-lg">
                  <BarChart3 className="h-4 w-4 text-indigo-600" />
                </div>
                <Label className="text-sm font-bold text-gray-800 uppercase tracking-wide">
                  Live Analytics
                </Label>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-red-50 to-red-100 rounded-lg border border-red-200">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                    <span className="text-sm font-medium text-red-800">
                      Critical Items
                    </span>
                  </div>
                  <span className="text-lg font-bold text-red-700">
                    {storeInventoryData[selectedStore]?.filter(
                      (item) => item.status === "critical",
                    ).length || 0}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-amber-50 to-amber-100 rounded-lg border border-amber-200">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
                    <span className="text-sm font-medium text-amber-800">
                      Low Stock
                    </span>
                  </div>
                  <span className="text-lg font-bold text-amber-700">
                    {storeInventoryData[selectedStore]?.filter(
                      (item) => item.status === "low",
                    ).length || 0}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border border-green-200">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span className="text-sm font-medium text-green-800">
                      Healthy Stock
                    </span>
                  </div>
                  <span className="text-lg font-bold text-green-700">
                    {storeInventoryData[selectedStore]?.filter(
                      (item) => item.status === "good",
                    ).length || 0}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions Section */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-green-50 rounded-lg">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                </div>
                <Label className="text-sm font-bold text-gray-800 uppercase tracking-wide">
                  Quick Actions
                </Label>
              </div>
              <div className="space-y-2">
                <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 transition-all text-left group">
                  <RefreshCw className="h-4 w-4 text-blue-500 group-hover:animate-spin" />
                  <span className="text-sm font-medium text-gray-700 group-hover:text-blue-700">
                    Refresh Data
                  </span>
                </button>
                <button
                  onClick={() => setShowSalesTrend(!showSalesTrend)}
                  className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gradient-to-r hover:from-orange-50 hover:to-orange-100 transition-all text-left group"
                >
                  {showSalesTrend ? (
                    <EyeOff className="h-4 w-4 text-orange-500" />
                  ) : (
                    <Eye className="h-4 w-4 text-orange-500" />
                  )}
                  <span className="text-sm font-medium text-gray-700 group-hover:text-orange-700">
                    {showSalesTrend ? "Hide" : "Show"} Sales Trends
                  </span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gradient-to-r hover:from-purple-50 hover:to-purple-100 transition-all text-left group">
                  <Download className="h-4 w-4 text-purple-500" />
                  <span className="text-sm font-medium text-gray-700 group-hover:text-purple-700">
                    Export Report
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 min-h-screen">
          <div className="p-6 space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <Card className="border-l-4 border-l-walmart-blue">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total SKUs
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,247</div>
                  <p className="text-xs text-muted-foreground">
                    +12% from last month
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-status-warning">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Reorder Alerts
                  </CardTitle>
                  <AlertTriangle className="h-4 w-4 text-status-warning" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">23</div>
                  <p className="text-xs text-muted-foreground">
                    5 critical, 18 low stock
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-status-success">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Accuracy Rate
                  </CardTitle>
                  <TrendingUp className="h-4 w-4 text-status-success" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">94.2%</div>
                  <p className="text-xs text-muted-foreground">
                    Demand prediction accuracy
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-walmart-yellow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Top Location
                  </CardTitle>
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Dallas</div>
                  <p className="text-xs text-muted-foreground">
                    Highest demand volume
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Demand vs Prediction</CardTitle>
                  <CardDescription>
                    Actual demand compared to AI predictions over time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={demandData}>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        className="opacity-30"
                      />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="actual"
                        stroke="#0071CE"
                        strokeWidth={3}
                        name="Actual Demand"
                      />
                      <Line
                        type="monotone"
                        dataKey="predicted"
                        stroke="#FFC220"
                        strokeWidth={3}
                        strokeDasharray="5 5"
                        name="Predicted Demand"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Store Status Overview</CardTitle>
                  <CardDescription>
                    Current inventory status across all locations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {stores.map((store) => (
                      <div
                        key={store.id}
                        className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-3 h-3 rounded-full ${
                              store.status === "good"
                                ? "bg-status-success"
                                : store.status === "warning"
                                  ? "bg-status-warning"
                                  : "bg-status-danger"
                            }`}
                          />
                          <span className="font-medium">{store.name}</span>
                        </div>
                        <Badge className={getStatusColor(store.status)}>
                          {store.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Enhanced Reorder Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  🤖 Smart Reorder Recommendations
                  <Badge className="bg-purple-100 text-purple-800">
                    AI-Powered
                  </Badge>
                </CardTitle>
                <CardDescription>
                  Intelligent stock predictions with optimal quantities and
                  timing recommendations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {reorderData.map((item) => (
                    <div
                      key={item.sku}
                      className={`border-2 rounded-xl p-6 transition-all hover:shadow-lg ${
                        item.status === "critical"
                          ? "border-red-200 bg-red-50/50"
                          : item.status === "low"
                            ? "border-amber-200 bg-amber-50/50"
                            : "border-green-200 bg-green-50/50"
                      }`}
                    >
                      {/* Product Header */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-4 h-4 rounded-full ${
                              item.status === "critical"
                                ? "bg-red-500"
                                : item.status === "low"
                                  ? "bg-amber-500"
                                  : "bg-green-500"
                            }`}
                          />
                          <div>
                            <h3 className="font-bold text-lg text-gray-900">
                              {item.product}
                            </h3>
                            <p className="text-sm text-gray-600 font-mono">
                              {item.sku}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge
                            className={`${getStatusColor(item.status)} text-sm font-semibold px-3 py-1`}
                          >
                            {item.status === "critical" && "🚨 URGENT"}
                            {item.status === "low" && "⚠️ MONITOR"}
                            {item.status === "good" && "✅ SUFFICIENT"}
                          </Badge>
                        </div>
                      </div>

                      {/* Smart Analytics Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* 1. Optimal Stock Quantity */}
                        <div className="bg-white rounded-lg p-4 border border-gray-200">
                          <div className="flex items-center gap-2 mb-3">
                            <div className="p-1.5 bg-blue-100 rounded-lg">
                              <TrendingUp className="h-4 w-4 text-blue-600" />
                            </div>
                            <h4 className="font-semibold text-gray-800">
                              📊 Optimal Stock
                            </h4>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">
                                Current:
                              </span>
                              <span className="font-bold">
                                {item.stock} units
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">
                                Recommended:
                              </span>
                              <span className="font-bold text-blue-600">
                                {item.optimalStock} units
                              </span>
                            </div>
                            <div className="text-xs text-gray-500 pt-2 border-t">
                              Formula: Current ({item.stock}) + Forecast (
                              {item.predicted}) - Buffer ({item.safetyStock})
                            </div>
                          </div>
                        </div>

                        {/* 2. When to Order */}
                        <div className="bg-white rounded-lg p-4 border border-gray-200">
                          <div className="flex items-center gap-2 mb-3">
                            <div className="p-1.5 bg-orange-100 rounded-lg">
                              <Calendar className="h-4 w-4 text-orange-600" />
                            </div>
                            <h4 className="font-semibold text-gray-800">
                              ⏰ Reorder Timing
                            </h4>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">
                                Reorder Date:
                              </span>
                              <span className="font-bold text-orange-600">
                                {item.reorderDate}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">
                                Lead Time:
                              </span>
                              <span className="font-medium">
                                {item.supplierLeadTime}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">
                                Stockout Risk:
                              </span>
                              <span
                                className={`font-bold ${item.daysUntilStockout <= 3 ? "text-red-600" : "text-green-600"}`}
                              >
                                {item.daysUntilStockout} days
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* 3. How Much to Order */}
                        <div className="bg-white rounded-lg p-4 border border-gray-200">
                          <div className="flex items-center gap-2 mb-3">
                            <div className="p-1.5 bg-green-100 rounded-lg">
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            </div>
                            <h4 className="font-semibold text-gray-800">
                              📦 Smart Quantity
                            </h4>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">
                                Order Qty:
                              </span>
                              <span className="font-bold text-green-600 text-lg">
                                {item.reorderQuantity} units
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">
                                Daily Demand:
                              </span>
                              <span className="font-medium">
                                {item.dailyDemand}/day
                              </span>
                            </div>
                            <div className="text-xs text-gray-500 pt-2 border-t">
                              ({item.dailyDemand} × {item.leadTimeDays} days) +{" "}
                              {item.safetyStock} safety - {item.stock} current
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Action Button */}
                      <div className="mt-4 flex justify-end">
                        <Button
                          className={`${
                            item.status === "critical"
                              ? "bg-red-600 hover:bg-red-700"
                              : "bg-walmart-blue hover:bg-walmart-dark"
                          } text-white font-semibold px-6`}
                        >
                          {item.status === "critical"
                            ? "🚨 Order Now"
                            : "📋 Create Order"}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Store Inventory Table */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      📦 Store Inventory Details
                      <Badge variant="secondary" className="ml-2">
                        {stores.find((s) => s.id === selectedStore)?.name}
                      </Badge>
                    </CardTitle>
                    <CardDescription>
                      Product-wise inventory status for the selected store
                      location
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowSalesTrend(!showSalesTrend)}
                      className="text-xs"
                    >
                      {showSalesTrend ? (
                        <EyeOff className="h-3 w-3 mr-1" />
                      ) : (
                        <Eye className="h-3 w-3 mr-1" />
                      )}
                      Sales Trend
                    </Button>
                    <Button
                      variant={autoRefresh ? "default" : "outline"}
                      size="sm"
                      onClick={() => setAutoRefresh(!autoRefresh)}
                      className="text-xs"
                    >
                      <RefreshCw
                        className={`h-3 w-3 mr-1 ${autoRefresh ? "animate-spin" : ""}`}
                      />
                      Auto-refresh
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Filters */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div>
                    <Label className="text-sm font-medium mb-2 block">
                      Category Filter
                    </Label>
                    <Select
                      value={categoryFilter}
                      onValueChange={setCategoryFilter}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All">All Categories</SelectItem>
                        <SelectItem value="Dairy">Dairy</SelectItem>
                        <SelectItem value="Health">Health</SelectItem>
                        <SelectItem value="Electronics">Electronics</SelectItem>
                        <SelectItem value="Grocery">Grocery</SelectItem>
                        <SelectItem value="Bakery">Bakery</SelectItem>
                        <SelectItem value="Household">Household</SelectItem>
                        <SelectItem value="Beverages">Beverages</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-sm font-medium mb-2 block">
                      Status Filter
                    </Label>
                    <Select
                      value={statusFilter}
                      onValueChange={setStatusFilter}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All">All Status</SelectItem>
                        <SelectItem value="good">✅ Healthy</SelectItem>
                        <SelectItem value="low">⚠️ Low Stock</SelectItem>
                        <SelectItem value="critical">🔴 Critical</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-end">
                    <div className="text-xs text-muted-foreground">
                      Last updated: {lastRefresh.toLocaleTimeString()}
                    </div>
                  </div>
                </div>

                {/* Inventory Table */}
                <div className="border border-border rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="text-left p-4 font-medium text-muted-foreground">
                          Product Name
                        </th>
                        <th className="text-left p-4 font-medium text-muted-foreground">
                          SKU ID
                        </th>
                        <th className="text-left p-4 font-medium text-muted-foreground">
                          Category
                        </th>
                        <th className="text-left p-4 font-medium text-muted-foreground">
                          Units in Stock
                        </th>
                        <th className="text-left p-4 font-medium text-muted-foreground">
                          Reorder Level
                        </th>
                        <th className="text-left p-4 font-medium text-muted-foreground">
                          Status
                        </th>
                        {showSalesTrend && (
                          <th className="text-left p-4 font-medium text-muted-foreground">
                            Sales Trend
                          </th>
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {storeInventoryData[selectedStore]
                        ?.filter(
                          (item) =>
                            (categoryFilter === "All" ||
                              item.category === categoryFilter) &&
                            (statusFilter === "All" ||
                              item.status === statusFilter),
                        )
                        ?.map((item) => (
                          <tr
                            key={item.id}
                            className="border-b border-border hover:bg-muted/25 transition-colors"
                          >
                            <td className="p-4 font-medium">
                              {item.productName}
                            </td>
                            <td className="p-4 font-mono text-sm text-muted-foreground">
                              {item.sku}
                            </td>
                            <td className="p-4">
                              <Badge variant="outline" className="text-xs">
                                {item.category}
                              </Badge>
                            </td>
                            <td className="p-4">
                              <div className="flex items-center gap-2">
                                <span
                                  className={`font-semibold text-lg ${
                                    item.status === "critical"
                                      ? "text-status-danger"
                                      : item.status === "low"
                                        ? "text-status-warning"
                                        : "text-status-success"
                                  }`}
                                >
                                  {item.unitsInStock}
                                </span>
                                <span className="text-sm text-muted-foreground">
                                  units
                                </span>
                              </div>
                            </td>
                            <td className="p-4 text-muted-foreground">
                              {item.reorderLevel}
                            </td>
                            <td className="p-4">
                              <Badge
                                className={`${
                                  item.status === "critical"
                                    ? "bg-status-danger text-white"
                                    : item.status === "low"
                                      ? "bg-status-warning text-white"
                                      : "bg-status-success text-white"
                                } flex items-center gap-1 w-fit`}
                              >
                                {item.status === "critical" && "🔴"}
                                {item.status === "low" && "⚠️"}
                                {item.status === "good" && "✅"}
                                {item.status === "critical"
                                  ? "Critical"
                                  : item.status === "low"
                                    ? "Low"
                                    : "Good"}
                              </Badge>
                            </td>
                            {showSalesTrend && (
                              <td className="p-4">
                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                  <TrendingUp className="h-3 w-3 text-status-success" />
                                  <span>+12% this week</span>
                                </div>
                              </td>
                            )}
                          </tr>
                        ))}
                    </tbody>
                  </table>

                  {(!storeInventoryData[selectedStore] ||
                    storeInventoryData[selectedStore].length === 0) && (
                    <div className="p-8 text-center text-muted-foreground">
                      No inventory data available for selected store
                    </div>
                  )}
                </div>

                {/* Summary Stats */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="p-4 bg-muted/25 rounded-lg">
                    <div className="text-sm text-muted-foreground">
                      Total Products
                    </div>
                    <div className="text-xl font-bold">
                      {storeInventoryData[selectedStore]?.length || 0}
                    </div>
                  </div>
                  <div className="p-4 bg-status-danger/10 rounded-lg border border-status-danger/20">
                    <div className="text-sm text-muted-foreground">
                      Critical Items
                    </div>
                    <div className="text-xl font-bold text-status-danger">
                      {storeInventoryData[selectedStore]?.filter(
                        (item) => item.status === "critical",
                      ).length || 0}
                    </div>
                  </div>
                  <div className="p-4 bg-status-warning/10 rounded-lg border border-status-warning/20">
                    <div className="text-sm text-muted-foreground">
                      Low Stock Items
                    </div>
                    <div className="text-xl font-bold text-status-warning">
                      {storeInventoryData[selectedStore]?.filter(
                        (item) => item.status === "low",
                      ).length || 0}
                    </div>
                  </div>
                  <div className="p-4 bg-status-success/10 rounded-lg border border-status-success/20">
                    <div className="text-sm text-muted-foreground">
                      Healthy Items
                    </div>
                    <div className="text-xl font-bold text-status-success">
                      {storeInventoryData[selectedStore]?.filter(
                        (item) => item.status === "good",
                      ).length || 0}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/25 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
