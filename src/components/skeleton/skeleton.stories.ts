import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import './skeleton.js';

const meta: Meta = {
  title: 'Components/Feedback/Skeleton',
  component: 'atman-skeleton',
  tags: ['autodocs', 'stable'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['text', 'circular', 'rectangular'],
      description: 'The shape variant of the skeleton',
      table: {
        defaultValue: { summary: 'text' },
      },
    },
    width: {
      control: 'text',
      description: 'Width of the skeleton (CSS value)',
    },
    height: {
      control: 'text',
      description: 'Height of the skeleton (CSS value)',
    },
  },
  args: {
    variant: 'text',
  },
};

export default meta;
type Story = StoryObj;

export const Text: Story = {
  args: {
    variant: 'text',
  },
  render: (args) => html`
    <atman-skeleton
      variant=${args.variant}
      width=${args.width || ''}
      height=${args.height || ''}
    ></atman-skeleton>
  `,
};

export const Circular: Story = {
  args: {
    variant: 'circular',
    width: '48px',
  },
  render: (args) => html`
    <atman-skeleton
      variant=${args.variant}
      width=${args.width || ''}
      height=${args.height || ''}
    ></atman-skeleton>
  `,
};

export const Rectangular: Story = {
  args: {
    variant: 'rectangular',
    height: '200px',
  },
  render: (args) => html`
    <atman-skeleton
      variant=${args.variant}
      width=${args.width || ''}
      height=${args.height || ''}
    ></atman-skeleton>
  `,
};

export const AllVariants: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px; max-width: 400px;">
      <atman-skeleton variant="text"></atman-skeleton>
      <atman-skeleton variant="circular" width="48px"></atman-skeleton>
      <atman-skeleton variant="rectangular" height="120px"></atman-skeleton>
    </div>
  `,
};

export const TextLines: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 8px; max-width: 400px;">
      <atman-skeleton variant="text"></atman-skeleton>
      <atman-skeleton variant="text"></atman-skeleton>
      <atman-skeleton variant="text" width="80%"></atman-skeleton>
    </div>
  `,
};

export const AvatarSizes: Story = {
  render: () => html`
    <div style="display: flex; align-items: center; gap: 16px;">
      <atman-skeleton variant="circular" width="32px"></atman-skeleton>
      <atman-skeleton variant="circular" width="40px"></atman-skeleton>
      <atman-skeleton variant="circular" width="56px"></atman-skeleton>
      <atman-skeleton variant="circular" width="80px"></atman-skeleton>
    </div>
  `,
};

export const CardSkeleton: Story = {
  render: () => html`
    <div style="max-width: 320px; padding: 16px; border: 1px solid var(--atman-color-border); border-radius: var(--atman-radius-md);">
      <atman-skeleton variant="rectangular" height="180px"></atman-skeleton>
      <div style="padding-top: 16px; display: flex; flex-direction: column; gap: 8px;">
        <atman-skeleton variant="text" width="60%"></atman-skeleton>
        <atman-skeleton variant="text"></atman-skeleton>
        <atman-skeleton variant="text"></atman-skeleton>
        <atman-skeleton variant="text" width="40%"></atman-skeleton>
      </div>
    </div>
  `,
};

export const ListItemSkeleton: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px; max-width: 400px;">
      ${[1, 2, 3].map(
        () => html`
          <div style="display: flex; align-items: center; gap: 12px;">
            <atman-skeleton variant="circular" width="40px"></atman-skeleton>
            <div style="flex: 1; display: flex; flex-direction: column; gap: 6px;">
              <atman-skeleton variant="text" width="70%"></atman-skeleton>
              <atman-skeleton variant="text" width="50%" height="12px"></atman-skeleton>
            </div>
          </div>
        `
      )}
    </div>
  `,
};

export const ProfileSkeleton: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; align-items: center; gap: 16px; max-width: 300px; padding: 24px; border: 1px solid var(--atman-color-border); border-radius: var(--atman-radius-md);">
      <atman-skeleton variant="circular" width="80px"></atman-skeleton>
      <atman-skeleton variant="text" width="60%"></atman-skeleton>
      <atman-skeleton variant="text" width="40%" height="12px"></atman-skeleton>
      <div style="width: 100%; display: flex; flex-direction: column; gap: 8px; margin-top: 8px;">
        <atman-skeleton variant="text"></atman-skeleton>
        <atman-skeleton variant="text"></atman-skeleton>
        <atman-skeleton variant="text" width="80%"></atman-skeleton>
      </div>
    </div>
  `,
};

export const TableSkeleton: Story = {
  render: () => html`
    <div style="max-width: 600px;">
      <div style="display: grid; grid-template-columns: 1fr 2fr 1fr 1fr; gap: 12px; padding: 12px 0; border-bottom: 1px solid var(--atman-color-border);">
        <atman-skeleton variant="text"></atman-skeleton>
        <atman-skeleton variant="text"></atman-skeleton>
        <atman-skeleton variant="text"></atman-skeleton>
        <atman-skeleton variant="text"></atman-skeleton>
      </div>
      ${[1, 2, 3, 4].map(
        () => html`
          <div style="display: grid; grid-template-columns: 1fr 2fr 1fr 1fr; gap: 12px; padding: 12px 0; border-bottom: 1px solid var(--atman-color-border-subtle);">
            <atman-skeleton variant="text"></atman-skeleton>
            <atman-skeleton variant="text"></atman-skeleton>
            <atman-skeleton variant="text"></atman-skeleton>
            <atman-skeleton variant="text"></atman-skeleton>
          </div>
        `
      )}
    </div>
  `,
};

export const FormSkeleton: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px; max-width: 400px;">
      <div style="display: flex; flex-direction: column; gap: 6px;">
        <atman-skeleton variant="text" width="60px" height="14px"></atman-skeleton>
        <atman-skeleton variant="rectangular" height="40px"></atman-skeleton>
      </div>
      <div style="display: flex; flex-direction: column; gap: 6px;">
        <atman-skeleton variant="text" width="80px" height="14px"></atman-skeleton>
        <atman-skeleton variant="rectangular" height="40px"></atman-skeleton>
      </div>
      <div style="display: flex; flex-direction: column; gap: 6px;">
        <atman-skeleton variant="text" width="100px" height="14px"></atman-skeleton>
        <atman-skeleton variant="rectangular" height="100px"></atman-skeleton>
      </div>
      <atman-skeleton variant="rectangular" width="120px" height="40px"></atman-skeleton>
    </div>
  `,
};
