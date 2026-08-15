"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase-client";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push("/");
      router.refresh();
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-[#020617] text-[#F8FAFC]"
      suppressHydrationWarning
    >
      <div
        className="p-8 bg-white/[0.02] backdrop-blur-2xl border border-white/10 shadow-2xl rounded-2xl w-full max-w-md animate-fade-in"
        suppressHydrationWarning
      >
        <div className="mb-10">
          <h1 className="text-3xl font-semibold mb-2 text-center tracking-tight">
            Admin Portal
          </h1>
          <p className="text-[#94A3B8] text-center text-sm">
            Sign in to manage your portfolio
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-xs font-medium uppercase tracking-widest text-[#94A3B8]">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              className="w-full px-4 py-3 bg-[#020617] border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/50 transition-all placeholder:text-slate-700 text-[#F8FAFC] shadow-inner"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="block text-xs font-medium uppercase tracking-widest text-[#94A3B8]">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-[#020617] border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/50 transition-all placeholder:text-slate-700 text-[#F8FAFC] shadow-inner"
              required
            />
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-3 rounded-lg animate-in fade-in zoom-in-95">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold py-3 rounded-xl hover:opacity-95 active:scale-[0.98] disabled:opacity-50 transition-all shadow-lg shadow-indigo-500/20 group"
          >
            {loading ? (
              <>
                <div className="spinner" />
                <span>Authenticating...</span>
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
