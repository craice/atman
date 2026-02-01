import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

export type AlertVariant = 'info' | 'success' | 'warning' | 'error';

/**
 * @element atman-alert
 * @description An alert component for displaying important messages.
 *
 * @slot - Default slot for alert description
 * @slot title - Slot for alert title
 * @slot icon - Slot for custom icon
 *
 * @csspart alert - The alert container
 * @csspart icon - The icon container
 * @csspart content - The content container
 * @csspart title - The title element
 * @csspart description - The description element
 * @csspart close - The close button
 *
 * @fires atman-dismiss - Fired when the alert is dismissed
 */
@customElement('atman-alert')
export class AtmanAlert extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    :host([hidden]) {
      display: none;
    }

    .alert {
      display: flex;
      gap: var(--atman-space-3);
      padding: var(--atman-space-4);
      border-radius: var(--atman-radius-md);
      font-family: var(--atman-font-family);
    }

    /* Variants */
    .alert--info {
      background-color: var(--atman-color-primary-light);
      border: 1px solid var(--atman-color-primary);
    }

    .alert--info .icon {
      color: var(--atman-color-primary);
    }

    .alert--success {
      background-color: var(--atman-color-success-light);
      border: 1px solid var(--atman-color-success);
    }

    .alert--success .icon {
      color: var(--atman-color-success);
    }

    .alert--warning {
      background-color: var(--atman-color-warning-light);
      border: 1px solid var(--atman-color-warning);
    }

    .alert--warning .icon {
      color: var(--atman-color-warning);
    }

    .alert--error {
      background-color: var(--atman-color-destructive-light);
      border: 1px solid var(--atman-color-destructive);
    }

    .alert--error .icon {
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
      margin-bottom: var(--atman-space-1);
    }

    .title:only-child {
      margin-bottom: 0;
    }

    .description {
      font-size: var(--atman-font-size-sm);
      color: var(--atman-color-text-secondary);
      line-height: var(--atman-line-height-normal);
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
      color: var(--atman-color-text-secondary);
      cursor: pointer;
      transition: all var(--atman-duration-fast) var(--atman-easing-default);
    }

    .close:hover {
      background-color: rgba(0, 0, 0, 0.1);
      color: var(--atman-color-text);
    }

    .close:focus-visible {
      outline: var(--atman-focus-ring-width) solid var(--atman-focus-ring-color);
      outline-offset: 2px;
    }

    /* Reduced motion */
    @media (prefers-reduced-motion: reduce) {
      .close {
        transition: none;
      }
    }
  `;

  /** The variant style of the alert */
  @property({ type: String, reflect: true })
  variant: AlertVariant = 'info';

  /** The alert title */
  @property({ type: String })
  alertTitle?: string;

  /** Whether the alert can be dismissed */
  @property({ type: Boolean, reflect: true })
  dismissible = false;

  private handleDismiss() {
    this.dispatchEvent(
      new CustomEvent('atman-dismiss', {
        bubbles: true,
        composed: true,
      })
    );

    this.hidden = true;
  }

  private renderIcon() {
    const icons: Record<AlertVariant, ReturnType<typeof html>> = {
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
    const alertClasses = {
      alert: true,
      [`alert--${this.variant}`]: true,
    };

    return html`
      <div
        part="alert"
        class=${classMap(alertClasses)}
        role="alert"
        aria-live=${this.variant === 'error' ? 'assertive' : 'polite'}
      >
        <div part="icon" class="icon">
          <slot name="icon">${this.renderIcon()}</slot>
        </div>

        <div part="content" class="content">
          ${this.alertTitle
            ? html`<div part="title" class="title">${this.alertTitle}</div>`
            : html`<slot name="title"></slot>`}
          <div part="description" class="description">
            <slot></slot>
          </div>
        </div>

        ${this.dismissible
          ? html`
              <button
                part="close"
                class="close"
                type="button"
                aria-label="Dismiss alert"
                @click=${this.handleDismiss}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M18 6 6 18"/>
                  <path d="m6 6 12 12"/>
                </svg>
              </button>
            `
          : nothing}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'atman-alert': AtmanAlert;
  }
}
