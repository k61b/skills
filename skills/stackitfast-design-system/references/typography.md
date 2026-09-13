# Typography — Manrope + IBM Plex Mono

## Google Fonts declaration

`apps/web/src/layouts/Layout.astro` (currently lines ~90-96) loads IBM Plex
Sans + IBM Plex Mono via a single Google Fonts `<link>`. Replace with:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=IBM+Plex+Mono:wght@400;500;600&display=swap"
  rel="stylesheet"
/>
```

Drop IBM Plex Sans entirely (Manrope replaces it); keep IBM Plex Mono at a
trimmed weight set (400/500/600 — the app never uses 700 mono).

## `packages/ui/src/tokens.ts` — `fonts`

```ts
export const fonts = {
  sans: [
    'Manrope',
    'system-ui',
    '-apple-system',
    'BlinkMacSystemFont',
    'Segoe UI',
    'Roboto',
    'sans-serif',
  ],
  mono: [
    'IBM Plex Mono',
    'ui-monospace',
    'SFMono-Regular',
    'Menlo',
    'Monaco',
    'Consolas',
    'monospace',
  ],
  sansString:
    "'Manrope', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  monoString: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
} as const;
```

Mirror the family name change in `packages/ui/src/styles/globals.css`
(`--font-sans`, `--font-mono` — same three places noted in the exploration:
tokens.ts, globals.css, and the Google Fonts link are the only three spots).

## Type scale (`fontSizes` in `tokens.ts`)

The current scale tops out at 46px hero / 14.5px body, tuned for a dense
dev-tool UI. For a minimal, airy pastel feel, raise body size and hero size:

```ts
export const fontSizes = {
  xs: ['10px', { lineHeight: '14px', letterSpacing: '0.06em' }],
  '2xs-mono': ['10.5px', { lineHeight: '14px', letterSpacing: '0.07em' }],
  sm: ['12px', { lineHeight: '17px', letterSpacing: '0.02em' }],
  'sm-mono': ['12px', { lineHeight: '16px', letterSpacing: '0.04em' }],
  base: ['14px', { lineHeight: '1.55' }],
  md: ['15px', { lineHeight: '1.6' }],
  body: ['16px', { lineHeight: '1.6', letterSpacing: '-0.005em' }],
  lg: ['18px', { lineHeight: '1.45', letterSpacing: '-0.01em' }],
  xl: ['21px', { lineHeight: '1.35' }],
  '2xl': ['32px', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
  '3xl': ['38px', { lineHeight: '1.12', letterSpacing: '-0.025em' }],
  hero: ['54px', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
} as const;
```

Mono sizes (`xs`, `2xs-mono`, `sm-mono`) keep their tight tracking — they're
still used for badges/eyebrows/tags. Sans sizes (`base` upward) get looser,
larger, more readable settings appropriate to Manrope.

## Usage rules

- Mono (`font-mono`) stays reserved for: eyebrows (one per section, max),
  stat numerals, tech/stack tags, code, timestamps. Never for headings or
  body copy.
- Headings use Manrope 700–800. Body copy uses Manrope 400–500.
- Drop the reflexive `uppercase tracking-widest` on every mono label — only
  true section eyebrows get it; inline tags (tech chips, mode badges) stay
  normal case or small-caps-style without the wide tracking.
- Emphasis word in headlines (pattern #1): use `font-mono` italic or a CSS
  underline/marker highlight (`background: linear-gradient` clipped to text
  baseline using `accent.highlight`) instead of bolding — bold-everywhere
  headlines read as templated.
