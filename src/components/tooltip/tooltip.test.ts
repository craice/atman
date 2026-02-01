import { describe, it, expect } from 'vitest';
import { elementUpdated, fixture } from '../../test/setup.js';
import type { AtmanTooltip } from './tooltip.js';
import './tooltip.js';

describe('atman-tooltip', () => {
  it('should render with default properties', async () => {
    const el = fixture<AtmanTooltip>('atman-tooltip');
    await elementUpdated(el);

    expect(el.placement).toBe('top');
    expect(el.showDelay).toBe(200);
    expect(el.hideDelay).toBe(0);
    expect(el.disabled).toBe(false);
    expect(el.arrow).toBe(true);
  });

  it('should render with content', async () => {
    const el = fixture<AtmanTooltip>('atman-tooltip');
    el.content = 'Tooltip text';
    await elementUpdated(el);

    const tooltipContent = el.shadowRoot?.querySelector('[part="content"]');
    expect(tooltipContent?.textContent?.trim()).toBe('Tooltip text');
  });

  it('should be hidden by default', async () => {
    const el = fixture<AtmanTooltip>('atman-tooltip');
    el.content = 'Tooltip text';
    await elementUpdated(el);

    const tooltip = el.shadowRoot?.querySelector('.tooltip');
    expect(tooltip?.classList.contains('tooltip--visible')).toBe(false);
  });

  it('should not show when disabled', async () => {
    const el = fixture<AtmanTooltip>('atman-tooltip');
    el.content = 'Tooltip text';
    el.disabled = true;
    el.showDelay = 0;
    await elementUpdated(el);

    const trigger = el.shadowRoot?.querySelector('.trigger') as HTMLDivElement;
    trigger?.dispatchEvent(new MouseEvent('mouseenter'));
    await elementUpdated(el);

    const tooltip = el.shadowRoot?.querySelector('.tooltip');
    expect(tooltip?.classList.contains('tooltip--visible')).toBe(false);
  });

  it('should not show when content is empty', async () => {
    const el = fixture<AtmanTooltip>('atman-tooltip');
    el.content = '';
    el.showDelay = 0;
    await elementUpdated(el);

    const trigger = el.shadowRoot?.querySelector('.trigger') as HTMLDivElement;
    trigger?.dispatchEvent(new MouseEvent('mouseenter'));
    await elementUpdated(el);

    const tooltip = el.shadowRoot?.querySelector('.tooltip');
    expect(tooltip?.classList.contains('tooltip--visible')).toBe(false);
  });

  it('should apply placement classes correctly', async () => {
    const el = fixture<AtmanTooltip>('atman-tooltip');
    el.content = 'Tooltip text';

    const placements = ['top', 'right', 'bottom', 'left'] as const;
    for (const placement of placements) {
      el.placement = placement;
      await elementUpdated(el);

      const tooltip = el.shadowRoot?.querySelector('.tooltip');
      expect(tooltip?.classList.contains(`tooltip--${placement}`)).toBe(true);
    }
  });

  it('should render arrow when arrow is true', async () => {
    const el = fixture<AtmanTooltip>('atman-tooltip');
    el.content = 'Tooltip text';
    el.arrow = true;
    await elementUpdated(el);

    const arrow = el.shadowRoot?.querySelector('.arrow');
    expect(arrow).toBeTruthy();
  });

  it('should not render arrow when arrow is false', async () => {
    const el = fixture<AtmanTooltip>('atman-tooltip');
    el.content = 'Tooltip text';
    el.arrow = false;
    await elementUpdated(el);

    const arrow = el.shadowRoot?.querySelector('.arrow');
    expect(arrow).toBeNull();
  });

  it('should have role="tooltip"', async () => {
    const el = fixture<AtmanTooltip>('atman-tooltip');
    el.content = 'Tooltip text';
    await elementUpdated(el);

    const tooltip = el.shadowRoot?.querySelector('[part="tooltip"]');
    expect(tooltip?.getAttribute('role')).toBe('tooltip');
  });

  it('should have trigger element', async () => {
    const el = fixture<AtmanTooltip>('atman-tooltip');
    await elementUpdated(el);

    const trigger = el.shadowRoot?.querySelector('.trigger');
    expect(trigger).toBeTruthy();
  });

  it('should have showDelay property', async () => {
    const el = fixture<AtmanTooltip>('atman-tooltip');
    el.showDelay = 500;
    await elementUpdated(el);

    expect(el.showDelay).toBe(500);
  });

  it('should have hideDelay property', async () => {
    const el = fixture<AtmanTooltip>('atman-tooltip');
    el.hideDelay = 100;
    await elementUpdated(el);

    expect(el.hideDelay).toBe(100);
  });
});
