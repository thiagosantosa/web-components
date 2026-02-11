import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'web-radio',
  standalone: true,
  imports: [CommonModule],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => RadioComponent),
    multi: true
  }],
  template: `
    <label class="radio-wrapper" 
           [class]="'radio-' + size + ' radio-' + variant"
           [class.disabled]="disabled"
           [class.checked]="isChecked()">
      
      <input 
        type="radio"
        class="radio-input"
        [name]="name"
        [value]="value"
        [checked]="isChecked()"
        [disabled]="disabled"
        (change)="onRadioChange()">
      
      <span class="radio-circle" [class]="'radio-circle-' + color">
        <span class="radio-dot"></span>
      </span>
      
      <span class="radio-label" *ngIf="label || description">
        <span class="radio-label-text">{{ label }}</span>
        <span class="radio-description" *ngIf="description">{{ description }}</span>
      </span>
      
      <ng-content></ng-content>
    </label>
  `,
  styles: [`
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200');
    
    /* Wrapper */
    .radio-wrapper {
      display: inline-flex;
      align-items: flex-start;
      gap: 0.75rem;
      cursor: pointer;
      font-family: "Montserrat", sans-serif;
      user-select: none;
      position: relative;
    }
    
    .radio-wrapper.disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    
    /* Hidden Input */
    .radio-input {
      position: absolute;
      opacity: 0;
      width: 0;
      height: 0;
    }
    
    /* Radio Circle */
    .radio-circle {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      width: 1.25rem;
      height: 1.25rem;
      border: 2px solid #ccc;
      border-radius: 50%;
      background: white;
      transition: all 0.2s ease;
      position: relative;
    }
    
    .radio-wrapper:hover:not(.disabled) .radio-circle {
      border-color: #009ADA;
    }
    
    /* Radio Dot */
    .radio-dot {
      width: 0.625rem;
      height: 0.625rem;
      border-radius: 50%;
      background: white;
      transform: scale(0);
      transition: transform 0.2s ease;
    }
    
    .radio-wrapper.checked .radio-circle {
      border-color: #009ADA;
      background: #009ADA;
    }
    
    .radio-wrapper.checked .radio-dot {
      transform: scale(1);
    }
    
    /* Label */
    .radio-label {
      display: flex;
      flex-direction: column;
      gap: 0.125rem;
    }
    
    .radio-label-text {
      font-size: 0.9375rem;
      font-weight: 500;
      color: #383C3F;
      line-height: 1.5;
    }
    
    .radio-description {
      font-size: 0.8125rem;
      color: #6c757d;
      line-height: 1.4;
    }
    
    /* ========== SIZES ========== */
    
    /* Small */
    .radio-small .radio-circle {
      width: 1rem;
      height: 1rem;
    }
    
    .radio-small .radio-dot {
      width: 0.5rem;
      height: 0.5rem;
    }
    
    .radio-small .radio-label-text {
      font-size: 0.875rem;
    }
    
    .radio-small .radio-description {
      font-size: 0.75rem;
    }
    
    /* Medium (Default) */
    .radio-medium .radio-circle {
      width: 1.25rem;
      height: 1.25rem;
    }
    
    /* Large */
    .radio-large .radio-circle {
      width: 1.5rem;
      height: 1.5rem;
    }
    
    .radio-large .radio-dot {
      width: 0.75rem;
      height: 0.75rem;
    }
    
    .radio-large .radio-label-text {
      font-size: 1rem;
    }
    
    .radio-large .radio-description {
      font-size: 0.875rem;
    }
    
    /* ========== COLORS ========== */
    
    .radio-wrapper.checked .radio-circle-primary {
      border-color: #009ADA;
      background: #009ADA;
    }
    
    .radio-wrapper.checked .radio-circle-success {
      border-color: #28a745;
      background: #28a745;
    }
    
    .radio-wrapper.checked .radio-circle-danger {
      border-color: #dc3545;
      background: #dc3545;
    }
    
    .radio-wrapper.checked .radio-circle-warning {
      border-color: #ffc107;
      background: #ffc107;
    }
    
    .radio-wrapper.checked .radio-circle-info {
      border-color: #17a2b8;
      background: #17a2b8;
    }
    
    .radio-wrapper.checked .radio-circle-dark {
      border-color: #343a40;
      background: #343a40;
    }
    
    /* ========== VARIANTS ========== */
    
    /* Button Style */
    .radio-button {
      padding: 0.625rem 1.25rem;
      border: 2px solid #e5e7eb;
      border-radius: 0.375rem;
      background: white;
      transition: all 0.2s;
    }
    
    .radio-button:hover:not(.disabled) {
      border-color: #009ADA;
      background: rgba(0, 154, 218, 0.05);
    }
    
    .radio-button.checked {
      border-color: #009ADA;
      background: #009ADA;
    }
    
    .radio-button.checked .radio-label-text {
      color: white;
    }
    
    .radio-button .radio-circle {
      display: none;
    }
    
    /* Card Style */
    .radio-card {
      padding: 1.25rem;
      border: 2px solid #e5e7eb;
      border-radius: 0.5rem;
      background: white;
      transition: all 0.2s;
      width: 100%;
    }
    
    .radio-card:hover:not(.disabled) {
      border-color: #009ADA;
      box-shadow: 0 4px 6px rgba(0, 154, 218, 0.1);
    }
    
    .radio-card.checked {
      border-color: #009ADA;
      background: rgba(0, 154, 218, 0.05);
    }
    
    .radio-card .radio-circle {
      position: absolute;
      top: 1rem;
      right: 1rem;
    }
    
    /* Inline */
    .radio-inline {
      margin-right: 1.5rem;
    }
  `]
})
export class RadioComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() description = '';
  @Input() value: any;
  @Input() name = '';
  @Input() disabled = false;
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() color: 'primary' | 'success' | 'danger' | 'warning' | 'info' | 'dark' = 'primary';
  @Input() variant: 'default' | 'button' | 'card' | 'inline' = 'default';
  
  @Output() valueChange = new EventEmitter<any>();
  
  private _selectedValue: any;
  
  onChange: any = () => {};
  onTouched: any = () => {};

  isChecked(): boolean {
    return this._selectedValue === this.value;
  }

  onRadioChange() {
    if (this.disabled) return;
    
    this._selectedValue = this.value;
    this.onChange(this.value);
    this.valueChange.emit(this.value);
  }

  // ControlValueAccessor
  writeValue(value: any): void {
    this._selectedValue = value;
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