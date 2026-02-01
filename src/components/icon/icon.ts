import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { icons, type IconNode } from 'lucide';

export type IconSize = 'sm' | 'md' | 'lg';

/**
 * @element atman-icon
 * @description An icon component that wraps Lucide icons or custom SVGs.
 *
 * @slot - Default slot for custom SVG icons
 *
 * @csspart icon - The icon container element
 *
 * @example
 * // Using Lucide icon by name
 * <atman-icon name="home"></atman-icon>
 *
 * // Using custom SVG
 * <atman-icon>
 *   <svg>...</svg>
 * </atman-icon>
 */
@customElement('atman-icon')
export class AtmanIcon extends LitElement {
  static styles = css`
    :host {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      color: inherit;
    }

    .icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    /* Sizes */
    .icon--sm {
      width: 16px;
      height: 16px;
    }

    .icon--md {
      width: 20px;
      height: 20px;
    }

    .icon--lg {
      width: 24px;
      height: 24px;
    }

    /* SVG styling */
    .icon svg,
    ::slotted(svg) {
      width: 100%;
      height: 100%;
      stroke: currentColor;
      fill: none;
      stroke-width: 2;
      stroke-linecap: round;
      stroke-linejoin: round;
    }

    /* Color variants */
    :host([color="primary"]) {
      color: var(--atman-color-primary);
    }

    :host([color="secondary"]) {
      color: var(--atman-color-secondary);
    }

    :host([color="success"]) {
      color: var(--atman-color-success);
    }

    :host([color="warning"]) {
      color: var(--atman-color-warning);
    }

    :host([color="destructive"]) {
      color: var(--atman-color-destructive);
    }

    :host([color="muted"]) {
      color: var(--atman-color-text-tertiary);
    }
  `;

  /** The name of the Lucide icon to display */
  @property({ type: String })
  name?: string;

  /** The size of the icon */
  @property({ type: String, reflect: true })
  size: IconSize = 'md';

  /** Accessible label for the icon (required for standalone icons) */
  @property({ type: String, attribute: 'label' })
  label?: string;

  /** Whether the icon is purely decorative */
  @property({ type: Boolean, attribute: 'decorative' })
  decorative = true;

  private getLucideIcon(): string | null {
    if (!this.name) return null;

    // Convert kebab-case to PascalCase for Lucide icon lookup
    const iconName = this.name
      .split('-')
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join('');

    const icon = icons[iconName as keyof typeof icons] as IconNode | undefined;
    if (!icon) {
      console.warn(`[atman-icon] Icon "${this.name}" not found in Lucide icons`);
      return null;
    }

    // Lucide icon structure: [tag, attrs, children]
    const [, attrs, children] = icon;
    const svgAttrs = Object.entries(attrs)
      .map(([key, value]) => `${key}="${value}"`)
      .join(' ');

    const childrenHtml = (children || [])
      .map((child) => {
        const [tag, childAttrs] = child as [string, Record<string, string>];
        const childAttrStr = Object.entries(childAttrs || {})
          .map(([key, value]) => `${key}="${value}"`)
          .join(' ');
        return `<${tag} ${childAttrStr}/>`;
      })
      .join('');

    return `<svg ${svgAttrs}>${childrenHtml}</svg>`;
  }

  render() {
    const classes = {
      icon: true,
      [`icon--${this.size}`]: true,
    };

    const lucideIcon = this.getLucideIcon();

    return html`
      <span
        part="icon"
        class=${classMap(classes)}
        role=${this.label ? 'img' : 'presentation'}
        aria-label=${this.label || nothing}
        aria-hidden=${this.decorative && !this.label ? 'true' : nothing}
      >
        ${lucideIcon ? unsafeHTML(lucideIcon) : html`<slot></slot>`}
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'atman-icon': AtmanIcon;
  }
}
