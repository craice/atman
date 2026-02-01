import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

export type DividerOrientation = 'horizontal' | 'vertical';
export type DividerLabelPosition = 'start' | 'center' | 'end';

/**
 * @element atman-divider
 * @description A visual divider to separate content.
 *
 * @slot - Optional slot for label content
 *
 * @csspart divider - The divider container
 * @csspart line - The divider line
 * @csspart label - The label container
 */
@customElement('atman-divider')
export class AtmanDivider extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    :host([orientation="vertical"]) {
      display: inline-block;
      height: 100%;
    }

    .divider {
      display: flex;
      align-items: center;
    }

    .divider--horizontal {
      flex-direction: row;
      width: 100%;
    }

    .divider--vertical {
      flex-direction: column;
      height: 100%;
      min-height: 24px;
    }

    .line {
      background-color: var(--atman-color-border);
    }

    .divider--horizontal .line {
      height: 1px;
      flex: 1;
    }

    .divider--vertical .line {
      width: 1px;
      flex: 1;
    }

    .label {
      color: var(--atman-color-text-secondary);
      font-family: var(--atman-font-family);
      font-size: var(--atman-font-size-sm);
      white-space: nowrap;
    }

    .divider--horizontal .label {
      padding: 0 var(--atman-space-3);
    }

    .divider--vertical .label {
      padding: var(--atman-space-2) 0;
      writing-mode: vertical-rl;
      text-orientation: mixed;
    }

    /* Label positions for horizontal */
    .divider--horizontal.divider--label-start .line:first-child {
      display: none;
    }

    .divider--horizontal.divider--label-start .label {
      padding-left: 0;
    }

    .divider--horizontal.divider--label-end .line:last-child {
      display: none;
    }

    .divider--horizontal.divider--label-end .label {
      padding-right: 0;
    }

    /* Label positions for vertical */
    .divider--vertical.divider--label-start .line:first-child {
      display: none;
    }

    .divider--vertical.divider--label-start .label {
      padding-top: 0;
    }

    .divider--vertical.divider--label-end .line:last-child {
      display: none;
    }

    .divider--vertical.divider--label-end .label {
      padding-bottom: 0;
    }

    /* Spacing variants */
    :host([spacing="sm"]) {
      margin: var(--atman-space-2) 0;
    }

    :host([spacing="md"]) {
      margin: var(--atman-space-4) 0;
    }

    :host([spacing="lg"]) {
      margin: var(--atman-space-6) 0;
    }

    :host([orientation="vertical"][spacing="sm"]) {
      margin: 0 var(--atman-space-2);
    }

    :host([orientation="vertical"][spacing="md"]) {
      margin: 0 var(--atman-space-4);
    }

    :host([orientation="vertical"][spacing="lg"]) {
      margin: 0 var(--atman-space-6);
    }
  `;

  /** The orientation of the divider */
  @property({ type: String, reflect: true })
  orientation: DividerOrientation = 'horizontal';

  /** The position of the label */
  @property({ type: String, attribute: 'label-position' })
  labelPosition: DividerLabelPosition = 'center';

  /** Spacing around the divider (sm, md, lg) */
  @property({ type: String, reflect: true })
  spacing?: 'sm' | 'md' | 'lg';

  /** Whether the divider has a label (set automatically based on slot) */
  @property({ type: Boolean })
  private hasLabel = false;

  private handleSlotChange(e: Event) {
    const slot = e.target as HTMLSlotElement;
    this.hasLabel = slot.assignedNodes({ flatten: true }).length > 0;
  }

  render() {
    const dividerClasses = {
      divider: true,
      'divider--horizontal': this.orientation === 'horizontal',
      'divider--vertical': this.orientation === 'vertical',
      [`divider--label-${this.labelPosition}`]: this.hasLabel,
    };

    return html`
      <div
        part="divider"
        class=${classMap(dividerClasses)}
        role="separator"
        aria-orientation=${this.orientation}
      >
        <div part="line" class="line"></div>
        ${this.hasLabel || true
          ? html`
              <span part="label" class="label" style=${this.hasLabel ? '' : 'display: none'}>
                <slot @slotchange=${this.handleSlotChange}></slot>
              </span>
            `
          : nothing}
        <div part="line" class="line"></div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'atman-divider': AtmanDivider;
  }
}
