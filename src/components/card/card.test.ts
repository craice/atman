import { describe, it, expect, vi } from 'vitest';
import { elementUpdated, fixture, pressKey } from '../../test/setup.js';
import type { AtmanCard } from './card.js';
import './card.js';

describe('atman-card', () => {
  it('should render with default properties', async () => {
    const el = fixture<AtmanCard>('atman-card');
    await elementUpdated(el);

    expect(el.clickable).toBe(false);
    expect(el.elevated).toBe(false);
    expect(el.padding).toBe('md');
  });

  it('should render body content', async () => {
    const el = fixture<AtmanCard>('atman-card');
    el.textContent = 'Card content';
    await elementUpdated(el);

    const body = el.shadowRoot?.querySelector('.body');
    expect(body).toBeTruthy();
  });

  it('should apply clickable styling', async () => {
    const el = fixture<AtmanCard>('atman-card');
    el.clickable = true;
    await elementUpdated(el);

    const card = el.shadowRoot?.querySelector('.card');
    expect(card?.classList.contains('card--clickable')).toBe(true);
  });

  it('should apply elevated styling', async () => {
    const el = fixture<AtmanCard>('atman-card');
    el.elevated = true;
    await elementUpdated(el);

    const card = el.shadowRoot?.querySelector('.card');
    expect(card?.classList.contains('card--elevated')).toBe(true);
  });

  it('should dispatch atman-click event when clickable and clicked', async () => {
    const el = fixture<AtmanCard>('atman-card');
    el.clickable = true;
    await elementUpdated(el);

    const clickHandler = vi.fn();
    el.addEventListener('atman-click', clickHandler);

    const card = el.shadowRoot?.querySelector('.card') as HTMLDivElement;
    card?.click();

    expect(clickHandler).toHaveBeenCalled();
  });

  it('should not dispatch atman-click when not clickable', async () => {
    const el = fixture<AtmanCard>('atman-card');
    el.clickable = false;
    await elementUpdated(el);

    const clickHandler = vi.fn();
    el.addEventListener('atman-click', clickHandler);

    const card = el.shadowRoot?.querySelector('.card') as HTMLDivElement;
    card?.click();

    expect(clickHandler).not.toHaveBeenCalled();
  });

  it('should have role="button" when clickable', async () => {
    const el = fixture<AtmanCard>('atman-card');
    el.clickable = true;
    await elementUpdated(el);

    const card = el.shadowRoot?.querySelector('.card');
    expect(card?.getAttribute('role')).toBe('button');
  });

  it('should have tabindex="0" when clickable', async () => {
    const el = fixture<AtmanCard>('atman-card');
    el.clickable = true;
    await elementUpdated(el);

    const card = el.shadowRoot?.querySelector('.card');
    expect(card?.getAttribute('tabindex')).toBe('0');
  });

  it('should not have role="button" when not clickable', async () => {
    const el = fixture<AtmanCard>('atman-card');
    el.clickable = false;
    await elementUpdated(el);

    const card = el.shadowRoot?.querySelector('.card');
    expect(card?.hasAttribute('role')).toBe(false);
  });

  it('should dispatch atman-click on Enter key when clickable', async () => {
    const el = fixture<AtmanCard>('atman-card');
    el.clickable = true;
    await elementUpdated(el);

    const clickHandler = vi.fn();
    el.addEventListener('atman-click', clickHandler);

    const card = el.shadowRoot?.querySelector('.card') as HTMLDivElement;
    pressKey(card, 'Enter');

    expect(clickHandler).toHaveBeenCalled();
  });

  it('should dispatch atman-click on Space key when clickable', async () => {
    const el = fixture<AtmanCard>('atman-card');
    el.clickable = true;
    await elementUpdated(el);

    const clickHandler = vi.fn();
    el.addEventListener('atman-click', clickHandler);

    const card = el.shadowRoot?.querySelector('.card') as HTMLDivElement;
    pressKey(card, ' ');

    expect(clickHandler).toHaveBeenCalled();
  });

  it('should have header slot', async () => {
    const el = fixture<AtmanCard>('atman-card');
    await elementUpdated(el);

    const headerSlot = el.shadowRoot?.querySelector('slot[name="header"]');
    expect(headerSlot).toBeTruthy();
  });

  it('should have footer slot', async () => {
    const el = fixture<AtmanCard>('atman-card');
    await elementUpdated(el);

    const footerSlot = el.shadowRoot?.querySelector('slot[name="footer"]');
    expect(footerSlot).toBeTruthy();
  });

  it('should have default slot for body', async () => {
    const el = fixture<AtmanCard>('atman-card');
    await elementUpdated(el);

    const defaultSlot = el.shadowRoot?.querySelector('.body slot:not([name])');
    expect(defaultSlot).toBeTruthy();
  });
});
