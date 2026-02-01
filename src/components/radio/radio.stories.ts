import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import './radio.js';
import './radio-group.js';

const meta: Meta = {
  title: 'Components/Form Controls/Radio',
  component: 'atman-radio',
  tags: ['autodocs', 'stable'],
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'Whether the radio is checked',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the radio is disabled',
    },
    error: {
      control: 'boolean',
      description: 'Whether the radio has an error',
    },
    value: {
      control: 'text',
      description: 'The radio value',
    },
    label: {
      control: 'text',
      description: 'The radio label',
    },
  },
  args: {
    checked: false,
    disabled: false,
    error: false,
    value: 'option',
    label: 'Radio option',
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    label: 'Select this option',
  },
  render: (args) => html`
    <atman-radio
      ?checked=${args.checked}
      ?disabled=${args.disabled}
      ?error=${args.error}
      value=${args.value}
    >
      ${args.label}
    </atman-radio>
  `,
};

export const Checked: Story = {
  render: () => html`
    <atman-radio checked value="selected">Selected option</atman-radio>
  `,
};

export const Disabled: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 12px;">
      <atman-radio disabled value="disabled1">Disabled unchecked</atman-radio>
      <atman-radio disabled checked value="disabled2">Disabled checked</atman-radio>
    </div>
  `,
};

export const WithError: Story = {
  render: () => html`
    <atman-radio error value="error">Option with error</atman-radio>
  `,
};

export const States: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 12px;">
      <atman-radio value="unchecked">Unchecked</atman-radio>
      <atman-radio checked value="checked">Checked</atman-radio>
      <atman-radio disabled value="disabled">Disabled</atman-radio>
      <atman-radio disabled checked value="disabled-checked">Disabled checked</atman-radio>
      <atman-radio error value="error">With error</atman-radio>
    </div>
  `,
};

export const RadioGroup: Story = {
  render: () => html`
    <atman-radio-group label="Select a plan" name="plan" value="pro">
      <atman-radio value="free">Free</atman-radio>
      <atman-radio value="pro">Pro</atman-radio>
      <atman-radio value="enterprise">Enterprise</atman-radio>
    </atman-radio-group>
  `,
};

export const RadioGroupHorizontal: Story = {
  render: () => html`
    <atman-radio-group label="Select a size" name="size" value="md" orientation="horizontal">
      <atman-radio value="sm">Small</atman-radio>
      <atman-radio value="md">Medium</atman-radio>
      <atman-radio value="lg">Large</atman-radio>
      <atman-radio value="xl">Extra Large</atman-radio>
    </atman-radio-group>
  `,
};

export const RadioGroupRequired: Story = {
  render: () => html`
    <atman-radio-group label="Payment method" name="payment" required>
      <atman-radio value="card">Credit Card</atman-radio>
      <atman-radio value="paypal">PayPal</atman-radio>
      <atman-radio value="bank">Bank Transfer</atman-radio>
    </atman-radio-group>
  `,
};

export const RadioGroupWithError: Story = {
  render: () => html`
    <atman-radio-group label="Select an option" name="option" error="Please select an option">
      <atman-radio value="option1">Option 1</atman-radio>
      <atman-radio value="option2">Option 2</atman-radio>
      <atman-radio value="option3">Option 3</atman-radio>
    </atman-radio-group>
  `,
};

export const RadioGroupWithHelperText: Story = {
  render: () => html`
    <atman-radio-group
      label="Notification preference"
      name="notifications"
      value="email"
      helper-text="Choose how you'd like to receive notifications"
    >
      <atman-radio value="email">Email</atman-radio>
      <atman-radio value="sms">SMS</atman-radio>
      <atman-radio value="push">Push notification</atman-radio>
      <atman-radio value="none">None</atman-radio>
    </atman-radio-group>
  `,
};

export const RadioGroupDisabled: Story = {
  render: () => html`
    <atman-radio-group label="Subscription" name="subscription" value="monthly" disabled>
      <atman-radio value="monthly">Monthly</atman-radio>
      <atman-radio value="yearly">Yearly</atman-radio>
    </atman-radio-group>
  `,
};

export const RadioGroupWithDisabledOptions: Story = {
  render: () => html`
    <atman-radio-group label="Shipping method" name="shipping" value="standard">
      <atman-radio value="standard">Standard (5-7 days)</atman-radio>
      <atman-radio value="express">Express (2-3 days)</atman-radio>
      <atman-radio value="overnight" disabled>Overnight (Not available)</atman-radio>
    </atman-radio-group>
  `,
};

export const FormExample: Story = {
  render: () => html`
    <form style="display: flex; flex-direction: column; gap: 20px; max-width: 400px;" @submit=${(e: Event) => e.preventDefault()}>
      <atman-input label="Full Name" placeholder="John Doe" required></atman-input>
      <atman-input label="Email" type="email" placeholder="john@example.com" required></atman-input>

      <atman-radio-group label="Account type" name="account-type" value="personal" required>
        <atman-radio value="personal">Personal</atman-radio>
        <atman-radio value="business">Business</atman-radio>
      </atman-radio-group>

      <atman-radio-group
        label="How did you hear about us?"
        name="referral"
        helper-text="Optional"
      >
        <atman-radio value="search">Search engine</atman-radio>
        <atman-radio value="social">Social media</atman-radio>
        <atman-radio value="friend">Friend or colleague</atman-radio>
        <atman-radio value="other">Other</atman-radio>
      </atman-radio-group>

      <atman-button variant="primary" type="submit" style="align-self: flex-start;">Create Account</atman-button>
    </form>
  `,
};
