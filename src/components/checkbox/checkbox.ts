import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

/**
 * @element atman-checkbox
 * @description A checkbox component with label, checked, and indeterminate states.
 *
 * @slot - Default slot for label content
 *
 * @csspart checkbox - The checkbox container
 * @csspart input - The native checkbox input (visually hidden)
 * @csspart control - The visual checkbox control
 * @csspart label - The label element
 *
 * @fires atman-change - Fired when the checked state changes
 */
@customElement('atman-checkbox')
export class AtmanCheckbox extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
    }

    .checkbox {
      display: inline-flex;
      align-items: flex-start;
      gap: var(--atman-space-2);
      cursor: pointer;
      user-select: none;
    }

    .checkbox--disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }

    .input {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }

    .control {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 18px;
      height: 18px;
      flex-shrink: 0;
      background-color: var(--atman-color-surface);
      border: 2px solid var(--atman-color-border);
      border-radius: var(--atman-radius-sm);
      transition: all var(--atman-duration-fast) var(--atman-easing-default);
    }

    .checkbox:hover:not(.checkbox--disabled) .control {
      border-color: var(--atman-color-primary);
    }

    .input:focus-visible + .control {
      border-color: var(--atman-color-primary);
      box-shadow: 0 0 0 3px var(--atman-focus-ring-color);
    }

    .control--checked,
    .control--indeterminate {
      background-color: var(--atman-color-primary);
      border-color: var(--atman-color-primary);
    }

    .checkbox:hover:not(.checkbox--disabled) .control--checked,
    .checkbox:hover:not(.checkbox--disabled) .control--indeterminate {
      background-color: var(--atman-color-primary-hover);
      border-color: var(--atman-color-primary-hover);
    }

    .control__icon {
      color: var(--atman-color-text-on-primary);
      opacity: 0;
      transform: scale(0.5);
      transition: all var(--atman-duration-fast) var(--atman-easing-default);
    }

    .control--checked .control__icon,
    .control--indeterminate .control__icon {
      opacity: 1;
      transform: scale(1);
    }

    .label {
      font-family: var(--atman-font-family);
      font-size: var(--atman-font-size-sm);
      color: var(--atman-color-text);
      line-height: 1.4;
      padding-top: 1px;
    }

    .checkbox--disabled .label {
      color: var(--atman-color-text-tertiary);
    }

    /* Error state */
    .control--error {
      border-color: var(--atman-color-destructive);
    }

    .checkbox:hover:not(.checkbox--disabled) .control--error {
      border-color: var(--atman-color-destructive-hover);
    }

    /* Reduced motion */
    @media (prefers-reduced-motion: reduce) {
      .control,
      .control__icon {
        transition: none;
      }
    }
  `;

  /** Whether the checkbox is checked */
  @property({ type: Boolean, reflect: true })
  checked = false;

  /** Whether the checkbox is in an indeterminate state */
  @property({ type: Boolean, reflect: true })
  indeterminate = false;

  /** Whether the checkbox is disabled */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /** Whether the checkbox has an error */
  @property({ type: Boolean, reflect: true })
  error = false;

  /** The checkbox name */
  @property({ type: String })
  name?: string;

  /** The checkbox value */
  @property({ type: String })
  value = 'on';

  /** Whether the checkbox is required */
  @property({ type: Boolean, reflect: true })
  required = false;

  private checkboxId = `atman-checkbox-${Math.random().toString(36).slice(2, 9)}`;

  private handleChange(e: Event) {
    const target = e.target as HTMLInputElement;
    this.checked = target.checked;
    this.indeterminate = false;

    this.dispatchEvent(
      new CustomEvent('atman-change', {
        bubbles: true,
        composed: true,
        detail: { checked: this.checked, value: this.value },
      })
    );
  }

  private handleClick() {
    if (this.disabled) return;

    this.checked = !this.checked;
    this.indeterminate = false;

    this.dispatchEvent(
      new CustomEvent('atman-change', {
        bubbles: true,
        composed: true,
        detail: { checked: this.checked, value: this.value },
      })
    );
  }

  private renderCheckIcon() {
    return html`
      <svg class="control__icon" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="20 6 9 17 4 12"/>
      </svg>
    `;
  }

  private renderIndeterminateIcon() {
    return html`
      <svg class="control__icon" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
        <line x1="5" y1="12" x2="19" y2="12"/>
      </svg>
    `;
  }

  render() {
    const checkboxClasses = {
      checkbox: true,
      'checkbox--disabled': this.disabled,
    };

    const controlClasses = {
      control: true,
      'control--checked': this.checked && !this.indeterminate,
      'control--indeterminate': this.indeterminate,
      'control--error': this.error,
    };

    return html`
      <label part="checkbox" class=${classMap(checkboxClasses)} @click=${(e: Event) => e.preventDefault()}>
        <input
          part="input"
          class="input"
          type="checkbox"
          id=${this.checkboxId}
          name=${this.name || nothing}
          .value=${this.value}
          .checked=${this.checked}
          .indeterminate=${this.indeterminate}
          ?disabled=${this.disabled}
          ?required=${this.required}
          aria-invalid=${this.error ? 'true' : nothing}
          @change=${this.handleChange}
        />
        <span
          part="control"
          class=${classMap(controlClasses)}
          @click=${this.handleClick}
          aria-hidden="true"
        >
          ${this.indeterminate ? this.renderIndeterminateIcon() : this.renderCheckIcon()}
        </span>
        <span part="label" class="label">
          <slot></slot>
        </span>
      </label>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'atman-checkbox': AtmanCheckbox;
  }
}
