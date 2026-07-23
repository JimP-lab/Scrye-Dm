import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

export default defineTool({
  name: "join_waitlist",
  title: "Join the Scrye waitlist",
  description: "Submit an email address to the Scrye pre-launch waitlist. The email is sent to the same Formspark endpoint the website's signup form uses.",
  inputSchema: {
    email: z.string().email().describe("Email address to add to the waitlist."),
  },
  annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: true, openWorldHint: true },
  handler: async ({ email }) => {
    try {
      const res = await fetch("https://submit-form.com/sKcbS7wRS", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email }),
        redirect: "manual",
      });
      // Formspark returns a 302 to submitted.formspark.io on success.
      const ok = res.ok || res.status === 302 || res.status === 0;
      if (!ok) {
        return {
          content: [{ type: "text", text: `Waitlist submission failed (status ${res.status}).` }],
          isError: true,
        };
      }
      return { content: [{ type: "text", text: `Added ${email} to the Scrye waitlist.` }] };
    } catch (error) {
      return {
        content: [{ type: "text", text: `Waitlist submission failed: ${(error as Error).message}` }],
        isError: true,
      };
    }
  },
});