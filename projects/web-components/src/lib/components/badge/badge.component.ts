import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostBinding
} from '@angular/core';
import { CommonModule } from '@angular/common';

export type BadgeVariant = 'solid' | 'soft' | 'outline' | 'gradient';
export type BadgeSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type BadgeShape = 'rounded' | 'square' | 'pill';
export type BadgePosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';

@Component({
  selector: 'web-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span class="badge-wrapper" [style.display]="inline ? 'inline-flex' : 'flex'">
      <!-- Content (when badge is positioned) -->
      <span *ngIf="position" class="badge-content">
        <ng-content></ng-content>
      </span>

      <!-- Badge -->
      <span class="badge"
            [class]="'badge-' + variant + ' badge-' + size + ' badge-' + shape"
            [class.badge-positioned]="position"
            [class]="position ? 'badge-position-' + position : ''"
            [class.badge-dot]="dot"
            [class.badge-pulse]="pulse"
            [class.badge-clickable]="clickable"
            [style.background]="getBackground()"
            [style.color]="textColor"
            [style.borderColor]="borderColor"
            (click)="handleClick($event)">

        <!-- Icon (leading) -->
        <span *ngIf="iconLeft && !dot"
              class="material-symbols-outlined badge-icon badge-icon-left"
              [style.color]="iconColor || textColor">
          {{ iconLeft }}
        </span>

        <!-- Content -->
        <span *ngIf="!dot" class="badge-text">
          {{ label }}
          <ng-content *ngIf="!label"></ng-content>
        </span>

        <!-- Icon (trailing) -->
        <span *ngIf="iconRight && !dot"
              class="material-symbols-outlined badge-icon badge-icon-right"
              [style.color]="iconColor || textColor">
          {{ iconRight }}
        </span>

        <!-- Close button -->
        <button *ngIf="removable && !dot"
                type="button"
                class="badge-close"
                (click)="handleRemove($event)"
                [style.color]="textColor">
          <span class="material-symbols-outlined">close</span>
        </button>

        <!-- Pulse animation (for dot) -->
        <span *ngIf="dot && pulse" class="badge-pulse-ring"></span>
      </span>

      <!-- Content (when badge is NOT positioned - standalone) -->
      <ng-content *ngIf="!position"></ng-content>
    </span>
  `,
  styles: [`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200');

    :host {
      font-family: 'Inter', system-ui, -apple-system, sans-serif;
    }

    /* Wrapper */
    .badge-wrapper {
      position: relative;
      width: fit-content;
    }

    /* Badge base */
    .badge {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 3px;
      font-weight: 600;
      white-space: nowrap;
      transition: all 0.2s;
      position: relative;
      border-radius: 5px;
    }

    /* Sizes */
    .badge-xs {
      font-size: 10px;
      padding: 2px 6px;
      line-height: 1.2;
    }

    .badge-xs .badge-icon {
      font-size: 12px;
    }

    .badge-sm {
      font-size: 11px;
      padding: 3px 8px;
      line-height: 1.3;
    }

    .badge-sm .badge-icon {
      font-size: 14px;
    }

    .badge-md {
      font-size: 12px;
      padding: 4px 10px;
      line-height: 1.4;
    }

    .badge-md .badge-icon {
      font-size: 16px;
    }

    .badge-lg {
      font-size: 14px;
      padding: 6px 12px;
      line-height: 1.5;
    }

    .badge-lg .badge-icon {
      font-size: 18px;
    }

    .badge-xl {
      font-size: 16px;
      padding: 8px 16px;
      line-height: 1.6;
    }

    .badge-xl .badge-icon {
      font-size: 20px;
    }

    /* Shapes */
    .badge-rounded {
      border-radius: 6px;
    }

    .badge-square {
      border-radius: 2px;
    }

    .badge-pill {
      border-radius: 9999px;
    }

    /* Variants */
    .badge-solid {
      color: white;
    }

    .badge-soft {
      /* Colors set via bindings */
    }

    .badge-outline {
      background: transparent !important;
      border: 1.5px solid currentColor;
    }

    .badge-gradient {
      color: white;
      /* Gradient set via bindings */
    }

    /* Positioned badges */
    .badge-content {
      position: relative;
    }

    .badge-positioned {
      position: absolute;
      z-index: 10;
    }

    .badge-position-top-right {
      top: 0;
      right: 0;
      transform: translate(50%, -50%);
    }

    .badge-position-top-left {
      top: 0;
      left: 0;
      transform: translate(-50%, -50%);
    }

    .badge-position-bottom-right {
      bottom: 0;
      right: 0;
      transform: translate(50%, 50%);
    }

    .badge-position-bottom-left {
      bottom: 0;
      left: 0;
      transform: translate(-50%, 50%);
    }

    /* Dot badge */
    .badge-dot {
      width: 10px;
      height: 10px;
      padding: 0;
      border-radius: 50%;
      min-width: 10px;
    }

    .badge-dot.badge-sm {
      width: 8px;
      height: 8px;
      min-width: 8px;
    }

    .badge-dot.badge-md {
      width: 10px;
      height: 10px;
      min-width: 10px;
    }

    .badge-dot.badge-lg {
      width: 12px;
      height: 12px;
      min-width: 12px;
    }

    .badge-dot.badge-xl {
      width: 14px;
      height: 14px;
      min-width: 14px;
    }

    /* Pulse animation */
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

    .badge-pulse-ring {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 100%;
      height: 100%;
      border-radius: 50%;
      border: 2px solid currentColor;
      animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
      opacity: 0.75;
    }

    @keyframes ping {
      75%, 100% {
        transform: translate(-50%, -50%) scale(2);
        opacity: 0;
      }
    }

    /* Icons */
    .badge-icon {
      display: inline-flex;
      align-items: center;
      line-height: 1;
    }

    .badge-icon-left {
      margin-left: -2px;
    }

    .badge-icon-right {
      margin-right: -2px;
    }

    /* Close button */
    .badge-close {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background: transparent;
      border: none;
      padding: 0;
      margin-left: 4px;
      margin-right: -4px;
      cursor: pointer;
      border-radius: 50%;
      transition: background 0.2s;
      width: 16px;
      height: 16px;
    }

    .badge-close:hover {
      background: rgba(0, 0, 0, 0.1);
    }

    .badge-close .material-symbols-outlined {
      font-size: 14px;
    }

    /* Clickable */
    .badge-clickable {
      cursor: pointer;
    }

    .badge-clickable:hover {
      filter: brightness(0.95);
      transform: translateY(-1px);
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .badge-clickable:active {
      transform: translateY(0);
    }

    /* Text */
    .badge-text {
      display: inline-flex;
      align-items: center;
    }

    /* Material Icons */
    .material-symbols-outlined {
      font-variation-settings: 'FILL' 1, 'wght' 500, 'GRAD' 0, 'opsz' 20;
      user-select: none;
    }
  `]
})
export class BadgeComponent {
  @Input() label = '';
  @Input() variant: BadgeVariant = 'solid';
  @Input() size: BadgeSize = 'md';
  @Input() shape: BadgeShape = 'rounded';
  @Input() position?: BadgePosition;
  @Input() dot = false;
  @Input() pulse = false;
  @Input() removable = false;
  @Input() clickable = false;
  @Input() inline = false;

  // Icons
  @Input() iconLeft = '';
  @Input() iconRight = '';

  // Color customization - Solid colors
  @Input() color = '#007bff';
  @Input() textColor = '';
  @Input() borderColor = '';
  @Input() iconColor = '';

  // Color customization - Gradient
  @Input() gradientFrom = '';
  @Input() gradientTo = '';
  @Input() gradientDirection: 'to-r' | 'to-br' | 'to-b' | 'to-bl' = 'to-r';

  @Output() remove = new EventEmitter<void>();
  @Output() badgeClick = new EventEmitter<MouseEvent>();

  @HostBinding('style.display')
  get display() {
    return this.inline ? 'inline-block' : 'block';
  }

  getBackground(): string {
    if (this.variant === 'outline') {
      return 'transparent';
    }

    if (this.variant === 'gradient') {
      const from = this.gradientFrom || this.color;
      const to = this.gradientTo || this.adjustColor(this.color, -20);

      const directions = {
        'to-r': 'to right',
        'to-br': 'to bottom right',
        'to-b': 'to bottom',
        'to-bl': 'to bottom left'
      };

      return `linear-gradient(${directions[this.gradientDirection]}, ${from}, ${to})`;
    }

    if (this.variant === 'soft') {
      return this.adjustColor(this.color, 90);
    }

    // solid
    return this.color;
  }

  // Adjust color lightness
  private adjustColor(color: string, percent: number): string {
    // Simple implementation - convert hex to rgba with opacity
    if (color.startsWith('#')) {
      const r = parseInt(color.slice(1, 3), 16);
      const g = parseInt(color.slice(3, 5), 16);
      const b = parseInt(color.slice(5, 7), 16);

      if (percent > 0) {
        // Lighten
        const factor = percent / 100;
        return `rgba(${r}, ${g}, ${b}, ${1 - factor})`;
      } else {
        // Darken
        const factor = Math.abs(percent) / 100;
        const newR = Math.round(r * (1 - factor));
        const newG = Math.round(g * (1 - factor));
        const newB = Math.round(b * (1 - factor));
        return `rgb(${newR}, ${newG}, ${newB})`;
      }
    }

    return color;
  }

  handleRemove(event: MouseEvent): void {
    event.stopPropagation();
    this.remove.emit();
  }

  handleClick(event: MouseEvent): void {
    if (this.clickable) {
      this.badgeClick.emit(event);
    }
  }
}
