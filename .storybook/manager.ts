import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming/create';

const atmanTheme = create({
  base: 'light',

  // Brand
  brandTitle: 'Atman Design System',
  brandUrl: 'https://github.com/craice/atman',
  brandImage: './atman-logo-full.svg',
  brandTarget: '_blank',

  // Colors - Black as primary
  colorPrimary: '#000000',
  colorSecondary: '#000000',

  // UI
  appBg: '#FAFAFA',
  appContentBg: '#FFFFFF',
  appPreviewBg: '#FFFFFF',
  appBorderColor: '#E0E0E0',
  appBorderRadius: 8,

  // Text colors
  textColor: '#212121',
  textInverseColor: '#FFFFFF',
  textMutedColor: '#757575',

  // Toolbar
  barTextColor: '#616161',
  barSelectedColor: '#000000',
  barHoverColor: '#000000',
  barBg: '#FFFFFF',

  // Form colors
  inputBg: '#FFFFFF',
  inputBorder: '#E0E0E0',
  inputTextColor: '#212121',
  inputBorderRadius: 8,

  // Typography - Geist
  fontBase: '"Geist", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  fontCode: '"Geist Mono", "SF Mono", Monaco, "Courier New", monospace',
});

addons.setConfig({
  theme: atmanTheme,
  sidebar: {
    showRoots: true,
    collapsedRoots: ['other'],
  },
  toolbar: {
    title: { hidden: false },
    zoom: { hidden: false },
    eject: { hidden: false },
    copy: { hidden: false },
    fullscreen: { hidden: false },
  },
});
