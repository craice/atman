import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

const meta: Meta = {
  title: 'Design Tokens/Colors',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj;

export const Colors: Story = {
  render: () => html`
    <style>
      .colors-container {
        font-family: var(--atman-font-family, 'Geist', sans-serif);
        max-width: 1000px;
        margin: 0 auto;
        padding: 32px;
      }

      .colors-title {
        font-size: 36px;
        font-weight: 700;
        color: var(--atman-color-text, #212121);
        margin: 0 0 16px;
      }

      .colors-subtitle {
        font-size: 18px;
        color: var(--atman-color-text-secondary, #616161);
        margin: 0 0 48px;
        line-height: 1.6;
      }

      .colors-section {
        margin-bottom: 48px;
      }

      .colors-section-title {
        font-size: 24px;
        font-weight: 600;
        color: var(--atman-color-text, #212121);
        margin: 0 0 20px;
      }

      .colors-group-title {
        font-size: 16px;
        font-weight: 600;
        color: var(--atman-color-text-secondary, #616161);
        margin: 24px 0 12px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      .color-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
        gap: 16px;
      }

      .color-swatch {
        display: flex;
        flex-direction: column;
        border-radius: 12px;
        overflow: hidden;
        border: 1px solid var(--atman-color-border, #E0E0E0);
        background: var(--atman-color-surface, #FFFFFF);
      }

      .color-preview {
        height: 80px;
      }

      .color-info {
        padding: 12px;
      }

      .color-name {
        font-size: 13px;
        font-weight: 600;
        color: var(--atman-color-text, #212121);
        margin: 0 0 4px;
      }

      .color-value {
        font-size: 12px;
        font-family: 'Geist Mono', monospace;
        color: var(--atman-color-text-secondary, #757575);
        margin: 0;
      }

      .color-css-var {
        font-size: 11px;
        font-family: 'Geist Mono', monospace;
        color: var(--atman-color-text-tertiary, #9E9E9E);
        margin: 4px 0 0;
        word-break: break-all;
      }

      .neutral-row {
        display: flex;
        border-radius: 12px;
        overflow: hidden;
        border: 1px solid var(--atman-color-border, #E0E0E0);
      }

      .neutral-swatch {
        flex: 1;
        height: 60px;
        display: flex;
        align-items: flex-end;
        justify-content: center;
        padding-bottom: 8px;
        font-size: 11px;
        font-weight: 500;
      }

      .semantic-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 12px;
      }

      .semantic-item {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px;
        background: var(--atman-color-surface, #FFFFFF);
        border: 1px solid var(--atman-color-border, #E0E0E0);
        border-radius: 8px;
      }

      .semantic-preview {
        width: 40px;
        height: 40px;
        border-radius: 8px;
        flex-shrink: 0;
      }

      .semantic-info {
        flex: 1;
        min-width: 0;
      }

      .semantic-name {
        font-size: 13px;
        font-weight: 500;
        color: var(--atman-color-text, #212121);
        margin: 0 0 2px;
      }

      .semantic-value {
        font-size: 11px;
        font-family: 'Geist Mono', monospace;
        color: var(--atman-color-text-secondary, #757575);
        margin: 0;
      }

      .theme-toggle-section {
        background: var(--atman-color-background-subtle, #F5F5F5);
        padding: 16px 20px;
        border-radius: 12px;
        margin-bottom: 32px;
      }

      .theme-info {
        font-size: 14px;
        color: var(--atman-color-text-secondary, #616161);
      }
    </style>

    <div class="colors-container">
      <h1 class="colors-title">Colors</h1>
      <p class="colors-subtitle">
        The Atman color system is designed for clarity and accessibility.
        All colors meet WCAG AA contrast requirements.
      </p>

      <div class="theme-toggle-section">
        <span class="theme-info">
          Use the theme toggle in the toolbar to switch between light and dark mode.
        </span>
      </div>

      <div class="colors-section">
        <h2 class="colors-section-title">Brand Colors</h2>

        <h3 class="colors-group-title">Primary (Black)</h3>
        <div class="color-grid">
          <div class="color-swatch">
            <div class="color-preview" style="background: #000000"></div>
            <div class="color-info">
              <p class="color-name">Default</p>
              <p class="color-value">#000000</p>
              <p class="color-css-var">--atman-color-primary</p>
            </div>
          </div>
          <div class="color-swatch">
            <div class="color-preview" style="background: #333333"></div>
            <div class="color-info">
              <p class="color-name">Hover</p>
              <p class="color-value">#333333</p>
              <p class="color-css-var">--atman-color-primary-hover</p>
            </div>
          </div>
          <div class="color-swatch">
            <div class="color-preview" style="background: #1A1A1A"></div>
            <div class="color-info">
              <p class="color-name">Active</p>
              <p class="color-value">#1A1A1A</p>
              <p class="color-css-var">--atman-color-primary-active</p>
            </div>
          </div>
          <div class="color-swatch">
            <div class="color-preview" style="background: #F5F5F5"></div>
            <div class="color-info">
              <p class="color-name">Light</p>
              <p class="color-value">#F5F5F5</p>
              <p class="color-css-var">--atman-color-primary-light</p>
            </div>
          </div>
        </div>

        <h3 class="colors-group-title">Secondary</h3>
        <div class="color-grid">
          <div class="color-swatch">
            <div class="color-preview" style="background: #5F6368"></div>
            <div class="color-info">
              <p class="color-name">Default</p>
              <p class="color-value">#5F6368</p>
            </div>
          </div>
          <div class="color-swatch">
            <div class="color-preview" style="background: #4A4E52"></div>
            <div class="color-info">
              <p class="color-name">Hover</p>
              <p class="color-value">#4A4E52</p>
            </div>
          </div>
          <div class="color-swatch">
            <div class="color-preview" style="background: #3C4043"></div>
            <div class="color-info">
              <p class="color-name">Active</p>
              <p class="color-value">#3C4043</p>
            </div>
          </div>
          <div class="color-swatch">
            <div class="color-preview" style="background: #F1F3F4"></div>
            <div class="color-info">
              <p class="color-name">Light</p>
              <p class="color-value">#F1F3F4</p>
            </div>
          </div>
        </div>
      </div>

      <div class="colors-section">
        <h2 class="colors-section-title">Semantic Colors</h2>

        <h3 class="colors-group-title">Success</h3>
        <div class="color-grid">
          <div class="color-swatch">
            <div class="color-preview" style="background: #1E8E3E"></div>
            <div class="color-info">
              <p class="color-name">Default</p>
              <p class="color-value">#1E8E3E</p>
              <p class="color-css-var">--atman-color-success</p>
            </div>
          </div>
          <div class="color-swatch">
            <div class="color-preview" style="background: #187A34"></div>
            <div class="color-info">
              <p class="color-name">Hover</p>
              <p class="color-value">#187A34</p>
            </div>
          </div>
          <div class="color-swatch">
            <div class="color-preview" style="background: #E6F4EA"></div>
            <div class="color-info">
              <p class="color-name">Light</p>
              <p class="color-value">#E6F4EA</p>
            </div>
          </div>
        </div>

        <h3 class="colors-group-title">Warning</h3>
        <div class="color-grid">
          <div class="color-swatch">
            <div class="color-preview" style="background: #F9AB00"></div>
            <div class="color-info">
              <p class="color-name">Default</p>
              <p class="color-value">#F9AB00</p>
              <p class="color-css-var">--atman-color-warning</p>
            </div>
          </div>
          <div class="color-swatch">
            <div class="color-preview" style="background: #E09900"></div>
            <div class="color-info">
              <p class="color-name">Hover</p>
              <p class="color-value">#E09900</p>
            </div>
          </div>
          <div class="color-swatch">
            <div class="color-preview" style="background: #FEF7E0"></div>
            <div class="color-info">
              <p class="color-name">Light</p>
              <p class="color-value">#FEF7E0</p>
            </div>
          </div>
        </div>

        <h3 class="colors-group-title">Destructive / Error</h3>
        <div class="color-grid">
          <div class="color-swatch">
            <div class="color-preview" style="background: #D93025"></div>
            <div class="color-info">
              <p class="color-name">Default</p>
              <p class="color-value">#D93025</p>
              <p class="color-css-var">--atman-color-destructive</p>
            </div>
          </div>
          <div class="color-swatch">
            <div class="color-preview" style="background: #C12B21"></div>
            <div class="color-info">
              <p class="color-name">Hover</p>
              <p class="color-value">#C12B21</p>
            </div>
          </div>
          <div class="color-swatch">
            <div class="color-preview" style="background: #FCE8E6"></div>
            <div class="color-info">
              <p class="color-name">Light</p>
              <p class="color-value">#FCE8E6</p>
            </div>
          </div>
        </div>
      </div>

      <div class="colors-section">
        <h2 class="colors-section-title">Neutral Scale</h2>
        <p style="color: #616161; margin-bottom: 20px">
          A carefully crafted grayscale for text, borders, and backgrounds.
        </p>

        <div class="neutral-row">
          <div class="neutral-swatch" style="background: #FAFAFA; color: #212121">50</div>
          <div class="neutral-swatch" style="background: #F5F5F5; color: #212121">100</div>
          <div class="neutral-swatch" style="background: #EEEEEE; color: #212121">200</div>
          <div class="neutral-swatch" style="background: #E0E0E0; color: #212121">300</div>
          <div class="neutral-swatch" style="background: #BDBDBD; color: #212121">400</div>
          <div class="neutral-swatch" style="background: #9E9E9E; color: #212121">500</div>
          <div class="neutral-swatch" style="background: #757575; color: #FFFFFF">600</div>
          <div class="neutral-swatch" style="background: #616161; color: #FFFFFF">700</div>
          <div class="neutral-swatch" style="background: #424242; color: #FFFFFF">800</div>
          <div class="neutral-swatch" style="background: #212121; color: #FFFFFF">900</div>
        </div>
      </div>

      <div class="colors-section">
        <h2 class="colors-section-title">Surface & Background</h2>

        <div class="semantic-grid">
          <div class="semantic-item">
            <div class="semantic-preview" style="background: #FFFFFF; border: 1px solid #E0E0E0"></div>
            <div class="semantic-info">
              <p class="semantic-name">Background</p>
              <p class="semantic-value">--atman-color-background</p>
            </div>
          </div>
          <div class="semantic-item">
            <div class="semantic-preview" style="background: #FAFAFA; border: 1px solid #E0E0E0"></div>
            <div class="semantic-info">
              <p class="semantic-name">Background Subtle</p>
              <p class="semantic-value">--atman-color-background-subtle</p>
            </div>
          </div>
          <div class="semantic-item">
            <div class="semantic-preview" style="background: #FFFFFF; border: 1px solid #E0E0E0"></div>
            <div class="semantic-info">
              <p class="semantic-name">Surface</p>
              <p class="semantic-value">--atman-color-surface</p>
            </div>
          </div>
          <div class="semantic-item">
            <div class="semantic-preview" style="background: #F5F5F5; border: 1px solid #E0E0E0"></div>
            <div class="semantic-info">
              <p class="semantic-name">Surface Hover</p>
              <p class="semantic-value">--atman-color-surface-hover</p>
            </div>
          </div>
        </div>
      </div>

      <div class="colors-section">
        <h2 class="colors-section-title">Text Colors</h2>

        <div class="semantic-grid">
          <div class="semantic-item">
            <div class="semantic-preview" style="background: #212121"></div>
            <div class="semantic-info">
              <p class="semantic-name">Text</p>
              <p class="semantic-value">--atman-color-text</p>
            </div>
          </div>
          <div class="semantic-item">
            <div class="semantic-preview" style="background: #757575"></div>
            <div class="semantic-info">
              <p class="semantic-name">Text Secondary</p>
              <p class="semantic-value">--atman-color-text-secondary</p>
            </div>
          </div>
          <div class="semantic-item">
            <div class="semantic-preview" style="background: #9E9E9E"></div>
            <div class="semantic-info">
              <p class="semantic-name">Text Tertiary</p>
              <p class="semantic-value">--atman-color-text-tertiary</p>
            </div>
          </div>
          <div class="semantic-item">
            <div class="semantic-preview" style="background: #FFFFFF; border: 1px solid #E0E0E0"></div>
            <div class="semantic-info">
              <p class="semantic-name">Text Inverse</p>
              <p class="semantic-value">--atman-color-text-inverse</p>
            </div>
          </div>
        </div>
      </div>

      <div class="colors-section">
        <h2 class="colors-section-title">Border Colors</h2>

        <div class="semantic-grid">
          <div class="semantic-item">
            <div class="semantic-preview" style="background: #FFFFFF; border: 3px solid #E0E0E0"></div>
            <div class="semantic-info">
              <p class="semantic-name">Border</p>
              <p class="semantic-value">--atman-color-border</p>
            </div>
          </div>
          <div class="semantic-item">
            <div class="semantic-preview" style="background: #FFFFFF; border: 3px solid #EEEEEE"></div>
            <div class="semantic-info">
              <p class="semantic-name">Border Subtle</p>
              <p class="semantic-value">--atman-color-border-subtle</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
};
