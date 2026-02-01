import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../../components/button/button.js';
import '../../components/icon/icon.js';
import '../../components/badge/badge.js';

const meta: Meta = {
  title: 'Examples/File Upload',
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj;

export const FileUpload: Story = {
  render: () => html`
    <style>
      .upload-container {
        width: 500px;
        font-family: var(--atman-font-family, 'Geist', sans-serif);
      }

      .upload-title {
        font-size: 20px;
        font-weight: 600;
        color: var(--atman-color-text, #212121);
        margin: 0 0 8px;
      }

      .upload-subtitle {
        font-size: 14px;
        color: var(--atman-color-text-secondary, #616161);
        margin: 0 0 24px;
      }

      .upload-dropzone {
        border: 2px dashed var(--atman-color-border, #E0E0E0);
        border-radius: 16px;
        padding: 48px 24px;
        text-align: center;
        background: var(--atman-color-surface, #FFFFFF);
        transition: all 0.2s;
        cursor: pointer;
      }

      .upload-dropzone:hover {
        border-color: var(--atman-color-primary, #1A73E8);
        background: rgba(26, 115, 232, 0.02);
      }

      .upload-dropzone.dragover {
        border-color: var(--atman-color-primary, #1A73E8);
        background: rgba(26, 115, 232, 0.05);
        border-style: solid;
      }

      .upload-icon {
        width: 64px;
        height: 64px;
        margin: 0 auto 16px;
        background: rgba(26, 115, 232, 0.1);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--atman-color-primary, #1A73E8);
      }

      .upload-text {
        font-size: 16px;
        color: var(--atman-color-text, #212121);
        margin: 0 0 8px;
      }

      .upload-text strong {
        color: var(--atman-color-primary, #1A73E8);
      }

      .upload-hint {
        font-size: 13px;
        color: var(--atman-color-text-tertiary, #9E9E9E);
        margin: 0;
      }

      .file-list {
        margin-top: 24px;
      }

      .file-item {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px 16px;
        background: var(--atman-color-surface, #FFFFFF);
        border: 1px solid var(--atman-color-border, #E0E0E0);
        border-radius: 12px;
        margin-bottom: 8px;
      }

      .file-icon {
        width: 40px;
        height: 40px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }

      .file-icon.image { background: rgba(156, 39, 176, 0.1); color: #9C27B0; }
      .file-icon.pdf { background: rgba(234, 67, 53, 0.1); color: #EA4335; }
      .file-icon.doc { background: rgba(26, 115, 232, 0.1); color: #1A73E8; }
      .file-icon.zip { background: rgba(251, 188, 4, 0.1); color: #FBBC04; }

      .file-info {
        flex: 1;
        min-width: 0;
      }

      .file-name {
        font-size: 14px;
        font-weight: 500;
        color: var(--atman-color-text, #212121);
        margin: 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .file-meta {
        font-size: 12px;
        color: var(--atman-color-text-tertiary, #9E9E9E);
        margin: 2px 0 0;
      }

      .file-progress {
        width: 100%;
        height: 4px;
        background: var(--atman-color-border, #E0E0E0);
        border-radius: 2px;
        margin-top: 8px;
        overflow: hidden;
      }

      .file-progress-bar {
        height: 100%;
        background: var(--atman-color-primary, #1A73E8);
        border-radius: 2px;
        transition: width 0.3s;
      }

      .file-status {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .file-actions {
        display: flex;
        gap: 4px;
      }

      .upload-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 24px;
        padding-top: 16px;
        border-top: 1px solid var(--atman-color-border, #E0E0E0);
      }

      .upload-summary {
        font-size: 14px;
        color: var(--atman-color-text-secondary, #616161);
      }

      .upload-summary strong {
        color: var(--atman-color-text, #212121);
      }
    </style>

    <div class="upload-container">
      <h2 class="upload-title">Upload Files</h2>
      <p class="upload-subtitle">Add files to your project. Supported formats: JPG, PNG, PDF, DOC, ZIP</p>

      <div class="upload-dropzone">
        <div class="upload-icon">
          <atman-icon name="upload-cloud" size="lg"></atman-icon>
        </div>
        <p class="upload-text"><strong>Click to upload</strong> or drag and drop</p>
        <p class="upload-hint">Maximum file size: 50MB</p>
      </div>

      <div class="file-list">
        <div class="file-item">
          <div class="file-icon image">
            <atman-icon name="image" size="md"></atman-icon>
          </div>
          <div class="file-info">
            <p class="file-name">hero-banner-v2.png</p>
            <p class="file-meta">2.4 MB</p>
          </div>
          <div class="file-status">
            <atman-badge variant="success" size="sm">
              <atman-icon name="check" size="sm"></atman-icon>
              Complete
            </atman-badge>
          </div>
          <div class="file-actions">
            <atman-button variant="ghost" size="sm">
              <atman-icon name="x" size="sm"></atman-icon>
            </atman-button>
          </div>
        </div>

        <div class="file-item">
          <div class="file-icon pdf">
            <atman-icon name="file-text" size="md"></atman-icon>
          </div>
          <div class="file-info">
            <p class="file-name">annual-report-2024.pdf</p>
            <p class="file-meta">8.7 MB • Uploading...</p>
            <div class="file-progress">
              <div class="file-progress-bar" style="width: 65%"></div>
            </div>
          </div>
          <div class="file-status">
            <span style="font-size: 13px; color: var(--atman-color-text-secondary)">65%</span>
          </div>
          <div class="file-actions">
            <atman-button variant="ghost" size="sm">
              <atman-icon name="x" size="sm"></atman-icon>
            </atman-button>
          </div>
        </div>

        <div class="file-item">
          <div class="file-icon doc">
            <atman-icon name="file" size="md"></atman-icon>
          </div>
          <div class="file-info">
            <p class="file-name">project-proposal-draft.docx</p>
            <p class="file-meta">1.2 MB</p>
          </div>
          <div class="file-status">
            <atman-badge variant="success" size="sm">
              <atman-icon name="check" size="sm"></atman-icon>
              Complete
            </atman-badge>
          </div>
          <div class="file-actions">
            <atman-button variant="ghost" size="sm">
              <atman-icon name="x" size="sm"></atman-icon>
            </atman-button>
          </div>
        </div>

        <div class="file-item">
          <div class="file-icon zip">
            <atman-icon name="archive" size="md"></atman-icon>
          </div>
          <div class="file-info">
            <p class="file-name">design-assets.zip</p>
            <p class="file-meta">24.5 MB • Waiting...</p>
          </div>
          <div class="file-status">
            <atman-badge size="sm">Queued</atman-badge>
          </div>
          <div class="file-actions">
            <atman-button variant="ghost" size="sm">
              <atman-icon name="x" size="sm"></atman-icon>
            </atman-button>
          </div>
        </div>
      </div>

      <div class="upload-footer">
        <div class="upload-summary">
          <strong>4 files</strong> selected • 36.8 MB total
        </div>
        <div style="display: flex; gap: 12px;">
          <atman-button variant="outline">Cancel</atman-button>
          <atman-button variant="primary">
            <atman-icon name="upload" size="sm" slot="prefix"></atman-icon>
            Upload All
          </atman-button>
        </div>
      </div>
    </div>
  `,
};
