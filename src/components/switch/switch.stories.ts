import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import './switch.js';

const meta: Meta = {
  title: 'Components/Form Controls/Switch',
  component: 'atman-switch',
  tags: ['autodocs', 'stable'],
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'Whether the switch is checked',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the switch is disabled',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'The size of the switch',
    },
    'label-position': {
      control: 'select',
      options: ['left', 'right'],
      description: 'Position of the label',
    },
  },
  args: {
    checked: false,
    disabled: false,
    size: 'md',
    'label-position': 'right',
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <atman-switch
      ?checked=${args.checked}
      ?disabled=${args.disabled}
      size=${args.size}
      label-position=${args['label-position']}
    >
      Enable notifications
    </atman-switch>
  `,
};

export const Checked: Story = {
  render: () => html`
    <atman-switch checked>Active</atman-switch>
  `,
};

export const Disabled: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 12px;">
      <atman-switch disabled>Disabled off</atman-switch>
      <atman-switch disabled checked>Disabled on</atman-switch>
    </div>
  `,
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 12px;">
      <atman-switch size="sm" checked>Small</atman-switch>
      <atman-switch size="md" checked>Medium</atman-switch>
      <atman-switch size="lg" checked>Large</atman-switch>
    </div>
  `,
};

export const LabelPositions: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 12px;">
      <atman-switch label-position="right">Label right</atman-switch>
      <atman-switch label-position="left">Label left</atman-switch>
    </div>
  `,
};

export const SettingsExample: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px; max-width: 400px;">
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <div>
          <div style="font-family: var(--atman-font-family); font-size: var(--atman-font-size-sm); font-weight: var(--atman-font-weight-medium); color: var(--atman-color-text);">Email notifications</div>
          <div style="font-family: var(--atman-font-family); font-size: var(--atman-font-size-xs); color: var(--atman-color-text-secondary);">Receive email updates about activity</div>
        </div>
        <atman-switch checked></atman-switch>
      </div>
      <atman-divider></atman-divider>
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <div>
          <div style="font-family: var(--atman-font-family); font-size: var(--atman-font-size-sm); font-weight: var(--atman-font-weight-medium); color: var(--atman-color-text);">Push notifications</div>
          <div style="font-family: var(--atman-font-family); font-size: var(--atman-font-size-xs); color: var(--atman-color-text-secondary);">Receive push notifications on your device</div>
        </div>
        <atman-switch></atman-switch>
      </div>
      <atman-divider></atman-divider>
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <div>
          <div style="font-family: var(--atman-font-family); font-size: var(--atman-font-size-sm); font-weight: var(--atman-font-weight-medium); color: var(--atman-color-text);">Dark mode</div>
          <div style="font-family: var(--atman-font-family); font-size: var(--atman-font-size-xs); color: var(--atman-color-text-secondary);">Use dark color theme</div>
        </div>
        <atman-switch></atman-switch>
      </div>
    </div>
  `,
};
