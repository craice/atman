import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

const meta: Meta = {
  title: 'Figma Integration',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj;

export const TokensStudio: Story = {
  render: () => html`
    <style>
      .figma-container {
        font-family: var(--atman-font-family, 'Geist', sans-serif);
        max-width: 900px;
        margin: 0 auto;
        padding: 32px;
      }

      .figma-title {
        font-size: 36px;
        font-weight: 700;
        color: var(--atman-color-text, #212121);
        margin: 0 0 16px;
      }

      .figma-subtitle {
        font-size: 18px;
        color: var(--atman-color-text-secondary, #616161);
        margin: 0 0 48px;
        line-height: 1.6;
      }

      .figma-section {
        margin-bottom: 48px;
      }

      .figma-section-title {
        font-size: 24px;
        font-weight: 600;
        color: var(--atman-color-text, #212121);
        margin: 0 0 16px;
        padding-bottom: 8px;
        border-bottom: 1px solid var(--atman-color-border, #E0E0E0);
      }

      .figma-section p {
        color: var(--atman-color-text-secondary, #616161);
        line-height: 1.7;
        margin: 0 0 16px;
      }

      .figma-code {
        background: var(--atman-color-background-subtle, #F5F5F5);
        padding: 20px 24px;
        border-radius: 8px;
        font-family: 'Geist Mono', monospace;
        font-size: 14px;
        overflow-x: auto;
        margin: 16px 0;
      }

      .figma-code pre {
        margin: 0;
        white-space: pre-wrap;
      }

      .figma-code-inline {
        background: var(--atman-color-background-subtle, #F5F5F5);
        padding: 2px 8px;
        border-radius: 4px;
        font-family: 'Geist Mono', monospace;
        font-size: 13px;
      }

      .figma-steps {
        counter-reset: step;
        list-style: none;
        padding: 0;
      }

      .figma-step {
        position: relative;
        padding-left: 48px;
        margin-bottom: 32px;
      }

      .figma-step-number {
        position: absolute;
        left: 0;
        top: 0;
        width: 32px;
        height: 32px;
        background: #000000;
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 600;
        font-size: 14px;
      }

      .figma-step-title {
        font-size: 18px;
        font-weight: 600;
        color: var(--atman-color-text, #212121);
        margin: 0 0 8px;
      }

      .figma-step p {
        color: var(--atman-color-text-secondary, #616161);
        margin: 0;
        line-height: 1.6;
      }

      .figma-tip {
        background: #E6F4EA;
        border-left: 4px solid #1E8E3E;
        padding: 16px 20px;
        border-radius: 0 8px 8px 0;
        margin: 24px 0;
      }

      .figma-tip-title {
        font-weight: 600;
        color: #1E8E3E;
        margin: 0 0 4px;
        font-size: 14px;
      }

      .figma-tip p {
        margin: 0;
        font-size: 14px;
        color: var(--atman-color-text, #212121);
      }

      .figma-warning {
        background: #FEF7E0;
        border-left: 4px solid #F9AB00;
        padding: 16px 20px;
        border-radius: 0 8px 8px 0;
        margin: 24px 0;
      }

      .figma-warning-title {
        font-weight: 600;
        color: #E09900;
        margin: 0 0 4px;
        font-size: 14px;
      }

      .figma-warning p {
        margin: 0;
        font-size: 14px;
        color: var(--atman-color-text, #212121);
      }

      .figma-table {
        width: 100%;
        border-collapse: collapse;
        margin: 16px 0;
      }

      .figma-table th,
      .figma-table td {
        text-align: left;
        padding: 12px 16px;
        border-bottom: 1px solid var(--atman-color-border, #E0E0E0);
      }

      .figma-table th {
        font-weight: 600;
        color: var(--atman-color-text, #212121);
        background: var(--atman-color-background-subtle, #F5F5F5);
      }

      .figma-table td {
        color: var(--atman-color-text-secondary, #616161);
      }

      .figma-card-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 16px;
        margin: 24px 0;
      }

      .figma-card {
        background: var(--atman-color-surface, #FFFFFF);
        border: 1px solid var(--atman-color-border, #E0E0E0);
        border-radius: 8px;
        padding: 20px;
      }

      .figma-card-title {
        font-size: 16px;
        font-weight: 600;
        color: var(--atman-color-text, #212121);
        margin: 0 0 8px;
      }

      .figma-card p {
        font-size: 14px;
        color: var(--atman-color-text-secondary, #616161);
        margin: 0;
        line-height: 1.5;
      }

      .figma-badge {
        display: inline-block;
        background: var(--atman-color-primary, #111111);
        color: var(--atman-color-text-on-primary, #FFFFFF);
        padding: 4px 10px;
        border-radius: 4px;
        font-size: 12px;
        font-weight: 500;
        margin-right: 8px;
      }

      .figma-link {
        color: var(--atman-color-primary, #111111);
        text-decoration: underline;
      }

      .figma-link:hover {
        text-decoration: none;
      }

      .figma-subsection {
        margin: 32px 0;
      }

      .figma-subsection-title {
        font-size: 18px;
        font-weight: 600;
        color: var(--atman-color-text, #212121);
        margin: 0 0 12px;
      }
    </style>

    <div class="figma-container">
      <h1 class="figma-title">Figma Tokens Studio Integration</h1>
      <p class="figma-subtitle">
        Sync Atman design tokens with Figma using the Tokens Studio plugin. Keep your designs
        and code in perfect harmony with a single source of truth.
      </p>

      <div class="figma-section">
        <h2 class="figma-section-title">Overview</h2>
        <p>
          Tokens Studio (formerly Figma Tokens) allows you to manage design tokens directly in Figma.
          By importing Atman's token file, you can use consistent spacing, colors, and typography
          across all your designs.
        </p>

        <div class="figma-card-grid">
          <div class="figma-card">
            <h3 class="figma-card-title">Consistent Design</h3>
            <p>Use the exact same tokens in Figma that your code uses, ensuring pixel-perfect implementation.</p>
          </div>
          <div class="figma-card">
            <h3 class="figma-card-title">Theme Switching</h3>
            <p>Switch between light and dark themes instantly in Figma with pre-configured theme sets.</p>
          </div>
          <div class="figma-card">
            <h3 class="figma-card-title">Single Source</h3>
            <p>Maintain tokens in code and sync to Figma, or vice versa with GitHub integration.</p>
          </div>
        </div>
      </div>

      <div class="figma-section">
        <h2 class="figma-section-title">Quick Start</h2>

        <ol class="figma-steps">
          <li class="figma-step">
            <span class="figma-step-number">1</span>
            <h3 class="figma-step-title">Install Tokens Studio Plugin</h3>
            <p>
              In Figma, go to <strong>Menu → Plugins → Browse plugins</strong> and search for
              "Tokens Studio for Figma". Click Install.
            </p>
          </li>

          <li class="figma-step">
            <span class="figma-step-number">2</span>
            <h3 class="figma-step-title">Generate Token File</h3>
            <p>Run this command in your project to generate the Tokens Studio compatible JSON:</p>
            <div class="figma-code"><pre>npm run export-tokens-studio</pre></div>
            <p>This creates <span class="figma-code-inline">src/tokens/tokens-studio.json</span></p>
          </li>

          <li class="figma-step">
            <span class="figma-step-number">3</span>
            <h3 class="figma-step-title">Import into Figma</h3>
            <p>
              Open Tokens Studio plugin, go to Settings, select "Local document" storage,
              and load the <span class="figma-code-inline">tokens-studio.json</span> file.
            </p>
          </li>

          <li class="figma-step">
            <span class="figma-step-number">4</span>
            <h3 class="figma-step-title">Apply Tokens</h3>
            <p>
              Select layers in Figma and click tokens in the plugin to apply them.
              Switch themes using the Themes tab.
            </p>
          </li>
        </ol>
      </div>

      <div class="figma-section">
        <h2 class="figma-section-title">Token Structure</h2>
        <p>Tokens are organized into three sets for maximum flexibility:</p>

        <div class="figma-subsection">
          <h3 class="figma-subsection-title">
            <span class="figma-badge">global</span> Theme-Independent Tokens
          </h3>
          <table class="figma-table">
            <thead>
              <tr>
                <th>Category</th>
                <th>Tokens</th>
                <th>Example</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>spacing</td>
                <td>0, 1, 2, 3, 4, 5, 6, 7, 8, 9</td>
                <td><span class="figma-code-inline">{spacing.4}</span> = 16px</td>
              </tr>
              <tr>
                <td>fontSize</td>
                <td>xs, sm, md, lg, xl, 2xl, 3xl, 4xl</td>
                <td><span class="figma-code-inline">{fontSize.md}</span> = 16px</td>
              </tr>
              <tr>
                <td>fontWeight</td>
                <td>regular, medium, semibold, bold</td>
                <td><span class="figma-code-inline">{fontWeight.semibold}</span> = 600</td>
              </tr>
              <tr>
                <td>borderRadius</td>
                <td>sm, md, lg, full</td>
                <td><span class="figma-code-inline">{borderRadius.md}</span> = 8px</td>
              </tr>
              <tr>
                <td>lineHeight</td>
                <td>tight, normal, relaxed</td>
                <td><span class="figma-code-inline">{lineHeight.normal}</span> = 1.5</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="figma-subsection">
          <h3 class="figma-subsection-title">
            <span class="figma-badge">light</span>
            <span class="figma-badge">dark</span> Theme-Specific Tokens
          </h3>
          <table class="figma-table">
            <thead>
              <tr>
                <th>Category</th>
                <th>Tokens</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>primary</td>
                <td>default, hover, active, light</td>
                <td>Primary brand colors</td>
              </tr>
              <tr>
                <td>secondary</td>
                <td>default, hover, active, light</td>
                <td>Secondary colors</td>
              </tr>
              <tr>
                <td>success / warning / destructive</td>
                <td>default, hover, active, light</td>
                <td>Semantic state colors</td>
              </tr>
              <tr>
                <td>neutral</td>
                <td>50, 100, 200, ... 900</td>
                <td>Grayscale palette</td>
              </tr>
              <tr>
                <td>semantic</td>
                <td>background, surface, border, text, etc.</td>
                <td>Semantic usage colors</td>
              </tr>
              <tr>
                <td>shadow</td>
                <td>sm, md, lg, xl</td>
                <td>Box shadows</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="figma-section">
        <h2 class="figma-section-title">Applying Tokens in Figma</h2>

        <div class="figma-subsection">
          <h3 class="figma-subsection-title">Colors</h3>
          <p>Select a layer, expand the color category in Tokens Studio, and click a token to apply it. Right-click to choose Fill, Stroke, or both.</p>
          <div class="figma-code"><pre>// Apply semantic colors for automatic theme support
{semantic.background}  → Page backgrounds
{semantic.surface}     → Card backgrounds
{semantic.text}        → Primary text
{semantic.border}      → Borders and dividers</pre></div>
        </div>

        <div class="figma-subsection">
          <h3 class="figma-subsection-title">Typography</h3>
          <p>Select a text layer and apply typography tokens:</p>
          <div class="figma-code"><pre>Font family: {fontFamily.sans}
Font size:   {fontSize.md}
Font weight: {fontWeight.medium}
Line height: {lineHeight.normal}</pre></div>
        </div>

        <div class="figma-subsection">
          <h3 class="figma-subsection-title">Spacing & Layout</h3>
          <p>Apply spacing tokens to auto-layout frames for padding and gaps:</p>
          <div class="figma-code"><pre>Padding: {spacing.4}     → 16px
Gap:     {spacing.2}     → 8px
Radius:  {borderRadius.md} → 8px</pre></div>
        </div>
      </div>

      <div class="figma-section">
        <h2 class="figma-section-title">Theme Switching</h2>
        <p>
          The token file includes pre-configured themes. In Tokens Studio's Themes tab,
          you'll find Light and Dark themes ready to use.
        </p>

        <div class="figma-tip">
          <p class="figma-tip-title">Pro Tip</p>
          <p>
            Use semantic color tokens (like <span class="figma-code-inline">{semantic.text}</span>)
            instead of palette colors (like <span class="figma-code-inline">{neutral.900}</span>)
            for automatic theme support when switching between Light and Dark.
          </p>
        </div>

        <table class="figma-table">
          <thead>
            <tr>
              <th>Theme</th>
              <th>Enabled Token Sets</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Light</td>
              <td><span class="figma-code-inline">global</span> + <span class="figma-code-inline">light</span></td>
            </tr>
            <tr>
              <td>Dark</td>
              <td><span class="figma-code-inline">global</span> + <span class="figma-code-inline">dark</span></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="figma-section">
        <h2 class="figma-section-title">GitHub Sync (Optional)</h2>
        <p>
          For team collaboration, you can sync tokens with GitHub so changes flow between
          Figma and your codebase.
        </p>

        <div class="figma-subsection">
          <h3 class="figma-subsection-title">Setup</h3>
          <ol style="color: var(--atman-color-text-secondary, #616161); line-height: 2;">
            <li>In Tokens Studio settings, select <strong>GitHub</strong> as storage</li>
            <li>Enter repository: <span class="figma-code-inline">username/atman</span></li>
            <li>Set file path: <span class="figma-code-inline">src/tokens/tokens-studio.json</span></li>
            <li>Generate a Personal Access Token on GitHub with repo permissions</li>
            <li>Paste the token in Tokens Studio</li>
          </ol>
        </div>

        <div class="figma-warning">
          <p class="figma-warning-title">Important</p>
          <p>
            Always coordinate with your team when using GitHub sync. Push/pull operations
            will overwrite changes, so establish a clear workflow.
          </p>
        </div>
      </div>

      <div class="figma-section">
        <h2 class="figma-section-title">Keeping Tokens in Sync</h2>
        <p>When tokens are updated in the codebase:</p>

        <ol style="color: var(--atman-color-text-secondary, #616161); line-height: 2;">
          <li>Edit <span class="figma-code-inline">src/tokens/tokens.json</span> (the source of truth)</li>
          <li>Run <span class="figma-code-inline">npm run export-tokens-studio</span> to regenerate</li>
          <li>In Figma, pull changes or re-import the JSON file</li>
        </ol>

        <div class="figma-code"><pre># After updating tokens.json
npm run export-tokens-studio

# Tokens Studio JSON is updated at:
# src/tokens/tokens-studio.json</pre></div>
      </div>

      <div class="figma-section">
        <h2 class="figma-section-title">File Locations</h2>
        <table class="figma-table">
          <thead>
            <tr>
              <th>File</th>
              <th>Purpose</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><span class="figma-code-inline">src/tokens/tokens.json</span></td>
              <td>Source of truth for all design tokens</td>
            </tr>
            <tr>
              <td><span class="figma-code-inline">src/tokens/tokens-studio.json</span></td>
              <td>Tokens Studio compatible format (auto-generated)</td>
            </tr>
            <tr>
              <td><span class="figma-code-inline">src/tokens/index.css</span></td>
              <td>CSS custom properties for web usage</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="figma-section">
        <h2 class="figma-section-title">Resources</h2>
        <ul style="color: var(--atman-color-text-secondary, #616161); line-height: 2;">
          <li>
            <a class="figma-link" href="https://docs.tokens.studio/" target="_blank" rel="noopener">
              Tokens Studio Documentation
            </a>
          </li>
          <li>
            <a class="figma-link" href="https://www.figma.com/community/plugin/843461159747178978" target="_blank" rel="noopener">
              Tokens Studio Plugin (Figma Community)
            </a>
          </li>
          <li>
            <a class="figma-link" href="https://github.com/tokens-studio/figma-plugin" target="_blank" rel="noopener">
              Tokens Studio GitHub
            </a>
          </li>
        </ul>
      </div>
    </div>
  `,
};
