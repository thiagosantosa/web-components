import { Component, Input, Output, EventEmitter, HostListener, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface MenuItem {
  id: string;
  label: string;
  icon?: string;
  badge?: string | number;
  disabled?: boolean;
  divider?: boolean;
  children?: MenuItem[];
  route?: string;
  action?: () => void;
}

@Component({
  selector: 'web-menu',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="menu-container" 
         [class]="'menu-' + variant + ' menu-' + size"
         [class.menu-vertical]="orientation === 'vertical'"
         [class.menu-horizontal]="orientation === 'horizontal'">
      
      <!-- Menu Items -->
      <ul class="menu-list" [style.text-align]="align">
        <ng-container *ngFor="let item of items">
          
          <!-- Divider -->
          <li *ngIf="item.divider" class="menu-divider"></li>
          
          <!-- Menu Item -->
          <li *ngIf="!item.divider" 
              class="menu-item"
              [class.active]="activeItemId === item.id"
              [class.disabled]="item.disabled"
              [class.has-children]="item.children && item.children.length > 0">
            
            <a class="menu-link"
               [class.disabled]="item.disabled"
               (click)="onItemClick($event, item)">
              
              <!-- Icon -->
              <span *ngIf="item.icon" class="material-symbols-outlined menu-icon">
                {{ item.icon }}
              </span>
              
              <!-- Label -->
              <span class="menu-label">{{ item.label }}</span>
              
              <!-- Badge -->
              <span *ngIf="item.badge" class="menu-badge">{{ item.badge }}</span>
              
              <!-- Submenu Arrow -->
              <span *ngIf="item.children && item.children.length > 0" 
                    class="material-symbols-outlined menu-arrow">
                {{ orientation === 'vertical' ? 'chevron_right' : 'expand_more' }}
              </span>
            </a>
            
            <!-- Submenu -->
            <ul *ngIf="item.children && item.children.length > 0 && isSubmenuOpen(item.id)"
                class="submenu">
              <li *ngFor="let child of item.children"
                  class="submenu-item"
                  [class.active]="activeItemId === child.id"
                  [class.disabled]="child.disabled">
                <a class="submenu-link"
                   [class.disabled]="child.disabled"
                   (click)="onItemClick($event, child)">
                  <span *ngIf="child.icon" class="material-symbols-outlined menu-icon">
                    {{ child.icon }}
                  </span>
                  <span class="menu-label">{{ child.label }}</span>
                  <span *ngIf="child.badge" class="menu-badge">{{ child.badge }}</span>
                </a>
              </li>
            </ul>
          </li>
        </ng-container>
      </ul>
    </div>
  `,
  styles: [`
       @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200');
    
    /* Container */
    .menu-container {
      font-family: "Montserrat", sans-serif;
      background: white;
    }
    
    /* Menu List */
    .menu-list {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
    }
    
    .menu-vertical .menu-list {
      flex-direction: column;
    }
    
    .menu-horizontal .menu-list {
      flex-direction: row;
      align-items: center;
    }
    
    /* Menu Item */
    .menu-item {
      position: relative;
    }
    
    .menu-link {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.75rem 1.25rem;
      color: #383C3F;
      text-decoration: none;
      cursor: pointer;
      transition: all 0.2s ease;
      font-weight: 500;
      font-size: 0.9375rem;
      white-space: nowrap;
    }
    
    .menu-link:hover:not(.disabled) {
      background: rgba(0, 154, 218, 0.1);
      color: #009ADA;
    }
    
    .menu-item.active > .menu-link {
      background: rgba(0, 154, 218, 0.15);
      color: #009ADA;
      font-weight: 600;
    }
    
    .menu-link.disabled {
      opacity: 0.5;
      cursor: not-allowed;
      pointer-events: none;
    }
    
    /* Icon */
    .menu-icon {
      font-size: 1.25rem;
      line-height: 1;
    }
    
    /* Badge */
    .menu-badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 1.25rem;
      height: 1.25rem;
      padding: 0 0.375rem;
      border-radius: 9999px;
      background: #dc3545;
      color: white;
      font-size: 0.75rem;
      font-weight: 600;
      margin-left: auto;
    }
    
    .menu-item.active .menu-badge {
      background: #009ADA;
    }
    
    /* Arrow */
    .menu-arrow {
      font-size: 1.25rem;
      margin-left: auto;
      transition: transform 0.2s;
    }
    
    .menu-item.has-children:hover .menu-arrow {
      transform: rotate(90deg);
    }
    
    .menu-horizontal .menu-item.has-children:hover .menu-arrow {
      transform: rotate(180deg);
    }
    
    /* Divider */
    .menu-divider {
      height: 1px;
      background: #e5e7eb;
      margin: 0.5rem 0;
    }
    
    .menu-horizontal .menu-divider {
      width: 1px;
      height: 2rem;
      margin: 0 0.5rem;
    }
    
    /* Submenu */
    .submenu {
      list-style: none;
      margin: 0;
      padding: 0;
      background: white;
      border-left: 2px solid #009ADA;
    }
    
    .menu-vertical .submenu {
      padding-left: 1rem;
    }
    
    .menu-horizontal .submenu {
      position: absolute;
      top: 100%;
      left: 0;
      min-width: 200px;
      border: 1px solid #e5e7eb;
      border-radius: 0.375rem;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      margin-top: 0.25rem;
      z-index: 1000;
      border-left: none;
    }
    
    .submenu-item {
      border: none;
    }
    
    .submenu-link {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.625rem 1.25rem;
      color: #383C3F;
      text-decoration: none;
      cursor: pointer;
      transition: all 0.2s ease;
      font-size: 0.875rem;
    }
    
    .submenu-link:hover:not(.disabled) {
      background: rgba(0, 154, 218, 0.1);
      color: #009ADA;
    }
    
    .submenu-item.active .submenu-link {
      background: rgba(0, 154, 218, 0.15);
      color: #009ADA;
      font-weight: 600;
    }
    
    /* ========== VARIANTS ========== */
    
    /* Default */
    .menu-default {
      border-bottom: 1px solid #e5e7eb;
    }
    
    .menu-default.menu-vertical {
      border-bottom: none;
      border-right: 1px solid #e5e7eb;
    }
    
    /* Pills */
    .menu-pills .menu-link {
      border-radius: 0.375rem;
      margin: 0.25rem;
    }
    
    /* Tabs */
    .menu-tabs .menu-link {
      border-bottom: 2px solid transparent;
      padding-bottom: calc(0.75rem - 2px);
    }
    
    .menu-tabs .menu-item.active > .menu-link {
      border-bottom-color: #009ADA;
      background: transparent;
    }
    
    /* Sidebar */
    .menu-sidebar {
      background: #f8f9fa;
      border-right: 1px solid #e5e7eb;
      min-width: 250px;
      height: 100%;
    }
    
    .menu-sidebar .menu-link {
      padding: 1rem 1.5rem;
    }
    
    /* Navbar */
    .menu-navbar {
      background: #009ADA;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    
    .menu-navbar .menu-link {
      color: white;
    }
    
    .menu-navbar .menu-link:hover {
      background: rgba(255, 255, 255, 0.1);
    }
    
    .menu-navbar .menu-item.active > .menu-link {
      background: rgba(255, 255, 255, 0.2);
      color: white;
    }
    
    /* ========== SIZES ========== */
    
    /* Small */
    .menu-small .menu-link {
      padding: 0.5rem 0.875rem;
      font-size: 0.875rem;
    }
    
    .menu-small .menu-icon {
      font-size: 1.125rem;
    }
    
    /* Medium (Default) */
    .menu-medium .menu-link {
      padding: 0.75rem 1.25rem;
      font-size: 0.9375rem;
    }
    
    /* Large */
    .menu-large .menu-link {
      padding: 1rem 1.5rem;
      font-size: 1rem;
    }
    
    .menu-large .menu-icon {
      font-size: 1.5rem;
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
      .menu-horizontal .menu-list {
        flex-direction: column;
      }
      
      .menu-horizontal .submenu {
        position: static;
        width: 100%;
        box-shadow: none;
        border: none;
        border-left: 2px solid #009ADA;
        margin-top: 0;
        margin-left: 1rem;
      }
    }
  `]
})
export class MenuComponent implements AfterViewInit {
  @Input() items: MenuItem[] = [];
  @Input() variant: 'default' | 'pills' | 'tabs' | 'sidebar' | 'navbar' = 'default';
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() orientation: 'horizontal' | 'vertical' = 'horizontal';
  @Input() align: 'left' | 'center' | 'right' = 'left';
  @Input() activeItemId = '';
  
  @Output() itemClicked = new EventEmitter<MenuItem>();
  
  openSubmenuIds: Set<string> = new Set();
  private menuElement?: HTMLElement;

  ngAfterViewInit() {
    // Guarda referência do elemento do menu
    this.menuElement = document.querySelector('.menu-container') as HTMLElement;
  }

  onItemClick(event: Event, item: MenuItem) {
    event.stopPropagation(); // Previne propagação para o document click
    
    if (item.disabled) {
      event.preventDefault();
      return;
    }
    
    // Se tem filhos, apenas abre/fecha submenu
    if (item.children && item.children.length > 0) {
      event.preventDefault();
      this.toggleSubmenu(item.id);
      return;
    }
    
    // Se tem action, executa
    if (item.action) {
      event.preventDefault();
      item.action();
    }
    
    // Fecha todos os submenus ao clicar em item normal
    this.openSubmenuIds.clear();
    
    // Se tem route, deixa navegação natural acontecer
    // Ou você pode implementar navegação programática aqui
    
    // Emite evento
    this.itemClicked.emit(item);
    
    // Define como ativo
    this.activeItemId = item.id;
  }

  toggleSubmenu(itemId: string) {
    // Fecha todos os outros submenus
    if (!this.openSubmenuIds.has(itemId)) {
      this.openSubmenuIds.clear();
    }
    
    // Abre/fecha o submenu clicado
    if (this.openSubmenuIds.has(itemId)) {
      this.openSubmenuIds.delete(itemId);
    } else {
      this.openSubmenuIds.add(itemId);
    }
  }

  isSubmenuOpen(itemId: string): boolean {
    return this.openSubmenuIds.has(itemId);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    // Fecha todos os submenus ao clicar fora do menu
    const target = event.target as HTMLElement;
    
    // Verifica se o clique foi dentro do menu
    if (this.menuElement && !this.menuElement.contains(target)) {
      this.openSubmenuIds.clear();
    }
  }
}