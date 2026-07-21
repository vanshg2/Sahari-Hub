"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { Lock, Mail } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await login(email, password);
      router.push("/admin");
    } catch (err: unknown) {
      setError((err as Error).message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-container-low px-4">
      <div className="w-full max-w-md">
        <div className="bg-background border border-surface-container rounded-xl shadow-sm p-8">
          <div className="text-center mb-8">
            <h1 className="font-display-lg-mobile text-primary mb-2">Sahari Admin</h1>
            <p className="font-body-md text-on-surface-variant">Sign in to the admin panel</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label className="font-label-sm uppercase tracking-widest text-on-surface-variant">Email</label>
              <div className="relative">
                <Mail className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="admin@saharihub.com"
                  className="w-full pl-10 pr-4 py-3 bg-surface-container-low border border-outline-variant/30 rounded-md font-body-md text-primary focus:outline-none focus:border-muted-gold transition-colors"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-label-sm uppercase tracking-widest text-on-surface-variant">Password</label>
              <div className="relative">
                <Lock className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-4 py-3 bg-surface-container-low border border-outline-variant/30 rounded-md font-body-md text-primary focus:outline-none focus:border-muted-gold transition-colors"
                />
              </div>
            </div>

            {error && (
              <p className="text-error font-body-md text-sm">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white font-label-md uppercase tracking-widest py-3 hover:bg-secondary transition-colors shadow-sm disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
