import { describe, it, expect } from 'vitest';
import { elementUpdated, fixture } from '../../test/setup.js';
import type { AtmanDivider } from './divider.js';
import './divider.js';

describe('atman-divider', () => {
  it('should render with default properties', async () => {
    const el = fixture<AtmanDivider>('atman-divider');
    await elementUpdated(el);

    expect(el.orientation).toBe('horizontal');
    expect(el.labelPosition).toBe('center');
  });

  it('should apply horizontal orientation class', async () => {
    const el = fixture<AtmanDivider>('atman-divider');
    el.orientation = 'horizontal';
    await elementUpdated(el);

    const divider = el.shadowRoot?.querySelector('.divider');
    expect(divider?.classList.contains('divider--horizontal')).toBe(true);
  });

  it('should apply vertical orientation class', async () => {
    const el = fixture<AtmanDivider>('atman-divider');
    el.orientation = 'vertical';
    await elementUpdated(el);

    const divider = el.shadowRoot?.querySelector('.divider');
    expect(divider?.classList.contains('divider--vertical')).toBe(true);
  });

  it('should have role="separator"', async () => {
    const el = fixture<AtmanDivider>('atman-divider');
    await elementUpdated(el);

    const divider = el.shadowRoot?.querySelector('.divider');
    expect(divider?.getAttribute('role')).toBe('separator');
  });

  it('should set aria-orientation', async () => {
    const el = fixture<AtmanDivider>('atman-divider');
    el.orientation = 'vertical';
    await elementUpdated(el);

    const divider = el.shadowRoot?.querySelector('.divider');
    expect(divider?.getAttribute('aria-orientation')).toBe('vertical');
  });

  it('should render line elements', async () => {
    const el = fixture<AtmanDivider>('atman-divider');
    await elementUpdated(el);

    const lines = el.shadowRoot?.querySelectorAll('.line');
    expect(lines?.length).toBe(2);
  });

  it('should have label slot', async () => {
    const el = fixture<AtmanDivider>('atman-divider');
    await elementUpdated(el);

    const slot = el.shadowRoot?.querySelector('slot');
    expect(slot).toBeTruthy();
  });

  it('should apply spacing attribute', async () => {
    const el = fixture<AtmanDivider>('atman-divider');
    el.spacing = 'md';
    await elementUpdated(el);

    expect(el.getAttribute('spacing')).toBe('md');
  });

  it('should support start label position', async () => {
    const el = fixture<AtmanDivider>('atman-divider');
    el.labelPosition = 'start';
    await elementUpdated(el);

    expect(el.labelPosition).toBe('start');
  });

  it('should support end label position', async () => {
    const el = fixture<AtmanDivider>('atman-divider');
    el.labelPosition = 'end';
    await elementUpdated(el);

    expect(el.labelPosition).toBe('end');
  });
});
