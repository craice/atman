import { describe, it, expect, vi } from 'vitest';
import { elementUpdated, fixture } from '../../test/setup.js';
import type { AtmanAccordion, AtmanAccordionItem } from './accordion.js';
import './accordion.js';

function createAccordion(multiple = false): AtmanAccordion {
  const el = fixture<AtmanAccordion>('atman-accordion');
  if (multiple) el.multiple = true;

  for (let i = 0; i < 3; i++) {
    const item = document.createElement('atman-accordion-item') as AtmanAccordionItem;
    const header = document.createElement('span');
    header.slot = 'header';
    header.textContent = `Item ${i + 1}`;
    item.appendChild(header);
    item.appendChild(document.createTextNode(`Content ${i + 1}`));
    el.appendChild(item);
  }

  return el;
}

describe('atman-accordion', () => {
  it('should render with default properties', async () => {
    const el = fixture<AtmanAccordion>('atman-accordion');
    await elementUpdated(el);

    expect(el.multiple).toBe(false);
  });

  it('should render accordion items', async () => {
    const el = createAccordion();
    await elementUpdated(el);

    expect(el.querySelectorAll('atman-accordion-item').length).toBe(3);
  });
});

describe('atman-accordion-item', () => {
  it('should render with default properties', async () => {
    const el = fixture<AtmanAccordionItem>('atman-accordion-item');
    await elementUpdated(el);

    expect(el.expanded).toBe(false);
    expect(el.disabled).toBe(false);
  });

  it('should toggle expanded state on click', async () => {
    const el = fixture<AtmanAccordionItem>('atman-accordion-item');
    await elementUpdated(el);

    const button = el.shadowRoot?.querySelector('button');
    button?.click();
    await elementUpdated(el);

    expect(el.expanded).toBe(true);
  });

  it('should dispatch atman-toggle event', async () => {
    const el = fixture<AtmanAccordionItem>('atman-accordion-item');
    await elementUpdated(el);

    const handler = vi.fn();
    el.addEventListener('atman-toggle', handler);

    const button = el.shadowRoot?.querySelector('button');
    button?.click();

    expect(handler).toHaveBeenCalled();
    expect(handler.mock.calls[0][0].detail.expanded).toBe(true);
  });

  it('should not toggle when disabled', async () => {
    const el = fixture<AtmanAccordionItem>('atman-accordion-item');
    el.disabled = true;
    await elementUpdated(el);

    const button = el.shadowRoot?.querySelector('button');
    button?.click();
    await elementUpdated(el);

    expect(el.expanded).toBe(false);
  });

  it('should set aria-expanded', async () => {
    const el = fixture<AtmanAccordionItem>('atman-accordion-item');
    el.expanded = true;
    await elementUpdated(el);

    const button = el.shadowRoot?.querySelector('button');
    expect(button?.getAttribute('aria-expanded')).toBe('true');
  });

  it('should set aria-controls', async () => {
    const el = fixture<AtmanAccordionItem>('atman-accordion-item');
    await elementUpdated(el);

    const button = el.shadowRoot?.querySelector('button');
    const contentId = button?.getAttribute('aria-controls');
    expect(contentId).toBeTruthy();

    const content = el.shadowRoot?.querySelector(`#${contentId}`);
    expect(content).toBeTruthy();
    expect(content?.getAttribute('role')).toBe('region');
  });

  it('should rotate chevron when expanded', async () => {
    const el = fixture<AtmanAccordionItem>('atman-accordion-item');
    el.expanded = true;
    await elementUpdated(el);

    const icon = el.shadowRoot?.querySelector('.icon');
    expect(icon?.classList.contains('icon--expanded')).toBe(true);
  });

  it('should toggle on Enter key', async () => {
    const el = fixture<AtmanAccordionItem>('atman-accordion-item');
    await elementUpdated(el);

    const button = el.shadowRoot?.querySelector('button');
    button?.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    await elementUpdated(el);

    expect(el.expanded).toBe(true);
  });

  it('should toggle on Space key', async () => {
    const el = fixture<AtmanAccordionItem>('atman-accordion-item');
    await elementUpdated(el);

    const button = el.shadowRoot?.querySelector('button');
    button?.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));
    await elementUpdated(el);

    expect(el.expanded).toBe(true);
  });
});
