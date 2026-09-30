---
name: stackitfast-brand
description: Brand identity rules for STACK IT FAST and STACK IT FIRST — the "Stack File" mark and lowercase wordmark, lockups and clear space, the Stacky mascot's brand use, share-card and OG templates, and the asset pipeline (favicons, logo.svg, OG PNGs). Use it when you place the logo, generate or change brand assets, design an OG image, share card, badge or email, or open any new brand surface; triggers include "logo", "favicon", "OG image", "brand", "Stacky", "share card", "lockup".
license: MIT
---

STACK IT FAST's mark is one block carved into three layers that read as an S,
its top-right corner folded like a file — _your stack, shipped as a file_ — on
an apricot tile. STACK IT FIRST is the same mark on the ink tile. The mascot,
**Stacky**, is that block with a face. Geometry lives in
`packages/ui/src/brand.ts`; never redraw the mark by hand.

## Rules at a glance

- **Components, not markup.** In apps use `BrandLockup` / `BrandMark`
  (`@stackitfast/ui`) or the apps' `BrandLogo.astro` wrapper. In SVG/PNG
  pipelines draw the tile from `BRAND_MARK` / `brandMarkSvg()`; the wordmark
  is outlined paths in exported files (`logo.svg`) and Manrope 700 text with
  `WORDMARK_TRACKING_EM` in the Worker's resvg renderer, which bundles the
  font (`apps/web/src/lib/ogImage.ts`).
- **Wordmark**: lowercase `stackitfast` / `stackitfirst`, Manrope 700,
  −0.035em, second word in accent. Product name in copy stays **STACK IT
  FAST**.
- **Clear space** ≥ one layer height (~0.2 × tile). **Minimum** 16px tile.
- **Never** recolour outside the two palettes, add gradients/shadows/glows to
  the mark, rotate or stretch it, or show the block without its tile in UI
  chrome.
- **Stacky is a brand asset**: use the component (`@stackitfast/ui/illustrations`),
  one of the six poses, never recoloured, never cropped through his face,
  never used as the logo. He can sign share cards and OG images small.

Full rules: [references/brand.md](references/brand.md).

## References

| File                                                      | Read when                                                            |
| --------------------------------------------------------- | -------------------------------------------------------------------- |
| [brand.md](references/brand.md)                           | Construction, family palettes, lockup, backgrounds, don'ts           |
| [assets.md](references/assets.md)                         | Regenerating favicons, logo.svg, OG PNGs, share cards, badge         |
| [surfaces-checklist.md](references/surfaces-checklist.md) | Opening a new brand surface (email, social, docs, a new OG template) |

For UI design (tokens, components, patterns) use `stackitfast-design-system`;
for drawing new stickers or Stacky poses use `stackitfast-illustrations`.
