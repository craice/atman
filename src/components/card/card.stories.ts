import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import './card.js';

const meta: Meta = {
  title: 'Components/Layout/Card',
  component: 'atman-card',
  tags: ['autodocs', 'stable'],
  argTypes: {
    clickable: {
      control: 'boolean',
      description: 'Whether the card is clickable',
    },
    elevated: {
      control: 'boolean',
      description: 'Whether the card has elevated styling',
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
      description: 'Padding size for the card',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
  },
  args: {
    clickable: false,
    elevated: false,
    padding: 'md',
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <atman-card ?clickable=${args.clickable} ?elevated=${args.elevated} padding=${args.padding} style="max-width: 400px;">
      <p>This is a basic card with some content inside.</p>
    </atman-card>
  `,
};

export const WithHeader: Story = {
  render: () => html`
    <atman-card style="max-width: 400px;">
      <div slot="header" style="font-weight: var(--atman-font-weight-semibold);">
        Card Title
      </div>
      <p>This card has a header section with a title.</p>
    </atman-card>
  `,
};

export const WithHeaderAndFooter: Story = {
  render: () => html`
    <atman-card style="max-width: 400px;">
      <div slot="header" style="font-weight: var(--atman-font-weight-semibold);">
        Card Title
      </div>
      <p>This card has both a header and footer section. The content goes in the body.</p>
      <div slot="footer" style="display: flex; justify-content: flex-end; gap: 8px;">
        <atman-button variant="ghost" size="sm">Cancel</atman-button>
        <atman-button variant="primary" size="sm">Save</atman-button>
      </div>
    </atman-card>
  `,
};

export const Clickable: Story = {
  render: () => html`
    <atman-card clickable style="max-width: 400px;" @atman-click=${() => console.log('Card clicked!')}>
      <div slot="header" style="font-weight: var(--atman-font-weight-semibold);">
        Clickable Card
      </div>
      <p>Click this card to trigger an action. It has hover and focus states.</p>
    </atman-card>
  `,
};

export const Elevated: Story = {
  render: () => html`
    <atman-card elevated style="max-width: 400px;">
      <div slot="header" style="font-weight: var(--atman-font-weight-semibold);">
        Elevated Card
      </div>
      <p>This card uses shadow instead of border for elevation.</p>
    </atman-card>
  `,
};

export const Padding: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <atman-card padding="sm" style="max-width: 400px;">
        <div slot="header" style="font-weight: var(--atman-font-weight-semibold);">Small Padding</div>
        <p>Content with small padding.</p>
      </atman-card>
      <atman-card padding="md" style="max-width: 400px;">
        <div slot="header" style="font-weight: var(--atman-font-weight-semibold);">Medium Padding (default)</div>
        <p>Content with medium padding.</p>
      </atman-card>
      <atman-card padding="lg" style="max-width: 400px;">
        <div slot="header" style="font-weight: var(--atman-font-weight-semibold);">Large Padding</div>
        <p>Content with large padding.</p>
      </atman-card>
    </div>
  `,
};

export const ProductCard: Story = {
  render: () => html`
    <atman-card clickable padding="none" style="max-width: 280px;">
      <img
        src="https://picsum.photos/280/180"
        alt="Product"
        style="width: 100%; height: 180px; object-fit: cover;"
      />
      <div style="padding: 16px;">
        <h3 style="margin: 0 0 8px; font-size: var(--atman-font-size-md); font-weight: var(--atman-font-weight-semibold);">
          Product Name
        </h3>
        <p style="margin: 0 0 12px; color: var(--atman-color-text-secondary); font-size: var(--atman-font-size-sm);">
          A short description of the product goes here.
        </p>
        <div style="display: flex; align-items: center; justify-content: space-between;">
          <span style="font-weight: var(--atman-font-weight-semibold); font-size: var(--atman-font-size-lg);">$99.00</span>
          <atman-badge variant="success">In Stock</atman-badge>
        </div>
      </div>
    </atman-card>
  `,
};

export const UserCard: Story = {
  render: () => html`
    <atman-card style="max-width: 320px;">
      <div style="display: flex; align-items: center; gap: 12px;">
        <atman-avatar src="https://i.pravatar.cc/150?img=1" size="lg"></atman-avatar>
        <div>
          <h3 style="margin: 0; font-size: var(--atman-font-size-md); font-weight: var(--atman-font-weight-semibold);">
            John Doe
          </h3>
          <p style="margin: 4px 0 0; color: var(--atman-color-text-secondary); font-size: var(--atman-font-size-sm);">
            Software Engineer
          </p>
        </div>
      </div>
      <div slot="footer" style="display: flex; gap: 8px;">
        <atman-button variant="primary" size="sm" style="flex: 1;">Message</atman-button>
        <atman-button variant="secondary" size="sm" style="flex: 1;">Profile</atman-button>
      </div>
    </atman-card>
  `,
};

export const StatsCard: Story = {
  render: () => html`
    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; max-width: 600px;">
      <atman-card>
        <p style="margin: 0 0 4px; color: var(--atman-color-text-secondary); font-size: var(--atman-font-size-sm);">
          Total Users
        </p>
        <p style="margin: 0; font-size: var(--atman-font-size-2xl); font-weight: var(--atman-font-weight-bold);">
          12,345
        </p>
        <p style="margin: 8px 0 0; color: var(--atman-color-success); font-size: var(--atman-font-size-sm);">
          +12% from last month
        </p>
      </atman-card>
      <atman-card>
        <p style="margin: 0 0 4px; color: var(--atman-color-text-secondary); font-size: var(--atman-font-size-sm);">
          Revenue
        </p>
        <p style="margin: 0; font-size: var(--atman-font-size-2xl); font-weight: var(--atman-font-weight-bold);">
          $54,321
        </p>
        <p style="margin: 8px 0 0; color: var(--atman-color-success); font-size: var(--atman-font-size-sm);">
          +8% from last month
        </p>
      </atman-card>
      <atman-card>
        <p style="margin: 0 0 4px; color: var(--atman-color-text-secondary); font-size: var(--atman-font-size-sm);">
          Active Sessions
        </p>
        <p style="margin: 0; font-size: var(--atman-font-size-2xl); font-weight: var(--atman-font-weight-bold);">
          1,234
        </p>
        <p style="margin: 8px 0 0; color: var(--atman-color-destructive); font-size: var(--atman-font-size-sm);">
          -3% from last month
        </p>
      </atman-card>
    </div>
  `,
};

export const FormCard: Story = {
  render: () => html`
    <atman-card style="max-width: 400px;">
      <div slot="header">
        <h2 style="margin: 0; font-size: var(--atman-font-size-lg); font-weight: var(--atman-font-weight-semibold);">
          Sign In
        </h2>
        <p style="margin: 4px 0 0; color: var(--atman-color-text-secondary); font-size: var(--atman-font-size-sm);">
          Enter your credentials to access your account
        </p>
      </div>
      <form style="display: flex; flex-direction: column; gap: 16px;" @submit=${(e: Event) => e.preventDefault()}>
        <atman-input label="Email" type="email" placeholder="you@example.com" required></atman-input>
        <atman-input label="Password" type="password" placeholder="••••••••" required></atman-input>
        <atman-checkbox>Remember me</atman-checkbox>
        <atman-button variant="primary" type="submit">Sign In</atman-button>
      </form>
      <div slot="footer" style="text-align: center;">
        <span style="color: var(--atman-color-text-secondary); font-size: var(--atman-font-size-sm);">
          Don't have an account? <a href="#" style="color: var(--atman-color-primary);">Sign up</a>
        </span>
      </div>
    </atman-card>
  `,
};
