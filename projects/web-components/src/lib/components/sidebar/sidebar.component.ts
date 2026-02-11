import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  HostListener,
  OnDestroy
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

export type SidebarMode = 'push' | 'overlay' | 'mini' | 'fixed';
export type SidebarPosition = 'left' | 'right';

export interface MenuItem {
  label?: string;
  icon?: string;
  route?: string;
  badge?: BadgeConfig;
  children?: MenuItem[];
  expanded?: boolean;
  separator?: boolean;
  disabled?: boolean;
  action?: () => void;
}

export interface BadgeConfig {
  value: string | number;
  color?: string;
  pulse?: boolean;
}

export interface UserProfile {
  name: string;
  email?: string;
  avatar?: string;
  role?: string;
  status?: 'online' | 'offline' | 'away';
}

export interface QuickAction {
  icon: string;
  label: string;
  action: () => void;
}

@Component({
  selector: 'web-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <!-- Mobile Menu Button (fixed, fora do sidebar) -->
    <button *ngIf="isMobile && !isOpen"
            type="button"
            class="mobile-menu-button"
            (click)="open()"
            [title]="'Abrir menu'">
      <span class="material-symbols-outlined">menu</span>
    </button>
    
    <!-- Backdrop (overlay mode) -->
    <div *ngIf="isOpen && (mode === 'overlay' || isMobile)"
         class="sidebar-backdrop"
         (click)="close()"
         [@fadeIn]>
    </div>
    
    <!-- Sidebar -->
    <aside class="sidebar"
           [class]="'sidebar-' + mode + ' sidebar-' + position"
           [class.sidebar-open]="isOpen"
           [class.sidebar-mobile]="isMobile"
           [style.width.px]="currentWidth"
           [@slideIn]>
      
      <!-- Header -->
      <div class="sidebar-header">
        <div class="sidebar-logo">
          <span *ngIf="logo" class="logo-icon" [innerHTML]="logo"></span>
          <span *ngIf="!isMini && title" class="logo-title">{{ title }}</span>
        </div>
        
        <button *ngIf="showToggle"
                type="button"
                class="toggle-button"
                (click)="toggleMini()"
                [title]="isMini ? 'Expandir' : 'Minimizar'">
          <span class="material-symbols-outlined">
            {{ isMini ? 'menu_open' : 'menu' }}
          </span>
        </button>
      </div>
      
      <!-- User Profile -->
      <div *ngIf="userProfile && !isMini" class="sidebar-profile">
        <div class="profile-avatar">
          <img *ngIf="userProfile.avatar" [src]="userProfile.avatar" [alt]="userProfile.name">
          <div *ngIf="!userProfile.avatar" class="avatar-placeholder">
            {{ getInitials(userProfile.name) }}
          </div>
          <span *ngIf="userProfile.status" class="status-indicator" [class]="'status-' + userProfile.status"></span>
        </div>
        <div class="profile-info">
          <div class="profile-name">{{ userProfile.name }}</div>
          <div *ngIf="userProfile.role" class="profile-role">{{ userProfile.role }}</div>
        </div>
      </div>
      
      <div *ngIf="userProfile && isMini" class="sidebar-profile-mini">
        <div class="profile-avatar-mini">
          <img *ngIf="userProfile.avatar" [src]="userProfile.avatar" [alt]="userProfile.name">
          <div *ngIf="!userProfile.avatar" class="avatar-placeholder">
            {{ getInitials(userProfile.name) }}
          </div>
        </div>
      </div>
      
      <!-- Menu -->
      <nav class="sidebar-menu">
        <div class="menu-items" [class.menu-scrollable]="items.length > 10">
          <ng-container *ngFor="let item of items; trackBy: trackByLabel">
            
            <!-- Separator -->
            <div *ngIf="item.separator" class="menu-separator"></div>
            
            <!-- Menu Item -->
            <div *ngIf="!item.separator"
                 class="menu-item-wrapper"
                 [class.has-children]="item.children && item.children.length > 0">
              
              <!-- Item Principal -->
              <a *ngIf="item.route && !item.children"
                 [routerLink]="item.route"
                 routerLinkActive="menu-item-active"
                 class="menu-item"
                 [class.menu-item-disabled]="item.disabled"
                 [title]="isMini ? item.label : ''">
                
                <span *ngIf="item.icon" class="material-symbols-outlined menu-icon">
                  {{ item.icon }}
                </span>
                
                <span *ngIf="!isMini" class="menu-label">{{ item.label }}</span>
                
                <span *ngIf="item.badge && !isMini" 
                      class="menu-badge"
                      [style.background]="item.badge.color || '#007bff'"
                      [class.badge-pulse]="item.badge.pulse">
                  {{ item.badge.value }}
                </span>
              </a>
              
              <!-- Item com Children (Expandible) -->
              <button *ngIf="item.children && item.children.length > 0"
                      type="button"
                      class="menu-item menu-item-expandable"
                      [class.menu-item-expanded]="item.expanded"
                      [class.menu-item-disabled]="item.disabled"
                      (click)="toggleItem(item)"
                      [title]="isMini ? item.label : ''">
                
                <span *ngIf="item.icon" class="material-symbols-outlined menu-icon">
                  {{ item.icon }}
                </span>
                
                <span *ngIf="!isMini" class="menu-label">{{ item.label }}</span>
                
                <span *ngIf="item.badge && !isMini" 
                      class="menu-badge"
                      [style.background]="item.badge.color || '#007bff'">
                  {{ item.badge.value }}
                </span>
                
                <span *ngIf="!isMini" class="material-symbols-outlined expand-icon">
                  {{ item.expanded ? 'expand_less' : 'expand_more' }}
                </span>
              </button>
              
              <!-- Item sem Route (Action) -->
              <button *ngIf="item.action && !item.route && !item.children"
                      type="button"
                      class="menu-item"
                      [class.menu-item-disabled]="item.disabled"
                      (click)="executeAction(item)"
                      [title]="isMini ? item.label : ''">
                
                <span *ngIf="item.icon" class="material-symbols-outlined menu-icon">
                  {{ item.icon }}
                </span>
                
                <span *ngIf="!isMini" class="menu-label">{{ item.label }}</span>
              </button>
              
              <!-- Submenu -->
              <div *ngIf="item.children && item.children.length > 0 && item.expanded && !isMini"
                   class="submenu"
                   [@expandCollapse]>
                <a *ngFor="let child of item.children"
                   [routerLink]="child.route"
                   routerLinkActive="menu-item-active"
                   class="submenu-item"
                   [class.submenu-item-disabled]="child.disabled">
                  
                  <span *ngIf="child.icon" class="material-symbols-outlined submenu-icon">
                    {{ child.icon }}
                  </span>
                  
                  <span class="submenu-label">{{ child.label }}</span>
                  
                  <span *ngIf="child.badge" 
                        class="menu-badge"
                        [style.background]="child.badge.color || '#007bff'">
                    {{ child.badge.value }}
                  </span>
                </a>
              </div>
            </div>
          </ng-container>
        </div>
      </nav>
      
      <!-- Quick Actions -->
      <div *ngIf="quickActions.length > 0" class="sidebar-footer">
        <div class="quick-actions">
          <button *ngFor="let action of quickActions"
                  type="button"
                  class="quick-action"
                  (click)="action.action()"
                  [title]="action.label">
            <span class="material-symbols-outlined">{{ action.icon }}</span>
            <span *ngIf="!isMini" class="action-label">{{ action.label }}</span>
          </button>
        </div>
      </div>
      
      <!-- Resize Handle -->
      <div *ngIf="resizable && mode === 'push' && !isMobile"
           class="resize-handle"
           (mousedown)="startResize($event)">
      </div>
    </aside>
  `,
  styles: [`
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200');
    
    :host {
      display: contents;
    }
    
    /* Mobile Menu Button */
    .mobile-menu-button {
      position: fixed;
      top: 1rem;
      left: 1rem;
      z-index: 998;
      width: 48px;
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: none;
      background: white;
      border-radius: 0.5rem;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
      cursor: pointer;
      color: #443A3A;
      transition: all 0.2s;
    }
    
    .mobile-menu-button:hover {
      background: #f3f4f6;
      transform: scale(1.05);
    }
    
    .mobile-menu-button:active {
      transform: scale(0.95);
    }
    
    /* Backdrop */
    .sidebar-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.5);
      z-index: 999;
      animation: fadeIn 0.2s ease;
    }
    
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    /* Sidebar */
    .sidebar {
      position: fixed;
      top: 0;
      bottom: 0;
      background: white;
      box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
      display: flex;
      flex-direction: column;
      font-family: "Montserrat", sans-serif;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      z-index: 1000;
    }
    
    .sidebar-left {
      left: 0;
    }
    
    .sidebar-right {
      right: 0;
      box-shadow: -2px 0 8px rgba(0, 0, 0, 0.1);
    }
    
    /* Modes */
    .sidebar-push {
      position: fixed;
    }
    
    .sidebar-overlay {
      transform: translateX(-100%);
    }
    
    .sidebar-overlay.sidebar-right {
      transform: translateX(100%);
    }
    
    .sidebar-overlay.sidebar-open {
      transform: translateX(0);
    }
    
    .sidebar-mini {
      width: 64px !important;
    }
    
    .sidebar-fixed {
      position: fixed;
    }
    
    /* Header */
    .sidebar-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem;
      border-bottom: 1px solid #e5e7eb;
      min-height: 64px;
    }
    
    .sidebar-logo {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      flex: 1;
    }
    
    .logo-icon {
      font-size: 2rem;
      color: #007bff;
    }
    
    .logo-title {
      font-size: 1.25rem;
      font-weight: 700;
      color: #443A3A;
    }
    
    .sidebar-mini .logo-title {
      display: none;
    }
    
    .toggle-button {
      width: 36px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: none;
      background: transparent;
      border-radius: 0.375rem;
      cursor: pointer;
      transition: all 0.2s;
      color: #6c757d;
    }
    
    .toggle-button:hover {
      background: #f3f4f6;
      color: #007bff;
    }
    
    /* User Profile */
    .sidebar-profile {
      padding: 1rem;
      display: flex;
      align-items: center;
      gap: 0.75rem;
      border-bottom: 1px solid #e5e7eb;
    }
    
    .profile-avatar {
      position: relative;
      width: 48px;
      height: 48px;
      border-radius: 50%;
      overflow: hidden;
      flex-shrink: 0;
    }
    
    .profile-avatar img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
    .avatar-placeholder {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      font-weight: 600;
      font-size: 1.125rem;
    }
    
    .status-indicator {
      position: absolute;
      bottom: 2px;
      right: 2px;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      border: 2px solid white;
    }
    
    .status-online {
      background: #28a745;
    }
    
    .status-offline {
      background: #6c757d;
    }
    
    .status-away {
      background: #ffc107;
    }
    
    .profile-info {
      flex: 1;
      min-width: 0;
    }
    
    .profile-name {
      font-weight: 600;
      color: #443A3A;
      font-size: 0.875rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    
    .profile-role {
      font-size: 0.75rem;
      color: #6c757d;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    
    .sidebar-profile-mini {
      padding: 0.5rem;
      display: flex;
      justify-content: center;
      border-bottom: 1px solid #e5e7eb;
    }
    
    .profile-avatar-mini {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      overflow: hidden;
    }
    
    .profile-avatar-mini img,
    .profile-avatar-mini .avatar-placeholder {
      width: 100%;
      height: 100%;
    }
    
    /* Menu */
    .sidebar-menu {
      flex: 1;
      overflow-y: auto;
      overflow-x: hidden;
    }
    
    .sidebar-menu::-webkit-scrollbar {
      width: 6px;
    }
    
    .sidebar-menu::-webkit-scrollbar-track {
      background: transparent;
    }
    
    .sidebar-menu::-webkit-scrollbar-thumb {
      background: #CED4DA;
      border-radius: 3px;
    }
    
    .menu-items {
      padding: 0.5rem;
    }
    
    .menu-separator {
      height: 1px;
      background: #e5e7eb;
      margin: 0.5rem 0;
    }
    
    .menu-item-wrapper {
      margin-bottom: 0.25rem;
    }
    
    .menu-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.75rem;
      border-radius: 0.5rem;
      text-decoration: none;
      color: #443A3A;
      transition: all 0.2s;
      cursor: pointer;
      border: none;
      background: transparent;
      width: 100%;
      font-family: "Montserrat", sans-serif;
      font-size: 0.875rem;
      font-weight: 500;
    }
    
    .menu-item:hover:not(.menu-item-disabled) {
      background: #f0f9ff;
      color: #007bff;
    }
    
    .menu-item-active {
      background: #007bff;
      color: white;
    }
    
    .menu-item-active:hover {
      background: #0056b3;
      color: white;
    }
    
    .menu-item-disabled {
      opacity: 0.5;
      cursor: not-allowed;
      pointer-events: none;
    }
    
    .menu-icon {
      font-size: 1.5rem;
      flex-shrink: 0;
    }
    
    .sidebar-mini .menu-item {
      justify-content: center;
      padding: 0.75rem;
    }
    
    .menu-label {
      flex: 1;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    
    .menu-badge {
      padding: 0.125rem 0.5rem;
      border-radius: 1rem;
      font-size: 0.75rem;
      font-weight: 600;
      color: white;
      background: #007bff;
    }
    
    .badge-pulse {
      animation: pulse 2s infinite;
    }
    
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.7; }
    }
    
    .expand-icon {
      font-size: 1.25rem;
      transition: transform 0.2s;
    }
    
    .menu-item-expanded .expand-icon {
      transform: rotate(180deg);
    }
    
    /* Submenu */
    .submenu {
      margin-top: 0.25rem;
      margin-left: 2.5rem;
      overflow: hidden;
    }
    
    .submenu-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.625rem 0.75rem;
      border-radius: 0.375rem;
      text-decoration: none;
      color: #6c757d;
      font-size: 0.875rem;
      transition: all 0.2s;
    }
    
    .submenu-item:hover:not(.submenu-item-disabled) {
      background: #f3f4f6;
      color: #007bff;
    }
    
    .submenu-item-active {
      background: #e6f7ff;
      color: #007bff;
      font-weight: 600;
    }
    
    .submenu-item-disabled {
      opacity: 0.5;
      cursor: not-allowed;
      pointer-events: none;
    }
    
    .submenu-icon {
      font-size: 1.25rem;
    }
    
    .submenu-label {
      flex: 1;
    }
    
    /* Footer */
    .sidebar-footer {
      border-top: 1px solid #e5e7eb;
      padding: 0.5rem;
    }
    
    .quick-actions {
      display: flex;
      gap: 0.5rem;
    }
    
    .sidebar-mini .quick-actions {
      flex-direction: column;
    }
    
    .quick-action {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      padding: 0.75rem;
      border: none;
      background: transparent;
      border-radius: 0.375rem;
      cursor: pointer;
      transition: all 0.2s;
      color: #6c757d;
      font-family: "Montserrat", sans-serif;
      font-size: 0.875rem;
      font-weight: 500;
    }
    
    .quick-action:hover {
      background: #f3f4f6;
      color: #007bff;
    }
    
    .sidebar-mini .quick-action {
      padding: 0.625rem;
    }
    
    .action-label {
      white-space: nowrap;
    }
    
    /* Resize Handle */
    .resize-handle {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      width: 4px;
      cursor: ew-resize;
      background: transparent;
      transition: background 0.2s;
    }
    
    .resize-handle:hover {
      background: #007bff;
    }
    
    /* Mobile */
    @media (max-width: 768px) {
      .sidebar {
        width: 85vw !important;
        max-width: 320px;
      }
    }
    
    .material-symbols-outlined {
      font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
      user-select: none;
    }
  `],
  animations: []
})
export class SidebarComponent implements OnInit, OnDestroy {
  @Input() mode: SidebarMode = 'push';
  @Input() position: SidebarPosition = 'left';
  @Input() width = 280;
  @Input() miniWidth = 64;
  @Input() minWidth = 200;
  @Input() maxWidth = 400;
  @Input() resizable = false;
  @Input() showToggle = true;
  @Input() title = '';
  @Input() logo = '';
  @Input() items: MenuItem[] = [];
  @Input() userProfile?: UserProfile;
  @Input() quickActions: QuickAction[] = [];
  @Input() saveState = true;
  @Input() stateKey = 'web-sidebar-state';
  
  @Output() modeChange = new EventEmitter<SidebarMode>();
  @Output() itemClick = new EventEmitter<MenuItem>();
  @Output() openChange = new EventEmitter<boolean>();
  
  isOpen = true;
  isMini = false;
  isMobile = false;
  currentWidth = 280;
  
  private resizing = false;
  private startX = 0;
  private startWidth = 0;
  private routerSubscription?: Subscription;
  
  constructor(private router: Router) {}

  ngOnInit() {
    this.currentWidth = this.width;
    this.checkMobile();
    this.loadState();
    this.setupRouterListener();
    
    // Se mobile, força overlay mode
    if (this.isMobile) {
      this.mode = 'overlay';
      this.isOpen = false;
    }
  }

  ngOnDestroy() {
    this.routerSubscription?.unsubscribe();
  }

  @HostListener('window:resize')
  onWindowResize() {
    this.checkMobile();
  }

  checkMobile() {
    const wasMobile = this.isMobile;
    this.isMobile = window.innerWidth <= 768;
    
    // Se mudou de desktop para mobile
    if (!wasMobile && this.isMobile) {
      this.mode = 'overlay';
      this.isOpen = false;
    }
    
    // Se mudou de mobile para desktop
    if (wasMobile && !this.isMobile) {
      this.mode = 'push';
      this.isOpen = true;
    }
  }

  setupRouterListener() {
    this.routerSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        if (this.isMobile && this.mode === 'overlay') {
          this.close();
        }
      });
  }

  toggleMini() {
    this.isMini = !this.isMini;
    this.currentWidth = this.isMini ? this.miniWidth : this.width;
    this.collapseAllItems();
    this.saveStateToStorage();
  }

  toggle() {
    this.isOpen = !this.isOpen;
    this.openChange.emit(this.isOpen);
    this.saveStateToStorage();
  }

  open() {
    this.isOpen = true;
    this.openChange.emit(true);
  }

  close() {
    this.isOpen = false;
    this.openChange.emit(false);
  }

  toggleItem(item: MenuItem) {
    if (this.isMini) return;
    
    item.expanded = !item.expanded;
    this.saveStateToStorage();
  }

  collapseAllItems() {
    this.items.forEach(item => {
      if (item.children) {
        item.expanded = false;
      }
    });
  }

  executeAction(item: MenuItem) {
    if (item.action && !item.disabled) {
      item.action();
      this.itemClick.emit(item);
    }
  }

  getInitials(name: string): string {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  }

  trackByLabel(index: number, item: MenuItem): string {
    return item.label || `separator-${index}`;
  }

  // Resize
  startResize(event: MouseEvent) {
    this.resizing = true;
    this.startX = event.clientX;
    this.startWidth = this.currentWidth;
    
    event.preventDefault();
    
    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
  }

  private onMouseMove = (event: MouseEvent) => {
    if (!this.resizing) return;
    
    const delta = this.position === 'left' 
      ? event.clientX - this.startX
      : this.startX - event.clientX;
    
    let newWidth = this.startWidth + delta;
    
    if (newWidth < this.minWidth) newWidth = this.minWidth;
    if (newWidth > this.maxWidth) newWidth = this.maxWidth;
    
    this.currentWidth = newWidth;
    this.width = newWidth;
  };

  private onMouseUp = () => {
    this.resizing = false;
    this.saveStateToStorage();
    
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
  };

  // State Management
  saveStateToStorage() {
    if (!this.saveState) return;
    
    const state = {
      isOpen: this.isOpen,
      isMini: this.isMini,
      width: this.currentWidth,
      expandedItems: this.getExpandedItemsState()
    };
    
    localStorage.setItem(this.stateKey, JSON.stringify(state));
  }

  loadState() {
    if (!this.saveState) return;
    
    const saved = localStorage.getItem(this.stateKey);
    if (!saved) return;
    
    try {
      const state = JSON.parse(saved);
      this.isOpen = state.isOpen ?? this.isOpen;
      this.isMini = state.isMini ?? this.isMini;
      this.currentWidth = state.width ?? this.currentWidth;
      
      if (state.expandedItems) {
        this.restoreExpandedItemsState(state.expandedItems);
      }
    } catch (e) {
      console.error('Error loading sidebar state:', e);
    }
  }

  getExpandedItemsState(): string[] {
    const expanded: string[] = [];
    
    const traverse = (items: MenuItem[]) => {
      items.forEach(item => {
        if (item.expanded && item.children && item.label) {
          expanded.push(item.label);
        }
      });
    };
    
    traverse(this.items);
    return expanded;
  }

  restoreExpandedItemsState(expanded: string[]) {
    const restore = (items: MenuItem[]) => {
      items.forEach(item => {
        if (item.children && item.label && expanded.includes(item.label)) {
          item.expanded = true;
        }
      });
    };
    
    restore(this.items);
  }
}