import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, queryAssignedElements } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import type { AtmanRadio } from './radio.js';

/**
 * @element atman-radio-group
 * @description A container for grouping radio buttons with keyboard navigation support.
 *
 * @slot - Default slot for atman-radio elements
 *
 * @csspart group - The radio group container
 * @csspart label - The group label
 * @csspart error - The error message
 *
 * @fires atman-change - Fired when the selected value changes
 */
@customElement('atman-radio-group')
export class AtmanRadioGroup extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .group {
      display: flex;
      flex-direction: column;
      gap: var(--atman-space-1);
    }

    .label {
      font-family: var(--atman-font-family);
      font-size: var(--atman-font-size-sm);
      font-weight: var(--atman-font-weight-medium);
      color: var(--atman-color-text);
      margin-bottom: var(--atman-space-2);
    }

    .label--required::after {
      content: ' *';
      color: var(--atman-color-destructive);
    }

    .options {
      display: flex;
      flex-direction: column;
      gap: var(--atman-space-2);
    }

    :host([orientation="horizontal"]) .options {
      flex-direction: row;
      flex-wrap: wrap;
      gap: var(--atman-space-4);
    }

    .error-message {
      font-family: var(--atman-font-family);
      font-size: var(--atman-font-size-xs);
      color: var(--atman-color-destructive);
      margin-top: var(--atman-space-2);
    }

    .helper-text {
      font-family: var(--atman-font-family);
      font-size: var(--atman-font-size-xs);
      color: var(--atman-color-text-secondary);
      margin-top: var(--atman-space-2);
    }
  `;

  /** The group label */
  @property({ type: String })
  label?: string;

  /** The name for all radios in the group */
  @property({ type: String })
  name = '';

  /** The selected value */
  @property({ type: String })
  value = '';

  /** Whether the group is disabled */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /** Whether the group is required */
  @property({ type: Boolean, reflect: true })
  required = false;

  /** Error message to display */
  @property({ type: String })
  error?: string;

  /** Helper text to display below the group */
  @property({ type: String, attribute: 'helper-text' })
  helperText?: string;

  /** Orientation of the radio buttons */
  @property({ type: String, reflect: true })
  orientation: 'vertical' | 'horizontal' = 'vertical';

  @queryAssignedElements({ selector: 'atman-radio' })
  private radios!: AtmanRadio[];

  private groupId = `atman-radio-group-${Math.random().toString(36).slice(2, 9)}`;

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('atman-change', this.handleRadioChange as EventListener);
    this.addEventListener('keydown', this.handleKeydown);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('atman-change', this.handleRadioChange as EventListener);
    this.removeEventListener('keydown', this.handleKeydown);
  }

  updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('value') || changedProperties.has('name') || changedProperties.has('disabled')) {
      this.updateRadios();
    }
  }

  private handleSlotChange() {
    this.updateRadios();
  }

  private updateRadios() {
    const radios = this.radios || [];
    radios.forEach((radio) => {
      radio.name = this.name;
      radio.checked = radio.value === this.value;
      if (this.disabled) {
        radio.disabled = true;
      }
      if (this.error) {
        radio.error = true;
      }
    });
  }

  private handleRadioChange = (e: CustomEvent) => {
    const target = e.target as AtmanRadio;
    if (target.tagName === 'ATMAN-RADIO') {
      this.value = target.value;

      // Update all radios
      this.radios?.forEach((radio) => {
        radio.checked = radio.value === this.value;
      });

      this.dispatchEvent(
        new CustomEvent('atman-change', {
          bubbles: true,
          composed: true,
          detail: { value: this.value },
        })
      );

      e.stopPropagation();
    }
  };

  private handleKeydown = (e: KeyboardEvent) => {
    const radios = this.radios?.filter((r) => !r.disabled) || [];
    if (radios.length === 0) return;

    const currentIndex = radios.findIndex((r) => r.checked);
    let nextIndex = currentIndex;

    switch (e.key) {
      case 'ArrowDown':
      case 'ArrowRight':
        e.preventDefault();
        nextIndex = currentIndex < radios.length - 1 ? currentIndex + 1 : 0;
        break;
      case 'ArrowUp':
      case 'ArrowLeft':
        e.preventDefault();
        nextIndex = currentIndex > 0 ? currentIndex - 1 : radios.length - 1;
        break;
      default:
        return;
    }

    if (nextIndex !== currentIndex) {
      const nextRadio = radios[nextIndex];
      nextRadio.checked = true;
      this.value = nextRadio.value;

      radios.forEach((radio, i) => {
        radio.checked = i === nextIndex;
      });

      // Focus the radio input
      const input = nextRadio.shadowRoot?.querySelector('input');
      input?.focus();

      this.dispatchEvent(
        new CustomEvent('atman-change', {
          bubbles: true,
          composed: true,
          detail: { value: this.value },
        })
      );
    }
  };

  render() {
    const hasError = !!this.error;
    const errorId = `${this.groupId}-error`;
    const helperId = `${this.groupId}-helper`;

    const labelClasses = {
      label: true,
      'label--required': this.required,
    };

    return html`
      <div
        part="group"
        class="group"
        role="radiogroup"
        aria-labelledby=${this.label ? `${this.groupId}-label` : nothing}
        aria-describedby=${hasError ? errorId : this.helperText ? helperId : nothing}
        aria-invalid=${hasError ? 'true' : nothing}
      >
        ${this.label
          ? html`
              <div part="label" class=${classMap(labelClasses)} id="${this.groupId}-label">
                ${this.label}
              </div>
            `
          : nothing}

        <div class="options">
          <slot @slotchange=${this.handleSlotChange}></slot>
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
    'atman-radio-group': AtmanRadioGroup;
  }
}
