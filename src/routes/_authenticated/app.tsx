import { createFileRoute, Outlet, Link, useNavigate } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@/lib/use-session";

export const Route = createFileRoute("/_authenticated/app")({
  component: AppLayout,
});

function AppLayout() {
  const { user } = useSession();
  const navigate = useNavigate();
  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/", replace: true });
  }
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 sm:px-8">
          <div className="flex items-center gap-6">
            <Link to="/app" className="font-display text-xl font-semibold" style={{ fontFamily: "var(--font-display)" }}>
              Scrye
            </Link>
            <nav className="flex items-center gap-4 text-sm text-muted-foreground">
              <Link to="/app" activeOptions={{ exact: true }} activeProps={{ className: "text-foreground" }}>
                Campaigns
              </Link>
              <Link to="/app/feedback" activeProps={{ className: "text-foreground" }}>
                Feedback
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="hidden sm:inline">{user?.email}</span>
            <button
              onClick={signOut}
              className="rounded-full border border-border/60 px-3 py-1.5 text-xs hover:bg-[color:var(--ink-3)]/50"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-5 py-8 sm:px-8">
        <Outlet />
      </main>
    </div>
  );
}