import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import './pagination.js';

const meta: Meta = {
  title: 'Components/Navigation/Pagination',
  component: 'atman-pagination',
  tags: ['autodocs', 'stable'],
  argTypes: {
    'total-pages': { control: 'number', description: 'Total number of pages' },
    'current-page': { control: 'number', description: 'Current page' },
    'sibling-count': { control: 'number', description: 'Pages shown around current' },
    size: { control: 'select', options: ['sm', 'md'] },
  },
  args: {
    'total-pages': 10,
    'current-page': 5,
    'sibling-count': 1,
    size: 'md',
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <atman-pagination
      total-pages=${args['total-pages']}
      current-page=${args['current-page']}
      sibling-count=${args['sibling-count']}
      size=${args.size}
    ></atman-pagination>
  `,
};

export const FewPages: Story = {
  render: () => html`
    <atman-pagination total-pages="5" current-page="3"></atman-pagination>
  `,
};

export const ManyPages: Story = {
  render: () => html`
    <atman-pagination total-pages="50" current-page="25"></atman-pagination>
  `,
};

export const FirstPage: Story = {
  render: () => html`
    <atman-pagination total-pages="20" current-page="1"></atman-pagination>
  `,
};

export const LastPage: Story = {
  render: () => html`
    <atman-pagination total-pages="20" current-page="20"></atman-pagination>
  `,
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <atman-pagination total-pages="10" current-page="5" size="sm"></atman-pagination>
      <atman-pagination total-pages="10" current-page="5" size="md"></atman-pagination>
    </div>
  `,
};

export const WithSiblingCount: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <div style="font-family: var(--atman-font-family); font-size: var(--atman-font-size-xs); color: var(--atman-color-text-secondary);">sibling-count="1"</div>
      <atman-pagination total-pages="20" current-page="10" sibling-count="1"></atman-pagination>
      <div style="font-family: var(--atman-font-family); font-size: var(--atman-font-size-xs); color: var(--atman-color-text-secondary);">sibling-count="2"</div>
      <atman-pagination total-pages="20" current-page="10" sibling-count="2"></atman-pagination>
    </div>
  `,
};
