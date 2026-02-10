import { describe, it, expect, vi } from 'vitest';
import { elementUpdated, fixture } from '../../test/setup.js';
import type { AtmanSwitch } from './switch.js';
import './switch.js';

describe('atman-switch', () => {
  it('should render with default properties', async () => {
    const el = fixture<AtmanSwitch>('atman-switch');
    await elementUpdated(el);

    expect(el.checked).toBe(false);
    expect(el.disabled).toBe(false);
    expect(el.size).toBe('md');
    expect(el.labelPosition).toBe('right');
  });

  it('should toggle checked state on click', async () => {
    const el = fixture<AtmanSwitch>('atman-switch');
    await elementUpdated(el);

    const input = el.shadowRoot?.querySelector('input');
    input!.checked = true;
    input?.dispatchEvent(new Event('change', { bubbles: true }));
    await elementUpdated(el);

    expect(el.checked).toBe(true);
  });

  it('should dispatch atman-change event', async () => {
    const el = fixture<AtmanSwitch>('atman-switch');
    await elementUpdated(el);

    const changeHandler = vi.fn();
    el.addEventListener('atman-change', changeHandler);

    const input = el.shadowRoot?.querySelector('input');
    input!.checked = true;
    input?.dispatchEvent(new Event('change', { bubbles: true }));

    expect(changeHandler).toHaveBeenCalled();
    expect(changeHandler.mock.calls[0][0].detail.checked).toBe(true);
  });

  it('should not toggle when disabled', async () => {
    const el = fixture<AtmanSwitch>('atman-switch');
    el.disabled = true;
    await elementUpdated(el);

    const input = el.shadowRoot?.querySelector('input');
    expect(input?.disabled).toBe(true);
  });

  it('should have role="switch"', async () => {
    const el = fixture<AtmanSwitch>('atman-switch');
    await elementUpdated(el);

    const input = el.shadowRoot?.querySelector('input');
    expect(input?.getAttribute('role')).toBe('switch');
  });

  it('should set aria-checked', async () => {
    const el = fixture<AtmanSwitch>('atman-switch');
    el.checked = true;
    await elementUpdated(el);

    const input = el.shadowRoot?.querySelector('input');
    expect(input?.getAttribute('aria-checked')).toBe('true');
  });

  it('should apply size classes', async () => {
    const el = fixture<AtmanSwitch>('atman-switch');
    el.size = 'lg';
    await elementUpdated(el);

    const track = el.shadowRoot?.querySelector('.track');
    expect(track?.classList.contains('track--lg')).toBe(true);
  });

  it('should reverse label position when set to left', async () => {
    const el = fixture<AtmanSwitch>('atman-switch');
    el.labelPosition = 'left';
    await elementUpdated(el);

    const container = el.shadowRoot?.querySelector('.switch');
    expect(container?.classList.contains('switch--label-left')).toBe(true);
  });

  it('should apply checked class to track', async () => {
    const el = fixture<AtmanSwitch>('atman-switch');
    el.checked = true;
    await elementUpdated(el);

    const track = el.shadowRoot?.querySelector('.track');
    expect(track?.classList.contains('track--checked')).toBe(true);
  });

  it('should set name and value', async () => {
    const el = fixture<AtmanSwitch>('atman-switch');
    el.name = 'notifications';
    el.value = 'enabled';
    await elementUpdated(el);

    const input = el.shadowRoot?.querySelector('input');
    expect(input?.name).toBe('notifications');
    expect(input?.value).toBe('enabled');
  });
});
