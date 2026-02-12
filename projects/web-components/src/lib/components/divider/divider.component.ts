import {
  Component,
  Input,
  HostBinding
} from '@angular/core';
import { CommonModule } from '@angular/common';

export type DividerOrientation = 'horizontal' | 'vertical';
export type DividerAlignment = 'left' | 'center' | 'right';
export type DividerVariant = 'solid' | 'dashed' | 'dotted' | 'double' | 'gradient';
export type DividerThickness = 'thin' | 'medium' | 'thick';

@Component({
  selector: 'web-divider',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="divider-container"
         [class]="'divider-' + orientation"
         [class.divider-with-content]="hasContent"
         [style.margin]="spacing">

      <!-- Linha Esquerda/Superior -->
      <div class="divider-line divider-line-start"
           [class]="'line-' + variant + ' line-' + thickness"
           [class.line-animated]="animated"
           [style.background]="lineColor"
           [style.borderColor]="lineColor">
        <div *ngIf="variant === 'gradient'"
             class="gradient-overlay"
             [style.background]="gradientStyle"></div>
      </div>

      <!-- Conteúdo (Texto, Ícone ou Slot) -->
      <div *ngIf="hasContent"
           class="divider-content"
           [class]="'content-' + textAlign"
           [class.content-with-icon]="icon"
           [class.content-with-avatar]="avatar">

        <!-- Avatar -->
        <div *ngIf="avatar" class="divider-avatar">
          <img *ngIf="avatar.startsWith('http')" [src]="avatar" [alt]="text">
          <div *ngIf="!avatar.startsWith('http')" class="avatar-placeholder">{{ avatar }}</div>
        </div>

        <!-- Ícone -->
        <span *ngIf="icon && !avatar"
              class="material-symbols-outlined divider-icon"
              [style.color]="iconColor">
          {{ icon }}
        </span>

        <!-- Texto -->
        <span *ngIf="text"
              class="divider-text"
              [style.color]="textColor"
              [style.fontSize.px]="textSize">
          {{ text }}
        </span>

        <!-- Slot customizado -->
        <ng-content></ng-content>
      </div>

      <!-- Linha Direita/Inferior -->
      <div *ngIf="hasContent || orientation === 'vertical'"
           class="divider-line divider-line-end"
           [class]="'line-' + variant + ' line-' + thickness"
           [class.line-animated]="animated"
           [style.background]="lineColor"
           [style.borderColor]="lineColor">
        <div *ngIf="variant === 'gradient'"
             class="gradient-overlay"
             [style.background]="gradientReverseStyle"></div>
      </div>
    </div>
  `,
  styles: [`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200');

    :host {
      display: block;
      width: 100%;
    }

    /* Container */
    .divider-container {
      display: flex;
      align-items: center;
      font-family: 'Inter', system-ui, -apple-system, sans-serif;
    }

    .divider-horizontal {
      flex-direction: row;
      width: 100%;
    }

    .divider-vertical {
      flex-direction: column;
      height: 100%;
      width: auto;
    }

    /* Lines */
    .divider-line {
      position: relative;
      flex: 1;
      overflow: hidden;
    }

    /* Horizontal Lines */
    .divider-horizontal .divider-line {
      height: 1px;
      min-height: 1px;
    }

    /* Vertical Lines */
    .divider-vertical .divider-line {
      width: 1px;
      min-width: 1px;
      height: auto;
      min-height: 20px;
    }

    /* Thickness */
    .line-thin {
      height: 1px;
    }

    .divider-vertical .line-thin {
      width: 1px;
      height: auto;
    }

    .line-medium {
      height: 2px;
    }

    .divider-vertical .line-medium {
      width: 2px;
      height: auto;
    }

    .line-thick {
      height: 4px;
    }

    .divider-vertical .line-thick {
      width: 4px;
      height: auto;
    }

    /* Variants */
    .line-solid {
      background: currentColor;
    }

    .line-dashed {
      background: transparent;
      border-style: dashed;
    }

    .divider-horizontal .line-dashed {
      border-bottom-width: 1px;
    }

    .divider-vertical .line-dashed {
      border-right-width: 1px;
    }

    .divider-horizontal .line-dashed.line-medium {
      border-bottom-width: 2px;
    }

    .divider-vertical .line-dashed.line-medium {
      border-right-width: 2px;
    }

    .divider-horizontal .line-dashed.line-thick {
      border-bottom-width: 4px;
    }

    .divider-vertical .line-dashed.line-thick {
      border-right-width: 4px;
    }

    .line-dotted {
      background: transparent;
      border-style: dotted;
    }

    .divider-horizontal .line-dotted {
      border-bottom-width: 2px;
    }

    .divider-vertical .line-dotted {
      border-right-width: 2px;
    }

    .divider-horizontal .line-dotted.line-thick {
      border-bottom-width: 4px;
    }

    .divider-vertical .line-dotted.line-thick {
      border-right-width: 4px;
    }

    .line-double {
      background: transparent;
      border-style: double;
    }

    .divider-horizontal .line-double {
      border-bottom-width: 4px;
    }

    .divider-vertical .line-double {
      border-right-width: 4px;
    }

    .divider-horizontal .line-double.line-thick {
      border-bottom-width: 6px;
    }

    .divider-vertical .line-double.line-thick {
      border-right-width: 6px;
    }

    .line-gradient {
      background: transparent;
      position: relative;
    }

    .gradient-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }

    /* Animation */
    .line-animated {
      animation: divider-slide 2s ease-in-out infinite;
    }

    @keyframes divider-slide {
      0%, 100% {
        opacity: 1;
      }
      50% {
        opacity: 0.5;
      }
    }

    /* Content */
    .divider-content {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 0 16px;
      white-space: nowrap;
      flex-shrink: 0;
    }

    .divider-vertical .divider-content {
      padding: 16px 0;
    }

    /* Content Alignment */
    .content-left {
      margin-left: 0;
      margin-right: auto;
    }

    .content-center {
      margin-left: auto;
      margin-right: auto;
    }

    .content-right {
      margin-left: auto;
      margin-right: 0;
    }

    .divider-vertical .content-left,
    .divider-vertical .content-center,
    .divider-vertical .content-right {
      margin: 0;
    }

    /* Hide lines based on alignment */
    .content-left ~ .divider-line-start {
      flex: 0;
      min-width: 0;
      min-height: 0;
    }

    .content-right ~ .divider-line-end {
      flex: 0;
      min-width: 0;
      min-height: 0;
    }

    /* Text */
    .divider-text {
      font-size: 14px;
      font-weight: 500;
      color: #666;
      line-height: 1;
    }

    /* Icon */
    .divider-icon {
      font-size: 20px;
      color: #666;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .material-symbols-outlined {
      font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
      user-select: none;
    }

    /* Avatar */
    .divider-avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      overflow: hidden;
      flex-shrink: 0;
      background: #e0e0e0;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .divider-avatar img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .avatar-placeholder {
      font-size: 12px;
      font-weight: 600;
      color: #666;
    }

    /* Special Cases */
    .divider-with-content .divider-line-start {
      margin-right: 0;
    }

    .divider-with-content .divider-line-end {
      margin-left: 0;
    }

    .divider-vertical.divider-with-content .divider-line-start {
      margin-bottom: 0;
    }

    .divider-vertical.divider-with-content .divider-line-end {
      margin-top: 0;
    }

    /* No content, full line */
    .divider-horizontal:not(.divider-with-content) .divider-line-start {
      flex: 1;
    }

    .divider-vertical:not(.divider-with-content) .divider-line-start {
      flex: 1;
    }
  `]
})
export class DividerComponent {
  @Input() orientation: DividerOrientation = 'horizontal';
  @Input() variant: DividerVariant = 'solid';
  @Input() thickness: DividerThickness = 'thin';
  @Input() textAlign: DividerAlignment = 'center';
  @Input() text = '';
  @Input() icon = '';
  @Input() avatar = '';
  @Input() lineColor = '#e0e0e0';
  @Input() textColor = '#666666';
  @Input() iconColor = '#666666';
  @Input() textSize = 14;
  @Input() spacing = '16px 0';
  @Input() animated = false;
  @Input() gradientStart = '#667eea';
  @Input() gradientEnd = '#764ba2';

  @HostBinding('class.divider-vertical-host')
  get isVertical() {
    return this.orientation === 'vertical';
  }

  @HostBinding('style.display')
  get display() {
    return this.orientation === 'vertical' ? 'inline-flex' : 'block';
  }

  @HostBinding('style.height')
  get height() {
    return this.orientation === 'vertical' ? '100%' : 'auto';
  }

  @HostBinding('style.width')
  get width() {
    return this.orientation === 'vertical' ? 'auto' : '100%';
  }

  get hasContent(): boolean {
    return !!(this.text || this.icon || this.avatar);
  }

  get gradientStyle(): string {
    if (this.orientation === 'horizontal') {
      return `linear-gradient(to right, transparent, ${this.gradientStart}, ${this.gradientEnd}, transparent)`;
    }
    return `linear-gradient(to bottom, transparent, ${this.gradientStart}, ${this.gradientEnd}, transparent)`;
  }

  get gradientReverseStyle(): string {
    if (this.orientation === 'horizontal') {
      return `linear-gradient(to left, transparent, ${this.gradientEnd}, ${this.gradientStart}, transparent)`;
    }
    return `linear-gradient(to top, transparent, ${this.gradientEnd}, ${this.gradientStart}, transparent)`;
  }
}
