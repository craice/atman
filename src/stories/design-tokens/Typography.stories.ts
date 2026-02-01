import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

const meta: Meta = {
  title: 'Design Tokens/Typography',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj;

export const Typography: Story = {
  render: () => html`
    <style>
      .typo-container {
        font-family: var(--atman-font-family, 'Geist', sans-serif);
        max-width: 900px;
        margin: 0 auto;
        padding: 32px;
      }

      .typo-title {
        font-size: 36px;
        font-weight: 700;
        color: var(--atman-color-text, #212121);
        margin: 0 0 16px;
      }

      .typo-subtitle {
        font-size: 18px;
        color: var(--atman-color-text-secondary, #616161);
        margin: 0 0 48px;
        line-height: 1.6;
      }

      .typo-section {
        margin-bottom: 56px;
      }

      .typo-section-title {
        font-size: 24px;
        font-weight: 600;
        color: var(--atman-color-text, #212121);
        margin: 0 0 24px;
      }

      .font-family-card {
        background: var(--atman-color-surface, #FFFFFF);
        border: 1px solid var(--atman-color-border, #E0E0E0);
        border-radius: 12px;
        padding: 32px;
        margin-bottom: 16px;
      }

      .font-family-name {
        font-size: 14px;
        font-weight: 600;
        color: var(--atman-color-text-secondary, #616161);
        text-transform: uppercase;
        letter-spacing: 0.5px;
        margin: 0 0 16px;
      }

      .font-family-sample {
        font-size: 32px;
        color: var(--atman-color-text, #212121);
        margin: 0 0 16px;
        line-height: 1.3;
      }

      .font-family-chars {
        font-size: 18px;
        color: var(--atman-color-text-secondary, #616161);
        margin: 0 0 16px;
        letter-spacing: 2px;
      }

      .font-family-css {
        font-size: 13px;
        font-family: 'Geist Mono', monospace;
        color: var(--atman-color-text-tertiary, #9E9E9E);
        background: var(--atman-color-background-subtle, #F5F5F5);
        padding: 8px 12px;
        border-radius: 6px;
        display: inline-block;
      }

      .font-mono {
        font-family: 'Geist Mono', 'SF Mono', Consolas, monospace;
      }

      .size-table {
        width: 100%;
        border-collapse: collapse;
      }

      .size-table th,
      .size-table td {
        text-align: left;
        padding: 16px;
        border-bottom: 1px solid var(--atman-color-border, #E0E0E0);
      }

      .size-table th {
        font-size: 12px;
        font-weight: 600;
        color: var(--atman-color-text-secondary, #616161);
        text-transform: uppercase;
        letter-spacing: 0.5px;
        background: var(--atman-color-background-subtle, #F5F5F5);
      }

      .size-name {
        font-weight: 600;
        color: var(--atman-color-text, #212121);
      }

      .size-value {
        font-family: 'Geist Mono', monospace;
        font-size: 13px;
        color: var(--atman-color-text-secondary, #757575);
      }

      .size-sample {
        color: var(--atman-color-text, #212121);
      }

      .size-css-var {
        font-family: 'Geist Mono', monospace;
        font-size: 12px;
        color: var(--atman-color-text-tertiary, #9E9E9E);
      }

      .weight-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 16px;
      }

      @media (max-width: 768px) {
        .weight-grid {
          grid-template-columns: repeat(2, 1fr);
        }
      }

      .weight-card {
        background: var(--atman-color-surface, #FFFFFF);
        border: 1px solid var(--atman-color-border, #E0E0E0);
        border-radius: 12px;
        padding: 24px;
        text-align: center;
      }

      .weight-sample {
        font-size: 48px;
        color: var(--atman-color-text, #212121);
        margin: 0 0 12px;
        line-height: 1;
      }

      .weight-name {
        font-size: 14px;
        font-weight: 600;
        color: var(--atman-color-text, #212121);
        margin: 0 0 4px;
      }

      .weight-value {
        font-size: 13px;
        font-family: 'Geist Mono', monospace;
        color: var(--atman-color-text-secondary, #757575);
        margin: 0;
      }

      .line-height-demo {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 24px;
      }

      @media (max-width: 768px) {
        .line-height-demo {
          grid-template-columns: 1fr;
        }
      }

      .line-height-card {
        background: var(--atman-color-surface, #FFFFFF);
        border: 1px solid var(--atman-color-border, #E0E0E0);
        border-radius: 12px;
        padding: 24px;
      }

      .line-height-label {
        font-size: 12px;
        font-weight: 600;
        color: var(--atman-color-text-secondary, #616161);
        text-transform: uppercase;
        letter-spacing: 0.5px;
        margin: 0 0 12px;
        display: flex;
        justify-content: space-between;
      }

      .line-height-sample {
        font-size: 16px;
        color: var(--atman-color-text, #212121);
        margin: 0;
      }

      .usage-tip {
        background: #E8F0FE;
        border-left: 4px solid var(--atman-color-primary, #1A73E8);
        padding: 16px 20px;
        border-radius: 0 8px 8px 0;
        margin: 24px 0;
      }

      .usage-tip-title {
        font-weight: 600;
        color: var(--atman-color-primary, #1A73E8);
        margin: 0 0 4px;
        font-size: 14px;
      }

      .usage-tip p {
        margin: 0;
        font-size: 14px;
        color: var(--atman-color-text, #212121);
      }
    </style>

    <div class="typo-container">
      <h1 class="typo-title">Typography</h1>
      <p class="typo-subtitle">
        Atman uses the Geist font family for a clean, modern look.
        The type scale follows a harmonious progression for visual hierarchy.
      </p>

      <div class="typo-section">
        <h2 class="typo-section-title">Font Families</h2>

        <div class="font-family-card">
          <p class="font-family-name">Sans-serif (Default)</p>
          <p class="font-family-sample">Geist Sans</p>
          <p class="font-family-chars">ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
          <p class="font-family-chars">abcdefghijklmnopqrstuvwxyz</p>
          <p class="font-family-chars">0123456789</p>
          <code class="font-family-css">--atman-font-family</code>
        </div>

        <div class="font-family-card">
          <p class="font-family-name">Monospace</p>
          <p class="font-family-sample font-mono">Geist Mono</p>
          <p class="font-family-chars font-mono">ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
          <p class="font-family-chars font-mono">abcdefghijklmnopqrstuvwxyz</p>
          <p class="font-family-chars font-mono">0123456789</p>
          <code class="font-family-css">--atman-font-family-mono</code>
        </div>
      </div>

      <div class="typo-section">
        <h2 class="typo-section-title">Font Sizes</h2>

        <table class="size-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Size</th>
              <th>Sample</th>
              <th>CSS Variable</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><span class="size-name">4xl</span></td>
              <td><span class="size-value">48px</span></td>
              <td><span class="size-sample" style="font-size: 48px">Display</span></td>
              <td><span class="size-css-var">--atman-font-size-4xl</span></td>
            </tr>
            <tr>
              <td><span class="size-name">3xl</span></td>
              <td><span class="size-value">32px</span></td>
              <td><span class="size-sample" style="font-size: 32px">Heading 1</span></td>
              <td><span class="size-css-var">--atman-font-size-3xl</span></td>
            </tr>
            <tr>
              <td><span class="size-name">2xl</span></td>
              <td><span class="size-value">24px</span></td>
              <td><span class="size-sample" style="font-size: 24px">Heading 2</span></td>
              <td><span class="size-css-var">--atman-font-size-2xl</span></td>
            </tr>
            <tr>
              <td><span class="size-name">xl</span></td>
              <td><span class="size-value">20px</span></td>
              <td><span class="size-sample" style="font-size: 20px">Heading 3</span></td>
              <td><span class="size-css-var">--atman-font-size-xl</span></td>
            </tr>
            <tr>
              <td><span class="size-name">lg</span></td>
              <td><span class="size-value">18px</span></td>
              <td><span class="size-sample" style="font-size: 18px">Large text</span></td>
              <td><span class="size-css-var">--atman-font-size-lg</span></td>
            </tr>
            <tr>
              <td><span class="size-name">md</span></td>
              <td><span class="size-value">16px</span></td>
              <td><span class="size-sample" style="font-size: 16px">Body text (default)</span></td>
              <td><span class="size-css-var">--atman-font-size-md</span></td>
            </tr>
            <tr>
              <td><span class="size-name">sm</span></td>
              <td><span class="size-value">14px</span></td>
              <td><span class="size-sample" style="font-size: 14px">Small text</span></td>
              <td><span class="size-css-var">--atman-font-size-sm</span></td>
            </tr>
            <tr>
              <td><span class="size-name">xs</span></td>
              <td><span class="size-value">12px</span></td>
              <td><span class="size-sample" style="font-size: 12px">Caption, labels</span></td>
              <td><span class="size-css-var">--atman-font-size-xs</span></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="typo-section">
        <h2 class="typo-section-title">Font Weights</h2>

        <div class="weight-grid">
          <div class="weight-card">
            <p class="weight-sample" style="font-weight: 400">Aa</p>
            <p class="weight-name">Regular</p>
            <p class="weight-value">400</p>
          </div>
          <div class="weight-card">
            <p class="weight-sample" style="font-weight: 500">Aa</p>
            <p class="weight-name">Medium</p>
            <p class="weight-value">500</p>
          </div>
          <div class="weight-card">
            <p class="weight-sample" style="font-weight: 600">Aa</p>
            <p class="weight-name">Semibold</p>
            <p class="weight-value">600</p>
          </div>
          <div class="weight-card">
            <p class="weight-sample" style="font-weight: 700">Aa</p>
            <p class="weight-name">Bold</p>
            <p class="weight-value">700</p>
          </div>
        </div>
      </div>

      <div class="typo-section">
        <h2 class="typo-section-title">Line Heights</h2>

        <div class="line-height-demo">
          <div class="line-height-card">
            <p class="line-height-label">
              Tight
              <span style="font-family: 'Geist Mono', monospace">1.2</span>
            </p>
            <p class="line-height-sample" style="line-height: 1.2">
              The quick brown fox jumps over the lazy dog. Perfect for headings and display text.
            </p>
          </div>
          <div class="line-height-card">
            <p class="line-height-label">
              Normal
              <span style="font-family: 'Geist Mono', monospace">1.5</span>
            </p>
            <p class="line-height-sample" style="line-height: 1.5">
              The quick brown fox jumps over the lazy dog. Ideal for body text and general content.
            </p>
          </div>
          <div class="line-height-card">
            <p class="line-height-label">
              Relaxed
              <span style="font-family: 'Geist Mono', monospace">1.75</span>
            </p>
            <p class="line-height-sample" style="line-height: 1.75">
              The quick brown fox jumps over the lazy dog. Best for long-form content and articles.
            </p>
          </div>
        </div>
      </div>

      <div class="typo-section">
        <h2 class="typo-section-title">Usage Guidelines</h2>

        <div class="usage-tip">
          <p class="usage-tip-title">Headings</p>
          <p>Use semibold (600) or bold (700) weights with tight line-height (1.2) for headings.</p>
        </div>

        <div class="usage-tip">
          <p class="usage-tip-title">Body Text</p>
          <p>Use regular (400) weight with normal line-height (1.5) for optimal readability.</p>
        </div>

        <div class="usage-tip">
          <p class="usage-tip-title">Code & Technical</p>
          <p>Use the monospace font family for code snippets, technical values, and data.</p>
        </div>
      </div>
    </div>
  `,
};
