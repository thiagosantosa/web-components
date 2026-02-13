import {
  Component,
  Input,
  HostBinding
} from '@angular/core';
import { CommonModule } from '@angular/common';

export type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type SpinnerVariant =
  // Original variants (6)
  | 'circular' | 'dots' | 'bars' | 'pulse' | 'bounce' | 'ring'
  // New creative variants (25+)
  | 'infinity' | 'orbit' | 'wave' | 'grid' | 'square-spin' | 'triangle'
  | 'hexagon' | 'diamond' | 'flower' | 'spiral' | 'clock' | 'hourglass'
  | 'heartbeat' | 'audio' | 'equalizer' | 'radar' | 'ripple' | 'spinner-dots'
  | 'dual-ring' | 'box' | 'plane' | 'cube' | 'flip' | 'swing' | 'rotate-square'
  | 'chasing-dots' | 'growing-circle' | 'folding' | 'stretching' | 'bouncing-ball';
export type SpinnerSpeed = 'slow' | 'normal' | 'fast';

/**
 * # Progress Spinner Component
 *
 * Um componente de loading/spinner moderno e completo com múltiplas variantes,
 * cores customizáveis e animações suaves.
 *
 * ## 🎯 Recursos Principais
 *
 * - **31 Variantes**: circular, dots, bars, pulse, bounce, ring, infinity, orbit, wave, grid, square-spin, triangle, hexagon, diamond, flower, spiral, clock, hourglass, heartbeat, audio, equalizer, radar, ripple, spinner-dots, dual-ring, box, plane, cube, flip, swing, rotate-square, chasing-dots, growing-circle, folding, stretching, bouncing-ball
 * - **6 Tamanhos**: xs (16px) até 2xl (96px) + custom
 * - **3 Velocidades**: slow, normal, fast
 * - **Cores Customizáveis**: cor primária e secundária
 * - **Overlay**: Modo fullscreen com backdrop
 * - **Texto/Label**: Mensagem de loading
 * - **TypeScript**: Totalmente tipado
 *
 * ## 📦 Como Usar
 *
 * ### Importação
 * ```typescript
 * import { ProgressSpinnerComponent } from '@thiagosantosa/web-components';
 *
 * @Component({
 *   selector: 'app-my-component',
 *   standalone: true,
 *   imports: [ProgressSpinnerComponent],
 *   template: `
 *     <web-progress-spinner></web-progress-spinner>
 *   `
 * })
 * export class MyComponent {}
 * ```
 *
 * ### Spinner Básico
 * ```html
 * <web-progress-spinner></web-progress-spinner>
 * ```
 *
 * ### Com Tamanho
 * ```html
 * <web-progress-spinner size="lg"></web-progress-spinner>
 * <web-progress-spinner [size]="64"></web-progress-spinner>
 * ```
 *
 * ### Com Cor
 * ```html
 * <web-progress-spinner color="#ef4444"></web-progress-spinner>
 * ```
 *
 * ### Diferentes Variantes (31 opções!)
 * ```html
 * <!-- Clássicas -->
 * <web-progress-spinner variant="circular"></web-progress-spinner>
 * <web-progress-spinner variant="dots"></web-progress-spinner>
 * <web-progress-spinner variant="bars"></web-progress-spinner>
 * <web-progress-spinner variant="pulse"></web-progress-spinner>
 * <web-progress-spinner variant="bounce"></web-progress-spinner>
 * <web-progress-spinner variant="ring"></web-progress-spinner>
 *
 * <!-- Formas Geométricas -->
 * <web-progress-spinner variant="infinity"></web-progress-spinner>
 * <web-progress-spinner variant="square-spin"></web-progress-spinner>
 * <web-progress-spinner variant="triangle"></web-progress-spinner>
 * <web-progress-spinner variant="hexagon"></web-progress-spinner>
 * <web-progress-spinner variant="diamond"></web-progress-spinner>
 *
 * <!-- Animações Criativas -->
 * <web-progress-spinner variant="orbit"></web-progress-spinner>
 * <web-progress-spinner variant="flower"></web-progress-spinner>
 * <web-progress-spinner variant="spiral"></web-progress-spinner>
 * <web-progress-spinner variant="clock"></web-progress-spinner>
 * <web-progress-spinner variant="hourglass"></web-progress-spinner>
 * <web-progress-spinner variant="heartbeat"></web-progress-spinner>
 *
 * <!-- Música e Audio -->
 * <web-progress-spinner variant="audio"></web-progress-spinner>
 * <web-progress-spinner variant="equalizer"></web-progress-spinner>
 *
 * <!-- Efeitos Especiais -->
 * <web-progress-spinner variant="radar"></web-progress-spinner>
 * <web-progress-spinner variant="ripple"></web-progress-spinner>
 * <web-progress-spinner variant="wave"></web-progress-spinner>
 * <web-progress-spinner variant="grid"></web-progress-spinner>
 *
 * <!-- Avançadas -->
 * <web-progress-spinner variant="spinner-dots"></web-progress-spinner>
 * <web-progress-spinner variant="dual-ring"></web-progress-spinner>
 * <web-progress-spinner variant="chasing-dots"></web-progress-spinner>
 * <web-progress-spinner variant="bouncing-ball"></web-progress-spinner>
 *
 * E muitas mais!
 * ```
 *
 * ### Com Label
 * ```html
 * <web-progress-spinner
 *   label="Carregando..."
 *   labelPosition="bottom">
 * </web-progress-spinner>
 * ```
 *
 * ### Modo Overlay (Fullscreen)
 * ```html
 * <web-progress-spinner
 *   [overlay]="true"
 *   label="Processando dados...">
 * </web-progress-spinner>
 * ```
 *
 * ### Com Progresso Determinado
 * ```html
 * <web-progress-spinner
 *   variant="circular"
 *   [determinate]="true"
 *   [value]="75"
 *   label="75%">
 * </web-progress-spinner>
 * ```
 *
 * ### Velocidade Customizada
 * ```html
 * <web-progress-spinner speed="fast"></web-progress-spinner>
 * <web-progress-spinner speed="slow"></web-progress-spinner>
 * ```
 *
 * ### Em Serviços (Loading Global)
 * ```typescript
 * @Injectable({ providedIn: 'root' })
 * export class LoadingService {
 *   private loadingSubject = new BehaviorSubject<boolean>(false);
 *   loading$ = this.loadingSubject.asObservable();
 *
 *   show() { this.loadingSubject.next(true); }
 *   hide() { this.loadingSubject.next(false); }
 * }
 *
 * // No componente
 * @Component({
 *   template: `
 *     <web-progress-spinner
 *       *ngIf="loadingService.loading$ | async"
 *       [overlay]="true"
 *       label="Carregando...">
 *     </web-progress-spinner>
 *   `
 * })
 * export class AppComponent {
 *   constructor(public loadingService: LoadingService) {}
 * }
 * ```
 *
 * ### Em Botões
 * ```html
 * <button [disabled]="loading">
 *   <web-progress-spinner
 *     *ngIf="loading"
 *     size="sm"
 *     color="white">
 *   </web-progress-spinner>
 *   <span *ngIf="!loading">Salvar</span>
 * </button>
 * ```
 *
 * ### Com HTTP Interceptor
 * ```typescript
 * @Injectable()
 * export class LoadingInterceptor implements HttpInterceptor {
 *   constructor(private loadingService: LoadingService) {}
 *
 *   intercept(req: HttpRequest<any>, next: HttpHandler) {
 *     this.loadingService.show();
 *     return next.handle(req).pipe(
 *       finalize(() => this.loadingService.hide())
 *     );
 *   }
 * }
 * ```
 *
 * ## 📋 Props
 *
 * | Prop | Tipo | Default | Descrição |
 * |------|------|---------|-----------|
 * | variant | SpinnerVariant | 'circular' | Tipo de animação |
 * | size | SpinnerSize \| number | 'md' | Tamanho |
 * | speed | SpinnerSpeed | 'normal' | Velocidade |
 * | color | string | '#007bff' | Cor principal |
 * | secondaryColor | string | '#e5e7eb' | Cor secundária |
 * | thickness | number | 4 | Espessura (circular/ring) |
 * | overlay | boolean | false | Modo fullscreen |
 * | backdropColor | string | 'rgba(0,0,0,0.5)' | Cor do backdrop |
 * | label | string | '' | Texto de loading |
 * | labelPosition | 'top'\|'bottom'\|'left'\|'right' | 'bottom' | Posição do label |
 * | determinate | boolean | false | Progresso determinado |
 * | value | number | 0 | Valor do progresso (0-100) |
 *
 * ## 🎨 Variantes Disponíveis
 *
 * - **circular**: Spinner circular clássico (padrão)
 * - **dots**: Três pontos pulsantes
 * - **bars**: Barras verticais animadas
 * - **pulse**: Círculo pulsante
 * - **bounce**: Esferas quicando
 * - **ring**: Anel duplo rotativo
 *
 * @example
 * // Exemplo básico
 * <web-progress-spinner></web-progress-spinner>
 *
 * @example
 * // Com customização completa
 * <web-progress-spinner
 *   variant="dots"
 *   size="lg"
 *   color="#22c55e"
 *   speed="fast"
 *   label="Salvando..."
 *   labelPosition="bottom">
 * </web-progress-spinner>
 */
@Component({
  selector: 'web-progress-spinner',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Overlay backdrop -->
    <div *ngIf="overlay"
         class="spinner-overlay"
         [style.background]="backdropColor">
      <div class="spinner-overlay-content">
        <ng-container *ngTemplateOutlet="spinnerTemplate"></ng-container>
      </div>
    </div>

    <!-- Inline spinner -->
    <ng-container *ngIf="!overlay">
      <ng-container *ngTemplateOutlet="spinnerTemplate"></ng-container>
    </ng-container>

    <!-- Spinner Template -->
    <ng-template #spinnerTemplate>
      <div class="spinner-container"
           [class]="'spinner-label-' + labelPosition">

        <!-- Label (top/left) -->
        <span *ngIf="label && (labelPosition === 'top' || labelPosition === 'left')"
              class="spinner-label"
              [style.color]="overlay ? '#ffffff' : labelColor">
          {{ label }}
        </span>

        <!-- Spinner wrapper -->
        <div class="spinner-wrapper"
             [style.width]="getSize()"
             [style.height]="getSize()">

          <!-- Circular -->
          <svg *ngIf="variant === 'circular'"
               class="spinner-circular"
               [class]="'spinner-speed-' + speed"
               [attr.viewBox]="getViewBox()"
               [style.width]="getSize()"
               [style.height]="getSize()">
            <circle *ngIf="!determinate"
                    class="spinner-circle-bg"
                    [attr.cx]="getCenter()"
                    [attr.cy]="getCenter()"
                    [attr.r]="getRadius()"
                    [attr.stroke-width]="thickness"
                    [attr.stroke]="secondaryColor"
                    fill="none" />
            <circle class="spinner-circle"
                    [class.spinner-circle-determinate]="determinate"
                    [attr.cx]="getCenter()"
                    [attr.cy]="getCenter()"
                    [attr.r]="getRadius()"
                    [attr.stroke-width]="thickness"
                    [attr.stroke]="color"
                    [attr.stroke-dasharray]="getCircumference()"
                    [attr.stroke-dashoffset]="getDashOffset()"
                    fill="none" />
          </svg>

          <!-- Dots -->
          <div *ngIf="variant === 'dots'"
               class="spinner-dots"
               [class]="'spinner-speed-' + speed">
            <div class="spinner-dot" [style.background]="color"></div>
            <div class="spinner-dot" [style.background]="color"></div>
            <div class="spinner-dot" [style.background]="color"></div>
          </div>

          <!-- Bars -->
          <div *ngIf="variant === 'bars'"
               class="spinner-bars"
               [class]="'spinner-speed-' + speed">
            <div class="spinner-bar" [style.background]="color"></div>
            <div class="spinner-bar" [style.background]="color"></div>
            <div class="spinner-bar" [style.background]="color"></div>
          </div>

          <!-- Pulse -->
          <div *ngIf="variant === 'pulse'"
               class="spinner-pulse"
               [class]="'spinner-speed-' + speed"
               [style.background]="color">
          </div>

          <!-- Bounce -->
          <div *ngIf="variant === 'bounce'"
               class="spinner-bounce"
               [class]="'spinner-speed-' + speed">
            <div class="spinner-bounce-ball" [style.background]="color"></div>
            <div class="spinner-bounce-ball" [style.background]="color"></div>
          </div>

          <!-- Ring -->
          <div *ngIf="variant === 'ring'"
               class="spinner-ring"
               [class]="'spinner-speed-' + speed">
            <div [style.borderColor]="color + ' transparent transparent transparent'"></div>
            <div [style.borderColor]="color + ' transparent transparent transparent'"></div>
            <div [style.borderColor]="color + ' transparent transparent transparent'"></div>
            <div [style.borderColor]="color + ' transparent transparent transparent'"></div>
          </div>

          <!-- Infinity -->
          <div *ngIf="variant === 'infinity'"
               class="spinner-infinity"
               [class]="'spinner-speed-' + speed"
               [style.borderColor]="color">
          </div>

          <!-- Orbit -->
          <div *ngIf="variant === 'orbit'"
               class="spinner-orbit"
               [class]="'spinner-speed-' + speed">
            <div class="orbit-center" [style.background]="color"></div>
            <div class="orbit-ball" [style.background]="color"></div>
          </div>

          <!-- Wave -->
          <div *ngIf="variant === 'wave'"
               class="spinner-wave"
               [class]="'spinner-speed-' + speed">
            <div [style.background]="color"></div>
            <div [style.background]="color"></div>
            <div [style.background]="color"></div>
            <div [style.background]="color"></div>
            <div [style.background]="color"></div>
          </div>

          <!-- Grid -->
          <div *ngIf="variant === 'grid'"
               class="spinner-grid"
               [class]="'spinner-speed-' + speed">
            <div [style.background]="color"></div>
            <div [style.background]="color"></div>
            <div [style.background]="color"></div>
            <div [style.background]="color"></div>
            <div [style.background]="color"></div>
            <div [style.background]="color"></div>
            <div [style.background]="color"></div>
            <div [style.background]="color"></div>
            <div [style.background]="color"></div>
          </div>

          <!-- Square Spin -->
          <div *ngIf="variant === 'square-spin'"
               class="spinner-square-spin"
               [class]="'spinner-speed-' + speed"
               [style.borderColor]="color">
          </div>

          <!-- Triangle -->
          <div *ngIf="variant === 'triangle'"
               class="spinner-triangle"
               [class]="'spinner-speed-' + speed"
               [style.borderBottomColor]="color">
          </div>

          <!-- Hexagon -->
          <div *ngIf="variant === 'hexagon'"
               class="spinner-hexagon"
               [class]="'spinner-speed-' + speed"
               [style.borderColor]="color">
          </div>

          <!-- Diamond -->
          <div *ngIf="variant === 'diamond'"
               class="spinner-diamond"
               [class]="'spinner-speed-' + speed">
            <div [style.background]="color"></div>
            <div [style.background]="color"></div>
          </div>

          <!-- Flower -->
          <div *ngIf="variant === 'flower'"
               class="spinner-flower"
               [class]="'spinner-speed-' + speed">
            <div [style.background]="color"></div>
            <div [style.background]="color"></div>
            <div [style.background]="color"></div>
            <div [style.background]="color"></div>
            <div [style.background]="color"></div>
            <div [style.background]="color"></div>
          </div>

          <!-- Spiral -->
          <div *ngIf="variant === 'spiral'"
               class="spinner-spiral"
               [class]="'spinner-speed-' + speed"
               [style.borderColor]="color + ' transparent'">
          </div>

          <!-- Clock -->
          <div *ngIf="variant === 'clock'"
               class="spinner-clock"
               [class]="'spinner-speed-' + speed">
            <div class="clock-hand" [style.background]="color"></div>
          </div>

          <!-- Hourglass -->
          <div *ngIf="variant === 'hourglass'"
               class="spinner-hourglass"
               [class]="'spinner-speed-' + speed"
               [style.borderColor]="color">
          </div>

          <!-- Heartbeat -->
          <div *ngIf="variant === 'heartbeat'"
               class="spinner-heartbeat"
               [class]="'spinner-speed-' + speed"
               [style.background]="color">
          </div>

          <!-- Audio -->
          <div *ngIf="variant === 'audio'"
               class="spinner-audio"
               [class]="'spinner-speed-' + speed">
            <div [style.background]="color"></div>
            <div [style.background]="color"></div>
            <div [style.background]="color"></div>
            <div [style.background]="color"></div>
          </div>

          <!-- Equalizer -->
          <div *ngIf="variant === 'equalizer'"
               class="spinner-equalizer"
               [class]="'spinner-speed-' + speed">
            <div [style.background]="color"></div>
            <div [style.background]="color"></div>
            <div [style.background]="color"></div>
            <div [style.background]="color"></div>
            <div [style.background]="color"></div>
          </div>

          <!-- Radar -->
          <div *ngIf="variant === 'radar'"
               class="spinner-radar"
               [class]="'spinner-speed-' + speed">
            <div [style.borderColor]="color"></div>
            <div class="radar-line" [style.background]="color"></div>
          </div>

          <!-- Ripple -->
          <div *ngIf="variant === 'ripple'"
               class="spinner-ripple"
               [class]="'spinner-speed-' + speed">
            <div [style.borderColor]="color"></div>
            <div [style.borderColor]="color"></div>
          </div>

          <!-- Spinner Dots -->
          <div *ngIf="variant === 'spinner-dots'"
               class="spinner-spinner-dots"
               [class]="'spinner-speed-' + speed">
            <div [style.background]="color"></div>
            <div [style.background]="color"></div>
            <div [style.background]="color"></div>
            <div [style.background]="color"></div>
            <div [style.background]="color"></div>
            <div [style.background]="color"></div>
            <div [style.background]="color"></div>
            <div [style.background]="color"></div>
          </div>

          <!-- Dual Ring -->
          <div *ngIf="variant === 'dual-ring'"
               class="spinner-dual-ring"
               [class]="'spinner-speed-' + speed">
            <div [style.borderColor]="color + ' transparent ' + color + ' transparent'"></div>
          </div>

          <!-- Box -->
          <div *ngIf="variant === 'box'"
               class="spinner-box"
               [class]="'spinner-speed-' + speed"
               [style.borderColor]="color">
          </div>

          <!-- Plane -->
          <div *ngIf="variant === 'plane'"
               class="spinner-plane"
               [class]="'spinner-speed-' + speed"
               [style.borderColor]="color + ' transparent'">
          </div>

          <!-- Cube -->
          <div *ngIf="variant === 'cube'"
               class="spinner-cube"
               [class]="'spinner-speed-' + speed">
            <div [style.background]="color"></div>
            <div [style.background]="color"></div>
          </div>

          <!-- Flip -->
          <div *ngIf="variant === 'flip'"
               class="spinner-flip"
               [class]="'spinner-speed-' + speed"
               [style.background]="color">
          </div>

          <!-- Swing -->
          <div *ngIf="variant === 'swing'"
               class="spinner-swing"
               [class]="'spinner-speed-' + speed">
            <div [style.background]="color"></div>
            <div [style.background]="color"></div>
          </div>

          <!-- Rotate Square -->
          <div *ngIf="variant === 'rotate-square'"
               class="spinner-rotate-square"
               [class]="'spinner-speed-' + speed">
            <div [style.background]="color"></div>
          </div>

          <!-- Chasing Dots -->
          <div *ngIf="variant === 'chasing-dots'"
               class="spinner-chasing-dots"
               [class]="'spinner-speed-' + speed">
            <div [style.background]="color"></div>
            <div [style.background]="color"></div>
          </div>

          <!-- Growing Circle -->
          <div *ngIf="variant === 'growing-circle'"
               class="spinner-growing-circle"
               [class]="'spinner-speed-' + speed"
               [style.background]="color">
          </div>

          <!-- Folding -->
          <div *ngIf="variant === 'folding'"
               class="spinner-folding"
               [class]="'spinner-speed-' + speed">
            <div [style.background]="color"></div>
            <div [style.background]="color"></div>
            <div [style.background]="color"></div>
            <div [style.background]="color"></div>
          </div>

          <!-- Stretching -->
          <div *ngIf="variant === 'stretching'"
               class="spinner-stretching"
               [class]="'spinner-speed-' + speed">
            <div [style.background]="color"></div>
          </div>

          <!-- Bouncing Ball -->
          <div *ngIf="variant === 'bouncing-ball'"
               class="spinner-bouncing-ball"
               [class]="'spinner-speed-' + speed">
            <div [style.background]="color"></div>
            <div class="shadow"></div>
          </div>
        </div>

        <!-- Label (bottom/right) -->
        <span *ngIf="label && (labelPosition === 'bottom' || labelPosition === 'right')"
              class="spinner-label"
              [style.color]="overlay ? '#ffffff' : labelColor">
          {{ label }}
        </span>
      </div>
    </ng-template>
  `,
  styles: [`
    :host {
      display: inline-block;
    }

    /* Overlay */
    .spinner-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
    }

    .spinner-overlay-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
    }

    /* Container */
    .spinner-container {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .spinner-label-top,
    .spinner-label-bottom {
      flex-direction: column;
    }

    .spinner-label-left {
      flex-direction: row;
    }

    .spinner-label-right {
      flex-direction: row-reverse;
    }

    .spinner-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .spinner-label {
      font-size: 14px;
      font-weight: 500;
      color: #666;
    }

    /* Circular */
    .spinner-circular {
      transform-origin: center;
    }

    .spinner-circle {
      transform-origin: center;
      animation: rotate 2s linear infinite;
      stroke-linecap: round;
    }

    .spinner-circle-determinate {
      animation: none;
      transition: stroke-dashoffset 0.3s ease;
      transform: rotate(-90deg);
      transform-origin: center;
    }

    .spinner-circle-bg {
      opacity: 0.3;
    }

    @keyframes rotate {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    /* Speed variations */
    .spinner-speed-slow .spinner-circle { animation-duration: 3s; }
    .spinner-speed-normal .spinner-circle { animation-duration: 2s; }
    .spinner-speed-fast .spinner-circle { animation-duration: 1s; }

    /* Dots */
    .spinner-dots {
      display: flex;
      gap: 8px;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
    }

    .spinner-dot {
      width: 20%;
      max-width: 12px;
      height: 20%;
      max-height: 12px;
      min-width: 4px;
      min-height: 4px;
      border-radius: 50%;
      animation: dot-pulse 1.4s ease-in-out infinite;
    }

    .spinner-dot:nth-child(1) { animation-delay: -0.32s; }
    .spinner-dot:nth-child(2) { animation-delay: -0.16s; }

    @keyframes dot-pulse {
      0%, 80%, 100% { transform: scale(0); opacity: 0.5; }
      40% { transform: scale(1); opacity: 1; }
    }

    .spinner-speed-slow .spinner-dot { animation-duration: 2s; }
    .spinner-speed-fast .spinner-dot { animation-duration: 1s; }

    /* Bars */
    .spinner-bars {
      display: flex;
      gap: 4px;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
    }

    .spinner-bar {
      width: 15%;
      max-width: 6px;
      min-width: 3px;
      height: 100%;
      border-radius: 2px;
      animation: bar-scale 1.2s ease-in-out infinite;
    }

    .spinner-bar:nth-child(1) { animation-delay: -0.24s; }
    .spinner-bar:nth-child(2) { animation-delay: -0.12s; }

    @keyframes bar-scale {
      0%, 40%, 100% { transform: scaleY(0.4); }
      20% { transform: scaleY(1); }
    }

    .spinner-speed-slow .spinner-bar { animation-duration: 1.8s; }
    .spinner-speed-fast .spinner-bar { animation-duration: 0.8s; }

    /* Pulse */
    .spinner-pulse {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      animation: pulse-scale 1.5s ease-in-out infinite;
    }

    @keyframes pulse-scale {
      0%, 100% { transform: scale(0); opacity: 0.5; }
      50% { transform: scale(1); opacity: 1; }
    }

    .spinner-speed-slow .spinner-pulse { animation-duration: 2.5s; }
    .spinner-speed-fast .spinner-pulse { animation-duration: 1s; }

    /* Bounce */
    .spinner-bounce {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
    }

    .spinner-bounce-ball {
      width: 25%;
      max-width: 15px;
      height: 25%;
      max-height: 15px;
      min-width: 6px;
      min-height: 6px;
      border-radius: 50%;
      animation: bounce 1.4s ease-in-out infinite;
    }

    .spinner-bounce-ball:nth-child(1) { animation-delay: -0.32s; }
    .spinner-bounce-ball:nth-child(2) { animation-delay: -0.16s; }

    @keyframes bounce {
      0%, 80%, 100% { transform: scale(0); }
      40% { transform: scale(1); }
    }

    .spinner-speed-slow .spinner-bounce-ball { animation-duration: 2s; }
    .spinner-speed-fast .spinner-bounce-ball { animation-duration: 1s; }

    /* Ring */
    .spinner-ring {
      position: relative;
      width: 100%;
      height: 100%;
    }

    .spinner-ring div {
      position: absolute;
      width: 100%;
      height: 100%;
      border: 4px solid;
      border-radius: 50%;
      animation: ring-rotate 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    }

    .spinner-ring div:nth-child(1) { animation-delay: -0.45s; }
    .spinner-ring div:nth-child(2) { animation-delay: -0.3s; }
    .spinner-ring div:nth-child(3) { animation-delay: -0.15s; }

    @keyframes ring-rotate {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .spinner-speed-slow .spinner-ring div { animation-duration: 2s; }
    .spinner-speed-fast .spinner-ring div { animation-duration: 0.8s; }

    /* Infinity */
    .spinner-infinity {
      width: 100%;
      height: 50%;
      position: relative;
      animation: infinity-rotate 2s linear infinite;
    }

    .spinner-infinity::before,
    .spinner-infinity::after {
      content: '';
      position: absolute;
      width: 50%;
      height: 100%;
      border: 3px solid;
      border-radius: 50%;
    }

    .spinner-infinity::before {
      left: 0;
      border-right: none;
    }

    .spinner-infinity::after {
      right: 0;
      border-left: none;
    }

    @keyframes infinity-rotate {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .spinner-speed-slow .spinner-infinity { animation-duration: 3s; }
    .spinner-speed-fast .spinner-infinity { animation-duration: 1.2s; }

    /* Orbit */
    .spinner-orbit {
      width: 100%;
      height: 100%;
      position: relative;
      animation: orbit-rotate 1.5s linear infinite;
    }

    .orbit-center {
      position: absolute;
      width: 20%;
      height: 20%;
      border-radius: 50%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    .orbit-ball {
      position: absolute;
      width: 30%;
      height: 30%;
      border-radius: 50%;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
    }

    @keyframes orbit-rotate {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .spinner-speed-slow .spinner-orbit { animation-duration: 2.5s; }
    .spinner-speed-fast .spinner-orbit { animation-duration: 1s; }

    /* Wave */
    .spinner-wave {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      width: 100%;
      height: 100%;
      gap: 4px;
    }

    .spinner-wave div {
      width: 15%;
      height: 100%;
      border-radius: 2px;
      animation: wave 1.2s ease-in-out infinite;
    }

    .spinner-wave div:nth-child(1) { animation-delay: -0.4s; }
    .spinner-wave div:nth-child(2) { animation-delay: -0.3s; }
    .spinner-wave div:nth-child(3) { animation-delay: -0.2s; }
    .spinner-wave div:nth-child(4) { animation-delay: -0.1s; }

    @keyframes wave {
      0%, 100% { transform: scaleY(0.3); }
      50% { transform: scaleY(1); }
    }

    .spinner-speed-slow .spinner-wave div { animation-duration: 2s; }
    .spinner-speed-fast .spinner-wave div { animation-duration: 0.8s; }

    /* Grid */
    .spinner-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 8%;
      width: 100%;
      height: 100%;
    }

    .spinner-grid div {
      border-radius: 2px;
      animation: grid-fade 1.3s ease-in-out infinite;
    }

    .spinner-grid div:nth-child(1) { animation-delay: 0s; }
    .spinner-grid div:nth-child(2) { animation-delay: 0.1s; }
    .spinner-grid div:nth-child(3) { animation-delay: 0.2s; }
    .spinner-grid div:nth-child(4) { animation-delay: 0.3s; }
    .spinner-grid div:nth-child(5) { animation-delay: 0.4s; }
    .spinner-grid div:nth-child(6) { animation-delay: 0.5s; }
    .spinner-grid div:nth-child(7) { animation-delay: 0.6s; }
    .spinner-grid div:nth-child(8) { animation-delay: 0.7s; }
    .spinner-grid div:nth-child(9) { animation-delay: 0.8s; }

    @keyframes grid-fade {
      0%, 100% { opacity: 0.3; transform: scale(0.8); }
      50% { opacity: 1; transform: scale(1); }
    }

    /* Square Spin */
    .spinner-square-spin {
      width: 100%;
      height: 100%;
      border: 4px solid;
      border-radius: 4px;
      animation: square-spin 1.2s ease-in-out infinite;
    }

    @keyframes square-spin {
      0% { transform: rotate(0deg) scale(1); }
      50% { transform: rotate(180deg) scale(0.8); }
      100% { transform: rotate(360deg) scale(1); }
    }

    .spinner-speed-slow .spinner-square-spin { animation-duration: 2s; }
    .spinner-speed-fast .spinner-square-spin { animation-duration: 0.8s; }

    /* Triangle */
    .spinner-triangle {
      width: 0;
      height: 0;
      border-left: 50% solid transparent;
      border-right: 50% solid transparent;
      border-bottom: 86.6% solid;
      animation: triangle-rotate 1.5s linear infinite;
    }

    @keyframes triangle-rotate {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .spinner-speed-slow .spinner-triangle { animation-duration: 2.5s; }
    .spinner-speed-fast .spinner-triangle { animation-duration: 1s; }

    /* Hexagon */
    .spinner-hexagon {
      width: 70%;
      height: 80%;
      border: 4px solid;
      clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
      animation: hexagon-rotate 1.8s linear infinite;
    }

    @keyframes hexagon-rotate {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .spinner-speed-slow .spinner-hexagon { animation-duration: 3s; }
    .spinner-speed-fast .spinner-hexagon { animation-duration: 1.2s; }

    /* Diamond */
    .spinner-diamond {
      width: 100%;
      height: 100%;
      position: relative;
    }

    .spinner-diamond div {
      position: absolute;
      width: 50%;
      height: 50%;
      top: 25%;
      left: 25%;
      transform: rotate(45deg);
      animation: diamond-rotate 1.5s ease-in-out infinite;
    }

    .spinner-diamond div:nth-child(2) {
      animation-delay: -0.75s;
    }

    @keyframes diamond-rotate {
      0%, 100% { transform: rotate(45deg) scale(0.5); opacity: 0.5; }
      50% { transform: rotate(225deg) scale(1); opacity: 1; }
    }

    .spinner-speed-slow .spinner-diamond div { animation-duration: 2.5s; }
    .spinner-speed-fast .spinner-diamond div { animation-duration: 1s; }

    /* Flower */
    .spinner-flower {
      width: 100%;
      height: 100%;
      position: relative;
    }

    .spinner-flower div {
      position: absolute;
      width: 30%;
      height: 30%;
      border-radius: 50%;
      top: 35%;
      left: 35%;
      animation: flower-bloom 1.5s ease-in-out infinite;
    }

    .spinner-flower div:nth-child(1) { transform: translate(0, -150%); animation-delay: 0s; }
    .spinner-flower div:nth-child(2) { transform: translate(106%, -106%); animation-delay: 0.1s; }
    .spinner-flower div:nth-child(3) { transform: translate(150%, 0); animation-delay: 0.2s; }
    .spinner-flower div:nth-child(4) { transform: translate(106%, 106%); animation-delay: 0.3s; }
    .spinner-flower div:nth-child(5) { transform: translate(0, 150%); animation-delay: 0.4s; }
    .spinner-flower div:nth-child(6) { transform: translate(-106%, -106%); animation-delay: 0.5s; }

    @keyframes flower-bloom {
      0%, 100% { opacity: 0.3; transform: scale(0.8); }
      50% { opacity: 1; transform: scale(1.2); }
    }

    /* Spiral */
    .spinner-spiral {
      width: 100%;
      height: 100%;
      border: 4px solid;
      border-radius: 50%;
      animation: spiral-rotate 1.5s linear infinite;
    }

    @keyframes spiral-rotate {
      0% { transform: rotate(0deg) scale(1); }
      50% { transform: rotate(180deg) scale(0.8); }
      100% { transform: rotate(360deg) scale(1); }
    }

    .spinner-speed-slow .spinner-spiral { animation-duration: 2.5s; }
    .spinner-speed-fast .spinner-spiral { animation-duration: 1s; }

    /* Clock */
    .spinner-clock {
      width: 100%;
      height: 100%;
      border: 3px solid #e5e7eb;
      border-radius: 50%;
      position: relative;
    }

    .clock-hand {
      position: absolute;
      width: 3px;
      height: 40%;
      top: 10%;
      left: 50%;
      transform-origin: bottom center;
      transform: translateX(-50%);
      border-radius: 2px;
      animation: clock-tick 2s linear infinite;
    }

    @keyframes clock-tick {
      0% { transform: translateX(-50%) rotate(0deg); }
      100% { transform: translateX(-50%) rotate(360deg); }
    }

    .spinner-speed-slow .clock-hand { animation-duration: 4s; }
    .spinner-speed-fast .clock-hand { animation-duration: 1s; }

    /* Hourglass */
    .spinner-hourglass {
      width: 60%;
      height: 80%;
      border: 3px solid;
      clip-path: polygon(0% 0%, 100% 0%, 50% 50%, 100% 100%, 0% 100%, 50% 50%);
      animation: hourglass-flip 2s ease-in-out infinite;
    }

    @keyframes hourglass-flip {
      0%, 100% { transform: rotate(0deg); }
      50% { transform: rotate(180deg); }
    }

    .spinner-speed-slow .spinner-hourglass { animation-duration: 3s; }
    .spinner-speed-fast .spinner-hourglass { animation-duration: 1.2s; }

    /* Heartbeat */
    .spinner-heartbeat {
      width: 60%;
      height: 60%;
      border-radius: 50%;
      animation: heartbeat 1.3s ease-in-out infinite;
    }

    @keyframes heartbeat {
      0%, 100% { transform: scale(1); }
      25% { transform: scale(1.3); }
      40% { transform: scale(1); }
      60% { transform: scale(1.2); }
    }

    .spinner-speed-slow .spinner-heartbeat { animation-duration: 2s; }
    .spinner-speed-fast .spinner-heartbeat { animation-duration: 0.8s; }

    /* Audio */
    .spinner-audio {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      width: 100%;
      height: 100%;
      gap: 4px;
    }

    .spinner-audio div {
      width: 20%;
      border-radius: 2px;
      animation: audio-wave 1.2s ease-in-out infinite;
    }

    .spinner-audio div:nth-child(1) { animation-delay: 0s; }
    .spinner-audio div:nth-child(2) { animation-delay: 0.15s; }
    .spinner-audio div:nth-child(3) { animation-delay: 0.3s; }
    .spinner-audio div:nth-child(4) { animation-delay: 0.45s; }

    @keyframes audio-wave {
      0%, 100% { height: 30%; }
      50% { height: 100%; }
    }

    .spinner-speed-slow .spinner-audio div { animation-duration: 2s; }
    .spinner-speed-fast .spinner-audio div { animation-duration: 0.8s; }

    /* Equalizer */
    .spinner-equalizer {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      width: 100%;
      height: 100%;
      gap: 3px;
    }

    .spinner-equalizer div {
      width: 16%;
      border-radius: 2px;
      animation: equalizer-bounce 1s ease-in-out infinite;
    }

    .spinner-equalizer div:nth-child(1) { animation-delay: 0s; }
    .spinner-equalizer div:nth-child(2) { animation-delay: 0.1s; }
    .spinner-equalizer div:nth-child(3) { animation-delay: 0.2s; }
    .spinner-equalizer div:nth-child(4) { animation-delay: 0.3s; }
    .spinner-equalizer div:nth-child(5) { animation-delay: 0.4s; }

    @keyframes equalizer-bounce {
      0%, 100% { height: 20%; }
      50% { height: 100%; }
    }

    .spinner-speed-slow .spinner-equalizer div { animation-duration: 1.6s; }
    .spinner-speed-fast .spinner-equalizer div { animation-duration: 0.6s; }

    /* Radar */
    .spinner-radar {
      width: 100%;
      height: 100%;
      position: relative;
    }

    .spinner-radar > div {
      position: absolute;
      width: 100%;
      height: 100%;
      border: 3px solid;
      border-radius: 50%;
      opacity: 0.3;
    }

    .radar-line {
      position: absolute;
      width: 50%;
      height: 3px;
      top: 50%;
      left: 50%;
      transform-origin: left center;
      animation: radar-scan 2s linear infinite;
    }

    @keyframes radar-scan {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .spinner-speed-slow .radar-line { animation-duration: 3s; }
    .spinner-speed-fast .radar-line { animation-duration: 1.2s; }

    /* Ripple */
    .spinner-ripple {
      width: 100%;
      height: 100%;
      position: relative;
    }

    .spinner-ripple div {
      position: absolute;
      width: 100%;
      height: 100%;
      border: 3px solid;
      border-radius: 50%;
      animation: ripple 1.5s ease-out infinite;
    }

    .spinner-ripple div:nth-child(2) {
      animation-delay: -0.75s;
    }

    @keyframes ripple {
      0% {
        transform: scale(0);
        opacity: 1;
      }
      100% {
        transform: scale(1);
        opacity: 0;
      }
    }

    .spinner-speed-slow .spinner-ripple div { animation-duration: 2.5s; }
    .spinner-speed-fast .spinner-ripple div { animation-duration: 1s; }

    /* Spinner Dots (circular) */
    .spinner-spinner-dots {
      width: 100%;
      height: 100%;
      position: relative;
      animation: spinner-dots-rotate 2s linear infinite;
    }

    .spinner-spinner-dots div {
      position: absolute;
      width: 15%;
      height: 15%;
      border-radius: 50%;
      top: 42.5%;
      left: 42.5%;
    }

    .spinner-spinner-dots div:nth-child(1) { transform: translate(0, -200%); animation: spinner-dots-fade 1.5s infinite; animation-delay: 0s; }
    .spinner-spinner-dots div:nth-child(2) { transform: translate(141%, -141%); animation: spinner-dots-fade 1.5s infinite; animation-delay: 0.2s; }
    .spinner-spinner-dots div:nth-child(3) { transform: translate(200%, 0); animation: spinner-dots-fade 1.5s infinite; animation-delay: 0.4s; }
    .spinner-spinner-dots div:nth-child(4) { transform: translate(141%, 141%); animation: spinner-dots-fade 1.5s infinite; animation-delay: 0.6s; }
    .spinner-spinner-dots div:nth-child(5) { transform: translate(0, 200%); animation: spinner-dots-fade 1.5s infinite; animation-delay: 0.8s; }
    .spinner-spinner-dots div:nth-child(6) { transform: translate(-141%, 141%); animation: spinner-dots-fade 1.5s infinite; animation-delay: 1s; }
    .spinner-spinner-dots div:nth-child(7) { transform: translate(-200%, 0); animation: spinner-dots-fade 1.5s infinite; animation-delay: 1.2s; }
    .spinner-spinner-dots div:nth-child(8) { transform: translate(-141%, -141%); animation: spinner-dots-fade 1.5s infinite; animation-delay: 1.4s; }

    @keyframes spinner-dots-fade {
      0%, 100% { opacity: 0.3; transform: scale(0.8); }
      50% { opacity: 1; transform: scale(1); }
    }

    .spinner-speed-slow .spinner-spinner-dots { animation-duration: 3s; }
    .spinner-speed-fast .spinner-spinner-dots { animation-duration: 1.2s; }

    /* Dual Ring */
    .spinner-dual-ring {
      width: 100%;
      height: 100%;
      position: relative;
    }

    .spinner-dual-ring div {
      position: absolute;
      width: 100%;
      height: 100%;
      border: 4px solid;
      border-radius: 50%;
      animation: dual-ring-rotate 1.2s linear infinite;
    }

    @keyframes dual-ring-rotate {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .spinner-speed-slow .spinner-dual-ring div { animation-duration: 2s; }
    .spinner-speed-fast .spinner-dual-ring div { animation-duration: 0.8s; }

    /* Box */
    .spinner-box {
      width: 70%;
      height: 70%;
      border: 4px solid;
      animation: box-rotate 2s ease-in-out infinite;
    }

    @keyframes box-rotate {
      0%, 100% { transform: rotate(0deg); }
      25% { transform: rotate(90deg); }
      50% { transform: rotate(180deg); }
      75% { transform: rotate(270deg); }
    }

    .spinner-speed-slow .spinner-box { animation-duration: 3s; }
    .spinner-speed-fast .spinner-box { animation-duration: 1.2s; }

    /* Plane */
    .spinner-plane {
      width: 60%;
      height: 60%;
      border: 4px solid;
      border-radius: 4px;
      animation: plane-fly 1.5s ease-in-out infinite;
    }

    @keyframes plane-fly {
      0% { transform: translate(0, 0) rotate(0deg); }
      50% { transform: translate(100%, 0) rotate(180deg); }
      100% { transform: translate(0, 0) rotate(360deg); }
    }

    .spinner-speed-slow .spinner-plane { animation-duration: 2.5s; }
    .spinner-speed-fast .spinner-plane { animation-duration: 1s; }

    /* Cube */
    .spinner-cube {
      width: 100%;
      height: 100%;
      position: relative;
    }

    .spinner-cube div {
      position: absolute;
      width: 40%;
      height: 40%;
      animation: cube-move 1.8s ease-in-out infinite;
    }

    .spinner-cube div:nth-child(1) {
      top: 0;
      left: 0;
      animation-delay: 0s;
    }

    .spinner-cube div:nth-child(2) {
      top: 0;
      right: 0;
      animation-delay: -0.9s;
    }

    @keyframes cube-move {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(0.5); }
    }

    .spinner-speed-slow .spinner-cube div { animation-duration: 3s; }
    .spinner-speed-fast .spinner-cube div { animation-duration: 1.2s; }

    /* Flip */
    .spinner-flip {
      width: 60%;
      height: 60%;
      border-radius: 4px;
      animation: flip 1.5s ease-in-out infinite;
    }

    @keyframes flip {
      0%, 100% { transform: rotateY(0deg); }
      50% { transform: rotateY(180deg); }
    }

    .spinner-speed-slow .spinner-flip { animation-duration: 2.5s; }
    .spinner-speed-fast .spinner-flip { animation-duration: 1s; }

    /* Swing */
    .spinner-swing {
      width: 100%;
      height: 100%;
      position: relative;
    }

    .spinner-swing div {
      position: absolute;
      width: 30%;
      height: 30%;
      border-radius: 50%;
      animation: swing 1.5s ease-in-out infinite;
    }

    .spinner-swing div:nth-child(1) {
      left: 0;
      animation-delay: 0s;
    }

    .spinner-swing div:nth-child(2) {
      right: 0;
      animation-delay: -0.75s;
    }

    @keyframes swing {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(100%); }
    }

    .spinner-speed-slow .spinner-swing div { animation-duration: 2.5s; }
    .spinner-speed-fast .spinner-swing div { animation-duration: 1s; }

    /* Rotate Square */
    .spinner-rotate-square {
      width: 100%;
      height: 100%;
      position: relative;
    }

    .spinner-rotate-square div {
      position: absolute;
      width: 100%;
      height: 100%;
      animation: rotate-square 3s linear infinite;
    }

    .spinner-rotate-square div::before {
      content: '';
      position: absolute;
      width: 40%;
      height: 40%;
      top: 0;
      left: 0;
    }

    @keyframes rotate-square {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .spinner-speed-slow .spinner-rotate-square div { animation-duration: 4s; }
    .spinner-speed-fast .spinner-rotate-square div { animation-duration: 2s; }

    /* Chasing Dots */
    .spinner-chasing-dots {
      width: 100%;
      height: 100%;
      position: relative;
      animation: chasing-rotate 2s linear infinite;
    }

    .spinner-chasing-dots div {
      position: absolute;
      width: 30%;
      height: 30%;
      border-radius: 50%;
      top: 0;
      animation: chasing-bounce 2s ease-in-out infinite;
    }

    .spinner-chasing-dots div:nth-child(1) {
      left: 0;
      animation-delay: -1s;
    }

    .spinner-chasing-dots div:nth-child(2) {
      left: 0;
      animation-delay: 0s;
    }

    @keyframes chasing-rotate {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    @keyframes chasing-bounce {
      0%, 100% { transform: scale(0); }
      50% { transform: scale(1); }
    }

    .spinner-speed-slow .spinner-chasing-dots { animation-duration: 3s; }
    .spinner-speed-fast .spinner-chasing-dots { animation-duration: 1.2s; }

    /* Growing Circle */
    .spinner-growing-circle {
      width: 60%;
      height: 60%;
      border-radius: 50%;
      animation: growing-circle 1.5s ease-in-out infinite;
    }

    @keyframes growing-circle {
      0%, 100% { transform: scale(0); opacity: 0; }
      50% { transform: scale(1); opacity: 1; }
    }

    .spinner-speed-slow .spinner-growing-circle { animation-duration: 2.5s; }
    .spinner-speed-fast .spinner-growing-circle { animation-duration: 1s; }

    /* Folding */
    .spinner-folding {
      width: 100%;
      height: 100%;
      display: flex;
      gap: 4px;
    }

    .spinner-folding div {
      flex: 1;
      animation: folding 1.2s ease-in-out infinite;
    }

    .spinner-folding div:nth-child(1) { animation-delay: 0s; }
    .spinner-folding div:nth-child(2) { animation-delay: 0.15s; }
    .spinner-folding div:nth-child(3) { animation-delay: 0.3s; }
    .spinner-folding div:nth-child(4) { animation-delay: 0.45s; }

    @keyframes folding {
      0%, 100% { transform: scaleY(1); }
      50% { transform: scaleY(0.4); }
    }

    .spinner-speed-slow .spinner-folding div { animation-duration: 2s; }
    .spinner-speed-fast .spinner-folding div { animation-duration: 0.8s; }

    /* Stretching */
    .spinner-stretching {
      width: 100%;
      height: 100%;
      position: relative;
    }

    .spinner-stretching div {
      position: absolute;
      width: 100%;
      height: 20%;
      top: 40%;
      border-radius: 10px;
      animation: stretching 1.5s ease-in-out infinite;
    }

    @keyframes stretching {
      0%, 100% { transform: scaleX(0.5); }
      50% { transform: scaleX(1); }
    }

    .spinner-speed-slow .spinner-stretching div { animation-duration: 2.5s; }
    .spinner-speed-fast .spinner-stretching div { animation-duration: 1s; }

    /* Bouncing Ball */
    .spinner-bouncing-ball {
      width: 100%;
      height: 100%;
      position: relative;
    }

    .spinner-bouncing-ball > div {
      position: absolute;
      width: 30%;
      height: 30%;
      border-radius: 50%;
      top: 0;
      left: 35%;
      animation: bouncing-ball 1.5s cubic-bezier(0.62, 0.28, 0.23, 0.99) infinite;
    }

    .spinner-bouncing-ball .shadow {
      position: absolute;
      width: 40%;
      height: 10%;
      background: rgba(0, 0, 0, 0.2);
      border-radius: 50%;
      bottom: 0;
      left: 30%;
      animation: shadow-scale 1.5s ease-in-out infinite;
    }

    @keyframes bouncing-ball {
      0%, 100% { top: 0; }
      50% { top: 70%; }
    }

    @keyframes shadow-scale {
      0%, 100% { transform: scaleX(0.5); opacity: 0.3; }
      50% { transform: scaleX(1); opacity: 0.6; }
    }

    .spinner-speed-slow .spinner-bouncing-ball > div { animation-duration: 2.5s; }
    .spinner-speed-fast .spinner-bouncing-ball > div { animation-duration: 1s; }
  `]
})
export class ProgressSpinnerComponent {
  @Input() variant: SpinnerVariant = 'circular';
  @Input() size: SpinnerSize | number = 'md';
  @Input() speed: SpinnerSpeed = 'normal';
  @Input() color = '#007bff';
  @Input() secondaryColor = '#e5e7eb';
  @Input() thickness = 4;
  @Input() overlay = false;
  @Input() backdropColor = 'rgba(0, 0, 0, 0.5)';
  @Input() label = '';
  @Input() labelPosition: 'top' | 'bottom' | 'left' | 'right' = 'bottom';
  @Input() labelColor = '#666666';
  @Input() determinate = false;
  @Input() value = 0;

  @HostBinding('style.display')
  get display() {
    return this.overlay ? 'block' : 'inline-block';
  }

  getSize(): string {
    if (typeof this.size === 'number') {
      return `${this.size}px`;
    }

    const sizes = {
      'xs': '16px',
      'sm': '24px',
      'md': '40px',
      'lg': '56px',
      'xl': '72px',
      '2xl': '96px'
    };

    return sizes[this.size] || '40px';
  }

  getViewBox(): string {
    const size = 50;
    return `0 0 ${size} ${size}`;
  }

  getCenter(): number {
    return 25;
  }

  getRadius(): number {
    return 25 - this.thickness;
  }

  getCircumference(): number {
    return 2 * Math.PI * this.getRadius();
  }

  getDashOffset(): number {
    if (!this.determinate) {
      return this.getCircumference() * 0.25;
    }
    const progress = Math.max(0, Math.min(100, this.value));
    return this.getCircumference() * (1 - progress / 100);
  }
}
