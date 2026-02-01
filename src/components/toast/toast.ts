import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

export type ToastVariant = 'info' | 'success' | 'warning' | 'error';

export interface ToastOptions {
  variant?: ToastVariant;
  title?: string;
  description?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

/**
 * @element atman-toast
 * @description A toast notification component.
 *
 * @csspart toast - The toast container
 * @csspart icon - The icon container
 * @csspart content - The content container
 * @csspart title - The title element
 * @csspart description - The description element
 * @csspart action - The action button
 * @csspart close - The close button
 *
 * @fires atman-dismiss - Fired when the toast is dismissed
 */
@customElement('atman-toast')
export class AtmanToast extends LitElement {
  static styles = css`
    :host {
      display: block;
      pointer-events: auto;
    }

    .toast {
      display: flex;
      align-items: flex-start;
      gap: var(--atman-space-3);
      min-width: 300px;
      max-width: 420px;
      padding: var(--atman-space-4);
      background-color: var(--atman-color-surface);
      border: 1px solid var(--atman-color-border);
      border-radius: var(--atman-radius-md);
      box-shadow: var(--atman-shadow-lg);
      font-family: var(--atman-font-family);
      animation: slideIn var(--atman-duration-normal) var(--atman-easing-out);
    }

    .toast--exiting {
      animation: slideOut var(--atman-duration-fast) var(--atman-easing-in) forwards;
    }

    @keyframes slideIn {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }

    @keyframes slideOut {
      from {
        transform: translateX(0);
        opacity: 1;
      }
      to {
        transform: translateX(100%);
        opacity: 0;
      }
    }

    /* Variants - left border accent */
    .toast--info {
      border-left: 4px solid var(--atman-color-primary);
    }

    .toast--info .icon {
      color: var(--atman-color-primary);
    }

    .toast--success {
      border-left: 4px solid var(--atman-color-success);
    }

    .toast--success .icon {
      color: var(--atman-color-success);
    }

    .toast--warning {
      border-left: 4px solid var(--atman-color-warning);
    }

    .toast--warning .icon {
      color: var(--atman-color-warning);
    }

    .toast--error {
      border-left: 4px solid var(--atman-color-destructive);
    }

    .toast--error .icon {
      color: var(--atman-color-destructive);
    }

    .icon {
      flex-shrink: 0;
      width: 20px;
      height: 20px;
    }

    .icon svg {
      width: 100%;
      height: 100%;
    }

    .content {
      flex: 1;
      min-width: 0;
    }

    .title {
      font-size: var(--atman-font-size-sm);
      font-weight: var(--atman-font-weight-semibold);
      color: var(--atman-color-text);
    }

    .description {
      font-size: var(--atman-font-size-sm);
      color: var(--atman-color-text-secondary);
      line-height: var(--atman-line-height-normal);
      margin-top: var(--atman-space-1);
    }

    .actions {
      display: flex;
      align-items: center;
      gap: var(--atman-space-2);
      margin-top: var(--atman-space-3);
    }

    .action {
      padding: var(--atman-space-1) var(--atman-space-2);
      background: transparent;
      border: none;
      border-radius: var(--atman-radius-sm);
      font-family: var(--atman-font-family);
      font-size: var(--atman-font-size-sm);
      font-weight: var(--atman-font-weight-medium);
      color: var(--atman-color-primary);
      cursor: pointer;
      transition: background-color var(--atman-duration-fast) var(--atman-easing-default);
    }

    .action:hover {
      background-color: var(--atman-color-primary-light);
    }

    .action:focus-visible {
      outline: var(--atman-focus-ring-width) solid var(--atman-focus-ring-color);
      outline-offset: 2px;
    }

    .close {
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      padding: 0;
      background: transparent;
      border: none;
      border-radius: var(--atman-radius-sm);
      color: var(--atman-color-text-tertiary);
      cursor: pointer;
      transition: all var(--atman-duration-fast) var(--atman-easing-default);
    }

    .close:hover {
      background-color: var(--atman-color-surface-hover);
      color: var(--atman-color-text-secondary);
    }

    .close:focus-visible {
      outline: var(--atman-focus-ring-width) solid var(--atman-focus-ring-color);
      outline-offset: 2px;
    }

    /* Reduced motion */
    @media (prefers-reduced-motion: reduce) {
      .toast {
        animation: none;
      }

      .toast--exiting {
        animation: none;
        opacity: 0;
      }

      .action,
      .close {
        transition: none;
      }
    }
  `;

  /** The variant style of the toast */
  @property({ type: String, reflect: true })
  variant: ToastVariant = 'info';

  /** The toast title */
  @property({ type: String })
  toastTitle?: string;

  /** The toast description */
  @property({ type: String })
  description?: string;

  /** Auto-dismiss duration in milliseconds (0 = no auto-dismiss) */
  @property({ type: Number })
  duration = 5000;

  /** Action button label */
  @property({ type: String, attribute: 'action-label' })
  actionLabel?: string;

  @state()
  private isExiting = false;

  private timeoutId?: number;

  connectedCallback() {
    super.connectedCallback();
    this.startAutoClose();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.clearAutoClose();
  }

  private startAutoClose() {
    if (this.duration > 0) {
      this.timeoutId = window.setTimeout(() => {
        this.dismiss();
      }, this.duration);
    }
  }

  private clearAutoClose() {
    if (this.timeoutId) {
      window.clearTimeout(this.timeoutId);
      this.timeoutId = undefined;
    }
  }

  private dismiss() {
    this.isExiting = true;

    setTimeout(() => {
      this.dispatchEvent(
        new CustomEvent('atman-dismiss', {
          bubbles: true,
          composed: true,
        })
      );
    }, 150); // Match animation duration
  }

  private handleAction() {
    this.dispatchEvent(
      new CustomEvent('atman-action', {
        bubbles: true,
        composed: true,
      })
    );
  }

  private handleMouseEnter() {
    this.clearAutoClose();
  }

  private handleMouseLeave() {
    this.startAutoClose();
  }

  private renderIcon() {
    const icons: Record<ToastVariant, ReturnType<typeof html>> = {
      info: html`
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 16v-4"/>
          <path d="M12 8h.01"/>
        </svg>
      `,
      success: html`
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
          <polyline points="22 4 12 14.01 9 11.01"/>
        </svg>
      `,
      warning: html`
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
          <path d="M12 9v4"/>
          <path d="M12 17h.01"/>
        </svg>
      `,
      error: html`
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <path d="m15 9-6 6"/>
          <path d="m9 9 6 6"/>
        </svg>
      `,
    };

    return icons[this.variant];
  }

  render() {
    const toastClasses = {
      toast: true,
      [`toast--${this.variant}`]: true,
      'toast--exiting': this.isExiting,
    };

    return html`
      <div
        part="toast"
        class=${classMap(toastClasses)}
        role="alert"
        aria-live="polite"
        @mouseenter=${this.handleMouseEnter}
        @mouseleave=${this.handleMouseLeave}
      >
        <div part="icon" class="icon">
          ${this.renderIcon()}
        </div>

        <div part="content" class="content">
          ${this.toastTitle
            ? html`<div part="title" class="title">${this.toastTitle}</div>`
            : nothing}
          ${this.description
            ? html`<div part="description" class="description">${this.description}</div>`
            : nothing}

          ${this.actionLabel
            ? html`
                <div class="actions">
                  <button
                    part="action"
                    class="action"
                    type="button"
                    @click=${this.handleAction}
                  >
                    ${this.actionLabel}
                  </button>
                </div>
              `
            : nothing}
        </div>

        <button
          part="close"
          class="close"
          type="button"
          aria-label="Dismiss"
          @click=${this.dismiss}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 6 6 18"/>
            <path d="m6 6 12 12"/>
          </svg>
        </button>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'atman-toast': AtmanToast;
  }
}
