import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';

export type TextareaSize = 'sm' | 'md' | 'lg';
export type TextareaResize = 'none' | 'vertical' | 'both';

/**
 * @element atman-textarea
 * @description A textarea component with label, error state, and auto-resize support.
 *
 * @csspart container - The textarea container wrapper
 * @csspart label - The label element
 * @csspart textarea - The native textarea element
 * @csspart error - The error message element
 * @csspart counter - The character count element
 *
 * @fires atman-input - Fired when the textarea value changes
 * @fires atman-change - Fired when the textarea loses focus after value change
 */
@customElement('atman-textarea')
export class AtmanTextarea extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .textarea-wrapper {
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
      flex-direction: column;
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

    .textarea {
      flex: 1;
      min-width: 0;
      border: none;
      background: transparent;
      font-family: var(--atman-font-family);
      font-size: var(--atman-font-size-sm);
      color: var(--atman-color-text);
      outline: none;
      line-height: 1.5;
    }

    /* Sizes */
    .textarea--sm {
      padding: var(--atman-space-1) var(--atman-space-2);
    }

    .textarea--md {
      padding: var(--atman-space-2) var(--atman-space-3);
    }

    .textarea--lg {
      padding: var(--atman-space-3) var(--atman-space-4);
      font-size: var(--atman-font-size-md);
    }

    /* Resize */
    .textarea--resize-none {
      resize: none;
    }

    .textarea--resize-vertical {
      resize: vertical;
    }

    .textarea--resize-both {
      resize: both;
    }

    .textarea::placeholder {
      color: var(--atman-color-text-tertiary);
    }

    .textarea:disabled {
      cursor: not-allowed;
      color: var(--atman-color-text-tertiary);
    }

    .footer {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: var(--atman-space-2);
      margin-top: var(--atman-space-1);
    }

    .error-message {
      font-family: var(--atman-font-family);
      font-size: var(--atman-font-size-xs);
      color: var(--atman-color-destructive);
    }

    .helper-text {
      font-family: var(--atman-font-family);
      font-size: var(--atman-font-size-xs);
      color: var(--atman-color-text-secondary);
    }

    .counter {
      font-family: var(--atman-font-family);
      font-size: var(--atman-font-size-xs);
      color: var(--atman-color-text-secondary);
      margin-left: auto;
      flex-shrink: 0;
    }

    .counter--over {
      color: var(--atman-color-destructive);
    }

    /* Reduced motion */
    @media (prefers-reduced-motion: reduce) {
      .container {
        transition: none;
      }
    }
  `;

  /** The textarea label */
  @property({ type: String })
  label?: string;

  /** The textarea placeholder */
  @property({ type: String })
  placeholder?: string;

  /** The textarea value */
  @property({ type: String })
  value = '';

  /** The textarea name */
  @property({ type: String })
  name?: string;

  /** The size of the textarea */
  @property({ type: String, reflect: true })
  size: TextareaSize = 'md';

  /** Number of visible rows */
  @property({ type: Number })
  rows = 3;

  /** Maximum character length */
  @property({ type: Number })
  maxlength?: number;

  /** Resize behavior */
  @property({ type: String, reflect: true })
  resize: TextareaResize = 'vertical';

  /** Whether the textarea auto-resizes to fit content */
  @property({ type: Boolean, reflect: true, attribute: 'auto-resize' })
  autoResize = false;

  /** Whether the textarea is disabled */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /** Whether the textarea is required */
  @property({ type: Boolean, reflect: true })
  required = false;

  /** Whether the textarea is readonly */
  @property({ type: Boolean, reflect: true })
  readonly = false;

  /** Error message to display */
  @property({ type: String })
  error?: string;

  /** Helper text to display below the textarea */
  @property({ type: String, attribute: 'helper-text' })
  helperText?: string;

  @query('textarea')
  private textareaEl!: HTMLTextAreaElement;

  private textareaId = `atman-textarea-${Math.random().toString(36).slice(2, 9)}`;

  /** Focus the textarea */
  focus() {
    this.textareaEl?.focus();
  }

  /** Blur the textarea */
  blur() {
    this.textareaEl?.blur();
  }

  private handleInput(e: Event) {
    const target = e.target as HTMLTextAreaElement;
    this.value = target.value;

    if (this.autoResize) {
      this.adjustHeight();
    }

    this.dispatchEvent(
      new CustomEvent('atman-input', {
        bubbles: true,
        composed: true,
        detail: { value: this.value },
      })
    );
  }

  private handleChange(e: Event) {
    const target = e.target as HTMLTextAreaElement;
    this.value = target.value;

    this.dispatchEvent(
      new CustomEvent('atman-change', {
        bubbles: true,
        composed: true,
        detail: { value: this.value },
      })
    );
  }

  private adjustHeight() {
    const textarea = this.textareaEl;
    if (!textarea) return;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  }

  render() {
    const hasError = !!this.error;
    const errorId = `${this.textareaId}-error`;
    const helperId = `${this.textareaId}-helper`;

    const containerClasses = {
      container: true,
      'container--error': hasError,
      'container--disabled': this.disabled,
    };

    const labelClasses = {
      label: true,
      'label--required': this.required,
    };

    const textareaClasses = {
      textarea: true,
      [`textarea--${this.size}`]: true,
      [`textarea--resize-${this.autoResize ? 'none' : this.resize}`]: true,
    };

    const showCounter = this.maxlength != null;
    const charCount = this.value.length;
    const isOver = showCounter && charCount > this.maxlength!;

    return html`
      <div class="textarea-wrapper">
        ${this.label
          ? html`
              <label part="label" class=${classMap(labelClasses)} for=${this.textareaId}>
                ${this.label}
              </label>
            `
          : nothing}

        <div part="container" class=${classMap(containerClasses)}>
          <textarea
            part="textarea"
            class=${classMap(textareaClasses)}
            id=${this.textareaId}
            name=${ifDefined(this.name)}
            .value=${this.value}
            placeholder=${ifDefined(this.placeholder)}
            rows=${this.rows}
            maxlength=${ifDefined(this.maxlength)}
            ?disabled=${this.disabled}
            ?required=${this.required}
            ?readonly=${this.readonly}
            aria-required=${this.required ? 'true' : nothing}
            aria-invalid=${hasError ? 'true' : nothing}
            aria-describedby=${hasError ? errorId : this.helperText ? helperId : nothing}
            @input=${this.handleInput}
            @change=${this.handleChange}
          ></textarea>
        </div>

        <div class="footer">
          ${hasError
            ? html`<div part="error" class="error-message" id=${errorId} role="alert">${this.error}</div>`
            : this.helperText
              ? html`<div class="helper-text" id=${helperId}>${this.helperText}</div>`
              : html`<div></div>`}
          ${showCounter
            ? html`<span part="counter" class="counter ${isOver ? 'counter--over' : ''}">${charCount}/${this.maxlength}</span>`
            : nothing}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'atman-textarea': AtmanTextarea;
  }
}
