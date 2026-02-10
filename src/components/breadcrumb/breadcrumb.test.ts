import { describe, it, expect } from 'vitest';
import { elementUpdated, fixture } from '../../test/setup.js';
import type { AtmanBreadcrumb, AtmanBreadcrumbItem } from './breadcrumb.js';
import './breadcrumb.js';

describe('atman-breadcrumb', () => {
  it('should render with nav element', async () => {
    const el = fixture<AtmanBreadcrumb>('atman-breadcrumb');
    await elementUpdated(el);

    const nav = el.shadowRoot?.querySelector('nav');
    expect(nav).toBeTruthy();
    expect(nav?.getAttribute('aria-label')).toBe('Breadcrumb');
  });

  it('should render breadcrumb items', async () => {
    const el = fixture<AtmanBreadcrumb>('atman-breadcrumb');
    const item1 = document.createElement('atman-breadcrumb-item') as AtmanBreadcrumbItem;
    item1.href = '/home';
    item1.textContent = 'Home';
    const item2 = document.createElement('atman-breadcrumb-item') as AtmanBreadcrumbItem;
    item2.textContent = 'Current';
    item2.current = true;
    el.appendChild(item1);
    el.appendChild(item2);
    await elementUpdated(el);

    expect(el.querySelectorAll('atman-breadcrumb-item').length).toBe(2);
  });
});

describe('atman-breadcrumb-item', () => {
  it('should render as link when href is provided', async () => {
    const el = fixture<AtmanBreadcrumbItem>('atman-breadcrumb-item');
    el.href = '/home';
    el.textContent = 'Home';
    await elementUpdated(el);

    const link = el.shadowRoot?.querySelector('a');
    expect(link).toBeTruthy();
    expect(link?.getAttribute('href')).toBe('/home');
  });

  it('should render as text when no href', async () => {
    const el = fixture<AtmanBreadcrumbItem>('atman-breadcrumb-item');
    el.textContent = 'Current';
    await elementUpdated(el);

    const text = el.shadowRoot?.querySelector('.text');
    expect(text).toBeTruthy();
    const link = el.shadowRoot?.querySelector('a');
    expect(link).toBeNull();
  });

  it('should set aria-current="page" when current', async () => {
    const el = fixture<AtmanBreadcrumbItem>('atman-breadcrumb-item');
    el.current = true;
    el.textContent = 'Current Page';
    await elementUpdated(el);

    const text = el.shadowRoot?.querySelector('.text');
    expect(text?.getAttribute('aria-current')).toBe('page');
  });

  it('should render separator', async () => {
    const el = fixture<AtmanBreadcrumbItem>('atman-breadcrumb-item');
    el.textContent = 'Home';
    await elementUpdated(el);

    const separator = el.shadowRoot?.querySelector('.separator');
    expect(separator).toBeTruthy();
    expect(separator?.getAttribute('aria-hidden')).toBe('true');
  });

  it('should render as text when current even with href', async () => {
    const el = fixture<AtmanBreadcrumbItem>('atman-breadcrumb-item');
    el.href = '/current';
    el.current = true;
    el.textContent = 'Current';
    await elementUpdated(el);

    const link = el.shadowRoot?.querySelector('a');
    expect(link).toBeNull();
    const text = el.shadowRoot?.querySelector('.text');
    expect(text).toBeTruthy();
  });
});
