import { 
  Component, 
  Input, 
  Output, 
  EventEmitter, 
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  HostListener,
  Renderer2,
  TemplateRef,
  ContentChild
} from '@angular/core';
import { CommonModule } from '@angular/common';

export type TooltipPosition = 
  | 'top' | 'top-start' | 'top-end'
  | 'bottom' | 'bottom-start' | 'bottom-end'
  | 'left' | 'left-start' | 'left-end'
  | 'right' | 'right-start' | 'right-end';

export type TooltipVariant = 
  | 'default' 
  | 'info' 
  | 'success' 
  | 'warning' 
  | 'error' 
  | 'dark';

export type TooltipTrigger = 
  | 'hover' 
  | 'click' 
  | 'focus' 
  | 'manual';

@Component({
  selector: 'web-tooltip',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="tooltip-wrapper" #wrapper>
      <!-- Trigger Content (o elemento que ativa o tooltip) -->
      <div 
        class="tooltip-trigger"
        #trigger
        [attr.aria-describedby]="isVisible ? tooltipId : null"
        (mouseenter)="onMouseEnter()"
        (mouseleave)="onMouseLeave()"
        (click)="onClick()"
        (focus)="onFocus()"
        (blur)="onBlur()">
        <ng-content></ng-content>
      </div>
      
      <!-- Tooltip Content -->
      <div 
        *ngIf="isVisible"
        class="tooltip-content"
        #tooltipElement
        [id]="tooltipId"
        [class]="'tooltip-' + variant + ' tooltip-position-' + currentPosition"
        [class.tooltip-with-arrow]="showArrow"
        [style.top.px]="tooltipTop"
        [style.left.px]="tooltipLeft"
        role="tooltip">
        
        <!-- Arrow -->
        <div 
          *ngIf="showArrow" 
          class="tooltip-arrow"
          [style.width.px]="arrowSize"
          [style.height.px]="arrowSize"
          [style.background]="customBgColor">
        </div>
        
        <!-- Content -->
        <div class="tooltip-inner" 
             [style.background]="customBgColor"
             [style.color]="customTextColor">
          <!-- Text Content -->
          <ng-container *ngIf="!contentTemplate && content">
            <div class="tooltip-content-wrapper" [class.with-icon]="icon">
              <span *ngIf="icon && iconPosition === 'left'" class="material-symbols-outlined tooltip-icon">{{ icon }}</span>
              <span class="tooltip-text">{{ content }}</span>
              <span *ngIf="icon && iconPosition === 'right'" class="material-symbols-outlined tooltip-icon">{{ icon }}</span>
            </div>
          </ng-container>
          
          <!-- Template Content -->
          <ng-container *ngIf="contentTemplate">
            <ng-container *ngTemplateOutlet="contentTemplate"></ng-container>
          </ng-container>
        </div>
      </div>
    </div>
  `,
  styles: [`
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200');
    
    .tooltip-wrapper {
      display: inline-block;
      position: relative;
    }
    
    .tooltip-trigger {
      display: inline-block;
    }
    
    /* Tooltip Content */
    .tooltip-content {
      position: absolute;
      z-index: 9999;
      font-family: "Montserrat", sans-serif;
      animation: tooltipFadeIn 0.2s ease-out;
      pointer-events: none;
    }
    
    @keyframes tooltipFadeIn {
      from {
        opacity: 0;
        transform: scale(0.9);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }
    
    /* Tooltip Inner */
    .tooltip-inner {
      padding: 0.5rem 0.75rem;
      border-radius: 0.375rem;
      font-size: 0.875rem;
      font-weight: 500;
      line-height: 1.4;
      max-width: 300px;
      word-wrap: break-word;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
    
    /* Content Wrapper with Icon */
    .tooltip-content-wrapper {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    
    .tooltip-content-wrapper.with-icon {
      display: flex;
    }
    
    .tooltip-icon {
      font-size: 1.125rem;
      line-height: 1;
      flex-shrink: 0;
    }
    
    .tooltip-text {
      flex: 1;
    }
    
    /* Variants */
    .tooltip-default .tooltip-inner {
      background: #1f2937;
      color: white;
    }
    
    .tooltip-info .tooltip-inner {
      background: #009ADA;
      color: white;
    }
    
    .tooltip-success .tooltip-inner {
      background: #10b981;
      color: white;
    }
    
    .tooltip-warning .tooltip-inner {
      background: #f59e0b;
      color: white;
    }
    
    .tooltip-error .tooltip-inner {
      background: #ef4444;
      color: white;
    }
    
    .tooltip-dark .tooltip-inner {
      background: #000000;
      color: white;
    }
    
    /* Arrow */
    .tooltip-arrow {
      position: absolute;
      width: 8px;
      height: 8px;
      transform: rotate(45deg);
    }
    
    /* Arrow Colors by Variant */
    .tooltip-default .tooltip-arrow {
      background: #1f2937;
    }
    
    .tooltip-info .tooltip-arrow {
      background: #009ADA;
    }
    
    .tooltip-success .tooltip-arrow {
      background: #10b981;
    }
    
    .tooltip-warning .tooltip-arrow {
      background: #f59e0b;
    }
    
    .tooltip-error .tooltip-arrow {
      background: #ef4444;
    }
    
    .tooltip-dark .tooltip-arrow {
      background: #000000;
    }
    
    /* Arrow Positions */
    
    /* Top positions */
    .tooltip-position-top .tooltip-arrow,
    .tooltip-position-top-start .tooltip-arrow,
    .tooltip-position-top-end .tooltip-arrow {
      bottom: -4px;
      left: 50%;
      margin-left: -4px;
    }
    
    /* Bottom positions */
    .tooltip-position-bottom .tooltip-arrow,
    .tooltip-position-bottom-start .tooltip-arrow,
    .tooltip-position-bottom-end .tooltip-arrow {
      top: -4px;
      left: 50%;
      margin-left: -4px;
    }
    
    /* Left positions */
    .tooltip-position-left .tooltip-arrow,
    .tooltip-position-left-start .tooltip-arrow,
    .tooltip-position-left-end .tooltip-arrow {
      right: -4px;
      top: 50%;
      margin-top: -4px;
    }
    
    /* Right positions */
    .tooltip-position-right .tooltip-arrow,
    .tooltip-position-right-start .tooltip-arrow,
    .tooltip-position-right-end .tooltip-arrow {
      left: -4px;
      top: 50%;
      margin-top: -4px;
    }
    
    /* Adjust arrow for -start positions */
    .tooltip-position-top-start .tooltip-arrow,
    .tooltip-position-bottom-start .tooltip-arrow {
      left: 16px;
      margin-left: 0;
    }
    
    /* Adjust arrow for -end positions */
    .tooltip-position-top-end .tooltip-arrow,
    .tooltip-position-bottom-end .tooltip-arrow {
      left: auto;
      right: 16px;
      margin-left: 0;
    }
    
    .tooltip-position-left-start .tooltip-arrow,
    .tooltip-position-right-start .tooltip-arrow {
      top: 16px;
      margin-top: 0;
    }
    
    .tooltip-position-left-end .tooltip-arrow,
    .tooltip-position-right-end .tooltip-arrow {
      top: auto;
      bottom: 16px;
      margin-top: 0;
    }
  `]
})
export class TooltipComponent implements OnInit, OnDestroy {
  @ViewChild('trigger') triggerElement!: ElementRef;
  @ViewChild('tooltipElement') tooltipElement!: ElementRef;
  @ViewChild('wrapper') wrapperElement!: ElementRef;
  
  @ContentChild('tooltipContent') contentTemplate?: TemplateRef<any>;
  
  @Input() content = '';
  @Input() position: TooltipPosition = 'top';
  @Input() variant: TooltipVariant = 'default';
  @Input() trigger: TooltipTrigger = 'hover';
  @Input() showArrow = true;
  @Input() arrowSize = 8;
  @Input() showDelay = 0;
  @Input() hideDelay = 0;
  @Input() disabled = false;
  @Input() maxWidth = 300;
  @Input() offset = 8;
  @Input() icon = ''; // Material Icon name
  @Input() iconPosition: 'left' | 'right' = 'left';
  @Input() customBgColor = ''; // Cor de fundo customizada
  @Input() customTextColor = ''; // Cor do texto customizada
  
  @Output() tooltipShow = new EventEmitter<void>();
  @Output() tooltipHide = new EventEmitter<void>();
  
  isVisible = false;
  currentPosition: TooltipPosition = 'top';
  tooltipTop = 0;
  tooltipLeft = 0;
  tooltipId = `tooltip-${Math.random().toString(36).substr(2, 9)}`;
  
  private showTimeout?: number;
  private hideTimeout?: number;
  private isHoveringTooltip = false;

  constructor(private renderer: Renderer2) {}

  ngOnInit() {
    this.currentPosition = this.position;
  }

  ngOnDestroy() {
    this.clearTimeouts();
  }

  onMouseEnter() {
    if (this.trigger !== 'hover' || this.disabled) return;
    this.scheduleShow();
  }

  onMouseLeave() {
    if (this.trigger !== 'hover' || this.disabled) return;
    this.scheduleHide();
  }

  onClick() {
    if (this.trigger !== 'click' || this.disabled) return;
    this.toggle();
  }

  onFocus() {
    if (this.trigger !== 'focus' || this.disabled) return;
    this.scheduleShow();
  }

  onBlur() {
    if (this.trigger !== 'focus' || this.disabled) return;
    this.scheduleHide();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (this.trigger !== 'click' || !this.isVisible) return;
    
    const clickedInside = this.wrapperElement.nativeElement.contains(event.target);
    if (!clickedInside) {
      this.hide();
    }
  }

  show() {
    if (this.disabled || this.isVisible) return;
    
    this.isVisible = true;
    this.tooltipShow.emit();
    
    setTimeout(() => {
      this.calculatePosition();
    });
  }

  hide() {
    if (!this.isVisible) return;
    
    this.isVisible = false;
    this.tooltipHide.emit();
  }

  toggle() {
    if (this.isVisible) {
      this.hide();
    } else {
      this.show();
    }
  }

  private scheduleShow() {
    this.clearTimeouts();
    
    if (this.showDelay > 0) {
      this.showTimeout = window.setTimeout(() => {
        this.show();
      }, this.showDelay);
    } else {
      this.show();
    }
  }

  private scheduleHide() {
    this.clearTimeouts();
    
    if (this.hideDelay > 0) {
      this.hideTimeout = window.setTimeout(() => {
        this.hide();
      }, this.hideDelay);
    } else {
      this.hide();
    }
  }

  private clearTimeouts() {
    if (this.showTimeout) {
      clearTimeout(this.showTimeout);
      this.showTimeout = undefined;
    }
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
      this.hideTimeout = undefined;
    }
  }

  private calculatePosition() {
    if (!this.tooltipElement || !this.triggerElement) return;

    const trigger = this.triggerElement.nativeElement.getBoundingClientRect();
    const tooltip = this.tooltipElement.nativeElement.getBoundingClientRect();
    const wrapper = this.wrapperElement.nativeElement.getBoundingClientRect();

    let top = 0;
    let left = 0;
    let actualPosition = this.position;

    // Calculate position relative to trigger
    switch (this.position) {
      case 'top':
        top = -tooltip.height - this.offset;
        left = (trigger.width / 2) - (tooltip.width / 2);
        break;
      
      case 'top-start':
        top = -tooltip.height - this.offset;
        left = 0;
        break;
      
      case 'top-end':
        top = -tooltip.height - this.offset;
        left = trigger.width - tooltip.width;
        break;
      
      case 'bottom':
        top = trigger.height + this.offset;
        left = (trigger.width / 2) - (tooltip.width / 2);
        break;
      
      case 'bottom-start':
        top = trigger.height + this.offset;
        left = 0;
        break;
      
      case 'bottom-end':
        top = trigger.height + this.offset;
        left = trigger.width - tooltip.width;
        break;
      
      case 'left':
        top = (trigger.height / 2) - (tooltip.height / 2);
        left = -tooltip.width - this.offset;
        break;
      
      case 'left-start':
        top = 0;
        left = -tooltip.width - this.offset;
        break;
      
      case 'left-end':
        top = trigger.height - tooltip.height;
        left = -tooltip.width - this.offset;
        break;
      
      case 'right':
        top = (trigger.height / 2) - (tooltip.height / 2);
        left = trigger.width + this.offset;
        break;
      
      case 'right-start':
        top = 0;
        left = trigger.width + this.offset;
        break;
      
      case 'right-end':
        top = trigger.height - tooltip.height;
        left = trigger.width + this.offset;
        break;
    }

    // Check viewport boundaries and auto-adjust
    const absoluteTop = trigger.top + top;
    const absoluteLeft = trigger.left + left;
    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight
    };

    // Adjust if goes outside top
    if (absoluteTop < 0 && this.position.startsWith('top')) {
      top = trigger.height + this.offset;
      actualPosition = this.position.replace('top', 'bottom') as TooltipPosition;
    }

    // Adjust if goes outside bottom
    if (absoluteTop + tooltip.height > viewport.height && this.position.startsWith('bottom')) {
      top = -tooltip.height - this.offset;
      actualPosition = this.position.replace('bottom', 'top') as TooltipPosition;
    }

    // Adjust if goes outside left
    if (absoluteLeft < 0 && this.position.startsWith('left')) {
      left = trigger.width + this.offset;
      actualPosition = this.position.replace('left', 'right') as TooltipPosition;
    }

    // Adjust if goes outside right
    if (absoluteLeft + tooltip.width > viewport.width && this.position.startsWith('right')) {
      left = -tooltip.width - this.offset;
      actualPosition = this.position.replace('right', 'left') as TooltipPosition;
    }

    this.tooltipTop = top;
    this.tooltipLeft = left;
    this.currentPosition = actualPosition;
  }
}