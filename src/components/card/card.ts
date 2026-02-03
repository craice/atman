import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

/**
 * @element atman-card
 * @description A card component for grouping related content.
 *
 * @slot - Default slot for card body content
 * @slot header - Slot for card header content
 * @slot footer - Slot for card footer content
 *
 * @csspart card - The card container
 * @csspart header - The card header
 * @csspart body - The card body
 * @csspart footer - The card footer
 *
 * @fires atman-click - Fired when a clickable card is clicked
 */
@customElement('atman-card')
export class AtmanCard extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .card {
      background-color: var(--atman-color-surface);
      border: 1px solid var(--atman-color-border);
      border-radius: var(--atman-radius-md);
      overflow: hidden;
      transition: box-shadow var(--atman-duration-fast) var(--atman-easing-default),
                  border-color var(--atman-duration-fast) var(--atman-easing-default);
    }

    .card--clickable {
      cursor: pointer;
    }

    .card--clickable:hover {
      border-color: var(--atman-color-neutral-400);
      box-shadow: var(--atman-shadow-md);
    }

    .card--clickable:focus-visible {
      outline: var(--atman-focus-ring-width) solid var(--atman-focus-ring-color);
      outline-offset: 2px;
    }

    .card--clickable:active {
      box-shadow: var(--atman-shadow-sm);
    }

    .card--elevated {
      border-color: transparent;
      box-shadow: var(--atman-shadow-md);
    }

    .card--elevated:hover {
      box-shadow: var(--atman-shadow-lg);
    }

    .header {
      padding: var(--atman-space-4);
      border-bottom: 1px solid var(--atman-color-border-subtle);
    }

    .header:empty {
      display: none;
    }

    .body {
      padding: var(--atman-space-4);
    }

    .footer {
      padding: var(--atman-space-4);
      border-top: 1px solid var(--atman-color-border-subtle);
      background-color: var(--atman-color-background-subtle);
    }

    .footer:empty {
      display: none;
    }

    /* Padding variants */
    :host([padding="none"]) .header,
    :host([padding="none"]) .body,
    :host([padding="none"]) .footer {
      padding: 0;
    }

    :host([padding="sm"]) .header,
    :host([padding="sm"]) .body,
    :host([padding="sm"]) .footer {
      padding: var(--atman-space-3);
    }

    :host([padding="lg"]) .header,
    :host([padding="lg"]) .body,
    :host([padding="lg"]) .footer {
      padding: var(--atman-space-6);
    }

    /* Reduced motion */
    @media (prefers-reduced-motion: reduce) {
      .card {
        transition: none;
      }
    }
  `;

  /** Whether the card is clickable */
  @property({ type: Boolean, reflect: true })
  clickable = false;

  /** Whether the card has elevated styling (shadow instead of border) */
  @property({ type: Boolean, reflect: true })
  elevated = false;

  /** Padding size for the card sections */
  @property({ type: String, reflect: true })
  padding: 'none' | 'sm' | 'md' | 'lg' = 'md';

  /** Accessible label for clickable cards (required when clickable) */
  @property({ type: String })
  label?: string;

  private handleClick(e: MouseEvent) {
    if (!this.clickable) return;

    this.dispatchEvent(
      new CustomEvent('atman-click', {
        bubbles: true,
        composed: true,
        detail: { originalEvent: e },
      })
    );
  }

  private handleKeydown(e: KeyboardEvent) {
    if (!this.clickable) return;

    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this.dispatchEvent(
        new CustomEvent('atman-click', {
          bubbles: true,
          composed: true,
        })
      );
    }
  }

  render() {
    const cardClasses = {
      card: true,
      'card--clickable': this.clickable,
      'card--elevated': this.elevated,
    };

    return html`
      <div
        part="card"
        class=${classMap(cardClasses)}
        role=${this.clickable ? 'button' : nothing}
        tabindex=${this.clickable ? '0' : nothing}
        aria-label=${this.clickable && this.label ? this.label : nothing}
        @click=${this.handleClick}
        @keydown=${this.handleKeydown}
      >
        <div part="header" class="header">
          <slot name="header"></slot>
        </div>
        <div part="body" class="body">
          <slot></slot>
        </div>
        <div part="footer" class="footer">
          <slot name="footer"></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'atman-card': AtmanCard;
  }
}
