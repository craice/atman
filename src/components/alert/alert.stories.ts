import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import './alert.js';

const meta: Meta = {
  title: 'Components/Feedback/Alert',
  component: 'atman-alert',
  tags: ['autodocs', 'stable'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'success', 'warning', 'error'],
      description: 'The visual style of the alert',
      table: {
        defaultValue: { summary: 'info' },
      },
    },
    alertTitle: {
      control: 'text',
      description: 'The alert title',
    },
    dismissible: {
      control: 'boolean',
      description: 'Whether the alert can be dismissed',
    },
  },
  args: {
    variant: 'info',
    dismissible: false,
  },
};

export default meta;
type Story = StoryObj;

export const Info: Story = {
  args: {
    variant: 'info',
    alertTitle: 'Information',
  },
  render: (args) => html`
    <atman-alert
      variant=${args.variant}
      alert-title=${args.alertTitle}
      ?dismissible=${args.dismissible}
    >
      This is an informational message for the user.
    </atman-alert>
  `,
};

export const Success: Story = {
  args: {
    variant: 'success',
    alertTitle: 'Success',
  },
  render: (args) => html`
    <atman-alert
      variant=${args.variant}
      alert-title=${args.alertTitle}
      ?dismissible=${args.dismissible}
    >
      Your changes have been saved successfully.
    </atman-alert>
  `,
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    alertTitle: 'Warning',
  },
  render: (args) => html`
    <atman-alert
      variant=${args.variant}
      alert-title=${args.alertTitle}
      ?dismissible=${args.dismissible}
    >
      Please review your settings before continuing.
    </atman-alert>
  `,
};

export const Error: Story = {
  args: {
    variant: 'error',
    alertTitle: 'Error',
  },
  render: (args) => html`
    <atman-alert
      variant=${args.variant}
      alert-title=${args.alertTitle}
      ?dismissible=${args.dismissible}
    >
      There was a problem processing your request. Please try again.
    </atman-alert>
  `,
};

export const AllVariants: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <atman-alert variant="info" alert-title="Information">
        This is an informational message for the user.
      </atman-alert>
      <atman-alert variant="success" alert-title="Success">
        Your changes have been saved successfully.
      </atman-alert>
      <atman-alert variant="warning" alert-title="Warning">
        Please review your settings before continuing.
      </atman-alert>
      <atman-alert variant="error" alert-title="Error">
        There was a problem processing your request.
      </atman-alert>
    </div>
  `,
};

export const Dismissible: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <atman-alert variant="info" alert-title="Dismissible Alert" dismissible>
        Click the X button to dismiss this alert.
      </atman-alert>
      <atman-alert variant="success" alert-title="Changes Saved" dismissible>
        Your profile has been updated successfully.
      </atman-alert>
    </div>
  `,
};

export const WithoutTitle: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <atman-alert variant="info">
        This is a simple informational message without a title.
      </atman-alert>
      <atman-alert variant="warning">
        Your session will expire in 5 minutes.
      </atman-alert>
    </div>
  `,
};

export const WithLongContent: Story = {
  render: () => html`
    <atman-alert variant="info" alert-title="Terms and Conditions Updated" dismissible>
      We've made some changes to our Terms of Service and Privacy Policy.
      These updates are effective immediately and apply to all users.
      Please take a moment to review the changes. If you have any questions,
      please contact our support team.
    </atman-alert>
  `,
};

export const WithCustomIcon: Story = {
  render: () => html`
    <atman-alert variant="info" alert-title="New Feature Available">
      <svg slot="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
      Check out our new dashboard feature!
    </atman-alert>
  `,
};

export const FormValidation: Story = {
  render: () => html`
    <form style="display: flex; flex-direction: column; gap: 16px; max-width: 400px;" @submit=${(e: Event) => e.preventDefault()}>
      <atman-alert variant="error" alert-title="Form has errors">
        Please fix the following errors before submitting:
        <ul style="margin: 8px 0 0 16px; padding: 0;">
          <li>Email address is required</li>
          <li>Password must be at least 8 characters</li>
        </ul>
      </atman-alert>

      <atman-input label="Email" type="email" error="Email address is required"></atman-input>
      <atman-input label="Password" type="password" error="Password must be at least 8 characters"></atman-input>

      <atman-button variant="primary" type="submit">Submit</atman-button>
    </form>
  `,
};

export const SystemStatus: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <atman-alert variant="success" alert-title="All Systems Operational">
        All services are running normally.
      </atman-alert>
      <atman-alert variant="warning" alert-title="Scheduled Maintenance">
        System maintenance is scheduled for tonight at 2:00 AM UTC.
      </atman-alert>
      <atman-alert variant="error" alert-title="Service Degradation">
        We are currently experiencing issues with the payment system. Our team is working on it.
      </atman-alert>
    </div>
  `,
};

export const DoAndDont: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Best practices for using alerts effectively.',
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
    <div class="dodont-grid">
      <div class="dodont-card dodont-do">
        <div class="dodont-header">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
          Do
        </div>
        <div class="dodont-preview">
          <atman-alert variant="success">Your profile has been updated successfully.</atman-alert>
        </div>
        <div class="dodont-caption">Use success alerts to confirm completed actions with a positive outcome.</div>
      </div>
      <div class="dodont-card dodont-dont">
        <div class="dodont-header">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          Don't
        </div>
        <div class="dodont-preview">
          <atman-alert variant="error">Your profile has been updated successfully.</atman-alert>
        </div>
        <div class="dodont-caption">Never use error styling for positive messages — it confuses users about the outcome.</div>
      </div>
    </div>
  `,
};
