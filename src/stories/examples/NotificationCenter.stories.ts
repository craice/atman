import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../../components/card/card.js';
import '../../components/button/button.js';
import '../../components/badge/badge.js';
import '../../components/icon/icon.js';
import '../../components/avatar/avatar.js';
import '../../components/tabs/tabs.js';

const meta: Meta = {
  title: 'Examples/Notification Center',
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj;

export const NotificationCenter: Story = {
  render: () => html`
    <style>
      .notification-panel {
        width: 400px;
        background: var(--atman-color-surface, #FFFFFF);
        border: 1px solid var(--atman-color-border, #E0E0E0);
        border-radius: 16px;
        box-shadow: var(--atman-shadow-xl);
        font-family: var(--atman-font-family, 'Geist', sans-serif);
        overflow: hidden;
      }

      .notification-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px 24px;
        border-bottom: 1px solid var(--atman-color-border, #E0E0E0);
      }

      .notification-title {
        font-size: 18px;
        font-weight: 600;
        color: var(--atman-color-text, #212121);
        margin: 0;
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .notification-count {
        background: var(--atman-color-destructive, #EA4335);
        color: white;
        font-size: 12px;
        font-weight: 600;
        padding: 2px 8px;
        border-radius: 10px;
      }

      .notification-actions {
        display: flex;
        gap: 8px;
      }

      .notification-list {
        max-height: 480px;
        overflow-y: auto;
      }

      .notification-item {
        display: flex;
        gap: 12px;
        padding: 16px 24px;
        border-bottom: 1px solid var(--atman-color-border, #E0E0E0);
        cursor: pointer;
        transition: background 0.15s;
      }

      .notification-item:hover {
        background: var(--atman-color-surface-hover, #F5F5F5);
      }

      .notification-item:last-child {
        border-bottom: none;
      }

      .notification-item.unread {
        background: rgba(26, 115, 232, 0.04);
      }

      .notification-item.unread::before {
        content: '';
        position: absolute;
        left: 12px;
        top: 50%;
        transform: translateY(-50%);
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: var(--atman-color-primary, #1A73E8);
      }

      .notification-icon {
        width: 40px;
        height: 40px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }

      .notification-icon.info { background: rgba(26, 115, 232, 0.1); color: #1A73E8; }
      .notification-icon.success { background: rgba(52, 168, 83, 0.1); color: #34A853; }
      .notification-icon.warning { background: rgba(251, 188, 4, 0.1); color: #FBBC04; }
      .notification-icon.error { background: rgba(234, 67, 53, 0.1); color: #EA4335; }

      .notification-content {
        flex: 1;
        min-width: 0;
      }

      .notification-text {
        font-size: 14px;
        color: var(--atman-color-text, #212121);
        line-height: 1.5;
        margin: 0 0 4px;
      }

      .notification-text strong {
        font-weight: 600;
      }

      .notification-meta {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 12px;
        color: var(--atman-color-text-tertiary, #9E9E9E);
      }

      .notification-dot {
        width: 3px;
        height: 3px;
        border-radius: 50%;
        background: currentColor;
      }

      .notification-footer {
        padding: 16px 24px;
        border-top: 1px solid var(--atman-color-border, #E0E0E0);
        text-align: center;
      }

      .empty-state {
        padding: 48px 24px;
        text-align: center;
      }

      .empty-icon {
        width: 64px;
        height: 64px;
        margin: 0 auto 16px;
        background: var(--atman-color-surface-hover, #F5F5F5);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--atman-color-text-tertiary, #9E9E9E);
      }

      .empty-title {
        font-size: 16px;
        font-weight: 600;
        color: var(--atman-color-text, #212121);
        margin: 0 0 4px;
      }

      .empty-desc {
        font-size: 14px;
        color: var(--atman-color-text-secondary, #616161);
        margin: 0;
      }
    </style>

    <div class="notification-panel">
      <div class="notification-header">
        <h2 class="notification-title">
          Notifications
          <span class="notification-count">5</span>
        </h2>
        <div class="notification-actions">
          <atman-button variant="ghost" size="sm">
            <atman-icon name="check-check" size="sm"></atman-icon>
          </atman-button>
          <atman-button variant="ghost" size="sm">
            <atman-icon name="settings" size="sm"></atman-icon>
          </atman-button>
        </div>
      </div>

      <atman-tabs>
        <atman-tab slot="tab" selected>All</atman-tab>
        <atman-tab slot="tab">Unread</atman-tab>
        <atman-tab slot="tab">Mentions</atman-tab>

        <atman-tab-panel slot="panel" selected>
          <div class="notification-list">
            <div class="notification-item unread" style="position: relative;">
              <div class="notification-icon success">
                <atman-icon name="check-circle" size="md"></atman-icon>
              </div>
              <div class="notification-content">
                <p class="notification-text">
                  <strong>Your export is ready!</strong> Download your data report for Q4 2024.
                </p>
                <div class="notification-meta">
                  <span>Just now</span>
                </div>
              </div>
            </div>

            <div class="notification-item unread" style="position: relative;">
              <atman-avatar size="sm" name="Alex Kim" src="https://i.pravatar.cc/40?img=12"></atman-avatar>
              <div class="notification-content">
                <p class="notification-text">
                  <strong>Alex Kim</strong> mentioned you in a comment on <strong>Project Alpha</strong>
                </p>
                <div class="notification-meta">
                  <span>5 minutes ago</span>
                  <span class="notification-dot"></span>
                  <span>Comments</span>
                </div>
              </div>
            </div>

            <div class="notification-item">
              <div class="notification-icon warning">
                <atman-icon name="alert-triangle" size="md"></atman-icon>
              </div>
              <div class="notification-content">
                <p class="notification-text">
                  Storage is running low. You've used <strong>85%</strong> of your plan's storage.
                </p>
                <div class="notification-meta">
                  <span>1 hour ago</span>
                  <span class="notification-dot"></span>
                  <span>System</span>
                </div>
              </div>
            </div>

            <div class="notification-item">
              <atman-avatar size="sm" name="Sarah Chen" src="https://i.pravatar.cc/40?img=47"></atman-avatar>
              <div class="notification-content">
                <p class="notification-text">
                  <strong>Sarah Chen</strong> shared <strong>Design System v2.0</strong> with you
                </p>
                <div class="notification-meta">
                  <span>2 hours ago</span>
                  <span class="notification-dot"></span>
                  <span>Sharing</span>
                </div>
              </div>
            </div>

            <div class="notification-item">
              <div class="notification-icon info">
                <atman-icon name="calendar" size="md"></atman-icon>
              </div>
              <div class="notification-content">
                <p class="notification-text">
                  <strong>Team standup</strong> starts in 15 minutes
                </p>
                <div class="notification-meta">
                  <span>3 hours ago</span>
                  <span class="notification-dot"></span>
                  <span>Calendar</span>
                </div>
              </div>
            </div>

            <div class="notification-item">
              <div class="notification-icon success">
                <atman-icon name="user-plus" size="md"></atman-icon>
              </div>
              <div class="notification-content">
                <p class="notification-text">
                  <strong>3 new team members</strong> joined your workspace
                </p>
                <div class="notification-meta">
                  <span>Yesterday</span>
                  <span class="notification-dot"></span>
                  <span>Team</span>
                </div>
              </div>
            </div>
          </div>
        </atman-tab-panel>

        <atman-tab-panel slot="panel">
          <div class="notification-list">
            <div class="notification-item unread" style="position: relative;">
              <div class="notification-icon success">
                <atman-icon name="check-circle" size="md"></atman-icon>
              </div>
              <div class="notification-content">
                <p class="notification-text">
                  <strong>Your export is ready!</strong> Download your data report.
                </p>
                <div class="notification-meta">
                  <span>Just now</span>
                </div>
              </div>
            </div>
            <div class="notification-item unread" style="position: relative;">
              <atman-avatar size="sm" name="Alex Kim" src="https://i.pravatar.cc/40?img=12"></atman-avatar>
              <div class="notification-content">
                <p class="notification-text">
                  <strong>Alex Kim</strong> mentioned you in a comment
                </p>
                <div class="notification-meta">
                  <span>5 minutes ago</span>
                </div>
              </div>
            </div>
          </div>
        </atman-tab-panel>

        <atman-tab-panel slot="panel">
          <div class="empty-state">
            <div class="empty-icon">
              <atman-icon name="at-sign" size="lg"></atman-icon>
            </div>
            <h3 class="empty-title">No mentions yet</h3>
            <p class="empty-desc">When someone mentions you, you'll see it here.</p>
          </div>
        </atman-tab-panel>
      </atman-tabs>

      <div class="notification-footer">
        <atman-button variant="ghost" size="sm">View all notifications</atman-button>
      </div>
    </div>
  `,
};
