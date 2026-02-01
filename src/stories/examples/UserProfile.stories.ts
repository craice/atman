import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../../components/avatar/avatar.js';
import '../../components/button/button.js';
import '../../components/badge/badge.js';
import '../../components/card/card.js';
import '../../components/icon/icon.js';
import '../../components/tabs/tabs.js';
import '../../components/divider/divider.js';

const meta: Meta = {
  title: 'Examples/User Profile',
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj;

export const UserProfile: Story = {
  render: () => html`
    <style>
      .profile-container {
        max-width: 800px;
        margin: 0 auto;
        font-family: var(--atman-font-family, 'Geist', sans-serif);
      }

      .profile-header {
        display: flex;
        gap: 24px;
        align-items: flex-start;
        margin-bottom: 32px;
      }

      .profile-info {
        flex: 1;
      }

      .profile-name {
        font-size: 28px;
        font-weight: 700;
        color: var(--atman-color-text, #212121);
        margin: 0 0 4px;
      }

      .profile-role {
        font-size: 16px;
        color: var(--atman-color-text-secondary, #616161);
        margin: 0 0 12px;
      }

      .profile-stats {
        display: flex;
        gap: 24px;
        margin-top: 16px;
      }

      .stat {
        text-align: center;
      }

      .stat-value {
        font-size: 24px;
        font-weight: 700;
        color: var(--atman-color-text, #212121);
      }

      .stat-label {
        font-size: 13px;
        color: var(--atman-color-text-tertiary, #9E9E9E);
      }

      .profile-actions {
        display: flex;
        gap: 12px;
      }

      .profile-bio {
        color: var(--atman-color-text-secondary, #616161);
        line-height: 1.6;
        margin: 16px 0;
      }

      .profile-meta {
        display: flex;
        gap: 16px;
        flex-wrap: wrap;
      }

      .meta-item {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 14px;
        color: var(--atman-color-text-secondary, #616161);
      }

      .activity-item {
        display: flex;
        gap: 16px;
        padding: 16px 0;
        border-bottom: 1px solid var(--atman-color-border, #E0E0E0);
      }

      .activity-item:last-child {
        border-bottom: none;
      }

      .activity-content {
        flex: 1;
      }

      .activity-title {
        font-weight: 500;
        color: var(--atman-color-text, #212121);
        margin: 0 0 4px;
      }

      .activity-desc {
        font-size: 14px;
        color: var(--atman-color-text-secondary, #616161);
        margin: 0;
      }

      .activity-time {
        font-size: 13px;
        color: var(--atman-color-text-tertiary, #9E9E9E);
      }
    </style>

    <div class="profile-container">
      <div class="profile-header">
        <atman-avatar size="xl" name="Sarah Chen" src="https://i.pravatar.cc/150?img=47"></atman-avatar>

        <div class="profile-info">
          <div style="display: flex; align-items: center; gap: 12px;">
            <h1 class="profile-name">Sarah Chen</h1>
            <atman-badge variant="success">Pro</atman-badge>
          </div>
          <p class="profile-role">Senior Product Designer at TechCorp</p>

          <div class="profile-meta">
            <span class="meta-item">
              <atman-icon name="map-pin" size="sm"></atman-icon>
              San Francisco, CA
            </span>
            <span class="meta-item">
              <atman-icon name="link" size="sm"></atman-icon>
              sarahchen.design
            </span>
            <span class="meta-item">
              <atman-icon name="calendar" size="sm"></atman-icon>
              Joined March 2022
            </span>
          </div>

          <div class="profile-stats">
            <div class="stat">
              <div class="stat-value">128</div>
              <div class="stat-label">Projects</div>
            </div>
            <div class="stat">
              <div class="stat-value">2.4k</div>
              <div class="stat-label">Followers</div>
            </div>
            <div class="stat">
              <div class="stat-value">891</div>
              <div class="stat-label">Following</div>
            </div>
          </div>
        </div>

        <div class="profile-actions">
          <atman-button variant="primary">
            <atman-icon name="user-plus" size="sm" slot="prefix"></atman-icon>
            Follow
          </atman-button>
          <atman-button variant="outline">
            <atman-icon name="mail" size="sm" slot="prefix"></atman-icon>
            Message
          </atman-button>
        </div>
      </div>

      <atman-card>
        <p class="profile-bio">
          Passionate about creating intuitive and delightful user experiences.
          I specialize in design systems, interaction design, and accessibility.
          When I'm not pushing pixels, you can find me hiking or experimenting with new recipes.
        </p>
      </atman-card>

      <atman-tabs style="margin-top: 32px;">
        <atman-tab slot="tab" selected>Recent Activity</atman-tab>
        <atman-tab slot="tab">Projects</atman-tab>
        <atman-tab slot="tab">Collections</atman-tab>

        <atman-tab-panel slot="panel" selected>
          <div class="activity-item">
            <atman-icon name="folder-plus" size="md" style="color: var(--atman-color-primary)"></atman-icon>
            <div class="activity-content">
              <p class="activity-title">Created a new project</p>
              <p class="activity-desc">Mobile Banking App Redesign</p>
            </div>
            <span class="activity-time">2 hours ago</span>
          </div>
          <div class="activity-item">
            <atman-icon name="message-circle" size="md" style="color: var(--atman-color-success)"></atman-icon>
            <div class="activity-content">
              <p class="activity-title">Commented on Design System v2</p>
              <p class="activity-desc">"Love the new button variants!"</p>
            </div>
            <span class="activity-time">5 hours ago</span>
          </div>
          <div class="activity-item">
            <atman-icon name="star" size="md" style="color: var(--atman-color-warning)"></atman-icon>
            <div class="activity-content">
              <p class="activity-title">Starred E-commerce Dashboard</p>
              <p class="activity-desc">by @designteam</p>
            </div>
            <span class="activity-time">1 day ago</span>
          </div>
        </atman-tab-panel>
        <atman-tab-panel slot="panel">Projects content</atman-tab-panel>
        <atman-tab-panel slot="panel">Collections content</atman-tab-panel>
      </atman-tabs>
    </div>
  `,
};
