import {
  Component,
  Input,
  Output,
  EventEmitter,
  forwardRef,
  OnInit,
  ViewChild,
  ElementRef,
  Optional,
  Self,
  OnDestroy,
  HostListener
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ControlValueAccessor,
  NgControl,
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';

export interface Template {
  label: string;
  content: string;
  icon?: string;
}

@Component({
  selector: 'web-textarea',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: `
    <div class="textarea-wrapper" [class.fullscreen]="isFullscreen">
      <!-- Label -->
      <label *ngIf="label" [for]="id" class="textarea-label">
        {{ label }}
        <span *ngIf="required" class="required">*</span>
      </label>
      
      <!-- Toolbar -->
      <div *ngIf="showToolbar" class="textarea-toolbar">
        <div class="toolbar-group">
          <button type="button" class="toolbar-button" (click)="insertMarkdown('**', '**')" title="Bold (Ctrl+B)">
            <span class="material-symbols-outlined">format_bold</span>
          </button>
          <button type="button" class="toolbar-button" (click)="insertMarkdown('*', '*')" title="Italic (Ctrl+I)">
            <span class="material-symbols-outlined">format_italic</span>
          </button>
          <button type="button" class="toolbar-button" (click)="insertMarkdown('[', '](url)')" title="Link (Ctrl+K)">
            <span class="material-symbols-outlined">link</span>
          </button>
        </div>
        
        <div class="toolbar-group" *ngIf="showTemplates && templates.length > 0">
          <button type="button" class="toolbar-button" [class.active]="showTemplateDropdown" (click)="toggleTemplates()" title="Templates">
            <span class="material-symbols-outlined">description</span>
          </button>
        </div>
        
        <div class="toolbar-group" *ngIf="showEmojiPicker">
          <button type="button" class="toolbar-button" [class.active]="showEmojiPanel" (click)="toggleEmoji()" title="Emoji">
            <span class="material-symbols-outlined">sentiment_satisfied</span>
          </button>
        </div>
        
        <div class="toolbar-group">
          <button type="button" class="toolbar-button" (click)="toggleFullscreen()" [title]="isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'">
            <span class="material-symbols-outlined">{{ isFullscreen ? 'fullscreen_exit' : 'fullscreen' }}</span>
          </button>
        </div>
      </div>
      
      <!-- Templates Dropdown -->
      <div *ngIf="showTemplateDropdown && templates.length > 0" class="templates-dropdown">
        <button *ngFor="let template of templates"
                type="button"
                class="template-item"
                (click)="applyTemplate(template)">
          <span *ngIf="template.icon" class="material-symbols-outlined">{{ template.icon }}</span>
          <span class="template-label">{{ template.label }}</span>
        </button>
      </div>
      
      <!-- Emoji Picker -->
      <div *ngIf="showEmojiPanel" class="emoji-picker">
        <div class="emoji-header">
          <input type="text"
                 [(ngModel)]="emojiSearch"
                 placeholder="Search emoji..."
                 class="emoji-search">
        </div>
        <div class="emoji-grid">
          <button *ngFor="let emoji of getFilteredEmojis()"
                  type="button"
                  class="emoji-button"
                  (click)="insertEmoji(emoji)"
                  [title]="emoji">
            {{ emoji }}
          </button>
        </div>
      </div>
      
      <!-- Textarea Container -->
      <div class="textarea-container" [class.has-error]="error" [class.disabled]="disabled">
        <textarea
          #textarea
          [id]="id"
          [value]="value"
          [placeholder]="placeholder"
          [disabled]="disabled"
          [readonly]="readonly"
          [rows]="rows"
          [spellcheck]="spellcheck"
          (input)="onInput($event)"
          (focus)="onFocus()"
          (blur)="onBlur()"
          (keydown)="onKeydown($event)"
          (paste)="onPaste($event)"
          class="textarea-input"
          [class.auto-resize]="autoResize"
          [style.minHeight.px]="minHeight"
          [style.maxHeight.px]="maxHeight">
        </textarea>
        
        <!-- Character/Word Counter -->
        <div *ngIf="showCounter" class="textarea-counter">
          <span *ngIf="showWordCount" class="counter-item">
            {{ getWordCount() }} {{ getWordCount() === 1 ? 'word' : 'words' }}
          </span>
          <span class="counter-item" [class.counter-warning]="isNearLimit()" [class.counter-error]="isOverLimit()">
            {{ value.length }}{{ maxLength ? ' / ' + maxLength : '' }} characters
          </span>
        </div>
      </div>
      
      <!-- Markdown Preview -->
      <div *ngIf="showMarkdownPreview && value" class="markdown-preview">
        <div class="preview-header">
          <span class="material-symbols-outlined">visibility</span>
          <span>Preview</span>
        </div>
        <div class="preview-content" [innerHTML]="getMarkdownPreview()"></div>
      </div>
      
      <!-- Messages -->
      <div class="textarea-messages">
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
    </div>
  `,
  styles: [`
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200');
    
    .textarea-wrapper {
      font-family: "Montserrat", sans-serif;
      width: 100%;
      position: relative;
    }
    
    .textarea-wrapper.fullscreen {
      position: fixed;
      inset: 0;
      z-index: 9999;
      background: white;
      padding: 1rem;
      overflow: auto;
    }
    
    .textarea-label {
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
    
    /* Toolbar */
    .textarea-toolbar {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem;
      background: #f9fafb;
      border: 1px solid #CED4DA;
      border-bottom: none;
      border-radius: 0.375rem 0.375rem 0 0;
    }
    
    .toolbar-group {
      display: flex;
      gap: 0.25rem;
      padding-right: 0.5rem;
      border-right: 1px solid #e5e7eb;
    }
    
    .toolbar-group:last-child {
      border-right: none;
      margin-left: auto;
    }
    
    .toolbar-button {
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: none;
      background: transparent;
      border-radius: 0.375rem;
      cursor: pointer;
      transition: all 0.2s;
      color: #6c757d;
    }
    
    .toolbar-button:hover {
      background: white;
      color: #007bff;
    }
    
    .toolbar-button.active {
      background: #007bff;
      color: white;
    }
    
    /* Templates Dropdown */
    .templates-dropdown {
      position: absolute;
      top: 4.5rem;
      left: 0;
      z-index: 1000;
      background: white;
      border: 1px solid #CED4DA;
      border-radius: 0.375rem;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      min-width: 200px;
      max-height: 300px;
      overflow-y: auto;
    }
    
    .template-item {
      width: 100%;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1rem;
      border: none;
      background: transparent;
      text-align: left;
      cursor: pointer;
      transition: all 0.2s;
      font-family: "Montserrat", sans-serif;
      font-size: 0.875rem;
      color: #443A3A;
    }
    
    .template-item:hover {
      background: #f0f9ff;
      color: #007bff;
    }
    
    .template-label {
      flex: 1;
    }
    
    /* Emoji Picker */
    .emoji-picker {
      position: absolute;
      top: 4.5rem;
      right: 0;
      z-index: 1000;
      background: white;
      border: 1px solid #CED4DA;
      border-radius: 0.375rem;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      width: 320px;
    }
    
    .emoji-header {
      padding: 0.75rem;
      border-bottom: 1px solid #e5e7eb;
    }
    
    .emoji-search {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid #CED4DA;
      border-radius: 0.375rem;
      font-family: "Montserrat", sans-serif;
      font-size: 0.875rem;
      outline: none;
    }
    
    .emoji-search:focus {
      border-color: #007bff;
    }
    
    .emoji-grid {
      display: grid;
      grid-template-columns: repeat(8, 1fr);
      gap: 0.25rem;
      padding: 0.5rem;
      max-height: 200px;
      overflow-y: auto;
    }
    
    .emoji-button {
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: none;
      background: transparent;
      border-radius: 0.375rem;
      cursor: pointer;
      font-size: 1.25rem;
      transition: all 0.2s;
    }
    
    .emoji-button:hover {
      background: #f0f9ff;
      transform: scale(1.2);
    }
    
    /* Textarea Container */
    .textarea-container {
      position: relative;
      border: 1px solid #CED4DA;
      border-radius: 0.375rem;
      background: white;
      transition: all 0.2s;
    }
    
    .textarea-toolbar + .textarea-container {
      border-top-left-radius: 0;
      border-top-right-radius: 0;
    }
    
    .textarea-container:hover:not(.disabled) {
      border-color: #ADB5BD;
    }
    
    .textarea-container:focus-within {
      border-color: #007bff;
      box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
    }
    
    .textarea-container.has-error {
      border-color: #dc3545;
    }
    
    .textarea-container.disabled {
      background: #f8f9fa;
      opacity: 0.6;
      cursor: not-allowed;
    }
    
    .textarea-input {
      width: 100%;
      padding: 0.95rem;
      border: none;
      outline: none;
      font-family: "Montserrat", sans-serif;
      font-size: 1rem;
      color: #443A3A;
      resize: vertical;
      background: transparent;
    }
    
    .textarea-input.auto-resize {
      resize: none;
      overflow: hidden;
    }
    
    .textarea-input::placeholder {
      color: #ADB5BD;
    }
    
    .textarea-input:disabled {
      cursor: not-allowed;
    }
    
    /* Counter */
    .textarea-counter {
      display: flex;
      justify-content: flex-end;
      gap: 1rem;
      padding: 0.5rem 0.95rem;
      border-top: 1px solid #e5e7eb;
      font-size: 0.75rem;
      color: #6c757d;
    }
    
    .counter-item {
      display: flex;
      align-items: center;
      gap: 0.25rem;
    }
    
    .counter-warning {
      color: #ffc107;
      font-weight: 600;
    }
    
    .counter-error {
      color: #dc3545;
      font-weight: 600;
    }
    
    /* Markdown Preview */
    .markdown-preview {
      margin-top: 1rem;
      border: 1px solid #CED4DA;
      border-radius: 0.375rem;
      background: #f9fafb;
    }
    
    .preview-header {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1rem;
      border-bottom: 1px solid #CED4DA;
      background: white;
      border-radius: 0.375rem 0.375rem 0 0;
      font-weight: 600;
      color: #443A3A;
      font-size: 0.875rem;
    }
    
    .preview-content {
      padding: 1rem;
      line-height: 1.6;
      color: #443A3A;
    }
    
    .preview-content strong {
      font-weight: 700;
    }
    
    .preview-content em {
      font-style: italic;
    }
    
    .preview-content a {
      color: #007bff;
      text-decoration: underline;
    }
    
    /* Messages */
    .textarea-messages {
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
    
    .material-symbols-outlined {
      font-size: 1.25rem;
      font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
      user-select: none;
    }
    
    /* Fullscreen */
    .fullscreen .textarea-container {
      height: calc(100vh - 12rem);
    }
    
    .fullscreen .textarea-input {
      height: 100%;
    }
  `]
})
export class TextareaComponent implements ControlValueAccessor, OnInit, OnDestroy {
  @ViewChild('textarea') textareaElement!: ElementRef<HTMLTextAreaElement>;
  
  @Input() id = `textarea-${Math.random().toString(36).substr(2, 9)}`;
  @Input() label = '';
  @Input() placeholder = '';
  @Input() disabled = false;
  @Input() readonly = false;
  @Input() required = false;
  @Input() rows = 4;
  @Input() minHeight = 100;
  @Input() maxHeight = 500;
  
  @Input() error = false;
  @Input() success = false;
  @Input() errorMessage = '';
  @Input() successMessage = '';
  @Input() helperText = '';
  
  @Input() autoResize = true;
  @Input() showCounter = true;
  @Input() showWordCount = true;
  @Input() maxLength?: number;
  @Input() spellcheck = true;
  
  @Input() showToolbar = true;
  @Input() showMarkdownPreview = false;
  @Input() showEmojiPicker = true;
  @Input() showTemplates = true;
  @Input() templates: Template[] = [];
  
  @Input() autoSave = false;
  @Input() autoSaveKey = 'web-textarea-autosave';
  @Input() autoSaveDelay = 1000;
  
  @Output() valueChange = new EventEmitter<string>();
  @Output() focused = new EventEmitter<void>();
  @Output() blurred = new EventEmitter<void>();
  
  value = '';
  isFullscreen = false;
  showTemplateDropdown = false;
  showEmojiPanel = false;
  emojiSearch = '';
  
  private onChange: any = () => {};
  private onTouched: any = () => {};
  private autoSaveTimeout?: any;
  
  emojis = ['😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂', '🙂', '🙃', '😉', '😊', '😇', '🥰', '😍', '🤩', '😘', '😗', '😚', '😙', '😋', '😛', '😜', '🤪', '😝', '🤑', '🤗', '🤭', '🤫', '🤔', '🤐', '🤨', '😐', '😑', '😶', '😏', '😒', '🙄', '😬', '🤥', '😌', '😔', '😪', '🤤', '😴', '😷', '🤒', '🤕', '🤢', '🤮', '🤧', '🥵', '🥶', '🥴', '😵', '🤯', '🤠', '🥳', '😎', '🤓', '🧐', '👍', '👎', '👌', '✌️', '🤞', '🤟', '🤘', '🤙', '👈', '👉', '👆', '👇', '☝️', '👋', '🤚', '🖐️', '✋', '🖖', '👏', '🙌', '🤝', '🙏', '❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '💔', '❣️', '💕', '💞', '💓', '💗', '💖', '💘', '💝', '💟', '☮️', '✝️', '☪️', '🕉️', '☸️', '✡️', '🔯', '🕎', '☯️', '☦️', '🛐', '⛎', '♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓', '🆔', '⚛️', '🉑', '☢️', '☣️', '📴', '📳', '🈶', '🈚', '🈸', '🈺', '🈷️', '✴️', '🆚', '💮', '🉐', '㊙️', '㊗️', '🈴', '🈵', '🈹', '🈲', '🅰️', '🅱️', '🆎', '🆑', '🅾️', '🆘', '❌', '⭕', '🛑', '⛔', '📛', '🚫', '💯', '💢', '♨️', '🚷', '🚯', '🚳', '🚱', '🔞', '📵', '🚭'];

  constructor(@Optional() @Self() public ngControl: NgControl) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnInit() {
    if (this.autoSave) {
      this.loadAutoSave();
    }
  }

  ngOnDestroy() {
    if (this.autoSaveTimeout) {
      clearTimeout(this.autoSaveTimeout);
    }
  }

  writeValue(value: any): void {
    this.value = value || '';
    if (this.autoResize) {
      setTimeout(() => this.adjustHeight());
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

  onInput(event: Event) {
    const target = event.target as HTMLTextAreaElement;
    let newValue = target.value;
    
    // Aplicar maxLength manualmente
    if (this.maxLength && newValue.length > this.maxLength) {
      newValue = newValue.substring(0, this.maxLength);
      target.value = newValue;
    }
    
    this.value = newValue;
    this.onChange(this.value);
    this.valueChange.emit(this.value);
    
    if (this.autoResize) {
      this.adjustHeight();
    }
    
    if (this.autoSave) {
      this.scheduleAutoSave();
    }
  }

  onFocus() {
    this.focused.emit();
  }

  onBlur() {
    this.onTouched();
    this.blurred.emit();
  }

  onKeydown(event: KeyboardEvent) {
    // Ctrl+B - Bold
    if (event.ctrlKey && event.key === 'b') {
      event.preventDefault();
      this.insertMarkdown('**', '**');
    }
    
    // Ctrl+I - Italic
    if (event.ctrlKey && event.key === 'i') {
      event.preventDefault();
      this.insertMarkdown('*', '*');
    }
    
    // Ctrl+K - Link
    if (event.ctrlKey && event.key === 'k') {
      event.preventDefault();
      this.insertMarkdown('[', '](url)');
    }
    
    // Ctrl+Enter - Submit (emit event)
    if (event.ctrlKey && event.key === 'Enter') {
      event.preventDefault();
      // Parent can listen to this
    }
  }

  onPaste(event: ClipboardEvent) {
    if (!this.maxLength) return;
    
    event.preventDefault();
    const pastedText = event.clipboardData?.getData('text') || '';
    
    if (!this.textareaElement) return;
    
    const textarea = this.textareaElement.nativeElement;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    
    // Calcular novo texto após colar
    const beforeText = this.value.substring(0, start);
    const afterText = this.value.substring(end);
    let newText = beforeText + pastedText + afterText;
    
    // Truncar se exceder o limite
    if (newText.length > this.maxLength) {
      const availableSpace = this.maxLength - (beforeText.length + afterText.length);
      const truncatedPaste = pastedText.substring(0, Math.max(0, availableSpace));
      newText = beforeText + truncatedPaste + afterText;
    }
    
    this.value = newText;
    textarea.value = newText;
    this.onChange(this.value);
    this.valueChange.emit(this.value);
    
    // Posicionar cursor
    const newCursorPos = start + Math.min(pastedText.length, this.maxLength - beforeText.length - afterText.length);
    setTimeout(() => {
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    });
    
    if (this.autoResize) {
      this.adjustHeight();
    }
  }

  adjustHeight() {
    if (!this.textareaElement) return;
    
    const textarea = this.textareaElement.nativeElement;
    textarea.style.height = 'auto';
    const newHeight = Math.max(this.minHeight, Math.min(textarea.scrollHeight, this.maxHeight));
    textarea.style.height = newHeight + 'px';
  }

  insertMarkdown(before: string, after: string) {
    if (!this.textareaElement) return;
    
    const textarea = this.textareaElement.nativeElement;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = this.value.substring(start, end);
    
    const newText = this.value.substring(0, start) + before + selectedText + after + this.value.substring(end);
    
    this.value = newText;
    this.onChange(this.value);
    this.valueChange.emit(this.value);
    
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, end + before.length);
    });
  }

  toggleTemplates() {
    this.showTemplateDropdown = !this.showTemplateDropdown;
    this.showEmojiPanel = false;
  }

  toggleEmoji() {
    this.showEmojiPanel = !this.showEmojiPanel;
    this.showTemplateDropdown = false;
  }

  toggleFullscreen() {
    this.isFullscreen = !this.isFullscreen;
  }

  applyTemplate(template: Template) {
    this.value = template.content;
    this.onChange(this.value);
    this.valueChange.emit(this.value);
    this.showTemplateDropdown = false;
    
    if (this.autoResize) {
      setTimeout(() => this.adjustHeight());
    }
  }

  insertEmoji(emoji: string) {
    if (!this.textareaElement) return;
    
    const textarea = this.textareaElement.nativeElement;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    
    const newText = this.value.substring(0, start) + emoji + this.value.substring(end);
    
    this.value = newText;
    this.onChange(this.value);
    this.valueChange.emit(this.value);
    
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + emoji.length, start + emoji.length);
    });
  }

  getFilteredEmojis(): string[] {
    if (!this.emojiSearch) return this.emojis;
    // Simple filter for demo - in real app, you'd have emoji names/keywords
    return this.emojis;
  }

  getWordCount(): number {
    if (!this.value) return 0;
    return this.value.trim().split(/\s+/).filter(word => word.length > 0).length;
  }

  isNearLimit(): boolean {
    if (!this.maxLength) return false;
    return this.value.length >= this.maxLength * 0.9;
  }

  isOverLimit(): boolean {
    if (!this.maxLength) return false;
    return this.value.length > this.maxLength;
  }

  getMarkdownPreview(): string {
    let html = this.value;
    
    // Bold
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Italic
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
    
    // Links
    html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank">$1</a>');
    
    // Line breaks
    html = html.replace(/\n/g, '<br>');
    
    return html;
  }

  scheduleAutoSave() {
    if (this.autoSaveTimeout) {
      clearTimeout(this.autoSaveTimeout);
    }
    
    this.autoSaveTimeout = setTimeout(() => {
      this.saveToLocalStorage();
    }, this.autoSaveDelay);
  }

  saveToLocalStorage() {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.autoSaveKey, this.value);
    }
  }

  loadAutoSave() {
    if (typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem(this.autoSaveKey);
      if (saved && !this.value) {
        this.value = saved;
        this.onChange(this.value);
      }
    }
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.templates-dropdown') && !target.closest('.toolbar-button')) {
      this.showTemplateDropdown = false;
    }
    if (!target.closest('.emoji-picker') && !target.closest('.toolbar-button')) {
      this.showEmojiPanel = false;
    }
  }
}