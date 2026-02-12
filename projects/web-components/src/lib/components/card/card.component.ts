import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostListener,
  HostBinding
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

export type CardVariant = 'elevated' | 'outlined' | 'filled' | 'ghost';
export type CardSize = 'small' | 'medium' | 'large';
export type CardImagePosition = 'top' | 'left' | 'right' | 'background';

export interface CardAction {
  label: string;
  icon?: string;
  variant?: 'primary' | 'secondary' | 'text';
  disabled?: boolean;
  loading?: boolean;
  action: () => void;
}

export interface CardBadge {
  text: string;
  color?: string;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  pulse?: boolean;
}

@Component({
  selector: 'web-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <article class="card"
             [class]="'card-' + variant + ' card-' + size"
             [class.card-hoverable]="hoverable"
             [class.card-selected]="selected"
             [class.card-loading]="loading"
             [class.card-clickable]="clickable || routerLink"
             [class.card-horizontal]="imagePosition === 'left' || imagePosition === 'right'"
             [style.background]="backgroundColor"
             [style.borderColor]="borderColor"
             (click)="handleCardClick($event)">

      <!-- Loading Overlay -->
      <div *ngIf="loading" class="card-loading-overlay">
        <div class="card-spinner"></div>
      </div>

      <!-- Badge -->
      <div *ngIf="badge"
           class="card-badge"
           [class]="'badge-' + (badge.position || 'top-right')"
           [class.badge-pulse]="badge.pulse"
           [style.background]="badge.color || '#007bff'">
        {{ badge.text }}
      </div>

      <!-- Image (Top/Background) -->
      <div *ngIf="image && (imagePosition === 'top' || imagePosition === 'background')"
           class="card-media"
           [class.card-media-background]="imagePosition === 'background'"
           [style.background-image]="'url(' + image + ')'"
           [style.height.px]="imageHeight">

        <div *ngIf="imageOverlay && imagePosition === 'background'" class="card-media-overlay"></div>

        <!-- Media Actions (only for top/background images) -->
        <div *ngIf="mediaActions.length > 0" class="card-media-actions">
          <button *ngFor="let action of mediaActions"
                  type="button"
                  class="media-action-button"
                  [disabled]="action.disabled"
                  (click)="executeAction(action, $event)"
                  [title]="action.label">
            <span *ngIf="action.icon" class="material-symbols-outlined">{{ action.icon }}</span>
          </button>
        </div>
      </div>

      <!-- Content Wrapper (for horizontal layout) -->
      <div class="card-content-wrapper">

        <!-- Image (Left/Right) -->
        <div *ngIf="image && (imagePosition === 'left' || imagePosition === 'right')"
             class="card-media card-media-side"
             [class.card-media-left]="imagePosition === 'left'"
             [class.card-media-right]="imagePosition === 'right'"
             [style.background-image]="'url(' + image + ')'"
             [style.width.px]="imageWidth">
        </div>

        <!-- Main Content -->
        <div class="card-body" [class.card-body-with-bg-image]="imagePosition === 'background'">

          <!-- Header -->
          <div *ngIf="title || subtitle || headerActions.length > 0" class="card-header">
            <div class="card-header-content">
              <div *ngIf="avatar" class="card-avatar">
                <img *ngIf="avatar.startsWith('http')" [src]="avatar" [alt]="title">
                <div *ngIf="!avatar.startsWith('http')" class="avatar-placeholder">{{ avatar }}</div>
              </div>

              <div class="card-titles">
                <h3 *ngIf="title" class="card-title">{{ title }}</h3>
                <p *ngIf="subtitle" class="card-subtitle">{{ subtitle }}</p>
              </div>
            </div>

            <div *ngIf="headerActions.length > 0" class="card-header-actions">
              <button *ngFor="let action of headerActions"
                      type="button"
                      class="header-action-button"
                      [disabled]="action.disabled"
                      (click)="executeAction(action, $event)"
                      [title]="action.label">
                <span *ngIf="action.icon" class="material-symbols-outlined">{{ action.icon }}</span>
              </button>
            </div>
          </div>

          <!-- Content -->
          <div class="card-content">
            <ng-content></ng-content>
          </div>

          <!-- Footer with Actions -->
          <div *ngIf="actions.length > 0" class="card-footer">
            <button *ngFor="let action of actions"
                    type="button"
                    [class]="'card-action card-action-' + (action.variant || 'text')"
                    [disabled]="action.disabled || action.loading"
                    (click)="executeAction(action, $event)">

              <span *ngIf="action.loading" class="action-spinner"></span>
              <span *ngIf="action.icon && !action.loading" class="material-symbols-outlined action-icon">
                {{ action.icon }}
              </span>
              <span class="action-label">{{ action.label }}</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Selection Indicator -->
      <div *ngIf="selectable" class="card-selection-indicator">
        <span class="material-symbols-outlined">
          {{ selected ? 'check_circle' : 'radio_button_unchecked' }}
        </span>
      </div>

      <!-- Ribbon (decorative) -->
      <div *ngIf="ribbon"
           class="card-ribbon"
           [style.background]="ribbonColor || '#007bff'">
        {{ ribbon }}
      </div>
    </article>
  `,
  styles: [`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200');

    :host {
      display: block;
    }

    /* Base Card */
    .card {
      position: relative;
      display: flex;
      flex-direction: column;
      background: white;
      border-radius: 12px;
      overflow: hidden;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      font-family: 'Inter', system-ui, -apple-system, sans-serif;
      color: #1a1a1a;
    }

    /* Variants */
    .card-elevated {
      box-shadow:
        0 1px 3px rgba(0, 0, 0, 0.12),
        0 1px 2px rgba(0, 0, 0, 0.24);
    }

    .card-elevated:hover {
      box-shadow:
        0 10px 20px rgba(0, 0, 0, 0.15),
        0 6px 6px rgba(0, 0, 0, 0.10);
    }

    .card-outlined {
      border: 1px solid #e0e0e0;
      box-shadow: none;
    }

    .card-outlined:hover {
      border-color: #007bff;
      box-shadow: 0 4px 8px rgba(0, 123, 255, 0.1);
    }

    .card-filled {
      background: linear-gradient(135deg, #f5f7fa 0%, #e8ecf1 100%);
      border: none;
      box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.05);
    }

    .card-ghost {
      background: transparent;
      border: 2px dashed #d0d0d0;
      box-shadow: none;
    }

    .card-ghost:hover {
      border-color: #007bff;
      background: rgba(0, 123, 255, 0.03);
    }

    /* Sizes */
    .card-small {
      font-size: 14px;
    }

    .card-small .card-body {
      padding: 12px;
    }

    .card-medium {
      font-size: 15px;
    }

    .card-medium .card-body {
      padding: 20px;
    }

    .card-large {
      font-size: 16px;
    }

    .card-large .card-body {
      padding: 24px;
    }

    /* Hoverable */
    .card-hoverable {
      cursor: pointer;
      transform: translateY(0);
    }

    .card-hoverable:hover {
      transform: translateY(-4px);
    }

    .card-hoverable:active {
      transform: translateY(-2px);
    }

    /* Clickable */
    .card-clickable {
      cursor: pointer;
    }

    /* Selected State */
    .card-selected {
      outline: 3px solid #007bff;
      outline-offset: -3px;
    }

    /* Loading State */
    .card-loading {
      pointer-events: none;
      opacity: 0.6;
    }

    .card-loading-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(255, 255, 255, 0.9);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10;
    }

    .card-spinner {
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

    /* Badge */
    .card-badge {
      position: absolute;
      z-index: 5;
      padding: 4px 12px;
      border-radius: 16px;
      font-size: 12px;
      font-weight: 600;
      color: white;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
      white-space: nowrap;
    }

    .badge-top-left {
      top: 12px;
      left: 12px;
    }

    .badge-top-right {
      top: 12px;
      right: 12px;
    }

    .badge-bottom-left {
      bottom: 12px;
      left: 12px;
    }

    .badge-bottom-right {
      bottom: 12px;
      right: 12px;
    }

    .badge-pulse {
      animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }

    @keyframes pulse {
      0%, 100% {
        opacity: 1;
      }
      50% {
        opacity: 0.7;
      }
    }

    /* Ribbon */
    .card-ribbon {
      position: absolute;
      top: 16px;
      right: -32px;
      width: 120px;
      padding: 4px 0;
      text-align: center;
      font-size: 12px;
      font-weight: 600;
      color: white;
      transform: rotate(45deg);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
      z-index: 5;
    }

    /* Media */
    .card-media {
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      position: relative;
      flex-shrink: 0;
    }

    .card-media:not(.card-media-background) {
      height: 200px;
    }

    .card-media-background {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 0;
    }

    .card-media-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0) 0%,
        rgba(0, 0, 0, 0.7) 100%
      );
    }

    .card-media-actions {
      position: absolute;
      top: 12px;
      right: 12px;
      display: flex;
      gap: 8px;
    }

    .media-action-button {
      width: 36px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(255, 255, 255, 0.95);
      border: none;
      border-radius: 50%;
      cursor: pointer;
      transition: all 0.2s;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    }

    .media-action-button:hover {
      background: white;
      transform: scale(1.1);
    }

    .media-action-button:active {
      transform: scale(0.95);
    }

    .media-action-button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .media-action-button .material-symbols-outlined {
      font-size: 20px;
      color: #1a1a1a;
    }

    /* Horizontal Layout */
    .card-horizontal {
      flex-direction: row;
    }

    .card-content-wrapper {
      display: flex;
      flex: 1;
      min-width: 0;
    }

    .card-media-side {
      width: 200px;
      height: auto;
    }

    .card-media-left {
      order: -1;
    }

    .card-media-right {
      order: 1;
    }

    /* Body */
    .card-body {
      display: flex;
      flex-direction: column;
      flex: 1;
      min-width: 0;
      position: relative;
    }

    .card-body-with-bg-image {
      z-index: 1;
      color: white;
    }

    .card-body-with-bg-image .card-title {
      color: white;
    }

    .card-body-with-bg-image .card-subtitle {
      color: rgba(255, 255, 255, 0.9);
    }

    /* Header */
    .card-header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 12px;
      margin-bottom: 16px;
    }

    .card-header-content {
      display: flex;
      align-items: center;
      gap: 12px;
      flex: 1;
      min-width: 0;
    }

    .card-avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      overflow: hidden;
      flex-shrink: 0;
      background: #e0e0e0;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .card-avatar img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .avatar-placeholder {
      font-size: 16px;
      font-weight: 600;
      color: #666;
    }

    .card-titles {
      flex: 1;
      min-width: 0;
    }

    .card-title {
      margin: 0;
      font-size: 1.2em;
      font-weight: 600;
      line-height: 1.4;
      color: #1a1a1a;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }

    .card-subtitle {
      margin: 4px 0 0 0;
      font-size: 0.9em;
      color: #666;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .card-header-actions {
      display: flex;
      gap: 4px;
      flex-shrink: 0;
    }

    .header-action-button {
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

    .header-action-button:hover {
      background: rgba(0, 0, 0, 0.05);
    }

    .header-action-button:active {
      background: rgba(0, 0, 0, 0.1);
    }

    .header-action-button:disabled {
      opacity: 0.3;
      cursor: not-allowed;
    }

    .header-action-button .material-symbols-outlined {
      font-size: 20px;
    }

    /* Content */
    .card-content {
      flex: 1;
      font-size: 1em;
      line-height: 1.6;
      color: #4a4a4a;
      overflow: hidden;
    }

    .card-body-with-bg-image .card-content {
      color: rgba(255, 255, 255, 0.95);
    }

    /* Footer */
    .card-footer {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 16px;
      padding-top: 16px;
      border-top: 1px solid rgba(0, 0, 0, 0.08);
    }

    .card-body-with-bg-image .card-footer {
      border-top-color: rgba(255, 255, 255, 0.2);
    }

    .card-action {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 8px 16px;
      border: none;
      border-radius: 6px;
      font-size: 0.9em;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s;
      white-space: nowrap;
    }

    .card-action:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .card-action-primary {
      background: #007bff;
      color: white;
    }

    .card-action-primary:hover:not(:disabled) {
      background: #0056b3;
      box-shadow: 0 2px 8px rgba(0, 123, 255, 0.3);
    }

    .card-action-secondary {
      background: #6c757d;
      color: white;
    }

    .card-action-secondary:hover:not(:disabled) {
      background: #545b62;
    }

    .card-action-text {
      background: transparent;
      color: #007bff;
    }

    .card-action-text:hover:not(:disabled) {
      background: rgba(0, 123, 255, 0.08);
    }

    .card-body-with-bg-image .card-action-text {
      color: white;
    }

    .card-body-with-bg-image .card-action-text:hover:not(:disabled) {
      background: rgba(255, 255, 255, 0.15);
    }

    .action-spinner {
      width: 14px;
      height: 14px;
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-top-color: white;
      border-radius: 50%;
      animation: spin 0.6s linear infinite;
    }

    .action-icon {
      font-size: 18px;
    }

    .action-label {
      line-height: 1;
    }

    /* Selection Indicator */
    .card-selection-indicator {
      position: absolute;
      top: 12px;
      left: 12px;
      z-index: 5;
    }

    .card-selection-indicator .material-symbols-outlined {
      font-size: 24px;
      color: #007bff;
      filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
    }

    /* Material Symbols */
    .material-symbols-outlined {
      font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
      user-select: none;
    }

    /* Responsive */
    @media (max-width: 768px) {
      .card-horizontal {
        flex-direction: column;
      }

      .card-media-side {
        width: 100%;
        height: 200px;
      }

      .card-footer {
        flex-direction: column;
      }

      .card-action {
        width: 100%;
        justify-content: center;
      }
    }
  `]
})
export class CardComponent {
  @Input() variant: CardVariant = 'elevated';
  @Input() size: CardSize = 'medium';
  @Input() title = '';
  @Input() subtitle = '';
  @Input() avatar = '';
  @Input() image = '';
  @Input() imagePosition: CardImagePosition = 'top';
  @Input() imageHeight = 200;
  @Input() imageWidth = 200;
  @Input() imageOverlay = false;
  @Input() hoverable = false;
  @Input() clickable = false;
  @Input() selectable = false;
  @Input() selected = false;
  @Input() loading = false;
  @Input() badge?: CardBadge;
  @Input() ribbon = '';
  @Input() ribbonColor = '';
  @Input() routerLink?: string;
  @Input() actions: CardAction[] = [];
  @Input() headerActions: CardAction[] = [];
  @Input() mediaActions: CardAction[] = [];
  @Input() backgroundColor = '';
  @Input() borderColor = '';

  @Output() cardClick = new EventEmitter<MouseEvent>();
  @Output() selectedChange = new EventEmitter<boolean>();

  @HostBinding('style.width')
  @Input() width?: string;

  @HostBinding('style.max-width')
  @Input() maxWidth?: string;

  handleCardClick(event: MouseEvent) {
    if (this.loading) return;

    if (this.selectable) {
      this.selected = !this.selected;
      this.selectedChange.emit(this.selected);
    }

    if (this.clickable || this.routerLink) {
      this.cardClick.emit(event);
    }
  }

  executeAction(action: CardAction, event: MouseEvent) {
    event.stopPropagation();
    if (!action.disabled && !action.loading) {
      action.action();
    }
  }
}
