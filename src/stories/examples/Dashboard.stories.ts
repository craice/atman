import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../../components/card/card.js';
import '../../components/button/button.js';
import '../../components/badge/badge.js';
import '../../components/icon/icon.js';
import '../../components/avatar/avatar.js';

const meta: Meta = {
  title: 'Examples/Dashboard',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj;

export const Dashboard: Story = {
  render: () => html`
    <style>
      .dashboard {
        font-family: var(--atman-font-family, 'Geist', sans-serif);
        background: var(--atman-color-background, #FAFAFA);
        padding: 32px;
      }

      .dashboard-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 32px;
      }

      .dashboard-title {
        font-size: 28px;
        font-weight: 700;
        color: var(--atman-color-text, #212121);
        margin: 0;
      }

      .dashboard-subtitle {
        font-size: 14px;
        color: var(--atman-color-text-secondary, #616161);
        margin: 4px 0 0;
      }

      .stats-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 24px;
        margin-bottom: 32px;
      }

      @media (max-width: 1024px) {
        .stats-grid { grid-template-columns: repeat(2, 1fr); }
      }

      @media (max-width: 600px) {
        .stats-grid { grid-template-columns: 1fr; }
      }

      .stat-card {
        background: var(--atman-color-surface, #FFFFFF);
        border-radius: 12px;
        padding: 24px;
        border: 1px solid var(--atman-color-border, #E0E0E0);
      }

      .stat-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 16px;
      }

      .stat-icon {
        width: 48px;
        height: 48px;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .stat-icon.blue { background: rgba(26, 115, 232, 0.1); color: #1A73E8; }
      .stat-icon.green { background: rgba(52, 168, 83, 0.1); color: #34A853; }
      .stat-icon.orange { background: rgba(251, 188, 4, 0.1); color: #FBBC04; }
      .stat-icon.purple { background: rgba(156, 39, 176, 0.1); color: #9C27B0; }

      .stat-value {
        font-size: 32px;
        font-weight: 700;
        color: var(--atman-color-text, #212121);
        margin: 0;
      }

      .stat-label {
        font-size: 14px;
        color: var(--atman-color-text-secondary, #616161);
        margin: 4px 0 0;
      }

      .stat-change {
        display: flex;
        align-items: center;
        gap: 4px;
        font-size: 13px;
        margin-top: 8px;
      }

      .stat-change.positive { color: #34A853; }
      .stat-change.negative { color: #EA4335; }

      .content-grid {
        display: grid;
        grid-template-columns: 2fr 1fr;
        gap: 24px;
      }

      @media (max-width: 900px) {
        .content-grid { grid-template-columns: 1fr; }
      }

      .section-title {
        font-size: 18px;
        font-weight: 600;
        color: var(--atman-color-text, #212121);
        margin: 0 0 16px;
      }

      .recent-orders {
        background: var(--atman-color-surface, #FFFFFF);
        border-radius: 12px;
        padding: 24px;
        border: 1px solid var(--atman-color-border, #E0E0E0);
      }

      .orders-table {
        width: 100%;
        border-collapse: collapse;
      }

      .orders-table th,
      .orders-table td {
        text-align: left;
        padding: 12px 8px;
        border-bottom: 1px solid var(--atman-color-border, #E0E0E0);
      }

      .orders-table th {
        font-size: 12px;
        font-weight: 600;
        color: var(--atman-color-text-tertiary, #9E9E9E);
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      .orders-table td {
        font-size: 14px;
        color: var(--atman-color-text, #212121);
      }

      .orders-table tr:last-child td {
        border-bottom: none;
      }

      .customer-cell {
        display: flex;
        align-items: center;
        gap: 12px;
      }

      .customer-name {
        font-weight: 500;
      }

      .customer-email {
        font-size: 12px;
        color: var(--atman-color-text-secondary, #616161);
      }

      .activity-panel {
        background: var(--atman-color-surface, #FFFFFF);
        border-radius: 12px;
        padding: 24px;
        border: 1px solid var(--atman-color-border, #E0E0E0);
      }

      .activity-item {
        display: flex;
        gap: 12px;
        padding: 12px 0;
      }

      .activity-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        margin-top: 6px;
        flex-shrink: 0;
      }

      .activity-dot.blue { background: #1A73E8; }
      .activity-dot.green { background: #34A853; }
      .activity-dot.orange { background: #FBBC04; }

      .activity-text {
        font-size: 14px;
        color: var(--atman-color-text, #212121);
        line-height: 1.5;
      }

      .activity-time {
        font-size: 12px;
        color: var(--atman-color-text-tertiary, #9E9E9E);
        margin-top: 4px;
      }
    </style>

    <div class="dashboard">
      <div class="dashboard-header">
        <div>
          <h1 class="dashboard-title">Dashboard</h1>
          <p class="dashboard-subtitle">Welcome back, Sarah. Here's what's happening today.</p>
        </div>
        <div style="display: flex; gap: 12px;">
          <atman-button variant="outline">
            <atman-icon name="download" size="sm" slot="prefix"></atman-icon>
            Export
          </atman-button>
          <atman-button variant="primary">
            <atman-icon name="plus" size="sm" slot="prefix"></atman-icon>
            New Order
          </atman-button>
        </div>
      </div>

      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-header">
            <div class="stat-icon blue">
              <atman-icon name="dollar-sign" size="lg"></atman-icon>
            </div>
          </div>
          <p class="stat-value">$45,231</p>
          <p class="stat-label">Total Revenue</p>
          <div class="stat-change positive">
            <atman-icon name="trending-up" size="sm"></atman-icon>
            +12.5% from last month
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-header">
            <div class="stat-icon green">
              <atman-icon name="shopping-cart" size="lg"></atman-icon>
            </div>
          </div>
          <p class="stat-value">1,234</p>
          <p class="stat-label">Total Orders</p>
          <div class="stat-change positive">
            <atman-icon name="trending-up" size="sm"></atman-icon>
            +8.2% from last month
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-header">
            <div class="stat-icon orange">
              <atman-icon name="users" size="lg"></atman-icon>
            </div>
          </div>
          <p class="stat-value">892</p>
          <p class="stat-label">New Customers</p>
          <div class="stat-change negative">
            <atman-icon name="trending-down" size="sm"></atman-icon>
            -3.1% from last month
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-header">
            <div class="stat-icon purple">
              <atman-icon name="package" size="lg"></atman-icon>
            </div>
          </div>
          <p class="stat-value">156</p>
          <p class="stat-label">Pending Orders</p>
          <div class="stat-change positive">
            <atman-icon name="trending-up" size="sm"></atman-icon>
            +2.4% from last month
          </div>
        </div>
      </div>

      <div class="content-grid">
        <div class="recent-orders">
          <h2 class="section-title">Recent Orders</h2>
          <table class="orders-table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Order ID</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div class="customer-cell">
                    <atman-avatar size="sm" name="John Doe" src="https://i.pravatar.cc/40?img=1"></atman-avatar>
                    <div>
                      <div class="customer-name">John Doe</div>
                      <div class="customer-email">john@example.com</div>
                    </div>
                  </div>
                </td>
                <td>#ORD-7352</td>
                <td>$299.00</td>
                <td><atman-badge variant="success">Delivered</atman-badge></td>
              </tr>
              <tr>
                <td>
                  <div class="customer-cell">
                    <atman-avatar size="sm" name="Emma Wilson" src="https://i.pravatar.cc/40?img=5"></atman-avatar>
                    <div>
                      <div class="customer-name">Emma Wilson</div>
                      <div class="customer-email">emma@example.com</div>
                    </div>
                  </div>
                </td>
                <td>#ORD-7351</td>
                <td>$149.50</td>
                <td><atman-badge variant="warning">Pending</atman-badge></td>
              </tr>
              <tr>
                <td>
                  <div class="customer-cell">
                    <atman-avatar size="sm" name="Michael Brown" src="https://i.pravatar.cc/40?img=8"></atman-avatar>
                    <div>
                      <div class="customer-name">Michael Brown</div>
                      <div class="customer-email">michael@example.com</div>
                    </div>
                  </div>
                </td>
                <td>#ORD-7350</td>
                <td>$499.99</td>
                <td><atman-badge variant="info">Shipping</atman-badge></td>
              </tr>
              <tr>
                <td>
                  <div class="customer-cell">
                    <atman-avatar size="sm" name="Sarah Miller" src="https://i.pravatar.cc/40?img=9"></atman-avatar>
                    <div>
                      <div class="customer-name">Sarah Miller</div>
                      <div class="customer-email">sarah@example.com</div>
                    </div>
                  </div>
                </td>
                <td>#ORD-7349</td>
                <td>$89.00</td>
                <td><atman-badge variant="success">Delivered</atman-badge></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="activity-panel">
          <h2 class="section-title">Recent Activity</h2>
          <div class="activity-item">
            <div class="activity-dot blue"></div>
            <div>
              <div class="activity-text">New order <strong>#ORD-7352</strong> received from John Doe</div>
              <div class="activity-time">2 minutes ago</div>
            </div>
          </div>
          <div class="activity-item">
            <div class="activity-dot green"></div>
            <div>
              <div class="activity-text">Order <strong>#ORD-7340</strong> has been delivered</div>
              <div class="activity-time">15 minutes ago</div>
            </div>
          </div>
          <div class="activity-item">
            <div class="activity-dot orange"></div>
            <div>
              <div class="activity-text">Low stock alert for <strong>Product SKU-4521</strong></div>
              <div class="activity-time">1 hour ago</div>
            </div>
          </div>
          <div class="activity-item">
            <div class="activity-dot blue"></div>
            <div>
              <div class="activity-text">New customer <strong>Emma Wilson</strong> registered</div>
              <div class="activity-time">2 hours ago</div>
            </div>
          </div>
          <div class="activity-item">
            <div class="activity-dot green"></div>
            <div>
              <div class="activity-text">Payment received for order <strong>#ORD-7338</strong></div>
              <div class="activity-time">3 hours ago</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
};
