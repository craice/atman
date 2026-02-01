#!/usr/bin/env node

/**
 * Atman Design System - Token Export Script
 *
 * Exports design tokens to visual documentation format.
 *
 * Usage:
 *   node scripts/export-tokens.js
 *
 * Outputs:
 *   - dist/tokens/token-reference.html (Visual token documentation)
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = join(__dirname, '..');
const TOKENS_PATH = join(ROOT_DIR, 'src/tokens/tokens.json');
const OUTPUT_DIR = join(ROOT_DIR, 'dist/tokens');

// Ensure output directory exists
if (!existsSync(OUTPUT_DIR)) {
  mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Load tokens
const tokens = JSON.parse(readFileSync(TOKENS_PATH, 'utf-8'));

/**
 * Generate HTML token reference page
 */
function generateTokenReference() {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Atman Design System - Token Reference</title>
  <link rel="preconnect" href="https://cdn.jsdelivr.net">
  <link href="https://cdn.jsdelivr.net/npm/geist@1.2.0/dist/fonts/geist-sans/style.min.css" rel="stylesheet">
  <style>
    :root {
      --font-sans: 'Geist', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      --font-mono: 'Geist Mono', 'SF Mono', Monaco, monospace;
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      font-family: var(--font-sans);
      background: #FAFAFA;
      color: #212121;
      padding: 48px;
      max-width: 1200px;
      margin: 0 auto;
    }

    h1 {
      font-size: 48px;
      font-weight: 700;
      margin-bottom: 8px;
    }

    .subtitle {
      font-size: 18px;
      color: #616161;
      margin-bottom: 48px;
    }

    .section {
      margin-bottom: 64px;
    }

    h2 {
      font-size: 24px;
      font-weight: 600;
      margin-bottom: 24px;
      padding-bottom: 8px;
      border-bottom: 1px solid #E0E0E0;
    }

    h3 {
      font-size: 16px;
      font-weight: 600;
      color: #616161;
      margin: 24px 0 16px;
    }

    .color-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
      gap: 16px;
    }

    .color-swatch {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .color-box {
      height: 80px;
      border-radius: 8px;
      border: 1px solid rgba(0,0,0,0.1);
    }

    .color-name {
      font-size: 12px;
      font-weight: 500;
    }

    .color-value {
      font-size: 11px;
      font-family: var(--font-mono);
      color: #757575;
    }

    .spacing-demo {
      display: flex;
      align-items: flex-end;
      gap: 24px;
      flex-wrap: wrap;
    }

    .spacing-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
    }

    .spacing-box {
      background: #1A73E8;
      border-radius: 4px;
    }

    .spacing-label {
      font-size: 12px;
      font-family: var(--font-mono);
      color: #757575;
    }

    .typography-demo {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .typography-item {
      display: flex;
      align-items: baseline;
      gap: 24px;
    }

    .typography-sample {
      min-width: 300px;
    }

    .typography-meta {
      font-size: 12px;
      font-family: var(--font-mono);
      color: #757575;
    }

    .radius-demo {
      display: flex;
      gap: 24px;
      flex-wrap: wrap;
    }

    .radius-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
    }

    .radius-box {
      width: 80px;
      height: 80px;
      background: #1A73E8;
    }

    .shadow-demo {
      display: flex;
      gap: 32px;
      flex-wrap: wrap;
    }

    .shadow-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
    }

    .shadow-box {
      width: 120px;
      height: 80px;
      background: #FFFFFF;
      border-radius: 8px;
    }

    .theme-toggle {
      position: fixed;
      top: 24px;
      right: 24px;
      padding: 12px 24px;
      background: #212121;
      color: #FFFFFF;
      border: none;
      border-radius: 8px;
      font-family: var(--font-sans);
      font-size: 14px;
      cursor: pointer;
    }

    [data-theme="dark"] body {
      background: #121212;
      color: #F5F5F5;
    }

    [data-theme="dark"] h2 {
      border-bottom-color: #3C3C3C;
    }

    [data-theme="dark"] h3 {
      color: #BDBDBD;
    }

    [data-theme="dark"] .color-value,
    [data-theme="dark"] .spacing-label,
    [data-theme="dark"] .typography-meta {
      color: #9E9E9E;
    }

    [data-theme="dark"] .theme-toggle {
      background: #F5F5F5;
      color: #212121;
    }

    [data-theme="dark"] .shadow-box {
      background: #1E1E1E;
    }
  </style>
</head>
<body>
  <button class="theme-toggle" onclick="toggleTheme()">Toggle Dark Mode</button>

  <h1>Atman</h1>
  <p class="subtitle">Design Token Reference</p>

  <div class="section">
    <h2>Colors - Light Mode</h2>

    <h3>Primary</h3>
    <div class="color-grid">
      ${Object.entries(tokens.colors.light.primary).map(([name, color]) => `
      <div class="color-swatch">
        <div class="color-box" style="background: ${color}"></div>
        <span class="color-name">${name}</span>
        <span class="color-value">${color}</span>
      </div>`).join('')}
    </div>

    <h3>Success</h3>
    <div class="color-grid">
      ${Object.entries(tokens.colors.light.success).map(([name, color]) => `
      <div class="color-swatch">
        <div class="color-box" style="background: ${color}"></div>
        <span class="color-name">${name}</span>
        <span class="color-value">${color}</span>
      </div>`).join('')}
    </div>

    <h3>Warning</h3>
    <div class="color-grid">
      ${Object.entries(tokens.colors.light.warning).map(([name, color]) => `
      <div class="color-swatch">
        <div class="color-box" style="background: ${color}"></div>
        <span class="color-name">${name}</span>
        <span class="color-value">${color}</span>
      </div>`).join('')}
    </div>

    <h3>Destructive</h3>
    <div class="color-grid">
      ${Object.entries(tokens.colors.light.destructive).map(([name, color]) => `
      <div class="color-swatch">
        <div class="color-box" style="background: ${color}"></div>
        <span class="color-name">${name}</span>
        <span class="color-value">${color}</span>
      </div>`).join('')}
    </div>

    <h3>Neutral</h3>
    <div class="color-grid">
      ${Object.entries(tokens.colors.light.neutral).map(([name, color]) => `
      <div class="color-swatch">
        <div class="color-box" style="background: ${color}"></div>
        <span class="color-name">${name}</span>
        <span class="color-value">${color}</span>
      </div>`).join('')}
    </div>
  </div>

  <div class="section">
    <h2>Spacing</h2>
    <div class="spacing-demo">
      ${Object.entries(tokens.spacing).filter(([k]) => k !== '0').map(([name, value]) => `
      <div class="spacing-item">
        <div class="spacing-box" style="width: ${value}; height: ${value}"></div>
        <span class="spacing-label">${name} (${value})</span>
      </div>`).join('')}
    </div>
  </div>

  <div class="section">
    <h2>Typography</h2>

    <h3>Font Sizes</h3>
    <div class="typography-demo">
      ${Object.entries(tokens.typography.fontSize).map(([name, value]) => `
      <div class="typography-item">
        <span class="typography-sample" style="font-size: ${value}">The quick brown fox</span>
        <span class="typography-meta">${name} · ${value}</span>
      </div>`).join('')}
    </div>

    <h3>Font Weights</h3>
    <div class="typography-demo">
      ${Object.entries(tokens.typography.fontWeight).map(([name, value]) => `
      <div class="typography-item">
        <span class="typography-sample" style="font-size: 18px; font-weight: ${value}">${name.charAt(0).toUpperCase() + name.slice(1)} ${value}</span>
      </div>`).join('')}
    </div>
  </div>

  <div class="section">
    <h2>Border Radius</h2>
    <div class="radius-demo">
      ${Object.entries(tokens.borderRadius).map(([name, value]) => `
      <div class="radius-item">
        <div class="radius-box" style="border-radius: ${value}"></div>
        <span class="spacing-label">${name} (${value})</span>
      </div>`).join('')}
    </div>
  </div>

  <div class="section">
    <h2>Shadows</h2>
    <div class="shadow-demo">
      ${Object.entries(tokens.shadows.light).map(([name, value]) => `
      <div class="shadow-item">
        <div class="shadow-box" style="box-shadow: ${value}"></div>
        <span class="spacing-label">${name}</span>
      </div>`).join('')}
    </div>
  </div>

  <script>
    function toggleTheme() {
      const html = document.documentElement;
      const current = html.getAttribute('data-theme');
      html.setAttribute('data-theme', current === 'dark' ? 'light' : 'dark');
    }
  </script>
</body>
</html>`;

  return html;
}

// Run export
console.log('Atman Design System - Token Export\n');

const html = generateTokenReference();
writeFileSync(join(OUTPUT_DIR, 'token-reference.html'), html);
console.log('Generated token-reference.html');

console.log('\nOutput: dist/tokens/token-reference.html');
console.log('Open in a browser for visual token documentation');
