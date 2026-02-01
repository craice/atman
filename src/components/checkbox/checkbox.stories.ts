import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import './checkbox.js';

const meta: Meta = {
  title: 'Components/Form Controls/Checkbox',
  component: 'atman-checkbox',
  tags: ['autodocs', 'stable'],
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'Whether the checkbox is checked',
    },
    indeterminate: {
      control: 'boolean',
      description: 'Whether the checkbox is in an indeterminate state',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the checkbox is disabled',
    },
    error: {
      control: 'boolean',
      description: 'Whether the checkbox has an error',
    },
    label: {
      control: 'text',
      description: 'The checkbox label',
    },
  },
  args: {
    checked: false,
    indeterminate: false,
    disabled: false,
    error: false,
    label: 'Checkbox label',
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    label: 'Accept terms and conditions',
  },
  render: (args) => html`
    <atman-checkbox
      ?checked=${args.checked}
      ?indeterminate=${args.indeterminate}
      ?disabled=${args.disabled}
      ?error=${args.error}
    >
      ${args.label}
    </atman-checkbox>
  `,
};

export const Checked: Story = {
  render: () => html`
    <atman-checkbox checked>I agree to the terms</atman-checkbox>
  `,
};

export const Indeterminate: Story = {
  render: () => html`
    <atman-checkbox indeterminate>Select all items</atman-checkbox>
  `,
};

export const Disabled: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 12px;">
      <atman-checkbox disabled>Disabled unchecked</atman-checkbox>
      <atman-checkbox disabled checked>Disabled checked</atman-checkbox>
      <atman-checkbox disabled indeterminate>Disabled indeterminate</atman-checkbox>
    </div>
  `,
};

export const WithError: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 4px;">
      <atman-checkbox error>Accept terms and conditions</atman-checkbox>
      <span style="color: var(--atman-color-destructive); font-size: var(--atman-font-size-xs); margin-left: 26px;">
        You must accept the terms to continue
      </span>
    </div>
  `,
};

export const States: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 12px;">
      <atman-checkbox>Unchecked</atman-checkbox>
      <atman-checkbox checked>Checked</atman-checkbox>
      <atman-checkbox indeterminate>Indeterminate</atman-checkbox>
      <atman-checkbox disabled>Disabled</atman-checkbox>
      <atman-checkbox disabled checked>Disabled checked</atman-checkbox>
      <atman-checkbox error>With error</atman-checkbox>
    </div>
  `,
};

export const CheckboxGroup: Story = {
  render: () => html`
    <fieldset style="border: none; padding: 0; margin: 0;">
      <legend style="font-family: var(--atman-font-family); font-size: var(--atman-font-size-sm); font-weight: var(--atman-font-weight-medium); color: var(--atman-color-text); margin-bottom: 12px;">
        Select your interests
      </legend>
      <div style="display: flex; flex-direction: column; gap: 8px;">
        <atman-checkbox name="interests" value="design">Design</atman-checkbox>
        <atman-checkbox name="interests" value="development">Development</atman-checkbox>
        <atman-checkbox name="interests" value="marketing">Marketing</atman-checkbox>
        <atman-checkbox name="interests" value="business">Business</atman-checkbox>
      </div>
    </fieldset>
  `,
};

export const SelectAllPattern: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 8px;">
      <atman-checkbox indeterminate style="font-weight: var(--atman-font-weight-medium);">
        Select all items
      </atman-checkbox>
      <div style="margin-left: 24px; display: flex; flex-direction: column; gap: 8px;">
        <atman-checkbox checked>Item 1</atman-checkbox>
        <atman-checkbox checked>Item 2</atman-checkbox>
        <atman-checkbox>Item 3</atman-checkbox>
        <atman-checkbox>Item 4</atman-checkbox>
      </div>
    </div>
  `,
};

export const WithLongLabel: Story = {
  render: () => html`
    <div style="max-width: 300px;">
      <atman-checkbox>
        I have read and agree to the Terms of Service, Privacy Policy, and Cookie Policy. I understand that my data may be processed according to these policies.
      </atman-checkbox>
    </div>
  `,
};

export const FormExample: Story = {
  render: () => html`
    <form style="display: flex; flex-direction: column; gap: 16px; max-width: 400px;" @submit=${(e: Event) => e.preventDefault()}>
      <atman-input label="Email" type="email" placeholder="email@example.com" required></atman-input>
      <atman-input label="Password" type="password" placeholder="Create a password" required></atman-input>

      <div style="display: flex; flex-direction: column; gap: 8px;">
        <atman-checkbox name="remember">Remember me</atman-checkbox>
        <atman-checkbox name="newsletter">Subscribe to newsletter</atman-checkbox>
        <atman-checkbox name="terms" required>
          I agree to the <a href="#" style="color: var(--atman-color-primary);">Terms of Service</a>
        </atman-checkbox>
      </div>

      <atman-button variant="primary" type="submit" style="align-self: flex-start;">Sign Up</atman-button>
    </form>
  `,
};
