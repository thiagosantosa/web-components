import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  width?: string;
  align?: 'left' | 'center' | 'right';
  format?: (value: any, row: any) => string;
  template?: 'text' | 'badge' | 'avatar' | 'link' | 'date' | 'currency';
}

export interface TableAction {
  label: string;
  icon?: string;
  color?: 'primary' | 'danger' | 'success' | 'warning';
  onClick: (row: any) => void;
  show?: (row: any) => boolean;
}

@Component({
  selector: 'web-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="table-container" [class.striped]="striped" [class.hoverable]="hoverable">
      <!-- Search -->
      <div class="table-header" *ngIf="searchable || title">
        <div class="table-title" *ngIf="title">
          <h3>{{ title }}</h3>
          <span *ngIf="subtitle" class="table-subtitle">{{ subtitle }}</span>
        </div>
        <div class="table-search" *ngIf="searchable">
          <span class="material-symbols-outlined search-icon">search</span>
          <input 
            type="text" 
            placeholder="{{ searchPlaceholder }}"
            [(ngModel)]="searchTerm"
            (input)="onSearch()">
        </div>
      </div>

      <!-- Table Wrapper -->
      <div class="table-wrapper" [class.loading]="loading">
        <table class="web-table" [class.bordered]="bordered">
          <!-- Header -->
          <thead>
            <tr>
              <!-- Select All Checkbox -->
              <th *ngIf="selectable" class="select-cell">
                <input 
                  type="checkbox"
                  [checked]="isAllSelected()"
                  [indeterminate]="isSomeSelected()"
                  (change)="toggleSelectAll()">
              </th>

              <!-- Columns -->
              <th 
                *ngFor="let column of columns"
                [style.width]="column.width"
                [style.text-align]="column.align || 'left'"
                [class.sortable]="column.sortable"
                (click)="column.sortable ? sort(column.key) : null">
                <div class="th-content">
                  <span>{{ column.label }}</span>
                  <span *ngIf="column.sortable" class="sort-icon">
                    <span class="material-symbols-outlined" *ngIf="sortColumn !== column.key">unfold_more</span>
                    <span class="material-symbols-outlined" *ngIf="sortColumn === column.key && sortDirection === 'asc'">arrow_upward</span>
                    <span class="material-symbols-outlined" *ngIf="sortColumn === column.key && sortDirection === 'desc'">arrow_downward</span>
                  </span>
                </div>
              </th>

              <!-- Actions Column -->
              <th *ngIf="actions && actions.length > 0" class="actions-cell">
                Ações
              </th>
            </tr>
          </thead>

          <!-- Body -->
          <tbody *ngIf="!loading && processedData.length > 0">
            <tr 
              *ngFor="let row of paginatedData; let i = index"
              [class.selected]="isRowSelected(row)"
              (click)="onRowClick(row)">
              
              <!-- Select Checkbox -->
              <td *ngIf="selectable" class="select-cell">
                <input 
                  type="checkbox"
                  [checked]="isRowSelected(row)"
                  (change)="toggleRowSelection(row)"
                  (click)="$event.stopPropagation()">
              </td>

              <!-- Data Cells -->
              <td 
                *ngFor="let column of columns"
                [style.text-align]="column.align || 'left'">
                <ng-container [ngSwitch]="column.template || 'text'">
                  <!-- Text -->
                  <ng-container *ngSwitchCase="'text'">
                    {{ column.format ? column.format(row[column.key], row) : row[column.key] }}
                  </ng-container>

                  <!-- Badge -->
                  <span *ngSwitchCase="'badge'" [class]="'badge badge-' + getBadgeColor(row[column.key])">
                    {{ row[column.key] }}
                  </span>

                  <!-- Avatar -->
                  <div *ngSwitchCase="'avatar'" class="avatar">
                    <img [src]="row[column.key]" [alt]="row['name'] || 'Avatar'">
                    <span>{{ row['name'] || '' }}</span>
                  </div>

                  <!-- Link -->
                  <a *ngSwitchCase="'link'" [href]="row[column.key]" class="table-link" (click)="$event.stopPropagation()">
                    {{ column.format ? column.format(row[column.key], row) : row[column.key] }}
                  </a>

                  <!-- Date -->
                  <span *ngSwitchCase="'date'">
                    {{ formatDate(row[column.key]) }}
                  </span>

                  <!-- Currency -->
                  <span *ngSwitchCase="'currency'">
                    {{ formatCurrency(row[column.key]) }}
                  </span>
                </ng-container>
              </td>

              <!-- Actions -->
              <td *ngIf="actions && actions.length > 0" class="actions-cell">
                <div class="actions-buttons">
                  <button 
                    *ngFor="let action of actions"
                    [hidden]="action.show && !action.show(row)"
                    class="action-btn"
                    [class]="'action-btn-' + (action.color || 'primary')"
                    (click)="action.onClick(row); $event.stopPropagation()"
                    [title]="action.label">
                    <span *ngIf="action.icon" class="material-symbols-outlined">{{ action.icon }}</span>
                    <span *ngIf="!action.icon">{{ action.label }}</span>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>

          <!-- Empty State -->
          <tbody *ngIf="!loading && processedData.length === 0">
            <tr>
              <td [attr.colspan]="getTotalColumns()" class="empty-state">
                <span class="material-symbols-outlined empty-icon">inbox</span>
                <p>{{ emptyText }}</p>
              </td>
            </tr>
          </tbody>

          <!-- Loading State -->
          <tbody *ngIf="loading">
            <tr>
              <td [attr.colspan]="getTotalColumns()" class="loading-state">
                <div class="spinner"></div>
                <p>{{ loadingText }}</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Footer with Pagination -->
      <div class="table-footer" *ngIf="pageable && processedData.length > 0">
        <div class="table-info">
          Mostrando {{ getStartIndex() }} até {{ getEndIndex() }} de {{ processedData.length }} registros
          <span *ngIf="selectedRows.length > 0" class="selected-info">
            ({{ selectedRows.length }} selecionado{{ selectedRows.length > 1 ? 's' : '' }})
          </span>
        </div>

        <div class="pagination">
          <button 
            class="page-btn"
            [disabled]="currentPage === 1"
            (click)="goToPage(1)">
            <span class="material-symbols-outlined">first_page</span>
          </button>
          <button 
            class="page-btn"
            [disabled]="currentPage === 1"
            (click)="goToPage(currentPage - 1)">
            <span class="material-symbols-outlined">chevron_left</span>
          </button>

          <div class="page-numbers">
            <button 
              *ngFor="let page of getPageNumbers()"
              class="page-btn"
              [class.active]="page === currentPage"
              (click)="goToPage(page)">
              {{ page }}
            </button>
          </div>

          <button 
            class="page-btn"
            [disabled]="currentPage === totalPages"
            (click)="goToPage(currentPage + 1)">
            <span class="material-symbols-outlined">chevron_right</span>
          </button>
          <button 
            class="page-btn"
            [disabled]="currentPage === totalPages"
            (click)="goToPage(totalPages)">
            <span class="material-symbols-outlined">last_page</span>
          </button>

          <select 
            class="page-size-select"
            [(ngModel)]="pageSize"
            (change)="onPageSizeChange()">
            <option *ngFor="let size of pageSizeOptions" [value]="size">
              {{ size }} / página
            </option>
          </select>
        </div>
      </div>
    </div>
  `,
  styles: [`
   @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200');

    /* Container */
    .table-container {
      width: 100%;
      background: white;
      border-radius: 0.5rem;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      overflow: hidden;
      font-family: "Montserrat", sans-serif;
    }

    /* Header */
    .table-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1.5rem;
      border-bottom: 1px solid #e5e7eb;
      gap: 1rem;
      flex-wrap: wrap;
    }

    .table-title h3 {
      margin: 0;
      font-size: 1.25rem;
      font-weight: 600;
      color: #383C3F;
    }

    .table-subtitle {
      color: #6c757d;
      font-size: 0.875rem;
      margin-top: 0.25rem;
      display: block;
    }

    .table-search {
      position: relative;
      max-width: 300px;
      flex: 1;
    }

    .search-icon {
      position: absolute;
      left: 0.75rem;
      top: 50%;
      transform: translateY(-50%);
      color: #6c757d;
      font-size: 1.25rem;
    }

    .table-search input {
      width: 100%;
      padding: 0.625rem 0.75rem 0.625rem 2.5rem;
      border: 1px solid #ccc;
      border-radius: 0.375rem;
      font-family: "Montserrat", sans-serif;
      font-size: 14px;
      transition: all 0.2s;
    }

    .table-search input:focus {
      outline: none;
      border-color: #009ADA;
      box-shadow: 0 0 0 3px rgba(0, 154, 218, 0.1);
    }

    /* Table Wrapper */
    .table-wrapper {
      overflow-x: auto;
      position: relative;
    }

    .table-wrapper.loading {
      min-height: 300px;
    }

    /* Table */
    .web-table {
      width: 100%;
      border-collapse: collapse;
      background: white;
    }

    .web-table.bordered {
      border: 1px solid #ccc;
    }

    /* Table Head */
    thead {
      background-color: rgba(184, 190, 193, 0.2);
    }

    th {
      word-wrap: break-word;
      white-space: normal;
      padding: 10px;
      font-family: "Montserrat", sans-serif;
      font-size: 14px;
      font-weight: 500;
      color: #383C3F;
      text-align: left;
      background-color: rgba(184, 190, 193, 0.2);
      border-bottom: solid 1px #ccc;
    }

    th.sortable {
      cursor: pointer;
      user-select: none;
      transition: background-color 0.2s;
    }

    th.sortable:hover {
      background-color: rgba(184, 190, 193, 0.3);
    }

    .th-content {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      justify-content: space-between;
    }

    .sort-icon {
      display: flex;
      align-items: center;
      color: #6c757d;
      font-size: 1.125rem;
    }

    th.sortable:hover .sort-icon {
      color: #383C3F;
    }

    /* Table Body */
    tbody tr {
      transition: background-color 0.15s;
    }

    .hoverable tbody tr:hover {
      background-color: rgba(0, 154, 218, 0.05);
      cursor: pointer;
    }

    .striped tbody tr:nth-child(even) {
      background-color: rgba(0, 0, 0, 0.02);
    }

    tbody tr.selected {
      background-color: rgba(0, 154, 218, 0.1) !important;
    }

    td {
      padding: 10px;
      font-family: "Montserrat", sans-serif;
      font-size: 14px;
      font-weight: 500;
      color: #383C3F;
      text-align: left;
      word-wrap: break-word;
      white-space: normal;
      background-color: #fff;
      border-bottom: solid 1px #ccc;
    }

    /* Select Cell */
    .select-cell {
      width: 40px;
      text-align: center !important;
    }

    .select-cell input[type="checkbox"] {
      cursor: pointer;
      width: 1.125rem;
      height: 1.125rem;
    }

    /* Actions Cell */
    .actions-cell {
      width: auto;
      white-space: nowrap;
    }

    .actions-buttons {
      display: flex;
      gap: 0.5rem;
      justify-content: flex-end;
    }

    .action-btn {
      display: inline-flex;
      align-items: center;
      gap: 0.25rem;
      padding: 0.375rem 0.75rem;
      border: none;
      border-radius: 0.25rem;
      font-family: "Montserrat", sans-serif;
      font-size: 0.875rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s;
    }

    .action-btn .material-symbols-outlined {
      font-size: 1.125rem;
    }

    .action-btn-primary {
      background: #009ADA;
      color: white;
    }

    .action-btn-primary:hover {
      background: #0086c3;
    }

    .action-btn-danger {
      background: #dc3545;
      color: white;
    }

    .action-btn-danger:hover {
      background: #c82333;
    }

    .action-btn-success {
      background: #28a745;
      color: white;
    }

    .action-btn-success:hover {
      background: #218838;
    }

    .action-btn-warning {
      background: #ffc107;
      color: #212529;
    }

    .action-btn-warning:hover {
      background: #e0a800;
    }

    /* Badge */
    .badge {
      display: inline-block;
      padding: 0.25rem 0.75rem;
      border-radius: 9999px;
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.025em;
    }

    .badge-success {
      background: #d4edda;
      color: #155724;
    }

    .badge-warning {
      background: #fff3cd;
      color: #856404;
    }

    .badge-danger {
      background: #f8d7da;
      color: #721c24;
    }

    .badge-info {
      background: #d1ecf1;
      color: #0c5460;
    }

    .badge-primary {
      background: #cfe2ff;
      color: #084298;
    }

    /* Avatar */
    .avatar {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .avatar img {
      width: 2rem;
      height: 2rem;
      border-radius: 50%;
      object-fit: cover;
    }

    /* Link */
    .table-link {
      color: #009ADA;
      text-decoration: none;
      font-weight: 500;
    }

    .table-link:hover {
      text-decoration: underline;
    }

    /* Empty State */
    .empty-state {
      text-align: center !important;
      padding: 3rem 1rem !important;
      color: #6c757d;
    }

    .empty-icon {
      font-size: 3rem;
      opacity: 0.5;
      display: block;
      margin-bottom: 1rem;
    }

    .empty-state p {
      margin: 0;
      font-size: 1rem;
    }

    /* Loading State */
    .loading-state {
      text-align: center !important;
      padding: 3rem 1rem !important;
    }

    .spinner {
      width: 2.5rem;
      height: 2.5rem;
      border: 3px solid #e9ecef;
      border-top-color: #009ADA;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
      margin: 0 auto 1rem;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    .loading-state p {
      margin: 0;
      color: #6c757d;
    }

    /* Footer */
    .table-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 1.5rem;
      border-top: 1px solid #e5e7eb;
      gap: 1rem;
      flex-wrap: wrap;
      background: rgba(0, 0, 0, 0.01);
    }

    .table-info {
      font-size: 0.875rem;
      color: #6c757d;
    }

    .selected-info {
      color: #009ADA;
      font-weight: 600;
    }

    /* Pagination */
    .pagination {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .page-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 2rem;
      height: 2rem;
      padding: 0 0.5rem;
      border: 1px solid #ccc;
      background: white;
      border-radius: 0.25rem;
      cursor: pointer;
      transition: all 0.2s;
      font-family: "Montserrat", sans-serif;
      font-size: 0.875rem;
      color: #383C3F;
    }

    .page-btn:hover:not(:disabled) {
      background: #f8f9fa;
      border-color: #009ADA;
      color: #009ADA;
    }

    .page-btn.active {
      background: #009ADA;
      border-color: #009ADA;
      color: white;
    }

    .page-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .page-numbers {
      display: flex;
      gap: 0.25rem;
    }

    .page-size-select {
      padding: 0.375rem 0.75rem;
      border: 1px solid #ccc;
      border-radius: 0.25rem;
      font-family: "Montserrat", sans-serif;
      font-size: 0.875rem;
      cursor: pointer;
      background: white;
    }

    .page-size-select:focus {
      outline: none;
      border-color: #009ADA;
    }

    /* Material Icons */
    .material-symbols-outlined {
      font-variation-settings:
        'FILL' 0,
        'wght' 400,
        'GRAD' 0,
        'opsz' 24;
      user-select: none;
    }

    /* Responsive */
    @media (max-width: 768px) {
      .table-header {
        flex-direction: column;
        align-items: stretch;
      }

      .table-search {
        max-width: 100%;
      }

      .table-footer {
        flex-direction: column;
        align-items: stretch;
      }

      .pagination {
        justify-content: center;
        flex-wrap: wrap;
      }

      .actions-buttons {
        flex-direction: column;
      }
    }
  `]
})
export class TableComponent implements OnInit, OnChanges {
  @Input() columns: TableColumn[] = [];
  @Input() data: any[] = [];
  @Input() actions: TableAction[] = [];
  
  // Features
  @Input() searchable = false;
  @Input() sortable = true;
  @Input() pageable = true;
  @Input() selectable = false;
  @Input() striped = true;
  @Input() hoverable = true;
  @Input() bordered = false;
  
  // Texts
  @Input() title = '';
  @Input() subtitle = '';
  @Input() searchPlaceholder = 'Buscar...';
  @Input() emptyText = 'Nenhum registro encontrado';
  @Input() loadingText = 'Carregando...';
  
  // Pagination
  @Input() pageSize = 10;
  @Input() pageSizeOptions = [5, 10, 25, 50, 100];
  
  // States
  @Input() loading = false;
  
  // Events
  @Output() rowClicked = new EventEmitter<any>();
  @Output() selectionChanged = new EventEmitter<any[]>();
  @Output() sorted = new EventEmitter<{ column: string, direction: string }>();

  // Internal state
  searchTerm = '';
  sortColumn = '';
  sortDirection: 'asc' | 'desc' = 'asc';
  currentPage = 1;
  selectedRows: any[] = [];
  processedData: any[] = [];
  paginatedData: any[] = [];

  ngOnInit() {
    this.processData();
  }

  ngOnChanges() {
    this.processData();
  }

  processData() {
    let result = [...this.data];

    // Search
    if (this.searchTerm) {
      result = result.filter(row =>
        this.columns.some(col =>
          String(row[col.key] || '').toLowerCase().includes(this.searchTerm.toLowerCase())
        )
      );
    }

    // Sort
    if (this.sortColumn) {
      result.sort((a, b) => {
        const aVal = a[this.sortColumn];
        const bVal = b[this.sortColumn];
        const compare = aVal > bVal ? 1 : aVal < bVal ? -1 : 0;
        return this.sortDirection === 'asc' ? compare : -compare;
      });
    }

    this.processedData = result;
    this.updatePagination();
  }

  updatePagination() {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedData = this.processedData.slice(start, end);
  }

  onSearch() {
    this.currentPage = 1;
    this.processData();
  }

  sort(column: string) {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    this.processData();
    this.sorted.emit({ column, direction: this.sortDirection });
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.updatePagination();
  }

  onPageSizeChange() {
    this.currentPage = 1;
    this.updatePagination();
  }

  get totalPages(): number {
    return Math.ceil(this.processedData.length / this.pageSize);
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    const maxVisible = 5;
    let start = Math.max(1, this.currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(this.totalPages, start + maxVisible - 1);
    
    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    
    return pages;
  }

  getStartIndex(): number {
    return (this.currentPage - 1) * this.pageSize + 1;
  }

  getEndIndex(): number {
    return Math.min(this.currentPage * this.pageSize, this.processedData.length);
  }

  // Selection
  toggleRowSelection(row: any) {
    const index = this.selectedRows.indexOf(row);
    if (index > -1) {
      this.selectedRows.splice(index, 1);
    } else {
      this.selectedRows.push(row);
    }
    this.selectionChanged.emit(this.selectedRows);
  }

  toggleSelectAll() {
    if (this.isAllSelected()) {
      this.selectedRows = [];
    } else {
      this.selectedRows = [...this.paginatedData];
    }
    this.selectionChanged.emit(this.selectedRows);
  }

  isRowSelected(row: any): boolean {
    return this.selectedRows.includes(row);
  }

  isAllSelected(): boolean {
    return this.paginatedData.length > 0 && 
           this.paginatedData.every(row => this.selectedRows.includes(row));
  }

  isSomeSelected(): boolean {
    return this.selectedRows.length > 0 && !this.isAllSelected();
  }

  onRowClick(row: any) {
    this.rowClicked.emit(row);
  }

  getTotalColumns(): number {
    let count = this.columns.length;
    if (this.selectable) count++;
    if (this.actions && this.actions.length > 0) count++;
    return count;
  }

  // Formatters
  getBadgeColor(value: string): string {
    const lowerValue = String(value).toLowerCase();
    if (['ativo', 'aprovado', 'sucesso', 'pago', 'completo'].includes(lowerValue)) return 'success';
    if (['pendente', 'aguardando', 'em análise'].includes(lowerValue)) return 'warning';
    if (['inativo', 'reprovado', 'erro', 'cancelado'].includes(lowerValue)) return 'danger';
    if (['info', 'informação', 'novo'].includes(lowerValue)) return 'info';
    return 'primary';
  }

  formatDate(value: any): string {
    if (!value) return '';
    const date = new Date(value);
    return date.toLocaleDateString('pt-BR');
  }

  formatCurrency(value: any): string {
    if (!value && value !== 0) return 'R$ 0,00';
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  }
}