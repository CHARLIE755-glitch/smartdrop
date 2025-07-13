import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  BarChart3,
  Settings,
  TrendingUp,
  Plus,
  Search,
  Edit,
  Trash2,
  Save,
  Building2,
  ShoppingCart,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

// Mock data
const stores = [
  {
    id: "store-001",
    name: "Walmart Supercenter - Dallas TX",
    location: "Dallas, Texas",
    status: "Active",
  },
  {
    id: "store-002",
    name: "Walmart Supercenter - Houston TX",
    location: "Houston, Texas",
    status: "Active",
  },
  {
    id: "store-003",
    name: "Walmart Supercenter - San Jose CA",
    location: "San Jose, California",
    status: "Maintenance",
  },
];

const products = [
  {
    sku: "SKU-001234",
    name: "Great Value Milk 1 Gal",
    category: "Dairy",
    reorderLevel: 50,
    status: "Active",
    perishable: true,
  },
  {
    sku: "SKU-005678",
    name: "Wonder Bread Loaf",
    category: "Bakery",
    reorderLevel: 75,
    status: "Active",
    perishable: true,
  },
  {
    sku: "SKU-009012",
    name: "Coca-Cola 12pk",
    category: "Beverages",
    reorderLevel: 100,
    status: "Active",
    perishable: false,
  },
  {
    sku: "SKU-003456",
    name: "Tide Detergent 150oz",
    category: "Household",
    reorderLevel: 40,
    status: "Discontinued",
    perishable: false,
  },
  {
    sku: "SKU-007890",
    name: "Fresh Bananas 3lb",
    category: "Produce",
    reorderLevel: 200,
    status: "Active",
    perishable: true,
  },
  {
    sku: "SKU-004567",
    name: "iPhone Charger Cable",
    category: "Electronics",
    reorderLevel: 25,
    status: "Active",
    perishable: false,
  },
];

export default function Admin() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("stores");
  const [perishableFilter, setPerishableFilter] = useState("all");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-status-success text-white";
      case "Maintenance":
        return "bg-status-warning text-white";
      case "Discontinued":
        return "bg-status-danger text-white";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

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
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-500 hover:text-walmart-blue hover:bg-walmart-light rounded-lg transition-colors"
              >
                <TrendingUp className="h-4 w-4" />
                Forecast
              </Link>
              <Link
                to="/admin"
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-walmart-blue bg-walmart-light rounded-lg"
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
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground">
            Manage stores, products, and inventory settings
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:w-fit">
            <TabsTrigger value="stores" className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              Stores
            </TabsTrigger>
            <TabsTrigger value="products" className="flex items-center gap-2">
              <ShoppingCart className="h-4 w-4" />
              Products
            </TabsTrigger>
          </TabsList>

          <TabsContent value="stores" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Store Management</CardTitle>
                    <CardDescription>
                      Add, edit, and manage store locations
                    </CardDescription>
                  </div>
                  <Button className="bg-walmart-blue hover:bg-walmart-dark text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Store
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search stores..." className="pl-10" />
                  </div>
                </div>

                <div className="border border-border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Store ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {stores.map((store) => (
                        <TableRow key={store.id}>
                          <TableCell className="font-mono text-sm">
                            {store.id}
                          </TableCell>
                          <TableCell className="font-medium">
                            {store.name}
                          </TableCell>
                          <TableCell>{store.location}</TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(store.status)}>
                              {store.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center gap-2 justify-end">
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-destructive hover:text-destructive"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            {/* Add Store Form */}
            <Card>
              <CardHeader>
                <CardTitle>Add New Store</CardTitle>
                <CardDescription>
                  Enter store details to add to the system
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="storeName">Store Name</Label>
                    <Input
                      id="storeName"
                      placeholder="Walmart Supercenter - City"
                    />
                  </div>
                  <div>
                    <Label htmlFor="storeLocation">Location</Label>
                    <Input id="storeLocation" placeholder="City, State" />
                  </div>
                  <div>
                    <Label htmlFor="storeId">Store ID</Label>
                    <Input id="storeId" placeholder="store-xxx" />
                  </div>
                  <div className="flex items-end">
                    <Button className="bg-walmart-yellow hover:bg-walmart-yellow/90 text-gray-900 font-semibold">
                      <Save className="h-4 w-4 mr-2" />
                      Save Store
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="products" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Product Management</CardTitle>
                    <CardDescription>
                      Manage SKUs, categories, and reorder levels
                    </CardDescription>
                  </div>
                  <Button className="bg-walmart-blue hover:bg-walmart-dark text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Product
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {/* Enhanced Filters */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search products..." className="pl-10" />
                  </div>

                  <Select
                    value={perishableFilter}
                    onValueChange={setPerishableFilter}
                  >
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Filter by type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Products</SelectItem>
                      <SelectItem value="perishable">
                        🟢 Perishable Only
                      </SelectItem>
                      <SelectItem value="non-perishable">
                        🔵 Non-Perishable Only
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="border border-border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>SKU</TableHead>
                        <TableHead>Product Name</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Reorder Level</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {products
                        .filter((product) => {
                          if (perishableFilter === "perishable")
                            return product.perishable;
                          if (perishableFilter === "non-perishable")
                            return !product.perishable;
                          return true;
                        })
                        .map((product) => (
                          <TableRow key={product.sku}>
                            <TableCell className="font-mono text-sm">
                              {product.sku}
                            </TableCell>
                            <TableCell className="font-medium">
                              {product.name}
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline" className="font-medium">
                                {product.category}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge
                                className={`${
                                  product.perishable
                                    ? "bg-green-100 text-green-800 border-green-200"
                                    : "bg-blue-100 text-blue-800 border-blue-200"
                                } font-medium`}
                              >
                                {product.perishable
                                  ? "🟢 Perishable"
                                  : "🔵 Non-Perishable"}
                              </Badge>
                            </TableCell>
                            <TableCell className="font-medium">
                              {product.reorderLevel}
                            </TableCell>
                            <TableCell>
                              <Badge className={getStatusColor(product.status)}>
                                {product.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex items-center gap-2 justify-end">
                                <Button variant="ghost" size="sm">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-destructive hover:text-destructive"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Filter Summary */}
                <div className="mt-4 flex items-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span>
                      Perishable: {products.filter((p) => p.perishable).length}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span>
                      Non-Perishable:{" "}
                      {products.filter((p) => !p.perishable).length}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>Total Products: {products.length}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Add Product Form */}
            <Card>
              <CardHeader>
                <CardTitle>Add New Product</CardTitle>
                <CardDescription>
                  Enter product details and inventory settings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="productSku">SKU</Label>
                    <Input id="productSku" placeholder="SKU-XXXXXX" />
                  </div>
                  <div>
                    <Label htmlFor="productName">Product Name</Label>
                    <Input id="productName" placeholder="Product name" />
                  </div>
                  <div>
                    <Label htmlFor="productCategory">Category</Label>
                    <Input id="productCategory" placeholder="Category" />
                  </div>
                  <div>
                    <Label htmlFor="reorderLevel">Reorder Level</Label>
                    <Input
                      id="reorderLevel"
                      type="number"
                      placeholder="50"
                      min="0"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Button className="bg-walmart-yellow hover:bg-walmart-yellow/90 text-gray-900 font-semibold">
                      <Save className="h-4 w-4 mr-2" />
                      Save Product
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
