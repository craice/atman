import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

const meta: Meta = {
  title: 'Accessibility',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj;

export const Accessibility: Story = {
  render: () => html`
    <style>
      .a11y-container {
        font-family: var(--atman-font-family, 'Geist', sans-serif);
        max-width: 800px;
        margin: 0 auto;
        padding: 32px;
      }

      .a11y-title {
        font-size: 36px;
        font-weight: 700;
        color: var(--atman-color-text, #212121);
        margin: 0 0 16px;
      }

      .a11y-subtitle {
        font-size: 18px;
        color: var(--atman-color-text-secondary, #616161);
        margin: 0 0 24px;
        line-height: 1.6;
      }

      .a11y-badge {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 6px 12px;
        background: #000000;
        color: #FFFFFF;
        border-radius: 9999px;
        font-size: 13px;
        font-weight: 500;
        margin-bottom: 32px;
      }

      .a11y-section {
        margin-bottom: 48px;
      }

      .a11y-section-title {
        font-size: 24px;
        font-weight: 600;
        color: var(--atman-color-text, #212121);
        margin: 0 0 16px;
      }

      .a11y-section p {
        color: var(--atman-color-text-secondary, #616161);
        line-height: 1.7;
        margin: 0 0 16px;
      }

      .a11y-card {
        background: var(--atman-color-background, #FFFFFF);
        border: 1px solid var(--atman-color-border, #E0E0E0);
        border-radius: 12px;
        padding: 24px;
        margin-bottom: 16px;
      }

      .a11y-card-title {
        font-size: 18px;
        font-weight: 600;
        color: var(--atman-color-text, #212121);
        margin: 0 0 8px;
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .a11y-card p {
        color: var(--atman-color-text-secondary, #616161);
        margin: 0;
        line-height: 1.6;
      }

      .a11y-table {
        width: 100%;
        border-collapse: collapse;
        margin: 16px 0;
      }

      .a11y-table th,
      .a11y-table td {
        text-align: left;
        padding: 12px 16px;
        border-bottom: 1px solid var(--atman-color-border, #E0E0E0);
      }

      .a11y-table th {
        font-weight: 600;
        color: var(--atman-color-text, #212121);
        background: var(--atman-color-background-subtle, #F5F5F5);
      }

      .a11y-table td {
        color: var(--atman-color-text-secondary, #616161);
      }

      .a11y-kbd {
        display: inline-block;
        padding: 4px 8px;
        background: var(--atman-color-background-subtle, #F5F5F5);
        border: 1px solid var(--atman-color-border, #E0E0E0);
        border-radius: 4px;
        font-family: 'Geist Mono', monospace;
        font-size: 12px;
        color: var(--atman-color-text, #212121);
      }

      .a11y-code {
        background: var(--atman-color-background-subtle, #F5F5F5);
        padding: 20px 24px;
        border-radius: 8px;
        font-family: 'Geist Mono', monospace;
        font-size: 14px;
        overflow-x: auto;
        margin: 16px 0;
      }

      .a11y-code pre {
        margin: 0;
        white-space: pre-wrap;
      }

      .a11y-checklist {
        list-style: none;
        padding: 0;
        margin: 16px 0;
      }

      .a11y-checklist li {
        display: flex;
        align-items: flex-start;
        gap: 12px;
        padding: 12px 0;
        border-bottom: 1px solid var(--atman-color-border-subtle, #EEEEEE);
        color: var(--atman-color-text-secondary, #616161);
      }

      .a11y-checklist li::before {
        content: '✓';
        color: #1E8E3E;
        font-weight: bold;
      }

      .a11y-warning {
        background: #FEF7E0;
        border-left: 4px solid #F9AB00;
        padding: 16px 20px;
        border-radius: 0 8px 8px 0;
        margin: 24px 0;
      }

      .a11y-warning-title {
        font-weight: 600;
        color: #E09900;
        margin: 0 0 4px;
        font-size: 14px;
      }

      .a11y-warning p {
        margin: 0;
        font-size: 14px;
        color: var(--atman-color-text, #212121);
      }

      .a11y-component-title {
        font-size: 18px;
        font-weight: 600;
        margin: 24px 0 12px;
        color: var(--atman-color-text, #212121);
      }
    </style>

    <div class="a11y-container">
      <h1 class="a11y-title">Accessibility</h1>
      <p class="a11y-subtitle">
        Atman is built with accessibility as a core principle. Every component
        follows WCAG 2.1 AA guidelines.
      </p>

      <span class="a11y-badge">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
          <polyline points="22 4 12 14.01 9 11.01"/>
        </svg>
        WCAG 2.1 AA Compliant
      </span>

      <div class="a11y-section">
        <h2 class="a11y-section-title">Core Principles</h2>

        <div class="a11y-card">
          <h3 class="a11y-card-title">⌨️ Keyboard Navigation</h3>
          <p>All interactive components are fully keyboard accessible. Users can navigate using Tab, activate with Enter/Space, and escape with Esc.</p>
        </div>

        <div class="a11y-card">
          <h3 class="a11y-card-title">🔊 Screen Reader Support</h3>
          <p>Components use semantic HTML and ARIA attributes to ensure screen readers can properly announce content and state changes.</p>
        </div>

        <div class="a11y-card">
          <h3 class="a11y-card-title">🎨 Color Contrast</h3>
          <p>All color combinations meet WCAG AA contrast requirements (4.5:1 for text, 3:1 for UI components).</p>
        </div>

        <div class="a11y-card">
          <h3 class="a11y-card-title">🎬 Reduced Motion</h3>
          <p>Animations respect the prefers-reduced-motion media query, reducing or eliminating motion for users who prefer it.</p>
        </div>
      </div>

      <div class="a11y-section">
        <h2 class="a11y-section-title">Keyboard Shortcuts</h2>
        <p>Standard keyboard interactions are implemented across all components:</p>

        <table class="a11y-table">
          <thead>
            <tr>
              <th>Key</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><span class="a11y-kbd">Tab</span></td>
              <td>Move focus to next focusable element</td>
            </tr>
            <tr>
              <td><span class="a11y-kbd">Shift</span> + <span class="a11y-kbd">Tab</span></td>
              <td>Move focus to previous focusable element</td>
            </tr>
            <tr>
              <td><span class="a11y-kbd">Enter</span> / <span class="a11y-kbd">Space</span></td>
              <td>Activate buttons, checkboxes, and other controls</td>
            </tr>
            <tr>
              <td><span class="a11y-kbd">Esc</span></td>
              <td>Close modals, tooltips, and dropdowns</td>
            </tr>
            <tr>
              <td><span class="a11y-kbd">↑</span> <span class="a11y-kbd">↓</span></td>
              <td>Navigate within select dropdowns and radio groups</td>
            </tr>
            <tr>
              <td><span class="a11y-kbd">←</span> <span class="a11y-kbd">→</span></td>
              <td>Navigate between tabs</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="a11y-section">
        <h2 class="a11y-section-title">Component-Specific Guidelines</h2>

        <h3 class="a11y-component-title">Button</h3>
        <ul class="a11y-checklist">
          <li>Use descriptive labels that explain the action</li>
          <li>Icon-only buttons require <code>label</code> prop for screen readers</li>
          <li>Console warning shown if <code>icon-only</code> is used without <code>label</code></li>
          <li>Disabled buttons use <code>aria-disabled</code> for assistive tech</li>
          <li>Loading state sets <code>aria-busy="true"</code></li>
          <li>Live region announces "Loading" state changes to screen readers</li>
        </ul>

        <h3 class="a11y-component-title">Input</h3>
        <ul class="a11y-checklist">
          <li>Labels are automatically linked via <code>for</code> attribute</li>
          <li>Error messages use <code>role="alert"</code> and <code>aria-describedby</code></li>
          <li>Required fields show visual indicator and set <code>required</code> and <code>aria-required</code></li>
          <li>Invalid state sets <code>aria-invalid="true"</code></li>
          <li>Unique IDs generated for each instance</li>
        </ul>

        <h3 class="a11y-component-title">Select</h3>
        <ul class="a11y-checklist">
          <li>Trigger uses <code>aria-haspopup="listbox"</code> and <code>aria-expanded</code></li>
          <li>Dropdown has <code>role="listbox"</code> with proper <code>aria-labelledby</code></li>
          <li>Options use <code>role="option"</code> with <code>aria-selected</code></li>
          <li><code>aria-activedescendant</code> indicates the currently focused option</li>
          <li>Full keyboard navigation: Arrow keys, Enter, Escape, Home, End</li>
        </ul>

        <h3 class="a11y-component-title">Checkbox & Radio</h3>
        <ul class="a11y-checklist">
          <li>Native <code>&lt;input&gt;</code> elements ensure full compatibility</li>
          <li>Visual indicators are hidden from assistive tech with <code>aria-hidden</code></li>
          <li>Indeterminate state properly communicated to screen readers</li>
          <li>Error state uses <code>aria-invalid</code></li>
        </ul>

        <h3 class="a11y-component-title">Alert</h3>
        <ul class="a11y-checklist">
          <li>Uses <code>role="alert"</code> for automatic announcement</li>
          <li>Error variants use <code>aria-live="assertive"</code></li>
          <li>Other variants use <code>aria-live="polite"</code></li>
          <li>Dismiss button has <code>aria-label="Dismiss alert"</code></li>
        </ul>

        <h3 class="a11y-component-title">Toast</h3>
        <ul class="a11y-checklist">
          <li>Uses <code>role="alert"</code> for screen reader announcement</li>
          <li>Error toasts use <code>aria-live="assertive"</code> for immediate announcement</li>
          <li>Other toasts use <code>aria-live="polite"</code></li>
          <li>Auto-dismiss pauses on hover/focus</li>
          <li>Close button always visible and keyboard accessible</li>
          <li>Action buttons are properly labeled</li>
        </ul>

        <h3 class="a11y-component-title">Modal</h3>
        <ul class="a11y-checklist">
          <li>Focus is trapped within the modal when open</li>
          <li>Focus returns to trigger element on close</li>
          <li>Uses <code>role="dialog"</code> and <code>aria-modal="true"</code></li>
          <li>Escape key closes the modal (configurable)</li>
          <li>Title linked via <code>aria-labelledby</code> with unique ID per instance</li>
          <li>Body scroll is prevented when modal is open</li>
        </ul>

        <h3 class="a11y-component-title">Tabs</h3>
        <ul class="a11y-checklist">
          <li>Tab list uses <code>role="tablist"</code></li>
          <li>Individual tabs use <code>role="tab"</code> with <code>aria-selected</code></li>
          <li>Tabs have <code>aria-controls</code> pointing to their panel</li>
          <li>Panels use <code>role="tabpanel"</code> with <code>aria-labelledby</code></li>
          <li>Unique IDs auto-generated for proper ARIA relationships</li>
          <li>Arrow keys navigate between tabs, Tab moves to panel</li>
          <li>Home/End keys jump to first/last tab</li>
        </ul>

        <h3 class="a11y-component-title">Tooltip</h3>
        <ul class="a11y-checklist">
          <li>Uses <code>role="tooltip"</code></li>
          <li>Trigger linked via <code>aria-describedby</code> when visible</li>
          <li>Appears on both hover and focus for keyboard users</li>
          <li>Multiline tooltips (>50 chars) are hoverable for reading</li>
          <li>Configurable show/hide delays</li>
        </ul>

        <h3 class="a11y-component-title">Divider</h3>
        <ul class="a11y-checklist">
          <li>Uses <code>role="separator"</code></li>
          <li>Orientation communicated via <code>aria-orientation</code></li>
          <li>Decorative dividers don't interrupt screen reader flow</li>
        </ul>

        <h3 class="a11y-component-title">Badge</h3>
        <ul class="a11y-checklist">
          <li>All badges have <code>role="status"</code> for screen reader announcement</li>
          <li>Dot variant requires <code>label</code> prop for accessible description</li>
          <li>Defaults to variant name (e.g., "success status") if no label provided</li>
        </ul>

        <h3 class="a11y-component-title">Card</h3>
        <ul class="a11y-checklist">
          <li>Clickable cards use <code>role="button"</code> and <code>tabindex="0"</code></li>
          <li>Clickable cards require <code>label</code> prop for <code>aria-label</code></li>
          <li>Keyboard support: Enter and Space to activate</li>
          <li>Focus-visible styling for keyboard navigation</li>
        </ul>

        <h3 class="a11y-component-title">Avatar & Icon</h3>
        <ul class="a11y-checklist">
          <li>Avatar uses <code>role="img"</code> with <code>aria-label</code></li>
          <li>Decorative icons use <code>aria-hidden="true"</code></li>
          <li>Meaningful icons require <code>label</code> prop for <code>aria-label</code></li>
        </ul>

        <h3 class="a11y-component-title">Skeleton</h3>
        <ul class="a11y-checklist">
          <li>Uses <code>aria-hidden="true"</code> to hide from screen readers</li>
          <li>Loading states should be announced separately if needed</li>
        </ul>
      </div>

      <div class="a11y-section">
        <h2 class="a11y-section-title">Using ARIA Attributes</h2>
        <p>Components handle ARIA internally, but you may need to add context in some cases:</p>

        <div class="a11y-code">
          <pre>&lt;!-- Provide accessible name for icon buttons --&gt;
&lt;atman-button icon-only label="Close dialog"&gt;
  &lt;svg&gt;...&lt;/svg&gt;
&lt;/atman-button&gt;

&lt;!-- Link error messages to inputs --&gt;
&lt;atman-input
  label="Email"
  error="Please enter a valid email"
&gt;&lt;/atman-input&gt;

&lt;!-- Describe modal purpose --&gt;
&lt;atman-modal aria-labelledby="modal-title"&gt;
  &lt;h2 id="modal-title" slot="header"&gt;Confirm Action&lt;/h2&gt;
&lt;/atman-modal&gt;</pre>
        </div>
      </div>

      <div class="a11y-section">
        <h2 class="a11y-section-title">Testing Accessibility</h2>
        <p>We recommend testing with multiple tools and methods:</p>

        <div class="a11y-card">
          <h3 class="a11y-card-title">Automated Testing</h3>
          <p>Use the Accessibility tab in Storybook (powered by axe-core) to catch common issues automatically.</p>
        </div>

        <div class="a11y-card">
          <h3 class="a11y-card-title">Keyboard Testing</h3>
          <p>Navigate your interface using only the keyboard. Ensure all interactive elements are reachable and usable.</p>
        </div>

        <div class="a11y-card">
          <h3 class="a11y-card-title">Screen Reader Testing</h3>
          <p>Test with VoiceOver (Mac), NVDA (Windows), or JAWS to verify content is properly announced.</p>
        </div>

        <div class="a11y-warning">
          <p class="a11y-warning-title">Important</p>
          <p>Automated tools catch only 30-40% of accessibility issues. Manual testing is essential for a truly accessible experience.</p>
        </div>
      </div>

      <div class="a11y-section">
        <h2 class="a11y-section-title">Testing Checklist</h2>
        <p>Use this checklist when testing components for accessibility:</p>

        <h3 class="a11y-component-title">Keyboard Navigation</h3>
        <ul class="a11y-checklist">
          <li>Can reach all interactive elements with Tab key</li>
          <li>Focus indicator is clearly visible</li>
          <li>Focus order follows logical reading order</li>
          <li>Enter/Space activates buttons, links, and controls</li>
          <li>Escape closes modals, dropdowns, and tooltips</li>
          <li>Arrow keys work in lists, tabs, and radio groups</li>
          <li>No keyboard traps (except intentional focus traps in modals)</li>
        </ul>

        <h3 class="a11y-component-title">Screen Reader</h3>
        <ul class="a11y-checklist">
          <li>All images have alt text or are marked decorative</li>
          <li>Form fields have associated labels</li>
          <li>Error messages are announced</li>
          <li>State changes are announced (loading, selected, expanded)</li>
          <li>Headings follow proper hierarchy</li>
          <li>Links and buttons have descriptive text</li>
        </ul>

        <h3 class="a11y-component-title">Visual</h3>
        <ul class="a11y-checklist">
          <li>Text contrast meets 4.5:1 minimum ratio</li>
          <li>UI components meet 3:1 minimum ratio</li>
          <li>Focus indicators meet 3:1 contrast ratio</li>
          <li>Information not conveyed by color alone</li>
          <li>Content readable at 200% zoom</li>
          <li>Animations respect reduced motion preference</li>
        </ul>

        <h3 class="a11y-component-title">Component-Specific</h3>
        <table class="a11y-table">
          <thead>
            <tr>
              <th>Component</th>
              <th>Key Tests</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Button</td>
              <td>Enter/Space activates; loading state announced</td>
            </tr>
            <tr>
              <td>Input</td>
              <td>Label clickable; error announced; required indicated</td>
            </tr>
            <tr>
              <td>Select</td>
              <td>Arrow navigation; Escape closes; selection announced</td>
            </tr>
            <tr>
              <td>Checkbox/Radio</td>
              <td>Space toggles; state announced; grouped properly</td>
            </tr>
            <tr>
              <td>Modal</td>
              <td>Focus trapped; Escape closes; focus returns on close</td>
            </tr>
            <tr>
              <td>Tabs</td>
              <td>Arrow navigation; Tab to panel; selection announced</td>
            </tr>
            <tr>
              <td>Toast</td>
              <td>Auto-announced; dismissible; pauses on hover</td>
            </tr>
            <tr>
              <td>Tooltip</td>
              <td>Shows on focus; content readable; not required info</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="a11y-section">
        <h2 class="a11y-section-title">Resources</h2>
        <ul style="color: #616161; line-height: 2">
          <li><a href="https://www.w3.org/WAI/WCAG21/quickref/" target="_blank">WCAG 2.1 Quick Reference</a></li>
          <li><a href="https://www.a11yproject.com/checklist/" target="_blank">A11y Project Checklist</a></li>
          <li><a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA" target="_blank">MDN ARIA Guide</a></li>
          <li><a href="https://www.nvaccess.org/download/" target="_blank">NVDA Screen Reader (Free)</a></li>
        </ul>
      </div>
    </div>
  `,
};
