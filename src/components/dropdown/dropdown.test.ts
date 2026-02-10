import { describe, it, expect, vi } from 'vitest';
import { elementUpdated, fixture } from '../../test/setup.js';
import type { AtmanDropdown, AtmanMenuItem } from './dropdown.js';
import './dropdown.js';

function createDropdown(): AtmanDropdown {
  const el = fixture<AtmanDropdown>('atman-dropdown');

  const trigger = document.createElement('button');
  trigger.slot = 'trigger';
  trigger.textContent = 'Menu';
  el.appendChild(trigger);

  const items = ['Edit', 'Duplicate', 'Delete'];
  items.forEach((label) => {
    const item = document.createElement('atman-menu-item') as AtmanMenuItem;
    item.textContent = label;
    item.value = label.toLowerCase();
    el.appendChild(item);
  });

  return el;
}

describe('atman-dropdown', () => {
  it('should render with menu closed', async () => {
    const el = createDropdown();
    await elementUpdated(el);

    const menu = el.shadowRoot?.querySelector('.menu');
    expect(menu?.classList.contains('menu--open')).toBe(false);
  });

  it('should toggle open state via keyboard on trigger', async () => {
    const el = createDropdown();
    await elementUpdated(el);

    // Use keyboard to open (Enter key on trigger)
    const triggerWrapper = el.shadowRoot?.querySelector('.trigger') as HTMLElement;
    triggerWrapper?.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, composed: true }));
    await elementUpdated(el);

    const menu = el.shadowRoot?.querySelector('.menu');
    expect(menu?.classList.contains('menu--open')).toBe(true);
  });

  it('should close on outside click', async () => {
    const el = createDropdown();
    await elementUpdated(el);

    // Open via keyboard
    const triggerWrapper = el.shadowRoot?.querySelector('.trigger') as HTMLElement;
    triggerWrapper?.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, composed: true }));
    await elementUpdated(el);

    // Click outside
    document.body.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await elementUpdated(el);

    const menu = el.shadowRoot?.querySelector('.menu');
    expect(menu?.classList.contains('menu--open')).toBe(false);
  });

  it('should dispatch atman-select event', async () => {
    const el = createDropdown();
    await elementUpdated(el);

    const handler = vi.fn();
    el.addEventListener('atman-select', handler);

    // Open via keyboard
    const triggerWrapper = el.shadowRoot?.querySelector('.trigger') as HTMLElement;
    triggerWrapper?.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, composed: true }));
    await elementUpdated(el);

    // The Enter key on trigger already focuses the first item via requestAnimationFrame
    await new Promise((resolve) => requestAnimationFrame(resolve));
    await elementUpdated(el);

    // Now press Enter on the menu to select the focused item
    const menuEl = el.shadowRoot?.querySelector('.menu') as HTMLElement;
    menuEl?.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, composed: true }));

    expect(handler).toHaveBeenCalled();
    expect(handler.mock.calls[0][0].detail.value).toBe('edit');
  });

  it('should have role="menu" on menu', async () => {
    const el = createDropdown();
    await elementUpdated(el);

    const menu = el.shadowRoot?.querySelector('[role="menu"]');
    expect(menu).toBeTruthy();
  });
});

describe('atman-menu-item', () => {
  it('should render with default properties', async () => {
    const el = fixture<AtmanMenuItem>('atman-menu-item');
    el.textContent = 'Item';
    await elementUpdated(el);

    expect(el.disabled).toBe(false);
    expect(el.type).toBe('default');
  });

  it('should render as divider', async () => {
    const el = fixture<AtmanMenuItem>('atman-menu-item');
    el.type = 'divider';
    await elementUpdated(el);

    const divider = el.shadowRoot?.querySelector('.divider');
    expect(divider).toBeTruthy();
    expect(divider?.getAttribute('role')).toBe('separator');
  });

  it('should have role="menuitem"', async () => {
    const el = fixture<AtmanMenuItem>('atman-menu-item');
    el.textContent = 'Item';
    await elementUpdated(el);

    const item = el.shadowRoot?.querySelector('[role="menuitem"]');
    expect(item).toBeTruthy();
  });

  it('should apply disabled state', async () => {
    const el = fixture<AtmanMenuItem>('atman-menu-item');
    el.disabled = true;
    el.textContent = 'Disabled item';
    await elementUpdated(el);

    const item = el.shadowRoot?.querySelector('.item');
    expect(item?.classList.contains('item--disabled')).toBe(true);
    expect(item?.getAttribute('aria-disabled')).toBe('true');
  });

  it('should apply focused state', async () => {
    const el = fixture<AtmanMenuItem>('atman-menu-item');
    el.focused = true;
    el.textContent = 'Focused item';
    await elementUpdated(el);

    const item = el.shadowRoot?.querySelector('.item');
    expect(item?.classList.contains('item--focused')).toBe(true);
  });
});
