import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import './icon.js';

const meta: Meta = {
  title: 'Components/Primitives/Icon',
  component: 'atman-icon',
  tags: ['autodocs', 'stable'],
  argTypes: {
    name: {
      control: 'text',
      description: 'The name of the Lucide icon',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'The size of the icon',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    color: {
      control: 'select',
      options: ['inherit', 'primary', 'secondary', 'success', 'warning', 'destructive', 'muted'],
      description: 'The color of the icon',
    },
    label: {
      control: 'text',
      description: 'Accessible label for the icon',
    },
  },
  args: {
    size: 'md',
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    name: 'home',
  },
  render: (args) => html`
    <atman-icon name=${args.name} size=${args.size}></atman-icon>
  `,
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; align-items: center; gap: 16px;">
      <atman-icon name="star" size="sm"></atman-icon>
      <atman-icon name="star" size="md"></atman-icon>
      <atman-icon name="star" size="lg"></atman-icon>
    </div>
  `,
};

export const Colors: Story = {
  render: () => html`
    <div style="display: flex; align-items: center; gap: 16px;">
      <atman-icon name="circle" color="primary"></atman-icon>
      <atman-icon name="circle" color="secondary"></atman-icon>
      <atman-icon name="circle" color="success"></atman-icon>
      <atman-icon name="circle" color="warning"></atman-icon>
      <atman-icon name="circle" color="destructive"></atman-icon>
      <atman-icon name="circle" color="muted"></atman-icon>
    </div>
  `,
};

export const CommonIcons: Story = {
  render: () => html`
    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); gap: 16px;">
      ${[
        'home',
        'user',
        'settings',
        'search',
        'menu',
        'x',
        'check',
        'plus',
        'minus',
        'edit',
        'trash-2',
        'download',
        'upload',
        'share',
        'heart',
        'star',
        'bell',
        'mail',
        'calendar',
        'clock',
        'map-pin',
        'phone',
        'camera',
        'image',
      ].map(
        (name) => html`
          <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
            <atman-icon name=${name} size="md"></atman-icon>
            <span style="font-size: var(--atman-font-size-xs); color: var(--atman-color-text-secondary);">${name}</span>
          </div>
        `
      )}
    </div>
  `,
};

export const WithCustomSVG: Story = {
  render: () => html`
    <div style="display: flex; align-items: center; gap: 16px;">
      <atman-icon size="sm">
        <svg viewBox="0 0 24 24">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
        </svg>
      </atman-icon>
      <atman-icon size="md">
        <svg viewBox="0 0 24 24">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
        </svg>
      </atman-icon>
      <atman-icon size="lg">
        <svg viewBox="0 0 24 24">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
        </svg>
      </atman-icon>
    </div>
  `,
};

export const InheritColor: Story = {
  render: () => html`
    <div style="display: flex; align-items: center; gap: 16px;">
      <span style="color: #e91e63;">
        <atman-icon name="heart"></atman-icon>
      </span>
      <span style="color: #4caf50;">
        <atman-icon name="check-circle"></atman-icon>
      </span>
      <span style="color: #ff9800;">
        <atman-icon name="alert-triangle"></atman-icon>
      </span>
    </div>
  `,
};

export const WithText: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 12px;">
      <div style="display: flex; align-items: center; gap: 8px;">
        <atman-icon name="mail" size="sm"></atman-icon>
        <span>Email notifications</span>
      </div>
      <div style="display: flex; align-items: center; gap: 8px;">
        <atman-icon name="bell" size="sm"></atman-icon>
        <span>Push notifications</span>
      </div>
      <div style="display: flex; align-items: center; gap: 8px;">
        <atman-icon name="message-square" size="sm"></atman-icon>
        <span>SMS notifications</span>
      </div>
    </div>
  `,
};

export const Accessible: Story = {
  render: () => html`
    <div style="display: flex; align-items: center; gap: 16px;">
      <!-- Decorative icon (default, aria-hidden) -->
      <atman-icon name="star"></atman-icon>

      <!-- Meaningful icon with label -->
      <atman-icon name="check-circle" label="Success" ?decorative=${false}></atman-icon>

      <!-- Button with icon -->
      <button style="display: flex; align-items: center; gap: 4px; padding: 8px 12px; cursor: pointer;">
        <atman-icon name="save" size="sm"></atman-icon>
        <span>Save</span>
      </button>
    </div>
  `,
};

export const NavigationIcons: Story = {
  render: () => html`
    <div style="display: flex; gap: 24px; padding: 16px; background: var(--atman-color-surface); border-radius: var(--atman-radius-md);">
      ${['home', 'search', 'bell', 'user'].map(
        (name) => html`
          <button style="display: flex; flex-direction: column; align-items: center; gap: 4px; background: none; border: none; padding: 8px; cursor: pointer; color: var(--atman-color-text-secondary);">
            <atman-icon name=${name} size="md"></atman-icon>
            <span style="font-size: var(--atman-font-size-xs);">${name.charAt(0).toUpperCase() + name.slice(1)}</span>
          </button>
        `
      )}
    </div>
  `,
};
