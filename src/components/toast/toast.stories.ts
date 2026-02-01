import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import './toast.js';
import './toast-container.js';
import { toast } from './toast-container.js';

const meta: Meta = {
  title: 'Components/Feedback/Toast',
  component: 'atman-toast',
  tags: ['autodocs', 'stable'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'success', 'warning', 'error'],
      description: 'The visual style of the toast',
      table: {
        defaultValue: { summary: 'info' },
      },
    },
    toastTitle: {
      control: 'text',
      description: 'The toast title',
    },
    description: {
      control: 'text',
      description: 'The toast description',
    },
    duration: {
      control: 'number',
      description: 'Auto-dismiss duration in ms (0 = no auto-dismiss)',
      table: {
        defaultValue: { summary: '5000' },
      },
    },
    actionLabel: {
      control: 'text',
      description: 'Action button label',
    },
  },
  args: {
    variant: 'info',
    duration: 0, // Disable auto-dismiss for stories
  },
};

export default meta;
type Story = StoryObj;

export const Info: Story = {
  args: {
    variant: 'info',
    toastTitle: 'Information',
    description: 'This is an informational message.',
  },
  render: (args) => html`
    <atman-toast
      variant=${args.variant}
      toast-title=${args.toastTitle}
      description=${args.description}
      duration=${args.duration}
      action-label=${args.actionLabel || ''}
    ></atman-toast>
  `,
};

export const Success: Story = {
  args: {
    variant: 'success',
    toastTitle: 'Success',
    description: 'Your changes have been saved.',
  },
  render: (args) => html`
    <atman-toast
      variant=${args.variant}
      toast-title=${args.toastTitle}
      description=${args.description}
      duration=${args.duration}
    ></atman-toast>
  `,
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    toastTitle: 'Warning',
    description: 'Please review before continuing.',
  },
  render: (args) => html`
    <atman-toast
      variant=${args.variant}
      toast-title=${args.toastTitle}
      description=${args.description}
      duration=${args.duration}
    ></atman-toast>
  `,
};

export const Error: Story = {
  args: {
    variant: 'error',
    toastTitle: 'Error',
    description: 'Something went wrong. Please try again.',
  },
  render: (args) => html`
    <atman-toast
      variant=${args.variant}
      toast-title=${args.toastTitle}
      description=${args.description}
      duration=${args.duration}
    ></atman-toast>
  `,
};

export const AllVariants: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 12px;">
      <atman-toast variant="info" toast-title="Information" description="This is an informational message." duration="0"></atman-toast>
      <atman-toast variant="success" toast-title="Success" description="Your changes have been saved." duration="0"></atman-toast>
      <atman-toast variant="warning" toast-title="Warning" description="Please review before continuing." duration="0"></atman-toast>
      <atman-toast variant="error" toast-title="Error" description="Something went wrong." duration="0"></atman-toast>
    </div>
  `,
};

export const WithAction: Story = {
  render: () => html`
    <atman-toast
      variant="info"
      toast-title="New update available"
      description="A new version is ready to install."
      action-label="Update now"
      duration="0"
      @atman-action=${() => console.log('Action clicked')}
    ></atman-toast>
  `,
};

export const TitleOnly: Story = {
  render: () => html`
    <atman-toast variant="success" toast-title="File uploaded successfully" duration="0"></atman-toast>
  `,
};

export const DescriptionOnly: Story = {
  render: () => html`
    <atman-toast variant="info" description="Your session will expire in 5 minutes." duration="0"></atman-toast>
  `,
};

export const ToastContainer: Story = {
  render: () => {
    const showToast = (variant: 'info' | 'success' | 'warning' | 'error') => {
      const messages = {
        info: { title: 'Information', description: 'This is an informational message.' },
        success: { title: 'Success', description: 'Your action was completed successfully.' },
        warning: { title: 'Warning', description: 'Please review your changes.' },
        error: { title: 'Error', description: 'Something went wrong. Please try again.' },
      };

      toast({
        variant,
        title: messages[variant].title,
        description: messages[variant].description,
      });
    };

    return html`
      <atman-toast-container position="top-right"></atman-toast-container>

      <div style="display: flex; gap: 8px; flex-wrap: wrap;">
        <atman-button variant="secondary" @click=${() => showToast('info')}>Show Info</atman-button>
        <atman-button variant="secondary" @click=${() => showToast('success')}>Show Success</atman-button>
        <atman-button variant="secondary" @click=${() => showToast('warning')}>Show Warning</atman-button>
        <atman-button variant="secondary" @click=${() => showToast('error')}>Show Error</atman-button>
      </div>
    `;
  },
};

export const ToastWithAction: Story = {
  render: () => {
    const showToastWithAction = () => {
      toast({
        variant: 'info',
        title: 'New message',
        description: 'You have a new message from John.',
        actionLabel: 'View',
        onAction: () => console.log('View clicked'),
      });
    };

    return html`
      <atman-toast-container position="top-right"></atman-toast-container>
      <atman-button variant="primary" @click=${showToastWithAction}>Show Toast with Action</atman-button>
    `;
  },
};

export const ToastPositions: Story = {
  render: () => html`
    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; max-width: 500px;">
      <atman-button variant="secondary" size="sm" @click=${() => {
        const container = document.querySelector('atman-toast-container');
        if (container) container.position = 'top-left';
        toast({ variant: 'info', title: 'Top Left', description: 'Position: top-left' });
      }}>Top Left</atman-button>
      <atman-button variant="secondary" size="sm" @click=${() => {
        const container = document.querySelector('atman-toast-container');
        if (container) container.position = 'top-center';
        toast({ variant: 'info', title: 'Top Center', description: 'Position: top-center' });
      }}>Top Center</atman-button>
      <atman-button variant="secondary" size="sm" @click=${() => {
        const container = document.querySelector('atman-toast-container');
        if (container) container.position = 'top-right';
        toast({ variant: 'info', title: 'Top Right', description: 'Position: top-right' });
      }}>Top Right</atman-button>
      <atman-button variant="secondary" size="sm" @click=${() => {
        const container = document.querySelector('atman-toast-container');
        if (container) container.position = 'bottom-left';
        toast({ variant: 'info', title: 'Bottom Left', description: 'Position: bottom-left' });
      }}>Bottom Left</atman-button>
      <atman-button variant="secondary" size="sm" @click=${() => {
        const container = document.querySelector('atman-toast-container');
        if (container) container.position = 'bottom-center';
        toast({ variant: 'info', title: 'Bottom Center', description: 'Position: bottom-center' });
      }}>Bottom Center</atman-button>
      <atman-button variant="secondary" size="sm" @click=${() => {
        const container = document.querySelector('atman-toast-container');
        if (container) container.position = 'bottom-right';
        toast({ variant: 'info', title: 'Bottom Right', description: 'Position: bottom-right' });
      }}>Bottom Right</atman-button>
    </div>
    <atman-toast-container position="top-right"></atman-toast-container>
  `,
};
