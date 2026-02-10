import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import './textarea.js';

const meta: Meta = {
  title: 'Components/Form Controls/Textarea',
  component: 'atman-textarea',
  tags: ['autodocs', 'stable'],
  argTypes: {
    label: { control: 'text', description: 'The textarea label' },
    placeholder: { control: 'text', description: 'Placeholder text' },
    value: { control: 'text', description: 'The textarea value' },
    size: { control: 'select', options: ['sm', 'md', 'lg'], description: 'Size variant' },
    rows: { control: 'number', description: 'Number of visible rows' },
    maxlength: { control: 'number', description: 'Maximum character length' },
    resize: { control: 'select', options: ['none', 'vertical', 'both'], description: 'Resize behavior' },
    'auto-resize': { control: 'boolean', description: 'Auto-resize to fit content' },
    disabled: { control: 'boolean', description: 'Whether disabled' },
    required: { control: 'boolean', description: 'Whether required' },
    error: { control: 'text', description: 'Error message' },
    'helper-text': { control: 'text', description: 'Helper text' },
  },
  args: {
    label: 'Description',
    placeholder: 'Enter a description...',
    size: 'md',
    rows: 3,
    resize: 'vertical',
    disabled: false,
    required: false,
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <atman-textarea
      label=${args.label}
      placeholder=${args.placeholder}
      size=${args.size}
      rows=${args.rows}
      resize=${args.resize}
      ?disabled=${args.disabled}
      ?required=${args.required}
    ></atman-textarea>
  `,
};

export const WithHelperText: Story = {
  render: () => html`
    <atman-textarea
      label="Bio"
      placeholder="Tell us about yourself..."
      helper-text="Write a short biography (max 500 characters)"
      maxlength="500"
    ></atman-textarea>
  `,
};

export const WithError: Story = {
  render: () => html`
    <atman-textarea
      label="Comments"
      error="This field is required"
      required
    ></atman-textarea>
  `,
};

export const WithCharacterCount: Story = {
  render: () => html`
    <atman-textarea
      label="Tweet"
      placeholder="What's happening?"
      maxlength="280"
      value="This is a sample text to show the character counter in action."
    ></atman-textarea>
  `,
};

export const Disabled: Story = {
  render: () => html`
    <atman-textarea
      label="Notes"
      value="This textarea is disabled"
      disabled
    ></atman-textarea>
  `,
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <atman-textarea label="Small" size="sm" placeholder="Small textarea" rows="2"></atman-textarea>
      <atman-textarea label="Medium" size="md" placeholder="Medium textarea" rows="3"></atman-textarea>
      <atman-textarea label="Large" size="lg" placeholder="Large textarea" rows="4"></atman-textarea>
    </div>
  `,
};

export const AutoResize: Story = {
  render: () => html`
    <atman-textarea
      label="Auto-resize"
      placeholder="Type here and watch it grow..."
      auto-resize
      rows="2"
    ></atman-textarea>
  `,
};

export const FormExample: Story = {
  render: () => html`
    <form style="display: flex; flex-direction: column; gap: 16px; max-width: 500px;" @submit=${(e: Event) => e.preventDefault()}>
      <atman-input label="Subject" placeholder="Enter subject" required></atman-input>
      <atman-textarea
        label="Message"
        placeholder="Type your message here..."
        rows="5"
        maxlength="1000"
        required
      ></atman-textarea>
      <atman-button variant="primary" type="submit" style="align-self: flex-start;">Send</atman-button>
    </form>
  `,
};
