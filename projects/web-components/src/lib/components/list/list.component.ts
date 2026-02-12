import {
  Component,
  Input,
  Output,
  EventEmitter,
  ContentChildren,
  QueryList,
  AfterContentInit
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

export type ListVariant = 'default' | 'bordered' | 'stripped' | 'card';
export type ListSize = 'small' | 'medium' | 'large';
export type ListDividerStyle = 'solid' | 'dashed' | 'dotted' | 'none';

export interface ListItemAction {
  icon: string;
  label?: string;
  color?: string;
  disabled?: boolean;
  action: (item: any) => void;
}

@Component({
  selector: 'web-list-item',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="list-item"
         [class.list-item-clickable]="clickable || routerLink"
         [class.list-item-selected]="selected"
         [class.list-item-disabled]="disabled"
         [style.background]="backgroundColor"
         [style.borderColor]="borderColor"
         (click)="handleClick($event)">

      <!-- Leading Content -->
      <div *ngIf="hasLeading" class="list-item-leading">
        <!-- Avatar -->
        <div *ngIf="avatar" class="list-item-avatar" [style.background]="avatarColor">
          <img *ngIf="avatar.startsWith('http')" [src]="avatar" [alt]="title">
          <div *ngIf="!avatar.startsWith('http')" class="avatar-text">{{ avatar }}</div>
        </div>

        <!-- Icon -->
        <span *ngIf="icon && !avatar"
              class="material-symbols-outlined list-item-icon"
              [style.color]="iconColor">
          {{ icon }}
        </span>

        <!-- Custom Leading Slot -->
        <ng-content select="[leading]"></ng-content>
      </div>

      <!-- Content -->
      <div class="list-item-content">
        <div class="list-item-main">
          <div class="list-item-title" [style.color]="titleColor">
            {{ title }}
            <span *ngIf="badge"
                  class="list-item-badge"
                  [style.background]="badgeColor || '#007bff'">
              {{ badge }}
            </span>
          </div>
          <div *ngIf="subtitle" class="list-item-subtitle" [style.color]="subtitleColor">
            {{ subtitle }}
          </div>
        </div>

        <div *ngIf="description" class="list-item-description" [style.color]="descriptionColor">
          {{ description }}
        </div>

        <!-- Custom Content Slot -->
        <ng-content></ng-content>
      </div>

      <!-- Trailing Content -->
      <div *ngIf="hasTrailing" class="list-item-trailing">
        <!-- Meta text -->
        <span *ngIf="meta" class="list-item-meta" [style.color]="metaColor">
          {{ meta }}
        </span>

        <!-- Actions -->
        <div *ngIf="actions.length > 0" class="list-item-actions">
          <button *ngFor="let action of actions"
                  type="button"
                  class="list-item-action-btn"
                  [disabled]="action.disabled"
                  [title]="action.label || ''"
                  [style.color]="action.color"
                  (click)="executeAction(action, $event)">
            <span class="material-symbols-outlined">{{ action.icon }}</span>
          </button>
        </div>

        <!-- Chevron -->
        <span *ngIf="showChevron"
              class="material-symbols-outlined list-item-chevron"
              [style.color]="chevronColor">
          chevron_right
        </span>

        <!-- Custom Trailing Slot -->
        <ng-content select="[trailing]"></ng-content>
      </div>
    </div>
  `,
  styles: [`
    .list-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 16px;
      transition: all 0.2s;
      position: relative;
    }

    .list-item-clickable {
      cursor: pointer;
    }

    .list-item-clickable:hover {
      background: rgba(0, 0, 0, 0.04);
    }

    .list-item-clickable:active {
      background: rgba(0, 0, 0, 0.08);
    }

    .list-item-selected {
      background: rgba(0, 123, 255, 0.08);
    }

    .list-item-disabled {
      opacity: 0.5;
      pointer-events: none;
    }

    /* Leading */
    .list-item-leading {
      display: flex;
      align-items: center;
      flex-shrink: 0;
    }

    .list-item-avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #e0e0e0;
    }

    .list-item-avatar img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .avatar-text {
      font-size: 16px;
      font-weight: 600;
      color: white;
    }

    .list-item-icon {
      font-size: 24px;
      color: #666;
    }

    /* Content */
    .list-item-content {
      flex: 1;
      min-width: 0;
    }

    .list-item-main {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 4px;
    }

    .list-item-title {
      font-size: 15px;
      font-weight: 500;
      color: #1a1a1a;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .list-item-subtitle {
      font-size: 13px;
      color: #666;
    }

    .list-item-description {
      font-size: 13px;
      color: #888;
      margin-top: 4px;
      line-height: 1.4;
    }

    .list-item-badge {
      display: inline-block;
      padding: 2px 8px;
      border-radius: 12px;
      font-size: 11px;
      font-weight: 600;
      color: white;
    }

    /* Trailing */
    .list-item-trailing {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-shrink: 0;
    }

    .list-item-meta {
      font-size: 13px;
      color: #888;
      white-space: nowrap;
    }

    .list-item-actions {
      display: flex;
      gap: 4px;
    }

    .list-item-action-btn {
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: transparent;
      border: none;
      border-radius: 50%;
      cursor: pointer;
      transition: background 0.2s;
      color: #666;
    }

    .list-item-action-btn:hover:not(:disabled) {
      background: rgba(0, 0, 0, 0.08);
    }

    .list-item-action-btn:disabled {
      opacity: 0.3;
      cursor: not-allowed;
    }

    .list-item-action-btn .material-symbols-outlined {
      font-size: 20px;
    }

    .list-item-chevron {
      font-size: 20px;
      color: #ccc;
    }

    .material-symbols-outlined {
      font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
      user-select: none;
    }
  `]
})
export class ListItemComponent {
  @Input() title = '';
  @Input() subtitle = '';
  @Input() description = '';
  @Input() avatar = '';
  @Input() icon = '';
  @Input() badge = '';
  @Input() meta = '';
  @Input() clickable = false;
  @Input() selected = false;
  @Input() disabled = false;
  @Input() showChevron = false;
  @Input() routerLink?: string;
  @Input() actions: ListItemAction[] = [];
  @Input() value?: any;

  // Color customization
  @Input() backgroundColor = '';
  @Input() borderColor = '';
  @Input() titleColor = '';
  @Input() subtitleColor = '';
  @Input() descriptionColor = '';
  @Input() iconColor = '';
  @Input() avatarColor = '';
  @Input() badgeColor = '';
  @Input() metaColor = '';
  @Input() chevronColor = '';

  @Output() itemClick = new EventEmitter<any>();

  get hasLeading(): boolean {
    return !!(this.avatar || this.icon);
  }

  get hasTrailing(): boolean {
    return !!(this.meta || this.actions.length > 0 || this.showChevron);
  }

  handleClick(event: MouseEvent) {
    if (!this.disabled && (this.clickable || this.routerLink)) {
      this.itemClick.emit(this.value || this);
    }
  }

  executeAction(action: ListItemAction, event: MouseEvent) {
    event.stopPropagation();
    if (!action.disabled) {
      action.action(this.value || this);
    }
  }
}

@Component({
  selector: 'web-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="list-container"
         [class]="'list-' + variant + ' list-' + size"
         [class.list-bordered]="bordered"
         [class.list-hoverable]="hoverable"
         [style.background]="backgroundColor"
         [style.borderColor]="borderColor">

      <!-- Header -->
      <div *ngIf="title || subtitle || headerActions.length > 0"
           class="list-header"
           [style.background]="headerBackgroundColor"
           [style.borderColor]="borderColor">
        <div class="list-header-content">
          <div class="list-header-titles">
            <h3 *ngIf="title" class="list-title" [style.color]="titleColor">
              {{ title }}
              <span *ngIf="badge"
                    class="list-badge"
                    [style.background]="badgeColor || '#007bff'">
                {{ badge }}
              </span>
            </h3>
            <p *ngIf="subtitle" class="list-subtitle" [style.color]="subtitleColor">
              {{ subtitle }}
            </p>
          </div>
        </div>

        <div *ngIf="headerActions.length > 0" class="list-header-actions">
          <button *ngFor="let action of headerActions"
                  type="button"
                  class="list-header-action-btn"
                  [disabled]="action.disabled"
                  [title]="action.label || ''"
                  (click)="action.action()">
            <span class="material-symbols-outlined">{{ action.icon }}</span>
          </button>
        </div>
      </div>

      <!-- Loading State -->
      <div *ngIf="loading" class="list-loading">
        <div class="list-spinner"></div>
        <p>{{ loadingText }}</p>
      </div>

      <!-- Empty State -->
      <div *ngIf="!loading && empty"
           class="list-empty"
           [style.color]="emptyTextColor">
        <span *ngIf="emptyIcon" class="material-symbols-outlined list-empty-icon">
          {{ emptyIcon }}
        </span>
        <p>{{ emptyText }}</p>
      </div>

      <!-- Items -->
      <div *ngIf="!loading && !empty"
           class="list-items"
           [class]="'list-divider-' + dividerStyle">
        <ng-content></ng-content>
      </div>

      <!-- Footer -->
      <div *ngIf="showFooter"
           class="list-footer"
           [style.background]="footerBackgroundColor"
           [style.borderColor]="borderColor">
        <ng-content select="[footer]"></ng-content>

        <div *ngIf="footerText" [style.color]="footerTextColor">
          {{ footerText }}
        </div>
      </div>
    </div>
  `,
  styles: [`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200');

    :host {
      display: block;
      font-family: 'Inter', system-ui, -apple-system, sans-serif;
    }

    /* Container */
    .list-container {
      background: white;
      border-radius: 8px;
      overflow: hidden;
    }

    /* Variants */
    .list-default {
      /* Clean, no border */
    }

    .list-bordered {
      border: 1px solid #e0e0e0;
    }

    .list-stripped ::ng-deep .list-item:nth-child(even) {
      background: rgba(0, 0, 0, 0.02);
    }

    .list-card {
      border: 1px solid #e0e0e0;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
    }

    /* Sizes */
    .list-small ::ng-deep .list-item {
      padding: 8px 12px;
      font-size: 13px;
    }

    .list-small ::ng-deep .list-item-avatar {
      width: 32px;
      height: 32px;
    }

    .list-medium ::ng-deep .list-item {
      padding: 12px 16px;
      font-size: 14px;
    }

    .list-medium ::ng-deep .list-item-avatar {
      width: 40px;
      height: 40px;
    }

    .list-large ::ng-deep .list-item {
      padding: 16px 20px;
      font-size: 15px;
    }

    .list-large ::ng-deep .list-item-avatar {
      width: 48px;
      height: 48px;
    }

    /* Hoverable */
    .list-hoverable ::ng-deep .list-item {
      cursor: pointer;
    }

    /* Header */
    .list-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 20px;
      border-bottom: 1px solid #e0e0e0;
      background: #fafafa;
    }

    .list-header-content {
      flex: 1;
      min-width: 0;
    }

    .list-header-titles {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .list-title {
      margin: 0;
      font-size: 18px;
      font-weight: 600;
      color: #1a1a1a;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .list-subtitle {
      margin: 0;
      font-size: 13px;
      color: #666;
    }

    .list-badge {
      display: inline-block;
      padding: 2px 10px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: 600;
      color: white;
    }

    .list-header-actions {
      display: flex;
      gap: 4px;
    }

    .list-header-action-btn {
      width: 36px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: transparent;
      border: none;
      border-radius: 50%;
      cursor: pointer;
      transition: background 0.2s;
      color: #666;
    }

    .list-header-action-btn:hover:not(:disabled) {
      background: rgba(0, 0, 0, 0.08);
    }

    .list-header-action-btn:disabled {
      opacity: 0.3;
      cursor: not-allowed;
    }

    /* Loading */
    .list-loading {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 48px 20px;
      gap: 16px;
    }

    .list-spinner {
      width: 40px;
      height: 40px;
      border: 4px solid #e0e0e0;
      border-top-color: #007bff;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    .list-loading p {
      margin: 0;
      color: #666;
      font-size: 14px;
    }

    /* Empty */
    .list-empty {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 48px 20px;
      gap: 12px;
      color: #999;
    }

    .list-empty-icon {
      font-size: 48px;
      opacity: 0.5;
    }

    .list-empty p {
      margin: 0;
      font-size: 14px;
    }

    /* Items */
    .list-items {
      /* No default styling */
    }

    /* Dividers */
    .list-divider-solid ::ng-deep .list-item:not(:last-child) {
      border-bottom: 1px solid #e0e0e0;
    }

    .list-divider-dashed ::ng-deep .list-item:not(:last-child) {
      border-bottom: 1px dashed #e0e0e0;
    }

    .list-divider-dotted ::ng-deep .list-item:not(:last-child) {
      border-bottom: 1px dotted #e0e0e0;
    }

    /* Footer */
    .list-footer {
      padding: 12px 20px;
      border-top: 1px solid #e0e0e0;
      background: #fafafa;
      font-size: 13px;
      color: #666;
      text-align: center;
    }

    .material-symbols-outlined {
      font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
      user-select: none;
    }
  `]
})
export class ListComponent implements AfterContentInit {
  @ContentChildren(ListItemComponent) items!: QueryList<ListItemComponent>;

  @Input() variant: ListVariant = 'default';
  @Input() size: ListSize = 'medium';
  @Input() dividerStyle: ListDividerStyle = 'solid';
  @Input() title = '';
  @Input() subtitle = '';
  @Input() badge = '';
  @Input() bordered = false;
  @Input() hoverable = false;
  @Input() loading = false;
  @Input() loadingText = 'Carregando...';
  @Input() empty = false;
  @Input() emptyText = 'Nenhum item encontrado';
  @Input() emptyIcon = 'inbox';
  @Input() showFooter = false;
  @Input() footerText = '';
  @Input() headerActions: ListItemAction[] = [];

  // Color customization
  @Input() backgroundColor = '';
  @Input() borderColor = '';
  @Input() headerBackgroundColor = '';
  @Input() footerBackgroundColor = '';
  @Input() titleColor = '';
  @Input() subtitleColor = '';
  @Input() badgeColor = '';
  @Input() emptyTextColor = '';
  @Input() footerTextColor = '';

  ngAfterContentInit() {
    // Auto-detect empty state if not explicitly set
    if (!this.loading) {
      this.items.changes.subscribe(() => {
        this.empty = this.items.length === 0;
      });
      this.empty = this.items.length === 0;
    }
  }
}
