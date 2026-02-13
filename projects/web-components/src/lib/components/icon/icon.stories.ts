import type { Meta, StoryObj } from '@storybook/angular';
import { IconComponent } from './icon.component';

/**
 * # Icon Component
 *
 * Um componente de ícone moderno e completo que DOMINA todos os concorrentes
 * com integração total do Google Material Symbols e recursos avançados.
 *
 * ## 🏆 COMPARATIVO DETALHADO COM CONCORRENTES
 *
 * ### Material UI (MUI Icon)
 * | Feature | Material UI | **web-icon** |
 * |---------|-------------|--------------|
 * | Biblioteca | Material Icons | **Material Symbols** ✨ |
 * | Tamanhos | 3 | **7** ✨ |
 * | Variantes | 3 | **5** ✨ |
 * | Fill Control | ❌ | **✅** ✨ |
 * | Weight Control | ❌ | **✅** ✨ |
 * | Grade Control | ❌ | **✅** ✨ |
 * | Optical Size | ❌ | **✅** ✨ |
 * | Animações | ❌ | **✅ (2)** ✨ |
 * | Badge | ❌ | **✅** ✨ |
 * | Color Props | **1** | **2** ✨ |
 *
 * ### Ant Design (Icon)
 * | Feature | Ant Design | **web-icon** |
 * |---------|------------|--------------|
 * | Biblioteca | Ant Icons | **Material Symbols** ✨ |
 * | Tamanhos | Custom | **7 predefinidos** ✨ |
 * | Variantes | 2 | **5** ✨ |
 * | Fill | ❌ | **✅** ✨ |
 * | Weight | ❌ | **✅** ✨ |
 * | Animações | ✅ (1) | **✅ (2)** ✨ |
 * | Badge | ❌ | **✅** ✨ |
 *
 * ### Font Awesome (Icon)
 * | Feature | Font Awesome | **web-icon** |
 * |---------|--------------|--------------|
 * | Biblioteca | FA Icons | **Material Symbols** ✨ |
 * | Tamanhos | 8 | **7 + custom** ✨ |
 * | Variantes | 5 | **5** |
 * | Fill | ❌ | **✅** ✨ |
 * | Weight | ❌ | **✅** ✨ |
 * | Grade | ❌ | **✅** ✨ |
 * | Optical Size | ❌ | **✅** ✨ |
 * | Animações | ✅ (2) | **✅ (2)** |
 *
 * ### Bootstrap Icons
 * | Feature | Bootstrap | **web-icon** |
 * |---------|-----------|--------------|
 * | Biblioteca | Bootstrap Icons | **Material Symbols** ✨ |
 * | Tamanhos | Custom | **7 predefinidos** ✨ |
 * | Variantes | 1 | **5** ✨ |
 * | Fill | ❌ | **✅** ✨ |
 * | Weight | ❌ | **✅** ✨ |
 * | Animações | ❌ | **✅** ✨ |
 * | Badge | ❌ | **✅** ✨ |
 *
 * ## 🎯 Principais Funcionalidades
 *
 * ### Material Symbols (Google)
 * - **2,500+ ícones** de alta qualidade
 * - 5 variantes de estilo
 * - Totalmente customizáveis
 * - Sempre atualizados
 *
 * ### Tamanhos (7 opções + custom)
 * - **xs**: 16px
 * - **sm**: 20px
 * - **md**: 24px (default)
 * - **lg**: 32px
 * - **xl**: 40px
 * - **2xl**: 48px
 * - **3xl**: 64px
 * - **custom**: Qualquer número em pixels
 *
 * ### Variantes (5 estilos)
 * - **default**: Outlined (padrão)
 * - **filled**: Preenchido
 * - **outlined**: Contorno
 * - **rounded**: Cantos arredondados
 * - **sharp**: Cantos afiados
 *
 * ### Controles Avançados (Google Material Symbols)
 * - **fill**: 0 (vazio) ou 1 (preenchido)
 * - **weight**: 100-700 (espessura da linha)
 * - **grade**: -25, 0, 200 (contraste visual)
 * - **opticalSize**: 20-48 (otimização de tamanho)
 *
 * ## 📦 Recursos EXCLUSIVOS
 *
 * ### ✨ Fill Control (Preenchimento)
 * ```html
 * <web-icon name="favorite" [fill]="1"></web-icon>
 * ```
 *
 * ### ✨ Weight Control (Espessura)
 * ```html
 * <web-icon name="star" [weight]="700"></web-icon>
 * ```
 *
 * ### ✨ Grade Control (Contraste)
 * ```html
 * <web-icon name="home" [grade]="200"></web-icon>
 * ```
 *
 * ### ✨ Optical Size (Otimização)
 * ```html
 * <web-icon name="search" [opticalSize]="48"></web-icon>
 * ```
 *
 * ### ✨ Animações
 * ```html
 * <web-icon name="sync" [spin]="true"></web-icon>
 * <web-icon name="notifications" [pulse]="true"></web-icon>
 * ```
 *
 * ### ✨ Badge/Dot
 * ```html
 * <web-icon name="mail" badge="5"></web-icon>
 * <web-icon name="notifications" [dot]="true"></web-icon>
 * ```
 *
 * ## 🔧 Como Usar
 *
 * ### Importação
 * ```typescript
 * import { IconComponent } from '@thiagosantosa/web-components';
 *
 * @Component({
 *   imports: [IconComponent],
 *   // ...
 * })
 * ```
 *
 * ### Ícone Básico
 * ```html
 * <web-icon name="home"></web-icon>
 * ```
 *
 * ### Com Tamanho
 * ```html
 * <web-icon name="star" size="lg"></web-icon>
 * <web-icon name="favorite" [size]="48"></web-icon>
 * ```
 *
 * ### Com Cor
 * ```html
 * <web-icon name="favorite" color="#ef4444"></web-icon>
 * ```
 *
 * ### Preenchido
 * ```html
 * <web-icon name="star" [fill]="1"></web-icon>
 * ```
 *
 * ### Com Animação
 * ```html
 * <web-icon name="sync" [spin]="true"></web-icon>
 * ```
 *
 * ### Clicável
 * ```html
 * <web-icon
 *   name="delete"
 *   [clickable]="true"
 *   (iconClick)="handleDelete()">
 * </web-icon>
 * ```
 *
 * ### Com Badge
 * ```html
 * <web-icon name="mail" badge="12"></web-icon>
 * ```
 *
 * ## 📋 Props Completas
 *
 * | Prop | Tipo | Default | Descrição |
 * |------|------|---------|-----------|
 * | name | string | '' | Nome do ícone |
 * | size | IconSize \| number | 'md' | Tamanho |
 * | variant | IconVariant | 'default' | Variante |
 * | weight | 100-700 | 400 | Espessura |
 * | fill | 0 \| 1 | 0 | Preenchimento |
 * | grade | -25 \| 0 \| 200 | 0 | Contraste |
 * | opticalSize | 20-48 | 24 | Otimização |
 * | color | string | '' | Cor |
 * | clickable | boolean | false | Clicável |
 * | disabled | boolean | false | Desabilitado |
 * | spin | boolean | false | Animação girar |
 * | pulse | boolean | false | Animação pulsar |
 * | badge | string | '' | Badge |
 * | dot | boolean | false | Ponto |
 * | badgeColor | string | '#ef4444' | Cor badge |
 *
 * ## 📤 Eventos
 *
 * | Evento | Payload | Descrição |
 * |--------|---------|-----------|
 * | iconClick | MouseEvent | Ícone clicado |
 *
 * ## 🔍 Buscar Ícones
 *
 * Acesse: https://fonts.google.com/icons
 *
 * ## 💡 Casos de Uso
 *
 * 1. **Navegação**: Menus e botões
 * 2. **Ações**: Editar, deletar, salvar
 * 3. **Status**: Sucesso, erro, aviso
 * 4. **Notificações**: Com badge de contagem
 * 5. **Loading**: Com animação spin
 * 6. **Social**: Redes sociais
 * 7. **UI**: Setas, checks, closes
 * 8. **Features**: Ilustrar funcionalidades
 */
const meta: Meta<IconComponent> = {
  title: 'Buttons & Indicators/Icon',
  component: IconComponent,
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'text',
      description: 'Nome do ícone do Material Symbols'
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'],
      description: 'Tamanho do ícone'
    },
    variant: {
      control: 'select',
      options: ['default', 'filled', 'outlined', 'rounded', 'sharp'],
      description: 'Variante do estilo'
    },
    weight: {
      control: 'select',
      options: [100, 200, 300, 400, 500, 600, 700],
      description: 'Espessura da linha'
    },
    fill: {
      control: 'select',
      options: [0, 1],
      description: 'Preenchimento (0=vazio, 1=cheio)'
    },
    color: {
      control: 'color',
      description: 'Cor do ícone'
    }
  }
};

export default meta;
type Story = StoryObj<IconComponent>;

/**
 * Ícone básico.
 */
export const Basic: Story = {
  args: {
    name: 'home',
    size: 'md'
  }
};

/**
 * Todos os tamanhos disponíveis.
 */
export const Sizes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; align-items: center; gap: 24px; flex-wrap: wrap;">
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <web-icon name="star" size="xs"></web-icon>
          <span style="font-size: 12px; color: #666;">xs (16px)</span>
        </div>

        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <web-icon name="star" size="sm"></web-icon>
          <span style="font-size: 12px; color: #666;">sm (20px)</span>
        </div>

        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <web-icon name="star" size="md"></web-icon>
          <span style="font-size: 12px; color: #666;">md (24px)</span>
        </div>

        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <web-icon name="star" size="lg"></web-icon>
          <span style="font-size: 12px; color: #666;">lg (32px)</span>
        </div>

        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <web-icon name="star" size="xl"></web-icon>
          <span style="font-size: 12px; color: #666;">xl (40px)</span>
        </div>

        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <web-icon name="star" size="2xl"></web-icon>
          <span style="font-size: 12px; color: #666;">2xl (48px)</span>
        </div>

        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <web-icon name="star" size="3xl"></web-icon>
          <span style="font-size: 12px; color: #666;">3xl (64px)</span>
        </div>
      </div>

      <div style="margin-top: 32px;">
        <h4 style="margin: 0 0 16px 0; color: #666;">Tamanho customizado (número)</h4>
        <div style="display: flex; align-items: center; gap: 24px;">
          <web-icon name="favorite" [size]="80" color="#ef4444"></web-icon>
          <span style="font-size: 14px; color: #666;">size="80" (80px)</span>
        </div>
      </div>
    `
  })
};

/**
 * Controle de Fill (preenchimento).
 */
export const FillControl: Story = {
  render: () => ({
    template: `
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 24px;">
        <div style="display: flex; flex-direction: column; align-items: center; gap: 12px;">
          <web-icon name="favorite" [fill]="0" size="xl" color="#ef4444"></web-icon>
          <span style="font-size: 13px; color: #666;">fill="0" (vazio)</span>
        </div>

        <div style="display: flex; flex-direction: column; align-items: center; gap: 12px;">
          <web-icon name="favorite" [fill]="1" size="xl" color="#ef4444"></web-icon>
          <span style="font-size: 13px; color: #666;">fill="1" (cheio)</span>
        </div>

        <div style="display: flex; flex-direction: column; align-items: center; gap: 12px;">
          <web-icon name="star" [fill]="0" size="xl" color="#ffc107"></web-icon>
          <span style="font-size: 13px; color: #666;">star vazio</span>
        </div>

        <div style="display: flex; flex-direction: column; align-items: center; gap: 12px;">
          <web-icon name="star" [fill]="1" size="xl" color="#ffc107"></web-icon>
          <span style="font-size: 13px; color: #666;">star cheio</span>
        </div>

        <div style="display: flex; flex-direction: column; align-items: center; gap: 12px;">
          <web-icon name="home" [fill]="0" size="xl" color="#007bff"></web-icon>
          <span style="font-size: 13px; color: #666;">home vazio</span>
        </div>

        <div style="display: flex; flex-direction: column; align-items: center; gap: 12px;">
          <web-icon name="home" [fill]="1" size="xl" color="#007bff"></web-icon>
          <span style="font-size: 13px; color: #666;">home cheio</span>
        </div>
      </div>
    `
  })
};

/**
 * Controle de Weight (espessura).
 */
export const WeightControl: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <div style="display: flex; align-items: center; gap: 24px;">
          <web-icon name="settings" [weight]="100" size="xl"></web-icon>
          <span style="font-size: 13px; color: #666; width: 120px;">weight="100" (fino)</span>
        </div>

        <div style="display: flex; align-items: center; gap: 24px;">
          <web-icon name="settings" [weight]="200" size="xl"></web-icon>
          <span style="font-size: 13px; color: #666; width: 120px;">weight="200"</span>
        </div>

        <div style="display: flex; align-items: center; gap: 24px;">
          <web-icon name="settings" [weight]="300" size="xl"></web-icon>
          <span style="font-size: 13px; color: #666; width: 120px;">weight="300"</span>
        </div>

        <div style="display: flex; align-items: center; gap: 24px;">
          <web-icon name="settings" [weight]="400" size="xl"></web-icon>
          <span style="font-size: 13px; color: #666; width: 120px;">weight="400" (padrão)</span>
        </div>

        <div style="display: flex; align-items: center; gap: 24px;">
          <web-icon name="settings" [weight]="500" size="xl"></web-icon>
          <span style="font-size: 13px; color: #666; width: 120px;">weight="500"</span>
        </div>

        <div style="display: flex; align-items: center; gap: 24px;">
          <web-icon name="settings" [weight]="600" size="xl"></web-icon>
          <span style="font-size: 13px; color: #666; width: 120px;">weight="600"</span>
        </div>

        <div style="display: flex; align-items: center; gap: 24px;">
          <web-icon name="settings" [weight]="700" size="xl"></web-icon>
          <span style="font-size: 13px; color: #666; width: 120px;">weight="700" (grosso)</span>
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
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); gap: 24px;">
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <web-icon name="favorite" size="xl" color="#ef4444" [fill]="1"></web-icon>
          <span style="font-size: 12px; color: #666;">Red</span>
        </div>

        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <web-icon name="star" size="xl" color="#ffc107" [fill]="1"></web-icon>
          <span style="font-size: 12px; color: #666;">Yellow</span>
        </div>

        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <web-icon name="check_circle" size="xl" color="#22c55e" [fill]="1"></web-icon>
          <span style="font-size: 12px; color: #666;">Green</span>
        </div>

        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <web-icon name="info" size="xl" color="#007bff" [fill]="1"></web-icon>
          <span style="font-size: 12px; color: #666;">Blue</span>
        </div>

        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <web-icon name="workspace_premium" size="xl" color="#a855f7" [fill]="1"></web-icon>
          <span style="font-size: 12px; color: #666;">Purple</span>
        </div>

        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <web-icon name="water_drop" size="xl" color="#06b6d4" [fill]="1"></web-icon>
          <span style="font-size: 12px; color: #666;">Cyan</span>
        </div>

        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <web-icon name="local_fire_department" size="xl" color="#f97316" [fill]="1"></web-icon>
          <span style="font-size: 12px; color: #666;">Orange</span>
        </div>

        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <web-icon name="favorite" size="xl" color="#e91e63" [fill]="1"></web-icon>
          <span style="font-size: 12px; color: #666;">Pink</span>
        </div>
      </div>
    `
  })
};

/**
 * Animações: spin e pulse.
 */
export const Animations: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 48px; align-items: center;">
        <div style="display: flex; flex-direction: column; align-items: center; gap: 16px;">
          <web-icon name="sync" size="xl" [spin]="true" color="#007bff"></web-icon>
          <span style="font-size: 13px; color: #666;">spin="true"</span>
        </div>

        <div style="display: flex; flex-direction: column; align-items: center; gap: 16px;">
          <web-icon name="refresh" size="xl" [spin]="true" color="#22c55e"></web-icon>
          <span style="font-size: 13px; color: #666;">refresh spinning</span>
        </div>

        <div style="display: flex; flex-direction: column; align-items: center; gap: 16px;">
          <web-icon name="autorenew" size="xl" [spin]="true" color="#a855f7"></web-icon>
          <span style="font-size: 13px; color: #666;">autorenew spinning</span>
        </div>

        <div style="display: flex; flex-direction: column; align-items: center; gap: 16px;">
          <web-icon name="notifications" size="xl" [pulse]="true" color="#ef4444" [fill]="1"></web-icon>
          <span style="font-size: 13px; color: #666;">pulse="true"</span>
        </div>

        <div style="display: flex; flex-direction: column; align-items: center; gap: 16px;">
          <web-icon name="favorite" size="xl" [pulse]="true" color="#e91e63" [fill]="1"></web-icon>
          <span style="font-size: 13px; color: #666;">favorite pulse</span>
        </div>
      </div>
    `
  })
};

/**
 * Ícones com badge e dot.
 */
export const WithBadge: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 48px; align-items: center; flex-wrap: wrap;">
        <div style="display: flex; flex-direction: column; align-items: center; gap: 16px;">
          <web-icon name="mail" size="xl" badge="5" color="#007bff"></web-icon>
          <span style="font-size: 13px; color: #666;">badge="5"</span>
        </div>

        <div style="display: flex; flex-direction: column; align-items: center; gap: 16px;">
          <web-icon name="notifications" size="xl" badge="12" color="#ffc107"></web-icon>
          <span style="font-size: 13px; color: #666;">badge="12"</span>
        </div>

        <div style="display: flex; flex-direction: column; align-items: center; gap: 16px;">
          <web-icon name="shopping_cart" size="xl" badge="99+" color="#22c55e"></web-icon>
          <span style="font-size: 13px; color: #666;">badge="99+"</span>
        </div>

        <div style="display: flex; flex-direction: column; align-items: center; gap: 16px;">
          <web-icon name="chat" size="xl" [dot]="true" color="#a855f7"></web-icon>
          <span style="font-size: 13px; color: #666;">dot="true"</span>
        </div>

        <div style="display: flex; flex-direction: column; align-items: center; gap: 16px;">
          <web-icon name="notifications" size="xl" [dot]="true" badgeColor="#22c55e" color="#007bff"></web-icon>
          <span style="font-size: 13px; color: #666;">dot verde</span>
        </div>
      </div>
    `
  })
};

/**
 * Ícones clicáveis.
 */
export const Clickable: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 24px; align-items: center;">
        <web-icon
          name="delete"
          size="lg"
          [clickable]="true"
          color="#ef4444"
          title="Deletar">
        </web-icon>

        <web-icon
          name="edit"
          size="lg"
          [clickable]="true"
          color="#007bff"
          title="Editar">
        </web-icon>

        <web-icon
          name="share"
          size="lg"
          [clickable]="true"
          color="#22c55e"
          title="Compartilhar">
        </web-icon>

        <web-icon
          name="favorite"
          size="lg"
          [clickable]="true"
          color="#e91e63"
          [fill]="1"
          title="Favoritar">
        </web-icon>
      </div>

      <p style="margin-top: 16px; font-size: 13px; color: #666;">
        Hover para ver o efeito de escala
      </p>
    `
  })
};

/**
 * Estados: normal e disabled.
 */
export const States: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <div>
          <h4 style="margin: 0 0 16px 0; color: #666;">Normal</h4>
          <div style="display: flex; gap: 16px;">
            <web-icon name="home" size="lg" color="#007bff"></web-icon>
            <web-icon name="star" size="lg" color="#ffc107" [fill]="1"></web-icon>
            <web-icon name="favorite" size="lg" color="#ef4444" [fill]="1"></web-icon>
          </div>
        </div>

        <div>
          <h4 style="margin: 0 0 16px 0; color: #666;">Disabled</h4>
          <div style="display: flex; gap: 16px;">
            <web-icon name="home" size="lg" color="#007bff" [disabled]="true"></web-icon>
            <web-icon name="star" size="lg" color="#ffc107" [fill]="1" [disabled]="true"></web-icon>
            <web-icon name="favorite" size="lg" color="#ef4444" [fill]="1" [disabled]="true"></web-icon>
          </div>
        </div>
      </div>
    `
  })
};

/**
 * Galeria de ícones populares.
 */
export const IconGallery: Story = {
  render: () => ({
    template: `
      <div style="max-width: 1000px; margin: 0 auto;">
        <h3 style="margin: 0 0 24px 0;">Ícones Populares do Material Symbols</h3>

        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 24px;">
          <div style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 16px; border: 1px solid #e5e7eb; border-radius: 8px;">
            <web-icon name="home" size="lg"></web-icon>
            <span style="font-size: 11px; color: #666;">home</span>
          </div>

          <div style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 16px; border: 1px solid #e5e7eb; border-radius: 8px;">
            <web-icon name="search" size="lg"></web-icon>
            <span style="font-size: 11px; color: #666;">search</span>
          </div>

          <div style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 16px; border: 1px solid #e5e7eb; border-radius: 8px;">
            <web-icon name="settings" size="lg"></web-icon>
            <span style="font-size: 11px; color: #666;">settings</span>
          </div>

          <div style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 16px; border: 1px solid #e5e7eb; border-radius: 8px;">
            <web-icon name="favorite" size="lg" color="#ef4444" [fill]="1"></web-icon>
            <span style="font-size: 11px; color: #666;">favorite</span>
          </div>

          <div style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 16px; border: 1px solid #e5e7eb; border-radius: 8px;">
            <web-icon name="star" size="lg" color="#ffc107" [fill]="1"></web-icon>
            <span style="font-size: 11px; color: #666;">star</span>
          </div>

          <div style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 16px; border: 1px solid #e5e7eb; border-radius: 8px;">
            <web-icon name="account_circle" size="lg"></web-icon>
            <span style="font-size: 11px; color: #666;">account_circle</span>
          </div>

          <div style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 16px; border: 1px solid #e5e7eb; border-radius: 8px;">
            <web-icon name="shopping_cart" size="lg"></web-icon>
            <span style="font-size: 11px; color: #666;">shopping_cart</span>
          </div>

          <div style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 16px; border: 1px solid #e5e7eb; border-radius: 8px;">
            <web-icon name="notifications" size="lg"></web-icon>
            <span style="font-size: 11px; color: #666;">notifications</span>
          </div>

          <div style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 16px; border: 1px solid #e5e7eb; border-radius: 8px;">
            <web-icon name="mail" size="lg"></web-icon>
            <span style="font-size: 11px; color: #666;">mail</span>
          </div>

          <div style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 16px; border: 1px solid #e5e7eb; border-radius: 8px;">
            <web-icon name="check_circle" size="lg" color="#22c55e" [fill]="1"></web-icon>
            <span style="font-size: 11px; color: #666;">check_circle</span>
          </div>

          <div style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 16px; border: 1px solid #e5e7eb; border-radius: 8px;">
            <web-icon name="error" size="lg" color="#ef4444" [fill]="1"></web-icon>
            <span style="font-size: 11px; color: #666;">error</span>
          </div>

          <div style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 16px; border: 1px solid #e5e7eb; border-radius: 8px;">
            <web-icon name="warning" size="lg" color="#ffc107" [fill]="1"></web-icon>
            <span style="font-size: 11px; color: #666;">warning</span>
          </div>

          <div style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 16px; border: 1px solid #e5e7eb; border-radius: 8px;">
            <web-icon name="info" size="lg" color="#007bff" [fill]="1"></web-icon>
            <span style="font-size: 11px; color: #666;">info</span>
          </div>

          <div style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 16px; border: 1px solid #e5e7eb; border-radius: 8px;">
            <web-icon name="delete" size="lg"></web-icon>
            <span style="font-size: 11px; color: #666;">delete</span>
          </div>

          <div style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 16px; border: 1px solid #e5e7eb; border-radius: 8px;">
            <web-icon name="edit" size="lg"></web-icon>
            <span style="font-size: 11px; color: #666;">edit</span>
          </div>

          <div style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 16px; border: 1px solid #e5e7eb; border-radius: 8px;">
            <web-icon name="more_vert" size="lg"></web-icon>
            <span style="font-size: 11px; color: #666;">more_vert</span>
          </div>
        </div>

        <div style="margin-top: 32px; padding: 20px; background: #f0f9ff; border-radius: 8px;">
          <h4 style="margin: 0 0 12px 0; color: #1e40af;">🔍 Buscar mais ícones</h4>
          <p style="margin: 0; color: #1e40af;">
            Acesse <strong>https://fonts.google.com/icons</strong> para explorar 2,500+ ícones disponíveis!
          </p>
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
        <h2 style="margin: 0 0 24px 0; text-align: center;">🏆 web-icon vs Concorrentes</h2>

        <div style="background: #f0fdf4; border: 2px solid #22c55e; border-radius: 12px; padding: 24px; margin-bottom: 32px;">
          <h3 style="margin: 0 0 16px 0; color: #166534;">✨ Recursos EXCLUSIVOS do web-icon</h3>
          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; color: #166534;">
            <div>✅ <strong>Material Symbols</strong> (2,500+ ícones modernos)</div>
            <div>✅ <strong>Fill Control</strong> (0 ou 1 - Material UI ❌, Ant ❌)</div>
            <div>✅ <strong>Weight Control</strong> (100-700 - Material UI ❌, Ant ❌)</div>
            <div>✅ <strong>Grade Control</strong> (-25 a 200 - todos ❌)</div>
            <div>✅ <strong>Optical Size</strong> (20-48 - todos ❌)</div>
            <div>✅ <strong>7 Tamanhos</strong> + custom (Material 3, Ant custom)</div>
            <div>✅ <strong>Badge integrado</strong> (Material UI ❌, Bootstrap ❌)</div>
            <div>✅ <strong>2 Animações</strong> (spin + pulse)</div>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 32px;">
          <div>
            <h3 style="margin: 0 0 16px 0;">Controles Avançados ✨</h3>
            <div style="display: flex; flex-direction: column; gap: 16px;">
              <div style="padding: 16px; background: #f9fafb; border-radius: 8px;">
                <p style="margin: 0 0 12px 0; font-size: 13px; color: #666;">Fill Control</p>
                <div style="display: flex; gap: 16px;">
                  <web-icon name="favorite" [fill]="0" size="xl" color="#ef4444"></web-icon>
                  <web-icon name="favorite" [fill]="1" size="xl" color="#ef4444"></web-icon>
                </div>
              </div>

              <div style="padding: 16px; background: #f9fafb; border-radius: 8px;">
                <p style="margin: 0 0 12px 0; font-size: 13px; color: #666;">Weight Control</p>
                <div style="display: flex; gap: 16px;">
                  <web-icon name="settings" [weight]="100" size="xl"></web-icon>
                  <web-icon name="settings" [weight]="400" size="xl"></web-icon>
                  <web-icon name="settings" [weight]="700" size="xl"></web-icon>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 style="margin: 0 0 16px 0;">Recursos Exclusivos ✨</h3>
            <div style="display: flex; flex-direction: column; gap: 16px;">
              <div style="padding: 16px; background: #f9fafb; border-radius: 8px;">
                <p style="margin: 0 0 12px 0; font-size: 13px; color: #666;">Com Badge</p>
                <div style="display: flex; gap: 16px;">
                  <web-icon name="mail" badge="5" size="xl" color="#007bff"></web-icon>
                  <web-icon name="notifications" [dot]="true" size="xl" color="#ffc107"></web-icon>
                </div>
              </div>

              <div style="padding: 16px; background: #f9fafb; border-radius: 8px;">
                <p style="margin: 0 0 12px 0; font-size: 13px; color: #666;">Animações</p>
                <div style="display: flex; gap: 16px;">
                  <web-icon name="sync" [spin]="true" size="xl" color="#22c55e"></web-icon>
                  <web-icon name="favorite" [pulse]="true" [fill]="1" size="xl" color="#e91e63"></web-icon>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  })
};
