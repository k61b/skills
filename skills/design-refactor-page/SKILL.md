---
name: design-refactor-page
description: Refactor a single UI file (Astro page, React component, or Tailwind config) from the old dark amber dev-tool aesthetic to the new pastel/minimal design system, then verify with typecheck, contrast check, and a design-guidelines audit. Use when asked to "refactor this file to the new design", "apply the pastel redesign to X", or as the execution step after the stackitfast-design-system skill.
disable-model-invocation: true
license: MIT
---

Refactor **$ARGUMENTS** (a file path relative to the repo root) to the
STACK IT FAST pastel/minimal design system, then verify the result.

## Steps

1. **Load the design system.** Read
   `.claude/skills/stackitfast-design-system/SKILL.md` and whichever
   `references/*.md` are relevant to this file (tokens.md for any color
   work, typography.md for text/font work, components.md if the target is
   inside `packages/ui/src/components`, patterns.md if the target is a page
   section, migration-map.md to confirm this file's place in the overall
   order — flag it to the user if a prerequisite step upstream hasn't been
   done yet, e.g. refactoring `index.astro` before `tokens.ts` exists).

2. **Inventory before editing.** Read the target file in full. Grep it for:
   - raw hex colors (`#[0-9a-fA-F]{3,8}`)
   - Tailwind default palette classes (`bg-zinc-`, `text-emerald-`,
     `border-red-`, etc. — anything not `bg-surface-*`/`text-text-*`/
     `bg-accent*`/`border-border*`/`border-accent*`)
   - old radius/shadow values (`rounded-[4px]`, `shadow-lg`, `shadow-2xl`)
   - `ICON_STROKE_WIDTH` overrides or inline SVG stroke attributes
     List every match found before making any change, so nothing is missed
     silently.

3. **Apply the refactor.** Replace each hardcoded value with the matching
   design-system token utility. Apply relevant layout patterns from
   patterns.md where the file is a page section. **Preserve all behavior**:
   props, TypeScript interfaces, data-fetching (`getLiveProjects`, Astro
   content collections, etc.), event handlers, accessibility attributes
   (aria-*, roles) — this is a visual-only refactor. If the file contains
   business logic, do not touch it beyond what's needed to reach class
   names or inline styles.

4. **Typecheck.** Run the check for whichever package the file lives in:
   - `apps/web/**` → `cd apps/web && bunx astro check` (`.astro` files) or
     `bunx tsc --noEmit` (`.ts`/`.tsx`)
   - `packages/ui/**` → `cd packages/ui && bunx tsc --noEmit`
     Fix any type errors introduced by the refactor before continuing.

5. **Contrast check.** Run
   `bun .claude/skills/stackitfast-design-system/scripts/contrast-check.mjs`.
   It checks the fixed token table, not file-specific colors — if this file
   introduces a _new_ color pair not in that table, add it to the `PAIRS`
   array temporarily (or manually verify with the same formula) before
   declaring the refactor done.

6. **Design guidelines audit.** Invoke the `web-design-guidelines` skill
   (Vercel) against the diff for this file — accessibility, focus states,
   typography, motion, and anti-pattern rules.

7. **Visual check.** If the `run` skill is available for this project, use
   it to view the page containing this component at both a desktop
   (~1280px) and mobile (~390px) viewport width and take a screenshot.
   Skip this step for files with no visual surface of their own (e.g. a
   pure data/lib file — refuse to run this skill on such a file at all,
   since it has nothing to refactor).

8. **Report.** Summarize: what was replaced (old value → new token, as a
   short table), typecheck result, contrast check result, guidelines audit
   findings (if any), and screenshot observations. Do not modify
   `.agents/rules/*`, database/query code, or any file outside the single
   target path without calling that out explicitly first.

## Out of scope

- Do not run this skill against `.agents/rules/`, `packages/db/`, or any
  `api/*` route — those are not visual surfaces.
- Do not regenerate raster assets (OG images, favicons) — flag them for
  manual re-export instead, per migration-map.md §11.
- Do not add a dark theme, theme toggle, or second color hue family — the
  design system is light-pastel/single-hue only (see SKILL.md identity
  section).
