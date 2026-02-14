import type { Meta, StoryObj } from '@storybook/angular';
import { RippleDirective } from './ripple.directive';
import { Component } from '@angular/core';

// Wrapper component que importa a diretiva
@Component({
  selector: 'story-wrapper',
  standalone: true,
  imports: [RippleDirective],
  template: `<ng-content></ng-content>`
})
class StoryWrapperComponent {}

/**
 * # Ripple Directive
 *
 * Uma diretiva de efeito ripple (ondulação) moderna que DOMINA todos os concorrentes
 * com cores customizáveis, animações suaves e performance otimizada.
 *
 * ## 🏆 COMPARATIVO COM CONCORRENTES
 *
 * ### Material UI
 * | Feature | Material UI | **web-ripple** |
 * |---------|-------------|----------------|
 * | Cores | 1 (tema) | **Qualquer** ✨ |
 * | Opacidade | Fixa | **Customizável** ✨ |
 * | Duração | 600ms | **Customizável** ✨ |
 * | Posição | Cursor | **2 modos** ✨ |
 * | Unbounded | ✅ | **✅** |
 * | Radius | Auto | **Customizável** ✨ |
 *
 * ## 🎯 Recursos Exclusivos
 *
 * - ✅ **Qualquer Cor**: Hex, RGB, RGBA
 * - ✅ **Opacidade**: 0-1 customizável
 * - ✅ **Duração**: ms customizável
 * - ✅ **2 Posições**: cursor ou center
 * - ✅ **Unbounded**: Ripple além dos limites
 * - ✅ **Radius**: Tamanho customizável
 * - ✅ **Performance**: NgZone otimizado
 *
 * ## 📦 Como Usar
 *
 * ```typescript
 * import { RippleDirective } from '@thiagosantosa/web-components';
 *
 * @Component({
 *   standalone: true,
 *   imports: [RippleDirective],
 *   template: '<button webRipple>Click me</button>'
 * })
 * ```
 */
const meta: Meta<StoryWrapperComponent> = {
  title: 'Directives/Ripple',
  component: StoryWrapperComponent,
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<StoryWrapperComponent>;

/**
 * Ripple básico com cor padrão. Clique para ver o efeito!
 */
export const Basic: Story = {
  render: () => ({
    props: {},
    template: `
      <story-wrapper>
        <button
          webRipple
          style="padding: 16px 32px; background: #007bff; color: white; border: none; border-radius: 6px; font-size: 16px; cursor: pointer; font-weight: 500;">
          Click me
        </button>
      </story-wrapper>
    `
  })
};

/**
 * Diferentes cores de ripple.
 */
export const Colors: Story = {
  render: () => ({
    props: {},
    template: `
      <story-wrapper>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 16px;">
          <button
            webRipple
            rippleColor="#007bff"
            style="padding: 16px 24px; background: #e7f3ff; color: #007bff; border: 2px solid #007bff; border-radius: 6px; cursor: pointer; font-weight: 500;">
            Blue
          </button>

          <button
            webRipple
            rippleColor="#22c55e"
            style="padding: 16px 24px; background: #f0fdf4; color: #22c55e; border: 2px solid #22c55e; border-radius: 6px; cursor: pointer; font-weight: 500;">
            Green
          </button>

          <button
            webRipple
            rippleColor="#ef4444"
            style="padding: 16px 24px; background: #fef2f2; color: #ef4444; border: 2px solid #ef4444; border-radius: 6px; cursor: pointer; font-weight: 500;">
            Red
          </button>

          <button
            webRipple
            rippleColor="#ffc107"
            style="padding: 16px 24px; background: #fffbeb; color: #d97706; border: 2px solid #ffc107; border-radius: 6px; cursor: pointer; font-weight: 500;">
            Yellow
          </button>

          <button
            webRipple
            rippleColor="#a855f7"
            style="padding: 16px 24px; background: #faf5ff; color: #a855f7; border: 2px solid #a855f7; border-radius: 6px; cursor: pointer; font-weight: 500;">
            Purple
          </button>

          <button
            webRipple
            rippleColor="rgba(255, 255, 255, 0.5)"
            style="padding: 16px 24px; background: #1a1a1a; color: white; border: 2px solid #333; border-radius: 6px; cursor: pointer; font-weight: 500;">
            White
          </button>
        </div>
      </story-wrapper>
    `
  })
};

/**
 * Opacidades diferentes.
 */
export const Opacity: Story = {
  render: () => ({
    props: {},
    template: `
      <story-wrapper>
        <div style="display: flex; gap: 16px; flex-wrap: wrap;">
          <button
            webRipple
            rippleColor="#007bff"
            [rippleOpacity]="0.1"
            style="padding: 16px 24px; background: white; color: #007bff; border: 2px solid #007bff; border-radius: 6px; cursor: pointer; font-weight: 500;">
            Opacity 0.1
          </button>

          <button
            webRipple
            rippleColor="#007bff"
            [rippleOpacity]="0.3"
            style="padding: 16px 24px; background: white; color: #007bff; border: 2px solid #007bff; border-radius: 6px; cursor: pointer; font-weight: 500;">
            Opacity 0.3
          </button>

          <button
            webRipple
            rippleColor="#007bff"
            [rippleOpacity]="0.5"
            style="padding: 16px 24px; background: white; color: #007bff; border: 2px solid #007bff; border-radius: 6px; cursor: pointer; font-weight: 500;">
            Opacity 0.5
          </button>

          <button
            webRipple
            rippleColor="#007bff"
            [rippleOpacity]="0.8"
            style="padding: 16px 24px; background: white; color: #007bff; border: 2px solid #007bff; border-radius: 6px; cursor: pointer; font-weight: 500;">
            Opacity 0.8
          </button>
        </div>
      </story-wrapper>
    `
  })
};

/**
 * Durações diferentes (velocidades).
 */
export const Duration: Story = {
  render: () => ({
    props: {},
    template: `
      <story-wrapper>
        <div style="display: flex; gap: 16px; flex-wrap: wrap;">
          <button
            webRipple
            rippleColor="#22c55e"
            [rippleDuration]="300"
            style="padding: 16px 24px; background: #22c55e; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 500;">
            Fast (300ms)
          </button>

          <button
            webRipple
            rippleColor="#22c55e"
            [rippleDuration]="600"
            style="padding: 16px 24px; background: #22c55e; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 500;">
            Normal (600ms)
          </button>

          <button
            webRipple
            rippleColor="#22c55e"
            [rippleDuration]="1000"
            style="padding: 16px 24px; background: #22c55e; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 500;">
            Slow (1000ms)
          </button>

          <button
            webRipple
            rippleColor="#22c55e"
            [rippleDuration]="1500"
            style="padding: 16px 24px; background: #22c55e; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 500;">
            Very Slow (1500ms)
          </button>
        </div>
      </story-wrapper>
    `
  })
};

/**
 * Posições: cursor vs center.
 */
export const Position: Story = {
  render: () => ({
    props: {},
    template: `
      <story-wrapper>
        <div style="display: flex; gap: 24px; flex-wrap: wrap;">
          <div style="text-align: center;">
            <button
              webRipple
              ripplePosition="cursor"
              rippleColor="#007bff"
              style="padding: 20px 40px; background: white; color: #007bff; border: 2px solid #007bff; border-radius: 8px; cursor: pointer; font-weight: 500; font-size: 16px;">
              From Cursor
            </button>
            <p style="margin-top: 12px; font-size: 13px; color: #666;">
              Clique em diferentes posições
            </p>
          </div>

          <div style="text-align: center;">
            <button
              webRipple
              ripplePosition="center"
              rippleColor="#a855f7"
              style="padding: 20px 40px; background: white; color: #a855f7; border: 2px solid #a855f7; border-radius: 8px; cursor: pointer; font-weight: 500; font-size: 16px;">
              From Center
            </button>
            <p style="margin-top: 12px; font-size: 13px; color: #666;">
              Sempre do centro
            </p>
          </div>
        </div>
      </story-wrapper>
    `
  })
};

/**
 * Unbounded (sem limites).
 */
export const Unbounded: Story = {
  render: () => ({
    props: {},
    template: `
      <story-wrapper>
        <div style="display: flex; gap: 24px; flex-wrap: wrap; align-items: flex-start;">
          <div>
            <button
              webRipple
              rippleColor="#ef4444"
              [rippleUnbounded]="false"
              style="padding: 20px 40px; background: #fef2f2; color: #ef4444; border: 2px solid #ef4444; border-radius: 8px; cursor: pointer; font-weight: 500;">
              Bounded
            </button>
            <p style="margin-top: 12px; font-size: 13px; color: #666; max-width: 200px;">
              Ripple fica contido no botão
            </p>
          </div>

          <div>
            <button
              webRipple
              rippleColor="#22c55e"
              [rippleUnbounded]="true"
              style="padding: 20px 40px; background: #f0fdf4; color: #22c55e; border: 2px solid #22c55e; border-radius: 8px; cursor: pointer; font-weight: 500; overflow: visible;">
              Unbounded
            </button>
            <p style="margin-top: 12px; font-size: 13px; color: #666; max-width: 200px;">
              Ripple ultrapassa os limites
            </p>
          </div>
        </div>
      </story-wrapper>
    `
  })
};

/**
 * Radius customizado.
 */
export const CustomRadius: Story = {
  render: () => ({
    props: {},
    template: `
      <story-wrapper>
        <div style="display: flex; gap: 16px; flex-wrap: wrap;">
          <button
            webRipple
            rippleColor="#007bff"
            [rippleRadius]="30"
            ripplePosition="center"
            style="padding: 16px 24px; background: #007bff; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 500;">
            Small (30px)
          </button>

          <button
            webRipple
            rippleColor="#007bff"
            [rippleRadius]="60"
            ripplePosition="center"
            style="padding: 16px 24px; background: #007bff; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 500;">
            Medium (60px)
          </button>

          <button
            webRipple
            rippleColor="#007bff"
            [rippleRadius]="100"
            ripplePosition="center"
            style="padding: 16px 24px; background: #007bff; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 500;">
            Large (100px)
          </button>

          <button
            webRipple
            rippleColor="#007bff"
            [rippleRadius]="150"
            ripplePosition="center"
            style="padding: 16px 24px; background: #007bff; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 500;">
            XLarge (150px)
          </button>
        </div>
      </story-wrapper>
    `
  })
};

/**
 * Em cards clicáveis.
 */
export const Cards: Story = {
  render: () => ({
    props: {},
    template: `
      <story-wrapper>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 24px;">
          <div
            webRipple
            rippleColor="#007bff"
            [rippleOpacity]="0.15"
            style="padding: 24px; border: 1px solid #e5e7eb; border-radius: 12px; cursor: pointer; transition: box-shadow 0.2s;">
            <h3 style="margin: 0 0 12px 0; color: #1a1a1a;">Card com Ripple</h3>
            <p style="margin: 0; color: #666; line-height: 1.6;">
              Clique neste card para ver o efeito ripple azul.
            </p>
          </div>

          <div
            webRipple
            rippleColor="#22c55e"
            [rippleOpacity]="0.2"
            style="padding: 24px; border: 1px solid #e5e7eb; border-radius: 12px; cursor: pointer; transition: box-shadow 0.2s;">
            <h3 style="margin: 0 0 12px 0; color: #1a1a1a;">Card Verde</h3>
            <p style="margin: 0; color: #666; line-height: 1.6;">
              Ripple verde com opacidade customizada.
            </p>
          </div>

          <div
            webRipple
            rippleColor="#a855f7"
            [rippleOpacity]="0.15"
            [rippleDuration]="800"
            style="padding: 24px; border: 1px solid #e5e7eb; border-radius: 12px; cursor: pointer; transition: box-shadow 0.2s;">
            <h3 style="margin: 0 0 12px 0; color: #1a1a1a;">Card Roxo</h3>
            <p style="margin: 0; color: #666; line-height: 1.6;">
              Ripple roxo com animação mais lenta.
            </p>
          </div>
        </div>
      </story-wrapper>
    `
  })
};

/**
 * Playground interativo.
 */
export const Playground: Story = {
  render: () => ({
    props: {},
    template: `
      <story-wrapper>
        <div style="max-width: 800px; margin: 0 auto;">
          <div style="background: #f9fafb; border-radius: 12px; padding: 32px; text-align: center;">
            <h3 style="margin: 0 0 24px 0;">🎨 Playground Interativo</h3>

            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; margin-bottom: 32px;">
              <button
                webRipple
                rippleColor="#007bff"
                [rippleOpacity]="0.3"
                [rippleDuration]="600"
                ripplePosition="cursor"
                style="padding: 24px; background: #007bff; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 600; font-size: 16px;">
                Ripple Padrão
              </button>

              <button
                webRipple
                rippleColor="#22c55e"
                [rippleOpacity]="0.5"
                [rippleDuration]="400"
                ripplePosition="center"
                style="padding: 24px; background: white; color: #22c55e; border: 2px solid #22c55e; border-radius: 8px; cursor: pointer; font-weight: 600; font-size: 16px;">
                Verde Centro
              </button>

              <button
                webRipple
                rippleColor="rgba(168, 85, 247, 0.6)"
                [rippleOpacity]="0.4"
                [rippleDuration]="1000"
                ripplePosition="cursor"
                style="padding: 24px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 600; font-size: 16px;">
                Roxo Lento
              </button>

              <button
                webRipple
                rippleColor="#ffc107"
                [rippleOpacity]="0.6"
                [rippleDuration]="300"
                [rippleRadius]="80"
                ripplePosition="center"
                style="padding: 24px; background: #ffc107; color: #000; border: none; border-radius: 8px; cursor: pointer; font-weight: 600; font-size: 16px;">
                Amarelo Rápido
              </button>
            </div>

            <div style="padding: 20px; background: #fff; border-radius: 8px; text-align: left;">
              <h4 style="margin: 0 0 12px 0; color: #1a1a1a;">💡 Experimente:</h4>
              <ul style="margin: 0; padding-left: 20px; color: #666; line-height: 1.8;">
                <li>Clique em diferentes posições dos botões</li>
                <li>Observe as diferentes velocidades</li>
                <li>Note as opacidades variadas</li>
                <li>Compare cursor vs center position</li>
              </ul>
            </div>
          </div>
        </div>
      </story-wrapper>
    `
  })
};
