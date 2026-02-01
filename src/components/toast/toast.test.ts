import { describe, it, expect, vi } from 'vitest';
import { elementUpdated, fixture } from '../../test/setup.js';
import type { AtmanToast } from './toast.js';
import './toast.js';

describe('atman-toast', () => {
  it('should render with default properties', async () => {
    const el = fixture<AtmanToast>('atman-toast');
    await elementUpdated(el);

    expect(el.variant).toBe('info');
    expect(el.duration).toBe(5000);
  });

  it('should render with title', async () => {
    const el = fixture<AtmanToast>('atman-toast');
    el.toastTitle = 'Success!';
    await elementUpdated(el);

    const title = el.shadowRoot?.querySelector('.title');
    expect(title?.textContent?.trim()).toBe('Success!');
  });

  it('should render with description', async () => {
    const el = fixture<AtmanToast>('atman-toast');
    el.description = 'Your changes have been saved.';
    await elementUpdated(el);

    const description = el.shadowRoot?.querySelector('.description');
    expect(description?.textContent?.trim()).toBe('Your changes have been saved.');
  });

  it('should apply variant classes correctly', async () => {
    const el = fixture<AtmanToast>('atman-toast');

    const variants = ['info', 'success', 'warning', 'error'] as const;
    for (const variant of variants) {
      el.variant = variant;
      await elementUpdated(el);

      const toast = el.shadowRoot?.querySelector('.toast');
      expect(toast?.classList.contains(`toast--${variant}`)).toBe(true);
    }
  });

  it('should show action button when actionLabel is set', async () => {
    const el = fixture<AtmanToast>('atman-toast');
    el.actionLabel = 'Undo';
    await elementUpdated(el);

    const actionButton = el.shadowRoot?.querySelector('.action');
    expect(actionButton?.textContent?.trim()).toBe('Undo');
  });

  it('should dispatch atman-action event when action is clicked', async () => {
    const el = fixture<AtmanToast>('atman-toast');
    el.actionLabel = 'Undo';
    await elementUpdated(el);

    const actionHandler = vi.fn();
    el.addEventListener('atman-action', actionHandler);

    const actionButton = el.shadowRoot?.querySelector('.action') as HTMLButtonElement;
    actionButton?.click();

    expect(actionHandler).toHaveBeenCalled();
  });

  it('should have role="alert"', async () => {
    const el = fixture<AtmanToast>('atman-toast');
    await elementUpdated(el);

    const toast = el.shadowRoot?.querySelector('[role="alert"]');
    expect(toast).toBeTruthy();
  });

  it('should always show close button', async () => {
    const el = fixture<AtmanToast>('atman-toast');
    await elementUpdated(el);

    const closeButton = el.shadowRoot?.querySelector('.close');
    expect(closeButton).toBeTruthy();
  });

  it('should have icon container', async () => {
    const el = fixture<AtmanToast>('atman-toast');
    await elementUpdated(el);

    const iconContainer = el.shadowRoot?.querySelector('.icon');
    expect(iconContainer).toBeTruthy();
  });

  it('should have duration property', async () => {
    const el = fixture<AtmanToast>('atman-toast');
    el.duration = 3000;
    await elementUpdated(el);

    expect(el.duration).toBe(3000);
  });

  it('should have content container', async () => {
    const el = fixture<AtmanToast>('atman-toast');
    await elementUpdated(el);

    const content = el.shadowRoot?.querySelector('.content');
    expect(content).toBeTruthy();
  });
});
