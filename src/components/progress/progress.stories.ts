import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import './progress.js';

const meta: Meta = {
  title: 'Components/Feedback/Progress',
  component: 'atman-progress',
  tags: ['autodocs', 'stable'],
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100 }, description: 'Progress value (0-100)' },
    variant: { control: 'select', options: ['primary', 'success', 'warning', 'destructive'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    type: { control: 'select', options: ['linear', 'circular'] },
    indeterminate: { control: 'boolean' },
    'show-label': { control: 'boolean' },
  },
  args: {
    value: 60,
    variant: 'primary',
    size: 'md',
    type: 'linear',
    indeterminate: false,
    'show-label': false,
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <atman-progress
      value=${args.value}
      variant=${args.variant}
      size=${args.size}
      type=${args.type}
      ?indeterminate=${args.indeterminate}
      ?show-label=${args['show-label']}
    ></atman-progress>
  `,
};

export const WithLabel: Story = {
  render: () => html`
    <atman-progress value="65" show-label>Uploading...</atman-progress>
  `,
};

export const Variants: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <atman-progress value="25" variant="primary" show-label>Primary</atman-progress>
      <atman-progress value="50" variant="success" show-label>Success</atman-progress>
      <atman-progress value="75" variant="warning" show-label>Warning</atman-progress>
      <atman-progress value="90" variant="destructive" show-label>Destructive</atman-progress>
    </div>
  `,
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <atman-progress value="60" size="sm"></atman-progress>
      <atman-progress value="60" size="md"></atman-progress>
      <atman-progress value="60" size="lg"></atman-progress>
    </div>
  `,
};

export const Indeterminate: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <atman-progress indeterminate></atman-progress>
      <atman-progress indeterminate type="circular"></atman-progress>
    </div>
  `,
};

export const Circular: Story = {
  render: () => html`
    <div style="display: flex; gap: 24px; align-items: center;">
      <atman-progress type="circular" value="25" size="sm" show-label></atman-progress>
      <atman-progress type="circular" value="50" size="md" show-label></atman-progress>
      <atman-progress type="circular" value="75" size="lg" show-label></atman-progress>
    </div>
  `,
};

export const CircularVariants: Story = {
  render: () => html`
    <div style="display: flex; gap: 24px; align-items: center;">
      <atman-progress type="circular" value="25" variant="primary" show-label></atman-progress>
      <atman-progress type="circular" value="50" variant="success" show-label></atman-progress>
      <atman-progress type="circular" value="75" variant="warning" show-label></atman-progress>
      <atman-progress type="circular" value="90" variant="destructive" show-label></atman-progress>
    </div>
  `,
};
