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

## Construction (32-unit grid, `BRAND_MARK.master`)

- Tile 32×32, radius 7. Block 5→27 (22 units, ~69% of the tile), centred.
- Three layers of 6 with two 2-unit seams (y 11–13, 19–21). The top seam is
  open to the right, the bottom one to the left, leaving 5-unit bridges — the S.
- Fold: 3.5-unit right triangle in a 45° cut, 0.75-unit gap (the cut is
  3.5 + 0.75·√2 ≈ 4.56 deep).
- `BRAND_MARK.small` (16-unit grid) is a hand-snapped drawing for 16–32px:
  block 2→14, centred, with every layer, seam and the fold on whole pixels at
  16px. Its layers are 3/4/3 (a slightly heavier spine, as in type) because
  12px can't split into three equal layers with 1px seams. Use it for
  favicons and `BrandMark size="sm"`; the master turns to mush below ~24px.

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
- Minimum size: 16px tile (small drawing). Below that use the one-colour
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
  `favicon.svg` (small drawing), `logo.svg`, favicon PNGs (≤32px small,
  larger master), `favicon.ico` (16/32/48), full-bleed `apple-touch-icon.png`,
  `icon-maskable-512.png` (80% safe zone), `safari-pinned-tab.svg`,
  `site.webmanifest`.
- `bun run --cwd apps/web brand:og` → `og-preview/explore/rules/insights.png`
  (headless Chrome). `apps/stackitfirst`: `brand:og` → `og.png`.
- Dynamic per-project OG (`apps/web/src/lib/ogImage.ts`) draws the same lockup
  with resvg.
- README badge (`apps/web/src/pages/badge/[slug].svg.ts`) carries the 14px
  small drawing in its left segment.
- Concept history and test sheets were produced with the `logo-design` skill
  (`.claude/skills/logo-design`).
