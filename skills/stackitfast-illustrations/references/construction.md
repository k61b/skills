# Construction

## Canvases

| Kind             | viewBox   | Body                            | Badge                                          |
| ---------------- | --------- | ------------------------------- | ---------------------------------------------- |
| Tool sticker     | 260 × 180 | `Frame` ≈ 196 × 130 at (24, 28) | (214, 34) top-right, or bottom-right for files |
| Category sticker | 120 × 120 | `Frame` 80 × 72 at (14, 24)     | (92, 30) with a lucide icon                    |
| Stacky           | 220 × 220 | three layers 132 wide           | —                                              |

## Helpers (`packages/ui/src/illustrations/index.tsx`)

- `DieCut({ r })` — morphology dilate + cream flood behind the drawing. r=5
  for tool stickers, 4 for category stickers, 6 for Stacky.
- `Frame({ x, y, w, h, fill })` — rounded (rx 12) card with its ink shadow and
  3px outline. Default fill cream; use peach/soft to vary a set.
- `Badge({ cx, cy, children | icon })` — apricot circle, ink ring and shadow;
  children draw in a 22 × 22 box with ink strokes.

## Content inside frames

Text is suggested with rounded bars (rx = half the height): headings 8–10px
tall ink, lines 5–6px at 35–60% ink opacity. Layers are 16–20px bars; the
"hot" one is apricot, others ink or soft. Keep 10–12px padding from the frame
edge. Three of anything reads better than four.

## Palette

| Role                       | Token                   |
| -------------------------- | ----------------------- |
| Outline, shadow, text bars | `colors.ink.DEFAULT`    |
| Paper, frames              | `colors.paper.DEFAULT`  |
| Focal element, badge       | `colors.accent.DEFAULT` |
| Secondary fills, the fold  | `colors.sticker.peach`  |
| Soft rows, alt frames      | `colors.sticker.soft`   |

## Checks

- Reads at 64px wide (tool card) and 40px (category chips)?
- Same line weight as its neighbours in the sheet?
- On ink: the die-cut edge separates it; on paper: the outline carries it.
- Nothing touches the viewBox edge after the die-cut (leave ≥ 8px).
