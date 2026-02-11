import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'web-row',
  standalone: true,
  imports: [CommonModule],
  host: {
    '[class]': 'getRowClasses()'
  },
  template: `
    <ng-content></ng-content>
  `,
  styles: [`
    /* Row Base */
    :host {
      display: flex;
      flex-wrap: wrap;
      margin-right: -0.5rem;
      margin-left: -0.5rem;
      box-sizing: border-box;
    }
    
    /* Wrap options */
    :host(.web-row-nowrap) {
      flex-wrap: nowrap;
    }
    
    :host(.web-row-wrap-reverse) {
      flex-wrap: wrap-reverse;
    }
    
    /* Gap options */
    :host(.web-row-gap-0) {
      margin-right: 0;
      margin-left: 0;
    }
    
    :host(.web-row-gap-0) ::ng-deep web-col {
      padding-right: 0;
      padding-left: 0;
    }
    
    :host(.web-row-gap-1) {
      margin-right: -0.25rem;
      margin-left: -0.25rem;
    }
    
    :host(.web-row-gap-1) ::ng-deep web-col {
      padding-right: 0.25rem;
      padding-left: 0.25rem;
    }
    
    :host(.web-row-gap-2) {
      margin-right: -0.5rem;
      margin-left: -0.5rem;
    }
    
    :host(.web-row-gap-2) ::ng-deep web-col {
      padding-right: 0.5rem;
      padding-left: 0.5rem;
    }
    
    :host(.web-row-gap-3) {
      margin-right: -0.75rem;
      margin-left: -0.75rem;
    }
    
    :host(.web-row-gap-3) ::ng-deep web-col {
      padding-right: 0.75rem;
      padding-left: 0.75rem;
    }
    
    :host(.web-row-gap-4) {
      margin-right: -1rem;
      margin-left: -1rem;
    }
    
    :host(.web-row-gap-4) ::ng-deep web-col {
      padding-right: 1rem;
      padding-left: 1rem;
    }
    
    :host(.web-row-gap-5) {
      margin-right: -1.5rem;
      margin-left: -1.5rem;
    }
    
    :host(.web-row-gap-5) ::ng-deep web-col {
      padding-right: 1.5rem;
      padding-left: 1.5rem;
    }
    
    /* Horizontal alignment */
    :host(.web-row-justify-start) {
      justify-content: flex-start;
    }
    
    :host(.web-row-justify-center) {
      justify-content: center;
    }
    
    :host(.web-row-justify-end) {
      justify-content: flex-end;
    }
    
    :host(.web-row-justify-between) {
      justify-content: space-between;
    }
    
    :host(.web-row-justify-around) {
      justify-content: space-around;
    }
    
    :host(.web-row-justify-evenly) {
      justify-content: space-evenly;
    }
    
    /* Vertical alignment */
    :host(.web-row-align-start) {
      align-items: flex-start;
    }
    
    :host(.web-row-align-center) {
      align-items: center;
    }
    
    :host(.web-row-align-end) {
      align-items: flex-end;
    }
    
    :host(.web-row-align-stretch) {
      align-items: stretch;
    }
    
    :host(.web-row-align-baseline) {
      align-items: baseline;
    }
    
    /* Direction */
    :host(.web-row-direction-row) {
      flex-direction: row;
    }
    
    :host(.web-row-direction-row-reverse) {
      flex-direction: row-reverse;
    }
    
    :host(.web-row-direction-column) {
      flex-direction: column;
    }
    
    :host(.web-row-direction-column-reverse) {
      flex-direction: column-reverse;
    }
    
    /* Row Gaps (modern CSS gap) */
    :host(.web-row-row-gap-0) { row-gap: 0; }
    :host(.web-row-row-gap-1) { row-gap: 0.25rem; }
    :host(.web-row-row-gap-2) { row-gap: 0.5rem; }
    :host(.web-row-row-gap-3) { row-gap: 0.75rem; }
    :host(.web-row-row-gap-4) { row-gap: 1rem; }
    :host(.web-row-row-gap-5) { row-gap: 1.5rem; }
    :host(.web-row-row-gap-6) { row-gap: 2rem; }
    
    /* Column Gaps (modern CSS gap) */
    :host(.web-row-col-gap-0) { column-gap: 0; }
    :host(.web-row-col-gap-1) { column-gap: 0.25rem; }
    :host(.web-row-col-gap-2) { column-gap: 0.5rem; }
    :host(.web-row-col-gap-3) { column-gap: 0.75rem; }
    :host(.web-row-col-gap-4) { column-gap: 1rem; }
    :host(.web-row-col-gap-5) { column-gap: 1.5rem; }
    :host(.web-row-col-gap-6) { column-gap: 2rem; }
  `]
})
export class RowComponent {
  @Input() gap: 0 | 1 | 2 | 3 | 4 | 5 = 2;
  @Input() rowGap: 0 | 1 | 2 | 3 | 4 | 5 | 6 = 0;
  @Input() colGap: 0 | 1 | 2 | 3 | 4 | 5 | 6 = 0;
  @Input() justify: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly' = 'start';
  @Input() align: 'start' | 'center' | 'end' | 'stretch' | 'baseline' = 'stretch';
  @Input() direction: 'row' | 'row-reverse' | 'column' | 'column-reverse' = 'row';
  @Input() wrap: 'wrap' | 'nowrap' | 'wrap-reverse' = 'wrap';

  getRowClasses(): string {
    const classes = ['web-row'];
    
    // Gap
    classes.push(`web-row-gap-${this.gap}`);
    
    // Row Gap
    if (this.rowGap > 0) {
      classes.push(`web-row-row-gap-${this.rowGap}`);
    }
    
    // Col Gap
    if (this.colGap > 0) {
      classes.push(`web-row-col-gap-${this.colGap}`);
    }
    
    // Justify
    classes.push(`web-row-justify-${this.justify}`);
    
    // Align
    classes.push(`web-row-align-${this.align}`);
    
    // Direction
    classes.push(`web-row-direction-${this.direction}`);
    
    // Wrap
    if (this.wrap !== 'wrap') {
      classes.push(`web-row-${this.wrap}`);
    }
    
    return classes.join(' ');
  }
}