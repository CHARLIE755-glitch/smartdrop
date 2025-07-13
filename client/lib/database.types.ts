// Database types for Wall-E Supabase tables

export interface Store {
  id: string;
  name: string;
  location: string;
  status: "active" | "maintenance" | "closed";
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string;
  sku: string;
  product_name: string;
  category: string;
  reorder_level: number;
  supplier: string;
  status: "active" | "discontinued";
  created_at: string;
  updated_at: string;
}

export interface Inventory {
  id: string;
  store_id: string;
  product_id: string;
  units_in_stock: number;
  last_restocked: string;
  status: "good" | "low" | "critical";
  created_at: string;
  updated_at: string;
}

export interface DemandForecast {
  id: string;
  store_id: string;
  product_id: string;
  predicted_demand: number;
  forecast_date: string;
  accuracy_score: number;
  created_at: string;
}

// Database schema type
export interface Database {
  public: {
    Tables: {
      stores: {
        Row: Store;
        Insert: Omit<Store, "id" | "created_at" | "updated_at">;
        Update: Partial<Omit<Store, "id" | "created_at" | "updated_at">>;
      };
      products: {
        Row: Product;
        Insert: Omit<Product, "id" | "created_at" | "updated_at">;
        Update: Partial<Omit<Product, "id" | "created_at" | "updated_at">>;
      };
      inventory: {
        Row: Inventory;
        Insert: Omit<Inventory, "id" | "created_at" | "updated_at">;
        Update: Partial<Omit<Inventory, "id" | "created_at" | "updated_at">>;
      };
      demand_forecasts: {
        Row: DemandForecast;
        Insert: Omit<DemandForecast, "id" | "created_at">;
        Update: Partial<Omit<DemandForecast, "id" | "created_at">>;
      };
    };
  };
}
