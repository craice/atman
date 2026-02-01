import { describe, it, expect, vi } from 'vitest';
import { elementUpdated, fixture } from '../../test/setup.js';
import type { AtmanButton } from './button.js';
import './button.js';

describe('atman-button', () => {
  it('should render with default properties', async () => {
    const el = fixture<AtmanButton>('atman-button');
    await elementUpdated(el);

    expect(el.variant).toBe('primary');
    expect(el.size).toBe('md');
    expect(el.disabled).toBe(false);
    expect(el.loading).toBe(false);
  });

  it('should render button with text content', async () => {
    const el = fixture<AtmanButton>('atman-button');
    el.textContent = 'Click me';
    await elementUpdated(el);

    const button = el.shadowRoot?.querySelector('button');
    expect(button).toBeTruthy();
  });

  it('should apply variant classes correctly', async () => {
    const el = fixture<AtmanButton>('atman-button');

    const variants = ['primary', 'secondary', 'ghost', 'destructive'] as const;
    for (const variant of variants) {
      el.variant = variant;
      await elementUpdated(el);

      const button = el.shadowRoot?.querySelector('button');
      expect(button?.classList.contains(`button--${variant}`)).toBe(true);
    }
  });

  it('should apply size classes correctly', async () => {
    const el = fixture<AtmanButton>('atman-button');

    const sizes = ['sm', 'md', 'lg'] as const;
    for (const size of sizes) {
      el.size = size;
      await elementUpdated(el);

      const button = el.shadowRoot?.querySelector('button');
      expect(button?.classList.contains(`button--${size}`)).toBe(true);
    }
  });

  it('should be disabled when disabled property is true', async () => {
    const el = fixture<AtmanButton>('atman-button');
    el.disabled = true;
    await elementUpdated(el);

    const button = el.shadowRoot?.querySelector('button');
    expect(button?.disabled).toBe(true);
    expect(button?.getAttribute('aria-disabled')).toBe('true');
  });

  it('should show loading state', async () => {
    const el = fixture<AtmanButton>('atman-button');
    el.loading = true;
    await elementUpdated(el);

    const button = el.shadowRoot?.querySelector('button');
    expect(button?.classList.contains('button--loading')).toBe(true);
    expect(button?.getAttribute('aria-busy')).toBe('true');
  });

  it('should dispatch atman-click event when clicked', async () => {
    const el = fixture<AtmanButton>('atman-button');
    await elementUpdated(el);

    const clickHandler = vi.fn();
    el.addEventListener('atman-click', clickHandler);

    const button = el.shadowRoot?.querySelector('button');
    button?.click();

    expect(clickHandler).toHaveBeenCalledTimes(1);
  });

  it('should not dispatch atman-click when disabled', async () => {
    const el = fixture<AtmanButton>('atman-button');
    el.disabled = true;
    await elementUpdated(el);

    const clickHandler = vi.fn();
    el.addEventListener('atman-click', clickHandler);

    const button = el.shadowRoot?.querySelector('button');
    button?.click();

    expect(clickHandler).not.toHaveBeenCalled();
  });

  it('should not dispatch atman-click when loading', async () => {
    const el = fixture<AtmanButton>('atman-button');
    el.loading = true;
    await elementUpdated(el);

    const clickHandler = vi.fn();
    el.addEventListener('atman-click', clickHandler);

    const button = el.shadowRoot?.querySelector('button');
    button?.click();

    expect(clickHandler).not.toHaveBeenCalled();
  });

  it('should set button type correctly', async () => {
    const el = fixture<AtmanButton>('atman-button');
    el.type = 'submit';
    await elementUpdated(el);

    const button = el.shadowRoot?.querySelector('button');
    expect(button?.type).toBe('submit');
  });

  it('should apply aria-label when label property is set', async () => {
    const el = fixture<AtmanButton>('atman-button');
    el.label = 'Custom label';
    await elementUpdated(el);

    const button = el.shadowRoot?.querySelector('button');
    expect(button?.getAttribute('aria-label')).toBe('Custom label');
  });

  it('should apply icon-only class when iconOnly is true', async () => {
    const el = fixture<AtmanButton>('atman-button');
    el.iconOnly = true;
    await elementUpdated(el);

    const button = el.shadowRoot?.querySelector('button');
    expect(button?.classList.contains('button--icon-only')).toBe(true);
  });
});
