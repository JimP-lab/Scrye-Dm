import { defineTool } from "@lovable.dev/mcp-js";

const PITCH = `Scrye is a session-prep tool for Dungeons & Dragons Dungeon Masters running games in Foundry VTT.

It takes a DM's rough session notes and turns them into ready-to-run content — NPC dialogue hooks, encounter stat blocks, and scene outlines — formatted to drop straight into Foundry.

Scrye is the DM's story producer: it holds the campaign's sources, notes, and canon in one organized place, so table time goes to running the story instead of managing files.

Status: pre-launch. A public waitlist is open at https://scrye-dm-prep-helper.lovable.app.`;

export default defineTool({
  name: "get_scrye_pitch",
  title: "Get Scrye pitch",
  description: "Return a short description of Scrye — what it does, who it's for, and how to join the waitlist.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({ content: [{ type: "text", text: PITCH }] }),
});