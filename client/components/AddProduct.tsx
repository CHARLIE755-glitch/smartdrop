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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ShoppingCart, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function AddProduct() {
  const [sku, setSku] = useState("");
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [reorderLevel, setReorderLevel] = useState("");
  const [supplier, setSupplier] = useState("");
  const [status, setStatus] = useState("active");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleAddProduct = async () => {
    if (!sku || !productName || !category || !reorderLevel || !supplier) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("products")
        .insert([
          {
            sku,
            product_name: productName,
            category,
            reorder_level: parseInt(reorderLevel),
            supplier,
            status,
          },
        ])
        .select();

      if (error) {
        toast({
          title: "Error",
          description: "Error adding product: " + error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "Product added successfully!",
        });
        console.log("Product added:", data);

        // Reset form
        setSku("");
        setProductName("");
        setCategory("");
        setReorderLevel("");
        setSupplier("");
        setStatus("active");
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to add product. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShoppingCart className="h-5 w-5 text-walmart-blue" />
          Add New Product
        </CardTitle>
        <CardDescription>
          Add a new product to the SmartDrop inventory system
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor="productSku">SKU</Label>
            <Input
              id="productSku"
              type="text"
              placeholder="SKU-XXXXXX"
              value={sku}
              onChange={(e) => setSku(e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="productName">Product Name</Label>
            <Input
              id="productName"
              type="text"
              placeholder="Great Value Milk 1 Gal"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="productCategory">Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Dairy">Dairy</SelectItem>
                <SelectItem value="Bakery">Bakery</SelectItem>
                <SelectItem value="Beverages">Beverages</SelectItem>
                <SelectItem value="Electronics">Electronics</SelectItem>
                <SelectItem value="Household">Household</SelectItem>
                <SelectItem value="Health">Health</SelectItem>
                <SelectItem value="Grocery">Grocery</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="reorderLevel">Reorder Level</Label>
            <Input
              id="reorderLevel"
              type="number"
              placeholder="50"
              min="0"
              value={reorderLevel}
              onChange={(e) => setReorderLevel(e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="supplier">Supplier</Label>
            <Input
              id="supplier"
              type="text"
              placeholder="Supplier Company Name"
              value={supplier}
              onChange={(e) => setSupplier(e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="productStatus">Status</Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="discontinued">Discontinued</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            onClick={handleAddProduct}
            disabled={loading}
            className="w-full bg-walmart-yellow hover:bg-walmart-yellow/90 text-gray-900 font-semibold"
          >
            <Plus className="h-4 w-4 mr-2" />
            {loading ? "Adding Product..." : "Add Product"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
