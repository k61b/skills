# Patterns

Reference implementation: the homepage, `apps/web/src/pages/index.astro` (the
first concept is kept at `packages/ui/preview/HomeCharacter.tsx`, `#character`).
Pick the patterns a page needs; never repeat one layout twice on a page.

## 1. Hero picker (product in the hero)

Ink. Left: headline with one apricot emphasis phrase, a 2–3 line lead, three
short proof bullets with Markers. Right: a raised panel (`bg-ink-raised`,
`rounded-panel`, `shadow-lift`) with the survey's first question as
`OptionTile`s, team size as `Segmented`, one full-width primary CTA and a
one-line hint. Stacky (wink) peeks over the panel's top-right corner.

## 2. Section head with Stacky

A small Stacky (≈72px, default pose) left of an `h2` (30px, 800) and a
one-line description. Use for the first section after the hero only.

## 3. Tool cards (three ways in)

`ToolCard` bento: one `feature` card spanning two rows + two regular cards
(`lg:grid-cols-2 lg:grid-rows-2`), or three equal cards. Each has a sticker,
a title, one sentence, a **spec line** (see 5) and one CTA.

## 4. Share fan

Five real stack cards (server PNGs from `/card/s/<code>.png?format=post&w=480`)
fanned (`apps/web/src/components/home/CardFan.astro`), the primary card in
front and upright, beside an ink-raised panel with an input
("github.com/you/repo") and a primary CTA. Explain what is read and what is
saved in a hint line. Thumbnails use `?w=480`; full-size pages add a `srcset`.

## 5. Spec line

Under a tool or card: concrete limits and outputs, with the numbers bold —
"**16 questions** · about 2 minutes. Gives you **a stack, a diagram and a
prompt**." Never marketing adjectives.

## 6. Honesty table

A cream (paper) section: left, an `h2` ("How a stack gets in") and two short
paragraphs; right, a ruled list of rows — label, one-line explanation, and a
big number read from the database (architectures, technologies, rule sets,
categories, licence).

## 7. Ink band

A full-width ink panel (`rounded-panel` inside the content column, or
full-bleed) with a Label, a strong line and one CTA — optionally a code
window on the right and one warm radial light in a corner.

## 8. Code window

The real file (AGENTS.md, stack.mdc, SKILL.md, CLAUDE.md) in an `ink-deep`
panel: `rounded-panel border border-on-ink-line`, a file-name bar, mono text
in `text-on-ink` (`text-sticker-peach` for inline code) and a
`CopyButton variant="outline-ink"`. The apps build it this way
(project prompt, results, rule viewer); `CodeWindow` adds tabs and line numbers
for a gallery-grade version. Pair with a two-column grid of the formats and
which agent reads each.

## 9. File card grid

Rules, skills and reports as `FileCard`s (2–3 columns): mono file name, title,
one line, format chips (`Chip mono`). The fold grows on hover.

## 10. Three stats

Three (or four) big Manrope 800 numbers with a one-line label each, separated
by left borders. Numbers come from data, not copy.

## 11. Empty, loading, done, lost

`EmptyState`-style block with Stacky: `think` while waiting or empty search,
`celebrate` on success (published, card made), `sleep` for 404 and
"nothing here yet", `wave` for sign-in prompts. One sentence and one action.

## 12. SEO footer

Ink footer with lockup, one-line promise, newsletter, and link columns
(Product · Popular stacks · Categories · Family). Only link pages that exist.
