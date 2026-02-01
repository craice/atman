import { describe, it, expect, vi } from 'vitest';
import { elementUpdated, fixture, pressKey } from '../../test/setup.js';
import type { AtmanSelect } from './select.js';
import './select.js';

describe('atman-select', () => {
  const mockOptions = [
    { value: 'opt1', label: 'Option 1' },
    { value: 'opt2', label: 'Option 2' },
    { value: 'opt3', label: 'Option 3', disabled: true },
  ];

  it('should render with default properties', async () => {
    const el = fixture<AtmanSelect>('atman-select');
    await elementUpdated(el);

    expect(el.size).toBe('md');
    expect(el.disabled).toBe(false);
    expect(el.required).toBe(false);
    expect(el.placeholder).toBe('Select an option');
  });

  it('should render label when provided', async () => {
    const el = fixture<AtmanSelect>('atman-select');
    el.label = 'Choose option';
    await elementUpdated(el);

    const label = el.shadowRoot?.querySelector('label');
    expect(label?.textContent?.trim()).toBe('Choose option');
  });

  it('should show required indicator when required', async () => {
    const el = fixture<AtmanSelect>('atman-select');
    el.label = 'Choose option';
    el.required = true;
    await elementUpdated(el);

    const label = el.shadowRoot?.querySelector('label');
    expect(label?.classList.contains('label--required')).toBe(true);
  });

  it('should apply size classes correctly', async () => {
    const el = fixture<AtmanSelect>('atman-select');

    const sizes = ['sm', 'md', 'lg'] as const;
    for (const size of sizes) {
      el.size = size;
      await elementUpdated(el);

      const trigger = el.shadowRoot?.querySelector('.trigger');
      expect(trigger?.classList.contains(`trigger--${size}`)).toBe(true);
    }
  });

  it('should render options', async () => {
    const el = fixture<AtmanSelect>('atman-select');
    el.options = mockOptions;
    await elementUpdated(el);

    const options = el.shadowRoot?.querySelectorAll('.option');
    expect(options?.length).toBe(3);
  });

  it('should show placeholder when no value selected', async () => {
    const el = fixture<AtmanSelect>('atman-select');
    el.placeholder = 'Select...';
    await elementUpdated(el);

    const triggerText = el.shadowRoot?.querySelector('.trigger__text');
    expect(triggerText?.textContent?.trim()).toBe('Select...');
    expect(triggerText?.classList.contains('trigger__text--placeholder')).toBe(true);
  });

  it('should show selected option label', async () => {
    const el = fixture<AtmanSelect>('atman-select');
    el.options = mockOptions;
    el.value = 'opt1';
    await elementUpdated(el);

    const triggerText = el.shadowRoot?.querySelector('.trigger__text');
    expect(triggerText?.textContent?.trim()).toBe('Option 1');
  });

  it('should have trigger button', async () => {
    const el = fixture<AtmanSelect>('atman-select');
    el.options = mockOptions;
    await elementUpdated(el);

    const trigger = el.shadowRoot?.querySelector('.trigger');
    expect(trigger).toBeTruthy();
  });

  it('should dispatch atman-change event when option is selected', async () => {
    const el = fixture<AtmanSelect>('atman-select');
    el.options = mockOptions;
    await elementUpdated(el);

    const changeHandler = vi.fn();
    el.addEventListener('atman-change', changeHandler);

    // Open dropdown
    const trigger = el.shadowRoot?.querySelector('.trigger') as HTMLButtonElement;
    trigger?.click();
    await elementUpdated(el);

    // Click option
    const option = el.shadowRoot?.querySelector('.option') as HTMLDivElement;
    option?.click();
    await elementUpdated(el);

    expect(changeHandler).toHaveBeenCalled();
    expect(changeHandler.mock.calls[0][0].detail.value).toBe('opt1');
  });

  it('should not select disabled options', async () => {
    const el = fixture<AtmanSelect>('atman-select');
    el.options = mockOptions;
    await elementUpdated(el);

    const changeHandler = vi.fn();
    el.addEventListener('atman-change', changeHandler);

    // Open dropdown
    const trigger = el.shadowRoot?.querySelector('.trigger') as HTMLButtonElement;
    trigger?.click();
    await elementUpdated(el);

    // Click disabled option
    const options = el.shadowRoot?.querySelectorAll('.option');
    const disabledOption = options?.[2] as HTMLDivElement;
    disabledOption?.click();

    expect(changeHandler).not.toHaveBeenCalled();
  });

  it('should be disabled when disabled property is true', async () => {
    const el = fixture<AtmanSelect>('atman-select');
    el.disabled = true;
    await elementUpdated(el);

    const trigger = el.shadowRoot?.querySelector('.trigger') as HTMLButtonElement;
    expect(trigger?.disabled).toBe(true);
  });

  it('should show error message when error is set', async () => {
    const el = fixture<AtmanSelect>('atman-select');
    el.error = 'Please select an option';
    await elementUpdated(el);

    const errorMessage = el.shadowRoot?.querySelector('.error-message');
    expect(errorMessage?.textContent?.trim()).toBe('Please select an option');
  });

  it('should show helper text when provided', async () => {
    const el = fixture<AtmanSelect>('atman-select');
    el.helperText = 'Choose your preferred option';
    await elementUpdated(el);

    const helperText = el.shadowRoot?.querySelector('.helper-text');
    expect(helperText?.textContent?.trim()).toBe('Choose your preferred option');
  });

  it('should have aria-haspopup="listbox"', async () => {
    const el = fixture<AtmanSelect>('atman-select');
    await elementUpdated(el);

    const trigger = el.shadowRoot?.querySelector('.trigger');
    expect(trigger?.getAttribute('aria-haspopup')).toBe('listbox');
  });

  it('should have role="listbox" on dropdown', async () => {
    const el = fixture<AtmanSelect>('atman-select');
    await elementUpdated(el);

    const dropdown = el.shadowRoot?.querySelector('.dropdown');
    expect(dropdown?.getAttribute('role')).toBe('listbox');
  });

  it('should mark selected option with selected class', async () => {
    const el = fixture<AtmanSelect>('atman-select');
    el.options = mockOptions;
    el.value = 'opt1';
    await elementUpdated(el);

    const selectedOption = el.shadowRoot?.querySelector('.option--selected');
    expect(selectedOption).toBeTruthy();
  });
});
