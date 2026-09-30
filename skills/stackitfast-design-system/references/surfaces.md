# Surfaces — ink shell, paper panels

## The frame

Every page: cream **top bar** (`bg-paper/95`, sticky, lockup + nav + ink
"Share your stack" button) → **content** → **ink footer**. The header and
footer live in `apps/*/src/layouts/Layout.astro`; pages never rebuild them.

## Ink

For heroes, listing headers, tools and flows (survey, results, share),
marketing sections, the footer and 404.

- Page: `bg-ink text-on-ink`. Sections stack with `py-20`–`py-24`.
- Cards: `Card variant="ink"` or `ToolCard` (`bg-ink-raised`,
  `border-on-ink-line`, `rounded-panel`).
- Illustration wells: `bg-ink-well`.
- Raised panels that float (hero picker, menus): add `shadow-lift`.
- One warm light per band is allowed:
  `radial-gradient(closest-side, rgba(244,162,97,.22), transparent)` in a
  corner, `pointer-events-none`.

## Paper

For long reading: project breakdowns, rule text, insight articles, compare
tables, legal pages, forms with many fields.

- Panel: `Card variant="paper"` (`bg-paper`, `border-border-card`,
  `rounded-panel`) inside the ink frame, or a full-width cream section when
  the whole page is reading (e.g. the "How a stack gets in" section).
- Text uses `text-text-*`; prose uses `prose` (paper) — `prose-ink` exists
  for short rich text on ink.

## Hybrid page skeletons

- **Listing** (`/explore`, `/rules`, `/insights`, `/stack`): ink header band
  (Label, title, one-line lead, filters as `Segmented`/`Chip`s) → paper
  results area (cards/rows) → ink FAQ or CTA band.
- **Detail** (`/project/[slug]`, `/rules/[slug]`, `/compare/[slug]`): ink
  header (breadcrumb, title, spec line, actions, stack chips) → paper reading
  column + sticky rail → ink "use this stack" band with a code window.
- **Flow** (`/survey`, `/results`, `/share`): all ink; OptionTiles, one
  primary CTA, Stacky in the matching pose.

## Rhythm

- Content width `max-w-content` (1120px); header/footer `max-w-wide`.
- Side gutters `px-4 sm:px-6`. Section spacing is generous (`py-20`+); inside
  cards `p-6`–`p-7`.
- Threes: three tool cards, three stats, three layers.

## Menus and popovers

- Menus opened from the site header (account menu, mobile drawer) are **ink**
  (`bg-ink-raised` / `bg-ink`), like the nav they belong to. They portal to
  `<body>` when they are `fixed`: the header's blur clips fixed children.
- Popovers inside page content (row menus, `Select`) are **paper-raised** with
  `border-border-card` and `shadow-lift`.
