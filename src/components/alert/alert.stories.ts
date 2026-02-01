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
