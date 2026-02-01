import { describe, it, expect } from 'vitest';
import { elementUpdated, fixture } from '../../test/setup.js';
import type { AtmanSkeleton } from './skeleton.js';
import './skeleton.js';

describe('atman-skeleton', () => {
  it('should render with default properties', async () => {
    const el = fixture<AtmanSkeleton>('atman-skeleton');
    await elementUpdated(el);

    expect(el.variant).toBe('text');
  });

  it('should apply variant classes correctly', async () => {
    const el = fixture<AtmanSkeleton>('atman-skeleton');

    const variants = ['text', 'circular', 'rectangular'] as const;
    for (const variant of variants) {
      el.variant = variant;
      await elementUpdated(el);

      const skeleton = el.shadowRoot?.querySelector('.skeleton');
      expect(skeleton?.classList.contains(`skeleton--${variant}`)).toBe(true);
    }
  });

  it('should apply custom width', async () => {
    const el = fixture<AtmanSkeleton>('atman-skeleton');
    el.width = '200px';
    await elementUpdated(el);

    const skeleton = el.shadowRoot?.querySelector('.skeleton') as HTMLElement;
    expect(skeleton?.style.width).toBe('200px');
  });

  it('should apply custom height', async () => {
    const el = fixture<AtmanSkeleton>('atman-skeleton');
    el.height = '100px';
    await elementUpdated(el);

    const skeleton = el.shadowRoot?.querySelector('.skeleton') as HTMLElement;
    expect(skeleton?.style.height).toBe('100px');
  });

  it('should default to 100% width for text variant', async () => {
    const el = fixture<AtmanSkeleton>('atman-skeleton');
    el.variant = 'text';
    await elementUpdated(el);

    const skeleton = el.shadowRoot?.querySelector('.skeleton') as HTMLElement;
    expect(skeleton?.style.width).toBe('100%');
  });

  it('should default to 40px for circular variant', async () => {
    const el = fixture<AtmanSkeleton>('atman-skeleton');
    el.variant = 'circular';
    await elementUpdated(el);

    const skeleton = el.shadowRoot?.querySelector('.skeleton') as HTMLElement;
    expect(skeleton?.style.width).toBe('40px');
    expect(skeleton?.style.height).toBe('40px');
  });

  it('should default to 120px height for rectangular variant', async () => {
    const el = fixture<AtmanSkeleton>('atman-skeleton');
    el.variant = 'rectangular';
    await elementUpdated(el);

    const skeleton = el.shadowRoot?.querySelector('.skeleton') as HTMLElement;
    expect(skeleton?.style.height).toBe('120px');
  });

  it('should have aria-hidden="true"', async () => {
    const el = fixture<AtmanSkeleton>('atman-skeleton');
    await elementUpdated(el);

    const skeleton = el.shadowRoot?.querySelector('.skeleton');
    expect(skeleton?.getAttribute('aria-hidden')).toBe('true');
  });
});
