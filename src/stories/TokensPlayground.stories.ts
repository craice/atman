import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

const meta: Meta = {
  title: 'Design Tokens/Playground',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Experiment with design tokens in real-time. Adjust values and see how components respond.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const CardBuilder: Story = {
  name: 'Card Builder',
  render: () => html`
    <style>
      .playground {
        font-family: var(--atman-font-family, 'Geist', sans-serif);
        display: grid;
        grid-template-columns: 350px 1fr;
      }

      .playground-controls {
        padding: 24px;
        background: var(--atman-color-background-subtle, #F5F5F5);
        border-right: 1px solid var(--atman-color-border, #E0E0E0);
        overflow-y: auto;
      }

      .playground-preview {
        padding: 48px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--atman-color-background, #FFFFFF);
      }

      .control-section {
        margin-bottom: 32px;
      }

      .control-section-title {
        font-size: 12px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        color: var(--atman-color-text-secondary, #616161);
        margin: 0 0 16px;
      }

      .control-group {
        margin-bottom: 16px;
      }

      .control-label {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 13px;
        font-weight: 500;
        color: var(--atman-color-text, #212121);
        margin-bottom: 8px;
      }

      .control-value {
        font-family: 'Geist Mono', monospace;
        font-size: 12px;
        color: var(--atman-color-text-secondary, #757575);
      }

      .control-input {
        width: 100%;
        height: 8px;
        border-radius: 4px;
        background: var(--atman-color-border, #E0E0E0);
        appearance: none;
        cursor: pointer;
      }

      .control-input::-webkit-slider-thumb {
        appearance: none;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: var(--atman-color-primary, #1A73E8);
        cursor: pointer;
        border: 2px solid white;
        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
      }

      .control-select {
        width: 100%;
        padding: 10px 12px;
        border: 1px solid var(--atman-color-border, #E0E0E0);
        border-radius: 8px;
        font-size: 14px;
        background: white;
        color: var(--atman-color-text, #212121);
        cursor: pointer;
      }

      .control-color {
        display: flex;
        gap: 8px;
      }

      .color-swatch {
        width: 36px;
        height: 36px;
        border-radius: 8px;
        cursor: pointer;
        border: 2px solid transparent;
        transition: border-color 0.15s, transform 0.15s;
      }

      .color-swatch:hover {
        transform: scale(1.1);
      }

      .color-swatch.active {
        border-color: var(--atman-color-text, #212121);
      }

      .preview-card {
        width: 360px;
        background: var(--card-bg, white);
        border-radius: var(--card-radius, 12px);
        box-shadow: var(--card-shadow, 0 4px 6px -1px rgba(0, 0, 0, 0.1));
        overflow: hidden;
        transition: all 0.2s ease;
      }

      .preview-card-header {
        padding: var(--card-padding, 20px);
        border-bottom: 1px solid var(--atman-color-border, #E0E0E0);
      }

      .preview-card-title {
        font-size: var(--card-title-size, 18px);
        font-weight: var(--card-title-weight, 600);
        color: var(--atman-color-text, #212121);
        margin: 0;
      }

      .preview-card-body {
        padding: var(--card-padding, 20px);
      }

      .preview-card-text {
        font-size: var(--card-text-size, 14px);
        line-height: var(--card-line-height, 1.6);
        color: var(--atman-color-text-secondary, #616161);
        margin: 0;
      }

      .preview-card-footer {
        padding: var(--card-padding, 20px);
        border-top: 1px solid var(--atman-color-border, #E0E0E0);
        display: flex;
        justify-content: flex-end;
        gap: var(--card-button-gap, 12px);
      }

      .preview-btn {
        padding: 10px 20px;
        border-radius: var(--btn-radius, 8px);
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.15s;
      }

      .preview-btn-secondary {
        background: transparent;
        border: 1px solid var(--atman-color-border, #E0E0E0);
        color: var(--atman-color-text, #212121);
      }

      .preview-btn-primary {
        background: var(--btn-bg, #1A73E8);
        border: none;
        color: white;
      }

      .code-output {
        margin-top: 32px;
        padding: 16px;
        background: #1E1E1E;
        border-radius: 8px;
        font-family: 'Geist Mono', monospace;
        font-size: 12px;
        color: #E0E0E0;
        overflow-x: auto;
      }

      .code-output pre {
        margin: 0;
        white-space: pre-wrap;
      }

      .code-comment {
        color: #6A9955;
      }

      .code-property {
        color: #9CDCFE;
      }

      .code-value {
        color: #CE9178;
      }
    </style>

    <div class="playground">
      <div class="playground-controls">
        <div class="control-section">
          <h3 class="control-section-title">Spacing</h3>

          <div class="control-group">
            <label class="control-label">
              Padding
              <span class="control-value" id="padding-value">20px</span>
            </label>
            <input
              type="range"
              class="control-input"
              min="8"
              max="48"
              value="20"
              @input=${(e: Event) => {
                const value = (e.target as HTMLInputElement).value;
                document.getElementById('padding-value')!.textContent = value + 'px';
                document.querySelectorAll('.preview-card').forEach(el => {
                  (el as HTMLElement).style.setProperty('--card-padding', value + 'px');
                });
              }}
            />
          </div>

          <div class="control-group">
            <label class="control-label">
              Border Radius
              <span class="control-value" id="radius-value">12px</span>
            </label>
            <input
              type="range"
              class="control-input"
              min="0"
              max="24"
              value="12"
              @input=${(e: Event) => {
                const value = (e.target as HTMLInputElement).value;
                document.getElementById('radius-value')!.textContent = value + 'px';
                document.querySelectorAll('.preview-card').forEach(el => {
                  (el as HTMLElement).style.setProperty('--card-radius', value + 'px');
                });
              }}
            />
          </div>

          <div class="control-group">
            <label class="control-label">
              Button Gap
              <span class="control-value" id="gap-value">12px</span>
            </label>
            <input
              type="range"
              class="control-input"
              min="4"
              max="24"
              value="12"
              @input=${(e: Event) => {
                const value = (e.target as HTMLInputElement).value;
                document.getElementById('gap-value')!.textContent = value + 'px';
                document.querySelectorAll('.preview-card').forEach(el => {
                  (el as HTMLElement).style.setProperty('--card-button-gap', value + 'px');
                });
              }}
            />
          </div>
        </div>

        <div class="control-section">
          <h3 class="control-section-title">Typography</h3>

          <div class="control-group">
            <label class="control-label">
              Title Size
              <span class="control-value" id="title-size-value">18px</span>
            </label>
            <input
              type="range"
              class="control-input"
              min="14"
              max="32"
              value="18"
              @input=${(e: Event) => {
                const value = (e.target as HTMLInputElement).value;
                document.getElementById('title-size-value')!.textContent = value + 'px';
                document.querySelectorAll('.preview-card').forEach(el => {
                  (el as HTMLElement).style.setProperty('--card-title-size', value + 'px');
                });
              }}
            />
          </div>

          <div class="control-group">
            <label class="control-label">Title Weight</label>
            <select
              class="control-select"
              @change=${(e: Event) => {
                const value = (e.target as HTMLSelectElement).value;
                document.querySelectorAll('.preview-card').forEach(el => {
                  (el as HTMLElement).style.setProperty('--card-title-weight', value);
                });
              }}
            >
              <option value="400">Regular (400)</option>
              <option value="500">Medium (500)</option>
              <option value="600" selected>Semibold (600)</option>
              <option value="700">Bold (700)</option>
            </select>
          </div>

          <div class="control-group">
            <label class="control-label">
              Body Text Size
              <span class="control-value" id="text-size-value">14px</span>
            </label>
            <input
              type="range"
              class="control-input"
              min="12"
              max="18"
              value="14"
              @input=${(e: Event) => {
                const value = (e.target as HTMLInputElement).value;
                document.getElementById('text-size-value')!.textContent = value + 'px';
                document.querySelectorAll('.preview-card').forEach(el => {
                  (el as HTMLElement).style.setProperty('--card-text-size', value + 'px');
                });
              }}
            />
          </div>

          <div class="control-group">
            <label class="control-label">Line Height</label>
            <select
              class="control-select"
              @change=${(e: Event) => {
                const value = (e.target as HTMLSelectElement).value;
                document.querySelectorAll('.preview-card').forEach(el => {
                  (el as HTMLElement).style.setProperty('--card-line-height', value);
                });
              }}
            >
              <option value="1.2">Tight (1.2)</option>
              <option value="1.5">Normal (1.5)</option>
              <option value="1.6" selected>Default (1.6)</option>
              <option value="1.75">Relaxed (1.75)</option>
            </select>
          </div>
        </div>

        <div class="control-section">
          <h3 class="control-section-title">Shadow</h3>

          <div class="control-group">
            <label class="control-label">Elevation</label>
            <select
              class="control-select"
              @change=${(e: Event) => {
                const value = (e.target as HTMLSelectElement).value;
                const shadows: Record<string, string> = {
                  'none': 'none',
                  'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                  'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
                  'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
                  'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
                };
                document.querySelectorAll('.preview-card').forEach(el => {
                  (el as HTMLElement).style.setProperty('--card-shadow', shadows[value]);
                });
              }}
            >
              <option value="none">None</option>
              <option value="sm">Small</option>
              <option value="md" selected>Medium</option>
              <option value="lg">Large</option>
              <option value="xl">Extra Large</option>
            </select>
          </div>
        </div>

        <div class="control-section">
          <h3 class="control-section-title">Colors</h3>

          <div class="control-group">
            <label class="control-label">Primary Button</label>
            <div class="control-color">
              ${['#1A73E8', '#1E8E3E', '#F9AB00', '#D93025', '#5F6368', '#7C3AED'].map(color => html`
                <div
                  class="color-swatch ${color === '#1A73E8' ? 'active' : ''}"
                  style="background: ${color}"
                  @click=${(e: Event) => {
                    document.querySelectorAll('.control-color .color-swatch').forEach(el => el.classList.remove('active'));
                    (e.target as HTMLElement).classList.add('active');
                    document.querySelectorAll('.preview-card').forEach(el => {
                      (el as HTMLElement).style.setProperty('--btn-bg', color);
                    });
                  }}
                ></div>
              `)}
            </div>
          </div>

          <div class="control-group">
            <label class="control-label">Button Radius</label>
            <select
              class="control-select"
              @change=${(e: Event) => {
                const value = (e.target as HTMLSelectElement).value;
                document.querySelectorAll('.preview-card').forEach(el => {
                  (el as HTMLElement).style.setProperty('--btn-radius', value);
                });
              }}
            >
              <option value="4px">Small (4px)</option>
              <option value="8px" selected>Medium (8px)</option>
              <option value="12px">Large (12px)</option>
              <option value="9999px">Full (pill)</option>
            </select>
          </div>
        </div>

        <div class="code-output">
          <pre><span class="code-comment">/* Generated CSS Variables */</span>
<span class="code-property">--card-padding</span>: <span class="code-value">20px</span>;
<span class="code-property">--card-radius</span>: <span class="code-value">12px</span>;
<span class="code-property">--card-shadow</span>: <span class="code-value">md</span>;
<span class="code-property">--title-size</span>: <span class="code-value">18px</span>;
<span class="code-property">--title-weight</span>: <span class="code-value">600</span>;
<span class="code-property">--text-size</span>: <span class="code-value">14px</span>;
<span class="code-property">--line-height</span>: <span class="code-value">1.6</span>;</pre>
        </div>
      </div>

      <div class="playground-preview">
        <div class="preview-card">
          <div class="preview-card-header">
            <h3 class="preview-card-title">Card Title</h3>
          </div>
          <div class="preview-card-body">
            <p class="preview-card-text">
              This is a preview card that responds to the token adjustments
              in the controls panel. Try changing the values to see how
              different token combinations affect the design.
            </p>
          </div>
          <div class="preview-card-footer">
            <button class="preview-btn preview-btn-secondary">Cancel</button>
            <button class="preview-btn preview-btn-primary">Confirm</button>
          </div>
        </div>
      </div>
    </div>
  `,
};

export const ButtonBuilder: Story = {
  name: 'Button Builder',
  render: () => html`
    <style>
      .btn-playground {
        font-family: var(--atman-font-family, 'Geist', sans-serif);
        display: grid;
        grid-template-columns: 320px 1fr;
      }

      .btn-controls {
        padding: 24px;
        background: var(--atman-color-background-subtle, #F5F5F5);
        border-right: 1px solid var(--atman-color-border, #E0E0E0);
      }

      .btn-preview-area {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 32px;
        padding: 48px;
      }

      .btn-control-section {
        margin-bottom: 24px;
      }

      .btn-control-title {
        font-size: 12px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        color: var(--atman-color-text-secondary, #616161);
        margin: 0 0 12px;
      }

      .btn-control-row {
        margin-bottom: 12px;
      }

      .btn-control-label {
        display: block;
        font-size: 13px;
        font-weight: 500;
        color: var(--atman-color-text, #212121);
        margin-bottom: 6px;
      }

      .btn-control-input {
        width: 100%;
        padding: 10px 12px;
        border: 1px solid var(--atman-color-border, #E0E0E0);
        border-radius: 8px;
        font-size: 14px;
        background: white;
      }

      .btn-control-slider {
        width: 100%;
        height: 6px;
        border-radius: 3px;
        background: var(--atman-color-border, #E0E0E0);
        appearance: none;
      }

      .btn-control-slider::-webkit-slider-thumb {
        appearance: none;
        width: 18px;
        height: 18px;
        border-radius: 50%;
        background: var(--atman-color-primary, #1A73E8);
        cursor: pointer;
      }

      .custom-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: var(--btn-icon-gap, 8px);
        padding: var(--btn-padding-y, 12px) var(--btn-padding-x, 24px);
        background: var(--btn-background, #1A73E8);
        color: var(--btn-color, white);
        border: var(--btn-border, none);
        border-radius: var(--btn-border-radius, 8px);
        font-size: var(--btn-font-size, 14px);
        font-weight: var(--btn-font-weight, 500);
        cursor: pointer;
        transition: all 0.15s;
      }

      .custom-btn:hover {
        filter: brightness(0.95);
        transform: translateY(-1px);
      }

      .btn-states {
        display: flex;
        gap: 16px;
        flex-wrap: wrap;
        justify-content: center;
      }

      .btn-state-label {
        font-size: 12px;
        color: var(--atman-color-text-secondary, #757575);
        text-align: center;
        margin-top: 8px;
      }

      .btn-state-item {
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      .btn-disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      .btn-code-output {
        width: 100%;
        max-width: 500px;
        padding: 16px;
        background: #1E1E1E;
        border-radius: 8px;
        font-family: 'Geist Mono', monospace;
        font-size: 13px;
        color: #E0E0E0;
      }
    </style>

    <div class="btn-playground">
      <div class="btn-controls">
        <div class="btn-control-section">
          <h3 class="btn-control-title">Content</h3>
          <div class="btn-control-row">
            <label class="btn-control-label">Button Text</label>
            <input
              type="text"
              class="btn-control-input"
              value="Click me"
              @input=${(e: Event) => {
                const value = (e.target as HTMLInputElement).value;
                document.querySelectorAll('.custom-btn-text').forEach(el => {
                  el.textContent = value;
                });
              }}
            />
          </div>
        </div>

        <div class="btn-control-section">
          <h3 class="btn-control-title">Sizing</h3>
          <div class="btn-control-row">
            <label class="btn-control-label">Padding X: <span id="px-val">24px</span></label>
            <input
              type="range"
              class="btn-control-slider"
              min="12"
              max="48"
              value="24"
              @input=${(e: Event) => {
                const value = (e.target as HTMLInputElement).value + 'px';
                document.getElementById('px-val')!.textContent = value;
                document.querySelectorAll('.custom-btn').forEach(el => {
                  (el as HTMLElement).style.setProperty('--btn-padding-x', value);
                });
              }}
            />
          </div>
          <div class="btn-control-row">
            <label class="btn-control-label">Padding Y: <span id="py-val">12px</span></label>
            <input
              type="range"
              class="btn-control-slider"
              min="6"
              max="24"
              value="12"
              @input=${(e: Event) => {
                const value = (e.target as HTMLInputElement).value + 'px';
                document.getElementById('py-val')!.textContent = value;
                document.querySelectorAll('.custom-btn').forEach(el => {
                  (el as HTMLElement).style.setProperty('--btn-padding-y', value);
                });
              }}
            />
          </div>
          <div class="btn-control-row">
            <label class="btn-control-label">Border Radius: <span id="br-val">8px</span></label>
            <input
              type="range"
              class="btn-control-slider"
              min="0"
              max="24"
              value="8"
              @input=${(e: Event) => {
                const value = (e.target as HTMLInputElement).value + 'px';
                document.getElementById('br-val')!.textContent = value;
                document.querySelectorAll('.custom-btn').forEach(el => {
                  (el as HTMLElement).style.setProperty('--btn-border-radius', value);
                });
              }}
            />
          </div>
          <div class="btn-control-row">
            <label class="btn-control-label">Font Size: <span id="fs-val">14px</span></label>
            <input
              type="range"
              class="btn-control-slider"
              min="12"
              max="20"
              value="14"
              @input=${(e: Event) => {
                const value = (e.target as HTMLInputElement).value + 'px';
                document.getElementById('fs-val')!.textContent = value;
                document.querySelectorAll('.custom-btn').forEach(el => {
                  (el as HTMLElement).style.setProperty('--btn-font-size', value);
                });
              }}
            />
          </div>
        </div>

        <div class="btn-control-section">
          <h3 class="btn-control-title">Style</h3>
          <div class="btn-control-row">
            <label class="btn-control-label">Background</label>
            <input
              type="color"
              class="btn-control-input"
              value="#1A73E8"
              style="height: 40px; padding: 4px;"
              @input=${(e: Event) => {
                const value = (e.target as HTMLInputElement).value;
                document.querySelectorAll('.custom-btn:not(.btn-disabled)').forEach(el => {
                  (el as HTMLElement).style.setProperty('--btn-background', value);
                });
              }}
            />
          </div>
          <div class="btn-control-row">
            <label class="btn-control-label">Font Weight</label>
            <select
              class="btn-control-input"
              @change=${(e: Event) => {
                const value = (e.target as HTMLSelectElement).value;
                document.querySelectorAll('.custom-btn').forEach(el => {
                  (el as HTMLElement).style.setProperty('--btn-font-weight', value);
                });
              }}
            >
              <option value="400">Regular (400)</option>
              <option value="500" selected>Medium (500)</option>
              <option value="600">Semibold (600)</option>
              <option value="700">Bold (700)</option>
            </select>
          </div>
        </div>
      </div>

      <div class="btn-preview-area">
        <div class="btn-states">
          <div class="btn-state-item">
            <button class="custom-btn">
              <span class="custom-btn-text">Click me</span>
            </button>
            <span class="btn-state-label">Default</span>
          </div>
          <div class="btn-state-item">
            <button class="custom-btn" style="filter: brightness(0.95);">
              <span class="custom-btn-text">Click me</span>
            </button>
            <span class="btn-state-label">Hover</span>
          </div>
          <div class="btn-state-item">
            <button class="custom-btn btn-disabled">
              <span class="custom-btn-text">Click me</span>
            </button>
            <span class="btn-state-label">Disabled</span>
          </div>
        </div>

        <div class="btn-code-output">
          <pre>atman-button {
  --btn-padding-x: 24px;
  --btn-padding-y: 12px;
  --btn-border-radius: 8px;
  --btn-font-size: 14px;
  --btn-font-weight: 500;
}</pre>
        </div>
      </div>
    </div>
  `,
};
