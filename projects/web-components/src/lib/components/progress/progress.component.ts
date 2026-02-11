import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

export type ProgressVariant = 
  | 'default'      // Barra simples moderna
  | 'gradient'     // Gradiente animado
  | 'striped'      // Listras animadas
  | 'glow'         // Efeito de brilho/neon
  | 'pulse'        // Pulsação suave
  | 'steps'        // Progresso por etapas
  | 'circular'     // Circular/radial
  | 'segmented';   // Segmentos separados

export type ProgressSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface ProgressStep {
  label: string;
  description?: string;
  icon?: string;
  completed?: boolean;
}

@Component({
  selector: 'web-progress',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="progress-wrapper" [class]="'progress-' + variant + ' progress-size-' + size">
      
      <!-- Label & Value -->
      <div class="progress-header" *ngIf="showLabel || showValue">
        <span class="progress-label" *ngIf="showLabel">{{ label }}</span>
        <div class="progress-value-wrapper" *ngIf="showValue">
          <span class="progress-value">{{ animatedValue }}{{ unit }}</span>
          <span class="progress-percentage" *ngIf="showPercentage">({{ getPercentage() }}%)</span>
        </div>
      </div>
      
      <!-- Linear Progress -->
      <div *ngIf="variant !== 'circular'" 
           class="progress-container"
           [class.progress-indeterminate]="indeterminate">
        
        <!-- Background Track -->
        <div class="progress-track"></div>
        
        <!-- Progress Bar -->
        <div class="progress-bar"
             [class.progress-bar-animated]="animated"
             [style.width.%]="indeterminate ? 100 : currentValue"
             [style.background]="getBarBackground()">
          
          <!-- Glow Effect -->
          <div class="progress-glow" *ngIf="variant === 'glow'"></div>
          
          <!-- Stripes -->
          <div class="progress-stripes" *ngIf="variant === 'striped'"></div>
          
          <!-- Inner Label -->
          <span class="progress-inner-label" *ngIf="showInnerLabel">
            {{ animatedValue }}{{ unit }}
          </span>
        </div>
        
        <!-- Segments -->
        <div class="progress-segments" *ngIf="variant === 'segmented'">
          <div *ngFor="let seg of getSegments()" 
               class="progress-segment"
               [class.segment-filled]="seg.filled"
               [style.background]="seg.filled ? color : ''">
          </div>
        </div>
        
        <!-- Steps -->
        <div class="progress-steps-container" *ngIf="variant === 'steps' && steps.length > 0">
          <div *ngFor="let step of steps; let i = index" 
               class="progress-step-item"
               [class.step-completed]="step.completed"
               [class.step-active]="i === activeStep"
               [style.left.%]="getStepPosition(i)">
            
            <div class="step-marker">
              <span class="material-symbols-outlined" *ngIf="step.icon">{{ step.icon }}</span>
              <span class="step-number" *ngIf="!step.icon">{{ i + 1 }}</span>
              <div class="step-pulse" *ngIf="i === activeStep"></div>
            </div>
            
            <div class="step-labels" *ngIf="showStepLabels">
              <span class="step-label">{{ step.label }}</span>
              <span class="step-description" *ngIf="step.description">{{ step.description }}</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Circular Progress -->
      <div *ngIf="variant === 'circular'" 
           class="progress-circular"
           [style.width.px]="circularSize"
           [style.height.px]="circularSize">
        
        <svg [attr.width]="circularSize" 
             [attr.height]="circularSize"
             class="progress-circle-svg">
          
          <!-- Background Circle -->
          <circle
            [attr.cx]="circularSize / 2"
            [attr.cy]="circularSize / 2"
            [attr.r]="getCircleRadius()"
            class="circle-background"
            [attr.stroke-width]="strokeWidth">
          </circle>
          
          <!-- Progress Circle -->
          <circle
            [attr.cx]="circularSize / 2"
            [attr.cy]="circularSize / 2"
            [attr.r]="getCircleRadius()"
            class="circle-progress"
            [class.circle-animated]="animated"
            [attr.stroke-width]="strokeWidth"
            [attr.stroke]="color"
            [attr.stroke-dasharray]="getCircumference()"
            [attr.stroke-dashoffset]="getCircleOffset()">
          </circle>
        </svg>
        
        <!-- Center Content -->
        <div class="circle-content">
          <span class="circle-value">{{ animatedValue }}{{ unit }}</span>
          <span class="circle-label" *ngIf="label">{{ label }}</span>
        </div>
      </div>
      
      <!-- Status Message -->
      <div class="progress-footer" *ngIf="statusMessage">
        <span class="progress-status">{{ statusMessage }}</span>
      </div>
    </div>
  `,
  styles: [`
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200');
    
    .progress-wrapper {
      font-family: "Montserrat", sans-serif;
    }
    
    /* Header */
    .progress-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.5rem;
    }
    
    .progress-label {
      font-weight: 600;
      font-size: 0.9375rem;
      color: #374151;
    }
    
    .progress-value-wrapper {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    
    .progress-value {
      font-weight: 700;
      font-size: 1rem;
      color: #111827;
    }
    
    .progress-percentage {
      font-size: 0.875rem;
      font-weight: 600;
      color: #6b7280;
    }
    
    /* Container */
    .progress-container {
      position: relative;
      width: 100%;
      border-radius: 9999px;
      overflow: visible;
    }
    
    /* Track */
    .progress-track {
      position: absolute;
      inset: 0;
      background: #e5e7eb;
      border-radius: inherit;
    }
    
    /* Progress Bar */
    .progress-bar {
      position: relative;
      height: 100%;
      border-radius: inherit;
      transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding-right: 0.75rem;
      overflow: hidden;
    }
    
    .progress-bar-animated {
      animation: progressPulse 2s ease-in-out infinite;
    }
    
    @keyframes progressPulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.85; }
    }
    
    /* Inner Label */
    .progress-inner-label {
      font-size: 0.75rem;
      font-weight: 700;
      color: white;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
      z-index: 2;
    }
    
    /* Sizes */
    .progress-size-xs .progress-container { height: 4px; }
    .progress-size-sm .progress-container { height: 8px; }
    .progress-size-md .progress-container { height: 12px; }
    .progress-size-lg .progress-container { height: 16px; }
    .progress-size-xl .progress-container { height: 24px; }
    
    /* VARIANT: Default */
    .progress-default .progress-bar {
      background: linear-gradient(90deg, #009ADA 0%, #0086c3 100%);
    }
    
    /* VARIANT: Gradient */
    .progress-gradient .progress-bar {
      background: linear-gradient(90deg, 
        #667eea 0%, 
        #764ba2 25%,
        #f093fb 50%,
        #4facfe 75%,
        #00f2fe 100%);
      background-size: 200% 100%;
      animation: gradientShift 3s linear infinite;
    }
    
    @keyframes gradientShift {
      0% { background-position: 0% 50%; }
      100% { background-position: 200% 50%; }
    }
    
    /* VARIANT: Striped */
    .progress-striped .progress-bar {
      background: #009ADA;
    }
    
    .progress-stripes {
      position: absolute;
      inset: 0;
      background-image: linear-gradient(
        45deg,
        rgba(255, 255, 255, 0.15) 25%,
        transparent 25%,
        transparent 50%,
        rgba(255, 255, 255, 0.15) 50%,
        rgba(255, 255, 255, 0.15) 75%,
        transparent 75%,
        transparent
      );
      background-size: 1rem 1rem;
      animation: stripesMove 1s linear infinite;
    }
    
    @keyframes stripesMove {
      0% { background-position: 0 0; }
      100% { background-position: 1rem 0; }
    }
    
    /* VARIANT: Glow */
    .progress-glow .progress-bar {
      background: #009ADA;
      box-shadow: 0 0 20px rgba(0, 154, 218, 0.6);
    }
    
    .progress-glow {
      position: absolute;
      inset: 0;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
      animation: glowSweep 2s ease-in-out infinite;
    }
    
    @keyframes glowSweep {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(100%); }
    }
    
    /* VARIANT: Pulse */
    .progress-pulse .progress-bar {
      background: #009ADA;
      animation: pulsate 1.5s ease-in-out infinite;
    }
    
    @keyframes pulsate {
      0%, 100% { 
        box-shadow: 0 0 0 0 rgba(0, 154, 218, 0.7);
      }
      50% { 
        box-shadow: 0 0 0 8px rgba(0, 154, 218, 0);
      }
    }
    
    /* VARIANT: Segmented */
    .progress-segments {
      position: absolute;
      inset: 0;
      display: flex;
      gap: 2px;
      padding: 2px;
    }
    
    .progress-segment {
      flex: 1;
      background: #e5e7eb;
      border-radius: 2px;
      transition: all 0.3s;
    }
    
    .segment-filled {
      background: #009ADA;
      box-shadow: 0 0 8px rgba(0, 154, 218, 0.4);
    }
    
    /* VARIANT: Steps */
    .progress-steps-container {
      position: absolute;
      top: -2rem;
      left: 0;
      right: 0;
      height: 4rem;
    }
    
    .progress-step-item {
      position: absolute;
      transform: translateX(-50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
    }
    
    .step-marker {
      position: relative;
      width: 2.5rem;
      height: 2.5rem;
      border-radius: 50%;
      background: #e5e7eb;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s;
      border: 3px solid white;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      z-index: 2;
    }
    
    .step-completed .step-marker {
      background: #10b981;
      color: white;
    }
    
    .step-active .step-marker {
      background: #009ADA;
      color: white;
      transform: scale(1.15);
    }
    
    .step-pulse {
      position: absolute;
      inset: -3px;
      border-radius: 50%;
      border: 3px solid #009ADA;
      animation: stepPulse 2s ease-out infinite;
    }
    
    @keyframes stepPulse {
      0% {
        transform: scale(1);
        opacity: 1;
      }
      100% {
        transform: scale(1.5);
        opacity: 0;
      }
    }
    
    .step-number {
      font-weight: 700;
      font-size: 0.875rem;
    }
    
    .step-labels {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.125rem;
      white-space: nowrap;
    }
    
    .step-label {
      font-size: 0.75rem;
      font-weight: 600;
      color: #374151;
    }
    
    .step-description {
      font-size: 0.6875rem;
      color: #6b7280;
    }
    
    /* VARIANT: Circular */
    .progress-circular {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .progress-circle-svg {
      transform: rotate(-90deg);
    }
    
    .circle-background {
      fill: none;
      stroke: #e5e7eb;
    }
    
    .circle-progress {
      fill: none;
      stroke-linecap: round;
      transition: stroke-dashoffset 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .circle-animated {
      animation: circleRotate 2s linear infinite;
    }
    
    @keyframes circleRotate {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    
    .circle-content {
      position: absolute;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    
    .circle-value {
      font-size: 1.5rem;
      font-weight: 700;
      color: #111827;
    }
    
    .circle-label {
      font-size: 0.75rem;
      font-weight: 600;
      color: #6b7280;
      margin-top: 0.25rem;
    }
    
    /* Indeterminate */
    .progress-indeterminate .progress-bar {
      animation: indeterminateMove 1.5s ease-in-out infinite;
      width: 40% !important;
    }
    
    @keyframes indeterminateMove {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(350%); }
    }
    
    /* Footer */
    .progress-footer {
      margin-top: 0.5rem;
    }
    
    .progress-status {
      font-size: 0.875rem;
      color: #6b7280;
    }
    
    /* Material Icons */
    .material-symbols-outlined {
      font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 20;
      user-select: none;
      font-size: 1rem;
    }
  `]
})
export class ProgressComponent implements OnInit, OnDestroy, OnChanges {
  @Input() value = 0;
  @Input() max = 100;
  @Input() variant: ProgressVariant = 'default';
  @Input() size: ProgressSize = 'md';
  @Input() color = '#009ADA';
  @Input() label = '';
  @Input() unit = '';
  @Input() showLabel = false;
  @Input() showValue = true;
  @Input() showPercentage = false;
  @Input() showInnerLabel = false;
  @Input() animated = false;
  @Input() indeterminate = false;
  @Input() statusMessage = '';
  
  // Circular
  @Input() circularSize = 120;
  @Input() strokeWidth = 8;
  
  // Steps
  @Input() steps: ProgressStep[] = [];
  @Input() activeStep = 0;
  @Input() showStepLabels = true;
  
  // Segmented
  @Input() segments = 10;
  
  // Animation
  @Input() animateValue = true;
  @Input() animationDuration = 1000;
  
  @Output() complete = new EventEmitter<void>();
  @Output() valueChange = new EventEmitter<number>();
  
  currentValue = 0;
  animatedValue = 0;
  private animationFrame?: number;

  ngOnInit() {
    if (this.animateValue) {
      this.animateToValue(this.value);
    } else {
      this.currentValue = this.getPercentage();
      this.animatedValue = this.value;
    }
  }

  ngOnDestroy() {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['value'] && !changes['value'].firstChange) {
      if (this.animateValue) {
        this.animateToValue(this.value);
      } else {
        this.currentValue = this.getPercentage();
        this.animatedValue = this.value;
      }
      
      if (this.value >= this.max) {
        this.complete.emit();
      }
    }
  }

  getPercentage(): number {
    return Math.min(100, Math.max(0, (this.value / this.max) * 100));
  }

  getBarBackground(): string {
    if (this.variant === 'gradient' || this.variant === 'default') {
      return '';
    }
    return this.color;
  }

  getSegments(): Array<{ filled: boolean }> {
    const segs = [];
    const filledCount = Math.floor((this.currentValue / 100) * this.segments);
    
    for (let i = 0; i < this.segments; i++) {
      segs.push({ filled: i < filledCount });
    }
    
    return segs;
  }

  getStepPosition(index: number): number {
    if (this.steps.length <= 1) return 0;
    return (index / (this.steps.length - 1)) * 100;
  }

  // Circular
  getCircleRadius(): number {
    return (this.circularSize - this.strokeWidth) / 2;
  }

  getCircumference(): number {
    return 2 * Math.PI * this.getCircleRadius();
  }

  getCircleOffset(): number {
    const circumference = this.getCircumference();
    return circumference - (this.currentValue / 100) * circumference;
  }

  private animateToValue(targetValue: number) {
    const targetPercentage = (targetValue / this.max) * 100;
    const startValue = this.animatedValue;
    const startPercentage = this.currentValue;
    const startTime = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / this.animationDuration, 1);
      
      // Easing function
      const eased = 1 - Math.pow(1 - progress, 3);
      
      this.animatedValue = Math.round(startValue + (targetValue - startValue) * eased);
      this.currentValue = startPercentage + (targetPercentage - startPercentage) * eased;
      
      if (progress < 1) {
        this.animationFrame = requestAnimationFrame(animate);
      } else {
        this.valueChange.emit(this.animatedValue);
      }
    };
    
    this.animationFrame = requestAnimationFrame(animate);
  }
}