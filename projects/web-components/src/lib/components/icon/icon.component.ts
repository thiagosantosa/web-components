import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostBinding,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { CommonModule } from '@angular/common';

export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
export type IconVariant = 'default' | 'filled' | 'outlined' | 'rounded' | 'sharp';
export type IconWeight = 100 | 200 | 300 | 400 | 500 | 600 | 700;

@Component({
  selector: 'web-icon',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span class="icon-wrapper"
          [class.icon-clickable]="clickable"
          [class.icon-disabled]="disabled"
          [class.icon-spinning]="spin"
          [class.icon-pulse]="pulse"
          [style.color]="color"
          [style.fontSize]="getSize()"
          (click)="handleClick($event)">

      <span class="material-symbols-outlined"
            [style.fontSize]="getSize()"
            [style.fontWeight]="weight"
            [style.fontVariationSettings]="getVariationSettings()">
        {{ name }}
      </span>

      <!-- Badge/Notification dot -->
      <span *ngIf="badge || dot"
            class="icon-badge"
            [class.icon-dot]="dot"
            [style.background]="badgeColor">
        {{ badge }}
      </span>
    </span>
  `,
  styles: [`
    @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200');
    @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200');
    @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Sharp:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200');

    :host {
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }

    /* Wrapper */
    .icon-wrapper {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      position: relative;
      transition: all 0.2s ease;
      line-height: 1;
    }

    /* Icon */
    .material-symbols-outlined,
    .material-symbols-rounded,
    .material-symbols-sharp {
      user-select: none;
      line-height: 1;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }

    /* States */
    .icon-clickable {
      cursor: pointer;
    }

    .icon-clickable:hover:not(.icon-disabled) {
      opacity: 0.8;
      transform: scale(1.1);
    }

    .icon-clickable:active:not(.icon-disabled) {
      transform: scale(0.95);
    }

    .icon-disabled {
      opacity: 0.4;
      cursor: not-allowed;
      pointer-events: none;
    }

    /* Animations */
    .icon-spinning {
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }

    .icon-pulse {
      animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }

    @keyframes pulse {
      0%, 100% {
        opacity: 1;
      }
      50% {
        opacity: 0.5;
      }
    }

    /* Badge */
    .icon-badge {
      position: absolute;
      top: -4px;
      right: -4px;
      min-width: 16px;
      height: 16px;
      padding: 0 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #ef4444;
      color: white;
      border-radius: 8px;
      font-size: 10px;
      font-weight: 600;
      line-height: 1;
      z-index: 1;
    }

    .icon-dot {
      min-width: 8px;
      width: 8px;
      height: 8px;
      padding: 0;
      border-radius: 50%;
      top: 0;
      right: 0;
    }
  `]
})
export class IconComponent implements OnChanges {
  @Input() name = '';
  @Input() size: IconSize | number = 'md';
  @Input() variant: IconVariant = 'default';
  @Input() weight: IconWeight = 400;
  @Input() fill: 0 | 1 = 0;
  @Input() grade: -25 | 0 | 200 = 0;
  @Input() opticalSize: 20 | 24 | 40 | 48 = 24;
  @Input() color = '';
  @Input() clickable = false;
  @Input() disabled = false;
  @Input() spin = false;
  @Input() pulse = false;
  @Input() badge = '';
  @Input() dot = false;
  @Input() badgeColor = '#ef4444';

  @Output() iconClick = new EventEmitter<MouseEvent>();

  @HostBinding('style.display')
  display = 'inline-flex';

  ngOnChanges(changes: SimpleChanges): void {
    // Update material symbols class based on variant
    if (changes['variant']) {
      this.updateIconClass();
    }
  }

  getSize(): string {
    if (typeof this.size === 'number') {
      return `${this.size}px`;
    }

    const sizes = {
      'xs': '16px',
      'sm': '20px',
      'md': '24px',
      'lg': '32px',
      'xl': '40px',
      '2xl': '48px',
      '3xl': '64px'
    };

    return sizes[this.size] || '24px';
  }

  getVariationSettings(): string {
    // Material Symbols use font-variation-settings for customization
    // Format: 'FILL' 0-1, 'wght' 100-700, 'GRAD' -25 to 200, 'opsz' 20-48
    return `'FILL' ${this.fill}, 'wght' ${this.weight}, 'GRAD' ${this.grade}, 'opsz' ${this.opticalSize}`;
  }

  private updateIconClass(): void {
    // This would update the class on the span element
    // In a real implementation, you might use Renderer2 for this
  }

  handleClick(event: MouseEvent): void {
    if (!this.disabled && this.clickable) {
      this.iconClick.emit(event);
    }
  }
}
