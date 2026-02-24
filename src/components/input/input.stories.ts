import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import './input.js';

const meta: Meta = {
  title: 'Components/Form Controls/Input',
  component: 'atman-input',
  tags: ['autodocs', 'stable'],
  parameters: {
    status: { type: 'stable' },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'The size of the input',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search'],
      description: 'The type of input',
      table: {
        defaultValue: { summary: 'text' },
      },
    },
    label: {
      control: 'text',
      description: 'The input label',
    },
    placeholder: {
      control: 'text',
      description: 'The placeholder text',
    },
    value: {
      control: 'text',
      description: 'The input value',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the input is disabled',
    },
    required: {
      control: 'boolean',
      description: 'Whether the input is required',
    },
    error: {
      control: 'text',
      description: 'Error message to display',
    },
    helperText: {
      control: 'text',
      description: 'Helper text below the input',
    },
  },
  args: {
    size: 'md',
    type: 'text',
    disabled: false,
    required: false,
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
  },
  render: (args) => html`
    <atman-input
      label=${args.label}
      placeholder=${args.placeholder}
      size=${args.size}
      type=${args.type}
      ?disabled=${args.disabled}
      ?required=${args.required}
      error=${args.error || ''}
      helper-text=${args.helperText || ''}
    ></atman-input>
  `,
};

export const WithLabel: Story = {
  render: () => html`
    <atman-input label="Full Name" placeholder="John Doe"></atman-input>
  `,
};

export const WithHelperText: Story = {
  render: () => html`
    <atman-input
      label="Password"
      type="password"
      placeholder="Enter password"
      helper-text="Must be at least 8 characters"
    ></atman-input>
  `,
};

export const Required: Story = {
  render: () => html`
    <atman-input label="Email" placeholder="email@example.com" required></atman-input>
  `,
};

export const WithError: Story = {
  render: () => html`
    <atman-input
      label="Email"
      value="invalid-email"
      error="Please enter a valid email address"
    ></atman-input>
  `,
};

export const Disabled: Story = {
  render: () => html`
    <atman-input
      label="Username"
      value="johndoe"
      disabled
    ></atman-input>
  `,
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px; max-width: 400px;">
      <atman-input size="sm" label="Small" placeholder="Small input"></atman-input>
      <atman-input size="md" label="Medium" placeholder="Medium input"></atman-input>
      <atman-input size="lg" label="Large" placeholder="Large input"></atman-input>
    </div>
  `,
};

export const InputTypes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px; max-width: 400px;">
      <atman-input type="text" label="Text" placeholder="Enter text"></atman-input>
      <atman-input type="email" label="Email" placeholder="email@example.com"></atman-input>
      <atman-input type="password" label="Password" placeholder="Enter password"></atman-input>
      <atman-input type="number" label="Number" placeholder="0"></atman-input>
      <atman-input type="tel" label="Phone" placeholder="+1 (555) 000-0000"></atman-input>
      <atman-input type="url" label="URL" placeholder="https://example.com"></atman-input>
      <atman-input type="search" label="Search" placeholder="Search..."></atman-input>
    </div>
  `,
};

export const WithPrefixIcon: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px; max-width: 400px;">
      <atman-input label="Search" placeholder="Search...">
        <svg slot="prefix" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"/>
          <path d="m21 21-4.3-4.3"/>
        </svg>
      </atman-input>
      <atman-input label="Email" placeholder="email@example.com" type="email">
        <svg slot="prefix" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect width="20" height="16" x="2" y="4" rx="2"/>
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
        </svg>
      </atman-input>
    </div>
  `,
};

export const WithSuffixIcon: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px; max-width: 400px;">
      <atman-input label="Password" type="password" placeholder="Enter password">
        <svg slot="suffix" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="cursor: pointer;">
          <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
          <circle cx="12" cy="12" r="3"/>
        </svg>
      </atman-input>
      <atman-input label="Amount" type="number" placeholder="0.00">
        <span slot="suffix" style="color: var(--atman-color-text-secondary); font-size: var(--atman-font-size-sm);">USD</span>
      </atman-input>
    </div>
  `,
};

export const WithPrefixAndSuffix: Story = {
  render: () => html`
    <atman-input label="Website" placeholder="example.com" style="max-width: 400px;">
      <span slot="prefix" style="color: var(--atman-color-text-secondary); font-size: var(--atman-font-size-sm);">https://</span>
      <span slot="suffix" style="color: var(--atman-color-text-secondary); font-size: var(--atman-font-size-sm);">.com</span>
    </atman-input>
  `,
};

export const FormExample: Story = {
  render: () => html`
    <form style="display: flex; flex-direction: column; gap: 16px; max-width: 400px;" @submit=${(e: Event) => e.preventDefault()}>
      <atman-input label="Full Name" placeholder="John Doe" required></atman-input>
      <atman-input label="Email" type="email" placeholder="john@example.com" required></atman-input>
      <atman-input label="Phone" type="tel" placeholder="+1 (555) 000-0000" helper-text="Optional"></atman-input>
      <atman-input
        label="Password"
        type="password"
        placeholder="Create a password"
        required
        helper-text="Must be at least 8 characters"
      ></atman-input>
      <atman-button variant="primary" type="submit" style="align-self: flex-start;">Submit</atman-button>
    </form>
  `,
};

export const States: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px; max-width: 400px;">
      <atman-input label="Default" placeholder="Default state"></atman-input>
      <atman-input label="With Value" value="Some value"></atman-input>
      <atman-input label="Disabled" value="Disabled input" disabled></atman-input>
      <atman-input label="Readonly" value="Readonly input" readonly></atman-input>
      <atman-input label="Error" value="Invalid value" error="This field has an error"></atman-input>
    </div>
  `,
};

export const DoAndDont: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Best practices for using inputs in forms.',
      },
    },
  },
  render: () => html`
    <style>
      .dodont-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; max-width: 800px; }
      .dodont-card { border-radius: 12px; overflow: hidden; }
      .dodont-do { border: 2px solid #1E8E3E; }
      .dodont-dont { border: 2px solid #D93025; }
      .dodont-header { padding: 12px 16px; font-weight: 600; font-size: 14px; display: flex; align-items: center; gap: 8px; }
      .dodont-do .dodont-header { background: #E6F4EA; color: #1E8E3E; }
      .dodont-dont .dodont-header { background: #FCE8E6; color: #D93025; }
      .dodont-preview { padding: 32px; background: var(--atman-color-background, #FFFFFF); display: flex; align-items: center; justify-content: center; min-height: 120px; }
      .dodont-caption { padding: 16px; background: var(--atman-color-background-subtle, #F5F5F5); font-size: 14px; color: var(--atman-color-text-secondary, #616161); line-height: 1.5; }
    </style>
    <div style="display: flex; flex-direction: column; gap: 32px;">
      <div class="dodont-grid">
        <div class="dodont-card dodont-do">
          <div class="dodont-header">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
            Do
          </div>
          <div class="dodont-preview">
            <div style="width: 100%; max-width: 280px;">
              <atman-input label="Email address" type="email" placeholder="you@example.com"></atman-input>
            </div>
          </div>
          <div class="dodont-caption">Always include a visible label so users know what to enter even after typing.</div>
        </div>
        <div class="dodont-card dodont-dont">
          <div class="dodont-header">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            Don't
          </div>
          <div class="dodont-preview">
            <div style="width: 100%; max-width: 280px;">
              <atman-input placeholder="Email"></atman-input>
            </div>
          </div>
          <div class="dodont-caption">Don't rely on placeholder text as the only label — it disappears when the user starts typing.</div>
        </div>
      </div>
      <div class="dodont-grid">
        <div class="dodont-card dodont-do">
          <div class="dodont-header">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
            Do
          </div>
          <div class="dodont-preview">
            <div style="width: 100%; max-width: 280px;">
              <atman-input label="Password" type="password" error="Password must be at least 8 characters"></atman-input>
            </div>
          </div>
          <div class="dodont-caption">Show specific, helpful error messages that explain exactly how to fix the issue.</div>
        </div>
        <div class="dodont-card dodont-dont">
          <div class="dodont-header">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            Don't
          </div>
          <div class="dodont-preview">
            <div style="width: 100%; max-width: 280px;">
              <atman-input label="Password" type="password" error="Invalid input"></atman-input>
            </div>
          </div>
          <div class="dodont-caption">Avoid generic error messages that don't help the user understand the problem.</div>
        </div>
      </div>
    </div>
  `,
};
