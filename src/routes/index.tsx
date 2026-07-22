import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { useSession } from "@/lib/use-session";
import {
  BookOpen,
  Check,
  FileText,
  Folder,
  Plus,
  Search,
  Shield,
  Skull,
  Sparkles,
  Swords,
  Users,
  Wand2,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main>
        <Hero />
        <Problem />
        <HowItWorks />
        <Walkthrough />
        <Scenarios />
        <Waitlist />
      </main>
      <Footer />
    </div>
  );
}

function Nav() {
  const { user, loading } = useSession();
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <a href="#top" className="group flex items-center gap-2">
          <span className="font-display text-2xl font-semibold tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
            Scrye
          </span>
          <span className="hidden text-[10px] uppercase tracking-[0.2em] text-muted-foreground sm:inline">
            for foundry
          </span>
        </a>
        <div className="flex items-center gap-2 sm:gap-3">
          {!loading && (
            user ? (
              <Link
                to="/app"
                className="rounded-full border border-border/60 px-3 py-2 text-sm text-muted-foreground transition hover:text-foreground sm:px-4"
              >
                Open app
              </Link>
            ) : (
              <Link
                to="/auth"
                className="rounded-full border border-border/60 px-3 py-2 text-sm text-muted-foreground transition hover:text-foreground sm:px-4"
              >
                Log in
              </Link>
            )
          )}
          <a
            href="#waitlist"
            className="rounded-full border border-[color:var(--brass)]/40 bg-[color:var(--brass)]/10 px-4 py-2 text-sm font-medium text-[color:var(--brass)] transition hover:bg-[color:var(--brass)]/20"
          >
            Join waitlist
          </a>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          background:
            "radial-gradient(60% 50% at 20% 0%, oklch(0.30 0.08 78 / 0.35), transparent 60%), radial-gradient(50% 40% at 90% 20%, oklch(0.28 0.06 200 / 0.35), transparent 60%)",
        }}
      />
      <div className="relative mx-auto max-w-6xl px-5 pb-20 pt-16 sm:px-8 sm:pt-24 md:pb-28 md:pt-32">
        <div className="max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--brass)]" />
            Pre-launch · Waitlist open
          </div>
          <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Session prep is eating the nights{" "}
            <span className="italic text-[color:var(--brass)]" style={{ fontFamily: "var(--font-display)" }}>
              you should be playing.
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            Scrye turns your rough notes — the bullet points you scrawled at lunch — into
            NPCs, encounters, and scenes you can drop straight into Foundry VTT. No more
            Thursday-night stat-block panic.
          </p>
          <div className="mt-9 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-5">
            <a
              href="#waitlist"
              className="inline-flex items-center gap-2 rounded-full bg-[color:var(--brass)] px-6 py-3 text-base font-semibold text-[color:var(--ink)] shadow-[0_10px_40px_-10px_oklch(0.78_0.11_78_/_0.6)] transition hover:brightness-110"
            >
              Join the waitlist
              <span aria-hidden>→</span>
            </a>
            <span className="text-sm text-muted-foreground">
              Built by a DM. Free during beta.
            </span>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-6xl border-t border-border/60 px-5 sm:px-8" />
    </section>
  );
}

function Problem() {
  const pains = [
    {
      k: "01",
      t: "Foundry has a learning cliff",
      d: "You wanted to run a game. Instead you're four YouTube tabs deep trying to figure out why the token vision isn't working and where compendium imports actually go.",
    },
    {
      k: "02",
      t: "Encounters and NPCs eat entire evenings",
      d: "One balanced fight, one shopkeeper with a personality, one dungeon room with actual detail — three hours, easy. And that's if the CR math cooperates.",
    },
    {
      k: "03",
      t: "Prep burnout kills more campaigns than TPKs",
      d: "Nobody's group ended because the villain wasn't menacing enough. They ended because the DM was tired on a Tuesday and cancelled one time too many.",
    },
  ];
  return (
    <section className="border-t border-border/60 bg-[color:var(--ink-2)]/40">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="max-w-2xl">
          <p className="mb-3 text-xs uppercase tracking-[0.2em] text-[color:var(--brass)]">The real problem</p>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
            You didn't sign up to be a full-time content producer.
          </h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {pains.map((p) => (
            <div
              key={p.k}
              className="rounded-2xl border border-border bg-[color:var(--ink)]/60 p-6 transition hover:border-[color:var(--brass)]/40"
            >
              <div
                className="mb-4 text-sm font-medium text-[color:var(--brass)]"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {p.k}
              </div>
              <h3 className="mb-3 text-xl font-semibold">{p.t}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{p.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    {
      n: "1",
      t: "Drop in your rough notes",
      d: "Bullet points, half-sentences, a rough map sketch described in one line. However you actually take notes.",
      sample: "> party arrives at the mill\n> hag pretending to be miller\n> she wants their names",
    },
    {
      n: "2",
      t: "Scrye builds the scene",
      d: "NPC dialogue hooks, a balanced encounter for your party's level, room descriptions, secret DCs — all in your voice, not GPT-flavored purple prose.",
      sample: "NPC · Old Merra (Green Hag, CR 5)\nHook: offers stew, asks each PC's true name\nEncounter: Merra + 2 twig blights",
    },
    {
      n: "3",
      t: "Import straight into Foundry",
      d: "Actor JSON, scene notes, and journal entries in the format Foundry actually wants. One click, no plugin gymnastics.",
      sample: "scrye-export.zip\n  actors/old-merra.json\n  scenes/millhouse.json\n  journals/hooks.md",
    },
  ];
  return (
    <section className="border-t border-border/60">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="max-w-2xl">
          <p className="mb-3 text-xs uppercase tracking-[0.2em] text-[color:var(--brass)]">How it works</p>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
            Three steps. Notes in, session out.
          </h2>
        </div>
        <ol className="mt-14 space-y-10 md:space-y-16">
          {steps.map((s, i) => (
            <li key={s.n} className="grid gap-6 md:grid-cols-12 md:gap-10">
              <div className="md:col-span-5">
                <div className="flex items-baseline gap-4">
                  <span
                    className="text-5xl font-semibold text-[color:var(--brass)] sm:text-6xl"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {s.n}
                  </span>
                  <div className="h-px flex-1 bg-border" />
                </div>
                <h3 className="mt-4 text-2xl font-semibold sm:text-3xl">{s.t}</h3>
                <p className="mt-3 max-w-md text-muted-foreground">{s.d}</p>
              </div>
              <div className="md:col-span-7">
                <pre
                  className="overflow-x-auto rounded-xl border border-border bg-[color:var(--ink)]/70 p-5 text-sm leading-relaxed text-[color:var(--ivory)]/90"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  <span className="mb-3 block text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    {i === 0 ? "your notes" : i === 1 ? "scrye output" : "foundry package"}
                  </span>
                  {s.sample}
                </pre>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Walkthrough() {
  const steps = [
    {
      n: "01",
      t: "Sign up & set up your campaign",
      d: "Name your campaign, pick a system, and hook Scrye up to your Foundry world.",
      panel: <SignupPanel />,
    },
    {
      n: "02",
      t: "Bring in your sources",
      d: "Session notes, villain arcs, player backstories, world bible — one place, not seven Discord threads.",
      panel: <SourcesPanel />,
    },
    {
      n: "03",
      t: "Scrye organizes and generates",
      d: "NPCs, encounters, and scenes — pulled from your canon, ready to run.",
      panel: <GeneratedPanel />,
    },
    {
      n: "04",
      t: "Drop into Foundry, run the table",
      d: "One sync. Actors, scenes, and journals land in your world. You go play.",
      panel: <SyncPanel />,
    },
  ];
  return (
    <section className="border-t border-border/60">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="max-w-2xl">
          <p className="mb-3 text-xs uppercase tracking-[0.2em] text-[color:var(--brass)]">
            A look inside
          </p>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
            Your writers' room for the whole campaign.
          </h2>
          <p className="mt-5 max-w-xl text-muted-foreground">
            You're the showrunner. Scrye keeps the sources, canon, and
            production notes in order — so your table time is spent playing the
            story, not managing files.
          </p>
        </div>

        <div className="mt-14 grid gap-10 md:grid-cols-2 md:gap-x-10 md:gap-y-16">
          {steps.map((s) => (
            <figure key={s.n} className="flex flex-col">
              <MockFrame>{s.panel}</MockFrame>
              <figcaption className="mt-5 flex items-start gap-4">
                <span
                  className="text-sm font-medium text-[color:var(--brass)]"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {s.n}
                </span>
                <div>
                  <h3 className="text-lg font-semibold">{s.t}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {s.d}
                  </p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function MockFrame({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="rounded-2xl border border-border bg-[color:var(--ink)]/80 p-1 shadow-[0_30px_80px_-30px_oklch(0.08_0.02_260_/_0.9)]"
    >
      <div className="flex items-center gap-1.5 px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-[color:var(--ink-3)]" />
        <span className="h-2 w-2 rounded-full bg-[color:var(--ink-3)]" />
        <span className="h-2 w-2 rounded-full bg-[color:var(--ink-3)]" />
      </div>
      <div className="rounded-xl border border-border/70 bg-[color:var(--ink-2)]/70 p-5">
        {children}
      </div>
    </div>
  );
}

function SignupPanel() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
        <Sparkles className="h-3.5 w-3.5 text-[color:var(--brass)]" />
        New campaign
      </div>
      <div>
        <label className="mb-1.5 block text-xs text-muted-foreground">
          Campaign name
        </label>
        <div className="rounded-lg border border-border bg-[color:var(--ink)]/70 px-3 py-2.5 text-sm text-[color:var(--ivory)]">
          The Hollow Crown
        </div>
      </div>
      <div>
        <label className="mb-1.5 block text-xs text-muted-foreground">
          System
        </label>
        <div className="flex items-center justify-between rounded-lg border border-border bg-[color:var(--ink)]/70 px-3 py-2.5 text-sm text-[color:var(--ivory)]">
          <span>D&D 5e</span>
          <span className="text-muted-foreground">▾</span>
        </div>
      </div>
      <div className="flex items-center justify-between rounded-lg border border-border bg-[color:var(--ink)]/70 px-3 py-2.5">
        <div>
          <div className="text-sm text-[color:var(--ivory)]">Connect to Foundry</div>
          <div className="text-xs text-muted-foreground">Sync actors, scenes, journals</div>
        </div>
        <span className="relative inline-flex h-5 w-9 items-center rounded-full bg-[color:var(--brass)]">
          <span className="ml-4 h-4 w-4 rounded-full bg-[color:var(--ink)]" />
        </span>
      </div>
      <button
        type="button"
        className="mt-2 w-full rounded-lg bg-[color:var(--brass)] px-4 py-2.5 text-sm font-semibold text-[color:var(--ink)]"
      >
        Create campaign
      </button>
    </div>
  );
}

function SourcesPanel() {
  const items = [
    { icon: FileText, label: "Session 12 notes.txt", tag: "session" },
    { icon: Skull, label: "Villain backstory", tag: "canon" },
    { icon: Folder, label: "Player backstories/", tag: "4 files" },
    { icon: BookOpen, label: "World bible", tag: "canon" },
    { icon: FileText, label: "Faction map — Ashfell", tag: "note" },
  ];
  return (
    <div className="grid gap-4 sm:grid-cols-[1fr_1.1fr]">
      <div className="rounded-lg border border-border bg-[color:var(--ink)]/60 p-3">
        <div className="mb-3 flex items-center gap-2 rounded-md bg-[color:var(--ink-2)]/70 px-2 py-1.5 text-xs text-muted-foreground">
          <Search className="h-3.5 w-3.5" />
          Search sources
        </div>
        <ul className="space-y-1">
          {items.map((i, idx) => (
            <li
              key={i.label}
              className={`flex items-center justify-between gap-2 rounded-md px-2 py-1.5 text-xs ${
                idx === 1
                  ? "bg-[color:var(--brass)]/10 text-[color:var(--ivory)]"
                  : "text-[color:var(--ivory)]/85 hover:bg-[color:var(--ink-2)]/60"
              }`}
            >
              <span className="flex items-center gap-2 truncate">
                <i.icon className="h-3.5 w-3.5 text-[color:var(--brass)]" />
                <span className="truncate">{i.label}</span>
              </span>
              <span className="shrink-0 text-[10px] uppercase tracking-wider text-muted-foreground">
                {i.tag}
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-3 flex items-center gap-2 rounded-md border border-dashed border-border px-2 py-1.5 text-xs text-muted-foreground">
          <Plus className="h-3.5 w-3.5" />
          Add note or upload…
        </div>
      </div>
      <div className="rounded-lg border border-border bg-[color:var(--ink)]/60 p-4">
        <div className="mb-2 flex items-center justify-between">
          <div className="text-sm font-semibold text-[color:var(--ivory)]">
            Villain backstory
          </div>
          <span className="rounded-full bg-[color:var(--brass)]/15 px-2 py-0.5 text-[10px] uppercase tracking-wider text-[color:var(--brass)]">
            canon
          </span>
        </div>
        <p className="text-xs leading-relaxed text-muted-foreground">
          Lord Vesric wasn't born cruel — the Hollow Crown chose him after his
          sister's death at the siege of Ashfell. He believes he's saving the
          realm. Only Merra knows what the crown really wants.
        </p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {["#vesric", "#hollow-crown", "#ashfell"].map((t) => (
            <span
              key={t}
              className="rounded-full border border-border px-2 py-0.5 text-[10px] text-muted-foreground"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function GeneratedPanel() {
  const tabs = [
    { icon: Users, label: "NPCs", count: 12, active: true },
    { icon: Swords, label: "Encounters", count: 7 },
    { icon: BookOpen, label: "Scenes", count: 5 },
  ];
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-1 rounded-lg border border-border bg-[color:var(--ink)]/60 p-1">
        {tabs.map((t) => (
          <button
            key={t.label}
            type="button"
            className={`flex flex-1 items-center justify-center gap-1.5 rounded-md px-3 py-1.5 text-xs ${
              t.active
                ? "bg-[color:var(--brass)]/15 text-[color:var(--brass)]"
                : "text-muted-foreground"
            }`}
          >
            <t.icon className="h-3.5 w-3.5" />
            <span>{t.label}</span>
            <span className="opacity-70">{t.count}</span>
          </button>
        ))}
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-lg border border-border bg-[color:var(--ink)]/60 p-4">
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="grid h-8 w-8 place-items-center rounded-full bg-[color:var(--brass)]/15 text-[color:var(--brass)]">
                <Wand2 className="h-4 w-4" />
              </div>
              <div>
                <div className="text-sm font-semibold text-[color:var(--ivory)]">
                  Old Merra
                </div>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  Green Hag · CR 5
                </div>
              </div>
            </div>
          </div>
          <p className="text-xs leading-relaxed text-muted-foreground">
            Pretends to be the miller. Offers stew. Asks each PC's true name —
            she collects them.
          </p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            <Tag>hook</Tag>
            <Tag>secret</Tag>
            <Tag>from: villain backstory</Tag>
          </div>
        </div>
        <div className="rounded-lg border border-border bg-[color:var(--ink)]/60 p-4">
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="grid h-8 w-8 place-items-center rounded-full bg-[color:var(--brass)]/15 text-[color:var(--brass)]">
                <Shield className="h-4 w-4" />
              </div>
              <div>
                <div className="text-sm font-semibold text-[color:var(--ivory)]">
                  The Millhouse Ambush
                </div>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  Party lvl 5 · Hard
                </div>
              </div>
            </div>
          </div>
          <ul className="space-y-1 text-xs text-muted-foreground">
            <li>• Merra (Green Hag) + 2 Twig Blights</li>
            <li>• Terrain: flour dust, DC 13 Dex to move</li>
            <li>• Retreats via cellar if bloodied</li>
          </ul>
          <div className="mt-3 flex flex-wrap gap-1.5">
            <Tag>balanced</Tag>
            <Tag>tactics</Tag>
          </div>
        </div>
      </div>
    </div>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="rounded-full border border-border px-2 py-0.5 text-[10px] text-muted-foreground"
      style={{ fontFamily: "var(--font-mono)" }}
    >
      {children}
    </span>
  );
}

function SyncPanel() {
  const rows = [
    { label: "actors/old-merra.json", kind: "Actor" },
    { label: "actors/twig-blight.json", kind: "Actor ×2" },
    { label: "scenes/millhouse.json", kind: "Scene" },
    { label: "journals/hooks.md", kind: "Journal" },
    { label: "journals/session-13-prep.md", kind: "Journal" },
  ];
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between rounded-lg border border-[color:var(--brass)]/40 bg-[color:var(--brass)]/10 px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="grid h-8 w-8 place-items-center rounded-full bg-[color:var(--brass)]/25 text-[color:var(--brass)]">
            <Check className="h-4 w-4" />
          </div>
          <div>
            <div className="text-sm font-semibold text-[color:var(--ivory)]">
              Synced to Foundry
            </div>
            <div className="text-[11px] text-muted-foreground">
              World: The Hollow Crown · just now
            </div>
          </div>
        </div>
        <span className="rounded-full bg-[color:var(--brass)]/20 px-2 py-0.5 text-[10px] uppercase tracking-wider text-[color:var(--brass)]">
          5 items
        </span>
      </div>
      <ul className="divide-y divide-border rounded-lg border border-border bg-[color:var(--ink)]/60">
        {rows.map((r) => (
          <li
            key={r.label}
            className="flex items-center justify-between gap-3 px-3 py-2 text-xs"
          >
            <span
              className="truncate text-[color:var(--ivory)]/90"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {r.label}
            </span>
            <span className="shrink-0 text-[10px] uppercase tracking-wider text-muted-foreground">
              {r.kind}
            </span>
          </li>
        ))}
      </ul>
      <p className="text-[11px] text-muted-foreground">
        From here it's just you and the table.
      </p>
    </div>
  );
}

function Scenarios() {
  const items = [
    {
      when: "10 minutes before session",
      before: "Random encounter? Improvise 4 goblins and hope.",
      after: "Paste the terrain and party level. Get a themed encounter with tactics notes.",
    },
    {
      when: "Mid-session, unexpectedly",
      before: "The NPC your players won't stop talking to has one line of prep.",
      after: "Three dialogue hooks, a secret, and what they want. In under a minute.",
    },
    {
      when: "Dungeon room you forgot to detail",
      before: '"Uh… it\'s a room. There\'s a table. And a… chair."',
      after: "Read-aloud description, two interactables, and one thing that might be trapped.",
    },
    {
      when: "Session recap on Sunday",
      before: "You'll write it tomorrow. You won't write it tomorrow.",
      after: "Drop your session notes, get a recap your players will actually read.",
    },
  ];
  return (
    <section className="border-t border-border/60 bg-[color:var(--ink-2)]/40">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="max-w-2xl">
          <p className="mb-3 text-xs uppercase tracking-[0.2em] text-[color:var(--brass)]">Where this actually helps</p>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
            Moments every DM knows too well.
          </h2>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {items.map((it) => (
            <article
              key={it.when}
              className="rounded-2xl border border-border bg-[color:var(--ink)]/60 p-6 transition hover:border-[color:var(--brass)]/40"
            >
              <div
                className="mb-5 text-xs uppercase tracking-[0.18em] text-muted-foreground"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {it.when}
              </div>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <span className="mt-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Before
                  </span>
                  <p className="flex-1 text-[color:var(--ivory)]/70 line-through decoration-border">
                    {it.before}
                  </p>
                </div>
                <div className="flex gap-3">
                  <span className="mt-1 text-xs font-medium uppercase tracking-wider text-[color:var(--brass)]">
                    With Scrye
                  </span>
                  <p className="flex-1 text-[color:var(--ivory)]">{it.after}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Waitlist() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "error" | "ok">("idle");
  const [message, setMessage] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || trimmed.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setStatus("error");
      setMessage("That doesn't look like a valid email.");
      return;
    }
    setStatus("submitting");
    try {
      const res = await fetch("https://submit-form.com/sKcbS7wRS", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed }),
        redirect: "manual",
      });
      // Formspark replies with a 302 redirect to its submitted page. Browsers may
      // report that as an opaque redirect (cross-origin) or a 302. Either way, it
      // means the email was accepted; we don't need to follow the redirect.
      const isRedirect = res.type === "opaqueredirect" || res.status === 302;
      if (!res.ok && !isRedirect) {
        throw new Error("Submission failed");
      }
      setStatus("ok");
      setMessage("You're on the list. We'll email you before we open the doors.");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Something went wrong — try again in a moment.");
    }
  };

  return (
    <section id="waitlist" className="border-t border-border/60">
      <div className="mx-auto max-w-3xl px-5 py-24 text-center sm:px-8 sm:py-32">
        <p className="mb-3 text-xs uppercase tracking-[0.2em] text-[color:var(--brass)]">Get early access</p>
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
          Spend the week thinking about the story,{" "}
          <span className="italic text-[color:var(--brass)]" style={{ fontFamily: "var(--font-display)" }}>
            not the stat blocks.
          </span>
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-muted-foreground">
          Early access is invite-only. Waitlist folks get in first, get it free during beta,
          and get to shape what it does next.
        </p>

        {status === "ok" ? (
          <div
            role="status"
            className="mx-auto mt-10 max-w-md rounded-2xl border border-[color:var(--brass)]/40 bg-[color:var(--brass)]/10 p-6"
          >
            <div className="mb-2 text-xl font-semibold text-[color:var(--brass)]">You're in.</div>
            <p className="text-sm text-[color:var(--ivory)]/90">{message}</p>
          </div>
        ) : (
          <form
            onSubmit={onSubmit}
            noValidate
            className="mx-auto mt-10 flex max-w-md flex-col gap-3 sm:flex-row"
          >
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <input
              id="email"
              type="email"
              required
              maxLength={254}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status === "error") setStatus("idle");
              }}
              placeholder="dm@yourtable.com"
              className="flex-1 rounded-full border border-border bg-[color:var(--ink)]/70 px-5 py-3 text-base text-[color:var(--ivory)] placeholder:text-muted-foreground/70 focus:border-[color:var(--brass)] focus:outline-none"
              aria-invalid={status === "error"}
              aria-describedby="email-msg"
            />
            <button
              type="submit"
              disabled={status === "submitting"}
              className="rounded-full bg-[color:var(--brass)] px-6 py-3 text-base font-semibold text-[color:var(--ink)] transition hover:brightness-110 disabled:opacity-70"
            >
              {status === "submitting" ? "Joining..." : "Join waitlist"}
            </button>
          </form>
        )}
        <p
          id="email-msg"
          className={`mt-4 min-h-[1.25rem] text-sm ${
            status === "error" ? "text-[color:var(--destructive)]" : "text-muted-foreground"
          }`}
        >
          {status === "error" ? message : status === "idle" ? "No spam. One launch email." : ""}
        </p>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-5 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:px-8">
        <div className="flex items-center gap-3">
          <span className="font-semibold text-[color:var(--ivory)]" style={{ fontFamily: "var(--font-display)" }}>
            Scrye
          </span>
          <span className="text-muted-foreground/70">·</span>
          <span>Made by a DM, for DMs.</span>
        </div>
        <div className="flex items-center gap-4">
          <span>© {new Date().getFullYear()} Scrye</span>
          <span className="text-muted-foreground/50">·</span>
          <span>Not affiliated with Wizards of the Coast or Foundry Gaming LLC.</span>
        </div>
      </div>
    </footer>
  );
}
