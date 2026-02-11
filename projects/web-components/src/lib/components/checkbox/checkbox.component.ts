import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'web-checkbox',
  standalone: true,
  imports: [CommonModule],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CheckboxComponent),
    multi: true
  }],
  template: `
    <label class="checkbox-wrapper"
           [class]="'checkbox-' + size + ' checkbox-' + variant"
           [class.disabled]="disabled"
           [class.checked]="checked"
           [class.indeterminate]="indeterminate">

      <input
        type="checkbox"
        class="checkbox-input"
        [checked]="checked"
        [disabled]="disabled"
        [indeterminate]="indeterminate"
        (change)="onCheckboxChange($event)">

      <span class="checkbox-box" [class]="'checkbox-box-' + color">
        <span class="material-symbols-outlined checkbox-icon" *ngIf="checked && !indeterminate">
          {{ icon }}
        </span>
        <span class="material-symbols-outlined checkbox-icon" *ngIf="indeterminate">
          remove
        </span>
      </span>

      <span class="checkbox-label" *ngIf="label || description">
        <span class="checkbox-label-text">{{ label }}</span>
        <span class="checkbox-description" *ngIf="description">{{ description }}</span>
      </span>

      <ng-content></ng-content>
    </label>
  `,
  styles: [`

    /* Wrapper */
    .checkbox-wrapper {
      display: inline-flex;
      align-items: flex-start;
      gap: 0.75rem;
      cursor: pointer;
      font-family: "Montserrat", sans-serif;
      user-select: none;
      position: relative;
    }

    .checkbox-wrapper.disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    /* Hidden Input */
    .checkbox-input {
      position: absolute;
      opacity: 0;
      width: 0;
      height: 0;
    }

    /* Checkbox Box */
    .checkbox-box {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      width: 1.25rem;
      height: 1.25rem;
      border: 2px solid #ccc;
      border-radius: 0.25rem;
      background: white;
      transition: all 0.2s ease;
      position: relative;
    }

    .checkbox-wrapper:hover:not(.disabled) .checkbox-box {
      border-color: #009ADA;
    }

    .checkbox-wrapper.checked .checkbox-box,
    .checkbox-wrapper.indeterminate .checkbox-box {
      border-color: #009ADA;
      background: #009ADA;
    }

    /* Icon */
    .checkbox-icon {
      color: white;
      font-size: 1rem;
      line-height: 1;
      font-variation-settings:
        'FILL' 0,
        'wght' 600,
        'GRAD' 0,
        'opsz' 20;
    }

    /* Label */
    .checkbox-label {
      display: flex;
      flex-direction: column;
      gap: 0.125rem;
    }

    .checkbox-label-text {
      font-size: 0.9375rem;
      font-weight: 500;
      color: #383C3F;
      line-height: 1.5;
    }

    .checkbox-description {
      font-size: 0.8125rem;
      color: #6c757d;
      line-height: 1.4;
    }

    /* ========== SIZES ========== */

    /* Small */
    .checkbox-small .checkbox-box {
      width: 1rem;
      height: 1rem;
    }

    .checkbox-small .checkbox-icon {
      font-size: 0.875rem;
    }

    .checkbox-small .checkbox-label-text {
      font-size: 0.875rem;
    }

    .checkbox-small .checkbox-description {
      font-size: 0.75rem;
    }

    /* Medium (Default) */
    .checkbox-medium .checkbox-box {
      width: 1.25rem;
      height: 1.25rem;
    }

    /* Large */
    .checkbox-large .checkbox-box {
      width: 1.5rem;
      height: 1.5rem;
    }

    .checkbox-large .checkbox-icon {
      font-size: 1.25rem;
    }

    .checkbox-large .checkbox-label-text {
      font-size: 1rem;
    }

    .checkbox-large .checkbox-description {
      font-size: 0.875rem;
    }

    /* ========== COLORS ========== */

    .checkbox-wrapper.checked .checkbox-box-primary,
    .checkbox-wrapper.indeterminate .checkbox-box-primary {
      border-color: #009ADA;
      background: #009ADA;
    }

    .checkbox-wrapper.checked .checkbox-box-success,
    .checkbox-wrapper.indeterminate .checkbox-box-success {
      border-color: #28a745;
      background: #28a745;
    }

    .checkbox-wrapper.checked .checkbox-box-danger,
    .checkbox-wrapper.indeterminate .checkbox-box-danger {
      border-color: #dc3545;
      background: #dc3545;
    }

    .checkbox-wrapper.checked .checkbox-box-warning,
    .checkbox-wrapper.indeterminate .checkbox-box-warning {
      border-color: #ffc107;
      background: #ffc107;
    }

    .checkbox-wrapper.checked .checkbox-box-info,
    .checkbox-wrapper.indeterminate .checkbox-box-info {
      border-color: #17a2b8;
      background: #17a2b8;
    }

    .checkbox-wrapper.checked .checkbox-box-dark,
    .checkbox-wrapper.indeterminate .checkbox-box-dark {
      border-color: #343a40;
      background: #343a40;
    }

    /* ========== VARIANTS ========== */

    /* Rounded */
    .checkbox-rounded .checkbox-box {
      border-radius: 9999px;
    }

    /* Button Style */
    .checkbox-button {
      padding: 0.625rem 1.25rem;
      border: 2px solid #e5e7eb;
      border-radius: 0.375rem;
      background: white;
      transition: all 0.2s;
    }

    .checkbox-button:hover:not(.disabled) {
      border-color: #009ADA;
      background: rgba(0, 154, 218, 0.05);
    }

    .checkbox-button.checked {
      border-color: #009ADA;
      background: #009ADA;
    }

    .checkbox-button.checked .checkbox-label-text {
      color: white;
    }

    .checkbox-button .checkbox-box {
      display: none;
    }

    /* Card Style */
    .checkbox-card {
      padding: 1.25rem;
      border: 2px solid #e5e7eb;
      border-radius: 0.5rem;
      background: white;
      transition: all 0.2s;
      width: 100%;
    }

    .checkbox-card:hover:not(.disabled) {
      border-color: #009ADA;
      box-shadow: 0 4px 6px rgba(0, 154, 218, 0.1);
    }

    .checkbox-card.checked {
      border-color: #009ADA;
      background: rgba(0, 154, 218, 0.05);
    }

    .checkbox-card .checkbox-box {
      position: absolute;
      top: 1rem;
      right: 1rem;
    }
  `]
})
export class CheckboxComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() description = '';
  @Input() checked = false;
  @Input() disabled = false;
  @Input() indeterminate = false;
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() color: 'primary' | 'success' | 'danger' | 'warning' | 'info' | 'dark' = 'primary';
  @Input() variant: 'default' | 'rounded' | 'button' | 'card' = 'default';
  @Input() icon = 'check';

  @Output() checkedChange = new EventEmitter<boolean>();

  onChange: any = () => {};
  onTouched: any = () => {};

  onCheckboxChange(event: Event) {
    if (this.disabled) return;

    const target = event.target as HTMLInputElement;
    this.checked = target.checked;
    this.indeterminate = false;

    this.onChange(this.checked);
    this.checkedChange.emit(this.checked);
  }

  // ControlValueAccessor
  writeValue(value: boolean): void {
    this.checked = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
