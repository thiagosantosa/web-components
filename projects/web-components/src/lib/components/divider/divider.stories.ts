import type { Meta, StoryObj } from '@storybook/angular';
import { DividerComponent } from './divider.component';

/**
 * # Divider Component
 *
 * Um componente divisor versátil e moderno que vai muito além dos concorrentes,
 * oferecendo recursos avançados como gradientes, avatares, animações e múltiplos estilos.
 *
 * ## 🎯 Principais Funcionalidades
 *
 * ### Orientações
 * - **horizontal**: Divisor horizontal (padrão) - separa conteúdo verticalmente
 * - **vertical**: Divisor vertical - separa conteúdo horizontalmente (sidebars, layouts)
 *
 * ### Variantes Visuais
 * - **solid**: Linha sólida contínua (padrão)
 * - **dashed**: Linha tracejada
 * - **dotted**: Linha pontilhada
 * - **double**: Linha dupla (estilo clássico)
 * - **gradient**: Gradiente suave e moderno ✨
 *
 * ### Espessuras
 * - **thin**: Linha fina e delicada (1px)
 * - **medium**: Espessura média (2px)
 * - **thick**: Linha grossa e marcante (4px)
 *
 * ### Alinhamento de Conteúdo
 * - **left**: Conteúdo alinhado à esquerda
 * - **center**: Conteúdo centralizado (padrão)
 * - **right**: Conteúdo alinhado à direita
 *
 * ## 📦 Recursos Avançados
 *
 * ### Conteúdo no Divisor
 * - **Texto**: Adicione texto explicativo
 * - **Ícone**: Ícone Material Symbols
 * - **Avatar**: Foto de perfil ou iniciais
 * - **Slot Customizado**: Qualquer conteúdo HTML via `<ng-content>`
 *
 * ### Customização Visual
 * - **Cores**: Linha, texto e ícone totalmente customizáveis
 * - **Tamanho do Texto**: Ajustável em pixels
 * - **Espaçamento**: Margin customizável
 * - **Animação**: Efeito de fade suave
 * - **Gradientes**: Cores de início e fim configuráveis
 *
 * ## 🔧 Como Usar
 *
 * ### Importação
 * ```typescript
 * import { DividerComponent } from '@thiagosantosa/web-components';
 *
 * @Component({
 *   imports: [DividerComponent],
 *   // ...
 * })
 * ```
 *
 * ### Exemplo Básico (Linha Simples)
 * ```html
 * <web-divider></web-divider>
 * ```
 *
 * ### Divisor com Texto
 * ```html
 * <web-divider text="OU"></web-divider>
 * ```
 *
 * ### Divisor com Ícone
 * ```html
 * <web-divider
 *   icon="star"
 *   iconColor="#ffc107">
 * </web-divider>
 * ```
 *
 * ### Divisor com Texto e Alinhamento
 * ```html
 * <web-divider
 *   text="Início da seção"
 *   textAlign="left">
 * </web-divider>
 * ```
 *
 * ### Divisor Vertical (Sidebars/Toolbars)
 * ```html
 * <div style="display: flex; height: 200px;">
 *   <div>Conteúdo Esquerda</div>
 *   <web-divider orientation="vertical"></web-divider>
 *   <div>Conteúdo Direita</div>
 * </div>
 * ```
 *
 * ### Divisor com Gradiente
 * ```html
 * <web-divider
 *   variant="gradient"
 *   gradientStart="#667eea"
 *   gradientEnd="#764ba2">
 * </web-divider>
 * ```
 *
 * ### Divisor com Avatar
 * ```html
 * <web-divider
 *   avatar="https://i.pravatar.cc/150"
 *   text="Maria Silva">
 * </web-divider>
 * ```
 *
 * ### Divisor Tracejado Personalizado
 * ```html
 * <web-divider
 *   variant="dashed"
 *   thickness="medium"
 *   lineColor="#007bff"
 *   spacing="24px 0">
 * </web-divider>
 * ```
 *
 * ### Divisor com Conteúdo Customizado
 * ```html
 * <web-divider>
 *   <button>Carregar Mais</button>
 * </web-divider>
 * ```
 *
 * ### Divisor Animado
 * ```html
 * <web-divider
 *   [animated]="true"
 *   variant="gradient">
 * </web-divider>
 * ```
 *
 * ## 📋 Props Principais
 *
 * | Prop | Tipo | Default | Descrição |
 * |------|------|---------|-----------|
 * | orientation | 'horizontal' \| 'vertical' | 'horizontal' | Orientação do divisor |
 * | variant | DividerVariant | 'solid' | Estilo visual da linha |
 * | thickness | 'thin' \| 'medium' \| 'thick' | 'thin' | Espessura da linha |
 * | textAlign | 'left' \| 'center' \| 'right' | 'center' | Alinhamento do conteúdo |
 * | text | string | '' | Texto a ser exibido |
 * | icon | string | '' | Ícone Material Symbols |
 * | avatar | string | '' | URL ou iniciais do avatar |
 * | lineColor | string | '#e0e0e0' | Cor da linha |
 * | textColor | string | '#666666' | Cor do texto |
 * | iconColor | string | '#666666' | Cor do ícone |
 * | textSize | number | 14 | Tamanho do texto (px) |
 * | spacing | string | '16px 0' | Espaçamento (margin) |
 * | animated | boolean | false | Ativa animação |
 * | gradientStart | string | '#667eea' | Cor inicial do gradiente |
 * | gradientEnd | string | '#764ba2' | Cor final do gradiente |
 *
 * ## 💡 Casos de Uso
 *
 * 1. **Formulários**: Separar seções de um formulário longo
 * 2. **Login**: Divisor "OU" entre login social e email/senha
 * 3. **Listas**: Separar grupos de items
 * 4. **Timeline**: Marcadores de tempo/eventos
 * 5. **Sidebars**: Separação visual vertical
 * 6. **Comentários**: Separar threads de discussão
 * 7. **Layouts**: Organizar seções visuais
 * 8. **Headers**: Títulos decorativos de seção
 *
 * ## 🎨 Exemplos de Design
 *
 * ### Login Social
 * ```html
 * <button>Login com Google</button>
 * <web-divider text="OU" textColor="#999"></web-divider>
 * <button>Login com Email</button>
 * ```
 *
 * ### Seção de Página
 * ```html
 * <web-divider
 *   text="Produtos em Destaque"
 *   textAlign="left"
 *   icon="star"
 *   iconColor="#ffc107"
 *   lineColor="#ffc107">
 * </web-divider>
 * ```
 *
 * ### Timeline de Eventos
 * ```html
 * <web-divider
 *   text="Hoje"
 *   textAlign="left"
 *   thickness="medium"
 *   lineColor="#007bff">
 * </web-divider>
 * ```
 *
 * ### Separador Decorativo
 * ```html
 * <web-divider
 *   variant="gradient"
 *   gradientStart="#f093fb"
 *   gradientEnd="#f5576c"
 *   thickness="thick">
 * </web-divider>
 * ```
 *
 * ## 🆚 Comparação com Concorrentes
 *
 * | Feature | Material UI | Ant Design | Bootstrap | **web-divider** |
 * |---------|-------------|------------|-----------|-----------------|
 * | Variantes | 1 (solid) | 2 (solid, dashed) | 1 (solid) | **5** ✨ |
 * | Gradiente | ❌ | ❌ | ❌ | **✅** ✨ |
 * | Avatar | ❌ | ❌ | ❌ | **✅** ✨ |
 * | Animação | ❌ | ❌ | ❌ | **✅** ✨ |
 * | Vertical | ✅ | ✅ | ❌ | **✅** |
 * | Ícones | ❌ | ❌ | ❌ | **✅** ✨ |
 * | Espessuras | 1 | 1 | 1 | **3** ✨ |
 * | Alinhamento | 3 | 3 | 1 | **3** |
 */
const meta: Meta<DividerComponent> = {
  title: 'Layout/Divider',
  component: DividerComponent,
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Orientação do divisor'
    },
    variant: {
      control: 'select',
      options: ['solid', 'dashed', 'dotted', 'double', 'gradient'],
      description: 'Estilo visual da linha'
    },
    thickness: {
      control: 'select',
      options: ['thin', 'medium', 'thick'],
      description: 'Espessura da linha'
    },
    textAlign: {
      control: 'select',
      options: ['left', 'center', 'right'],
      description: 'Alinhamento do conteúdo'
    },
    animated: {
      control: 'boolean',
      description: 'Ativa animação de fade'
    },
    lineColor: {
      control: 'color',
      description: 'Cor da linha'
    },
    textColor: {
      control: 'color',
      description: 'Cor do texto'
    }
  }
};

export default meta;
type Story = StoryObj<DividerComponent>;

/**
 * Divisor básico sem conteúdo - linha simples e clean.
 */
export const Basic: Story = {
  args: {
    variant: 'solid',
    thickness: 'thin',
    lineColor: '#e0e0e0'
  }
};

/**
 * Comparação de todas as variantes visuais disponíveis.
 */
export const Variants: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 32px;">
        <div>
          <h4 style="margin: 0 0 16px 0; color: #666;">Solid (Sólido)</h4>
          <web-divider variant="solid"></web-divider>
        </div>

        <div>
          <h4 style="margin: 0 0 16px 0; color: #666;">Dashed (Tracejado)</h4>
          <web-divider variant="dashed"></web-divider>
        </div>

        <div>
          <h4 style="margin: 0 0 16px 0; color: #666;">Dotted (Pontilhado)</h4>
          <web-divider variant="dotted"></web-divider>
        </div>

        <div>
          <h4 style="margin: 0 0 16px 0; color: #666;">Double (Duplo)</h4>
          <web-divider variant="double"></web-divider>
        </div>

        <div>
          <h4 style="margin: 0 0 16px 0; color: #666;">Gradient (Gradiente) ✨</h4>
          <web-divider
            variant="gradient"
            gradientStart="#667eea"
            gradientEnd="#764ba2">
          </web-divider>
        </div>
      </div>
    `
  })
};

/**
 * Diferentes espessuras de linha.
 */
export const Thickness: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 32px;">
        <div>
          <h4 style="margin: 0 0 16px 0; color: #666;">Thin (Fino) - 1px</h4>
          <web-divider thickness="thin" lineColor="#007bff"></web-divider>
        </div>

        <div>
          <h4 style="margin: 0 0 16px 0; color: #666;">Medium (Médio) - 2px</h4>
          <web-divider thickness="medium" lineColor="#007bff"></web-divider>
        </div>

        <div>
          <h4 style="margin: 0 0 16px 0; color: #666;">Thick (Grosso) - 4px</h4>
          <web-divider thickness="thick" lineColor="#007bff"></web-divider>
        </div>
      </div>
    `
  })
};

/**
 * Divisor com texto em diferentes alinhamentos.
 */
export const WithText: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 32px;">
        <div>
          <h4 style="margin: 0 0 16px 0; color: #666;">Texto à Esquerda</h4>
          <web-divider text="Início da seção" textAlign="left"></web-divider>
        </div>

        <div>
          <h4 style="margin: 0 0 16px 0; color: #666;">Texto Centralizado</h4>
          <web-divider text="OU" textAlign="center"></web-divider>
        </div>

        <div>
          <h4 style="margin: 0 0 16px 0; color: #666;">Texto à Direita</h4>
          <web-divider text="Final da seção" textAlign="right"></web-divider>
        </div>
      </div>
    `
  })
};

/**
 * Divisor com ícones Material Symbols.
 */
export const WithIcon: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 32px;">
        <web-divider icon="star" iconColor="#ffc107"></web-divider>

        <web-divider
          text="Favoritos"
          icon="favorite"
          iconColor="#e91e63"
          textColor="#e91e63">
        </web-divider>

        <web-divider
          text="Verificado"
          icon="verified"
          iconColor="#4caf50"
          textColor="#4caf50"
          textAlign="left">
        </web-divider>

        <web-divider
          icon="schedule"
          iconColor="#ff9800"
          textAlign="right">
        </web-divider>
      </div>
    `
  })
};

/**
 * Divisor com avatar - ideal para comentários e perfis.
 */
export const WithAvatar: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 32px;">
        <web-divider
          avatar="https://i.pravatar.cc/150?img=1"
          text="Maria Silva">
        </web-divider>

        <web-divider
          avatar="https://i.pravatar.cc/150?img=2"
          text="João Santos"
          textAlign="left">
        </web-divider>

        <web-divider
          avatar="MS"
          text="Marcos Silva">
        </web-divider>
      </div>
    `
  })
};

/**
 * Divisores com gradientes customizados.
 */
export const GradientStyles: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 32px;">
        <div>
          <h4 style="margin: 0 0 16px 0; color: #666;">Roxo → Rosa</h4>
          <web-divider
            variant="gradient"
            gradientStart="#667eea"
            gradientEnd="#764ba2"
            thickness="medium">
          </web-divider>
        </div>

        <div>
          <h4 style="margin: 0 0 16px 0; color: #666;">Azul → Verde</h4>
          <web-divider
            variant="gradient"
            gradientStart="#00d2ff"
            gradientEnd="#3a7bd5"
            thickness="medium">
          </web-divider>
        </div>

        <div>
          <h4 style="margin: 0 0 16px 0; color: #666;">Rosa → Laranja</h4>
          <web-divider
            variant="gradient"
            gradientStart="#f093fb"
            gradientEnd="#f5576c"
            thickness="thick">
          </web-divider>
        </div>

        <div>
          <h4 style="margin: 0 0 16px 0; color: #666;">Verde → Azul</h4>
          <web-divider
            variant="gradient"
            gradientStart="#4facfe"
            gradientEnd="#00f2fe"
            thickness="medium">
          </web-divider>
        </div>
      </div>
    `
  })
};

/**
 * Divisor vertical - para sidebars e layouts horizontais.
 */
export const Vertical: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 24px; height: 200px; align-items: stretch;">
        <div style="flex: 1; padding: 16px; background: #f5f5f5; border-radius: 8px;">
          <h4 style="margin: 0 0 12px 0;">Coluna 1</h4>
          <p style="margin: 0; color: #666;">Conteúdo da primeira coluna.</p>
        </div>

        <web-divider orientation="vertical"></web-divider>

        <div style="flex: 1; padding: 16px; background: #f5f5f5; border-radius: 8px;">
          <h4 style="margin: 0 0 12px 0;">Coluna 2</h4>
          <p style="margin: 0; color: #666;">Conteúdo da segunda coluna.</p>
        </div>

        <web-divider
          orientation="vertical"
          variant="dashed"
          thickness="medium"
          lineColor="#007bff">
        </web-divider>

        <div style="flex: 1; padding: 16px; background: #f5f5f5; border-radius: 8px;">
          <h4 style="margin: 0 0 12px 0;">Coluna 3</h4>
          <p style="margin: 0; color: #666;">Conteúdo da terceira coluna.</p>
        </div>
      </div>
    `
  })
};

/**
 * Divisor vertical com conteúdo - ideal para toolbars.
 */
export const VerticalWithContent: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 24px; height: 200px; align-items: center;">
        <button style="padding: 8px 16px; border: 1px solid #ddd; border-radius: 4px; background: white; cursor: pointer;">
          Botão 1
        </button>

        <web-divider
          orientation="vertical"
          icon="more_vert"
          iconColor="#666">
        </web-divider>

        <button style="padding: 8px 16px; border: 1px solid #ddd; border-radius: 4px; background: white; cursor: pointer;">
          Botão 2
        </button>

        <web-divider
          orientation="vertical"
          thickness="medium"
          lineColor="#007bff">
        </web-divider>

        <button style="padding: 8px 16px; border: 1px solid #ddd; border-radius: 4px; background: white; cursor: pointer;">
          Botão 3
        </button>
      </div>
    `
  })
};

/**
 * Divisor animado com efeito de fade.
 */
export const Animated: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 32px;">
        <div>
          <h4 style="margin: 0 0 16px 0; color: #666;">Animação Simples</h4>
          <web-divider
            [animated]="true"
            thickness="medium"
            lineColor="#007bff">
          </web-divider>
        </div>

        <div>
          <h4 style="margin: 0 0 16px 0; color: #666;">Animação com Gradiente</h4>
          <web-divider
            variant="gradient"
            [animated]="true"
            gradientStart="#f093fb"
            gradientEnd="#f5576c"
            thickness="thick">
          </web-divider>
        </div>

        <div>
          <h4 style="margin: 0 0 16px 0; color: #666;">Animação com Texto</h4>
          <web-divider
            text="Carregando..."
            [animated]="true"
            thickness="medium"
            lineColor="#ffc107"
            textColor="#ffc107"
            icon="sync"
            iconColor="#ffc107">
          </web-divider>
        </div>
      </div>
    `
  })
};

/**
 * Caso de uso: Formulário de Login com divisor "OU".
 */
export const LoginForm: Story = {
  render: () => ({
    template: `
      <div style="max-width: 400px; margin: 0 auto; padding: 32px; background: white; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
        <h2 style="margin: 0 0 24px 0; text-align: center;">Login</h2>

        <button style="width: 100%; padding: 12px; margin-bottom: 12px; border: 1px solid #ddd; border-radius: 6px; background: white; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px;">
          <span>🔵</span> Continuar com Google
        </button>

        <button style="width: 100%; padding: 12px; margin-bottom: 24px; border: 1px solid #ddd; border-radius: 6px; background: white; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px;">
          <span>📘</span> Continuar com Facebook
        </button>

        <web-divider text="OU" textColor="#999" spacing="24px 0"></web-divider>

        <input type="email" placeholder="Email" style="width: 100%; padding: 12px; margin-bottom: 12px; border: 1px solid #ddd; border-radius: 6px; box-sizing: border-box;">

        <input type="password" placeholder="Senha" style="width: 100%; padding: 12px; margin-bottom: 24px; border: 1px solid #ddd; border-radius: 6px; box-sizing: border-box;">

        <button style="width: 100%; padding: 12px; border: none; border-radius: 6px; background: #007bff; color: white; font-weight: 600; cursor: pointer;">
          Entrar
        </button>
      </div>
    `
  })
};

/**
 * Caso de uso: Timeline de eventos com divisores decorativos.
 */
export const Timeline: Story = {
  render: () => ({
    template: `
      <div style="max-width: 600px; margin: 0 auto;">
        <web-divider
          text="Hoje"
          textAlign="left"
          thickness="medium"
          lineColor="#007bff"
          textColor="#007bff"
          [textSize]="16"
          spacing="32px 0 24px 0">
        </web-divider>

        <div style="padding: 16px; margin-bottom: 16px; background: #f5f5f5; border-radius: 8px;">
          <p style="margin: 0; color: #666;">Reunião de equipe às 14h</p>
        </div>

        <div style="padding: 16px; margin-bottom: 32px; background: #f5f5f5; border-radius: 8px;">
          <p style="margin: 0; color: #666;">Apresentação do projeto às 16h</p>
        </div>

        <web-divider
          text="Ontem"
          textAlign="left"
          thickness="medium"
          lineColor="#6c757d"
          textColor="#6c757d"
          [textSize]="16"
          spacing="32px 0 24px 0">
        </web-divider>

        <div style="padding: 16px; margin-bottom: 16px; background: #f5f5f5; border-radius: 8px;">
          <p style="margin: 0; color: #666;">Code review com a equipe</p>
        </div>

        <div style="padding: 16px; margin-bottom: 32px; background: #f5f5f5; border-radius: 8px;">
          <p style="margin: 0; color: #666;">Deploy em produção</p>
        </div>

        <web-divider
          text="Esta Semana"
          textAlign="left"
          variant="dashed"
          textColor="#999"
          [textSize]="14"
          spacing="32px 0 24px 0">
        </web-divider>

        <div style="padding: 16px; background: #f5f5f5; border-radius: 8px;">
          <p style="margin: 0; color: #999;">Eventos anteriores...</p>
        </div>
      </div>
    `
  })
};

/**
 * Caso de uso: Seções de página com divisores decorativos.
 */
export const PageSections: Story = {
  render: () => ({
    template: `
      <div style="max-width: 800px; margin: 0 auto;">
        <web-divider
          text="Produtos em Destaque"
          textAlign="left"
          icon="star"
          iconColor="#ffc107"
          lineColor="#ffc107"
          textColor="#ffc107"
          [textSize]="18"
          thickness="medium"
          spacing="40px 0 32px 0">
        </web-divider>

        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 48px;">
          <div style="padding: 24px; background: #f5f5f5; border-radius: 8px; text-align: center;">
            <p style="margin: 0; font-weight: 600;">Produto 1</p>
          </div>
          <div style="padding: 24px; background: #f5f5f5; border-radius: 8px; text-align: center;">
            <p style="margin: 0; font-weight: 600;">Produto 2</p>
          </div>
          <div style="padding: 24px; background: #f5f5f5; border-radius: 8px; text-align: center;">
            <p style="margin: 0; font-weight: 600;">Produto 3</p>
          </div>
        </div>

        <web-divider
          text="Avaliações de Clientes"
          textAlign="left"
          icon="reviews"
          iconColor="#4caf50"
          lineColor="#4caf50"
          textColor="#4caf50"
          [textSize]="18"
          thickness="medium"
          spacing="40px 0 32px 0">
        </web-divider>

        <div style="padding: 24px; background: #f5f5f5; border-radius: 8px; margin-bottom: 48px;">
          <p style="margin: 0; color: #666;">★★★★★ Excelente produto! Recomendo.</p>
        </div>

        <web-divider
          variant="gradient"
          gradientStart="#667eea"
          gradientEnd="#764ba2"
          thickness="thick"
          spacing="48px 0">
        </web-divider>
      </div>
    `
  })
};

/**
 * Showcase completo com todas as combinações possíveis.
 */
export const CompleteShowcase: Story = {
  render: () => ({
    template: `
      <div style="max-width: 900px; margin: 0 auto; padding: 32px;">
        <h2 style="margin: 0 0 32px 0; text-align: center;">Web Divider - Showcase Completo</h2>

        <section style="margin-bottom: 48px;">
          <h3 style="margin: 0 0 24px 0; color: #333;">Variantes</h3>
          <web-divider variant="solid" spacing="16px 0"></web-divider>
          <web-divider variant="dashed" spacing="16px 0"></web-divider>
          <web-divider variant="dotted" spacing="16px 0"></web-divider>
          <web-divider variant="double" spacing="16px 0"></web-divider>
          <web-divider variant="gradient" spacing="16px 0"></web-divider>
        </section>

        <section style="margin-bottom: 48px;">
          <h3 style="margin: 0 0 24px 0; color: #333;">Com Conteúdo</h3>
          <web-divider text="Texto Simples" spacing="16px 0"></web-divider>
          <web-divider text="Com Ícone" icon="favorite" iconColor="#e91e63" textColor="#e91e63" spacing="16px 0"></web-divider>
          <web-divider avatar="https://i.pravatar.cc/150" text="Com Avatar" spacing="16px 0"></web-divider>
        </section>

        <section style="margin-bottom: 48px;">
          <h3 style="margin: 0 0 24px 0; color: #333;">Alinhamentos</h3>
          <web-divider text="Esquerda" textAlign="left" spacing="16px 0"></web-divider>
          <web-divider text="Centro" textAlign="center" spacing="16px 0"></web-divider>
          <web-divider text="Direita" textAlign="right" spacing="16px 0"></web-divider>
        </section>

        <section>
          <h3 style="margin: 0 0 24px 0; color: #333;">Gradientes Coloridos</h3>
          <web-divider variant="gradient" gradientStart="#f093fb" gradientEnd="#f5576c" thickness="thick" spacing="16px 0"></web-divider>
          <web-divider variant="gradient" gradientStart="#4facfe" gradientEnd="#00f2fe" thickness="thick" spacing="16px 0"></web-divider>
          <web-divider variant="gradient" gradientStart="#43e97b" gradientEnd="#38f9d7" thickness="thick" spacing="16px 0"></web-divider>
        </section>
      </div>
    `
  })
};
