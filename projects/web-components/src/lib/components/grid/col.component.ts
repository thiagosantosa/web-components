import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'web-col',
  standalone: true,
  imports: [CommonModule],
  host: {
    '[class]': 'getColClasses()',
    '[style]': 'getColStyles()'
  },
  template: `
    <ng-content></ng-content>
  `,
  styles: [`
    /* Col Base */
    :host {
      position: relative;
      width: 100%;
      padding-right: 0.5rem;
      padding-left: 0.5rem;
      flex-shrink: 0;
      box-sizing: border-box;
    }
    
    /* Auto width */
    :host(.web-col-auto) {
      flex: 0 0 auto;
      width: auto;
    }
    
    /* Equal width columns */
    :host(.web-col-equal) {
      flex: 1 0 0%;
    }
    
    /* Column sizes (1-12) */
    :host(.web-col-1) { flex: 0 0 8.333333%; max-width: 8.333333%; }
    :host(.web-col-2) { flex: 0 0 16.666667%; max-width: 16.666667%; }
    :host(.web-col-3) { flex: 0 0 25%; max-width: 25%; }
    :host(.web-col-4) { flex: 0 0 33.333333%; max-width: 33.333333%; }
    :host(.web-col-5) { flex: 0 0 41.666667%; max-width: 41.666667%; }
    :host(.web-col-6) { flex: 0 0 50%; max-width: 50%; }
    :host(.web-col-7) { flex: 0 0 58.333333%; max-width: 58.333333%; }
    :host(.web-col-8) { flex: 0 0 66.666667%; max-width: 66.666667%; }
    :host(.web-col-9) { flex: 0 0 75%; max-width: 75%; }
    :host(.web-col-10) { flex: 0 0 83.333333%; max-width: 83.333333%; }
    :host(.web-col-11) { flex: 0 0 91.666667%; max-width: 91.666667%; }
    :host(.web-col-12) { flex: 0 0 100%; max-width: 100%; }
    
    /* SM Breakpoint (≥576px) */
    @media (min-width: 576px) {
      :host(.web-col-sm-auto) { flex: 0 0 auto; width: auto; }
      :host(.web-col-sm-equal) { flex: 1 0 0%; }
      :host(.web-col-sm-1) { flex: 0 0 8.333333%; max-width: 8.333333%; }
      :host(.web-col-sm-2) { flex: 0 0 16.666667%; max-width: 16.666667%; }
      :host(.web-col-sm-3) { flex: 0 0 25%; max-width: 25%; }
      :host(.web-col-sm-4) { flex: 0 0 33.333333%; max-width: 33.333333%; }
      :host(.web-col-sm-5) { flex: 0 0 41.666667%; max-width: 41.666667%; }
      :host(.web-col-sm-6) { flex: 0 0 50%; max-width: 50%; }
      :host(.web-col-sm-7) { flex: 0 0 58.333333%; max-width: 58.333333%; }
      :host(.web-col-sm-8) { flex: 0 0 66.666667%; max-width: 66.666667%; }
      :host(.web-col-sm-9) { flex: 0 0 75%; max-width: 75%; }
      :host(.web-col-sm-10) { flex: 0 0 83.333333%; max-width: 83.333333%; }
      :host(.web-col-sm-11) { flex: 0 0 91.666667%; max-width: 91.666667%; }
      :host(.web-col-sm-12) { flex: 0 0 100%; max-width: 100%; }
    }
    
    /* MD Breakpoint (≥768px) */
    @media (min-width: 768px) {
      :host(.web-col-md-auto) { flex: 0 0 auto; width: auto; }
      :host(.web-col-md-equal) { flex: 1 0 0%; }
      :host(.web-col-md-1) { flex: 0 0 8.333333%; max-width: 8.333333%; }
      :host(.web-col-md-2) { flex: 0 0 16.666667%; max-width: 16.666667%; }
      :host(.web-col-md-3) { flex: 0 0 25%; max-width: 25%; }
      :host(.web-col-md-4) { flex: 0 0 33.333333%; max-width: 33.333333%; }
      :host(.web-col-md-5) { flex: 0 0 41.666667%; max-width: 41.666667%; }
      :host(.web-col-md-6) { flex: 0 0 50%; max-width: 50%; }
      :host(.web-col-md-7) { flex: 0 0 58.333333%; max-width: 58.333333%; }
      :host(.web-col-md-8) { flex: 0 0 66.666667%; max-width: 66.666667%; }
      :host(.web-col-md-9) { flex: 0 0 75%; max-width: 75%; }
      :host(.web-col-md-10) { flex: 0 0 83.333333%; max-width: 83.333333%; }
      :host(.web-col-md-11) { flex: 0 0 91.666667%; max-width: 91.666667%; }
      :host(.web-col-md-12) { flex: 0 0 100%; max-width: 100%; }
    }
    
    /* LG Breakpoint (≥992px) */
    @media (min-width: 992px) {
      :host(.web-col-lg-auto) { flex: 0 0 auto; width: auto; }
      :host(.web-col-lg-equal) { flex: 1 0 0%; }
      :host(.web-col-lg-1) { flex: 0 0 8.333333%; max-width: 8.333333%; }
      :host(.web-col-lg-2) { flex: 0 0 16.666667%; max-width: 16.666667%; }
      :host(.web-col-lg-3) { flex: 0 0 25%; max-width: 25%; }
      :host(.web-col-lg-4) { flex: 0 0 33.333333%; max-width: 33.333333%; }
      :host(.web-col-lg-5) { flex: 0 0 41.666667%; max-width: 41.666667%; }
      :host(.web-col-lg-6) { flex: 0 0 50%; max-width: 50%; }
      :host(.web-col-lg-7) { flex: 0 0 58.333333%; max-width: 58.333333%; }
      :host(.web-col-lg-8) { flex: 0 0 66.666667%; max-width: 66.666667%; }
      :host(.web-col-lg-9) { flex: 0 0 75%; max-width: 75%; }
      :host(.web-col-lg-10) { flex: 0 0 83.333333%; max-width: 83.333333%; }
      :host(.web-col-lg-11) { flex: 0 0 91.666667%; max-width: 91.666667%; }
      :host(.web-col-lg-12) { flex: 0 0 100%; max-width: 100%; }
    }
    
    /* XL Breakpoint (≥1200px) */
    @media (min-width: 1200px) {
      :host(.web-col-xl-auto) { flex: 0 0 auto; width: auto; }
      :host(.web-col-xl-equal) { flex: 1 0 0%; }
      :host(.web-col-xl-1) { flex: 0 0 8.333333%; max-width: 8.333333%; }
      :host(.web-col-xl-2) { flex: 0 0 16.666667%; max-width: 16.666667%; }
      :host(.web-col-xl-3) { flex: 0 0 25%; max-width: 25%; }
      :host(.web-col-xl-4) { flex: 0 0 33.333333%; max-width: 33.333333%; }
      :host(.web-col-xl-5) { flex: 0 0 41.666667%; max-width: 41.666667%; }
      :host(.web-col-xl-6) { flex: 0 0 50%; max-width: 50%; }
      :host(.web-col-xl-7) { flex: 0 0 58.333333%; max-width: 58.333333%; }
      :host(.web-col-xl-8) { flex: 0 0 66.666667%; max-width: 66.666667%; }
      :host(.web-col-xl-9) { flex: 0 0 75%; max-width: 75%; }
      :host(.web-col-xl-10) { flex: 0 0 83.333333%; max-width: 83.333333%; }
      :host(.web-col-xl-11) { flex: 0 0 91.666667%; max-width: 91.666667%; }
      :host(.web-col-xl-12) { flex: 0 0 100%; max-width: 100%; }
    }
    
    /* 2XL Breakpoint (≥1400px) */
    @media (min-width: 1400px) {
      :host(.web-col-2xl-auto) { flex: 0 0 auto; width: auto; }
      :host(.web-col-2xl-equal) { flex: 1 0 0%; }
      :host(.web-col-2xl-1) { flex: 0 0 8.333333%; max-width: 8.333333%; }
      :host(.web-col-2xl-2) { flex: 0 0 16.666667%; max-width: 16.666667%; }
      :host(.web-col-2xl-3) { flex: 0 0 25%; max-width: 25%; }
      :host(.web-col-2xl-4) { flex: 0 0 33.333333%; max-width: 33.333333%; }
      :host(.web-col-2xl-5) { flex: 0 0 41.666667%; max-width: 41.666667%; }
      :host(.web-col-2xl-6) { flex: 0 0 50%; max-width: 50%; }
      :host(.web-col-2xl-7) { flex: 0 0 58.333333%; max-width: 58.333333%; }
      :host(.web-col-2xl-8) { flex: 0 0 66.666667%; max-width: 66.666667%; }
      :host(.web-col-2xl-9) { flex: 0 0 75%; max-width: 75%; }
      :host(.web-col-2xl-10) { flex: 0 0 83.333333%; max-width: 83.333333%; }
      :host(.web-col-2xl-11) { flex: 0 0 91.666667%; max-width: 91.666667%; }
      :host(.web-col-2xl-12) { flex: 0 0 100%; max-width: 100%; }
    }
    
    /* Offset classes */
    :host(.web-col-offset-0) { margin-left: 0; }
    :host(.web-col-offset-1) { margin-left: 8.333333%; }
    :host(.web-col-offset-2) { margin-left: 16.666667%; }
    :host(.web-col-offset-3) { margin-left: 25%; }
    :host(.web-col-offset-4) { margin-left: 33.333333%; }
    :host(.web-col-offset-5) { margin-left: 41.666667%; }
    :host(.web-col-offset-6) { margin-left: 50%; }
    :host(.web-col-offset-7) { margin-left: 58.333333%; }
    :host(.web-col-offset-8) { margin-left: 66.666667%; }
    :host(.web-col-offset-9) { margin-left: 75%; }
    :host(.web-col-offset-10) { margin-left: 83.333333%; }
    :host(.web-col-offset-11) { margin-left: 91.666667%; }
    
    /* Order classes */
    :host(.web-col-order-first) { order: -1; }
    :host(.web-col-order-last) { order: 13; }
    :host(.web-col-order-0) { order: 0; }
    :host(.web-col-order-1) { order: 1; }
    :host(.web-col-order-2) { order: 2; }
    :host(.web-col-order-3) { order: 3; }
    :host(.web-col-order-4) { order: 4; }
    :host(.web-col-order-5) { order: 5; }
    :host(.web-col-order-6) { order: 6; }
    
    /* Align self */
    :host(.web-col-align-start) { align-self: flex-start; }
    :host(.web-col-align-center) { align-self: center; }
    :host(.web-col-align-end) { align-self: flex-end; }
    :host(.web-col-align-stretch) { align-self: stretch; }
    :host(.web-col-align-baseline) { align-self: baseline; }
    
    /* Display utilities */
    :host(.web-col-hidden) { display: none; }
    
    @media (min-width: 576px) {
      :host(.web-col-hidden-sm) { display: none; }
    }
    
    @media (min-width: 768px) {
      :host(.web-col-hidden-md) { display: none; }
    }
    
    @media (min-width: 992px) {
      :host(.web-col-hidden-lg) { display: none; }
    }
    
    @media (min-width: 1200px) {
      :host(.web-col-hidden-xl) { display: none; }
    }
  `]
})
export class ColComponent implements OnInit {
  // Base column size (mobile first)
  @Input() col: number | 'auto' | 'equal' = 'equal';
  
  // Responsive sizes
  @Input() sm: number | 'auto' | 'equal' | null = null;
  @Input() md: number | 'auto' | 'equal' | null = null;
  @Input() lg: number | 'auto' | 'equal' | null = null;
  @Input() xl: number | 'auto' | 'equal' | null = null;
  @Input() xxl: number | 'auto' | 'equal' | null = null;
  
  // Offset
  @Input() offset: number = 0;
  @Input() offsetSm: number | null = null;
  @Input() offsetMd: number | null = null;
  @Input() offsetLg: number | null = null;
  @Input() offsetXl: number | null = null;
  
  // Order
  @Input() order: number | 'first' | 'last' = 0;
  
  // Align self
  @Input() alignSelf: 'start' | 'center' | 'end' | 'stretch' | 'baseline' | null = null;
  
  // Hidden
  @Input() hidden: boolean = false;
  @Input() hiddenSm: boolean = false;
  @Input() hiddenMd: boolean = false;
  @Input() hiddenLg: boolean = false;
  @Input() hiddenXl: boolean = false;
  
  // Custom width (percentage or px)
  @Input() width: string | null = null;
  @Input() minWidth: string | null = null;
  @Input() maxWidth: string | null = null;

  ngOnInit() {}

  getColClasses(): string {
    const classes = ['web-col'];
    
    // Base size
    if (this.col !== 'equal') {
      classes.push(`web-col-${this.col}`);
    } else {
      classes.push('web-col-equal');
    }
    
    // Responsive sizes
    if (this.sm !== null) {
      classes.push(`web-col-sm-${this.sm}`);
    }
    if (this.md !== null) {
      classes.push(`web-col-md-${this.md}`);
    }
    if (this.lg !== null) {
      classes.push(`web-col-lg-${this.lg}`);
    }
    if (this.xl !== null) {
      classes.push(`web-col-xl-${this.xl}`);
    }
    if (this.xxl !== null) {
      classes.push(`web-col-2xl-${this.xxl}`);
    }
    
    // Offset
    if (this.offset > 0) {
      classes.push(`web-col-offset-${this.offset}`);
    }
    
    // Order
    if (this.order !== 0) {
      classes.push(`web-col-order-${this.order}`);
    }
    
    // Align self
    if (this.alignSelf) {
      classes.push(`web-col-align-${this.alignSelf}`);
    }
    
    // Hidden
    if (this.hidden) {
      classes.push('web-col-hidden');
    }
    if (this.hiddenSm) {
      classes.push('web-col-hidden-sm');
    }
    if (this.hiddenMd) {
      classes.push('web-col-hidden-md');
    }
    if (this.hiddenLg) {
      classes.push('web-col-hidden-lg');
    }
    if (this.hiddenXl) {
      classes.push('web-col-hidden-xl');
    }
    
    return classes.join(' ');
  }

  getColStyles(): string {
    const styles: string[] = [];
    
    if (this.width) {
      styles.push(`width: ${this.width}`);
    }
    if (this.minWidth) {
      styles.push(`min-width: ${this.minWidth}`);
    }
    if (this.maxWidth) {
      styles.push(`max-width: ${this.maxWidth}`);
    }
    
    return styles.join('; ');
  }
}