import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

const meta: Meta = {
  title: 'Changelog',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj;

export const Changelog: Story = {
  render: () => html`
    <style>
      .changelog-container {
        font-family: var(--atman-font-family, 'Geist', sans-serif);
        max-width: 800px;
        margin: 0 auto;
        padding: 32px;
      }

      .changelog-title {
        font-size: 36px;
        font-weight: 700;
        color: var(--atman-color-text, #212121);
        margin: 0 0 16px;
      }

      .changelog-subtitle {
        font-size: 18px;
        color: var(--atman-color-text-secondary, #616161);
        margin: 0 0 48px;
        line-height: 1.6;
      }

      .changelog-version {
        margin-bottom: 48px;
        padding-bottom: 48px;
        border-bottom: 1px solid var(--atman-color-border, #E0E0E0);
      }

      .changelog-version:last-child {
        border-bottom: none;
      }

      .changelog-version-header {
        display: flex;
        align-items: center;
        gap: 16px;
        margin-bottom: 24px;
        flex-wrap: wrap;
      }

      .changelog-version-number {
        font-size: 28px;
        font-weight: 700;
        color: var(--atman-color-text, #212121);
        margin: 0;
      }

      .changelog-version-date {
        font-size: 14px;
        color: var(--atman-color-text-tertiary, #9E9E9E);
        background: var(--atman-color-background-subtle, #F5F5F5);
        padding: 4px 12px;
        border-radius: 9999px;
      }

      .changelog-badge {
        display: inline-flex;
        align-items: center;
        padding: 4px 10px;
        border-radius: 4px;
        font-size: 12px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      .changelog-badge-new {
        background: #F5F5F5;
        color: #111111;
      }

      .changelog-badge-improved {
        background: #E6F4EA;
        color: #1E8E3E;
      }

      .changelog-badge-fixed {
        background: #FCE8E6;
        color: #D93025;
      }

      .changelog-section {
        margin-bottom: 24px;
      }

      .changelog-section-title {
        font-size: 16px;
        font-weight: 600;
        color: var(--atman-color-text, #212121);
        margin: 0 0 12px;
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .changelog-list {
        list-style: none;
        padding: 0;
        margin: 0;
      }

      .changelog-list li {
        position: relative;
        padding: 8px 0 8px 24px;
        color: var(--atman-color-text-secondary, #616161);
        line-height: 1.6;
      }

      .changelog-list li::before {
        content: '•';
        position: absolute;
        left: 8px;
        color: var(--atman-color-text-tertiary, #9E9E9E);
      }

      .changelog-component {
        font-weight: 500;
        color: var(--atman-color-text, #212121);
      }

      .changelog-latest {
        background: linear-gradient(135deg, #F5F5F5 0%, #FAFAFA 100%);
        border: 1px solid #E0E0E0;
        border-radius: 12px;
        padding: 24px;
        margin-bottom: 48px;
      }

      .changelog-latest-label {
        font-size: 12px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 1px;
        color: #111111;
        margin-bottom: 8px;
      }
    </style>

    <div class="changelog-container">
      <h1 class="changelog-title">Changelog</h1>
      <p class="changelog-subtitle">
        All notable changes to Atman Design System are documented here.
      </p>

      <div class="changelog-latest">
        <p class="changelog-latest-label">Latest Release</p>
        <div class="changelog-version-header">
          <h2 class="changelog-version-number">v1.0.0</h2>
          <span class="changelog-version-date">February 2026</span>
        </div>
        <p style="color: #616161; margin: 0">
          24 production-ready components. 8 new components, Storybook rendering fixes (canvas background, Progress, Skeleton, Table, Docs theme), and Do &amp; Don't guidelines.
        </p>
      </div>

      <div class="changelog-version">
        <div class="changelog-version-header">
          <h2 class="changelog-version-number">v1.0.0</h2>
          <span class="changelog-version-date">February 24, 2026</span>
        </div>

        <div class="changelog-section">
          <h3 class="changelog-section-title">
            <span class="changelog-badge changelog-badge-new">New</span>
            8 New Components
          </h3>
          <ul class="changelog-list">
            <li><span class="changelog-component">Switch</span> - Toggle switch for boolean settings with on/off states</li>
            <li><span class="changelog-component">Textarea</span> - Multi-line text input with auto-resize support</li>
            <li><span class="changelog-component">Progress</span> - Linear and circular progress indicators with indeterminate state</li>
            <li><span class="changelog-component">Breadcrumb</span> - Navigation breadcrumbs with custom separator</li>
            <li><span class="changelog-component">Accordion</span> - Expandable content sections with single/multi-expand modes</li>
            <li><span class="changelog-component">Pagination</span> - Page navigation with sibling/boundary page controls</li>
            <li><span class="changelog-component">Dropdown</span> - Action menus with icons, dividers, and disabled items</li>
            <li><span class="changelog-component">Table</span> - Data tables with sorting, selection, and striped rows</li>
          </ul>
        </div>

        <div class="changelog-section">
          <h3 class="changelog-section-title">
            <span class="changelog-badge changelog-badge-fixed">Fixed</span>
            Bug Fixes
          </h3>
          <ul class="changelog-list">
            <li><span class="changelog-component">Storybook</span> - Canvas now uses background-subtle (#FAFAFA) in light mode so white surface components (Card, Table) are visible</li>
            <li><span class="changelog-component">Storybook</span> - Docs preview containers now match the active light/dark theme background</li>
            <li><span class="changelog-component">Progress</span> - Circular indeterminate animation now scales correctly for all sizes (sm, md, lg)</li>
            <li><span class="changelog-component">Progress</span> - Linear stories now have explicit width so the bar renders in Storybook's centered layout</li>
            <li><span class="changelog-component">Skeleton</span> - Stories now have explicit width containers so skeletons render in Storybook's centered layout</li>
            <li><span class="changelog-component">Table</span> - Story layout changed to padded so table width resolves correctly</li>
            <li><span class="changelog-component">Tooltip</span> - NoArrow story now correctly hides the arrow when <code>arrow=false</code></li>
            <li><span class="changelog-component">Divider</span> - Fixed <code>|| true</code> logic error that prevented label-conditional rendering; Spacing story now shows distinct spacings using flex container</li>
            <li><span class="changelog-component">Avatar</span> - AvatarGroup separator ring is now circular (box-shadow instead of border)</li>
            <li><span class="changelog-component">Dropdown</span> - Added padding to prevent menu items from being clipped by canvas boundaries</li>
            <li><span class="changelog-component">Examples</span> - Fixed tabs panels in Settings Page, User Profile, and Notification Center (removed incorrect <code>slot="panel"</code> attribute)</li>
            <li><span class="changelog-component">Examples</span> - Removed overflowing <code>::before</code> element from featured Pricing Card</li>
            <li><span class="changelog-component">Examples</span> - Notification count badge now renders as a circle for single-digit numbers</li>
          </ul>
        </div>

        <div class="changelog-section">
          <h3 class="changelog-section-title">
            <span class="changelog-badge changelog-badge-improved">Improved</span>
            Documentation
          </h3>
          <ul class="changelog-list">
            <li>Added Do &amp; Don't guidelines to Button, Badge, Alert, Input, and Modal component docs</li>
            <li>Removed standalone Guidelines page — best practices now live inside each component's story</li>
            <li>Updated Introduction page to reflect 24 components across 6 categories</li>
            <li>Updated landing page, README, and case study with Phase 10 additions</li>
          </ul>
        </div>
      </div>

      <div class="changelog-version">
        <div class="changelog-version-header">
          <h2 class="changelog-version-number">v0.1.0</h2>
          <span class="changelog-version-date">January 30, 2026</span>
        </div>

        <div class="changelog-section">
          <h3 class="changelog-section-title">
            <span class="changelog-badge changelog-badge-new">New</span>
            Initial Release
          </h3>
          <ul class="changelog-list">
            <li><span class="changelog-component">Button</span> - Primary, secondary, ghost, and destructive variants with loading states</li>
            <li><span class="changelog-component">Badge</span> - Status indicators with multiple variants and sizes</li>
            <li><span class="changelog-component">Avatar</span> - User avatars with image, initials, and fallback support</li>
            <li><span class="changelog-component">Icon</span> - Lucide icon integration with customizable size and color</li>
            <li><span class="changelog-component">Input</span> - Text inputs with labels, validation, and helper text</li>
            <li><span class="changelog-component">Select</span> - Dropdown select with keyboard navigation</li>
            <li><span class="changelog-component">Checkbox</span> - Accessible checkboxes with indeterminate state</li>
            <li><span class="changelog-component">Radio</span> - Radio button groups with keyboard support</li>
            <li><span class="changelog-component">Alert</span> - Contextual alerts for info, success, warning, and error</li>
            <li><span class="changelog-component">Toast</span> - Notification toasts with auto-dismiss</li>
            <li><span class="changelog-component">Skeleton</span> - Loading placeholders for content</li>
            <li><span class="changelog-component">Tooltip</span> - Informational tooltips with positioning</li>
            <li><span class="changelog-component">Card</span> - Content containers with header and footer slots</li>
            <li><span class="changelog-component">Modal</span> - Accessible dialogs with focus trapping</li>
            <li><span class="changelog-component">Tabs</span> - Tabbed interface with keyboard navigation</li>
            <li><span class="changelog-component">Divider</span> - Visual separators for content</li>
          </ul>
        </div>

        <div class="changelog-section">
          <h3 class="changelog-section-title">
            <span class="changelog-badge changelog-badge-improved">Improved</span>
            Design Tokens
          </h3>
          <ul class="changelog-list">
            <li>Complete design token system with CSS custom properties</li>
            <li>Light and dark theme support out of the box</li>
            <li>8px grid-based spacing scale</li>
            <li>WCAG AA compliant color palette</li>
            <li>Typography scale with Geist font family</li>
          </ul>
        </div>

        <div class="changelog-section">
          <h3 class="changelog-section-title">
            <span class="changelog-badge changelog-badge-improved">Improved</span>
            Documentation
          </h3>
          <ul class="changelog-list">
            <li>Interactive Storybook documentation</li>
            <li>Component API documentation with autodocs</li>
            <li>Accessibility guidelines and testing tools</li>
            <li>Getting started guide for all frameworks</li>
          </ul>
        </div>
      </div>

      <div class="changelog-version">
        <div class="changelog-version-header">
          <h2 class="changelog-version-number">Roadmap</h2>
        </div>

        <div class="changelog-section">
          <h3 class="changelog-section-title">Upcoming Features</h3>
          <ul class="changelog-list">
            <li><span class="changelog-component">DatePicker</span> - Date selection with calendar</li>
            <li><span class="changelog-component">Combobox</span> - Searchable select with multi-select support</li>
            <li><span class="changelog-component">FileUpload</span> - Drag-and-drop file upload with preview</li>
            <li>React wrapper components for better DX</li>
            <li>Vue wrapper components</li>
            <li>Additional theme presets</li>
          </ul>
        </div>
      </div>
    </div>
  `,
};
