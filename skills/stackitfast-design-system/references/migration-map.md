# Migration map — phase 2 execution (COMPLETE)

All 11 steps of the pastel/minimal migration shipped on the
`design/pastel-refactor` branch. This file now records what actually
happened, for future reference (e.g. if a new page is added and needs to
follow the same conventions, or if the "text-accent-as-text" hazard
resurfaces in a new file).

## Steps shipped (commit order)

1. **Token layer** — `packages/ui/src/tokens.ts`, `globals.css`, Tailwind
   config (colors, fonts, radii, shadows, `modes`/`status` groups newly
   wired into Tailwind).
2. **Fonts** — Manrope + IBM Plex Mono in `Layout.astro`; dropped the dead
   `class="dark"` + `darkMode` Tailwind config.
3. **`@stackitfast/ui` components** — Button, Badge, Card (+ `demo`/
   `placeholder-dashed` variants), Tabs (segmented look), Alert (fixed a
   real success-color-was-amber bug), Progress (fixed a real 1.71:1
   contrast bug), Modal, Input/Textarea/Select (focus-ring contrast fix).
4. **Header/footer/shell** — `Layout.astro`, `HeaderNav.tsx` (55 hex),
   `HeaderTicker.astro`, `BrandLogo.astro`, `BrandMark.tsx`.
5. **Homepage** — full retokenize + patterns #1 (headline emphasis) and #3
   (browser-chrome demo card) applied. Bento category grid (#6) deferred.
6. **Listing pages** — explore/stack/rules/insights index pages,
   `DirectoryInteractive.tsx`, `RuleViewerInteractive.tsx`.
7. **Detail pages** — `project/[slug].astro` + `ProjectDetailInteractive`,
   `rules/[slug].astro`, `insights/[slug].astro` + `InsightsLayout.astro`.
8. **Survey/results** — `SurveyWizard.tsx`, `ResultsInteractive.tsx`. (The
   original plan assumed these used orphaned `bg.sheet`/`surface.lightOpt`
   tokens — they didn't; that assumption was wrong, no special handling
   needed.)
9. **Modals** — Login, ClaimProject, ClaimsModeration, ListInDirectory,
   ProjectSubmit, ShareProject.
10. **Static/legal pages** — privacy, terms, 404.
11. **Brand assets + full-repo gap sweep** — `favicon.svg`, `logo.svg`,
    `themeColor` in `seo.ts`; a final repo-wide grep caught 4 files the
    original exploration-phase inventory had missed (`AuthNav.tsx`,
    `HomeShareIsland.tsx`, `DomainVerificationCard.tsx`,
    `PromptCopyBox.tsx`).

## The one recurring bug pattern, everywhere

`accent.DEFAULT` (`#f4a261`) only has ~1.9:1 contrast against the light
page background — it's a **fill color, never body/link text** on light
surfaces. Every file above had some number of `text-accent`/`border-accent`
bare Tailwind classes left over from the dark theme (where that same class
read fine against `#0d0e10`). The fix throughout was:

- On the **light page background**: `text-accent` → `text-accent-ink`,
  `border-accent` → `border-accent-border`.
- On a **`bg-surface-code` dark island** (code viewers, terminal chips,
  inline snippet boxes): `text-accent`/`border-accent` stay as-is — that's
  correct light-on-dark and was verified file-by-file, never bulk-assumed.
- A second, related bug showed up repeatedly inside those same dark
  islands: toolbars/labels using **light-theme text tokens**
  (`text-primary`/`text-secondary`/`text-muted`/`text-dim`) or
  **light-theme border/bg tokens** (`border-border`, `bg-surface-card/60`)
  that are invisible or wrong on a dark bg. Fixed with `text-onCode` (at
  full/70%/50%/40% opacity for the emphasis level needed) and
  `border-white/10` / `bg-white/5` overlays.
- **Post-ship regression found via a real screenshot**: `InsightsLayout.astro`
  and `rules/[slug].astro` both applied Tailwind Typography's
  **`prose-invert`** modifier to their markdown article bodies. That class
  swaps every prose color for the plugin's built-in light/white palette —
  correct on the old dark theme, but nearly invisible bold text/blockquotes
  on the new light bg. No grep sweep (hex, `red-`, bare-accent, etc.) could
  have caught this since `prose-invert` is a plugin variant name, not a raw
  color value. **Lesson**: also grep for `prose-invert` (and any other
  dark-mode-flavored Tailwind plugin variant) when auditing a file for
  this migration — it won't show up in a color-value sweep. Fixed by
  dropping `prose-invert`, keeping plain `prose`.

## Documented, contained exceptions (not bugs, don't "fix" these)

- `FILE_DOT_COLOR` in `RuleViewerInteractive.tsx` (emerald/sky/violet dots
  distinguishing AGENTS.md/Cursor/SKILL.md file types) — a 4-way legend
  that needs genuinely distinct hues; collapsing to the single accent hue
  would erase the distinction.
- Claim-status chips in `ClaimsModerationModal.tsx` ("reviewed" = light
  blue, default/"pending" = light amber) — same reasoning, admin-only
  screen, not part of the public brand surface.
- The X/Twitter brand-blue buttons (`#1d9bf0`/`#1a8cd8`) in
  `ProjectSubmitModal.tsx` and `ShareProjectModal.tsx` — third-party brand
  color, not a theme leftover.
- `PromptCopyBox.tsx`'s `DEFAULT_PROMPT` fallback string mentions "Dark
  mode first palette" — that's illustrative example content for a
  hypothetical scaffolded project, not this site's own styling.

## Explicitly NOT done (needs manual/tooling follow-up)

- The 5 static OG preview PNGs (`og.png`, `og-preview.png`, `og-explore.png`,
  `og-insights.png`, `og-rules.png`) and the 6 raster favicon PNGs
  (32/48/96/192/512 + apple-touch-icon) still show the old dark-amber
  branding. No SVG rasterizer (`rsvg-convert`/`imagemagick`/`sharp`) was
  available in the working environment to regenerate them from the
  now-updated `favicon.svg`/`logo.svg`, and installing one as a new
  project dependency for a one-off export wasn't warranted. Regenerate
  these from the current `apps/web/public/favicon.svg` /
  `apps/web/public/logo.svg` with any design tool, then re-export the OG
  images with the new palette.
- The homepage's 4-tile category grid (pattern #6, asymmetric bento) was
  left as a uniform grid — only retokenized, not restructured.

## Verification methodology used throughout

Every step: `bunx astro check` (or `tsc --noEmit` for `packages/ui`) with
zero new errors beyond the 3 pre-existing ones on `main`; the design
system's `scripts/contrast-check.mjs`; a `grep` sweep of the touched
file(s) for hex/`red-`/`emerald-`/etc./`rounded-[`/`shadow-[`/bare-accent
before considering it done; and an HTTP fetch of the real running dev
server for every touched route, checked for 200s and zero leaked bare
`text-accent` class applications in the rendered HTML. The final step
added one more full-repo grep sweep (not scoped to the planned file list)
that caught 4 additional files, plus a full `bun run build` (production
build, not just typecheck) as the last gate.
