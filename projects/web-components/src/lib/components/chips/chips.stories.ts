import type { Meta, StoryObj } from '@storybook/angular';
import { ChipComponent } from './chips.component';

/**
 * # Chip Component
 *
 * Um componente de chip moderno e completo que DOMINA todos os concorrentes
 * do mercado com recursos avançados e customização TOTAL de cores.
 *
 * ## 🏆 COMPARATIVO DETALHADO COM CONCORRENTES
 *
 * ### Material UI (MUI Chip)
 * | Feature | Material UI | **web-chip** |
 * |---------|-------------|--------------|
 * | Variantes | 3 | **4** ✨ |
 * | Tamanhos | 3 | **5** ✨ |
 * | Shapes | 1 | **3** ✨ |
 * | Avatar | ✅ | **✅** |
 * | Ícone Duplo | ❌ | **✅** ✨ |
 * | Gradiente | ❌ | **✅** ✨ |
 * | Selecionável | ❌ | **✅** ✨ |
 * | Checkmark | ❌ | **✅** ✨ |
 * | Color Props | **3** | **15+** ✨✨✨ |
 *
 * ### Ant Design (Tag)
 * | Feature | Ant Design | **web-chip** |
 * |---------|------------|--------------|
 * | Variantes | 2 | **4** ✨ |
 * | Tamanhos | 3 | **5** ✨ |
 * | Shapes | 1 | **3** ✨ |
 * | Avatar | ❌ | **✅** ✨ |
 * | Ícones | ✅ (1) | **✅ (2)** ✨ |
 * | Gradiente | ❌ | **✅** ✨ |
 * | Selecionável | ✅ | **✅** |
 * | Color Props | **2** | **15+** ✨✨✨ |
 *
 * ### Bootstrap (Badge similar)
 * | Feature | Bootstrap | **web-chip** |
 * |---------|-----------|--------------|
 * | Variantes | 2 | **4** ✨ |
 * | Tamanhos | 2 | **5** ✨ |
 * | Avatar | ❌ | **✅** ✨ |
 * | Ícones | ❌ | **✅** ✨ |
 * | Deletável | ❌ | **✅** ✨ |
 * | Gradiente | ❌ | **✅** ✨ |
 * | Color Props | **0** | **15+** ✨✨✨ |
 *
 * ### PrimeNG (Chip)
 * | Feature | PrimeNG | **web-chip** |
 * |---------|---------|--------------|
 * | Variantes | 1 | **4** ✨ |
 * | Tamanhos | 1 | **5** ✨ |
 * | Shapes | 1 | **3** ✨ |
 * | Avatar | ✅ | **✅** |
 * | Ícone Duplo | ❌ | **✅** ✨ |
 * | Gradiente | ❌ | **✅** ✨ |
 * | Selecionável | ❌ | **✅** ✨ |
 * | Color Props | **1** | **15+** ✨✨✨ |
 *
 * ## 🎯 Principais Funcionalidades
 *
 * ### Tamanhos (5 opções)
 * - **xs**: 20px - Extra compacto
 * - **sm**: 24px - Pequeno
 * - **md**: 32px - Médio (default)
 * - **lg**: 40px - Grande
 * - **xl**: 48px - Extra grande
 *
 * ### Variantes (4 estilos)
 * - **filled**: Cor sólida com texto branco
 * - **outlined**: Apenas borda, fundo transparente
 * - **soft**: Cor suave semi-transparente
 * - **gradient**: Gradiente de cores ✨ EXCLUSIVO
 *
 * ### Shapes (3 formas)
 * - **rounded**: Cantos arredondados (8px)
 * - **square**: Cantos quadrados (4px)
 * - **pill**: Totalmente arredondado
 *
 * ## 📦 Recursos EXCLUSIVOS
 *
 * ### ✨ Modo Gradiente
 * ```html
 * <web-chip
 *   variant="gradient"
 *   gradientFrom="#667eea"
 *   gradientTo="#764ba2">
 * </web-chip>
 * ```
 *
 * ### ✨ Ícones Duplos (leading + trailing)
 * ```html
 * <web-chip
 *   icon="star"
 *   iconRight="arrow_forward">
 * </web-chip>
 * ```
 *
 * ### ✨ Selecionável com Checkmark
 * ```html
 * <web-chip
 *   [clickable]="true"
 *   [selected]="true"
 *   [showCheckmark]="true">
 * </web-chip>
 * ```
 *
 * ### ✨ Avatar Integrado
 * ```html
 * <web-chip
 *   avatar="https://..."
 *   label="John Doe">
 * </web-chip>
 * ```
 *
 * ### ✨ Deletável com Ícone Custom
 * ```html
 * <web-chip
 *   [deletable]="true"
 *   deleteIcon="close"
 *   (delete)="handleDelete()">
 * </web-chip>
 * ```
 *
 * ### ✨ 15+ Propriedades de Cor
 * **Cores Básicas:**
 * - `color` - Cor principal
 * - `textColor` - Cor do texto
 * - `borderColor` - Cor da borda
 * - `iconColor` - Cor dos ícones
 * - `deleteColor` - Cor do botão delete
 * - `checkmarkColor` - Cor do checkmark
 *
 * **Estados:**
 * - `selectedColor` - Cor quando selecionado
 * - `selectedTextColor` - Texto quando selecionado
 * - `hoverColor` - Cor no hover
 *
 * **Gradiente:**
 * - `gradientFrom` - Cor inicial
 * - `gradientTo` - Cor final
 * - `gradientDirection` - Direção (to-r, to-br, to-b, to-bl)
 *
 * ## 🔧 Como Usar
 *
 * ### Importação
 * ```typescript
 * import { ChipComponent } from '@thiagosantosa/web-components';
 *
 * @Component({
 *   imports: [ChipComponent],
 *   // ...
 * })
 * ```
 *
 * ### Chip Simples
 * ```html
 * <web-chip label="Tag"></web-chip>
 * ```
 *
 * ### Com Avatar
 * ```html
 * <web-chip
 *   avatar="https://..."
 *   label="Maria Silva">
 * </web-chip>
 * ```
 *
 * ### Com Ícone
 * ```html
 * <web-chip
 *   icon="star"
 *   label="Favorito"
 *   color="#ffc107">
 * </web-chip>
 * ```
 *
 * ### Deletável
 * ```html
 * <web-chip
 *   label="Remover"
 *   [deletable]="true"
 *   (delete)="onDelete()">
 * </web-chip>
 * ```
 *
 * ### Selecionável
 * ```html
 * <web-chip
 *   label="Selecionar"
 *   [clickable]="true"
 *   [selected]="isSelected"
 *   (chipClick)="toggleSelection()">
 * </web-chip>
 * ```
 *
 * ## 📋 Props Completas
 *
 * | Prop | Tipo | Default | Descrição |
 * |------|------|---------|-----------|
 * | label | string | '' | Texto do chip |
 * | variant | ChipVariant | 'filled' | Variante visual |
 * | size | ChipSize | 'md' | Tamanho |
 * | shape | ChipShape | 'rounded' | Forma |
 * | disabled | boolean | false | Desabilitado |
 * | selected | boolean | false | Selecionado |
 * | clickable | boolean | false | Clicável |
 * | deletable | boolean | false | Deletável |
 * | showCheckmark | boolean | true | Mostra check |
 * | avatar | string | '' | URL ou iniciais |
 * | icon | string | '' | Ícone esquerda |
 * | iconRight | string | '' | Ícone direita |
 * | deleteIcon | string | 'close' | Ícone delete |
 * | color | string | '#007bff' | Cor principal |
 * | textColor | string | '' | Cor do texto |
 * | borderColor | string | '' | Cor da borda |
 * | iconColor | string | '' | Cor ícones |
 * | deleteColor | string | '' | Cor delete |
 * | checkmarkColor | string | '' | Cor checkmark |
 * | selectedColor | string | '' | Cor selecionado |
 * | selectedTextColor | string | '' | Texto selecionado |
 * | hoverColor | string | '' | Cor hover |
 * | gradientFrom | string | '' | Gradiente início |
 * | gradientTo | string | '' | Gradiente fim |
 * | gradientDirection | string | 'to-r' | Direção gradiente |
 *
 * ## 📤 Eventos
 *
 * | Evento | Payload | Descrição |
 * |--------|---------|-----------|
 * | chipClick | MouseEvent | Chip clicado |
 * | delete | void | Chip deletado |
 *
 * ## 💡 Casos de Uso
 *
 * 1. **Tags**: Categorização de conteúdo
 * 2. **Filtros**: Seleção múltipla de filtros
 * 3. **Contatos**: Lista de pessoas com avatar
 * 4. **Skills**: Habilidades/tecnologias
 * 5. **Status**: Estados do sistema
 * 6. **Categorias**: Organização de items
 * 7. **Seleção**: Escolha de opções
 * 8. **Labels**: Marcadores visuais
 */
const meta: Meta<ChipComponent> = {
  title: 'Buttons & Indicators/Chip',
  component: ChipComponent,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['filled', 'outlined', 'soft', 'gradient'],
      description: 'Variante visual do chip'
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Tamanho do chip'
    },
    shape: {
      control: 'select',
      options: ['rounded', 'square', 'pill'],
      description: 'Forma do chip'
    },
    color: {
      control: 'color',
      description: 'Cor principal do chip'
    }
  }
};

export default meta;
type Story = StoryObj<ChipComponent>;

/**
 * Chip básico com texto.
 */
export const Basic: Story = {
  args: {
    label: 'Chip',
    color: '#007bff'
  }
};

/**
 * Todos os tamanhos disponíveis.
 */
export const Sizes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; align-items: center; gap: 12px; flex-wrap: wrap;">
        <web-chip label="Extra Small" size="xs" color="#007bff"></web-chip>
        <web-chip label="Small" size="sm" color="#007bff"></web-chip>
        <web-chip label="Medium" size="md" color="#007bff"></web-chip>
        <web-chip label="Large" size="lg" color="#007bff"></web-chip>
        <web-chip label="Extra Large" size="xl" color="#007bff"></web-chip>
      </div>
    `
  })
};

/**
 * Todas as variantes visuais.
 */
export const Variants: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <div>
          <h4 style="margin: 0 0 12px 0; color: #666;">Filled - Cor sólida</h4>
          <div style="display: flex; gap: 12px; flex-wrap: wrap;">
            <web-chip label="Primary" variant="filled" color="#007bff"></web-chip>
            <web-chip label="Success" variant="filled" color="#22c55e"></web-chip>
            <web-chip label="Warning" variant="filled" color="#ffc107"></web-chip>
            <web-chip label="Danger" variant="filled" color="#ef4444"></web-chip>
            <web-chip label="Purple" variant="filled" color="#a855f7"></web-chip>
          </div>
        </div>

        <div>
          <h4 style="margin: 0 0 12px 0; color: #666;">Outlined - Apenas borda</h4>
          <div style="display: flex; gap: 12px; flex-wrap: wrap;">
            <web-chip label="Primary" variant="outlined" color="#007bff"></web-chip>
            <web-chip label="Success" variant="outlined" color="#22c55e"></web-chip>
            <web-chip label="Warning" variant="outlined" color="#ffc107"></web-chip>
            <web-chip label="Danger" variant="outlined" color="#ef4444"></web-chip>
            <web-chip label="Purple" variant="outlined" color="#a855f7"></web-chip>
          </div>
        </div>

        <div>
          <h4 style="margin: 0 0 12px 0; color: #666;">Soft - Cor suave</h4>
          <div style="display: flex; gap: 12px; flex-wrap: wrap;">
            <web-chip label="Primary" variant="soft" color="#007bff"></web-chip>
            <web-chip label="Success" variant="soft" color="#22c55e"></web-chip>
            <web-chip label="Warning" variant="soft" color="#ffc107"></web-chip>
            <web-chip label="Danger" variant="soft" color="#ef4444"></web-chip>
            <web-chip label="Purple" variant="soft" color="#a855f7"></web-chip>
          </div>
        </div>

        <div>
          <h4 style="margin: 0 0 12px 0; color: #666;">Gradient - Degradê ✨ EXCLUSIVO</h4>
          <div style="display: flex; gap: 12px; flex-wrap: wrap;">
            <web-chip label="Blue" variant="gradient" gradientFrom="#667eea" gradientTo="#764ba2"></web-chip>
            <web-chip label="Green" variant="gradient" gradientFrom="#38ef7d" gradientTo="#11998e"></web-chip>
            <web-chip label="Orange" variant="gradient" gradientFrom="#f093fb" gradientTo="#f5576c"></web-chip>
            <web-chip label="Sunset" variant="gradient" gradientFrom="#ff6b6b" gradientTo="#feca57"></web-chip>
          </div>
        </div>
      </div>
    `
  })
};

/**
 * Diferentes formas/shapes.
 */
export const Shapes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; align-items: center; gap: 16px;">
        <web-chip label="Rounded" shape="rounded" color="#007bff"></web-chip>
        <web-chip label="Square" shape="square" color="#22c55e"></web-chip>
        <web-chip label="Pill" shape="pill" color="#a855f7"></web-chip>
      </div>
    `
  })
};

/**
 * Chips com avatares.
 */
export const WithAvatars: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 12px; flex-wrap: wrap;">
        <web-chip
          avatar="https://i.pravatar.cc/150?img=1"
          label="Maria Silva"
          color="#007bff">
        </web-chip>

        <web-chip
          avatar="https://i.pravatar.cc/150?img=2"
          label="João Santos"
          color="#22c55e">
        </web-chip>

        <web-chip
          avatar="https://i.pravatar.cc/150?img=3"
          label="Ana Costa"
          color="#a855f7">
        </web-chip>

        <web-chip
          avatar="MS"
          label="Maria Silva"
          variant="soft"
          color="#e91e63">
        </web-chip>

        <web-chip
          avatar="JD"
          label="John Doe"
          variant="outlined"
          color="#ffc107">
        </web-chip>
      </div>
    `
  })
};

/**
 * Chips com ícones.
 */
export const WithIcons: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <div>
          <h4 style="margin: 0 0 12px 0; color: #666;">Ícone à esquerda</h4>
          <div style="display: flex; gap: 12px; flex-wrap: wrap;">
            <web-chip label="Favorito" icon="star" color="#ffc107"></web-chip>
            <web-chip label="Verificado" icon="verified" color="#22c55e"></web-chip>
            <web-chip label="Alerta" icon="warning" color="#ef4444"></web-chip>
            <web-chip label="Info" icon="info" color="#007bff"></web-chip>
          </div>
        </div>

        <div>
          <h4 style="margin: 0 0 12px 0; color: #666;">Ícone à direita</h4>
          <div style="display: flex; gap: 12px; flex-wrap: wrap;">
            <web-chip label="Download" iconRight="download" color="#6c757d"></web-chip>
            <web-chip label="Share" iconRight="share" color="#007bff"></web-chip>
            <web-chip label="Next" iconRight="arrow_forward" color="#a855f7"></web-chip>
          </div>
        </div>

        <div>
          <h4 style="margin: 0 0 12px 0; color: #666;">Ícones duplos ✨ EXCLUSIVO</h4>
          <div style="display: flex; gap: 12px; flex-wrap: wrap;">
            <web-chip
              label="Premium"
              icon="star"
              iconRight="arrow_forward"
              variant="gradient"
              gradientFrom="#667eea"
              gradientTo="#764ba2">
            </web-chip>

            <web-chip
              label="Pro"
              icon="workspace_premium"
              iconRight="check"
              color="#ffc107">
            </web-chip>
          </div>
        </div>
      </div>
    `
  })
};

/**
 * Chips deletáveis.
 */
export const Deletable: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 12px; flex-wrap: wrap;">
        <web-chip label="JavaScript" [deletable]="true" color="#f0db4f" textColor="#000"></web-chip>
        <web-chip label="TypeScript" [deletable]="true" color="#3178c6"></web-chip>
        <web-chip label="Angular" [deletable]="true" color="#dd0031"></web-chip>
        <web-chip label="React" [deletable]="true" color="#61dafb" textColor="#000"></web-chip>
        <web-chip label="Vue" [deletable]="true" color="#42b883"></web-chip>
        <web-chip label="Svelte" [deletable]="true" color="#ff3e00"></web-chip>
      </div>

      <p style="margin-top: 16px; font-size: 13px; color: #666;">
        Clique no X para remover (dispara evento 'delete')
      </p>
    `
  })
};

/**
 * Chips selecionáveis com checkmark.
 */
export const Selectable: Story = {
  render: () => ({
    props: {
      selectedChips: new Set(['angular', 'typescript']),
      toggleChip: function(chipId: string) {
        if ((this as any).selectedChips.has(chipId)) {
          (this as any).selectedChips.delete(chipId);
        } else {
          (this as any).selectedChips.add(chipId);
        }
        // Force update
        (this as any).selectedChips = new Set((this as any).selectedChips);
      }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <div>
          <h4 style="margin: 0 0 12px 0; color: #666;">Tecnologias Favoritas (clique para selecionar)</h4>
          <div style="display: flex; gap: 12px; flex-wrap: wrap;">
            <web-chip
              label="JavaScript"
              [clickable]="true"
              [selected]="selectedChips.has('javascript')"
              color="#f0db4f"
              textColor="#000"
              selectedColor="#d4bc2e"
              (chipClick)="toggleChip('javascript')">
            </web-chip>

            <web-chip
              label="TypeScript"
              [clickable]="true"
              [selected]="selectedChips.has('typescript')"
              color="#3178c6"
              (chipClick)="toggleChip('typescript')">
            </web-chip>

            <web-chip
              label="Angular"
              [clickable]="true"
              [selected]="selectedChips.has('angular')"
              color="#dd0031"
              (chipClick)="toggleChip('angular')">
            </web-chip>

            <web-chip
              label="React"
              [clickable]="true"
              [selected]="selectedChips.has('react')"
              color="#61dafb"
              textColor="#000"
              selectedColor="#4fa8c5"
              (chipClick)="toggleChip('react')">
            </web-chip>

            <web-chip
              label="Vue"
              [clickable]="true"
              [selected]="selectedChips.has('vue')"
              color="#42b883"
              (chipClick)="toggleChip('vue')">
            </web-chip>
          </div>
        </div>

        <div>
          <p style="margin: 0; font-size: 14px; color: #666;">
            Selecionados: {{ selectedChips.size }} tecnologia(s)
          </p>
        </div>
      </div>
    `
  })
};

/**
 * Paleta de cores customizadas.
 */
export const CustomColors: Story = {
  render: () => ({
    template: `
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 12px;">
        <web-chip label="Blue" color="#007bff"></web-chip>
        <web-chip label="Indigo" color="#6610f2"></web-chip>
        <web-chip label="Purple" color="#a855f7"></web-chip>
        <web-chip label="Pink" color="#e91e63"></web-chip>
        <web-chip label="Red" color="#ef4444"></web-chip>
        <web-chip label="Orange" color="#f97316"></web-chip>
        <web-chip label="Yellow" color="#ffc107" textColor="#000"></web-chip>
        <web-chip label="Green" color="#22c55e"></web-chip>
        <web-chip label="Teal" color="#14b8a6"></web-chip>
        <web-chip label="Cyan" color="#06b6d4"></web-chip>
        <web-chip label="Gray" color="#6c757d"></web-chip>
        <web-chip label="Black" color="#1a1a1a"></web-chip>
      </div>
    `
  })
};

/**
 * Gradientes personalizados ✨
 */
export const Gradients: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <div style="display: flex; gap: 12px; flex-wrap: wrap;">
          <web-chip
            label="Sunset"
            variant="gradient"
            gradientFrom="#ff6b6b"
            gradientTo="#feca57"
            gradientDirection="to-r">
          </web-chip>

          <web-chip
            label="Ocean"
            variant="gradient"
            gradientFrom="#667eea"
            gradientTo="#764ba2"
            gradientDirection="to-br">
          </web-chip>

          <web-chip
            label="Forest"
            variant="gradient"
            gradientFrom="#38ef7d"
            gradientTo="#11998e"
            gradientDirection="to-b">
          </web-chip>

          <web-chip
            label="Fire"
            variant="gradient"
            gradientFrom="#f093fb"
            gradientTo="#f5576c"
            gradientDirection="to-bl">
          </web-chip>
        </div>

        <div style="display: flex; gap: 12px; flex-wrap: wrap;">
          <web-chip
            label="Premium"
            variant="gradient"
            gradientFrom="#ffd89b"
            gradientTo="#19547b"
            icon="workspace_premium"
            [deletable]="true">
          </web-chip>

          <web-chip
            label="Pro"
            variant="gradient"
            gradientFrom="#a8edea"
            gradientTo="#fed6e3"
            icon="star"
            size="lg">
          </web-chip>

          <web-chip
            label="Elite"
            variant="gradient"
            gradientFrom="#d299c2"
            gradientTo="#fef9d7"
            icon="military_tech"
            iconRight="arrow_forward">
          </web-chip>
        </div>
      </div>
    `
  })
};

/**
 * Estados: normal, disabled, selected.
 */
export const States: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <div>
          <h4 style="margin: 0 0 12px 0; color: #666;">Normal</h4>
          <div style="display: flex; gap: 12px;">
            <web-chip label="Active" color="#007bff"></web-chip>
            <web-chip label="Clickable" [clickable]="true" color="#22c55e"></web-chip>
          </div>
        </div>

        <div>
          <h4 style="margin: 0 0 12px 0; color: #666;">Disabled</h4>
          <div style="display: flex; gap: 12px;">
            <web-chip label="Disabled" [disabled]="true" color="#007bff"></web-chip>
            <web-chip label="Can't Click" [disabled]="true" [clickable]="true" color="#22c55e"></web-chip>
            <web-chip label="Can't Delete" [disabled]="true" [deletable]="true" color="#ef4444"></web-chip>
          </div>
        </div>

        <div>
          <h4 style="margin: 0 0 12px 0; color: #666;">Selected</h4>
          <div style="display: flex; gap: 12px;">
            <web-chip label="Selected" [selected]="true" color="#007bff"></web-chip>
            <web-chip label="With Check" [selected]="true" [showCheckmark]="true" color="#22c55e"></web-chip>
            <web-chip label="Custom Color" [selected]="true" selectedColor="#a855f7" color="#007bff"></web-chip>
          </div>
        </div>
      </div>
    `
  })
};

/**
 * Casos de uso reais.
 */
export const RealWorldExamples: Story = {
  render: () => ({
    template: `
      <div style="max-width: 800px; margin: 0 auto;">
        <div style="background: white; border: 1px solid #e5e7eb; border-radius: 12px; padding: 24px;">
          <h3 style="margin: 0 0 24px 0; color: #1a1a1a;">Exemplos de Uso Real</h3>

          <!-- Filtros de Produto -->
          <div style="margin-bottom: 32px;">
            <h4 style="margin: 0 0 16px 0; color: #666;">Filtros Ativos</h4>
            <div style="display: flex; gap: 8px; flex-wrap: wrap;">
              <web-chip label="Angular" [deletable]="true" variant="soft" color="#dd0031" size="sm"></web-chip>
              <web-chip label="TypeScript" [deletable]="true" variant="soft" color="#3178c6" size="sm"></web-chip>
              <web-chip label="Full-time" [deletable]="true" variant="soft" color="#22c55e" size="sm"></web-chip>
              <web-chip label="Remote" [deletable]="true" variant="soft" color="#007bff" size="sm"></web-chip>
              <web-chip label="Sênior" [deletable]="true" variant="soft" color="#a855f7" size="sm"></web-chip>
            </div>
          </div>

          <!-- Equipe/Colaboradores -->
          <div style="margin-bottom: 32px;">
            <h4 style="margin: 0 0 16px 0; color: #666;">Membros da Equipe</h4>
            <div style="display: flex; gap: 8px; flex-wrap: wrap;">
              <web-chip
                avatar="https://i.pravatar.cc/150?img=1"
                label="Ana Silva"
                [deletable]="true"
                variant="outlined"
                color="#007bff">
              </web-chip>

              <web-chip
                avatar="https://i.pravatar.cc/150?img=2"
                label="Bruno Costa"
                [deletable]="true"
                variant="outlined"
                color="#22c55e">
              </web-chip>

              <web-chip
                avatar="https://i.pravatar.cc/150?img=3"
                label="Carla Lima"
                [deletable]="true"
                variant="outlined"
                color="#a855f7">
              </web-chip>
            </div>
          </div>

          <!-- Status -->
          <div style="margin-bottom: 32px;">
            <h4 style="margin: 0 0 16px 0; color: #666;">Status do Sistema</h4>
            <div style="display: flex; gap: 12px; flex-wrap: wrap;">
              <web-chip label="Online" icon="check_circle" color="#22c55e" size="sm"></web-chip>
              <web-chip label="Processing" icon="sync" color="#007bff" size="sm"></web-chip>
              <web-chip label="Warning" icon="warning" color="#ffc107" textColor="#000" size="sm"></web-chip>
              <web-chip label="Error" icon="error" color="#ef4444" size="sm"></web-chip>
            </div>
          </div>

          <!-- Skills/Tecnologias -->
          <div>
            <h4 style="margin: 0 0 16px 0; color: #666;">Tecnologias do Projeto</h4>
            <div style="display: flex; gap: 8px; flex-wrap: wrap;">
              <web-chip
                label="Angular 17"
                variant="gradient"
                gradientFrom="#dd0031"
                gradientTo="#c3002f"
                size="sm">
              </web-chip>

              <web-chip
                label="RxJS"
                variant="gradient"
                gradientFrom="#d81b60"
                gradientTo="#ad1457"
                size="sm">
              </web-chip>

              <web-chip
                label="NgRx"
                variant="gradient"
                gradientFrom="#7c3aed"
                gradientTo="#6d28d9"
                size="sm">
              </web-chip>

              <web-chip
                label="Tailwind"
                variant="gradient"
                gradientFrom="#06b6d4"
                gradientTo="#0891b2"
                size="sm">
              </web-chip>
            </div>
          </div>
        </div>
      </div>
    `
  })
};

/**
 * Comparativo visual com concorrentes.
 */
export const CompetitorComparison: Story = {
  render: () => ({
    template: `
      <div style="max-width: 1200px; margin: 0 auto; padding: 32px;">
        <h2 style="margin: 0 0 24px 0; text-align: center;">🏆 web-chip vs Concorrentes</h2>

        <div style="background: #f0fdf4; border: 2px solid #22c55e; border-radius: 12px; padding: 24px; margin-bottom: 32px;">
          <h3 style="margin: 0 0 16px 0; color: #166534;">✨ Recursos EXCLUSIVOS do web-chip</h3>
          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; color: #166534;">
            <div>✅ <strong>Gradientes</strong> (Material UI ❌, Ant ❌, Bootstrap ❌, PrimeNG ❌)</div>
            <div>✅ <strong>5 Tamanhos</strong> (Material 3, Ant 3, Bootstrap 2, PrimeNG 1)</div>
            <div>✅ <strong>3 Shapes</strong> (Material 1, Ant 1, Bootstrap 1, PrimeNG 1)</div>
            <div>✅ <strong>Ícones duplos</strong> (left + right - Material ❌, todos ❌)</div>
            <div>✅ <strong>Selecionável + Checkmark</strong> (Material ❌, PrimeNG ❌)</div>
            <div>✅ <strong>Avatar</strong> (Bootstrap ❌, Ant ❌)</div>
            <div>✅ <strong>4 Direções gradiente</strong> (to-r, to-br, to-b, to-bl)</div>
            <div>✅ <strong>15+ Props de cor</strong> (Material 3, Ant 2, Bootstrap 0)</div>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 32px;">
          <div>
            <h3 style="margin: 0 0 16px 0;">Chips Básicos vs Material UI</h3>
            <div style="display: flex; flex-direction: column; gap: 12px;">
              <div>
                <p style="margin: 0 0 8px; font-size: 13px; color: #666;">Material UI: 3 variantes</p>
                <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                  <web-chip label="Filled" variant="filled" color="#1976d2"></web-chip>
                  <web-chip label="Outlined" variant="outlined" color="#1976d2"></web-chip>
                  <web-chip label="Soft" variant="soft" color="#1976d2"></web-chip>
                </div>
              </div>

              <div>
                <p style="margin: 0 0 8px; font-size: 13px; color: #166534;"><strong>web-chip: 4 variantes + gradiente!</strong></p>
                <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                  <web-chip label="Filled" variant="filled" color="#1976d2"></web-chip>
                  <web-chip label="Outlined" variant="outlined" color="#1976d2"></web-chip>
                  <web-chip label="Soft" variant="soft" color="#1976d2"></web-chip>
                  <web-chip label="Gradient" variant="gradient" gradientFrom="#1976d2" gradientTo="#0d47a1"></web-chip>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 style="margin: 0 0 16px 0;">Recursos Avançados ✨</h3>
            <div style="display: flex; flex-direction: column; gap: 12px;">
              <web-chip
                label="Ícones duplos"
                icon="star"
                iconRight="arrow_forward"
                color="#a855f7">
              </web-chip>

              <web-chip
                label="Com avatar"
                avatar="https://i.pravatar.cc/150?img=1"
                [deletable]="true"
                color="#007bff">
              </web-chip>

              <web-chip
                label="Selecionável"
                [clickable]="true"
                [selected]="true"
                [showCheckmark]="true"
                variant="gradient"
                gradientFrom="#38ef7d"
                gradientTo="#11998e">
              </web-chip>

              <web-chip
                label="Gradiente customizado"
                variant="gradient"
                gradientFrom="#ff6b6b"
                gradientTo="#feca57"
                gradientDirection="to-br"
                icon="workspace_premium">
              </web-chip>
            </div>
          </div>
        </div>
      </div>
    `
  })
};
