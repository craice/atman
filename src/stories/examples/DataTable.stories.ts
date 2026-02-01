import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../../components/button/button.js';
import '../../components/badge/badge.js';
import '../../components/icon/icon.js';
import '../../components/avatar/avatar.js';
import '../../components/checkbox/checkbox.js';
import '../../components/input/input.js';

const meta: Meta = {
  title: 'Examples/Data Table',
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj;

export const DataTable: Story = {
  render: () => html`
    <style>
      .table-container {
        font-family: var(--atman-font-family, 'Geist', sans-serif);
        background: var(--atman-color-surface, #FFFFFF);
        border: 1px solid var(--atman-color-border, #E0E0E0);
        border-radius: 12px;
        overflow: hidden;
      }

      .table-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px 24px;
        border-bottom: 1px solid var(--atman-color-border, #E0E0E0);
      }

      .table-title {
        font-size: 18px;
        font-weight: 600;
        color: var(--atman-color-text, #212121);
        margin: 0;
      }

      .table-actions {
        display: flex;
        gap: 12px;
      }

      .table-toolbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 16px 24px;
        background: var(--atman-color-surface-hover, #FAFAFA);
        border-bottom: 1px solid var(--atman-color-border, #E0E0E0);
      }

      .table-search {
        width: 280px;
      }

      .table-filters {
        display: flex;
        gap: 8px;
      }

      .filter-btn {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 8px 12px;
        background: var(--atman-color-surface, #FFFFFF);
        border: 1px solid var(--atman-color-border, #E0E0E0);
        border-radius: 8px;
        font-size: 13px;
        color: var(--atman-color-text-secondary, #616161);
        cursor: pointer;
        transition: all 0.15s;
      }

      .filter-btn:hover {
        border-color: var(--atman-color-primary, #1A73E8);
        color: var(--atman-color-primary, #1A73E8);
      }

      .data-table {
        width: 100%;
        border-collapse: collapse;
      }

      .data-table th,
      .data-table td {
        padding: 12px 16px;
        text-align: left;
        border-bottom: 1px solid var(--atman-color-border, #E0E0E0);
      }

      .data-table th {
        font-size: 12px;
        font-weight: 600;
        color: var(--atman-color-text-tertiary, #9E9E9E);
        text-transform: uppercase;
        letter-spacing: 0.5px;
        background: var(--atman-color-surface-hover, #FAFAFA);
      }

      .data-table th.sortable {
        cursor: pointer;
        user-select: none;
      }

      .data-table th.sortable:hover {
        color: var(--atman-color-text, #212121);
      }

      .sort-icon {
        display: inline-flex;
        margin-left: 4px;
        opacity: 0.5;
      }

      .data-table tr:hover td {
        background: var(--atman-color-surface-hover, #F5F5F5);
      }

      .data-table tr:last-child td {
        border-bottom: none;
      }

      .data-table td {
        font-size: 14px;
        color: var(--atman-color-text, #212121);
      }

      .user-cell {
        display: flex;
        align-items: center;
        gap: 12px;
      }

      .user-info {
        display: flex;
        flex-direction: column;
      }

      .user-name {
        font-weight: 500;
        color: var(--atman-color-text, #212121);
      }

      .user-email {
        font-size: 13px;
        color: var(--atman-color-text-secondary, #616161);
      }

      .actions-cell {
        display: flex;
        gap: 4px;
        opacity: 0;
        transition: opacity 0.15s;
      }

      .data-table tr:hover .actions-cell {
        opacity: 1;
      }

      .table-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 16px 24px;
        border-top: 1px solid var(--atman-color-border, #E0E0E0);
      }

      .table-info {
        font-size: 14px;
        color: var(--atman-color-text-secondary, #616161);
      }

      .table-pagination {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .page-btn {
        min-width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid var(--atman-color-border, #E0E0E0);
        border-radius: 6px;
        background: var(--atman-color-surface, #FFFFFF);
        color: var(--atman-color-text, #212121);
        font-size: 13px;
        cursor: pointer;
        transition: all 0.15s;
      }

      .page-btn:hover:not(:disabled) {
        border-color: var(--atman-color-primary, #1A73E8);
        color: var(--atman-color-primary, #1A73E8);
      }

      .page-btn.active {
        background: var(--atman-color-primary, #1A73E8);
        border-color: var(--atman-color-primary, #1A73E8);
        color: white;
      }

      .page-btn:disabled {
        opacity: 0.4;
        cursor: not-allowed;
      }

      .rows-select {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 13px;
        color: var(--atman-color-text-secondary, #616161);
      }
    </style>

    <div class="table-container">
      <div class="table-header">
        <h2 class="table-title">Team Members</h2>
        <div class="table-actions">
          <atman-button variant="outline">
            <atman-icon name="download" size="sm" slot="prefix"></atman-icon>
            Export
          </atman-button>
          <atman-button variant="primary">
            <atman-icon name="user-plus" size="sm" slot="prefix"></atman-icon>
            Add Member
          </atman-button>
        </div>
      </div>

      <div class="table-toolbar">
        <div class="table-search">
          <atman-input placeholder="Search members...">
            <atman-icon name="search" size="sm" slot="prefix"></atman-icon>
          </atman-input>
        </div>
        <div class="table-filters">
          <button class="filter-btn">
            <atman-icon name="filter" size="sm"></atman-icon>
            Role
            <atman-icon name="chevron-down" size="sm"></atman-icon>
          </button>
          <button class="filter-btn">
            <atman-icon name="filter" size="sm"></atman-icon>
            Status
            <atman-icon name="chevron-down" size="sm"></atman-icon>
          </button>
          <button class="filter-btn">
            <atman-icon name="calendar" size="sm"></atman-icon>
            Date Added
          </button>
        </div>
      </div>

      <table class="data-table">
        <thead>
          <tr>
            <th style="width: 40px;">
              <atman-checkbox></atman-checkbox>
            </th>
            <th class="sortable">
              Name
              <span class="sort-icon"><atman-icon name="chevrons-up-down" size="sm"></atman-icon></span>
            </th>
            <th class="sortable">
              Role
              <span class="sort-icon"><atman-icon name="chevrons-up-down" size="sm"></atman-icon></span>
            </th>
            <th>Department</th>
            <th class="sortable">
              Status
              <span class="sort-icon"><atman-icon name="chevrons-up-down" size="sm"></atman-icon></span>
            </th>
            <th class="sortable">
              Last Active
              <span class="sort-icon"><atman-icon name="chevrons-up-down" size="sm"></atman-icon></span>
            </th>
            <th style="width: 100px;"></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><atman-checkbox></atman-checkbox></td>
            <td>
              <div class="user-cell">
                <atman-avatar size="sm" name="Sarah Chen" src="https://i.pravatar.cc/40?img=47"></atman-avatar>
                <div class="user-info">
                  <span class="user-name">Sarah Chen</span>
                  <span class="user-email">sarah.chen@company.com</span>
                </div>
              </div>
            </td>
            <td>Lead Designer</td>
            <td>Design</td>
            <td><atman-badge variant="success">Active</atman-badge></td>
            <td>Just now</td>
            <td>
              <div class="actions-cell">
                <atman-button variant="ghost" size="sm"><atman-icon name="edit" size="sm"></atman-icon></atman-button>
                <atman-button variant="ghost" size="sm"><atman-icon name="trash" size="sm"></atman-icon></atman-button>
              </div>
            </td>
          </tr>
          <tr>
            <td><atman-checkbox></atman-checkbox></td>
            <td>
              <div class="user-cell">
                <atman-avatar size="sm" name="Alex Kim" src="https://i.pravatar.cc/40?img=12"></atman-avatar>
                <div class="user-info">
                  <span class="user-name">Alex Kim</span>
                  <span class="user-email">alex.kim@company.com</span>
                </div>
              </div>
            </td>
            <td>Senior Developer</td>
            <td>Engineering</td>
            <td><atman-badge variant="success">Active</atman-badge></td>
            <td>5 min ago</td>
            <td>
              <div class="actions-cell">
                <atman-button variant="ghost" size="sm"><atman-icon name="edit" size="sm"></atman-icon></atman-button>
                <atman-button variant="ghost" size="sm"><atman-icon name="trash" size="sm"></atman-icon></atman-button>
              </div>
            </td>
          </tr>
          <tr>
            <td><atman-checkbox></atman-checkbox></td>
            <td>
              <div class="user-cell">
                <atman-avatar size="sm" name="Michael Brown" src="https://i.pravatar.cc/40?img=8"></atman-avatar>
                <div class="user-info">
                  <span class="user-name">Michael Brown</span>
                  <span class="user-email">m.brown@company.com</span>
                </div>
              </div>
            </td>
            <td>Product Manager</td>
            <td>Product</td>
            <td><atman-badge variant="warning">Away</atman-badge></td>
            <td>1 hour ago</td>
            <td>
              <div class="actions-cell">
                <atman-button variant="ghost" size="sm"><atman-icon name="edit" size="sm"></atman-icon></atman-button>
                <atman-button variant="ghost" size="sm"><atman-icon name="trash" size="sm"></atman-icon></atman-button>
              </div>
            </td>
          </tr>
          <tr>
            <td><atman-checkbox></atman-checkbox></td>
            <td>
              <div class="user-cell">
                <atman-avatar size="sm" name="Emma Wilson" src="https://i.pravatar.cc/40?img=5"></atman-avatar>
                <div class="user-info">
                  <span class="user-name">Emma Wilson</span>
                  <span class="user-email">emma.w@company.com</span>
                </div>
              </div>
            </td>
            <td>Marketing Lead</td>
            <td>Marketing</td>
            <td><atman-badge variant="success">Active</atman-badge></td>
            <td>30 min ago</td>
            <td>
              <div class="actions-cell">
                <atman-button variant="ghost" size="sm"><atman-icon name="edit" size="sm"></atman-icon></atman-button>
                <atman-button variant="ghost" size="sm"><atman-icon name="trash" size="sm"></atman-icon></atman-button>
              </div>
            </td>
          </tr>
          <tr>
            <td><atman-checkbox></atman-checkbox></td>
            <td>
              <div class="user-cell">
                <atman-avatar size="sm" name="James Lee" src="https://i.pravatar.cc/40?img=15"></atman-avatar>
                <div class="user-info">
                  <span class="user-name">James Lee</span>
                  <span class="user-email">james.lee@company.com</span>
                </div>
              </div>
            </td>
            <td>Data Analyst</td>
            <td>Analytics</td>
            <td><atman-badge>Offline</atman-badge></td>
            <td>2 days ago</td>
            <td>
              <div class="actions-cell">
                <atman-button variant="ghost" size="sm"><atman-icon name="edit" size="sm"></atman-icon></atman-button>
                <atman-button variant="ghost" size="sm"><atman-icon name="trash" size="sm"></atman-icon></atman-button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="table-footer">
        <div class="table-info">
          Showing <strong>1-5</strong> of <strong>48</strong> members
        </div>
        <div class="table-pagination">
          <div class="rows-select">
            Rows per page:
            <atman-button variant="ghost" size="sm">
              10
              <atman-icon name="chevron-down" size="sm" slot="suffix"></atman-icon>
            </atman-button>
          </div>
          <button class="page-btn" disabled>
            <atman-icon name="chevron-left" size="sm"></atman-icon>
          </button>
          <button class="page-btn active">1</button>
          <button class="page-btn">2</button>
          <button class="page-btn">3</button>
          <button class="page-btn">4</button>
          <button class="page-btn">5</button>
          <button class="page-btn">
            <atman-icon name="chevron-right" size="sm"></atman-icon>
          </button>
        </div>
      </div>
    </div>
  `,
};
