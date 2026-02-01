import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

export type AvatarSize = 'sm' | 'md' | 'lg';

/**
 * @element atman-avatar
 * @description An avatar component for displaying user images, initials, or a fallback icon.
 *
 * @csspart avatar - The avatar container element
 * @csspart image - The image element (when using src)
 * @csspart initials - The initials text element
 * @csspart fallback - The fallback icon container
 */
@customElement('atman-avatar')
export class AtmanAvatar extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
    }

    .avatar {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: var(--atman-radius-full);
      background-color: var(--atman-color-neutral-200);
      color: var(--atman-color-text-secondary);
      font-family: var(--atman-font-family);
      font-weight: var(--atman-font-weight-medium);
      overflow: hidden;
      user-select: none;
      flex-shrink: 0;
    }

    /* Sizes */
    .avatar--sm {
      width: 32px;
      height: 32px;
      font-size: var(--atman-font-size-xs);
    }

    .avatar--md {
      width: 40px;
      height: 40px;
      font-size: var(--atman-font-size-sm);
    }

    .avatar--lg {
      width: 56px;
      height: 56px;
      font-size: var(--atman-font-size-lg);
    }

    /* Image */
    .avatar__image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    /* Initials */
    .avatar__initials {
      text-transform: uppercase;
      line-height: 1;
    }

    /* Fallback icon */
    .avatar__fallback {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .avatar--sm .avatar__fallback svg {
      width: 16px;
      height: 16px;
    }

    .avatar--md .avatar__fallback svg {
      width: 20px;
      height: 20px;
    }

    .avatar--lg .avatar__fallback svg {
      width: 28px;
      height: 28px;
    }

    /* Loading state */
    .avatar--loading {
      animation: pulse 1.5s ease-in-out infinite;
    }

    @keyframes pulse {
      0%, 100% {
        opacity: 1;
      }
      50% {
        opacity: 0.5;
      }
    }

    /* Reduced motion */
    @media (prefers-reduced-motion: reduce) {
      .avatar--loading {
        animation: none;
      }
    }
  `;

  /** The image source URL */
  @property({ type: String })
  src?: string;

  /** Alternative text for the image */
  @property({ type: String })
  alt = '';

  /** The name to generate initials from */
  @property({ type: String })
  name?: string;

  /** Custom initials (overrides name) */
  @property({ type: String })
  initials?: string;

  /** The size of the avatar */
  @property({ type: String, reflect: true })
  size: AvatarSize = 'md';

  /** Whether the avatar is in a loading state */
  @property({ type: Boolean, reflect: true })
  loading = false;

  @state()
  private imageError = false;

  private getInitials(): string {
    if (this.initials) {
      return this.initials.slice(0, 2);
    }

    if (this.name) {
      const parts = this.name.trim().split(/\s+/);
      if (parts.length >= 2) {
        return `${parts[0][0]}${parts[parts.length - 1][0]}`;
      }
      return parts[0]?.slice(0, 2) || '';
    }

    return '';
  }

  private handleImageError() {
    this.imageError = true;
  }

  private handleImageLoad() {
    this.imageError = false;
  }

  private renderFallbackIcon() {
    return html`
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
      </svg>
    `;
  }

  render() {
    const classes = {
      avatar: true,
      [`avatar--${this.size}`]: true,
      'avatar--loading': this.loading,
    };

    const initials = this.getInitials();
    const showImage = this.src && !this.imageError && !this.loading;
    const showInitials = !showImage && initials && !this.loading;
    const showFallback = !showImage && !showInitials && !this.loading;

    return html`
      <div part="avatar" class=${classMap(classes)} role="img" aria-label=${this.alt || this.name || 'Avatar'}>
        ${showImage
          ? html`
              <img
                part="image"
                class="avatar__image"
                src=${this.src}
                alt=${this.alt}
                @error=${this.handleImageError}
                @load=${this.handleImageLoad}
              />
            `
          : ''}
        ${showInitials
          ? html`
              <span part="initials" class="avatar__initials">${initials}</span>
            `
          : ''}
        ${showFallback
          ? html`
              <span part="fallback" class="avatar__fallback">
                ${this.renderFallbackIcon()}
              </span>
            `
          : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'atman-avatar': AtmanAvatar;
  }
}
