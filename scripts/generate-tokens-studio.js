#!/usr/bin/env node

/**
 * Atman Design System - Tokens Studio Export Script
 *
 * Generates a Tokens Studio compatible JSON file from existing tokens.
 * Compatible with Figma Tokens Studio plugin (v2 format).
 *
 * Usage:
 *   node scripts/generate-tokens-studio.js
 *
 * Output:
 *   - src/tokens/tokens-studio.json
 */

import { readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = join(__dirname, '..');
const TOKENS_PATH = join(ROOT_DIR, 'src/tokens/tokens.json');
const OUTPUT_PATH = join(ROOT_DIR, 'src/tokens/tokens-studio.json');

// Load source tokens
const tokens = JSON.parse(readFileSync(TOKENS_PATH, 'utf-8'));

/**
 * Create a token object in Tokens Studio format
 */
function createToken(value, type, description = undefined) {
  const token = {
    $value: value,
    $type: type,
  };
  if (description) {
    token.$description = description;
  }
  return token;
}

/**
 * Parse box-shadow string into Tokens Studio format
 * Tokens Studio expects: { x, y, blur, spread, color, type }
 */
function parseShadow(shadowString) {
  // Split by comma followed by space and a digit, but NOT inside parentheses
  // Use a regex that matches each complete shadow value
  const shadowPattern = /(-?\d+)(?:px)?\s+(-?\d+)(?:px)?\s+(-?\d+)(?:px)?\s+(-?\d+)(?:px)?\s+(rgba?\([^)]+\))/g;
  const shadows = [];
  let match;

  while ((match = shadowPattern.exec(shadowString)) !== null) {
    shadows.push({
      x: match[1] + 'px',
      y: match[2] + 'px',
      blur: match[3] + 'px',
      spread: match[4] + 'px',
      color: match[5],
      type: 'dropShadow'
    });
  }

  return shadows;
}

/**
 * Generate the global token set (theme-independent values)
 */
function generateGlobalSet() {
  const global = {};

  // Spacing tokens
  global.spacing = {};
  for (const [key, value] of Object.entries(tokens.spacing)) {
    global.spacing[key] = createToken(
      value,
      'dimension',
      `Spacing scale ${key}`
    );
  }

  // Typography - Font Family
  global.fontFamily = {};
  for (const [key, value] of Object.entries(tokens.typography.fontFamily)) {
    global.fontFamily[key] = createToken(
      value,
      'fontFamily',
      `${key.charAt(0).toUpperCase() + key.slice(1)} font stack`
    );
  }

  // Typography - Font Size
  global.fontSize = {};
  for (const [key, value] of Object.entries(tokens.typography.fontSize)) {
    global.fontSize[key] = createToken(
      value,
      'dimension',
      `Font size ${key}`
    );
  }

  // Typography - Font Weight
  global.fontWeight = {};
  for (const [key, value] of Object.entries(tokens.typography.fontWeight)) {
    global.fontWeight[key] = createToken(
      String(value),
      'fontWeight',
      `Font weight ${key}`
    );
  }

  // Typography - Line Height
  global.lineHeight = {};
  for (const [key, value] of Object.entries(tokens.typography.lineHeight)) {
    global.lineHeight[key] = createToken(
      String(value),
      'number',
      `Line height ${key}`
    );
  }

  // Border Radius
  global.borderRadius = {};
  for (const [key, value] of Object.entries(tokens.borderRadius)) {
    global.borderRadius[key] = createToken(
      value,
      'dimension',
      `Border radius ${key}`
    );
  }

  // Transitions - Duration
  global.duration = {};
  for (const [key, value] of Object.entries(tokens.transitions.duration)) {
    global.duration[key] = createToken(
      value,
      'duration',
      `Transition duration ${key}`
    );
  }

  // Transitions - Easing
  global.easing = {};
  for (const [key, value] of Object.entries(tokens.transitions.easing)) {
    global.easing[key] = createToken(
      value,
      'cubicBezier',
      `Easing function ${key}`
    );
  }

  // Z-Index
  global.zIndex = {};
  for (const [key, value] of Object.entries(tokens.zIndex)) {
    global.zIndex[key] = createToken(
      String(value),
      'number',
      `Z-index for ${key}`
    );
  }

  return global;
}

/**
 * Generate a theme token set (light or dark)
 */
function generateThemeSet(theme) {
  const themeTokens = tokens.colors[theme];
  const themeShadows = tokens.shadows[theme];
  const set = {};

  // Color palettes
  const colorGroups = ['primary', 'secondary', 'success', 'warning', 'destructive'];

  for (const group of colorGroups) {
    set[group] = {};
    for (const [key, value] of Object.entries(themeTokens[group])) {
      set[group][key] = createToken(
        value,
        'color',
        `${group.charAt(0).toUpperCase() + group.slice(1)} color - ${key}`
      );
    }
  }

  // Neutral scale
  set.neutral = {};
  for (const [key, value] of Object.entries(themeTokens.neutral)) {
    set.neutral[key] = createToken(
      value,
      'color',
      `Neutral ${key}`
    );
  }

  // Semantic colors
  set.semantic = {};
  for (const [key, value] of Object.entries(themeTokens.semantic)) {
    // Create alias references where possible
    let tokenValue = value;
    let description = `Semantic color - ${key}`;

    set.semantic[key] = createToken(
      tokenValue,
      'color',
      description
    );
  }

  // Shadows
  set.shadow = {};
  for (const [key, value] of Object.entries(themeShadows)) {
    const parsedShadow = parseShadow(value);
    if (parsedShadow.length === 1) {
      set.shadow[key] = createToken(
        parsedShadow[0],
        'boxShadow',
        `Shadow ${key}`
      );
    } else if (parsedShadow.length > 1) {
      set.shadow[key] = createToken(
        parsedShadow,
        'boxShadow',
        `Shadow ${key}`
      );
    }
  }

  // Focus ring (theme-specific)
  set.focus = {
    ringColor: createToken(
      theme === 'light' ? 'rgba(0, 0, 0, 0.3)' : 'rgba(255, 255, 255, 0.4)',
      'color',
      'Focus ring color'
    ),
    ringWidth: createToken(
      '3px',
      'dimension',
      'Focus ring width'
    ),
    ringOffset: createToken(
      '2px',
      'dimension',
      'Focus ring offset'
    )
  };

  return set;
}

/**
 * Generate the complete Tokens Studio JSON structure
 */
function generateTokensStudioJSON() {
  return {
    // Metadata about the token structure
    $metadata: {
      tokenSetOrder: ['global', 'light', 'dark']
    },
    // Theme configurations
    $themes: [
      {
        id: 'light',
        name: 'Light',
        selectedTokenSets: {
          global: 'enabled',
          light: 'enabled',
          dark: 'disabled'
        }
      },
      {
        id: 'dark',
        name: 'Dark',
        selectedTokenSets: {
          global: 'enabled',
          light: 'disabled',
          dark: 'enabled'
        }
      }
    ],
    // Token sets
    global: generateGlobalSet(),
    light: generateThemeSet('light'),
    dark: generateThemeSet('dark')
  };
}

// Run export
console.log('Atman Design System - Tokens Studio Export\n');

const tokensStudio = generateTokensStudioJSON();
writeFileSync(OUTPUT_PATH, JSON.stringify(tokensStudio, null, 2));

console.log('✓ Generated tokens-studio.json');
console.log(`\nOutput: ${OUTPUT_PATH}`);
console.log('\nImport this file into Figma using the Tokens Studio plugin.');
