import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'destructive';
export type ButtonSize = 'sm' | 'md' | 'lg';

/**
 * @element atman-button
 * @description A versatile button component with multiple variants and sizes.
 *
 * @slot - Default slot for button content
 * @slot prefix - Content before the main text (e.g., icon)
 * @slot suffix - Content after the main text (e.g., icon)
 *
 * @csspart button - The native button element
 *
 * @fires atman-click - Fired when the button is clicked
 */
@customElement('atman-button')
export class AtmanButton extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
    }

    :host([disabled]) {
      pointer-events: none;
    }

    .button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: var(--atman-space-2);
      border: none;
      border-radius: var(--atman-radius-md);
      font-family: var(--atman-font-family);
      font-weight: var(--atman-font-weight-medium);
      cursor: pointer;
      transition: all var(--atman-duration-fast) var(--atman-easing-default);
      text-decoration: none;
      white-space: nowrap;
      user-select: none;
      position: relative;
      overflow: hidden;
    }

    /* Sizes */
    .button--sm {
      height: 32px;
      padding: 0 var(--atman-space-3);
      font-size: var(--atman-font-size-sm);
      gap: var(--atman-space-1);
    }

    .button--md {
      height: 40px;
      padding: 0 var(--atman-space-4);
      font-size: var(--atman-font-size-sm);
    }

    .button--lg {
      height: 48px;
      padding: 0 var(--atman-space-5);
      font-size: var(--atman-font-size-md);
    }

    /* Icon only */
    .button--icon-only.button--sm {
      width: 32px;
      padding: 0;
    }

    .button--icon-only.button--md {
      width: 40px;
      padding: 0;
    }

    .button--icon-only.button--lg {
      width: 48px;
      padding: 0;
    }

    /* Primary variant */
    .button--primary {
      background-color: var(--atman-color-primary);
      color: var(--atman-color-text-on-primary);
    }

    .button--primary:hover {
      background-color: var(--atman-color-primary-hover);
    }

    .button--primary:active {
      background-color: var(--atman-color-primary-active);
    }

    /* Secondary variant */
    .button--secondary {
      background-color: var(--atman-color-secondary-light);
      color: var(--atman-color-text);
      border: 1px solid var(--atman-color-border);
    }

    .button--secondary:hover {
      background-color: var(--atman-color-surface-hover);
      border-color: var(--atman-color-border);
    }

    .button--secondary:active {
      background-color: var(--atman-color-neutral-200);
    }

    /* Ghost variant */
    .button--ghost {
      background-color: transparent;
      color: var(--atman-color-text);
    }

    .button--ghost:hover {
      background-color: var(--atman-color-surface-hover);
    }

    .button--ghost:active {
      background-color: var(--atman-color-neutral-200);
    }

    /* Destructive variant */
    .button--destructive {
      background-color: var(--atman-color-destructive);
      color: var(--atman-color-text-on-primary);
    }

    .button--destructive:hover {
      background-color: var(--atman-color-destructive-hover);
    }

    .button--destructive:active {
      background-color: var(--atman-color-destructive-active);
    }

    /* Focus state */
    .button:focus-visible {
      outline: var(--atman-focus-ring-width) solid var(--atman-focus-ring-color);
      outline-offset: var(--atman-focus-ring-offset);
    }

    /* Disabled state */
    .button:disabled,
    .button--disabled {
      opacity: 0.5;
      cursor: not-allowed;
      pointer-events: none;
    }

    /* Loading state */
    .button--loading {
      color: transparent;
      pointer-events: none;
    }

    .button--loading::after {
      content: '';
      position: absolute;
      width: 16px;
      height: 16px;
      border: 2px solid currentColor;
      border-right-color: transparent;
      border-radius: 50%;
      animation: spin 0.6s linear infinite;
    }

    .button--loading.button--primary::after,
    .button--loading.button--destructive::after {
      border-color: var(--atman-color-text-on-primary);
      border-right-color: transparent;
    }

    .button--loading.button--secondary::after,
    .button--loading.button--ghost::after {
      border-color: var(--atman-color-text);
      border-right-color: transparent;
    }

    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }

    /* Slots */
    ::slotted([slot="prefix"]),
    ::slotted([slot="suffix"]) {
      display: flex;
      align-items: center;
    }

    .content {
      display: flex;
      align-items: center;
      gap: var(--atman-space-2);
    }

    /* Full width */
    :host([fullwidth]) {
      display: block;
      width: 100%;
    }

    :host([fullwidth]) .button {
      width: 100%;
    }

    /* Reduced motion */
    @media (prefers-reduced-motion: reduce) {
      .button {
        transition: none;
      }

      .button--loading::after {
        animation: none;
      }
    }
  `;

  /** The variant style of the button */
  @property({ type: String, reflect: true })
  variant: ButtonVariant = 'primary';

  /** The size of the button */
  @property({ type: String, reflect: true })
  size: ButtonSize = 'md';

  /** Whether the button is disabled */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /** Whether the button is in a loading state */
  @property({ type: Boolean, reflect: true })
  loading = false;

  /** Whether the button contains only an icon */
  @property({ type: Boolean, attribute: 'icon-only' })
  iconOnly = false;

  /** The type of the button */
  @property({ type: String })
  type: 'button' | 'submit' | 'reset' = 'button';

  /** Optional label for accessibility */
  @property({ type: String, attribute: 'label' })
  label?: string;

  private handleClick(e: MouseEvent) {
    if (this.disabled || this.loading) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    this.dispatchEvent(
      new CustomEvent('atman-click', {
        bubbles: true,
        composed: true,
        detail: { originalEvent: e },
      })
    );
  }

  render() {
    const classes = {
      button: true,
      [`button--${this.variant}`]: true,
      [`button--${this.size}`]: true,
      'button--disabled': this.disabled,
      'button--loading': this.loading,
      'button--icon-only': this.iconOnly,
    };

    return html`
      <button
        part="button"
        class=${classMap(classes)}
        ?disabled=${this.disabled}
        type=${this.type}
        aria-label=${this.label || nothing}
        aria-busy=${this.loading ? 'true' : nothing}
        aria-disabled=${this.disabled ? 'true' : nothing}
        @click=${this.handleClick}
      >
        <slot name="prefix"></slot>
        <span class="content">
          <slot></slot>
        </span>
        <slot name="suffix"></slot>
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'atman-button': AtmanButton;
  }
}
