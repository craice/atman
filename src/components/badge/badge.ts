import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

export type BadgeVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'destructive';
export type BadgeSize = 'sm' | 'md';

/**
 * @element atman-badge
 * @description A badge component for displaying status, labels, or counts.
 *
 * @slot - Default slot for badge content
 * @slot prefix - Content before the main text (e.g., icon)
 *
 * @csspart badge - The badge container element
 */
@customElement('atman-badge')
export class AtmanBadge extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
    }

    .badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: var(--atman-space-1);
      border-radius: var(--atman-radius-full);
      font-family: var(--atman-font-family);
      font-weight: var(--atman-font-weight-medium);
      white-space: nowrap;
      user-select: none;
      transition: background-color var(--atman-duration-fast) var(--atman-easing-default);
    }

    /* Sizes */
    .badge--sm {
      height: 20px;
      padding: 0 var(--atman-space-2);
      font-size: var(--atman-font-size-xs);
    }

    .badge--md {
      height: 24px;
      padding: 0 var(--atman-space-3);
      font-size: var(--atman-font-size-sm);
    }

    /* Primary variant */
    .badge--primary {
      background-color: var(--atman-color-primary-light);
      color: var(--atman-color-primary);
    }

    /* Secondary variant */
    .badge--secondary {
      background-color: var(--atman-color-secondary-light);
      color: var(--atman-color-secondary);
    }

    /* Success variant */
    .badge--success {
      background-color: var(--atman-color-success-light);
      color: var(--atman-color-success);
    }

    /* Warning variant */
    .badge--warning {
      background-color: var(--atman-color-warning-light);
      color: var(--atman-color-warning);
    }

    /* Destructive variant */
    .badge--destructive {
      background-color: var(--atman-color-destructive-light);
      color: var(--atman-color-destructive);
    }

    /* Slots */
    ::slotted([slot="prefix"]) {
      display: flex;
      align-items: center;
    }

    /* Dot variant (no content, just a colored dot) */
    .badge--dot {
      width: 8px;
      height: 8px;
      padding: 0;
      border-radius: 50%;
    }

    .badge--dot.badge--primary {
      background-color: var(--atman-color-primary);
    }

    .badge--dot.badge--secondary {
      background-color: var(--atman-color-secondary);
    }

    .badge--dot.badge--success {
      background-color: var(--atman-color-success);
    }

    .badge--dot.badge--warning {
      background-color: var(--atman-color-warning);
    }

    .badge--dot.badge--destructive {
      background-color: var(--atman-color-destructive);
    }

    /* Reduced motion */
    @media (prefers-reduced-motion: reduce) {
      .badge {
        transition: none;
      }
    }
  `;

  /** The variant style of the badge */
  @property({ type: String, reflect: true })
  variant: BadgeVariant = 'primary';

  /** The size of the badge */
  @property({ type: String, reflect: true })
  size: BadgeSize = 'md';

  /** Whether to display as a dot (no content) */
  @property({ type: Boolean, reflect: true })
  dot = false;

  render() {
    const classes = {
      badge: true,
      [`badge--${this.variant}`]: true,
      [`badge--${this.size}`]: true,
      'badge--dot': this.dot,
    };

    if (this.dot) {
      return html`
        <span part="badge" class=${classMap(classes)} role="status"></span>
      `;
    }

    return html`
      <span part="badge" class=${classMap(classes)}>
        <slot name="prefix"></slot>
        <slot></slot>
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'atman-badge': AtmanBadge;
  }
}
