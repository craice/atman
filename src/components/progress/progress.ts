import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';

export type ProgressVariant = 'primary' | 'success' | 'warning' | 'destructive';
export type ProgressSize = 'sm' | 'md' | 'lg';
export type ProgressType = 'linear' | 'circular';

/**
 * @element atman-progress
 * @description A progress indicator component with linear and circular variants.
 *
 * @csspart progress - The progress container
 * @csspart track - The track element (linear)
 * @csspart fill - The fill/bar element (linear)
 * @csspart label - The label text
 * @csspart circle - The SVG circle (circular)
 *
 * @fires none
 */
@customElement('atman-progress')
export class AtmanProgress extends LitElement {
  static styles = css`
    :host {
      display: block;
      min-width: 200px;
    }

    .progress {
      display: flex;
      flex-direction: column;
      gap: var(--atman-space-1);
    }

    .progress--circular {
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }

    /* Linear track */
    .track {
      width: 100%;
      background-color: var(--atman-color-neutral-200);
      border-radius: 999px;
      overflow: hidden;
    }

    .track--sm { height: 4px; }
    .track--md { height: 8px; }
    .track--lg { height: 12px; }

    .fill {
      height: 100%;
      border-radius: 999px;
      transition: width var(--atman-duration-normal) var(--atman-easing-default);
    }

    .fill--primary { background-color: var(--atman-color-primary); }
    .fill--success { background-color: var(--atman-color-success); }
    .fill--warning { background-color: var(--atman-color-warning); }
    .fill--destructive { background-color: var(--atman-color-destructive); }

    /* Indeterminate animation */
    .fill--indeterminate {
      width: 50% !important;
      animation: indeterminate 1.5s ease-in-out infinite;
    }

    @keyframes indeterminate {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(300%); }
    }

    /* Circular */
    .circular-container {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }

    .circular-svg {
      transform: rotate(-90deg);
    }

    .circular-track {
      fill: none;
      stroke: var(--atman-color-neutral-200);
    }

    .circular-fill {
      fill: none;
      stroke-linecap: round;
      transition: stroke-dashoffset var(--atman-duration-normal) var(--atman-easing-default);
    }

    .circular-fill--primary { stroke: var(--atman-color-primary); }
    .circular-fill--success { stroke: var(--atman-color-success); }
    .circular-fill--warning { stroke: var(--atman-color-warning); }
    .circular-fill--destructive { stroke: var(--atman-color-destructive); }

    .circular-fill--indeterminate {
      animation: circular-indeterminate 1s linear infinite;
    }

    @keyframes circular-indeterminate {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .circular-label {
      position: absolute;
      font-family: var(--atman-font-family);
      font-weight: var(--atman-font-weight-medium);
      color: var(--atman-color-text);
    }

    .circular-label--sm { font-size: 10px; }
    .circular-label--md { font-size: var(--atman-font-size-xs); }
    .circular-label--lg { font-size: var(--atman-font-size-sm); }

    /* Linear label */
    .linear-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .label {
      font-family: var(--atman-font-family);
      font-size: var(--atman-font-size-xs);
      color: var(--atman-color-text-secondary);
    }

    /* Reduced motion */
    @media (prefers-reduced-motion: reduce) {
      .fill,
      .circular-fill {
        transition: none;
      }

      .fill--indeterminate,
      .circular-fill--indeterminate {
        animation: none;
      }
    }
  `;

  /** Current progress value (0-100) */
  @property({ type: Number, reflect: true })
  value = 0;

  /** The visual variant */
  @property({ type: String, reflect: true })
  variant: ProgressVariant = 'primary';

  /** The size of the progress indicator */
  @property({ type: String, reflect: true })
  size: ProgressSize = 'md';

  /** Whether to show as linear or circular */
  @property({ type: String, reflect: true })
  type: ProgressType = 'linear';

  /** Whether the progress is indeterminate */
  @property({ type: Boolean, reflect: true })
  indeterminate = false;

  /** Whether to show the percentage label */
  @property({ type: Boolean, reflect: true, attribute: 'show-label' })
  showLabel = false;

  private get clampedValue() {
    return Math.max(0, Math.min(100, this.value));
  }

  private get circularSizes() {
    const sizes = {
      sm: { size: 32, strokeWidth: 3 },
      md: { size: 48, strokeWidth: 4 },
      lg: { size: 64, strokeWidth: 5 },
    };
    return sizes[this.size];
  }

  private renderLinear() {
    const fillClasses = {
      fill: true,
      [`fill--${this.variant}`]: true,
      'fill--indeterminate': this.indeterminate,
    };

    const trackClasses = {
      track: true,
      [`track--${this.size}`]: true,
    };

    const fillStyles = this.indeterminate ? {} : { width: `${this.clampedValue}%` };

    return html`
      ${this.showLabel && !this.indeterminate
        ? html`
            <div class="linear-header">
              <span part="label" class="label"><slot></slot></span>
              <span class="label">${this.clampedValue}%</span>
            </div>
          `
        : nothing}
      <div
        part="track"
        class=${classMap(trackClasses)}
        role="progressbar"
        aria-valuenow=${this.indeterminate ? nothing : this.clampedValue}
        aria-valuemin="0"
        aria-valuemax="100"
      >
        <div part="fill" class=${classMap(fillClasses)} style=${styleMap(fillStyles)}></div>
      </div>
    `;
  }

  private renderCircular() {
    const { size, strokeWidth } = this.circularSizes;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (this.clampedValue / 100) * circumference;

    const fillClasses = {
      'circular-fill': true,
      [`circular-fill--${this.variant}`]: true,
      'circular-fill--indeterminate': this.indeterminate,
    };

    return html`
      <div
        class="circular-container"
        role="progressbar"
        aria-valuenow=${this.indeterminate ? nothing : this.clampedValue}
        aria-valuemin="0"
        aria-valuemax="100"
      >
        <svg
          class="circular-svg"
          width=${size}
          height=${size}
          viewBox="0 0 ${size} ${size}"
        >
          <circle
            part="circle"
            class="circular-track"
            cx=${size / 2}
            cy=${size / 2}
            r=${radius}
            stroke-width=${strokeWidth}
          />
          <circle
            class=${classMap(fillClasses)}
            cx=${size / 2}
            cy=${size / 2}
            r=${radius}
            stroke-width=${strokeWidth}
            stroke-dasharray=${this.indeterminate ? `${circumference * 0.75} ${circumference * 0.25}` : circumference}
            stroke-dashoffset=${this.indeterminate ? 0 : offset}
            style=${this.indeterminate ? `transform-origin: ${size / 2}px ${size / 2}px` : ''}
          />
        </svg>
        ${this.showLabel && !this.indeterminate
          ? html`<span class="circular-label circular-label--${this.size}">${this.clampedValue}%</span>`
          : nothing}
      </div>
    `;
  }

  render() {
    const progressClasses = {
      progress: true,
      'progress--circular': this.type === 'circular',
    };

    return html`
      <div part="progress" class=${classMap(progressClasses)}>
        ${this.type === 'circular' ? this.renderCircular() : this.renderLinear()}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'atman-progress': AtmanProgress;
  }
}
