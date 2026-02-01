import { describe, it, expect, vi } from 'vitest';
import { elementUpdated, fixture } from '../../test/setup.js';
import type { AtmanTab, AtmanTabs, AtmanTabPanel } from './tabs.js';
import './tabs.js';

describe('atman-tab', () => {
  it('should render with default properties', async () => {
    const el = fixture<AtmanTab>('atman-tab');
    await elementUpdated(el);

    expect(el.selected).toBe(false);
    expect(el.disabled).toBe(false);
    expect(el.value).toBe('');
  });

  it('should render with label content', async () => {
    const el = fixture<AtmanTab>('atman-tab');
    el.textContent = 'Tab 1';
    await elementUpdated(el);

    const button = el.shadowRoot?.querySelector('button');
    expect(button).toBeTruthy();
  });

  it('should apply selected styling', async () => {
    const el = fixture<AtmanTab>('atman-tab');
    el.selected = true;
    await elementUpdated(el);

    const button = el.shadowRoot?.querySelector('button');
    expect(button?.classList.contains('tab--selected')).toBe(true);
  });

  it('should be disabled when disabled property is true', async () => {
    const el = fixture<AtmanTab>('atman-tab');
    el.disabled = true;
    await elementUpdated(el);

    const button = el.shadowRoot?.querySelector('button');
    expect(button?.disabled).toBe(true);
  });

  it('should have role="tab"', async () => {
    const el = fixture<AtmanTab>('atman-tab');
    await elementUpdated(el);

    const button = el.shadowRoot?.querySelector('button');
    expect(button?.getAttribute('role')).toBe('tab');
  });

  it('should set aria-selected when selected', async () => {
    const el = fixture<AtmanTab>('atman-tab');
    el.selected = true;
    await elementUpdated(el);

    const button = el.shadowRoot?.querySelector('button');
    expect(button?.getAttribute('aria-selected')).toBe('true');
  });

  it('should have tabindex="0" when selected', async () => {
    const el = fixture<AtmanTab>('atman-tab');
    el.selected = true;
    await elementUpdated(el);

    const button = el.shadowRoot?.querySelector('button');
    expect(button?.getAttribute('tabindex')).toBe('0');
  });

  it('should have tabindex="-1" when not selected', async () => {
    const el = fixture<AtmanTab>('atman-tab');
    el.selected = false;
    await elementUpdated(el);

    const button = el.shadowRoot?.querySelector('button');
    expect(button?.getAttribute('tabindex')).toBe('-1');
  });
});

describe('atman-tab-panel', () => {
  it('should render with default properties', async () => {
    const el = fixture<AtmanTabPanel>('atman-tab-panel');
    await elementUpdated(el);

    expect(el.active).toBe(false);
    expect(el.value).toBe('');
  });

  it('should be hidden when not active', async () => {
    const el = fixture<AtmanTabPanel>('atman-tab-panel');
    el.active = false;
    await elementUpdated(el);

    expect(el.hidden).toBe(true);
  });

  it('should be visible when active', async () => {
    const el = fixture<AtmanTabPanel>('atman-tab-panel');
    el.active = true;
    await elementUpdated(el);

    expect(el.hidden).toBe(false);
  });

  it('should have role="tabpanel"', async () => {
    const el = fixture<AtmanTabPanel>('atman-tab-panel');
    await elementUpdated(el);

    const panel = el.shadowRoot?.querySelector('[role="tabpanel"]');
    expect(panel).toBeTruthy();
  });
});

describe('atman-tabs', () => {
  it('should render with default properties', async () => {
    const el = fixture<AtmanTabs>('atman-tabs');
    await elementUpdated(el);

    expect(el.value).toBe('');
  });

  it('should have role="tablist" on tab list', async () => {
    const el = fixture<AtmanTabs>('atman-tabs');
    await elementUpdated(el);

    const tabList = el.shadowRoot?.querySelector('[role="tablist"]');
    expect(tabList).toBeTruthy();
  });

  it('should dispatch atman-change event when tab is selected', async () => {
    const el = fixture<AtmanTabs>('atman-tabs');
    await elementUpdated(el);

    const changeHandler = vi.fn();
    el.addEventListener('atman-change', changeHandler);

    // Create and add a tab
    const tab = document.createElement('atman-tab') as AtmanTab;
    tab.value = 'tab1';
    tab.slot = 'tab';
    tab.textContent = 'Tab 1';
    el.appendChild(tab);
    await elementUpdated(el);
    await elementUpdated(tab);

    // Click the tab
    tab.click();

    expect(changeHandler).toHaveBeenCalled();
    expect(changeHandler.mock.calls[0][0].detail.value).toBe('tab1');
  });

  it('should not select disabled tabs on click', async () => {
    const el = fixture<AtmanTabs>('atman-tabs');
    await elementUpdated(el);

    const changeHandler = vi.fn();
    el.addEventListener('atman-change', changeHandler);

    // Create and add a disabled tab
    const tab = document.createElement('atman-tab') as AtmanTab;
    tab.value = 'disabled-tab';
    tab.slot = 'tab';
    tab.disabled = true;
    tab.textContent = 'Disabled Tab';
    el.appendChild(tab);
    await elementUpdated(el);
    await elementUpdated(tab);

    // Click the disabled tab
    tab.click();

    expect(changeHandler).not.toHaveBeenCalled();
  });
});
