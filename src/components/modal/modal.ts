import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

export type ModalSize = 'sm' | 'md' | 'lg' | 'full';

/**
 * @element atman-modal
 * @description A modal dialog component.
 *
 * @slot - Default slot for modal body content
 * @slot header - Slot for modal header content (title)
 * @slot footer - Slot for modal footer content (actions)
 *
 * @csspart backdrop - The modal backdrop
 * @csspart modal - The modal container
 * @csspart header - The modal header
 * @csspart close - The close button
 * @csspart body - The modal body
 * @csspart footer - The modal footer
 *
 * @fires atman-open - Fired when the modal opens
 * @fires atman-close - Fired when the modal closes
 */
@customElement('atman-modal')
export class AtmanModal extends LitElement {
  static styles = css`
    :host {
      display: contents;
    }

    .backdrop {
      position: fixed;
      inset: 0;
      z-index: var(--atman-z-modal-backdrop);
      background-color: rgba(0, 0, 0, 0.5);
      opacity: 0;
      visibility: hidden;
      transition: opacity var(--atman-duration-normal) var(--atman-easing-default),
                  visibility var(--atman-duration-normal) var(--atman-easing-default);
    }

    .backdrop--open {
      opacity: 1;
      visibility: visible;
    }

    .modal-container {
      position: fixed;
      inset: 0;
      z-index: var(--atman-z-modal);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: var(--atman-space-4);
      pointer-events: none;
    }

    .modal {
      position: relative;
      display: flex;
      flex-direction: column;
      width: 100%;
      max-height: calc(100vh - var(--atman-space-8));
      background-color: var(--atman-color-surface);
      border-radius: var(--atman-radius-lg);
      box-shadow: var(--atman-shadow-xl);
      opacity: 0;
      transform: scale(0.95) translateY(-10px);
      transition: opacity var(--atman-duration-normal) var(--atman-easing-default),
                  transform var(--atman-duration-normal) var(--atman-easing-default);
      pointer-events: none;
    }

    .modal--open {
      opacity: 1;
      transform: scale(1) translateY(0);
      pointer-events: auto;
    }

    /* Sizes */
    .modal--sm {
      max-width: 400px;
    }

    .modal--md {
      max-width: 560px;
    }

    .modal--lg {
      max-width: 800px;
    }

    .modal--full {
      max-width: calc(100vw - var(--atman-space-8));
      max-height: calc(100vh - var(--atman-space-8));
    }

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--atman-space-4);
      padding: var(--atman-space-4) var(--atman-space-5);
      border-bottom: 1px solid var(--atman-color-border-subtle);
      flex-shrink: 0;
    }

    .header-content {
      flex: 1;
      min-width: 0;
      font-family: var(--atman-font-family);
      font-size: var(--atman-font-size-lg);
      font-weight: var(--atman-font-weight-semibold);
      color: var(--atman-color-text);
    }

    .close {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      padding: 0;
      background: transparent;
      border: none;
      border-radius: var(--atman-radius-sm);
      color: var(--atman-color-text-secondary);
      cursor: pointer;
      transition: all var(--atman-duration-fast) var(--atman-easing-default);
      flex-shrink: 0;
    }

    .close:hover {
      background-color: var(--atman-color-surface-hover);
      color: var(--atman-color-text);
    }

    .close:focus-visible {
      outline: var(--atman-focus-ring-width) solid var(--atman-focus-ring-color);
      outline-offset: 2px;
    }

    .body {
      flex: 1;
      padding: var(--atman-space-5);
      overflow-y: auto;
    }

    .footer {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: var(--atman-space-2);
      padding: var(--atman-space-4) var(--atman-space-5);
      border-top: 1px solid var(--atman-color-border-subtle);
      flex-shrink: 0;
    }

    .footer:empty {
      display: none;
    }

    /* Reduced motion */
    @media (prefers-reduced-motion: reduce) {
      .backdrop,
      .modal {
        transition: none;
      }
    }
  `;

  /** Whether the modal is open */
  @property({ type: Boolean, reflect: true })
  open = false;

  /** The size of the modal */
  @property({ type: String, reflect: true })
  size: ModalSize = 'md';

  /** Whether to close on backdrop click */
  @property({ type: Boolean, attribute: 'close-on-backdrop' })
  closeOnBackdrop = true;

  /** Whether to close on escape key */
  @property({ type: Boolean, attribute: 'close-on-escape' })
  closeOnEscape = true;

  /** Whether to show the close button */
  @property({ type: Boolean, attribute: 'show-close' })
  showClose = true;

  /** Modal title (alternative to header slot) */
  @property({ type: String })
  modalTitle?: string;

  @query('.modal')
  private modalEl!: HTMLDivElement;

  private previousActiveElement: HTMLElement | null = null;
  private focusableElements: HTMLElement[] = [];

  updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('open')) {
      if (this.open) {
        this.handleOpen();
      } else {
        this.handleClose();
      }
    }
  }

  private handleOpen() {
    // Store the current active element
    this.previousActiveElement = document.activeElement as HTMLElement;

    // Prevent body scroll
    document.body.style.overflow = 'hidden';

    // Add keyboard listener
    document.addEventListener('keydown', this.handleKeydown);

    // Focus the modal after animation
    setTimeout(() => {
      this.setupFocusTrap();
      this.focusFirstElement();
    }, 50);

    this.dispatchEvent(
      new CustomEvent('atman-open', {
        bubbles: true,
        composed: true,
      })
    );
  }

  private handleClose() {
    // Restore body scroll
    document.body.style.overflow = '';

    // Remove keyboard listener
    document.removeEventListener('keydown', this.handleKeydown);

    // Restore focus
    if (this.previousActiveElement) {
      this.previousActiveElement.focus();
      this.previousActiveElement = null;
    }

    this.dispatchEvent(
      new CustomEvent('atman-close', {
        bubbles: true,
        composed: true,
      })
    );
  }

  private setupFocusTrap() {
    const modal = this.shadowRoot?.querySelector('.modal');
    if (!modal) return;

    const focusableSelectors = [
      'button:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      'a[href]',
      '[tabindex]:not([tabindex="-1"])',
    ].join(', ');

    this.focusableElements = [
      ...Array.from(modal.querySelectorAll<HTMLElement>(focusableSelectors)),
      ...Array.from(this.querySelectorAll<HTMLElement>(focusableSelectors)),
    ];
  }

  private focusFirstElement() {
    if (this.focusableElements.length > 0) {
      this.focusableElements[0].focus();
    } else {
      this.modalEl?.focus();
    }
  }

  private handleKeydown = (e: KeyboardEvent) => {
    if (!this.open) return;

    if (e.key === 'Escape' && this.closeOnEscape) {
      e.preventDefault();
      this.close();
      return;
    }

    if (e.key === 'Tab') {
      this.handleTabKey(e);
    }
  };

  private handleTabKey(e: KeyboardEvent) {
    if (this.focusableElements.length === 0) return;

    const firstElement = this.focusableElements[0];
    const lastElement = this.focusableElements[this.focusableElements.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === firstElement || this.shadowRoot?.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      }
    } else {
      if (document.activeElement === lastElement || this.shadowRoot?.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  }

  private handleBackdropClick(e: MouseEvent) {
    if (this.closeOnBackdrop && e.target === e.currentTarget) {
      this.close();
    }
  }

  /** Close the modal */
  close() {
    this.open = false;
  }

  /** Open the modal */
  show() {
    this.open = true;
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('keydown', this.handleKeydown);
    document.body.style.overflow = '';
  }

  render() {
    const backdropClasses = {
      backdrop: true,
      'backdrop--open': this.open,
    };

    const modalClasses = {
      modal: true,
      [`modal--${this.size}`]: true,
      'modal--open': this.open,
    };

    return html`
      <div
        part="backdrop"
        class=${classMap(backdropClasses)}
        @click=${this.handleBackdropClick}
      ></div>

      <div class="modal-container" @click=${this.handleBackdropClick}>
        <div
          part="modal"
          class=${classMap(modalClasses)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          tabindex="-1"
        >
          <div part="header" class="header">
            <div class="header-content" id="modal-title">
              ${this.modalTitle || html`<slot name="header"></slot>`}
            </div>
            ${this.showClose
              ? html`
                  <button
                    part="close"
                    class="close"
                    type="button"
                    aria-label="Close modal"
                    @click=${this.close}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M18 6 6 18"/>
                      <path d="m6 6 12 12"/>
                    </svg>
                  </button>
                `
              : nothing}
          </div>

          <div part="body" class="body">
            <slot></slot>
          </div>

          <div part="footer" class="footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'atman-modal': AtmanModal;
  }
}
