import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface ColorScale {
  name: string;
  baseColor: string;
  category?: string;
}

@Component({
  selector: 'web-color-palette',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="color-palette-wrapper">

      <!-- Header -->
      <div class="palette-header" *ngIf="showHeader">
        <div class="header-info">
          <h2 class="palette-title">{{ title }}</h2>
          <p class="palette-subtitle" *ngIf="subtitle">{{ subtitle }}</p>
        </div>

        <div class="header-actions">
          <button class="action-btn" (click)="copyAllCss()">
            <span class="material-symbols-outlined">content_copy</span>
            Copiar CSS
          </button>
          <button class="action-btn" (click)="exportJSON()">
            <span class="material-symbols-outlined">download</span>
            Exportar
          </button>
          <button class="action-btn" [class.active]="showCssCode" (click)="showCssCode = !showCssCode">
            <span class="material-symbols-outlined">code</span>
            {{ showCssCode ? 'Ocultar' : 'Ver' }} CSS
          </button>
        </div>
      </div>

      <!-- CSS Code View -->
      <div class="css-panel" *ngIf="showCssCode">
        <div class="css-panel-header">
          <h3>Variáveis CSS ({{ totalShades }} cores)</h3>
          <button (click)="copyCssCode()" class="copy-css-btn">
            <span class="material-symbols-outlined">content_copy</span>
            Copiar Tudo
          </button>
        </div>
        <pre class="css-code">{{ generateCssCode() }}</pre>
      </div>

      <!-- Color Scales -->
      <div class="scales-container">
        <div *ngFor="let scale of colorScales" class="scale-group">

          <!-- Scale Header -->
          <div class="scale-header-bar">
            <div class="scale-info">
              <h3 class="scale-name">{{ scale.name }}</h3>
              <span class="scale-badge">{{ shadesPerColor }} tons</span>
            </div>
            <div class="scale-base" [style.background]="scale.baseColor">
              <span class="base-color-label">Base: {{ scale.baseColor }}</span>
            </div>
          </div>

          <!-- Shades Grid -->
          <div class="shades-grid" [class.compact-grid]="compactMode">
            <div *ngFor="let shade of generateShades(scale.baseColor); let i = index"
                 class="shade-box"
                 [class.shade-hover]="!compactMode"
                 [style.background]="shade.hex"
                 [title]="getShadeLabel(scale.name, i) + ': ' + shade.hex"
                 (click)="copyColor(scale.name, getShadeLabel(scale.name, i), shade.hex)">

              <div class="shade-overlay">
                <span class="shade-number">{{ getShadeLabel(scale.name, i) }}</span>
                <span class="shade-hex">{{ shade.hex }}</span>
                <span class="shade-rgb">{{ shade.rgb }}</span>
                <code class="shade-css">var(--{{ getCssVar(scale.name, i) }})</code>
              </div>

              <!-- Copied Indicator -->
              <div class="copied-check" *ngIf="lastCopied === shade.hex">
                <span class="material-symbols-outlined">check_circle</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Toast Notification -->
      <div class="toast-notification" *ngIf="showToast">
        <span class="material-symbols-outlined">check_circle</span>
        {{ toastMessage }}
      </div>
    </div>
  `,
  styles: [`

    .color-palette-wrapper {
      font-family: "Montserrat", sans-serif;
      padding: 2rem;
      background: #f8f9fa;
      border-radius: 1rem;
    }

    /* Header */
    .palette-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 2rem;
      gap: 1.5rem;
      flex-wrap: wrap;
    }

    .palette-title {
      margin: 0;
      font-size: 2rem;
      font-weight: 700;
      color: #111;
    }

    .palette-subtitle {
      margin: 0.5rem 0 0 0;
      color: #666;
      font-size: 1rem;
    }

    .header-actions {
      display: flex;
      gap: 0.75rem;
      flex-wrap: wrap;
    }

    .action-btn {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1.25rem;
      background: white;
      border: 2px solid #e0e0e0;
      border-radius: 0.5rem;
      font-family: "Montserrat", sans-serif;
      font-weight: 600;
      font-size: 0.9375rem;
      color: #333;
      cursor: pointer;
      transition: all 0.2s;
    }

    .action-btn:hover,
    .action-btn.active {
      background: #009ADA;
      color: white;
      border-color: #009ADA;
    }

    /* CSS Panel */
    .css-panel {
      background: #1a1a1a;
      border-radius: 0.75rem;
      overflow: hidden;
      margin-bottom: 2rem;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }

    .css-panel-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 1.5rem;
      background: #2a2a2a;
    }

    .css-panel-header h3 {
      margin: 0;
      color: white;
      font-size: 1rem;
    }

    .copy-css-btn {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1rem;
      background: #009ADA;
      border: none;
      border-radius: 0.375rem;
      color: white;
      font-family: "Montserrat", sans-serif;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.2s;
    }

    .copy-css-btn:hover {
      background: #0086c3;
    }

    .css-code {
      margin: 0;
      padding: 1.5rem;
      color: #10b981;
      font-family: "Fira Code", monospace;
      font-size: 0.875rem;
      line-height: 1.6;
      overflow-x: auto;
      max-height: 400px;
      overflow-y: auto;
    }

    /* Scales Container */
    .scales-container {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }

    .scale-group {
      background: white;
      border-radius: 1rem;
      padding: 2rem;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    }

    .scale-header-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
      padding-bottom: 1rem;
      border-bottom: 2px solid #f0f0f0;
      gap: 1rem;
      flex-wrap: wrap;
    }

    .scale-info {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .scale-name {
      margin: 0;
      font-size: 1.5rem;
      font-weight: 700;
      color: #111;
    }

    .scale-badge {
      font-size: 0.875rem;
      font-weight: 600;
      color: #009ADA;
      background: #e6f7ff;
      padding: 0.375rem 0.75rem;
      border-radius: 9999px;
    }

    .scale-base {
      min-width: 8rem;
      height: 3rem;
      border-radius: 0.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 8px rgba(0,0,0,0.15);
    }

    .base-color-label {
      font-family: "Fira Code", monospace;
      font-size: 0.875rem;
      font-weight: 600;
      color: white;
      text-shadow: 0 1px 2px rgba(0,0,0,0.5);
    }

    /* Shades Grid */
    .shades-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
      gap: 0.75rem;
    }

    .compact-grid {
      grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
      gap: 0.5rem;
    }

    .shade-box {
      position: relative;
      aspect-ratio: 1;
      border-radius: 0.5rem;
      cursor: pointer;
      overflow: hidden;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .shade-hover:hover {
      transform: translateY(-4px) scale(1.05);
      box-shadow: 0 8px 16px rgba(0,0,0,0.2);
      z-index: 10;
    }

    .shade-overlay {
      position: absolute;
      inset: 0;
      padding: 0.75rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      background: linear-gradient(to bottom, transparent 30%, rgba(0,0,0,0.85));
      opacity: 0;
      transition: opacity 0.2s;
    }

    .shade-box:hover .shade-overlay {
      opacity: 1;
    }

    .shade-number {
      font-weight: 700;
      font-size: 1.125rem;
      color: white;
      text-shadow: 0 2px 4px rgba(0,0,0,0.5);
      align-self: flex-start;
    }

    .shade-hex {
      font-family: "Fira Code", monospace;
      font-size: 0.875rem;
      font-weight: 600;
      color: white;
      text-shadow: 0 1px 2px rgba(0,0,0,0.5);
    }

    .shade-rgb {
      font-family: "Fira Code", monospace;
      font-size: 0.75rem;
      color: rgba(255,255,255,0.9);
      text-shadow: 0 1px 2px rgba(0,0,0,0.5);
    }

    .shade-css {
      font-family: "Fira Code", monospace;
      font-size: 0.6875rem;
      color: #10b981;
      background: rgba(0,0,0,0.6);
      padding: 0.25rem 0.5rem;
      border-radius: 0.25rem;
      margin-top: 0.25rem;
    }

    /* Copied Indicator */
    .copied-check {
      position: absolute;
      inset: 0;
      background: rgba(16, 185, 129, 0.95);
      display: flex;
      align-items: center;
      justify-content: center;
      animation: fadeOutCheck 1.5s forwards;
    }

    .copied-check .material-symbols-outlined {
      font-size: 3rem;
      color: white;
    }

    @keyframes fadeOutCheck {
      0% { opacity: 1; }
      70% { opacity: 1; }
      100% { opacity: 0; pointer-events: none; }
    }

    /* Toast */
    .toast-notification {
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      background: #10b981;
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 0.75rem;
      box-shadow: 0 8px 16px rgba(0,0,0,0.2);
      display: flex;
      align-items: center;
      gap: 0.75rem;
      font-weight: 600;
      animation: slideUp 0.3s ease-out;
      z-index: 10000;
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

    /* Material Icons */
    .material-symbols-outlined {
      font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
      user-select: none;
    }

    /* Responsive */
    @media (max-width: 1024px) {
      .shades-grid {
        grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
      }
    }

    @media (max-width: 768px) {
      .palette-header {
        flex-direction: column;
      }

      .header-actions {
        width: 100%;
      }

      .action-btn {
        flex: 1;
        justify-content: center;
      }

      .shades-grid {
        grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
      }

      .toast-notification {
        left: 1rem;
        right: 1rem;
      }
    }
  `]
})
export class ColorPaletteComponent implements OnInit {
  @Input() title = 'Paleta de Cores Completa';
  @Input() subtitle = '';
  @Input() colorScales: ColorScale[] = [];
  @Input() shadesPerColor = 11; // 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950
  @Input() showHeader = true;
  @Input() compactMode = false;
  @Input() applyCssVariables = true;

  @Output() colorCopied = new EventEmitter<{ name: string; shade: string; hex: string }>();

  showCssCode = false;
  showToast = false;
  toastMessage = '';
  lastCopied = '';
  totalShades = 0;

  ngOnInit() {
    this.totalShades = this.colorScales.length * this.shadesPerColor;

    if (this.applyCssVariables) {
      this.injectCssVariables();
    }
  }

  generateShades(baseColor: string): Array<{ hex: string; rgb: string }> {
    const shades: Array<{ hex: string; rgb: string }> = [];

    // Converte HEX para RGB
    const hexToRgb = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : { r: 0, g: 0, b: 0 };
    };

    const base = hexToRgb(baseColor);

    // Gerar tons: 50, 100, 200, 300, 400, 500 (base), 600, 700, 800, 900, 950
    const levels = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

    levels.forEach(level => {
      let r, g, b;

      if (level < 500) {
        // Tons mais claros - mistura com branco
        const factor = (500 - level) / 500;
        r = Math.round(base.r + (255 - base.r) * factor);
        g = Math.round(base.g + (255 - base.g) * factor);
        b = Math.round(base.b + (255 - base.b) * factor);
      } else if (level === 500) {
        // Cor base
        r = base.r;
        g = base.g;
        b = base.b;
      } else {
        // Tons mais escuros - mistura com preto
        const factor = (level - 500) / 500;
        r = Math.round(base.r * (1 - factor));
        g = Math.round(base.g * (1 - factor));
        b = Math.round(base.b * (1 - factor));
      }

      const hex = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
      const rgb = `rgb(${r}, ${g}, ${b})`;

      shades.push({ hex, rgb });
    });

    return shades;
  }

  getShadeLabel(scaleName: string, index: number): string {
    const levels = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
    return `${levels[index]}`;
  }

  getCssVar(scaleName: string, index: number): string {
    const name = scaleName.toLowerCase().replace(/\s+/g, '-');
    const level = this.getShadeLabel(scaleName, index);
    return `color-${name}-${level}`;
  }

  copyColor(scaleName: string, shade: string, hex: string) {
    navigator.clipboard.writeText(hex);
    this.lastCopied = hex;
    this.showToastMessage(`${scaleName} ${shade}: ${hex}`);
    this.colorCopied.emit({ name: scaleName, shade, hex });

    setTimeout(() => {
      this.lastCopied = '';
    }, 1500);
  }

  generateCssCode(): string {
    let css = ':root {\n';

    this.colorScales.forEach(scale => {
      css += `  /* ${scale.name} */\n`;
      const shades = this.generateShades(scale.baseColor);
      shades.forEach((shade, index) => {
        const varName = this.getCssVar(scale.name, index);
        css += `  --${varName}: ${shade.hex};\n`;
      });
      css += '\n';
    });

    css += '}';
    return css;
  }

  copyCssCode() {
    navigator.clipboard.writeText(this.generateCssCode());
    this.showToastMessage(`CSS copiado! ${this.totalShades} cores`);
  }

  copyAllCss() {
    this.copyCssCode();
  }

  exportJSON() {
    const data: any = {};

    this.colorScales.forEach(scale => {
      data[scale.name] = {};
      const shades = this.generateShades(scale.baseColor);
      shades.forEach((shade, index) => {
        const level = this.getShadeLabel(scale.name, index);
        data[scale.name][level] = shade.hex;
      });
    });

    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'color-palette.json';
    a.click();

    this.showToastMessage('Paleta exportada!');
  }

  private injectCssVariables() {
    const root = document.documentElement;

    this.colorScales.forEach(scale => {
      const shades = this.generateShades(scale.baseColor);
      shades.forEach((shade, index) => {
        const varName = this.getCssVar(scale.name, index);
        root.style.setProperty(`--${varName}`, shade.hex);
      });
    });
  }

  private showToastMessage(message: string) {
    this.toastMessage = message;
    this.showToast = true;

    setTimeout(() => {
      this.showToast = false;
    }, 2500);
  }
}
