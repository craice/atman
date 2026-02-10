import { describe, it, expect, vi } from 'vitest';
import { elementUpdated, fixture } from '../../test/setup.js';
import type { AtmanTextarea } from './textarea.js';
import './textarea.js';

describe('atman-textarea', () => {
  it('should render with default properties', async () => {
    const el = fixture<AtmanTextarea>('atman-textarea');
    await elementUpdated(el);

    expect(el.value).toBe('');
    expect(el.disabled).toBe(false);
    expect(el.size).toBe('md');
    expect(el.rows).toBe(3);
    expect(el.resize).toBe('vertical');
  });

  it('should render with label', async () => {
    const el = fixture<AtmanTextarea>('atman-textarea');
    el.label = 'Description';
    await elementUpdated(el);

    const label = el.shadowRoot?.querySelector('.label');
    expect(label?.textContent?.trim()).toBe('Description');
  });

  it('should dispatch atman-input event on input', async () => {
    const el = fixture<AtmanTextarea>('atman-textarea');
    await elementUpdated(el);

    const handler = vi.fn();
    el.addEventListener('atman-input', handler);

    const textarea = el.shadowRoot?.querySelector('textarea');
    textarea!.value = 'hello';
    textarea?.dispatchEvent(new Event('input', { bubbles: true }));

    expect(handler).toHaveBeenCalled();
    expect(handler.mock.calls[0][0].detail.value).toBe('hello');
  });

  it('should dispatch atman-change event on change', async () => {
    const el = fixture<AtmanTextarea>('atman-textarea');
    await elementUpdated(el);

    const handler = vi.fn();
    el.addEventListener('atman-change', handler);

    const textarea = el.shadowRoot?.querySelector('textarea');
    textarea!.value = 'hello';
    textarea?.dispatchEvent(new Event('change', { bubbles: true }));

    expect(handler).toHaveBeenCalled();
  });

  it('should show error message', async () => {
    const el = fixture<AtmanTextarea>('atman-textarea');
    el.error = 'This field is required';
    await elementUpdated(el);

    const error = el.shadowRoot?.querySelector('.error-message');
    expect(error?.textContent?.trim()).toBe('This field is required');
  });

  it('should show helper text', async () => {
    const el = fixture<AtmanTextarea>('atman-textarea');
    el.helperText = 'Enter a description';
    await elementUpdated(el);

    const helper = el.shadowRoot?.querySelector('.helper-text');
    expect(helper?.textContent?.trim()).toBe('Enter a description');
  });

  it('should show character count when maxlength is set', async () => {
    const el = fixture<AtmanTextarea>('atman-textarea');
    el.maxlength = 100;
    el.value = 'hello';
    await elementUpdated(el);

    const counter = el.shadowRoot?.querySelector('.counter');
    expect(counter?.textContent?.trim()).toBe('5/100');
  });

  it('should apply disabled state', async () => {
    const el = fixture<AtmanTextarea>('atman-textarea');
    el.disabled = true;
    await elementUpdated(el);

    const textarea = el.shadowRoot?.querySelector('textarea');
    expect(textarea?.disabled).toBe(true);
    const container = el.shadowRoot?.querySelector('.container');
    expect(container?.classList.contains('container--disabled')).toBe(true);
  });

  it('should set required attribute', async () => {
    const el = fixture<AtmanTextarea>('atman-textarea');
    el.required = true;
    await elementUpdated(el);

    const textarea = el.shadowRoot?.querySelector('textarea');
    expect(textarea?.required).toBe(true);
  });

  it('should set rows attribute', async () => {
    const el = fixture<AtmanTextarea>('atman-textarea');
    el.rows = 5;
    await elementUpdated(el);

    const textarea = el.shadowRoot?.querySelector('textarea');
    expect(Number(textarea?.rows)).toBe(5);
  });

  it('should apply error class to container', async () => {
    const el = fixture<AtmanTextarea>('atman-textarea');
    el.error = 'Error';
    await elementUpdated(el);

    const container = el.shadowRoot?.querySelector('.container');
    expect(container?.classList.contains('container--error')).toBe(true);
  });
});
