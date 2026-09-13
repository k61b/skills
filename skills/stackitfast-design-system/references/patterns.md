# Layout patterns

Thirteen reusable structural patterns distilled from reference research
(seenpaid, riffleboard, Cal.com, ChatSEO, Brutal Pages). Each entry: what it
is, where to use it on this site, and a markup sketch using only token
utilities (`bg-*`, `text-*`, `border-*`, `shadow-*`, `rounded-*` from the new
scale — never raw Tailwind defaults or hex).

Do not use every pattern on every page. Pick 3–5 per page; repeating all 13
everywhere is itself a template tell.

## 1. Mono eyebrow + headline with one emphasized word

```html
<div
  class="font-mono text-2xs-mono uppercase tracking-widest text-accent-ink flex items-center gap-2"
>
  <span class="w-1.5 h-1.5 rounded-full bg-accent"></span>
  <span>Real-world stack decisions</span>
</div>
<h1 class="text-3xl sm:text-4xl lg:text-hero font-bold text-text-primary tracking-tight">
  Choose your stack based on
  <span class="relative inline-block">
    <span class="relative z-10">real projects</span>
    <span class="absolute inset-x-0 bottom-1 h-3 bg-accent-highlight -z-0"></span> </span
  >, not guesswork.
</h1>
```

Use for: hero H1 on `index.astro`, and top-of-page H1 banners on `/explore`,
`/rules`, `/insights` (replace the current pulsing-dot eyebrow banner from
`.agents/rules/design-system.md`'s old "Explore standard").

## 2. Pill nav with mono badge

```html
<a
  href="/rules"
  class="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-text-primary"
>
  Rules & Skills
  <span class="font-mono text-[10px] px-1.5 py-0.5 rounded-full bg-accent-soft text-accent-ink"
    >NEW</span
  >
</a>
```

Use for: `HeaderNav.tsx` items that need a status flag (new insights report,
free tools).

## 3. Browser-chrome demo card

```html
<div class="rounded-lg border border-border-card bg-surface-card shadow-soft overflow-hidden">
  <div class="flex items-center justify-between px-4 py-2.5 border-b border-border bg-surface-base">
    <div class="flex items-center gap-2 font-mono text-xs text-text-muted">
      <span class="w-2.5 h-2.5 rounded-full bg-border-interactive"></span>
      stackitfast.com/explore
    </div>
    <span class="font-mono text-[10px] px-1.5 py-0.5 rounded-full bg-accent-subtle text-accent-ink"
      >SAMPLE DATA</span
    >
  </div>
  <div class="p-4"><!-- live content --></div>
</div>
```

Use for: hero right-column "featured architectures" card (replaces the
current plain `cardVariants` list).

## 4. Handwritten annotation arrow

SVG hand-drawn arrow + rotated `font-mono italic` caption pointing at one
interactive element. Max one per page — use it to point at the primary CTA
or the demo card, never decoratively.

## 5. Numbered step cards

```html
<div class="grid sm:grid-cols-3 gap-6">
  <div class="rounded-md border border-border-card bg-surface-card p-6">
    <span class="font-mono text-xs text-text-dim">01</span>
    <h3 class="mt-3 font-semibold text-text-primary">Connect your stack</h3>
    <p class="mt-1.5 text-sm text-text-secondary">...</p>
  </div>
  <!-- 02, 03 -->
</div>
```

Use for: "How it works" section on `index.astro`.

## 6. Bento icon tiles

Asymmetric grid (one 2x1 tile + several 1x1 tiles) of `IconCircle` + label +
one-line description. Use for "Browse by category" — replace the current
uniform 4-tile grid with one taller/wider anchor tile.

## 7. Big-numeral stats trio

Already exists in the hero stats row — restyle only: numerals get `font-mono
text-2xl text-text-primary font-bold`, labels get `text-2xs-mono
text-text-muted` without forced uppercase tracking-widest on every one.

## 8. Honesty disclosure block

```html
<div class="rounded-md border border-border-card bg-surface-item p-5 flex gap-3">
  <InfoIcon class="shrink-0 text-accent-ink" />
  <div class="text-sm text-text-secondary space-y-1">
    <p><strong class="text-text-primary">X posts</strong> through your own X API key...</p>
  </div>
</div>
```

Use for: a "How verification works" block near `/explore` or `/project/[slug]`.

## 9. Trust strip

Grayscale-to-color-on-hover logo row, or avatar cluster + star rating for
testimonials. Use for the existing "Featured on" strip — restyle logos to
sit on `bg-subtle` with `opacity-60 hover:opacity-100`.

## 10. FAQ accordion

Use the existing `Tabs`/disclosure primitives; each item: hairline
`border-b border-border`, `+`/`−` glyph (no emoji), `font-semibold
text-text-primary` question, `text-text-secondary` answer. Add to
`index.astro` bottom and to `/rules` and `/insights` templates.

## 11. Blueprint corner marks

Keep the existing bottom-banner blueprint grid + crosshair corner marks
concept, restyled: grid lines `border-border-subtle`, crosshairs
`text-border-interactive`, on an `bg-subtle` background instead of the dark
"blueprint" backdrop.

## 12. Pastel-topped + dashed placeholder cards

```html
<div
  class="rounded-md border border-dashed border-border-interactive bg-surface-base p-5 flex flex-col items-center justify-center text-center gap-2"
>
  <span class="font-mono text-[10px] uppercase tracking-widest text-text-dim">Free place</span>
  <span class="text-sm text-text-muted">Your stack here</span>
</div>
```

Use for: empty/placeholder slots in `/explore` and `/stack` listings when a
category has few entries — invites submission instead of looking broken.

## 13. Segmented control

```html
<div class="inline-flex rounded-full border border-border-card bg-surface-card p-1">
  <button class="rounded-full px-4 py-1.5 text-xs font-semibold bg-accent text-text-primary">
    Agent
  </button>
  <button
    class="rounded-full px-4 py-1.5 text-xs font-medium text-text-secondary hover:text-text-primary"
  >
    Hybrid
  </button>
  <button
    class="rounded-full px-4 py-1.5 text-xs font-medium text-text-secondary hover:text-text-primary"
  >
    Classic
  </button>
</div>
```

Use for: dev-mode filter control on `/explore` (agent / hybrid / classic),
replacing the current plain filter chips.
