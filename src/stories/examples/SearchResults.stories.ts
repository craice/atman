import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../../components/input/input.js';
import '../../components/button/button.js';
import '../../components/badge/badge.js';
import '../../components/icon/icon.js';
import '../../components/card/card.js';
import '../../components/skeleton/skeleton.js';

const meta: Meta = {
  title: 'Examples/Search Results',
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj;

export const SearchResults: Story = {
  render: () => html`
    <style>
      .search-container {
        max-width: 800px;
        margin: 0 auto;
        font-family: var(--atman-font-family, 'Geist', sans-serif);
      }

      .search-header {
        margin-bottom: 24px;
      }

      .search-box {
        display: flex;
        gap: 12px;
        margin-bottom: 16px;
      }

      .search-input-wrapper {
        flex: 1;
        position: relative;
      }

      .search-input-wrapper atman-input {
        width: 100%;
      }

      .search-filters {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
      }

      .filter-chip {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 6px 12px;
        background: var(--atman-color-surface, #FFFFFF);
        border: 1px solid var(--atman-color-border, #E0E0E0);
        border-radius: 20px;
        font-size: 13px;
        color: var(--atman-color-text-secondary, #616161);
        cursor: pointer;
        transition: all 0.15s;
      }

      .filter-chip:hover {
        border-color: var(--atman-color-primary, #1A73E8);
        color: var(--atman-color-primary, #1A73E8);
      }

      .filter-chip.active {
        background: var(--atman-color-primary, #1A73E8);
        border-color: var(--atman-color-primary, #1A73E8);
        color: white;
      }

      .search-meta {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;
        padding-bottom: 16px;
        border-bottom: 1px solid var(--atman-color-border, #E0E0E0);
      }

      .search-count {
        font-size: 14px;
        color: var(--atman-color-text-secondary, #616161);
      }

      .search-count strong {
        color: var(--atman-color-text, #212121);
      }

      .search-sort {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 14px;
        color: var(--atman-color-text-secondary, #616161);
      }

      .result-item {
        padding: 20px;
        margin-bottom: 16px;
        background: var(--atman-color-surface, #FFFFFF);
        border: 1px solid var(--atman-color-border, #E0E0E0);
        border-radius: 12px;
        transition: box-shadow 0.15s, border-color 0.15s;
      }

      .result-item:hover {
        box-shadow: var(--atman-shadow-md);
        border-color: var(--atman-color-primary, #1A73E8);
      }

      .result-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 8px;
      }

      .result-title {
        font-size: 18px;
        font-weight: 600;
        color: var(--atman-color-primary, #1A73E8);
        margin: 0;
        text-decoration: none;
        cursor: pointer;
      }

      .result-title:hover {
        text-decoration: underline;
      }

      .result-url {
        font-size: 13px;
        color: var(--atman-color-success, #34A853);
        margin: 0 0 8px;
      }

      .result-snippet {
        font-size: 14px;
        color: var(--atman-color-text-secondary, #616161);
        line-height: 1.6;
        margin: 0 0 12px;
      }

      .result-snippet mark {
        background: rgba(251, 188, 4, 0.3);
        color: inherit;
        padding: 0 2px;
        border-radius: 2px;
      }

      .result-meta {
        display: flex;
        align-items: center;
        gap: 12px;
      }

      .result-tags {
        display: flex;
        gap: 6px;
      }

      .result-date {
        font-size: 12px;
        color: var(--atman-color-text-tertiary, #9E9E9E);
      }

      .pagination {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 8px;
        margin-top: 32px;
      }

      .page-btn {
        min-width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid var(--atman-color-border, #E0E0E0);
        border-radius: 8px;
        background: var(--atman-color-surface, #FFFFFF);
        color: var(--atman-color-text, #212121);
        font-size: 14px;
        cursor: pointer;
        transition: all 0.15s;
      }

      .page-btn:hover {
        border-color: var(--atman-color-primary, #1A73E8);
        color: var(--atman-color-primary, #1A73E8);
      }

      .page-btn.active {
        background: var(--atman-color-primary, #1A73E8);
        border-color: var(--atman-color-primary, #1A73E8);
        color: white;
      }

      .page-btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    </style>

    <div class="search-container">
      <div class="search-header">
        <div class="search-box">
          <div class="search-input-wrapper">
            <atman-input placeholder="Search documentation..." value="design system components">
              <atman-icon name="search" size="sm" slot="prefix"></atman-icon>
            </atman-input>
          </div>
          <atman-button variant="primary">Search</atman-button>
        </div>

        <div class="search-filters">
          <span class="filter-chip active">
            <atman-icon name="file-text" size="sm"></atman-icon>
            All
          </span>
          <span class="filter-chip">
            <atman-icon name="code" size="sm"></atman-icon>
            Components
          </span>
          <span class="filter-chip">
            <atman-icon name="book" size="sm"></atman-icon>
            Guides
          </span>
          <span class="filter-chip">
            <atman-icon name="palette" size="sm"></atman-icon>
            Design Tokens
          </span>
          <span class="filter-chip">
            <atman-icon name="git-branch" size="sm"></atman-icon>
            API Reference
          </span>
        </div>
      </div>

      <div class="search-meta">
        <span class="search-count">Found <strong>24 results</strong> for "design system components"</span>
        <div class="search-sort">
          <span>Sort by:</span>
          <atman-button variant="ghost" size="sm">
            Relevance
            <atman-icon name="chevron-down" size="sm" slot="suffix"></atman-icon>
          </atman-button>
        </div>
      </div>

      <div class="search-results">
        <div class="result-item">
          <div class="result-header">
            <a class="result-title">Button Component - Atman Design System</a>
            <atman-badge variant="info" size="sm">Component</atman-badge>
          </div>
          <p class="result-url">docs/components/button</p>
          <p class="result-snippet">
            The <mark>Button component</mark> is a fundamental building block of the <mark>design system</mark>.
            It supports multiple variants including primary, secondary, outline, and ghost styles...
          </p>
          <div class="result-meta">
            <div class="result-tags">
              <atman-badge size="sm">Primitives</atman-badge>
              <atman-badge size="sm">Interactive</atman-badge>
            </div>
            <span class="result-date">Updated 2 days ago</span>
          </div>
        </div>

        <div class="result-item">
          <div class="result-header">
            <a class="result-title">Getting Started with Design Tokens</a>
            <atman-badge variant="success" size="sm">Guide</atman-badge>
          </div>
          <p class="result-url">docs/tokens/getting-started</p>
          <p class="result-snippet">
            Learn how to use <mark>design</mark> tokens in your project. This guide covers color tokens,
            typography scales, spacing <mark>system</mark>, and how to customize <mark>components</mark>...
          </p>
          <div class="result-meta">
            <div class="result-tags">
              <atman-badge size="sm">Tokens</atman-badge>
              <atman-badge size="sm">CSS Variables</atman-badge>
            </div>
            <span class="result-date">Updated 1 week ago</span>
          </div>
        </div>

        <div class="result-item">
          <div class="result-header">
            <a class="result-title">Card Component - Layout Building Block</a>
            <atman-badge variant="info" size="sm">Component</atman-badge>
          </div>
          <p class="result-url">docs/components/card</p>
          <p class="result-snippet">
            Cards are versatile <mark>components</mark> for grouping related content. The Atman <mark>Design System</mark>
            card supports headers, footers, and multiple content layouts...
          </p>
          <div class="result-meta">
            <div class="result-tags">
              <atman-badge size="sm">Layout</atman-badge>
              <atman-badge size="sm">Container</atman-badge>
            </div>
            <span class="result-date">Updated 3 days ago</span>
          </div>
        </div>

        <div class="result-item">
          <div class="result-header">
            <a class="result-title">Component Architecture Overview</a>
            <atman-badge variant="warning" size="sm">Architecture</atman-badge>
          </div>
          <p class="result-url">docs/architecture/components</p>
          <p class="result-snippet">
            Understanding the <mark>component</mark> architecture helps you build consistent interfaces.
            This guide covers Web <mark>Components</mark>, Lit, and the <mark>design system</mark> structure...
          </p>
          <div class="result-meta">
            <div class="result-tags">
              <atman-badge size="sm">Web Components</atman-badge>
              <atman-badge size="sm">Lit</atman-badge>
            </div>
            <span class="result-date">Updated 2 weeks ago</span>
          </div>
        </div>
      </div>

      <div class="pagination">
        <button class="page-btn" disabled>
          <atman-icon name="chevron-left" size="sm"></atman-icon>
        </button>
        <button class="page-btn active">1</button>
        <button class="page-btn">2</button>
        <button class="page-btn">3</button>
        <button class="page-btn">4</button>
        <span style="color: var(--atman-color-text-tertiary)">...</span>
        <button class="page-btn">12</button>
        <button class="page-btn">
          <atman-icon name="chevron-right" size="sm"></atman-icon>
        </button>
      </div>
    </div>
  `,
};
