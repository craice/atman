import { describe, it, expect, vi } from 'vitest';
import { elementUpdated, fixture } from '../../test/setup.js';
import type { AtmanInput } from './input.js';
import './input.js';

describe('atman-input', () => {
  it('should render with default properties', async () => {
    const el = fixture<AtmanInput>('atman-input');
    await elementUpdated(el);

    expect(el.type).toBe('text');
    expect(el.size).toBe('md');
    expect(el.disabled).toBe(false);
    expect(el.required).toBe(false);
    expect(el.value).toBe('');
  });

  it('should render label when provided', async () => {
    const el = fixture<AtmanInput>('atman-input');
    el.label = 'Email';
    await elementUpdated(el);

    const label = el.shadowRoot?.querySelector('label');
    expect(label?.textContent?.trim()).toBe('Email');
  });

  it('should show required indicator when required', async () => {
    const el = fixture<AtmanInput>('atman-input');
    el.label = 'Email';
    el.required = true;
    await elementUpdated(el);

    const label = el.shadowRoot?.querySelector('label');
    expect(label?.classList.contains('label--required')).toBe(true);
  });

  it('should apply size classes correctly', async () => {
    const el = fixture<AtmanInput>('atman-input');

    const sizes = ['sm', 'md', 'lg'] as const;
    for (const size of sizes) {
      el.size = size;
      await elementUpdated(el);

      const container = el.shadowRoot?.querySelector('.container');
      expect(container?.classList.contains(`container--${size}`)).toBe(true);
    }
  });

  it('should update value on input', async () => {
    const el = fixture<AtmanInput>('atman-input');
    await elementUpdated(el);

    const input = el.shadowRoot?.querySelector('input');
    if (input) {
      input.value = 'test value';
      input.dispatchEvent(new Event('input', { bubbles: true }));
    }
    await elementUpdated(el);

    expect(el.value).toBe('test value');
  });

  it('should dispatch atman-input event on input', async () => {
    const el = fixture<AtmanInput>('atman-input');
    await elementUpdated(el);

    const inputHandler = vi.fn();
    el.addEventListener('atman-input', inputHandler);

    const input = el.shadowRoot?.querySelector('input');
    if (input) {
      input.value = 'test';
      input.dispatchEvent(new Event('input', { bubbles: true }));
    }

    expect(inputHandler).toHaveBeenCalled();
    expect(inputHandler.mock.calls[0][0].detail.value).toBe('test');
  });

  it('should dispatch atman-change event on change', async () => {
    const el = fixture<AtmanInput>('atman-input');
    await elementUpdated(el);

    const changeHandler = vi.fn();
    el.addEventListener('atman-change', changeHandler);

    const input = el.shadowRoot?.querySelector('input');
    if (input) {
      input.value = 'test';
      input.dispatchEvent(new Event('change', { bubbles: true }));
    }

    expect(changeHandler).toHaveBeenCalled();
  });

  it('should show error message when error is set', async () => {
    const el = fixture<AtmanInput>('atman-input');
    el.error = 'This field is required';
    await elementUpdated(el);

    const errorMessage = el.shadowRoot?.querySelector('.error-message');
    expect(errorMessage?.textContent?.trim()).toBe('This field is required');
  });

  it('should show helper text when provided', async () => {
    const el = fixture<AtmanInput>('atman-input');
    el.helperText = 'Enter your email address';
    await elementUpdated(el);

    const helperText = el.shadowRoot?.querySelector('.helper-text');
    expect(helperText?.textContent?.trim()).toBe('Enter your email address');
  });

  it('should be disabled when disabled property is true', async () => {
    const el = fixture<AtmanInput>('atman-input');
    el.disabled = true;
    await elementUpdated(el);

    const input = el.shadowRoot?.querySelector('input');
    expect(input?.disabled).toBe(true);
  });

  it('should set input type correctly', async () => {
    const el = fixture<AtmanInput>('atman-input');
    el.type = 'email';
    await elementUpdated(el);

    const input = el.shadowRoot?.querySelector('input');
    expect(input?.type).toBe('email');
  });

  it('should set placeholder correctly', async () => {
    const el = fixture<AtmanInput>('atman-input');
    el.placeholder = 'Enter text...';
    await elementUpdated(el);

    const input = el.shadowRoot?.querySelector('input');
    expect(input?.placeholder).toBe('Enter text...');
  });

  it('should expose focus method', async () => {
    const el = fixture<AtmanInput>('atman-input');
    await elementUpdated(el);

    expect(typeof el.focus).toBe('function');
  });

  it('should expose blur method', async () => {
    const el = fixture<AtmanInput>('atman-input');
    await elementUpdated(el);

    expect(typeof el.blur).toBe('function');
  });

  it('should expose select method', async () => {
    const el = fixture<AtmanInput>('atman-input');
    await elementUpdated(el);

    expect(typeof el.select).toBe('function');
  });

  it('should set aria-invalid when error is present', async () => {
    const el = fixture<AtmanInput>('atman-input');
    el.error = 'Error message';
    await elementUpdated(el);

    const input = el.shadowRoot?.querySelector('input');
    expect(input?.getAttribute('aria-invalid')).toBe('true');
  });
});
