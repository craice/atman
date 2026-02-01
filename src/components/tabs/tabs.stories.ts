import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import './tabs.js';

const meta: Meta = {
  title: 'Components/Layout/Tabs',
  component: 'atman-tabs',
  tags: ['autodocs', 'stable'],
  argTypes: {
    value: {
      control: 'text',
      description: 'The currently selected tab value',
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => html`
    <atman-tabs value="tab1">
      <atman-tab slot="tab" value="tab1">Tab 1</atman-tab>
      <atman-tab slot="tab" value="tab2">Tab 2</atman-tab>
      <atman-tab slot="tab" value="tab3">Tab 3</atman-tab>

      <atman-tab-panel value="tab1">
        <p>Content for Tab 1</p>
      </atman-tab-panel>
      <atman-tab-panel value="tab2">
        <p>Content for Tab 2</p>
      </atman-tab-panel>
      <atman-tab-panel value="tab3">
        <p>Content for Tab 3</p>
      </atman-tab-panel>
    </atman-tabs>
  `,
};

export const WithIcons: Story = {
  render: () => html`
    <atman-tabs value="account">
      <atman-tab slot="tab" value="account">
        <svg slot="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
        Account
      </atman-tab>
      <atman-tab slot="tab" value="security">
        <svg slot="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
        </svg>
        Security
      </atman-tab>
      <atman-tab slot="tab" value="notifications">
        <svg slot="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/>
          <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>
        </svg>
        Notifications
      </atman-tab>

      <atman-tab-panel value="account">
        <h3 style="margin: 0 0 16px; font-size: var(--atman-font-size-lg);">Account Settings</h3>
        <p style="color: var(--atman-color-text-secondary);">Manage your account information and preferences.</p>
      </atman-tab-panel>
      <atman-tab-panel value="security">
        <h3 style="margin: 0 0 16px; font-size: var(--atman-font-size-lg);">Security Settings</h3>
        <p style="color: var(--atman-color-text-secondary);">Update your password and security preferences.</p>
      </atman-tab-panel>
      <atman-tab-panel value="notifications">
        <h3 style="margin: 0 0 16px; font-size: var(--atman-font-size-lg);">Notification Preferences</h3>
        <p style="color: var(--atman-color-text-secondary);">Control how you receive notifications.</p>
      </atman-tab-panel>
    </atman-tabs>
  `,
};

export const DisabledTab: Story = {
  render: () => html`
    <atman-tabs value="tab1">
      <atman-tab slot="tab" value="tab1">Active</atman-tab>
      <atman-tab slot="tab" value="tab2" disabled>Disabled</atman-tab>
      <atman-tab slot="tab" value="tab3">Another Tab</atman-tab>

      <atman-tab-panel value="tab1">
        <p>This tab is active. The second tab is disabled and cannot be selected.</p>
      </atman-tab-panel>
      <atman-tab-panel value="tab2">
        <p>You shouldn't see this content.</p>
      </atman-tab-panel>
      <atman-tab-panel value="tab3">
        <p>Content for the third tab.</p>
      </atman-tab-panel>
    </atman-tabs>
  `,
};

export const ManyTabs: Story = {
  render: () => html`
    <atman-tabs value="tab1">
      ${Array.from({ length: 8 }, (_, i) => html`
        <atman-tab slot="tab" value="tab${i + 1}">Tab ${i + 1}</atman-tab>
      `)}
      ${Array.from({ length: 8 }, (_, i) => html`
        <atman-tab-panel value="tab${i + 1}">
          <p>Content for Tab ${i + 1}</p>
        </atman-tab-panel>
      `)}
    </atman-tabs>
  `,
};

export const WithRichContent: Story = {
  render: () => html`
    <atman-tabs value="overview">
      <atman-tab slot="tab" value="overview">Overview</atman-tab>
      <atman-tab slot="tab" value="analytics">Analytics</atman-tab>
      <atman-tab slot="tab" value="reports">Reports</atman-tab>

      <atman-tab-panel value="overview">
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;">
          <atman-card>
            <p style="margin: 0 0 4px; color: var(--atman-color-text-secondary); font-size: var(--atman-font-size-sm);">
              Total Users
            </p>
            <p style="margin: 0; font-size: var(--atman-font-size-2xl); font-weight: var(--atman-font-weight-bold);">
              12,345
            </p>
          </atman-card>
          <atman-card>
            <p style="margin: 0 0 4px; color: var(--atman-color-text-secondary); font-size: var(--atman-font-size-sm);">
              Revenue
            </p>
            <p style="margin: 0; font-size: var(--atman-font-size-2xl); font-weight: var(--atman-font-weight-bold);">
              $54,321
            </p>
          </atman-card>
          <atman-card>
            <p style="margin: 0 0 4px; color: var(--atman-color-text-secondary); font-size: var(--atman-font-size-sm);">
              Conversion
            </p>
            <p style="margin: 0; font-size: var(--atman-font-size-2xl); font-weight: var(--atman-font-weight-bold);">
              3.2%
            </p>
          </atman-card>
        </div>
      </atman-tab-panel>
      <atman-tab-panel value="analytics">
        <atman-alert variant="info" alert-title="Analytics Dashboard">
          Your analytics data is being processed. Check back in a few minutes.
        </atman-alert>
      </atman-tab-panel>
      <atman-tab-panel value="reports">
        <div style="display: flex; flex-direction: column; gap: 12px;">
          <div style="display: flex; align-items: center; justify-content: space-between; padding: 12px; background: var(--atman-color-background-subtle); border-radius: var(--atman-radius-md);">
            <span>Monthly Report - January 2024</span>
            <atman-button variant="ghost" size="sm">Download</atman-button>
          </div>
          <div style="display: flex; align-items: center; justify-content: space-between; padding: 12px; background: var(--atman-color-background-subtle); border-radius: var(--atman-radius-md);">
            <span>Monthly Report - December 2023</span>
            <atman-button variant="ghost" size="sm">Download</atman-button>
          </div>
          <div style="display: flex; align-items: center; justify-content: space-between; padding: 12px; background: var(--atman-color-background-subtle); border-radius: var(--atman-radius-md);">
            <span>Monthly Report - November 2023</span>
            <atman-button variant="ghost" size="sm">Download</atman-button>
          </div>
        </div>
      </atman-tab-panel>
    </atman-tabs>
  `,
};

export const FormInTabs: Story = {
  render: () => html`
    <atman-card style="max-width: 500px;">
      <atman-tabs value="login">
        <atman-tab slot="tab" value="login">Login</atman-tab>
        <atman-tab slot="tab" value="register">Register</atman-tab>

        <atman-tab-panel value="login">
          <form style="display: flex; flex-direction: column; gap: 16px;" @submit=${(e: Event) => e.preventDefault()}>
            <atman-input label="Email" type="email" placeholder="you@example.com" required></atman-input>
            <atman-input label="Password" type="password" placeholder="••••••••" required></atman-input>
            <atman-checkbox>Remember me</atman-checkbox>
            <atman-button variant="primary" type="submit">Sign In</atman-button>
          </form>
        </atman-tab-panel>
        <atman-tab-panel value="register">
          <form style="display: flex; flex-direction: column; gap: 16px;" @submit=${(e: Event) => e.preventDefault()}>
            <atman-input label="Name" placeholder="John Doe" required></atman-input>
            <atman-input label="Email" type="email" placeholder="you@example.com" required></atman-input>
            <atman-input label="Password" type="password" placeholder="••••••••" required></atman-input>
            <atman-input label="Confirm Password" type="password" placeholder="••••••••" required></atman-input>
            <atman-checkbox>I agree to the Terms of Service</atman-checkbox>
            <atman-button variant="primary" type="submit">Create Account</atman-button>
          </form>
        </atman-tab-panel>
      </atman-tabs>
    </atman-card>
  `,
};
