import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import './divider.js';

const meta: Meta = {
  title: 'Components/Layout/Divider',
  component: 'atman-divider',
  tags: ['autodocs', 'stable'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'The orientation of the divider',
      table: {
        defaultValue: { summary: 'horizontal' },
      },
    },
    labelPosition: {
      control: 'select',
      options: ['start', 'center', 'end'],
      description: 'The position of the label',
      table: {
        defaultValue: { summary: 'center' },
      },
    },
    spacing: {
      control: 'select',
      options: [undefined, 'sm', 'md', 'lg'],
      description: 'Spacing around the divider',
    },
  },
  args: {
    orientation: 'horizontal',
    labelPosition: 'center',
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => html`
    <div>
      <p>Content above the divider</p>
      <atman-divider></atman-divider>
      <p>Content below the divider</p>
    </div>
  `,
};

export const WithLabel: Story = {
  render: () => html`
    <div>
      <p>Content above the divider</p>
      <atman-divider>OR</atman-divider>
      <p>Content below the divider</p>
    </div>
  `,
};

export const LabelPositions: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 24px;">
      <div>
        <p style="margin: 0 0 8px; font-size: var(--atman-font-size-sm); color: var(--atman-color-text-secondary);">
          Start
        </p>
        <atman-divider label-position="start">Label</atman-divider>
      </div>
      <div>
        <p style="margin: 0 0 8px; font-size: var(--atman-font-size-sm); color: var(--atman-color-text-secondary);">
          Center (default)
        </p>
        <atman-divider label-position="center">Label</atman-divider>
      </div>
      <div>
        <p style="margin: 0 0 8px; font-size: var(--atman-font-size-sm); color: var(--atman-color-text-secondary);">
          End
        </p>
        <atman-divider label-position="end">Label</atman-divider>
      </div>
    </div>
  `,
};

export const Spacing: Story = {
  render: () => html`
    <div>
      <p>Small spacing</p>
      <atman-divider spacing="sm"></atman-divider>
      <p>Medium spacing</p>
      <atman-divider spacing="md"></atman-divider>
      <p>Large spacing</p>
      <atman-divider spacing="lg"></atman-divider>
      <p>End</p>
    </div>
  `,
};

export const Vertical: Story = {
  render: () => html`
    <div style="display: flex; align-items: center; height: 100px; gap: 16px;">
      <span>Left</span>
      <atman-divider orientation="vertical"></atman-divider>
      <span>Center</span>
      <atman-divider orientation="vertical"></atman-divider>
      <span>Right</span>
    </div>
  `,
};

export const VerticalWithLabel: Story = {
  render: () => html`
    <div style="display: flex; align-items: center; height: 120px; gap: 16px;">
      <span>Left</span>
      <atman-divider orientation="vertical">OR</atman-divider>
      <span>Right</span>
    </div>
  `,
};

export const InCard: Story = {
  render: () => html`
    <atman-card style="max-width: 400px;">
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <div style="display: flex; justify-content: space-between;">
          <span>Subtotal</span>
          <span>$99.00</span>
        </div>
        <div style="display: flex; justify-content: space-between;">
          <span>Shipping</span>
          <span>$5.00</span>
        </div>
        <div style="display: flex; justify-content: space-between;">
          <span>Tax</span>
          <span>$8.40</span>
        </div>
        <atman-divider spacing="sm"></atman-divider>
        <div style="display: flex; justify-content: space-between; font-weight: var(--atman-font-weight-semibold);">
          <span>Total</span>
          <span>$112.40</span>
        </div>
      </div>
    </atman-card>
  `,
};

export const LoginOptions: Story = {
  render: () => html`
    <atman-card style="max-width: 400px;">
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <atman-button variant="secondary" style="width: 100%;">
          <svg slot="prefix" viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Continue with Google
        </atman-button>
        <atman-button variant="secondary" style="width: 100%;">
          <svg slot="prefix" viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
            <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.341-3.369-1.341-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
          </svg>
          Continue with GitHub
        </atman-button>
        <atman-divider>or continue with email</atman-divider>
        <atman-input label="Email" type="email" placeholder="you@example.com"></atman-input>
        <atman-input label="Password" type="password" placeholder="••••••••"></atman-input>
        <atman-button variant="primary" style="width: 100%;">Sign In</atman-button>
      </div>
    </atman-card>
  `,
};
