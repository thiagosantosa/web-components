import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, HostListener, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'web-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Backdrop/Overlay -->
    <div class="modal-backdrop" 
         *ngIf="isOpen && !isMinimized"
         [class.modal-backdrop-blur]="blurBackground"
         (click)="onBackdropClick()">
    </div>

    <!-- Modal Container -->
    <div class="modal-wrapper" 
         *ngIf="isOpen"
         [class.modal-fullscreen]="isFullscreen"
         [class.modal-minimized]="isMinimized">
      
      <div #modalContainer
           class="modal-container"
           [class]="'modal-' + size"
           [class.modal-dragging]="isDragging"
           [style.transform]="getTransform()">
        
        <!-- Header -->
        <div class="modal-header"
             [class.modal-header-draggable]="draggable && !isFullscreen"
             (mousedown)="onDragStart($event)">
          
          <div class="modal-header-left">
            <!-- Icon -->
            <div *ngIf="icon" class="modal-icon-wrapper" [style.background]="getIconBackground()">
              <span class="material-symbols-outlined modal-icon">{{ icon }}</span>
            </div>
            
            <!-- Title & Subtitle -->
            <div class="modal-title-wrapper">
              <h3 class="modal-title">{{ title }}</h3>
              <p *ngIf="subtitle" class="modal-subtitle">{{ subtitle }}</p>
            </div>
          </div>
          
          <!-- Header Actions -->
          <div class="modal-header-actions">
            <ng-content select="[header-actions]"></ng-content>
            
            <!-- Minimize -->
            <button *ngIf="minimizable" 
                    class="modal-action-btn"
                    (click)="toggleMinimize()"
                    title="Minimizar">
              <span class="material-symbols-outlined">minimize</span>
            </button>
            
            <!-- Fullscreen -->
            <button *ngIf="fullscreenable" 
                    class="modal-action-btn"
                    (click)="toggleFullscreen()"
                    [title]="isFullscreen ? 'Restaurar' : 'Tela cheia'">
              <span class="material-symbols-outlined">
                {{ isFullscreen ? 'close_fullscreen' : 'open_in_full' }}
              </span>
            </button>
            
            <!-- Close -->
            <button *ngIf="closable" 
                    class="modal-action-btn modal-action-close"
                    (click)="close()"
                    title="Fechar">
              <span class="material-symbols-outlined">close</span>
            </button>
          </div>
        </div>

        <!-- Body -->
        <div class="modal-body" 
             [class.modal-body-no-padding]="!bodyPadding">
          <ng-content></ng-content>
        </div>

        <!-- Footer -->
        <div class="modal-footer" *ngIf="footer">
          <ng-content select="[modal-footer]"></ng-content>
        </div>

        <!-- Loading Overlay -->
        <div class="modal-loading" *ngIf="loading">
          <div class="modal-spinner"></div>
          <p *ngIf="loadingText" class="modal-loading-text">{{ loadingText }}</p>
        </div>
      </div>
      
      <!-- Minimized Bar -->
      <div class="modal-minimized-bar" 
           *ngIf="isMinimized"
           (click)="toggleMinimize()">
        <span *ngIf="icon" class="material-symbols-outlined">{{ icon }}</span>
        <span class="modal-minimized-title">{{ title }}</span>
        <button class="modal-action-btn" (click)="close(); $event.stopPropagation()">
          <span class="material-symbols-outlined">close</span>
        </button>
      </div>
    </div>
  `,
  styles: [`
      @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200');
    
    /* Backdrop */
    .modal-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.6);
      z-index: 9998;
      animation: fadeIn 0.2s ease-out;
    }
    
    .modal-backdrop-blur {
      backdrop-filter: blur(6px);
    }
    
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    /* Wrapper */
    .modal-wrapper {
      position: fixed;
      inset: 0;
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1rem;
      pointer-events: none;
    }
    
    .modal-wrapper.modal-fullscreen {
      padding: 0;
    }
    
    .modal-wrapper.modal-minimized {
      align-items: flex-end;
      justify-content: flex-end;
      background: transparent;
    }
    
    /* Container */
    .modal-container {
      position: relative;
      background: white;
      border-radius: 1rem;
      box-shadow: 
        0 25px 50px -12px rgba(0, 0, 0, 0.25),
        0 0 0 1px rgba(0, 0, 0, 0.05);
      display: flex;
      flex-direction: column;
      max-height: calc(100vh - 2rem);
      font-family: "Montserrat", sans-serif;
      pointer-events: all;
      animation: modalAppear 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      transition: transform 0.1s ease-out;
    }
    
    @keyframes modalAppear {
      from {
        opacity: 0;
        transform: scale(0.95) translateY(-20px);
      }
      to {
        opacity: 1;
        transform: scale(1) translateY(0);
      }
    }
    
    .modal-container.modal-dragging {
      transition: none;
      user-select: none;
    }
    
    /* Fullscreen */
    .modal-fullscreen .modal-container {
      width: 100vw !important;
      max-width: 100vw !important;
      height: 100vh !important;
      max-height: 100vh !important;
      border-radius: 0 !important;
      animation: none;
    }
    
    /* Header */
    .modal-header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 1rem;
      padding: 1.75rem 2rem;
      border-bottom: 1px solid #e5e7eb;
      background: linear-gradient(180deg, #ffffff 0%, #fafafa 100%);
      border-radius: 1rem 1rem 0 0;
    }
    
    .modal-fullscreen .modal-header {
      border-radius: 0;
    }
    
    .modal-header-draggable {
      cursor: move;
      user-select: none;
    }
    
    .modal-header-draggable:active {
      cursor: grabbing;
    }
    
    .modal-header-left {
      display: flex;
      align-items: flex-start;
      gap: 1rem;
      flex: 1;
      min-width: 0;
    }
    
    /* Icon */
    .modal-icon-wrapper {
      width: 3rem;
      height: 3rem;
      border-radius: 0.75rem;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    
    .modal-icon {
      font-size: 1.75rem;
      color: white;
    }
    
    /* Title */
    .modal-title-wrapper {
      flex: 1;
      min-width: 0;
    }
    
    .modal-title {
      margin: 0;
      font-size: 1.5rem;
      font-weight: 700;
      color: #111827;
      line-height: 1.3;
    }
    
    .modal-subtitle {
      margin: 0.375rem 0 0 0;
      font-size: 0.9375rem;
      color: #6b7280;
      line-height: 1.5;
    }
    
    /* Header Actions */
    .modal-header-actions {
      display: flex;
      gap: 0.375rem;
      flex-shrink: 0;
    }
    
    .modal-action-btn {
      width: 2.25rem;
      height: 2.25rem;
      padding: 0;
      border: none;
      background: transparent;
      border-radius: 0.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: #6b7280;
      transition: all 0.15s ease;
    }
    
    .modal-action-btn:hover {
      background: #f3f4f6;
      color: #111827;
      transform: scale(1.05);
    }
    
    .modal-action-btn:active {
      transform: scale(0.95);
    }
    
    .modal-action-close:hover {
      background: #fee2e2;
      color: #dc2626;
    }
    
    .modal-action-btn .material-symbols-outlined {
      font-size: 1.25rem;
    }
    
    /* Body */
    .modal-body {
      flex: 1;
      padding: 2rem;
      overflow-y: auto;
      overflow-x: hidden;
    }
    
    .modal-body-no-padding {
      padding: 0;
    }
    
    /* Scrollbar */
    .modal-body::-webkit-scrollbar {
      width: 10px;
    }
    
    .modal-body::-webkit-scrollbar-track {
      background: #f8f9fa;
    }
    
    .modal-body::-webkit-scrollbar-thumb {
      background: #cbd5e0;
      border-radius: 5px;
    }
    
    .modal-body::-webkit-scrollbar-thumb:hover {
      background: #a0aec0;
    }
    
    /* Footer */
    .modal-footer {
      padding: 1.25rem 2rem;
      border-top: 1px solid #e5e7eb;
      background: #fafafa;
      border-radius: 0 0 1rem 1rem;
      display: flex;
      justify-content: flex-end;
      gap: 0.75rem;
    }
    
    .modal-fullscreen .modal-footer {
      border-radius: 0;
    }
    
    /* Loading */
    .modal-loading {
      position: absolute;
      inset: 0;
      background: rgba(255, 255, 255, 0.98);
      backdrop-filter: blur(4px);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 1.5rem;
      border-radius: 1rem;
      z-index: 10;
    }
    
    .modal-spinner {
      width: 4rem;
      height: 4rem;
      border: 4px solid #e5e7eb;
      border-top-color: #009ADA;
      border-radius: 50%;
      animation: spin 0.7s linear infinite;
    }
    
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    
    .modal-loading-text {
      margin: 0;
      font-size: 1rem;
      font-weight: 500;
      color: #6b7280;
    }
    
    /* ========== SIZES ========== */
    
    .modal-small {
      width: 100%;
      max-width: 28rem;
    }
    
    .modal-medium {
      width: 100%;
      max-width: 40rem;
    }
    
    .modal-large {
      width: 100%;
      max-width: 56rem;
    }
    
    .modal-xlarge {
      width: 100%;
      max-width: 72rem;
    }
    
    .modal-full {
      width: calc(100vw - 2rem);
      height: calc(100vh - 2rem);
      max-width: none;
      max-height: none;
    }
    
    /* ========== MINIMIZED ========== */
    
    .modal-minimized .modal-container {
      display: none;
    }
    
    .modal-minimized-bar {
      position: fixed;
      bottom: 1.5rem;
      right: 1.5rem;
      background: white;
      padding: 1rem 1.25rem;
      border-radius: 0.75rem;
      box-shadow: 
        0 20px 25px -5px rgba(0, 0, 0, 0.1),
        0 10px 10px -5px rgba(0, 0, 0, 0.04),
        0 0 0 1px rgba(0, 0, 0, 0.05);
      display: flex;
      align-items: center;
      gap: 0.875rem;
      cursor: pointer;
      transition: all 0.2s ease;
      z-index: 10000;
      max-width: 20rem;
      pointer-events: all;
      animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }
    
    @keyframes slideUp {
      from {
        opacity: 0;
        transform: translateY(100%);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    .modal-minimized-bar:hover {
      transform: translateY(-4px);
      box-shadow: 
        0 25px 50px -12px rgba(0, 0, 0, 0.25),
        0 0 0 1px rgba(0, 0, 0, 0.05);
    }
    
    .modal-minimized-bar .material-symbols-outlined {
      font-size: 1.25rem;
      color: #009ADA;
      flex-shrink: 0;
    }
    
    .modal-minimized-title {
      flex: 1;
      font-weight: 600;
      font-size: 0.9375rem;
      color: #111827;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    
    .modal-minimized-bar .modal-action-btn {
      width: 1.75rem;
      height: 1.75rem;
      flex-shrink: 0;
    }
    
    /* Material Icons */
    .material-symbols-outlined {
      font-variation-settings:
        'FILL' 0,
        'wght' 400,
        'GRAD' 0,
        'opsz' 24;
      user-select: none;
    }
    
    /* Responsive */
    @media (max-width: 768px) {
      .modal-wrapper {
        padding: 0;
      }
      
      .modal-container {
        width: 100vw !important;
        max-width: 100vw !important;
        height: 100vh;
        max-height: 100vh;
        border-radius: 0 !important;
      }
      
      .modal-header {
        padding: 1.25rem 1rem;
        border-radius: 0;
      }
      
      .modal-body {
        padding: 1.5rem 1rem;
      }
      
      .modal-footer {
        padding: 1rem;
        border-radius: 0;
      }
      
      .modal-minimized-bar {
        bottom: 0;
        right: 0;
        left: 0;
        max-width: 100%;
        border-radius: 0;
        border-top: 1px solid #e5e7eb;
      }
    }
  `]
})
export class ModalComponent implements OnInit, OnDestroy {
  @Input() title = '';
  @Input() subtitle = '';
  @Input() icon = '';
  @Input() iconColor = '#009ADA';
  @Input() size: 'small' | 'medium' | 'large' | 'xlarge' | 'full' = 'medium';
  @Input() isOpen = false;
  @Input() closable = true;
  @Input() closeOnBackdropClick = true;
  @Input() closeOnEscape = true;
  @Input() fullscreenable = true;
  @Input() minimizable = true;
  @Input() draggable = false;
  @Input() bodyPadding = true;
  @Input() blurBackground = true;
  @Input() footer = false;
  @Input() loading = false;
  @Input() loadingText = '';
  
  @Output() closed = new EventEmitter<void>();
  @Output() opened = new EventEmitter<void>();
  @Output() minimizedChange = new EventEmitter<boolean>();
  @Output() fullscreenChange = new EventEmitter<boolean>();
  
  @ViewChild('modalContainer') modalContainer?: ElementRef;
  
  isFullscreen = false;
  isMinimized = false;
  
  // Drag
  isDragging = false;
  private dragStartX = 0;
  private dragStartY = 0;
  private modalX = 0;
  private modalY = 0;

  ngOnInit() {
    if (this.isOpen) {
      this.addBodyClass();
      this.opened.emit();
    }
  }

  ngOnDestroy() {
    this.removeBodyClass();
  }

  open() {
    this.isOpen = true;
    this.addBodyClass();
    this.opened.emit();
  }

  close() {
    this.isOpen = false;
    this.isFullscreen = false;
    this.isMinimized = false;
    this.modalX = 0;
    this.modalY = 0;
    this.removeBodyClass();
    this.closed.emit();
  }

  toggleFullscreen() {
    this.isFullscreen = !this.isFullscreen;
    if (this.isFullscreen) {
      this.isMinimized = false;
    }
    this.fullscreenChange.emit(this.isFullscreen);
  }

  toggleMinimize() {
    this.isMinimized = !this.isMinimized;
    if (this.isMinimized) {
      this.isFullscreen = false;
    }
    this.minimizedChange.emit(this.isMinimized);
  }

  onBackdropClick() {
    if (this.closeOnBackdropClick) {
      this.close();
    }
  }

  @HostListener('document:keydown.escape')
  onEscapeKey() {
    if (this.closeOnEscape && this.isOpen && !this.isMinimized) {
      this.close();
    }
  }

  // Drag
  onDragStart(event: MouseEvent) {
    if (!this.draggable || this.isFullscreen) return;
    
    this.isDragging = true;
    this.dragStartX = event.clientX - this.modalX;
    this.dragStartY = event.clientY - this.modalY;
    
    document.addEventListener('mousemove', this.onDragMove);
    document.addEventListener('mouseup', this.onDragEnd);
    
    event.preventDefault();
  }

  private onDragMove = (event: MouseEvent) => {
    if (!this.isDragging) return;
    
    this.modalX = event.clientX - this.dragStartX;
    this.modalY = event.clientY - this.dragStartY;
  }

  private onDragEnd = () => {
    this.isDragging = false;
    document.removeEventListener('mousemove', this.onDragMove);
    document.removeEventListener('mouseup', this.onDragEnd);
  }

  getTransform(): string {
    if (this.modalX !== 0 || this.modalY !== 0) {
      return `translate(${this.modalX}px, ${this.modalY}px)`;
    }
    return '';
  }

  getIconBackground(): string {
    const colors: Record<string, string> = {
      '#009ADA': 'linear-gradient(135deg, #009ADA 0%, #0086c3 100%)',
      '#28a745': 'linear-gradient(135deg, #28a745 0%, #218838 100%)',
      '#dc2626': 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
      '#f59e0b': 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
      '#2563eb': 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
    };
    
    return colors[this.iconColor] || `linear-gradient(135deg, ${this.iconColor} 0%, ${this.iconColor} 100%)`;
  }

  private addBodyClass() {
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = this.getScrollbarWidth() + 'px';
  }

  private removeBodyClass() {
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
  }

  private getScrollbarWidth(): number {
    return window.innerWidth - document.documentElement.clientWidth;
  }
}