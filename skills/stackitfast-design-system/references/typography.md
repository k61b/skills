# Typography

**Manrope** (400–800) for everything; **IBM Plex Mono** (400–600) only for
code, file names, versions, counts and commands. Loaded once in each app's
`Layout.astro` from Google Fonts.

## Scale (tokens.ts `fontSizes`)

| Class                   | Size            | Use                                               |
| ----------------------- | --------------- | ------------------------------------------------- |
| `text-display`          | 64 / 1.02 / −4% | homepage hero (use `sm:text-display`, 44px below) |
| `text-hero`             | 54 / 1.05 / −3% | listing and legal H1 banners (`sm:text-hero`)     |
| `text-4xl`              | 44 / −3.5%      | page heroes, big section heads                    |
| `text-3xl`              | 38              | page titles                                       |
| `text-2xl`              | 32              | section heads                                     |
| `text-xl`               | 21              | card titles (tool cards, features)                |
| `text-lg`               | 18              | lead paragraphs, card titles on paper             |
| `text-body` / `text-md` | 16 / 15         | body                                              |
| `text-base`             | 14              | UI text, labels, menu items                       |
| `text-sm`               | 12              | meta, captions                                    |
| `text-2xs`              | 11              | dense data rows                                   |

`text-xs` (10px) is too small for UI copy and design-lint flags it;
`text-2xs-mono` and `text-sm-mono` are legacy.
Never write `text-[13px]`; pick the nearest step.

## Headings

- Weight 800 for display and page heroes, 700 for section and card titles.
- Tracking: `tracking-[-0.04em]` display, `-0.035em` heroes, `-0.025em`
  titles, `-0.02em` card titles.
- **Sentence case** everywhere. The product name in copy is "STACK IT FAST";
  the lowercase wordmark belongs to the logo only.
- One **emphasis** word or phrase per headline, in `text-accent` on ink or
  `text-accent-ink` on paper: "Pick a stack that **already works.**"

## Labels (replaces eyebrows)

`<Label>` = square apricot `<Marker>` + 14px semibold sentence-case text.
One per section at most. Never mono, never uppercase, never tracked out.

## Body

16px, line-height 1.6, `text-on-ink-secondary` on ink or
`text-text-secondary` on paper. Keep lines under ~70 characters
(`max-w-prose` or `max-w-[520px]` for hero leads).

## Mono

For literal things only: `AGENTS.md`, `v0.3.0`, `116`, `$ npx skills add
k61b/skills`, commit hashes. Not for labels, buttons, nav or descriptions.
