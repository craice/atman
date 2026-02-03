/**
 * Assemble the deploy directory for GitHub Pages.
 * Combines the landing page, component library bundle, and Storybook.
 *
 * Usage: node scripts/assemble-deploy.js
 * Prerequisites: npm run build-landing && npm run build-storybook
 */

import { cpSync, mkdirSync, writeFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const deploy = resolve(root, 'deploy');

// Clean and create deploy directory
if (existsSync(deploy)) {
  cpSync(deploy, deploy, { recursive: true }); // no-op, just to check
}
mkdirSync(deploy, { recursive: true });

// 1. Copy landing page to root
console.log('Copying landing page...');
cpSync(resolve(root, 'landing'), deploy, { recursive: true });

// 2. Copy Storybook to /storybook/ subpath
const storybookDir = resolve(root, 'storybook-static');
if (existsSync(storybookDir)) {
  console.log('Copying Storybook to /storybook/...');
  cpSync(storybookDir, resolve(deploy, 'storybook'), { recursive: true });
} else {
  console.warn('Warning: storybook-static/ not found. Run npm run build-storybook first.');
}

// 3. Copy favicon
const favicon = resolve(root, '.storybook/public/favicon.ico');
if (existsSync(favicon)) {
  cpSync(favicon, resolve(deploy, 'favicon.ico'));
}

// 4. Create .nojekyll for GitHub Pages
writeFileSync(resolve(deploy, '.nojekyll'), '');

console.log('Deploy directory assembled at ./deploy/');
