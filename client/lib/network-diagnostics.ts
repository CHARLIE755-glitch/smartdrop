// Network diagnostics and fallback authentication utilities

export const networkDiagnostics = {
  // Test basic internet connectivity
  async testInternetConnection(): Promise<boolean> {
    try {
      console.log("🌐 Testing internet connection...");

      // Use a simple, reliable endpoint with timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const response = await fetch("https://www.google.com/favicon.ico", {
        method: "HEAD",
        mode: "no-cors",
        cache: "no-cache",
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      console.log("✅ Internet connection: OK");
      return true;
    } catch (error) {
      console.warn("⚠️ Internet connectivity test failed, assuming offline");
      return false;
    }
  },

  // Test if Supabase domain is reachable
  async testSupabaseReachability(url: string): Promise<boolean> {
    try {
      console.log("🔗 Testing Supabase domain reachability...");

      // Quick timeout for Supabase check
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000);

      const domain = new URL(url).hostname;
      const testUrl = `https://${domain}`;

      const response = await fetch(testUrl, {
        method: "HEAD",
        mode: "no-cors",
        cache: "no-cache",
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      console.log("✅ Supabase domain: REACHABLE");
      return true;
    } catch (error) {
      console.warn("⚠️ Supabase domain appears unreachable, using demo mode");
      return false;
    }
  },

  // Test Supabase API health endpoint
  async testSupabaseHealth(url: string): Promise<boolean> {
    try {
      console.log("🏥 Testing Supabase API health...");

      // Very quick timeout for API health check
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000);

      const healthUrl = `${url}/rest/v1/`;

      const response = await fetch(healthUrl, {
        method: "HEAD",
        headers: {
          apikey: "test",
        },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      console.log("✅ Supabase API: RESPONDING");
      return true;
    } catch (error) {
      console.warn("⚠️ Supabase API not responding, demo mode available");
      return false;
    }
  },

  // Run full diagnostic suite
  async runFullDiagnostics(supabaseUrl: string): Promise<{
    internet: boolean;
    domain: boolean;
    api: boolean;
    overall: boolean;
  }> {
    console.log("🔍 Running network diagnostics...");

    const results = {
      internet: await this.testInternetConnection(),
      domain: await this.testSupabaseReachability(supabaseUrl),
      api: await this.testSupabaseHealth(supabaseUrl),
      overall: false,
    };

    results.overall = results.internet && results.domain;

    console.log("📊 Diagnostic Results:", results);
    return results;
  },
};

// Fallback authentication for demo purposes
export const fallbackAuth = {
  // Mock user data for offline demo
  mockUser: {
    id: "demo-user-123",
    email: "demo@walle.com",
    created_at: new Date().toISOString(),
    email_confirmed_at: new Date().toISOString(),
    last_sign_in_at: new Date().toISOString(),
  },

  // Local storage session management
  setDemoSession(email: string) {
    const session = {
      user: {
        ...this.mockUser,
        email,
      },
      access_token: "demo-token",
      refresh_token: "demo-refresh",
      expires_at: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
      token_type: "bearer",
    };

    localStorage.setItem("smartdrop-demo-session", JSON.stringify(session));
    return session;
  },

  getDemoSession() {
    const stored = localStorage.getItem("smartdrop-demo-session");
    if (!stored) return null;

    try {
      const session = JSON.parse(stored);
      if (session.expires_at < Date.now()) {
        this.clearDemoSession();
        return null;
      }
      return session;
    } catch {
      this.clearDemoSession();
      return null;
    }
  },

  clearDemoSession() {
    localStorage.removeItem("smartdrop-demo-session");
  },

  // Validate demo credentials
  validateDemoCredentials(email: string, password: string): boolean {
    const validCombos = [
      { email: "admin@walmart.com", password: "password" },
      { email: "demo@smartdrop.com", password: "demo123" },
      { email: "test@example.com", password: "test123" },
    ];

    return validCombos.some(
      (combo) => combo.email === email && combo.password === password,
    );
  },
};
