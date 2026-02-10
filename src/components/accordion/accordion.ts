import { LitElement, html, css } from 'lit';
import { customElement, property, queryAssignedElements } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

/**
 * @element atman-accordion-item
 * @description A single accordion item with header and collapsible content.
 *
 * @slot header - The header/trigger content
 * @slot - Default slot for the collapsible panel content
 *
 * @csspart item - The accordion item container
 * @csspart header - The header button
 * @csspart icon - The expand/collapse chevron
 * @csspart content - The content panel
 *
 * @fires atman-toggle - Fired when the item is toggled
 */
@customElement('atman-accordion-item')
export class AtmanAccordionItem extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .item {
      border-bottom: 1px solid var(--atman-color-border);
    }

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      padding: var(--atman-space-4) 0;
      background: transparent;
      border: none;
      font-family: var(--atman-font-family);
      font-size: var(--atman-font-size-sm);
      font-weight: var(--atman-font-weight-medium);
      color: var(--atman-color-text);
      cursor: pointer;
      text-align: left;
      transition: color var(--atman-duration-fast) var(--atman-easing-default);
    }

    .header:hover:not(:disabled) {
      color: var(--atman-color-primary);
    }

    .header:focus-visible {
      outline: var(--atman-focus-ring-width) solid var(--atman-focus-ring-color);
      outline-offset: -2px;
      border-radius: var(--atman-radius-sm);
    }

    .header:disabled {
      color: var(--atman-color-text-tertiary);
      cursor: not-allowed;
    }

    .icon {
      flex-shrink: 0;
      width: 16px;
      height: 16px;
      color: var(--atman-color-text-secondary);
      transition: transform var(--atman-duration-fast) var(--atman-easing-default);
    }

    .icon--expanded {
      transform: rotate(180deg);
    }

    .content-wrapper {
      display: grid;
      grid-template-rows: 0fr;
      transition: grid-template-rows var(--atman-duration-normal) var(--atman-easing-default);
    }

    .content-wrapper--expanded {
      grid-template-rows: 1fr;
    }

    .content {
      overflow: hidden;
    }

    .content-inner {
      padding: 0 0 var(--atman-space-4) 0;
      font-family: var(--atman-font-family);
      font-size: var(--atman-font-size-sm);
      color: var(--atman-color-text-secondary);
      line-height: 1.5;
    }

    /* Reduced motion */
    @media (prefers-reduced-motion: reduce) {
      .header,
      .icon,
      .content-wrapper {
        transition: none;
      }
    }
  `;

  /** Whether the item is expanded */
  @property({ type: Boolean, reflect: true })
  expanded = false;

  /** Whether the item is disabled */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  private itemId = `atman-accordion-${Math.random().toString(36).slice(2, 9)}`;

  toggle() {
    if (this.disabled) return;
    this.expanded = !this.expanded;

    this.dispatchEvent(
      new CustomEvent('atman-toggle', {
        bubbles: true,
        composed: true,
        detail: { expanded: this.expanded },
      })
    );
  }

  private handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this.toggle();
    }
  }

  render() {
    const headerId = `${this.itemId}-header`;
    const contentId = `${this.itemId}-content`;

    const iconClasses = {
      icon: true,
      'icon--expanded': this.expanded,
    };

    const wrapperClasses = {
      'content-wrapper': true,
      'content-wrapper--expanded': this.expanded,
    };

    return html`
      <div part="item" class="item">
        <button
          part="header"
          class="header"
          id=${headerId}
          aria-expanded=${this.expanded}
          aria-controls=${contentId}
          ?disabled=${this.disabled}
          @click=${this.toggle}
          @keydown=${this.handleKeydown}
        >
          <slot name="header"></slot>
          <svg part="icon" class=${classMap(iconClasses)} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="m6 9 6 6 6-6"/>
          </svg>
        </button>
        <div class=${classMap(wrapperClasses)}>
          <div
            part="content"
            class="content"
            id=${contentId}
            role="region"
            aria-labelledby=${headerId}
          >
            <div class="content-inner">
              <slot></slot>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

/**
 * @element atman-accordion
 * @description An accordion container that manages collapsible items.
 *
 * @slot - Default slot for atman-accordion-item elements
 *
 * @csspart accordion - The accordion container
 */
@customElement('atman-accordion')
export class AtmanAccordion extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .accordion {
      border-top: 1px solid var(--atman-color-border);
    }
  `;

  /** Whether multiple items can be expanded at once */
  @property({ type: Boolean, reflect: true })
  multiple = false;

  @queryAssignedElements({ selector: 'atman-accordion-item' })
  private items!: AtmanAccordionItem[];

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('atman-toggle', this.handleToggle);
    this.addEventListener('keydown', this.handleKeydown);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('atman-toggle', this.handleToggle);
    this.removeEventListener('keydown', this.handleKeydown);
  }

  private handleToggle = (e: Event) => {
    if (this.multiple) return;

    const toggledItem = (e.target as HTMLElement).closest('atman-accordion-item') as AtmanAccordionItem | null;
    if (!toggledItem || !toggledItem.expanded) return;

    // Close other items
    this.items?.forEach((item) => {
      if (item !== toggledItem && item.expanded) {
        item.expanded = false;
      }
    });
  };

  private handleKeydown = (e: KeyboardEvent) => {
    const target = (e.target as HTMLElement).closest('atman-accordion-item') as AtmanAccordionItem | null;
    if (!target) return;

    const enabledItems = this.items?.filter((item) => !item.disabled) || [];
    const currentIndex = enabledItems.indexOf(target);

    let nextIndex = currentIndex;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        nextIndex = currentIndex < enabledItems.length - 1 ? currentIndex + 1 : 0;
        break;
      case 'ArrowUp':
        e.preventDefault();
        nextIndex = currentIndex > 0 ? currentIndex - 1 : enabledItems.length - 1;
        break;
      case 'Home':
        e.preventDefault();
        nextIndex = 0;
        break;
      case 'End':
        e.preventDefault();
        nextIndex = enabledItems.length - 1;
        break;
      default:
        return;
    }

    if (nextIndex !== currentIndex) {
      const button = enabledItems[nextIndex].shadowRoot?.querySelector('button');
      button?.focus();
    }
  };

  render() {
    return html`
      <div part="accordion" class="accordion">
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'atman-accordion': AtmanAccordion;
    'atman-accordion-item': AtmanAccordionItem;
  }
}
