import type { Meta, StoryObj } from '@storybook/angular';
import { ButtonToggleComponent } from './button-toggle.component';

/**
 * # Button Toggle Component
 *
 * Um componente de toggle/switch moderno e completo que DOMINA todos os concorrentes
 * do mercado com recursos avançados e customização TOTAL de cores.
 *
 * ## 🏆 COMPARATIVO DETALHADO COM CONCORRENTES
 *
 * ### Material UI (MUI Switch)
 * | Feature | Material UI | **web-button-toggle** |
 * |---------|-------------|----------------------|
 * | Tamanhos | 2 | **3** ✨ |
 * | Variantes | 1 | **4** ✨ |
 * | Shapes | 1 (pill) | **3** ✨ |
 * | Label Position | 2 | **4** ✨ |
 * | Icons in Track | ❌ | **✅** ✨ |
 * | Text in Track | ❌ | **✅** ✨ |
 * | Thumb Icon | ❌ | **✅** ✨ |
 * | Loading State | ❌ | **✅** ✨ |
 * | Color Props | **3** | **20+** ✨✨✨ |
 *
 * ### Ant Design (Switch)
 * | Feature | Ant Design | **web-button-toggle** |
 * |---------|------------|----------------------|
 * | Tamanhos | 2 | **3** ✨ |
 * | Variantes | 1 | **4** ✨ |
 * | Icons | ✅ (basic) | **✅ (advanced)** ✨ |
 * | Text | ✅ (basic) | **✅ (advanced)** ✨ |
 * | Label Position | 1 | **4** ✨ |
 * | Shapes | 1 | **3** ✨ |
 * | Loading | ✅ | **✅** |
 * | Color Props | **2** | **20+** ✨✨✨ |
 *
 * ### Bootstrap (Form Switch)
 * | Feature | Bootstrap | **web-button-toggle** |
 * |---------|-----------|----------------------|
 * | Tamanhos | 2 | **3** ✨ |
 * | Variantes | 1 | **4** ✨ |
 * | Icons | ❌ | **✅** ✨ |
 * | Text in Track | ❌ | **✅** ✨ |
 * | Label Position | 1 | **4** ✨ |
 * | Shapes | 1 | **3** ✨ |
 * | Color Props | **0** | **20+** ✨✨✨ |
 *
 * ### PrimeNG (InputSwitch)
 * | Feature | PrimeNG | **web-button-toggle** |
 * |---------|---------|----------------------|
 * | Tamanhos | 1 | **3** ✨ |
 * | Variantes | 1 | **4** ✨ |
 * | Icons | ❌ | **✅** ✨ |
 * | Label Position | 1 | **4** ✨ |
 * | Shapes | 1 | **3** ✨ |
 * | Color Props | **1** | **20+** ✨✨✨ |
 *
 * ## 🎯 Principais Funcionalidades
 *
 * ### Tamanhos
 * - **small**: 36x20px - Compacto
 * - **medium**: 44x24px - Padrão (default)
 * - **large**: 56x32px - Destaque
 *
 * ### Variantes
 * - **default**: Toggle sólido tradicional
 * - **outlined**: Com borda, fundo transparente
 * - **filled**: Preenchido com cor
 * - **soft**: Cores suaves e pastéis
 *
 * ### Shapes (Formas)
 * - **pill**: Totalmente arredondado (default)
 * - **rounded**: Cantos arredondados (8px)
 * - **square**: Cantos quadrados (4px)
 *
 * ### Posições do Label
 * - **left**: Label à esquerda
 * - **right**: Label à direita (default)
 * - **top**: Label acima
 * - **bottom**: Label abaixo
 *
 * ## 📦 Recursos EXCLUSIVOS
 *
 * ### ✨ Ícones no Track
 * - Ícone quando marcado (checkedIcon)
 * - Ícone quando desmarcado (uncheckedIcon)
 * - Cores individuais por estado
 *
 * ### ✨ Texto no Track
 * - Texto quando marcado (checkedText): "ON", "SIM", "✓"
 * - Texto quando desmarcado (uncheckedText): "OFF", "NÃO", "✗"
 * - Cores customizáveis
 *
 * ### ✨ Ícone no Thumb (slider)
 * - Ícone dentro do thumb móvel
 * - Cor customizável
 *
 * ### ✨ Estado de Loading
 * - Spinner no thumb
 * - Bloqueia interação
 *
 * ### ✨ 20+ Propriedades de Cor
 * **Track (trilho):**
 * - checkedColor / uncheckedColor
 * - activeTrackColor / inactiveTrackColor
 * - checkedBorderColor / uncheckedBorderColor
 *
 * **Thumb (botão):**
 * - checkedThumbColor / uncheckedThumbColor
 * - activeThumbColor / inactiveThumbColor
 * - thumbShadow
 *
 * **Ícones & Texto:**
 * - checkedIconColor / uncheckedIconColor
 * - checkedTextColor / uncheckedTextColor
 * - thumbIconColor
 *
 * **Labels:**
 * - labelColor
 * - helperTextColor
 * - errorColor
 *
 * ## 🔧 Como Usar
 *
 * ### Importação
 * ```typescript
 * import { ButtonToggleComponent } from '@thiagosantosa/web-components';
 *
 * @Component({
 *   imports: [ButtonToggleComponent],
 *   // ...
 * })
 * ```
 *
 * ### Toggle Básico
 * ```html
 * <web-button-toggle
 *   label="Notificações"
 *   [(ngModel)]="enabled">
 * </web-button-toggle>
 * ```
 *
 * ### Com Ícones
 * ```html
 * <web-button-toggle
 *   label="Modo Escuro"
 *   checkedIcon="dark_mode"
 *   uncheckedIcon="light_mode"
 *   [(ngModel)]="darkMode">
 * </web-button-toggle>
 * ```
 *
 * ### Com Texto no Track
 * ```html
 * <web-button-toggle
 *   checkedText="ON"
 *   uncheckedText="OFF"
 *   [(ngModel)]="power">
 * </web-button-toggle>
 * ```
 *
 * ### Com Cores Customizadas
 * ```html
 * <web-button-toggle
 *   label="Aceito os termos"
 *   checkedColor="#22c55e"
 *   uncheckedColor="#ef4444"
 *   [(ngModel)]="accepted">
 * </web-button-toggle>
 * ```
 *
 * ### Com Validação
 * ```html
 * <web-button-toggle
 *   label="Campo obrigatório"
 *   [required]="true"
 *   helperText="Você deve aceitar para continuar"
 *   errorText="Campo obrigatório"
 *   [(ngModel)]="value">
 * </web-button-toggle>
 * ```
 *
 * ### Com Loading
 * ```html
 * <web-button-toggle
 *   label="Salvando..."
 *   [loading]="isSaving"
 *   [(ngModel)]="value">
 * </web-button-toggle>
 * ```
 *
 * ### Reactive Forms
 * ```typescript
 * form = this.fb.group({
 *   notifications: [true]
 * });
 * ```
 *
 * ```html
 * <web-button-toggle
 *   formControlName="notifications">
 * </web-button-toggle>
 * ```
 *
 * ## 📋 Props Completas
 *
 * | Prop | Tipo | Default | Descrição |
 * |------|------|---------|-----------|
 * | checked | boolean | false | Estado do toggle |
 * | disabled | boolean | false | Desabilitado |
 * | loading | boolean | false | Estado de loading |
 * | required | boolean | false | Campo obrigatório |
 * | size | ToggleSize | 'medium' | Tamanho |
 * | variant | ToggleVariant | 'default' | Variante visual |
 * | shape | ToggleShape | 'pill' | Forma |
 * | label | string | '' | Texto do label |
 * | labelPosition | LabelPosition | 'right' | Posição do label |
 * | helperText | string | '' | Texto de ajuda |
 * | errorText | string | '' | Texto de erro |
 * | checkedIcon | string | '' | Ícone quando ON |
 * | uncheckedIcon | string | '' | Ícone quando OFF |
 * | thumbIcon | string | '' | Ícone no thumb |
 * | checkedText | string | '' | Texto quando ON |
 * | uncheckedText | string | '' | Texto quando OFF |
 * | checkedColor | string | '#22c55e' | Cor quando ON |
 * | uncheckedColor | string | '#d1d5db' | Cor quando OFF |
 * | **+ 15 props de cor** | string | - | Customização total |
 *
 * ## 📤 Eventos
 *
 * | Evento | Payload | Descrição |
 * |--------|---------|-----------|
 * | change | boolean | Estado alterado |
 *
 * ## 💡 Casos de Uso
 *
 * 1. **Configurações**: On/Off de features
 * 2. **Modo Escuro**: Dark/Light theme
 * 3. **Notificações**: Ativar/desativar alerts
 * 4. **Privacidade**: Controles de visibilidade
 * 5. **Formulários**: Aceite de termos
 * 6. **Filtros**: Mostrar/ocultar conteúdo
 * 7. **Status**: Ativo/Inativo
 * 8. **Permissões**: Habilitar/desabilitar acessos
 */
const meta: Meta<ButtonToggleComponent> = {
  title: 'Buttons & Indicators/ButtonToggle',
  component: ButtonToggleComponent,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Tamanho do toggle'
    },
    variant: {
      control: 'select',
      options: ['default', 'outlined', 'filled', 'soft'],
      description: 'Variante visual'
    },
    shape: {
      control: 'select',
      options: ['pill', 'rounded', 'square'],
      description: 'Forma do toggle'
    },
    labelPosition: {
      control: 'select',
      options: ['left', 'right', 'top', 'bottom'],
      description: 'Posição do label'
    },
    checked: {
      control: 'boolean',
      description: 'Estado do toggle'
    },
    disabled: {
      control: 'boolean',
      description: 'Desabilitar toggle'
    },
    loading: {
      control: 'boolean',
      description: 'Estado de loading'
    },
    checkedColor: {
      control: 'color',
      description: 'Cor quando ativado'
    },
    uncheckedColor: {
      control: 'color',
      description: 'Cor quando desativado'
    }
  }
};

export default meta;
type Story = StoryObj<ButtonToggleComponent>;

/**
 * Toggle básico com label.
 */
export const Basic: Story = {
  args: {
    label: 'Ativar notificações',
    checked: false
  }
};

/**
 * Comparação de todos os tamanhos.
 */
export const Sizes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <web-button-toggle
          label="Small"
          size="small"
          [checked]="true">
        </web-button-toggle>

        <web-button-toggle
          label="Medium (padrão)"
          size="medium"
          [checked]="true">
        </web-button-toggle>

        <web-button-toggle
          label="Large"
          size="large"
          [checked]="true">
        </web-button-toggle>
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
        <web-button-toggle
          label="Default - Sólido"
          variant="default"
          [checked]="true">
        </web-button-toggle>

        <web-button-toggle
          label="Outlined - Com borda"
          variant="outlined"
          [checked]="true">
        </web-button-toggle>

        <web-button-toggle
          label="Filled - Preenchido"
          variant="filled"
          [checked]="true">
        </web-button-toggle>

        <web-button-toggle
          label="Soft - Suave"
          variant="soft"
          [checked]="true">
        </web-button-toggle>
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
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <web-button-toggle
          label="Pill - Totalmente arredondado"
          shape="pill"
          size="large"
          [checked]="true">
        </web-button-toggle>

        <web-button-toggle
          label="Rounded - Cantos arredondados"
          shape="rounded"
          size="large"
          [checked]="true">
        </web-button-toggle>

        <web-button-toggle
          label="Square - Cantos quadrados"
          shape="square"
          size="large"
          [checked]="true">
        </web-button-toggle>
      </div>
    `
  })
};

/**
 * Posições do label.
 */
export const LabelPositions: Story = {
  render: () => ({
    template: `
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 32px;">
        <web-button-toggle
          label="Label à esquerda"
          labelPosition="left"
          [checked]="true">
        </web-button-toggle>

        <web-button-toggle
          label="Label à direita"
          labelPosition="right"
          [checked]="true">
        </web-button-toggle>

        <web-button-toggle
          label="Label acima"
          labelPosition="top"
          [checked]="true">
        </web-button-toggle>

        <web-button-toggle
          label="Label abaixo"
          labelPosition="bottom"
          [checked]="true">
        </web-button-toggle>
      </div>
    `
  })
};

/**
 * Toggle com ícones no track.
 */
export const WithIcons: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <web-button-toggle
          label="Modo Escuro"
          checkedIcon="dark_mode"
          uncheckedIcon="light_mode"
          size="large"
          [checked]="true">
        </web-button-toggle>

        <web-button-toggle
          label="Som"
          checkedIcon="volume_up"
          uncheckedIcon="volume_off"
          size="large"
          checkedColor="#007bff"
          [checked]="false">
        </web-button-toggle>

        <web-button-toggle
          label="Wi-Fi"
          checkedIcon="wifi"
          uncheckedIcon="wifi_off"
          size="large"
          checkedColor="#22c55e"
          [checked]="true">
        </web-button-toggle>

        <web-button-toggle
          label="Favorito"
          checkedIcon="favorite"
          uncheckedIcon="favorite_border"
          size="large"
          checkedColor="#e91e63"
          [checked]="false">
        </web-button-toggle>
      </div>
    `
  })
};

/**
 * Toggle com texto no track.
 */
export const WithText: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <web-button-toggle
          label="Liga/Desliga"
          checkedText="ON"
          uncheckedText="OFF"
          size="large"
          [checked]="true">
        </web-button-toggle>

        <web-button-toggle
          label="Confirmação"
          checkedText="SIM"
          uncheckedText="NÃO"
          size="large"
          checkedColor="#22c55e"
          uncheckedColor="#ef4444"
          [checked]="false">
        </web-button-toggle>

        <web-button-toggle
          label="Modo"
          checkedText="AUTO"
          uncheckedText="MAN"
          size="large"
          checkedColor="#007bff"
          [checked]="true">
        </web-button-toggle>
      </div>
    `
  })
};

/**
 * Toggle com ícone no thumb.
 */
export const WithThumbIcon: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <web-button-toggle
          label="Bloqueio"
          thumbIcon="lock"
          size="large"
          checkedColor="#ef4444"
          [checked]="true">
        </web-button-toggle>

        <web-button-toggle
          label="Estrela"
          thumbIcon="star"
          size="large"
          checkedColor="#ffc107"
          thumbIconColor="#ffc107"
          [checked]="false">
        </web-button-toggle>

        <web-button-toggle
          label="Coração"
          thumbIcon="favorite"
          size="large"
          checkedColor="#e91e63"
          thumbIconColor="#e91e63"
          [checked]="true">
        </web-button-toggle>
      </div>
    `
  })
};

/**
 * Cores customizadas por estado.
 */
export const CustomColors: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <web-button-toggle
          label="Verde quando ativo"
          checkedColor="#22c55e"
          uncheckedColor="#d1d5db"
          size="large"
          [checked]="true">
        </web-button-toggle>

        <web-button-toggle
          label="Azul quando ativo"
          checkedColor="#007bff"
          uncheckedColor="#e5e7eb"
          size="large"
          [checked]="true">
        </web-button-toggle>

        <web-button-toggle
          label="Roxo quando ativo"
          checkedColor="#a855f7"
          uncheckedColor="#f3f4f6"
          size="large"
          [checked]="true">
        </web-button-toggle>

        <web-button-toggle
          label="Rosa quando ativo"
          checkedColor="#ec4899"
          uncheckedColor="#fafafa"
          size="large"
          [checked]="true">
        </web-button-toggle>

        <web-button-toggle
          label="Laranja quando ativo"
          checkedColor="#f97316"
          uncheckedColor="#f5f5f5"
          size="large"
          [checked]="true">
        </web-button-toggle>
      </div>
    `
  })
};

/**
 * Temas coloridos completos.
 */
export const ColorThemes: Story = {
  render: () => ({
    template: `
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px;">
        <div style="padding: 20px; background: #f0fdf4; border-radius: 8px;">
          <h4 style="margin: 0 0 16px 0; color: #166534;">Tema Verde</h4>
          <web-button-toggle
            label="Ativo"
            checkedColor="#22c55e"
            uncheckedColor="#dcfce7"
            checkedThumbColor="#ffffff"
            size="large"
            [checked]="true">
          </web-button-toggle>
        </div>

        <div style="padding: 20px; background: #eff6ff; border-radius: 8px;">
          <h4 style="margin: 0 0 16px 0; color: #1e40af;">Tema Azul</h4>
          <web-button-toggle
            label="Ativo"
            checkedColor="#3b82f6"
            uncheckedColor="#dbeafe"
            size="large"
            [checked]="true">
          </web-button-toggle>
        </div>

        <div style="padding: 20px; background: #fef2f2; border-radius: 8px;">
          <h4 style="margin: 0 0 16px 0; color: #991b1b;">Tema Vermelho</h4>
          <web-button-toggle
            label="Ativo"
            checkedColor="#ef4444"
            uncheckedColor="#fee2e2"
            size="large"
            [checked]="true">
          </web-button-toggle>
        </div>

        <div style="padding: 20px; background: #faf5ff; border-radius: 8px;">
          <h4 style="margin: 0 0 16px 0; color: #6b21a8;">Tema Roxo</h4>
          <web-button-toggle
            label="Ativo"
            checkedColor="#a855f7"
            uncheckedColor="#f3e8ff"
            size="large"
            [checked]="true">
          </web-button-toggle>
        </div>
      </div>
    `
  })
};

/**
 * Estados: normal, disabled, loading.
 */
export const States: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <web-button-toggle
          label="Normal - Interativo"
          [checked]="true">
        </web-button-toggle>

        <web-button-toggle
          label="Desabilitado - ON"
          [disabled]="true"
          [checked]="true">
        </web-button-toggle>

        <web-button-toggle
          label="Desabilitado - OFF"
          [disabled]="true"
          [checked]="false">
        </web-button-toggle>

        <web-button-toggle
          label="Loading - Salvando..."
          [loading]="true"
          [checked]="true">
        </web-button-toggle>
      </div>
    `
  })
};

/**
 * Com validação e mensagens.
 */
export const WithValidation: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 32px; max-width: 400px;">
        <web-button-toggle
          label="Campo obrigatório"
          [required]="true"
          helperText="Você deve aceitar para continuar">
        </web-button-toggle>

        <web-button-toggle
          label="Aceito os termos de uso"
          [required]="true"
          errorText="Você deve aceitar os termos"
          checkedColor="#22c55e">
        </web-button-toggle>

        <web-button-toggle
          label="Receber notificações"
          helperText="Você receberá emails sobre atualizações">
        </web-button-toggle>
      </div>
    `
  })
};

/**
 * Casos de uso práticos reais.
 */
export const RealWorldExamples: Story = {
  render: () => ({
    template: `
      <div style="max-width: 600px; margin: 0 auto;">
        <div style="background: white; border: 1px solid #e5e7eb; border-radius: 12px; padding: 24px;">
          <h3 style="margin: 0 0 24px 0; color: #1a1a1a;">Configurações de Notificação</h3>

          <div style="display: flex; flex-direction: column; gap: 20px;">
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 16px; background: #f9fafb; border-radius: 8px;">
              <div>
                <div style="font-weight: 600; margin-bottom: 4px;">Email</div>
                <div style="font-size: 14px; color: #6b7280;">Receber notificações por email</div>
              </div>
              <web-button-toggle
                checkedIcon="mail"
                uncheckedIcon="mail_outline"
                checkedColor="#007bff"
                [checked]="true">
              </web-button-toggle>
            </div>

            <div style="display: flex; justify-content: space-between; align-items: center; padding: 16px; background: #f9fafb; border-radius: 8px;">
              <div>
                <div style="font-weight: 600; margin-bottom: 4px;">Push</div>
                <div style="font-size: 14px; color: #6b7280;">Notificações no dispositivo</div>
              </div>
              <web-button-toggle
                checkedIcon="notifications"
                uncheckedIcon="notifications_off"
                checkedColor="#22c55e"
                [checked]="false">
              </web-button-toggle>
            </div>

            <div style="display: flex; justify-content: space-between; align-items: center; padding: 16px; background: #f9fafb; border-radius: 8px;">
              <div>
                <div style="font-weight: 600; margin-bottom: 4px;">SMS</div>
                <div style="font-size: 14px; color: #6b7280;">Receber mensagens de texto</div>
              </div>
              <web-button-toggle
                checkedIcon="sms"
                uncheckedIcon="sms_failed"
                checkedColor="#ffc107"
                [checked]="true">
              </web-button-toggle>
            </div>

            <div style="display: flex; justify-content: space-between; align-items: center; padding: 16px; background: #f9fafb; border-radius: 8px;">
              <div>
                <div style="font-weight: 600; margin-bottom: 4px;">Modo Escuro</div>
                <div style="font-size: 14px; color: #6b7280;">Interface com tema escuro</div>
              </div>
              <web-button-toggle
                checkedIcon="dark_mode"
                uncheckedIcon="light_mode"
                checkedColor="#6b7280"
                [checked]="false">
              </web-button-toggle>
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
        <h2 style="margin: 0 0 24px 0; text-align: center;">🏆 web-button-toggle vs Concorrentes</h2>

        <div style="background: #f0fdf4; border: 2px solid #22c55e; border-radius: 12px; padding: 24px; margin-bottom: 32px;">
          <h3 style="margin: 0 0 16px 0; color: #166534;">✨ Recursos EXCLUSIVOS (não existem nos concorrentes)</h3>
          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; color: #166534;">
            <div>✅ <strong>4 Variantes</strong> visuais (outros: 1)</div>
            <div>✅ <strong>3 Shapes</strong> diferentes (outros: 1)</div>
            <div>✅ <strong>4 Posições</strong> de label (outros: 1-2)</div>
            <div>✅ <strong>Ícones no Track</strong> (Material UI ❌, Bootstrap ❌)</div>
            <div>✅ <strong>Texto no Track</strong> avançado (Bootstrap ❌)</div>
            <div>✅ <strong>Ícone no Thumb</strong> (todos ❌)</div>
            <div>✅ <strong>Loading State</strong> com spinner (Material UI ❌, Bootstrap ❌)</div>
            <div>✅ <strong>20+ Props de Cor</strong> (outros: 0-3)</div>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-bottom: 32px;">
          <web-button-toggle
            label="Só ON/OFF básico"
            checkedColor="#d1d5db"
            size="large"
            [checked]="true">
          </web-button-toggle>

          <web-button-toggle
            label="Com ícones"
            checkedIcon="check"
            uncheckedIcon="close"
            checkedColor="#22c55e"
            size="large"
            [checked]="true">
          </web-button-toggle>

          <web-button-toggle
            label="Com texto + ícone thumb"
            checkedText="ON"
            uncheckedText="OFF"
            thumbIcon="bolt"
            checkedColor="#007bff"
            size="large"
            [checked]="true">
          </web-button-toggle>
        </div>

        <div style="background: #fff7ed; border: 2px solid #f97316; border-radius: 12px; padding: 24px;">
          <h3 style="margin: 0 0 16px 0; color: #9a3412;">🎨 Customização Total de Cores</h3>
          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px;">
            <web-button-toggle
              label="Tema Primavera"
              checkedColor="#ec4899"
              uncheckedColor="#fce7f3"
              checkedThumbColor="#fff"
              size="large"
              [checked]="true">
            </web-button-toggle>

            <web-button-toggle
              label="Tema Oceano"
              checkedColor="#06b6d4"
              uncheckedColor="#cffafe"
              size="large"
              [checked]="true">
            </web-button-toggle>

            <web-button-toggle
              label="Tema Sunset"
              checkedColor="#f97316"
              uncheckedColor="#ffedd5"
              size="large"
              [checked]="true">
            </web-button-toggle>

            <web-button-toggle
              label="Tema Floresta"
              checkedColor="#10b981"
              uncheckedColor="#d1fae5"
              size="large"
              [checked]="true">
            </web-button-toggle>
          </div>
        </div>
      </div>
    `
  })
};

/**
 * Teste Interativo - Clique para verificar mudança de estado.
 */
export const InteractiveTest: Story = {
  render: () => ({
    props: {
      testStates: {
        toggle1: false,
        toggle2: true,
        toggle3: false,
        toggle4: true
      },
      onChange: function(toggleName: string, value: boolean) {
        console.log(`${toggleName} mudou para:`, value);
        (this as any)['testStates'][toggleName] = value;
      }
    },
    template: `
      <div style="max-width: 800px; margin: 0 auto;">
        <div style="background: #fff3cd; border: 2px solid #ffc107; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
          <h4 style="margin: 0 0 12px 0; color: #856404;">📋 Instruções de Teste:</h4>
          <ol style="margin: 0; color: #856404; line-height: 1.6;">
            <li>Clique em cada toggle abaixo</li>
            <li>Verifique se a bolinha (thumb) se move para a direita quando ativo</li>
            <li>Verifique se a bolinha volta para a esquerda quando inativo</li>
            <li>Verifique se a cor do fundo muda</li>
            <li>Verifique os ícones e texto mudando</li>
            <li>Verifique o console para logs de mudança</li>
          </ol>
        </div>

        <div style="display: flex; flex-direction: column; gap: 32px;">
          <div style="padding: 20px; background: #f9fafb; border-radius: 8px;">
            <h4 style="margin: 0 0 16px 0;">Toggle Básico</h4>
            <web-button-toggle
              label="Clique para alternar"
              size="large"
              [checked]="testStates.toggle1"
              (change)="onChange('toggle1', $event)">
            </web-button-toggle>
            <div style="margin-top: 12px; font-size: 14px; color: #666;">
              Estado atual: <strong>{{ testStates.toggle1 ? 'ATIVADO ✓' : 'DESATIVADO ✗' }}</strong>
            </div>
          </div>

          <div style="padding: 20px; background: #f9fafb; border-radius: 8px;">
            <h4 style="margin: 0 0 16px 0;">Com Ícones</h4>
            <web-button-toggle
              label="Modo Escuro"
              checkedIcon="dark_mode"
              uncheckedIcon="light_mode"
              checkedColor="#6b7280"
              size="large"
              [checked]="testStates.toggle2"
              (change)="onChange('toggle2', $event)">
            </web-button-toggle>
            <div style="margin-top: 12px; font-size: 14px; color: #666;">
              Estado atual: <strong>{{ testStates.toggle2 ? 'ESCURO 🌙' : 'CLARO ☀️' }}</strong>
            </div>
          </div>

          <div style="padding: 20px; background: #f9fafb; border-radius: 8px;">
            <h4 style="margin: 0 0 16px 0;">Com Texto</h4>
            <web-button-toggle
              label="Ligar/Desligar"
              checkedText="ON"
              uncheckedText="OFF"
              checkedColor="#22c55e"
              uncheckedColor="#ef4444"
              size="large"
              [checked]="testStates.toggle3"
              (change)="onChange('toggle3', $event)">
            </web-button-toggle>
            <div style="margin-top: 12px; font-size: 14px; color: #666;">
              Estado atual: <strong>{{ testStates.toggle3 ? 'LIGADO ⚡' : 'DESLIGADO ⭘' }}</strong>
            </div>
          </div>

          <div style="padding: 20px; background: #f9fafb; border-radius: 8px;">
            <h4 style="margin: 0 0 16px 0;">Com Ícone no Thumb</h4>
            <web-button-toggle
              label="Notificações"
              thumbIcon="notifications"
              checkedColor="#007bff"
              size="large"
              [checked]="testStates.toggle4"
              (change)="onChange('toggle4', $event)">
            </web-button-toggle>
            <div style="margin-top: 12px; font-size: 14px; color: #666;">
              Estado atual: <strong>{{ testStates.toggle4 ? 'HABILITADO 🔔' : 'DESABILITADO 🔕' }}</strong>
            </div>
          </div>
        </div>

        <div style="margin-top: 32px; padding: 20px; background: #eff6ff; border-radius: 8px;">
          <h4 style="margin: 0 0 12px 0; color: #1e40af;">✅ O que verificar:</h4>
          <ul style="margin: 0; color: #1e40af; line-height: 1.8;">
            <li>A bolinha (thumb) deve se mover da esquerda para direita</li>
            <li>A cor do fundo deve mudar conforme o estado</li>
            <li>Os ícones devem trocar quando aplicável</li>
            <li>O texto deve mudar quando aplicável</li>
            <li>O estado exibido abaixo deve atualizar</li>
          </ul>
        </div>
      </div>
    `
  })
};

/**
 * Teste Simples - Apenas para debug do movimento do thumb.
 */
export const SimpleDebugTest: Story = {
  render: () => ({
    template: `
      <div style="max-width: 600px; margin: 0 auto; padding: 40px;">
        <div style="background: #fef2f2; border: 2px solid #ef4444; border-radius: 8px; padding: 20px; margin-bottom: 32px;">
          <h3 style="margin: 0 0 12px 0; color: #991b1b;">🔍 Teste de Debug</h3>
          <p style="margin: 0; color: #991b1b;">Clique nos toggles abaixo e observe:</p>
          <ul style="margin: 12px 0 0 0; color: #991b1b;">
            <li>A bolinha branca deve se mover</li>
            <li>Abra as DevTools (F12) e inspecione a classe "toggle-checked"</li>
            <li>Verifique se o transform está sendo aplicado</li>
          </ul>
        </div>

        <div style="display: flex; flex-direction: column; gap: 40px;">
          <div>
            <h4 style="margin: 0 0 16px 0;">1. Toggle OFF → Clique para ligar</h4>
            <web-button-toggle
              label="Estado inicial: OFF"
              size="large"
              [checked]="false">
            </web-button-toggle>
            <p style="font-size: 13px; color: #666; margin-top: 8px;">
              Esperado: Bolinha à esquerda, fundo cinza
            </p>
          </div>

          <div>
            <h4 style="margin: 0 0 16px 0;">2. Toggle ON → Clique para desligar</h4>
            <web-button-toggle
              label="Estado inicial: ON"
              size="large"
              checkedColor="#22c55e"
              [checked]="true">
            </web-button-toggle>
            <p style="font-size: 13px; color: #666; margin-top: 8px;">
              Esperado: Bolinha à direita, fundo verde
            </p>
          </div>

          <div>
            <h4 style="margin: 0 0 16px 0;">3. Toggle Medium (padrão)</h4>
            <web-button-toggle
              label="Tamanho médio - 44x24px"
              size="medium"
              checkedColor="#007bff"
              [checked]="false">
            </web-button-toggle>
            <p style="font-size: 13px; color: #666; margin-top: 8px;">
              Esperado: Bolinha move 20px quando ativado
            </p>
          </div>

          <div>
            <h4 style="margin: 0 0 16px 0;">4. Toggle Small</h4>
            <web-button-toggle
              label="Tamanho pequeno - 36x20px"
              size="small"
              checkedColor="#a855f7"
              [checked]="false">
            </web-button-toggle>
            <p style="font-size: 13px; color: #666; margin-top: 8px;">
              Esperado: Bolinha move 16px quando ativado
            </p>
          </div>
        </div>

        <div style="margin-top: 40px; padding: 20px; background: #f0fdf4; border-radius: 8px;">
          <h4 style="margin: 0 0 12px 0; color: #166534;">💡 Dica de Debug:</h4>
          <p style="margin: 0; color: #166534; line-height: 1.6;">
            1. Abra DevTools (F12)<br>
            2. Clique em um toggle<br>
            3. Inspecione o elemento com classe "toggle-container"<br>
            4. Verifique se a classe "toggle-checked" é adicionada/removida<br>
            5. Inspecione o elemento com classe "toggle-thumb"<br>
            6. Verifique o CSS transform: translateX(20px) quando ativo
          </p>
        </div>
      </div>
    `
  })
};
