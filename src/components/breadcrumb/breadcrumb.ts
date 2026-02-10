import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

/**
 * @element atman-breadcrumb-item
 * @description A single breadcrumb item. Renders as a link when href is provided.
 *
 * @slot - Default slot for item content
 * @slot separator - Custom separator (overrides parent's default)
 *
 * @csspart item - The breadcrumb item container
 * @csspart link - The link element (when href is set)
 * @csspart text - The text element (when no href)
 * @csspart separator - The separator element
 */
@customElement('atman-breadcrumb-item')
export class AtmanBreadcrumbItem extends LitElement {
  static styles = css`
    :host {
      display: inline-flex;
      align-items: center;
    }

    .item {
      display: inline-flex;
      align-items: center;
      gap: var(--atman-space-2);
    }

    .link {
      font-family: var(--atman-font-family);
      font-size: var(--atman-font-size-sm);
      color: var(--atman-color-primary);
      text-decoration: none;
      transition: color var(--atman-duration-fast) var(--atman-easing-default);
    }

    .link:hover {
      color: var(--atman-color-primary-hover);
      text-decoration: underline;
    }

    .link:focus-visible {
      outline: var(--atman-focus-ring-width) solid var(--atman-focus-ring-color);
      outline-offset: 2px;
      border-radius: var(--atman-radius-sm);
    }

    .text {
      font-family: var(--atman-font-family);
      font-size: var(--atman-font-size-sm);
      color: var(--atman-color-text);
    }

    .text--current {
      font-weight: var(--atman-font-weight-medium);
    }

    .separator {
      display: inline-flex;
      align-items: center;
      color: var(--atman-color-text-tertiary);
      margin: 0 var(--atman-space-1);
    }

    .separator svg {
      width: 16px;
      height: 16px;
    }

    :host(:last-child) .separator {
      display: none;
    }

    /* Reduced motion */
    @media (prefers-reduced-motion: reduce) {
      .link {
        transition: none;
      }
    }
  `;

  /** URL for the breadcrumb link. If not set, renders as text. */
  @property({ type: String })
  href?: string;

  /** Whether this is the current/active page */
  @property({ type: Boolean, reflect: true })
  current = false;

  render() {
    const textClasses = {
      text: true,
      'text--current': this.current,
    };

    return html`
      <span part="item" class="item">
        ${this.href && !this.current
          ? html`<a part="link" class="link" href=${this.href}><slot></slot></a>`
          : html`<span part="text" class=${classMap(textClasses)} ${this.current ? html`` : nothing} aria-current=${this.current ? 'page' : nothing}><slot></slot></span>`}
        <span part="separator" class="separator" aria-hidden="true">
          <slot name="separator">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="m9 18 6-6-6-6"/>
            </svg>
          </slot>
        </span>
      </span>
    `;
  }
}

/**
 * @element atman-breadcrumb
 * @description A breadcrumb navigation component.
 *
 * @slot - Default slot for atman-breadcrumb-item elements
 *
 * @csspart nav - The nav element
 * @csspart list - The breadcrumb list
 */
@customElement('atman-breadcrumb')
export class AtmanBreadcrumb extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .breadcrumb {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
    }
  `;

  render() {
    return html`
      <nav part="nav" aria-label="Breadcrumb">
        <div part="list" class="breadcrumb">
          <slot></slot>
        </div>
      </nav>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'atman-breadcrumb': AtmanBreadcrumb;
    'atman-breadcrumb-item': AtmanBreadcrumbItem;
  }
}
