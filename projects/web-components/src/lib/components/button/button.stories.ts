import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { ButtonComponent } from './button.component';

const meta: Meta<ButtonComponent> = {
  title: 'Buttons & Indicators/Button',
  component: ButtonComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
 1️⃣ INSTALAÇÃO
--------------
\`\`\`bash
npm install @web/ui-components
\`\`\`

2️⃣ IMPORT NO SEU COMPONENTE
----------------------------
\`\`\`ts
import { ButtonComponent } from '@web/ui-components';

@Component({
  selector: 'app-meu-componente',
  standalone: true,
  imports: [ButtonComponent],
  template: \`
    <web-button label="Clique Aqui"></web-button>
  \`
})
export class MeuComponente {}
\`\`\`

3️⃣ USO NO TEMPLATE
-------------------

### Básico
\`\`\`html
<web-button label="Salvar"></web-button>
\`\`\`

### Com ícone
\`\`\`html
<web-button label="Salvar" iconLeft="save"></web-button>
\`\`\`

### Com evento
\`\`\`html
<web-button 
  label="Salvar" 
  (click)="onSave()">
</web-button>
\`\`\`

### Com todas as props
\`\`\`html
<web-button 
  label="Enviar"
  variant="primary"
  size="medium"
  iconRight="send"
  [loading]="isLoading"
  [disabled]="!formValid"
  (click)="onSubmit()">
</web-button>
\`\`\`

4️⃣ PARA COMPONENTES NÃO-STANDALONE (NgModule)
----------------------------------------------
\`\`\`ts
import { ButtonComponent } from '@web/ui-components';

@NgModule({
  declarations: [MeuComponente],
  imports: [
    ButtonComponent
  ]
})
export class MeuModule {}
\`\`\`

💡 DICA: Veja os exemplos abaixo para conhecer todas as variações disponíveis!
        `
      }
    }
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost', 'danger', 'success', 'warning', 'dark', 'light']
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large']
    },
    rounded: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'full']
    },
    shadow: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg']
    },
    justify: {
      control: 'select',
      options: ['start', 'center', 'end', 'between']
    },
    disabled: {
      control: 'boolean'
    },
    loading: {
      control: 'boolean'
    },
    fullWidth: {
      control: 'boolean'
    },
    iconOnly: {
      control: 'boolean'
    }
  }
};

export default meta;
type Story = StoryObj<ButtonComponent>;

// ========== VARIANTS ==========

export const Primary: Story = {
  args: {
    variant: 'primary',
    size: 'medium'
  },
  render: (args) => ({
    props: args,
    template: `<web-button [variant]="variant" [size]="size">Primary Button</web-button>`
  })
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    size: 'medium'
  },
  render: (args) => ({
    props: args,
    template: `<web-button [variant]="variant" [size]="size">Secondary Button</web-button>`
  })
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    size: 'medium'
  },
  render: (args) => ({
    props: args,
    template: `<web-button [variant]="variant" [size]="size">Outline Button</web-button>`
  })
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    size: 'medium'
  },
  render: (args) => ({
    props: args,
    template: `<web-button [variant]="variant" [size]="size">Ghost Button</web-button>`
  })
};

export const AllVariants: Story = {
  name: 'Todas as Variantes',
  render: () => ({
    template: `
      <div style="display: flex; flex-wrap: wrap; gap: 1rem;">
        <web-button variant="primary">Primary</web-button>
        <web-button variant="secondary">Secondary</web-button>
        <web-button variant="outline">Outline</web-button>
        <web-button variant="ghost">Ghost</web-button>
        <web-button variant="danger">Danger</web-button>
        <web-button variant="success">Success</web-button>
        <web-button variant="warning">Warning</web-button>
        <web-button variant="dark">Dark</web-button>
        <web-button variant="light">Light</web-button>
      </div>
    `
  })
};

// ========== SIZES ==========

export const AllSizes: Story = {
  name: 'Todos os Tamanhos',
  render: () => ({
    template: `
      <div style="display: flex; gap: 1rem; align-items: center;">
        <web-button size="small">Small</web-button>
        <web-button size="medium">Medium</web-button>
        <web-button size="large">Large</web-button>
      </div>
    `
  })
};

// ========== ICONS ==========

export const WithIconLeft: Story = {
  name: 'Com Ícone à Esquerda',
  args: {
    iconLeft: 'add',
    variant: 'primary'
  },
  render: (args) => ({
    props: args,
    template: `<web-button [variant]="variant" [iconLeft]="iconLeft">Adicionar</web-button>`
  })
};

export const WithIconRight: Story = {
  name: 'Com Ícone à Direita',
  args: {
    iconRight: 'arrow_forward',
    variant: 'primary'
  },
  render: (args) => ({
    props: args,
    template: `<web-button [variant]="variant" [iconRight]="iconRight">Continuar</web-button>`
  })
};

export const WithBothIcons: Story = {
  name: 'Com Ícones dos Dois Lados',
  args: {
    iconLeft: 'download',
    iconRight: 'arrow_drop_down',
    variant: 'primary'
  },
  render: (args) => ({
    props: args,
    template: `<web-button [variant]="variant" [iconLeft]="iconLeft" [iconRight]="iconRight">Download</web-button>`
  })
};

export const IconExamples: Story = {
  name: 'Exemplos com Ícones',
  render: () => ({
    template: `
      <div style="display: flex; flex-wrap: wrap; gap: 1rem;">
        <web-button iconLeft="add" variant="primary">Adicionar</web-button>
        <web-button iconLeft="edit" variant="secondary">Editar</web-button>
        <web-button iconLeft="delete" variant="danger">Excluir</web-button>
        <web-button iconLeft="save" variant="success">Salvar</web-button>
        <web-button iconLeft="search" variant="outline">Buscar</web-button>
        <web-button iconLeft="download" variant="ghost">Download</web-button>
        <web-button iconRight="arrow_forward">Próximo</web-button>
        <web-button iconRight="send">Enviar</web-button>
      </div>
    `
  })
};

export const IconOnly: Story = {
  name: 'Apenas Ícone',
  args: {
    iconLeft: 'favorite',
    iconOnly: true,
    variant: 'primary'
  },
  render: (args) => ({
    props: args,
    template: `<web-button [variant]="variant" [iconLeft]="iconLeft" [iconOnly]="iconOnly"></web-button>`
  })
};

export const IconOnlyExamples: Story = {
  name: 'Exemplos Apenas Ícone',
  render: () => ({
    template: `
      <div style="display: flex; gap: 1rem; align-items: center;">
        <web-button iconLeft="favorite" iconOnly="true" variant="primary"></web-button>
        <web-button iconLeft="share" iconOnly="true" variant="secondary"></web-button>
        <web-button iconLeft="bookmark" iconOnly="true" variant="outline"></web-button>
        <web-button iconLeft="more_vert" iconOnly="true" variant="ghost"></web-button>
        <web-button iconLeft="close" iconOnly="true" variant="danger"></web-button>
      </div>
      
      <div style="display: flex; gap: 1rem; align-items: center; margin-top: 1rem;">
        <web-button iconLeft="settings" iconOnly="true" size="small" variant="primary"></web-button>
        <web-button iconLeft="settings" iconOnly="true" size="medium" variant="primary"></web-button>
        <web-button iconLeft="settings" iconOnly="true" size="large" variant="primary"></web-button>
      </div>
    `
  })
};

// ========== ROUNDED ==========

export const RoundedVariants: Story = {
  name: 'Variantes de Arredondamento',
  render: () => ({
    template: `
      <div style="display: flex; gap: 1rem; align-items: center;">
        <web-button rounded="sm">Small Radius</web-button>
        <web-button rounded="md">Medium Radius</web-button>
        <web-button rounded="lg">Large Radius</web-button>
        <web-button rounded="full">Full Rounded</web-button>
      </div>
    `
  })
};

// ========== STATES ==========

export const Disabled: Story = {
  args: {
    disabled: true,
    variant: 'primary'
  },
  render: (args) => ({
    props: args,
    template: `<web-button [variant]="variant" [disabled]="disabled">Disabled Button</web-button>`
  })
};

export const Loading: Story = {
  args: {
    loading: true,
    variant: 'primary'
  },
  render: (args) => ({
    props: args,
    template: `<web-button [variant]="variant" [loading]="loading">Loading...</web-button>`
  })
};

export const LoadingExamples: Story = {
  name: 'Exemplos de Loading',
  render: () => ({
    template: `
      <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
        <web-button loading="true" variant="primary">Salvando...</web-button>
        <web-button loading="true" variant="secondary">Carregando...</web-button>
        <web-button loading="true" variant="outline">Processando...</web-button>
        <web-button loading="true" variant="success">Enviando...</web-button>
      </div>
    `
  })
};

// ========== BADGE ==========

export const WithBadge: Story = {
  name: 'Com Badge',
  args: {
    badge: '5',
    iconLeft: 'notifications',
    variant: 'primary'
  },
  render: (args) => ({
    props: args,
    template: `<web-button [variant]="variant" [iconLeft]="iconLeft" [badge]="badge">Notificações</web-button>`
  })
};

export const BadgeExamples: Story = {
  name: 'Exemplos com Badge',
  render: () => ({
    template: `
      <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
        <web-button badge="3" iconLeft="mail">Mensagens</web-button>
        <web-button badge="12" iconLeft="notifications">Notificações</web-button>
        <web-button badge="99+" iconLeft="shopping_cart">Carrinho</web-button>
        <web-button badge="1" iconLeft="favorite" iconOnly="true"></web-button>
      </div>
    `
  })
};

// ========== FULL WIDTH ==========

export const FullWidth: Story = {
  name: 'Largura Total',
  args: {
    fullWidth: true,
    variant: 'primary'
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="max-width: 400px;">
        <web-button [variant]="variant" [fullWidth]="fullWidth">Full Width Button</web-button>
      </div>
    `
  })
};

// ========== JUSTIFY ==========

export const JustifyContent: Story = {
  name: 'Alinhamento do Conteúdo',
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 300px;">
        <web-button fullWidth="true" justify="start" iconLeft="arrow_back">Voltar</web-button>
        <web-button fullWidth="true" justify="center">Centro</web-button>
        <web-button fullWidth="true" justify="end" iconRight="arrow_forward">Avançar</web-button>
        <web-button fullWidth="true" justify="between" iconLeft="menu" iconRight="settings">Menu</web-button>
      </div>
    `
  })
};

// ========== SHADOW ==========

export const ShadowVariants: Story = {
  args: {
    variant: "secondary"
  },

  name: 'Variantes de Sombra',

  render: () => ({
    template: `
      <div style="display: flex; gap: 1rem; padding: 2rem; background: #f5f5f5;">
        <web-button shadow="none">No Shadow</web-button>
        <web-button shadow="sm">Small Shadow</web-button>
        <web-button shadow="md">Medium Shadow</web-button>
        <web-button shadow="lg">Large Shadow</web-button>
      </div>
    `
  })
};

// ========== USE CASES ==========

export const FormButtons: Story = {
  name: 'Botões de Formulário',
  render: () => ({
    template: `
      <div style="display: flex; gap: 1rem; justify-content: flex-end; padding: 1rem; border-top: 1px solid #e5e7eb;">
        <web-button variant="ghost">Cancelar</web-button>
        <web-button variant="outline">Salvar Rascunho</web-button>
        <web-button variant="primary" iconRight="send">Enviar</web-button>
      </div>
    `
  })
};

export const ActionButtons: Story = {
  name: 'Botões de Ação',
  render: () => ({
    template: `
      <div style="display: flex; gap: 0.5rem;">
        <web-button iconLeft="edit" variant="ghost" size="small">Editar</web-button>
        <web-button iconLeft="share" variant="ghost" size="small">Compartilhar</web-button>
        <web-button iconLeft="delete" variant="ghost" size="small">Excluir</web-button>
      </div>
    `
  })
};

export const SocialButtons: Story = {
  name: 'Botões Sociais',
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 300px;">
        <web-button fullWidth="true" variant="dark" iconLeft="login">
          Continuar com Google
        </web-button>
        <web-button fullWidth="true" variant="dark" iconLeft="login">
          Continuar com Facebook
        </web-button>
        <web-button fullWidth="true" variant="outline" iconLeft="login">
          Continuar com Email
        </web-button>
      </div>
    `
  })
};

export const NavigationButtons: Story = {
  name: 'Botões de Navegação',
  render: () => ({
    template: `
      <div style="display: flex; justify-content: space-between; max-width: 600px;">
        <web-button variant="outline" iconLeft="arrow_back">Anterior</web-button>
        <div style="display: flex; gap: 0.5rem;">
          <web-button variant="ghost">1</web-button>
          <web-button variant="primary">2</web-button>
          <web-button variant="ghost">3</web-button>
          <web-button variant="ghost">4</web-button>
          <web-button variant="ghost">5</web-button>
        </div>
        <web-button variant="primary" iconRight="arrow_forward">Próximo</web-button>
      </div>
    `
  })
};

export const ToolbarButtons: Story = {
  name: 'Botões de Toolbar',
  render: () => ({
    template: `
      <div style="display: flex; gap: 0.25rem; padding: 0.5rem; background: #f8f9fa; border-radius: 0.5rem;">
        <web-button iconLeft="format_bold" iconOnly="true" variant="ghost" size="small"></web-button>
        <web-button iconLeft="format_italic" iconOnly="true" variant="ghost" size="small"></web-button>
        <web-button iconLeft="format_underlined" iconOnly="true" variant="ghost" size="small"></web-button>
        <div style="width: 1px; background: #dee2e6; margin: 0 0.25rem;"></div>
        <web-button iconLeft="format_align_left" iconOnly="true" variant="ghost" size="small"></web-button>
        <web-button iconLeft="format_align_center" iconOnly="true" variant="ghost" size="small"></web-button>
        <web-button iconLeft="format_align_right" iconOnly="true" variant="ghost" size="small"></web-button>
        <div style="width: 1px; background: #dee2e6; margin: 0 0.25rem;"></div>
        <web-button iconLeft="link" iconOnly="true" variant="ghost" size="small"></web-button>
        <web-button iconLeft="image" iconOnly="true" variant="ghost" size="small"></web-button>
      </div>
    `
  })
};

export const CTAButtons: Story = {
  name: 'Call to Action',
  render: () => ({
    template: `
      <div style="text-align: center; padding: 3rem; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 1rem;">
        <h2 style="color: white; margin: 0 0 1rem 0; font-family: Montserrat;">
          Pronto para começar?
        </h2>
        <p style="color: rgba(255,255,255,0.9); margin: 0 0 2rem 0; font-family: Montserrat;">
          Junte-se a milhares de usuários satisfeitos
        </p>
        <web-button 
          variant="light" 
          size="large" 
          rounded="full"
          shadow="lg"
          iconRight="arrow_forward">
          Começar Agora
        </web-button>
      </div>
    `
  })
};

export const AllFeatures: Story = {
  name: 'Todas as Features',
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 2rem; padding: 2rem;">
        
        <div>
          <h3 style="margin: 0 0 1rem 0; font-family: Montserrat;">Variantes</h3>
          <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
            <web-button variant="primary">Primary</web-button>
            <web-button variant="secondary">Secondary</web-button>
            <web-button variant="outline">Outline</web-button>
            <web-button variant="ghost">Ghost</web-button>
            <web-button variant="danger">Danger</web-button>
            <web-button variant="success">Success</web-button>
            <web-button variant="warning">Warning</web-button>
            <web-button variant="dark">Dark</web-button>
            <web-button variant="light">Light</web-button>
          </div>
        </div>

        <div>
          <h3 style="margin: 0 0 1rem 0; font-family: Montserrat;">Tamanhos</h3>
          <div style="display: flex; gap: 0.5rem; align-items: center;">
            <web-button size="small">Small</web-button>
            <web-button size="medium">Medium</web-button>
            <web-button size="large">Large</web-button>
          </div>
        </div>

        <div>
          <h3 style="margin: 0 0 1rem 0; font-family: Montserrat;">Com Ícones</h3>
          <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
            <web-button iconLeft="add">Adicionar</web-button>
            <web-button iconRight="arrow_forward">Continuar</web-button>
            <web-button iconLeft="download" iconRight="arrow_drop_down">Download</web-button>
            <web-button iconLeft="favorite" iconOnly="true"></web-button>
          </div>
        </div>

        <div>
          <h3 style="margin: 0 0 1rem 0; font-family: Montserrat;">Estados</h3>
          <div style="display: flex; gap: 0.5rem;">
            <web-button>Normal</web-button>
            <web-button disabled="true">Disabled</web-button>
            <web-button loading="true">Loading</web-button>
            <web-button badge="5" iconLeft="notifications">Badge</web-button>
          </div>
        </div>

        <div>
          <h3 style="margin: 0 0 1rem 0; font-family: Montserrat;">Arredondamento</h3>
          <div style="display: flex; gap: 0.5rem;">
            <web-button rounded="sm">Small</web-button>
            <web-button rounded="md">Medium</web-button>
            <web-button rounded="lg">Large</web-button>
            <web-button rounded="full">Full</web-button>
          </div>
        </div>

        <div>
          <h3 style="margin: 0 0 1rem 0; font-family: Montserrat;">Sombras</h3>
          <div style="display: flex; gap: 0.5rem; padding: 1rem; background: #f5f5f5;">
            <web-button shadow="none">None</web-button>
            <web-button shadow="sm">Small</web-button>
            <web-button shadow="md">Medium</web-button>
            <web-button shadow="lg">Large</web-button>
          </div>
        </div>

      </div>
    `
  })
};