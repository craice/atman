import type { StorybookConfig } from '@storybook/web-components-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-a11y', '@storybook/addon-links', '@storybook/addon-docs'],

  framework: {
    name: '@storybook/web-components-vite',
    options: {},
  },

  staticDirs: ['./public'],

  async viteFinal(config) {
    // Remove vitest/mocker plugin to prevent vite-inject-mocker-entry.js 404 in production
    config.plugins = config.plugins?.filter((plugin) => {
      const name = plugin && typeof plugin === 'object' && 'name' in plugin ? plugin.name : '';
      return !String(name).includes('vitest:mocker');
    });
    delete config.test;

    // Support subpath deployment via STORYBOOK_BASE env var
    if (process.env.STORYBOOK_BASE) {
      config.base = process.env.STORYBOOK_BASE;
    }

    return config;
  },
};

export default config;
