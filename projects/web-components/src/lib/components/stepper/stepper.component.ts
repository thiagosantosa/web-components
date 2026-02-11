import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  TemplateRef,
  ContentChildren,
  QueryList,
  AfterContentInit,
  OnDestroy,
  HostListener,
  ChangeDetectorRef,
  ViewChild
} from '@angular/core';
import { CommonModule } from '@angular/common';

export type StepperOrientation = 'horizontal' | 'vertical';
export type StepState = 'completed' | 'error' | 'warning' | 'disabled' | 'active' | 'inactive';

export interface Step {
  label: string;
  description?: string;
  icon?: string;
  state?: StepState;
  optional?: boolean;
  editable?: boolean;
  completed?: boolean;
  validator?: () => boolean | Promise<boolean>;
  condition?: () => boolean;
}

export interface StepChangeEvent {
  previousIndex: number;
  currentIndex: number;
  step: Step;
}

@Component({
  selector: 'web-stepper-step',
  standalone: true,
  template: '<ng-template><ng-content></ng-content></ng-template>'
})
export class StepperStepComponent {
  @ViewChild(TemplateRef, { static: true }) template!: TemplateRef<any>;
  @Input() label = '';
  @Input() description = '';
  @Input() icon = '';
  @Input() optional = false;
  @Input() editable = true;
  @Input() state: StepState = 'inactive';
  @Input() validator?: () => boolean | Promise<boolean>;
  @Input() condition?: () => boolean;
}

@Component({
  selector: 'web-stepper',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="stepper-wrapper" [class]="'stepper-' + orientation">
      
      <!-- Steps Header -->
      <div class="stepper-header">
        <div *ngFor="let step of visibleSteps; let i = index; let isLast = last"
             class="step-header"
             [class.step-active]="i === currentStepIndex"
             [class.step-completed]="isStepCompleted(i)"
             [class.step-error]="step.state === 'error'"
             [class.step-warning]="step.state === 'warning'"
             [class.step-disabled]="step.state === 'disabled'"
             [class.step-optional]="step.optional"
             [class.clickable]="isStepClickable(i)"
             (click)="onStepHeaderClick(i)">
          
          <!-- Step Icon/Number -->
          <div class="step-icon-wrapper">
            <div class="step-icon" [style.background-color]="getStepIconColor(i, step)" [style.border-color]="getStepIconColor(i, step)">
              <span *ngIf="isStepCompleted(i) && !step.icon" class="material-symbols-outlined">check</span>
              <span *ngIf="step.state === 'error' && !step.icon" class="material-symbols-outlined">close</span>
              <span *ngIf="step.state === 'warning' && !step.icon" class="material-symbols-outlined">warning</span>
              <span *ngIf="step.icon" class="material-symbols-outlined">{{ step.icon }}</span>
              <span *ngIf="!step.icon && !isStepCompleted(i) && step.state !== 'error' && step.state !== 'warning'">
                {{ getVisibleStepIndex(i) + 1 }}
              </span>
            </div>
            <span *ngIf="step.optional" class="optional-badge">Optional</span>
          </div>
          
          <!-- Step Label -->
          <div class="step-label-wrapper">
            <div class="step-label">{{ step.label }}</div>
            <div *ngIf="step.description" class="step-description">{{ step.description }}</div>
          </div>
          
          <!-- Connector Line -->
          <div *ngIf="!isLast" class="step-connector"
               [class.step-connector-completed]="isStepCompleted(i)"
               [style.background-color]="isStepCompleted(i) ? completedColor : inactiveColor">
          </div>
        </div>
      </div>
      
      <!-- Steps Content -->
      <div class="stepper-content">
        <div class="step-content">
          <!-- Renderiza apenas o step atual usando ng-container -->
          <ng-container *ngIf="stepComponents && stepComponents.length > 0">
            <ng-container *ngFor="let stepComp of stepComponents.toArray(); let i = index">
              <ng-container *ngIf="i === currentStepIndex">
                <ng-container *ngTemplateOutlet="getStepTemplate(i)"></ng-container>
              </ng-container>
            </ng-container>
          </ng-container>
        </div>
      </div>
      
      <!-- Navigation Buttons -->
      <div class="stepper-navigation">
        <button type="button"
                class="stepper-button stepper-button-back"
                [disabled]="!canGoBack()"
                (click)="previous()"
                [attr.aria-label]="'Go to previous step'">
          <span class="material-symbols-outlined">arrow_back</span>
          <span class="button-text">{{ backButtonLabel }}</span>
        </button>
        
        <div class="stepper-navigation-info">
          <span class="step-counter">Step {{ currentStepIndex + 1 }} of {{ visibleSteps.length }}</span>
        </div>
        
        <button type="button"
                *ngIf="!isLastStep()"
                class="stepper-button stepper-button-next"
                (click)="next()"
                [attr.aria-label]="'Go to next step'">
          <span class="button-text">{{ nextButtonLabel }}</span>
          <span class="material-symbols-outlined">arrow_forward</span>
        </button>
        
        <button type="button"
                *ngIf="isLastStep()"
                class="stepper-button stepper-button-finish"
                [disabled]="!canComplete()"
                (click)="complete()"
                [attr.aria-label]="'Complete and finish'">
          <span class="material-symbols-outlined">check_circle</span>
          <span class="button-text">{{ finishButtonLabel }}</span>
        </button>
      </div>
    </div>
  `,
  styles: [`
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200');
    
    .stepper-wrapper {
      font-family: "Montserrat", sans-serif;
      width: 100%;
    }
    
    /* Stepper Header - Horizontal */
    .stepper-horizontal .stepper-header {
      display: flex;
      align-items: flex-start;
      margin-bottom: 2rem;
    }
    
    .stepper-horizontal .step-header {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
      min-width: 120px;
    }
    
    .stepper-horizontal .step-connector {
      position: absolute;
      top: 20px;
      left: calc(50% + 40px);
      right: calc(-50% + 40px);
      height: 2px;
      transition: background 0.3s;
    }
    
    /* Stepper Header - Vertical */
    .stepper-vertical .stepper-header {
      display: flex;
      flex-direction: column;
      margin-bottom: 2rem;
    }
    
    .stepper-vertical .step-header {
      display: flex;
      align-items: flex-start;
      position: relative;
      padding-bottom: 2rem;
    }
    
    .stepper-vertical .step-icon-wrapper {
      margin-right: 1rem;
    }
    
    .stepper-vertical .step-label-wrapper {
      flex: 1;
      text-align: left;
    }
    
    .stepper-vertical .step-connector {
      position: absolute;
      left: 20px;
      top: 50px;
      bottom: 0;
      width: 2px;
      transition: background 0.3s;
    }
    
    .stepper-vertical .step-header:last-child .step-connector {
      display: none;
    }
    
    /* Step Icon */
    .step-icon-wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
      position: relative;
      z-index: 1;
    }
    
    .step-icon {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #e5e7eb;
      color: #6c757d;
      font-weight: 600;
      transition: all 0.3s;
      border: 2px solid transparent;
    }
    
    .step-active .step-icon {
      color: white;
      box-shadow: 0 0 0 4px rgba(0, 123, 255, 0.2);
    }
    
    .step-completed .step-icon {
      color: white;
    }
    
    .step-error .step-icon {
      color: white;
    }
    
    .step-warning .step-icon {
      color: #443A3A;
    }
    
    .step-disabled .step-icon {
      background: #f8f9fa;
      color: #adb5bd;
      opacity: 0.6;
    }
    
    .optional-badge {
      padding: 0.125rem 0.5rem;
      background: #e6f7ff;
      color: #007bff;
      border-radius: 1rem;
      font-size: 0.625rem;
      font-weight: 600;
      text-transform: uppercase;
    }
    
    /* Step Label */
    .step-label-wrapper {
      text-align: center;
      margin-top: 0.5rem;
    }
    
    .stepper-vertical .step-label-wrapper {
      margin-top: 0;
    }
    
    .step-label {
      font-size: 0.875rem;
      font-weight: 600;
      color: #6c757d;
      transition: color 0.3s;
    }
    
    .step-active .step-label {
      color: #007bff;
    }
    
    .step-completed .step-label {
      color: #28a745;
    }
    
    .step-error .step-label {
      color: #dc3545;
    }
    
    .step-description {
      font-size: 0.75rem;
      color: #adb5bd;
      margin-top: 0.25rem;
    }
    
    /* Clickable Steps */
    .step-header.clickable {
      cursor: pointer;
    }
    
    .step-header.clickable:hover .step-icon {
      transform: scale(1.1);
    }
    
    /* Step Content */
    .stepper-content {
      margin-bottom: 2rem;
      min-height: 200px;
    }
    
    .step-content {
      animation: fadeIn 0.3s ease;
    }
    
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    /* Navigation */
    .stepper-navigation {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      padding-top: 2rem;
      border-top: 1px solid #e5e7eb;
    }
    
    .stepper-navigation-info {
      flex: 1;
      text-align: center;
    }
    
    .step-counter {
      font-size: 0.875rem;
      color: #6c757d;
      font-weight: 500;
    }
    
    .stepper-button {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 0.375rem;
      font-family: "Montserrat", sans-serif;
      font-size: 0.875rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
    }
    
    .stepper-button-back {
      background: white;
      color: #6c757d;
      border: 1px solid #CED4DA;
    }
    
    .stepper-button-back:hover:not(:disabled) {
      background: #f8f9fa;
      border-color: #adb5bd;
    }
    
    .stepper-button-next {
      background: #007bff;
      color: white;
    }
    
    .stepper-button-next:hover:not(:disabled) {
      background: #0056b3;
    }
    
    .stepper-button-finish {
      background: #28a745;
      color: white;
    }
    
    .stepper-button-finish:hover:not(:disabled) {
      background: #1e7e34;
    }
    
    .stepper-button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    
    /* Mobile */
    @media (max-width: 768px) {
      .stepper-horizontal .stepper-header {
        overflow-x: auto;
        padding-bottom: 1rem;
        scrollbar-width: thin;
        -webkit-overflow-scrolling: touch;
      }
      
      .stepper-horizontal .stepper-header::-webkit-scrollbar {
        height: 4px;
      }
      
      .stepper-horizontal .stepper-header::-webkit-scrollbar-track {
        background: #f1f1f1;
      }
      
      .stepper-horizontal .stepper-header::-webkit-scrollbar-thumb {
        background: #888;
        border-radius: 2px;
      }
      
      .stepper-horizontal .step-header {
        min-width: 80px;
        max-width: 100px;
      }
      
      .step-label {
        font-size: 0.75rem;
      }
      
      .step-description {
        display: none;
      }
      
      .step-icon {
        width: 36px;
        height: 36px;
      }
      
      .stepper-horizontal .step-connector {
        top: 18px;
        left: calc(50% + 36px);
        right: calc(-50% + 36px);
      }
      
      /* Navigation Mobile */
      .stepper-navigation {
        flex-wrap: wrap;
        gap: 0.75rem;
      }
      
      .stepper-navigation-info {
        width: 100%;
        order: -1;
        margin-bottom: 0.5rem;
        text-align: center;
      }
      
      .step-counter {
        font-size: 0.75rem;
      }
      
      .stepper-button {
        flex: 1;
        padding: 0.625rem 1rem;
        font-size: 0.8125rem;
        justify-content: center;
      }
      
      .stepper-button .button-text {
        display: none;
      }
      
      .stepper-button .material-symbols-outlined {
        font-size: 1.25rem;
        margin: 0;
      }
      
      /* Content Mobile */
      .stepper-content {
        min-height: 150px;
        margin-bottom: 1.5rem;
      }
      
      /* Vertical em mobile vira mais compacto */
      .stepper-vertical .step-header {
        padding-bottom: 1.5rem;
      }
      
      .stepper-vertical .step-icon {
        width: 36px;
        height: 36px;
      }
      
      .stepper-vertical .step-connector {
        left: 18px;
        top: 46px;
      }
    }
    
    /* Tablet */
    @media (min-width: 769px) and (max-width: 1024px) {
      .stepper-horizontal .step-header {
        min-width: 100px;
      }
      
      .step-label {
        font-size: 0.8125rem;
      }
      
      .step-description {
        font-size: 0.7rem;
      }
      
      .stepper-button {
        padding: 0.675rem 1.25rem;
      }
    }
    
    /* Desktop Large */
    @media (min-width: 1025px) {
      .stepper-horizontal .step-header {
        min-width: 140px;
      }
    }
    
    /* Very Small Mobile */
    @media (max-width: 375px) {
      .stepper-wrapper {
        padding: 0;
      }
      
      .stepper-horizontal .step-header {
        min-width: 70px;
        max-width: 90px;
      }
      
      .step-icon {
        width: 32px;
        height: 32px;
        font-size: 0.875rem;
      }
      
      .step-label {
        font-size: 0.7rem;
      }
      
      .optional-badge {
        font-size: 0.5rem;
        padding: 0.1rem 0.375rem;
      }
      
      .stepper-button {
        padding: 0.5rem 0.75rem;
        gap: 0.25rem;
      }
    }
    
    /* Touch Improvements */
    @media (hover: none) and (pointer: coarse) {
      .step-header.clickable {
        padding: 0.5rem;
        margin: -0.5rem;
      }
      
      .stepper-button {
        min-height: 44px;
        min-width: 44px;
      }
      
      .step-icon {
        min-width: 40px;
        min-height: 40px;
      }
    }
    
    /* Print */
    @media print {
      .stepper-navigation {
        display: none;
      }
      
      .stepper-content {
        page-break-inside: avoid;
      }
    }
    
    .material-symbols-outlined {
      font-size: 1.25rem;
      font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
      user-select: none;
    }
  `],
  animations: []
})
export class StepperComponent implements OnInit, AfterContentInit, OnDestroy {
  @ContentChildren(StepperStepComponent) stepComponents!: QueryList<StepperStepComponent>;
  
  @Input() orientation: StepperOrientation = 'horizontal';
  @Input() linear = true;
  @Input() steps: Step[] = [];
  @Input() currentStepIndex = 0;
  @Input() editable = true;
  @Input() saveState = false;
  @Input() stateKey = 'web-stepper-state';
  @Input() backButtonLabel = 'Back';
  @Input() nextButtonLabel = 'Next';
  @Input() finishButtonLabel = 'Finish';
  @Input() responsive = true; // Auto-ajusta em mobile
  
  // Customização de cores
  @Input() activeColor = '#007bff';      // Cor do step ativo
  @Input() completedColor = '#28a745';   // Cor do step completado
  @Input() inactiveColor = '#e5e7eb';    // Cor do step inativo
  @Input() errorColor = '#dc3545';       // Cor do step com erro
  @Input() warningColor = '#ffc107';     // Cor do step com aviso
  
  @Output() stepChange = new EventEmitter<StepChangeEvent>();
  @Output() completed = new EventEmitter<void>();
  @Output() stepValidation = new EventEmitter<{ index: number; valid: boolean }>();
  
  visibleSteps: Step[] = [];
  animationDirection: 'forward' | 'backward' = 'forward';
  stepTemplates: QueryList<StepperStepComponent> | null = null;
  isMobile = false;
  originalOrientation: StepperOrientation = 'horizontal';

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.originalOrientation = this.orientation;
    this.checkMobile();
    this.updateVisibleSteps();
    
    if (this.saveState) {
      this.loadState();
    }
  }

  ngAfterContentInit() {
    this.stepTemplates = this.stepComponents;
    
    // Se não há steps via @Input, usa os componentes filhos
    if (this.steps.length === 0 && this.stepComponents.length > 0) {
      this.steps = this.stepComponents.map(component => ({
        label: component.label,
        description: component.description,
        icon: component.icon,
        optional: component.optional,
        editable: component.editable,
        state: component.state,
        validator: component.validator,
        condition: component.condition
      }));
      this.updateVisibleSteps();
    }
  }

  ngOnDestroy() {
    if (this.saveState) {
      this.saveStateToStorage();
    }
  }

  checkMobile() {
    if (!this.responsive) return;
    
    const wasMobile = this.isMobile;
    this.isMobile = window.innerWidth <= 768;
    
    // Em mobile muito pequeno, força vertical
    if (window.innerWidth <= 480 && this.responsive) {
      // Mantém horizontal se usuário explicitamente setou
      // mas melhora a visualização
    }
  }

  @HostListener('window:resize')
  onWindowResize() {
    if (this.responsive) {
      this.checkMobile();
    }
  }

  getStepTemplate(index: number): TemplateRef<any> | null {
    const components = this.stepComponents.toArray();
    return components[index]?.template || null;
  }

  getStepIconColor(index: number, step: Step): string {
    // Erro tem prioridade
    if (step.state === 'error') {
      return this.errorColor;
    }
    
    // Warning
    if (step.state === 'warning') {
      return this.warningColor;
    }
    
    // Step ativo
    if (index === this.currentStepIndex) {
      return this.activeColor;
    }
    
    // Step completado
    if (this.isStepCompleted(index)) {
      return this.completedColor;
    }
    
    // Inativo (padrão)
    return this.inactiveColor;
  }

  updateVisibleSteps() {
    this.visibleSteps = this.steps.filter(step => {
      if (step.condition) {
        return step.condition();
      }
      return true;
    });
  }

  getVisibleStepIndex(index: number): number {
    return index;
  }

  isStepCompleted(index: number): boolean {
    const step = this.visibleSteps[index];
    return step?.completed || step?.state === 'completed' || index < this.currentStepIndex;
  }

  isStepClickable(index: number): boolean {
    if (!this.editable) return false;
    
    const step = this.visibleSteps[index];
    if (step?.state === 'disabled') return false;
    
    if (this.linear) {
      // Em modo linear, só pode clicar em steps anteriores ou próximo
      return index <= this.currentStepIndex;
    }
    
    return true;
  }

  canGoBack(): boolean {
    return this.currentStepIndex > 0;
  }

  async canGoNext(): Promise<boolean> {
    const currentStep = this.visibleSteps[this.currentStepIndex];
    
    if (currentStep?.state === 'disabled') return false;
    
    if (currentStep?.validator) {
      try {
        const isValid = await currentStep.validator();
        this.stepValidation.emit({ index: this.currentStepIndex, valid: isValid });
        return isValid;
      } catch (error) {
        return false;
      }
    }
    
    return true;
  }
  
  async canGoNextSync(): Promise<boolean> {
    return await this.canGoNext();
  }

  canComplete(): boolean {
    // Verifica se todos os steps obrigatórios foram completados
    return this.visibleSteps.every((step, index) => {
      if (step.optional) return true;
      return this.isStepCompleted(index) || index === this.currentStepIndex;
    });
  }

  isLastStep(): boolean {
    return this.currentStepIndex === this.visibleSteps.length - 1;
  }

  async onStepHeaderClick(index: number) {
    if (!this.isStepClickable(index)) return;
    
    await this.goToStep(index);
  }

  async next() {
    if (await this.canGoNext()) {
      this.animationDirection = 'forward';
      
      const previousIndex = this.currentStepIndex;
      
      // Marca step atual como completado
      const currentStep = this.visibleSteps[this.currentStepIndex];
      if (currentStep) {
        currentStep.completed = true;
        currentStep.state = 'completed';
      }
      
      this.currentStepIndex++;
      
      this.emitStepChange(previousIndex);
      this.saveStateToStorage();
    }
  }

  previous() {
    if (this.canGoBack()) {
      this.animationDirection = 'backward';
      
      const previousIndex = this.currentStepIndex;
      this.currentStepIndex--;
      
      // Atualizar estado do step anterior (remover completed se editable)
      const previousStep = this.visibleSteps[previousIndex];
      if (previousStep && previousStep.editable !== false) {
        previousStep.completed = false;
        if (previousStep.state === 'completed') {
          previousStep.state = 'inactive';
        }
      }
      
      this.emitStepChange(previousIndex);
      this.saveStateToStorage();
    }
  }

  async goToStep(index: number) {
    if (index < 0 || index >= this.visibleSteps.length) return;
    if (index === this.currentStepIndex) return;
    
    this.animationDirection = index > this.currentStepIndex ? 'forward' : 'backward';
    
    const previousIndex = this.currentStepIndex;
    this.currentStepIndex = index;
    
    this.emitStepChange(previousIndex);
    this.saveStateToStorage();
  }

  async complete() {
    if (!this.canComplete()) return;
    
    // Marca último step como completado
    const currentStep = this.visibleSteps[this.currentStepIndex];
    if (currentStep) {
      currentStep.completed = true;
      currentStep.state = 'completed';
    }
    
    this.completed.emit();
  }

  reset() {
    this.currentStepIndex = 0;
    this.visibleSteps.forEach(step => {
      step.completed = false;
      if (step.state === 'completed') {
        step.state = 'inactive';
      }
    });
    
    if (this.saveState) {
      this.clearState();
    }
  }

  private emitStepChange(previousIndex: number) {
    const currentStep = this.visibleSteps[this.currentStepIndex];
    
    this.stepChange.emit({
      previousIndex,
      currentIndex: this.currentStepIndex,
      step: currentStep
    });
  }

  private saveStateToStorage() {
    if (!this.saveState || typeof localStorage === 'undefined') return;
    
    const state = {
      currentStepIndex: this.currentStepIndex,
      completedSteps: this.visibleSteps.map(step => step.completed || false)
    };
    
    localStorage.setItem(this.stateKey, JSON.stringify(state));
  }

  private loadState() {
    if (typeof localStorage === 'undefined') return;
    
    const saved = localStorage.getItem(this.stateKey);
    if (!saved) return;
    
    try {
      const state = JSON.parse(saved);
      this.currentStepIndex = state.currentStepIndex || 0;
      
      if (state.completedSteps && Array.isArray(state.completedSteps)) {
        this.visibleSteps.forEach((step, index) => {
          step.completed = state.completedSteps[index] || false;
          if (step.completed) {
            step.state = 'completed';
          }
        });
      }
    } catch (e) {
      console.error('Error loading stepper state:', e);
    }
  }

  private clearState() {
    if (typeof localStorage === 'undefined') return;
    localStorage.removeItem(this.stateKey);
  }
}