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
import { Building2, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function AddStore() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("active");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleAddStore = async () => {
    if (!name || !location) {
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
        .from("stores")
        .insert([
          {
            name,
            location,
            status,
          },
        ])
        .select();

      if (error) {
        toast({
          title: "Error",
          description: "Error adding store: " + error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "Store added successfully!",
        });
        console.log("Store added:", data);

        // Reset form
        setName("");
        setLocation("");
        setStatus("active");
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to add store. Please try again.",
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
          <Building2 className="h-5 w-5 text-walmart-blue" />
          Add New Store
        </CardTitle>
        <CardDescription>
          Add a new store location to the SmartDrop system
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor="storeName">Store Name</Label>
            <Input
              id="storeName"
              type="text"
              placeholder="Walmart Supercenter - City"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="storeLocation">Location</Label>
            <Input
              id="storeLocation"
              type="text"
              placeholder="City, State"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="storeStatus">Status</Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            onClick={handleAddStore}
            disabled={loading}
            className="w-full bg-walmart-blue hover:bg-walmart-dark text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            {loading ? "Adding Store..." : "Add Store"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
