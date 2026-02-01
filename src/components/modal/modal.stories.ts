import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import './modal.js';

const meta: Meta = {
  title: 'Components/Layout/Modal',
  component: 'atman-modal',
  tags: ['autodocs', 'stable'],
  parameters: {
    status: { type: 'stable' },
  },
  argTypes: {
    open: {
      control: 'boolean',
      description: 'Whether the modal is open',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'full'],
      description: 'The size of the modal',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    modalTitle: {
      control: 'text',
      description: 'The modal title',
    },
    closeOnBackdrop: {
      control: 'boolean',
      description: 'Whether to close on backdrop click',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    closeOnEscape: {
      control: 'boolean',
      description: 'Whether to close on escape key',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    showClose: {
      control: 'boolean',
      description: 'Whether to show the close button',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
  },
  args: {
    open: false,
    size: 'md',
    closeOnBackdrop: true,
    closeOnEscape: true,
    showClose: true,
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => {
    const openModal = () => {
      const modal = document.querySelector('atman-modal');
      if (modal) modal.open = true;
    };

    return html`
      <atman-button variant="primary" @click=${openModal}>Open Modal</atman-button>

      <atman-modal modal-title="Modal Title">
        <p>This is the modal content. You can put any content here.</p>
        <div slot="footer">
          <atman-button variant="ghost" @click=${() => {
            const modal = document.querySelector('atman-modal');
            if (modal) modal.open = false;
          }}>Cancel</atman-button>
          <atman-button variant="primary" @click=${() => {
            const modal = document.querySelector('atman-modal');
            if (modal) modal.open = false;
          }}>Confirm</atman-button>
        </div>
      </atman-modal>
    `;
  },
};

export const Sizes: Story = {
  render: () => {
    const openModal = (size: string) => {
      const modal = document.querySelector(`atman-modal[data-size="${size}"]`) as any;
      if (modal) modal.open = true;
    };

    const closeModal = (size: string) => {
      const modal = document.querySelector(`atman-modal[data-size="${size}"]`) as any;
      if (modal) modal.open = false;
    };

    return html`
      <div style="display: flex; gap: 8px; flex-wrap: wrap;">
        <atman-button variant="secondary" @click=${() => openModal('sm')}>Small</atman-button>
        <atman-button variant="secondary" @click=${() => openModal('md')}>Medium</atman-button>
        <atman-button variant="secondary" @click=${() => openModal('lg')}>Large</atman-button>
        <atman-button variant="secondary" @click=${() => openModal('full')}>Full</atman-button>
      </div>

      <atman-modal data-size="sm" size="sm" modal-title="Small Modal">
        <p>This is a small modal.</p>
        <div slot="footer">
          <atman-button variant="primary" @click=${() => closeModal('sm')}>Close</atman-button>
        </div>
      </atman-modal>

      <atman-modal data-size="md" size="md" modal-title="Medium Modal">
        <p>This is a medium modal (default size).</p>
        <div slot="footer">
          <atman-button variant="primary" @click=${() => closeModal('md')}>Close</atman-button>
        </div>
      </atman-modal>

      <atman-modal data-size="lg" size="lg" modal-title="Large Modal">
        <p>This is a large modal with more space for content.</p>
        <div slot="footer">
          <atman-button variant="primary" @click=${() => closeModal('lg')}>Close</atman-button>
        </div>
      </atman-modal>

      <atman-modal data-size="full" size="full" modal-title="Full Width Modal">
        <p>This is a full-width modal that takes up most of the screen.</p>
        <div slot="footer">
          <atman-button variant="primary" @click=${() => closeModal('full')}>Close</atman-button>
        </div>
      </atman-modal>
    `;
  },
};

export const FormModal: Story = {
  render: () => {
    const openModal = () => {
      const modal = document.querySelector('#form-modal') as any;
      if (modal) modal.open = true;
    };

    const closeModal = () => {
      const modal = document.querySelector('#form-modal') as any;
      if (modal) modal.open = false;
    };

    return html`
      <atman-button variant="primary" @click=${openModal}>Edit Profile</atman-button>

      <atman-modal id="form-modal" modal-title="Edit Profile">
        <form style="display: flex; flex-direction: column; gap: 16px;" @submit=${(e: Event) => {
          e.preventDefault();
          closeModal();
        }}>
          <atman-input label="Name" value="John Doe"></atman-input>
          <atman-input label="Email" type="email" value="john@example.com"></atman-input>
          <atman-input label="Bio" placeholder="Tell us about yourself"></atman-input>
        </form>
        <div slot="footer">
          <atman-button variant="ghost" @click=${closeModal}>Cancel</atman-button>
          <atman-button variant="primary" @click=${closeModal}>Save Changes</atman-button>
        </div>
      </atman-modal>
    `;
  },
};

export const ConfirmationModal: Story = {
  render: () => {
    const openModal = () => {
      const modal = document.querySelector('#confirm-modal') as any;
      if (modal) modal.open = true;
    };

    const closeModal = () => {
      const modal = document.querySelector('#confirm-modal') as any;
      if (modal) modal.open = false;
    };

    return html`
      <atman-button variant="destructive" @click=${openModal}>Delete Account</atman-button>

      <atman-modal id="confirm-modal" size="sm" modal-title="Delete Account?">
        <p style="color: var(--atman-color-text-secondary);">
          This action cannot be undone. All your data will be permanently removed from our servers.
        </p>
        <div slot="footer">
          <atman-button variant="ghost" @click=${closeModal}>Cancel</atman-button>
          <atman-button variant="destructive" @click=${closeModal}>Delete</atman-button>
        </div>
      </atman-modal>
    `;
  },
};

export const ScrollableContent: Story = {
  render: () => {
    const openModal = () => {
      const modal = document.querySelector('#scroll-modal') as any;
      if (modal) modal.open = true;
    };

    const closeModal = () => {
      const modal = document.querySelector('#scroll-modal') as any;
      if (modal) modal.open = false;
    };

    return html`
      <atman-button variant="primary" @click=${openModal}>Terms & Conditions</atman-button>

      <atman-modal id="scroll-modal" modal-title="Terms and Conditions">
        <div style="display: flex; flex-direction: column; gap: 16px;">
          ${Array.from({ length: 10 }, (_, i) => html`
            <div>
              <h3 style="margin: 0 0 8px; font-size: var(--atman-font-size-md); font-weight: var(--atman-font-weight-semibold);">
                Section ${i + 1}
              </h3>
              <p style="margin: 0; color: var(--atman-color-text-secondary);">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
              </p>
            </div>
          `)}
        </div>
        <div slot="footer">
          <atman-button variant="ghost" @click=${closeModal}>Decline</atman-button>
          <atman-button variant="primary" @click=${closeModal}>Accept</atman-button>
        </div>
      </atman-modal>
    `;
  },
};

export const CustomHeader: Story = {
  render: () => {
    const openModal = () => {
      const modal = document.querySelector('#custom-header-modal') as any;
      if (modal) modal.open = true;
    };

    const closeModal = () => {
      const modal = document.querySelector('#custom-header-modal') as any;
      if (modal) modal.open = false;
    };

    return html`
      <atman-button variant="primary" @click=${openModal}>Open Modal</atman-button>

      <atman-modal id="custom-header-modal">
        <div slot="header" style="display: flex; align-items: center; gap: 12px;">
          <atman-avatar src="https://i.pravatar.cc/150?img=1" size="sm"></atman-avatar>
          <div>
            <div style="font-weight: var(--atman-font-weight-semibold);">New Message</div>
            <div style="font-size: var(--atman-font-size-sm); color: var(--atman-color-text-secondary);">
              From John Doe
            </div>
          </div>
        </div>
        <p>Hey! Just wanted to check in and see how the project is going.</p>
        <div slot="footer">
          <atman-button variant="ghost" @click=${closeModal}>Close</atman-button>
          <atman-button variant="primary" @click=${closeModal}>Reply</atman-button>
        </div>
      </atman-modal>
    `;
  },
};

export const NoCloseButton: Story = {
  render: () => {
    const openModal = () => {
      const modal = document.querySelector('#no-close-modal') as any;
      if (modal) modal.open = true;
    };

    const closeModal = () => {
      const modal = document.querySelector('#no-close-modal') as any;
      if (modal) modal.open = false;
    };

    return html`
      <atman-button variant="primary" @click=${openModal}>Important Notice</atman-button>

      <atman-modal
        id="no-close-modal"
        size="sm"
        modal-title="Important Notice"
        ?show-close=${false}
        ?close-on-backdrop=${false}
        ?close-on-escape=${false}
      >
        <p>You must acknowledge this notice before continuing.</p>
        <div slot="footer">
          <atman-button variant="primary" @click=${closeModal}>I Understand</atman-button>
        </div>
      </atman-modal>
    `;
  },
};
