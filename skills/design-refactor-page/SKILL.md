---
name: design-refactor-page
description: Migrate a single UI file (Astro page, React component or layout) to the STACK IT FAST "Stack File · Character" design language — ink shell or paper panel, @stackitfast/ui components, Stacky and stickers where they have a role — then verify with typecheck, design-lint, contrast and screenshots at 1440px and 390px. Use when asked to "migrate this page to the new design", "apply the character redesign to X", or as the per-file step of the rollout.
disable-model-invocation: true
license: MIT
---

Migrate **$ARGUMENTS** (a file path relative to the repo root) to the Stack
File · Character language, then verify it. Visual only: props, data fetching,
routes, aria semantics and copy meaning stay as they are (copy casing and
tone may change per voice.md).

## Steps

1. **Load the language.** Read `.claude/skills/stackitfast-design-system/SKILL.md`
   and the references this file needs: `surfaces.md` (always), `components.md`,
   `patterns.md` for page sections, `typography.md`, `voice.md`, `tokens.md`
   for any colour work. Check `rollout.md` for the file's phase; flag it if a
   prerequisite (e.g. a component) is missing.

2. **Inventory before editing.**
   `node .claude/skills/stackitfast-design-system/scripts/design-lint.mjs $ARGUMENTS`
   and read the file in full. List every finding plus the page's sections,
   so nothing is changed silently.

3. **Decide surfaces.** For each section: ink or paper (surfaces.md decision
   list), which pattern it becomes, whether Stacky or a sticker has a real
   role (empty, loading, success, 404, section head) — at most one Stacky per
   view.

4. **Rebuild with the package.** Replace hand-rolled markup with
   `@stackitfast/ui` components: `Label` for eyebrows, `Marker` for dots,
   `Button` variants, `Chip`, `IconTile`, `OptionTile`, `Segmented`,
   `ToolCard`, `FileCard`, `CodeWindow`, `Card variant="ink|paper"`,
   illustrations from `@stackitfast/ui/illustrations`. Use tokens for every
   colour, radius, size and shadow. Sentence-case the UI strings. If a
   component is missing, add it to `packages/ui` rather than inlining it.

5. **Typecheck.** `bun run --cwd apps/web check` (or `apps/stackitfirst`,
   or `bun run --cwd packages/ui build`).

6. **Lint and contrast.** Re-run design-lint on the file: zero findings, or
   each remaining one allow-listed with a reason. Run
   `bun .claude/skills/stackitfast-design-system/scripts/contrast-check.mjs --tokens packages/ui/src/tokens.ts`
   and add any new colour pair to its `PAIRS`.

7. **Audit.** Run the `web-design-guidelines` skill on the diff; fix what it
   finds (focus states, labels, touch targets).

8. **Look at it.** Start the dev server and screenshot the page at 1440px and
   at a real 390px mobile viewport (Chrome DevTools Protocol device metrics;
   `--screenshot` alone mis-renders long pages and clamps width to 500px).
   Check both, including hover and focus on the primary CTA.

9. **Report**: sections → surface and pattern chosen, findings before/after,
   checks run with results, screenshots taken, anything deferred.

## Out of scope

Database, API routes, `.agents/rules`, raster assets (use the
`stackitfast-brand` pipeline), dark-mode toggles, new hues.
