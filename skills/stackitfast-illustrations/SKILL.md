---
name: stackitfast-illustrations
description: How to draw new STACK IT FAST sticker illustrations and Stacky mascot poses so they match the existing set — construction on a grid, 3px ink outlines, flat cream/apricot/peach fills, hard ink offset shadows, the cream die-cut edge and the round apricot badge — then render and check them on ink and paper. Use when a page needs a new tool or category sticker, an empty-state or success illustration, a new Stacky pose, or when reviewing an illustration; triggers include "illustration", "sticker", "Stacky pose", "mascot", "icon art", "empty state art".
license: MIT
---

Every illustration in STACK IT FAST comes from one hand, and that hand is the
logo's: layers, seams and the folded file corner, drawn as flat stickers with
a thick ink line. They live as React SVG components in
`packages/ui/src/illustrations/index.tsx` (exported as
`@stackitfast/ui/illustrations`). New ones go there too — never as PNGs,
never as one-off inline SVGs in a page.

## Workflow

1. **Decide the role.** One idea per sticker, tied to what the thing _is_
   (a survey is a question card, rules are a file, compare is two cards).
   Mascot poses are for moments (greet, think, celebrate, sleep, wave).
2. **Construct on the grid** (see [references/construction.md](references/construction.md)):
   tool stickers `viewBox 0 0 260 180`, category stickers `0 0 120 120`,
   Stacky `0 0 220 220`. Reuse `Frame`, `Badge`, `DieCut` helpers.
3. **Colour from tokens only**: ink, paper (cream), accent (apricot),
   sticker.peach, sticker.soft. At most one apricot focal element plus the
   badge.
4. **Render and look**:
   `bun run --cwd packages/ui illustrations:sheet out.png` writes every
   illustration on ink and on paper. Open the PNG and check both rows. Also
   check `#gallery` in the preview at 1× and on a phone.
5. **Audit** (optional, for new marks): render to SVG and run the
   `logo-design` skill's `svg_audit.py` for near-miss angles and tiny
   details.
6. **Wire it up**: export from `illustrations/index.tsx`, add it to the
   gallery and to `stackitfast-design-system/references/components.md`.

## Rules

- Outline 3px ink (`strokeWidth={3}`), round joins; inner details 2–2.6px.
- Hard shadow: the same shape in ink, offset (+4…+5, +4…+5), drawn first.
- Wrap the whole drawing in `<DieCut>` so it reads on ink.
- Badge: `Badge` (r=22, apricot, 3px ink ring) at a corner, overlapping the
  frame by about a third; its glyph is 2.4–2.6px ink or a lucide icon.
- Slight tilt (±5–8°) is fine for paper and files; frames stay upright.
- No gradients, no textures, no text inside illustrations (use bars for text).
- Decorative by default (`aria-hidden`); pass `title` when the image carries
  meaning on its own.

Stacky specifics: [references/stacky.md](references/stacky.md).
