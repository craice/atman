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

export const DoAndDont: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Best practices for designing modal dialogs.',
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
      .dodont-preview { padding: 32px; background: var(--atman-color-background, #FFFFFF); display: flex; align-items: center; justify-content: center; min-height: 160px; }
      .dodont-caption { padding: 16px; background: var(--atman-color-background-subtle, #F5F5F5); font-size: 14px; color: var(--atman-color-text-secondary, #616161); line-height: 1.5; }
      .mock-modal { border: 1px solid var(--atman-color-border, #E0E0E0); border-radius: 12px; padding: 24px; width: 100%; max-width: 320px; background: var(--atman-color-surface, #FFFFFF); box-shadow: 0 4px 24px rgba(0,0,0,0.12); }
      .mock-modal-title { font-weight: 600; font-size: 16px; color: var(--atman-color-text, #212121); margin: 0 0 8px; }
      .mock-modal-body { font-size: 14px; color: var(--atman-color-text-secondary, #616161); margin: 0 0 20px; }
      .mock-modal-footer { display: flex; gap: 8px; justify-content: flex-end; }
    </style>
    <div class="dodont-grid">
      <div class="dodont-card dodont-do">
        <div class="dodont-header">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
          Do
        </div>
        <div class="dodont-preview">
          <div class="mock-modal">
            <p class="mock-modal-title">Delete item?</p>
            <p class="mock-modal-body">This action cannot be undone. The file will be permanently deleted.</p>
            <div class="mock-modal-footer">
              <atman-button variant="ghost" size="sm">Cancel</atman-button>
              <atman-button variant="destructive" size="sm">Delete</atman-button>
            </div>
          </div>
        </div>
        <div class="dodont-caption">Use clear titles, explain consequences, and provide an obvious cancel option.</div>
      </div>
      <div class="dodont-card dodont-dont">
        <div class="dodont-header">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          Don't
        </div>
        <div class="dodont-preview">
          <div class="mock-modal">
            <p class="mock-modal-title">Are you sure?</p>
            <div class="mock-modal-footer">
              <atman-button variant="primary" size="sm">Yes</atman-button>
              <atman-button variant="primary" size="sm">No</atman-button>
            </div>
          </div>
        </div>
        <div class="dodont-caption">Avoid vague titles and Yes/No buttons — they don't clearly describe what the action does.</div>
      </div>
    </div>
  `,
};
