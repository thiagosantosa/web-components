import { Component, Input, Output, EventEmitter, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface SliderMark {
  value: number;
  label: string;
  color?: string;
}

export type SliderVariant = 
  | 'default'
  | 'gradient'
  | 'steps'
  | 'heatmap'
  | 'segments';

@Component({
  selector: 'web-range-slider',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="range-slider-wrapper" [class]="'slider-' + variant + ' slider-size-' + size">
      
      <!-- Label & Value Display -->
      <div class="slider-header" *ngIf="showLabel || showValue">
        <span class="slider-label" *ngIf="showLabel">{{ label }}</span>
        <div class="slider-values" *ngIf="showValue">
          <span class="slider-value" *ngIf="!range">
            {{ formatValue(currentValue) }}
          </span>
          <span class="slider-value" *ngIf="range">
            {{ formatValue(currentValueMin) }} - {{ formatValue(currentValueMax) }}
          </span>
        </div>
      </div>
      
      <!-- Slider Container -->
      <div class="slider-container" 
           #sliderContainer
           (click)="onTrackClick($event)">
        
        <!-- Track (Background) -->
        <div class="slider-track"></div>
        
        <!-- Fill (Selected Range) -->
        <div class="slider-fill"
             [style.left.%]="getFillLeft()"
             [style.width.%]="getFillWidth()"
             [style.background]="getFillColor()">
          
          <!-- Gradient overlay -->
          <div class="fill-gradient" *ngIf="variant === 'gradient'"></div>
          
          <!-- Heatmap colors -->
          <div class="fill-heatmap" *ngIf="variant === 'heatmap'"
               [style.background]="getHeatmapColor()"></div>
        </div>
        
        <!-- Segments -->
        <div class="slider-segments" *ngIf="variant === 'segments'">
          <div *ngFor="let seg of getSegments()" 
               class="segment"
               [class.segment-active]="seg.active"
               [style.background]="seg.active ? color : ''">
          </div>
        </div>
        
        <!-- Marks -->
        <div class="slider-marks" *ngIf="marks && marks.length > 0">
          <div *ngFor="let mark of marks" 
               class="mark"
               [class.mark-active]="isMarkActive(mark)"
               [style.left.%]="getMarkPosition(mark)"
               [style.color]="mark.color || ''">
            <div class="mark-dot"></div>
            <div class="mark-label" *ngIf="showMarkLabels">{{ mark.label }}</div>
          </div>
        </div>
        
        <!-- Steps -->
        <div class="slider-steps" *ngIf="variant === 'steps' && step > 0">
          <div *ngFor="let s of getSteps()" 
               class="step-dot"
               [class.step-active]="s.active"
               [style.left.%]="s.position">
          </div>
        </div>
        
        <!-- Thumb(s) -->
        <div *ngIf="!range"
             class="slider-thumb"
             [class.thumb-dragging]="isDragging"
             [style.left.%]="getThumbPosition(currentValue)"
             (mousedown)="onThumbMouseDown($event)"
             (touchstart)="onThumbTouchStart($event)">
          
          <div class="thumb-inner">
            <span class="thumb-value" *ngIf="showThumbValue">{{ formatValue(currentValue) }}</span>
          </div>
          
          <!-- Tooltip -->
          <div class="thumb-tooltip" *ngIf="showTooltip && (isDragging || hoverThumb)">
            {{ tooltipFormat ? tooltipFormat(currentValue) : formatValue(currentValue) }}
          </div>
        </div>
        
        <!-- Range Thumbs -->
        <div *ngIf="range">
          <!-- Min Thumb -->
          <div class="slider-thumb"
               [class.thumb-dragging]="isDraggingMin"
               [style.left.%]="getThumbPosition(currentValueMin)"
               (mousedown)="onThumbMouseDown($event, 'min')"
               (touchstart)="onThumbTouchStart($event, 'min')">
            
            <div class="thumb-inner">
              <span class="thumb-value" *ngIf="showThumbValue">{{ formatValue(currentValueMin) }}</span>
            </div>
            
            <div class="thumb-tooltip" *ngIf="showTooltip && (isDraggingMin || hoverThumbMin)">
              {{ tooltipFormat ? tooltipFormat(currentValueMin) : formatValue(currentValueMin) }}
            </div>
          </div>
          
          <!-- Max Thumb -->
          <div class="slider-thumb"
               [class.thumb-dragging]="isDraggingMax"
               [style.left.%]="getThumbPosition(currentValueMax)"
               (mousedown)="onThumbMouseDown($event, 'max')"
               (touchstart)="onThumbTouchStart($event, 'max')">
            
            <div class="thumb-inner">
              <span class="thumb-value" *ngIf="showThumbValue">{{ formatValue(currentValueMax) }}</span>
            </div>
            
            <div class="thumb-tooltip" *ngIf="showTooltip && (isDraggingMax || hoverThumbMax)">
              {{ tooltipFormat ? tooltipFormat(currentValueMax) : formatValue(currentValueMax) }}
            </div>
          </div>
        </div>
        
        <!-- Input Field -->
        <div class="slider-input-wrapper" *ngIf="showInput && !range">
          <input type="number"
                 class="slider-input"
                 [(ngModel)]="currentValue"
                 [min]="min"
                 [max]="max"
                 [step]="step"
                 (ngModelChange)="onInputChange($event)">
        </div>
      </div>
      
      <!-- Min/Max Labels -->
      <div class="slider-limits" *ngIf="showLimits">
        <span class="limit-min">{{ formatValue(min) }}</span>
        <span class="limit-max">{{ formatValue(max) }}</span>
      </div>
    </div>
  `,
  styles: [`
          @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200');
    
    .range-slider-wrapper {
      font-family: "Montserrat", sans-serif;
      width: 100%;
    }
    
    /* Header */
    .slider-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.75rem;
    }
    
    .slider-label {
      font-weight: 600;
      font-size: 0.9375rem;
      color: #374151;
    }
    
    .slider-values {
      display: flex;
      gap: 0.5rem;
    }
    
    .slider-value {
      font-weight: 700;
      font-size: 1rem;
      color: #009ADA;
      background: #e6f7ff;
      padding: 0.25rem 0.75rem;
      border-radius: 0.375rem;
    }
    
    /* Container */
    .slider-container {
      position: relative;
      height: 2.5rem;
      display: flex;
      align-items: center;
      cursor: pointer;
      user-select: none;
    }
    
    /* Track */
    .slider-track {
      position: absolute;
      left: 0;
      right: 0;
      height: 8px;
      background: #e5e7eb;
      border-radius: 9999px;
    }
    
    /* Fill */
    .slider-fill {
      position: absolute;
      height: 8px;
      background: #009ADA;
      border-radius: 9999px;
      transition: all 0.2s ease;
      overflow: hidden;
    }
    
    /* Gradient */
    .fill-gradient {
      position: absolute;
      inset: 0;
      background: linear-gradient(90deg,
        #667eea 0%,
        #764ba2 25%,
        #f093fb 50%,
        #4facfe 75%,
        #00f2fe 100%);
    }
    
    /* Heatmap */
    .fill-heatmap {
      position: absolute;
      inset: 0;
      transition: background 0.3s;
    }
    
    /* Segments */
    .slider-segments {
      position: absolute;
      left: 0;
      right: 0;
      height: 8px;
      display: flex;
      gap: 2px;
      pointer-events: none;
    }
    
    .segment {
      flex: 1;
      background: #e5e7eb;
      border-radius: 2px;
      transition: all 0.2s ease;
    }
    
    .segment-active {
      background: #009ADA;
    }
    
    /* Steps */
    .slider-steps {
      position: absolute;
      left: 0;
      right: 0;
      height: 8px;
      pointer-events: none;
    }
    
    .step-dot {
      position: absolute;
      width: 4px;
      height: 4px;
      background: #9ca3af;
      border-radius: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      transition: all 0.2s ease;
    }
    
    .step-active {
      background: #374151;
      width: 6px;
      height: 6px;
    }
    
    /* Marks */
    .slider-marks {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
    }
    
    .mark {
      position: absolute;
      top: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      pointer-events: none;
    }
    
    .mark-dot {
      width: 8px;
      height: 8px;
      background: #d1d5db;
      border: 2px solid white;
      border-radius: 50%;
      transition: all 0.2s;
      z-index: 1;
    }
    
    .mark-active .mark-dot {
      background: #009ADA;
      transform: scale(1.2);
    }
    
    .mark-label {
      position: absolute;
      top: 100%;
      margin-top: 0.5rem;
      font-size: 0.75rem;
      font-weight: 500;
      color: #6b7280;
      white-space: nowrap;
    }
    
    .mark-active .mark-label {
      color: #009ADA;
      font-weight: 600;
    }
    
    /* Thumb */
    .slider-thumb {
      position: absolute;
      top: 50%;
      transform: translate(-50%, -50%);
      z-index: 10;
      cursor: grab;
    }
    
    .slider-thumb:active,
    .thumb-dragging {
      cursor: grabbing;
    }
    
    .thumb-inner {
      width: 20px;
      height: 20px;
      background: white;
      border: 3px solid #009ADA;
      border-radius: 50%;
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    }
    
    .slider-thumb:hover .thumb-inner,
    .thumb-dragging .thumb-inner {
      transform: scale(1.2);
      box-shadow: 0 4px 12px rgba(0, 154, 218, 0.3);
    }
    
    .thumb-value {
      font-size: 0.625rem;
      font-weight: 700;
      color: #009ADA;
    }
    
    /* Tooltip */
    .thumb-tooltip {
      position: absolute;
      bottom: calc(100% + 0.5rem);
      left: 50%;
      transform: translateX(-50%);
      background: #1f2937;
      color: white;
      padding: 0.375rem 0.75rem;
      border-radius: 0.375rem;
      font-size: 0.875rem;
      font-weight: 600;
      white-space: nowrap;
      pointer-events: none;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
    
    .thumb-tooltip::after {
      content: '';
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      border: 5px solid transparent;
      border-top-color: #1f2937;
    }
    
    /* Input Field */
    .slider-input-wrapper {
      position: absolute;
      right: -80px;
      top: 50%;
      transform: translateY(-50%);
    }
    
    .slider-input {
      width: 70px;
      padding: 0.375rem 0.5rem;
      border: 1px solid #d1d5db;
      border-radius: 0.375rem;
      font-family: "Montserrat", sans-serif;
      font-size: 0.875rem;
      font-weight: 500;
      text-align: center;
    }
    
    .slider-input:focus {
      outline: none;
      border-color: #009ADA;
      box-shadow: 0 0 0 3px rgba(0, 154, 218, 0.1);
    }
    
    /* Limits */
    .slider-limits {
      display: flex;
      justify-content: space-between;
      margin-top: 0.5rem;
      font-size: 0.75rem;
      font-weight: 500;
      color: #6b7280;
    }
    
    /* Sizes */
    .slider-size-sm .slider-track,
    .slider-size-sm .slider-fill {
      height: 6px;
    }
    
    .slider-size-sm .thumb-inner {
      width: 16px;
      height: 16px;
      border-width: 2px;
    }
    
    .slider-size-lg .slider-track,
    .slider-size-lg .slider-fill {
      height: 12px;
    }
    
    .slider-size-lg .thumb-inner {
      width: 24px;
      height: 24px;
      border-width: 4px;
    }
    
    /* Disabled */
    .slider-disabled {
      opacity: 0.5;
      pointer-events: none;
    }
    
    /* Vertical */
    .slider-vertical .slider-container {
      width: 2.5rem;
      height: 200px;
      flex-direction: column;
    }
    
    .slider-vertical .slider-track {
      left: 50%;
      transform: translateX(-50%);
      width: 8px;
      height: 100%;
    }
    
    .slider-vertical .slider-fill {
      left: 50%;
      transform: translateX(-50%);
      width: 8px;
      height: auto;
    }
  `]
})
export class RangeSliderComponent implements OnInit {
  @ViewChild('sliderContainer') sliderContainer!: ElementRef;
  
  @Input() min = 0;
  @Input() max = 100;
  @Input() step = 1;
  @Input() value = 50;
  @Input() valueMin = 25;
  @Input() valueMax = 75;
  @Input() range = false;
  @Input() variant: SliderVariant = 'default';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() color = '#009ADA';
  @Input() label = '';
  @Input() showLabel = false;
  @Input() showValue = true;
  @Input() showLimits = true;
  @Input() showTooltip = true;
  @Input() showThumbValue = false;
  @Input() showInput = false;
  @Input() showMarkLabels = true;
  @Input() disabled = false;
  @Input() vertical = false;
  @Input() marks: SliderMark[] = [];
  @Input() segments = 10;
  @Input() prefix = '';
  @Input() suffix = '';
  @Input() decimals = 0;
  @Input() tooltipFormat?: (value: number) => string;
  
  @Output() valueChange = new EventEmitter<number>();
  @Output() rangeChange = new EventEmitter<{ min: number; max: number }>();
  @Output() slideStart = new EventEmitter<void>();
  @Output() slideEnd = new EventEmitter<void>();
  
  currentValue = 50;
  currentValueMin = 25;
  currentValueMax = 75;
  isDragging = false;
  isDraggingMin = false;
  isDraggingMax = false;
  hoverThumb = false;
  hoverThumbMin = false;
  hoverThumbMax = false;
  activeThumb: 'single' | 'min' | 'max' = 'single';

  ngOnInit() {
    this.currentValue = this.value;
    this.currentValueMin = this.valueMin;
    this.currentValueMax = this.valueMax;
  }

  getThumbPosition(value: number): number {
    return ((value - this.min) / (this.max - this.min)) * 100;
  }

  getFillLeft(): number {
    if (!this.range) {
      return 0;
    }
    return this.getThumbPosition(this.currentValueMin);
  }

  getFillWidth(): number {
    if (!this.range) {
      return this.getThumbPosition(this.currentValue);
    }
    return this.getThumbPosition(this.currentValueMax) - this.getThumbPosition(this.currentValueMin);
  }

  getFillColor(): string {
    if (this.variant === 'gradient' || this.variant === 'heatmap') {
      return '';
    }
    return this.color;
  }

  getHeatmapColor(): string {
    const percentage = this.range 
      ? ((this.currentValueMax - this.currentValueMin) / (this.max - this.min))
      : ((this.currentValue - this.min) / (this.max - this.min));
    
    // Green → Yellow → Red
    if (percentage < 0.5) {
      return `hsl(${120 * percentage * 2}, 100%, 50%)`;
    } else {
      return `hsl(${120 - 120 * (percentage - 0.5) * 2}, 100%, 50%)`;
    }
  }

  getSegments(): Array<{ active: boolean }> {
    const segs = [];
    const totalRange = this.max - this.min;
    
    let activeCount: number;
    if (this.range) {
      const rangeSize = this.currentValueMax - this.currentValueMin;
      activeCount = Math.round((rangeSize / totalRange) * this.segments);
    } else {
      const valueProgress = this.currentValue - this.min;
      activeCount = Math.round((valueProgress / totalRange) * this.segments);
    }
    
    for (let i = 0; i < this.segments; i++) {
      segs.push({ active: i < activeCount });
    }
    
    return segs;
  }

  getSteps(): Array<{ position: number; active: boolean }> {
    const steps: Array<{ position: number; active: boolean }> = [];
    
    if (this.step <= 0) {
      return steps;
    }
    
    const stepCount = Math.floor((this.max - this.min) / this.step);
    
    for (let i = 0; i <= stepCount; i++) {
      const value = this.min + i * this.step;
      const position = this.getThumbPosition(value);
      const active = this.range
        ? value >= this.currentValueMin && value <= this.currentValueMax
        : value <= this.currentValue;
      
      steps.push({ position, active });
    }
    
    return steps;
  }

  getMarkPosition(mark: SliderMark): number {
    return this.getThumbPosition(mark.value);
  }

  isMarkActive(mark: SliderMark): boolean {
    if (this.range) {
      return mark.value >= this.currentValueMin && mark.value <= this.currentValueMax;
    }
    return mark.value <= this.currentValue;
  }

  formatValue(value: number): string {
    const formatted = this.decimals > 0 ? value.toFixed(this.decimals) : Math.round(value).toString();
    return `${this.prefix}${formatted}${this.suffix}`;
  }

  onTrackClick(event: MouseEvent) {
    if (this.disabled) return;
    
    const rect = this.sliderContainer.nativeElement.getBoundingClientRect();
    const percentage = (event.clientX - rect.left) / rect.width;
    const value = this.min + percentage * (this.max - this.min);
    const snappedValue = this.snapToStep(value);
    
    if (!this.range) {
      this.currentValue = snappedValue;
      this.valueChange.emit(this.currentValue);
    } else {
      // Set to closest thumb
      const distMin = Math.abs(snappedValue - this.currentValueMin);
      const distMax = Math.abs(snappedValue - this.currentValueMax);
      
      if (distMin < distMax) {
        this.currentValueMin = Math.min(snappedValue, this.currentValueMax);
      } else {
        this.currentValueMax = Math.max(snappedValue, this.currentValueMin);
      }
      
      this.rangeChange.emit({ min: this.currentValueMin, max: this.currentValueMax });
    }
  }

  onThumbMouseDown(event: MouseEvent, thumb: 'single' | 'min' | 'max' = 'single') {
    if (this.disabled) return;
    
    event.preventDefault();
    event.stopPropagation();
    
    this.activeThumb = thumb;
    
    if (thumb === 'single') {
      this.isDragging = true;
    } else if (thumb === 'min') {
      this.isDraggingMin = true;
    } else {
      this.isDraggingMax = true;
    }
    
    this.slideStart.emit();
  }

  onThumbTouchStart(event: TouchEvent, thumb: 'single' | 'min' | 'max' = 'single') {
    if (this.disabled) return;
    
    event.preventDefault();
    this.onThumbMouseDown(event as any, thumb);
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (!this.isDragging && !this.isDraggingMin && !this.isDraggingMax) return;
    
    const rect = this.sliderContainer.nativeElement.getBoundingClientRect();
    const percentage = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
    const value = this.min + percentage * (this.max - this.min);
    const snappedValue = this.snapToStep(value);
    
    if (this.isDragging) {
      this.currentValue = snappedValue;
      this.valueChange.emit(this.currentValue);
    } else if (this.isDraggingMin) {
      this.currentValueMin = Math.min(snappedValue, this.currentValueMax);
      this.rangeChange.emit({ min: this.currentValueMin, max: this.currentValueMax });
    } else if (this.isDraggingMax) {
      this.currentValueMax = Math.max(snappedValue, this.currentValueMin);
      this.rangeChange.emit({ min: this.currentValueMin, max: this.currentValueMax });
    }
  }

  @HostListener('document:mouseup')
  onMouseUp() {
    if (this.isDragging || this.isDraggingMin || this.isDraggingMax) {
      this.isDragging = false;
      this.isDraggingMin = false;
      this.isDraggingMax = false;
      this.slideEnd.emit();
    }
  }

  onInputChange(value: number) {
    this.currentValue = this.snapToStep(value);
    this.valueChange.emit(this.currentValue);
  }

  private snapToStep(value: number): number {
    const snapped = Math.round((value - this.min) / this.step) * this.step + this.min;
    return Math.max(this.min, Math.min(this.max, snapped));
  }
}