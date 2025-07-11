import { createClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables");
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Helper functions for common operations
export const auth = supabase.auth;
export const db = supabase;

// Type definitions for better TypeScript support
export type { User } from "@supabase/supabase-js";
export type {
  Database,
  Store,
  Product,
  Inventory,
  DemandForecast,
} from "./database.types";
