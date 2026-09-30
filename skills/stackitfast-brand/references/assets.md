# Asset pipeline

All generated from code; never edit the PNGs by hand.

| Command                                                               | Writes                                                                                                                                                                                                                         |
| --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `bun run --cwd apps/web brand:export` (and `--cwd apps/stackitfirst`) | `public/favicon.svg`, `favicon.ico` (16/32/48), `favicon-{32,48,96,192,512}.png`, full-bleed `apple-touch-icon.png`, `icon-maskable-512.png` (80% safe zone), `safari-pinned-tab.svg`, `site.webmanifest`, outlined `logo.svg` |
| `bun run --cwd apps/web brand:og`                                     | `public/og-preview.png`, `og-explore.png`, `og-rules.png`, `og-insights.png` (headless Chrome, 1200×630)                                                                                                                       |
| `bun run --cwd apps/stackitfirst brand:og`                            | `public/og.png`                                                                                                                                                                                                                |
| `python3 scripts/brand/outline-wordmark.py`                           | `scripts/brand/wordmark.generated.ts` (Manrope 700 outlines)                                                                                                                                                                   |

Sources:

- Mark geometry and palettes: `packages/ui/src/brand.ts`
  (`BRAND_MARK`, `BRAND_PALETTES`, `BRAND_PALETTE_VARS`, `brandMarkSvg`).
- Exporter: `scripts/brand/lib.ts`.
- Dynamic per-project OG: `apps/web/src/lib/ogImage.ts` (resvg-wasm in the
  Worker; fonts in `apps/web/public/fonts/og`). It draws the lockup from
  `BRAND_MARK` plus a live-text wordmark, and Stacky with `stackySvg()`
  (the React component rendered to static markup). Share cards reuse the same
  renderer (`lib/stackCard.ts`: 1080×1440 post, 1080×1920 story, 1200×630
  og). Review changes with `bun apps/web/scripts/cards/preview.ts <dir>`.
- README badge: `apps/web/src/pages/badge/[slug].svg.ts`.

After changing the mark: run both `brand:export`s and `brand:og`s, commit the
outputs, and after deploy byte-compare the live files against `main`.

## OG and share-card templates

- Ink background, cream text, one apricot emphasis, the lockup top-left,
  Stacky (small, a pose that fits) or a tool sticker as the visual.
- Titles ≤ 2 lines at 64px; real numbers from the data.
- Colours from `tokens.ts` / `cardThemes` — no hex literals in builders.
- Share cards: full-bleed `cardThemes` colour chosen by the stack
  personality (`lib/stackPersonality.ts`), lockup top-left, a context chip
  top-right, four layer rows (light themes: ink outline + hard shadow),
  one footnote line, Stacky celebrating bottom-right, the page URL in mono.
- Story format keeps ~220px clear at the top and ~250px at the bottom for
  the app's own UI.
- Routes: `/card/s/<share code>.png` (survey, no database) and
  `/card/r/<owner>/<repo>.png` (repo, cached in `repo_cards`), each with
  `?format=post|story|og` and `?w=480|840` for thumbnails; pages `/s/<code>`
  and `/r/<owner>/<repo>`. The edge caches card routes on `format` and `w`
  only; `/r` spends GitHub quota within a per-IP budget (lib/repoCards.ts).
