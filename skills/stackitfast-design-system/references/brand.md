# Brand mark — "Stack File"

One square block, carved by two seams into three layers that read as an **S**,
with its top-right corner folded like a file: _your stack, shipped as a file_.
It sits on a rounded tile. Source of truth for geometry and colours:
`packages/ui/src/brand.ts` (`@stackitfast/ui/brand`). Never redraw it by hand.

## Family

| Brand          | Tile               | Block              | Fold             | Wordmark             |
| -------------- | ------------------ | ------------------ | ---------------- | -------------------- |
| STACK IT FAST  | apricot `accent`   | ink `text.primary` | cream `bg`       | `stackit`**`fast`**  |
| STACK IT FIRST | ink `text.primary` | cream `bg`         | apricot `accent` | `stackit`**`first`** |

Same mark, inverted tile — the family reads as one system at a glance.

## Construction (32-unit grid, `BRAND_MARK`)

- Tile 32×32, radius 7. Block 5→27 (22 units, ~69% of the tile), centred.
- Three layers of 6 with two 2-unit seams (y 11–13, 19–21). The top seam is
  open to the right, the bottom one to the left, leaving 5-unit bridges — the S.
- Fold: 3.5-unit right triangle in a 45° cut, 0.75-unit gap (the cut is
  3.5 + 0.75·√2 ≈ 4.56 deep).
- One drawing at every size — the favicon is the logo's tile, nothing
  redrawn. Every edge lands on a whole pixel at 32px (a retina 16px tab); at
  1x 16px the edges soften slightly. A separate pixel-snapped 16px drawing was
  tried and dropped: its proportions (3/4/3 layers, bigger block) visibly
  differed from the logo.

## Wordmark

- One lowercase word, **Manrope 700**, tracking **−0.035em**; the second part
  (`fast` / `first`) in `accent.ink`. No caps, no IBM Plex Mono, no spaces.
- In the app it is live text (`BrandLogo.astro`) with an `sr-only` "STACK IT
  FAST" for screen readers; in files it is outlined
  (`scripts/brand/wordmark.generated.ts`, regenerate with
  `python3 scripts/brand/outline-wordmark.py`).
- Product name in copy, titles and SEO stays **STACK IT FAST**.

## Lockup

- Wordmark ink height (ascender→baseline) = **0.55 × tile**, centred on the
  tile; gap = **0.3 × tile**. Tiles 16/20/24px pair with `text-sm/md/lg`.
- Clear space around the lockup: one layer height (~0.2 × tile) minimum.
- Minimum size: 16px tile. Below that use the one-colour
  `safari-pinned-tab.svg` silhouette or nothing.

## Backgrounds

- Apricot tile: page bg, cards, white, photos. On apricot surfaces or the
  dark code island, use the ink (FIRST) palette or the one-colour silhouette.
- Contrast pairs (block on tile, wordmark ink on bg) are in
  `scripts/contrast-check.mjs`.

## Don't

- Recolour the tile outside the two palettes, add gradients, shadows, outlines
  or glows. No `shadow-*` on the mark.
- Rotate, skew, stretch, or show the block without its tile in UI chrome.
- Re-typeset the wordmark in another font, weight, case or tracking.
- Put white text or a white block on the apricot tile.

## Assets & commands

- `bun run --cwd apps/web brand:export` / `--cwd apps/stackitfirst` →
  `favicon.svg`, `logo.svg`, favicon PNGs, `favicon.ico` (16/32/48), full-bleed `apple-touch-icon.png`,
  `icon-maskable-512.png` (80% safe zone), `safari-pinned-tab.svg`,
  `site.webmanifest`.
- `bun run --cwd apps/web brand:og` → `og-preview/explore/rules/insights.png`
  (headless Chrome). `apps/stackitfirst`: `brand:og` → `og.png`.
- Dynamic per-project OG (`apps/web/src/lib/ogImage.ts`) draws the same lockup
  with resvg.
- README badge (`apps/web/src/pages/badge/[slug].svg.ts`) carries the mark at 14px
  in its left segment.
- Concept history and test sheets were produced with the `logo-design` skill
  (`.claude/skills/logo-design`).
