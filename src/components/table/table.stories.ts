import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import './table.js';

const sampleColumns = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'email', label: 'Email' },
  { key: 'role', label: 'Role', sortable: true },
  { key: 'status', label: 'Status' },
];

const sampleData = [
  { name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', status: 'Active' },
  { name: 'Bob Smith', email: 'bob@example.com', role: 'User', status: 'Active' },
  { name: 'Charlie Brown', email: 'charlie@example.com', role: 'Editor', status: 'Inactive' },
  { name: 'Diana Prince', email: 'diana@example.com', role: 'Admin', status: 'Active' },
  { name: 'Eve Wilson', email: 'eve@example.com', role: 'User', status: 'Pending' },
];

const meta: Meta = {
  title: 'Components/Data Display/Table',
  component: 'atman-table',
  tags: ['autodocs', 'stable'],
  argTypes: {
    striped: { control: 'boolean' },
    hoverable: { control: 'boolean' },
    selectable: { control: 'boolean' },
    loading: { control: 'boolean' },
    'empty-text': { control: 'text' },
  },
  args: {
    striped: false,
    hoverable: false,
    selectable: false,
    loading: false,
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <atman-table
      .columns=${sampleColumns}
      .data=${sampleData}
      ?striped=${args.striped}
      ?hoverable=${args.hoverable}
      ?selectable=${args.selectable}
      ?loading=${args.loading}
    ></atman-table>
  `,
};

export const Striped: Story = {
  render: () => html`
    <atman-table
      .columns=${sampleColumns}
      .data=${sampleData}
      striped
    ></atman-table>
  `,
};

export const Hoverable: Story = {
  render: () => html`
    <atman-table
      .columns=${sampleColumns}
      .data=${sampleData}
      hoverable
    ></atman-table>
  `,
};

export const Selectable: Story = {
  render: () => html`
    <atman-table
      .columns=${sampleColumns}
      .data=${sampleData}
      selectable
      hoverable
    ></atman-table>
  `,
};

export const Sortable: Story = {
  render: () => html`
    <atman-table
      .columns=${[
        { key: 'name', label: 'Name', sortable: true },
        { key: 'email', label: 'Email', sortable: true },
        { key: 'role', label: 'Role', sortable: true },
        { key: 'status', label: 'Status', sortable: true },
      ]}
      .data=${sampleData}
      hoverable
    ></atman-table>
  `,
};

export const Loading: Story = {
  render: () => html`
    <atman-table
      .columns=${sampleColumns}
      loading
    ></atman-table>
  `,
};

export const Empty: Story = {
  render: () => html`
    <atman-table
      .columns=${sampleColumns}
      .data=${[]}
      empty-text="No users found. Try adjusting your filters."
    ></atman-table>
  `,
};

export const WithColumnWidths: Story = {
  render: () => html`
    <atman-table
      .columns=${[
        { key: 'id', label: 'ID', width: '60px', sortable: true },
        { key: 'name', label: 'Name', sortable: true },
        { key: 'email', label: 'Email' },
        { key: 'role', label: 'Role', width: '120px' },
      ]}
      .data=${[
        { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin' },
        { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'User' },
        { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', role: 'Editor' },
      ]}
      striped
      hoverable
    ></atman-table>
  `,
};

export const FullFeatured: Story = {
  render: () => html`
    <atman-table
      .columns=${sampleColumns}
      .data=${sampleData}
      striped
      hoverable
      selectable
    ></atman-table>
  `,
};
