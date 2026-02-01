import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../components/icon/icon.js';

// Popular Lucide icons organized by category
const iconCategories = {
  'Actions': [
    'plus', 'minus', 'x', 'check', 'edit', 'trash', 'save', 'download', 'upload',
    'copy', 'clipboard', 'share', 'external-link', 'refresh-cw', 'rotate-cw',
    'maximize', 'minimize', 'move', 'grip-vertical', 'more-horizontal', 'more-vertical'
  ],
  'Arrows': [
    'arrow-up', 'arrow-down', 'arrow-left', 'arrow-right',
    'chevron-up', 'chevron-down', 'chevron-left', 'chevron-right',
    'chevrons-up', 'chevrons-down', 'chevrons-left', 'chevrons-right',
    'arrow-up-right', 'arrow-down-left', 'corner-up-right', 'corner-down-left'
  ],
  'Communication': [
    'mail', 'inbox', 'send', 'message-circle', 'message-square',
    'phone', 'phone-call', 'video', 'at-sign', 'paperclip'
  ],
  'Media': [
    'play', 'pause', 'stop-circle', 'skip-back', 'skip-forward',
    'volume', 'volume-1', 'volume-2', 'volume-x', 'mic', 'mic-off',
    'image', 'camera', 'film', 'music'
  ],
  'Files & Folders': [
    'file', 'file-text', 'file-plus', 'file-minus', 'file-check',
    'folder', 'folder-open', 'folder-plus', 'archive', 'package'
  ],
  'UI Elements': [
    'menu', 'sidebar', 'layout', 'grid', 'list', 'columns',
    'square', 'circle', 'triangle', 'star', 'heart', 'bookmark',
    'tag', 'flag', 'bell', 'bell-off'
  ],
  'User & People': [
    'user', 'user-plus', 'user-minus', 'user-check', 'user-x',
    'users', 'contact', 'smile', 'frown', 'meh'
  ],
  'Status': [
    'check-circle', 'x-circle', 'alert-circle', 'alert-triangle', 'info',
    'help-circle', 'ban', 'loader', 'clock', 'calendar'
  ],
  'Navigation': [
    'home', 'search', 'settings', 'sliders', 'filter',
    'map', 'map-pin', 'compass', 'navigation', 'globe'
  ],
  'Development': [
    'code', 'terminal', 'git-branch', 'git-commit', 'git-merge',
    'github', 'database', 'server', 'cloud', 'cpu', 'hard-drive'
  ],
  'Commerce': [
    'shopping-cart', 'shopping-bag', 'credit-card', 'wallet',
    'dollar-sign', 'percent', 'receipt', 'truck', 'package'
  ],
  'Security': [
    'lock', 'unlock', 'key', 'shield', 'shield-check', 'shield-x',
    'eye', 'eye-off', 'fingerprint'
  ]
};

const allIcons = Object.values(iconCategories).flat();

const meta: Meta = {
  title: 'Design Tokens/Icons',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Atman uses Lucide icons. Browse and search the available icons below.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Gallery: Story = {
  render: () => {
    const createCategorySection = (category: string, icons: string[]) => html`
      <div class="icon-category">
        <h3 class="icon-category-title">${category}</h3>
        <div class="icon-grid">
          ${icons.map(icon => html`
            <div class="icon-item" data-icon="${icon}" title="${icon}">
              <atman-icon name="${icon}" size="24"></atman-icon>
              <span class="icon-name">${icon}</span>
            </div>
          `)}
        </div>
      </div>
    `;

    return html`
      <style>
        .icon-gallery {
          font-family: var(--atman-font-family, 'Geist', sans-serif);
          padding: 32px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .icon-header {
          margin-bottom: 32px;
        }

        .icon-title {
          font-size: 36px;
          font-weight: 700;
          color: var(--atman-color-text, #212121);
          margin: 0 0 8px;
        }

        .icon-subtitle {
          font-size: 16px;
          color: var(--atman-color-text-secondary, #616161);
          margin: 0 0 24px;
        }

        .icon-search-wrapper {
          position: relative;
          max-width: 400px;
        }

        .icon-search {
          width: 100%;
          padding: 12px 16px 12px 44px;
          font-size: 16px;
          border: 1px solid var(--atman-color-border, #E0E0E0);
          border-radius: 8px;
          background: var(--atman-color-surface, #FFFFFF);
          color: var(--atman-color-text, #212121);
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }

        .icon-search:focus {
          border-color: var(--atman-color-primary, #1A73E8);
          box-shadow: 0 0 0 3px rgba(26, 115, 232, 0.1);
        }

        .icon-search-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--atman-color-text-tertiary, #9E9E9E);
        }

        .icon-count {
          margin-top: 16px;
          font-size: 14px;
          color: var(--atman-color-text-secondary, #616161);
        }

        .icon-category {
          margin-bottom: 40px;
        }

        .icon-category-title {
          font-size: 18px;
          font-weight: 600;
          color: var(--atman-color-text, #212121);
          margin: 0 0 16px;
          padding-bottom: 8px;
          border-bottom: 1px solid var(--atman-color-border, #E0E0E0);
        }

        .icon-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
          gap: 8px;
        }

        .icon-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          padding: 16px 8px;
          border-radius: 8px;
          cursor: pointer;
          transition: background 0.15s, transform 0.15s;
          text-align: center;
        }

        .icon-item:hover {
          background: var(--atman-color-surface-hover, #F5F5F5);
          transform: scale(1.05);
        }

        .icon-item:active {
          transform: scale(0.98);
        }

        .icon-item.hidden {
          display: none;
        }

        .icon-item atman-icon {
          color: var(--atman-color-text, #212121);
        }

        .icon-name {
          font-size: 11px;
          color: var(--atman-color-text-secondary, #757575);
          word-break: break-word;
          line-height: 1.3;
        }

        .icon-category.hidden {
          display: none;
        }

        .no-results {
          text-align: center;
          padding: 48px;
          color: var(--atman-color-text-secondary, #616161);
        }

        .no-results-icon {
          font-size: 48px;
          margin-bottom: 16px;
          opacity: 0.5;
        }

        .copy-toast {
          position: fixed;
          bottom: 24px;
          left: 50%;
          transform: translateX(-50%) translateY(100px);
          background: var(--atman-color-text, #212121);
          color: white;
          padding: 12px 24px;
          border-radius: 8px;
          font-size: 14px;
          opacity: 0;
          transition: transform 0.3s, opacity 0.3s;
          z-index: 1000;
        }

        .copy-toast.show {
          transform: translateX(-50%) translateY(0);
          opacity: 1;
        }
      </style>

      <div class="icon-gallery">
        <div class="icon-header">
          <h1 class="icon-title">Icon Gallery</h1>
          <p class="icon-subtitle">Click any icon to copy its name. Use with <code>&lt;atman-icon name="..."&gt;</code></p>

          <div class="icon-search-wrapper">
            <svg class="icon-search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.3-4.3"/>
            </svg>
            <input
              type="text"
              class="icon-search"
              placeholder="Search icons..."
              @input=${(e: Event) => {
                const input = e.target as HTMLInputElement;
                const query = input.value.toLowerCase();
                const items = document.querySelectorAll('.icon-item');
                const categories = document.querySelectorAll('.icon-category');
                let visibleCount = 0;

                items.forEach((item) => {
                  const iconName = (item as HTMLElement).dataset.icon || '';
                  const matches = iconName.includes(query);
                  item.classList.toggle('hidden', !matches);
                  if (matches) visibleCount++;
                });

                categories.forEach((cat) => {
                  const visibleItems = cat.querySelectorAll('.icon-item:not(.hidden)');
                  cat.classList.toggle('hidden', visibleItems.length === 0);
                });

                const countEl = document.querySelector('.icon-count');
                if (countEl) {
                  countEl.textContent = query
                    ? `${visibleCount} icons found`
                    : `${allIcons.length} icons available`;
                }
              }}
            />
          </div>
          <p class="icon-count">${allIcons.length} icons available</p>
        </div>

        ${Object.entries(iconCategories).map(([category, icons]) =>
          createCategorySection(category, icons)
        )}

        <div class="copy-toast" id="copyToast">Copied!</div>
      </div>

      <script>
        document.querySelectorAll('.icon-item').forEach(item => {
          item.addEventListener('click', () => {
            const iconName = item.dataset.icon;
            navigator.clipboard.writeText(iconName);
            const toast = document.getElementById('copyToast');
            toast.textContent = 'Copied: ' + iconName;
            toast.classList.add('show');
            setTimeout(() => toast.classList.remove('show'), 2000);
          });
        });
      </script>
    `;
  },
};

export const Sizes: Story = {
  render: () => html`
    <style>
      .sizes-demo {
        display: flex;
        align-items: center;
        gap: 32px;
        padding: 32px;
      }
      .size-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
      }
      .size-label {
        font-size: 12px;
        color: var(--atman-color-text-secondary, #757575);
        font-family: 'Geist Mono', monospace;
      }
    </style>
    <div class="sizes-demo">
      <div class="size-item">
        <atman-icon name="star" size="sm"></atman-icon>
        <span class="size-label">sm (16px)</span>
      </div>
      <div class="size-item">
        <atman-icon name="star" size="md"></atman-icon>
        <span class="size-label">md (20px)</span>
      </div>
      <div class="size-item">
        <atman-icon name="star" size="lg"></atman-icon>
        <span class="size-label">lg (24px)</span>
      </div>
    </div>
  `,
};

export const Colors: Story = {
  render: () => html`
    <style>
      .colors-demo {
        display: flex;
        align-items: center;
        gap: 24px;
        padding: 32px;
      }
      .color-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
      }
      .color-label {
        font-size: 12px;
        color: var(--atman-color-text-secondary, #757575);
      }
    </style>
    <div class="colors-demo">
      <div class="color-item">
        <atman-icon name="heart" size="32" style="color: var(--atman-color-text)"></atman-icon>
        <span class="color-label">Default</span>
      </div>
      <div class="color-item">
        <atman-icon name="heart" size="32" style="color: var(--atman-color-primary)"></atman-icon>
        <span class="color-label">Primary</span>
      </div>
      <div class="color-item">
        <atman-icon name="heart" size="32" style="color: var(--atman-color-success)"></atman-icon>
        <span class="color-label">Success</span>
      </div>
      <div class="color-item">
        <atman-icon name="heart" size="32" style="color: var(--atman-color-warning)"></atman-icon>
        <span class="color-label">Warning</span>
      </div>
      <div class="color-item">
        <atman-icon name="heart" size="32" style="color: var(--atman-color-destructive)"></atman-icon>
        <span class="color-label">Destructive</span>
      </div>
    </div>
  `,
};
