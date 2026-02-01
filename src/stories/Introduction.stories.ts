import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

const meta: Meta = {
  title: 'Introduction',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj;

export const Introduction: Story = {
  render: () => html`
    <style>
      .intro-container {
        font-family: var(--atman-font-family, 'Geist', sans-serif);
        max-width: 800px;
        margin: 0 auto;
        padding: 32px;
      }

      .intro-header {
        text-align: center;
        margin-bottom: 48px;
      }

      .intro-title {
        font-size: 48px;
        font-weight: 700;
        color: var(--atman-color-text, #212121);
        margin: 0 0 16px;
        letter-spacing: -0.02em;
      }

      .intro-subtitle {
        font-size: 20px;
        color: var(--atman-color-text-secondary, #616161);
        margin: 0;
        line-height: 1.6;
      }

      .intro-badges {
        display: flex;
        justify-content: center;
        gap: 8px;
        margin-top: 24px;
        flex-wrap: wrap;
      }

      .intro-badge {
        display: inline-flex;
        align-items: center;
        padding: 6px 12px;
        background: var(--atman-color-background-subtle, #F5F5F5);
        border-radius: 9999px;
        font-size: 13px;
        color: var(--atman-color-text-secondary, #616161);
      }

      .intro-section {
        margin-bottom: 48px;
      }

      .intro-section-title {
        font-size: 24px;
        font-weight: 600;
        color: var(--atman-color-text, #212121);
        margin: 0 0 16px;
      }

      .intro-section p {
        color: var(--atman-color-text-secondary, #616161);
        line-height: 1.7;
        margin: 0 0 16px;
      }

      .intro-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 16px;
        margin-top: 24px;
      }

      .intro-card {
        padding: 24px;
        background: var(--atman-color-background, #FFFFFF);
        border: 1px solid var(--atman-color-border, #E0E0E0);
        border-radius: 12px;
      }

      .intro-card-icon {
        font-size: 32px;
        margin-bottom: 12px;
      }

      .intro-card-title {
        font-size: 16px;
        font-weight: 600;
        color: var(--atman-color-text, #212121);
        margin: 0 0 8px;
      }

      .intro-card-desc {
        font-size: 14px;
        color: var(--atman-color-text-secondary, #616161);
        margin: 0;
        line-height: 1.5;
      }

      .intro-code {
        background: var(--atman-color-background-subtle, #F5F5F5);
        padding: 24px;
        border-radius: 12px;
        font-family: 'Geist Mono', monospace;
        font-size: 14px;
        overflow-x: auto;
      }

      .intro-code pre {
        margin: 0;
        white-space: pre-wrap;
      }

      .intro-links {
        display: flex;
        gap: 16px;
        flex-wrap: wrap;
        margin-top: 24px;
      }

      .intro-link {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 12px 24px;
        background: #000000;
        color: white;
        text-decoration: none;
        border-radius: 8px;
        font-weight: 500;
        transition: background 0.2s;
      }

      .intro-link:hover {
        background: #333333;
      }

      .intro-link-secondary {
        background: transparent;
        color: #000000;
        border: 1px solid var(--atman-color-border, #E0E0E0);
      }

      .intro-link-secondary:hover {
        background: var(--atman-color-background-subtle, #F5F5F5);
      }
    </style>

    <div class="intro-container">
      <div class="intro-header">
        <img src="/atman-logo-full.svg" alt="Atman" style="height: 96px; margin: 24px auto;" />
        <p class="intro-subtitle">
          A lean, accessible, and modern Design System built with Web Components.
          <br />
          Framework-agnostic. Essence over excess.
        </p>
        <div class="intro-badges">
          <span class="intro-badge">Web Components</span>
          <span class="intro-badge">WCAG AA</span>
          <span class="intro-badge">TypeScript</span>
          <span class="intro-badge">MIT License</span>
        </div>
      </div>

      <div class="intro-section">
        <h2 class="intro-section-title">Philosophy</h2>
        <p>
          <strong>Atman</strong> is a Sanskrit word meaning "essence," "soul," or "self."
          This design system embodies that philosophy — providing only essential components
          without unnecessary complexity.
        </p>

        <div class="intro-grid">
          <div class="intro-card">
            <div class="intro-card-icon">🎯</div>
            <h3 class="intro-card-title">Essence over excess</h3>
            <p class="intro-card-desc">Only essential components, no bloat. Every decision must justify its existence.</p>
          </div>
          <div class="intro-card">
            <div class="intro-card-icon">🌐</div>
            <h3 class="intro-card-title">Universal truth</h3>
            <p class="intro-card-desc">Framework-agnostic Web Components that work everywhere — React, Vue, Angular, or vanilla JS.</p>
          </div>
          <div class="intro-card">
            <div class="intro-card-icon">🔗</div>
            <h3 class="intro-card-title">Inner consistency</h3>
            <p class="intro-card-desc">Coherent design tokens and patterns throughout, built on an 8px grid system.</p>
          </div>
          <div class="intro-card">
            <div class="intro-card-icon">♿</div>
            <h3 class="intro-card-title">Accessible by default</h3>
            <p class="intro-card-desc">WCAG AA compliance as baseline. Keyboard navigation and screen reader support built-in.</p>
          </div>
        </div>
      </div>

      <div class="intro-section">
        <h2 class="intro-section-title">Quick Start</h2>
        <p>Install Atman in your project:</p>

        <div class="intro-code">
          <pre>npm install atman-ds</pre>
        </div>

        <p style="margin-top: 16px">Import and use components:</p>

        <div class="intro-code">
          <pre>// Import all components
import 'atman-ds';

// Or import specific components
import 'atman-ds/components/button';
import 'atman-ds/components/input';</pre>
        </div>

        <p style="margin-top: 16px">Use in your HTML:</p>

        <div class="intro-code">
          <pre>&lt;atman-button variant="primary"&gt;Click me&lt;/atman-button&gt;

&lt;atman-input
  label="Email"
  type="email"
  placeholder="you@example.com"
&gt;&lt;/atman-input&gt;

&lt;atman-card&gt;
  &lt;h3 slot="header"&gt;Card Title&lt;/h3&gt;
  &lt;p&gt;Card content goes here.&lt;/p&gt;
&lt;/atman-card&gt;</pre>
        </div>
      </div>

      <div class="intro-section">
        <h2 class="intro-section-title">Components</h2>
        <p>
          Atman includes 16 carefully crafted components organized into four categories:
        </p>

        <div class="intro-grid">
          <div class="intro-card">
            <h3 class="intro-card-title">Primitives</h3>
            <p class="intro-card-desc">Button, Badge, Avatar, Icon</p>
          </div>
          <div class="intro-card">
            <h3 class="intro-card-title">Form Controls</h3>
            <p class="intro-card-desc">Input, Select, Checkbox, Radio</p>
          </div>
          <div class="intro-card">
            <h3 class="intro-card-title">Feedback</h3>
            <p class="intro-card-desc">Alert, Toast, Skeleton, Tooltip</p>
          </div>
          <div class="intro-card">
            <h3 class="intro-card-title">Layout</h3>
            <p class="intro-card-desc">Card, Modal, Tabs, Divider</p>
          </div>
        </div>
      </div>

      <div class="intro-section">
        <h2 class="intro-section-title">Design Tokens</h2>
        <p>
          Atman uses CSS Custom Properties for theming, making it easy to customize
          colors, spacing, typography, and more. Light and dark themes are built-in.
        </p>

        <div class="intro-code">
          <pre>:root {
  --atman-color-primary: #000000;
  --atman-color-text: #212121;
  --atman-space-4: 16px;
  --atman-radius-md: 8px;
  --atman-font-family: 'Geist', sans-serif;
}

[data-theme="dark"] {
  --atman-color-primary: #FFFFFF;
  --atman-color-text: #E8EAED;
}</pre>
        </div>
      </div>

      <div class="intro-section">
        <h2 class="intro-section-title">Resources</h2>
        <div class="intro-links">
          <a href="https://github.com/craice/atman" class="intro-link" target="_blank">
            GitHub Repository
          </a>
          <a href="https://www.npmjs.com/package/atman-ds" class="intro-link intro-link-secondary" target="_blank">
            npm Package
          </a>
        </div>
      </div>
    </div>
  `,
};
