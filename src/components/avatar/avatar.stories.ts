import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import './avatar.js';

const meta: Meta = {
  title: 'Components/Primitives/Avatar',
  component: 'atman-avatar',
  tags: ['autodocs', 'stable'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'The size of the avatar',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    src: {
      control: 'text',
      description: 'The image source URL',
    },
    alt: {
      control: 'text',
      description: 'Alternative text for the image',
    },
    name: {
      control: 'text',
      description: 'The name to generate initials from',
    },
    initials: {
      control: 'text',
      description: 'Custom initials (overrides name)',
    },
    loading: {
      control: 'boolean',
      description: 'Whether the avatar is loading',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
  },
  args: {
    size: 'md',
    loading: false,
  },
};

export default meta;
type Story = StoryObj;

export const WithImage: Story = {
  args: {
    src: 'https://i.pravatar.cc/150?img=1',
    alt: 'User avatar',
  },
  render: (args) => html`
    <atman-avatar
      size=${args.size}
      src=${args.src}
      alt=${args.alt}
      ?loading=${args.loading}
    ></atman-avatar>
  `,
};

export const WithInitials: Story = {
  args: {
    name: 'John Doe',
  },
  render: (args) => html`
    <atman-avatar
      size=${args.size}
      name=${args.name}
      ?loading=${args.loading}
    ></atman-avatar>
  `,
};

export const WithCustomInitials: Story = {
  args: {
    initials: 'AB',
  },
  render: (args) => html`
    <atman-avatar
      size=${args.size}
      initials=${args.initials}
      ?loading=${args.loading}
    ></atman-avatar>
  `,
};

export const Fallback: Story = {
  render: (args) => html`
    <atman-avatar size=${args.size}></atman-avatar>
  `,
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; align-items: center; gap: 16px;">
      <atman-avatar size="sm" name="Small User"></atman-avatar>
      <atman-avatar size="md" name="Medium User"></atman-avatar>
      <atman-avatar size="lg" name="Large User"></atman-avatar>
    </div>
  `,
};

export const SizesWithImages: Story = {
  render: () => html`
    <div style="display: flex; align-items: center; gap: 16px;">
      <atman-avatar size="sm" src="https://i.pravatar.cc/150?img=1" alt="Small"></atman-avatar>
      <atman-avatar size="md" src="https://i.pravatar.cc/150?img=2" alt="Medium"></atman-avatar>
      <atman-avatar size="lg" src="https://i.pravatar.cc/150?img=3" alt="Large"></atman-avatar>
    </div>
  `,
};

export const ImageFallback: Story = {
  render: () => html`
    <div style="display: flex; align-items: center; gap: 16px;">
      <atman-avatar src="https://invalid-url.com/image.jpg" name="Fallback User"></atman-avatar>
      <span style="color: var(--atman-color-text-secondary); font-size: var(--atman-font-size-sm);">
        Image fails to load, shows initials
      </span>
    </div>
  `,
};

export const Loading: Story = {
  render: () => html`
    <div style="display: flex; align-items: center; gap: 16px;">
      <atman-avatar size="sm" loading></atman-avatar>
      <atman-avatar size="md" loading></atman-avatar>
      <atman-avatar size="lg" loading></atman-avatar>
    </div>
  `,
};

export const AvatarGroup: Story = {
  render: () => html`
    <div style="display: flex;">
      <atman-avatar
        src="https://i.pravatar.cc/150?img=1"
        alt="User 1"
        style="margin-right: -8px; position: relative; z-index: 4; border: 2px solid var(--atman-color-background);"
      ></atman-avatar>
      <atman-avatar
        src="https://i.pravatar.cc/150?img=2"
        alt="User 2"
        style="margin-right: -8px; position: relative; z-index: 3; border: 2px solid var(--atman-color-background);"
      ></atman-avatar>
      <atman-avatar
        src="https://i.pravatar.cc/150?img=3"
        alt="User 3"
        style="margin-right: -8px; position: relative; z-index: 2; border: 2px solid var(--atman-color-background);"
      ></atman-avatar>
      <atman-avatar
        initials="+5"
        style="position: relative; z-index: 1; border: 2px solid var(--atman-color-background);"
      ></atman-avatar>
    </div>
  `,
};

export const WithNameVariations: Story = {
  render: () => html`
    <div style="display: flex; flex-wrap: wrap; gap: 16px;">
      <div style="display: flex; align-items: center; gap: 8px;">
        <atman-avatar name="John"></atman-avatar>
        <span>John</span>
      </div>
      <div style="display: flex; align-items: center; gap: 8px;">
        <atman-avatar name="John Doe"></atman-avatar>
        <span>John Doe</span>
      </div>
      <div style="display: flex; align-items: center; gap: 8px;">
        <atman-avatar name="John Michael Doe"></atman-avatar>
        <span>John Michael Doe</span>
      </div>
      <div style="display: flex; align-items: center; gap: 8px;">
        <atman-avatar name="A"></atman-avatar>
        <span>A</span>
      </div>
    </div>
  `,
};
