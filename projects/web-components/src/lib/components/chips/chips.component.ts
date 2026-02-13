import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostBinding
} from '@angular/core';
import { CommonModule } from '@angular/common';

export type ChipVariant = 'filled' | 'outlined' | 'soft' | 'gradient';
export type ChipSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type ChipShape = 'rounded' | 'square' | 'pill';

@Component({
  selector: 'web-chip',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="chip"
         [class]="'chip-' + variant + ' chip-' + size + ' chip-' + shape"
         [class.chip-disabled]="disabled"
         [class.chip-selected]="selected"
         [class.chip-clickable]="clickable"
         [style.background]="getBackground()"
         [style.color]="getTextColor()"
         [style.borderColor]="getBorderColor()"
         (click)="handleClick($event)">

      <!-- Avatar (leading) -->
      <div *ngIf="avatar" class="chip-avatar">
        <img *ngIf="avatar.startsWith('http')" [src]="avatar" [alt]="label">
        <div *ngIf="!avatar.startsWith('http')" class="chip-avatar-text">{{ avatar }}</div>
      </div>

      <!-- Icon (leading) -->
      <span *ngIf="icon && !avatar"
            class="material-symbols-outlined chip-icon chip-icon-leading"
            [style.color]="iconColor || getTextColor()">
        {{ icon }}
      </span>

      <!-- Label/Content -->
      <span class="chip-label">
        {{ label }}
        <ng-content></ng-content>
      </span>

      <!-- Icon (trailing) -->
      <span *ngIf="iconRight"
            class="material-symbols-outlined chip-icon chip-icon-trailing"
            [style.color]="iconColor || getTextColor()">
        {{ iconRight }}
      </span>

      <!-- Delete/Remove button -->
      <button *ngIf="deletable"
              type="button"
              class="chip-delete"
              [disabled]="disabled"
              [style.color]="deleteColor || getTextColor()"
              (click)="handleDelete($event)">
        <span class="material-symbols-outlined">{{ deleteIcon }}</span>
      </button>

      <!-- Checkmark (when selected) -->
      <span *ngIf="selected && showCheckmark"
            class="material-symbols-outlined chip-checkmark"
            [style.color]="checkmarkColor || getTextColor()">
        check
      </span>
    </div>
  `,
  styles: [`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200');

    :host {
      display: inline-block;
      font-family: 'Inter', system-ui, -apple-system, sans-serif;
    }

    /* Chip base */
    .chip {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-weight: 500;
      white-space: nowrap;
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      cursor: default;
      user-select: none;
      position: relative;
    }

    /* Sizes */
    .chip-xs {
      height: 20px;
      padding: 0 8px;
      font-size: 11px;
      gap: 4px;
    }

    .chip-xs .chip-icon {
      font-size: 14px;
    }

    .chip-xs .chip-avatar {
      width: 16px;
      height: 16px;
      margin-left: -4px;
    }

    .chip-xs .chip-delete {
      width: 16px;
      height: 16px;
      margin-right: -4px;
    }

    .chip-sm {
      height: 24px;
      padding: 0 10px;
      font-size: 12px;
      gap: 5px;
    }

    .chip-sm .chip-icon {
      font-size: 16px;
    }

    .chip-sm .chip-avatar {
      width: 20px;
      height: 20px;
      margin-left: -5px;
    }

    .chip-sm .chip-delete {
      width: 18px;
      height: 18px;
      margin-right: -4px;
    }

    .chip-md {
      height: 32px;
      padding: 0 12px;
      font-size: 13px;
      gap: 6px;
    }

    .chip-md .chip-icon {
      font-size: 18px;
    }

    .chip-md .chip-avatar {
      width: 24px;
      height: 24px;
      margin-left: -6px;
    }

    .chip-md .chip-delete {
      width: 20px;
      height: 20px;
      margin-right: -4px;
    }

    .chip-lg {
      height: 40px;
      padding: 0 16px;
      font-size: 14px;
      gap: 8px;
    }

    .chip-lg .chip-icon {
      font-size: 20px;
    }

    .chip-lg .chip-avatar {
      width: 28px;
      height: 28px;
      margin-left: -8px;
    }

    .chip-lg .chip-delete {
      width: 22px;
      height: 22px;
      margin-right: -6px;
    }

    .chip-xl {
      height: 48px;
      padding: 0 20px;
      font-size: 16px;
      gap: 10px;
    }

    .chip-xl .chip-icon {
      font-size: 24px;
    }

    .chip-xl .chip-avatar {
      width: 32px;
      height: 32px;
      margin-left: -10px;
    }

    .chip-xl .chip-delete {
      width: 24px;
      height: 24px;
      margin-right: -8px;
    }

    /* Shapes */
    .chip-rounded {
      border-radius: 8px;
    }

    .chip-square {
      border-radius: 4px;
    }

    .chip-pill {
      border-radius: 9999px;
    }

    /* Variants */
    .chip-filled {
      /* Background and colors set via bindings */
    }

    .chip-outlined {
      background: transparent !important;
      border: 1.5px solid currentColor;
    }

    .chip-soft {
      /* Background set via bindings with opacity */
    }

    .chip-gradient {
      /* Gradient set via bindings */
    }

    /* States */
    .chip-disabled {
      opacity: 0.5;
      cursor: not-allowed;
      pointer-events: none;
    }

    .chip-selected {
      box-shadow: 0 0 0 2px currentColor;
    }

    .chip-clickable {
      cursor: pointer;
    }

    .chip-clickable:hover:not(.chip-disabled) {
      filter: brightness(0.95);
      transform: translateY(-1px);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    }

    .chip-clickable:active:not(.chip-disabled) {
      transform: translateY(0);
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
    }

    /* Avatar */
    .chip-avatar {
      border-radius: 50%;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(0, 0, 0, 0.1);
      flex-shrink: 0;
    }

    .chip-avatar img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .chip-avatar-text {
      font-size: 0.7em;
      font-weight: 600;
      color: inherit;
    }

    /* Icons */
    .chip-icon {
      display: inline-flex;
      align-items: center;
      line-height: 1;
      flex-shrink: 0;
    }

    .chip-icon-leading {
      margin-left: -2px;
    }

    .chip-icon-trailing {
      margin-right: -2px;
    }

    /* Label */
    .chip-label {
      display: inline-flex;
      align-items: center;
      line-height: 1;
    }

    /* Delete button */
    .chip-delete {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background: transparent;
      border: none;
      padding: 0;
      cursor: pointer;
      border-radius: 50%;
      transition: all 0.2s;
      flex-shrink: 0;
    }

    .chip-delete:hover:not(:disabled) {
      background: rgba(0, 0, 0, 0.1);
      transform: scale(1.1);
    }

    .chip-delete:active:not(:disabled) {
      transform: scale(0.95);
    }

    .chip-delete:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }

    .chip-delete .material-symbols-outlined {
      font-size: inherit;
    }

    /* Checkmark */
    .chip-checkmark {
      margin-left: -2px;
      font-size: inherit;
      flex-shrink: 0;
    }

    /* Material Icons */
    .material-symbols-outlined {
      font-variation-settings: 'FILL' 1, 'wght' 500, 'GRAD' 0, 'opsz' 20;
      user-select: none;
    }
  `]
})
export class ChipComponent {
  @Input() label = '';
  @Input() variant: ChipVariant = 'filled';
  @Input() size: ChipSize = 'md';
  @Input() shape: ChipShape = 'rounded';
  @Input() disabled = false;
  @Input() selected = false;
  @Input() clickable = false;
  @Input() deletable = false;
  @Input() showCheckmark = true;

  // Avatar and icons
  @Input() avatar = '';
  @Input() icon = '';
  @Input() iconRight = '';
  @Input() deleteIcon = 'close';

  // Color customization - Basic
  @Input() color = '#007bff';
  @Input() textColor = '';
  @Input() borderColor = '';
  @Input() iconColor = '';
  @Input() deleteColor = '';
  @Input() checkmarkColor = '';

  // Color customization - States
  @Input() selectedColor = '';
  @Input() selectedTextColor = '';
  @Input() hoverColor = '';

  // Color customization - Gradient
  @Input() gradientFrom = '';
  @Input() gradientTo = '';
  @Input() gradientDirection: 'to-r' | 'to-br' | 'to-b' | 'to-bl' = 'to-r';

  @Output() chipClick = new EventEmitter<MouseEvent>();
  @Output() delete = new EventEmitter<void>();

  @HostBinding('style.display')
  get display() {
    return 'inline-block';
  }

  getBackground(): string {
    if (this.variant === 'outlined') {
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
      return this.adjustColor(this.selected && this.selectedColor ? this.selectedColor : this.color, 85);
    }

    // filled
    return this.selected && this.selectedColor ? this.selectedColor : this.color;
  }

  getTextColor(): string {
    if (this.textColor) {
      return this.textColor;
    }

    if (this.selected && this.selectedTextColor) {
      return this.selectedTextColor;
    }

    if (this.variant === 'outlined' || this.variant === 'soft') {
      return this.color;
    }

    // filled or gradient
    return '#ffffff';
  }

  getBorderColor(): string {
    if (this.borderColor) {
      return this.borderColor;
    }

    if (this.variant === 'outlined') {
      return this.color;
    }

    return 'transparent';
  }

  // Adjust color lightness
  private adjustColor(color: string, percent: number): string {
    if (color.startsWith('#')) {
      const r = parseInt(color.slice(1, 3), 16);
      const g = parseInt(color.slice(3, 5), 16);
      const b = parseInt(color.slice(5, 7), 16);

      if (percent > 0) {
        // Lighten - create semi-transparent version
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

  handleClick(event: MouseEvent): void {
    if (!this.disabled && this.clickable) {
      this.chipClick.emit(event);
    }
  }

  handleDelete(event: MouseEvent): void {
    event.stopPropagation();
    if (!this.disabled) {
      this.delete.emit();
    }
  }
}
