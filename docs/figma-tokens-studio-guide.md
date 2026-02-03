# Figma Tokens Studio Integration Guide

This guide explains how to integrate Atman Design System tokens with Figma using the Tokens Studio plugin.

## Overview

Tokens Studio (formerly Figma Tokens) is a powerful plugin that allows you to manage design tokens directly in Figma. By importing the `tokens-studio.json` file from Atman, you can:

- Use consistent spacing, colors, and typography across your designs
- Switch between light and dark themes instantly
- Keep your Figma designs in sync with the codebase
- Maintain a single source of truth for design decisions

## Prerequisites

- Figma account (free or paid)
- Tokens Studio plugin installed

## Step 1: Install Tokens Studio Plugin

1. Open Figma
2. Go to **Menu > Plugins > Browse plugins in Community**
3. Search for "Tokens Studio for Figma"
4. Click **Install**

Alternatively, visit the [Tokens Studio plugin page](https://www.figma.com/community/plugin/843461159747178978/Tokens-Studio-for-Figma) directly.

## Step 2: Export Tokens from Atman

Generate the Tokens Studio compatible JSON file:

```bash
npm run export-tokens-studio
```

This creates `src/tokens/tokens-studio.json` with all design tokens organized into three sets:

- **global** - Theme-independent tokens (spacing, typography, border radius, etc.)
- **light** - Light theme colors and shadows
- **dark** - Dark theme colors and shadows

## Step 3: Import Tokens into Figma

1. Open your Figma file
2. Run Tokens Studio: **Plugins > Tokens Studio for Figma**
3. In the plugin panel, click the **Settings** icon (gear)
4. Under "Token Storage", select **Local document**
5. Click **Load** and select the `tokens-studio.json` file
6. Your tokens will appear organized by token set

## Step 4: Configure Themes

After importing, configure the themes:

1. In Tokens Studio, click on the **Themes** tab
2. You should see two themes pre-configured:
   - **Light** - Uses `global` + `light` token sets
   - **Dark** - Uses `global` + `dark` token sets
3. Select a theme to activate it

## Token Structure

### Global Tokens (Theme-Independent)

| Category | Tokens | Example |
|----------|--------|---------|
| **spacing** | 0-9 scale | `{spacing.4}` = 16px |
| **fontFamily** | sans, mono | `{fontFamily.sans}` |
| **fontSize** | xs, sm, md, lg, xl, 2xl, 3xl, 4xl | `{fontSize.md}` = 16px |
| **fontWeight** | regular, medium, semibold, bold | `{fontWeight.medium}` = 500 |
| **lineHeight** | tight, normal, relaxed | `{lineHeight.normal}` = 1.5 |
| **borderRadius** | sm, md, lg, full | `{borderRadius.md}` = 8px |
| **duration** | fast, normal, slow | `{duration.normal}` = 200ms |
| **zIndex** | dropdown, modal, tooltip, etc. | `{zIndex.modal}` = 1400 |

### Theme Tokens (Light/Dark)

| Category | Tokens | Description |
|----------|--------|-------------|
| **primary** | default, hover, active, light | Primary brand colors |
| **secondary** | default, hover, active, light | Secondary colors |
| **success** | default, hover, active, light | Success state colors |
| **warning** | default, hover, active, light | Warning state colors |
| **destructive** | default, hover, active, light | Error/destructive colors |
| **neutral** | 50-900 | Grayscale palette |
| **semantic** | background, surface, border, text, etc. | Semantic usage colors |
| **shadow** | sm, md, lg, xl | Box shadows |
| **focus** | ringColor, ringWidth, ringOffset | Focus ring styles |

## Applying Tokens to Designs

### Colors

1. Select a layer in Figma
2. In Tokens Studio, expand the color category
3. Click on a token to apply it to the selected layer
4. Right-click to choose: Fill, Stroke, or both

### Typography

1. Select a text layer
2. Apply font family: `{fontFamily.sans}`
3. Apply font size: `{fontSize.md}`
4. Apply font weight: `{fontWeight.medium}`
5. Apply line height: `{lineHeight.normal}`

### Spacing

1. Select a frame or auto-layout container
2. Apply padding or gap using spacing tokens
3. Example: `{spacing.4}` for 16px padding

### Border Radius

1. Select a layer with corners
2. Apply border radius token
3. Example: `{borderRadius.md}` for 8px corners

### Shadows

1. Select a layer
2. In the shadow category, click on a token
3. The shadow will be applied as an effect

## Syncing with GitHub (Optional)

For team collaboration, you can sync tokens with GitHub:

1. In Tokens Studio settings, select **GitHub** as storage
2. Enter your repository details:
   - Repository: `username/atman`
   - Branch: `main`
   - File path: `src/tokens/tokens-studio.json`
3. Generate a Personal Access Token on GitHub
4. Paste the token in Tokens Studio
5. Now changes can be pushed/pulled between Figma and the codebase

### Sync Workflow

1. **Designer updates tokens in Figma:**
   - Make changes in Tokens Studio
   - Click "Push" to send changes to GitHub
   - Create a PR for review

2. **Developer updates tokens in code:**
   - Modify `src/tokens/tokens.json`
   - Run `npm run export-tokens-studio`
   - Commit changes to GitHub
   - Designer clicks "Pull" in Tokens Studio

## Best Practices

### Naming Conventions

- Use semantic names for colors (e.g., `semantic.text` instead of `neutral.900`)
- Reference tokens using aliases where possible
- Keep token names consistent with CSS custom properties

### Theme Switching

- Always test designs in both light and dark themes
- Use semantic color tokens for automatic theme support
- Avoid hardcoding color values

### Collaboration

- Document token changes in commit messages
- Review token changes in PRs before merging
- Keep the single source of truth in `tokens.json`

## Troubleshooting

### Tokens not appearing

- Ensure the JSON file is valid (no syntax errors)
- Check that all token sets are visible in the plugin
- Try refreshing the plugin

### Theme not switching

- Verify theme configuration in the Themes tab
- Ensure token sets are correctly enabled/disabled for each theme
- Check for any unresolved token references

### Sync issues

- Verify GitHub credentials and permissions
- Check branch name matches exactly
- Ensure file path is correct

## Resources

- [Tokens Studio Documentation](https://docs.tokens.studio/)
- [Tokens Studio GitHub](https://github.com/tokens-studio/figma-plugin)
- [Design Tokens W3C Spec](https://design-tokens.github.io/community-group/format/)
- [Atman Design System Repository](https://github.com/craice/atman)

## Token File Locations

| File | Purpose |
|------|---------|
| `src/tokens/tokens.json` | Source of truth for all tokens |
| `src/tokens/tokens-studio.json` | Tokens Studio compatible format |
| `src/tokens/index.css` | CSS custom properties for web |

## Updating Tokens

When updating design tokens:

1. Edit `src/tokens/tokens.json` (source of truth)
2. Run `npm run export-tokens-studio` to regenerate Figma tokens
3. Pull changes in Figma's Tokens Studio
4. Or manually re-import the `tokens-studio.json` file
