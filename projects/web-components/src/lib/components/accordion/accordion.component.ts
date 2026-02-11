import { Component, Input, Output, EventEmitter, ContentChildren, QueryList, AfterContentInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'web-accordion-item',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="accordion-item"
         [class.accordion-item-expanded]="expanded"
         [class.accordion-item-disabled]="disabled">

      <!-- Header -->
      <div class="accordion-header"
           [class.accordion-header-disabled]="disabled"
           (click)="toggle()">

        <!-- Order Controls -->
        <div *ngIf="orderable && !disabled"
             class="accordion-order-controls"
             (click)="$event.stopPropagation()">
          <button class="order-btn order-btn-up"
                  (click)="moveUp.emit()"
                  [disabled]="isFirst"
                  title="Mover para cima">
            <span class="material-symbols-outlined">arrow_upward</span>
          </button>
          <span class="order-number">{{ orderNumber }}</span>
          <button class="order-btn order-btn-down"
                  (click)="moveDown.emit()"
                  [disabled]="isLast"
                  title="Mover para baixo">
            <span class="material-symbols-outlined">arrow_downward</span>
          </button>
        </div>

        <!-- Icon -->
        <span *ngIf="icon"
              class="material-symbols-outlined accordion-icon"
              [style.color]="iconColor">
          {{ icon }}
        </span>

        <!-- Title & Subtitle -->
        <div class="accordion-title-wrapper">
          <div class="accordion-title">{{ title }}</div>
          <div *ngIf="subtitle" class="accordion-subtitle">{{ subtitle }}</div>
        </div>

        <!-- Badge -->
        <span *ngIf="badge" class="accordion-badge">{{ badge }}</span>

        <!-- Custom Header Content -->
        <div class="accordion-header-actions" (click)="$event.stopPropagation()">
          <ng-content select="[header-actions]"></ng-content>
        </div>

        <!-- Expand Icon -->
        <span class="material-symbols-outlined accordion-expand-icon"
              [class.accordion-expand-icon-rotated]="expanded">
          {{ expandIcon }}
        </span>
      </div>

      <!-- Content -->
      <div class="accordion-content-wrapper"
           [@expandCollapse]="expanded ? 'expanded' : 'collapsed'">
        <div class="accordion-content" [class.accordion-content-no-padding]="!contentPadding">
          <ng-content></ng-content>
        </div>
      </div>

      <!-- Loading -->
      <div *ngIf="loading" class="accordion-loading">
        <div class="accordion-spinner"></div>
      </div>
    </div>
  `,
  styles: [`
    .accordion-item {
      position: relative;
      background: white;
      border-radius: 0.75rem;
      margin-bottom: 0.75rem;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      overflow: hidden;
      font-family: "Montserrat", sans-serif;
    }

    .accordion-item:hover {
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .accordion-item-expanded {
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    }

    .accordion-item-disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    /* Header */
    .accordion-header {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1.25rem 1.5rem;
      cursor: pointer;
      transition: background 0.2s;
      user-select: none;
    }

    .accordion-header:hover:not(.accordion-header-disabled) {
      background: rgba(0, 154, 218, 0.05);
    }

    .accordion-header-disabled {
      cursor: not-allowed;
    }

    /* Order Controls */
    .accordion-order-controls {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.25rem;
      padding: 0.25rem;
      background: #f3f4f6;
      border-radius: 0.5rem;
      flex-shrink: 0;
    }

    .order-btn {
      width: 1.5rem;
      height: 1.5rem;
      padding: 0;
      border: none;
      background: transparent;
      border-radius: 0.25rem;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: #6b7280;
      transition: all 0.2s;
    }

    .order-btn:hover:not(:disabled) {
      background: #009ADA;
      color: white;
    }

    .order-btn:disabled {
      opacity: 0.3;
      cursor: not-allowed;
    }

    .order-btn .material-symbols-outlined {
      font-size: 1rem;
    }

    .order-number {
      font-size: 0.75rem;
      font-weight: 700;
      color: #009ADA;
      min-width: 1.5rem;
      text-align: center;
    }

    /* Icon */
    .accordion-icon {
      font-size: 1.5rem;
      flex-shrink: 0;
    }

    /* Title */
    .accordion-title-wrapper {
      flex: 1;
      min-width: 0;
    }

    .accordion-title {
      font-size: 1rem;
      font-weight: 600;
      color: #1f2937;
      line-height: 1.4;
    }

    .accordion-subtitle {
      font-size: 0.875rem;
      color: #6b7280;
      margin-top: 0.25rem;
      line-height: 1.4;
    }

    /* Badge */
    .accordion-badge {
      padding: 0.25rem 0.625rem;
      background: #009ADA;
      color: white;
      border-radius: 9999px;
      font-size: 0.75rem;
      font-weight: 600;
      flex-shrink: 0;
    }

    /* Header Actions */
    .accordion-header-actions {
      display: flex;
      gap: 0.5rem;
      flex-shrink: 0;
    }

    /* Expand Icon */
    .accordion-expand-icon {
      font-size: 1.5rem;
      color: #6b7280;
      transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      flex-shrink: 0;
    }

    .accordion-expand-icon-rotated {
      transform: rotate(180deg);
    }

    /* Content */
    .accordion-content-wrapper {
      overflow: hidden;
    }

    .accordion-content {
      padding: 0 1.5rem 1.5rem 1.5rem;
      color: #4b5563;
      line-height: 1.6;
    }

    .accordion-content-no-padding {
      padding: 0;
    }

    /* Loading */
    .accordion-loading {
      position: absolute;
      inset: 0;
      background: rgba(255, 255, 255, 0.9);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10;
    }

    .accordion-spinner {
      width: 2rem;
      height: 2rem;
      border: 3px solid #e5e7eb;
      border-top-color: #009ADA;
      border-radius: 50%;
      animation: spin 0.6s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
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
  `],
  animations: [
    trigger('expandCollapse', [
      state('collapsed', style({
        height: '0',
        opacity: '0',
        visibility: 'hidden'
      })),
      state('expanded', style({
        height: '*',
        opacity: '1',
        visibility: 'visible'
      })),
      transition('collapsed <=> expanded', [
        animate('300ms cubic-bezier(0.4, 0, 0.2, 1)')
      ])
    ])
  ]
})
export class AccordionItemComponent {
  @Input() title = '';
  @Input() subtitle = '';
  @Input() icon = '';
  @Input() iconColor = '#009ADA';
  @Input() badge = '';
  @Input() expanded = false;
  @Input() disabled = false;
  @Input() loading = false;
  @Input() contentPadding = true;
  @Input() expandIcon = 'expand_more';
  @Input() orderable = false;
  @Input() orderNumber = 1;
  @Input() isFirst = false;
  @Input() isLast = false;

  itemIndex = 0; // Índice interno para rastreamento

  @Output() expandedChange = new EventEmitter<boolean>();
  @Output() moveUp = new EventEmitter<void>();
  @Output() moveDown = new EventEmitter<void>();

  toggle() {
    if (this.disabled) return;

    this.expanded = !this.expanded;
    this.expandedChange.emit(this.expanded);
  }
}

@Component({
  selector: 'web-accordion',
  standalone: true,
  imports: [CommonModule, AccordionItemComponent],
  template: `
    <div class="accordion" [class]="'accordion-' + variant">
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    .accordion {
      display: flex;
      flex-direction: column;
    }

    /* Variants */
    .accordion-default {
      gap: 0.75rem;
    }

    .accordion-separated {
      gap: 1rem;
    }

    .accordion-compact {
      gap: 0;
    }

    .accordion-compact ::ng-deep .accordion-item {
      border-radius: 0;
      margin-bottom: 0;
      border-bottom: 1px solid #e5e7eb;
    }

    .accordion-compact ::ng-deep .accordion-item:first-child {
      border-top-left-radius: 0.75rem;
      border-top-right-radius: 0.75rem;
    }

    .accordion-compact ::ng-deep .accordion-item:last-child {
      border-bottom-left-radius: 0.75rem;
      border-bottom-right-radius: 0.75rem;
      border-bottom: none;
    }

    .accordion-bordered {
      border: 2px solid #e5e7eb;
      border-radius: 0.75rem;
      padding: 0.5rem;
      gap: 0.5rem;
    }
  `]
})
export class AccordionComponent implements AfterContentInit {
  @Input() variant: 'default' | 'separated' | 'compact' | 'bordered' = 'default';
  @Input() multiple = false;
  @Input() collapsible = true;
  @Input() orderable = false;

  @ContentChildren(AccordionItemComponent) items!: QueryList<AccordionItemComponent>;

  private itemsOrder: AccordionItemComponent[] = [];

  ngAfterContentInit() {
    // Inicializar ordem dos itens
    this.itemsOrder = this.items.toArray();

    // Configurar comportamento de expansão única
    if (!this.multiple) {
      this.items.forEach(item => {
        item.expandedChange.subscribe(() => {
          if (item.expanded) {
            this.collapseOthers(item);
          }
        });
      });
    }

    // Configurar ordenação
    if (this.orderable) {
      this.setupOrdering();
      this.updateOrderNumbers();
    }

    // Atualizar quando a lista mudar
    this.items.changes.subscribe(() => {
      this.itemsOrder = this.items.toArray();
      if (this.orderable) {
        this.updateOrderNumbers();
      }
    });
  }

  private setupOrdering() {
    this.items.forEach((item) => {
      item.orderable = true;

      // Move Up
      item.moveUp.subscribe(() => {
        const currentIndex = this.itemsOrder.indexOf(item);
        this.moveItemUp(currentIndex);
      });

      // Move Down
      item.moveDown.subscribe(() => {
        const currentIndex = this.itemsOrder.indexOf(item);
        this.moveItemDown(currentIndex);
      });
    });
  }

  private updateOrderNumbers() {
    this.itemsOrder.forEach((item, index) => {
      item.itemIndex = index;
      item.orderNumber = index + 1;
      item.isFirst = index === 0;
      item.isLast = index === this.itemsOrder.length - 1;
    });
  }

  private moveItemUp(currentIndex: number) {
    if (currentIndex === 0) return;

    const targetIndex = currentIndex - 1;

    // Swap items no array de ordem
    [this.itemsOrder[currentIndex], this.itemsOrder[targetIndex]] =
    [this.itemsOrder[targetIndex], this.itemsOrder[currentIndex]];

    // Reordenar no DOM
    this.reorderDOM();
    this.updateOrderNumbers();
  }

  private moveItemDown(currentIndex: number) {
    if (currentIndex === this.itemsOrder.length - 1) return;

    const targetIndex = currentIndex + 1;

    // Swap items no array de ordem
    [this.itemsOrder[currentIndex], this.itemsOrder[targetIndex]] =
    [this.itemsOrder[targetIndex], this.itemsOrder[currentIndex]];

    // Reordenar no DOM
    this.reorderDOM();
    this.updateOrderNumbers();
  }

  private reorderDOM() {
    // Pegar todos os elementos accordion-item
    const container = document.querySelector('.accordion');
    if (!container) return;

    // Criar um mapa de item para elemento DOM
    const elements = new Map<AccordionItemComponent, Element>();
    Array.from(container.children).forEach((child, index) => {
      if (child.classList.contains('accordion-item') || child.tagName === 'web-ACCORDION-ITEM') {
        const item = this.items.toArray()[index];
        if (item) {
          elements.set(item, child);
        }
      }
    });

    // Remover todos os elementos
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    // Adicionar na nova ordem
    this.itemsOrder.forEach(item => {
      const element = elements.get(item);
      if (element) {
        container.appendChild(element);
      }
    });
  }

  private collapseOthers(expandedItem: AccordionItemComponent) {
    this.items.forEach(item => {
      if (item !== expandedItem && item.expanded) {
        item.expanded = false;
        item.expandedChange.emit(false);
      }
    });
  }

  // Métodos públicos
  expandAll() {
    if (this.multiple) {
      this.items.forEach(item => {
        if (!item.disabled) {
          item.expanded = true;
          item.expandedChange.emit(true);
        }
      });
    }
  }

  collapseAll() {
    this.items.forEach(item => {
      if (!item.disabled) {
        item.expanded = false;
        item.expandedChange.emit(false);
      }
    });
  }
}
