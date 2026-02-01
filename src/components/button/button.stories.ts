import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { userEvent, within, expect, fn } from 'storybook/test';
import './button.js';

const meta: Meta = {
  title: 'Components/Primitives/Button',
  component: 'atman-button',
  tags: ['autodocs', 'stable'],
  parameters: {
    status: { type: 'stable' },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'destructive'],
      description: 'The visual style of the button',
      table: {
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'The size of the button',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    loading: {
      control: 'boolean',
      description: 'Whether the button is in a loading state',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    label: {
      control: 'text',
      description: 'Button text content',
    },
  },
  args: {
    variant: 'primary',
    size: 'md',
    disabled: false,
    loading: false,
    label: 'Button',
  },
};

export default meta;
type Story = StoryObj;

export const Primary: Story = {
  args: {
    variant: 'primary',
    label: 'Primary Button',
  },
  render: (args) => html`
    <atman-button
      variant=${args.variant}
      size=${args.size}
      ?disabled=${args.disabled}
      ?loading=${args.loading}
    >
      ${args.label}
    </atman-button>
  `,
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    label: 'Secondary Button',
  },
  render: (args) => html`
    <atman-button
      variant=${args.variant}
      size=${args.size}
      ?disabled=${args.disabled}
      ?loading=${args.loading}
    >
      ${args.label}
    </atman-button>
  `,
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    label: 'Ghost Button',
  },
  render: (args) => html`
    <atman-button
      variant=${args.variant}
      size=${args.size}
      ?disabled=${args.disabled}
      ?loading=${args.loading}
    >
      ${args.label}
    </atman-button>
  `,
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    label: 'Delete',
  },
  render: (args) => html`
    <atman-button
      variant=${args.variant}
      size=${args.size}
      ?disabled=${args.disabled}
      ?loading=${args.loading}
    >
      ${args.label}
    </atman-button>
  `,
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; align-items: center; gap: 16px;">
      <atman-button size="sm">Small</atman-button>
      <atman-button size="md">Medium</atman-button>
      <atman-button size="lg">Large</atman-button>
    </div>
  `,
};

export const AllVariants: Story = {
  render: () => html`
    <div style="display: flex; flex-wrap: wrap; gap: 16px;">
      <atman-button variant="primary">Primary</atman-button>
      <atman-button variant="secondary">Secondary</atman-button>
      <atman-button variant="ghost">Ghost</atman-button>
      <atman-button variant="destructive">Destructive</atman-button>
    </div>
  `,
};

export const Disabled: Story = {
  render: () => html`
    <div style="display: flex; flex-wrap: wrap; gap: 16px;">
      <atman-button variant="primary" disabled>Primary</atman-button>
      <atman-button variant="secondary" disabled>Secondary</atman-button>
      <atman-button variant="ghost" disabled>Ghost</atman-button>
      <atman-button variant="destructive" disabled>Destructive</atman-button>
    </div>
  `,
};

export const Loading: Story = {
  render: () => html`
    <div style="display: flex; flex-wrap: wrap; gap: 16px;">
      <atman-button variant="primary" loading>Loading</atman-button>
      <atman-button variant="secondary" loading>Loading</atman-button>
      <atman-button variant="ghost" loading>Loading</atman-button>
      <atman-button variant="destructive" loading>Loading</atman-button>
    </div>
  `,
};

export const WithIcons: Story = {
  render: () => html`
    <div style="display: flex; flex-wrap: wrap; gap: 16px;">
      <atman-button variant="primary">
        <svg slot="prefix" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M5 12h14"/>
          <path d="M12 5v14"/>
        </svg>
        Add Item
      </atman-button>
      <atman-button variant="secondary">
        Download
        <svg slot="suffix" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
          <polyline points="7 10 12 15 17 10"/>
          <line x1="12" x2="12" y1="15" y2="3"/>
        </svg>
      </atman-button>
      <atman-button variant="destructive">
        <svg slot="prefix" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M3 6h18"/>
          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
        </svg>
        Delete
      </atman-button>
    </div>
  `,
};

export const IconOnly: Story = {
  render: () => html`
    <div style="display: flex; align-items: center; gap: 16px;">
      <atman-button variant="primary" icon-only size="sm" label="Add">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M5 12h14"/>
          <path d="M12 5v14"/>
        </svg>
      </atman-button>
      <atman-button variant="secondary" icon-only size="md" label="Settings">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
          <circle cx="12" cy="12" r="3"/>
        </svg>
      </atman-button>
      <atman-button variant="ghost" icon-only size="lg" label="Close">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M18 6 6 18"/>
          <path d="m6 6 12 12"/>
        </svg>
      </atman-button>
    </div>
  `,
};

export const FullWidth: Story = {
  render: () => html`
    <div style="max-width: 400px;">
      <atman-button variant="primary" fullwidth>Full Width Button</atman-button>
    </div>
  `,
};

// Interaction Tests
export const ClickInteraction: Story = {
  args: {
    variant: 'primary',
    label: 'Click me',
  },
  render: (args) => html`
    <atman-button
      variant=${args.variant}
      data-testid="test-button"
    >
      ${args.label}
    </atman-button>
  `,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByTestId('test-button');

    // Verify button is visible
    await expect(button).toBeVisible();

    // Click the button
    await userEvent.click(button);

    // Verify it received focus after click
    await expect(button).toHaveFocus();
  },
};

export const KeyboardNavigation: Story = {
  render: () => html`
    <div style="display: flex; gap: 16px;">
      <atman-button variant="primary" data-testid="btn-1">First</atman-button>
      <atman-button variant="secondary" data-testid="btn-2">Second</atman-button>
      <atman-button variant="ghost" data-testid="btn-3">Third</atman-button>
    </div>
  `,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const btn1 = canvas.getByTestId('btn-1');
    const btn2 = canvas.getByTestId('btn-2');
    const btn3 = canvas.getByTestId('btn-3');

    // Focus first button
    await userEvent.click(btn1);
    await expect(btn1).toHaveFocus();

    // Tab to second button
    await userEvent.tab();
    await expect(btn2).toHaveFocus();

    // Tab to third button
    await userEvent.tab();
    await expect(btn3).toHaveFocus();

    // Shift+Tab back to second
    await userEvent.tab({ shift: true });
    await expect(btn2).toHaveFocus();
  },
};

export const DisabledInteraction: Story = {
  render: () => html`
    <atman-button variant="primary" disabled data-testid="disabled-btn">
      Disabled Button
    </atman-button>
  `,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByTestId('disabled-btn');

    // Verify button has disabled attribute
    await expect(button).toHaveAttribute('disabled');

    // Try to click - should not change focus
    await userEvent.click(button);
  },
};
