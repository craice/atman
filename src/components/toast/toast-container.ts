import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { ToastVariant } from './toast.js';
import './toast.js';

export interface ToastData {
  id: string;
  variant: ToastVariant;
  title?: string;
  description?: string;
  duration?: number;
  actionLabel?: string;
  onAction?: () => void;
}

/**
 * @element atman-toast-container
 * @description A container for managing and displaying toast notifications.
 *
 * @csspart container - The toast container
 */
@customElement('atman-toast-container')
export class AtmanToastContainer extends LitElement {
  static styles = css`
    :host {
      display: block;
      position: fixed;
      z-index: var(--atman-z-toast);
      pointer-events: none;
    }

    :host([position="top-right"]) {
      top: var(--atman-space-4);
      right: var(--atman-space-4);
    }

    :host([position="top-left"]) {
      top: var(--atman-space-4);
      left: var(--atman-space-4);
    }

    :host([position="bottom-right"]) {
      bottom: var(--atman-space-4);
      right: var(--atman-space-4);
    }

    :host([position="bottom-left"]) {
      bottom: var(--atman-space-4);
      left: var(--atman-space-4);
    }

    :host([position="top-center"]) {
      top: var(--atman-space-4);
      left: 50%;
      transform: translateX(-50%);
    }

    :host([position="bottom-center"]) {
      bottom: var(--atman-space-4);
      left: 50%;
      transform: translateX(-50%);
    }

    .container {
      display: flex;
      flex-direction: column;
      gap: var(--atman-space-2);
    }

    :host([position^="bottom"]) .container {
      flex-direction: column-reverse;
    }
  `;

  /** Position of the toast container */
  @property({ type: String, reflect: true })
  position: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center' = 'top-right';

  /** Maximum number of toasts to show at once */
  @property({ type: Number })
  maxToasts = 5;

  @state()
  private toasts: ToastData[] = [];

  private static instance: AtmanToastContainer | null = null;

  connectedCallback() {
    super.connectedCallback();
    AtmanToastContainer.instance = this;
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (AtmanToastContainer.instance === this) {
      AtmanToastContainer.instance = null;
    }
  }

  /** Get the singleton instance */
  static getInstance(): AtmanToastContainer | null {
    return AtmanToastContainer.instance;
  }

  /** Add a toast notification */
  addToast(options: Omit<ToastData, 'id'>): string {
    const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

    const toast: ToastData = {
      id,
      ...options,
      variant: options.variant || 'info',
    };

    // Add to beginning or end based on position
    if (this.position.startsWith('bottom')) {
      this.toasts = [toast, ...this.toasts].slice(0, this.maxToasts);
    } else {
      this.toasts = [...this.toasts, toast].slice(-this.maxToasts);
    }

    return id;
  }

  /** Remove a toast by ID */
  removeToast(id: string) {
    this.toasts = this.toasts.filter((t) => t.id !== id);
  }

  /** Clear all toasts */
  clearAll() {
    this.toasts = [];
  }

  private handleDismiss(id: string) {
    this.removeToast(id);
  }

  private handleAction(toast: ToastData) {
    if (toast.onAction) {
      toast.onAction();
    }
    this.removeToast(toast.id);
  }

  render() {
    return html`
      <div part="container" class="container">
        ${this.toasts.map(
          (toast) => html`
            <atman-toast
              variant=${toast.variant}
              toast-title=${toast.title || ''}
              description=${toast.description || ''}
              duration=${toast.duration ?? 5000}
              action-label=${toast.actionLabel || ''}
              @atman-dismiss=${() => this.handleDismiss(toast.id)}
              @atman-action=${() => this.handleAction(toast)}
            ></atman-toast>
          `
        )}
      </div>
    `;
  }
}

// Helper function to show a toast
export function toast(options: Omit<ToastData, 'id'> | string): string | undefined {
  const container = AtmanToastContainer.getInstance();

  if (!container) {
    console.warn('[atman-toast] No toast container found. Add <atman-toast-container> to your page.');
    return undefined;
  }

  if (typeof options === 'string') {
    return container.addToast({ variant: 'info', description: options });
  }

  return container.addToast(options);
}

// Shorthand functions
toast.info = (title: string, description?: string) =>
  toast({ variant: 'info', title, description });

toast.success = (title: string, description?: string) =>
  toast({ variant: 'success', title, description });

toast.warning = (title: string, description?: string) =>
  toast({ variant: 'warning', title, description });

toast.error = (title: string, description?: string) =>
  toast({ variant: 'error', title, description });

declare global {
  interface HTMLElementTagNameMap {
    'atman-toast-container': AtmanToastContainer;
  }
}
