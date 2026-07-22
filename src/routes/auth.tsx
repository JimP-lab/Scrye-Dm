import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in — Scrye" },
      { name: "description", content: "Sign in or create a Scrye account." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/app" });
    });
  }, [navigate]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      const fn =
        mode === "login"
          ? supabase.auth.signInWithPassword({ email, password })
          : supabase.auth.signUp({ email, password });
      const { error } = await fn;
      if (error) throw error;
      navigate({ to: "/app" });
    } catch (err) {
      setError((err as Error).message ?? "Something went wrong.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-5 py-16">
      <div className="w-full max-w-md">
        <div className="mb-6 text-center">
          <Link to="/" className="font-display text-3xl font-semibold" style={{ fontFamily: "var(--font-display)" }}>
            Scrye
          </Link>
        </div>
        <div className="rounded-2xl border border-border/60 bg-[color:var(--ink-2)]/60 p-6 shadow-xl">
          <div className="mb-5 flex gap-2 rounded-full border border-border/60 p-1 text-sm">
            {(["login", "signup"] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMode(m)}
                className={`flex-1 rounded-full px-3 py-1.5 transition ${
                  mode === m
                    ? "bg-[color:var(--brass)]/20 text-[color:var(--brass)]"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {m === "login" ? "Log in" : "Sign up"}
              </button>
            ))}
          </div>
          <form onSubmit={onSubmit} className="space-y-4">
            <label className="block text-sm">
              <span className="mb-1 block text-muted-foreground">Email</span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-md border border-border/70 bg-[color:var(--ink)]/60 px-3 py-2 outline-none focus:border-[color:var(--brass)]"
              />
            </label>
            <label className="block text-sm">
              <span className="mb-1 block text-muted-foreground">Password</span>
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-md border border-border/70 bg-[color:var(--ink)]/60 px-3 py-2 outline-none focus:border-[color:var(--brass)]"
              />
            </label>
            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}
            <button
              type="submit"
              disabled={busy}
              className="w-full rounded-full bg-[color:var(--brass)] px-4 py-2.5 text-sm font-semibold text-[color:var(--ink)] transition hover:bg-[color:var(--brass-deep)] disabled:opacity-60"
            >
              {busy ? "Working…" : mode === "login" ? "Log in" : "Create account"}
            </button>
          </form>
        </div>
        <p className="mt-4 text-center text-xs text-muted-foreground">
          <Link to="/" className="hover:text-foreground">← Back to home</Link>
        </p>
      </div>
    </div>
  );
}