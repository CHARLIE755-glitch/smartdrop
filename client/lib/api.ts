import { supabase } from "./supabase";
import type { Store, Product, Inventory } from "./database.types";

// Store operations
export const storeAPI = {
  // Get all stores
  async getStores() {
    const { data, error } = await supabase
      .from("stores")
      .select("*")
      .order("name");

    if (error) throw error;
    return data;
  },

  // Get single store
  async getStore(id: string) {
    const { data, error } = await supabase
      .from("stores")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  },

  // Create store
  async createStore(store: Omit<Store, "id" | "created_at" | "updated_at">) {
    const { data, error } = await supabase
      .from("stores")
      .insert(store)
      .select()
      .single();

    if (error) throw error;
    return data;
  },
};

// Product operations
export const productAPI = {
  // Get all products
  async getProducts() {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("product_name");

    if (error) throw error;
    return data;
  },

  // Get products by category
  async getProductsByCategory(category: string) {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("category", category)
      .order("product_name");

    if (error) throw error;
    return data;
  },
};

// Inventory operations
export const inventoryAPI = {
  // Get inventory for a specific store
  async getStoreInventory(storeId: string) {
    const { data, error } = await supabase
      .from("inventory")
      .select(
        `
        *,
        products (
          sku,
          product_name,
          category,
          reorder_level,
          supplier
        ),
        stores (
          name,
          location
        )
      `,
      )
      .eq("store_id", storeId);

    if (error) throw error;
    return data;
  },

  // Get low stock items across all stores
  async getLowStockItems() {
    const { data, error } = await supabase
      .from("inventory")
      .select(
        `
        *,
        products (
          sku,
          product_name,
          category,
          reorder_level
        ),
        stores (
          name,
          location
        )
      `,
      )
      .in("status", ["low", "critical"])
      .order("units_in_stock");

    if (error) throw error;
    return data;
  },

  // Update inventory stock
  async updateStock(inventoryId: string, newStock: number) {
    const { data, error } = await supabase
      .from("inventory")
      .update({
        units_in_stock: newStock,
        updated_at: new Date().toISOString(),
      })
      .eq("id", inventoryId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },
};

// Demand forecast operations
export const forecastAPI = {
  // Get demand forecasts for a store
  async getStoreForecast(storeId: string, days: number = 30) {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + days);

    const { data, error } = await supabase
      .from("demand_forecasts")
      .select(
        `
        *,
        products (
          sku,
          product_name,
          category
        )
      `,
      )
      .eq("store_id", storeId)
      .lte("forecast_date", futureDate.toISOString())
      .order("forecast_date");

    if (error) throw error;
    return data;
  },
};

// Authentication helpers
export const authAPI = {
  // Sign in user
  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    return data;
  },

  // Sign out user
  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  // Get current user
  async getCurrentUser() {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    return user;
  },
};
