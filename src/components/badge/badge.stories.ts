import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import './badge.js';

const meta: Meta = {
  title: 'Components/Primitives/Badge',
  component: 'atman-badge',
  tags: ['autodocs', 'stable'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'destructive'],
      description: 'The visual style of the badge',
      table: {
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md'],
      description: 'The size of the badge',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    dot: {
      control: 'boolean',
      description: 'Whether to display as a dot',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    label: {
      control: 'text',
      description: 'Badge text content',
    },
  },
  args: {
    variant: 'primary',
    size: 'md',
    dot: false,
    label: 'Badge',
  },
};

export default meta;
type Story = StoryObj;

export const Primary: Story = {
  args: {
    variant: 'primary',
    label: 'Primary',
  },
  render: (args) => html`
    <atman-badge variant=${args.variant} size=${args.size} ?dot=${args.dot}>
      ${args.label}
    </atman-badge>
  `,
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    label: 'Secondary',
  },
  render: (args) => html`
    <atman-badge variant=${args.variant} size=${args.size} ?dot=${args.dot}>
      ${args.label}
    </atman-badge>
  `,
};

export const Success: Story = {
  args: {
    variant: 'success',
    label: 'Success',
  },
  render: (args) => html`
    <atman-badge variant=${args.variant} size=${args.size} ?dot=${args.dot}>
      ${args.label}
    </atman-badge>
  `,
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    label: 'Warning',
  },
  render: (args) => html`
    <atman-badge variant=${args.variant} size=${args.size} ?dot=${args.dot}>
      ${args.label}
    </atman-badge>
  `,
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    label: 'Error',
  },
  render: (args) => html`
    <atman-badge variant=${args.variant} size=${args.size} ?dot=${args.dot}>
      ${args.label}
    </atman-badge>
  `,
};

export const AllVariants: Story = {
  render: () => html`
    <div style="display: flex; flex-wrap: wrap; gap: 8px;">
      <atman-badge variant="primary">Primary</atman-badge>
      <atman-badge variant="secondary">Secondary</atman-badge>
      <atman-badge variant="success">Success</atman-badge>
      <atman-badge variant="warning">Warning</atman-badge>
      <atman-badge variant="destructive">Error</atman-badge>
    </div>
  `,
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; align-items: center; gap: 8px;">
      <atman-badge size="sm">Small</atman-badge>
      <atman-badge size="md">Medium</atman-badge>
    </div>
  `,
};

export const WithIcon: Story = {
  render: () => html`
    <div style="display: flex; flex-wrap: wrap; gap: 8px;">
      <atman-badge variant="success">
        <svg slot="prefix" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
        Complete
      </atman-badge>
      <atman-badge variant="warning">
        <svg slot="prefix" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" x2="12" y1="8" y2="12"/>
          <line x1="12" x2="12.01" y1="16" y2="16"/>
        </svg>
        Pending
      </atman-badge>
      <atman-badge variant="destructive">
        <svg slot="prefix" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <line x1="15" x2="9" y1="9" y2="15"/>
          <line x1="9" x2="15" y1="9" y2="15"/>
        </svg>
        Failed
      </atman-badge>
    </div>
  `,
};

export const Dots: Story = {
  render: () => html`
    <div style="display: flex; flex-wrap: wrap; align-items: center; gap: 16px;">
      <div style="display: flex; align-items: center; gap: 8px;">
        <atman-badge variant="success" dot></atman-badge>
        <span>Online</span>
      </div>
      <div style="display: flex; align-items: center; gap: 8px;">
        <atman-badge variant="warning" dot></atman-badge>
        <span>Away</span>
      </div>
      <div style="display: flex; align-items: center; gap: 8px;">
        <atman-badge variant="destructive" dot></atman-badge>
        <span>Offline</span>
      </div>
      <div style="display: flex; align-items: center; gap: 8px;">
        <atman-badge variant="secondary" dot></atman-badge>
        <span>Unknown</span>
      </div>
    </div>
  `,
};

export const UseCases: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <div style="display: flex; align-items: center; gap: 8px;">
        <span>Status:</span>
        <atman-badge variant="success">Active</atman-badge>
      </div>
      <div style="display: flex; align-items: center; gap: 8px;">
        <span>Version:</span>
        <atman-badge variant="primary">v1.0.0</atman-badge>
      </div>
      <div style="display: flex; align-items: center; gap: 8px;">
        <span>Notifications:</span>
        <atman-badge variant="destructive">5</atman-badge>
      </div>
      <div style="display: flex; align-items: center; gap: 8px;">
        <span>Plan:</span>
        <atman-badge variant="warning">Pro</atman-badge>
      </div>
    </div>
  `,
};
