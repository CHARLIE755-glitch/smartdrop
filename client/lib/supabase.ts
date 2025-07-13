import { createClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Debug environment variables
console.log("🔧 Supabase Configuration Check:");
console.log("URL exists:", !!supabaseUrl);
console.log("Key exists:", !!supabaseAnonKey);
console.log("Full URL:", supabaseUrl);

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("❌ Missing Supabase environment variables:");
  console.error(
    "VITE_SUPABASE_URL:",
    supabaseUrl ? "✅ Present" : "❌ Missing",
  );
  console.error(
    "VITE_SUPABASE_ANON_KEY:",
    supabaseAnonKey ? "✅ Present" : "❌ Missing",
  );
  throw new Error(
    "Missing Supabase environment variables. Please check your .env file.",
  );
}

// Validate URL format
try {
  new URL(supabaseUrl);
  console.log("✅ URL format is valid");
} catch (error) {
  console.error("❌ Invalid URL format:", supabaseUrl);
  throw new Error("Invalid Supabase URL format");
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});

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
