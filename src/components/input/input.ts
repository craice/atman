import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';

export type InputSize = 'sm' | 'md' | 'lg';
export type InputType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';

/**
 * @element atman-input
 * @description A text input component with label, error state, and prefix/suffix support.
 *
 * @slot prefix - Content before the input (e.g., icon)
 * @slot suffix - Content after the input (e.g., icon, button)
 *
 * @csspart container - The input container
 * @csspart label - The label element
 * @csspart input - The native input element
 * @csspart error - The error message element
 *
 * @fires atman-input - Fired when the input value changes
 * @fires atman-change - Fired when the input loses focus after value change
 */
@customElement('atman-input')
export class AtmanInput extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .input-wrapper {
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

    .container {
      display: flex;
      align-items: center;
      gap: var(--atman-space-2);
      background-color: var(--atman-color-surface);
      border: 1px solid var(--atman-color-border);
      border-radius: var(--atman-radius-md);
      transition: all var(--atman-duration-fast) var(--atman-easing-default);
    }

    .container:hover:not(.container--disabled) {
      border-color: var(--atman-color-neutral-400);
    }

    .container:focus-within:not(.container--disabled) {
      border-color: var(--atman-color-primary);
      box-shadow: 0 0 0 3px var(--atman-focus-ring-color);
    }

    .container--error {
      border-color: var(--atman-color-destructive);
    }

    .container--error:focus-within {
      border-color: var(--atman-color-destructive);
      box-shadow: 0 0 0 3px rgba(217, 48, 37, 0.2);
    }

    .container--disabled {
      background-color: var(--atman-color-neutral-100);
      border-color: var(--atman-color-border-subtle);
      cursor: not-allowed;
    }

    /* Sizes */
    .container--sm {
      height: 32px;
      padding: 0 var(--atman-space-2);
    }

    .container--md {
      height: 40px;
      padding: 0 var(--atman-space-3);
    }

    .container--lg {
      height: 48px;
      padding: 0 var(--atman-space-4);
    }

    .input {
      flex: 1;
      min-width: 0;
      border: none;
      background: transparent;
      font-family: var(--atman-font-family);
      font-size: var(--atman-font-size-sm);
      color: var(--atman-color-text);
      outline: none;
    }

    .container--lg .input {
      font-size: var(--atman-font-size-md);
    }

    .input::placeholder {
      color: var(--atman-color-text-tertiary);
    }

    .input:disabled {
      cursor: not-allowed;
      color: var(--atman-color-text-tertiary);
    }

    /* Slots */
    ::slotted([slot="prefix"]),
    ::slotted([slot="suffix"]) {
      display: flex;
      align-items: center;
      color: var(--atman-color-text-secondary);
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
      .container {
        transition: none;
      }
    }
  `;

  /** The input label */
  @property({ type: String })
  label?: string;

  /** The input placeholder */
  @property({ type: String })
  placeholder?: string;

  /** The input value */
  @property({ type: String })
  value = '';

  /** The input type */
  @property({ type: String })
  type: InputType = 'text';

  /** The input name */
  @property({ type: String })
  name?: string;

  /** The size of the input */
  @property({ type: String, reflect: true })
  size: InputSize = 'md';

  /** Whether the input is disabled */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /** Whether the input is required */
  @property({ type: Boolean, reflect: true })
  required = false;

  /** Whether the input is readonly */
  @property({ type: Boolean, reflect: true })
  readonly = false;

  /** Error message to display */
  @property({ type: String })
  error?: string;

  /** Helper text to display below the input */
  @property({ type: String, attribute: 'helper-text' })
  helperText?: string;

  /** Minimum value (for number inputs) */
  @property({ type: Number })
  min?: number;

  /** Maximum value (for number inputs) */
  @property({ type: Number })
  max?: number;

  /** Minimum length */
  @property({ type: Number })
  minlength?: number;

  /** Maximum length */
  @property({ type: Number })
  maxlength?: number;

  /** Pattern for validation */
  @property({ type: String })
  pattern?: string;

  /** Autocomplete attribute */
  @property({ type: String })
  autocomplete?: string;

  @query('input')
  private inputEl!: HTMLInputElement;

  private inputId = `atman-input-${Math.random().toString(36).slice(2, 9)}`;

  /** Focus the input */
  focus() {
    this.inputEl?.focus();
  }

  /** Blur the input */
  blur() {
    this.inputEl?.blur();
  }

  /** Select all text in the input */
  select() {
    this.inputEl?.select();
  }

  private handleInput(e: Event) {
    const target = e.target as HTMLInputElement;
    this.value = target.value;

    this.dispatchEvent(
      new CustomEvent('atman-input', {
        bubbles: true,
        composed: true,
        detail: { value: this.value },
      })
    );
  }

  private handleChange(e: Event) {
    const target = e.target as HTMLInputElement;
    this.value = target.value;

    this.dispatchEvent(
      new CustomEvent('atman-change', {
        bubbles: true,
        composed: true,
        detail: { value: this.value },
      })
    );
  }

  render() {
    const hasError = !!this.error;
    const errorId = `${this.inputId}-error`;
    const helperId = `${this.inputId}-helper`;

    const containerClasses = {
      container: true,
      [`container--${this.size}`]: true,
      'container--error': hasError,
      'container--disabled': this.disabled,
    };

    const labelClasses = {
      label: true,
      'label--required': this.required,
    };

    return html`
      <div class="input-wrapper">
        ${this.label
          ? html`
              <label part="label" class=${classMap(labelClasses)} for=${this.inputId}>
                ${this.label}
              </label>
            `
          : nothing}

        <div part="container" class=${classMap(containerClasses)}>
          <slot name="prefix"></slot>
          <input
            part="input"
            class="input"
            id=${this.inputId}
            type=${this.type}
            name=${ifDefined(this.name)}
            .value=${this.value}
            placeholder=${ifDefined(this.placeholder)}
            ?disabled=${this.disabled}
            ?required=${this.required}
            ?readonly=${this.readonly}
            min=${ifDefined(this.min)}
            max=${ifDefined(this.max)}
            minlength=${ifDefined(this.minlength)}
            maxlength=${ifDefined(this.maxlength)}
            pattern=${ifDefined(this.pattern)}
            autocomplete=${ifDefined(this.autocomplete)}
            aria-invalid=${hasError ? 'true' : nothing}
            aria-describedby=${hasError ? errorId : this.helperText ? helperId : nothing}
            @input=${this.handleInput}
            @change=${this.handleChange}
          />
          <slot name="suffix"></slot>
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
    'atman-input': AtmanInput;
  }
}
