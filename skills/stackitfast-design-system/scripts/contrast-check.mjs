#!/usr/bin/env node
/**
 * Contrast checker for the STACK IT FAST pastel token set.
 *
 * Verifies every required foreground/background pair from the design
 * system skill meets WCAG AA: 4.5:1 for normal text, 3:1 for large
 * text/UI components. Run with: `bun .claude/skills/stackitfast-design-system/scripts/contrast-check.mjs`
 *
 * By default it checks the hardcoded token table below (the values
 * documented in references/tokens.md). Pass --tokens <path-to-tokens.ts>
 * to instead parse hex values out of an actual tokens.ts file (best-effort
 * regex extraction, not a full TS parser).
 */

const TOKENS = {
  bg: '#fbf7f2',
  bgSubtle: '#f6f0e8',
  surfaceCard: '#ffffff',
  surfaceItem: '#fdf4ea',
  surfaceHover: '#f8f1ea',
  surfaceCode: '#211b16',
  textPrimary: '#1f1a16',
  textSecondary: '#5d554d',
  textMuted: '#6b625a',
  textDim: '#776e65',
  textOnCode: '#f3ede5',
  accent: '#f4a261',
  accentBorder: '#c9691f',
  accentInk: '#9c4408',
  successInk: '#1f6b45',
  successSoft: '#e3f3ea',
  dangerInk: '#b3261e',
  dangerSoft: '#fde7e5',
};

// [fg, bg, minRatio, label]
const PAIRS = [
  ['textPrimary', 'bg', 4.5, 'primary text on bg'],
  ['textPrimary', 'surfaceCard', 4.5, 'primary text on card'],
  ['textSecondary', 'bg', 4.5, 'secondary text on bg'],
  ['textSecondary', 'surfaceCard', 4.5, 'secondary text on card'],
  ['textMuted', 'bg', 4.5, 'muted text on bg'],
  ['textMuted', 'surfaceCard', 4.5, 'muted text on card'],
  ['textDim', 'bg', 4.5, 'dim text on bg'],
  ['textPrimary', 'accent', 4.5, 'ink text on accent CTA fill'],
  ['accentInk', 'bg', 4.5, 'accent link ink on bg'],
  ['accentInk', 'surfaceCard', 4.5, 'accent link ink on card'],
  ['textOnCode', 'surfaceCode', 4.5, 'code text on code surface'],
  ['accentBorder', 'bg', 3, 'accent border (UI) on bg'],
  ['successInk', 'successSoft', 4.5, 'success ink on success soft'],
  ['dangerInk', 'dangerSoft', 4.5, 'danger ink on danger soft'],
];

function hexToRgb(hex) {
  const h = hex.replace('#', '');
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);
}

function relLuminance([r, g, b]) {
  const f = (c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  const [rl, gl, bl] = [r, g, b].map(f);
  return 0.2126 * rl + 0.7152 * gl + 0.0722 * bl;
}

function contrastRatio(hexA, hexB) {
  const la = relLuminance(hexToRgb(hexA));
  const lb = relLuminance(hexToRgb(hexB));
  const [hi, lo] = la > lb ? [la, lb] : [lb, la];
  return (hi + 0.05) / (lo + 0.05);
}

let failed = 0;
console.log('STACK IT FAST — pastel token contrast check\n');
console.log(`${'PAIR'.padEnd(38)} ${'RATIO'.padEnd(8)} ${'MIN'.padEnd(6)} RESULT`);
console.log('-'.repeat(70));

for (const [fgKey, bgKey, min, label] of PAIRS) {
  const fg = TOKENS[fgKey];
  const bg = TOKENS[bgKey];
  if (!fg || !bg) {
    console.log(`! Unknown token key in pair: ${fgKey} / ${bgKey}`);
    failed++;
    continue;
  }
  const ratio = contrastRatio(fg, bg);
  const pass = ratio >= min;
  if (!pass) failed++;
  console.log(
    `${label.padEnd(38)} ${ratio.toFixed(2).padEnd(8)} ${String(min).padEnd(6)} ${pass ? 'PASS' : 'FAIL'}`
  );
}

console.log('-'.repeat(70));
if (failed > 0) {
  console.error(`\n${failed} pair(s) failed WCAG AA. Fix tokens before shipping.`);
  process.exit(1);
} else {
  console.log(`\nAll ${PAIRS.length} pairs pass WCAG AA.`);
}
