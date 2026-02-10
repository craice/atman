import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import './breadcrumb.js';

const meta: Meta = {
  title: 'Components/Navigation/Breadcrumb',
  component: 'atman-breadcrumb',
  tags: ['autodocs', 'stable'],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => html`
    <atman-breadcrumb>
      <atman-breadcrumb-item href="#">Home</atman-breadcrumb-item>
      <atman-breadcrumb-item href="#">Products</atman-breadcrumb-item>
      <atman-breadcrumb-item href="#">Category</atman-breadcrumb-item>
      <atman-breadcrumb-item current>Current Page</atman-breadcrumb-item>
    </atman-breadcrumb>
  `,
};

export const TwoItems: Story = {
  render: () => html`
    <atman-breadcrumb>
      <atman-breadcrumb-item href="#">Home</atman-breadcrumb-item>
      <atman-breadcrumb-item current>Dashboard</atman-breadcrumb-item>
    </atman-breadcrumb>
  `,
};

export const ManyItems: Story = {
  render: () => html`
    <atman-breadcrumb>
      <atman-breadcrumb-item href="#">Home</atman-breadcrumb-item>
      <atman-breadcrumb-item href="#">Settings</atman-breadcrumb-item>
      <atman-breadcrumb-item href="#">Account</atman-breadcrumb-item>
      <atman-breadcrumb-item href="#">Security</atman-breadcrumb-item>
      <atman-breadcrumb-item href="#">Two-Factor Auth</atman-breadcrumb-item>
      <atman-breadcrumb-item current>Setup</atman-breadcrumb-item>
    </atman-breadcrumb>
  `,
};

export const WithIcons: Story = {
  render: () => html`
    <atman-breadcrumb>
      <atman-breadcrumb-item href="#">
        <span style="display: inline-flex; align-items: center; gap: 4px;">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            <polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
          Home
        </span>
      </atman-breadcrumb-item>
      <atman-breadcrumb-item href="#">Documents</atman-breadcrumb-item>
      <atman-breadcrumb-item current>Report.pdf</atman-breadcrumb-item>
    </atman-breadcrumb>
  `,
};
