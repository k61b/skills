# Rollout — Stack File · Character

Plan: seven phases, each its own PR (merge to main deploys). Track status
here; `design-lint.mjs` counts are the progress meter.

| Phase | Scope                                                                                                                           | Status                                              |
| ----- | ------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| 1     | Tokens (generated CSS vars), preset plugin, components, illustrations, shell (header, footer, 404)                              | done — `design/character`                           |
| 2     | Skills (this one, stackitfast-brand, stackitfast-illustrations, design-refactor-page), rules, lint + contrast in CI, publishing | done — `design/character`                           |
| 3     | Survey reorder (type + team first, 4 team sizes, answers_version 3) and the new homepage                                        | done — `design/character`                           |
| 4     | Shareable stack cards: survey result + GitHub repo, personality, PNG routes                                                     | done — `design/character`                           |
| 5a    | `/explore`, `/explore/[category]`, `DirectoryInteractive`                                                                       | done — `design/character`                           |
| 5b    | Project page, editor, `/share`, `/me`                                                                                           | done — `design/character`                           |
| 5c    | Rules, compare, technologies, insights                                                                                          | done — `design/character`                           |
| 5d    | Survey, results, modals, admin, legal                                                                                           | done — `design/character`                           |
| 6     | Stack It First, OG images, badge, diagram colours                                                                               | done — `design/character`                           |
| 7     | `design-lint --strict` in CI, final metrics, live check                                                                         | done — `design/character` (live check after deploy) |

## Baseline (design-lint, 2026-09-29, before page migration)

418 findings across the apps and packages/ui (after allow-listing the Google icon): 133 mono-eyebrow, 15 pulse,
38 hex, 77 arbitrary-size, 93 legacy-radius, 55 rounded-full, 3 glow,
2 arbitrary-color, 2 emoji. Target at phase 7: 0 (with documented
allow-list exceptions).

## Result (2026-09-30, end of phase 6)

0 findings. CI runs `design-lint.mjs --strict`, so a new banned pattern fails
the build. The page-by-page drop: 418 → 396 (homepage) → 366 (explore) →
300 (project page) → 211 (editor) → 158 (content pages) → 76 (flows) → 46
(Stack It First) → 0 (OG, badge, diagram, UI primitives).

## Per-file routine

Run the `design-refactor-page` skill on one file at a time; it inventories
with design-lint, applies the surface decision and components, and verifies
(typecheck, contrast, lint, 1440 + 390px screenshots).

## Known exceptions (allow-listed)

Each carries a `design-lint-allow` comment with its reason:

- Google sign-in icon brand colours (`packages/ui` icons, file-level `hex`).
- `rounded-full` on avatars (`HeaderNav`), `Spinner` and `IconCircle`
  (prefer `IconTile` in new UI).

The X/Twitter blue button is gone: share-to-X uses the ink button.
