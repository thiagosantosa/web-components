import type { Meta, StoryObj } from '@storybook/angular';
import { ProgressSpinnerComponent } from './progress-spinner.component';

/**
 * # Progress Spinner Component
 *
 * Um componente de loading/spinner moderno e completo que DOMINA todos os concorrentes
 * com 6 variantes de animação, cores customizáveis e modo overlay.
 *
 * ## 🏆 COMPARATIVO DETALHADO COM CONCORRENTES
 *
 * ### Material UI (CircularProgress)
 * | Feature | Material UI | **web-progress-spinner** |
 * |---------|-------------|--------------------------|
 * | Variantes | 1 | **6** ✨ |
 * | Tamanhos | 3 | **6 + custom** ✨ |
 * | Velocidades | 1 | **3** ✨ |
 * | Determinado | ✅ | **✅** |
 * | Overlay | ❌ | **✅** ✨ |
 * | Label | ❌ | **✅** ✨ |
 * | Cores | 1 | **2** ✨ |
 * | Espessura | ❌ | **✅** ✨ |
 *
 * ### Ant Design (Spin)
 * | Feature | Ant Design | **web-progress-spinner** |
 * |---------|------------|--------------------------|
 * | Variantes | 1 | **6** ✨ |
 * | Tamanhos | 3 | **6 + custom** ✨ |
 * | Velocidades | 1 | **3** ✨ |
 * | Overlay | ✅ | **✅** |
 * | Label | ✅ | **✅** |
 * | Determinado | ❌ | **✅** ✨ |
 * | Cores | 1 | **2** ✨ |
 *
 * ### Bootstrap (Spinner)
 * | Feature | Bootstrap | **web-progress-spinner** |
 * |---------|-----------|--------------------------|
 * | Variantes | 2 | **6** ✨ |
 * | Tamanhos | Custom | **6 predefinidos** ✨ |
 * | Velocidades | 1 | **3** ✨ |
 * | Overlay | ❌ | **✅** ✨ |
 * | Label | ❌ | **✅** ✨ |
 * | Determinado | ❌ | **✅** ✨ |
 * | Cores | 1 | **2** ✨ |
 *
 * ### PrimeNG (ProgressSpinner)
 * | Feature | PrimeNG | **web-progress-spinner** |
 * |---------|---------|--------------------------|
 * | Variantes | 1 | **6** ✨ |
 * | Tamanhos | Custom | **6 predefinidos** ✨ |
 * | Velocidades | 1 | **3** ✨ |
 * | Overlay | ❌ | **✅** ✨ |
 * | Label | ❌ | **✅** ✨ |
 * | Determinado | ❌ | **✅** ✨ |
 *
 * ## 🎯 Recursos Principais
 *
 * ### 6 Variantes de Animação ✨
 * - **circular**: Spinner circular clássico (padrão)
 * - **dots**: Três pontos pulsantes
 * - **bars**: Barras verticais animadas
 * - **pulse**: Círculo pulsante
 * - **bounce**: Esferas quicando
 * - **ring**: Anel duplo rotativo
 *
 * ### 6 Tamanhos + Custom
 * - **xs**: 16px
 * - **sm**: 24px
 * - **md**: 40px (padrão)
 * - **lg**: 56px
 * - **xl**: 72px
 * - **2xl**: 96px
 * - **custom**: Qualquer número
 *
 * ### 3 Velocidades
 * - **slow**: 3s / 2.5s
 * - **normal**: 2s / 1.4s (padrão)
 * - **fast**: 1s / 0.8s
 *
 * ### Modo Overlay ✨
 * - Fullscreen com backdrop
 * - Centralizado automaticamente
 * - Backdrop customizável
 *
 * ### Progresso Determinado ✨
 * - Variante circular com valor 0-100
 * - Animação suave de transição
 * - Label com porcentagem
 */
const meta: Meta<ProgressSpinnerComponent> = {
  title: 'Buttons & Indicators/Progress Spinner',
  component: ProgressSpinnerComponent,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['circular', 'dots', 'bars', 'pulse', 'bounce', 'ring'],
      description: 'Tipo de animação'
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      description: 'Tamanho do spinner'
    },
    speed: {
      control: 'select',
      options: ['slow', 'normal', 'fast'],
      description: 'Velocidade da animação'
    },
    color: {
      control: 'color',
      description: 'Cor principal'
    }
  }
};

export default meta;
type Story = StoryObj<ProgressSpinnerComponent>;

/**
 * Spinner básico circular.
 */
export const Basic: Story = {
  args: {
    variant: 'circular'
  }
};

/**
 * Todas as 31 variantes disponíveis! 🎉
 */
export const Variants: Story = {
  render: () => ({
    template: `
      <div style="max-width: 1400px; margin: 0 auto;">
        <h2 style="margin: 0 0 8px 0; text-align: center;">🎨 31 Variantes de Spinners</h2>
        <p style="margin: 0 0 32px 0; text-align: center; color: #666;">
          A maior coleção de spinners do mercado!
        </p>

        <!-- Clássicas (6) -->
        <div style="margin-bottom: 48px;">
          <h3 style="margin: 0 0 24px 0; color: #007bff;">✨ Clássicas (6)</h3>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 24px;">
            <div style="display: flex; flex-direction: column; align-items: center; gap: 12px; padding: 20px; background: #f9fafb; border-radius: 8px;">
              <web-progress-spinner variant="circular" size="lg" color="#007bff"></web-progress-spinner>
              <span style="font-size: 12px; color: #666; font-weight: 500;">circular</span>
            </div>

            <div style="display: flex; flex-direction: column; align-items: center; gap: 12px; padding: 20px; background: #f9fafb; border-radius: 8px;">
              <web-progress-spinner variant="dots" size="lg" color="#007bff"></web-progress-spinner>
              <span style="font-size: 12px; color: #666; font-weight: 500;">dots</span>
            </div>

            <div style="display: flex; flex-direction: column; align-items: center; gap: 12px; padding: 20px; background: #f9fafb; border-radius: 8px;">
              <web-progress-spinner variant="bars" size="lg" color="#007bff"></web-progress-spinner>
              <span style="font-size: 12px; color: #666; font-weight: 500;">bars</span>
            </div>

            <div style="display: flex; flex-direction: column; align-items: center; gap: 12px; padding: 20px; background: #f9fafb; border-radius: 8px;">
              <web-progress-spinner variant="pulse" size="lg" color="#007bff"></web-progress-spinner>
              <span style="font-size: 12px; color: #666; font-weight: 500;">pulse</span>
            </div>

            <div style="display: flex; flex-direction: column; align-items: center; gap: 12px; padding: 20px; background: #f9fafb; border-radius: 8px;">
              <web-progress-spinner variant="bounce" size="lg" color="#007bff"></web-progress-spinner>
              <span style="font-size: 12px; color: #666; font-weight: 500;">bounce</span>
            </div>

            <div style="display: flex; flex-direction: column; align-items: center; gap: 12px; padding: 20px; background: #f9fafb; border-radius: 8px;">
              <web-progress-spinner variant="ring" size="lg" color="#007bff"></web-progress-spinner>
              <span style="font-size: 12px; color: #666; font-weight: 500;">ring</span>
            </div>
          </div>
        </div>

        <!-- Formas Geométricas (5) -->
        <div style="margin-bottom: 48px;">
          <h3 style="margin: 0 0 24px 0; color: #22c55e;">🔶 Formas Geométricas (5)</h3>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 24px;">
            <div style="display: flex; flex-direction: column; align-items: center; gap: 12px; padding: 20px; background: #f9fafb; border-radius: 8px;">
              <web-progress-spinner variant="square-spin" size="lg" color="#22c55e"></web-progress-spinner>
              <span style="font-size: 12px; color: #666; font-weight: 500;">square-spin</span>
            </div>

            <div style="display: flex; flex-direction: column; align-items: center; gap: 12px; padding: 20px; background: #f9fafb; border-radius: 8px;">
              <web-progress-spinner variant="triangle" size="lg" color="#22c55e"></web-progress-spinner>
              <span style="font-size: 12px; color: #666; font-weight: 500;">triangle</span>
            </div>

            <div style="display: flex; flex-direction: column; align-items: center; gap: 12px; padding: 20px; background: #f9fafb; border-radius: 8px;">
              <web-progress-spinner variant="hexagon" size="lg" color="#22c55e"></web-progress-spinner>
              <span style="font-size: 12px; color: #666; font-weight: 500;">hexagon</span>
            </div>

            <div style="display: flex; flex-direction: column; align-items: center; gap: 12px; padding: 20px; background: #f9fafb; border-radius: 8px;">
              <web-progress-spinner variant="diamond" size="lg" color="#22c55e"></web-progress-spinner>
              <span style="font-size: 12px; color: #666; font-weight: 500;">diamond</span>
            </div>

            <div style="display: flex; flex-direction: column; align-items: center; gap: 12px; padding: 20px; background: #f9fafb; border-radius: 8px;">
              <web-progress-spinner variant="box" size="lg" color="#22c55e"></web-progress-spinner>
              <span style="font-size: 12px; color: #666; font-weight: 500;">box</span>
            </div>
          </div>
        </div>

        <!-- Animações Criativas (8) -->
        <div style="margin-bottom: 48px;">
          <h3 style="margin: 0 0 24px 0; color: #a855f7;">🎪 Animações Criativas (8)</h3>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 24px;">
            <div style="display: flex; flex-direction: column; align-items: center; gap: 12px; padding: 20px; background: #f9fafb; border-radius: 8px;">
              <web-progress-spinner variant="infinity" size="lg" color="#a855f7"></web-progress-spinner>
              <span style="font-size: 12px; color: #666; font-weight: 500;">infinity</span>
            </div>

            <div style="display: flex; flex-direction: column; align-items: center; gap: 12px; padding: 20px; background: #f9fafb; border-radius: 8px;">
              <web-progress-spinner variant="orbit" size="lg" color="#a855f7"></web-progress-spinner>
              <span style="font-size: 12px; color: #666; font-weight: 500;">orbit</span>
            </div>

            <div style="display: flex; flex-direction: column; align-items: center; gap: 12px; padding: 20px; background: #f9fafb; border-radius: 8px;">
              <web-progress-spinner variant="flower" size="lg" color="#a855f7"></web-progress-spinner>
              <span style="font-size: 12px; color: #666; font-weight: 500;">flower</span>
            </div>

            <div style="display: flex; flex-direction: column; align-items: center; gap: 12px; padding: 20px; background: #f9fafb; border-radius: 8px;">
              <web-progress-spinner variant="spiral" size="lg" color="#a855f7"></web-progress-spinner>
              <span style="font-size: 12px; color: #666; font-weight: 500;">spiral</span>
            </div>

            <div style="display: flex; flex-direction: column; align-items: center; gap: 12px; padding: 20px; background: #f9fafb; border-radius: 8px;">
              <web-progress-spinner variant="clock" size="lg" color="#a855f7"></web-progress-spinner>
              <span style="font-size: 12px; color: #666; font-weight: 500;">clock</span>
            </div>

            <div style="display: flex; flex-direction: column; align-items: center; gap: 12px; padding: 20px; background: #f9fafb; border-radius: 8px;">
              <web-progress-spinner variant="hourglass" size="lg" color="#a855f7"></web-progress-spinner>
              <span style="font-size: 12px; color: #666; font-weight: 500;">hourglass</span>
            </div>

            <div style="display: flex; flex-direction: column; align-items: center; gap: 12px; padding: 20px; background: #f9fafb; border-radius: 8px;">
              <web-progress-spinner variant="heartbeat" size="lg" color="#ef4444"></web-progress-spinner>
              <span style="font-size: 12px; color: #666; font-weight: 500;">heartbeat</span>
            </div>

            <div style="display: flex; flex-direction: column; align-items: center; gap: 12px; padding: 20px; background: #f9fafb; border-radius: 8px;">
              <web-progress-spinner variant="plane" size="lg" color="#a855f7"></web-progress-spinner>
              <span style="font-size: 12px; color: #666; font-weight: 500;">plane</span>
            </div>
          </div>
        </div>

        <!-- Áudio e Ondas (4) -->
        <div style="margin-bottom: 48px;">
          <h3 style="margin: 0 0 24px 0; color: #ffc107;">🎵 Áudio e Ondas (4)</h3>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 24px;">
            <div style="display: flex; flex-direction: column; align-items: center; gap: 12px; padding: 20px; background: #f9fafb; border-radius: 8px;">
              <web-progress-spinner variant="audio" size="lg" color="#ffc107"></web-progress-spinner>
              <span style="font-size: 12px; color: #666; font-weight: 500;">audio</span>
            </div>

            <div style="display: flex; flex-direction: column; align-items: center; gap: 12px; padding: 20px; background: #f9fafb; border-radius: 8px;">
              <web-progress-spinner variant="equalizer" size="lg" color="#ffc107"></web-progress-spinner>
              <span style="font-size: 12px; color: #666; font-weight: 500;">equalizer</span>
            </div>

            <div style="display: flex; flex-direction: column; align-items: center; gap: 12px; padding: 20px; background: #f9fafb; border-radius: 8px;">
              <web-progress-spinner variant="wave" size="lg" color="#ffc107"></web-progress-spinner>
              <span style="font-size: 12px; color: #666; font-weight: 500;">wave</span>
            </div>

            <div style="display: flex; flex-direction: column; align-items: center; gap: 12px; padding: 20px; background: #f9fafb; border-radius: 8px;">
              <web-progress-spinner variant="ripple" size="lg" color="#ffc107"></web-progress-spinner>
              <span style="font-size: 12px; color: #666; font-weight: 500;">ripple</span>
            </div>
          </div>
        </div>

        <!-- Efeitos Especiais (8) -->
        <div>
          <h3 style="margin: 0 0 24px 0; color: #06b6d4;">⚡ Efeitos Especiais (8)</h3>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 24px;">
            <div style="display: flex; flex-direction: column; align-items: center; gap: 12px; padding: 20px; background: #f9fafb; border-radius: 8px;">
              <web-progress-spinner variant="radar" size="lg" color="#06b6d4"></web-progress-spinner>
              <span style="font-size: 12px; color: #666; font-weight: 500;">radar</span>
            </div>

            <div style="display: flex; flex-direction: column; align-items: center; gap: 12px; padding: 20px; background: #f9fafb; border-radius: 8px;">
              <web-progress-spinner variant="grid" size="lg" color="#06b6d4"></web-progress-spinner>
              <span style="font-size: 12px; color: #666; font-weight: 500;">grid</span>
            </div>

            <div style="display: flex; flex-direction: column; align-items: center; gap: 12px; padding: 20px; background: #f9fafb; border-radius: 8px;">
              <web-progress-spinner variant="spinner-dots" size="lg" color="#06b6d4"></web-progress-spinner>
              <span style="font-size: 12px; color: #666; font-weight: 500;">spinner-dots</span>
            </div>

            <div style="display: flex; flex-direction: column; align-items: center; gap: 12px; padding: 20px; background: #f9fafb; border-radius: 8px;">
              <web-progress-spinner variant="dual-ring" size="lg" color="#06b6d4"></web-progress-spinner>
              <span style="font-size: 12px; color: #666; font-weight: 500;">dual-ring</span>
            </div>

            <div style="display: flex; flex-direction: column; align-items: center; gap: 12px; padding: 20px; background: #f9fafb; border-radius: 8px;">
              <web-progress-spinner variant="cube" size="lg" color="#06b6d4"></web-progress-spinner>
              <span style="font-size: 12px; color: #666; font-weight: 500;">cube</span>
            </div>

            <div style="display: flex; flex-direction: column; align-items: center; gap: 12px; padding: 20px; background: #f9fafb; border-radius: 8px;">
              <web-progress-spinner variant="flip" size="lg" color="#06b6d4"></web-progress-spinner>
              <span style="font-size: 12px; color: #666; font-weight: 500;">flip</span>
            </div>

            <div style="display: flex; flex-direction: column; align-items: center; gap: 12px; padding: 20px; background: #f9fafb; border-radius: 8px;">
              <web-progress-spinner variant="swing" size="lg" color="#06b6d4"></web-progress-spinner>
              <span style="font-size: 12px; color: #666; font-weight: 500;">swing</span>
            </div>

            <div style="display: flex; flex-direction: column; align-items: center; gap: 12px; padding: 20px; background: #f9fafb; border-radius: 8px;">
              <web-progress-spinner variant="rotate-square" size="lg" color="#06b6d4"></web-progress-spinner>
              <span style="font-size: 12px; color: #666; font-weight: 500;">rotate-square</span>
            </div>

            <div style="display: flex; flex-direction: column; align-items: center; gap: 12px; padding: 20px; background: #f9fafb; border-radius: 8px;">
              <web-progress-spinner variant="chasing-dots" size="lg" color="#06b6d4"></web-progress-spinner>
              <span style="font-size: 12px; color: #666; font-weight: 500;">chasing-dots</span>
            </div>

            <div style="display: flex; flex-direction: column; align-items: center; gap: 12px; padding: 20px; background: #f9fafb; border-radius: 8px;">
              <web-progress-spinner variant="growing-circle" size="lg" color="#06b6d4"></web-progress-spinner>
              <span style="font-size: 12px; color: #666; font-weight: 500;">growing-circle</span>
            </div>

            <div style="display: flex; flex-direction: column; align-items: center; gap: 12px; padding: 20px; background: #f9fafb; border-radius: 8px;">
              <web-progress-spinner variant="folding" size="lg" color="#06b6d4"></web-progress-spinner>
              <span style="font-size: 12px; color: #666; font-weight: 500;">folding</span>
            </div>

            <div style="display: flex; flex-direction: column; align-items: center; gap: 12px; padding: 20px; background: #f9fafb; border-radius: 8px;">
              <web-progress-spinner variant="stretching" size="lg" color="#06b6d4"></web-progress-spinner>
              <span style="font-size: 12px; color: #666; font-weight: 500;">stretching</span>
            </div>

            <div style="display: flex; flex-direction: column; align-items: center; gap: 12px; padding: 20px; background: #f9fafb; border-radius: 8px;">
              <web-progress-spinner variant="bouncing-ball" size="lg" color="#06b6d4"></web-progress-spinner>
              <span style="font-size: 12px; color: #666; font-weight: 500;">bouncing-ball</span>
            </div>
          </div>
        </div>
      </div>
    `
  })
};

/**
 * Todos os tamanhos disponíveis.
 */
export const Sizes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; align-items: center; gap: 32px; flex-wrap: wrap;">
        <div style="display: flex; flex-direction: column; align-items: center; gap: 12px;">
          <web-progress-spinner size="xs"></web-progress-spinner>
          <span style="font-size: 12px; color: #666;">xs (16px)</span>
        </div>

        <div style="display: flex; flex-direction: column; align-items: center; gap: 12px;">
          <web-progress-spinner size="sm"></web-progress-spinner>
          <span style="font-size: 12px; color: #666;">sm (24px)</span>
        </div>

        <div style="display: flex; flex-direction: column; align-items: center; gap: 12px;">
          <web-progress-spinner size="md"></web-progress-spinner>
          <span style="font-size: 12px; color: #666;">md (40px)</span>
        </div>

        <div style="display: flex; flex-direction: column; align-items: center; gap: 12px;">
          <web-progress-spinner size="lg"></web-progress-spinner>
          <span style="font-size: 12px; color: #666;">lg (56px)</span>
        </div>

        <div style="display: flex; flex-direction: column; align-items: center; gap: 12px;">
          <web-progress-spinner size="xl"></web-progress-spinner>
          <span style="font-size: 12px; color: #666;">xl (72px)</span>
        </div>

        <div style="display: flex; flex-direction: column; align-items: center; gap: 12px;">
          <web-progress-spinner size="2xl"></web-progress-spinner>
          <span style="font-size: 12px; color: #666;">2xl (96px)</span>
        </div>
      </div>

      <div style="margin-top: 32px;">
        <h4 style="margin: 0 0 16px 0; color: #666;">Tamanho customizado</h4>
        <web-progress-spinner [size]="120"></web-progress-spinner>
      </div>
    `
  })
};

/**
 * Diferentes velocidades.
 */
export const Speeds: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 48px; align-items: center;">
        <div style="display: flex; flex-direction: column; align-items: center; gap: 16px;">
          <web-progress-spinner size="lg" speed="slow"></web-progress-spinner>
          <span style="font-size: 13px; color: #666;">Slow</span>
        </div>

        <div style="display: flex; flex-direction: column; align-items: center; gap: 16px;">
          <web-progress-spinner size="lg" speed="normal"></web-progress-spinner>
          <span style="font-size: 13px; color: #666;">Normal</span>
        </div>

        <div style="display: flex; flex-direction: column; align-items: center; gap: 16px;">
          <web-progress-spinner size="lg" speed="fast"></web-progress-spinner>
          <span style="font-size: 13px; color: #666;">Fast</span>
        </div>
      </div>
    `
  })
};

/**
 * Cores customizadas.
 */
export const Colors: Story = {
  render: () => ({
    template: `
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 24px;">
        <div style="display: flex; flex-direction: column; align-items: center; gap: 12px;">
          <web-progress-spinner size="lg" color="#007bff"></web-progress-spinner>
          <span style="font-size: 12px; color: #666;">Blue</span>
        </div>

        <div style="display: flex; flex-direction: column; align-items: center; gap: 12px;">
          <web-progress-spinner size="lg" color="#22c55e"></web-progress-spinner>
          <span style="font-size: 12px; color: #666;">Green</span>
        </div>

        <div style="display: flex; flex-direction: column; align-items: center; gap: 12px;">
          <web-progress-spinner size="lg" color="#ef4444"></web-progress-spinner>
          <span style="font-size: 12px; color: #666;">Red</span>
        </div>

        <div style="display: flex; flex-direction: column; align-items: center; gap: 12px;">
          <web-progress-spinner size="lg" color="#ffc107"></web-progress-spinner>
          <span style="font-size: 12px; color: #666;">Yellow</span>
        </div>

        <div style="display: flex; flex-direction: column; align-items: center; gap: 12px;">
          <web-progress-spinner size="lg" color="#a855f7"></web-progress-spinner>
          <span style="font-size: 12px; color: #666;">Purple</span>
        </div>

        <div style="display: flex; flex-direction: column; align-items: center; gap: 12px;">
          <web-progress-spinner size="lg" color="#06b6d4"></web-progress-spinner>
          <span style="font-size: 12px; color: #666;">Cyan</span>
        </div>
      </div>
    `
  })
};

/**
 * Com labels em diferentes posições.
 */
export const WithLabel: Story = {
  render: () => ({
    template: `
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 32px;">
        <div>
          <h4 style="margin: 0 0 16px 0; color: #666;">Label Bottom (padrão)</h4>
          <web-progress-spinner
            size="lg"
            label="Carregando..."
            labelPosition="bottom">
          </web-progress-spinner>
        </div>

        <div>
          <h4 style="margin: 0 0 16px 0; color: #666;">Label Top</h4>
          <web-progress-spinner
            size="lg"
            label="Processando"
            labelPosition="top">
          </web-progress-spinner>
        </div>

        <div>
          <h4 style="margin: 0 0 16px 0; color: #666;">Label Left</h4>
          <web-progress-spinner
            size="lg"
            label="Aguarde"
            labelPosition="left">
          </web-progress-spinner>
        </div>

        <div>
          <h4 style="margin: 0 0 16px 0; color: #666;">Label Right</h4>
          <web-progress-spinner
            size="lg"
            label="Loading"
            labelPosition="right">
          </web-progress-spinner>
        </div>
      </div>
    `
  })
};

/**
 * Progresso determinado (0-100%).
 */
export const Determinate: Story = {
  render: () => ({
    props: {
      progress: 0,
      startProgress: function() {
        const interval = setInterval(() => {
          (this as any).progress += 1;
          if ((this as any).progress > 100) {
            (this as any).progress = 0;
          }
        }, 100);
      }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 32px; align-items: center;">
        <button
          (click)="startProgress()"
          style="padding: 12px 24px; background: #007bff; color: white; border: none; border-radius: 6px; cursor: pointer;">
          Iniciar Progresso
        </button>

        <div style="display: flex; gap: 48px;">
          <div style="display: flex; flex-direction: column; align-items: center; gap: 16px;">
            <web-progress-spinner
              [determinate]="true"
              [value]="25"
              size="lg"
              label="25%">
            </web-progress-spinner>
            <span style="font-size: 13px; color: #666;">25%</span>
          </div>

          <div style="display: flex; flex-direction: column; align-items: center; gap: 16px;">
            <web-progress-spinner
              [determinate]="true"
              [value]="50"
              size="lg"
              label="50%"
              color="#22c55e">
            </web-progress-spinner>
            <span style="font-size: 13px; color: #666;">50%</span>
          </div>

          <div style="display: flex; flex-direction: column; align-items: center; gap: 16px;">
            <web-progress-spinner
              [determinate]="true"
              [value]="75"
              size="lg"
              label="75%"
              color="#ffc107">
            </web-progress-spinner>
            <span style="font-size: 13px; color: #666;">75%</span>
          </div>

          <div style="display: flex; flex-direction: column; align-items: center; gap: 16px;">
            <web-progress-spinner
              [determinate]="true"
              [value]="progress"
              size="lg"
              [label]="progress + '%'"
              color="#a855f7">
            </web-progress-spinner>
            <span style="font-size: 13px; color: #666;">Animado</span>
          </div>
        </div>
      </div>
    `
  })
};

/**
 * Modo overlay (fullscreen).
 */
export const Overlay: Story = {
  render: () => ({
    props: {
      showOverlay: false,
      toggleOverlay: function() {
        (this as any).showOverlay = !(this as any).showOverlay;
      }
    },
    template: `
      <div>
        <button
          (click)="toggleOverlay()"
          style="padding: 12px 24px; background: #007bff; color: white; border: none; border-radius: 6px; cursor: pointer;">
          {{ showOverlay ? 'Esconder' : 'Mostrar' }} Overlay
        </button>

        <web-progress-spinner
          *ngIf="showOverlay"
          [overlay]="true"
          label="Carregando dados..."
          size="lg">
        </web-progress-spinner>
      </div>
    `
  })
};

/**
 * Em botões.
 */
export const InButtons: Story = {
  render: () => ({
    props: {
      loading: false,
      handleClick: function() {
        (this as any).loading = true;
        setTimeout(() => {
          (this as any).loading = false;
        }, 3000);
      }
    },
    template: `
      <div style="display: flex; gap: 16px; flex-wrap: wrap;">
        <button
          [disabled]="loading"
          (click)="handleClick()"
          style="padding: 12px 24px; background: #007bff; color: white; border: none; border-radius: 6px; cursor: pointer; display: flex; align-items: center; gap: 8px; min-width: 120px; justify-content: center;">
          <web-progress-spinner
            *ngIf="loading"
            size="sm"
            color="white">
          </web-progress-spinner>
          <span *ngIf="!loading">Salvar</span>
          <span *ngIf="loading">Salvando...</span>
        </button>

        <button
          style="padding: 12px 24px; background: #22c55e; color: white; border: none; border-radius: 6px; cursor: pointer; display: flex; align-items: center; gap: 8px;">
          <web-progress-spinner
            size="sm"
            color="white"
            variant="dots">
          </web-progress-spinner>
          <span>Processando</span>
        </button>

        <button
          style="padding: 12px 24px; background: #a855f7; color: white; border: none; border-radius: 6px; cursor: pointer; display: flex; align-items: center; gap: 8px;">
          <web-progress-spinner
            size="sm"
            color="white"
            variant="pulse">
          </web-progress-spinner>
          <span>Enviando</span>
        </button>
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

          <!-- Loading Cards -->
          <div style="margin-bottom: 32px;">
            <h4 style="margin: 0 0 16px 0; color: #666;">Loading em Cards</h4>
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;">
              <div style="padding: 24px; border: 1px solid #e5e7eb; border-radius: 8px; display: flex; flex-direction: column; align-items: center; gap: 16px;">
                <web-progress-spinner
                  variant="circular"
                  label="Carregando usuários">
                </web-progress-spinner>
              </div>

              <div style="padding: 24px; border: 1px solid #e5e7eb; border-radius: 8px; display: flex; flex-direction: column; align-items: center; gap: 16px;">
                <web-progress-spinner
                  variant="dots"
                  color="#22c55e"
                  label="Sincronizando">
                </web-progress-spinner>
              </div>

              <div style="padding: 24px; border: 1px solid #e5e7eb; border-radius: 8px; display: flex; flex-direction: column; align-items: center; gap: 16px;">
                <web-progress-spinner
                  variant="bars"
                  color="#a855f7"
                  label="Processando">
                </web-progress-spinner>
              </div>
            </div>
          </div>

          <!-- Upload Progress -->
          <div style="margin-bottom: 32px;">
            <h4 style="margin: 0 0 16px 0; color: #666;">Upload de Arquivo</h4>
            <div style="padding: 24px; background: #f9fafb; border-radius: 8px; display: flex; align-items: center; gap: 16px;">
              <web-progress-spinner
                [determinate]="true"
                [value]="67"
                label="67%"
                color="#007bff">
              </web-progress-spinner>
              <div>
                <div style="font-weight: 600; margin-bottom: 4px;">documento.pdf</div>
                <div style="font-size: 13px; color: #666;">2.4 MB de 3.6 MB</div>
              </div>
            </div>
          </div>

          <!-- Inline Loading -->
          <div>
            <h4 style="margin: 0 0 16px 0; color: #666;">Loading Inline</h4>
            <div style="display: flex; flex-direction: column; gap: 12px;">
              <div style="display: flex; align-items: center; gap: 12px;">
                <web-progress-spinner size="xs"></web-progress-spinner>
                <span style="font-size: 14px; color: #666;">Carregando dados...</span>
              </div>

              <div style="display: flex; align-items: center; gap: 12px;">
                <web-progress-spinner size="sm" variant="dots" color="#22c55e"></web-progress-spinner>
                <span style="font-size: 14px; color: #666;">Salvando alterações...</span>
              </div>

              <div style="display: flex; align-items: center; gap: 12px;">
                <web-progress-spinner size="sm" variant="pulse" color="#ffc107"></web-progress-spinner>
                <span style="font-size: 14px; color: #666;">Processando pagamento...</span>
              </div>
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
        <h2 style="margin: 0 0 24px 0; text-align: center;">🏆 web-progress-spinner vs Concorrentes</h2>

        <div style="background: #f0fdf4; border: 2px solid #22c55e; border-radius: 12px; padding: 24px; margin-bottom: 32px;">
          <h3 style="margin: 0 0 16px 0; color: #166534;">✨ Recursos EXCLUSIVOS</h3>
          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; color: #166534;">
            <div>✅ <strong>6 Variantes</strong> (Material 1, Ant 1, Bootstrap 2)</div>
            <div>✅ <strong>Modo Overlay</strong> (Material ❌, Bootstrap ❌, PrimeNG ❌)</div>
            <div>✅ <strong>3 Velocidades</strong> (todos: só 1)</div>
            <div>✅ <strong>Label integrado</strong> (Material ❌, Bootstrap ❌)</div>
            <div>✅ <strong>Progresso determinado</strong> (Ant ❌, Bootstrap ❌)</div>
            <div>✅ <strong>2 Cores</strong> (primária + secundária)</div>
            <div>✅ <strong>Espessura customizável</strong> (Material ❌)</div>
            <div>✅ <strong>4 Posições de label</strong> (todos: 1 ou nenhuma)</div>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 32px;">
          <div>
            <h3 style="margin: 0 0 16px 0;">Material UI: 1 Variante</h3>
            <div style="padding: 24px; background: #f9fafb; border-radius: 8px; display: flex; justify-content: center;">
              <web-progress-spinner variant="circular" size="lg"></web-progress-spinner>
            </div>
          </div>

          <div>
            <h3 style="margin: 0 0 16px 0;">web-spinner: 6 Variantes ✨</h3>
            <div style="padding: 24px; background: #f9fafb; border-radius: 8px;">
              <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;">
                <web-progress-spinner variant="circular"></web-progress-spinner>
                <web-progress-spinner variant="dots"></web-progress-spinner>
                <web-progress-spinner variant="bars"></web-progress-spinner>
                <web-progress-spinner variant="pulse"></web-progress-spinner>
                <web-progress-spinner variant="bounce"></web-progress-spinner>
                <web-progress-spinner variant="ring"></web-progress-spinner>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  })
};

/**
 * Teste de Debug - Verificar todas as variantes.
 */
export const DebugTest: Story = {
  render: () => ({
    template: `
      <div style="max-width: 1000px; margin: 0 auto; padding: 32px;">
        <div style="background: #fff3cd; border: 2px solid #ffc107; border-radius: 8px; padding: 20px; margin-bottom: 32px;">
          <h3 style="margin: 0 0 12px 0; color: #856404;">🔍 Teste de Debug</h3>
          <p style="margin: 0; color: #856404;">
            Todas as 6 variantes devem estar animadas e visíveis abaixo.
            Se alguma não aparecer ou não animar, há um problema no CSS.
          </p>
        </div>

        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px;">
          <div style="padding: 24px; background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px;">
            <h4 style="margin: 0 0 16px 0; text-align: center; color: #666;">Circular</h4>
            <div style="display: flex; justify-content: center;">
              <web-progress-spinner
                variant="circular"
                size="lg"
                color="#007bff">
              </web-progress-spinner>
            </div>
            <p style="margin: 12px 0 0 0; text-align: center; font-size: 12px; color: #666;">
              Deve girar continuamente
            </p>
          </div>

          <div style="padding: 24px; background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px;">
            <h4 style="margin: 0 0 16px 0; text-align: center; color: #666;">Dots</h4>
            <div style="display: flex; justify-content: center;">
              <web-progress-spinner
                variant="dots"
                size="lg"
                color="#22c55e">
              </web-progress-spinner>
            </div>
            <p style="margin: 12px 0 0 0; text-align: center; font-size: 12px; color: #666;">
              3 pontos pulsando
            </p>
          </div>

          <div style="padding: 24px; background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px;">
            <h4 style="margin: 0 0 16px 0; text-align: center; color: #666;">Bars</h4>
            <div style="display: flex; justify-content: center;">
              <web-progress-spinner
                variant="bars"
                size="lg"
                color="#a855f7">
              </web-progress-spinner>
            </div>
            <p style="margin: 12px 0 0 0; text-align: center; font-size: 12px; color: #666;">
              3 barras subindo/descendo
            </p>
          </div>

          <div style="padding: 24px; background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px;">
            <h4 style="margin: 0 0 16px 0; text-align: center; color: #666;">Pulse</h4>
            <div style="display: flex; justify-content: center;">
              <web-progress-spinner
                variant="pulse"
                size="lg"
                color="#ef4444">
              </web-progress-spinner>
            </div>
            <p style="margin: 12px 0 0 0; text-align: center; font-size: 12px; color: #666;">
              Círculo pulsando
            </p>
          </div>

          <div style="padding: 24px; background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px;">
            <h4 style="margin: 0 0 16px 0; text-align: center; color: #666;">Bounce</h4>
            <div style="display: flex; justify-content: center;">
              <web-progress-spinner
                variant="bounce"
                size="lg"
                color="#ffc107">
              </web-progress-spinner>
            </div>
            <p style="margin: 12px 0 0 0; text-align: center; font-size: 12px; color: #666;">
              2 bolas quicando
            </p>
          </div>

          <div style="padding: 24px; background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px;">
            <h4 style="margin: 0 0 16px 0; text-align: center; color: #666;">Ring</h4>
            <div style="display: flex; justify-content: center;">
              <web-progress-spinner
                variant="ring"
                size="lg"
                color="#06b6d4">
              </web-progress-spinner>
            </div>
            <p style="margin: 12px 0 0 0; text-align: center; font-size: 12px; color: #666;">
              Anéis girando
            </p>
          </div>
        </div>

        <div style="margin-top: 32px; padding: 20px; background: #f0f9ff; border-radius: 8px;">
          <h4 style="margin: 0 0 12px 0; color: #1e40af;">✅ Checklist de Verificação:</h4>
          <ul style="margin: 0; color: #1e40af; line-height: 1.8;">
            <li>Todas as 6 variantes estão visíveis</li>
            <li>Todas as animações estão suaves</li>
            <li>As cores estão aplicadas corretamente</li>
            <li>Os tamanhos são proporcionais</li>
          </ul>
        </div>
      </div>
    `
  })
};
