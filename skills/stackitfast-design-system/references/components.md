# Components — `@stackitfast/ui`

Import from `@stackitfast/ui` (components, icons, tokens) and
`@stackitfast/ui/illustrations` (Stacky, stickers). Live review: preview
`#gallery`. Apps never re-create these; extend the package instead.

## Brand

| Component     | Props                                                   | Notes                                                                               |
| ------------- | ------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| `BrandMark`   | `brand` fast/first · `size` sm/md/lg/xl or px · `onInk` | The tile. FIRST on ink gets a faint edge.                                           |
| `BrandLockup` | same + `onInk`                                          | Tile + lowercase wordmark, sr-only product name. Apps wrap it as `BrandLogo.astro`. |

## Actions

**`Button`** (`buttonVariants` for links): variants `primary` (apricot, ink
text, one per view) · `ink` (on paper) · `cream` (on ink) · `outline-ink` ·
`ghost-ink` · `outline` (secondary on paper) · `ghost` (quiet on paper) ·
`danger` (filled, destructive confirms only).
Sizes `xs` `sm` `md` `lg` `xl` + `icon-*`. Always sans. Hover lifts 2px (not
under reduced motion). A single icon always renders on the right.
`CopyButton` takes the same variants (`outline-ink` inside code windows).

## Character primitives

| Component    | Use                                                                                     |
| ------------ | --------------------------------------------------------------------------------------- |
| `Marker`     | 6px square; `tone` accent/ink/cream. Replaces every dot.                                |
| `Label`      | Marker + sentence-case text; `onInk`. Replaces eyebrows.                                |
| `Chip`       | `tone` paper/ink/accent/soft/on-ink/on-ink-accent · `size` sm/md · `mono` for data.     |
| `IconTile`   | 22% tile around an icon; `tone` soft/accent/ink/on-ink · `size`.                        |
| `OptionTile` | A picker choice (hero, survey): icon, label, hint, `selected`, `onInk`. `aria-pressed`. |
| `Segmented`  | Radio group with arrow-key navigation; `onInk`. For team size, filters, New/Top.        |

## Product moments

| Component    | Use                                                                                                                                                                                                   |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ToolCard`   | Illustration well + title + body + `spec` line + `action`. `feature` = big (two rows in a bento).                                                                                                     |
| `CodeWindow` | Tabs (active tab folded), line numbers, markdown colouring for AGENTS.md-style files. `onTabChange`, `actions`. Not used by the apps yet: their code windows are `ink-deep` panels (see patterns.md). |
| `FileCard`   | Anything that is a file: mono file name, title, body, footer chips; folded corner that grows on hover. `onInk`.                                                                                       |
| `ShareCard`  | DOM mock of a stack card, for the gallery only. Real cards are PNGs from `/card/s/…` and `/card/r/…` (lib/stackCard.ts).                                                                              |

## Surfaces and feedback

- **`Card`** — `paper-raised` (default) · `paper` · `ink` · `well` · `demo` ·
  `placeholder-dashed`. `padding` sm/md/lg.
- **`Modal`** — ink scrim (`bg-ink/60` + blur), pop-in, focus trap, sheet on
  mobile; portals to `<body>` (the header's blur would clip it) and puts
  `role="dialog"` on the panel, so pass `aria-labelledby`.
- **`Alert`** — `info` · `warning` · `success` · `error`, sans text.
- **`Input` / `Textarea` / `Select`** — 14px text on paper-raised; hints and
  errors at `text-sm`. On ink, the editor wraps fields in `InkSurface`
  (apps/web project-editor/EditorFields) so they switch to on-ink tokens.
- **`Spinner`**, **`CodeBlock`** (ink-deep command/block with copy),
  **`EmptyState`** (`illustration` takes a Stacky pose or sticker; `icon` is
  the fallback tile), **`SectionHeading`** (`onInk` for the ink shell,
  `highlight` colours one word).
- Removed: `Badge` → `Chip`, `IconCircle` → `IconTile`, `Tabs` → `Segmented`
  (or a real tablist when there are panels), `Progress`, `InputField`.

## Illustrations (`@stackitfast/ui/illustrations`)

- `Stacky` — `pose`: default · wink · wave · think · celebrate · sleep. Give it
  a `title` when it carries meaning, otherwise it is decorative.
- Tool stickers — `IllSurvey`, `IllExplore`, `IllRules`, `IllCompare`,
  `IllInsights`, `IllShare`.
- `CategorySticker` — `category` = directory slug (devtools, saas, ai,
  data-infra, analytics, internal-tools, content, collaboration, devops,
  automation, auth-identity, commerce, mobile).
- Helpers for new drawings: `DieCut`, `Badge`, `Frame` (see the
  `stackitfast-illustrations` skill).

Size illustrations with a wrapper width (`<div class="w-44"><Stacky/></div>`);
they scale to their container.

## Utilities (Tailwind preset)

`fold` `fold-sm/lg/xl` `fold-grow` (+ `[--fold-color:…]`) · `lift` ·
`no-scrollbar` · `animate-snap/rise/pop/drop/blink` (use with `motion-safe:`) ·
`prose-ink`.
