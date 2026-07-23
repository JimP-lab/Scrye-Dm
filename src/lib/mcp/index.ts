import { defineMcp } from "@lovable.dev/mcp-js";
import getPitchTool from "./tools/get-pitch";
import joinWaitlistTool from "./tools/join-waitlist";

export default defineMcp({
  name: "scrye-mcp",
  title: "Scrye",
  version: "0.1.0",
  instructions: "Tools for the Scrye waitlist landing page. Use `get_scrye_pitch` for a short description of the product, and `join_waitlist` to add an email to the pre-launch waitlist.",
  tools: [getPitchTool, joinWaitlistTool],
});