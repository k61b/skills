---
name: stackitfast-design-system
description: Source of truth for the STACK IT FAST pastel/minimal design refactor — peach/apricot palette, Manrope + IBM Plex Mono typography, radius/shadow scale, component variant map, and 13 layout patterns. Use this whenever building, restyling, or reviewing any UI in this repo (hero, landing sections, cards, buttons, badges, nav, modals) or when the user asks for "design", "pastel", "restyle", "tokens", "component variant", or "UI refactor".
license: MIT
---

This skill defines the target visual language for STACK IT FAST's move from a
dark amber "dev tool" aesthetic to a **light, pastel, minimal** aesthetic. It
is the single source of truth other skills and agents should defer to for any
visual decision in this repo. It documents the _target_ state — use
[references/migration-map.md](references/migration-map.md) for the order of
files to actually change.

## Identity & non-negotiables

- **Theme**: light pastel only. No dark mode, no theme toggle. Delete the
  dead `[data-theme='light']` block and any dark-mode plumbing you find.
- **Palette family**: single hue — peach/apricot. Do not introduce a second
  hue family (no lavender, no mint) except the fixed semantic success/danger
  inks below.
- **Typography**: Manrope (sans, everything) + IBM Plex Mono (eyebrows,
  badges, metrics, code, tags only). No Inter, Roboto, Arial, Space Grotesk.
- **Guard against the "AI pastel slop" tell**: apricot is a _fill and marker_
  color, never a full-page gradient wash. Don't make every card the same
  uniform rounded-card kit — mix hairline list rows, one bento grid, one
  browser-chrome demo card per page. Don't track-out every label in
  uppercase — reserve that for true eyebrows (one per section, max).
  Never repeat the exact same section layout twice on one page.

## Token summary (full detail + file mapping in references/tokens.md)

| Token                                    | Value                                         | Use                                                                  |
| ---------------------------------------- | --------------------------------------------- | -------------------------------------------------------------------- |
| `bg.DEFAULT` / `bg.subtle`               | `#fbf7f2` / `#f6f0e8`                         | page background                                                      |
| `surface.base/card/item/hover`           | `#f8f3ec` / `#ffffff` / `#fdf4ea` / `#f8f1ea` | panels, rows                                                         |
| `surface.code`                           | `#211b16` (text `#f3ede5`)                    | terminal/code islands only                                           |
| `text.primary/secondary/muted/dim`       | `#1f1a16` / `#5d554d` / `#6b625a` / `#776e65` | never pure black                                                     |
| `accent.DEFAULT`                         | `#f4a261`                                     | CTA fill — **always pair with `text.primary` ink text**, never white |
| `accent.hover/active`                    | `#f29a52` / `#e98d3f`                         | button states                                                        |
| `accent.border`                          | `#c9691f`                                     | crisp 1px edge on filled CTAs                                        |
| `accent.ink`                             | `#9c4408`                                     | links, accent text on light backgrounds                              |
| `accent.soft/subtle/highlight`           | `#fde3cf` / `#fff1e6` / `#ffd9b8`             | tints, tag backgrounds, headline marker                              |
| `border.DEFAULT/subtle/card/interactive` | `#e9e0d6` / `#f0e9e0` / `#e2d8cc` / `#d4c7b8` | hairlines                                                            |
| `success` (ink·soft)                     | `#1f6b45` · `#e3f3ea`                         | verified/positive states                                             |
| `danger` (ink·soft)                      | `#b3261e` · `#fde7e5`                         | errors, destructive                                                  |

All pairs above are pre-verified ≥ 4.5:1 (text) or ≥ 3:1 (non-text UI) except
`accent.border` on `bg`, which is a UI/graphical element (3:1 target) — verify
any new pair with `scripts/contrast-check.mjs` before shipping.

## Typography (full scale in references/typography.md)

- Sans: **Manrope** 400/500/600/700/800 — headings, body, buttons, nav.
- Mono: **IBM Plex Mono** 400/500/600 — eyebrows, badges, stat numerals, code,
  tech tags. Keep this from the current system; it is the one thing to carry
  over, not replace.
- Hero H1: 52–56px / 700 / `-0.03em`. Body: 15–16px (up from the current
  12.5–14.5px scale — the current type is too small for a minimal, airy feel).

## Shape & depth

- Radius: `xs` 4px · `sm` 6px · `md` 10px · `lg` 14px · `full`.
- Shadows stay crisp, never diffuse-blurry by default:
  `subtle` `0 1px 0 rgba(31,26,22,.06)`,
  `card` `0 1px 2px rgba(31,26,22,.06), 0 0 0 1px rgba(31,26,22,.04)`.
  One exception: `soft` `0 8px 24px -12px rgba(31,26,22,.12)` — allowed only
  on the hero demo card and modals, nowhere else.
- `shadow-lg` / `shadow-2xl` (default Tailwind blur shadows): still banned.
- Icon stroke width: 2.5 → **1.75** (in
  `packages/ui/src/components/icons/index.tsx`, `ICON_STROKE_WIDTH`).

## Component variant map

Full before/after cva variant tables: [references/components.md](references/components.md).
Summary: `Button` primary = apricot fill + ink text + accent-border (drop the
hardcoded `social` variant hex values); `Badge` gets an `accent` tint variant
using `accent.soft`; `Card` gains `demo` (browser-chrome header) and
`placeholder-dashed` (empty-slot / "submit yours") variants; `Tabs` gets a
segmented-control look for filters.

## Layout patterns

13 reusable patterns distilled from reference research (numbered eyebrow +
one-word emphasis headline, browser-chrome demo card, handwritten annotation
arrow, numbered step cards, bento icon tiles, big-numeral stats trio, honesty
disclosure block, trust strip, FAQ accordion, blueprint corner marks,
pastel-topped + dashed placeholder cards, segmented control) with Astro/
Tailwind markup sketches: [references/patterns.md](references/patterns.md).

## Motion

One orchestrated hero reveal (staggered `animation-delay`) per page, plus
ordinary hover/focus transitions. No scroll-jacking, no pulsing dots as
decoration, no blur-in entrances. Defer to the `design-motion-principles`
skill for specifics; honor `prefers-reduced-motion` everywhere.

## When executing a refactor

1. Read this file plus the specific `references/*.md` you need.
2. For an actual file-by-file refactor pass, use the
   `design-refactor-page` skill (`$ARGUMENTS` = file path), which chains
   this skill with tsc, contrast checks, and the web-design-guidelines audit.
3. Follow [references/migration-map.md](references/migration-map.md) for
   the order of files across the whole app — token layer first, leaves last.
