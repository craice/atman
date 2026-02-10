import { describe, it, expect, vi } from 'vitest';
import { elementUpdated, fixture } from '../../test/setup.js';
import type { AtmanPagination } from './pagination.js';
import './pagination.js';

describe('atman-pagination', () => {
  it('should render with default properties', async () => {
    const el = fixture<AtmanPagination>('atman-pagination');
    await elementUpdated(el);

    expect(el.totalPages).toBe(1);
    expect(el.currentPage).toBe(1);
    expect(el.siblingCount).toBe(1);
    expect(el.size).toBe('md');
  });

  it('should render correct number of page buttons', async () => {
    const el = fixture<AtmanPagination>('atman-pagination');
    el.totalPages = 5;
    await elementUpdated(el);

    const pageButtons = el.shadowRoot?.querySelectorAll('.button:not(.button--nav)');
    expect(pageButtons?.length).toBe(5);
  });

  it('should highlight current page', async () => {
    const el = fixture<AtmanPagination>('atman-pagination');
    el.totalPages = 5;
    el.currentPage = 3;
    await elementUpdated(el);

    const activeButton = el.shadowRoot?.querySelector('.button--active');
    expect(activeButton?.textContent?.trim()).toBe('3');
    expect(activeButton?.getAttribute('aria-current')).toBe('page');
  });

  it('should dispatch atman-change on page click', async () => {
    const el = fixture<AtmanPagination>('atman-pagination');
    el.totalPages = 5;
    el.currentPage = 1;
    await elementUpdated(el);

    const handler = vi.fn();
    el.addEventListener('atman-change', handler);

    const pageButtons = el.shadowRoot?.querySelectorAll('.button:not(.button--nav)');
    (pageButtons?.[2] as HTMLButtonElement)?.click(); // Click page 3

    expect(handler).toHaveBeenCalled();
    expect(handler.mock.calls[0][0].detail.page).toBe(3);
  });

  it('should disable prev button on first page', async () => {
    const el = fixture<AtmanPagination>('atman-pagination');
    el.totalPages = 5;
    el.currentPage = 1;
    await elementUpdated(el);

    const prevButton = el.shadowRoot?.querySelector('[aria-label="Previous page"]') as HTMLButtonElement;
    expect(prevButton?.disabled).toBe(true);
  });

  it('should disable next button on last page', async () => {
    const el = fixture<AtmanPagination>('atman-pagination');
    el.totalPages = 5;
    el.currentPage = 5;
    await elementUpdated(el);

    const nextButton = el.shadowRoot?.querySelector('[aria-label="Next page"]') as HTMLButtonElement;
    expect(nextButton?.disabled).toBe(true);
  });

  it('should navigate to previous page', async () => {
    const el = fixture<AtmanPagination>('atman-pagination');
    el.totalPages = 5;
    el.currentPage = 3;
    await elementUpdated(el);

    const handler = vi.fn();
    el.addEventListener('atman-change', handler);

    const prevButton = el.shadowRoot?.querySelector('[aria-label="Previous page"]') as HTMLButtonElement;
    prevButton?.click();

    expect(handler.mock.calls[0][0].detail.page).toBe(2);
  });

  it('should navigate to next page', async () => {
    const el = fixture<AtmanPagination>('atman-pagination');
    el.totalPages = 5;
    el.currentPage = 3;
    await elementUpdated(el);

    const handler = vi.fn();
    el.addEventListener('atman-change', handler);

    const nextButton = el.shadowRoot?.querySelector('[aria-label="Next page"]') as HTMLButtonElement;
    nextButton?.click();

    expect(handler.mock.calls[0][0].detail.page).toBe(4);
  });

  it('should show ellipsis for many pages', async () => {
    const el = fixture<AtmanPagination>('atman-pagination');
    el.totalPages = 20;
    el.currentPage = 10;
    await elementUpdated(el);

    const ellipses = el.shadowRoot?.querySelectorAll('.ellipsis');
    expect(ellipses?.length).toBeGreaterThan(0);
  });

  it('should have aria-label="Pagination"', async () => {
    const el = fixture<AtmanPagination>('atman-pagination');
    await elementUpdated(el);

    const nav = el.shadowRoot?.querySelector('nav');
    expect(nav?.getAttribute('aria-label')).toBe('Pagination');
  });
});
