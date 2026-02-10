import { describe, it, expect } from 'vitest';
import { elementUpdated, fixture } from '../../test/setup.js';
import type { AtmanProgress } from './progress.js';
import './progress.js';

describe('atman-progress', () => {
  it('should render with default properties', async () => {
    const el = fixture<AtmanProgress>('atman-progress');
    await elementUpdated(el);

    expect(el.value).toBe(0);
    expect(el.variant).toBe('primary');
    expect(el.size).toBe('md');
    expect(el.type).toBe('linear');
    expect(el.indeterminate).toBe(false);
    expect(el.showLabel).toBe(false);
  });

  it('should render linear progress bar', async () => {
    const el = fixture<AtmanProgress>('atman-progress');
    el.value = 50;
    await elementUpdated(el);

    const fill = el.shadowRoot?.querySelector('.fill');
    expect(fill).toBeTruthy();
    expect(fill?.getAttribute('style'))?.toContain('width:50%');
  });

  it('should clamp value between 0 and 100', async () => {
    const el = fixture<AtmanProgress>('atman-progress');
    el.value = 150;
    await elementUpdated(el);

    const track = el.shadowRoot?.querySelector('[role="progressbar"]');
    expect(track?.getAttribute('aria-valuenow')).toBe('100');
  });

  it('should render circular progress', async () => {
    const el = fixture<AtmanProgress>('atman-progress');
    el.type = 'circular';
    el.value = 75;
    await elementUpdated(el);

    const svg = el.shadowRoot?.querySelector('.circular-svg');
    expect(svg).toBeTruthy();
  });

  it('should show label when show-label is set', async () => {
    const el = fixture<AtmanProgress>('atman-progress');
    el.showLabel = true;
    el.value = 42;
    await elementUpdated(el);

    const header = el.shadowRoot?.querySelector('.linear-header');
    expect(header?.textContent).toContain('42%');
  });

  it('should show circular label', async () => {
    const el = fixture<AtmanProgress>('atman-progress');
    el.type = 'circular';
    el.showLabel = true;
    el.value = 65;
    await elementUpdated(el);

    const label = el.shadowRoot?.querySelector('.circular-label');
    expect(label?.textContent).toContain('65%');
  });

  it('should have role="progressbar"', async () => {
    const el = fixture<AtmanProgress>('atman-progress');
    await elementUpdated(el);

    const progressbar = el.shadowRoot?.querySelector('[role="progressbar"]');
    expect(progressbar).toBeTruthy();
    expect(progressbar?.getAttribute('aria-valuemin')).toBe('0');
    expect(progressbar?.getAttribute('aria-valuemax')).toBe('100');
  });

  it('should apply variant class to fill', async () => {
    const el = fixture<AtmanProgress>('atman-progress');
    el.variant = 'success';
    await elementUpdated(el);

    const fill = el.shadowRoot?.querySelector('.fill');
    expect(fill?.classList.contains('fill--success')).toBe(true);
  });

  it('should apply indeterminate class', async () => {
    const el = fixture<AtmanProgress>('atman-progress');
    el.indeterminate = true;
    await elementUpdated(el);

    const fill = el.shadowRoot?.querySelector('.fill');
    expect(fill?.classList.contains('fill--indeterminate')).toBe(true);
  });

  it('should not show aria-valuenow when indeterminate', async () => {
    const el = fixture<AtmanProgress>('atman-progress');
    el.indeterminate = true;
    await elementUpdated(el);

    const track = el.shadowRoot?.querySelector('[role="progressbar"]');
    expect(track?.hasAttribute('aria-valuenow')).toBe(false);
  });

  it('should apply size class to track', async () => {
    const el = fixture<AtmanProgress>('atman-progress');
    el.size = 'lg';
    await elementUpdated(el);

    const track = el.shadowRoot?.querySelector('.track');
    expect(track?.classList.contains('track--lg')).toBe(true);
  });
});
