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
  Self
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
  NgControl,
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

export interface UploadedImage {
  id: string;
  file?: File;
  url: string;
  name: string;
  size: number;
  type: string;
  width?: number;
  height?: number;
  status: 'idle' | 'uploading' | 'processing' | 'success' | 'error';
  progress?: number;
  error?: string;
  thumbnail?: string;
  uploaded?: boolean;
  uploadedUrl?: string;
}

export type UploadMode = 'grid' | 'list' | 'compact' | 'single';

@Component({
  selector: 'web-image-upload',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: `
    <div class="upload-wrapper" [class]="'upload-mode-' + mode">
      
      <!-- Label -->
      <label *ngIf="label" class="upload-label">
        {{ label }}
        <span *ngIf="required" class="required">*</span>
      </label>
      
      <!-- Drop Zone -->
      <div class="upload-dropzone"
           [class.dragover]="isDragOver"
           [class.disabled]="disabled || (maxFiles > 0 && images.length >= maxFiles)"
           (click)="openFileSelector()"
           (dragover)="onDragOver($event)"
           (dragleave)="onDragLeave($event)"
           (drop)="onDrop($event)">
        
        <input #fileInput
               type="file"
               [accept]="accept"
               [multiple]="multiple && mode !== 'single'"
               [disabled]="disabled"
               (change)="onFileSelected($event)"
               hidden>
        
        <div class="dropzone-content" *ngIf="images.length === 0 || (mode !== 'single' && images.length < maxFiles)">
          <span class="material-symbols-outlined dropzone-icon">cloud_upload</span>
          <p class="dropzone-text">
            <strong>Clique para selecionar</strong> ou arraste arquivos aqui
          </p>
          <p class="dropzone-hint" *ngIf="showHints">
            {{ getHintText() }}
          </p>
        </div>
      </div>
      
      <!-- Images Grid/List -->
      <div *ngIf="images.length > 0" 
           class="images-container"
           [class]="'images-' + mode">
        
        <div *ngFor="let image of images; let i = index"
             class="image-item"
             [class.image-uploading]="image.status === 'uploading'"
             [class.image-error]="image.status === 'error'"
             [class.image-success]="image.status === 'success'">
          
          <!-- Image Preview -->
          <div class="image-preview" (click)="openLightbox(i)">
            <img [src]="image.thumbnail || image.url" 
                 [alt]="image.name"
                 loading="lazy">
            
            <!-- Upload Progress -->
            <div *ngIf="image.status === 'uploading'" class="upload-progress">
              <div class="progress-bar">
                <div class="progress-fill" [style.width.%]="image.progress || 0"></div>
              </div>
              <span class="progress-text">{{ image.progress || 0 }}%</span>
            </div>
            
            <!-- Status Overlay -->
            <div *ngIf="image.status === 'processing'" class="status-overlay">
              <span class="spinner"></span>
              <span>Processando...</span>
            </div>
            
            <div *ngIf="image.status === 'success'" class="status-overlay status-success">
              <span class="material-symbols-outlined">check_circle</span>
            </div>
            
            <div *ngIf="image.status === 'error'" class="status-overlay status-error">
              <span class="material-symbols-outlined">error</span>
              <span class="error-text">{{ image.error }}</span>
            </div>
          </div>
          
          <!-- Image Info (List/Compact Mode) -->
          <div *ngIf="mode !== 'grid'" class="image-info">
            <span class="image-name">{{ image.name }}</span>
            <span class="image-size">{{ formatFileSize(image.size) }}</span>
            <span *ngIf="image.width && image.height" class="image-dimensions">
              {{ image.width }} × {{ image.height }}
            </span>
          </div>
          
          <!-- Actions -->
          <div class="image-actions">
            <button type="button"
                    class="action-btn"
                    (click)="openEditor(i)"
                    [disabled]="disabled || image.status === 'uploading'"
                    title="Editar">
              <span class="material-symbols-outlined">edit</span>
            </button>
            
            <button type="button"
                    class="action-btn"
                    (click)="rotateImage(i)"
                    [disabled]="disabled || image.status === 'uploading'"
                    title="Girar">
              <span class="material-symbols-outlined">rotate_right</span>
            </button>
            
            <button type="button"
                    class="action-btn"
                    (click)="downloadImage(i)"
                    title="Download">
              <span class="material-symbols-outlined">download</span>
            </button>
            
            <button type="button"
                    class="action-btn action-delete"
                    (click)="removeImage(i)"
                    [disabled]="disabled"
                    title="Remover">
              <span class="material-symbols-outlined">delete</span>
            </button>
          </div>
        </div>
      </div>
      
      <!-- Footer Info -->
      <div class="upload-footer" *ngIf="images.length > 0">
        <span class="footer-count">
          {{ images.length }} {{ images.length === 1 ? 'arquivo' : 'arquivos' }}
          <ng-container *ngIf="maxFiles > 0">
            / {{ maxFiles }} máx.
          </ng-container>
        </span>
        
        <button *ngIf="images.length > 1 && !disabled"
                type="button"
                class="footer-btn"
                (click)="clearAll()">
          <span class="material-symbols-outlined">delete_sweep</span>
          Limpar Tudo
        </button>
        
        <button *ngIf="!autoUpload && hasIdle()"
                type="button"
                class="footer-btn footer-btn-primary"
                (click)="uploadAll()"
                [disabled]="disabled">
          <span class="material-symbols-outlined">cloud_upload</span>
          Enviar Todos
        </button>
      </div>
      
      <!-- Validation Messages -->
      <div class="upload-messages">
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
      
      <!-- Lightbox Modal -->
      <div *ngIf="lightboxOpen" class="lightbox-modal" (click)="closeLightbox()">
        <div class="lightbox-content" (click)="$event.stopPropagation()">
          <button class="lightbox-close" (click)="closeLightbox()">
            <span class="material-symbols-outlined">close</span>
          </button>
          
          <img [src]="images[lightboxIndex]?.url" 
               [alt]="images[lightboxIndex]?.name">
          
          <div class="lightbox-nav">
            <button (click)="prevImage()" [disabled]="lightboxIndex === 0">
              <span class="material-symbols-outlined">chevron_left</span>
            </button>
            <span>{{ lightboxIndex + 1 }} / {{ images.length }}</span>
            <button (click)="nextImage()" [disabled]="lightboxIndex === images.length - 1">
              <span class="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200');
    
    /* Wrapper */
    .upload-wrapper {
      font-family: "Montserrat", sans-serif;
      width: 100%;
    }
    
    .upload-label {
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
    
    /* Drop Zone */
    .upload-dropzone {
      border: 2px dashed #CED4DA;
      border-radius: 0.5rem;
      padding: 2rem;
      text-align: center;
      cursor: pointer;
      transition: all 0.3s ease;
      background: #f9fafb;
    }
    
    .upload-dropzone:hover:not(.disabled) {
      border-color: #007bff;
      background: #f0f9ff;
    }
    
    .upload-dropzone.dragover {
      border-color: #007bff;
      background: #e6f7ff;
      transform: scale(1.02);
    }
    
    .upload-dropzone.disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
    
    .dropzone-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
    }
    
    .dropzone-icon {
      font-size: 4rem;
      color: #007bff;
    }
    
    .dropzone-text {
      margin: 0;
      font-size: 1rem;
      color: #443A3A;
    }
    
    .dropzone-text strong {
      color: #007bff;
    }
    
    .dropzone-hint {
      margin: 0;
      font-size: 0.875rem;
      color: #6c757d;
    }
    
    /* Images Container */
    .images-container {
      margin-top: 1rem;
    }
    
    /* Grid Mode */
    .images-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
      gap: 1rem;
    }
    
    .images-grid .image-item {
      position: relative;
      border-radius: 0.5rem;
      overflow: hidden;
      border: 2px solid #e5e7eb;
      transition: all 0.2s;
    }
    
    .images-grid .image-item:hover {
      border-color: #007bff;
      transform: translateY(-4px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
    
    /* List Mode */
    .images-list {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }
    
    .images-list .image-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 0.75rem;
      border: 1px solid #e5e7eb;
      border-radius: 0.5rem;
      transition: all 0.2s;
    }
    
    .images-list .image-item:hover {
      border-color: #007bff;
      background: #f9fafb;
    }
    
    .images-list .image-preview {
      width: 80px;
      height: 80px;
      flex-shrink: 0;
    }
    
    /* Compact Mode */
    .images-compact {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }
    
    .images-compact .image-item {
      width: 60px;
      height: 60px;
    }
    
    /* Image Preview */
    .image-preview {
      position: relative;
      width: 100%;
      aspect-ratio: 1;
      overflow: hidden;
      background: #f3f4f6;
      cursor: pointer;
    }
    
    .image-preview img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
    /* Upload Progress */
    .upload-progress {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background: rgba(0, 0, 0, 0.8);
      padding: 0.5rem;
    }
    
    .progress-bar {
      height: 4px;
      background: rgba(255, 255, 255, 0.3);
      border-radius: 2px;
      overflow: hidden;
      margin-bottom: 0.25rem;
    }
    
    .progress-fill {
      height: 100%;
      background: #007bff;
      transition: width 0.3s ease;
    }
    
    .progress-text {
      font-size: 0.75rem;
      color: white;
      font-weight: 600;
    }
    
    /* Status Overlays */
    .status-overlay {
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: rgba(0, 0, 0, 0.7);
      color: white;
      font-size: 0.875rem;
      gap: 0.5rem;
    }
    
    .status-success {
      background: rgba(40, 167, 69, 0.9);
    }
    
    .status-error {
      background: rgba(220, 53, 69, 0.9);
    }
    
    .error-text {
      font-size: 0.75rem;
      text-align: center;
      padding: 0 0.5rem;
    }
    
    .spinner {
      width: 24px;
      height: 24px;
      border: 3px solid rgba(255, 255, 255, 0.3);
      border-top-color: white;
      border-radius: 50%;
      animation: spin 0.6s linear infinite;
    }
    
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    
    /* Image Info */
    .image-info {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      min-width: 0;
    }
    
    .image-name {
      font-weight: 600;
      color: #443A3A;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    
    .image-size,
    .image-dimensions {
      font-size: 0.75rem;
      color: #6c757d;
    }
    
    /* Actions */
    .image-actions {
      display: flex;
      gap: 0.25rem;
      padding: 0.5rem;
      background: rgba(255, 255, 255, 0.95);
      border-top: 1px solid #e5e7eb;
    }
    
    .images-list .image-actions {
      border-top: none;
      padding: 0;
    }
    
    .action-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      border: none;
      background: transparent;
      border-radius: 0.25rem;
      cursor: pointer;
      transition: all 0.2s;
      color: #6c757d;
    }
    
    .action-btn:hover:not(:disabled) {
      background: #f3f4f6;
      color: #007bff;
    }
    
    .action-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    
    .action-delete:hover:not(:disabled) {
      color: #dc3545;
    }
    
    .action-btn .material-symbols-outlined {
      font-size: 1.25rem;
    }
    
    /* Footer */
    .upload-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      margin-top: 1rem;
      padding: 0.75rem;
      background: #f9fafb;
      border-radius: 0.375rem;
    }
    
    .footer-count {
      font-size: 0.875rem;
      color: #6c757d;
      font-weight: 500;
    }
    
    .footer-btn {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1rem;
      border: 1px solid #CED4DA;
      background: white;
      border-radius: 0.375rem;
      font-family: "Montserrat", sans-serif;
      font-size: 0.875rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
    }
    
    .footer-btn:hover:not(:disabled) {
      background: #f3f4f6;
      border-color: #007bff;
      color: #007bff;
    }
    
    .footer-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    
    .footer-btn-primary {
      background: #007bff;
      color: white;
      border-color: #007bff;
    }
    
    .footer-btn-primary:hover:not(:disabled) {
      background: #0056b3;
      border-color: #0056b3;
      color: white;
    }
    
    /* Messages */
    .upload-messages {
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
    
    .error-message .material-symbols-outlined,
    .success-message .material-symbols-outlined {
      font-size: 1rem;
    }
    
    /* Lightbox */
    .lightbox-modal {
      position: fixed;
      inset: 0;
      z-index: 9999;
      background: rgba(0, 0, 0, 0.95);
      display: flex;
      align-items: center;
      justify-content: center;
      animation: fadeIn 0.2s ease;
    }
    
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    .lightbox-content {
      position: relative;
      max-width: 90vw;
      max-height: 90vh;
    }
    
    .lightbox-content img {
      max-width: 100%;
      max-height: 90vh;
      object-fit: contain;
    }
    
    .lightbox-close {
      position: absolute;
      top: 1rem;
      right: 1rem;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(255, 255, 255, 0.2);
      border: none;
      border-radius: 50%;
      color: white;
      cursor: pointer;
      transition: all 0.2s;
    }
    
    .lightbox-close:hover {
      background: rgba(255, 255, 255, 0.3);
    }
    
    .lightbox-nav {
      position: absolute;
      bottom: 2rem;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 0.75rem 1.5rem;
      background: rgba(0, 0, 0, 0.7);
      border-radius: 2rem;
      color: white;
    }
    
    .lightbox-nav button {
      width: 36px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(255, 255, 255, 0.2);
      border: none;
      border-radius: 50%;
      color: white;
      cursor: pointer;
      transition: all 0.2s;
    }
    
    .lightbox-nav button:hover:not(:disabled) {
      background: rgba(255, 255, 255, 0.3);
    }
    
    .lightbox-nav button:disabled {
      opacity: 0.3;
      cursor: not-allowed;
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
      .images-grid {
        grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
      }
      
      .upload-dropzone {
        padding: 1.5rem;
      }
      
      .dropzone-icon {
        font-size: 3rem;
      }
    }
  `]
})
export class ImageUploadComponent implements ControlValueAccessor, OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  
  // Basic props (igual ao Web Input)
  @Input() id = `upload-${Math.random().toString(36).substr(2, 9)}`;
  @Input() label = '';
  @Input() placeholder = '';
  @Input() disabled = false;
  @Input() required = false;
  
  // Validation
  @Input() error = false;
  @Input() success = false;
  @Input() errorMessage = '';
  @Input() successMessage = '';
  @Input() helperText = '';
  
  // Upload specific
  @Input() mode: UploadMode = 'grid';
  @Input() multiple = true;
  @Input() maxFiles = 10;
  @Input() maxFileSize = 5 * 1024 * 1024; // 5MB
  @Input() accept = 'image/*';
  @Input() autoUpload = false;
  @Input() uploadUrl = '';
  @Input() showHints = true;
  @Input() autoCompress = false;
  @Input() compressionQuality = 0.8;
  
  @Output() valueChange = new EventEmitter<UploadedImage[]>();
  @Output() filesSelected = new EventEmitter<File[]>();
  @Output() fileUploaded = new EventEmitter<UploadedImage>();
  @Output() fileDeleted = new EventEmitter<UploadedImage>();
  @Output() uploadError = new EventEmitter<{ image: UploadedImage; error: string }>();
  
  images: UploadedImage[] = [];
  isDragOver = false;
  lightboxOpen = false;
  lightboxIndex = 0;
  
  private onChange: any = () => {};
  private onTouched: any = () => {};

  constructor(
    @Optional() @Self() public ngControl: NgControl,
    private sanitizer: DomSanitizer
  ) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnInit() {}

  // ControlValueAccessor
  writeValue(value: any): void {
    if (Array.isArray(value)) {
      this.images = value;
    } else if (value) {
      this.images = [value];
    } else {
      this.images = [];
    }
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

  // File Selection
  openFileSelector() {
    if (!this.disabled && (this.maxFiles === 0 || this.images.length < this.maxFiles)) {
      this.fileInput.nativeElement.click();
    }
  }

  onFileSelected(event: Event) {
    const files = (event.target as HTMLInputElement).files;
    if (files) {
      this.handleFiles(Array.from(files));
    }
  }

  // Drag & Drop
  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = false;
    
    const files = event.dataTransfer?.files;
    if (files && !this.disabled) {
      this.handleFiles(Array.from(files));
    }
  }

  // Handle Files
  async handleFiles(files: File[]) {
    const remaining = this.maxFiles > 0 ? this.maxFiles - this.images.length : files.length;
    const filesToProcess = files.slice(0, remaining);
    
    this.filesSelected.emit(filesToProcess);
    
    for (const file of filesToProcess) {
      if (!this.validateFile(file)) continue;
      
      const image = await this.createImageObject(file);
      this.images.push(image);
      
      if (this.autoUpload && this.uploadUrl) {
        this.uploadImage(image);
      }
    }
    
    this.emitValue();
  }

  validateFile(file: File): boolean {
    // Size validation
    if (this.maxFileSize > 0 && file.size > this.maxFileSize) {
      this.error = true;
      this.errorMessage = `Arquivo muito grande: ${this.formatFileSize(file.size)} (máx: ${this.formatFileSize(this.maxFileSize)})`;
      return false;
    }
    
    // Type validation
    if (this.accept && this.accept !== '*') {
      const acceptTypes = this.accept.split(',').map(t => t.trim());
      const isValid = acceptTypes.some(type => {
        if (type === 'image/*') return file.type.startsWith('image/');
        return file.type === type;
      });
      
      if (!isValid) {
        this.error = true;
        this.errorMessage = `Tipo de arquivo não permitido: ${file.type}`;
        return false;
      }
    }
    
    return true;
  }

  async createImageObject(file: File): Promise<UploadedImage> {
    const url = URL.createObjectURL(file);
    const dimensions = await this.getImageDimensions(url);
    
    return {
      id: `img-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      file,
      url,
      name: file.name,
      size: file.size,
      type: file.type,
      width: dimensions.width,
      height: dimensions.height,
      status: 'idle',
      thumbnail: url,
      uploaded: false
    };
  }

  getImageDimensions(url: string): Promise<{ width: number; height: number }> {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve({ width: img.width, height: img.height });
      img.onerror = () => resolve({ width: 0, height: 0 });
      img.src = url;
    });
  }

  // Upload
  async uploadImage(image: UploadedImage) {
    if (!this.uploadUrl || !image.file) return;
    
    image.status = 'uploading';
    image.progress = 0;
    
    const formData = new FormData();
    formData.append('file', image.file);
    
    try {
      // Simulated upload (replace with real HTTP call)
      await this.simulateUpload(image);
      
      image.status = 'success';
      image.uploaded = true;
      this.fileUploaded.emit(image);
    } catch (error: any) {
      image.status = 'error';
      image.error = error.message || 'Erro ao enviar arquivo';
      this.uploadError.emit({ image, error: image.error || 'Erro desconhecido' });
    }
    
    this.emitValue();
  }

  private simulateUpload(image: UploadedImage): Promise<void> {
    return new Promise((resolve) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        image.progress = progress;
        
        if (progress >= 100) {
          clearInterval(interval);
          resolve();
        }
      }, 200);
    });
  }

  uploadAll() {
    const idleImages = this.images.filter(img => img.status === 'idle');
    idleImages.forEach(img => this.uploadImage(img));
  }

  hasIdle(): boolean {
    return this.images.some(img => img.status === 'idle');
  }

  // Actions
  removeImage(index: number) {
    const image = this.images[index];
    URL.revokeObjectURL(image.url);
    this.images.splice(index, 1);
    this.fileDeleted.emit(image);
    this.emitValue();
  }

  clearAll() {
    this.images.forEach(img => URL.revokeObjectURL(img.url));
    this.images = [];
    this.emitValue();
  }

  rotateImage(index: number) {
    // Implement rotation logic
    console.log('Rotate image:', index);
  }

  downloadImage(index: number) {
    const image = this.images[index];
    const link = document.createElement('a');
    link.href = image.url;
    link.download = image.name;
    link.click();
  }

  openEditor(index: number) {
    // Implement editor modal
    console.log('Open editor:', index);
  }

  // Lightbox
  openLightbox(index: number) {
    this.lightboxIndex = index;
    this.lightboxOpen = true;
  }

  closeLightbox() {
    this.lightboxOpen = false;
  }

  nextImage() {
    if (this.lightboxIndex < this.images.length - 1) {
      this.lightboxIndex++;
    }
  }

  prevImage() {
    if (this.lightboxIndex > 0) {
      this.lightboxIndex--;
    }
  }

  // Helpers
  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  }

  getHintText(): string {
    const hints = [];
    
    if (this.maxFiles > 0) {
      hints.push(`Máx: ${this.maxFiles} arquivos`);
    }
    
    if (this.maxFileSize > 0) {
      hints.push(`Tamanho máx: ${this.formatFileSize(this.maxFileSize)}`);
    }
    
    return hints.join(' • ');
  }

  private emitValue() {
    const value = this.mode === 'single' ? this.images[0] : this.images;
    this.onChange(value);
    this.valueChange.emit(this.images);
  }

  @HostListener('document:keydown.escape')
  onEscapeKey() {
    if (this.lightboxOpen) {
      this.closeLightbox();
    }
  }
}