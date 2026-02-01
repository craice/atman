import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

const meta: Meta = {
  title: 'Getting Started',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj;

export const GettingStarted: Story = {
  render: () => html`
    <style>
      .gs-container {
        font-family: var(--atman-font-family, 'Geist', sans-serif);
        max-width: 800px;
        margin: 0 auto;
        padding: 32px;
      }

      .gs-title {
        font-size: 36px;
        font-weight: 700;
        color: var(--atman-color-text, #212121);
        margin: 0 0 16px;
      }

      .gs-subtitle {
        font-size: 18px;
        color: var(--atman-color-text-secondary, #616161);
        margin: 0 0 48px;
        line-height: 1.6;
      }

      .gs-section {
        margin-bottom: 48px;
      }

      .gs-section-title {
        font-size: 24px;
        font-weight: 600;
        color: var(--atman-color-text, #212121);
        margin: 0 0 16px;
      }

      .gs-section p {
        color: var(--atman-color-text-secondary, #616161);
        line-height: 1.7;
        margin: 0 0 16px;
      }

      .gs-code {
        background: var(--atman-color-background-subtle, #F5F5F5);
        padding: 20px 24px;
        border-radius: 8px;
        font-family: 'Geist Mono', monospace;
        font-size: 14px;
        overflow-x: auto;
        margin: 16px 0;
      }

      .gs-code pre {
        margin: 0;
        white-space: pre-wrap;
      }

      .gs-code-inline {
        background: var(--atman-color-background-subtle, #F5F5F5);
        padding: 2px 8px;
        border-radius: 4px;
        font-family: 'Geist Mono', monospace;
        font-size: 13px;
      }

      .gs-steps {
        counter-reset: step;
        list-style: none;
        padding: 0;
      }

      .gs-step {
        position: relative;
        padding-left: 48px;
        margin-bottom: 32px;
      }

      .gs-step-number {
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

      .gs-step-title {
        font-size: 18px;
        font-weight: 600;
        color: var(--atman-color-text, #212121);
        margin: 0 0 8px;
      }

      .gs-step p {
        color: var(--atman-color-text-secondary, #616161);
        margin: 0;
        line-height: 1.6;
      }

      .gs-tip {
        background: #F5F5F5;
        border-left: 4px solid #000000;
        padding: 16px 20px;
        border-radius: 0 8px 8px 0;
        margin: 24px 0;
      }

      .gs-tip-title {
        font-weight: 600;
        color: #000000;
        margin: 0 0 4px;
        font-size: 14px;
      }

      .gs-tip p {
        margin: 0;
        font-size: 14px;
        color: var(--atman-color-text, #212121);
      }

      .gs-table {
        width: 100%;
        border-collapse: collapse;
        margin: 16px 0;
      }

      .gs-table th,
      .gs-table td {
        text-align: left;
        padding: 12px 16px;
        border-bottom: 1px solid var(--atman-color-border, #E0E0E0);
      }

      .gs-table th {
        font-weight: 600;
        color: var(--atman-color-text, #212121);
        background: var(--atman-color-background-subtle, #F5F5F5);
      }

      .gs-table td {
        color: var(--atman-color-text-secondary, #616161);
      }

      .gs-framework-title {
        font-size: 18px;
        font-weight: 600;
        margin: 24px 0 12px;
        color: var(--atman-color-text, #212121);
      }
    </style>

    <div class="gs-container">
      <h1 class="gs-title">Getting Started</h1>
      <p class="gs-subtitle">
        Get up and running with Atman Design System in your project.
      </p>

      <div class="gs-section">
        <h2 class="gs-section-title">Installation</h2>
        <p>Install Atman via npm:</p>
        <div class="gs-code"><pre>npm install atman-ds</pre></div>
        <p>Or with yarn:</p>
        <div class="gs-code"><pre>yarn add atman-ds</pre></div>
      </div>

      <div class="gs-section">
        <h2 class="gs-section-title">Quick Start</h2>

        <ol class="gs-steps">
          <li class="gs-step">
            <span class="gs-step-number">1</span>
            <h3 class="gs-step-title">Import the styles</h3>
            <p>Add the CSS tokens to your main stylesheet or entry point:</p>
            <div class="gs-code"><pre>import 'atman-ds/tokens';</pre></div>
          </li>

          <li class="gs-step">
            <span class="gs-step-number">2</span>
            <h3 class="gs-step-title">Import components</h3>
            <p>Import all components or just what you need:</p>
            <div class="gs-code"><pre>// Import all components
import 'atman-ds';

// Or import specific components
import 'atman-ds/components/button';
import 'atman-ds/components/input';</pre></div>
          </li>

          <li class="gs-step">
            <span class="gs-step-number">3</span>
            <h3 class="gs-step-title">Use in your HTML</h3>
            <p>Components are now available as custom elements:</p>
            <div class="gs-code"><pre>&lt;atman-button variant="primary"&gt;
  Click me
&lt;/atman-button&gt;

&lt;atman-input
  label="Email"
  type="email"
  placeholder="you@example.com"
&gt;&lt;/atman-input&gt;</pre></div>
          </li>
        </ol>
      </div>

      <div class="gs-section">
        <h2 class="gs-section-title">Framework Integration</h2>
        <p>Atman uses Web Components, making it compatible with any framework.</p>

        <h3 class="gs-framework-title">React</h3>
        <div class="gs-code"><pre>import 'atman-ds';

function App() {
  return (
    &lt;atman-button
      variant="primary"
      onClick={() => console.log('clicked')}
    &gt;
      Click me
    &lt;/atman-button&gt;
  );
}</pre></div>

        <div class="gs-tip">
          <p class="gs-tip-title">React Tip</p>
          <p>For TypeScript support, add the component types to your project.</p>
        </div>

        <h3 class="gs-framework-title">Vue</h3>
        <div class="gs-code"><pre>&lt;script setup&gt;
import 'atman-ds';
&lt;/script&gt;

&lt;template&gt;
  &lt;atman-button variant="primary" @click="handleClick"&gt;
    Click me
  &lt;/atman-button&gt;
&lt;/template&gt;</pre></div>

        <h3 class="gs-framework-title">Vanilla JS</h3>
        <div class="gs-code"><pre>&lt;script type="module"&gt;
  import 'atman-ds';
&lt;/script&gt;

&lt;atman-button variant="primary"&gt;Click me&lt;/atman-button&gt;</pre></div>
      </div>

      <div class="gs-section">
        <h2 class="gs-section-title">Theming</h2>
        <p>
          Atman supports light and dark themes out of the box. Toggle between themes
          by setting the <span class="gs-code-inline">data-theme</span> attribute on the root element:
        </p>
        <div class="gs-code"><pre>&lt;!-- Light theme (default) --&gt;
&lt;html data-theme="light"&gt;

&lt;!-- Dark theme --&gt;
&lt;html data-theme="dark"&gt;</pre></div>

        <p>Or toggle dynamically with JavaScript:</p>
        <div class="gs-code"><pre>function toggleTheme() {
  const html = document.documentElement;
  const current = html.getAttribute('data-theme');
  html.setAttribute('data-theme', current === 'dark' ? 'light' : 'dark');
}</pre></div>
      </div>

      <div class="gs-section">
        <h2 class="gs-section-title">Available Components</h2>
        <table class="gs-table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Components</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Primitives</td>
              <td>Button, Badge, Avatar, Icon</td>
            </tr>
            <tr>
              <td>Form Controls</td>
              <td>Input, Select, Checkbox, Radio</td>
            </tr>
            <tr>
              <td>Feedback</td>
              <td>Alert, Toast, Skeleton, Tooltip</td>
            </tr>
            <tr>
              <td>Layout</td>
              <td>Card, Modal, Tabs, Divider</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="gs-section">
        <h2 class="gs-section-title">Browser Support</h2>
        <p>Atman supports all modern browsers that implement the Web Components standard:</p>
        <ul style="color: #616161; line-height: 1.8">
          <li>Chrome / Edge (Chromium) 88+</li>
          <li>Firefox 78+</li>
          <li>Safari 14+</li>
        </ul>
      </div>
    </div>
  `,
};
