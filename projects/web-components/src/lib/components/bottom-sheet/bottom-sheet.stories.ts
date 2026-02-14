import type { Meta, StoryObj } from '@storybook/angular';
import { BottomSheetComponent } from './bottom-sheet.component';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'bottom-sheet-demo',
  standalone: true,
  imports: [BottomSheetComponent],
  template: `
    <div style="padding: 20px; font-family: 'Montserrat', sans-serif;">
      <button
        (click)="toggleSheet()"
        style="padding: 12px 24px; background: #009ADA; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 500; font-family: 'Montserrat', sans-serif; font-size: 14px;">
        {{ isOpen ? 'Fechar' : 'Abrir' }} Bottom Sheet
      </button>

      <web-bottom-sheet
        [isOpen]="isOpen"
        [title]="title"
        [subtitle]="subtitle"
        [icon]="icon"
        [iconColor]="iconColor"
        [size]="size"
        [footer]="footer"
        [loading]="loading"
        [loadingText]="loadingText"
        (closed)="isOpen = false">
        <ng-content></ng-content>
        <ng-content select="[bottom-sheet-footer]"></ng-content>
      </web-bottom-sheet>
    </div>
  `
})
class BottomSheetDemoComponent {
  @Input() title = 'Bottom Sheet';
  @Input() subtitle = '';
  @Input() icon = '';
  @Input() iconColor = '#009ADA';
  @Input() size: 'small' | 'medium' | 'large' | 'full' | 'auto' = 'medium';
  @Input() footer = false;
  @Input() loading = false;
  @Input() loadingText = '';

  isOpen = false;

  toggleSheet() {
    this.isOpen = !this.isOpen;
  }
}

/**
 * # Bottom Sheet Component
 *
 * Um componente de bottom sheet moderno que DOMINA todos os concorrentes
 * com swipe to dismiss, snap points e design profissional igual ao modal anexado.
 *
 * ## 🏆 COMPARATIVO COM CONCORRENTES
 *
 * ### Material UI
 * | Feature | Material UI | **web-bottom-sheet** |
 * |---------|-------------|----------------------|
 * | Tamanhos | 2 | **5** ✨ |
 * | Swipe | ✅ | **✅ Melhorado** ✨ |
 * | Snap Points | ❌ | **✅** ✨ |
 * | Drag Handle | ❌ | **✅** ✨ |
 * | Nested Scroll | ❌ | **✅** ✨ |
 * | Design Premium | ❌ | **✅ Montserrat** ✨ |
 *
 * ### Ant Design
 * | Feature | Ant Design | **web-bottom-sheet** |
 * |---------|------------|----------------------|
 * | Swipe Dismiss | ❌ | **✅** ✨ |
 * | Auto Height | ❌ | **✅** ✨ |
 * | Design Premium | ❌ | **✅** ✨ |
 *
 * ## 🎯 Recursos Principais
 *
 * - **5 Tamanhos**: small (30%), medium (50%), large (75%), full (90%), auto
 * - **Swipe to Dismiss**: Arraste para baixo para fechar
 * - **Drag Handle**: Indicador visual interativo
 * - **Nested Scroll**: Scroll inteligente dentro do conteúdo
 * - **Snap Points**: Múltiplos pontos de parada
 * - **Loading State**: Spinner com texto customizável
 * - **Design Premium**: Montserrat + Gradientes + Sombras
 * - **Touch Support**: Mouse + Touch gestures
 *
 * ## 📦 Instalação
 *
 * ```typescript
 * import { BottomSheetComponent } from '@thiagosantosa/web-components';
 *
 * @Component({
 *   standalone: true,
 *   imports: [BottomSheetComponent]
 * })
 * ```
 *
 * ## 💡 Como Funciona
 *
 * ### Componente Demo (usado nas stories):
 *
 * ```typescript
 * @Component({
 *   selector: 'bottom-sheet-demo',
 *   standalone: true,
 *   imports: [BottomSheetComponent],
 *   template: `
 *     <button (click)="toggleSheet()">
 *       {{ isOpen ? 'Fechar' : 'Abrir' }} Bottom Sheet
 *     </button>
 *
 *     <web-bottom-sheet
 *       [isOpen]="isOpen"
 *       [title]="title"
 *       [subtitle]="subtitle"
 *       [icon]="icon"
 *       [iconColor]="iconColor"
 *       (closed)="isOpen = false">
 *       <ng-content></ng-content>
 *     </web-bottom-sheet>
 *   `
 * })
 * class BottomSheetDemoComponent {
 *   @Input() title = 'Bottom Sheet';
 *   @Input() subtitle = '';
 *   @Input() icon = '';
 *   @Input() iconColor = '#009ADA';
 *
 *   isOpen = false;
 *
 *   toggleSheet() {
 *     this.isOpen = !this.isOpen;
 *   }
 * }
 * ```
 *
 * ### Uso Básico no seu App:
 *
 * ```typescript
 * @Component({
 *   template: `
 *     <button (click)="showSheet = true">Abrir</button>
 *
 *     <web-bottom-sheet
 *       [isOpen]="showSheet"
 *       title="Meu Bottom Sheet"
 *       subtitle="Descrição"
 *       (closed)="showSheet = false">
 *       <div>Conteúdo aqui</div>
 *     </web-bottom-sheet>
 *   `
 * })
 * export class MyComponent {
 *   showSheet = false;
 * }
 * ```
 *
 * ### Com Tamanhos:
 *
 * ```html
 * <!-- Small (30%) -->
 * <web-bottom-sheet size="small">...</web-bottom-sheet>
 *
 * <!-- Medium (50%) - padrão -->
 * <web-bottom-sheet size="medium">...</web-bottom-sheet>
 *
 * <!-- Large (75%) -->
 * <web-bottom-sheet size="large">...</web-bottom-sheet>
 *
 * <!-- Full (90%) -->
 * <web-bottom-sheet size="full">...</web-bottom-sheet>
 *
 * <!-- Auto (ajusta ao conteúdo) -->
 * <web-bottom-sheet size="auto">...</web-bottom-sheet>
 * ```
 *
 * ### Com Ícone:
 *
 * ```html
 * <web-bottom-sheet
 *   title="Novo Item"
 *   subtitle="Preencha os dados"
 *   icon="add_circle"
 *   iconColor="#009ADA">
 *   ...
 * </web-bottom-sheet>
 * ```
 *
 * ### Com Footer:
 *
 * ```html
 * <web-bottom-sheet [footer]="true">
 *   <div>Conteúdo</div>
 *
 *   <div bottom-sheet-footer>
 *     <button (click)="cancel()">Cancelar</button>
 *     <button (click)="save()">Salvar</button>
 *   </div>
 * </web-bottom-sheet>
 * ```
 *
 * ### Com Loading:
 *
 * ```html
 * <web-bottom-sheet
 *   [loading]="saving"
 *   loadingText="Salvando...">
 *   ...
 * </web-bottom-sheet>
 * ```
 *
 * ## 🎨 Design CSS (idêntico ao Modal)
 *
 * - ✅ Font: Montserrat (400, 500, 600, 700)
 * - ✅ Cor Primária: #009ADA
 * - ✅ Gradientes: linear-gradient(135deg, ...)
 * - ✅ Sombras: 0 -25px 50px -12px rgba(0, 0, 0, 0.25)
 * - ✅ Border Radius: 1.5rem (top)
 * - ✅ Animações: cubic-bezier(0.16, 1, 0.3, 1)
 *
 * ## 📋 Props Completas
 *
 * | Prop | Tipo | Default | Descrição |
 * |------|------|---------|-----------|
 * | isOpen | boolean | false | Controla abertura |
 * | title | string | '' | Título |
 * | subtitle | string | '' | Subtítulo |
 * | icon | string | '' | Material Icon |
 * | iconColor | string | '#009ADA' | Cor do ícone |
 * | size | BottomSheetSize | 'medium' | Tamanho (small/medium/large/full/auto) |
 * | closable | boolean | true | Mostra botão X |
 * | closeOnBackdropClick | boolean | true | Fecha ao clicar fora |
 * | closeOnEscape | boolean | true | Fecha com ESC |
 * | swipeToDismiss | boolean | true | Arraste para fechar |
 * | bodyPadding | boolean | true | Padding no body |
 * | blurBackground | boolean | true | Blur no backdrop |
 * | footer | boolean | false | Mostra footer |
 * | loading | boolean | false | Estado loading |
 * | loadingText | string | '' | Texto do loading |
 * | enableSnapPoints | boolean | false | Ativa snap points |
 * | snapPoints | number[] | [0.3, 0.6, 0.9] | Pontos de parada |
 *
 * ## 📤 Eventos
 *
 * | Evento | Payload | Descrição |
 * |--------|---------|-----------|
 * | closed | void | Disparado ao fechar |
 * | opened | void | Disparado ao abrir |
 */
const meta: Meta<BottomSheetDemoComponent> = {
  title: 'Popups & Modals/BottomSheet',
  component: BottomSheetDemoComponent,
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<BottomSheetDemoComponent>;

/**
 * Bottom sheet básico. Clique para abrir e arraste para baixo para fechar!
 */
export const Basic: Story = {
  args: {
    title: 'Bottom Sheet Básico',
    subtitle: 'Arraste para baixo para fechar'
  },
  render: (args) => ({
    props: args,
    template: `
      <bottom-sheet-demo
        [title]="title"
        [subtitle]="subtitle">
        <div style="padding: 20px;">
          <p style="margin: 0 0 16px 0; line-height: 1.6;">
            Este é um bottom sheet básico com título e subtítulo.
          </p>
          <p style="margin: 0; line-height: 1.6;">
            Você pode arrastar a alça superior para baixo para fechá-lo!
          </p>
        </div>
      </bottom-sheet-demo>
    `
  })
};

/**
 * Com ícone e cores personalizadas.
 */
export const WithIcon: Story = {
  args: {
    title: 'Novo Produto',
    subtitle: 'Adicione um novo produto',
    icon: 'add_shopping_cart',
    iconColor: '#009ADA'
  },
  render: (args) => ({
    props: args,
    template: `
      <bottom-sheet-demo
        [title]="title"
        [subtitle]="subtitle"
        [icon]="icon"
        [iconColor]="iconColor">
        <div style="padding: 20px;">
          <p style="margin: 0; line-height: 1.6;">
            Bottom sheet com ícone personalizado e gradiente azul.
          </p>
        </div>
      </bottom-sheet-demo>
    `
  })
};

/**
 * Tamanho Small (30% de altura).
 */
export const Small: Story = {
  args: {
    title: 'Small Sheet',
    subtitle: 'Ocupa 30% da tela',
    size: 'small'
  },
  render: (args) => ({
    props: args,
    template: `
      <bottom-sheet-demo
        [title]="title"
        [subtitle]="subtitle"
        [size]="size">
        <div style="padding: 20px;">
          <p style="margin: 0;">Bottom sheet pequeno (30%).</p>
        </div>
      </bottom-sheet-demo>
    `
  })
};

/**
 * Tamanho Large (75% de altura).
 */
export const Large: Story = {
  args: {
    title: 'Large Sheet',
    subtitle: 'Ocupa 75% da tela',
    size: 'large'
  },
  render: (args) => ({
    props: args,
    template: `
      <bottom-sheet-demo
        [title]="title"
        [subtitle]="subtitle"
        [size]="size">
        <div style="padding: 20px;">
          <p style="margin: 0 0 16px 0;">Bottom sheet grande (75%).</p>
          <p style="margin: 0;">Perfeito para conteúdo mais extenso.</p>
        </div>
      </bottom-sheet-demo>
    `
  })
};

/**
 * Com conteúdo scrollável.
 */
export const Scrollable: Story = {
  args: {
    title: 'Conteúdo Longo',
    subtitle: 'Role para ver mais',
    icon: 'article',
    size: 'large'
  },
  render: (args) => ({
    props: args,
    template: `
      <bottom-sheet-demo
        [title]="title"
        [subtitle]="subtitle"
        [icon]="icon"
        [size]="size">
        <div style="padding: 20px;">
          <h3 style="margin: 0 0 16px 0; font-weight: 600;">Lorem Ipsum</h3>
          <p style="margin: 0 0 16px 0; line-height: 1.8;">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <p style="margin: 0 0 16px 0; line-height: 1.8;">
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <h3 style="margin: 0 0 16px 0; font-weight: 600;">Mais Conteúdo</h3>
          <p style="margin: 0 0 16px 0; line-height: 1.8;">
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          </p>
          <p style="margin: 0 0 16px 0; line-height: 1.8;">
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <p style="margin: 0; line-height: 1.8;">
            Role até aqui e tente arrastar - só funciona quando o scroll está no topo!
          </p>
        </div>
      </bottom-sheet-demo>
    `
  })
};

/**
 * Com footer e ações.
 */
export const WithFooter: Story = {
  args: {
    title: 'Confirmar Ação',
    subtitle: 'Tem certeza que deseja continuar?',
    icon: 'help',
    iconColor: '#f59e0b',
    footer: true
  },
  render: (args) => ({
    props: args,
    template: `
      <bottom-sheet-demo
        [title]="title"
        [subtitle]="subtitle"
        [icon]="icon"
        [iconColor]="iconColor"
        [footer]="footer">
        <div style="padding: 20px;">
          <p style="margin: 0; line-height: 1.6;">
            Esta ação não pode ser desfeita. Deseja continuar?
          </p>
        </div>

        <div bottom-sheet-footer style="display: flex; gap: 12px; width: 100%; justify-content: flex-end;">
          <button
            style="padding: 10px 20px; background: white; color: #6b7280; border: 1px solid #e5e7eb; border-radius: 6px; cursor: pointer; font-weight: 500; font-family: 'Montserrat', sans-serif;">
            Cancelar
          </button>
          <button
            style="padding: 10px 20px; background: #009ADA; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 500; font-family: 'Montserrat', sans-serif;">
            Confirmar
          </button>
        </div>
      </bottom-sheet-demo>
    `
  })
};

/**
 * Exemplo completo: Filtros de produtos.
 */
export const FiltersExample: Story = {
  args: {
    title: 'Filtrar Produtos',
    subtitle: 'Selecione os filtros desejados',
    icon: 'filter_list',
    iconColor: '#009ADA',
    size: 'large',
    footer: true
  },
  render: (args) => ({
    props: args,
    template: `
      <bottom-sheet-demo
        [title]="title"
        [subtitle]="subtitle"
        [icon]="icon"
        [iconColor]="iconColor"
        [size]="size"
        [footer]="footer">
        <div style="padding: 20px;">
          <div style="margin-bottom: 24px;">
            <label style="display: block; font-weight: 600; margin-bottom: 8px; color: #111827;">Categoria</label>
            <select style="width: 100%; padding: 10px; border: 1px solid #e5e7eb; border-radius: 6px; font-family: 'Montserrat', sans-serif;">
              <option>Todas</option>
              <option>Eletrônicos</option>
              <option>Roupas</option>
              <option>Livros</option>
            </select>
          </div>

          <div style="margin-bottom: 24px;">
            <label style="display: block; font-weight: 600; margin-bottom: 8px; color: #111827;">Faixa de Preço</label>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
              <input type="number" placeholder="Mín" style="padding: 10px; border: 1px solid #e5e7eb; border-radius: 6px; font-family: 'Montserrat', sans-serif;">
              <input type="number" placeholder="Máx" style="padding: 10px; border: 1px solid #e5e7eb; border-radius: 6px; font-family: 'Montserrat', sans-serif;">
            </div>
          </div>

          <div style="margin-bottom: 24px;">
            <label style="display: block; font-weight: 600; margin-bottom: 12px; color: #111827;">Ordenar por</label>
            <div style="display: flex; flex-direction: column; gap: 8px;">
              <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
                <input type="radio" name="sort" checked>
                <span>Mais relevantes</span>
              </label>
              <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
                <input type="radio" name="sort">
                <span>Menor preço</span>
              </label>
              <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
                <input type="radio" name="sort">
                <span>Maior preço</span>
              </label>
            </div>
          </div>
        </div>

        <div bottom-sheet-footer style="display: flex; gap: 12px; width: 100%; justify-content: flex-end;">
          <button
            style="padding: 10px 20px; background: white; color: #6b7280; border: 1px solid #e5e7eb; border-radius: 6px; cursor: pointer; font-weight: 500; font-family: 'Montserrat', sans-serif;">
            Limpar
          </button>
          <button
            style="padding: 10px 20px; background: #009ADA; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 500; font-family: 'Montserrat', sans-serif;">
            Aplicar Filtros
          </button>
        </div>
      </bottom-sheet-demo>
    `
  })
};
