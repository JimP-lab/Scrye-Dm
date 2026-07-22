import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, Check, FileText, Plus, Sparkles, Swords, Users, Wand2 } from "lucide-react";

export const Route = createFileRoute("/_authenticated/app/campaigns/$id")({
  component: CampaignView,
});

type Campaign = {
  id: string;
  name: string;
  system: string;
  foundry_connected: boolean;
};
type Source = {
  id: string;
  title: string;
  type: "note" | "canon" | "npc" | "session";
  content: string;
  created_at: string;
};
type Generated = {
  id: string;
  kind: "npc" | "encounter" | "scene";
  title: string;
  content: string;
  source_id: string | null;
  created_at: string;
};

const NPC_NAMES = ["Bram Holloway", "Old Nera", "Sister Vex", "Corvin Ashe", "Wynn Duskwater", "Halden Grie"];
const NPC_TRAITS = ["speaks in riddles", "won't stop humming", "flinches at loud noises", "always chewing something", "counts coins mid-conversation"];
const NPC_HOOKS = ["knows something the party needs but won't say why", "wants a favor that seems small and isn't", "recognizes one of the PCs from somewhere they shouldn't"];
const ENCOUNTERS = [
  { title: "Roadside ambush", body: "3× bandit scouts (CR 1/8), 1× bandit captain (CR 2). Terrain: fallen tree providing half cover along the north edge." },
  { title: "Ruined shrine", body: "2× shadows (CR 1/2), 1× specter (CR 1). Room is 30ft square, altar in center; dim light only." },
  { title: "Sewer skirmish", body: "6× giant rats (CR 1/8), 1× swarm of insects (CR 1/2). Difficult terrain from knee-deep sludge." },
];
const SCENES = [
  { title: "The tavern the morning after", body: "Smoke still clinging. The barkeep is short with everyone. One patron is very obviously waiting for the PCs." },
  { title: "Meeting in the back room", body: "A cramped office. Ledgers everywhere. Whoever they came to see is already writing something and doesn't look up." },
  { title: "Ruin at dusk", body: "Wind through broken stone. Something moves at the edge of the torchlight but doesn't approach. Yet." },
];

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function CampaignView() {
  const { id } = useParams({ from: "/_authenticated/app/campaigns/$id" });
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [sources, setSources] = useState<Source[]>([]);
  const [generated, setGenerated] = useState<Generated[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const [c, s, g] = await Promise.all([
      supabase.from("campaigns").select("*").eq("id", id).maybeSingle(),
      supabase.from("sources").select("*").eq("campaign_id", id).order("created_at", { ascending: false }),
      supabase.from("generated_items").select("*").eq("campaign_id", id).order("created_at", { ascending: false }),
    ]);
    if (c.data) setCampaign(c.data as Campaign);
    if (s.data) setSources(s.data as Source[]);
    if (g.data) setGenerated(g.data as Generated[]);
    setLoading(false);
  }, [id]);

  useEffect(() => {
    load();
  }, [load]);

  async function toggleFoundry() {
    if (!campaign) return;
    const next = !campaign.foundry_connected;
    setCampaign({ ...campaign, foundry_connected: next });
    await supabase.from("campaigns").update({ foundry_connected: next }).eq("id", campaign.id);
  }

  if (loading) return <p className="text-sm text-muted-foreground">Loading…</p>;
  if (!campaign) return <p className="text-sm text-muted-foreground">Campaign not found.</p>;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <Link to="/app" className="mb-2 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-3 w-3" /> All campaigns
          </Link>
          <h1 className="font-display text-3xl font-semibold" style={{ fontFamily: "var(--font-display)" }}>
            {campaign.name}
          </h1>
          <p className="mt-1 text-xs text-muted-foreground">{campaign.system}</p>
        </div>
        <FoundryToggle connected={campaign.foundry_connected} onToggle={toggleFoundry} />
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
        <SourcesPanel campaignId={id} sources={sources} onChange={load} />
        <GeneratePanel campaignId={id} sources={sources} generated={generated} onChange={load} />
      </div>
    </div>
  );
}

function FoundryToggle({ connected, onToggle }: { connected: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs transition ${
        connected
          ? "border-[color:var(--sage)]/50 bg-[color:var(--sage)]/10 text-[color:var(--sage)]"
          : "border-border/60 text-muted-foreground hover:border-[color:var(--brass)]/50"
      }`}
    >
      {connected ? <Check className="h-3.5 w-3.5" /> : <span className="h-2 w-2 rounded-full bg-muted-foreground" />}
      {connected ? "Connected to Foundry" : "Connect to Foundry"}
    </button>
  );
}

function SourcesPanel({
  campaignId,
  sources,
  onChange,
}: {
  campaignId: string;
  sources: Source[];
  onChange: () => void;
}) {
  const [title, setTitle] = useState("");
  const [type, setType] = useState<Source["type"]>("note");
  const [content, setContent] = useState("");
  const [busy, setBusy] = useState(false);

  async function add(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    setBusy(true);
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) return;
    await supabase.from("sources").insert({
      campaign_id: campaignId,
      user_id: userData.user.id,
      title: title.trim(),
      content,
      type,
    });
    setTitle("");
    setContent("");
    setType("note");
    setBusy(false);
    onChange();
  }

  return (
    <section className="rounded-2xl border border-border/60 bg-[color:var(--ink-2)]/60 p-5">
      <h2 className="mb-4 flex items-center gap-2 text-sm font-medium uppercase tracking-wider text-muted-foreground">
        <FileText className="h-4 w-4" /> Sources
      </h2>
      <ul className="mb-5 space-y-1.5 text-sm">
        {sources.length === 0 && (
          <li className="text-xs text-muted-foreground">No sources yet. Drop your first note in below.</li>
        )}
        {sources.map((s) => (
          <li
            key={s.id}
            className="flex items-center justify-between rounded-md border border-border/40 bg-[color:var(--ink)]/40 px-3 py-2"
          >
            <span className="truncate">{s.title}</span>
            <span className="ml-2 rounded-full border border-border/50 px-2 py-0.5 text-[10px] uppercase tracking-wider text-muted-foreground">
              {s.type}
            </span>
          </li>
        ))}
      </ul>
      <form onSubmit={add} className="space-y-2">
        <div className="flex gap-2">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="flex-1 rounded-md border border-border/70 bg-[color:var(--ink)]/60 px-3 py-2 text-sm outline-none focus:border-[color:var(--brass)]"
          />
          <select
            value={type}
            onChange={(e) => setType(e.target.value as Source["type"])}
            className="rounded-md border border-border/70 bg-[color:var(--ink)]/60 px-2 py-2 text-sm outline-none focus:border-[color:var(--brass)]"
          >
            <option value="note">note</option>
            <option value="canon">canon</option>
            <option value="npc">npc</option>
            <option value="session">session</option>
          </select>
        </div>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={3}
          placeholder="Rough notes, backstory, session log…"
          className="w-full rounded-md border border-border/70 bg-[color:var(--ink)]/60 px-3 py-2 text-sm outline-none focus:border-[color:var(--brass)]"
        />
        <button
          type="submit"
          disabled={busy}
          className="inline-flex items-center gap-1.5 rounded-full border border-[color:var(--brass)]/40 bg-[color:var(--brass)]/10 px-3 py-1.5 text-xs font-medium text-[color:var(--brass)] hover:bg-[color:var(--brass)]/20 disabled:opacity-60"
        >
          <Plus className="h-3.5 w-3.5" /> Add source
        </button>
      </form>
    </section>
  );
}

function GeneratePanel({
  campaignId,
  sources,
  generated,
  onChange,
}: {
  campaignId: string;
  sources: Source[];
  generated: Generated[];
  onChange: () => void;
}) {
  const [sourceId, setSourceId] = useState<string>("");
  const [busy, setBusy] = useState(false);

  async function generate(kind: Generated["kind"]) {
    setBusy(true);
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) return;
    const source = sources.find((s) => s.id === sourceId) ?? null;
    let title = "";
    let content = "";
    if (kind === "npc") {
      title = pick(NPC_NAMES);
      content = `${title} — ${pick(NPC_TRAITS)}. Hook: ${pick(NPC_HOOKS)}.${source ? `\n\nFrom source: “${source.title}”.` : ""}`;
    } else if (kind === "encounter") {
      const e = pick(ENCOUNTERS);
      title = e.title;
      content = `${e.body}${source ? `\n\nSeeded from: “${source.title}”.` : ""}`;
    } else {
      const sc = pick(SCENES);
      title = sc.title;
      content = `${sc.body}${source ? `\n\nGrounded in: “${source.title}”.` : ""}`;
    }
    await supabase.from("generated_items").insert({
      campaign_id: campaignId,
      user_id: userData.user.id,
      source_id: source?.id ?? null,
      kind,
      title,
      content,
    });
    setBusy(false);
    onChange();
  }

  const groups: { kind: Generated["kind"]; label: string; icon: React.ReactNode }[] = [
    { kind: "npc", label: "NPCs", icon: <Users className="h-4 w-4" /> },
    { kind: "encounter", label: "Encounters", icon: <Swords className="h-4 w-4" /> },
    { kind: "scene", label: "Scenes", icon: <Sparkles className="h-4 w-4" /> },
  ];

  return (
    <section className="rounded-2xl border border-border/60 bg-[color:var(--ink-2)]/60 p-5">
      <h2 className="mb-4 flex items-center gap-2 text-sm font-medium uppercase tracking-wider text-muted-foreground">
        <Wand2 className="h-4 w-4" /> Generate
      </h2>
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <select
          value={sourceId}
          onChange={(e) => setSourceId(e.target.value)}
          className="rounded-md border border-border/70 bg-[color:var(--ink)]/60 px-2 py-2 text-sm outline-none focus:border-[color:var(--brass)]"
        >
          <option value="">No source (freeform)</option>
          {sources.map((s) => (
            <option key={s.id} value={s.id}>{s.title}</option>
          ))}
        </select>
        {groups.map((g) => (
          <button
            key={g.kind}
            disabled={busy}
            onClick={() => generate(g.kind)}
            className="inline-flex items-center gap-1.5 rounded-full border border-[color:var(--brass)]/40 bg-[color:var(--brass)]/10 px-3 py-1.5 text-xs font-medium text-[color:var(--brass)] hover:bg-[color:var(--brass)]/20 disabled:opacity-60"
          >
            {g.icon} {g.label.replace(/s$/, "")}
          </button>
        ))}
      </div>

      <div className="space-y-5">
        {groups.map((g) => {
          const items = generated.filter((i) => i.kind === g.kind);
          return (
            <div key={g.kind}>
              <h3 className="mb-2 flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
                {g.icon} {g.label} <span className="text-muted-foreground/60">· {items.length}</span>
              </h3>
              {items.length === 0 ? (
                <p className="text-xs text-muted-foreground/70">Nothing here yet.</p>
              ) : (
                <div className="grid gap-2 sm:grid-cols-2">
                  {items.map((i) => (
                    <article
                      key={i.id}
                      className="rounded-lg border border-border/50 bg-[color:var(--ink)]/50 p-3"
                    >
                      <div className="text-sm font-semibold text-foreground">{i.title}</div>
                      <p className="mt-1 whitespace-pre-wrap text-xs text-muted-foreground">{i.content}</p>
                    </article>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}