import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

export type TooltipPlacement = 'top' | 'right' | 'bottom' | 'left';

/**
 * @element atman-tooltip
 * @description A tooltip component that displays on hover/focus.
 *
 * @slot - Default slot for the trigger element
 *
 * @csspart tooltip - The tooltip container
 * @csspart content - The tooltip content
 * @csspart arrow - The tooltip arrow
 */
@customElement('atman-tooltip')
export class AtmanTooltip extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
      position: relative;
    }

    .trigger {
      display: inline-block;
    }

    .tooltip {
      position: absolute;
      z-index: var(--atman-z-tooltip);
      padding: var(--atman-space-2) var(--atman-space-3);
      background-color: var(--atman-color-neutral-800);
      color: var(--atman-color-neutral-50);
      font-family: var(--atman-font-family);
      font-size: var(--atman-font-size-xs);
      font-weight: var(--atman-font-weight-medium);
      line-height: var(--atman-line-height-normal);
      border-radius: var(--atman-radius-sm);
      white-space: nowrap;
      pointer-events: none;
      opacity: 0;
      visibility: hidden;
      transition: opacity var(--atman-duration-fast) var(--atman-easing-default),
                  visibility var(--atman-duration-fast) var(--atman-easing-default);
    }

    .tooltip--visible {
      opacity: 1;
      visibility: visible;
    }

    .tooltip--multiline {
      white-space: normal;
      max-width: 250px;
      text-align: center;
      pointer-events: auto;
    }

    /* Arrow */
    .arrow {
      position: absolute;
      width: 8px;
      height: 8px;
      background-color: var(--atman-color-neutral-800);
      transform: rotate(45deg);
    }

    /* Placements */
    .tooltip--top {
      bottom: 100%;
      left: 50%;
      transform: translateX(-50%);
      margin-bottom: 8px;
    }

    .tooltip--top .arrow {
      bottom: -4px;
      left: 50%;
      transform: translateX(-50%) rotate(45deg);
    }

    .tooltip--bottom {
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      margin-top: 8px;
    }

    .tooltip--bottom .arrow {
      top: -4px;
      left: 50%;
      transform: translateX(-50%) rotate(45deg);
    }

    .tooltip--left {
      right: 100%;
      top: 50%;
      transform: translateY(-50%);
      margin-right: 8px;
    }

    .tooltip--left .arrow {
      right: -4px;
      top: 50%;
      transform: translateY(-50%) rotate(45deg);
    }

    .tooltip--right {
      left: 100%;
      top: 50%;
      transform: translateY(-50%);
      margin-left: 8px;
    }

    .tooltip--right .arrow {
      left: -4px;
      top: 50%;
      transform: translateY(-50%) rotate(45deg);
    }

    /* Reduced motion */
    @media (prefers-reduced-motion: reduce) {
      .tooltip {
        transition: none;
      }
    }
  `;

  /** The tooltip content */
  @property({ type: String })
  content = '';

  /** The placement of the tooltip */
  @property({ type: String, reflect: true })
  placement: TooltipPlacement = 'top';

  /** Delay before showing tooltip (ms) */
  @property({ type: Number, attribute: 'show-delay' })
  showDelay = 200;

  /** Delay before hiding tooltip (ms) */
  @property({ type: Number, attribute: 'hide-delay' })
  hideDelay = 0;

  /** Whether the tooltip is disabled */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /** Whether to show arrow */
  @property({ type: Boolean, reflect: true })
  arrow = true;

  @state()
  private isVisible = false;

  private showTimeoutId?: number;
  private hideTimeoutId?: number;

  private tooltipId = `atman-tooltip-${Math.random().toString(36).slice(2, 9)}`;

  private show() {
    if (this.disabled || !this.content) return;

    this.clearTimeouts();

    this.showTimeoutId = window.setTimeout(() => {
      this.isVisible = true;
    }, this.showDelay);
  }

  private hide() {
    this.clearTimeouts();

    this.hideTimeoutId = window.setTimeout(() => {
      this.isVisible = false;
    }, this.hideDelay);
  }

  private clearTimeouts() {
    if (this.showTimeoutId) {
      window.clearTimeout(this.showTimeoutId);
      this.showTimeoutId = undefined;
    }
    if (this.hideTimeoutId) {
      window.clearTimeout(this.hideTimeoutId);
      this.hideTimeoutId = undefined;
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.clearTimeouts();
  }

  render() {
    const tooltipClasses = {
      tooltip: true,
      [`tooltip--${this.placement}`]: true,
      'tooltip--visible': this.isVisible,
      'tooltip--multiline': this.content.length > 50,
    };

    return html`
      <div
        class="trigger"
        @mouseenter=${this.show}
        @mouseleave=${this.hide}
        @focusin=${this.show}
        @focusout=${this.hide}
        aria-describedby=${this.isVisible ? this.tooltipId : nothing}
      >
        <slot></slot>
      </div>

      <div
        part="tooltip"
        class=${classMap(tooltipClasses)}
        id=${this.tooltipId}
        role="tooltip"
        aria-hidden=${!this.isVisible}
        @mouseenter=${this.content.length > 50 ? this.show : nothing}
        @mouseleave=${this.content.length > 50 ? this.hide : nothing}
      >
        <span part="content">${this.content}</span>
        ${this.arrow ? html`<span part="arrow" class="arrow"></span>` : nothing}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'atman-tooltip': AtmanTooltip;
  }
}
