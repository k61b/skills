# Component variant map — implemented (step 3/11)

Actual shipped state of every `packages/ui/src/components` file after the
pastel retokenization. All prop shapes/variant names are unchanged (no
call-site breaks) except two new Card variants that are additive.

## Button (`Button/Button.tsx`)

- Base radius: `rounded-md` (10px); `xs`/`sm`/icon-xs/icon-sm sizes override
  to `rounded-sm` (6px) so small controls don't look pill-like.
- Focus ring: `ring-accent` → **`ring-accent-border`** (accent.DEFAULT fails
  the 3:1 non-text contrast requirement as a ring color; accent.border
  passes at 3.56:1).
- `primary`: unchanged structurally — `bg-accent text-text-contrast
border-accent-border` (text.contrast === text.primary ink now, 8.37:1).
- `surface` / `surface-item`: hover text-accent → **hover:text-accent-ink**;
  hover border-accent/60 → **hover:border-accent-border/60**.
- `accent-subtle`: border-accent → **border-accent-border**; text-accent →
  **text-accent-ink**; hover bg-accent/20 → **hover:bg-accent-soft**.
- `danger`: raw `red-500` Tailwind defaults → **`status-dangerInk` /
  `status-dangerSoft`** tokens.
- `social`: hardcoded `#f2f0ec`/`#141416`/`#d6d1c7` → **`bg-surface-card
text-text-primary border-border-card`** (surface.card is already white,
  so this converges naturally with the rest of the light theme).

## Badge

- `outline`: hardcoded `text-[#cbc8c2]` → **`text-text-secondary`**.
- `subtle`: `text-accent` (on `bg-accent-subtle`, a light tint) →
  **`text-accent-ink`**.
- `accent`: `border-accent/40 bg-accent/15 text-accent` →
  **`border-accent-border/40 bg-accent-soft text-accent-ink`**.
- `agent`/`hybrid`/`classic`: hardcoded dark-theme hex borders/text →
  **`border-modes-{name}-border text-modes-{name}-text`**, now that
  `colors.modes` is actually mapped into the Tailwind config (it existed in
  the old tokens.ts but was never wired up).

## Card

- Base radius `rounded-xs` (was 2px) → **`rounded-md`** (10px).
- `default`/`option`: `border-border/50` (a near-invisible 50%-opacity
  hairline on the old dark bg) → **`border-border-card`** (full opacity —
  the light-theme border tokens are already soft enough without needing
  transparency tricks); shadow `shadow-subtle` → **`shadow-card`**.
- **New** `demo` variant: `rounded-lg border-border-card bg-surface-card
shadow-soft overflow-hidden` — for the browser-chrome hero/demo card
  (pattern #3). No `CardDemoHeader` sub-component yet — add it
  co-located with its first real usage (homepage hero, step 5) rather than
  speculatively now.
- **New** `placeholder-dashed` variant: `border-dashed
border-border-interactive bg-surface-base shadow-none` — for pattern #12
  (empty/submit-yours slots in listings).

## Tabs

- `boxed` variant: hardcoded `bg-[#0b0b0c]` (dark terminal bg) + `rounded-
[6px]` → **`bg-surface-card border-border-card rounded-full`** — this is
  now literally the segmented-control look from pattern #13, reusing the
  existing `boxed` variant name rather than adding a redundant `segmented`
  one.
- `Tab` sub-component: boxed active variant `surface-item` → **`primary`**
  (accent-filled pill, matching pattern #13's active state); boxed tabs
  also get a `rounded-full` className override so individual tab buttons
  match the pill container instead of Button's default `rounded-md`.

## IconCircle

No changes needed — already fully tokenized (`border-border bg-surface-item
text-text-muted`), retokenizes automatically.

## Alert

- Radius `rounded-[5px]` → **`rounded-md`**.
- `error`: raw `red-950/red-800/red-300` Tailwind defaults →
  **`bg-status-dangerSoft border-status-dangerInk/30 text-status-dangerInk`**.
- `success`: was actually using the **accent/amber** color for a
  success state (`bg-accent-subtle border-accent/40 text-accent`) — this
  was a pre-existing semantic mismatch, not just a theme issue. Fixed to
  real green **`status-successSoft`/`status-successInk`** tokens, since the
  design system now has a proper success color and `variant="success"` is
  used for genuine success confirmations (`ClaimProjectModal`).

## Progress

- Fill color `bg-accent` against its `bg-border-subtle` track measured at
  only **1.71:1** (accent.DEFAULT is a light tone; two light neutrals never
  clear 3:1 against each other). Fixed to **`bg-accent-border`** (the
  richer/darker accent-family tone), which clears 3:1 against the light
  track while staying in the same hue family.

## Modal

- Panel radius: hardcoded `rounded-t-[12px] sm:rounded-[8px]` /
  `rounded-[8px]` → **`rounded-lg`** (14px, matching the "modal is a
  prominent floating surface" rule).
- All three hardcoded diffuse dark shadows (`shadow-[0_-4px_24px_rgba(0,0,0,0.7)]`,
  `shadow-[0_24px_60px_-20px_rgba(0,0,0,0.85)]`,
  `shadow-[0_16px_48px_rgba(0,0,0,0.85)]`) → **`shadow-soft`** (the one
  token explicitly designed for this exact use case).
- Scrim: `bg-[rgba(8,8,9,0.8)]` (80% near-black, tuned for a dark app) →
  **`bg-[rgba(31,26,22,0.4)]`** (tinted ink at 40% — a dark scrim still
  works fine over a light page, just softer to match the airier aesthetic).

## Input / Textarea / Select (not cva-based, but part of the same fix pass)

All three had the same two systemic issues, now fixed:

1. **Focus ring/border on accent**: `ring-accent` / `border-accent` →
   **`ring-accent-border` / `border-accent-border`** (Input, Textarea,
   Select's open state) — same 3:1 non-text contrast reasoning as Button.
2. **Raw Tailwind `red-*` error states** → `status-dangerInk` /
   `status-dangerSoft` (Input's `hasError` prop and inline error message
   span, Textarea's `hasError`, Select's `hasError`).

Select additionally had: hardcoded `rounded-[5px]`/`rounded-[6px]`/
`rounded-[4px]` → `rounded-md`/`rounded-sm`/`rounded-xs`; a diffuse
`shadow-[0_16px_36px_rgba(0,0,0,0.85)]` dropdown shadow → `shadow-soft`;
and three more `text-accent`-on-light-bg spots (open arrow, selected-option
highlight, checkmark) → `text-accent-ink`.

## Icons (`icons/index.tsx`)

`ICON_STROKE_WIDTH` `2.5` → **`1.75`**.

## Not touched (spot-checked, no hardcoded colors found)

`EmptyState`, `OutboundLink` — both already fully token-driven or contain
no color classes at all.
