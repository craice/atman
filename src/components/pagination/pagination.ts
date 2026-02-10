import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

export type PaginationSize = 'sm' | 'md';

/**
 * @element atman-pagination
 * @description A pagination component for navigating paged content.
 *
 * @csspart nav - The nav element
 * @csspart button - A pagination button
 * @csspart button-prev - The previous button
 * @csspart button-next - The next button
 * @csspart button-page - A page number button
 * @csspart ellipsis - An ellipsis element
 *
 * @fires atman-change - Fired when the current page changes
 */
@customElement('atman-pagination')
export class AtmanPagination extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .pagination {
      display: flex;
      align-items: center;
      gap: var(--atman-space-1);
    }

    .button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border: 1px solid var(--atman-color-border);
      background-color: var(--atman-color-surface);
      border-radius: var(--atman-radius-md);
      font-family: var(--atman-font-family);
      font-weight: var(--atman-font-weight-medium);
      color: var(--atman-color-text);
      cursor: pointer;
      transition: all var(--atman-duration-fast) var(--atman-easing-default);
    }

    .button--sm {
      min-width: 32px;
      height: 32px;
      padding: 0 var(--atman-space-2);
      font-size: var(--atman-font-size-xs);
    }

    .button--md {
      min-width: 36px;
      height: 36px;
      padding: 0 var(--atman-space-2);
      font-size: var(--atman-font-size-sm);
    }

    .button:hover:not(:disabled):not(.button--active) {
      background-color: var(--atman-color-surface-hover);
      border-color: var(--atman-color-neutral-400);
    }

    .button:focus-visible {
      outline: var(--atman-focus-ring-width) solid var(--atman-focus-ring-color);
      outline-offset: 2px;
    }

    .button--active {
      background-color: var(--atman-color-primary);
      border-color: var(--atman-color-primary);
      color: var(--atman-color-text-on-primary);
    }

    .button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .button--nav {
      gap: var(--atman-space-1);
    }

    .ellipsis {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-family: var(--atman-font-family);
      color: var(--atman-color-text-secondary);
      letter-spacing: 2px;
    }

    .ellipsis--sm {
      min-width: 32px;
      height: 32px;
      font-size: var(--atman-font-size-xs);
    }

    .ellipsis--md {
      min-width: 36px;
      height: 36px;
      font-size: var(--atman-font-size-sm);
    }

    /* Reduced motion */
    @media (prefers-reduced-motion: reduce) {
      .button {
        transition: none;
      }
    }
  `;

  /** Total number of pages */
  @property({ type: Number, attribute: 'total-pages' })
  totalPages = 1;

  /** The current active page */
  @property({ type: Number, reflect: true, attribute: 'current-page' })
  currentPage = 1;

  /** Number of pages to show around the current page */
  @property({ type: Number, attribute: 'sibling-count' })
  siblingCount = 1;

  /** The size of the pagination */
  @property({ type: String, reflect: true })
  size: PaginationSize = 'md';

  private get pages(): (number | 'ellipsis')[] {
    const total = this.totalPages;
    const current = this.currentPage;
    const siblings = this.siblingCount;

    // If total pages fits in the display, show all
    const totalSlots = siblings * 2 + 5; // siblings + current + 2 ellipsis + first + last
    if (total <= totalSlots) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    const leftSibling = Math.max(current - siblings, 1);
    const rightSibling = Math.min(current + siblings, total);

    const showLeftEllipsis = leftSibling > 2;
    const showRightEllipsis = rightSibling < total - 1;

    const result: (number | 'ellipsis')[] = [];

    if (!showLeftEllipsis && showRightEllipsis) {
      // Show more pages at the start
      const leftCount = siblings * 2 + 3;
      for (let i = 1; i <= leftCount; i++) result.push(i);
      result.push('ellipsis');
      result.push(total);
    } else if (showLeftEllipsis && !showRightEllipsis) {
      // Show more pages at the end
      result.push(1);
      result.push('ellipsis');
      const rightCount = siblings * 2 + 3;
      for (let i = total - rightCount + 1; i <= total; i++) result.push(i);
    } else {
      // Both ellipses
      result.push(1);
      result.push('ellipsis');
      for (let i = leftSibling; i <= rightSibling; i++) result.push(i);
      result.push('ellipsis');
      result.push(total);
    }

    return result;
  }

  private goToPage(page: number) {
    if (page < 1 || page > this.totalPages || page === this.currentPage) return;

    this.currentPage = page;

    this.dispatchEvent(
      new CustomEvent('atman-change', {
        bubbles: true,
        composed: true,
        detail: { page },
      })
    );
  }

  private renderChevronLeft() {
    return html`
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="m15 18-6-6 6-6"/>
      </svg>
    `;
  }

  private renderChevronRight() {
    return html`
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="m9 18 6-6-6-6"/>
      </svg>
    `;
  }

  render() {
    const isFirstPage = this.currentPage <= 1;
    const isLastPage = this.currentPage >= this.totalPages;

    return html`
      <nav part="nav" aria-label="Pagination">
        <div class="pagination">
          <button
            part="button button-prev"
            class="button button--nav button--${this.size}"
            ?disabled=${isFirstPage}
            aria-label="Previous page"
            @click=${() => this.goToPage(this.currentPage - 1)}
          >
            ${this.renderChevronLeft()}
          </button>

          ${this.pages.map((page) =>
            page === 'ellipsis'
              ? html`<span part="ellipsis" class="ellipsis ellipsis--${this.size}" aria-hidden="true">&hellip;</span>`
              : html`
                  <button
                    part="button button-page"
                    class=${classMap({
                      button: true,
                      [`button--${this.size}`]: true,
                      'button--active': page === this.currentPage,
                    })}
                    aria-label="Page ${page}"
                    aria-current=${page === this.currentPage ? 'page' : nothing}
                    @click=${() => this.goToPage(page)}
                  >
                    ${page}
                  </button>
                `
          )}

          <button
            part="button button-next"
            class="button button--nav button--${this.size}"
            ?disabled=${isLastPage}
            aria-label="Next page"
            @click=${() => this.goToPage(this.currentPage + 1)}
          >
            ${this.renderChevronRight()}
          </button>
        </div>
      </nav>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'atman-pagination': AtmanPagination;
  }
}
