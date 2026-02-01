import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../components/button/button.js';
import '../components/input/input.js';
import '../components/alert/alert.js';
import '../components/badge/badge.js';

const meta: Meta = {
  title: 'Guidelines',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj;

export const Guidelines: Story = {
  render: () => html`
    <style>
      .guide-container {
        font-family: var(--atman-font-family, 'Geist', sans-serif);
        max-width: 900px;
        margin: 0 auto;
        padding: 32px;
      }

      .guide-title {
        font-size: 36px;
        font-weight: 700;
        color: var(--atman-color-text, #212121);
        margin: 0 0 16px;
      }

      .guide-subtitle {
        font-size: 18px;
        color: var(--atman-color-text-secondary, #616161);
        margin: 0 0 48px;
        line-height: 1.6;
      }

      .guide-section {
        margin-bottom: 64px;
      }

      .guide-section-title {
        font-size: 24px;
        font-weight: 600;
        color: var(--atman-color-text, #212121);
        margin: 0 0 24px;
      }

      .dodont-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 24px;
      }

      @media (max-width: 768px) {
        .dodont-grid {
          grid-template-columns: 1fr;
        }
      }

      .dodont-card {
        border-radius: 12px;
        overflow: hidden;
      }

      .dodont-do {
        border: 2px solid #1E8E3E;
      }

      .dodont-dont {
        border: 2px solid #D93025;
      }

      .dodont-header {
        padding: 12px 16px;
        font-weight: 600;
        font-size: 14px;
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .dodont-do .dodont-header {
        background: #E6F4EA;
        color: #1E8E3E;
      }

      .dodont-dont .dodont-header {
        background: #FCE8E6;
        color: #D93025;
      }

      .dodont-preview {
        padding: 32px;
        background: var(--atman-color-background, #FFFFFF);
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 120px;
      }

      .dodont-caption {
        padding: 16px;
        background: var(--atman-color-background-subtle, #F5F5F5);
        font-size: 14px;
        color: var(--atman-color-text-secondary, #616161);
        line-height: 1.5;
      }
    </style>

    <div class="guide-container">
      <h1 class="guide-title">Guidelines</h1>
      <p class="guide-subtitle">
        Best practices for using Atman components effectively.
        Follow these do's and don'ts for a consistent user experience.
      </p>

      <div class="guide-section">
        <h2 class="guide-section-title">Buttons</h2>

        <div class="dodont-grid">
          <div class="dodont-card dodont-do">
            <div class="dodont-header">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              Do
            </div>
            <div class="dodont-preview">
              <atman-button variant="primary">Save changes</atman-button>
            </div>
            <div class="dodont-caption">
              Use clear, action-oriented labels that describe what happens when clicked.
            </div>
          </div>

          <div class="dodont-card dodont-dont">
            <div class="dodont-header">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
              Don't
            </div>
            <div class="dodont-preview">
              <atman-button variant="primary">Click here</atman-button>
            </div>
            <div class="dodont-caption">
              Avoid vague labels that don't communicate the action clearly.
            </div>
          </div>
        </div>

        <div class="dodont-grid" style="margin-top: 24px">
          <div class="dodont-card dodont-do">
            <div class="dodont-header">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              Do
            </div>
            <div class="dodont-preview">
              <div style="display: flex; gap: 12px">
                <atman-button variant="ghost">Cancel</atman-button>
                <atman-button variant="primary">Confirm</atman-button>
              </div>
            </div>
            <div class="dodont-caption">
              Use primary for the main action and ghost/secondary for secondary actions.
            </div>
          </div>

          <div class="dodont-card dodont-dont">
            <div class="dodont-header">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
              Don't
            </div>
            <div class="dodont-preview">
              <div style="display: flex; gap: 12px">
                <atman-button variant="primary">Cancel</atman-button>
                <atman-button variant="primary">Confirm</atman-button>
              </div>
            </div>
            <div class="dodont-caption">
              Avoid using multiple primary buttons together - it creates confusion about the main action.
            </div>
          </div>
        </div>
      </div>

      <div class="guide-section">
        <h2 class="guide-section-title">Forms</h2>

        <div class="dodont-grid">
          <div class="dodont-card dodont-do">
            <div class="dodont-header">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              Do
            </div>
            <div class="dodont-preview">
              <div style="width: 100%; max-width: 300px">
                <atman-input label="Email address" type="email" placeholder="you@example.com"></atman-input>
              </div>
            </div>
            <div class="dodont-caption">
              Always include clear labels and helpful placeholder text.
            </div>
          </div>

          <div class="dodont-card dodont-dont">
            <div class="dodont-header">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
              Don't
            </div>
            <div class="dodont-preview">
              <div style="width: 100%; max-width: 300px">
                <atman-input placeholder="Email"></atman-input>
              </div>
            </div>
            <div class="dodont-caption">
              Don't rely on placeholder text as the only label - it disappears when typing.
            </div>
          </div>
        </div>

        <div class="dodont-grid" style="margin-top: 24px">
          <div class="dodont-card dodont-do">
            <div class="dodont-header">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              Do
            </div>
            <div class="dodont-preview">
              <div style="width: 100%; max-width: 300px">
                <atman-input label="Password" type="password" error="Password must be at least 8 characters"></atman-input>
              </div>
            </div>
            <div class="dodont-caption">
              Show specific, helpful error messages that explain how to fix the issue.
            </div>
          </div>

          <div class="dodont-card dodont-dont">
            <div class="dodont-header">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
              Don't
            </div>
            <div class="dodont-preview">
              <div style="width: 100%; max-width: 300px">
                <atman-input label="Password" type="password" error="Invalid input"></atman-input>
              </div>
            </div>
            <div class="dodont-caption">
              Avoid generic error messages that don't help the user understand the problem.
            </div>
          </div>
        </div>
      </div>

      <div class="guide-section">
        <h2 class="guide-section-title">Alerts & Feedback</h2>

        <div class="dodont-grid">
          <div class="dodont-card dodont-do">
            <div class="dodont-header">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              Do
            </div>
            <div class="dodont-preview">
              <atman-alert variant="success">Your profile has been updated successfully.</atman-alert>
            </div>
            <div class="dodont-caption">
              Use success alerts to confirm completed actions.
            </div>
          </div>

          <div class="dodont-card dodont-dont">
            <div class="dodont-header">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
              Don't
            </div>
            <div class="dodont-preview">
              <atman-alert variant="error">Your profile has been updated successfully.</atman-alert>
            </div>
            <div class="dodont-caption">
              Never use error styling for positive messages - it confuses users.
            </div>
          </div>
        </div>
      </div>

      <div class="guide-section">
        <h2 class="guide-section-title">Modals</h2>

        <div class="dodont-grid">
          <div class="dodont-card dodont-do">
            <div class="dodont-header">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              Do
            </div>
            <div class="dodont-preview" style="flex-direction: column; gap: 12px; align-items: stretch">
              <div style="font-weight: 600">Delete item?</div>
              <div style="font-size: 14px; color: #616161">This action cannot be undone.</div>
              <div style="display: flex; gap: 8px; justify-content: flex-end; margin-top: 8px">
                <atman-button variant="ghost" size="sm">Cancel</atman-button>
                <atman-button variant="destructive" size="sm">Delete</atman-button>
              </div>
            </div>
            <div class="dodont-caption">
              Use clear titles, explain consequences, and provide obvious cancel option.
            </div>
          </div>

          <div class="dodont-card dodont-dont">
            <div class="dodont-header">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
              Don't
            </div>
            <div class="dodont-preview" style="flex-direction: column; gap: 12px; align-items: stretch">
              <div style="font-weight: 600">Are you sure?</div>
              <div style="display: flex; gap: 8px; justify-content: flex-end; margin-top: 8px">
                <atman-button variant="primary" size="sm">Yes</atman-button>
                <atman-button variant="primary" size="sm">No</atman-button>
              </div>
            </div>
            <div class="dodont-caption">
              Avoid vague titles and Yes/No buttons that don't clearly describe the action.
            </div>
          </div>
        </div>
      </div>

      <div class="guide-section">
        <h2 class="guide-section-title">Badges</h2>

        <div class="dodont-grid">
          <div class="dodont-card dodont-do">
            <div class="dodont-header">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              Do
            </div>
            <div class="dodont-preview">
              <div style="display: flex; gap: 8px">
                <atman-badge variant="success">Active</atman-badge>
                <atman-badge variant="warning">Pending</atman-badge>
                <atman-badge variant="error">Expired</atman-badge>
              </div>
            </div>
            <div class="dodont-caption">
              Use semantic colors consistently - green for positive, yellow for caution, red for negative.
            </div>
          </div>

          <div class="dodont-card dodont-dont">
            <div class="dodont-header">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
              Don't
            </div>
            <div class="dodont-preview">
              <div style="display: flex; gap: 8px">
                <atman-badge variant="error">Active</atman-badge>
                <atman-badge variant="success">Pending</atman-badge>
                <atman-badge variant="warning">Expired</atman-badge>
              </div>
            </div>
            <div class="dodont-caption">
              Don't use colors arbitrarily - users rely on color to quickly understand status.
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
};
