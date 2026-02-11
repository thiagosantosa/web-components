// projects/web-components/src/lib/components/select/select.component.ts
import { Component, Input, Output, EventEmitter, forwardRef, HostListener, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';

export interface SelectOption {
  value: any;
  label: string;
  disabled?: boolean;
  icon?: string;
  description?: string;
}

@Component({
  selector: 'web-select',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SelectComponent),
    multi: true
  }],
  template: `
    <div class="select-wrapper">
      <label *ngIf="label" [for]="id" class="select-label">
        {{ label }}
        <span *ngIf="required" class="required">*</span>
      </label>
      
      <div class="select-container" [class.disabled]="disabled" [class.readonly]="readonly">
        <!-- Native Select (fallback) -->
        <select
          *ngIf="useNative"
          [id]="id"
          [disabled]="disabled"
          [required]="required"
          [class.error]="error"
          [class.success]="success"
          [(ngModel)]="value"
          (blur)="onTouched()"
          (change)="onNativeChange($event)">
          <option value="" disabled [selected]="!value">{{ placeholder }}</option>
          <ng-container *ngFor="let option of options">
            <option [value]="option.value" [disabled]="option.disabled">
              {{ option.label }}
            </option>
          </ng-container>
        </select>

        <!-- Custom Select -->
        <div 
          *ngIf="!useNative"
          #selectTrigger
          class="select-trigger"
          [class.error]="error"
          [class.success]="success"
          [class.open]="isOpen"
          [class.has-value]="hasValue"
          [class.searchable]="searchable"
          (click)="toggle()"
          [tabindex]="disabled || readonly ? -1 : 0"
          (keydown.enter)="toggle(); $event.preventDefault()"
          (keydown.space)="toggle(); $event.preventDefault()"
          (keydown.escape)="close()"
          (keydown.arrowdown)="onArrowDown($event)"
          (keydown.arrowup)="onArrowUp($event)">
          
          <span *ngIf="icon && !searchable" class="material-symbols-outlined select-icon">
            {{ icon }}
          </span>
          
          <!-- Display selected value(s) -->
          <div class="select-value" *ngIf="!searchable || !isOpen">
            <ng-container *ngIf="!multiple">
              <span *ngIf="selectedOption && selectedOption.icon" class="material-symbols-outlined option-icon">
                {{ selectedOption.icon }}
              </span>
              <span class="value-text" [class.placeholder]="!selectedOption">
                {{ selectedOption?.label || placeholder }}
              </span>
            </ng-container>
            
            <ng-container *ngIf="multiple">
              <div *ngIf="selectedOptions.length === 0" class="placeholder">
                {{ placeholder }}
              </div>
              <div *ngIf="selectedOptions.length > 0" class="selected-tags">
                <span 
                  *ngFor="let option of selectedOptions.slice(0, maxTags)" 
                  class="tag"
                  (click)="removeOption(option, $event)">
                  {{ option.label }}
                  <span class="material-symbols-outlined tag-remove">close</span>
                </span>
                <span *ngIf="selectedOptions.length > maxTags" class="tag tag-more">
                  +{{ selectedOptions.length - maxTags }}
                </span>
              </div>
            </ng-container>
          </div>
          
          <!-- Search input -->
          <input
            *ngIf="searchable && isOpen"
            #searchInput
            type="text"
            class="select-search-input"
            [(ngModel)]="searchTerm"
            [placeholder]="searchPlaceholder"
            (click)="$event.stopPropagation()"
            (input)="onSearch()"
            (keydown.escape)="close()"
            (keydown.enter)="selectHighlighted($event)">
          
          <!-- Clear button -->
          <button
            *ngIf="clearable && hasValue && !disabled && !readonly"
            type="button"
            class="select-clear"
            (click)="clear($event)"
            tabindex="-1">
            <span class="material-symbols-outlined">close</span>
          </button>
          
          <!-- Dropdown arrow -->
          <span class="material-symbols-outlined select-arrow" [class.open]="isOpen">
            {{ isOpen ? 'expand_less' : 'expand_more' }}
          </span>
        </div>

        <!-- Dropdown -->
        <div 
          *ngIf="!useNative && isOpen" 
          class="select-dropdown"
          [class.dropdown-above]="dropdownPosition === 'above'">
          
          <!-- Loading state -->
          <div *ngIf="loading" class="select-loading">
            <div class="spinner"></div>
            <span>{{ loadingText }}</span>
          </div>
          
          <!-- Empty state -->
          <div *ngIf="!loading && filteredOptions.length === 0" class="select-empty">
            <span class="material-symbols-outlined">search_off</span>
            <span>{{ emptyText }}</span>
          </div>
          
          <!-- Options list -->
          <div *ngIf="!loading && filteredOptions.length > 0" class="select-options">
            <div
              *ngFor="let option of filteredOptions; let i = index"
              class="select-option"
              [class.selected]="isSelected(option)"
              [class.highlighted]="highlightedIndex === i"
              [class.disabled]="option.disabled"
              (mousedown)="selectOptionOnMouseDown(option, $event)"
              (mouseenter)="highlightedIndex = i">
              
              <span *ngIf="multiple" class="option-checkbox">
                <span class="material-symbols-outlined">
                  {{ isSelected(option) ? 'check_box' : 'check_box_outline_blank' }}
                </span>
              </span>
              
              <span *ngIf="option.icon" class="material-symbols-outlined option-icon">
                {{ option.icon }}
              </span>
              
              <div class="option-content">
                <div class="option-label">{{ option.label }}</div>
                <div *ngIf="option.description" class="option-description">
                  {{ option.description }}
                </div>
              </div>
              
              <span *ngIf="!multiple && isSelected(option)" class="material-symbols-outlined option-check">
                check
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Footer messages -->
      <div class="select-footer">
        <span *ngIf="error && errorMessage" class="error-message">
          <span class="material-symbols-outlined">error</span>
          {{ errorMessage }}
        </span>
        <span *ngIf="success && successMessage" class="success-message">
          <span class="material-symbols-outlined">check_circle</span>
          {{ successMessage }}
        </span>
        <span *ngIf="helperText && !error && !success" class="helper-text">
          {{ helperText }}
        </span>
      </div>
    </div>
  `,
  styles: [`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200');

    .select-wrapper {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      font-family: "Montserrat", sans-serif;
      width: 100%;
      position: relative;
    }
    
    .select-label {
      font-size: 0.875rem;
      font-weight: 500;
      color: #443A3A;
      display: block;
    }
    
    .required {
      color: #dc3545;
      margin-left: 0.125rem;
    }
    
    .select-container {
      position: relative;
    }
    
    .select-container.disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
    
    /* Native Select */
    select {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #CED4DA;
      border-radius: 0.375rem;
      font-size: 1rem;
      font-family: "Montserrat", sans-serif;
      font-weight: 400;
      color: #443A3A;
      background: white;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    
    select:focus {
      outline: none;
      border-color: #007bff;
      box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
    }
    
    select.error {
      border-color: #dc3545;
    }
    
    select.success {
      border-color: #28a745;
    }
    
    select:disabled {
      background-color: #f8f9fa;
      cursor: not-allowed;
    }
    
    /* Custom Select Trigger */
    .select-trigger {
      width: 100%;
      min-height: 0.075rem;
      padding: 0.75rem;
      border: 1px solid #CED4DA;
      border-radius: 0.375rem;
      background: white;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      transition: all 0.2s ease;
      position: relative;
    }
    
    .select-trigger:hover:not(.disabled) {
      border-color: #adb5bd;
    }
    
    .select-trigger:focus {
      outline: none;
      border-color: #007bff;
      box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
    }
    
    .select-trigger.open {
      border-color: #007bff;
      box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
    }
    
    .select-trigger.error {
      border-color: #dc3545;
    }
    
    .select-trigger.error:focus,
    .select-trigger.error.open {
      box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.1);
    }
    
    .select-trigger.success {
      border-color: #28a745;
    }
    
    .select-trigger.success:focus,
    .select-trigger.success.open {
      box-shadow: 0 0 0 3px rgba(40, 167, 69, 0.1);
    }
    
    .disabled .select-trigger {
      background-color: #f8f9fa;
      cursor: not-allowed;
      color: #6c757d;
    }
    
    .readonly .select-trigger {
      background-color: #f8f9fa;
      cursor: default;
    }
    
    /* Select Icon */
    .select-icon {
      color: #6c757d;
      font-size: 1.25rem;
      flex-shrink: 0;
    }
    
    /* Select Value */
    .select-value {
      flex: 1;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      min-height: 1.25rem;
      overflow: hidden;
    }
    
    .value-text {
      color: #443A3A;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 1rem;
      line-height: 1.25;
    }
    
    .value-text.placeholder,
    .placeholder {
      color: #ADB5BD;
    }
    
    /* Search Input */
    .select-search-input {
      flex: 1;
      border: none;
      outline: none;
      font-size: 1rem;
      font-family: "Montserrat", sans-serif;
      color: #443A3A;
      background: transparent;
      padding: 0;
      line-height: 1.25;
    }
    
    .select-search-input::placeholder {
      color: #ADB5BD;
    }
    
    /* Tags (Multiple) */
    .selected-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.25rem;
      flex: 1;
    }
    
    .tag {
      display: inline-flex;
      align-items: center;
      gap: 0.25rem;
      padding: 0.25rem 0.5rem;
      background: #e9ecef;
      border-radius: 0.25rem;
      font-size: 0.875rem;
      color: #495057;
      max-width: 150px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    
    .tag-remove {
      font-size: 1rem;
      cursor: pointer;
      color: #6c757d;
      transition: color 0.2s;
    }
    
    .tag-remove:hover {
      color: #dc3545;
    }
    
    .tag-more {
      background: #dee2e6;
      font-weight: 500;
    }
    
    /* Clear & Arrow buttons */
    .select-clear,
    .select-arrow {
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .select-clear {
      background: none;
      border: none;
      color: #6c757d;
      cursor: pointer;
      padding: 0.25rem;
      border-radius: 0.25rem;
      transition: all 0.2s;
      font-size: 1.25rem;
    }
    
    .select-clear:hover {
      background: #f8f9fa;
      color: #495057;
    }
    
    .select-arrow {
      color: #6c757d;
      font-size: 1.5rem;
      transition: transform 0.2s;
      pointer-events: none;
    }
    
    /* Dropdown */
    .select-dropdown {
      position: absolute;
      top: calc(100% + 0.25rem);
      left: 0;
      right: 0;
      background: white;
      border: 1px solid #CED4DA;
      border-radius: 0.375rem;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
      z-index: 1000;
      max-height: 300px;
      overflow-y: auto;
      animation: slideDown 0.2s ease;
    }
    
    .dropdown-above {
      top: auto;
      bottom: calc(100% + 0.25rem);
      animation: slideUp 0.2s ease;
    }
    
    @keyframes slideDown {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    @keyframes slideUp {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    /* Loading */
    .select-loading {
      padding: 2rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.75rem;
      color: #6c757d;
    }
    
    .spinner {
      width: 2rem;
      height: 2rem;
      border: 3px solid #e9ecef;
      border-top-color: #007bff;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }
    
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    
    /* Empty */
    .select-empty {
      padding: 2rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
      color: #6c757d;
      font-size: 0.875rem;
    }
    
    .select-empty .material-symbols-outlined {
      font-size: 2rem;
      opacity: 0.5;
    }
    
    /* Options */
    .select-options {
      padding: 0.25rem;
    }
    
    .select-option {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.75rem;
      border-radius: 0.25rem;
      cursor: pointer;
      transition: all 0.15s;
      color: #443A3A;
      user-select: none;
    }
    
    .select-option:hover:not(.disabled) {
      background: #f8f9fa;
    }
    
    .select-option.highlighted:not(.disabled) {
      background: #e9ecef;
    }
    
    .select-option.selected {
      background: #e7f3ff;
      color: #0056b3;
    }
    
    .select-option.disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    
    .option-checkbox,
    .option-icon,
    .option-check {
      flex-shrink: 0;
      display: flex;
      align-items: center;
      font-size: 1.25rem;
    }
    
    .option-checkbox {
      color: #6c757d;
    }
    
    .option-checkbox .material-symbols-outlined {
      font-size: 1.5rem;
    }
    
    .select-option.selected .option-checkbox {
      color: #007bff;
    }
    
    .option-content {
      flex: 1;
      min-width: 0;
    }
    
    .option-label {
      font-size: 0.9375rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    
    .option-description {
      font-size: 0.8125rem;
      color: #6c757d;
      margin-top: 0.125rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    
    .option-check {
      color: #007bff;
    }
    
    /* Footer */
    .select-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 0.5rem;
      min-height: 1.25rem;
    }
    
    .error-message,
    .success-message {
      display: flex;
      align-items: center;
      gap: 0.25rem;
      font-size: 0.875rem;
      flex: 1;
    }
    
    .error-message {
      color: #dc3545;
    }
    
    .error-message .material-symbols-outlined {
      font-size: 1rem;
    }
    
    .success-message {
      color: #28a745;
    }
    
    .success-message .material-symbols-outlined {
      font-size: 1rem;
    }
    
    .helper-text {
      color: #6c757d;
      font-size: 0.875rem;
      flex: 1;
    }
    
    /* Material Icons */
    .material-symbols-outlined {
      font-variation-settings:
        'FILL' 0,
        'wght' 400,
        'GRAD' 0,
        'opsz' 24;
      user-select: none;
    }
  `]
})
export class SelectComponent implements ControlValueAccessor {
  @ViewChild('selectTrigger') selectTrigger?: ElementRef;
  @ViewChild('searchInput') searchInput?: ElementRef;

  // Basic props
  @Input() id = `select-${Math.random().toString(36).substr(2, 9)}`;
  @Input() label = '';
  @Input() placeholder = 'Selecione uma opção';
  @Input() disabled = false;
  @Input() readonly = false;
  @Input() required = false;
  
  // Options
  @Input() options: SelectOption[] = [];
  
  // Behavior
  @Input() multiple = false;
  @Input() searchable = false;
  @Input() clearable = false;
  @Input() useNative = false;
  
  // Search
  @Input() searchPlaceholder = 'Buscar...';
  @Input() searchKeys: string[] = ['label'];
  
  // Loading
  @Input() loading = false;
  @Input() loadingText = 'Carregando...';
  @Input() emptyText = 'Nenhuma opção encontrada';
  
  // Validation
  @Input() error = false;
  @Input() success = false;
  @Input() errorMessage = '';
  @Input() successMessage = '';
  @Input() helperText = '';
  
  // Visual
  @Input() icon = '';
  @Input() maxTags = 3;
  @Input() dropdownPosition: 'below' | 'above' = 'below';
  
  // Events
  @Output() changed = new EventEmitter<any>();
  @Output() searched = new EventEmitter<string>();
  @Output() opened = new EventEmitter<void>();
  @Output() closed = new EventEmitter<void>();

  private _value: any = null;
  private _values: any[] = [];
  
  isOpen = false;
  searchTerm = '';
  highlightedIndex = 0;

  onChange: any = () => {};
  onTouched: any = () => {};

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const dropdown = document.querySelector('.select-dropdown');
    
    if (this.selectTrigger && 
        !this.selectTrigger.nativeElement.contains(target) &&
        (!dropdown || !dropdown.contains(target))) {
      this.close();
    }
  }

  get value() {
    return this.multiple ? this._values : this._value;
  }

  set value(val: any) {
    if (this.multiple) {
      this._values = Array.isArray(val) ? val : [];
    } else {
      this._value = val;
    }
    this.onChange(this.value);
    this.changed.emit(this.value);
  }

  get hasValue(): boolean {
    return this.multiple ? this._values.length > 0 : this._value != null && this._value !== '';
  }

  get filteredOptions(): SelectOption[] {
    return this.filterOptions(this.options);
  }

  get selectedOption(): SelectOption | undefined {
    if (this.multiple) return undefined;
    return this.options.find(opt => opt.value === this._value);
  }

  get selectedOptions(): SelectOption[] {
    if (!this.multiple) return [];
    return this.options.filter(opt => this._values.includes(opt.value));
  }

  filterOptions(options: SelectOption[]): SelectOption[] {
    if (!this.searchTerm) return options;
    
    const term = this.searchTerm.toLowerCase();
    return options.filter(option => {
      return this.searchKeys.some(key => {
        const value = (option as any)[key];
        return value && value.toString().toLowerCase().includes(term);
      });
    });
  }

  toggle() {
    if (this.disabled || this.readonly) return;
    
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  open() {
    if (this.disabled || this.readonly) return;
    
    this.isOpen = true;
    this.highlightedIndex = 0;
    this.opened.emit();
    
    if (this.searchable) {
      setTimeout(() => {
        this.searchInput?.nativeElement.focus();
      }, 0);
    }
  }

  close() {
    this.isOpen = false;
    this.searchTerm = '';
    this.closed.emit();
  }

  selectOptionOnMouseDown(option: SelectOption, event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    
    if (option.disabled) return;
    
    if (this.multiple) {
      const index = this._values.indexOf(option.value);
      if (index > -1) {
        this._values.splice(index, 1);
      } else {
        this._values.push(option.value);
      }
      this._values = [...this._values];
      this.onChange(this._values);
      this.changed.emit(this._values);
    } else {
      this._value = option.value;
      this.onChange(this._value);
      this.changed.emit(this._value);
      setTimeout(() => this.close(), 10);
    }
  }

  removeOption(option: SelectOption, event: Event) {
    event.stopPropagation();
    const index = this._values.indexOf(option.value);
    if (index > -1) {
      this._values.splice(index, 1);
      this._values = [...this._values];
      this.onChange(this._values);
      this.changed.emit(this._values);
    }
  }

  clear(event?: Event) {
    event?.stopPropagation();
    if (this.multiple) {
      this._values = [];
      this.onChange(this._values);
      this.changed.emit(this._values);
    } else {
      this._value = null;
      this.onChange(this._value);
      this.changed.emit(this._value);
    }
  }

  isSelected(option: SelectOption): boolean {
    if (this.multiple) {
      return this._values.includes(option.value);
    }
    return this._value === option.value;
  }

  onSearch() {
    this.highlightedIndex = 0;
    this.searched.emit(this.searchTerm);
  }

  onArrowDown(event: Event) {
    event.preventDefault();
    if (!this.isOpen) {
      this.open();
      return;
    }
    
    const maxIndex = this.filteredOptions.length - 1;
    if (this.highlightedIndex < maxIndex) {
      this.highlightedIndex++;
    }
  }

  onArrowUp(event: Event) {
    event.preventDefault();
    if (this.highlightedIndex > 0) {
      this.highlightedIndex--;
    }
  }

  selectHighlighted(event: Event) {
    event.preventDefault();
    const option = this.filteredOptions[this.highlightedIndex];
    if (option) {
      this.selectOptionOnMouseDown(option, event as MouseEvent);
    }
  }

  onNativeChange(event: any) {
    const value = event.target.value;
    if (this.multiple) {
      this._values = Array.isArray(value) ? value : [value];
      this.onChange(this._values);
      this.changed.emit(this._values);
    } else {
      this._value = value;
      this.onChange(this._value);
      this.changed.emit(this._value);
    }
  }

  // ControlValueAccessor
  writeValue(value: any): void {
    if (this.multiple) {
      this._values = Array.isArray(value) ? value : [];
    } else {
      this._value = value;
    }
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