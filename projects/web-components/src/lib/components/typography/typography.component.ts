import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type TypographyVariant = 
  | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  | 'subtitle1' | 'subtitle2'
  | 'body1' | 'body2'
  | 'caption' | 'overline'
  | 'button' | 'code';

@Component({
  selector: 'web-typography',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ng-container [ngSwitch]="getComponent()">
      <h1 *ngSwitchCase="'h1'" [class]="getClasses()" [style]="getStyles()">
        <ng-content></ng-content>
      </h1>
      <h2 *ngSwitchCase="'h2'" [class]="getClasses()" [style]="getStyles()">
        <ng-content></ng-content>
      </h2>
      <h3 *ngSwitchCase="'h3'" [class]="getClasses()" [style]="getStyles()">
        <ng-content></ng-content>
      </h3>
      <h4 *ngSwitchCase="'h4'" [class]="getClasses()" [style]="getStyles()">
        <ng-content></ng-content>
      </h4>
      <h5 *ngSwitchCase="'h5'" [class]="getClasses()" [style]="getStyles()">
        <ng-content></ng-content>
      </h5>
      <h6 *ngSwitchCase="'h6'" [class]="getClasses()" [style]="getStyles()">
        <ng-content></ng-content>
      </h6>
      <p *ngSwitchCase="'p'" [class]="getClasses()" [style]="getStyles()">
        <ng-content></ng-content>
      </p>
      <span *ngSwitchCase="'span'" [class]="getClasses()" [style]="getStyles()">
        <ng-content></ng-content>
      </span>
      <div *ngSwitchCase="'div'" [class]="getClasses()" [style]="getStyles()">
        <ng-content></ng-content>
      </div>
      <code *ngSwitchCase="'code'" [class]="getClasses()" [style]="getStyles()">
        <ng-content></ng-content>
      </code>
      <p *ngSwitchDefault [class]="getClasses()" [style]="getStyles()">
        <ng-content></ng-content>
      </p>
    </ng-container>
  `,
  styles: [`
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
    
    /* Base Typography */
    .typography {
      margin: 0;
      font-family: "Montserrat", sans-serif;
    }
    
    /* Headings */
    .typography-h1 {
      font-size: 3rem;
      font-weight: 700;
      line-height: 1.2;
      letter-spacing: -0.01562em;
    }
    
    .typography-h2 {
      font-size: 2.5rem;
      font-weight: 700;
      line-height: 1.3;
      letter-spacing: -0.00833em;
    }
    
    .typography-h3 {
      font-size: 2rem;
      font-weight: 600;
      line-height: 1.3;
      letter-spacing: 0;
    }
    
    .typography-h4 {
      font-size: 1.75rem;
      font-weight: 600;
      line-height: 1.4;
      letter-spacing: 0.00735em;
    }
    
    .typography-h5 {
      font-size: 1.5rem;
      font-weight: 600;
      line-height: 1.4;
      letter-spacing: 0;
    }
    
    .typography-h6 {
      font-size: 1.25rem;
      font-weight: 600;
      line-height: 1.5;
      letter-spacing: 0.0075em;
    }
    
    /* Subtitles */
    .typography-subtitle1 {
      font-size: 1.125rem;
      font-weight: 500;
      line-height: 1.5;
      letter-spacing: 0.00938em;
    }
    
    .typography-subtitle2 {
      font-size: 1rem;
      font-weight: 500;
      line-height: 1.5;
      letter-spacing: 0.00714em;
    }
    
    /* Body */
    .typography-body1 {
      font-size: 1rem;
      font-weight: 400;
      line-height: 1.6;
      letter-spacing: 0.00938em;
    }
    
    .typography-body2 {
      font-size: 0.875rem;
      font-weight: 400;
      line-height: 1.6;
      letter-spacing: 0.01071em;
    }
    
    /* Caption */
    .typography-caption {
      font-size: 0.75rem;
      font-weight: 400;
      line-height: 1.4;
      letter-spacing: 0.03333em;
    }
    
    /* Overline */
    .typography-overline {
      font-size: 0.75rem;
      font-weight: 500;
      line-height: 1.4;
      letter-spacing: 0.08333em;
      text-transform: uppercase;
    }
    
    /* Button */
    .typography-button {
      font-size: 0.9375rem;
      font-weight: 600;
      line-height: 1.5;
      letter-spacing: 0.02857em;
      text-transform: uppercase;
    }
    
    /* Code */
    .typography-code {
      font-family: 'Courier New', Courier, monospace;
      font-size: 0.875rem;
      font-weight: 400;
      line-height: 1.6;
      background: #f5f5f5;
      padding: 0.125rem 0.375rem;
      border-radius: 0.25rem;
      color: #d63384;
    }
    
    /* Alignment */
    .typography-align-left { text-align: left; }
    .typography-align-center { text-align: center; }
    .typography-align-right { text-align: right; }
    .typography-align-justify { text-align: justify; }
    
    /* Text Transform */
    .typography-transform-uppercase { text-transform: uppercase; }
    .typography-transform-lowercase { text-transform: lowercase; }
    .typography-transform-capitalize { text-transform: capitalize; }
    
    /* Gutters */
    .typography-gutter-bottom { margin-bottom: 0.75rem; }
    
    .typography-no-wrap {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    
    /* Truncate */
    .typography-truncate-2 {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    
    .typography-truncate-3 {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }
    
    /* Gradient Text */
    .typography-gradient {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    
    /* Link */
    .typography-link {
      color: #009ADA;
      text-decoration: none;
      cursor: pointer;
      transition: color 0.2s;
    }
    
    .typography-link:hover {
      color: #0086c3;
      text-decoration: underline;
    }
    
    /* Muted */
    .typography-muted { opacity: 0.6; }
    
    /* Disabled */
    .typography-disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }
    
    /* Responsive */
    @media (max-width: 768px) {
      .typography-h1 { font-size: 2.25rem; }
      .typography-h2 { font-size: 2rem; }
      .typography-h3 { font-size: 1.75rem; }
      .typography-h4 { font-size: 1.5rem; }
      .typography-h5 { font-size: 1.25rem; }
      .typography-h6 { font-size: 1.125rem; }
    }
  `]
})
export class TypographyComponent {
  @Input() variant: TypographyVariant = 'body1';
  @Input() component = '';
  @Input() color = '#61606a';
  @Input() fontFamily = '"Montserrat", sans-serif';
  @Input() fontSize = '';
  @Input() fontWeight: '400' | '500' | '600' | '700' | 'normal' | 'medium' | 'semibold' | 'bold' = '400';
  @Input() align: 'left' | 'center' | 'right' | 'justify' = 'left';
  @Input() transform: 'none' | 'uppercase' | 'lowercase' | 'capitalize' = 'none';
  @Input() gutterBottom = false;
  @Input() noWrap = false;
  @Input() truncate = 0;
  @Input() gradient = false;
  @Input() link = false;
  @Input() muted = false;
  @Input() disabled = false;
  @Input() customClass = '';

  getComponent(): string {
    // Se component foi especificado, usa ele
    if (this.component) {
      return this.component;
    }

    // Caso contrário, infere do variant
    const componentMap: Record<string, string> = {
      'h1': 'h1',
      'h2': 'h2',
      'h3': 'h3',
      'h4': 'h4',
      'h5': 'h5',
      'h6': 'h6',
      'subtitle1': 'p',
      'subtitle2': 'p',
      'body1': 'p',
      'body2': 'p',
      'caption': 'span',
      'overline': 'span',
      'button': 'span',
      'code': 'code'
    };

    return componentMap[this.variant] || 'p';
  }

  getClasses(): string {
    const classes = [
      'typography',
      `typography-${this.variant}`,
      `typography-align-${this.align}`,
    ];

    if (this.transform !== 'none') {
      classes.push(`typography-transform-${this.transform}`);
    }

    if (this.gutterBottom) {
      classes.push('typography-gutter-bottom');
    }

    if (this.noWrap) {
      classes.push('typography-no-wrap');
    }

    if (this.truncate > 0) {
      classes.push(`typography-truncate-${this.truncate}`);
    }

    if (this.gradient) {
      classes.push('typography-gradient');
    }

    if (this.link) {
      classes.push('typography-link');
    }

    if (this.muted) {
      classes.push('typography-muted');
    }

    if (this.disabled) {
      classes.push('typography-disabled');
    }

    if (this.customClass) {
      classes.push(this.customClass);
    }

    return classes.join(' ');
  }

  getStyles(): any {
    const styles: any = {};

    if (this.color && !this.gradient) {
      styles.color = this.color;
    }

    if (this.fontFamily) {
      styles.fontFamily = this.fontFamily;
    }

    if (this.fontSize) {
      styles.fontSize = this.fontSize;
    }

    if (this.fontWeight) {
      const weightMap: Record<string, string> = {
        'normal': '400',
        'medium': '500',
        'semibold': '600',
        'bold': '700'
      };
      styles.fontWeight = weightMap[this.fontWeight] || this.fontWeight;
    }

    return styles;
  }
}