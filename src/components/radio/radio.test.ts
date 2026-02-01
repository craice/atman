import { describe, it, expect, vi } from 'vitest';
import { elementUpdated, fixture } from '../../test/setup.js';
import type { AtmanRadio } from './radio.js';
import './radio.js';

describe('atman-radio', () => {
  it('should render with default properties', async () => {
    const el = fixture<AtmanRadio>('atman-radio');
    await elementUpdated(el);

    expect(el.checked).toBe(false);
    expect(el.disabled).toBe(false);
  });

  it('should render with label content', async () => {
    const el = fixture<AtmanRadio>('atman-radio');
    el.textContent = 'Option 1';
    await elementUpdated(el);

    const label = el.shadowRoot?.querySelector('.label');
    expect(label).toBeTruthy();
  });

  it('should be checked when checked property is true', async () => {
    const el = fixture<AtmanRadio>('atman-radio');
    el.checked = true;
    await elementUpdated(el);

    const input = el.shadowRoot?.querySelector('input');
    expect(input?.checked).toBe(true);
  });

  it('should dispatch atman-change event on change', async () => {
    const el = fixture<AtmanRadio>('atman-radio');
    el.value = 'option1';
    await elementUpdated(el);

    const changeHandler = vi.fn();
    el.addEventListener('atman-change', changeHandler);

    const control = el.shadowRoot?.querySelector('.control');
    control?.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(changeHandler).toHaveBeenCalled();
    expect(changeHandler.mock.calls[0][0].detail.value).toBe('option1');
  });

  it('should not change when disabled', async () => {
    const el = fixture<AtmanRadio>('atman-radio');
    el.disabled = true;
    await elementUpdated(el);

    const changeHandler = vi.fn();
    el.addEventListener('atman-change', changeHandler);

    const control = el.shadowRoot?.querySelector('.control');
    control?.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(changeHandler).not.toHaveBeenCalled();
  });

  it('should show checked state visually', async () => {
    const el = fixture<AtmanRadio>('atman-radio');
    el.checked = true;
    await elementUpdated(el);

    const control = el.shadowRoot?.querySelector('.control');
    expect(control?.classList.contains('control--checked')).toBe(true);
  });

  it('should set name attribute', async () => {
    const el = fixture<AtmanRadio>('atman-radio');
    el.name = 'options';
    await elementUpdated(el);

    const input = el.shadowRoot?.querySelector('input');
    expect(input?.name).toBe('options');
  });

  it('should set value attribute', async () => {
    const el = fixture<AtmanRadio>('atman-radio');
    el.value = 'option1';
    await elementUpdated(el);

    const input = el.shadowRoot?.querySelector('input');
    expect(input?.value).toBe('option1');
  });

  it('should apply disabled styling', async () => {
    const el = fixture<AtmanRadio>('atman-radio');
    el.disabled = true;
    await elementUpdated(el);

    const radio = el.shadowRoot?.querySelector('.radio');
    expect(radio?.classList.contains('radio--disabled')).toBe(true);
  });

  it('should have type="radio" on input', async () => {
    const el = fixture<AtmanRadio>('atman-radio');
    await elementUpdated(el);

    const input = el.shadowRoot?.querySelector('input');
    expect(input?.type).toBe('radio');
  });
});
