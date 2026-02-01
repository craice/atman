import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

const meta: Meta = {
  title: 'Design Tokens/Spacing',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj;

export const Spacing: Story = {
  render: () => html`
    <style>
      .spacing-container {
        font-family: var(--atman-font-family, 'Geist', sans-serif);
        max-width: 900px;
        margin: 0 auto;
        padding: 32px;
      }

      .spacing-title {
        font-size: 36px;
        font-weight: 700;
        color: var(--atman-color-text, #212121);
        margin: 0 0 16px;
      }

      .spacing-subtitle {
        font-size: 18px;
        color: var(--atman-color-text-secondary, #616161);
        margin: 0 0 48px;
        line-height: 1.6;
      }

      .spacing-section {
        margin-bottom: 56px;
      }

      .spacing-section-title {
        font-size: 24px;
        font-weight: 600;
        color: var(--atman-color-text, #212121);
        margin: 0 0 24px;
      }

      .spacing-scale {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      .spacing-item {
        display: flex;
        align-items: center;
        gap: 24px;
        padding: 16px;
        background: var(--atman-color-surface, #FFFFFF);
        border: 1px solid var(--atman-color-border, #E0E0E0);
        border-radius: 12px;
      }

      .spacing-visual {
        width: 200px;
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .spacing-bar {
        height: 24px;
        background: linear-gradient(135deg, #1A73E8 0%, #4285F4 100%);
        border-radius: 4px;
      }

      .spacing-info {
        flex: 1;
        display: flex;
        align-items: center;
        gap: 32px;
      }

      .spacing-name {
        font-weight: 600;
        color: var(--atman-color-text, #212121);
        min-width: 60px;
      }

      .spacing-value {
        font-family: 'Geist Mono', monospace;
        font-size: 14px;
        color: var(--atman-color-text-secondary, #757575);
        min-width: 50px;
      }

      .spacing-css {
        font-family: 'Geist Mono', monospace;
        font-size: 13px;
        color: var(--atman-color-text-tertiary, #9E9E9E);
      }

      .spacing-use {
        font-size: 13px;
        color: var(--atman-color-text-secondary, #616161);
        flex: 1;
      }

      .radius-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 24px;
      }

      @media (max-width: 768px) {
        .radius-grid {
          grid-template-columns: repeat(2, 1fr);
        }
      }

      .radius-card {
        background: var(--atman-color-surface, #FFFFFF);
        border: 1px solid var(--atman-color-border, #E0E0E0);
        border-radius: 12px;
        padding: 24px;
        text-align: center;
      }

      .radius-preview {
        width: 80px;
        height: 80px;
        background: linear-gradient(135deg, #1A73E8 0%, #4285F4 100%);
        margin: 0 auto 16px;
      }

      .radius-name {
        font-weight: 600;
        color: var(--atman-color-text, #212121);
        margin: 0 0 4px;
      }

      .radius-value {
        font-family: 'Geist Mono', monospace;
        font-size: 13px;
        color: var(--atman-color-text-secondary, #757575);
        margin: 0 0 8px;
      }

      .radius-css {
        font-family: 'Geist Mono', monospace;
        font-size: 11px;
        color: var(--atman-color-text-tertiary, #9E9E9E);
      }

      .shadow-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 24px;
      }

      @media (max-width: 600px) {
        .shadow-grid {
          grid-template-columns: 1fr;
        }
      }

      .shadow-card {
        background: var(--atman-color-surface, #FFFFFF);
        border: 1px solid var(--atman-color-border, #E0E0E0);
        border-radius: 12px;
        padding: 32px;
      }

      .shadow-preview {
        width: 100%;
        height: 80px;
        background: var(--atman-color-surface, #FFFFFF);
        border-radius: 8px;
        margin-bottom: 16px;
      }

      .shadow-name {
        font-weight: 600;
        color: var(--atman-color-text, #212121);
        margin: 0 0 8px;
      }

      .shadow-css {
        font-family: 'Geist Mono', monospace;
        font-size: 12px;
        color: var(--atman-color-text-tertiary, #9E9E9E);
      }

      .grid-demo {
        background: var(--atman-color-surface, #FFFFFF);
        border: 1px solid var(--atman-color-border, #E0E0E0);
        border-radius: 12px;
        padding: 24px;
        margin-bottom: 24px;
      }

      .grid-row {
        display: flex;
        gap: 8px;
        margin-bottom: 8px;
      }

      .grid-cell {
        flex: 1;
        height: 32px;
        background: linear-gradient(135deg, rgba(26, 115, 232, 0.2) 0%, rgba(66, 133, 244, 0.2) 100%);
        border: 1px dashed rgba(26, 115, 232, 0.5);
        border-radius: 4px;
      }

      .tip-box {
        background: #E8F0FE;
        border-left: 4px solid var(--atman-color-primary, #1A73E8);
        padding: 16px 20px;
        border-radius: 0 8px 8px 0;
        margin: 24px 0;
      }

      .tip-title {
        font-weight: 600;
        color: var(--atman-color-primary, #1A73E8);
        margin: 0 0 4px;
        font-size: 14px;
      }

      .tip-box p {
        margin: 0;
        font-size: 14px;
        color: var(--atman-color-text, #212121);
      }
    </style>

    <div class="spacing-container">
      <h1 class="spacing-title">Spacing</h1>
      <p class="spacing-subtitle">
        Atman uses an 8px grid system for consistent spacing.
        All spacing values are multiples of 4px for pixel-perfect alignment.
      </p>

      <div class="spacing-section">
        <h2 class="spacing-section-title">8px Grid System</h2>
        <div class="grid-demo">
          <div class="grid-row">
            ${Array(12).fill(0).map(() => html`<div class="grid-cell"></div>`)}
          </div>
          <div class="grid-row">
            ${Array(12).fill(0).map(() => html`<div class="grid-cell"></div>`)}
          </div>
        </div>
        <div class="tip-box">
          <p class="tip-title">Why 8px?</p>
          <p>The 8px grid scales well across devices and ensures crisp rendering on all screen densities.</p>
        </div>
      </div>

      <div class="spacing-section">
        <h2 class="spacing-section-title">Spacing Scale</h2>

        <div class="spacing-scale">
          <div class="spacing-item">
            <div class="spacing-visual">
              <div class="spacing-bar" style="width: 2px; min-width: 2px"></div>
            </div>
            <div class="spacing-info">
              <span class="spacing-name">0</span>
              <span class="spacing-value">0px</span>
              <span class="spacing-css">--atman-space-0</span>
              <span class="spacing-use">Reset, none</span>
            </div>
          </div>

          <div class="spacing-item">
            <div class="spacing-visual">
              <div class="spacing-bar" style="width: 4px"></div>
            </div>
            <div class="spacing-info">
              <span class="spacing-name">1</span>
              <span class="spacing-value">4px</span>
              <span class="spacing-css">--atman-space-1</span>
              <span class="spacing-use">Tight gaps, icon spacing</span>
            </div>
          </div>

          <div class="spacing-item">
            <div class="spacing-visual">
              <div class="spacing-bar" style="width: 8px"></div>
            </div>
            <div class="spacing-info">
              <span class="spacing-name">2</span>
              <span class="spacing-value">8px</span>
              <span class="spacing-css">--atman-space-2</span>
              <span class="spacing-use">Base unit, small gaps</span>
            </div>
          </div>

          <div class="spacing-item">
            <div class="spacing-visual">
              <div class="spacing-bar" style="width: 12px"></div>
            </div>
            <div class="spacing-info">
              <span class="spacing-name">3</span>
              <span class="spacing-value">12px</span>
              <span class="spacing-css">--atman-space-3</span>
              <span class="spacing-use">Medium gaps</span>
            </div>
          </div>

          <div class="spacing-item">
            <div class="spacing-visual">
              <div class="spacing-bar" style="width: 16px"></div>
            </div>
            <div class="spacing-info">
              <span class="spacing-name">4</span>
              <span class="spacing-value">16px</span>
              <span class="spacing-css">--atman-space-4</span>
              <span class="spacing-use">Default padding, gaps</span>
            </div>
          </div>

          <div class="spacing-item">
            <div class="spacing-visual">
              <div class="spacing-bar" style="width: 24px"></div>
            </div>
            <div class="spacing-info">
              <span class="spacing-name">5</span>
              <span class="spacing-value">24px</span>
              <span class="spacing-css">--atman-space-5</span>
              <span class="spacing-use">Card padding, section gaps</span>
            </div>
          </div>

          <div class="spacing-item">
            <div class="spacing-visual">
              <div class="spacing-bar" style="width: 32px"></div>
            </div>
            <div class="spacing-info">
              <span class="spacing-name">6</span>
              <span class="spacing-value">32px</span>
              <span class="spacing-css">--atman-space-6</span>
              <span class="spacing-use">Large gaps, section spacing</span>
            </div>
          </div>

          <div class="spacing-item">
            <div class="spacing-visual">
              <div class="spacing-bar" style="width: 48px"></div>
            </div>
            <div class="spacing-info">
              <span class="spacing-name">7</span>
              <span class="spacing-value">48px</span>
              <span class="spacing-css">--atman-space-7</span>
              <span class="spacing-use">Page sections</span>
            </div>
          </div>

          <div class="spacing-item">
            <div class="spacing-visual">
              <div class="spacing-bar" style="width: 64px"></div>
            </div>
            <div class="spacing-info">
              <span class="spacing-name">8</span>
              <span class="spacing-value">64px</span>
              <span class="spacing-css">--atman-space-8</span>
              <span class="spacing-use">Large sections</span>
            </div>
          </div>

          <div class="spacing-item">
            <div class="spacing-visual">
              <div class="spacing-bar" style="width: 96px"></div>
            </div>
            <div class="spacing-info">
              <span class="spacing-name">9</span>
              <span class="spacing-value">96px</span>
              <span class="spacing-css">--atman-space-9</span>
              <span class="spacing-use">Page margins, hero sections</span>
            </div>
          </div>
        </div>
      </div>

      <div class="spacing-section">
        <h2 class="spacing-section-title">Border Radius</h2>

        <div class="radius-grid">
          <div class="radius-card">
            <div class="radius-preview" style="border-radius: 4px"></div>
            <p class="radius-name">Small</p>
            <p class="radius-value">4px</p>
            <p class="radius-css">--atman-radius-sm</p>
          </div>
          <div class="radius-card">
            <div class="radius-preview" style="border-radius: 8px"></div>
            <p class="radius-name">Medium</p>
            <p class="radius-value">8px</p>
            <p class="radius-css">--atman-radius-md</p>
          </div>
          <div class="radius-card">
            <div class="radius-preview" style="border-radius: 12px"></div>
            <p class="radius-name">Large</p>
            <p class="radius-value">12px</p>
            <p class="radius-css">--atman-radius-lg</p>
          </div>
          <div class="radius-card">
            <div class="radius-preview" style="border-radius: 9999px"></div>
            <p class="radius-name">Full</p>
            <p class="radius-value">9999px</p>
            <p class="radius-css">--atman-radius-full</p>
          </div>
        </div>
      </div>

      <div class="spacing-section">
        <h2 class="spacing-section-title">Shadows</h2>

        <div class="shadow-grid">
          <div class="shadow-card">
            <div class="shadow-preview" style="box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05)"></div>
            <p class="shadow-name">Small</p>
            <p class="shadow-css">--atman-shadow-sm</p>
          </div>
          <div class="shadow-card">
            <div class="shadow-preview" style="box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)"></div>
            <p class="shadow-name">Medium</p>
            <p class="shadow-css">--atman-shadow-md</p>
          </div>
          <div class="shadow-card">
            <div class="shadow-preview" style="box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)"></div>
            <p class="shadow-name">Large</p>
            <p class="shadow-css">--atman-shadow-lg</p>
          </div>
          <div class="shadow-card">
            <div class="shadow-preview" style="box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)"></div>
            <p class="shadow-name">Extra Large</p>
            <p class="shadow-css">--atman-shadow-xl</p>
          </div>
        </div>
      </div>
    </div>
  `,
};
