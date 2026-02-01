import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import './tooltip.js';

const meta: Meta = {
  title: 'Components/Feedback/Tooltip',
  component: 'atman-tooltip',
  tags: ['autodocs', 'stable'],
  parameters: {
    status: { type: 'stable' },
  },
  argTypes: {
    content: {
      control: 'text',
      description: 'The tooltip content',
    },
    placement: {
      control: 'select',
      options: ['top', 'right', 'bottom', 'left'],
      description: 'The placement of the tooltip',
      table: {
        defaultValue: { summary: 'top' },
      },
    },
    showDelay: {
      control: 'number',
      description: 'Delay before showing tooltip (ms)',
      table: {
        defaultValue: { summary: '200' },
      },
    },
    hideDelay: {
      control: 'number',
      description: 'Delay before hiding tooltip (ms)',
      table: {
        defaultValue: { summary: '0' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the tooltip is disabled',
    },
    arrow: {
      control: 'boolean',
      description: 'Whether to show arrow',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
  },
  args: {
    content: 'Tooltip content',
    placement: 'top',
    showDelay: 200,
    hideDelay: 0,
    disabled: false,
    arrow: true,
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    content: 'This is a tooltip',
  },
  render: (args) => html`
    <div style="padding: 60px; display: flex; justify-content: center;">
      <atman-tooltip
        content=${args.content}
        placement=${args.placement}
        show-delay=${args.showDelay}
        hide-delay=${args.hideDelay}
        ?disabled=${args.disabled}
        ?arrow=${args.arrow}
      >
        <atman-button variant="secondary">Hover me</atman-button>
      </atman-tooltip>
    </div>
  `,
};

export const Placements: Story = {
  render: () => html`
    <div style="padding: 80px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 40px; justify-items: center; align-items: center;">
      <div></div>
      <atman-tooltip content="Top placement" placement="top">
        <atman-button variant="secondary">Top</atman-button>
      </atman-tooltip>
      <div></div>

      <atman-tooltip content="Left placement" placement="left">
        <atman-button variant="secondary">Left</atman-button>
      </atman-tooltip>
      <div></div>
      <atman-tooltip content="Right placement" placement="right">
        <atman-button variant="secondary">Right</atman-button>
      </atman-tooltip>

      <div></div>
      <atman-tooltip content="Bottom placement" placement="bottom">
        <atman-button variant="secondary">Bottom</atman-button>
      </atman-tooltip>
      <div></div>
    </div>
  `,
};

export const WithIcons: Story = {
  render: () => html`
    <div style="padding: 40px; display: flex; gap: 16px; justify-content: center;">
      <atman-tooltip content="Settings">
        <atman-button variant="ghost" icon-only label="Settings">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
            <circle cx="12" cy="12" r="3"/>
          </svg>
        </atman-button>
      </atman-tooltip>

      <atman-tooltip content="Notifications">
        <atman-button variant="ghost" icon-only label="Notifications">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/>
            <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>
          </svg>
        </atman-button>
      </atman-tooltip>

      <atman-tooltip content="User profile">
        <atman-button variant="ghost" icon-only label="User">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
        </atman-button>
      </atman-tooltip>
    </div>
  `,
};

export const LongContent: Story = {
  render: () => html`
    <div style="padding: 80px; display: flex; justify-content: center;">
      <atman-tooltip content="This is a longer tooltip that will wrap to multiple lines because it has more content than can fit on a single line.">
        <atman-button variant="secondary">Hover for long tooltip</atman-button>
      </atman-tooltip>
    </div>
  `,
};

export const NoArrow: Story = {
  render: () => html`
    <div style="padding: 60px; display: flex; justify-content: center;">
      <atman-tooltip content="Tooltip without arrow" ?arrow=${false}>
        <atman-button variant="secondary">No arrow</atman-button>
      </atman-tooltip>
    </div>
  `,
};

export const CustomDelay: Story = {
  render: () => html`
    <div style="padding: 60px; display: flex; gap: 16px; justify-content: center;">
      <atman-tooltip content="No delay" show-delay="0">
        <atman-button variant="secondary">Instant</atman-button>
      </atman-tooltip>
      <atman-tooltip content="200ms delay (default)" show-delay="200">
        <atman-button variant="secondary">Default</atman-button>
      </atman-tooltip>
      <atman-tooltip content="500ms delay" show-delay="500">
        <atman-button variant="secondary">Slow</atman-button>
      </atman-tooltip>
    </div>
  `,
};

export const Disabled: Story = {
  render: () => html`
    <div style="padding: 60px; display: flex; gap: 16px; justify-content: center;">
      <atman-tooltip content="This tooltip is enabled">
        <atman-button variant="secondary">Enabled</atman-button>
      </atman-tooltip>
      <atman-tooltip content="This tooltip is disabled" disabled>
        <atman-button variant="secondary">Disabled tooltip</atman-button>
      </atman-tooltip>
    </div>
  `,
};

export const OnText: Story = {
  render: () => html`
    <div style="padding: 60px;">
      <p style="font-family: var(--atman-font-family); color: var(--atman-color-text);">
        This is a paragraph with a
        <atman-tooltip content="Cascading Style Sheets">
          <abbr style="text-decoration: underline dotted; cursor: help;">CSS</abbr>
        </atman-tooltip>
        abbreviation that shows a tooltip on hover.
      </p>
    </div>
  `,
};

export const OnFormElements: Story = {
  render: () => html`
    <div style="padding: 60px; max-width: 400px;">
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <div style="display: flex; align-items: flex-end; gap: 8px;">
          <atman-input label="API Key" type="password" style="flex: 1;"></atman-input>
          <atman-tooltip content="Your API key can be found in the settings page">
            <atman-button variant="ghost" icon-only label="Help">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                <path d="M12 17h.01"/>
              </svg>
            </atman-button>
          </atman-tooltip>
        </div>
      </div>
    </div>
  `,
};

export const FocusAccessibility: Story = {
  render: () => html`
    <div style="padding: 60px; display: flex; flex-direction: column; gap: 16px; align-items: center;">
      <p style="font-family: var(--atman-font-family); color: var(--atman-color-text-secondary); font-size: var(--atman-font-size-sm);">
        Tab to the button to see the tooltip (keyboard accessible)
      </p>
      <atman-tooltip content="This tooltip appears on focus too!">
        <atman-button variant="primary">Focus me</atman-button>
      </atman-tooltip>
    </div>
  `,
};
