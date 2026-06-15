#!/usr/bin/env node
/**
 * build.js — Cloudflare Pages output builder
 *
 * Copies only the files that should be publicly deployed into dist/.
 * Sensitive files (package.json, *.sql, *.md, supabase/, src/, etc.)
 * are deliberately excluded — they never enter the deployed output.
 *
 * Cloudflare Pages build settings:
 *   Build command:  npm run build
 *   Output dir:     dist
 */

const fs   = require('fs');
const path = require('path');

// ── Clean and create dist/ ────────────────────────────────
fs.rmSync('dist', { recursive: true, force: true });
fs.mkdirSync('dist');

// ── Copy a directory recursively ─────────────────────────
function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath  = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// ── HTML pages ────────────────────────────────────────────
const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html'));
for (const file of htmlFiles) {
  fs.copyFileSync(file, path.join('dist', file));
  console.log(`  ✓ ${file}`);
}

// ── Assets directory ──────────────────────────────────────
copyDir('assets', path.join('dist', 'assets'));
console.log('  ✓ assets/');

// ── Cloudflare Pages config files ────────────────────────
for (const file of ['_headers', '_redirects', 'robots.txt', 'sitemap.xml']) {
  if (fs.existsSync(file)) {
    fs.copyFileSync(file, path.join('dist', file));
    console.log(`  ✓ ${file}`);
  }
}

// ── Verify nothing sensitive leaked in ───────────────────
const forbidden = [
  'package.json', 'package-lock.json', 'tailwind.config.js',
  'netlify.toml', 'build.js', '.gitignore', '.env',
];
let leaked = false;
for (const f of forbidden) {
  if (fs.existsSync(path.join('dist', f))) {
    console.error(`  ✗ SECURITY: ${f} found in dist/ — remove it!`);
    leaked = true;
  }
}
if (fs.existsSync(path.join('dist', 'supabase'))) {
  console.error('  ✗ SECURITY: supabase/ found in dist/ — remove it!');
  leaked = true;
}
if (fs.existsSync(path.join('dist', 'src'))) {
  console.error('  ✗ SECURITY: src/ found in dist/ — remove it!');
  leaked = true;
}

if (leaked) {
  process.exit(1);
}

// ── Verify CSP compatibility ─────────────────────────────
// Production uses script-src/style-src without unsafe-inline. If an inline
// script, event handler, or style attribute slips in, the page can look fine
// locally but fail on Cloudflare.
let cspBroken = false;
for (const file of htmlFiles) {
  const html = fs.readFileSync(path.join('dist', file), 'utf8');
  if (/<script(?![^>]*\bsrc=)[^>]*>/i.test(html)) {
    console.error(`  ✗ CSP: inline <script> found in ${file}`);
    cspBroken = true;
  }
  if (/\son[a-z]+\s*=/i.test(html)) {
    console.error(`  ✗ CSP: inline event handler found in ${file}`);
    cspBroken = true;
  }
  if (/\sstyle\s*=/i.test(html)) {
    console.error(`  ✗ CSP: inline style attribute found in ${file}`);
    cspBroken = true;
  }
}

if (!fs.existsSync(path.join('dist', 'assets', 'pricing-toggle.js'))) {
  console.error('  ✗ BUILD: dist/assets/pricing-toggle.js is missing');
  cspBroken = true;
}

if (!fs.existsSync(path.join('dist', 'assets', 'pricing-discounts.css'))) {
  console.error('  ✗ BUILD: dist/assets/pricing-discounts.css is missing');
  cspBroken = true;
}

if (!fs.existsSync(path.join('dist', 'assets', 'nav-panels.js'))) {
  console.error('  ✗ BUILD: dist/assets/nav-panels.js is missing');
  cspBroken = true;
}

if (!fs.existsSync(path.join('dist', 'assets', 'nav-panels.css'))) {
  console.error('  ✗ BUILD: dist/assets/nav-panels.css is missing');
  cspBroken = true;
}

if (cspBroken) {
  process.exit(1);
}

console.log('\n✓ Build complete → dist/');
