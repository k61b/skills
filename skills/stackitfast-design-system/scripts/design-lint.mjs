#!/usr/bin/env node
/**
 * Design lint for the Stack File · Character language. Reports the patterns
 * the design system bans, as file:line, with a per-rule summary.
 *
 *   node .claude/skills/stackitfast-design-system/scripts/design-lint.mjs [paths…] [--strict] [--rule id]
 *
 * Default paths: apps/web/src, apps/stackitfirst/src, packages/ui/src.
 * Without --strict it always exits 0 (warn mode, used while the rollout is in
 * progress); with --strict it exits 1 on any finding.
 *
 * Escape hatches (use sparingly, say why):
 *   // design-lint-allow <rule-id>: reason      — on the line or the line above
 *   /* design-lint-allow-file <rule-id> *\/       — anywhere in the file
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { extname, join, relative } from 'node:path';

const RULES = [
  {
    id: 'mono-eyebrow',
    why: 'Mono UPPERCASE tracked labels are gone — use <Label> (marker + sentence case).',
    test: (l) => /font-mono/.test(l) && /\buppercase\b/.test(l) && /tracking-wid/.test(l),
  },
  {
    id: 'pulse',
    why: 'No pulsing dots — use <Marker>, it never animates.',
    test: (l) => /\banimate-pulse\b/.test(l),
  },
  {
    id: 'hex',
    why: 'Raw hex colour — use a token (tokens.ts / Tailwind class / CSS variable).',
    test: (l) =>
      /(?<![&\w/])#[0-9a-fA-F]{3}(?:[0-9a-fA-F]{3}(?:[0-9a-fA-F]{2})?)?\b/.test(l) &&
      !/^\s*(\/\/|\*|\/\*)/.test(l),
  },
  {
    id: 'arbitrary-color',
    why: 'Arbitrary colour class — use a token colour (with /opacity if needed).',
    test: (l) => /\b(?:bg|text|border|ring|fill|stroke)-\[(?:rgba?|hsl|#)/.test(l),
  },
  {
    id: 'arbitrary-size',
    why: 'Arbitrary font size — use the type scale (text-2xs … text-display).',
    test: (l) => /\btext-\[\d+(?:\.\d+)?px\]/.test(l),
  },
  {
    id: 'banned-shadow',
    why: 'Blurry default shadows are banned — use shadow-card / sticker / lift.',
    test: (l) => /\bshadow-(?:lg|xl|2xl)\b/.test(l),
  },
  {
    id: 'glow',
    why: 'No blur glow blobs (only the ink band’s warm light, allow-listed).',
    test: (l) => /\bblur-\[\d{2,}px\]/.test(l),
  },
  {
    id: 'legacy-radius',
    why: 'Legacy radius — use rounded-panel / control / chip / tile.',
    test: (l) => /\brounded-(?:md|lg|xl|2xl|3xl)\b/.test(l),
  },
  {
    id: 'rounded-full',
    why: 'Pills are gone — rounded-full only for avatars, spinners and progress (allow-list them).',
    test: (l) => /\brounded-full\b/.test(l),
  },
  {
    id: 'bare-radius',
    why: 'rounded, rounded-sm and rounded-[…] bypass the shape family — use panel / control / chip / tile.',
    test: (l) =>
      !/^\s*(\/\/|\*|\/\*)/.test(l) && /(?<![\w-])rounded(?:-sm|-\[[^\]]+\])?(?![\w-])/.test(l),
  },
  {
    id: 'legacy-surface',
    why: 'Pre-character surface classes — use ink / paper / on-ink tokens and shadow-card / sticker / lift.',
    test: (l) =>
      /\b(?:bg-surface-[\w-]+|text-text-onCode|text-text-contrast|shadow-subtle|shadow-soft)\b/.test(l),
  },
  {
    id: 'raw-white-black',
    why: 'White/black overlays — use on-ink-line / ink-deep / paper tokens instead.',
    test: (l) => /\b(?:bg|border|text|ring)-(?:white|black)(?:\/[\w.[\]]+)?(?![\w-])/.test(l),
  },
  {
    id: 'tiny-text',
    why: 'text-xs is 10px: too small for UI copy — text-2xs (11px) at the least, text-sm for labels.',
    test: (l) => /(?<![\w-])text-xs(?![\w-])/.test(l),
  },
  {
    id: 'all-caps-copy',
    why: 'UI copy is sentence case — no SHOUTED labels or buttons (acronyms are fine).',
    test: (l, file) => /\.(tsx|astro)$/.test(file) && shouting(l),
  },
  {
    id: 'emoji',
    why: 'No decorative emoji in UI.',
    test: (l) => /\p{Extended_Pictographic}/u.test(l.replace(/[©®™↗→←↑↓·–—]/g, '')),
  },
];

// Acronyms, product names and file names that are uppercase by nature.
const CAPS_OK = new Set(
  (
    'AI API APIS SQL URL URLS MIT UI UX CSS HTML JSON CLI SDK ORM MAU SEO OG PNG SVG AGENTS CLAUDE ' +
    'SKILL README LLM LLMS CI CD JWT RLS SSR SSG SPA PWA HTTP HTTPS REST RPC GRPC IDE MCP AWS GCP NPM ' +
    'STACK IT FAST FIRST FAQ RSS CSP DB GPT XML YAML TOML WASM CDN DNS VPS SSH TLS WCAG GDPR CCPA ' +
    'EU US UTC ISO ID IP OS CPU GPU RAM SAAS MVP CTA DX QA PR VS PDF CSV ETL OLAP OLTP CRUD CRM ERP ' +
    'SMS OTP SSO SAML OIDC RBAC ABAC KMS IAM VPC ECS EKS GKE AKS K8S TS JS JSX TSX MD MDX MDC GH ' +
    'RSC ISR SWR APM ELK LTS PHP GO SLA SLO TTL CORS XSS CSRF SQLI NOSQL OK AGY'
  ).split(' ')
);

/** True when the line shows SHOUTED copy: a JSX text node or string of caps words. */
function shouting(line) {
  if (/^\s*(\/\/|\*|\/\*)/.test(line) || /\bconsole\./.test(line)) return false;
  const chunks = [
    ...[...line.matchAll(/>([^<>{}]+)</g)].map((m) => m[1]),
    // A bare JSX text line (not an identifier list: no commas, brackets or calls).
    ...[...line.matchAll(/^\s*([A-Z][^<>{}'"`=;()[\],]*?)\s*$/g)].map((m) => m[1]),
    ...[...line.matchAll(/(?:label|title|placeholder|aria-label)[=:]\s*['"]([^'"]+)['"]/g)].map(
      (m) => m[1]
    ),
  ];
  return chunks.some((text) => {
    // SNAKE_CASE identifiers are code, not copy.
    const words = (text.match(/[A-Za-z_][A-Za-z0-9_]*/g) ?? []).filter((w) => !w.includes('_'));
    const loud = words.filter((w) => w.length >= 3 && w === w.toUpperCase() && /[A-Z]/.test(w));
    return loud.some((w) => !CAPS_OK.has(w));
  });
}

const EXT = new Set(['.astro', '.tsx', '.ts', '.jsx', '.mdx']);
const SKIP_DIRS = new Set(['node_modules', 'dist', '.astro', 'content']);
const SKIP_FILES = [
  /tokens\.ts$/,
  /cssVars\.ts$/,
  /\.test\.ts$/,
  /brand\.ts$/,
  /tailwind\.config\.ts$/,
];

const args = process.argv.slice(2);
const strict = args.includes('--strict');
const onlyRule = args.includes('--rule') ? args[args.indexOf('--rule') + 1] : null;
const roots = args.filter((a, i) => !a.startsWith('--') && args[i - 1] !== '--rule');
const targets = roots.length ? roots : ['apps/web/src', 'apps/stackitfirst/src', 'packages/ui/src'];

function* walk(p) {
  let st;
  try {
    st = statSync(p);
  } catch {
    return;
  }
  if (st.isDirectory()) {
    for (const e of readdirSync(p)) if (!SKIP_DIRS.has(e)) yield* walk(join(p, e));
  } else if (EXT.has(extname(p)) && !SKIP_FILES.some((r) => r.test(p))) yield p;
}

const findings = [];
for (const root of targets) {
  for (const file of walk(root)) {
    const src = readFileSync(file, 'utf8');
    const fileAllow = new Set(
      [...src.matchAll(/design-lint-allow-file ([\w-]+)/g)].map((m) => m[1])
    );
    const lines = src.split('\n');
    lines.forEach((line, i) => {
      for (const r of RULES) {
        if (onlyRule && r.id !== onlyRule) continue;
        if (fileAllow.has(r.id)) continue;
        if (!r.test(line, file)) continue;
        const near = `${lines[i - 1] ?? ''}\n${line}`;
        if (new RegExp(`design-lint-allow ${r.id}\\b`).test(near)) continue;
        findings.push({ file: relative(process.cwd(), file), line: i + 1, rule: r.id });
      }
    });
  }
}

for (const f of findings) console.log(`${f.file}:${f.line}  ${f.rule}`);
const byRule = Object.fromEntries(RULES.map((r) => [r.id, 0]));
for (const f of findings) byRule[f.rule]++;
console.log('\nDesign lint summary');
for (const r of RULES)
  if (!onlyRule || r.id === onlyRule)
    console.log(`  ${String(byRule[r.id]).padStart(4)}  ${r.id.padEnd(16)} ${r.why}`);
console.log(
  `\n${findings.length} finding(s)${strict ? '' : ' (warn mode — pass --strict to fail)'}`
);
process.exit(strict && findings.length ? 1 : 0);
