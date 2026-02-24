import type { Preview } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../src/styles/index.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
      expanded: true,
    },
    backgrounds: { disable: true }, // Disable backgrounds addon - theme controls it
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
            ['Input', 'Select', 'Checkbox', 'Radio', 'Switch', 'Textarea'],
            'Feedback',
            ['Alert', 'Toast', 'Skeleton', 'Tooltip', 'Progress'],
            'Layout',
            ['Card', 'Modal', 'Tabs', 'Divider'],
            'Navigation',
            ['Breadcrumb', 'Pagination', 'Dropdown'],
            'Data Display',
            ['Accordion', 'Table'],
          ],
          'Examples',
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

  initialGlobals: {
    theme: 'light',
  },

  decorators: [
    (story, context) => {
      const theme = context.globals.theme || 'light';
      document.documentElement.setAttribute('data-theme', theme);
      // Use subtle background in light mode so white surface components stand out
      document.body.style.backgroundColor = theme === 'dark'
        ? 'var(--atman-color-background)'
        : 'var(--atman-color-background-subtle)';

      // Inject CSS once to theme the Storybook docs preview containers
      if (!document.getElementById('atman-docs-theme')) {
        const style = document.createElement('style');
        style.id = 'atman-docs-theme';
        style.textContent = `
          .innerZoomElementWrapper,
          .sbdocs-preview,
          .docs-story,
          .sb-story-preview-container {
            background-color: var(--atman-color-background-subtle) !important;
          }
          [data-theme="dark"] .innerZoomElementWrapper,
          [data-theme="dark"] .sbdocs-preview,
          [data-theme="dark"] .docs-story,
          [data-theme="dark"] .sb-story-preview-container {
            background-color: var(--atman-color-background) !important;
          }
        `;
        document.head.appendChild(style);
      }

      return html`
        <div style="padding: 2rem; box-sizing: border-box;">
          ${story()}
        </div>
      `;
    },
  ],
};

export default preview;
