import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../../components/card/card.js';
import '../../components/tabs/tabs.js';
import '../../components/input/input.js';
import '../../components/select/select.js';
import '../../components/checkbox/checkbox.js';
import '../../components/radio/radio.js';
import '../../components/button/button.js';
import '../../components/divider/divider.js';
import '../../components/avatar/avatar.js';
import '../../components/badge/badge.js';
import '../../components/alert/alert.js';

const meta: Meta = {
  title: 'Examples/Settings Page',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A settings page layout demonstrating tabs, forms, and various controls.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => html`
    <div style="max-width: 800px; margin: 0 auto;">
      <div style="margin-bottom: 32px;">
        <h1 style="margin: 0 0 8px; font-size: 28px; font-weight: 600;">Settings</h1>
        <p style="margin: 0; color: var(--atman-color-text-secondary);">Manage your account settings and preferences.</p>
      </div>

      <atman-tabs>
        <atman-tab slot="tab" value="profile" selected>Profile</atman-tab>
        <atman-tab slot="tab" value="notifications">Notifications</atman-tab>
        <atman-tab slot="tab" value="security">Security</atman-tab>

        <atman-tab-panel slot="panel" value="profile">
          <atman-card>
            <h3 slot="header" style="margin: 0; font-size: 18px; font-weight: 600;">Profile Information</h3>

            <div style="display: flex; gap: 24px; margin-bottom: 24px;">
              <atman-avatar size="xl" src="https://i.pravatar.cc/150?img=3"></atman-avatar>
              <div style="display: flex; flex-direction: column; justify-content: center; gap: 8px;">
                <atman-button variant="secondary" size="sm">Change Photo</atman-button>
                <atman-button variant="ghost" size="sm">Remove</atman-button>
              </div>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
              <atman-input label="First Name" value="John"></atman-input>
              <atman-input label="Last Name" value="Doe"></atman-input>
              <atman-input label="Email" type="email" value="john@example.com" style="grid-column: span 2;"></atman-input>
              <atman-input label="Phone" type="tel" placeholder="+1 (555) 000-0000"></atman-input>
              <atman-select label="Timezone">
                <option value="utc">UTC</option>
                <option value="est" selected>Eastern Time (ET)</option>
                <option value="pst">Pacific Time (PT)</option>
              </atman-select>
            </div>

            <div slot="footer" style="display: flex; justify-content: flex-end; gap: 12px;">
              <atman-button variant="ghost">Cancel</atman-button>
              <atman-button variant="primary">Save Changes</atman-button>
            </div>
          </atman-card>
        </atman-tab-panel>

        <atman-tab-panel slot="panel" value="notifications">
          <atman-card>
            <h3 slot="header" style="margin: 0; font-size: 18px; font-weight: 600;">Notification Preferences</h3>

            <div style="display: flex; flex-direction: column; gap: 20px;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <div>
                  <p style="margin: 0 0 4px; font-weight: 500;">Email Notifications</p>
                  <p style="margin: 0; font-size: 14px; color: var(--atman-color-text-secondary);">Receive email updates about your account</p>
                </div>
                <atman-checkbox checked></atman-checkbox>
              </div>

              <atman-divider></atman-divider>

              <div style="display: flex; justify-content: space-between; align-items: center;">
                <div>
                  <p style="margin: 0 0 4px; font-weight: 500;">Push Notifications</p>
                  <p style="margin: 0; font-size: 14px; color: var(--atman-color-text-secondary);">Receive push notifications on your devices</p>
                </div>
                <atman-checkbox checked></atman-checkbox>
              </div>

              <atman-divider></atman-divider>

              <div style="display: flex; justify-content: space-between; align-items: center;">
                <div>
                  <p style="margin: 0 0 4px; font-weight: 500;">Marketing Emails</p>
                  <p style="margin: 0; font-size: 14px; color: var(--atman-color-text-secondary);">Receive emails about new features and updates</p>
                </div>
                <atman-checkbox></atman-checkbox>
              </div>

              <atman-divider></atman-divider>

              <div>
                <p style="margin: 0 0 12px; font-weight: 500;">Notification Frequency</p>
                <atman-radio-group value="daily">
                  <atman-radio value="realtime">Real-time</atman-radio>
                  <atman-radio value="daily">Daily digest</atman-radio>
                  <atman-radio value="weekly">Weekly digest</atman-radio>
                </atman-radio-group>
              </div>
            </div>

            <div slot="footer" style="display: flex; justify-content: flex-end; gap: 12px;">
              <atman-button variant="primary">Save Preferences</atman-button>
            </div>
          </atman-card>
        </atman-tab-panel>

        <atman-tab-panel slot="panel" value="security">
          <div style="display: flex; flex-direction: column; gap: 24px;">
            <atman-card>
              <h3 slot="header" style="margin: 0; font-size: 18px; font-weight: 600;">Change Password</h3>

              <div style="display: flex; flex-direction: column; gap: 16px;">
                <atman-input label="Current Password" type="password"></atman-input>
                <atman-input label="New Password" type="password"></atman-input>
                <atman-input label="Confirm New Password" type="password"></atman-input>
              </div>

              <div slot="footer" style="display: flex; justify-content: flex-end;">
                <atman-button variant="primary">Update Password</atman-button>
              </div>
            </atman-card>

            <atman-card>
              <h3 slot="header" style="margin: 0; font-size: 18px; font-weight: 600; display: flex; align-items: center; gap: 8px;">
                Two-Factor Authentication
                <atman-badge variant="success">Enabled</atman-badge>
              </h3>

              <p style="margin: 0 0 16px; color: var(--atman-color-text-secondary);">
                Two-factor authentication adds an extra layer of security to your account.
              </p>

              <atman-button variant="secondary">Manage 2FA</atman-button>
            </atman-card>

            <atman-card>
              <h3 slot="header" style="margin: 0; font-size: 18px; font-weight: 600; color: var(--atman-color-destructive);">Danger Zone</h3>

              <atman-alert variant="warning">
                Once you delete your account, there is no going back. Please be certain.
              </atman-alert>

              <div slot="footer">
                <atman-button variant="destructive">Delete Account</atman-button>
              </div>
            </atman-card>
          </div>
        </atman-tab-panel>
      </atman-tabs>
    </div>
  `,
};
