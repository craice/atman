import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state, queryAssignedElements } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

/**
 * @element atman-tab
 * @description A single tab within a tabs component.
 *
 * @slot - Default slot for tab label
 * @slot icon - Slot for tab icon
 */
@customElement('atman-tab')
export class AtmanTab extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
    }

    .tab {
      display: inline-flex;
      align-items: center;
      gap: var(--atman-space-2);
      padding: var(--atman-space-2) var(--atman-space-4);
      background: transparent;
      border: none;
      border-bottom: 2px solid transparent;
      font-family: var(--atman-font-family);
      font-size: var(--atman-font-size-sm);
      font-weight: var(--atman-font-weight-medium);
      color: var(--atman-color-text-secondary);
      cursor: pointer;
      transition: all var(--atman-duration-fast) var(--atman-easing-default);
      white-space: nowrap;
    }

    .tab:hover:not(:disabled) {
      color: var(--atman-color-text);
    }

    .tab:focus-visible {
      outline: var(--atman-focus-ring-width) solid var(--atman-focus-ring-color);
      outline-offset: -2px;
    }

    .tab--selected {
      color: var(--atman-color-primary);
      border-bottom-color: var(--atman-color-primary);
    }

    .tab:disabled {
      color: var(--atman-color-text-tertiary);
      cursor: not-allowed;
    }

    ::slotted([slot="icon"]) {
      width: 16px;
      height: 16px;
    }

    /* Reduced motion */
    @media (prefers-reduced-motion: reduce) {
      .tab {
        transition: none;
      }
    }
  `;

  /** Whether the tab is selected */
  @property({ type: Boolean, reflect: true })
  selected = false;

  /** Whether the tab is disabled */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /** The value associated with this tab */
  @property({ type: String })
  value = '';

  /** Internal ID for accessibility relationships */
  @property({ type: String, attribute: false })
  tabId = '';

  /** Internal panel ID for aria-controls */
  @property({ type: String, attribute: false })
  panelId = '';

  render() {
    const tabClasses = {
      tab: true,
      'tab--selected': this.selected,
    };

    return html`
      <button
        class=${classMap(tabClasses)}
        role="tab"
        id=${this.tabId || nothing}
        aria-selected=${this.selected}
        aria-controls=${this.panelId || nothing}
        ?disabled=${this.disabled}
        tabindex=${this.selected ? '0' : '-1'}
      >
        <slot name="icon"></slot>
        <slot></slot>
      </button>
    `;
  }
}

/**
 * @element atman-tab-panel
 * @description A panel containing content for a tab.
 *
 * @slot - Default slot for panel content
 */
@customElement('atman-tab-panel')
export class AtmanTabPanel extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    :host([hidden]) {
      display: none;
    }

    .panel {
      padding: var(--atman-space-4) 0;
    }
  `;

  /** Whether the panel is active/visible */
  @property({ type: Boolean, reflect: true })
  active = false;

  /** The value that links this panel to a tab */
  @property({ type: String })
  value = '';

  /** Internal ID for accessibility relationships */
  @property({ type: String, attribute: false })
  panelId = '';

  /** Internal tab ID for aria-labelledby */
  @property({ type: String, attribute: false })
  tabId = '';

  updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('active')) {
      this.hidden = !this.active;
    }
  }

  render() {
    return html`
      <div
        class="panel"
        role="tabpanel"
        id=${this.panelId || nothing}
        aria-labelledby=${this.tabId || nothing}
        tabindex="0"
      >
        <slot></slot>
      </div>
    `;
  }
}

/**
 * @element atman-tabs
 * @description A tabs container component.
 *
 * @slot - Default slot for atman-tab and atman-tab-panel elements
 *
 * @csspart tabs - The tabs container
 * @csspart tab-list - The tab list container
 *
 * @fires atman-change - Fired when the selected tab changes
 */
@customElement('atman-tabs')
export class AtmanTabs extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .tabs {
      display: flex;
      flex-direction: column;
    }

    .tab-list {
      display: flex;
      border-bottom: 1px solid var(--atman-color-border);
      overflow-x: auto;
      scrollbar-width: none;
    }

    .tab-list::-webkit-scrollbar {
      display: none;
    }

    .panels {
      flex: 1;
    }
  `;

  /** The currently selected tab value */
  @property({ type: String, reflect: true })
  value = '';

  @queryAssignedElements({ selector: 'atman-tab' })
  private tabs!: AtmanTab[];

  @queryAssignedElements({ selector: 'atman-tab-panel' })
  private panels!: AtmanTabPanel[];

  private tabsId = `atman-tabs-${Math.random().toString(36).slice(2, 9)}`;

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('click', this.handleClick);
    this.addEventListener('keydown', this.handleKeydown);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('click', this.handleClick);
    this.removeEventListener('keydown', this.handleKeydown);
  }

  firstUpdated() {
    this.updateSelection();
  }

  updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('value')) {
      this.updateSelection();
    }
  }

  private handleSlotChange() {
    // Set default value if not set
    if (!this.value && this.tabs?.length > 0) {
      const firstEnabledTab = this.tabs.find((tab) => !tab.disabled);
      if (firstEnabledTab) {
        this.value = firstEnabledTab.value;
      }
    }
    this.updateSelection();
  }

  private updateSelection() {
    // Update tabs and set accessibility IDs
    this.tabs?.forEach((tab, index) => {
      const tabId = `${this.tabsId}-tab-${index}`;
      const panelId = `${this.tabsId}-panel-${index}`;
      tab.selected = tab.value === this.value;
      tab.tabId = tabId;
      tab.panelId = panelId;
    });

    // Update panels and set accessibility IDs
    this.panels?.forEach((panel, index) => {
      const tabId = `${this.tabsId}-tab-${index}`;
      const panelId = `${this.tabsId}-panel-${index}`;
      panel.active = panel.value === this.value;
      panel.panelId = panelId;
      panel.tabId = tabId;
    });
  }

  private handleClick = (e: Event) => {
    const tab = (e.target as HTMLElement).closest('atman-tab') as AtmanTab | null;
    if (tab && !tab.disabled) {
      this.selectTab(tab.value);
    }
  };

  private handleKeydown = (e: KeyboardEvent) => {
    const tab = (e.target as HTMLElement).closest('atman-tab') as AtmanTab | null;
    if (!tab) return;

    const enabledTabs = this.tabs?.filter((t) => !t.disabled) || [];
    const currentIndex = enabledTabs.indexOf(tab);

    let nextIndex = currentIndex;

    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        nextIndex = currentIndex > 0 ? currentIndex - 1 : enabledTabs.length - 1;
        break;
      case 'ArrowRight':
        e.preventDefault();
        nextIndex = currentIndex < enabledTabs.length - 1 ? currentIndex + 1 : 0;
        break;
      case 'Home':
        e.preventDefault();
        nextIndex = 0;
        break;
      case 'End':
        e.preventDefault();
        nextIndex = enabledTabs.length - 1;
        break;
      default:
        return;
    }

    if (nextIndex !== currentIndex) {
      const nextTab = enabledTabs[nextIndex];
      this.selectTab(nextTab.value);
      // Focus the tab button
      const button = nextTab.shadowRoot?.querySelector('button');
      button?.focus();
    }
  };

  private selectTab(value: string) {
    if (this.value === value) return;

    this.value = value;
    this.updateSelection();

    this.dispatchEvent(
      new CustomEvent('atman-change', {
        bubbles: true,
        composed: true,
        detail: { value },
      })
    );
  }

  render() {
    return html`
      <div part="tabs" class="tabs">
        <div part="tab-list" class="tab-list" role="tablist">
          <slot name="tab" @slotchange=${this.handleSlotChange}></slot>
        </div>
        <div class="panels">
          <slot @slotchange=${this.handleSlotChange}></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'atman-tabs': AtmanTabs;
    'atman-tab': AtmanTab;
    'atman-tab-panel': AtmanTabPanel;
  }
}
