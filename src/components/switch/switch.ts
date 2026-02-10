import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

export type SwitchSize = 'sm' | 'md' | 'lg';
export type SwitchLabelPosition = 'left' | 'right';

/**
 * @element atman-switch
 * @description A toggle switch component with smooth animation.
 *
 * @slot - Default slot for label content
 *
 * @csspart switch - The switch container
 * @csspart track - The switch track
 * @csspart thumb - The switch thumb/knob
 * @csspart label - The label element
 *
 * @fires atman-change - Fired when the checked state changes
 */
@customElement('atman-switch')
export class AtmanSwitch extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
    }

    .switch {
      display: inline-flex;
      align-items: center;
      gap: var(--atman-space-2);
      cursor: pointer;
      user-select: none;
    }

    .switch--disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }

    .switch--label-left {
      flex-direction: row-reverse;
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

    .track {
      position: relative;
      display: inline-flex;
      align-items: center;
      flex-shrink: 0;
      background-color: var(--atman-color-neutral-300);
      border-radius: 999px;
      transition: background-color var(--atman-duration-fast) var(--atman-easing-default);
    }

    /* Sizes */
    .track--sm {
      width: 28px;
      height: 16px;
    }

    .track--md {
      width: 36px;
      height: 20px;
    }

    .track--lg {
      width: 44px;
      height: 24px;
    }

    .track--checked {
      background-color: var(--atman-color-primary);
    }

    .switch:hover:not(.switch--disabled) .track {
      background-color: var(--atman-color-neutral-400);
    }

    .switch:hover:not(.switch--disabled) .track--checked {
      background-color: var(--atman-color-primary-hover);
    }

    .input:focus-visible + .track {
      box-shadow: 0 0 0 3px var(--atman-focus-ring-color);
    }

    .thumb {
      position: absolute;
      background-color: white;
      border-radius: 50%;
      transition: transform var(--atman-duration-fast) var(--atman-easing-default);
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    }

    /* Thumb sizes */
    .thumb--sm {
      width: 12px;
      height: 12px;
      left: 2px;
    }

    .thumb--md {
      width: 16px;
      height: 16px;
      left: 2px;
    }

    .thumb--lg {
      width: 20px;
      height: 20px;
      left: 2px;
    }

    /* Thumb checked positions */
    .track--checked .thumb--sm {
      transform: translateX(12px);
    }

    .track--checked .thumb--md {
      transform: translateX(16px);
    }

    .track--checked .thumb--lg {
      transform: translateX(20px);
    }

    .label {
      font-family: var(--atman-font-family);
      font-size: var(--atman-font-size-sm);
      color: var(--atman-color-text);
      line-height: 1.4;
    }

    .switch--disabled .label {
      color: var(--atman-color-text-tertiary);
    }

    /* Reduced motion */
    @media (prefers-reduced-motion: reduce) {
      .track,
      .thumb {
        transition: none;
      }
    }
  `;

  /** Whether the switch is checked */
  @property({ type: Boolean, reflect: true })
  checked = false;

  /** Whether the switch is disabled */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /** The size of the switch */
  @property({ type: String, reflect: true })
  size: SwitchSize = 'md';

  /** Position of the label relative to the switch */
  @property({ type: String, reflect: true, attribute: 'label-position' })
  labelPosition: SwitchLabelPosition = 'right';

  /** The switch name */
  @property({ type: String })
  name?: string;

  /** The switch value */
  @property({ type: String })
  value = 'on';

  private switchId = `atman-switch-${Math.random().toString(36).slice(2, 9)}`;

  private handleChange(e: Event) {
    const target = e.target as HTMLInputElement;
    this.checked = target.checked;

    this.dispatchEvent(
      new CustomEvent('atman-change', {
        bubbles: true,
        composed: true,
        detail: { checked: this.checked, value: this.value },
      })
    );
  }

  render() {
    const switchClasses = {
      switch: true,
      'switch--disabled': this.disabled,
      'switch--label-left': this.labelPosition === 'left',
    };

    const trackClasses = {
      track: true,
      [`track--${this.size}`]: true,
      'track--checked': this.checked,
    };

    const thumbClasses = {
      thumb: true,
      [`thumb--${this.size}`]: true,
    };

    return html`
      <label part="switch" class=${classMap(switchClasses)}>
        <input
          class="input"
          type="checkbox"
          role="switch"
          id=${this.switchId}
          name=${this.name || nothing}
          .value=${this.value}
          .checked=${this.checked}
          ?disabled=${this.disabled}
          aria-checked=${this.checked}
          @change=${this.handleChange}
        />
        <span part="track" class=${classMap(trackClasses)} aria-hidden="true">
          <span part="thumb" class=${classMap(thumbClasses)}></span>
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
    'atman-switch': AtmanSwitch;
  }
}
