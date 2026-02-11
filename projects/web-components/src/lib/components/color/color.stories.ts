

import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { ColorPaletteComponent, ColorScale } from './color.component';

const meta: Meta<ColorPaletteComponent> = {
  title: 'Colors/ColorPalette',
  component: ColorPaletteComponent,
  tags: ['autodocs'],
  parameters: {
  docs: {
    description: {
      component: `
## 🎨 Paleta de cores com 50+ variações

---

### ✨ Recursos

- 11 tons por cor (50, 100, 200 … 950)
- Geração automática de tons claros e escuros
- Copiar HEX com 1 clique
- Exibe HEX, RGB e CSS Variable
- Exportação de JSON completo
- Código CSS pronto para uso
- Aplicação automática de variáveis CSS no \`:root\`

---

### 1️⃣ Instalação

\`\`\`bash
npm install @web/ui-components
\`\`\`

---

### 2️⃣ Importação

\`\`\`ts
import { ColorPaletteComponent, ColorScale } from '@web/ui-components';

@Component({
  standalone: true,
  imports: [ColorPaletteComponent],
  template: \`
    <web-color-palette
      title="Minha Paleta"
      [colorScales]="colors">
    </web-color-palette>
  \`
})
export class MyComponent {
  colors: ColorScale[] = [
    { name: 'Primary', baseColor: '#009ADA' },
    { name: 'Success', baseColor: '#28a745' }
  ];
}
\`\`\`

---

### 3️⃣ Interface \`ColorScale\`

\`\`\`ts
interface ColorScale {
  name: string;        // Nome: "Primary", "Success", etc
  baseColor: string;   // Cor base HEX: "#009ADA"
  category?: string;   // Categoria opcional
}
\`\`\`

---

### 4️⃣ Como funciona

Você define **apenas a cor base** (ex: \`#009ADA\`).  
O componente gera automaticamente **11 tons**:

- **50** – Muito claro (quase branco)
- **100** – Bem claro
- **200** – Claro
- **300** – Claro médio
- **400** – Claro forte
- **500** – Base (cor original)
- **600** – Escuro leve
- **700** – Escuro médio
- **800** – Escuro forte
- **900** – Muito escuro
- **950** – Quase preto

---

### 5️⃣ CSS Variables automáticas

\`\`\`html
<web-color-palette
  [colorScales]="colors"
  [applyCssVariables]="true">
</web-color-palette>
\`\`\`

As variáveis são aplicadas automaticamente no \`:root\`:

\`\`\`css
.button {
  background: var(--color-primary-500);
}

.button:hover {
  background: var(--color-primary-600);
}

.badge {
  background: var(--color-primary-100);
  color: var(--color-primary-900);
}
\`\`\`

---

### 6️⃣ Exemplo completo

\`\`\`ts
const brandColors: ColorScale[] = [
  { name: 'Primary', baseColor: '#009ADA' },
  { name: 'Secondary', baseColor: '#6c757d' },
  { name: 'Success', baseColor: '#28a745' },
  { name: 'Danger', baseColor: '#dc3545' },
  { name: 'Warning', baseColor: '#ffc107' },
  { name: 'Info', baseColor: '#17a2b8' }
];
\`\`\`

\`\`\`html
<web-color-palette
  title="Design System"
  subtitle="6 cores × 11 tons = 66 variações"
  [colorScales]="brandColors">
</web-color-palette>
\`\`\`

---

### 7️⃣ Eventos

\`\`\`html
<web-color-palette
  [colorScales]="colors"
  (colorCopied)="onColorCopy($event)">
</web-color-palette>
\`\`\`

\`\`\`ts
onColorCopy(data: { name: string; shade: string; hex: string }) {
  console.log(\`\${data.name} \${data.shade}: \${data.hex}\`);
}
\`\`\`

---

### 8️⃣ Propriedades

**Inputs**
- \`title: string\`
- \`subtitle: string\`
- \`colorScales: ColorScale[]\`
- \`shadesPerColor: number\`
- \`showHeader: boolean\`
- \`compactMode: boolean\`
- \`applyCssVariables: boolean\`

**Outputs**
- \`colorCopied: EventEmitter<{ name, shade, hex }>\`

---

### 9️⃣ Modo compacto

\`\`\`html
<web-color-palette
  [colorScales]="colors"
  [compactMode]="true">
</web-color-palette>
\`\`\`

- Reduz o tamanho dos cards
- Ideal para paletas grandes

---

### 🔟 Exportar JSON

Clique no botão **Exportar** para gerar:

\`\`\`json
{
  "Primary": {
    "50": "#e6f7ff",
    "100": "#b3e5ff",
    "200": "#80d3ff",
    "...": "...",
    "950": "#001a29"
  }
}
\`\`\`

---

### 💡 Casos de uso

1. Design System corporativo
2. Documentação de cores
3. Guia de estilo
4. Gerador de paletas
5. Tokens de design

`
    }
  }
},
  decorators: [
    moduleMetadata({
      imports: [ColorPaletteComponent],
    }),
  ],
};

export default meta;
type Story = StoryObj<ColorPaletteComponent>;

// Paletas de exemplo

const brandColors: ColorScale[] = [
  { name: 'Primary', baseColor: '#009ADA' },
  { name: 'Secondary', baseColor: '#6c757d' },
  { name: 'Success', baseColor: '#28a745' },
  { name: 'Danger', baseColor: '#dc3545' },
  { name: 'Warning', baseColor: '#ffc107' },
  { name: 'Info', baseColor: '#17a2b8' },
];

const extendedColors: ColorScale[] = [
  { name: 'Blue', baseColor: '#007bff' },
  { name: 'Indigo', baseColor: '#6610f2' },
  { name: 'Purple', baseColor: '#6f42c1' },
  { name: 'Pink', baseColor: '#e83e8c' },
  { name: 'Red', baseColor: '#dc3545' },
  { name: 'Orange', baseColor: '#fd7e14' },
  { name: 'Yellow', baseColor: '#ffc107' },
  { name: 'Green', baseColor: '#28a745' },
  { name: 'Teal', baseColor: '#20c997' },
  { name: 'Cyan', baseColor: '#17a2b8' },
];

const allColors: ColorScale[] = [
  { name: 'Red', baseColor: '#f44336' },
  { name: 'Pink', baseColor: '#e91e63' },
  { name: 'Purple', baseColor: '#9c27b0' },
  { name: 'Deep Purple', baseColor: '#673ab7' },
  { name: 'Indigo', baseColor: '#3f51b5' },
  { name: 'Blue', baseColor: '#2196f3' },
  { name: 'Light Blue', baseColor: '#03a9f4' },
  { name: 'Cyan', baseColor: '#00bcd4' },
  { name: 'Teal', baseColor: '#009688' },
  { name: 'Green', baseColor: '#4caf50' },
  { name: 'Light Green', baseColor: '#8bc34a' },
  { name: 'Lime', baseColor: '#cddc39' },
  { name: 'Yellow', baseColor: '#ffeb3b' },
  { name: 'Amber', baseColor: '#ffc107' },
  { name: 'Orange', baseColor: '#ff9800' },
  { name: 'Deep Orange', baseColor: '#ff5722' },
  { name: 'Brown', baseColor: '#795548' },
  { name: 'Gray', baseColor: '#9e9e9e' },
  { name: 'Blue Gray', baseColor: '#607d8b' },
];

// Stories

export const Default: Story = {
  args: {
    title: 'Paleta de Cores web',
    subtitle: '6 cores × 11 tons = 66 variações',
    colorScales: brandColors,
  }
};

export const ExtendedPalette: Story = {
  name: 'Paleta Estendida (10 cores)',
  args: {
    title: 'Paleta Estendida',
    subtitle: '10 cores × 11 tons = 110 variações',
    colorScales: extendedColors,
  }
};

export const CompletePalette: Story = {
  name: 'Paleta Completa (19 cores)',
  args: {
    title: 'Paleta Material Design Completa',
    subtitle: '19 cores × 11 tons = 209 variações!',
    colorScales: allColors,
  }
};

export const CompactMode: Story = {
  name: 'Modo Compacto',
  args: {
    title: 'Paleta Compacta',
    subtitle: 'Cards menores para visualizar mais cores',
    colorScales: extendedColors,
    compactMode: true,
  }
};

export const WithCssCode: Story = {
  name: 'Com Código CSS',
  render: () => ({
    props: {
      colors: brandColors,
      showCss: true
    },
    template: `
      <web-color-palette
        title="Design System com CSS"
        subtitle="Variáveis CSS prontas para usar"
        [colorScales]="colors">
      </web-color-palette>
      
      <div style="margin-top: 2rem; padding: 2rem; background: white; border-radius: 1rem;">
        <h3 style="margin: 0 0 1rem 0;">Como usar as variáveis:</h3>
        <pre style="margin: 0; padding: 1.5rem; background: #1a1a1a; color: #10b981; border-radius: 0.5rem; font-family: 'Fira Code', monospace; font-size: 0.875rem; overflow-x: auto;">
/* Botão Primary */
.btn-primary {
  background: var(--color-primary-500);
  color: white;
}

.btn-primary:hover {
  background: var(--color-primary-600);
}

.btn-primary:active {
  background: var(--color-primary-700);
}

/* Badge */
.badge-success {
  background: var(--color-success-100);
  color: var(--color-success-900);
  border: 1px solid var(--color-success-200);
}

/* Alert */
.alert-danger {
  background: var(--color-danger-50);
  color: var(--color-danger-900);
  border-left: 4px solid var(--color-danger-500);
}</pre>
      </div>
    `
  })
};

export const SingleColor: Story = {
  name: 'Cor Única (11 variações)',
  args: {
    title: 'Azul web',
    subtitle: '1 cor base = 11 tons automáticos',
    colorScales: [
      { name: 'Primary Blue', baseColor: '#009ADA' }
    ],
  }
};

export const CustomColors: Story = {
  name: 'Cores Customizadas',
  args: {
    title: 'Paleta Custom',
    subtitle: 'Defina suas próprias cores',
    colorScales: [
      { name: 'Brand Primary', baseColor: '#5e35b1' },
      { name: 'Brand Secondary', baseColor: '#ff6f00' },
      { name: 'Brand Accent', baseColor: '#00e676' },
    ],
  }
};

export const InteractiveDemo: Story = {
  name: 'Demo Interativo',
  render: () => ({
    props: {
      colors: [
        { name: 'Primary', baseColor: '#009ADA' },
        { name: 'Success', baseColor: '#28a745' },
      ],
      selectedColor: null as any,
      onColorCopy(data: any) {
        (this as any).selectedColor = data;
      }
    },
    template: `
      <div>
        <web-color-palette
          title="Clique em uma cor"
          subtitle="Clique em qualquer tom para copiar"
          [colorScales]="colors"
          (colorCopied)="onColorCopy($event)">
        </web-color-palette>
        
        <div *ngIf="selectedColor" style="margin-top: 2rem; padding: 2rem; background: white; border-radius: 1rem; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
          <h3 style="margin: 0 0 1rem 0;">Última Cor Copiada:</h3>
          
          <div style="display: flex; gap: 1.5rem; align-items: center;">
            <div [style.background]="selectedColor.hex" 
                 style="width: 6rem; height: 6rem; border-radius: 0.75rem; box-shadow: 0 4px 12px rgba(0,0,0,0.15);"></div>
            
            <div>
              <h4 style="margin: 0 0 0.5rem 0; font-size: 1.25rem;">
                {{ selectedColor.name }} {{ selectedColor.shade }}
              </h4>
              <p style="margin: 0; font-family: 'Fira Code', monospace; font-size: 1rem;">
                <strong>HEX:</strong> {{ selectedColor.hex }}
              </p>
              <p style="margin: 0.5rem 0 0 0; font-family: 'Fira Code', monospace; color: #009ADA;">
                <strong>CSS:</strong> var(--color-{{ selectedColor.name.toLowerCase() }}-{{ selectedColor.shade }})
              </p>
            </div>
          </div>
        </div>
      </div>
    `
  })
};

export const GrayscalePalette: Story = {
  name: 'Escala de Cinzas',
  args: {
    title: 'Grayscale',
    subtitle: 'Tons neutros para UI',
    colorScales: [
      { name: 'Gray', baseColor: '#6b7280' },
      { name: 'Slate', baseColor: '#64748b' },
      { name: 'Zinc', baseColor: '#71717a' },
    ],
  }
};