import { Component, Input, Output, EventEmitter, ContentChildren, QueryList, AfterContentInit } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Tab {
  id: string;
  label: string;
  icon?: string;
  badge?: string | number;
  disabled?: boolean;
  closable?: boolean;
}

@Component({
  selector: 'web-tab',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="tab-content" [hidden]="!active">
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    .tab-content {
      animation: fadeIn 0.2s ease-in-out;
    }
    
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `]
})
export class TabComponent {
  @Input() id = '';
  @Input() label = '';
  @Input() icon = '';
  @Input() badge: string | number = '';
  @Input() disabled = false;
  @Input() closable = false;
  @Input() active = false;
}

@Component({
  selector: 'web-tabs',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="tabs-container" [class]="'tabs-' + variant + ' tabs-' + size">
      <!-- Tabs Header -->
      <div class="tabs-header" [class.tabs-header-centered]="centered">
        <div class="tabs-nav" [class.tabs-nav-fullwidth]="fullWidth">
          <button
            *ngFor="let tab of tabs; let i = index"
            class="tab-button"
            [class.active]="activeTabId === tab.id"
            [class.disabled]="tab.disabled"
            [disabled]="tab.disabled"
            (click)="selectTab(tab.id)">
            
            <!-- Icon -->
            <span *ngIf="tab.icon" class="material-symbols-outlined tab-icon">
              {{ tab.icon }}
            </span>
            
            <!-- Label -->
            <span class="tab-label">{{ tab.label }}</span>
            
            <!-- Badge -->
            <span *ngIf="tab.badge" class="tab-badge">{{ tab.badge }}</span>
            
            <!-- Close Button -->
            <button 
              *ngIf="tab.closable && closable"
              class="tab-close"
              (click)="closeTab(tab.id, $event)">
              <span class="material-symbols-outlined">close</span>
            </button>
          </button>
          
          <!-- Add Tab Button -->
          <button 
            *ngIf="addable"
            class="tab-add"
            (click)="onAddTab()"
            [disabled]="disabled">
            <span class="material-symbols-outlined">add</span>
          </button>
        </div>
        
        <!-- Extra Content (Slot) -->
        <div class="tabs-extra" *ngIf="hasExtra">
          <ng-content select="[extra]"></ng-content>
        </div>
      </div>
      
      <!-- Tabs Content -->
      <div class="tabs-content" [class.tabs-content-padded]="contentPadding">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: [`
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200');
    
    /* Container */
    .tabs-container {
      width: 100%;
      font-family: "Montserrat", sans-serif;
    }
    
    /* Header */
    .tabs-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 1rem;
      border-bottom: 2px solid #e5e7eb;
      background: white;
    }
    
    .tabs-header-centered {
      justify-content: center;
    }
    
    /* Nav */
    .tabs-nav {
      display: flex;
      gap: 0.25rem;
      overflow-x: auto;
      scrollbar-width: none;
    }
    
    .tabs-nav::-webkit-scrollbar {
      display: none;
    }
    
    .tabs-nav-fullwidth {
      width: 100%;
    }
    
    .tabs-nav-fullwidth .tab-button {
      flex: 1;
    }
    
    /* Tab Button Base */
    .tab-button {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1.25rem;
      border: none;
      background: transparent;
      color: #6c757d;
      font-family: "Montserrat", sans-serif;
      font-size: 0.9375rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
      white-space: nowrap;
      position: relative;
      border-bottom: 2px solid transparent;
      margin-bottom: -2px;
    }
    
    .tab-button:hover:not(.disabled) {
      color: #009ADA;
      background: rgba(0, 154, 218, 0.05);
    }
    
    .tab-button.active {
      color: #009ADA;
      border-bottom-color: #009ADA;
    }
    
    .tab-button.disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }
    
    /* Tab Icon */
    .tab-icon {
      font-size: 1.25rem;
      line-height: 1;
    }
    
    /* Tab Badge */
    .tab-badge {
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
      line-height: 1;
    }
    
    .tab-button.active .tab-badge {
      background: #009ADA;
    }
    
    /* Tab Close */
    .tab-close {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 1.25rem;
      height: 1.25rem;
      padding: 0;
      border: none;
      background: transparent;
      border-radius: 0.25rem;
      color: inherit;
      cursor: pointer;
      transition: all 0.2s;
    }
    
    .tab-close:hover {
      background: rgba(0, 0, 0, 0.1);
      color: #dc3545;
    }
    
    .tab-close .material-symbols-outlined {
      font-size: 1rem;
    }
    
    /* Add Tab Button */
    .tab-add {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 2.5rem;
      height: 2.5rem;
      padding: 0;
      border: 1px dashed #ccc;
      background: transparent;
      border-radius: 0.25rem;
      color: #6c757d;
      cursor: pointer;
      transition: all 0.2s;
      margin-left: 0.5rem;
    }
    
    .tab-add:hover:not(:disabled) {
      border-color: #009ADA;
      background: rgba(0, 154, 218, 0.05);
      color: #009ADA;
    }
    
    .tab-add:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }
    
    /* Extra Content */
    .tabs-extra {
      margin-right: 1rem;
    }
    
    /* Content */
    .tabs-content {
      background: white;
    }
    
    .tabs-content-padded {
      padding: 1.5rem;
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
    
    /* ========== VARIANTS ========== */
    
    /* Pills */
    .tabs-pills .tabs-header {
      border-bottom: none;
      padding: 0.5rem;
      gap: 0.5rem;
      background: #f8f9fa;
      border-radius: 0.5rem;
    }
    
    .tabs-pills .tab-button {
      border-radius: 0.375rem;
      border-bottom: none;
      margin-bottom: 0;
    }
    
    .tabs-pills .tab-button.active {
      background: white;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      border-bottom-color: transparent;
    }
    
    /* Boxed */
    .tabs-boxed .tabs-header {
      border-bottom: none;
      gap: 0;
      background: transparent;
    }
    
    .tabs-boxed .tab-button {
      border: 1px solid #e5e7eb;
      border-bottom: none;
      border-radius: 0.5rem 0.5rem 0 0;
      margin-bottom: 0;
      background: #f8f9fa;
    }
    
    .tabs-boxed .tab-button.active {
      background: white;
      border-bottom: 2px solid white;
      margin-bottom: -1px;
      z-index: 1;
    }
    
    .tabs-boxed .tabs-content {
      border: 1px solid #e5e7eb;
      border-radius: 0 0.5rem 0.5rem 0.5rem;
    }
    
    /* Underline (Default) */
    .tabs-underline .tab-button.active {
      border-bottom-width: 3px;
    }
    
    /* Enclosed */
    .tabs-enclosed .tabs-header {
      border: 1px solid #e5e7eb;
      border-radius: 0.5rem 0.5rem 0 0;
      border-bottom: none;
      background: #f8f9fa;
      padding: 0.5rem;
    }
    
    .tabs-enclosed .tab-button {
      border-radius: 0.375rem;
      border-bottom: none;
      margin-bottom: 0;
    }
    
    .tabs-enclosed .tab-button.active {
      background: white;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }
    
    .tabs-enclosed .tabs-content {
      border: 1px solid #e5e7eb;
      border-top: none;
      border-radius: 0 0 0.5rem 0.5rem;
    }
    
    /* Vertical */
    .tabs-vertical .tabs-container {
      display: flex;
    }
    
    .tabs-vertical .tabs-header {
      flex-direction: column;
      border-bottom: none;
      border-right: 2px solid #e5e7eb;
      min-width: 200px;
    }
    
    .tabs-vertical .tabs-nav {
      flex-direction: column;
      width: 100%;
    }
    
    .tabs-vertical .tab-button {
      border-bottom: none;
      border-right: 2px solid transparent;
      margin-bottom: 0;
      margin-right: -2px;
      justify-content: flex-start;
      width: 100%;
    }
    
    .tabs-vertical .tab-button.active {
      border-right-color: #009ADA;
      border-bottom-color: transparent;
    }
    
    .tabs-vertical .tabs-content {
      flex: 1;
    }
    
    /* ========== SIZES ========== */
    
    /* Small */
    .tabs-small .tab-button {
      padding: 0.5rem 0.875rem;
      font-size: 0.875rem;
    }
    
    .tabs-small .tab-icon {
      font-size: 1.125rem;
    }
    
    /* Medium (Default) */
    .tabs-medium .tab-button {
      padding: 0.75rem 1.25rem;
      font-size: 0.9375rem;
    }
    
    /* Large */
    .tabs-large .tab-button {
      padding: 1rem 1.5rem;
      font-size: 1rem;
    }
    
    .tabs-large .tab-icon {
      font-size: 1.5rem;
    }
    
    /* Responsive */
    @media (max-width: 768px) {
      .tabs-nav {
        overflow-x: auto;
      }
      
      .tabs-vertical .tabs-container {
        flex-direction: column;
      }
      
      .tabs-vertical .tabs-header {
        border-right: none;
        border-bottom: 2px solid #e5e7eb;
        min-width: auto;
      }
      
      .tabs-vertical .tabs-nav {
        flex-direction: row;
      }
      
      .tabs-vertical .tab-button {
        border-right: none;
        border-bottom: 2px solid transparent;
        margin-right: 0;
        margin-bottom: -2px;
      }
      
      .tabs-vertical .tab-button.active {
        border-right-color: transparent;
        border-bottom-color: #009ADA;
      }
    }
  `]
})
export class TabsComponent implements AfterContentInit {
  @ContentChildren(TabComponent) tabsQuery!: QueryList<TabComponent>;
  
  @Input() variant: 'underline' | 'pills' | 'boxed' | 'enclosed' | 'vertical' = 'underline';
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() activeTabId = '';
  @Input() centered = false;
  @Input() fullWidth = false;
  @Input() closable = false;
  @Input() addable = false;
  @Input() disabled = false;
  @Input() contentPadding = true;
  @Input() hasExtra = false;
  
  @Output() tabChange = new EventEmitter<string>();
  @Output() tabClose = new EventEmitter<string>();
  @Output() tabAdd = new EventEmitter<void>();
  
  tabs: TabComponent[] = [];

  ngAfterContentInit() {
    this.tabs = this.tabsQuery.toArray();
    
    // Set first tab as active if no active tab is set
    if (!this.activeTabId && this.tabs.length > 0) {
      this.activeTabId = this.tabs[0].id;
      this.tabs[0].active = true;
    }
    
    this.tabsQuery.changes.subscribe(() => {
      this.tabs = this.tabsQuery.toArray();
    });
  }

  selectTab(tabId: string) {
    const tab = this.tabs.find(t => t.id === tabId);
    if (tab && !tab.disabled) {
      // Deactivate all tabs
      this.tabs.forEach(t => t.active = false);
      
      // Activate selected tab
      tab.active = true;
      this.activeTabId = tabId;
      this.tabChange.emit(tabId);
    }
  }

  closeTab(tabId: string, event: Event) {
    event.stopPropagation();
    this.tabClose.emit(tabId);
  }

  onAddTab() {
    this.tabAdd.emit();
  }
}