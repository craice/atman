# Contributing to Atman Design System

Thank you for your interest in contributing to Atman! This document provides guidelines and information for contributors.

## Code of Conduct

Please be respectful and inclusive. We welcome contributors of all backgrounds and experience levels.

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/craice/atman.git
   cd atman
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Start Storybook** for development:
   ```bash
   npm run storybook
   ```

## Development Workflow

### Project Structure

```
atman-ds/
├── src/
│   ├── components/     # Component source files
│   │   ├── button/
│   │   │   ├── button.ts
│   │   │   ├── button.stories.ts
│   │   │   └── index.ts
│   │   └── ...
│   ├── stories/        # Documentation pages (MDX)
│   ├── styles/         # Global styles
│   ├── tokens/         # Design tokens
│   └── index.ts        # Main entry point
├── .storybook/         # Storybook configuration
├── dist/               # Built output
└── ...
```

### Creating a New Component

1. Create a new directory in `src/components/`:
   ```
   src/components/my-component/
   ├── my-component.ts       # Component implementation
   ├── my-component.stories.ts  # Storybook stories
   └── index.ts              # Export file
   ```

2. Follow the component template:
   ```typescript
   import { LitElement, html, css } from 'lit';
   import { customElement, property } from 'lit/decorators.js';

   @customElement('atman-my-component')
   export class AtmanMyComponent extends LitElement {
     static styles = css`
       :host {
         display: block;
       }
     `;

     @property({ type: String })
     variant = 'default';

     render() {
       return html`<slot></slot>`;
     }
   }

   declare global {
     interface HTMLElementTagNameMap {
       'atman-my-component': AtmanMyComponent;
     }
   }
   ```

3. Add the export to `src/index.ts`:
   ```typescript
   export * from './components/my-component/index.js';
   ```

### Component Guidelines

- **Naming**: Use `atman-` prefix for all custom elements
- **Properties**: Use camelCase for JS, kebab-case for HTML attributes
- **Events**: Prefix custom events with `atman-`
- **Slots**: Use named slots for specific areas
- **CSS**: Use CSS Custom Properties for customization

### Accessibility Requirements

All components must:
- Support keyboard navigation where applicable
- Include appropriate ARIA attributes
- Have sufficient color contrast (WCAG AA)
- Work with screen readers
- Respect `prefers-reduced-motion`

### Writing Stories

Create comprehensive Storybook stories:

```typescript
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './my-component.js';

const meta: Meta = {
  title: 'Components/MyComponent',
  component: 'atman-my-component',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary', 'secondary'],
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => html`
    <atman-my-component>Content</atman-my-component>
  `,
};
```

## Pull Request Process

1. **Create a feature branch**:
   ```bash
   git checkout -b feature/my-feature
   ```

2. **Make your changes** and ensure:
   - Code follows the existing style
   - All stories render correctly
   - TypeScript compiles without errors
   - Accessibility is maintained

3. **Test your changes**:
   ```bash
   npm run typecheck
   npm run build
   npm run build-storybook
   ```

4. **Commit with clear messages**:
   ```bash
   git commit -m "feat: add new component feature"
   ```

   Follow [Conventional Commits](https://www.conventionalcommits.org/):
   - `feat:` New feature
   - `fix:` Bug fix
   - `docs:` Documentation
   - `style:` Formatting
   - `refactor:` Code refactoring
   - `test:` Adding tests
   - `chore:` Maintenance

5. **Push and create a Pull Request**:
   ```bash
   git push origin feature/my-feature
   ```

## Design Token Guidelines

When adding or modifying design tokens:

- Follow the 8px grid for spacing
- Use the established color palette
- Ensure dark mode compatibility
- Document the token in `tokens/index.css`

## Changelog and Releases

This project uses [Conventional Commits](https://www.conventionalcommits.org/) and [standard-version](https://github.com/conventional-changelog/standard-version) for automatic changelog generation and semantic versioning.

### Commit Message Format

Follow the Conventional Commits specification:

```
<type>(<scope>): <subject>

[optional body]

[optional footer]
```

**Types:**
- `feat:` New feature (bumps minor version)
- `fix:` Bug fix (bumps patch version)
- `docs:` Documentation changes
- `style:` Code style changes (formatting, semicolons, etc.)
- `refactor:` Code refactoring
- `perf:` Performance improvements
- `test:` Adding or updating tests
- `chore:` Maintenance tasks

**Scope (optional):** Component or area affected (e.g., `button`, `modal`, `tokens`)

**Breaking Changes:** Add `BREAKING CHANGE:` in the footer or `!` after the type to trigger a major version bump.

### Examples

```bash
# Feature
git commit -m "feat(button): add outline variant"

# Bug fix
git commit -m "fix(modal): prevent scroll when open"

# Breaking change
git commit -m "feat(tokens)!: rename spacing scale values"

# With body
git commit -m "fix(select): improve keyboard navigation

Fixes arrow key handling when dropdown is closed.
Also adds Home/End key support.

Closes #123"
```

### Creating a Release

Maintainers can create releases using:

```bash
# Automatic version bump based on commits
npm run release

# Specific version bumps
npm run release:patch  # 0.1.0 -> 0.1.1
npm run release:minor  # 0.1.0 -> 0.2.0
npm run release:major  # 0.1.0 -> 1.0.0

# Regenerate entire changelog
npm run changelog:all
```

The release script will:
1. Bump the version in `package.json`
2. Update `CHANGELOG.md` with new commits
3. Create a git tag
4. Create a release commit

## AI-Assisted Development

Atman embraces AI-assisted development powered by **Claude Code by Anthropic**. If you're contributing with an AI assistant, the codebase includes structured onboarding:

- **[`CLAUDE.md`](CLAUDE.md)** — Quick-start entry point with conventions, key references, and common commands
- **[`docs/ai-guide.md`](docs/ai-guide.md)** — Comprehensive reference covering all 16 components, the design token system, how to add or modify components, and a decision framework
- **[`atman.md`](atman.md)** — Full project brief, technical specifications, and phase tracker

When using an AI assistant, point it to `CLAUDE.md` first. It will provide the context needed to work effectively within the codebase.

## Questions?

If you have questions, please open an issue on GitHub.

---

Thank you for contributing to Atman!
