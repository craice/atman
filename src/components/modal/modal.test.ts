import { describe, it, expect, vi } from 'vitest';
import { elementUpdated, fixture, pressKey } from '../../test/setup.js';
import type { AtmanModal } from './modal.js';
import './modal.js';

describe('atman-modal', () => {
  it('should render with default properties', async () => {
    const el = fixture<AtmanModal>('atman-modal');
    await elementUpdated(el);

    expect(el.open).toBe(false);
    expect(el.size).toBe('md');
    expect(el.closeOnBackdrop).toBe(true);
    expect(el.closeOnEscape).toBe(true);
    expect(el.showClose).toBe(true);
  });

  it('should be hidden when not open', async () => {
    const el = fixture<AtmanModal>('atman-modal');
    await elementUpdated(el);

    const modal = el.shadowRoot?.querySelector('.modal');
    expect(modal?.classList.contains('modal--open')).toBe(false);
  });

  it('should be visible when open', async () => {
    const el = fixture<AtmanModal>('atman-modal');
    el.open = true;
    await elementUpdated(el);

    const modal = el.shadowRoot?.querySelector('.modal');
    expect(modal?.classList.contains('modal--open')).toBe(true);
  });

  it('should apply size classes correctly', async () => {
    const el = fixture<AtmanModal>('atman-modal');
    el.open = true;

    const sizes = ['sm', 'md', 'lg', 'full'] as const;
    for (const size of sizes) {
      el.size = size;
      await elementUpdated(el);

      const modal = el.shadowRoot?.querySelector('.modal');
      expect(modal?.classList.contains(`modal--${size}`)).toBe(true);
    }
  });

  it('should render modal title', async () => {
    const el = fixture<AtmanModal>('atman-modal');
    el.modalTitle = 'Confirm Action';
    el.open = true;
    await elementUpdated(el);

    const title = el.shadowRoot?.querySelector('.header-content');
    expect(title?.textContent?.trim()).toBe('Confirm Action');
  });

  it('should show close button when showClose is true', async () => {
    const el = fixture<AtmanModal>('atman-modal');
    el.showClose = true;
    el.open = true;
    await elementUpdated(el);

    const closeButton = el.shadowRoot?.querySelector('.close');
    expect(closeButton).toBeTruthy();
  });

  it('should hide close button when showClose is false', async () => {
    const el = fixture<AtmanModal>('atman-modal');
    el.showClose = false;
    el.open = true;
    await elementUpdated(el);

    const closeButton = el.shadowRoot?.querySelector('.close');
    expect(closeButton).toBeNull();
  });

  it('should dispatch atman-open event when opened', async () => {
    const el = fixture<AtmanModal>('atman-modal');
    await elementUpdated(el);

    const openHandler = vi.fn();
    el.addEventListener('atman-open', openHandler);

    el.open = true;
    await elementUpdated(el);

    expect(openHandler).toHaveBeenCalled();
  });

  it('should dispatch atman-close event when closed', async () => {
    const el = fixture<AtmanModal>('atman-modal');
    el.open = true;
    await elementUpdated(el);

    const closeHandler = vi.fn();
    el.addEventListener('atman-close', closeHandler);

    el.open = false;
    await elementUpdated(el);

    expect(closeHandler).toHaveBeenCalled();
  });

  it('should close when close button is clicked', async () => {
    const el = fixture<AtmanModal>('atman-modal');
    el.open = true;
    await elementUpdated(el);

    const closeButton = el.shadowRoot?.querySelector('.close') as HTMLButtonElement;
    closeButton?.click();
    await elementUpdated(el);

    expect(el.open).toBe(false);
  });

  it('should have role="dialog"', async () => {
    const el = fixture<AtmanModal>('atman-modal');
    await elementUpdated(el);

    const modal = el.shadowRoot?.querySelector('[role="dialog"]');
    expect(modal).toBeTruthy();
  });

  it('should have aria-modal="true"', async () => {
    const el = fixture<AtmanModal>('atman-modal');
    await elementUpdated(el);

    const modal = el.shadowRoot?.querySelector('[aria-modal="true"]');
    expect(modal).toBeTruthy();
  });

  it('should expose show method', async () => {
    const el = fixture<AtmanModal>('atman-modal');
    await elementUpdated(el);

    expect(typeof el.show).toBe('function');
    el.show();
    await elementUpdated(el);
    expect(el.open).toBe(true);
  });

  it('should expose close method', async () => {
    const el = fixture<AtmanModal>('atman-modal');
    el.open = true;
    await elementUpdated(el);

    expect(typeof el.close).toBe('function');
    el.close();
    await elementUpdated(el);
    expect(el.open).toBe(false);
  });
});
