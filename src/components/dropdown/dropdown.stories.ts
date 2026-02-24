import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import './dropdown.js';

const meta: Meta = {
  title: 'Components/Navigation/Dropdown',
  component: 'atman-dropdown',
  tags: ['autodocs', 'stable'],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => html`
    <div style="padding-bottom: 180px;">
      <atman-dropdown>
        <atman-button slot="trigger" variant="secondary">Options</atman-button>
        <atman-menu-item value="edit">Edit</atman-menu-item>
        <atman-menu-item value="duplicate">Duplicate</atman-menu-item>
        <atman-menu-item value="archive">Archive</atman-menu-item>
        <atman-menu-item type="divider"></atman-menu-item>
        <atman-menu-item value="delete">Delete</atman-menu-item>
      </atman-dropdown>
    </div>
  `,
};

export const WithIcons: Story = {
  render: () => html`
    <div style="padding-bottom: 180px;">
      <atman-dropdown>
        <atman-button slot="trigger" variant="secondary">Actions</atman-button>
        <atman-menu-item value="edit">
          <svg slot="icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
          </svg>
          Edit
        </atman-menu-item>
        <atman-menu-item value="copy">
          <svg slot="icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
          </svg>
          Copy
        </atman-menu-item>
        <atman-menu-item type="divider"></atman-menu-item>
        <atman-menu-item value="delete">
          <svg slot="icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
          </svg>
          Delete
        </atman-menu-item>
      </atman-dropdown>
    </div>
  `,
};

export const WithDisabledItems: Story = {
  render: () => html`
    <div style="padding-bottom: 180px;">
      <atman-dropdown>
        <atman-button slot="trigger" variant="secondary">Menu</atman-button>
        <atman-menu-item value="view">View</atman-menu-item>
        <atman-menu-item value="edit" disabled>Edit (no permission)</atman-menu-item>
        <atman-menu-item value="share">Share</atman-menu-item>
        <atman-menu-item value="delete" disabled>Delete (no permission)</atman-menu-item>
      </atman-dropdown>
    </div>
  `,
};

export const ProfileMenu: Story = {
  render: () => html`
    <div style="padding-bottom: 200px;">
      <atman-dropdown>
        <atman-button slot="trigger" variant="ghost">
          <span style="display: flex; align-items: center; gap: 8px;">
            <atman-avatar size="sm" initials="JD"></atman-avatar>
            John Doe
          </span>
        </atman-button>
        <atman-menu-item value="profile">Profile</atman-menu-item>
        <atman-menu-item value="settings">Settings</atman-menu-item>
        <atman-menu-item value="billing">Billing</atman-menu-item>
        <atman-menu-item type="divider"></atman-menu-item>
        <atman-menu-item value="logout">Log out</atman-menu-item>
      </atman-dropdown>
    </div>
  `,
};
