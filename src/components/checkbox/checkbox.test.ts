import { describe, it, expect, vi } from 'vitest';
import { elementUpdated, fixture } from '../../test/setup.js';
import type { AtmanCheckbox } from './checkbox.js';
import './checkbox.js';

describe('atman-checkbox', () => {
  it('should render with default properties', async () => {
    const el = fixture<AtmanCheckbox>('atman-checkbox');
    await elementUpdated(el);

    expect(el.checked).toBe(false);
    expect(el.indeterminate).toBe(false);
    expect(el.disabled).toBe(false);
    expect(el.error).toBe(false);
  });

  it('should render with label content', async () => {
    const el = fixture<AtmanCheckbox>('atman-checkbox');
    el.textContent = 'Accept terms';
    await elementUpdated(el);

    const label = el.shadowRoot?.querySelector('.label');
    expect(label).toBeTruthy();
  });

  it('should toggle checked state on click', async () => {
    const el = fixture<AtmanCheckbox>('atman-checkbox');
    await elementUpdated(el);

    const control = el.shadowRoot?.querySelector('.control');
    control?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await elementUpdated(el);

    expect(el.checked).toBe(true);
  });

  it('should dispatch atman-change event on change', async () => {
    const el = fixture<AtmanCheckbox>('atman-checkbox');
    await elementUpdated(el);

    const changeHandler = vi.fn();
    el.addEventListener('atman-change', changeHandler);

    const control = el.shadowRoot?.querySelector('.control');
    control?.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(changeHandler).toHaveBeenCalled();
    expect(changeHandler.mock.calls[0][0].detail.checked).toBe(true);
  });

  it('should not toggle when disabled', async () => {
    const el = fixture<AtmanCheckbox>('atman-checkbox');
    el.disabled = true;
    await elementUpdated(el);

    const changeHandler = vi.fn();
    el.addEventListener('atman-change', changeHandler);

    const control = el.shadowRoot?.querySelector('.control');
    control?.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(el.checked).toBe(false);
    expect(changeHandler).not.toHaveBeenCalled();
  });

  it('should show check icon when checked', async () => {
    const el = fixture<AtmanCheckbox>('atman-checkbox');
    el.checked = true;
    await elementUpdated(el);

    const control = el.shadowRoot?.querySelector('.control');
    expect(control?.classList.contains('control--checked')).toBe(true);
  });

  it('should show indeterminate icon when indeterminate', async () => {
    const el = fixture<AtmanCheckbox>('atman-checkbox');
    el.indeterminate = true;
    await elementUpdated(el);

    const control = el.shadowRoot?.querySelector('.control');
    expect(control?.classList.contains('control--indeterminate')).toBe(true);
  });

  it('should clear indeterminate on check', async () => {
    const el = fixture<AtmanCheckbox>('atman-checkbox');
    el.indeterminate = true;
    await elementUpdated(el);

    const control = el.shadowRoot?.querySelector('.control');
    control?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await elementUpdated(el);

    expect(el.indeterminate).toBe(false);
    expect(el.checked).toBe(true);
  });

  it('should apply error state', async () => {
    const el = fixture<AtmanCheckbox>('atman-checkbox');
    el.error = true;
    await elementUpdated(el);

    const control = el.shadowRoot?.querySelector('.control');
    expect(control?.classList.contains('control--error')).toBe(true);
  });

  it('should set required attribute', async () => {
    const el = fixture<AtmanCheckbox>('atman-checkbox');
    el.required = true;
    await elementUpdated(el);

    const input = el.shadowRoot?.querySelector('input');
    expect(input?.required).toBe(true);
  });

  it('should set name attribute', async () => {
    const el = fixture<AtmanCheckbox>('atman-checkbox');
    el.name = 'terms';
    await elementUpdated(el);

    const input = el.shadowRoot?.querySelector('input');
    expect(input?.name).toBe('terms');
  });

  it('should set value attribute', async () => {
    const el = fixture<AtmanCheckbox>('atman-checkbox');
    el.value = 'accepted';
    await elementUpdated(el);

    const input = el.shadowRoot?.querySelector('input');
    expect(input?.value).toBe('accepted');
  });
});
