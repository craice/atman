import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

export type SelectSize = 'sm' | 'md' | 'lg';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

/**
 * @element atman-select
 * @description A custom select component with dropdown menu.
 *
 * @csspart container - The select container
 * @csspart label - The label element
 * @csspart trigger - The trigger button
 * @csspart dropdown - The dropdown menu
 * @csspart option - An option in the dropdown
 * @csspart error - The error message element
 *
 * @fires atman-change - Fired when the selected value changes
 */
@customElement('atman-select')
export class AtmanSelect extends LitElement {
  static styles = css`
    :host {
      display: block;
      position: relative;
    }

    .select-wrapper {
      display: flex;
      flex-direction: column;
      gap: var(--atman-space-1);
    }

    .label {
      font-family: var(--atman-font-family);
      font-size: var(--atman-font-size-sm);
      font-weight: var(--atman-font-weight-medium);
      color: var(--atman-color-text);
    }

    .label--required::after {
      content: ' *';
      color: var(--atman-color-destructive);
    }

    .trigger {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--atman-space-2);
      width: 100%;
      background-color: var(--atman-color-surface);
      border: 1px solid var(--atman-color-border);
      border-radius: var(--atman-radius-md);
      font-family: var(--atman-font-family);
      font-size: var(--atman-font-size-sm);
      color: var(--atman-color-text);
      cursor: pointer;
      transition: all var(--atman-duration-fast) var(--atman-easing-default);
      text-align: left;
    }

    .trigger:hover:not(:disabled) {
      border-color: var(--atman-color-neutral-400);
    }

    .trigger:focus {
      outline: none;
      border-color: var(--atman-color-primary);
      box-shadow: 0 0 0 3px var(--atman-focus-ring-color);
    }

    .trigger--error {
      border-color: var(--atman-color-destructive);
    }

    .trigger--error:focus {
      border-color: var(--atman-color-destructive);
      box-shadow: 0 0 0 3px rgba(217, 48, 37, 0.2);
    }

    .trigger:disabled {
      background-color: var(--atman-color-neutral-100);
      border-color: var(--atman-color-border-subtle);
      color: var(--atman-color-text-tertiary);
      cursor: not-allowed;
    }

    .trigger--open {
      border-color: var(--atman-color-primary);
      box-shadow: 0 0 0 3px var(--atman-focus-ring-color);
    }

    /* Sizes */
    .trigger--sm {
      height: 32px;
      padding: 0 var(--atman-space-2);
    }

    .trigger--md {
      height: 40px;
      padding: 0 var(--atman-space-3);
    }

    .trigger--lg {
      height: 48px;
      padding: 0 var(--atman-space-4);
      font-size: var(--atman-font-size-md);
    }

    .trigger__text {
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .trigger__text--placeholder {
      color: var(--atman-color-text-tertiary);
    }

    .trigger__icon {
      flex-shrink: 0;
      transition: transform var(--atman-duration-fast) var(--atman-easing-default);
    }

    .trigger--open .trigger__icon {
      transform: rotate(180deg);
    }

    .dropdown {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      z-index: var(--atman-z-dropdown);
      margin-top: var(--atman-space-1);
      padding: var(--atman-space-1);
      background-color: var(--atman-color-surface);
      border: 1px solid var(--atman-color-border);
      border-radius: var(--atman-radius-md);
      box-shadow: var(--atman-shadow-lg);
      max-height: 240px;
      overflow-y: auto;
      opacity: 0;
      visibility: hidden;
      transform: translateY(-4px);
      transition: all var(--atman-duration-fast) var(--atman-easing-default);
    }

    .dropdown--open {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }

    .option {
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
    }

    .option:hover:not(.option--disabled) {
      background-color: var(--atman-color-surface-hover);
    }

    .option--selected {
      background-color: var(--atman-color-primary-light);
      color: var(--atman-color-primary);
    }

    .option--selected:hover {
      background-color: var(--atman-color-primary-light);
    }

    .option--focused {
      background-color: var(--atman-color-surface-hover);
      outline: none;
    }

    .option--disabled {
      color: var(--atman-color-text-tertiary);
      cursor: not-allowed;
    }

    .option__check {
      width: 16px;
      height: 16px;
      opacity: 0;
    }

    .option--selected .option__check {
      opacity: 1;
    }

    .error-message {
      font-family: var(--atman-font-family);
      font-size: var(--atman-font-size-xs);
      color: var(--atman-color-destructive);
      margin-top: var(--atman-space-1);
    }

    .helper-text {
      font-family: var(--atman-font-family);
      font-size: var(--atman-font-size-xs);
      color: var(--atman-color-text-secondary);
      margin-top: var(--atman-space-1);
    }

    /* Reduced motion */
    @media (prefers-reduced-motion: reduce) {
      .trigger,
      .trigger__icon,
      .dropdown,
      .option {
        transition: none;
      }
    }
  `;

  /** The select label */
  @property({ type: String })
  label?: string;

  /** The placeholder text */
  @property({ type: String })
  placeholder = 'Select an option';

  /** The selected value */
  @property({ type: String })
  value = '';

  /** The select name */
  @property({ type: String })
  name?: string;

  /** The available options */
  @property({ type: Array })
  options: SelectOption[] = [];

  /** The size of the select */
  @property({ type: String, reflect: true })
  size: SelectSize = 'md';

  /** Whether the select is disabled */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /** Whether the select is required */
  @property({ type: Boolean, reflect: true })
  required = false;

  /** Error message to display */
  @property({ type: String })
  error?: string;

  /** Helper text to display below the select */
  @property({ type: String, attribute: 'helper-text' })
  helperText?: string;

  @state()
  private isOpen = false;

  @state()
  private focusedIndex = -1;

  @query('.trigger')
  private triggerEl!: HTMLButtonElement;

  @query('.dropdown')
  private dropdownEl!: HTMLDivElement;

  private selectId = `atman-select-${Math.random().toString(36).slice(2, 9)}`;

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('click', this.handleOutsideClick);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', this.handleOutsideClick);
  }

  private handleOutsideClick = (e: MouseEvent) => {
    if (!this.contains(e.target as Node)) {
      this.close();
    }
  };

  private get selectedOption(): SelectOption | undefined {
    return this.options.find((opt) => opt.value === this.value);
  }

  private get enabledOptions(): SelectOption[] {
    return this.options.filter((opt) => !opt.disabled);
  }

  private open() {
    if (this.disabled) return;
    this.isOpen = true;
    this.focusedIndex = this.options.findIndex((opt) => opt.value === this.value);
    if (this.focusedIndex === -1) {
      this.focusedIndex = this.enabledOptions.length > 0 ? 0 : -1;
    }
  }

  private close() {
    this.isOpen = false;
    this.focusedIndex = -1;
  }

  private toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  private selectOption(option: SelectOption) {
    if (option.disabled) return;

    this.value = option.value;
    this.close();
    this.triggerEl.focus();

    this.dispatchEvent(
      new CustomEvent('atman-change', {
        bubbles: true,
        composed: true,
        detail: { value: this.value, option },
      })
    );
  }

  private handleTriggerKeydown(e: KeyboardEvent) {
    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault();
        this.toggle();
        break;
      case 'ArrowDown':
        e.preventDefault();
        if (!this.isOpen) {
          this.open();
        } else {
          this.focusNextOption();
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (!this.isOpen) {
          this.open();
        } else {
          this.focusPreviousOption();
        }
        break;
      case 'Escape':
        e.preventDefault();
        this.close();
        break;
      case 'Home':
        e.preventDefault();
        if (this.isOpen) {
          this.focusedIndex = 0;
        }
        break;
      case 'End':
        e.preventDefault();
        if (this.isOpen) {
          this.focusedIndex = this.options.length - 1;
        }
        break;
    }
  }

  private handleDropdownKeydown(e: KeyboardEvent) {
    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (this.focusedIndex >= 0 && this.focusedIndex < this.options.length) {
          this.selectOption(this.options[this.focusedIndex]);
        }
        break;
      case 'ArrowDown':
        e.preventDefault();
        this.focusNextOption();
        break;
      case 'ArrowUp':
        e.preventDefault();
        this.focusPreviousOption();
        break;
      case 'Escape':
        e.preventDefault();
        this.close();
        this.triggerEl.focus();
        break;
    }
  }

  private focusNextOption() {
    const startIndex = this.focusedIndex;
    let nextIndex = startIndex + 1;

    while (nextIndex !== startIndex) {
      if (nextIndex >= this.options.length) {
        nextIndex = 0;
      }
      if (!this.options[nextIndex].disabled) {
        this.focusedIndex = nextIndex;
        return;
      }
      nextIndex++;
      if (nextIndex === startIndex) break;
    }
  }

  private focusPreviousOption() {
    const startIndex = this.focusedIndex;
    let prevIndex = startIndex - 1;

    while (prevIndex !== startIndex) {
      if (prevIndex < 0) {
        prevIndex = this.options.length - 1;
      }
      if (!this.options[prevIndex].disabled) {
        this.focusedIndex = prevIndex;
        return;
      }
      prevIndex--;
      if (prevIndex === startIndex) break;
    }
  }

  render() {
    const hasError = !!this.error;
    const errorId = `${this.selectId}-error`;
    const helperId = `${this.selectId}-helper`;
    const listboxId = `${this.selectId}-listbox`;

    const triggerClasses = {
      trigger: true,
      [`trigger--${this.size}`]: true,
      'trigger--error': hasError,
      'trigger--open': this.isOpen,
    };

    const labelClasses = {
      label: true,
      'label--required': this.required,
    };

    const dropdownClasses = {
      dropdown: true,
      'dropdown--open': this.isOpen,
    };

    return html`
      <div class="select-wrapper">
        ${this.label
          ? html`
              <label part="label" class=${classMap(labelClasses)} id="${this.selectId}-label">
                ${this.label}
              </label>
            `
          : nothing}

        <button
          part="trigger"
          class=${classMap(triggerClasses)}
          type="button"
          ?disabled=${this.disabled}
          aria-haspopup="listbox"
          aria-expanded=${this.isOpen}
          aria-labelledby="${this.label ? `${this.selectId}-label` : nothing}"
          aria-describedby=${hasError ? errorId : this.helperText ? helperId : nothing}
          aria-invalid=${hasError ? 'true' : nothing}
          @click=${this.toggle}
          @keydown=${this.handleTriggerKeydown}
        >
          <span class="trigger__text ${!this.selectedOption ? 'trigger__text--placeholder' : ''}">
            ${this.selectedOption?.label || this.placeholder}
          </span>
          <svg class="trigger__icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="m6 9 6 6 6-6"/>
          </svg>
        </button>

        <div
          part="dropdown"
          class=${classMap(dropdownClasses)}
          role="listbox"
          id=${listboxId}
          aria-labelledby="${this.label ? `${this.selectId}-label` : nothing}"
          @keydown=${this.handleDropdownKeydown}
        >
          ${this.options.map(
            (option, index) => html`
              <div
                part="option"
                class=${classMap({
                  option: true,
                  'option--selected': option.value === this.value,
                  'option--focused': index === this.focusedIndex,
                  'option--disabled': !!option.disabled,
                })}
                role="option"
                aria-selected=${option.value === this.value}
                aria-disabled=${option.disabled ? 'true' : nothing}
                tabindex=${option.disabled ? nothing : '0'}
                @click=${() => this.selectOption(option)}
              >
                <svg class="option__check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                ${option.label}
              </div>
            `
          )}
        </div>

        ${hasError
          ? html`
              <div part="error" class="error-message" id=${errorId} role="alert">
                ${this.error}
              </div>
            `
          : this.helperText
            ? html`
                <div class="helper-text" id=${helperId}>
                  ${this.helperText}
                </div>
              `
            : nothing}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'atman-select': AtmanSelect;
  }
}
