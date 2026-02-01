import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';

export type SkeletonVariant = 'text' | 'circular' | 'rectangular';

/**
 * @element atman-skeleton
 * @description A skeleton loading placeholder component.
 *
 * @csspart skeleton - The skeleton element
 */
@customElement('atman-skeleton')
export class AtmanSkeleton extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .skeleton {
      background-color: var(--atman-color-neutral-200);
      animation: pulse 1.5s ease-in-out infinite;
    }

    @keyframes pulse {
      0% {
        opacity: 1;
      }
      50% {
        opacity: 0.4;
      }
      100% {
        opacity: 1;
      }
    }

    /* Variants */
    .skeleton--text {
      height: 1em;
      border-radius: var(--atman-radius-sm);
    }

    .skeleton--circular {
      border-radius: 50%;
    }

    .skeleton--rectangular {
      border-radius: var(--atman-radius-md);
    }

    /* Reduced motion */
    @media (prefers-reduced-motion: reduce) {
      .skeleton {
        animation: none;
      }
    }
  `;

  /** The shape variant of the skeleton */
  @property({ type: String, reflect: true })
  variant: SkeletonVariant = 'text';

  /** Width of the skeleton (CSS value) */
  @property({ type: String })
  width?: string;

  /** Height of the skeleton (CSS value) */
  @property({ type: String })
  height?: string;

  render() {
    const classes = {
      skeleton: true,
      [`skeleton--${this.variant}`]: true,
    };

    const styles: Record<string, string> = {};

    if (this.width) {
      styles.width = this.width;
    } else if (this.variant === 'circular') {
      styles.width = '40px';
    } else {
      styles.width = '100%';
    }

    if (this.height) {
      styles.height = this.height;
    } else if (this.variant === 'circular') {
      styles.height = styles.width;
    } else if (this.variant === 'rectangular') {
      styles.height = '120px';
    }

    return html`
      <div
        part="skeleton"
        class=${classMap(classes)}
        style=${styleMap(styles)}
        aria-hidden="true"
      ></div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'atman-skeleton': AtmanSkeleton;
  }
}
