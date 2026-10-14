# Getting Scrye in front of Foundry DMs

## What I found
- Traffic, 2026-09-15 to 2026-10-14: 2 visits total (1 Direct, 1 google.com), both on `/`. The owner may be among them, so treat it as "no audience yet", not a page problem.
- The waitlist form works. The page has no real output sample and no answer to "is this GPT slop?", and it has no founder name or social links.
- Searching "Scrye" mostly returns ScryRPG (https://scryrpg.com/foundry/, checked 2026-10-14), a Foundry-integrated competitor with a near-identical name.
- No custom domain; the page lives on a lovable.app address.
- Search-engine basics (robots.txt, sitemap) are missing. Low urgency until there is something to index.

## Who it speaks to (from research)
1. DMs who hate importing monsters into Foundry (r/FoundryVTT thread, not opened: https://www.reddit.com/r/FoundryVTT/comments/1655zv2/how_to_import_monster_data/).
2. DMs wary of AI flattening their story (r/DMAcademy, not opened: https://www.reddit.com/r/DMAcademy/comments/1qeig5x/).
3. DMs who already "word vomit notes into an LLM and organise them" (r/DMAcademy, not opened: https://www.reddit.com/r/DMAcademy/comments/1tx0mmz/). This is your closest audience.

## Ranked plan
1. **Fix the page's trust gap (do first).** Replace one mock panel with a real before/after: rough notes, the generated NPC, the Foundry import. Add a short FAQ (which AI, how notes are stored, "you stay the author"), a founder line and one social link. Add a "Join the waitlist" form near the top, and tag signups by source.
2. **Custom domain.** Buy or connect a short, memorable domain. Consider whether the name clash with ScryRPG is worth resolving before launch.
3. **Personal outreach to 10-20 DMs you know** (friends, your own table, Discord groups you are already in). Ask them to try the page and tell you the worst part of their prep. I can draft the messages.
4. **r/dndai monthly "Promote Your AI RPG Tools" thread** (not opened; Jul-Sep 2026 threads exist, October unknown). Post a real example, not a pitch.
5. **Ask r/FoundryVTT mods by modmail** before posting. Their sentiment toward AI tools is negative and promotion is restricted (third-party summaries, not opened).
6. Later: small free Foundry importer module for the Foundry package listing (https://foundryvtt.com/creators/submit/, needs a shipped module; marketing copy must be human-made per https://foundryvtt.com/article/ai-policy/, checked 2026-10-14). Then robots.txt / sitemap, and paid ads only once signups convert.

Skip: r/DnDBehindTheScreen (bans AI tools) and r/DMToolkit (moratorium), per search snippets, not opened. r/DMAcademy only for genuine help.

## Technical notes
- Step 1 edits `src/routes/index.tsx` only (Walkthrough, new FAQ section, hero form, `?src=` capture sent with the Formspark POST).
- Domain step uses the project's domain settings.
- Research saved in Project Files: marketing/research.md.

## Not checked
Reddit/Discord pages could not be opened; rules come from snippets. Not checked: Product Hunt, TAAFT submission cost, YouTube creators, newsletters.
