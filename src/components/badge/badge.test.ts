import { describe, it, expect } from 'vitest';
import { elementUpdated, fixture } from '../../test/setup.js';
import type { AtmanBadge } from './badge.js';
import './badge.js';

describe('atman-badge', () => {
  it('should render with default properties', async () => {
    const el = fixture<AtmanBadge>('atman-badge');
    await elementUpdated(el);

    expect(el.variant).toBe('primary');
    expect(el.size).toBe('md');
    expect(el.dot).toBe(false);
  });

  it('should render with text content', async () => {
    const el = fixture<AtmanBadge>('atman-badge');
    el.textContent = 'New';
    await elementUpdated(el);

    const badge = el.shadowRoot?.querySelector('.badge');
    expect(badge).toBeTruthy();
  });

  it('should apply variant classes correctly', async () => {
    const el = fixture<AtmanBadge>('atman-badge');

    const variants = ['primary', 'secondary', 'success', 'warning', 'destructive'] as const;
    for (const variant of variants) {
      el.variant = variant;
      await elementUpdated(el);

      const badge = el.shadowRoot?.querySelector('.badge');
      expect(badge?.classList.contains(`badge--${variant}`)).toBe(true);
    }
  });

  it('should apply size classes correctly', async () => {
    const el = fixture<AtmanBadge>('atman-badge');

    const sizes = ['sm', 'md'] as const;
    for (const size of sizes) {
      el.size = size;
      await elementUpdated(el);

      const badge = el.shadowRoot?.querySelector('.badge');
      expect(badge?.classList.contains(`badge--${size}`)).toBe(true);
    }
  });

  it('should render as dot when dot property is true', async () => {
    const el = fixture<AtmanBadge>('atman-badge');
    el.dot = true;
    await elementUpdated(el);

    const badge = el.shadowRoot?.querySelector('.badge');
    expect(badge?.classList.contains('badge--dot')).toBe(true);
  });

  it('should have role="status" when dot', async () => {
    const el = fixture<AtmanBadge>('atman-badge');
    el.dot = true;
    await elementUpdated(el);

    const badge = el.shadowRoot?.querySelector('.badge');
    expect(badge?.getAttribute('role')).toBe('status');
  });

  it('should not render slots when dot', async () => {
    const el = fixture<AtmanBadge>('atman-badge');
    el.dot = true;
    el.textContent = 'Should not show';
    await elementUpdated(el);

    const slots = el.shadowRoot?.querySelectorAll('slot');
    expect(slots?.length).toBe(0);
  });
});
