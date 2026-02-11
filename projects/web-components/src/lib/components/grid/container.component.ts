import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'web-container',
  standalone: true,
  imports: [CommonModule],
  host: {
    '[class]': 'getContainerClasses()'
  },
  template: `
    <ng-content></ng-content>
  `,
  styles: [`
    /* Container Base */
    :host {
      width: 100%;
      margin-right: auto;
      margin-left: auto;
      display: block;
      box-sizing: border-box;
    }
    
    /* Container Fluid - 100% width */
    :host(.web-container-fluid) {
      width: 100%;
      padding-right: 1rem;
      padding-left: 1rem;
    }
    
    /* Container Fixed - Max widths responsivos */
    :host(.web-container-fixed) {
      width: 100%;
      margin-right: auto;
      margin-left: auto;
      padding-right: 1rem;
      padding-left: 1rem;
    }
    
    /* Breakpoints */
    @media (min-width: 576px) {
      :host(.web-container-fixed) {
        max-width: 540px;
      }
    }
    
    @media (min-width: 768px) {
      :host(.web-container-fixed) {
        max-width: 720px;
      }
    }
    
    @media (min-width: 992px) {
      :host(.web-container-fixed) {
        max-width: 960px;
      }
    }
    
    @media (min-width: 1200px) {
      :host(.web-container-fixed) {
        max-width: 1140px;
      }
    }
    
    @media (min-width: 1400px) {
      :host(.web-container-fixed) {
        max-width: 1320px;
      }
    }
    
    /* Container Sizes */
    :host(.web-container-sm) {
      max-width: 640px;
      margin-right: auto;
      margin-left: auto;
      padding-right: 1rem;
      padding-left: 1rem;
    }
    
    :host(.web-container-md) {
      max-width: 768px;
      margin-right: auto;
      margin-left: auto;
      padding-right: 1rem;
      padding-left: 1rem;
    }
    
    :host(.web-container-lg) {
      max-width: 1024px;
      margin-right: auto;
      margin-left: auto;
      padding-right: 1rem;
      padding-left: 1rem;
    }
    
    :host(.web-container-xl) {
      max-width: 1280px;
      margin-right: auto;
      margin-left: auto;
      padding-right: 1rem;
      padding-left: 1rem;
    }
    
    :host(.web-container-2xl) {
      max-width: 1536px;
      margin-right: auto;
      margin-left: auto;
      padding-right: 1rem;
      padding-left: 1rem;
    }
    
    /* Padding variants */
    :host(.web-container-padding-none) {
      padding-right: 0;
      padding-left: 0;
    }
    
    :host(.web-container-padding-sm) {
      padding-right: 0.5rem;
      padding-left: 0.5rem;
    }
    
    :host(.web-container-padding-md) {
      padding-right: 1rem;
      padding-left: 1rem;
    }
    
    :host(.web-container-padding-lg) {
      padding-right: 2rem;
      padding-left: 2rem;
    }
    
    :host(.web-container-padding-xl) {
      padding-right: 3rem;
      padding-left: 3rem;
    }
  `]
})
export class ContainerComponent {
  @Input() type: 'fixed' | 'fluid' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' = 'fixed';
  @Input() padding: 'none' | 'sm' | 'md' | 'lg' | 'xl' = 'md';

  getContainerClasses(): string {
    const classes = [];
    
    if (this.type === 'fluid') {
      classes.push('web-container-fluid');
    } else if (this.type === 'fixed') {
      classes.push('web-container-fixed');
    } else {
      classes.push(`web-container-${this.type}`);
    }
    
    classes.push(`web-container-padding-${this.padding}`);
    
    return classes.join(' ');
  }
}