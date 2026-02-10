# Atman Design System — AI Integration Guide

> A comprehensive reference for AI assistants working with the Atman codebase.

---

## 1. Quick Start

**Atman** is a lean, accessible, framework-agnostic Design System built with Web Components (Lit) and TypeScript. It provides 24 production-ready components, 300+ design tokens, light/dark themes, and WCAG AA accessibility.

### Install

```bash
npm install atman-ds
```

### Minimal HTML example

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <script type="module">
    import 'atman-ds';
  </script>
</head>
<body>
  <atman-button variant="primary">Click me</atman-button>
  <atman-input label="Email" type="email" placeholder="you@example.com"></atman-input>
  <atman-card elevated>
    <h3 slot="header">Card Title</h3>
    <p>Content goes here.</p>
  </atman-card>
</body>
</html>
```

---

## 2. Component Reference

All components use the `atman-` prefix and are registered as custom elements.

### Primitives

#### `<atman-button>`
- **Properties**: `variant` (`primary` | `secondary` | `ghost` | `destructive`), `size` (`sm` | `md` | `lg`), `disabled`, `loading`, `label` (for icon-only)
- **Slots**: default (label text), `prefix`, `suffix`
- **Events**: `atman-click`
- **Parts**: `button`

```html
<atman-button variant="primary" size="md">Save</atman-button>
<atman-button variant="ghost" loading>Loading...</atman-button>
```

#### `<atman-badge>`
- **Properties**: `variant` (`primary` | `secondary` | `success` | `warning` | `destructive`), `size` (`sm` | `md`), `dot`
- **Slots**: default (text)

```html
<atman-badge variant="success">Active</atman-badge>
<atman-badge variant="destructive" dot>3</atman-badge>
```

#### `<atman-avatar>`
- **Properties**: `name`, `src`, `size` (`sm` | `md` | `lg`), `alt`
- **Slots**: none (renders image, initials, or fallback icon)

```html
<atman-avatar name="Rafael Craice" size="md"></atman-avatar>
<atman-avatar src="/photo.jpg" alt="Profile"></atman-avatar>
```

#### `<atman-icon>`
- **Properties**: `name` (Lucide icon name), `size` (`sm` | `md` | `lg`), `label` (accessible name)
- **Slots**: none

```html
<atman-icon name="heart" size="md"></atman-icon>
<atman-icon name="star" size="lg" label="Favorite"></atman-icon>
```

### Form Controls

#### `<atman-input>`
- **Properties**: `label`, `type`, `placeholder`, `value`, `error`, `disabled`, `size` (`sm` | `md` | `lg`), `required`
- **Slots**: `prefix`, `suffix`
- **Events**: `atman-input`, `atman-change`
- **Parts**: `input`, `label`

```html
<atman-input label="Email" type="email" placeholder="you@example.com" required></atman-input>
<atman-input label="Search" size="sm">
  <atman-icon slot="prefix" name="search" size="sm"></atman-icon>
</atman-input>
```

#### `<atman-select>`
- **Properties**: `label`, `placeholder`, `value`, `error`, `disabled`, `size` (`sm` | `md` | `lg`), `required`
- **Slots**: default (option elements)
- **Events**: `atman-change`

```html
<atman-select label="Country" placeholder="Choose one">
  <option value="us">United States</option>
  <option value="br">Brazil</option>
</atman-select>
```

#### `<atman-checkbox>`
- **Properties**: `checked`, `indeterminate`, `disabled`, `value`, `name`
- **Slots**: default (label text)
- **Events**: `atman-change`

```html
<atman-checkbox checked>Accept terms</atman-checkbox>
```

#### `<atman-radio>`
- **Properties**: `checked`, `disabled`, `value`, `name`
- **Slots**: default (label text)
- **Events**: `atman-change`

```html
<atman-radio name="plan" value="free" checked>Free</atman-radio>
<atman-radio name="plan" value="pro">Pro</atman-radio>
```

#### `<atman-switch>`
- **Properties**: `checked`, `disabled`, `size` (`sm` | `md` | `lg`), `label-position` (`left` | `right`), `name`, `value`
- **Slots**: default (label text)
- **Events**: `atman-change`
- **Parts**: `switch`, `track`, `thumb`, `label`

```html
<atman-switch checked>Enable notifications</atman-switch>
<atman-switch size="lg" label-position="left">Dark mode</atman-switch>
```

#### `<atman-textarea>`
- **Properties**: `label`, `placeholder`, `value`, `size` (`sm` | `md` | `lg`), `rows`, `maxlength`, `resize` (`none` | `vertical` | `both`), `auto-resize`, `disabled`, `required`, `error`, `helper-text`
- **Events**: `atman-input`, `atman-change`
- **Parts**: `container`, `label`, `textarea`, `error`, `counter`

```html
<atman-textarea label="Description" placeholder="Enter text..." rows="5" maxlength="500"></atman-textarea>
<atman-textarea label="Notes" auto-resize helper-text="Auto-expands as you type"></atman-textarea>
```

### Feedback

#### `<atman-alert>`
- **Properties**: `variant` (`info` | `success` | `warning` | `error`), `alert-title`, `dismissible`
- **Slots**: default (description), `icon`
- **Events**: `atman-dismiss`

```html
<atman-alert variant="success" alert-title="Saved!" dismissible>
  Your changes have been saved.
</atman-alert>
```

#### `<atman-toast>`
- **Properties**: `variant` (`info` | `success` | `warning` | `error`), `message`, `duration`, `action-label`
- **Events**: `atman-dismiss`, `atman-action`
- **Container**: `<atman-toast-container>` manages stacking

```html
<atman-toast-container></atman-toast-container>
<script>
  document.querySelector('atman-toast-container')
    .addToast({ variant: 'success', message: 'File uploaded!' });
</script>
```

#### `<atman-skeleton>`
- **Properties**: `variant` (`text` | `circular` | `rectangular`), `width`, `height`

```html
<atman-skeleton variant="text" width="200px"></atman-skeleton>
<atman-skeleton variant="circular" width="48px" height="48px"></atman-skeleton>
```

#### `<atman-progress>`
- **Properties**: `value` (0-100), `variant` (`primary` | `success` | `warning` | `destructive`), `size` (`sm` | `md` | `lg`), `type` (`linear` | `circular`), `indeterminate`, `show-label`
- **Parts**: `progress`, `track`, `fill`, `label`, `circle`

```html
<atman-progress value="65" show-label>Uploading...</atman-progress>
<atman-progress type="circular" value="75" variant="success" show-label></atman-progress>
<atman-progress indeterminate></atman-progress>
```

#### `<atman-tooltip>`
- **Properties**: `content`, `placement` (`top` | `right` | `bottom` | `left`)
- **Slots**: default (trigger element)

```html
<atman-tooltip content="More info" placement="top">
  <atman-button variant="ghost" size="sm">?</atman-button>
</atman-tooltip>
```

### Layout

#### `<atman-card>`
- **Properties**: `elevated`, `clickable`, `padding` (`none` | `sm` | `md` | `lg`)
- **Slots**: `header`, default (body), `footer`
- **Events**: `atman-click` (when clickable)

```html
<atman-card elevated padding="md">
  <h3 slot="header">Title</h3>
  <p>Body content.</p>
  <div slot="footer">
    <atman-button variant="primary">Action</atman-button>
  </div>
</atman-card>
```

#### `<atman-modal>`
- **Properties**: `open`, `modal-title`, `size` (`sm` | `md` | `lg` | `full`)
- **Slots**: default (body), `footer`
- **Events**: `atman-open`, `atman-close`

```html
<atman-modal modal-title="Confirm" size="sm">
  <p>Are you sure?</p>
  <div slot="footer">
    <atman-button variant="destructive">Delete</atman-button>
  </div>
</atman-modal>
```

#### `<atman-tabs>`
- **Properties**: none at host level
- **Children**: `<atman-tab>` with `label`, `disabled`, `icon` properties
- **Events**: `atman-change`

```html
<atman-tabs>
  <atman-tab label="General">General settings content.</atman-tab>
  <atman-tab label="Security">Security settings content.</atman-tab>
</atman-tabs>
```

#### `<atman-divider>`
- **Properties**: `label`, `orientation` (`horizontal` | `vertical`), `spacing` (`sm` | `md` | `lg`)

```html
<atman-divider></atman-divider>
<atman-divider label="OR"></atman-divider>
<atman-divider orientation="vertical"></atman-divider>
```

### Navigation

#### `<atman-breadcrumb>` + `<atman-breadcrumb-item>`
- **Container**: `<nav aria-label="Breadcrumb">`
- **Item Properties**: `href` (renders as link), `current` (marks current page)
- **Item Slots**: default (text), `separator` (custom separator)
- **Parts**: `nav`, `list`, `item`, `link`, `text`, `separator`

```html
<atman-breadcrumb>
  <atman-breadcrumb-item href="/">Home</atman-breadcrumb-item>
  <atman-breadcrumb-item href="/products">Products</atman-breadcrumb-item>
  <atman-breadcrumb-item current>Current Page</atman-breadcrumb-item>
</atman-breadcrumb>
```

#### `<atman-pagination>`
- **Properties**: `total-pages`, `current-page`, `sibling-count`, `size` (`sm` | `md`)
- **Events**: `atman-change` with `{ page }`
- **Parts**: `nav`, `button`, `button-prev`, `button-next`, `button-page`, `ellipsis`

```html
<atman-pagination total-pages="20" current-page="5" sibling-count="1"></atman-pagination>
```

#### `<atman-dropdown>` + `<atman-menu-item>`
- **Container Slots**: `trigger` (button/element that opens menu), default (menu items)
- **Item Properties**: `disabled`, `type` (`default` | `divider`), `value`
- **Item Slots**: default (text), `icon`
- **Events**: `atman-select` with `{ value, item }`
- **Parts**: `dropdown`, `menu`, `item`

```html
<atman-dropdown>
  <atman-button slot="trigger" variant="secondary">Options</atman-button>
  <atman-menu-item value="edit">Edit</atman-menu-item>
  <atman-menu-item value="delete">Delete</atman-menu-item>
  <atman-menu-item type="divider"></atman-menu-item>
  <atman-menu-item value="archive" disabled>Archive</atman-menu-item>
</atman-dropdown>
```

### Data Display

#### `<atman-accordion>` + `<atman-accordion-item>`
- **Container Properties**: `multiple` (allow multiple open)
- **Item Properties**: `expanded`, `disabled`
- **Item Slots**: `header` (trigger text), default (collapsible content)
- **Item Events**: `atman-toggle` with `{ expanded }`
- **Parts**: `accordion`, `item`, `header`, `icon`, `content`
- **Keyboard**: Enter/Space to toggle, Arrow keys between items, Home/End

```html
<atman-accordion>
  <atman-accordion-item expanded>
    <span slot="header">Section 1</span>
    Content for section 1.
  </atman-accordion-item>
  <atman-accordion-item>
    <span slot="header">Section 2</span>
    Content for section 2.
  </atman-accordion-item>
</atman-accordion>
```

#### `<atman-table>`
- **Properties**: `columns` (array of `{ key, label, sortable?, width? }`), `data` (array of row objects), `striped`, `hoverable`, `selectable`, `loading`, `empty-text`
- **Events**: `atman-sort` with `{ key, direction }`, `atman-selection-change` with `{ selectedRows, selectedData }`
- **Parts**: `table`, `thead`, `tbody`, `th`, `td`, `row`, `empty`

```html
<atman-table
  .columns=${[
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Role', sortable: true },
  ]}
  .data=${[
    { name: 'Alice', email: 'alice@example.com', role: 'Admin' },
    { name: 'Bob', email: 'bob@example.com', role: 'User' },
  ]}
  striped
  hoverable
  selectable
></atman-table>
```

---

## 3. Design Token System

All tokens are CSS Custom Properties on `:root`, following the naming convention:

```
--atman-{category}-{property}
```

### Colors

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `--atman-color-primary` | #111111 | #FFFFFF | Main actions |
| `--atman-color-primary-hover` | — | — | Primary hover state |
| `--atman-color-secondary` | #5F6368 | #9AA0A6 | Secondary actions |
| `--atman-color-success` | #1E8E3E | #81C995 | Success states |
| `--atman-color-warning` | #F9AB00 | #FDD663 | Warning states |
| `--atman-color-destructive` | #D93025 | #F28B82 | Errors, destructive |
| `--atman-color-background` | — | — | Page background |
| `--atman-color-surface` | — | — | Card/elevated surfaces |
| `--atman-color-border` | — | — | Default borders |
| `--atman-color-text` | — | — | Primary text |
| `--atman-color-text-secondary` | — | — | Secondary text |
| `--atman-color-text-inverse` | — | — | Text on dark bg |
| `--atman-color-text-on-primary` | — | — | Text on primary color |
| `--atman-color-neutral-{50-900}` | Gray scale | Gray scale | Backgrounds, borders |

### Spacing

8px base grid:

| Token | Value |
|-------|-------|
| `--atman-space-0` | 0px |
| `--atman-space-1` | 4px |
| `--atman-space-2` | 8px |
| `--atman-space-3` | 12px |
| `--atman-space-4` | 16px |
| `--atman-space-5` | 24px |
| `--atman-space-6` | 32px |
| `--atman-space-7` | 48px |
| `--atman-space-8` | 64px |
| `--atman-space-9` | 96px |

### Typography

| Token | Value |
|-------|-------|
| `--atman-font-family` | 'Geist', sans-serif |
| `--atman-font-size-xs` | 12px |
| `--atman-font-size-sm` | 14px |
| `--atman-font-size-md` | 16px |
| `--atman-font-size-lg` | 18px |
| `--atman-font-size-xl` | 20px |
| `--atman-font-size-2xl` | 24px |
| `--atman-font-size-3xl` | 32px |
| `--atman-font-size-4xl` | 48px |
| `--atman-font-weight-regular` | 400 |
| `--atman-font-weight-medium` | 500 |
| `--atman-font-weight-semibold` | 600 |
| `--atman-font-weight-bold` | 700 |
| `--atman-line-height-tight` | 1.2 |
| `--atman-line-height-normal` | 1.5 |
| `--atman-line-height-relaxed` | 1.75 |

### Border Radius

| Token | Value |
|-------|-------|
| `--atman-radius-sm` | 4px |
| `--atman-radius-md` | 8px |
| `--atman-radius-lg` | 12px |
| `--atman-radius-full` | 9999px |

### Shadows

| Token | Usage |
|-------|-------|
| `--atman-shadow-sm` | Cards, subtle elevation |
| `--atman-shadow-md` | Dropdowns, menus |
| `--atman-shadow-lg` | Modals, overlays |
| `--atman-shadow-xl` | Popovers, high elevation |

### Z-Index

| Token | Value |
|-------|-------|
| `--atman-z-dropdown` | 1000 |
| `--atman-z-sticky` | 1100 |
| `--atman-z-fixed` | 1200 |
| `--atman-z-modal-backdrop` | 1300 |
| `--atman-z-modal` | 1400 |
| `--atman-z-popover` | 1500 |
| `--atman-z-tooltip` | 1600 |
| `--atman-z-toast` | 1700 |

### Transitions

| Token | Value |
|-------|-------|
| `--atman-duration-fast` | 150ms |
| `--atman-duration-normal` | 200ms |
| `--atman-duration-slow` | 300ms |
| `--atman-easing-default` | cubic-bezier(0.4, 0, 0.2, 1) |

### Focus

| Token | Value |
|-------|-------|
| `--atman-focus-ring-color` | — |
| `--atman-focus-ring-width` | 3px |
| `--atman-focus-ring-offset` | 2px |

---

## 4. Theming

### Override CSS Custom Properties

```css
:root {
  --atman-color-primary: #6366f1;
  --atman-font-family: 'Inter', sans-serif;
  --atman-radius-md: 12px;
}
```

### Dark Mode

Toggle with the `data-theme` attribute:

```html
<html data-theme="dark">
```

Or programmatically:

```javascript
document.documentElement.setAttribute('data-theme', 'dark');
```

Light mode is the default. Dark mode can also use the `.atman-dark` class selector.

### Custom Themes

Create a scoped theme by overriding tokens on a container:

```css
.brand-theme {
  --atman-color-primary: #E91E63;
  --atman-color-primary-hover: #C2185B;
  --atman-radius-md: 16px;
}
```

```html
<div class="brand-theme">
  <atman-button variant="primary">Themed Button</atman-button>
</div>
```

---

## 5. Adding a New Component

### 1. Create directory structure

```
src/components/{name}/
  ├── {name}.ts          # Component implementation
  ├── {name}.test.ts     # Unit tests
  └── index.ts           # Public exports
```

### 2. Component template (Lit)

```typescript
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export type MyComponentVariant = 'default' | 'primary';

@customElement('atman-my-component')
export class AtmanMyComponent extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
    /* Use tokens: var(--atman-color-primary), var(--atman-space-4), etc. */
  `;

  @property({ type: String })
  variant: MyComponentVariant = 'default';

  render() {
    return html`
      <div part="container" class=${this.variant}>
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'atman-my-component': AtmanMyComponent;
  }
}
```

### 3. Create index.ts

```typescript
export { AtmanMyComponent, type MyComponentVariant } from './{name}.js';
```

### 4. Register in src/index.ts

```typescript
export * from './components/{name}/index.js';
```

### 5. Add Storybook stories

Create `src/stories/{name}.stories.ts` following the existing pattern (Meta, StoryObj, `tags: ['autodocs']`).

### 6. Add tests

Create `src/components/{name}/{name}.test.ts` using Vitest + Happy DOM. Import helpers from `src/test/setup.ts` (`elementUpdated`, `fixture`, `click`, `pressKey`).

---

## 6. Modifying Existing Components

### Adding a variant or size

1. Add the value to the component's TypeScript union type (e.g., `ButtonVariant`)
2. Add styles for the new variant in the component's `static styles`
3. Update the Storybook story to include the new variant
4. Add test coverage

### Adding a property

1. Add `@property()` decorator with appropriate type
2. Use the property in the `render()` method
3. Reflect to attribute if needed (`{ reflect: true }`)
4. Update story `argTypes`
5. Add test coverage

### Updating styles

- Always use `--atman-*` tokens for colors, spacing, typography, radius, shadows
- If a new token is needed, add it to `src/tokens/index.css` in both light and dark themes
- Expose CSS parts via the `part` attribute for external styling

---

## 7. Decision Framework

### When to add a component vs. extend an existing one

- **Add new**: The element has distinct semantics (e.g., `<atman-accordion>` vs modifying `<atman-card>`)
- **Extend existing**: The change is a variant/size of an established pattern (e.g., add `outline` variant to `<atman-button>`)

### When to add a token vs. hardcode a value

- **Add token**: The value is reused across 2+ components or is part of a systematic scale
- **Hardcode**: The value is unique to one component's internal structure (e.g., icon rotation angle)

### Accessibility impact checklist

Before merging any component change:

- [ ] Keyboard navigable? (Tab, Enter, Space, Escape, Arrow keys as appropriate)
- [ ] ARIA attributes correct? (`role`, `aria-label`, `aria-expanded`, etc.)
- [ ] Focus indicator visible?
- [ ] Color contrast meets WCAG AA? (4.5:1 text, 3:1 UI)
- [ ] Works with `prefers-reduced-motion`?
- [ ] Screen reader announces state changes?

---

## 8. Project Structure

```
atman/
├── src/
│   ├── components/           # 24 Web Components
│   │   ├── accordion/        #   <atman-accordion> + <atman-accordion-item>
│   │   ├── alert/            #   <atman-alert>
│   │   ├── avatar/           #   <atman-avatar>
│   │   ├── badge/            #   <atman-badge>
│   │   ├── breadcrumb/       #   <atman-breadcrumb> + <atman-breadcrumb-item>
│   │   ├── button/           #   <atman-button>
│   │   ├── card/             #   <atman-card>
│   │   ├── checkbox/         #   <atman-checkbox>
│   │   ├── divider/          #   <atman-divider>
│   │   ├── dropdown/         #   <atman-dropdown> + <atman-menu-item>
│   │   ├── icon/             #   <atman-icon>
│   │   ├── input/            #   <atman-input>
│   │   ├── modal/            #   <atman-modal>
│   │   ├── pagination/       #   <atman-pagination>
│   │   ├── progress/         #   <atman-progress>
│   │   ├── radio/            #   <atman-radio> + <atman-radio-group>
│   │   ├── select/           #   <atman-select>
│   │   ├── skeleton/         #   <atman-skeleton>
│   │   ├── switch/           #   <atman-switch>
│   │   ├── table/            #   <atman-table>
│   │   ├── tabs/             #   <atman-tabs> + <atman-tab>
│   │   ├── textarea/         #   <atman-textarea>
│   │   ├── toast/            #   <atman-toast> + <atman-toast-container>
│   │   └── tooltip/          #   <atman-tooltip>
│   ├── stories/              # Storybook story files
│   ├── styles/               # fonts.css, base.css, index.css
│   ├── tokens/               # index.css (CSS vars), tokens.json, tokens-studio.json
│   ├── test/                 # Test setup and helpers
│   └── index.ts              # Main entry — re-exports all components
├── docs/
│   ├── ai-guide.md           # This file
│   ├── accessibility-audit.md
│   └── figma-tokens-studio-guide.md
├── landing/                  # GitHub Pages landing site
├── scripts/                  # Build/export scripts
├── .storybook/               # Storybook config, theme, previews
├── .github/workflows/        # CI/CD (build, deploy)
├── atman.md                  # Project brief and phase tracker
├── CLAUDE.md                 # AI assistant onboarding
├── CONTRIBUTING.md           # Contributor guidelines
└── package.json              # atman-ds (ESM, MIT)
```

---

## 9. Common Commands

| Command | Purpose |
|---------|---------|
| `npm install` | Install dependencies |
| `npm run dev` | Vite dev server |
| `npm run build` | Build library (`tsc && vite build` to `dist/`) |
| `npm run storybook` | Start Storybook (port 6006) |
| `npm run build-storybook` | Build static Storybook |
| `npm test` | Run tests in watch mode (Vitest) |
| `npm run test:run` | Single test run (CI) |
| `npm run test:coverage` | Test coverage report |
| `npm run typecheck` | TypeScript type checking (`tsc --noEmit`) |
| `npm run export-tokens` | Export tokens to multiple formats |
| `npm run export-tokens-studio` | Generate Figma Tokens Studio JSON |
| `npm run release` | Bump version (standard-version) |

---

*This guide is maintained alongside the Atman codebase. For the full project brief and phase tracking, see [`atman.md`](../atman.md). For contributor guidelines, see [`CONTRIBUTING.md`](../CONTRIBUTING.md).*
