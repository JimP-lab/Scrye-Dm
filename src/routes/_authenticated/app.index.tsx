import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Plus, BookOpen } from "lucide-react";

export const Route = createFileRoute("/_authenticated/app/")({
  component: Dashboard,
});

type Campaign = {
  id: string;
  name: string;
  system: string;
  foundry_connected: boolean;
  created_at: string;
};

function Dashboard() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [system, setSystem] = useState("D&D 5e");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    const { data, error } = await supabase
      .from("campaigns")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error && data) setCampaigns(data as Campaign[]);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function createCampaign(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    setBusy(true);
    setError(null);
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) {
      setError("Not signed in");
      setBusy(false);
      return;
    }
    const { error } = await supabase.from("campaigns").insert({
      name: name.trim(),
      system,
      user_id: userData.user.id,
    });
    setBusy(false);
    if (error) {
      setError(error.message);
      return;
    }
    setName("");
    load();
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-semibold" style={{ fontFamily: "var(--font-display)" }}>
          Your campaigns
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Pick up where you left off, or spin up a new one.
        </p>
      </div>

      <div className="rounded-2xl border border-border/60 bg-[color:var(--ink-2)]/60 p-5">
        <h2 className="mb-3 text-sm font-medium uppercase tracking-wider text-muted-foreground">New campaign</h2>
        <form onSubmit={createCampaign} className="flex flex-col gap-3 sm:flex-row">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Campaign name"
            className="flex-1 rounded-md border border-border/70 bg-[color:var(--ink)]/60 px-3 py-2 text-sm outline-none focus:border-[color:var(--brass)]"
          />
          <select
            value={system}
            onChange={(e) => setSystem(e.target.value)}
            className="rounded-md border border-border/70 bg-[color:var(--ink)]/60 px-3 py-2 text-sm outline-none focus:border-[color:var(--brass)]"
          >
            <option>D&D 5e</option>
            <option>Pathfinder 2e</option>
            <option>Call of Cthulhu</option>
            <option>Other</option>
          </select>
          <button
            type="submit"
            disabled={busy}
            className="inline-flex items-center gap-1.5 rounded-full bg-[color:var(--brass)] px-4 py-2 text-sm font-semibold text-[color:var(--ink)] hover:bg-[color:var(--brass-deep)] disabled:opacity-60"
          >
            <Plus className="h-4 w-4" /> Create
          </button>
        </form>
        {error && <p className="mt-2 text-xs text-destructive">{error}</p>}
      </div>

      {loading ? (
        <p className="text-sm text-muted-foreground">Loading…</p>
      ) : campaigns.length === 0 ? (
        <p className="text-sm text-muted-foreground">No campaigns yet. Create one above to get started.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {campaigns.map((c) => (
            <Link
              key={c.id}
              to="/app/campaigns/$id"
              params={{ id: c.id }}
              className="group rounded-2xl border border-border/60 bg-[color:var(--ink-2)]/60 p-5 transition hover:border-[color:var(--brass)]/60 hover:bg-[color:var(--ink-3)]/40"
            >
              <div className="flex items-start justify-between">
                <BookOpen className="h-5 w-5 text-[color:var(--brass)]" />
                {c.foundry_connected && (
                  <span className="rounded-full border border-[color:var(--sage)]/40 bg-[color:var(--sage)]/10 px-2 py-0.5 text-[10px] uppercase tracking-wider text-[color:var(--sage)]">
                    Foundry
                  </span>
                )}
              </div>
              <h3 className="mt-3 font-display text-lg font-semibold" style={{ fontFamily: "var(--font-display)" }}>
                {c.name}
              </h3>
              <p className="mt-1 text-xs text-muted-foreground">{c.system}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}