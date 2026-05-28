"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (res.ok) {
        // Success! Redirect to homepage
        router.push("/#projects");
        router.refresh(); // Refresh the router so Server Components reload auth state
      } else {
        setError(data.error || "Invalid password");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-main)] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--color-primary-red)] rounded-full blur-[150px] opacity-10 pointer-events-none"></div>

      <div className="absolute top-8 left-8 z-20">
        <Link 
          href="/" 
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--border-main)] hover:border-[var(--color-primary-red)] hover:text-[var(--color-primary-red)] transition-colors duration-300 font-semibold bg-[var(--bg-card)]"
        >
          <ArrowLeft size={18} />
          Back to Home
        </Link>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-[var(--bg-card)] border border-[var(--border-main)] rounded-[2rem] p-10 shadow-2xl relative z-10"
      >
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-full bg-[var(--bg-hover)] border border-[var(--border-main)] flex items-center justify-center text-[var(--color-primary-red)] mb-6 shadow-inner">
            <Lock size={28} />
          </div>
          <h1 className="text-3xl font-bold font-[var(--font-display)] text-[var(--text-strong)] text-center">
            Admin Access
          </h1>
          <p className="text-[var(--text-muted)] text-center mt-2">
            Enter the admin password to edit your portfolio.
          </p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-6">
          <div className="form-control w-full">
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password..."
              className="input w-full bg-[var(--bg-main)] border-[var(--border-main)] text-[var(--text-strong)] focus:border-[var(--color-primary-red)] focus:outline-none transition-colors h-14 rounded-xl px-6 text-center text-lg tracking-widest"
              required
              disabled={loading}
            />
          </div>

          {error && (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 text-sm font-semibold text-center"
            >
              {error}
            </motion.p>
          )}

          <button 
            type="submit"
            disabled={loading || !password}
            className="btn w-full h-14 rounded-xl bg-[var(--color-primary-red)] text-white hover:bg-[var(--text-strong)] border-none font-bold text-lg shadow-[0_4px_20px_rgba(200,16,46,0.4)] hover:shadow-[0_6px_25px_rgba(0,0,0,0.3)] disabled:shadow-none disabled:bg-[var(--bg-hover)] disabled:text-[var(--text-muted)] transition-all duration-300"
          >
            {loading ? <Loader2 className="animate-spin" size={24} /> : "Unlock Dashboard"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
