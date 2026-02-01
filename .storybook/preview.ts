import type { Preview } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../src/styles/fonts.css';
import '../src/tokens/index.css';
import '../src/styles/base.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
      expanded: true,
    },
    backgrounds: {
      options: {
        light: { name: 'light', value: '#FAFAFA' },
        dark: { name: 'dark', value: '#212121' }
      }
    },
    viewport: {
      options: {
        mobile: {
          name: 'Mobile',
          styles: { width: '375px', height: '667px' },
        },
        mobileLarge: {
          name: 'Mobile Large',
          styles: { width: '414px', height: '896px' },
        },
        tablet: {
          name: 'Tablet',
          styles: { width: '768px', height: '1024px' },
        },
        desktop: {
          name: 'Desktop',
          styles: { width: '1280px', height: '800px' },
        },
        desktopLarge: {
          name: 'Desktop Large',
          styles: { width: '1920px', height: '1080px' },
        },
      },
    },
    docs: {
      toc: {
        title: 'On this page',
        headingSelector: 'h2, h3',
      },
    },
    options: {
      storySort: {
        order: [
          'Introduction',
          'Getting Started',
          'Design Tokens',
          ['Colors', 'Typography', 'Spacing'],
          'Components',
          [
            'Primitives',
            ['Button', 'Badge', 'Avatar', 'Icon'],
            'Form Controls',
            ['Input', 'Select', 'Checkbox', 'Radio'],
            'Feedback',
            ['Alert', 'Toast', 'Skeleton', 'Tooltip'],
            'Layout',
            ['Card', 'Modal', 'Tabs', 'Divider'],
          ],
          'Examples',
          'Guidelines',
          'Accessibility',
          'Changelog',
        ],
      },
    },
    layout: 'centered',
  },

  globalTypes: {
    theme: {
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: [
          { value: 'light', icon: 'sun', title: 'Light' },
          { value: 'dark', icon: 'moon', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
  },

  decorators: [
    (story, context) => {
      const theme = context.globals.theme || 'light';
      document.documentElement.setAttribute('data-theme', theme);

      // Also update background based on theme
      if (theme === 'dark') {
        document.body.style.backgroundColor = '#212121';
      } else {
        document.body.style.backgroundColor = '#FAFAFA';
      }

      return html`
        <div style="padding: 1rem;">
          ${story()}
        </div>
      `;
    },
  ],

  initialGlobals: {
    backgrounds: {
      value: 'light'
    }
  }
};

export default preview;
