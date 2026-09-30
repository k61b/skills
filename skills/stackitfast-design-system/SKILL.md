---
name: stackitfast-design-system
description: Source of truth for the STACK IT FAST "Stack File · Character" design language — an ink shell with cream paper panels, apricot CTAs, Manrope in sentence case, the Stacky mascot and sticker illustrations, the folded-file corner, and the component and pattern library in @stackitfast/ui. Use it whenever you build, restyle or review any UI in this repo (pages, sections, cards, buttons, nav, modals, empty states, OG cards) or when the user says "design", "redesign", "restyle", "tokens", "component", "ink", "Stacky", "sticker" or "UI refactor".
license: MIT
---

The interface is built from the logo. The mark is one block carved into
**three layers** that read as an **S**, with its top-right corner **folded
like a file**, on a rounded **apricot tile**. The UI keeps those parts and adds
a character: **Stacky**, the mascot, is the same three layers with a face.
Everything below is how that turns into pages. When this skill and anything
else disagree, this skill wins.

## The language in one table

| From the brand | In the UI                                                                                                                                                      |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Warm ink block | The shell is ink (`bg-ink`), cards are `ink-raised`, illustration wells `ink-well`. Long reading sits on cream **paper** panels. The top bar is a cream strip. |
| Apricot tile   | Apricot fills the one loud thing on a screen: the primary CTA (ink text, never white), the emphasis word, markers, badges.                                     |
| Three layers   | Compositions come in threes: three ways in, three stats, three-layer diagrams.                                                                                 |
| The fold       | The 45° folded corner marks **files** — rule cards, AGENTS.md, code tabs. Nothing else.                                                                        |
| Rounded tile   | Cards and panels 22px (`rounded-panel`), controls 12px (`rounded-control`), chips 6px (`rounded-chip`), icon tiles 22% (`rounded-tile`).                       |
| Wordmark       | Manrope 800 display with tight tracking (−0.04em), sentence case, one apricot emphasis word. Mono only for code, file names, numbers and data.                 |
| Character      | Stacky (6 poses) and sticker illustrations: 3px ink outline, flat fills, hard shadow, cream die-cut, apricot badge.                                            |

## Non-negotiables

- **No mono UPPERCASE eyebrows.** A section label is `<Label>`: a square
  `<Marker>` plus sentence-case text.
- **No pulsing dots, no blur glow blobs, no gradients for decoration.** The
  one allowed light is the warm radial on an ink band.
- **No raw hex, no arbitrary `text-[..px]`, no `shadow-lg/xl/2xl`.** Tokens
  only (`@stackitfast/ui` classes, CSS variables, `tokens.ts`).
- **No white text on apricot.** Apricot always carries ink text.
- **No emoji** in UI copy or chrome. Stacky and stickers carry the personality.
- **No dark mode toggle.** The ink shell _is_ the theme; paper is for reading.
- Every screen passes `scripts/contrast-check.mjs` and `scripts/design-lint.mjs`.

## Surface decision

1. Is it long reading (project breakdown, rule text, insight article,
   legal page)? → **paper panel** inside the ink shell.
2. Is it a hero, a listing header, a tool, a flow (survey, results), a
   marketing section, a footer? → **ink**.
3. Is it a file? → `FileCard` with the fold, or an ink-deep code window.
4. Is it empty, loading, done or lost? → Stacky with the matching pose.

Details: [references/surfaces.md](references/surfaces.md).

## References

| File                                      | Read when                                                                |
| ----------------------------------------- | ------------------------------------------------------------------------ |
| [principles.md](references/principles.md) | You need the why: how each rule comes from the mark and the character    |
| [tokens.md](references/tokens.md)         | Any colour, radius, shadow, motion, z-index or width decision            |
| [typography.md](references/typography.md) | Headings, labels, body, mono, emphasis                                   |
| [surfaces.md](references/surfaces.md)     | Ink vs paper, section rhythm, page skeletons                             |
| [components.md](references/components.md) | Using or extending `@stackitfast/ui` components                          |
| [patterns.md](references/patterns.md)     | Building a page section (hero picker, tool cards, share fan, spec line…) |
| [motion.md](references/motion.md)         | Any animation or transition                                              |
| [voice.md](references/voice.md)           | Writing UI copy, buttons, labels, empty states                           |
| [rollout.md](references/rollout.md)       | Which pages are migrated and the order of the rest                       |

Brand mark, lockups, Stacky usage and asset commands live in the
`stackitfast-brand` skill; drawing new stickers or Stacky poses in
`stackitfast-illustrations`. To migrate one file, run `design-refactor-page`.

## Scripts

- `bun scripts/contrast-check.mjs --tokens packages/ui/src/tokens.ts` — every
  required pair, read from the real tokens; exits 1 on failure (CI).
- `node scripts/design-lint.mjs [paths] [--strict]` — reports banned patterns
  as `file:line`. Allow a real exception with
  `// design-lint-allow <rule>: reason`.
- Visual review: `cd packages/ui && bun run preview`, open `#gallery` (every
  component and illustration) and `#character` (the reference homepage).
