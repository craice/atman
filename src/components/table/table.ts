import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

export interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  width?: string;
}

export type SortDirection = 'asc' | 'desc' | 'none';

export interface SortState {
  key: string;
  direction: SortDirection;
}

/**
 * @element atman-table
 * @description A data table component with sorting, selection, and loading states.
 *
 * @csspart table - The table element
 * @csspart thead - The table header
 * @csspart tbody - The table body
 * @csspart th - A header cell
 * @csspart td - A body cell
 * @csspart row - A body row
 * @csspart empty - The empty state container
 *
 * @fires atman-sort - Fired when a column sort is triggered
 * @fires atman-selection-change - Fired when row selection changes
 */
@customElement('atman-table')
export class AtmanTable extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .table-wrapper {
      overflow-x: auto;
      border: 1px solid var(--atman-color-border);
      border-radius: var(--atman-radius-md);
    }

    table {
      width: 100%;
      border-collapse: collapse;
      font-family: var(--atman-font-family);
      font-size: var(--atman-font-size-sm);
    }

    thead {
      background-color: var(--atman-color-neutral-100);
    }

    th {
      padding: var(--atman-space-3) var(--atman-space-4);
      text-align: left;
      font-weight: var(--atman-font-weight-medium);
      color: var(--atman-color-text-secondary);
      border-bottom: 1px solid var(--atman-color-border);
      white-space: nowrap;
    }

    th.sortable {
      cursor: pointer;
      user-select: none;
      transition: color var(--atman-duration-fast) var(--atman-easing-default);
    }

    th.sortable:hover {
      color: var(--atman-color-text);
    }

    th.sortable:focus-visible {
      outline: var(--atman-focus-ring-width) solid var(--atman-focus-ring-color);
      outline-offset: -2px;
    }

    .th-content {
      display: inline-flex;
      align-items: center;
      gap: var(--atman-space-1);
    }

    .sort-icon {
      width: 14px;
      height: 14px;
      opacity: 0.3;
      transition: opacity var(--atman-duration-fast) var(--atman-easing-default);
    }

    .sort-icon--active {
      opacity: 1;
      color: var(--atman-color-primary);
    }

    .sort-icon--desc {
      transform: rotate(180deg);
    }

    td {
      padding: var(--atman-space-3) var(--atman-space-4);
      color: var(--atman-color-text);
      border-bottom: 1px solid var(--atman-color-border);
    }

    tr:last-child td {
      border-bottom: none;
    }

    /* Striped */
    .table--striped tbody tr:nth-child(even) {
      background-color: var(--atman-color-neutral-50, rgba(0, 0, 0, 0.02));
    }

    /* Hoverable */
    .table--hoverable tbody tr {
      transition: background-color var(--atman-duration-fast) var(--atman-easing-default);
    }

    .table--hoverable tbody tr:hover {
      background-color: var(--atman-color-surface-hover);
    }

    /* Selection */
    .checkbox-cell {
      width: 40px;
      padding: var(--atman-space-2) var(--atman-space-3);
    }

    .checkbox-cell input[type="checkbox"] {
      cursor: pointer;
      width: 16px;
      height: 16px;
      accent-color: var(--atman-color-primary);
    }

    tr.row--selected {
      background-color: var(--atman-color-primary-light);
    }

    /* Empty state */
    .empty {
      padding: var(--atman-space-8) var(--atman-space-4);
      text-align: center;
      color: var(--atman-color-text-secondary);
    }

    /* Loading state */
    .loading-row td {
      padding: var(--atman-space-3) var(--atman-space-4);
    }

    /* Reduced motion */
    @media (prefers-reduced-motion: reduce) {
      th.sortable,
      .sort-icon,
      .table--hoverable tbody tr {
        transition: none;
      }
    }
  `;

  /** Column definitions */
  @property({ type: Array })
  columns: TableColumn[] = [];

  /** Row data */
  @property({ type: Array })
  data: Record<string, unknown>[] = [];

  /** Whether to show striped rows */
  @property({ type: Boolean, reflect: true })
  striped = false;

  /** Whether rows highlight on hover */
  @property({ type: Boolean, reflect: true })
  hoverable = false;

  /** Whether rows are selectable */
  @property({ type: Boolean, reflect: true })
  selectable = false;

  /** Whether the table is loading */
  @property({ type: Boolean, reflect: true })
  loading = false;

  /** Text shown when data is empty */
  @property({ type: String, attribute: 'empty-text' })
  emptyText = 'No data available';

  @state()
  private sortState: SortState = { key: '', direction: 'none' };

  @state()
  private selectedRows: Set<number> = new Set();

  private get sortedData(): Record<string, unknown>[] {
    if (this.sortState.direction === 'none' || !this.sortState.key) {
      return this.data;
    }

    const { key, direction } = this.sortState;
    return [...this.data].sort((a, b) => {
      const aVal = a[key];
      const bVal = b[key];

      if (aVal == null && bVal == null) return 0;
      if (aVal == null) return 1;
      if (bVal == null) return -1;

      let comparison = 0;
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        comparison = aVal - bVal;
      } else {
        comparison = String(aVal).localeCompare(String(bVal));
      }

      return direction === 'desc' ? -comparison : comparison;
    });
  }

  private get isAllSelected(): boolean {
    return this.data.length > 0 && this.selectedRows.size === this.data.length;
  }

  private get isIndeterminate(): boolean {
    return this.selectedRows.size > 0 && this.selectedRows.size < this.data.length;
  }

  private handleSort(column: TableColumn) {
    if (!column.sortable) return;

    let direction: SortDirection;
    if (this.sortState.key === column.key) {
      // Cycle: asc -> desc -> none
      direction = this.sortState.direction === 'asc' ? 'desc' : this.sortState.direction === 'desc' ? 'none' : 'asc';
    } else {
      direction = 'asc';
    }

    this.sortState = { key: column.key, direction };

    this.dispatchEvent(
      new CustomEvent('atman-sort', {
        bubbles: true,
        composed: true,
        detail: { key: column.key, direction },
      })
    );
  }

  private handleSelectAll(e: Event) {
    const target = e.target as HTMLInputElement;
    if (target.checked) {
      this.selectedRows = new Set(this.data.map((_, i) => i));
    } else {
      this.selectedRows = new Set();
    }
    this.fireSelectionChange();
  }

  private handleSelectRow(index: number, e: Event) {
    const target = e.target as HTMLInputElement;
    const newSelection = new Set(this.selectedRows);
    if (target.checked) {
      newSelection.add(index);
    } else {
      newSelection.delete(index);
    }
    this.selectedRows = newSelection;
    this.fireSelectionChange();
  }

  private fireSelectionChange() {
    const selectedData = [...this.selectedRows].map((i) => this.data[i]);
    this.dispatchEvent(
      new CustomEvent('atman-selection-change', {
        bubbles: true,
        composed: true,
        detail: { selectedRows: [...this.selectedRows], selectedData },
      })
    );
  }

  private renderSortIcon(column: TableColumn) {
    if (!column.sortable) return nothing;

    const isActive = this.sortState.key === column.key && this.sortState.direction !== 'none';
    const isDesc = this.sortState.key === column.key && this.sortState.direction === 'desc';

    return html`
      <svg
        class="sort-icon ${isActive ? 'sort-icon--active' : ''} ${isDesc ? 'sort-icon--desc' : ''}"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="m6 9 6-6 6 6"/>
        <path d="m6 15 6 6 6-6" opacity="0.3"/>
      </svg>
    `;
  }

  private renderLoadingRows() {
    const rowCount = 5;
    return Array.from({ length: rowCount }, () => html`
      <tr class="loading-row">
        ${this.selectable ? html`<td class="checkbox-cell"><atman-skeleton width="16px" height="16px" variant="rectangular"></atman-skeleton></td>` : nothing}
        ${this.columns.map(() => html`
          <td><atman-skeleton variant="text" width="${60 + Math.random() * 40}%"></atman-skeleton></td>
        `)}
      </tr>
    `);
  }

  render() {
    const tableClasses = {
      'table--striped': this.striped,
      'table--hoverable': this.hoverable,
    };

    const displayData = this.sortedData;
    const isEmpty = !this.loading && displayData.length === 0;

    return html`
      <div class="table-wrapper">
        <table part="table" class=${classMap(tableClasses)}>
          <thead part="thead">
            <tr>
              ${this.selectable
                ? html`
                    <th class="checkbox-cell">
                      <input
                        type="checkbox"
                        .checked=${this.isAllSelected}
                        .indeterminate=${this.isIndeterminate}
                        aria-label="Select all rows"
                        @change=${this.handleSelectAll}
                      />
                    </th>
                  `
                : nothing}
              ${this.columns.map(
                (col) => html`
                  <th
                    part="th"
                    class=${col.sortable ? 'sortable' : ''}
                    style=${col.width ? `width: ${col.width}` : ''}
                    tabindex=${col.sortable ? '0' : nothing}
                    aria-sort=${this.sortState.key === col.key && this.sortState.direction !== 'none'
                      ? this.sortState.direction === 'asc' ? 'ascending' : 'descending'
                      : nothing}
                    @click=${() => this.handleSort(col)}
                    @keydown=${(e: KeyboardEvent) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        this.handleSort(col);
                      }
                    }}
                  >
                    <span class="th-content">
                      ${col.label}
                      ${this.renderSortIcon(col)}
                    </span>
                  </th>
                `
              )}
            </tr>
          </thead>
          <tbody part="tbody">
            ${this.loading
              ? this.renderLoadingRows()
              : isEmpty
                ? html`
                    <tr>
                      <td colspan=${this.columns.length + (this.selectable ? 1 : 0)}>
                        <div part="empty" class="empty">${this.emptyText}</div>
                      </td>
                    </tr>
                  `
                : displayData.map(
                    (row, index) => html`
                      <tr
                        part="row"
                        class=${classMap({ 'row--selected': this.selectedRows.has(index) })}
                      >
                        ${this.selectable
                          ? html`
                              <td class="checkbox-cell">
                                <input
                                  type="checkbox"
                                  .checked=${this.selectedRows.has(index)}
                                  aria-label="Select row ${index + 1}"
                                  @change=${(e: Event) => this.handleSelectRow(index, e)}
                                />
                              </td>
                            `
                          : nothing}
                        ${this.columns.map(
                          (col) => html`<td part="td">${row[col.key] ?? ''}</td>`
                        )}
                      </tr>
                    `
                  )}
          </tbody>
        </table>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'atman-table': AtmanTable;
  }
}
