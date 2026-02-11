import {
  Component,
  Input,
  Output,
  EventEmitter,
  forwardRef,
  OnInit,
  ViewChild,
  ElementRef,
  HostListener,
  Optional,
  Self,
  OnDestroy
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ControlValueAccessor,
  NgControl,
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';

export type DateMode = 'single' | 'range' | 'multiple' | 'week' | 'month';
export type ViewMode = 'days' | 'months' | 'years';

export interface DateRange {
  start: Date | null;
  end: Date | null;
}

export interface DatePreset {
  label: string;
  value: () => Date | DateRange | Date[];
  icon?: string;
}

export interface DayCell {
  date: Date;
  day: number;
  currentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  inRange: boolean;
  rangeStart: boolean;
  rangeEnd: boolean;
  disabled: boolean;
  isWeekend: boolean;
  isHoliday: boolean;
  highlighted: boolean;
  tooltip?: string;
  dot: boolean;
  dotColor?: string;
}

@Component({
  selector: 'web-datepicker',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: `
    <div class="datepicker-wrapper">
      <label *ngIf="label" [for]="id" class="datepicker-label">
        {{ label }}
        <span *ngIf="required" class="required">*</span>
      </label>

      <div class="datepicker-input-container"
           [class.open]="isOpen"
           [class.disabled]="disabled"
           (click)="toggle()">

        <span *ngIf="icon" class="material-symbols-outlined input-icon">
          {{ icon }}
        </span>

        <input #input
               [id]="id"
               type="text"
               [value]="getDisplayValue()"
               [placeholder]="placeholder"
               [disabled]="disabled"
               [readonly]="true"
               class="datepicker-input"
               [class.has-icon]="icon">

        <button type="button"
                class="calendar-toggle"
                [disabled]="disabled"
                tabindex="-1">
          <span class="material-symbols-outlined">
            {{ isOpen ? 'expand_less' : 'calendar_month' }}
          </span>
        </button>

        <button *ngIf="clearable && hasValue() && !disabled"
                type="button"
                class="clear-button"
                (click)="clear($event)"
                tabindex="-1">
          <span class="material-symbols-outlined">close</span>
        </button>
      </div>

      <div *ngIf="isOpen" class="calendar-popup" #popup>

        <div *ngIf="showPresets && presets.length > 0" class="presets-sidebar">
          <div class="presets-title">Atalhos</div>
          <button *ngFor="let preset of presets"
                  type="button"
                  class="preset-button"
                  (click)="applyPreset(preset)">
            <span *ngIf="preset.icon" class="material-symbols-outlined">{{ preset.icon }}</span>
            {{ preset.label }}
          </button>
        </div>

        <div class="calendar-content">
          <div class="calendar-header">
            <button type="button" class="nav-button" (click)="previousPeriod()">
              <span class="material-symbols-outlined">chevron_left</span>
            </button>

            <div class="header-title">
              <button type="button" class="title-button" (click)="changeViewMode('months')" *ngIf="viewMode === 'days'">
                {{ getMonthYearLabel() }}
              </button>
              <button type="button" class="title-button" (click)="changeViewMode('years')" *ngIf="viewMode === 'months'">
                {{ currentYear }}
              </button>
              <span *ngIf="viewMode === 'years'" class="title-button">{{ getYearRangeLabel() }}</span>
            </div>

            <button type="button" class="nav-button" (click)="nextPeriod()">
              <span class="material-symbols-outlined">chevron_right</span>
            </button>
          </div>

          <div *ngIf="viewMode === 'days'" class="calendar-body">
            <div class="weekdays">
              <div *ngFor="let day of weekDays" class="weekday">{{ day }}</div>
            </div>

            <div class="days-grid">
              <button *ngFor="let day of calendarDays"
                      type="button"
                      class="day-cell"
                      [class.other-month]="!day.currentMonth"
                      [class.today]="day.isToday"
                      [class.selected]="day.isSelected"
                      [class.in-range]="day.inRange"
                      [class.range-start]="day.rangeStart"
                      [class.range-end]="day.rangeEnd"
                      [class.disabled]="day.disabled"
                      [class.weekend]="day.isWeekend"
                      [class.holiday]="day.isHoliday"
                      [disabled]="day.disabled"
                      (click)="selectDate(day.date)"
                      (mouseenter)="onDayHover(day.date)"
                      [title]="day.tooltip || ''">
                <span class="day-number">{{ day.day }}</span>
                <span *ngIf="day.dot" class="day-dot" [style.background]="day.dotColor"></span>
              </button>
            </div>
          </div>

          <div *ngIf="viewMode === 'months'" class="months-grid">
            <button *ngFor="let month of months; let i = index"
                    type="button"
                    class="month-cell"
                    [class.selected]="isMonthSelected(i)"
                    [class.current]="isCurrentMonth(i)"
                    (click)="selectMonth(i)">
              {{ month }}
            </button>
          </div>

          <div *ngIf="viewMode === 'years'" class="years-grid">
            <button *ngFor="let year of yearRange"
                    type="button"
                    class="year-cell"
                    [class.selected]="isYearSelected(year)"
                    [class.current]="isCurrentYear(year)"
                    (click)="selectYear(year)">
              {{ year }}
            </button>
          </div>

          <div *ngIf="showTimePicker && viewMode === 'days'" class="time-picker">
            <div class="time-inputs">
              <input type="number" min="0" [max]="format24h ? 23 : 12" [(ngModel)]="selectedHour" (change)="updateTime()" class="time-input" placeholder="HH">
              <span class="time-sep">:</span>
              <input type="number" min="0" max="59" [(ngModel)]="selectedMinute" (change)="updateTime()" class="time-input" placeholder="MM">
              <select *ngIf="!format24h" [(ngModel)]="selectedPeriod" (change)="updateTime()" class="period-select">
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </div>
          </div>

          <div class="calendar-footer">
            <button type="button" class="footer-button secondary" (click)="selectToday()">Hoje</button>
            <button type="button" class="footer-button primary" (click)="confirm()">Confirmar</button>
          </div>
        </div>
      </div>

      <div class="datepicker-messages">
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
    .datepicker-wrapper {
      font-family: "Montserrat", sans-serif;
      width: 100%;
      position: relative;
    }

    .datepicker-label {
      font-family: "Montserrat", sans-serif;
      display: block;
      font-size: 0.875rem;
      font-weight: 500;
      color: #443A3A;
      margin-bottom: 0.5rem;
    }

    .required {
      color: #dc3545;
      margin-left: 0.125rem;
    }

    .datepicker-input-container {
      position: relative;
      display: flex;
      align-items: center;
      border: 1px solid #CED4DA;
      border-radius: 0.375rem;
      background: white;
      transition: all 0.2s;
      cursor: pointer;
    }

    .datepicker-input-container:hover:not(.disabled) {
      border-color: #ADB5BD;
    }

    .datepicker-input-container.open {
      border-color: #007bff;
      box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
    }

    .datepicker-input-container.disabled {
      background: #f8f9fa;
      cursor: not-allowed;
      opacity: 0.6;
    }

    .input-icon {
      position: absolute;
      left: 0.75rem;
      color: #6c757d;
      font-size: 1.25rem;
      pointer-events: none;
    }

    .datepicker-input {
      flex: 1;
      padding: 0.95rem;
      border: none;
      outline: none;
      font-family: "Montserrat", sans-serif;
      font-size: 1rem;
      color: #443A3A;
      cursor: pointer;
      background: transparent;
    }

    .datepicker-input.has-icon {
      padding-left: 3rem;
    }

    .datepicker-input::placeholder {
      color: #ADB5BD;
    }

    .calendar-toggle,
    .clear-button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      border: none;
      background: transparent;
      color: #6c757d;
      cursor: pointer;
      border-radius: 0.25rem;
      transition: all 0.2s;
      margin-right: 0.25rem;
    }

    .calendar-toggle:hover:not(:disabled),
    .clear-button:hover {
      background: #f8f9fa;
      color: #007bff;
    }

    .calendar-popup {
      position: absolute;
      top: calc(100% + 0.5rem);
      left: 0;
      z-index: 1000;
      background: white;
      border: 1px solid #CED4DA;
      border-radius: 0.5rem;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
      display: flex;
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

    .presets-sidebar {
      width: 160px;
      padding: 1rem;
      border-right: 1px solid #e5e7eb;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .presets-title {
      font-size: 0.75rem;
      font-weight: 600;
      color: #6c757d;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 0.5rem;
    }

    .preset-button {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem;
      border: none;
      background: transparent;
      color: #443A3A;
      font-family: "Montserrat", sans-serif;
      font-size: 0.875rem;
      text-align: left;
      border-radius: 0.375rem;
      cursor: pointer;
      transition: all 0.2s;
    }

    .preset-button:hover {
      background: #f0f9ff;
      color: #007bff;
    }

    .calendar-content {
      padding: 1rem;
      min-width: 320px;
    }

    .calendar-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 1rem;
    }

    .nav-button {
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: none;
      background: transparent;
      color: #6c757d;
      border-radius: 0.375rem;
      cursor: pointer;
      transition: all 0.2s;
    }

    .nav-button:hover {
      background: #f8f9fa;
      color: #007bff;
    }

    .header-title {
      flex: 1;
      text-align: center;
    }

    .title-button {
      border: none;
      background: transparent;
      font-family: "Montserrat", sans-serif;
      font-size: 1rem;
      font-weight: 600;
      color: #443A3A;
      cursor: pointer;
      padding: 0.5rem 1rem;
      border-radius: 0.375rem;
      transition: all 0.2s;
    }

    .title-button:hover {
      background: #f8f9fa;
    }

    .calendar-body {
      margin-bottom: 1rem;
    }

    .weekdays {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 0.25rem;
      margin-bottom: 0.5rem;
    }

    .weekday {
      text-align: center;
      font-size: 0.75rem;
      font-weight: 600;
      color: #6c757d;
      padding: 0.5rem;
    }

    .days-grid {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 0.25rem;
    }

    .day-cell {
      position: relative;
      aspect-ratio: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      border: none;
      background: white;
      border-radius: 0.375rem;
      font-size: 0.875rem;
      font-weight: 500;
      color: #443A3A;
      cursor: pointer;
      transition: all 0.2s;
    }

    .day-cell:hover:not(.disabled) {
      background: #f0f9ff;
      color: #007bff;
    }

    .day-cell.other-month {
      color: #ADB5BD;
    }

    .day-cell.today {
      color: #007bff;
      font-weight: 700;
      border: 2px solid #007bff;
    }

    .day-cell.selected {
      background: #007bff;
      color: white;
    }

    .day-cell.in-range {
      background: #e6f7ff;
      color: #007bff;
    }

    .day-cell.range-start,
    .day-cell.range-end {
      background: #007bff;
      color: white;
    }

    .day-cell.disabled {
      opacity: 0.3;
      cursor: not-allowed;
      pointer-events: none;
    }

    .day-cell.weekend {
      color: #dc3545;
    }

    .day-cell.holiday {
      background: #fff3cd;
    }

    .day-number {
      position: relative;
      z-index: 1;
    }

    .day-dot {
      position: absolute;
      bottom: 4px;
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background: #007bff;
    }

    .months-grid,
    .years-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 0.5rem;
      margin-bottom: 1rem;
    }

    .month-cell,
    .year-cell {
      padding: 1rem;
      border: none;
      background: white;
      border-radius: 0.375rem;
      font-family: "Montserrat", sans-serif;
      font-size: 0.875rem;
      font-weight: 500;
      color: #443A3A;
      cursor: pointer;
      transition: all 0.2s;
    }

    .month-cell:hover,
    .year-cell:hover {
      background: #f0f9ff;
      color: #007bff;
    }

    .month-cell.selected,
    .year-cell.selected {
      background: #007bff;
      color: white;
    }

    .month-cell.current,
    .year-cell.current {
      border: 2px solid #007bff;
    }

    .time-picker {
      padding: 1rem;
      border-top: 1px solid #e5e7eb;
      margin-bottom: 1rem;
    }

    .time-inputs {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
    }

    .time-input {
      width: 60px;
      padding: 0.5rem;
      border: 1px solid #CED4DA;
      border-radius: 0.375rem;
      text-align: center;
      font-family: "Montserrat", sans-serif;
      font-size: 1rem;
      font-weight: 600;
    }

    .time-sep {
      font-size: 1.25rem;
      font-weight: 600;
      color: #6c757d;
    }

    .period-select {
      padding: 0.5rem;
      border: 1px solid #CED4DA;
      border-radius: 0.375rem;
      font-family: "Montserrat", sans-serif;
      font-weight: 600;
    }

    .calendar-footer {
      display: flex;
      gap: 0.5rem;
      justify-content: flex-end;
      padding-top: 1rem;
      border-top: 1px solid #e5e7eb;
    }

    .footer-button {
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 0.375rem;
      font-family: "Montserrat", sans-serif;
      font-size: 0.875rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
    }

    .footer-button.secondary {
      background: #f8f9fa;
      color: #443A3A;
    }

    .footer-button.secondary:hover {
      background: #e5e7eb;
    }

    .footer-button.primary {
      background: #007bff;
      color: white;
    }

    .footer-button.primary:hover {
      background: #0056b3;
    }

    .datepicker-messages {
      margin-top: 0.5rem;
      min-height: 1.25rem;
    }

    .error-message,
    .success-message,
    .helper-text {
      display: flex;
      align-items: center;
      gap: 0.25rem;
      font-size: 0.875rem;
    }

    .error-message {
      color: #dc3545;
    }

    .success-message {
      color: #28a745;
    }

    .helper-text {
      color: #6c757d;
    }

    .material-symbols-outlined {
      font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
      user-select: none;
    }

    @media (max-width: 768px) {
      .calendar-popup {
        position: fixed;
        top: auto;
        bottom: 0;
        left: 0;
        right: 0;
        border-radius: 1rem 1rem 0 0;
        max-height: 80vh;
        overflow-y: auto;
      }

      .presets-sidebar {
        display: none;
      }
    }
  `]
})
export class DatepickerComponent implements ControlValueAccessor, OnInit, OnDestroy {
  @ViewChild('input') inputElement!: ElementRef<HTMLInputElement>;
  @ViewChild('popup') popupElement?: ElementRef;

  @Input() id = `datepicker-${Math.random().toString(36).substr(2, 9)}`;
  @Input() label = '';
  @Input() placeholder = 'Selecione uma data';
  @Input() disabled = false;
  @Input() required = false;
  @Input() icon = 'calendar_today';
  @Input() clearable = true;

  @Input() error = false;
  @Input() success = false;
  @Input() errorMessage = '';
  @Input() successMessage = '';
  @Input() helperText = '';

  @Input() mode: DateMode = 'single';
  @Input() format = 'DD/MM/YYYY';
  @Input() minDate?: Date;
  @Input() maxDate?: Date;
  @Input() disabledDates: Date[] = [];
  @Input() disabledWeekdays: number[] = [];
  @Input() showTimePicker = false;
  @Input() format24h = true;
  @Input() showSeconds = false;
  @Input() showPresets = true;
  @Input() presets: DatePreset[] = [];

  @Output() valueChange = new EventEmitter<any>();
  @Output() dateSelected = new EventEmitter<Date>();
  @Output() rangeSelected = new EventEmitter<DateRange>();

  isOpen = false;
  viewMode: ViewMode = 'days';
  currentMonth = new Date().getMonth();
  currentYear = new Date().getFullYear();
  selectedDate: Date | null = null;
  selectedRange: DateRange = { start: null, end: null };
  selectedDates: Date[] = [];
  hoverDate: Date | null = null;

  selectedHour = 0;
  selectedMinute = 0;
  selectedSecond = 0;
  selectedPeriod: 'AM' | 'PM' = 'AM';

  weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

  calendarDays: DayCell[] = [];
  yearRange: number[] = [];

  private onChange: any = () => {};
  private onTouched: any = () => {};

  constructor(@Optional() @Self() public ngControl: NgControl) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnInit() {
    if (this.presets.length === 0) {
      this.initDefaultPresets();
    }
    this.generateCalendar();
    this.generateYearRange();
  }

  ngOnDestroy() {}

  initDefaultPresets() {
    const today = new Date();

    this.presets = [
      { label: 'Hoje', value: () => new Date(), icon: 'today' },
      { label: 'Ontem', value: () => this.addDays(today, -1), icon: 'history' },
      { label: 'Últimos 7 dias', value: () => ({ start: this.addDays(today, -6), end: today }), icon: 'date_range' },
      { label: 'Últimos 30 dias', value: () => ({ start: this.addDays(today, -29), end: today }), icon: 'date_range' },
      { label: 'Este mês', value: () => ({ start: new Date(today.getFullYear(), today.getMonth(), 1), end: today }), icon: 'calendar_month' },
    ];
  }

  writeValue(value: any): void {
    if (value instanceof Date) {
      this.selectedDate = value;
    } else if (this.mode === 'range' && value?.start && value?.end) {
      this.selectedRange = value;
    } else if (Array.isArray(value)) {
      this.selectedDates = value;
    }
    this.generateCalendar();
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

  toggle() {
    if (!this.disabled) {
      this.isOpen = !this.isOpen;
      if (this.isOpen) {
        this.generateCalendar();
      }
    }
  }

  hasValue(): boolean {
    return !!(this.selectedDate || this.selectedRange.start || this.selectedDates.length);
  }

  clear(event: Event) {
    event.stopPropagation();
    this.selectedDate = null;
    this.selectedRange = { start: null, end: null };
    this.selectedDates = [];
    this.emitValue(null);
    this.generateCalendar();
  }

  generateCalendar() {
    const firstDay = new Date(this.currentYear, this.currentMonth, 1);
    const lastDay = new Date(this.currentYear, this.currentMonth + 1, 0);
    const prevLastDay = new Date(this.currentYear, this.currentMonth, 0);

    const firstDayWeek = firstDay.getDay();
    const lastDayDate = lastDay.getDate();
    const prevLastDayDate = prevLastDay.getDate();

    this.calendarDays = [];

    // Previous month days
    for (let i = firstDayWeek - 1; i >= 0; i--) {
      const date = new Date(this.currentYear, this.currentMonth - 1, prevLastDayDate - i);
      this.calendarDays.push(this.createDayCell(date, false));
    }

    // Current month days
    for (let i = 1; i <= lastDayDate; i++) {
      const date = new Date(this.currentYear, this.currentMonth, i);
      this.calendarDays.push(this.createDayCell(date, true));
    }

    // Next month days
    const remainingDays = 42 - this.calendarDays.length;
    for (let i = 1; i <= remainingDays; i++) {
      const date = new Date(this.currentYear, this.currentMonth + 1, i);
      this.calendarDays.push(this.createDayCell(date, false));
    }
  }

  createDayCell(date: Date, currentMonth: boolean): DayCell {
    const today = new Date();
    const isToday = this.isSameDay(date, today);

    return {
      date,
      day: date.getDate(),
      currentMonth,
      isToday,
      isSelected: this.isDateSelected(date),
      inRange: this.isDateInRange(date),
      rangeStart: this.isRangeStart(date),
      rangeEnd: this.isRangeEnd(date),
      disabled: this.isDateDisabled(date),
      isWeekend: date.getDay() === 0 || date.getDay() === 6,
      isHoliday: false,
      highlighted: false,
      tooltip: undefined,
      dot: false,
      dotColor: '#007bff'
    };
  }

  isDateSelected(date: Date): boolean {
    if (this.mode === 'single') {
      return this.selectedDate ? this.isSameDay(date, this.selectedDate) : false;
    } else if (this.mode === 'multiple') {
      return this.selectedDates.some(d => this.isSameDay(d, date));
    }
    return false;
  }

  isDateInRange(date: Date): boolean {
    if (this.mode !== 'range' || !this.selectedRange.start) return false;

    const compareDate = this.hoverDate && !this.selectedRange.end ? this.hoverDate : this.selectedRange.end;
    if (!compareDate) return false;

    const start = this.selectedRange.start;
    const end = compareDate;

    // Normalizar as datas para comparar apenas dia/mês/ano
    const dateTime = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
    const startTime = new Date(start.getFullYear(), start.getMonth(), start.getDate()).getTime();
    const endTime = new Date(end.getFullYear(), end.getMonth(), end.getDate()).getTime();

    // Data está entre start e end (exclusive)
    return dateTime > startTime && dateTime < endTime;
  }

  isRangeStart(date: Date): boolean {
    return this.mode === 'range' && this.selectedRange.start ? this.isSameDay(date, this.selectedRange.start) : false;
  }

  isRangeEnd(date: Date): boolean {
    return this.mode === 'range' && this.selectedRange.end ? this.isSameDay(date, this.selectedRange.end) : false;
  }

  isDateDisabled(date: Date): boolean {
    if (this.minDate && date < this.minDate) return true;
    if (this.maxDate && date > this.maxDate) return true;
    if (this.disabledDates.some(d => this.isSameDay(d, date))) return true;
    if (this.disabledWeekdays.includes(date.getDay())) return true;
    return false;
  }

  isSameDay(date1: Date, date2: Date): boolean {
    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getDate() === date2.getDate();
  }

  selectDate(date: Date) {
    if (this.isDateDisabled(date)) return;

    if (this.mode === 'single') {
      this.selectedDate = date;
      this.dateSelected.emit(date);
      this.emitValue(date);
      if (!this.showTimePicker) {
        this.isOpen = false;
      }
    } else if (this.mode === 'range') {
      if (!this.selectedRange.start || (this.selectedRange.start && this.selectedRange.end)) {
        // Primeiro clique - seleciona data inicial
        this.selectedRange = { start: new Date(date), end: null };
        this.hoverDate = null;
      } else {
        // Segundo clique - seleciona data final
        const startTime = this.selectedRange.start.getTime();
        const endTime = date.getTime();

        if (endTime < startTime) {
          // Se data final é menor que inicial, inverte
          this.selectedRange = {
            start: new Date(date),
            end: new Date(this.selectedRange.start)
          };
        } else if (endTime === startTime) {
          // Mesma data - não faz nada, aguarda outro clique
          return;
        } else {
          this.selectedRange.end = new Date(date);
        }

        this.rangeSelected.emit(this.selectedRange);
        this.emitValue(this.selectedRange);

        if (!this.showTimePicker) {
          this.isOpen = false;
        }
      }
    } else if (this.mode === 'multiple') {
      const index = this.selectedDates.findIndex(d => this.isSameDay(d, date));
      if (index >= 0) {
        this.selectedDates.splice(index, 1);
      } else {
        this.selectedDates.push(date);
      }
      this.emitValue(this.selectedDates);
    }

    this.generateCalendar();
  }

  onDayHover(date: Date) {
    if (this.mode === 'range' && this.selectedRange.start && !this.selectedRange.end) {
      this.hoverDate = date;
      this.generateCalendar();
    }
  }

  previousPeriod() {
    if (this.viewMode === 'days') {
      this.currentMonth--;
      if (this.currentMonth < 0) {
        this.currentMonth = 11;
        this.currentYear--;
      }
      this.generateCalendar();
    } else if (this.viewMode === 'months') {
      this.currentYear--;
    } else if (this.viewMode === 'years') {
      this.generateYearRange(this.yearRange[0] - 12);
    }
  }

  nextPeriod() {
    if (this.viewMode === 'days') {
      this.currentMonth++;
      if (this.currentMonth > 11) {
        this.currentMonth = 0;
        this.currentYear++;
      }
      this.generateCalendar();
    } else if (this.viewMode === 'months') {
      this.currentYear++;
    } else if (this.viewMode === 'years') {
      this.generateYearRange(this.yearRange[0] + 12);
    }
  }

  changeViewMode(mode: ViewMode) {
    this.viewMode = mode;
  }

  selectMonth(month: number) {
    this.currentMonth = month;
    this.viewMode = 'days';
    this.generateCalendar();
  }

  selectYear(year: number) {
    this.currentYear = year;
    this.viewMode = 'months';
  }

  isMonthSelected(month: number): boolean {
    return this.currentMonth === month;
  }

  isCurrentMonth(month: number): boolean {
    const today = new Date();
    return today.getMonth() === month && today.getFullYear() === this.currentYear;
  }

  isYearSelected(year: number): boolean {
    return this.currentYear === year;
  }

  isCurrentYear(year: number): boolean {
    return new Date().getFullYear() === year;
  }

  generateYearRange(startYear?: number) {
    const start = startYear || this.currentYear - 6;
    this.yearRange = Array.from({ length: 12 }, (_, i) => start + i);
  }

  selectToday() {
    const today = new Date();
    this.currentMonth = today.getMonth();
    this.currentYear = today.getFullYear();
    this.selectDate(today);
  }

  updateTime() {
    // Update selected date with time
    if (this.selectedDate) {
      const date = new Date(this.selectedDate);
      let hour = this.selectedHour;

      if (!this.format24h && this.selectedPeriod === 'PM' && hour !== 12) {
        hour += 12;
      } else if (!this.format24h && this.selectedPeriod === 'AM' && hour === 12) {
        hour = 0;
      }

      date.setHours(hour, this.selectedMinute, this.selectedSecond);
      this.selectedDate = date;
    }
  }

  applyPreset(preset: DatePreset) {
    const value = preset.value();

    if (value instanceof Date) {
      this.selectDate(value);
    } else if ('start' in value && 'end' in value) {
      this.selectedRange = value as DateRange;
      this.mode = 'range';
      this.generateCalendar();
    } else if (Array.isArray(value)) {
      this.selectedDates = value;
      this.mode = 'multiple';
      this.generateCalendar();
    }
  }

  confirm() {
    if (this.mode === 'single') {
      this.emitValue(this.selectedDate);
    } else if (this.mode === 'range') {
      this.emitValue(this.selectedRange);
    } else if (this.mode === 'multiple') {
      this.emitValue(this.selectedDates);
    }
    this.isOpen = false;
  }

  getDisplayValue(): string {
    if (this.mode === 'single' && this.selectedDate) {
      return this.formatDate(this.selectedDate);
    } else if (this.mode === 'range' && this.selectedRange.start) {
      const start = this.formatDate(this.selectedRange.start);
      const end = this.selectedRange.end ? this.formatDate(this.selectedRange.end) : '...';
      return `${start} - ${end}`;
    } else if (this.mode === 'multiple' && this.selectedDates.length > 0) {
      return `${this.selectedDates.length} datas selecionadas`;
    }
    return '';
  }

  formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  getMonthYearLabel(): string {
    return `${this.months[this.currentMonth]} ${this.currentYear}`;
  }

  getYearRangeLabel(): string {
    return `${this.yearRange[0]} - ${this.yearRange[this.yearRange.length - 1]}`;
  }

  addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  private emitValue(value: any) {
    this.onChange(value);
    this.valueChange.emit(value);
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    const target = event.target as HTMLElement;
    const clickedInside = this.inputElement?.nativeElement.contains(target) ||
                          this.popupElement?.nativeElement.contains(target);

    if (!clickedInside && this.isOpen) {
      this.isOpen = false;
    }
  }
}
