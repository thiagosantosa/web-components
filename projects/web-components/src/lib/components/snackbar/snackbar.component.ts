import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
  ChangeDetectorRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';

export type SnackbarPosition =
  | 'top-left' | 'top-center' | 'top-right'
  | 'bottom-left' | 'bottom-center' | 'bottom-right';

export type SnackbarVariant = 'filled' | 'outlined' | 'soft' | 'standard';
export type SnackbarType = 'success' | 'error' | 'warning' | 'info' | 'default';

/**
 * # Snackbar Component
 *
 * ⚠️ **IMPORTANTE**: Este componente NÃO deve ser usado diretamente no template!
 * Use o **SnackbarService** para exibir snackbars programaticamente.
 *
 * @see SnackbarService
 */
@Component({
  selector: 'web-snackbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (show) {
      <div class="snackbar-container"
           [class]="'snackbar-position-' + position"
           [@slideAnimation]="show ? 'visible' : 'hidden'">

        <div class="snackbar"
             [class]="getSnackbarClasses()"
             [style.background]="getBackgroundColor()"
             [style.color]="getTextColor()"
             [style.borderColor]="getBorderColor()">

          <!-- Icon -->
          @if (icon || type !== 'default') {
            <span class="material-symbols-outlined snackbar-icon"
                  [style.color]="getIconColor()">
              {{ icon || getDefaultIcon() }}
            </span>
          }

          <!-- Message -->
          <div class="snackbar-content">
            <span class="snackbar-message">{{ message }}</span>
          </div>

          <!-- Action -->
          @if (actionLabel) {
            <button class="snackbar-action"
                    [style.color]="getActionColor()"
                    (click)="onAction()">
              {{ actionLabel }}
            </button>
          }

          <!-- Close -->
          @if (closable) {
            <button class="snackbar-close"
                    (click)="close()">
              <span class="material-symbols-outlined">close</span>
            </button>
          }

          <!-- Progress Bar -->
          @if (showProgress && duration > 0) {
            <div class="snackbar-progress"
                 [style.background]="getProgressColor()"
                 [style.animation-duration]="duration + 'ms'">
            </div>
          }
        </div>
      </div>
    }
  `,
  styles: [`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200');

    /* Container */
    .snackbar-container {
      position: fixed;
      z-index: 10000;
      pointer-events: none;
      display: flex;
    }

    /* Positions */
    .snackbar-position-top-left {
      top: 24px;
      left: 24px;
    }

    .snackbar-position-top-center {
      top: 24px;
      left: 50%;
      transform: translateX(-50%);
    }

    .snackbar-position-top-right {
      top: 24px;
      right: 24px;
    }

    .snackbar-position-bottom-left {
      bottom: 24px;
      left: 24px;
    }

    .snackbar-position-bottom-center {
      bottom: 24px;
      left: 50%;
      transform: translateX(-50%);
    }

    .snackbar-position-bottom-right {
      bottom: 24px;
      right: 24px;
    }

    /* Snackbar */
    .snackbar {
      position: relative;
      display: flex;
      align-items: center;
      gap: 12px;
      min-width: 300px;
      max-width: 500px;
      padding: 14px 16px;
      border-radius: 8px;
      font-family: 'Inter', sans-serif;
      font-size: 14px;
      line-height: 1.5;
      box-shadow:
        0 10px 15px -3px rgba(0, 0, 0, 0.1),
        0 4px 6px -2px rgba(0, 0, 0, 0.05);
      pointer-events: all;
      overflow: hidden;
    }

    /* Variants - Filled */
    .snackbar-variant-filled.snackbar-type-success {
      background: #22c55e;
      color: white;
    }

    .snackbar-variant-filled.snackbar-type-error {
      background: #ef4444;
      color: white;
    }

    .snackbar-variant-filled.snackbar-type-warning {
      background: #f59e0b;
      color: white;
    }

    .snackbar-variant-filled.snackbar-type-info {
      background: #3b82f6;
      color: white;
    }

    .snackbar-variant-filled.snackbar-type-default {
      background: #1f2937;
      color: white;
    }

    /* Variants - Outlined */
    .snackbar-variant-outlined {
      background: white;
      border: 2px solid;
    }

    .snackbar-variant-outlined.snackbar-type-success {
      color: #166534;
      border-color: #22c55e;
    }

    .snackbar-variant-outlined.snackbar-type-error {
      color: #991b1b;
      border-color: #ef4444;
    }

    .snackbar-variant-outlined.snackbar-type-warning {
      color: #92400e;
      border-color: #f59e0b;
    }

    .snackbar-variant-outlined.snackbar-type-info {
      color: #1e40af;
      border-color: #3b82f6;
    }

    .snackbar-variant-outlined.snackbar-type-default {
      color: #1f2937;
      border-color: #6b7280;
    }

    /* Variants - Soft */
    .snackbar-variant-soft.snackbar-type-success {
      background: #f0fdf4;
      color: #166534;
      border: 1px solid #bbf7d0;
    }

    .snackbar-variant-soft.snackbar-type-error {
      background: #fef2f2;
      color: #991b1b;
      border: 1px solid #fecaca;
    }

    .snackbar-variant-soft.snackbar-type-warning {
      background: #fffbeb;
      color: #92400e;
      border: 1px solid #fde68a;
    }

    .snackbar-variant-soft.snackbar-type-info {
      background: #eff6ff;
      color: #1e40af;
      border: 1px solid #bfdbfe;
    }

    .snackbar-variant-soft.snackbar-type-default {
      background: #f9fafb;
      color: #1f2937;
      border: 1px solid #e5e7eb;
    }

    /* Variants - Standard */
    .snackbar-variant-standard {
      background: #1f2937;
      color: white;
    }

    /* Icon */
    .snackbar-icon {
      font-size: 20px;
      flex-shrink: 0;
    }

    .snackbar-variant-filled .snackbar-icon {
      color: white;
    }

    .snackbar-variant-outlined.snackbar-type-success .snackbar-icon,
    .snackbar-variant-soft.snackbar-type-success .snackbar-icon {
      color: #22c55e;
    }

    .snackbar-variant-outlined.snackbar-type-error .snackbar-icon,
    .snackbar-variant-soft.snackbar-type-error .snackbar-icon {
      color: #ef4444;
    }

    .snackbar-variant-outlined.snackbar-type-warning .snackbar-icon,
    .snackbar-variant-soft.snackbar-type-warning .snackbar-icon {
      color: #f59e0b;
    }

    .snackbar-variant-outlined.snackbar-type-info .snackbar-icon,
    .snackbar-variant-soft.snackbar-type-info .snackbar-icon {
      color: #3b82f6;
    }

    .snackbar-variant-outlined.snackbar-type-default .snackbar-icon,
    .snackbar-variant-soft.snackbar-type-default .snackbar-icon {
      color: #6b7280;
    }

    /* Content */
    .snackbar-content {
      flex: 1;
      min-width: 0;
    }

    .snackbar-message {
      font-weight: 500;
    }

    /* Action */
    .snackbar-action {
      padding: 6px 12px;
      background: transparent;
      border: none;
      border-radius: 4px;
      font-family: inherit;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.2s ease;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      flex-shrink: 0;
    }

    .snackbar-variant-filled .snackbar-action {
      color: white;
    }

    .snackbar-variant-filled .snackbar-action:hover {
      background: rgba(255, 255, 255, 0.1);
    }

    .snackbar-variant-outlined .snackbar-action:hover,
    .snackbar-variant-soft .snackbar-action:hover {
      background: rgba(0, 0, 0, 0.04);
    }

    /* Close */
    .snackbar-close {
      width: 24px;
      height: 24px;
      padding: 0;
      background: transparent;
      border: none;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: background 0.2s ease;
      flex-shrink: 0;
      color: inherit;
      opacity: 0.7;
    }

    .snackbar-close:hover {
      opacity: 1;
      background: rgba(0, 0, 0, 0.1);
    }

    .snackbar-variant-filled .snackbar-close:hover {
      background: rgba(255, 255, 255, 0.1);
    }

    .snackbar-close .material-symbols-outlined {
      font-size: 18px;
    }

    /* Progress Bar */
    .snackbar-progress {
      position: absolute;
      bottom: 0;
      left: 0;
      height: 3px;
      width: 100%;
      transform-origin: left;
      animation: progress linear forwards;
    }

    @keyframes progress {
      from { transform: scaleX(1); }
      to { transform: scaleX(0); }
    }

    .snackbar-variant-filled .snackbar-progress {
      background: rgba(255, 255, 255, 0.3);
    }

    .snackbar-variant-outlined.snackbar-type-success .snackbar-progress,
    .snackbar-variant-soft.snackbar-type-success .snackbar-progress {
      background: #22c55e;
    }

    .snackbar-variant-outlined.snackbar-type-error .snackbar-progress,
    .snackbar-variant-soft.snackbar-type-error .snackbar-progress {
      background: #ef4444;
    }

    .snackbar-variant-outlined.snackbar-type-warning .snackbar-progress,
    .snackbar-variant-soft.snackbar-type-warning .snackbar-progress {
      background: #f59e0b;
    }

    .snackbar-variant-outlined.snackbar-type-info .snackbar-progress,
    .snackbar-variant-soft.snackbar-type-info .snackbar-progress {
      background: #3b82f6;
    }

    .snackbar-variant-outlined.snackbar-type-default .snackbar-progress,
    .snackbar-variant-soft.snackbar-type-default .snackbar-progress {
      background: #6b7280;
    }

    /* Material Icons */
    .material-symbols-outlined {
      font-variation-settings:
        'FILL' 1,
        'wght' 400,
        'GRAD' 0,
        'opsz' 20;
      user-select: none;
    }

    /* Responsive */
    @media (max-width: 640px) {
      .snackbar-container {
        left: 16px !important;
        right: 16px !important;
        transform: none !important;
      }

      .snackbar {
        min-width: auto;
        max-width: none;
        width: 100%;
      }
    }
  `],
  animations: [
    trigger('slideAnimation', [
      state('visible', style({
        opacity: 1,
        transform: 'translateY(0)'
      })),
      state('hidden', style({
        opacity: 0,
        transform: 'translateY(20px)'
      })),
      transition('hidden => visible', [
        animate('200ms cubic-bezier(0.4, 0, 0.2, 1)')
      ]),
      transition('visible => hidden', [
        animate('150ms cubic-bezier(0.4, 0, 1, 1)')
      ])
    ])
  ]
})
export class SnackbarComponent implements OnInit, OnDestroy {
  @Input() show = false;
  @Input() message = '';
  @Input() type: SnackbarType = 'default';
  @Input() variant: SnackbarVariant = 'filled';
  @Input() position: SnackbarPosition = 'bottom-center';
  @Input() icon = '';
  @Input() actionLabel = '';
  @Input() duration = 5000;
  @Input() closable = true;
  @Input() showProgress = false;
  @Input() backgroundColor = '';
  @Input() textColor = '';
  @Input() iconColor = '';
  @Input() borderColor = '';
  @Input() progressColor = '';

  @Output() closed = new EventEmitter<void>();
  @Output() action = new EventEmitter<void>();

  private timeoutId?: number;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    if (this.show && this.duration > 0) {
      this.startTimer();
    }
  }

  ngOnDestroy() {
    this.clearTimer();
  }

  private startTimer() {
    this.clearTimer();
    this.timeoutId = window.setTimeout(() => {
      this.close();
    }, this.duration);
  }

  private clearTimer() {
    if (this.timeoutId) {
      window.clearTimeout(this.timeoutId);
      this.timeoutId = undefined;
    }
  }

  close() {
    this.show = false;
    this.clearTimer();
    this.closed.emit();
    this.cdr.markForCheck();
  }

  onAction() {
    this.action.emit();
  }

  getSnackbarClasses(): string {
    return `snackbar-variant-${this.variant} snackbar-type-${this.type}`;
  }

  getDefaultIcon(): string {
    const icons: Record<SnackbarType, string> = {
      success: 'check_circle',
      error: 'error',
      warning: 'warning',
      info: 'info',
      default: ''
    };
    return icons[this.type];
  }

  getBackgroundColor(): string {
    return this.backgroundColor || '';
  }

  getTextColor(): string {
    return this.textColor || '';
  }

  getIconColor(): string {
    return this.iconColor || '';
  }

  getBorderColor(): string {
    return this.borderColor || '';
  }

  getActionColor(): string {
    return this.textColor || '';
  }

  getProgressColor(): string {
    return this.progressColor || '';
  }
}
