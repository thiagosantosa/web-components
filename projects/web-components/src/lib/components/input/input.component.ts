import { Component, Input, forwardRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';

export type InputType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'date' | 'time' | 'datetime-local' | 'cpf' | 'cnpj' | 'phone' | 'cep' | 'currency';

@Component({
  selector: 'web-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputComponent),
    multi: true
  }],
  template: `
    <div class="input-wrapper" [class.has-icon]="icon">
      <label *ngIf="label" [for]="id" class="input-label">
        {{ label }}
        <span *ngIf="required" class="required">*</span>
      </label>

      <div class="input-container">
        <span *ngIf="icon" class="material-symbols-outlined input-icon input-icon-left">
          {{ icon }}
        </span>

        <span *ngIf="prefix" class="input-prefix">{{ prefix }}</span>

        <input
          [id]="id"
          [type]="getHtmlInputType()"
          [placeholder]="placeholder"
          [disabled]="disabled"
          [readonly]="readonly"
          [min]="min"
          [max]="max"
          [step]="step"
          [maxlength]="maxLength"
          [class.error]="error"
          [class.success]="success"
          [class.has-prefix]="prefix"
          [class.has-suffix]="suffix"
          [class.has-icon]="icon"
          [value]="displayValue"
          (input)="onInput($event)"
          (keypress)="onKeyPress($event)"
          (paste)="onPaste($event)"
          (blur)="onBlur()"
          (focus)="onFocus()"
        />

        <span *ngIf="suffix" class="input-suffix">{{ suffix }}</span>

        <button
          *ngIf="clearable && value && !disabled && !readonly"
          type="button"
          class="input-clear"
          (click)="clear()"
          tabindex="-1">
          <span class="material-symbols-outlined">close</span>
        </button>

        <button
          *ngIf="type === 'password'"
          type="button"
          class="input-toggle-password"
          (click)="togglePasswordVisibility()"
          tabindex="-1">
          <span class="material-symbols-outlined">
            {{ showPassword ? 'visibility_off' : 'visibility' }}
          </span>
        </button>
      </div>

      <div class="input-footer">
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
        <span *ngIf="showCharCount && maxLength" class="char-count">
          {{ value?.length || 0 }}/{{ maxLength }}
        </span>
      </div>
    </div>
  `,
  styles: [`

    .input-wrapper {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      font-family: "Montserrat", sans-serif;
      width: 100%;
    }

    .input-label {
      font-size: 0.875rem;
      font-weight: 500;
      color: #443A3A;
      display: block;
    }

    .required {
      color: #dc3545;
      margin-left: 0.125rem;
    }

    .input-container {
      position: relative;
      display: flex;
      align-items: center;
    }

    input {
      width: 100%;
      padding: 0.95rem;
      border: 1px solid #CED4DA;
      border-radius: 0.375rem;
      font-size: 1rem;
      font-family: "Montserrat", sans-serif;
      font-weight: 400;
      color: #443A3A;
      transition: all 0.2s ease;
      background: white;
    }

    input.has-prefix {
      padding-left: 3rem;
    }

    input.has-suffix {
      padding-right: 3rem;
    }

    input.has-icon {
      padding-left: 3rem;
    }

    input:focus {
      outline: none;
      border-color: #007bff;
      box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
    }

    input.error {
      border-color: #dc3545;
    }

    input.error:focus {
      box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.1);
    }

    input.success {
      border-color: #28a745;
    }

    input.success:focus {
      box-shadow: 0 0 0 3px rgba(40, 167, 69, 0.1);
    }

    input:disabled,
    input:readonly {
      background-color: #f8f9fa;
      cursor: not-allowed;
      color: #6c757d;
    }

    input::placeholder {
      color: #ADB5BD;
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

    /* Icons and affixes */
    .input-icon,
    .input-prefix,
    .input-suffix {
      position: absolute;
      color: #6c757d;
      font-size: 0.875rem;
      pointer-events: none;
    }

    .input-icon-left {
      left: 0.75rem;
      font-size: 1.25rem;
      display: flex;
      align-items: center;
    }

    .input-prefix {
      left: 0.75rem;
      font-weight: 500;
    }

    .input-suffix {
      right: 0.75rem;
      font-weight: 500;
    }

    /* Action buttons */
    .input-clear,
    .input-toggle-password {
      position: absolute;
      right: 0.5rem;
      background: none;
      border: none;
      color: #6c757d;
      cursor: pointer;
      padding: 0.375rem;
      font-size: 1.25rem;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 0.25rem;
      transition: all 0.2s;
      line-height: 1;
    }

    .input-clear:hover,
    .input-toggle-password:hover {
      background: #f8f9fa;
      color: #495057;
    }

    .input-toggle-password {
      right: 0.5rem;
    }

    /* Footer */
    .input-footer {
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

    .char-count {
      color: #6c757d;
      font-size: 0.75rem;
      white-space: nowrap;
    }
  `]
})
export class InputComponent implements ControlValueAccessor, OnInit {
  // Basic props
  @Input() id = `input-${Math.random().toString(36).substr(2, 9)}`;
  @Input() label = '';
  @Input() type: InputType = 'text';
  @Input() placeholder = '';
  @Input() disabled = false;
  @Input() readonly = false;
  @Input() required = false;

  // Validation
  @Input() error = false;
  @Input() success = false;
  @Input() errorMessage = '';
  @Input() successMessage = '';
  @Input() helperText = '';

  // Number constraints
  @Input() min?: number;
  @Input() max?: number;
  @Input() step?: number;

  // Text constraints
  @Input() maxLength?: number;
  @Input() showCharCount = false;

  // Visual enhancements (Material Icons)
  @Input() icon = ''; // Ex: 'search', 'email', 'lock', 'phone', etc.
  @Input() prefix = '';
  @Input() suffix = '';
  @Input() clearable = false;

  private _value = '';
  showPassword = false;
  displayValue = '';

  ngOnInit() {
    this.updateDisplayValue();
  }

  get value() {
    return this._value;
  }

  set value(val: string) {
    this._value = val;
    this.updateDisplayValue();
    this.onChange(val);
  }

  onChange: any = () => {};
  onTouched: any = () => {};

  getHtmlInputType(): string {
    if (this.type === 'password' && this.showPassword) {
      return 'text';
    }

    // Todos os tipos com máscara usam type="text"
    const maskedTypes = ['cpf', 'cnpj', 'phone', 'cep', 'currency'];
    if (maskedTypes.includes(this.type)) {
      return 'text';
    }

    return this.type;
  }

  onKeyPress(event: KeyboardEvent): boolean {
    const maskedTypes = ['cpf', 'cnpj', 'phone', 'cep', 'currency', 'number'];

    // Permitir apenas números para tipos com máscara
    if (maskedTypes.includes(this.type)) {
      const char = event.key;
      const isNumber = /^[0-9]$/.test(char);
      const isControlKey = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(event.key);

      if (!isNumber && !isControlKey) {
        event.preventDefault();
        return false;
      }
    }

    return true;
  }

  onPaste(event: ClipboardEvent): void {
    const maskedTypes = ['cpf', 'cnpj', 'phone', 'cep', 'currency'];

    if (maskedTypes.includes(this.type)) {
      event.preventDefault();
      const pastedText = event.clipboardData?.getData('text') || '';
      const numbersOnly = pastedText.replace(/\D/g, '');

      if (numbersOnly) {
        const input = event.target as HTMLInputElement;
        const formatted = this.applyMaskByType(numbersOnly);
        input.value = formatted;
        this.displayValue = formatted;
        this._value = numbersOnly;
        this.onChange(numbersOnly);
      }
    }
  }

  onInput(event: any) {
    let value = event.target.value;

    const maskedTypes = ['cpf', 'cnpj', 'phone', 'cep', 'currency'];

    if (maskedTypes.includes(this.type)) {
      // Remover tudo que não é número
      const numbersOnly = value.replace(/\D/g, '');

      // Aplicar a máscara
      const formatted = this.applyMaskByType(numbersOnly);

      // Atualizar o display
      this.displayValue = formatted;
      event.target.value = formatted;

      // Salvar apenas os números
      this._value = numbersOnly;
      this.onChange(numbersOnly);
    } else {
      this._value = value;
      this.displayValue = value;
      this.onChange(value);
    }
  }

  onBlur() {
    this.onTouched();
  }

  onFocus() {
    // Additional focus logic if needed
  }

  clear() {
    this._value = '';
    this.displayValue = '';
    this.onChange('');
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  applyMaskByType(numbers: string): string {
    switch (this.type) {
      case 'cpf':
        return this.formatCPF(numbers);
      case 'cnpj':
        return this.formatCNPJ(numbers);
      case 'phone':
        return this.formatPhone(numbers);
      case 'cep':
        return this.formatCEP(numbers);
      case 'currency':
        return this.formatCurrency(numbers);
      default:
        return numbers;
    }
  }

  formatCPF(value: string): string {
    value = value.substring(0, 11);
    if (value.length <= 3) return value;
    if (value.length <= 6) return value.replace(/(\d{3})(\d+)/, '$1.$2');
    if (value.length <= 9) return value.replace(/(\d{3})(\d{3})(\d+)/, '$1.$2.$3');
    return value.replace(/(\d{3})(\d{3})(\d{3})(\d+)/, '$1.$2.$3-$4');
  }

  formatCNPJ(value: string): string {
    value = value.substring(0, 14);
    if (value.length <= 2) return value;
    if (value.length <= 5) return value.replace(/(\d{2})(\d+)/, '$1.$2');
    if (value.length <= 8) return value.replace(/(\d{2})(\d{3})(\d+)/, '$1.$2.$3');
    if (value.length <= 12) return value.replace(/(\d{2})(\d{3})(\d{3})(\d+)/, '$1.$2.$3/$4');
    return value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d+)/, '$1.$2.$3/$4-$5');
  }

  formatPhone(value: string): string {
    value = value.substring(0, 11);
    if (value.length <= 2) return value;
    if (value.length <= 6) return value.replace(/(\d{2})(\d+)/, '($1) $2');
    if (value.length <= 10) return value.replace(/(\d{2})(\d{4})(\d+)/, '($1) $2-$3');
    return value.replace(/(\d{2})(\d{5})(\d+)/, '($1) $2-$3');
  }

  formatCEP(value: string): string {
    value = value.substring(0, 8);
    if (value.length <= 5) return value;
    return value.replace(/(\d{5})(\d+)/, '$1-$2');
  }

  formatCurrency(value: string): string {
    if (!value) return '';
    const numbers = value.substring(0, 15); // Limitar tamanho
    const amount = parseFloat(numbers) / 100;
    return amount.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  updateDisplayValue() {
    if (!this._value) {
      this.displayValue = '';
      return;
    }

    const maskedTypes = ['cpf', 'cnpj', 'phone', 'cep', 'currency'];

    if (maskedTypes.includes(this.type)) {
      this.displayValue = this.applyMaskByType(this._value);
    } else {
      this.displayValue = this._value;
    }
  }

  // ControlValueAccessor implementation
  writeValue(value: any): void {
    this._value = value || '';
    this.updateDisplayValue();
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
