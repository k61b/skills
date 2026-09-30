#!/usr/bin/env bun
/**
 * Contrast checker for the STACK IT FAST token set (Stack File · Character).
 *
 * Verifies every required foreground/background pair meets WCAG AA:
 * 4.5:1 for text, 3:1 for large text and UI/graphical elements.
 *
 *   bun .claude/skills/stackitfast-design-system/scripts/contrast-check.mjs --tokens packages/ui/src/tokens.ts
 *
 * With --tokens (or when packages/ui/src/tokens.ts exists under the working
 * directory) the colours are read from the real tokens file, so the check can
 * never drift from what ships. Without it, the documented snapshot below is
 * used (for readers of the published skill outside this repo). Exits 1 on any
 * failure — CI runs it on every PR.
 */
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

// Snapshot of tokens.ts (fallback only).
const SNAPSHOT = {
  paper: '#fbf7f2',
  surfaceCard: '#ffffff',
  surfaceItem: '#fdf4ea',
  surfaceBase: '#f8f3ec',
  surfaceCode: '#211b16',
  textPrimary: '#1f1a16',
  textSecondary: '#5d554d',
  textMuted: '#6b625a',
  textDim: '#776e65',
  textOnCode: '#f3ede5',
  accent: '#f4a261',
  accentBorder: '#c9691f',
  accentInk: '#9c4408',
  accentSubtle: '#fff1e6',
  accentSubtleBorder: '#f6dcc4',
  successInk: '#1f6b45',
  successSoft: '#e3f3ea',
  dangerInk: '#b3261e',
  dangerSoft: '#fde7e5',
  ink: '#1f1a16',
  inkRaised: '#2a221c',
  inkWell: '#342a23',
  inkDeep: '#1a1511',
  onInk: '#fbf7f2',
  onInkSecondary: '#c4c0bb',
  onInkMuted: '#98948f',
  stickerPeach: '#ffd9b8',
  stickerRust: '#9c4408',
};

async function loadTokens() {
  const i = process.argv.indexOf('--tokens');
  const path = i > -1 ? process.argv[i + 1] : 'packages/ui/src/tokens.ts';
  const abs = resolve(process.cwd(), path);
  if (!existsSync(abs)) {
    if (i > -1) throw new Error(`--tokens: ${abs} not found`);
    return { source: 'snapshot', t: SNAPSHOT };
  }
  const { colors: c } = await import(pathToFileURL(abs).href);
  return {
    source: path,
    t: {
      paper: c.paper.DEFAULT,
      surfaceCard: c.surface.card,
      surfaceItem: c.surface.item,
      surfaceBase: c.surface.base,
      surfaceCode: c.surface.code,
      textPrimary: c.text.primary,
      textSecondary: c.text.secondary,
      textMuted: c.text.muted,
      textDim: c.text.dim,
      textOnCode: c.text.onCode,
      accent: c.accent.DEFAULT,
      accentBorder: c.accent.border,
      accentInk: c.accent.ink,
      accentSubtle: c.accent.subtle,
      accentSubtleBorder: c.accent.subtleBorder,
      successInk: c.status.successInk,
      successSoft: c.status.successSoft,
      dangerInk: c.status.dangerInk,
      dangerSoft: c.status.dangerSoft,
      ink: c.ink.DEFAULT,
      inkRaised: c.ink.raised,
      inkWell: c.ink.well,
      inkDeep: c.ink.deep,
      onInk: c.onInk.DEFAULT,
      onInkSecondary: c.onInk.secondary,
      onInkMuted: c.onInk.muted,
      stickerPeach: c.sticker.peach,
      stickerRust: c.sticker.rust,
    },
  };
}

// [fg, bg, minRatio, label]
const PAIRS = [
  // Paper — long reading and light surfaces
  ['textPrimary', 'paper', 4.5, 'primary text on paper'],
  ['textPrimary', 'surfaceCard', 4.5, 'primary text on card'],
  ['textSecondary', 'paper', 4.5, 'secondary text on paper'],
  ['textSecondary', 'surfaceCard', 4.5, 'secondary text on card'],
  ['textMuted', 'paper', 4.5, 'muted text on paper'],
  ['textMuted', 'surfaceCard', 4.5, 'muted text on card'],
  ['textMuted', 'surfaceBase', 4.5, 'muted labels on base surface'],
  ['textDim', 'paper', 4.5, 'dim text on paper'],
  ['accentInk', 'paper', 4.5, 'accent ink (links) on paper'],
  ['accentInk', 'surfaceCard', 4.5, 'accent ink on card'],
  ['accentInk', 'surfaceItem', 4.5, 'inline code on its tint'],
  ['accentBorder', 'paper', 3, 'accent border (UI) on paper'],
  ['textSecondary', 'accentSubtleBorder', 4.5, 'selected text in the editor'],
  ['textPrimary', 'accentSubtle', 4.5, 'selected diagram component'],
  ['successInk', 'successSoft', 4.5, 'success ink on success soft'],
  ['dangerInk', 'dangerSoft', 4.5, 'danger ink on danger soft'],
  // Ink shell
  ['onInk', 'ink', 4.5, 'cream text on ink'],
  ['onInkSecondary', 'ink', 4.5, 'secondary text on ink'],
  ['onInkMuted', 'ink', 4.5, 'muted text on ink'],
  ['onInk', 'inkRaised', 4.5, 'cream text on raised card'],
  ['onInkSecondary', 'inkRaised', 4.5, 'secondary text on raised card'],
  ['onInkMuted', 'inkRaised', 4.5, 'muted text on raised card'],
  ['onInkSecondary', 'inkWell', 4.5, 'secondary text in illustration well'],
  ['accent', 'ink', 4.5, 'apricot text on ink'],
  ['dangerSoft', 'ink', 4.5, 'error text on ink'],
  ['dangerSoft', 'inkRaised', 4.5, 'error text on raised card'],
  ['accent', 'inkRaised', 4.5, 'apricot text on raised card'],
  ['textOnCode', 'inkDeep', 4.5, 'code text in code window'],
  ['textOnCode', 'surfaceCode', 4.5, 'code text on code surface'],
  ['stickerPeach', 'inkDeep', 4.5, 'inline code in code window'],
  // Buttons
  ['ink', 'accent', 4.5, 'ink text on apricot CTA'],
  ['ink', 'paper', 4.5, 'ink text on cream button'],
  ['paper', 'dangerInk', 4.5, 'cream text on danger button'],
  // Share card themes (fg on bg)
  ['ink', 'stickerPeach', 4.5, 'card: ink on peach'],
  ['onInk', 'stickerRust', 4.5, 'card: cream on rust'],
  // Brand mark
  ['textPrimary', 'accent', 3, 'brand: ink block on apricot tile'],
  ['paper', 'textPrimary', 3, 'brand: cream block on ink tile (FIRST)'],
  ['accent', 'ink', 3, 'brand: apricot tile on ink surfaces'],
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
function contrastRatio(a, b) {
  const la = relLuminance(hexToRgb(a));
  const lb = relLuminance(hexToRgb(b));
  const [hi, lo] = la > lb ? [la, lb] : [lb, la];
  return (hi + 0.05) / (lo + 0.05);
}

const { source, t: TOKENS } = await loadTokens();
let failed = 0;
console.log(`STACK IT FAST — token contrast check (${source})\n`);
console.log(`${'PAIR'.padEnd(44)} ${'RATIO'.padEnd(8)} ${'MIN'.padEnd(6)} RESULT`);
console.log('-'.repeat(72));
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
    `${label.padEnd(44)} ${ratio.toFixed(2).padEnd(8)} ${String(min).padEnd(6)} ${pass ? 'PASS' : 'FAIL'}`
  );
}
console.log('-'.repeat(72));
if (failed > 0) {
  console.error(`\n${failed} pair(s) failed WCAG AA. Fix tokens before shipping.`);
  process.exit(1);
}
console.log(`\nAll ${PAIRS.length} pairs pass WCAG AA.`);
