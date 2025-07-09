import { useState } from "react";
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
    sku: "SD-001234",
    product: "Amul Taza Milk 1L",
    stock: 45,
    predicted: 120,
    status: "critical",
    reorderPoint: 50,
  },
  {
    sku: "SD-005678",
    product: "Britannia Bread 400g",
    stock: 78,
    predicted: 90,
    status: "low",
    reorderPoint: 75,
  },
  {
    sku: "SD-009012",
    product: "Thums Up 12pk",
    stock: 156,
    predicted: 200,
    status: "good",
    reorderPoint: 100,
  },
  {
    sku: "SD-003456",
    product: "Surf Excel Detergent 2kg",
    stock: 23,
    predicted: 85,
    status: "critical",
    reorderPoint: 40,
  },
];

const stores = [
  { id: "store-001", name: "Big Bazaar - Mumbai Central", status: "good" },
  { id: "store-002", name: "Reliance Fresh - Delhi CP", status: "warning" },
  {
    id: "store-003",
    name: "DMart - Bangalore Koramangala",
    status: "critical",
  },
];

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedStore, setSelectedStore] = useState("store-001");
  const [selectedSku, setSelectedSku] = useState("");
  const navigate = useNavigate();

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
                <div className="p-2 bg-walmart-blue rounded-xl">
                  <Package className="h-6 w-6 text-white" />
                </div>
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
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2,847</div>
                  <p className="text-xs text-muted-foreground">
                    +18% from last month
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
                  <div className="text-2xl font-bold">31</div>
                  <p className="text-xs text-muted-foreground">
                    8 critical, 23 low stock
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
                  <div className="text-2xl font-bold">91.8%</div>
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
                  <div className="text-2xl font-bold">Mumbai</div>
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
