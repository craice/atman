import { describe, it, expect, vi } from 'vitest';
import { elementUpdated, fixture } from '../../test/setup.js';
import type { AtmanTable } from './table.js';
import './table.js';

const sampleColumns = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'email', label: 'Email' },
  { key: 'role', label: 'Role', sortable: true },
];

const sampleData = [
  { name: 'Alice', email: 'alice@example.com', role: 'Admin' },
  { name: 'Bob', email: 'bob@example.com', role: 'User' },
  { name: 'Charlie', email: 'charlie@example.com', role: 'Editor' },
];

describe('atman-table', () => {
  it('should render with default properties', async () => {
    const el = fixture<AtmanTable>('atman-table');
    await elementUpdated(el);

    expect(el.striped).toBe(false);
    expect(el.hoverable).toBe(false);
    expect(el.selectable).toBe(false);
    expect(el.loading).toBe(false);
  });

  it('should render columns and data', async () => {
    const el = fixture<AtmanTable>('atman-table');
    el.columns = sampleColumns;
    el.data = sampleData;
    await elementUpdated(el);

    const headers = el.shadowRoot?.querySelectorAll('th');
    expect(headers?.length).toBe(3);
    expect(headers?.[0].textContent?.trim()).toContain('Name');

    const rows = el.shadowRoot?.querySelectorAll('tbody tr');
    expect(rows?.length).toBe(3);
  });

  it('should show empty state when no data', async () => {
    const el = fixture<AtmanTable>('atman-table');
    el.columns = sampleColumns;
    el.data = [];
    await elementUpdated(el);

    const empty = el.shadowRoot?.querySelector('.empty');
    expect(empty?.textContent?.trim()).toBe('No data available');
  });

  it('should show custom empty text', async () => {
    const el = fixture<AtmanTable>('atman-table');
    el.columns = sampleColumns;
    el.data = [];
    el.emptyText = 'Nothing here';
    await elementUpdated(el);

    const empty = el.shadowRoot?.querySelector('.empty');
    expect(empty?.textContent?.trim()).toBe('Nothing here');
  });

  it('should dispatch atman-sort on sortable header click', async () => {
    const el = fixture<AtmanTable>('atman-table');
    el.columns = sampleColumns;
    el.data = sampleData;
    await elementUpdated(el);

    const handler = vi.fn();
    el.addEventListener('atman-sort', handler);

    const sortableHeader = el.shadowRoot?.querySelector('th.sortable') as HTMLElement;
    sortableHeader?.click();

    expect(handler).toHaveBeenCalled();
    expect(handler.mock.calls[0][0].detail.key).toBe('name');
    expect(handler.mock.calls[0][0].detail.direction).toBe('asc');
  });

  it('should cycle sort direction: asc -> desc -> none', async () => {
    const el = fixture<AtmanTable>('atman-table');
    el.columns = sampleColumns;
    el.data = sampleData;
    await elementUpdated(el);

    const handler = vi.fn();
    el.addEventListener('atman-sort', handler);

    const sortableHeader = el.shadowRoot?.querySelector('th.sortable') as HTMLElement;

    sortableHeader?.click(); // asc
    expect(handler.mock.calls[0][0].detail.direction).toBe('asc');

    sortableHeader?.click(); // desc
    expect(handler.mock.calls[1][0].detail.direction).toBe('desc');

    sortableHeader?.click(); // none
    expect(handler.mock.calls[2][0].detail.direction).toBe('none');
  });

  it('should render checkbox column when selectable', async () => {
    const el = fixture<AtmanTable>('atman-table');
    el.columns = sampleColumns;
    el.data = sampleData;
    el.selectable = true;
    await elementUpdated(el);

    const checkboxes = el.shadowRoot?.querySelectorAll('input[type="checkbox"]');
    // 1 select-all + 3 row checkboxes
    expect(checkboxes?.length).toBe(4);
  });

  it('should dispatch atman-selection-change on row select', async () => {
    const el = fixture<AtmanTable>('atman-table');
    el.columns = sampleColumns;
    el.data = sampleData;
    el.selectable = true;
    await elementUpdated(el);

    const handler = vi.fn();
    el.addEventListener('atman-selection-change', handler);

    const rowCheckboxes = el.shadowRoot?.querySelectorAll('tbody input[type="checkbox"]');
    (rowCheckboxes?.[0] as HTMLInputElement).checked = true;
    rowCheckboxes?.[0].dispatchEvent(new Event('change', { bubbles: true }));

    expect(handler).toHaveBeenCalled();
    expect(handler.mock.calls[0][0].detail.selectedRows).toContain(0);
  });

  it('should apply striped class', async () => {
    const el = fixture<AtmanTable>('atman-table');
    el.columns = sampleColumns;
    el.data = sampleData;
    el.striped = true;
    await elementUpdated(el);

    const table = el.shadowRoot?.querySelector('table');
    expect(table?.classList.contains('table--striped')).toBe(true);
  });

  it('should apply hoverable class', async () => {
    const el = fixture<AtmanTable>('atman-table');
    el.columns = sampleColumns;
    el.data = sampleData;
    el.hoverable = true;
    await elementUpdated(el);

    const table = el.shadowRoot?.querySelector('table');
    expect(table?.classList.contains('table--hoverable')).toBe(true);
  });

  it('should render loading rows when loading', async () => {
    const el = fixture<AtmanTable>('atman-table');
    el.columns = sampleColumns;
    el.loading = true;
    await elementUpdated(el);

    const loadingRows = el.shadowRoot?.querySelectorAll('.loading-row');
    expect(loadingRows?.length).toBeGreaterThan(0);
  });

  it('should set aria-sort on sorted column', async () => {
    const el = fixture<AtmanTable>('atman-table');
    el.columns = sampleColumns;
    el.data = sampleData;
    await elementUpdated(el);

    const sortableHeader = el.shadowRoot?.querySelector('th.sortable') as HTMLElement;
    sortableHeader?.click();
    await elementUpdated(el);

    expect(sortableHeader?.getAttribute('aria-sort')).toBe('ascending');
  });
});
