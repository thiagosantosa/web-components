import {
  Component,
  Input,
  Output,
  EventEmitter,
  forwardRef,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  HostListener,
  ContentChild,
  TemplateRef,
  Inject,
  Optional,
  Self
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  FormsModule,
  NgControl,
  ReactiveFormsModule
} from '@angular/forms';
import { CdkVirtualScrollViewport, ScrollingModule } from '@angular/cdk/scrolling';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';

export interface AutocompleteOption {
  label: string;
  value: any;
  disabled?: boolean;
  icon?: string;
  description?: string;
  [key: string]: any;
}

@Component({
  selector: 'web-autocomplete',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ScrollingModule],
  template: `
    <div class="input-wrapper" [class.has-icon]="icon" [class.is-open]="isOpen">
      <label *ngIf="label" [for]="id" class="input-label">
        {{ label }}
        <span *ngIf="required" class="required">*</span>
      </label>

      <div class="input-container" #inputContainer>
        <span *ngIf="icon" class="material-symbols-outlined input-icon input-icon-left">
          {{ icon }}
        </span>

        <!-- Selected chips (multi-select) -->
        <div *ngIf="multiple && selectedOptions.length > 0" class="selected-chips">
          <span *ngFor="let option of selectedOptions" class="chip">
            <span class="chip-label">{{ option.label }}</span>
            <button
              *ngIf="!disabled && !readonly"
              type="button"
              class="chip-remove"
              (click)="removeOption(option, $event)"
              tabindex="-1">
              <span class="material-symbols-outlined">close</span>
            </button>
          </span>
        </div>

        <input
          #inputElement
          [id]="id"
          type="text"
          [placeholder]="getPlaceholder()"
          [disabled]="disabled"
          [readonly]="readonly"
          [class.error]="error"
          [class.success]="success"
          [class.has-icon]="icon"
          [class.has-chips]="multiple && selectedOptions.length > 0"
          [(ngModel)]="searchTerm"
          (input)="onInput()"
          (focus)="onFocus()"
          (blur)="onBlur()"
          (keydown)="onKeyDown($event)"
          autocomplete="off"
        />

        <button
          *ngIf="loading"
          type="button"
          class="input-loading"
          tabindex="-1">
          <span class="spinner"></span>
        </button>

        <button
          *ngIf="!loading && clearable && (searchTerm || selectedOptions.length > 0) && !disabled && !readonly"
          type="button"
          class="input-clear"
          (click)="clear()"
          tabindex="-1">
          <span class="material-symbols-outlined">close</span>
        </button>

        <button
          *ngIf="!loading && showArrow"
          type="button"
          class="input-arrow"
          (click)="toggleDropdown($event)"
          [disabled]="disabled || readonly"
          tabindex="-1">
          <span class="material-symbols-outlined">
            {{ isOpen ? 'expand_less' : 'expand_more' }}
          </span>
        </button>
      </div>

      <!-- Dropdown Panel -->
      <div *ngIf="isOpen" class="autocomplete-panel" #panel>

        <!-- Loading State -->
        <div *ngIf="loading" class="panel-loading">
          <span class="spinner"></span>
          <span>Carregando...</span>
        </div>

        <!-- No Results -->
        <div *ngIf="!loading && filteredOptions.length === 0 && !allowCreate" class="no-results">
          <span class="material-symbols-outlined">search_off</span>
          <p>Nenhum resultado encontrado</p>
          <small *ngIf="searchTerm">Tente outro termo de busca</small>
        </div>

        <!-- Create New Option -->
        <div *ngIf="!loading && allowCreate && searchTerm && !hasExactMatch()"
             class="create-option"
             (click)="createNewOption()"
             (mouseenter)="highlightedIndex = -2"
             [class.highlighted]="highlightedIndex === -2">
          <span class="material-symbols-outlined">add</span>
          <span>Criar "{{ searchTerm }}"</span>
        </div>

        <!-- Options with Virtual Scroll -->
        <cdk-virtual-scroll-viewport
          *ngIf="!loading && filteredOptions.length > 0 && virtualScroll"
          [itemSize]="itemHeight"
          [style.height.px]="getViewportHeight()"
          class="options-viewport">

          <div *cdkVirtualFor="let option of filteredOptions; let i = index; trackBy: trackByFn"
               class="option-item"
               [class.option-disabled]="option.disabled"
               [class.option-selected]="isSelected(option)"
               [class.option-highlighted]="highlightedIndex === i"
               (click)="selectOption(option, $event)"
               (mouseenter)="highlightedIndex = i">

            <!-- Custom Template -->
            <ng-container *ngIf="optionTemplate">
              <ng-container *ngTemplateOutlet="optionTemplate; context: { $implicit: option }">
              </ng-container>
            </ng-container>

            <!-- Default Template -->
            <ng-container *ngIf="!optionTemplate">
              <div class="option-content">
                <span *ngIf="option.icon" class="material-symbols-outlined option-icon">
                  {{ option.icon }}
                </span>
                <div class="option-text">
                  <span class="option-label" [innerHTML]="highlightText(option.label)"></span>
                  <span *ngIf="option.description" class="option-description">
                    {{ option.description }}
                  </span>
                </div>
                <span *ngIf="multiple && isSelected(option)"
                      class="material-symbols-outlined option-check">
                  check
                </span>
              </div>
            </ng-container>
          </div>
        </cdk-virtual-scroll-viewport>

        <!-- Options without Virtual Scroll (fallback) -->
        <div *ngIf="!loading && filteredOptions.length > 0 && !virtualScroll"
             class="options-list"
             [style.max-height.px]="maxHeight">

          <div *ngFor="let option of filteredOptions; let i = index; trackBy: trackByFn"
               class="option-item"
               [class.option-disabled]="option.disabled"
               [class.option-selected]="isSelected(option)"
               [class.option-highlighted]="highlightedIndex === i"
               (click)="selectOption(option, $event)"
               (mouseenter)="highlightedIndex = i">

            <!-- Custom Template -->
            <ng-container *ngIf="optionTemplate">
              <ng-container *ngTemplateOutlet="optionTemplate; context: { $implicit: option }">
              </ng-container>
            </ng-container>

            <!-- Default Template -->
            <ng-container *ngIf="!optionTemplate">
              <div class="option-content">
                <span *ngIf="option.icon" class="material-symbols-outlined option-icon">
                  {{ option.icon }}
                </span>
                <div class="option-text">
                  <span class="option-label" [innerHTML]="highlightText(option.label)"></span>
                  <span *ngIf="option.description" class="option-description">
                    {{ option.description }}
                  </span>
                </div>
                <span *ngIf="multiple && isSelected(option)"
                      class="material-symbols-outlined option-check">
                  check
                </span>
              </div>
            </ng-container>
          </div>
        </div>

        <!-- Footer -->
        <div *ngIf="showFooter && multiple && filteredOptions.length > 0" class="panel-footer">
          <button type="button" class="footer-btn" (click)="selectAll()">
            Selecionar todos
          </button>
          <button type="button" class="footer-btn" (click)="clear()">
            Limpar tudo
          </button>
        </div>
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
        <span *ngIf="multiple && maxSelections > 0" class="selection-count">
          {{ selectedOptions.length }}/{{ maxSelections }}
        </span>
      </div>
    </div>
  `,
  styles: [`
    /* ESTILOS IDÊNTICOS AO WEB-INPUT */
    .input-wrapper {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      font-family: "Montserrat", sans-serif;
      width: 100%;
      position: relative;
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
      flex-wrap: wrap;
      gap: 0.375rem;
      padding: 0.5rem 0.75rem;
      border: 1px solid #CED4DA;
      border-radius: 0.375rem;
      background: white;
      transition: all 0.2s ease;
      min-height: 48px;
    }

    .is-open .input-container {
      border-color: #007bff;
      box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
    }

    .input-container:hover:not(:has(input:disabled)) {
      border-color: #ADB5BD;
    }

    /* Selected Chips - EXCLUSIVO AUTOCOMPLETE */
    .selected-chips {
      display: flex;
      flex-wrap: wrap;
      gap: 0.375rem;
    }

    .chip {
      display: inline-flex;
      align-items: center;
      gap: 0.25rem;
      padding: 0.25rem 0.5rem;
      background: #e6f7ff;
      color: #007bff;
      border-radius: 0.25rem;
      font-size: 0.875rem;
      font-weight: 500;
    }

    .chip-label {
      max-width: 150px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .chip-remove {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
      margin: 0;
      border: none;
      background: transparent;
      cursor: pointer;
      color: #007bff;
      transition: color 0.2s;
      line-height: 1;
    }

    .chip-remove:hover {
      color: #0056b3;
    }

    .chip-remove .material-symbols-outlined {
      font-size: 1rem;
    }

    /* Input - IGUAL AO WEB-INPUT */
    input {
      flex: 1;
      min-width: 120px;
      border: none;
      outline: none;
      padding: 0.45rem 0;
      font-size: 1rem;
      font-family: "Montserrat", sans-serif;
      font-weight: 400;
      color: #443A3A;
      background: transparent;
    }

    input.has-icon {
      padding-left: 2rem;
    }

    input.has-chips {
      min-width: 80px;
    }

    input:disabled,
    input:readonly {
      cursor: not-allowed;
      color: #6c757d;
    }

    input::placeholder {
      color: #ADB5BD;
    }

    input.error {
      color: #dc3545;
    }

    input.success {
      color: #28a745;
    }

    /* Material Icons - IGUAL AO WEB-INPUT */
    .material-symbols-outlined {
      font-variation-settings:
        'FILL' 0,
        'wght' 400,
        'GRAD' 0,
        'opsz' 24;
      user-select: none;
    }

    .input-icon-left {
      position: absolute;
      left: 0.75rem;
      color: #6c757d;
      font-size: 1.25rem;
      display: flex;
      align-items: center;
      pointer-events: none;
    }

    /* Action buttons - IGUAL AO WEB-INPUT + Loading */
    .input-loading,
    .input-clear,
    .input-arrow {
      display: flex;
      align-items: center;
      justify-content: center;
      background: none;
      border: none;
      color: #6c757d;
      cursor: pointer;
      padding: 0.375rem;
      font-size: 1.25rem;
      border-radius: 0.25rem;
      transition: all 0.2s;
      flex-shrink: 0;
      line-height: 1;
    }

    .input-clear:hover,
    .input-arrow:hover:not(:disabled) {
      background: #f8f9fa;
      color: #495057;
    }

    .input-arrow:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    /* Loading Spinner */
    .spinner {
      width: 16px;
      height: 16px;
      border: 2px solid #e5e7eb;
      border-top-color: #007bff;
      border-radius: 50%;
      animation: spin 0.6s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    /* Dropdown Panel - NOVO */
    .autocomplete-panel {
      position: absolute;
      top: calc(100% + 0.5rem);
      left: 0;
      right: 0;
      z-index: 1000;
      background: white;
      border: 1px solid #CED4DA;
      border-radius: 0.375rem;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      overflow: hidden;
      animation: slideDown 0.2s ease-out;
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

    /* Panel States */
    .panel-loading,
    .no-results {
      padding: 2rem;
      text-align: center;
      color: #6c757d;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
    }

    .no-results .material-symbols-outlined {
      font-size: 3rem;
      color: #CED4DA;
    }

    .no-results p {
      margin: 0;
      font-weight: 600;
      color: #443A3A;
    }

    .no-results small {
      color: #ADB5BD;
    }

    /* Create Option */
    .create-option {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1rem;
      cursor: pointer;
      border-bottom: 1px solid #f8f9fa;
      color: #007bff;
      font-weight: 600;
      transition: background 0.2s;
    }

    .create-option:hover,
    .create-option.highlighted {
      background: #f0f9ff;
    }

    .create-option .material-symbols-outlined {
      font-size: 1.25rem;
    }

    /* Options Viewport */
    .options-viewport {
      width: 100%;
    }

    .options-viewport::ng-deep .cdk-virtual-scroll-content-wrapper {
      width: 100%;
    }

    .options-list {
      overflow-y: auto;
    }

    .options-list::-webkit-scrollbar {
      width: 6px;
    }

    .options-list::-webkit-scrollbar-track {
      background: #f8f9fa;
    }

    .options-list::-webkit-scrollbar-thumb {
      background: #CED4DA;
      border-radius: 3px;
    }

    /* Option Item */
    .option-item {
      padding: 0.75rem 1rem;
      cursor: pointer;
      transition: background 0.2s;
      border-bottom: 1px solid #f8f9fa;
    }

    .option-item:last-child {
      border-bottom: none;
    }

    .option-item:hover,
    .option-highlighted {
      background: #f8f9fa;
    }

    .option-selected {
      background: #e6f7ff;
    }

    .option-selected:hover,
    .option-selected.option-highlighted {
      background: #d1f0ff;
    }

    .option-disabled {
      opacity: 0.5;
      cursor: not-allowed;
      pointer-events: none;
    }

    .option-content {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .option-icon {
      color: #6c757d;
      font-size: 1.25rem;
      flex-shrink: 0;
    }

    .option-text {
      flex: 1;
      min-width: 0;
    }

    .option-label {
      font-size: 0.9375rem;
      color: #443A3A;
      display: block;
    }

    .option-label ::ng-deep .highlight {
      background: #fef3c7;
      color: #92400e;
      font-weight: 600;
      padding: 0 2px;
      border-radius: 2px;
    }

    .option-description {
      font-size: 0.8125rem;
      color: #6c757d;
      display: block;
      margin-top: 0.125rem;
    }

    .option-check {
      color: #007bff;
      font-size: 1.25rem;
      flex-shrink: 0;
    }

    /* Panel Footer */
    .panel-footer {
      display: flex;
      gap: 0.5rem;
      padding: 0.75rem;
      border-top: 1px solid #f8f9fa;
      background: #f8f9fa;
    }

    .footer-btn {
      flex: 1;
      padding: 0.5rem;
      border: 1px solid #CED4DA;
      background: white;
      border-radius: 0.375rem;
      font-family: "Montserrat", sans-serif;
      font-size: 0.875rem;
      font-weight: 600;
      color: #443A3A;
      cursor: pointer;
      transition: all 0.2s;
    }

    .footer-btn:hover {
      background: #f8f9fa;
      border-color: #007bff;
      color: #007bff;
    }

    /* Footer - IGUAL AO WEB-INPUT */
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

    .selection-count {
      color: #6c757d;
      font-size: 0.75rem;
      white-space: nowrap;
    }
  `]
})
export class AutocompleteComponent implements ControlValueAccessor, OnInit, OnDestroy {
  @ViewChild('inputElement') inputElement!: ElementRef<HTMLInputElement>;
  @ViewChild('panel') panelElement?: ElementRef;
  @ViewChild(CdkVirtualScrollViewport) viewport?: CdkVirtualScrollViewport;

  @ContentChild('optionTemplate') optionTemplate?: TemplateRef<any>;

  // Basic props (IGUAL AO WEB-INPUT)
  @Input() id = `autocomplete-${Math.random().toString(36).substr(2, 9)}`;
  @Input() label = '';
  @Input() placeholder = 'Buscar...';
  @Input() disabled = false;
  @Input() readonly = false;
  @Input() required = false;

  // Validation (IGUAL AO WEB-INPUT)
  @Input() error = false;
  @Input() success = false;
  @Input() errorMessage = '';
  @Input() successMessage = '';
  @Input() helperText = '';

  // Visual (IGUAL AO WEB-INPUT)
  @Input() icon = '';
  @Input() clearable = true;

  // Autocomplete specific (NOVOS)
  @Input() showArrow = true;
  @Input() options: AutocompleteOption[] = [];
  @Input() multiple = false;
  @Input() maxSelections = 0;
  @Input() allowCreate = false;
  @Input() fuzzySearch = true;
  @Input() highlightMatches = true;
  @Input() debounceMs = 300;
  @Input() minSearchLength = 0;
  @Input() itemHeight = 48;
  @Input() maxHeight = 320;
  @Input() virtualScroll = true;
  @Input() showFooter = false;
  @Input() filterFn?: (option: AutocompleteOption, searchTerm: string) => boolean;
  @Input() loading = false;

  @Output() valueChange = new EventEmitter<any>();
  @Output() searchChange = new EventEmitter<string>();
  @Output() optionSelected = new EventEmitter<AutocompleteOption>();
  @Output() optionRemoved = new EventEmitter<AutocompleteOption>();
  @Output() createOption = new EventEmitter<string>();

  searchTerm = '';
  isOpen = false;
  selectedOptions: AutocompleteOption[] = [];
  filteredOptions: AutocompleteOption[] = [];
  highlightedIndex = -1;

  private searchSubject = new Subject<string>();
  private destroy$ = new Subject<void>();
  private onChange: any = () => {};
  private onTouched: any = () => {};

  constructor(@Optional() @Self() public ngControl: NgControl) {
    // Remove o provider padrão e injeta o controle diretamente
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnInit() {
    this.setupSearch();
    this.filterOptions();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private setupSearch() {
    this.searchSubject
      .pipe(
        debounceTime(this.debounceMs),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe(term => {
        this.searchChange.emit(term);
        this.filterOptions();
      });
  }

  // ControlValueAccessor (IGUAL AO WEB-INPUT)
  writeValue(value: any): void {
    if (this.multiple) {
      const values = Array.isArray(value) ? value : [];
      this.selectedOptions = this.options.filter(opt => values.includes(opt.value));
    } else {
      const option = this.options.find(opt => opt.value === value);
      this.selectedOptions = option ? [option] : [];
      if (option && !this.searchTerm) {
        this.searchTerm = option.label;
      }
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

  // Event Handlers
  onInput() {
    if (!this.isOpen) {
      this.open();
    }

    if (this.searchTerm.length >= this.minSearchLength) {
      this.searchSubject.next(this.searchTerm);
    } else {
      this.filterOptions();
    }
  }

  onFocus() {
    if (!this.disabled && !this.readonly) {
      this.open();
    }
  }

  onBlur() {
    this.onTouched();
    setTimeout(() => {
      if (!this.panelElement?.nativeElement.contains(document.activeElement)) {
        this.close();
      }
    }, 200);
  }

  onKeyDown(event: KeyboardEvent) {
    if (this.disabled || this.readonly) return;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        if (!this.isOpen) {
          this.open();
        } else {
          this.highlightNext();
        }
        break;

      case 'ArrowUp':
        event.preventDefault();
        if (this.isOpen) {
          this.highlightPrev();
        }
        break;

      case 'Enter':
        event.preventDefault();
        if (this.isOpen) {
          if (this.highlightedIndex === -2 && this.allowCreate) {
            this.createNewOption();
          } else if (this.highlightedIndex >= 0) {
            const option = this.filteredOptions[this.highlightedIndex];
            if (option && !option.disabled) {
              this.selectOption(option);
            }
          }
        }
        break;

      case 'Escape':
        event.preventDefault();
        this.close();
        break;

      case 'Tab':
        this.close();
        break;

      case 'Backspace':
        if (!this.searchTerm && this.selectedOptions.length > 0) {
          const lastOption = this.selectedOptions[this.selectedOptions.length - 1];
          this.removeOption(lastOption);
        }
        break;
    }
  }

  toggleDropdown(event: Event) {
    event.stopPropagation();
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
      this.inputElement.nativeElement.focus();
    }
  }

  open() {
    if (!this.isOpen) {
      this.isOpen = true;
      this.filterOptions();
    }
  }

  close() {
    if (this.isOpen) {
      this.isOpen = false;
      this.highlightedIndex = -1;

      // Restore selected value in single mode
      if (!this.multiple && this.selectedOptions.length > 0) {
        this.searchTerm = this.selectedOptions[0].label;
      }
    }
  }

  selectOption(option: AutocompleteOption, event?: Event) {
    if (event) {
      event.stopPropagation();
    }

    if (option.disabled) return;

    if (this.multiple) {
      const index = this.selectedOptions.findIndex(opt => opt.value === option.value);

      if (index >= 0) {
        this.removeOption(option);
      } else {
        if (this.maxSelections > 0 && this.selectedOptions.length >= this.maxSelections) {
          return;
        }

        this.selectedOptions = [...this.selectedOptions, option];
        this.optionSelected.emit(option);
        this.emitValue(this.selectedOptions.map(opt => opt.value));
        this.searchTerm = '';
      }
    } else {
      this.selectedOptions = [option];
      this.searchTerm = option.label;
      this.optionSelected.emit(option);
      this.emitValue(option.value);
      this.close();
    }
  }

  removeOption(option: AutocompleteOption, event?: Event) {
    if (event) {
      event.stopPropagation();
    }

    this.selectedOptions = this.selectedOptions.filter(opt => opt.value !== option.value);
    this.optionRemoved.emit(option);

    if (this.multiple) {
      this.emitValue(this.selectedOptions.map(opt => opt.value));
    } else {
      this.searchTerm = '';
      this.emitValue(null);
    }
  }

  clear() {
    this.selectedOptions = [];
    this.searchTerm = '';
    this.emitValue(this.multiple ? [] : null);
    this.filterOptions();
  }

  selectAll() {
    if (!this.multiple) return;

    const availableOptions = this.filteredOptions.filter(opt => !opt.disabled);
    this.selectedOptions = availableOptions;
    this.emitValue(availableOptions.map(opt => opt.value));
  }

  createNewOption() {
    if (!this.allowCreate || !this.searchTerm) return;

    this.createOption.emit(this.searchTerm);
    this.searchTerm = '';
    this.close();
  }

  // Helpers
  private filterOptions() {
    const term = this.searchTerm.toLowerCase().trim();

    if (!term) {
      this.filteredOptions = [...this.options];
      this.highlightedIndex = this.filteredOptions.length > 0 ? 0 : -1;
      return;
    }

    if (this.filterFn) {
      this.filteredOptions = this.options.filter(opt => this.filterFn!(opt, term));
    } else if (this.fuzzySearch) {
      this.filteredOptions = this.options.filter(opt =>
        this.fuzzyMatch(opt.label.toLowerCase(), term)
      );
    } else {
      this.filteredOptions = this.options.filter(opt =>
        opt.label.toLowerCase().includes(term)
      );
    }

    this.highlightedIndex = this.filteredOptions.length > 0 ? 0 : -1;
  }

  private fuzzyMatch(text: string, term: string): boolean {
    let termIndex = 0;

    for (let i = 0; i < text.length && termIndex < term.length; i++) {
      if (text[i] === term[termIndex]) {
        termIndex++;
      }
    }

    return termIndex === term.length;
  }

  private highlightNext() {
    const max = this.filteredOptions.length - 1;

    do {
      this.highlightedIndex = this.highlightedIndex >= max ? 0 : this.highlightedIndex + 1;
    } while (
      this.filteredOptions[this.highlightedIndex]?.disabled &&
      this.highlightedIndex <= max
    );

    this.scrollToHighlighted();
  }

  private highlightPrev() {
    const max = this.filteredOptions.length - 1;

    do {
      this.highlightedIndex = this.highlightedIndex <= 0 ? max : this.highlightedIndex - 1;
    } while (
      this.filteredOptions[this.highlightedIndex]?.disabled &&
      this.highlightedIndex >= 0
    );

    this.scrollToHighlighted();
  }

  private scrollToHighlighted() {
    if (this.viewport && this.highlightedIndex >= 0) {
      this.viewport.scrollToIndex(this.highlightedIndex, 'smooth');
    }
  }

  isSelected(option: AutocompleteOption): boolean {
    return this.selectedOptions.some(opt => opt.value === option.value);
  }

  hasExactMatch(): boolean {
    const term = this.searchTerm.toLowerCase().trim();
    return this.options.some(opt => opt.label.toLowerCase() === term);
  }

  highlightText(text: string): string {
    if (!this.highlightMatches || !this.searchTerm) {
      return text;
    }

    const term = this.searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${term})`, 'gi');
    return text.replace(regex, '<span class="highlight">$1</span>');
  }

  getPlaceholder(): string {
    if (this.multiple && this.selectedOptions.length > 0) {
      return '';
    }
    return this.placeholder;
  }

  getViewportHeight(): number {
    const itemCount = this.filteredOptions.length;
    const maxItems = Math.floor(this.maxHeight / this.itemHeight);
    return Math.min(itemCount, maxItems) * this.itemHeight;
  }

  trackByFn(index: number, option: AutocompleteOption): any {
    return option.value;
  }

  private emitValue(value: any) {
    this.onChange(value);
    this.valueChange.emit(value);
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    const target = event.target as HTMLElement;
    const clickedInside = this.inputElement?.nativeElement.contains(target) ||
                          this.panelElement?.nativeElement.contains(target);

    if (!clickedInside && this.isOpen) {
      this.close();
    }
  }
}
