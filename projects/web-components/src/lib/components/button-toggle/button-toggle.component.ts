import {
  Component,
  Input,
  Output,
  EventEmitter,
  forwardRef,
  HostBinding,
  ChangeDetectorRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export type ToggleSize = 'small' | 'medium' | 'large';
export type ToggleVariant = 'default' | 'outlined' | 'filled' | 'soft';
export type ToggleShape = 'rounded' | 'square' | 'pill';
export type ToggleLabelPosition = 'left' | 'right' | 'top' | 'bottom';

@Component({
  selector: 'web-button-toggle',
  standalone: true,
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ButtonToggleComponent),
      multi: true
    }
  ],
  template: `
    <label class="toggle-container"
           [class]="'toggle-' + size + ' toggle-' + variant + ' toggle-' + shape"
           [class.toggle-label-left]="labelPosition === 'left'"
           [class.toggle-label-right]="labelPosition === 'right'"
           [class.toggle-label-top]="labelPosition === 'top'"
           [class.toggle-label-bottom]="labelPosition === 'bottom'"
           [class.toggle-disabled]="disabled"
           [class.toggle-checked]="checked"
           [style.cursor]="disabled ? 'not-allowed' : 'pointer'">

      <!-- Label (Top or Left) -->
      <span *ngIf="label && (labelPosition === 'left' || labelPosition === 'top')"
            class="toggle-label"
            [style.color]="labelColor">
        {{ label }}
        <span *ngIf="required" class="toggle-required">*</span>
      </span>

      <!-- Toggle Switch -->
      <div class="toggle-wrapper">
        <input type="checkbox"
               class="toggle-input"
               [checked]="checked"
               [disabled]="disabled"
               (change)="onToggleChange($event)">

        <div class="toggle-track"
             [style.background]="checked ? (checkedColor || activeTrackColor) : (uncheckedColor || inactiveTrackColor)"
             [style.borderColor]="checked ? (checkedBorderColor || activeBorderColor) : (uncheckedBorderColor || inactiveBorderColor)">

          <!-- Icons or Text inside track -->
          <span *ngIf="checkedIcon && checked"
                class="track-icon track-icon-checked material-symbols-outlined"
                [style.color]="checkedIconColor || iconColor">
            {{ checkedIcon }}
          </span>
          <span *ngIf="uncheckedIcon && !checked"
                class="track-icon track-icon-unchecked material-symbols-outlined"
                [style.color]="uncheckedIconColor || iconColor">
            {{ uncheckedIcon }}
          </span>

          <span *ngIf="checkedText && checked"
                class="track-text track-text-checked"
                [style.color]="checkedTextColor || textColor">
            {{ checkedText }}
          </span>
          <span *ngIf="uncheckedText && !checked"
                class="track-text track-text-unchecked"
                [style.color]="uncheckedTextColor || textColor">
            {{ uncheckedText }}
          </span>

          <!-- Thumb (slider) -->
          <div class="toggle-thumb"
               [style.background]="checked ? (checkedThumbColor || activeThumbColor) : (uncheckedThumbColor || inactiveThumbColor)"
               [style.boxShadow]="thumbShadow"
               [style.transform]="getThumbTransform()">

            <!-- Icon inside thumb -->
            <span *ngIf="thumbIcon"
                  class="material-symbols-outlined thumb-icon"
                  [style.color]="thumbIconColor">
              {{ thumbIcon }}
            </span>

            <!-- Loading spinner -->
            <div *ngIf="loading" class="thumb-spinner"></div>
          </div>
        </div>

        <!-- Helper text or error -->
        <div *ngIf="helperText || errorText" class="toggle-helper">
          <span *ngIf="errorText" class="toggle-error" [style.color]="errorColor">
            {{ errorText }}
          </span>
          <span *ngIf="helperText && !errorText" [style.color]="helperTextColor">
            {{ helperText }}
          </span>
        </div>
      </div>

      <!-- Label (Right or Bottom) -->
      <span *ngIf="label && (labelPosition === 'right' || labelPosition === 'bottom')"
            class="toggle-label"
            [style.color]="labelColor">
        {{ label }}
        <span *ngIf="required" class="toggle-required">*</span>
      </span>
    </label>
  `,
  styles: [`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200');

    :host {
      display: inline-block;
      font-family: 'Inter', system-ui, -apple-system, sans-serif;
    }

    /* Container */
    .toggle-container {
      display: inline-flex;
      align-items: center;
      gap: 12px;
      user-select: none;
    }

    .toggle-label-left {
      flex-direction: row;
    }

    .toggle-label-right {
      flex-direction: row-reverse;
    }

    .toggle-label-top {
      flex-direction: column;
      align-items: flex-start;
    }

    .toggle-label-bottom {
      flex-direction: column-reverse;
      align-items: flex-start;
    }

    /* Label */
    .toggle-label {
      font-size: 14px;
      font-weight: 500;
      color: #1a1a1a;
    }

    .toggle-required {
      color: #ef4444;
      margin-left: 2px;
    }

    /* Wrapper */
    .toggle-wrapper {
      position: relative;
      display: inline-flex;
      flex-direction: column;
      gap: 4px;
    }

    /* Hidden Input */
    .toggle-input {
      position: absolute;
      opacity: 0;
      width: 0;
      height: 0;
    }

    /* Track (background) */
    .toggle-track {
      position: relative;
      display: flex;
      align-items: center;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      background: #d1d5db;
      cursor: pointer;
      overflow: hidden;
    }

    /* Sizes */
    .toggle-small .toggle-track {
      width: 36px;
      height: 20px;
      padding: 2px;
    }

    .toggle-small .toggle-thumb {
      width: 16px;
      height: 16px;
    }

    .toggle-small .track-icon {
      font-size: 12px;
    }

    .toggle-small .track-text {
      font-size: 9px;
    }

    .toggle-medium .toggle-track {
      width: 44px;
      height: 24px;
      padding: 2px;
    }

    .toggle-medium .toggle-thumb {
      width: 20px;
      height: 20px;
    }

    .toggle-medium .track-icon {
      font-size: 14px;
    }

    .toggle-medium .track-text {
      font-size: 10px;
    }

    .toggle-large .toggle-track {
      width: 56px;
      height: 32px;
      padding: 3px;
    }

    .toggle-large .toggle-thumb {
      width: 26px;
      height: 26px;
    }

    .toggle-large .track-icon {
      font-size: 18px;
    }

    .toggle-large .track-text {
      font-size: 11px;
    }

    /* Variants */
    .toggle-default .toggle-track {
      border: none;
    }

    .toggle-outlined .toggle-track {
      border: 2px solid #d1d5db;
      background: transparent;
    }

    .toggle-filled .toggle-track {
      border: none;
    }

    .toggle-soft .toggle-track {
      border: none;
    }

    .toggle-checked.toggle-outlined .toggle-track {
      border-color: currentColor;
    }

    /* Shapes */
    .toggle-rounded .toggle-track {
      border-radius: 8px;
    }

    .toggle-rounded .toggle-thumb {
      border-radius: 6px;
    }

    .toggle-square .toggle-track {
      border-radius: 4px;
    }

    .toggle-square .toggle-thumb {
      border-radius: 3px;
    }

    .toggle-pill .toggle-track {
      border-radius: 9999px;
    }

    .toggle-pill .toggle-thumb {
      border-radius: 9999px;
    }

    /* Thumb (slider) */
    .toggle-thumb {
      position: absolute;
      background: white;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      display: flex;
      align-items: center;
      justify-content: center;
      left: 2px;
      top: 50%;
    }

    /* Icons and Text in Track */
    .track-icon,
    .track-text {
      position: absolute;
      transition: all 0.3s;
      pointer-events: none;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .track-icon-checked,
    .track-text-checked {
      left: 6px;
    }

    .track-icon-unchecked,
    .track-text-unchecked {
      right: 6px;
    }

    .track-text {
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    /* Thumb Icon */
    .thumb-icon {
      font-size: inherit;
      line-height: 1;
    }

    /* Loading Spinner */
    .thumb-spinner {
      width: 12px;
      height: 12px;
      border: 2px solid rgba(0, 0, 0, 0.1);
      border-top-color: #007bff;
      border-radius: 50%;
      animation: spin 0.6s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    /* Disabled */
    .toggle-disabled {
      opacity: 0.5;
      cursor: not-allowed !important;
    }

    .toggle-disabled .toggle-track {
      cursor: not-allowed;
    }

    /* Helper and Error Text */
    .toggle-helper {
      font-size: 12px;
      line-height: 1.4;
    }

    .toggle-error {
      color: #ef4444;
    }

    /* Hover Effects */
    .toggle-track:hover:not(.toggle-disabled .toggle-track) {
      filter: brightness(0.95);
    }

    /* Focus */
    .toggle-input:focus + .toggle-track {
      outline: 2px solid #007bff;
      outline-offset: 2px;
    }

    /* Material Icons */
    .material-symbols-outlined {
      font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24;
      user-select: none;
    }
  `]
})
export class ButtonToggleComponent implements ControlValueAccessor {
  @Input() checked = false;
  @Input() disabled = false;
  @Input() loading = false;
  @Input() required = false;
  @Input() size: ToggleSize = 'medium';
  @Input() variant: ToggleVariant = 'default';
  @Input() shape: ToggleShape = 'pill';
  @Input() label = '';
  @Input() labelPosition: ToggleLabelPosition = 'right';
  @Input() helperText = '';
  @Input() errorText = '';

  // Icons
  @Input() checkedIcon = '';
  @Input() uncheckedIcon = '';
  @Input() thumbIcon = '';

  // Text in track
  @Input() checkedText = '';
  @Input() uncheckedText = '';

  // Color customization - Track
  @Input() checkedColor = '#22c55e';
  @Input() uncheckedColor = '#d1d5db';
  @Input() activeTrackColor = '';
  @Input() inactiveTrackColor = '';

  // Color customization - Borders
  @Input() checkedBorderColor = '';
  @Input() uncheckedBorderColor = '';
  @Input() activeBorderColor = '';
  @Input() inactiveBorderColor = '';

  // Color customization - Thumb
  @Input() checkedThumbColor = '#ffffff';
  @Input() uncheckedThumbColor = '#ffffff';
  @Input() activeThumbColor = '';
  @Input() inactiveThumbColor = '';
  @Input() thumbShadow = '0 2px 4px rgba(0, 0, 0, 0.2)';

  // Color customization - Icons & Text
  @Input() checkedIconColor = '';
  @Input() uncheckedIconColor = '';
  @Input() checkedTextColor = '';
  @Input() uncheckedTextColor = '';
  @Input() iconColor = '#ffffff';
  @Input() textColor = '#ffffff';
  @Input() thumbIconColor = '#666666';

  // Color customization - Label & Helper
  @Input() labelColor = '';
  @Input() helperTextColor = '#666666';
  @Input() errorColor = '#ef4444';

  @Output() change = new EventEmitter<boolean>();

  @HostBinding('style.width')
  @Input() width?: string;

  private onChange: (value: boolean) => void = () => {};
  private onTouched: () => void = () => {};

  constructor(private cdr: ChangeDetectorRef) {}

  getThumbTransform(): string {
    const translateY = 'translateY(-50%)';

    if (!this.checked) {
      return `translateX(0) ${translateY}`;
    }

    // Calculate transform based on size
    let translateX: string;
    switch (this.size) {
      case 'small':
        translateX = 'translateX(16px)';
        break;
      case 'medium':
        translateX = 'translateX(20px)';
        break;
      case 'large':
        translateX = 'translateX(24px)';
        break;
      default:
        translateX = 'translateX(20px)';
    }

    return `${translateX} ${translateY}`;
  }

  writeValue(value: boolean): void {
    this.checked = value;
    this.cdr.markForCheck();
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onToggleChange(event: Event): void {
    if (this.disabled || this.loading) {
      event.preventDefault();
      return;
    }

    const input = event.target as HTMLInputElement;
    this.checked = input.checked;

    this.onChange(this.checked);
    this.onTouched();
    this.change.emit(this.checked);
    this.cdr.markForCheck();
  }
}
