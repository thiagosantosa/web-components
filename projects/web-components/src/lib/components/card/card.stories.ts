import type { Meta, StoryObj } from '@storybook/angular';
import { CardComponent } from './card.component';

/**
 * # Card Component
 *
 * Um componente de card moderno e versátil, projetado para ser superior aos concorrentes
 * (Material UI, Ant Design, Bootstrap) com recursos avançados e design premium.
 *
 * ## 🎯 Principais Funcionalidades
 *
 * ### Variantes Visuais
 * - **elevated**: Card com sombra elevada (padrão Material Design)
 * - **outlined**: Card com borda, sem sombra
 * - **filled**: Card com fundo preenchido em gradiente
 * - **ghost**: Card transparente com borda tracejada
 *
 * ### Tamanhos
 * - **small**: Para listas densas e widgets compactos
 * - **medium**: Tamanho padrão para uso geral
 * - **large**: Para destaque e cards principais
 *
 * ### Posicionamento de Imagem
 * - **top**: Imagem no topo (layout clássico)
 * - **left**: Imagem à esquerda (layout horizontal)
 * - **right**: Imagem à direita (layout horizontal)
 * - **background**: Imagem de fundo com overlay e texto sobre ela
 *
 * ## 📦 Recursos Avançados
 *
 * ### Badges & Ribbons
 * - **Badge**: Etiqueta posicionável em qualquer canto
 * - **Ribbon**: Faixa decorativa diagonal no canto superior
 * - Suporte a cores customizadas e animação de pulse
 *
 * ### Sistema de Ações (3 níveis)
 * 1. **Header Actions**: Ações no cabeçalho (ex: menu, favoritar)
 * 2. **Media Actions**: Ações sobre a imagem (ex: play, zoom)
 * 3. **Footer Actions**: Ações principais no rodapé (ex: comprar, saber mais)
 *
 * ### Estados Interativos
 * - **Hoverable**: Animação de elevação no hover
 * - **Clickable**: Card inteiro clicável
 * - **Selectable**: Seleção com checkbox visual
 * - **Loading**: Estado de carregamento com spinner
 * - **Disabled**: Ações desabilitadas
 *
 * ### Avatar & Perfil
 * - Avatar circular no header
 * - Suporte a imagem ou iniciais
 * - Ideal para cards de usuários e posts sociais
 *
 * ## 🔧 Como Usar
 *
 * ### Importação
 * ```typescript
 * import { CardComponent } from '@thiagosantosa/web-components';
 *
 * @Component({
 *   imports: [CardComponent],
 *   // ...
 * })
 * ```
 *
 * ### Exemplo Básico
 * ```html
 * <web-card
 *   title="Título do Card"
 *   subtitle="Subtítulo opcional">
 *   <p>Conteúdo do card aqui.</p>
 * </web-card>
 * ```
 *
 * ### Card com Imagem
 * ```html
 * <web-card
 *   title="Produto Premium"
 *   image="https://example.com/image.jpg"
 *   imagePosition="top">
 *   <p>Descrição do produto...</p>
 * </web-card>
 * ```
 *
 * ### Card com Ações
 * ```typescript
 * actions: CardAction[] = [
 *   {
 *     label: 'Comprar',
 *     icon: 'shopping_cart',
 *     variant: 'primary',
 *     action: () => this.buy()
 *   },
 *   {
 *     label: 'Detalhes',
 *     variant: 'text',
 *     action: () => this.showDetails()
 *   }
 * ];
 * ```
 *
 * ```html
 * <web-card
 *   title="Produto"
 *   [actions]="actions">
 *   <p>Conteúdo...</p>
 * </web-card>
 * ```
 *
 * ### Card com Badge
 * ```html
 * <web-card
 *   title="Novidade!"
 *   [badge]="{
 *     text: 'NOVO',
 *     color: '#ff4081',
 *     position: 'top-right',
 *     pulse: true
 *   }">
 *   <p>Confira nosso novo produto!</p>
 * </web-card>
 * ```
 *
 * ### Card Selecionável
 * ```html
 * <web-card
 *   title="Selecionar este item"
 *   [selectable]="true"
 *   [(selected)]="isSelected">
 *   <p>Clique para selecionar</p>
 * </web-card>
 * ```
 *
 * ### Card com Background Image
 * ```html
 * <web-card
 *   title="Destino Paradisíaco"
 *   subtitle="Maldivas"
 *   image="https://example.com/maldives.jpg"
 *   imagePosition="background"
 *   [imageOverlay]="true"
 *   [actions]="[
 *     { label: 'Reservar', variant: 'primary', action: () => {} }
 *   ]">
 *   <p>Descubra as praias mais belas do mundo.</p>
 * </web-card>
 * ```
 *
 * ### Card com Cores Customizadas
 * ```html
 * <web-card
 *   title="Card Colorido"
 *   backgroundColor="#f0f9ff"
 *   borderColor="#0ea5e9">
 *   <p>Card com background e borda personalizados.</p>
 * </web-card>
 * ```
 *
 * ### Card Horizontal
 * ```html
 * <web-card
 *   title="Notícia Recente"
 *   image="https://example.com/news.jpg"
 *   imagePosition="left"
 *   [imageWidth]="150">
 *   <p>Conteúdo da notícia...</p>
 * </web-card>
 * ```
 *
 * ## 📋 Props Principais
 *
 * | Prop | Tipo | Default | Descrição |
 * |------|------|---------|-----------|
 * | variant | CardVariant | 'elevated' | Estilo visual do card |
 * | size | CardSize | 'medium' | Tamanho do card |
 * | title | string | '' | Título principal |
 * | subtitle | string | '' | Subtítulo |
 * | avatar | string | '' | URL ou iniciais do avatar |
 * | image | string | '' | URL da imagem |
 * | imagePosition | CardImagePosition | 'top' | Posição da imagem |
 * | imageHeight | number | 200 | Altura da imagem (px) |
 * | imageWidth | number | 200 | Largura da imagem (px) |
 * | imageOverlay | boolean | false | Overlay escuro sobre imagem |
 * | hoverable | boolean | false | Animação de elevação no hover |
 * | clickable | boolean | false | Card inteiro clicável |
 * | selectable | boolean | false | Card selecionável |
 * | selected | boolean | false | Estado de seleção |
 * | loading | boolean | false | Estado de carregamento |
 * | badge | CardBadge | undefined | Configuração do badge |
 * | ribbon | string | '' | Texto da ribbon |
 * | ribbonColor | string | '' | Cor da ribbon |
 * | actions | CardAction[] | [] | Ações do rodapé |
 * | headerActions | CardAction[] | [] | Ações do header |
 * | mediaActions | CardAction[] | [] | Ações sobre a imagem |
 * | backgroundColor | string | '' | Cor de fundo do card |
 * | borderColor | string | '' | Cor da borda do card |
 * | width | string | undefined | Largura customizada |
 * | maxWidth | string | undefined | Largura máxima |
 *
 * ## 🎨 Interfaces TypeScript
 *
 * ```typescript
 * interface CardAction {
 *   label: string;
 *   icon?: string;
 *   variant?: 'primary' | 'secondary' | 'text';
 *   disabled?: boolean;
 *   loading?: boolean;
 *   action: () => void;
 * }
 *
 * interface CardBadge {
 *   text: string;
 *   color?: string;
 *   position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
 *   pulse?: boolean;
 * }
 * ```
 *
 * ## 📤 Eventos
 *
 * | Evento | Payload | Descrição |
 * |--------|---------|-----------|
 * | cardClick | MouseEvent | Emitido quando o card é clicado |
 * | selectedChange | boolean | Emitido quando o estado de seleção muda |
 *
 * ## 💡 Casos de Uso
 *
 * 1. **E-commerce**: Cards de produtos com imagem, preço e botão comprar
 * 2. **Blog**: Cards de posts com imagem, título, resumo e link
 * 3. **Dashboard**: Cards de métricas com ícones e valores
 * 4. **Social Media**: Cards de perfis com avatar e ações
 * 5. **Galeria**: Cards de imagens com ações de visualizar/baixar
 * 6. **Lista de Tarefas**: Cards selecionáveis com checkbox
 * 7. **Notificações**: Cards com badges de status
 * 8. **Portfolio**: Cards de projetos com overlay de informações
 */
const meta: Meta<CardComponent> = {
  title: 'Layout/Card',
  component: CardComponent,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['elevated', 'outlined', 'filled', 'ghost'],
      description: 'Variante visual do card'
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Tamanho do card'
    },
    imagePosition: {
      control: 'select',
      options: ['top', 'left', 'right', 'background'],
      description: 'Posição da imagem no card'
    },
    hoverable: {
      control: 'boolean',
      description: 'Ativa animação de elevação no hover'
    },
    clickable: {
      control: 'boolean',
      description: 'Torna o card inteiro clicável'
    },
    selectable: {
      control: 'boolean',
      description: 'Permite selecionar o card'
    },
    loading: {
      control: 'boolean',
      description: 'Mostra estado de carregamento'
    },
    backgroundColor: {
      control: 'color',
      description: 'Cor de fundo do card'
    },
    borderColor: {
      control: 'color',
      description: 'Cor da borda do card'
    }
  }
};

export default meta;
type Story = StoryObj<CardComponent>;

/**
 * Card básico com título e conteúdo.
 * Ideal para uso geral e conteúdo simples.
 */
export const Basic: Story = {
  args: {
    title: 'Card Básico',
    subtitle: 'Subtítulo opcional',
    variant: 'elevated',
    size: 'medium'
  },
  render: (args) => ({
    props: args,
    template: `
      <web-card
        [title]="title"
        [subtitle]="subtitle"
        [variant]="variant"
        [size]="size">
        <p>Este é um card básico com conteúdo simples. Perfeito para informações gerais e layouts padrão.</p>
      </web-card>
    `
  })
};

/**
 * Comparação de todas as variantes visuais disponíveis.
 */
export const Variants: Story = {
  render: () => ({
    template: `
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px;">
        <web-card
          title="Elevated"
          subtitle="Com sombra elevada"
          variant="elevated">
          <p>Card com sombra que cria sensação de profundidade.</p>
        </web-card>

        <web-card
          title="Outlined"
          subtitle="Com borda"
          variant="outlined">
          <p>Card minimalista com borda fina.</p>
        </web-card>

        <web-card
          title="Filled"
          subtitle="Com fundo preenchido"
          variant="filled">
          <p>Card com gradiente de fundo suave.</p>
        </web-card>

        <web-card
          title="Ghost"
          subtitle="Transparente"
          variant="ghost">
          <p>Card com borda tracejada, ideal para placeholders.</p>
        </web-card>
      </div>
    `
  })
};

/**
 * Comparação dos três tamanhos disponíveis.
 */
export const Sizes: Story = {
  render: () => ({
    template: `
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 24px;">
        <web-card
          title="Small"
          subtitle="Compacto"
          size="small">
          <p>Card pequeno para listas densas.</p>
        </web-card>

        <web-card
          title="Medium"
          subtitle="Padrão"
          size="medium">
          <p>Tamanho padrão para uso geral.</p>
        </web-card>

        <web-card
          title="Large"
          subtitle="Grande"
          size="large">
          <p>Card grande para conteúdo destacado.</p>
        </web-card>
      </div>
    `
  })
};

/**
 * Card com imagem no topo - layout clássico para produtos e artigos.
 */
export const WithImage: Story = {
  args: {
    title: 'Produto Premium',
    subtitle: 'R$ 299,90',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=400&fit=crop',
    imagePosition: 'top',
    variant: 'elevated',
    hoverable: true,
    actions: [
      {
        label: 'Comprar Agora',
        icon: 'shopping_cart',
        variant: 'primary' as const,
        action: () => alert('Comprar!')
      },
      {
        label: 'Detalhes',
        variant: 'text' as const,
        action: () => alert('Ver detalhes')
      }
    ]
  },
  render: (args) => ({
    props: args,
    template: `
      <web-card
        [title]="title"
        [subtitle]="subtitle"
        [image]="image"
        [imagePosition]="imagePosition"
        [variant]="variant"
        [hoverable]="hoverable"
        [actions]="actions"
        style="max-width: 400px;">
        <p>Headphones premium com cancelamento de ruído ativo, bateria de 30h e som de alta fidelidade.</p>
      </web-card>
    `
  })
};

/**
 * Card com imagem de fundo e overlay - ideal para banners e destaque visual.
 */
export const BackgroundImage: Story = {
  args: {
    title: 'Maldivas',
    subtitle: 'Destino Paradisíaco',
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&h=600&fit=crop',
    imagePosition: 'background',
    imageOverlay: true,
    imageHeight: 400,
    variant: 'elevated',
    actions: [
      {
        label: 'Reservar Agora',
        icon: 'flight_takeoff',
        variant: 'primary' as const,
        action: () => alert('Reservar!')
      },
      {
        label: 'Ver Pacotes',
        variant: 'text' as const,
        action: () => alert('Ver pacotes')
      }
    ]
  },
  render: (args) => ({
    props: args,
    template: `
      <web-card
        [title]="title"
        [subtitle]="subtitle"
        [image]="image"
        [imagePosition]="imagePosition"
        [imageOverlay]="imageOverlay"
        [imageHeight]="imageHeight"
        [variant]="variant"
        [actions]="actions"
        style="max-width: 600px;">
        <p>Descubra as praias mais belas do mundo com areia branca e águas cristalinas.</p>
      </web-card>
    `
  })
};

/**
 * Cards horizontais - imagem à esquerda ou direita do conteúdo.
 */
export const HorizontalLayouts: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px; max-width: 700px;">
        <web-card
          title="Notícia Importante"
          subtitle="Há 2 horas"
          image="https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&h=300&fit=crop"
          imagePosition="left"
          [imageWidth]="180"
          variant="outlined">
          <p>Novas descobertas científicas revolucionam a indústria tecnológica com aplicações práticas imediatas.</p>
        </web-card>

        <web-card
          title="Artigo em Destaque"
          subtitle="Publicado hoje"
          image="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop"
          imagePosition="right"
          [imageWidth]="180"
          variant="outlined">
          <p>Como a inteligência artificial está transformando o desenvolvimento de software moderno.</p>
        </web-card>
      </div>
    `
  })
};

/**
 * Card com avatar e perfil - ideal para redes sociais e posts de usuários.
 */
export const WithAvatar: Story = {
  args: {
    title: 'Maria Silva',
    subtitle: 'Publicado há 1 hora',
    avatar: 'https://i.pravatar.cc/150?img=1',
    variant: 'outlined',
    headerActions: [
      {
        label: 'Mais opções',
        icon: 'more_vert',
        action: () => alert('Menu')
      }
    ],
    actions: [
      {
        label: 'Curtir',
        icon: 'favorite_border',
        variant: 'text' as const,
        action: () => alert('Curtiu!')
      },
      {
        label: 'Comentar',
        icon: 'chat_bubble_outline',
        variant: 'text' as const,
        action: () => alert('Comentar')
      },
      {
        label: 'Compartilhar',
        icon: 'share',
        variant: 'text' as const,
        action: () => alert('Compartilhar')
      }
    ]
  },
  render: (args) => ({
    props: args,
    template: `
      <web-card
        [title]="title"
        [subtitle]="subtitle"
        [avatar]="avatar"
        [variant]="variant"
        [headerActions]="headerActions"
        [actions]="actions"
        style="max-width: 500px;">
        <p>Acabei de terminar um projeto incrível! Muito feliz com os resultados. 🚀</p>
      </web-card>
    `
  })
};

/**
 * Card com badges em diferentes posições.
 */
export const WithBadges: Story = {
  render: () => ({
    template: `
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px;">
        <web-card
          title="Produto Novo"
          [badge]="{ text: 'NOVO', color: '#4caf50', position: 'top-right', pulse: true }"
          variant="elevated">
          <p>Lançamento exclusivo com desconto especial.</p>
        </web-card>

        <web-card
          title="Super Oferta"
          [badge]="{ text: '-50%', color: '#f44336', position: 'top-left' }"
          variant="elevated">
          <p>Aproveite enquanto durar o estoque.</p>
        </web-card>

        <web-card
          title="Mais Vendido"
          [badge]="{ text: '★ TOP', color: '#ff9800', position: 'top-right' }"
          variant="elevated">
          <p>Preferido pelos nossos clientes.</p>
        </web-card>

        <web-card
          title="Exclusivo"
          [badge]="{ text: 'VIP', color: '#9c27b0', position: 'bottom-right', pulse: true }"
          variant="elevated">
          <p>Acesso exclusivo para membros premium.</p>
        </web-card>
      </div>
    `
  })
};

/**
 * Card com ribbon decorativa no canto.
 */
export const WithRibbon: Story = {
  args: {
    title: 'Plano Premium',
    subtitle: 'R$ 99,90/mês',
    ribbon: 'POPULAR',
    ribbonColor: '#ff4081',
    variant: 'elevated',
    actions: [
      {
        label: 'Assinar Agora',
        variant: 'primary' as const,
        action: () => alert('Assinar!')
      }
    ]
  },
  render: (args) => ({
    props: args,
    template: `
      <web-card
        [title]="title"
        [subtitle]="subtitle"
        [ribbon]="ribbon"
        [ribbonColor]="ribbonColor"
        [variant]="variant"
        [actions]="actions"
        style="max-width: 400px;">
        <p>✓ Acesso ilimitado<br>
        ✓ Suporte prioritário<br>
        ✓ Recursos exclusivos<br>
        ✓ Sem anúncios</p>
      </web-card>
    `
  })
};

/**
 * Cards selecionáveis - ideal para listas de escolha múltipla.
 */
export const Selectable: Story = {
  render: () => ({
    template: `
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 16px;">
        <web-card
          title="Opção 1"
          [selectable]="true"
          variant="outlined">
          <p>Clique para selecionar esta opção.</p>
        </web-card>

        <web-card
          title="Opção 2"
          [selectable]="true"
          [selected]="true"
          variant="outlined">
          <p>Esta opção está pré-selecionada.</p>
        </web-card>

        <web-card
          title="Opção 3"
          [selectable]="true"
          variant="outlined">
          <p>Outra opção disponível.</p>
        </web-card>
      </div>
    `
  })
};

/**
 * Card interativo com estado de hover e click.
 */
export const Interactive: Story = {
  args: {
    title: 'Card Interativo',
    subtitle: 'Clique ou passe o mouse',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&h=400&fit=crop',
    hoverable: true,
    clickable: true,
    variant: 'elevated'
  },
  render: (args) => ({
    props: {
      ...args,
      onCardClick: () => alert('Card clicado!')
    },
    template: `
      <web-card
        [title]="title"
        [subtitle]="subtitle"
        [image]="image"
        [hoverable]="hoverable"
        [clickable]="clickable"
        [variant]="variant"
        (cardClick)="onCardClick()"
        style="max-width: 400px;">
        <p>Este card tem animação no hover e é totalmente clicável. Experimente!</p>
      </web-card>
    `
  })
};

/**
 * Card com estado de loading e ações com spinner.
 */
export const Loading: Story = {
  render: () => ({
    template: `
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px;">
        <web-card
          title="Carregando Dados"
          [loading]="true"
          variant="elevated">
          <p>Card inteiro em estado de loading.</p>
        </web-card>

        <web-card
          title="Ação em Progresso"
          [actions]="[
            {
              label: 'Salvando...',
              loading: true,
              variant: 'primary',
              action: () => {}
            },
            {
              label: 'Cancelar',
              variant: 'text',
              action: () => alert('Cancelado')
            }
          ]"
          variant="elevated">
          <p>Apenas o botão está em loading.</p>
        </web-card>
      </div>
    `
  })
};

/**
 * Card com múltiplas ações em diferentes posições.
 */
export const MultipleActions: Story = {
  args: {
    title: 'Vídeo Tutorial',
    subtitle: 'Duração: 15:30',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&h=400&fit=crop',
    variant: 'elevated',
    headerActions: [
      {
        label: 'Favoritar',
        icon: 'favorite_border',
        action: () => alert('Favoritado!')
      },
      {
        label: 'Compartilhar',
        icon: 'share',
        action: () => alert('Compartilhar')
      },
      {
        label: 'Menu',
        icon: 'more_vert',
        action: () => alert('Menu')
      }
    ],
    mediaActions: [
      {
        label: 'Play',
        icon: 'play_arrow',
        action: () => alert('Play!')
      },
      {
        label: 'Fullscreen',
        icon: 'fullscreen',
        action: () => alert('Fullscreen')
      }
    ],
    actions: [
      {
        label: 'Assistir Agora',
        icon: 'play_circle',
        variant: 'primary' as const,
        action: () => alert('Assistir!')
      },
      {
        label: 'Adicionar à Playlist',
        icon: 'playlist_add',
        variant: 'text' as const,
        action: () => alert('Adicionado!')
      }
    ]
  },
  render: (args) => ({
    props: args,
    template: `
      <web-card
        [title]="title"
        [subtitle]="subtitle"
        [image]="image"
        [variant]="variant"
        [headerActions]="headerActions"
        [mediaActions]="mediaActions"
        [actions]="actions"
        style="max-width: 450px;">
        <p>Aprenda Angular do zero ao avançado com este tutorial completo e prático.</p>
      </web-card>
    `
  })
};

/**
 * Card de produto e-commerce completo com todas as features.
 */
export const EcommerceProduct: Story = {
  render: () => ({
    template: `
      <web-card
        title="Smart Watch Ultra"
        subtitle="Apple Watch Series 9"
        image="https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=600&h=600&fit=crop"
        [badge]="{ text: '-30%', color: '#f44336', position: 'top-left' }"
        [hoverable]="true"
        [headerActions]="[
          { label: 'Favoritar', icon: 'favorite_border', action: () => {} }
        ]"
        [actions]="[
          {
            label: 'Adicionar ao Carrinho',
            icon: 'shopping_cart',
            variant: 'primary',
            action: () => alert('Adicionado ao carrinho!')
          },
          {
            label: 'Comparar',
            icon: 'compare_arrows',
            variant: 'text',
            action: () => alert('Comparar')
          }
        ]"
        variant="elevated"
        style="max-width: 380px;">
        <div style="margin-bottom: 12px;">
          <div style="font-size: 24px; font-weight: 700; color: #f44336;">
            R$ 2.799,00
          </div>
          <div style="font-size: 14px; color: #999; text-decoration: line-through;">
            R$ 3.999,00
          </div>
        </div>
        <p style="margin: 0; font-size: 14px; color: #666;">
          ✓ Tela Always-On Retina<br>
          ✓ GPS + Celular<br>
          ✓ Resistente à água<br>
          ✓ Monitoramento de saúde avançado
        </p>
      </web-card>
    `
  })
};

/**
 * Cards com cores de fundo e borda customizadas.
 */
export const CustomColors: Story = {
  render: () => ({
    template: `
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px;">
        <web-card
          title="Card Azul"
          subtitle="Fundo e borda azul"
          backgroundColor="#e0f2fe"
          borderColor="#0ea5e9"
          variant="outlined">
          <p>Card com tema azul personalizado.</p>
        </web-card>

        <web-card
          title="Card Verde"
          subtitle="Fundo e borda verde"
          backgroundColor="#dcfce7"
          borderColor="#22c55e"
          variant="outlined">
          <p>Card com tema verde personalizado.</p>
        </web-card>

        <web-card
          title="Card Roxo"
          subtitle="Fundo e borda roxo"
          backgroundColor="#f3e8ff"
          borderColor="#a855f7"
          variant="outlined">
          <p>Card com tema roxo personalizado.</p>
        </web-card>

        <web-card
          title="Card Laranja"
          subtitle="Fundo e borda laranja"
          backgroundColor="#ffedd5"
          borderColor="#f97316"
          variant="outlined">
          <p>Card com tema laranja personalizado.</p>
        </web-card>

        <web-card
          title="Card Rosa"
          subtitle="Fundo e borda rosa"
          backgroundColor="#fce7f3"
          borderColor="#ec4899"
          variant="outlined">
          <p>Card com tema rosa personalizado.</p>
        </web-card>

        <web-card
          title="Card Vermelho"
          subtitle="Fundo e borda vermelho"
          backgroundColor="#fee2e2"
          borderColor="#ef4444"
          variant="outlined">
          <p>Card com tema vermelho personalizado.</p>
        </web-card>
      </div>
    `
  })
};

/**
 * Cards com gradientes de fundo.
 */
export const GradientBackgrounds: Story = {
  render: () => ({
    template: `
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px;">
        <web-card
          title="Gradiente Azul"
          subtitle="Linear gradient"
          backgroundColor="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
          variant="elevated">
          <p style="color: white;">Texto em branco sobre gradiente escuro.</p>
        </web-card>

        <web-card
          title="Gradiente Sunset"
          subtitle="Linear gradient"
          backgroundColor="linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
          variant="elevated">
          <p style="color: white;">Gradiente rosa para laranja vibrante.</p>
        </web-card>

        <web-card
          title="Gradiente Ocean"
          subtitle="Linear gradient"
          backgroundColor="linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
          variant="elevated">
          <p style="color: white;">Tons de azul oceano relaxantes.</p>
        </web-card>
      </div>
    `
  })
};

/**
 * Cards temáticos para diferentes status/categorias.
 */
export const ThemedCards: Story = {
  render: () => ({
    template: `
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px;">
        <web-card
          title="Sucesso"
          subtitle="Operação concluída"
          backgroundColor="#f0fdf4"
          borderColor="#22c55e"
          variant="outlined"
          icon="check_circle"
          [badge]="{ text: '✓', color: '#22c55e', position: 'top-right' }">
          <p style="color: #166534;">Sua solicitação foi processada com sucesso!</p>
        </web-card>

        <web-card
          title="Aviso"
          subtitle="Atenção necessária"
          backgroundColor="#fffbeb"
          borderColor="#f59e0b"
          variant="outlined"
          [badge]="{ text: '!', color: '#f59e0b', position: 'top-right' }">
          <p style="color: #92400e;">Verifique os dados antes de continuar.</p>
        </web-card>

        <web-card
          title="Erro"
          subtitle="Falha na operação"
          backgroundColor="#fef2f2"
          borderColor="#ef4444"
          variant="outlined"
          [badge]="{ text: '✗', color: '#ef4444', position: 'top-right' }">
          <p style="color: #991b1b;">Não foi possível completar a operação.</p>
        </web-card>

        <web-card
          title="Informação"
          subtitle="Dados importantes"
          backgroundColor="#eff6ff"
          borderColor="#3b82f6"
          variant="outlined"
          [badge]="{ text: 'i', color: '#3b82f6', position: 'top-right' }">
          <p style="color: #1e40af;">Confira as atualizações disponíveis.</p>
        </web-card>
      </div>
    `
  })
};

/**
 * Grid de cards responsivo - exemplo de layout real.
 */
export const ResponsiveGrid: Story = {
  render: () => ({
    template: `
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 24px;">
        <web-card
          title="Dashboard Analytics"
          image="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop"
          [hoverable]="true"
          variant="elevated">
          <p>Visualize métricas e KPIs em tempo real.</p>
        </web-card>

        <web-card
          title="User Management"
          image="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop"
          [hoverable]="true"
          variant="elevated">
          <p>Gerencie usuários e permissões facilmente.</p>
        </web-card>

        <web-card
          title="Reports & Export"
          image="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop"
          [hoverable]="true"
          variant="elevated">
          <p>Gere relatórios customizados em PDF e Excel.</p>
        </web-card>

        <web-card
          title="Settings"
          image="https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=600&h=400&fit=crop"
          [hoverable]="true"
          variant="elevated">
          <p>Configure preferências e integrações.</p>
        </web-card>
      </div>
    `
  })
};
