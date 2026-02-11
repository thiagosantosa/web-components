import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'web-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      [type]="type"
      [disabled]="disabled || loading"
      [class]="getButtonClasses()"
      (click)="handleClick($event)">

      <!-- Loading Spinner -->
      <span *ngIf="loading" class="btn-spinner"></span>

      <!-- Icon Left -->
      <span *ngIf="iconLeft && !loading" class="material-symbols-outlined btn-icon btn-icon-left">
        {{ iconLeft }}
      </span>

      <!-- Content -->
      <span class="btn-content" [class.btn-content-hidden]="loading">
        <ng-content></ng-content>
      </span>

      <!-- Icon Right -->
      <span *ngIf="iconRight && !loading" class="material-symbols-outlined btn-icon btn-icon-right">
        {{ iconRight }}
      </span>

      <!-- Badge -->
      <span *ngIf="badge && !loading" class="btn-badge">{{ badge }}</span>
    </button>
  `,
  styles: [`
    /* Base Button */
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      position: relative;
      border: none;
      border-radius: 0.375rem;
      cursor: pointer;
      font-weight: 500;
      font-family: "Montserrat", sans-serif;
      transition: all 0.2s ease;
      text-decoration: none;
      white-space: nowrap;
      user-select: none;
      outline: none;
    }

    .btn:focus-visible {
      outline: 2px solid #009ADA;
      outline-offset: 2px;
    }

    /* Variants */
    .btn-primary {
      background-color: #009ADA;
      color: white;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    }

    .btn-primary:hover:not(:disabled) {
      background-color: #0086c3;
      box-shadow: 0 4px 6px rgba(0, 154, 218, 0.2);
      transform: translateY(-1px);
    }

    .btn-primary:active:not(:disabled) {
      transform: translateY(0);
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    }

    .btn-secondary {
      background-color: #6c757d;
      color: white;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    }

    .btn-secondary:hover:not(:disabled) {
      background-color: #5a6268;
      box-shadow: 0 4px 6px rgba(108, 117, 125, 0.2);
      transform: translateY(-1px);
    }

    .btn-outline {
      background-color: transparent;
      border: 2px solid #009ADA;
      color: #009ADA;
    }

    .btn-outline:hover:not(:disabled) {
      background-color: rgba(0, 154, 218, 0.1);
      border-color: #0086c3;
    }

    .btn-ghost {
      background-color: transparent;
      color: #009ADA;
    }

    .btn-ghost:hover:not(:disabled) {
      background-color: rgba(0, 154, 218, 0.1);
    }

    .btn-danger {
      background-color: #dc3545;
      color: white;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    }

    .btn-danger:hover:not(:disabled) {
      background-color: #c82333;
      box-shadow: 0 4px 6px rgba(220, 53, 69, 0.2);
      transform: translateY(-1px);
    }

    .btn-success {
      background-color: #28a745;
      color: white;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    }

    .btn-success:hover:not(:disabled) {
      background-color: #218838;
      box-shadow: 0 4px 6px rgba(40, 167, 69, 0.2);
      transform: translateY(-1px);
    }

    .btn-warning {
      background-color: #ffc107;
      color: #212529;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    }

    .btn-warning:hover:not(:disabled) {
      background-color: #e0a800;
      box-shadow: 0 4px 6px rgba(255, 193, 7, 0.2);
      transform: translateY(-1px);
    }

    .btn-dark {
      background-color: #343a40;
      color: white;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    }

    .btn-dark:hover:not(:disabled) {
      background-color: #23272b;
      box-shadow: 0 4px 6px rgba(52, 58, 64, 0.2);
      transform: translateY(-1px);
    }

    .btn-light {
      background-color: #f8f9fa;
      color: #212529;
      border: 1px solid #dee2e6;
    }

    .btn-light:hover:not(:disabled) {
      background-color: #e2e6ea;
    }

    /* Sizes */
    .btn-small {
      padding: 0.375rem 0.75rem;
      font-size: 0.875rem;
      gap: 0.375rem;
    }

    .btn-medium {
      padding: 0.625rem 1.25rem;
      font-size: 1rem;
      gap: 0.5rem;
    }

    .btn-large {
      padding: 0.875rem 1.75rem;
      font-size: 1.125rem;
      gap: 0.625rem;
    }

    /* Full Width */
    .btn-full {
      width: 100%;
    }

    /* Rounded */
    .btn-rounded-sm {
      border-radius: 0.25rem;
    }

    .btn-rounded-md {
      border-radius: 0.375rem;
    }

    .btn-rounded-lg {
      border-radius: 0.5rem;
    }

    .btn-rounded-full {
      border-radius: 9999px;
    }

    /* Icon Only (Square) */
    .btn-icon-only {
      padding: 0.625rem;
      aspect-ratio: 1;
    }

    .btn-icon-only.btn-small {
      padding: 0.375rem;
    }

    .btn-icon-only.btn-large {
      padding: 0.875rem;
    }

    /* Disabled */
    .btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      transform: none !important;
      box-shadow: none !important;
    }

    /* Loading */
    .btn-loading {
      position: relative;
      pointer-events: none;
    }

    .btn-spinner {
      display: inline-block;
      width: 1em;
      height: 1em;
      border: 2px solid currentColor;
      border-right-color: transparent;
      border-radius: 50%;
      animation: spin 0.6s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    .btn-content-hidden {
      opacity: 0;
      position: absolute;
    }

    /* Icons */
    .material-symbols-outlined {
      font-variation-settings:
        'FILL' 0,
        'wght' 400,
        'GRAD' 0,
        'opsz' 24;
      user-select: none;
    }

    .btn-icon {
      display: inline-flex;
      font-size: 1.25em;
      line-height: 1;
    }

    .btn-small .btn-icon {
      font-size: 1.125em;
    }

    .btn-large .btn-icon {
      font-size: 1.375em;
    }

    /* Badge */
    .btn-badge {
      position: absolute;
      top: -0.5rem;
      right: -0.5rem;
      background-color: #dc3545;
      color: white;
      font-size: 0.75rem;
      font-weight: 600;
      min-width: 1.25rem;
      height: 1.25rem;
      padding: 0 0.375rem;
      border-radius: 9999px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }

    /* Justify Content */
    .btn-justify-start {
      justify-content: flex-start;
    }

    .btn-justify-center {
      justify-content: center;
    }

    .btn-justify-end {
      justify-content: flex-end;
    }

    .btn-justify-between {
      justify-content: space-between;
    }

    /* Shadow variants */
    .btn-shadow-none {
      box-shadow: none !important;
    }

    .btn-shadow-sm {
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05) !important;
    }

    .btn-shadow-md {
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1) !important;
    }

    .btn-shadow-lg {
      box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1) !important;
    }
  `]
})
export class ButtonComponent {
  @Input() variant: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success' | 'warning' | 'dark' | 'light' = 'primary';
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() disabled = false;
  @Input() loading = false;
  @Input() fullWidth = false;
  @Input() rounded: 'sm' | 'md' | 'lg' | 'full' = 'md';
  @Input() shadow: 'none' | 'sm' | 'md' | 'lg' = 'sm';
  @Input() justify: 'start' | 'center' | 'end' | 'between' = 'center';

  // Icons (Material Symbols)
  @Input() iconLeft = '';
  @Input() iconRight = '';
  @Input() iconOnly = false;

  // Badge
  @Input() badge = '';

  @Output() clicked = new EventEmitter<MouseEvent>();

  handleClick(event: MouseEvent) {
    if (!this.disabled && !this.loading) {
      this.clicked.emit(event);
    }
  }

  getButtonClasses(): string {
    const classes = ['btn'];

    // Variant
    classes.push(`btn-${this.variant}`);

    // Size
    classes.push(`btn-${this.size}`);

    // Full width
    if (this.fullWidth) {
      classes.push('btn-full');
    }

    // Rounded
    classes.push(`btn-rounded-${this.rounded}`);

    // Shadow
    classes.push(`btn-shadow-${this.shadow}`);

    // Justify
    classes.push(`btn-justify-${this.justify}`);

    // Icon only
    if (this.iconOnly) {
      classes.push('btn-icon-only');
    }

    // Loading
    if (this.loading) {
      classes.push('btn-loading');
    }

    return classes.join(' ');
  }
}
