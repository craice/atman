import { describe, it, expect } from 'vitest';
import { elementUpdated, fixture } from '../../test/setup.js';
import type { AtmanIcon } from './icon.js';
import './icon.js';

describe('atman-icon', () => {
  it('should render with default properties', async () => {
    const el = fixture<AtmanIcon>('atman-icon');
    await elementUpdated(el);

    expect(el.size).toBe('md');
    expect(el.decorative).toBe(true);
  });

  it('should apply size classes correctly', async () => {
    const el = fixture<AtmanIcon>('atman-icon');

    const sizes = ['sm', 'md', 'lg'] as const;
    for (const size of sizes) {
      el.size = size;
      await elementUpdated(el);

      const icon = el.shadowRoot?.querySelector('.icon');
      expect(icon?.classList.contains(`icon--${size}`)).toBe(true);
    }
  });

  it('should have name property', async () => {
    const el = fixture<AtmanIcon>('atman-icon');
    el.name = 'home';
    await elementUpdated(el);

    expect(el.name).toBe('home');
  });

  it('should have slot for custom SVG', async () => {
    const el = fixture<AtmanIcon>('atman-icon');
    await elementUpdated(el);

    const slot = el.shadowRoot?.querySelector('slot');
    expect(slot).toBeTruthy();
  });

  it('should have aria-hidden="true" when decorative', async () => {
    const el = fixture<AtmanIcon>('atman-icon');
    el.decorative = true;
    await elementUpdated(el);

    const icon = el.shadowRoot?.querySelector('.icon');
    expect(icon?.getAttribute('aria-hidden')).toBe('true');
  });

  it('should have role="img" when label is provided', async () => {
    const el = fixture<AtmanIcon>('atman-icon');
    el.label = 'Home icon';
    await elementUpdated(el);

    const icon = el.shadowRoot?.querySelector('.icon');
    expect(icon?.getAttribute('role')).toBe('img');
  });

  it('should set aria-label when label is provided', async () => {
    const el = fixture<AtmanIcon>('atman-icon');
    el.label = 'Home icon';
    await elementUpdated(el);

    const icon = el.shadowRoot?.querySelector('.icon');
    expect(icon?.getAttribute('aria-label')).toBe('Home icon');
  });

  it('should have role="presentation" when no label', async () => {
    const el = fixture<AtmanIcon>('atman-icon');
    el.label = undefined;
    await elementUpdated(el);

    const icon = el.shadowRoot?.querySelector('.icon');
    expect(icon?.getAttribute('role')).toBe('presentation');
  });

  it('should apply color attribute via host', async () => {
    const el = fixture<AtmanIcon>('atman-icon');
    el.setAttribute('color', 'primary');
    await elementUpdated(el);

    expect(el.getAttribute('color')).toBe('primary');
  });

  it('should render slot content when no name is provided', async () => {
    const el = fixture<AtmanIcon>('atman-icon');
    el.name = undefined;
    await elementUpdated(el);

    const slot = el.shadowRoot?.querySelector('slot');
    expect(slot).toBeTruthy();
  });
});
