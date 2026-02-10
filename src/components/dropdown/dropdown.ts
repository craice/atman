import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

export type MenuItemType = 'default' | 'divider';

/**
 * @element atman-menu-item
 * @description A menu item within a dropdown menu.
 *
 * @slot - Default slot for item content
 * @slot icon - Slot for an icon before the label
 *
 * @csspart item - The menu item container
 * @csspart icon - The icon slot container
 */
@customElement('atman-menu-item')
export class AtmanMenuItem extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .item {
      display: flex;
      align-items: center;
      gap: var(--atman-space-2);
      padding: var(--atman-space-2) var(--atman-space-3);
      font-family: var(--atman-font-family);
      font-size: var(--atman-font-size-sm);
      color: var(--atman-color-text);
      border-radius: var(--atman-radius-sm);
      cursor: pointer;
      transition: background-color var(--atman-duration-fast) var(--atman-easing-default);
      white-space: nowrap;
    }

    .item:hover:not(.item--disabled) {
      background-color: var(--atman-color-surface-hover);
    }

    .item--focused {
      background-color: var(--atman-color-surface-hover);
      outline: none;
    }

    .item--disabled {
      color: var(--atman-color-text-tertiary);
      cursor: not-allowed;
    }

    .divider {
      height: 1px;
      background-color: var(--atman-color-border);
      margin: var(--atman-space-1) 0;
    }

    ::slotted([slot="icon"]) {
      width: 16px;
      height: 16px;
      flex-shrink: 0;
    }

    /* Reduced motion */
    @media (prefers-reduced-motion: reduce) {
      .item {
        transition: none;
      }
    }
  `;

  /** Whether the item is disabled */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /** The type of menu item */
  @property({ type: String, reflect: true })
  type: MenuItemType = 'default';

  /** The value associated with this item */
  @property({ type: String })
  value = '';

  /** Whether the item is visually focused */
  @property({ type: Boolean, attribute: false })
  focused = false;

  render() {
    if (this.type === 'divider') {
      return html`<div class="divider" role="separator"></div>`;
    }

    const itemClasses = {
      item: true,
      'item--disabled': this.disabled,
      'item--focused': this.focused,
    };

    return html`
      <div
        part="item"
        class=${classMap(itemClasses)}
        role="menuitem"
        aria-disabled=${this.disabled ? 'true' : nothing}
        tabindex="-1"
      >
        <slot name="icon"></slot>
        <slot></slot>
      </div>
    `;
  }
}

/**
 * @element atman-dropdown
 * @description A dropdown menu component with keyboard navigation.
 *
 * @slot trigger - The trigger element that opens the menu
 * @slot - Default slot for atman-menu-item elements
 *
 * @csspart dropdown - The dropdown container
 * @csspart menu - The menu panel
 *
 * @fires atman-select - Fired when a menu item is selected
 */
@customElement('atman-dropdown')
export class AtmanDropdown extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
      position: relative;
    }

    .trigger {
      display: inline-flex;
    }

    .menu {
      position: absolute;
      top: 100%;
      left: 0;
      z-index: var(--atman-z-dropdown);
      min-width: 160px;
      margin-top: var(--atman-space-1);
      padding: var(--atman-space-1);
      background-color: var(--atman-color-surface);
      border: 1px solid var(--atman-color-border);
      border-radius: var(--atman-radius-md);
      box-shadow: var(--atman-shadow-lg);
      opacity: 0;
      visibility: hidden;
      transform: translateY(-4px);
      transition: all var(--atman-duration-fast) var(--atman-easing-default);
    }

    .menu--open {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }

    /* Reduced motion */
    @media (prefers-reduced-motion: reduce) {
      .menu {
        transition: none;
      }
    }
  `;

  @state()
  private isOpen = false;

  @state()
  private focusedIndex = -1;

  @query('.trigger')
  private triggerEl!: HTMLElement;

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('click', this.handleOutsideClick);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', this.handleOutsideClick);
  }

  private get menuItems(): AtmanMenuItem[] {
    return Array.from(this.querySelectorAll('atman-menu-item:not([type="divider"])'));
  }

  private get enabledItems(): AtmanMenuItem[] {
    return this.menuItems.filter((item) => !item.disabled);
  }

  private handleOutsideClick = (e: MouseEvent) => {
    if (!this.contains(e.target as Node)) {
      this.close();
    }
  };

  private open() {
    this.isOpen = true;
    this.focusedIndex = -1;
  }

  private close() {
    this.isOpen = false;
    this.focusedIndex = -1;
    this.updateFocusedItem();
  }

  private toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  private selectItem(item: AtmanMenuItem) {
    if (item.disabled) return;

    this.close();

    this.dispatchEvent(
      new CustomEvent('atman-select', {
        bubbles: true,
        composed: true,
        detail: { value: item.value, item },
      })
    );
  }

  private updateFocusedItem() {
    this.menuItems.forEach((item, index) => {
      const allItems = this.menuItems;
      const itemIndex = allItems.indexOf(item);
      item.focused = itemIndex === this.focusedIndex;
    });
  }

  private focusNext() {
    const items = this.enabledItems;
    if (items.length === 0) return;

    const allItems = this.menuItems;
    let nextIndex = this.focusedIndex + 1;

    while (nextIndex < allItems.length) {
      if (!allItems[nextIndex].disabled) {
        this.focusedIndex = nextIndex;
        this.updateFocusedItem();
        return;
      }
      nextIndex++;
    }

    // Wrap around
    for (let i = 0; i < allItems.length; i++) {
      if (!allItems[i].disabled) {
        this.focusedIndex = i;
        this.updateFocusedItem();
        return;
      }
    }
  }

  private focusPrevious() {
    const allItems = this.menuItems;
    if (allItems.length === 0) return;

    let prevIndex = this.focusedIndex - 1;

    while (prevIndex >= 0) {
      if (!allItems[prevIndex].disabled) {
        this.focusedIndex = prevIndex;
        this.updateFocusedItem();
        return;
      }
      prevIndex--;
    }

    // Wrap around
    for (let i = allItems.length - 1; i >= 0; i--) {
      if (!allItems[i].disabled) {
        this.focusedIndex = i;
        this.updateFocusedItem();
        return;
      }
    }
  }

  private handleTriggerKeydown(e: KeyboardEvent) {
    switch (e.key) {
      case 'Enter':
      case ' ':
      case 'ArrowDown':
        e.preventDefault();
        this.open();
        // Focus first item
        requestAnimationFrame(() => this.focusNext());
        break;
      case 'ArrowUp':
        e.preventDefault();
        this.open();
        // Focus last item
        requestAnimationFrame(() => {
          this.focusedIndex = this.menuItems.length;
          this.focusPrevious();
        });
        break;
    }
  }

  private handleMenuKeydown(e: KeyboardEvent) {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        this.focusNext();
        break;
      case 'ArrowUp':
        e.preventDefault();
        this.focusPrevious();
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (this.focusedIndex >= 0 && this.focusedIndex < this.menuItems.length) {
          this.selectItem(this.menuItems[this.focusedIndex]);
        }
        break;
      case 'Escape':
        e.preventDefault();
        this.close();
        (this.triggerEl?.querySelector('slot')?.assignedElements()[0] as HTMLElement)?.focus();
        break;
      case 'Home':
        e.preventDefault();
        this.focusedIndex = -1;
        this.focusNext();
        break;
      case 'End':
        e.preventDefault();
        this.focusedIndex = this.menuItems.length;
        this.focusPrevious();
        break;
    }
  }

  private handleMenuClick(e: Event) {
    const menuItem = (e.target as HTMLElement).closest('atman-menu-item') as AtmanMenuItem | null;
    if (menuItem && !menuItem.disabled && menuItem.type !== 'divider') {
      this.selectItem(menuItem);
    }
  }

  render() {
    const menuClasses = {
      menu: true,
      'menu--open': this.isOpen,
    };

    return html`
      <div part="dropdown">
        <div
          class="trigger"
          @click=${this.toggle}
          @keydown=${this.handleTriggerKeydown}
        >
          <slot name="trigger" aria-haspopup="menu" aria-expanded=${this.isOpen}></slot>
        </div>
        <div
          part="menu"
          class=${classMap(menuClasses)}
          role="menu"
          @keydown=${this.handleMenuKeydown}
          @click=${this.handleMenuClick}
        >
          <slot></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'atman-dropdown': AtmanDropdown;
    'atman-menu-item': AtmanMenuItem;
  }
}
