import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ChevronUp, Plus } from "lucide-react";

export const Route = createFileRoute("/_authenticated/app/feedback")({
  component: FeedbackPage,
});

type Request = {
  id: string;
  user_id: string;
  title: string;
  description: string;
  created_at: string;
};
type Vote = { id: string; feature_request_id: string; user_id: string };

function FeedbackPage() {
  const [requests, setRequests] = useState<Request[]>([]);
  const [votes, setVotes] = useState<Vote[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [busy, setBusy] = useState(false);

  async function load() {
    const [{ data: u }, r, v] = await Promise.all([
      supabase.auth.getUser(),
      supabase.from("feature_requests").select("*"),
      supabase.from("feature_votes").select("*"),
    ]);
    setUserId(u.user?.id ?? null);
    if (r.data) setRequests(r.data as Request[]);
    if (v.data) setVotes(v.data as Vote[]);
  }

  useEffect(() => {
    load();
  }, []);

  const sorted = useMemo(() => {
    const counts = new Map<string, number>();
    votes.forEach((v) => counts.set(v.feature_request_id, (counts.get(v.feature_request_id) ?? 0) + 1));
    return [...requests].sort(
      (a, b) => (counts.get(b.id) ?? 0) - (counts.get(a.id) ?? 0) || +new Date(b.created_at) - +new Date(a.created_at),
    );
  }, [requests, votes]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !userId) return;
    setBusy(true);
    await supabase.from("feature_requests").insert({
      title: title.trim(),
      description: description.trim(),
      user_id: userId,
    });
    setTitle("");
    setDescription("");
    setBusy(false);
    load();
  }

  async function toggleVote(reqId: string) {
    if (!userId) return;
    const existing = votes.find((v) => v.feature_request_id === reqId && v.user_id === userId);
    if (existing) {
      setVotes(votes.filter((v) => v.id !== existing.id));
      await supabase.from("feature_votes").delete().eq("id", existing.id);
    } else {
      const optimistic: Vote = { id: `tmp-${Date.now()}`, feature_request_id: reqId, user_id: userId };
      setVotes([...votes, optimistic]);
      await supabase.from("feature_votes").insert({ feature_request_id: reqId, user_id: userId });
    }
    load();
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-semibold" style={{ fontFamily: "var(--font-display)" }}>
          Feature requests
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          What would make Scrye actually useful at your table? Upvote what matters or add your own.
        </p>
      </div>

      <form
        onSubmit={submit}
        className="space-y-2 rounded-2xl border border-border/60 bg-[color:var(--ink-2)]/60 p-5"
      >
        <h2 className="mb-1 text-sm font-medium uppercase tracking-wider text-muted-foreground">Suggest a feature</h2>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Short title"
          className="w-full rounded-md border border-border/70 bg-[color:var(--ink)]/60 px-3 py-2 text-sm outline-none focus:border-[color:var(--brass)]"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          placeholder="What would it do, and when would you reach for it?"
          className="w-full rounded-md border border-border/70 bg-[color:var(--ink)]/60 px-3 py-2 text-sm outline-none focus:border-[color:var(--brass)]"
        />
        <button
          type="submit"
          disabled={busy}
          className="inline-flex items-center gap-1.5 rounded-full bg-[color:var(--brass)] px-4 py-2 text-xs font-semibold text-[color:var(--ink)] hover:bg-[color:var(--brass-deep)] disabled:opacity-60"
        >
          <Plus className="h-3.5 w-3.5" /> Submit
        </button>
      </form>

      <ul className="space-y-3">
        {sorted.length === 0 && (
          <li className="text-sm text-muted-foreground">No requests yet — be the first.</li>
        )}
        {sorted.map((r) => {
          const count = votes.filter((v) => v.feature_request_id === r.id).length;
          const voted = !!votes.find((v) => v.feature_request_id === r.id && v.user_id === userId);
          return (
            <li
              key={r.id}
              className="flex gap-4 rounded-2xl border border-border/60 bg-[color:var(--ink-2)]/60 p-4"
            >
              <button
                onClick={() => toggleVote(r.id)}
                className={`flex h-16 w-14 shrink-0 flex-col items-center justify-center rounded-lg border transition ${
                  voted
                    ? "border-[color:var(--brass)]/60 bg-[color:var(--brass)]/15 text-[color:var(--brass)]"
                    : "border-border/60 text-muted-foreground hover:border-[color:var(--brass)]/40 hover:text-foreground"
                }`}
              >
                <ChevronUp className="h-4 w-4" />
                <span className="text-sm font-semibold">{count}</span>
              </button>
              <div className="min-w-0 flex-1">
                <h3 className="font-display text-lg font-semibold" style={{ fontFamily: "var(--font-display)" }}>
                  {r.title}
                </h3>
                {r.description && (
                  <p className="mt-1 text-sm text-muted-foreground">{r.description}</p>
                )}
                <p className="mt-2 text-[11px] uppercase tracking-wider text-muted-foreground/70">
                  {new Date(r.created_at).toLocaleDateString()}
                  {r.user_id === userId ? " · you" : ""}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}