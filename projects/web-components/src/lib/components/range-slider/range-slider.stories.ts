import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { RangeSliderComponent, SliderMark } from './range-slider.component';
import { FormsModule } from '@angular/forms';

const meta: Meta<RangeSliderComponent> = {
  title: 'Form Controls/RangeSlider',
  component: RangeSliderComponent,
  tags: ['autodocs'],
  parameters: {
  docs: {
    description: {
      component: `


### 1️⃣ Instalação

\`\`\`bash
npm install @web/ui-components
\`\`\`


### 2️⃣ IMPORTAÇÃO

\`\`\`bash
import { RangeSliderComponent } from '@web/ui-components';
\`\`\`

\`\`\`ts
@Component({
  standalone: true,
  imports: [RangeSliderComponent],
  template: \`
    <web-range-slider
      [value]="50"
      [min]="0"
      [max]="100">
    </web-range-slider>
  \`
})
\`\`\`


### 3️⃣ USO BÁSICO (VALOR ÚNICO)


\`\`\`ts
<web-range-slider
  [value]="50"
  [min]="0"
  [max]="100"
  (valueChange)="onValueChange($event)">
</web-range-slider>
\`\`\`


### 4️⃣ MODO RANGE (MIN / MAX)

\`\`\`ts
<web-range-slider
  [range]="true"
  [valueMin]="25"
  [valueMax]="75"
  [min]="0"
  [max]="100"
  (rangeChange)="onRangeChange($event)">
</web-range-slider>

onRangeChange(range: { min: number; max: number }) {
  console.log('Min:', range.min, 'Max:', range.max);
}
\`\`\`  


### 5️⃣ COM MARKS (PONTOS DE REFERÊNCIA)

\`\`\`ts
<web-range-slider
  [value]="50"
  [marks]="[
    { value: 0, label: 'Min' },
    { value: 25, label: '25%' },
    { value: 50, label: 'Médio' },
    { value: 75, label: '75%' },
    { value: 100, label: 'Max' }
  ]">
</web-range-slider>
\`\`\`  



### 6️⃣ VARIANTE HEATMAP (CORES DINÂMICAS)

\`\`\`ts
<web-range-slider
  variant="heatmap"
  [value]="50"
  label="Temperatura">
</web-range-slider>
\`\`\`  

Escala visual:
- Verde → valores baixos
- Amarelo → valores médios
- Vermelho → valores altos


### 7️⃣ COM INPUT NUMÉRICO INTEGRADO

\`\`\`ts
<web-range-slider
  [value]="50"
  [showInput]="true">
</web-range-slider>
\`\`\`  


### 8️⃣ TOOLTIP CUSTOMIZADO

\`\`\`ts
<web-range-slider
  [value]="50"
  [tooltipFormat]="formatTooltip">
</web-range-slider>

formatTooltip(value: number): string {
  return \`$\${value.toFixed(2)}\`;
}
\`\`\` 


### 9️⃣ VARIANTE SEGMENTADA

\`\`\`ts
<web-range-slider
  variant="segments"
  [value]="70"
  [segments]="10">
</web-range-slider>
\`\`\` 


### 🔟 PROPRIEDADES DISPONÍVEIS
\`\`\`
@Input() min: number = 0 
@Input() max: number = 100
@Input() step: number = 1
@Input() value: number = 50
@Input() valueMin: number = 25
@Input() valueMax: number = 75
@Input() range: boolean = false
@Input() variant: SliderVariant = 'default'
@Input() size: 'sm' | 'md' | 'lg' = 'md'
@Input() color: string = '#009ADA'
@Input() label: string = ''
@Input() showLabel: boolean = false
@Input() showValue: boolean = true
@Input() showLimits: boolean = true
@Input() showTooltip: boolean = true
@Input() showThumbValue: boolean = false
@Input() showInput: boolean = false
@Input() showMarkLabels: boolean = true
@Input() disabled: boolean = false
@Input() vertical: boolean = false
@Input() marks: SliderMark[] = []
@Input() segments: number = 10
@Input() prefix: string = ''
@Input() suffix: string = ''
@Input() decimals: number = 0
@Input() tooltipFormat?: (value: number) => string

@Output() valueChange: EventEmitter<number>
@Output() rangeChange: EventEmitter<{ min: number; max: number }>
@Output() slideStart: EventEmitter<void>
@Output() slideEnd: EventEmitter<void>
\`\`\` 


### PRINCIPAIS CASOS DE USO

- Filtro de preços (e-commerce)
- Controle de volume
- Ajuste de brilho
- Seleção de faixa etária
- Seleção de ranges numéricos
- Controle de temperatura
- Níveis de zoom
- Painéis de configuração avançados
      `
    }
  }
},
  decorators: [
    moduleMetadata({
      imports: [RangeSliderComponent, FormsModule],
    }),
  ],
};

export default meta;
type Story = StoryObj<RangeSliderComponent>;

// ========== BÁSICO ==========

export const Default: Story = {
  args: {
    value: 50,
    label: 'Volume',
    showLabel: true,
  }
};

export const WithRange: Story = {
  name: 'Range (Min/Max)',
  args: {
    range: true,
    valueMin: 25,
    valueMax: 75,
    label: 'Faixa de Preço',
    showLabel: true,
    prefix: 'R$ ',
  }
};

// ========== VARIANTES ==========

export const Gradient: Story = {
  name: 'Gradiente Colorido',
  args: {
    variant: 'gradient',
    value: 60,
    label: 'Saturação',
    showLabel: true,
  }
};

export const Heatmap: Story = {
  name: 'Heatmap (Cores Dinâmicas)',
  args: {
    variant: 'heatmap',
    value: 75,
    label: 'Temperatura',
    showLabel: true,
    suffix: '°C',
  }
};

export const Segments: Story = {
  name: 'Segmentos',
  args: {
    variant: 'segments',
    value: 70,
    segments: 10,
    label: 'Nível',
    showLabel: true,
  }
};

export const Steps: Story = {
  name: 'Com Steps Visuais',
  args: {
    variant: 'steps',
    value: 50,
    step: 10,
    label: 'Ajuste fino',
    showLabel: true,
  }
};

// ========== COM MARKS ==========

export const WithMarks: Story = {
  name: 'Com Marcações',
  args: {
    value: 50,
    label: 'Satisfação',
    showLabel: true,
    marks: [
      { value: 0, label: 'Péssimo' },
      { value: 25, label: 'Ruim' },
      { value: 50, label: 'Regular' },
      { value: 75, label: 'Bom' },
      { value: 100, label: 'Excelente' }
    ],
  }
};

export const ColoredMarks: Story = {
  name: 'Marcações Coloridas',
  args: {
    value: 50,
    label: 'Risco',
    showLabel: true,
    variant: 'heatmap',
    marks: [
      { value: 0, label: 'Baixo', color: '#10b981' },
      { value: 33, label: 'Médio', color: '#ffc107' },
      { value: 66, label: 'Alto', color: '#ff9800' },
      { value: 100, label: 'Crítico', color: '#dc3545' }
    ],
  }
};

// ========== TAMANHOS ==========

export const AllSizes: Story = {
  name: 'Todos os Tamanhos',
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 2rem; padding: 1rem;">
        <div>
          <p style="margin: 0 0 1rem 0; font-family: Montserrat; font-weight: 600;">Small</p>
          <web-range-slider [value]="50" size="sm"></web-range-slider>
        </div>
        
        <div>
          <p style="margin: 0 0 1rem 0; font-family: Montserrat; font-weight: 600;">Medium (padrão)</p>
          <web-range-slider [value]="50" size="md"></web-range-slider>
        </div>
        
        <div>
          <p style="margin: 0 0 1rem 0; font-family: Montserrat; font-weight: 600;">Large</p>
          <web-range-slider [value]="50" size="lg"></web-range-slider>
        </div>
      </div>
    `
  })
};

// ========== FUNCIONALIDADES ==========

export const WithInput: Story = {
  name: 'Com Input Field',
  args: {
    value: 50,
    label: 'Valor',
    showLabel: true,
    showInput: true,
  }
};

export const WithThumbValue: Story = {
  name: 'Valor no Thumb',
  args: {
    value: 50,
    label: 'Progresso',
    showLabel: true,
    showThumbValue: true,
    size: 'lg',
  }
};

export const CustomTooltip: Story = {
  name: 'Tooltip Customizado',
  render: () => ({
    props: {
      value: 1250,
      formatTooltip(value: number): string {
        return `R$ ${value.toFixed(2)}`;
      }
    },
    template: `
      <web-range-slider
        [value]="value"
        [min]="0"
        [max]="5000"
        [step]="50"
        label="Orçamento"
        [showLabel]="true"
        [tooltipFormat]="formatTooltip"
        prefix="R$ "
        [decimals]="2">
      </web-range-slider>
    `
  })
};

// ========== USE CASES ==========

export const PriceFilter: Story = {
  name: 'Filtro de Preço',
  args: {
    range: true,
    valueMin: 100,
    valueMax: 500,
    min: 0,
    max: 1000,
    step: 10,
    label: 'Faixa de Preço',
    showLabel: true,
    prefix: 'R$ ',
    color: '#10b981',
  }
};

export const AgeRange: Story = {
  name: 'Faixa Etária',
  args: {
    range: true,
    valueMin: 18,
    valueMax: 65,
    min: 0,
    max: 100,
    label: 'Idade',
    showLabel: true,
    suffix: ' anos',
    marks: [
      { value: 0, label: '0' },
      { value: 18, label: '18' },
      { value: 30, label: '30' },
      { value: 50, label: '50' },
      { value: 65, label: '65' },
      { value: 100, label: '100+' }
    ],
  }
};

export const VolumeControl: Story = {
  name: 'Controle de Volume',
  args: {
    value: 70,
    label: 'Volume',
    showLabel: true,
    variant: 'segments',
    segments: 20,
    suffix: '%',
    color: '#009ADA',
  }
};

export const TemperatureControl: Story = {
  name: 'Controle de Temperatura',
  args: {
    value: 24,
    min: 16,
    max: 30,
    step: 0.5,
    label: 'Temperatura',
    showLabel: true,
    variant: 'heatmap',
    suffix: '°C',
    decimals: 1,
    marks: [
      { value: 16, label: 'Frio' },
      { value: 20, label: 'Fresco' },
      { value: 24, label: 'Ideal' },
      { value: 28, label: 'Quente' },
      { value: 30, label: 'Muito Quente' }
    ],
  }
};

export const RatingSlider: Story = {
  name: 'Avaliação',
  args: {
    value: 4,
    min: 1,
    max: 5,
    step: 1,
    label: 'Sua Avaliação',
    showLabel: true,
    variant: 'steps',
    marks: [
      { value: 1, label: '⭐' },
      { value: 2, label: '⭐⭐' },
      { value: 3, label: '⭐⭐⭐' },
      { value: 4, label: '⭐⭐⭐⭐' },
      { value: 5, label: '⭐⭐⭐⭐⭐' }
    ],
  }
};

export const ProgressSlider: Story = {
  name: 'Progresso de Projeto',
  args: {
    value: 65,
    label: 'Progresso',
    showLabel: true,
    variant: 'gradient',
    suffix: '%',
    marks: [
      { value: 0, label: 'Início' },
      { value: 25, label: 'Planejamento' },
      { value: 50, label: 'Desenvolvimento' },
      { value: 75, label: 'Testes' },
      { value: 100, label: 'Entregue' }
    ],
  }
};

// ========== INTERATIVO ==========

export const LiveDemo: Story = {
  name: 'Demo Interativo',
  render: () => ({
    props: {
      singleValue: 50,
      rangeMin: 25,
      rangeMax: 75
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 2rem; padding: 1rem;">
        <div>
          <h3 style="margin: 0 0 1rem 0;">Single Value</h3>
          <web-range-slider
            [(value)]="singleValue"
            label="Ajuste o valor"
            [showLabel]="true"
            [showInput]="true">
          </web-range-slider>
          <p style="margin-top: 1rem;">Valor atual: <strong>{{ singleValue }}</strong></p>
        </div>
        
        <div>
          <h3 style="margin: 0 0 1rem 0;">Range</h3>
          <web-range-slider
            [range]="true"
            [(valueMin)]="rangeMin"
            [(valueMax)]="rangeMax"
            label="Selecione a faixa"
            [showLabel]="true"
            variant="gradient">
          </web-range-slider>
          <p style="margin-top: 1rem;">
            Faixa: <strong>{{ rangeMin }}</strong> a <strong>{{ rangeMax }}</strong>
          </p>
        </div>
      </div>
    `
  })
};

export const ComparisonDemo: Story = {
  name: 'Comparação de Variantes',
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 2rem; padding: 1rem;">
        <div>
          <h4>Default</h4>
          <web-range-slider [value]="65" variant="default"></web-range-slider>
        </div>
        
        <div>
          <h4>Gradient</h4>
          <web-range-slider [value]="65" variant="gradient"></web-range-slider>
        </div>
        
        <div>
          <h4>Heatmap</h4>
          <web-range-slider [value]="65" variant="heatmap"></web-range-slider>
        </div>
        
        <div>
          <h4>Segments</h4>
          <web-range-slider [value]="65" variant="segments"></web-range-slider>
        </div>
        
        <div>
          <h4>Steps</h4>
          <web-range-slider [value]="60" variant="steps" [step]="10"></web-range-slider>
        </div>
      </div>
    `
  })
};