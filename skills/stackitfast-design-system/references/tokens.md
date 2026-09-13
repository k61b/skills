# Token mapping — implemented values

This reflects the tokens as actually shipped in `packages/ui/src/tokens.ts`
(step 1 of the migration, already applied). Two decisions worth noting
because they refine the original plan:

- **`text.contrast` was kept** (not removed) — it already meant "text for
  use on the accent fill" (`bg-accent text-text-contrast`, used in ~15
  places across the app). Its value changed from the old near-black
  `#140d04` to the new ink `#1f1a16` (same as `text.primary`), so every
  existing `bg-accent ... text-text-contrast` call site keeps working
  unchanged and now renders with the pastel accent correctly (8.37:1).
- **`accent.glow` is decorative-only now** — on the old dark theme it was
  used both as a link hover text color AND as a soft ambient background
  blur. On light pastel, a light peach glow fails as text (only ~2:1). It's
  now defined purely for decorative blurred backgrounds (`bg-accent-glow/20
  blur-[130px]` in `SurveyWizard.tsx`, `hover:text-accent-glow` in
  `index.astro`). **Any remaining `text-accent-glow` usage must be swapped
  to `text-accent-ink` (or `accent-active` for a hover-darkening effect)
  when that file is refactored** — see the "accent-as-text" warning below.

## 1. `packages/ui/src/tokens.ts` — shipped `colors`

```ts
export const colors = {
  bg: { DEFAULT: '#fbf7f2', subtle: '#f6f0e8' },
  surface: {
    base: '#f8f3ec', card: '#ffffff', item: '#fdf4ea',
    code: '#211b16', hover: '#f8f1ea',
  },
  text: {
    primary: '#1f1a16', secondary: '#5d554d', muted: '#6b625a', dim: '#776e65',
    contrast: '#1f1a16', onCode: '#f3ede5',
  },
  accent: {
    DEFAULT: '#f4a261', hover: '#f29a52', active: '#e98d3f', border: '#c9691f',
    ink: '#9c4408', soft: '#fde3cf', subtle: '#fff1e6', subtleBorder: '#f6dcc4',
    highlight: '#ffd9b8', glow: '#ffb98a', agentBorder: '#e0a05c',
  },
  border: { DEFAULT: '#e9e0d6', subtle: '#f0e9e0', card: '#e2d8cc', interactive: '#d4c7b8' },
  modes: {
    agent: { border: '#e0a05c', text: '#9c4408' },
    hybrid: { border: '#d4c7b8', text: '#5d554d' },
    classic: { border: '#e2d8cc', text: '#6b625a' },
  },
  status: {
    successInk: '#1f6b45', successSoft: '#e3f3ea',
    dangerInk: '#b3261e', dangerSoft: '#fde7e5',
  },
} as const;
```

`modes` and `status` are now mapped into `packages/ui/tailwind.config.ts`'s
`theme.extend.colors` (they weren't before — `modes` existed in the old
tokens.ts but was dead/unmapped). This makes `bg-modes-agent-border`,
`text-status-successInk`, etc. available as real Tailwind utilities.

## 2. ⚠️ CRITICAL: "accent-as-text" migration hazard

`accent.DEFAULT` (`#f4a261`) is a **fill color**, not a text color — on the
new light bg it has only ~1.9:1 contrast, far below the 4.5:1 (text) / 3:1
(large text) WCAG minimum. The old dark theme safely used
`colors.accent.DEFAULT` as `text-accent` all over the app (links, inline
emphasis, icon colors) because it read fine on the dark `#0d0e10`
background. **That pattern is now broken app-wide** the moment these tokens
ship, until each file is migrated.

There are two distinct cases per call site — check the surrounding
background before fixing:

1. **`text-accent` on the light page background** (the vast majority of
   cases — links, badges, emphasized spans, icons) → replace with
   **`text-accent-ink`** (`#9c4408`, 6.07:1 on bg, 6.47:1 on card).
2. **`text-accent` on the dark `bg-surface-code` island** (rare — e.g. a
   syntax-highlighted keyword inside a terminal block) → this one is
   *not* broken; `#f4a261` on `#211b16` still reads fine as light-on-dark.
   Leave these as `text-accent` (or explicitly document as intentional).

Do **not** attempt a blanket repo-wide find/replace for this — it must be
checked file-by-file (that's exactly what `design-refactor-page` does:
inventory every hardcoded/legacy-pattern color before editing). Known
occurrences to check when their file's migration turn comes: `LoginModal`,
`DirectoryDisclaimer` (dark-surface case — leave as-is), `ClaimsModerationModal`,
`SurveyWizard`, `ResultsInteractive`, `RuleViewerInteractive`,
`ProjectDetailInteractive`, `DirectoryInteractive`, `index.astro`,
`rules/index.astro`, `rules/[slug].astro`.

## 3. `packages/ui/tailwind.config.ts` — typography (prose) block

Already updated to the ink/apricot equivalents (`--tw-prose-links: '#9c4408'`,
`--tw-prose-pre-bg: '#211b16'`, etc.) — see the file directly, no further
action needed here.

## 4. `borderRadius` / `shadows` — shipped

```ts
export const borderRadius = { none: '0px', xs: '4px', sm: '6px', md: '10px', lg: '14px', full: '9999px' } as const;
export const shadows = {
  none: 'none',
  subtle: '0 1px 0 rgba(31, 26, 22, 0.06)',
  card: '0 1px 2px rgba(31, 26, 22, 0.06), 0 0 0 1px rgba(31, 26, 22, 0.04)',
  soft: '0 8px 24px -12px rgba(31, 26, 22, 0.12)', // hero/demo/modal only
} as const;
```
Mapped into Tailwind as `rounded-xs/sm/md/lg` and `shadow-subtle/card/soft`.

## 5. Other hardcoded-hex locations still pending (unchanged from original plan)

- `apps/web/src/components/HeaderNav.tsx` — 55 inline hex.
- `apps/web/src/components/ClaimsModerationModal.tsx` — 21.
- `apps/web/src/components/RuleViewerInteractive.tsx` — 11.
- `apps/web/src/components/ProjectDetailInteractive.tsx` — 8.
- `apps/web/src/pages/project/[slug].astro` — 6.
- `apps/web/src/components/BrandMark.tsx` — 4 hex in inline SVG fills.
- `apps/web/src/lib/seo.ts:11` — `themeColor: '#0e0e0f'` → `'#fbf7f2'`.
- Static OG PNGs + `public/favicon.svg` / `public/logo.svg` — manual re-export.
- `packages/ui/src/components/Button/Button.tsx` `social` variant — hardcodes
  `#f2f0ec`/`#141416`/`#d6d1c7` — retokenize when Button is migrated.

## 6. Contrast verification

`bun .claude/skills/stackitfast-design-system/scripts/contrast-check.mjs`
covers the fixed token table. Add any new pair to its `PAIRS` array before
shipping a file that introduces one.
