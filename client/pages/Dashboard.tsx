import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Package,
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
  },
  {
    sku: "SKU-005678",
    product: "Wonder Bread Loaf",
    stock: 78,
    predicted: 90,
    status: "low",
    reorderPoint: 75,
  },
  {
    sku: "SKU-009012",
    product: "Coca-Cola 12pk",
    stock: 156,
    predicted: 200,
    status: "good",
    reorderPoint: 100,
  },
  {
    sku: "SKU-003456",
    product: "Tide Detergent 150oz",
    stock: 23,
    predicted: 85,
    status: "critical",
    reorderPoint: 40,
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

      <div className="flex">
        {/* Sidebar */}
        <div
          className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-border transform ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
        >
          <div className="flex items-center justify-between h-16 px-4 border-b border-border lg:hidden">
            <span className="text-lg font-semibold">Filters</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="p-6 space-y-6">
            <div>
              <Label className="text-sm font-medium text-foreground mb-3 block">
                Store Selection
              </Label>
              <Select value={selectedStore} onValueChange={setSelectedStore}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select store" />
                </SelectTrigger>
                <SelectContent>
                  {stores.map((store) => (
                    <SelectItem key={store.id} value={store.id}>
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            store.status === "good"
                              ? "bg-status-success"
                              : store.status === "warning"
                                ? "bg-status-warning"
                                : "bg-status-danger"
                          }`}
                        />
                        {store.name}
                      </div>
                    </SelectItem>
                  ))}
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
                  value={selectedSku}
                  onChange={(e) => setSelectedSku(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium text-foreground mb-3 block">
                Date Range
              </Label>
              <div className="space-y-2">
                <div className="flex items-center gap-2 p-3 border border-border rounded-lg cursor-pointer hover:bg-muted/50">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Last 30 days</span>
                  <ChevronDown className="h-4 w-4 text-muted-foreground ml-auto" />
                </div>
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

            {/* Reorder Table */}
            <Card>
              <CardHeader>
                <CardTitle>Reorder Recommendations</CardTitle>
                <CardDescription>
                  Products requiring immediate attention based on AI predictions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left p-4 font-medium text-muted-foreground">
                          SKU
                        </th>
                        <th className="text-left p-4 font-medium text-muted-foreground">
                          Product
                        </th>
                        <th className="text-left p-4 font-medium text-muted-foreground">
                          Current Stock
                        </th>
                        <th className="text-left p-4 font-medium text-muted-foreground">
                          Predicted Demand
                        </th>
                        <th className="text-left p-4 font-medium text-muted-foreground">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {reorderData.map((item) => (
                        <tr
                          key={item.sku}
                          className="border-b border-border hover:bg-muted/50 transition-colors"
                        >
                          <td className="p-4 font-mono text-sm">{item.sku}</td>
                          <td className="p-4 font-medium">{item.product}</td>
                          <td className="p-4">
                            <span
                              className={`font-semibold ${
                                item.stock < item.reorderPoint
                                  ? "text-status-danger"
                                  : "text-foreground"
                              }`}
                            >
                              {item.stock}
                            </span>
                          </td>
                          <td className="p-4">{item.predicted}</td>
                          <td className="p-4">
                            <Badge
                              className={`${getStatusColor(
                                item.status,
                              )} flex items-center gap-1 w-fit`}
                            >
                              {getStatusIcon(item.status)}
                              {item.status}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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
