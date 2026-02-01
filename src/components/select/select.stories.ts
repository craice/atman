import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import './select.js';
import type { SelectOption } from './select.js';

const defaultOptions: SelectOption[] = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'date', label: 'Date' },
  { value: 'elderberry', label: 'Elderberry' },
];

const countryOptions: SelectOption[] = [
  { value: 'us', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'ca', label: 'Canada' },
  { value: 'au', label: 'Australia' },
  { value: 'de', label: 'Germany' },
  { value: 'fr', label: 'France' },
  { value: 'jp', label: 'Japan' },
  { value: 'br', label: 'Brazil' },
];

const optionsWithDisabled: SelectOption[] = [
  { value: 'option1', label: 'Available Option 1' },
  { value: 'option2', label: 'Disabled Option', disabled: true },
  { value: 'option3', label: 'Available Option 2' },
  { value: 'option4', label: 'Another Disabled', disabled: true },
  { value: 'option5', label: 'Available Option 3' },
];

const meta: Meta = {
  title: 'Components/Form Controls/Select',
  component: 'atman-select',
  tags: ['autodocs', 'stable'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'The size of the select',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    label: {
      control: 'text',
      description: 'The select label',
    },
    placeholder: {
      control: 'text',
      description: 'The placeholder text',
    },
    value: {
      control: 'text',
      description: 'The selected value',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the select is disabled',
    },
    required: {
      control: 'boolean',
      description: 'Whether the select is required',
    },
    error: {
      control: 'text',
      description: 'Error message to display',
    },
    helperText: {
      control: 'text',
      description: 'Helper text below the select',
    },
  },
  args: {
    size: 'md',
    placeholder: 'Select an option',
    disabled: false,
    required: false,
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    label: 'Fruit',
    options: defaultOptions,
  },
  render: (args) => html`
    <atman-select
      label=${args.label}
      placeholder=${args.placeholder}
      size=${args.size}
      ?disabled=${args.disabled}
      ?required=${args.required}
      error=${args.error || ''}
      helper-text=${args.helperText || ''}
      .options=${args.options}
    ></atman-select>
  `,
};

export const WithValue: Story = {
  render: () => html`
    <atman-select
      label="Fruit"
      value="cherry"
      .options=${defaultOptions}
    ></atman-select>
  `,
};

export const WithHelperText: Story = {
  render: () => html`
    <atman-select
      label="Country"
      placeholder="Select your country"
      helper-text="This will be used for shipping"
      .options=${countryOptions}
    ></atman-select>
  `,
};

export const Required: Story = {
  render: () => html`
    <atman-select
      label="Country"
      placeholder="Select your country"
      required
      .options=${countryOptions}
    ></atman-select>
  `,
};

export const WithError: Story = {
  render: () => html`
    <atman-select
      label="Country"
      placeholder="Select your country"
      error="Please select a country"
      .options=${countryOptions}
    ></atman-select>
  `,
};

export const Disabled: Story = {
  render: () => html`
    <atman-select
      label="Country"
      value="us"
      disabled
      .options=${countryOptions}
    ></atman-select>
  `,
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px; max-width: 300px;">
      <atman-select
        size="sm"
        label="Small"
        placeholder="Select..."
        .options=${defaultOptions}
      ></atman-select>
      <atman-select
        size="md"
        label="Medium"
        placeholder="Select..."
        .options=${defaultOptions}
      ></atman-select>
      <atman-select
        size="lg"
        label="Large"
        placeholder="Select..."
        .options=${defaultOptions}
      ></atman-select>
    </div>
  `,
};

export const WithDisabledOptions: Story = {
  render: () => html`
    <atman-select
      label="Options"
      placeholder="Some options are disabled"
      .options=${optionsWithDisabled}
    ></atman-select>
  `,
};

export const ManyOptions: Story = {
  render: () => html`
    <atman-select
      label="Number"
      placeholder="Select a number"
      .options=${Array.from({ length: 20 }, (_, i) => ({
        value: String(i + 1),
        label: `Option ${i + 1}`,
      }))}
    ></atman-select>
  `,
};

export const FormExample: Story = {
  render: () => html`
    <form style="display: flex; flex-direction: column; gap: 16px; max-width: 400px;" @submit=${(e: Event) => e.preventDefault()}>
      <atman-input label="Full Name" placeholder="John Doe" required></atman-input>
      <atman-input label="Email" type="email" placeholder="john@example.com" required></atman-input>
      <atman-select
        label="Country"
        placeholder="Select your country"
        required
        .options=${countryOptions}
      ></atman-select>
      <atman-select
        label="Preferred Fruit"
        placeholder="Select a fruit"
        helper-text="Optional"
        .options=${defaultOptions}
      ></atman-select>
      <atman-button variant="primary" type="submit" style="align-self: flex-start;">Submit</atman-button>
    </form>
  `,
};

export const States: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px; max-width: 300px;">
      <atman-select
        label="Default"
        placeholder="Select an option"
        .options=${defaultOptions}
      ></atman-select>
      <atman-select
        label="With Value"
        value="banana"
        .options=${defaultOptions}
      ></atman-select>
      <atman-select
        label="Disabled"
        value="apple"
        disabled
        .options=${defaultOptions}
      ></atman-select>
      <atman-select
        label="Error"
        error="This field is required"
        .options=${defaultOptions}
      ></atman-select>
    </div>
  `,
};
