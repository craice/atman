import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

/**
 * @element atman-radio
 * @description A radio button component. Use inside atman-radio-group for proper grouping.
 *
 * @slot - Default slot for label content
 *
 * @csspart radio - The radio container
 * @csspart input - The native radio input (visually hidden)
 * @csspart control - The visual radio control
 * @csspart label - The label element
 *
 * @fires atman-change - Fired when the radio is selected
 */
@customElement('atman-radio')
export class AtmanRadio extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
    }

    .radio {
      display: inline-flex;
      align-items: flex-start;
      gap: var(--atman-space-2);
      cursor: pointer;
      user-select: none;
    }

    .radio--disabled {
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
      border-radius: 50%;
      transition: all var(--atman-duration-fast) var(--atman-easing-default);
    }

    .radio:hover:not(.radio--disabled) .control {
      border-color: var(--atman-color-primary);
    }

    .input:focus-visible + .control {
      border-color: var(--atman-color-primary);
      box-shadow: 0 0 0 3px var(--atman-focus-ring-color);
    }

    .control--checked {
      border-color: var(--atman-color-primary);
    }

    .radio:hover:not(.radio--disabled) .control--checked {
      border-color: var(--atman-color-primary-hover);
    }

    .control__dot {
      width: 8px;
      height: 8px;
      background-color: var(--atman-color-primary);
      border-radius: 50%;
      opacity: 0;
      transform: scale(0);
      transition: all var(--atman-duration-fast) var(--atman-easing-default);
    }

    .control--checked .control__dot {
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

    .radio--disabled .label {
      color: var(--atman-color-text-tertiary);
    }

    /* Error state */
    .control--error {
      border-color: var(--atman-color-destructive);
    }

    .radio:hover:not(.radio--disabled) .control--error {
      border-color: var(--atman-color-destructive-hover);
    }

    .control--error .control__dot {
      background-color: var(--atman-color-destructive);
    }

    /* Reduced motion */
    @media (prefers-reduced-motion: reduce) {
      .control,
      .control__dot {
        transition: none;
      }
    }
  `;

  /** Whether the radio is checked */
  @property({ type: Boolean, reflect: true })
  checked = false;

  /** Whether the radio is disabled */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /** Whether the radio has an error */
  @property({ type: Boolean, reflect: true })
  error = false;

  /** The radio name (for grouping) */
  @property({ type: String })
  name?: string;

  /** The radio value */
  @property({ type: String })
  value = '';

  private radioId = `atman-radio-${Math.random().toString(36).slice(2, 9)}`;

  private handleChange(e: Event) {
    if (this.disabled) return;

    const target = e.target as HTMLInputElement;
    if (target.checked) {
      this.checked = true;

      this.dispatchEvent(
        new CustomEvent('atman-change', {
          bubbles: true,
          composed: true,
          detail: { value: this.value },
        })
      );
    }
  }

  render() {
    const radioClasses = {
      radio: true,
      'radio--disabled': this.disabled,
    };

    const controlClasses = {
      control: true,
      'control--checked': this.checked,
      'control--error': this.error,
    };

    return html`
      <label part="radio" class=${classMap(radioClasses)}>
        <input
          part="input"
          class="input"
          type="radio"
          id=${this.radioId}
          name=${this.name || nothing}
          .value=${this.value}
          .checked=${this.checked}
          ?disabled=${this.disabled}
          aria-invalid=${this.error ? 'true' : nothing}
          @change=${this.handleChange}
        />
        <span
          part="control"
          class=${classMap(controlClasses)}
          aria-hidden="true"
        >
          <span class="control__dot"></span>
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
    'atman-radio': AtmanRadio;
  }
}
