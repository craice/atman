import { describe, it, expect, vi } from 'vitest';
import { elementUpdated, fixture } from '../../test/setup.js';
import type { AtmanAlert } from './alert.js';
import './alert.js';

describe('atman-alert', () => {
  it('should render with default properties', async () => {
    const el = fixture<AtmanAlert>('atman-alert');
    await elementUpdated(el);

    expect(el.variant).toBe('info');
    expect(el.dismissible).toBe(false);
  });

  it('should render with title', async () => {
    const el = fixture<AtmanAlert>('atman-alert');
    el.alertTitle = 'Important Notice';
    await elementUpdated(el);

    const title = el.shadowRoot?.querySelector('.title');
    expect(title?.textContent?.trim()).toBe('Important Notice');
  });

  it('should render with description content', async () => {
    const el = fixture<AtmanAlert>('atman-alert');
    el.textContent = 'This is the alert description';
    await elementUpdated(el);

    const description = el.shadowRoot?.querySelector('.description');
    expect(description).toBeTruthy();
  });

  it('should apply variant classes correctly', async () => {
    const el = fixture<AtmanAlert>('atman-alert');

    const variants = ['info', 'success', 'warning', 'error'] as const;
    for (const variant of variants) {
      el.variant = variant;
      await elementUpdated(el);

      const alert = el.shadowRoot?.querySelector('.alert');
      expect(alert?.classList.contains(`alert--${variant}`)).toBe(true);
    }
  });

  it('should show close button when dismissible', async () => {
    const el = fixture<AtmanAlert>('atman-alert');
    el.dismissible = true;
    await elementUpdated(el);

    const closeButton = el.shadowRoot?.querySelector('.close');
    expect(closeButton).toBeTruthy();
  });

  it('should not show close button when not dismissible', async () => {
    const el = fixture<AtmanAlert>('atman-alert');
    el.dismissible = false;
    await elementUpdated(el);

    const closeButton = el.shadowRoot?.querySelector('.close');
    expect(closeButton).toBeNull();
  });

  it('should dispatch atman-dismiss event when dismissed', async () => {
    const el = fixture<AtmanAlert>('atman-alert');
    el.dismissible = true;
    await elementUpdated(el);

    const dismissHandler = vi.fn();
    el.addEventListener('atman-dismiss', dismissHandler);

    const closeButton = el.shadowRoot?.querySelector('.close') as HTMLButtonElement;
    closeButton?.click();

    expect(dismissHandler).toHaveBeenCalled();
  });

  it('should hide after dismissing', async () => {
    const el = fixture<AtmanAlert>('atman-alert');
    el.dismissible = true;
    await elementUpdated(el);

    const closeButton = el.shadowRoot?.querySelector('.close') as HTMLButtonElement;
    closeButton?.click();
    await elementUpdated(el);

    expect(el.hidden).toBe(true);
  });

  it('should have role="alert"', async () => {
    const el = fixture<AtmanAlert>('atman-alert');
    await elementUpdated(el);

    const alert = el.shadowRoot?.querySelector('.alert');
    expect(alert?.getAttribute('role')).toBe('alert');
  });

  it('should use assertive aria-live for error variant', async () => {
    const el = fixture<AtmanAlert>('atman-alert');
    el.variant = 'error';
    await elementUpdated(el);

    const alert = el.shadowRoot?.querySelector('.alert');
    expect(alert?.getAttribute('aria-live')).toBe('assertive');
  });

  it('should use polite aria-live for non-error variants', async () => {
    const el = fixture<AtmanAlert>('atman-alert');
    el.variant = 'info';
    await elementUpdated(el);

    const alert = el.shadowRoot?.querySelector('.alert');
    expect(alert?.getAttribute('aria-live')).toBe('polite');
  });

  it('should render icon container for each variant', async () => {
    const el = fixture<AtmanAlert>('atman-alert');

    const variants = ['info', 'success', 'warning', 'error'] as const;
    for (const variant of variants) {
      el.variant = variant;
      await elementUpdated(el);

      const iconContainer = el.shadowRoot?.querySelector('.icon');
      expect(iconContainer).toBeTruthy();
    }
  });
});
