import type { Meta, StoryObj } from '@storybook/angular';
import { ListComponent, ListItemComponent } from './list.component';

/**
 * # List Component
 *
 * Um componente de lista moderno e versátil que supera os concorrentes com recursos
 * avançados, customização completa de cores e múltiplos estilos visuais.
 *
 * ## 🎯 Principais Funcionalidades
 *
 * ### Variantes Visuais
 * - **default**: Lista limpa sem bordas
 * - **bordered**: Lista com borda ao redor
 * - **stripped**: Linhas alternadas coloridas (zebra)
 * - **card**: Lista com sombra e elevação
 *
 * ### Tamanhos
 * - **small**: Lista compacta para alta densidade
 * - **medium**: Tamanho padrão para uso geral
 * - **large**: Lista espaçosa para destaque
 *
 * ### Estilos de Divisor
 * - **solid**: Linha sólida entre items
 * - **dashed**: Linha tracejada
 * - **dotted**: Linha pontilhada
 * - **none**: Sem divisores
 *
 * ## 📦 Recursos Avançados
 *
 * ### List Item - Anatomia Completa
 * - **Leading**: Avatar, ícone ou conteúdo customizado
 * - **Content**: Título, subtítulo, descrição e badge
 * - **Trailing**: Meta text, ações e chevron
 *
 * ### Estados e Interação
 * - **Clickable**: Item clicável com hover
 * - **Selected**: Estado de seleção visual
 * - **Disabled**: Item desabilitado
 * - **Loading**: Estado de carregamento
 * - **Empty**: Estado vazio com mensagem
 *
 * ### Customização de Cores (TOTAL)
 * - Background de list e items
 * - Cores de borda
 * - Cores de header e footer
 * - Cores de título, subtítulo e descrição
 * - Cores de ícones, avatares e badges
 * - Cores de meta text e chevron
 *
 * ### Header e Footer
 * - Header com título, subtítulo e ações
 * - Footer customizável com slots
 * - Badges no header
 *
 * ## 🔧 Como Usar
 *
 * ### Importação
 * ```typescript
 * import { ListComponent, ListItemComponent } from '@thiagosantosa/web-components';
 *
 * @Component({
 *   imports: [ListComponent, ListItemComponent],
 *   // ...
 * })
 * ```
 *
 * ### Lista Básica
 * ```html
 * <web-list>
 *   <web-list-item title="Item 1"></web-list-item>
 *   <web-list-item title="Item 2"></web-list-item>
 *   <web-list-item title="Item 3"></web-list-item>
 * </web-list>
 * ```
 *
 * ### Lista com Header
 * ```html
 * <web-list
 *   title="Minha Lista"
 *   subtitle="3 items">
 *   <web-list-item title="Item 1"></web-list-item>
 *   <web-list-item title="Item 2"></web-list-item>
 *   <web-list-item title="Item 3"></web-list-item>
 * </web-list>
 * ```
 *
 * ### Items com Avatar e Subtítulo
 * ```html
 * <web-list>
 *   <web-list-item
 *     title="Maria Silva"
 *     subtitle="Designer"
 *     avatar="https://i.pravatar.cc/150?img=1">
 *   </web-list-item>
 * </web-list>
 * ```
 *
 * ### Items com Ícone e Descrição
 * ```html
 * <web-list>
 *   <web-list-item
 *     title="Notificações"
 *     description="Gerencie suas preferências de notificação"
 *     icon="notifications"
 *     [showChevron]="true">
 *   </web-list-item>
 * </web-list>
 * ```
 *
 * ### Items Clicáveis
 * ```html
 * <web-list [hoverable]="true">
 *   <web-list-item
 *     title="Clique aqui"
 *     [clickable]="true"
 *     (itemClick)="handleClick($event)">
 *   </web-list-item>
 * </web-list>
 * ```
 *
 * ### Items com Ações
 * ```typescript
 * actions = [
 *   {
 *     icon: 'edit',
 *     label: 'Editar',
 *     action: (item) => this.edit(item)
 *   },
 *   {
 *     icon: 'delete',
 *     label: 'Deletar',
 *     color: '#ef4444',
 *     action: (item) => this.delete(item)
 *   }
 * ];
 * ```
 *
 * ```html
 * <web-list-item
 *   title="Item com ações"
 *   [actions]="actions">
 * </web-list-item>
 * ```
 *
 * ### Lista com Cores Customizadas
 * ```html
 * <web-list
 *   backgroundColor="#f0f9ff"
 *   borderColor="#0ea5e9"
 *   headerBackgroundColor="#e0f2fe"
 *   [bordered]="true">
 *   <web-list-item
 *     title="Item Azul"
 *     titleColor="#0c4a6e"
 *     iconColor="#0ea5e9"
 *     icon="star">
 *   </web-list-item>
 * </web-list>
 * ```
 *
 * ### Lista com Loading
 * ```html
 * <web-list
 *   [loading]="isLoading"
 *   loadingText="Buscando dados...">
 * </web-list>
 * ```
 *
 * ### Lista Vazia
 * ```html
 * <web-list
 *   [empty]="items.length === 0"
 *   emptyText="Nenhum resultado encontrado"
 *   emptyIcon="search_off">
 * </web-list>
 * ```
 *
 * ## 📋 Props - ListComponent
 *
 * | Prop | Tipo | Default | Descrição |
 * |------|------|---------|-----------|
 * | variant | ListVariant | 'default' | Estilo visual da lista |
 * | size | ListSize | 'medium' | Tamanho dos items |
 * | dividerStyle | ListDividerStyle | 'solid' | Estilo dos divisores |
 * | title | string | '' | Título do header |
 * | subtitle | string | '' | Subtítulo do header |
 * | badge | string | '' | Badge no header |
 * | bordered | boolean | false | Adiciona borda |
 * | hoverable | boolean | false | Ativa hover nos items |
 * | loading | boolean | false | Estado de loading |
 * | loadingText | string | 'Carregando...' | Texto do loading |
 * | empty | boolean | false | Estado vazio |
 * | emptyText | string | 'Nenhum item...' | Texto do empty |
 * | emptyIcon | string | 'inbox' | Ícone do empty |
 * | showFooter | boolean | false | Mostra footer |
 * | footerText | string | '' | Texto do footer |
 * | headerActions | ListItemAction[] | [] | Ações do header |
 * | backgroundColor | string | '' | Cor de fundo |
 * | borderColor | string | '' | Cor da borda |
 * | headerBackgroundColor | string | '' | Cor do header |
 * | footerBackgroundColor | string | '' | Cor do footer |
 * | titleColor | string | '' | Cor do título |
 * | subtitleColor | string | '' | Cor do subtítulo |
 * | badgeColor | string | '' | Cor do badge |
 * | emptyTextColor | string | '' | Cor do texto vazio |
 * | footerTextColor | string | '' | Cor do footer text |
 *
 * ## 📋 Props - ListItemComponent
 *
 * | Prop | Tipo | Default | Descrição |
 * |------|------|---------|-----------|
 * | title | string | '' | Título principal |
 * | subtitle | string | '' | Subtítulo |
 * | description | string | '' | Descrição detalhada |
 * | avatar | string | '' | URL ou iniciais |
 * | icon | string | '' | Ícone Material |
 * | badge | string | '' | Badge inline |
 * | meta | string | '' | Meta text (trailing) |
 * | clickable | boolean | false | Item clicável |
 * | selected | boolean | false | Item selecionado |
 * | disabled | boolean | false | Item desabilitado |
 * | showChevron | boolean | false | Mostra chevron |
 * | actions | ListItemAction[] | [] | Ações do item |
 * | backgroundColor | string | '' | Cor de fundo |
 * | borderColor | string | '' | Cor da borda |
 * | titleColor | string | '' | Cor do título |
 * | subtitleColor | string | '' | Cor do subtítulo |
 * | descriptionColor | string | '' | Cor da descrição |
 * | iconColor | string | '' | Cor do ícone |
 * | avatarColor | string | '' | Cor do avatar |
 * | badgeColor | string | '' | Cor do badge |
 * | metaColor | string | '' | Cor do meta |
 * | chevronColor | string | '' | Cor do chevron |
 *
 * ## 💡 Casos de Uso
 *
 * 1. **Contatos**: Lista de pessoas com avatar e info
 * 2. **Configurações**: Menu de opções com ícones
 * 3. **Notificações**: Feed de atualizações
 * 4. **Tarefas**: Todo list com ações
 * 5. **Produtos**: Catálogo com preços
 * 6. **Mensagens**: Inbox com preview
 * 7. **Arquivos**: Listagem de documentos
 * 8. **Usuários**: Gestão de membros
 */
const meta: Meta<ListComponent> = {
  title: 'Layout/List',
  component: ListComponent,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'bordered', 'stripped', 'card'],
      description: 'Estilo visual da lista'
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Tamanho dos items'
    },
    dividerStyle: {
      control: 'select',
      options: ['solid', 'dashed', 'dotted', 'none'],
      description: 'Estilo dos divisores'
    },
    loading: {
      control: 'boolean',
      description: 'Estado de carregamento'
    },
    empty: {
      control: 'boolean',
      description: 'Estado vazio'
    },
    backgroundColor: {
      control: 'color',
      description: 'Cor de fundo da lista'
    },
    borderColor: {
      control: 'color',
      description: 'Cor da borda'
    }
  }
};

export default meta;
type Story = StoryObj<ListComponent>;

/**
 * Lista básica simples com títulos reais.
 */
export const Basic: Story = {
  render: () => ({
    template: `
      <web-list variant="bordered">
        <web-list-item
          title="Reunião com equipe de produto"
          subtitle="Hoje às 14:00">
        </web-list-item>
        <web-list-item
          title="Revisar documentação do projeto"
          subtitle="Pendente">
        </web-list-item>
        <web-list-item
          title="Preparar apresentação Q1"
          subtitle="Até sexta-feira">
        </web-list-item>
        <web-list-item
          title="Code review do PR #234"
          subtitle="Urgente">
        </web-list-item>
        <web-list-item
          title="Atualizar dependências do projeto"
          subtitle="Baixa prioridade">
        </web-list-item>
      </web-list>
    `
  })
};

/**
 * Comparação de todas as variantes visuais.
 */
export const Variants: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 32px;">
        <div>
          <h4 style="margin: 0 0 16px 0; color: #666;">Default (Limpa)</h4>
          <web-list variant="default">
            <web-list-item
              title="Design System v2.0"
              subtitle="Componentes atualizados"
              icon="palette"
              iconColor="#e91e63">
            </web-list-item>
            <web-list-item
              title="API REST Documentation"
              subtitle="Endpoints e exemplos"
              icon="api"
              iconColor="#007bff">
            </web-list-item>
            <web-list-item
              title="User Testing Results"
              subtitle="Feedback coletado"
              icon="assessment"
              iconColor="#22c55e">
            </web-list-item>
          </web-list>
        </div>

        <div>
          <h4 style="margin: 0 0 16px 0; color: #666;">Bordered (Com Borda)</h4>
          <web-list variant="bordered">
            <web-list-item
              title="Sprint Planning"
              subtitle="Segunda-feira, 9:00"
              icon="event"
              iconColor="#ffc107">
            </web-list-item>
            <web-list-item
              title="Daily Standup"
              subtitle="Todo dia, 9:30"
              icon="groups"
              iconColor="#007bff">
            </web-list-item>
            <web-list-item
              title="Sprint Review"
              subtitle="Sexta-feira, 16:00"
              icon="rate_review"
              iconColor="#22c55e">
            </web-list-item>
          </web-list>
        </div>

        <div>
          <h4 style="margin: 0 0 16px 0; color: #666;">Stripped (Zebra)</h4>
          <web-list variant="stripped">
            <web-list-item
              title="Janeiro 2024"
              subtitle="R$ 125.450,00"
              meta="+12%">
            </web-list-item>
            <web-list-item
              title="Fevereiro 2024"
              subtitle="R$ 138.920,00"
              meta="+18%">
            </web-list-item>
            <web-list-item
              title="Março 2024"
              subtitle="R$ 142.340,00"
              meta="+8%">
            </web-list-item>
            <web-list-item
              title="Abril 2024"
              subtitle="R$ 156.780,00"
              meta="+15%">
            </web-list-item>
          </web-list>
        </div>

        <div>
          <h4 style="margin: 0 0 16px 0; color: #666;">Card (Elevada)</h4>
          <web-list variant="card">
            <web-list-item
              title="iPhone 15 Pro Max"
              subtitle="256GB - Titânio Natural"
              meta="R$ 9.299,00"
              icon="smartphone"
              iconColor="#1a1a1a">
            </web-list-item>
            <web-list-item
              title="MacBook Pro 16"
              subtitle="M3 Max - 48GB RAM"
              meta="R$ 32.999,00"
              icon="laptop_mac"
              iconColor="#1a1a1a">
            </web-list-item>
            <web-list-item
              title="AirPods Pro 2"
              subtitle="USB-C - Branco"
              meta="R$ 2.399,00"
              icon="headphones"
              iconColor="#1a1a1a">
            </web-list-item>
          </web-list>
        </div>
      </div>
    `
  })
};

/**
 * Diferentes tamanhos de lista.
 */
export const Sizes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 32px;">
        <div>
          <h4 style="margin: 0 0 16px 0; color: #666;">Small (Compacta)</h4>
          <web-list size="small" variant="bordered">
            <web-list-item
              title="notification_settings.json"
              subtitle="124 KB"
              icon="code"
              iconColor="#f97316">
            </web-list-item>
            <web-list-item
              title="user_preferences.json"
              subtitle="89 KB"
              icon="code"
              iconColor="#f97316">
            </web-list-item>
            <web-list-item
              title="app_config.json"
              subtitle="56 KB"
              icon="code"
              iconColor="#f97316">
            </web-list-item>
            <web-list-item
              title="database_schema.sql"
              subtitle="234 KB"
              icon="storage"
              iconColor="#22c55e">
            </web-list-item>
          </web-list>
        </div>

        <div>
          <h4 style="margin: 0 0 16px 0; color: #666;">Medium (Padrão)</h4>
          <web-list size="medium" variant="bordered">
            <web-list-item
              title="Análise de Performance Q1"
              subtitle="Relatório completo de métricas"
              icon="analytics"
              iconColor="#007bff"
              meta="15 min">
            </web-list-item>
            <web-list-item
              title="Planejamento de Release"
              subtitle="Roadmap e cronograma"
              icon="timeline"
              iconColor="#a855f7"
              meta="30 min">
            </web-list-item>
            <web-list-item
              title="Documentação Técnica"
              subtitle="Guia de arquitetura do sistema"
              icon="description"
              iconColor="#22c55e"
              meta="45 min">
            </web-list-item>
          </web-list>
        </div>

        <div>
          <h4 style="margin: 0 0 16px 0; color: #666;">Large (Espaçosa)</h4>
          <web-list size="large" variant="bordered">
            <web-list-item
              title="Workshop de UX Design"
              subtitle="Aprenda princípios de design centrado no usuário"
              description="Sessão prática com cases reais e exercícios hands-on"
              icon="school"
              iconColor="#e91e63"
              badge="Online"
              badgeColor="#007bff">
            </web-list-item>
            <web-list-item
              title="Curso de React Avançado"
              subtitle="Hooks, Context API e Performance"
              description="12 horas de conteúdo com projetos práticos"
              icon="code"
              iconColor="#61dafb"
              badge="Novo"
              badgeColor="#22c55e">
            </web-list-item>
            <web-list-item
              title="Masterclass de TypeScript"
              subtitle="Do básico ao avançado"
              description="Tipos avançados, generics e design patterns"
              icon="terminal"
              iconColor="#3178c6"
              badge="Popular"
              badgeColor="#ffc107">
            </web-list-item>
          </web-list>
        </div>
      </div>
    `
  })
};

/**
 * Lista com header completo.
 */
export const WithHeader: Story = {
  render: () => ({
    template: `
      <web-list
        title="Projetos Ativos"
        subtitle="5 projetos em desenvolvimento"
        badge="5"
        badgeColor="#007bff"
        variant="bordered"
        [headerActions]="[
          { icon: 'add', label: 'Novo Projeto', action: () => alert('Adicionar projeto') },
          { icon: 'filter_list', label: 'Filtrar', action: () => alert('Filtrar projetos') }
        ]">
        <web-list-item
          title="Redesign do Portal"
          subtitle="Frontend • Em progresso"
          icon="web"
          iconColor="#007bff"
          badge="75%"
          badgeColor="#22c55e">
        </web-list-item>
        <web-list-item
          title="API de Pagamentos"
          subtitle="Backend • Revisão"
          icon="payments"
          iconColor="#ffc107"
          badge="90%"
          badgeColor="#22c55e">
        </web-list-item>
        <web-list-item
          title="App Mobile iOS"
          subtitle="Mobile • Desenvolvimento"
          icon="phone_iphone"
          iconColor="#1a1a1a"
          badge="45%"
          badgeColor="#f97316">
        </web-list-item>
        <web-list-item
          title="Dashboard Analytics"
          subtitle="Full Stack • Testes"
          icon="dashboard"
          iconColor="#a855f7"
          badge="85%"
          badgeColor="#22c55e">
        </web-list-item>
        <web-list-item
          title="Migração de Banco de Dados"
          subtitle="DevOps • Planejamento"
          icon="cloud_sync"
          iconColor="#ef4444"
          badge="20%"
          badgeColor="#6c757d">
        </web-list-item>
      </web-list>
    `
  })
};

/**
 * Items com avatares - ideal para listas de pessoas.
 */
export const WithAvatars: Story = {
  render: () => ({
    template: `
      <web-list
        title="Contatos"
        subtitle="Equipe de desenvolvimento"
        variant="bordered"
        [hoverable]="true">
        <web-list-item
          title="Maria Silva"
          subtitle="Product Designer"
          description="maria.silva@company.com"
          avatar="https://i.pravatar.cc/150?img=1"
          [clickable]="true"
          [showChevron]="true">
        </web-list-item>
        <web-list-item
          title="João Santos"
          subtitle="Frontend Developer"
          description="joao.santos@company.com"
          avatar="https://i.pravatar.cc/150?img=2"
          [clickable]="true"
          [showChevron]="true">
        </web-list-item>
        <web-list-item
          title="Ana Costa"
          subtitle="Backend Developer"
          description="ana.costa@company.com"
          avatar="https://i.pravatar.cc/150?img=3"
          [clickable]="true"
          [showChevron]="true">
        </web-list-item>
        <web-list-item
          title="Pedro Lima"
          subtitle="DevOps Engineer"
          description="pedro.lima@company.com"
          avatar="https://i.pravatar.cc/150?img=4"
          [clickable]="true"
          [showChevron]="true">
        </web-list-item>
      </web-list>
    `
  })
};

/**
 * Items com ícones - ideal para menus de configurações.
 */
export const WithIcons: Story = {
  render: () => ({
    template: `
      <web-list
        title="Configurações"
        variant="bordered"
        [hoverable]="true">
        <web-list-item
          title="Perfil"
          description="Gerenciar informações pessoais"
          icon="person"
          iconColor="#007bff"
          [clickable]="true"
          [showChevron]="true">
        </web-list-item>
        <web-list-item
          title="Notificações"
          description="Configurar preferências de notificação"
          icon="notifications"
          iconColor="#ffc107"
          [clickable]="true"
          [showChevron]="true">
        </web-list-item>
        <web-list-item
          title="Privacidade"
          description="Controlar quem vê suas informações"
          icon="lock"
          iconColor="#6c757d"
          [clickable]="true"
          [showChevron]="true">
        </web-list-item>
        <web-list-item
          title="Segurança"
          description="Senha e autenticação"
          icon="security"
          iconColor="#28a745"
          [clickable]="true"
          [showChevron]="true">
        </web-list-item>
        <web-list-item
          title="Aparência"
          description="Tema e personalização"
          icon="palette"
          iconColor="#e91e63"
          [clickable]="true"
          [showChevron]="true">
        </web-list-item>
      </web-list>
    `
  })
};

/**
 * Items com ações inline.
 */
export const WithActions: Story = {
  render: () => ({
    template: `
      <web-list
        title="Tarefas"
        subtitle="3 pendentes"
        variant="bordered">
        <web-list-item
          title="Revisar código do PR #123"
          subtitle="Alta prioridade"
          badge="Urgente"
          badgeColor="#ef4444"
          [actions]="[
            { icon: 'check', label: 'Concluir', color: '#22c55e', action: () => alert('Concluído!') },
            { icon: 'edit', label: 'Editar', action: () => alert('Editar') },
            { icon: 'delete', label: 'Deletar', color: '#ef4444', action: () => alert('Deletar') }
          ]">
        </web-list-item>
        <web-list-item
          title="Atualizar documentação"
          subtitle="Média prioridade"
          [actions]="[
            { icon: 'check', label: 'Concluir', color: '#22c55e', action: () => alert('Concluído!') },
            { icon: 'edit', label: 'Editar', action: () => alert('Editar') }
          ]">
        </web-list-item>
        <web-list-item
          title="Testar nova feature"
          subtitle="Baixa prioridade"
          [actions]="[
            { icon: 'check', label: 'Concluir', color: '#22c55e', action: () => alert('Concluído!') },
            { icon: 'edit', label: 'Editar', action: () => alert('Editar') }
          ]">
        </web-list-item>
      </web-list>
    `
  })
};

/**
 * Lista com cores customizadas - tema azul.
 */
export const CustomColorsBlue: Story = {
  render: () => ({
    template: `
      <web-list
        title="Lista Azul"
        subtitle="Tema personalizado"
        backgroundColor="#f0f9ff"
        borderColor="#0ea5e9"
        headerBackgroundColor="#e0f2fe"
        titleColor="#0c4a6e"
        subtitleColor="#075985"
        variant="bordered">
        <web-list-item
          title="Item Azul 1"
          subtitle="Com cores customizadas"
          icon="star"
          iconColor="#0ea5e9"
          titleColor="#0c4a6e"
          subtitleColor="#075985">
        </web-list-item>
        <web-list-item
          title="Item Azul 2"
          subtitle="Tema consistente"
          icon="favorite"
          iconColor="#0ea5e9"
          titleColor="#0c4a6e"
          subtitleColor="#075985">
        </web-list-item>
        <web-list-item
          title="Item Azul 3"
          subtitle="Visual harmonioso"
          icon="grade"
          iconColor="#0ea5e9"
          titleColor="#0c4a6e"
          subtitleColor="#075985">
        </web-list-item>
      </web-list>
    `
  })
};

/**
 * Diferentes temas de cores.
 */
export const ColorThemes: Story = {
  render: () => ({
    template: `
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px;">
        <!-- Verde -->
        <web-list
          title="Tema Verde"
          backgroundColor="#f0fdf4"
          borderColor="#22c55e"
          headerBackgroundColor="#dcfce7"
          titleColor="#166534"
          variant="bordered">
          <web-list-item
            title="Sucesso"
            subtitle="Operação concluída"
            icon="check_circle"
            iconColor="#22c55e"
            titleColor="#166534"
            subtitleColor="#15803d">
          </web-list-item>
          <web-list-item
            title="Aprovado"
            subtitle="Status confirmado"
            icon="verified"
            iconColor="#22c55e"
            titleColor="#166534"
            subtitleColor="#15803d">
          </web-list-item>
        </web-list>

        <!-- Roxo -->
        <web-list
          title="Tema Roxo"
          backgroundColor="#faf5ff"
          borderColor="#a855f7"
          headerBackgroundColor="#f3e8ff"
          titleColor="#6b21a8"
          variant="bordered">
          <web-list-item
            title="Premium"
            subtitle="Recurso exclusivo"
            icon="workspace_premium"
            iconColor="#a855f7"
            titleColor="#6b21a8"
            subtitleColor="#7e22ce">
          </web-list-item>
          <web-list-item
            title="VIP"
            subtitle="Acesso total"
            icon="stars"
            iconColor="#a855f7"
            titleColor="#6b21a8"
            subtitleColor="#7e22ce">
          </web-list-item>
        </web-list>

        <!-- Laranja -->
        <web-list
          title="Tema Laranja"
          backgroundColor="#fff7ed"
          borderColor="#f97316"
          headerBackgroundColor="#ffedd5"
          titleColor="#9a3412"
          variant="bordered">
          <web-list-item
            title="Atenção"
            subtitle="Requer verificação"
            icon="warning"
            iconColor="#f97316"
            titleColor="#9a3412"
            subtitleColor="#c2410c">
          </web-list-item>
          <web-list-item
            title="Importante"
            subtitle="Ação necessária"
            icon="priority_high"
            iconColor="#f97316"
            titleColor="#9a3412"
            subtitleColor="#c2410c">
          </web-list-item>
        </web-list>
      </div>
    `
  })
};

/**
 * Estados: Loading, Empty e Normal.
 */
export const States: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 32px;">
        <div>
          <h4 style="margin: 0 0 16px 0; color: #666;">Loading State</h4>
          <web-list
            title="Carregando Produtos"
            [loading]="true"
            loadingText="Buscando produtos disponíveis..."
            variant="bordered">
          </web-list>
        </div>

        <div>
          <h4 style="margin: 0 0 16px 0; color: #666;">Empty State</h4>
          <web-list
            title="Resultados da Busca"
            [empty]="true"
            emptyText="Nenhum resultado encontrado para sua busca"
            emptyIcon="search_off"
            variant="bordered">
          </web-list>
        </div>

        <div>
          <h4 style="margin: 0 0 16px 0; color: #666;">Normal State - Lista Populada</h4>
          <web-list
            title="Meus Documentos"
            subtitle="3 arquivos"
            variant="bordered"
            [hoverable]="true">
            <web-list-item
              title="Proposta Comercial.pdf"
              subtitle="Atualizado há 2 horas"
              icon="description"
              iconColor="#ef4444"
              meta="2.5 MB"
              [clickable]="true"
              [showChevron]="true">
            </web-list-item>
            <web-list-item
              title="Apresentação Q1 2024.pptx"
              subtitle="Atualizado ontem"
              icon="slideshow"
              iconColor="#f97316"
              meta="8.3 MB"
              [clickable]="true"
              [showChevron]="true">
            </web-list-item>
            <web-list-item
              title="Relatório Financeiro.xlsx"
              subtitle="Atualizado há 3 dias"
              icon="table_chart"
              iconColor="#22c55e"
              meta="1.2 MB"
              [clickable]="true"
              [showChevron]="true">
            </web-list-item>
          </web-list>
        </div>
      </div>
    `
  })
};

/**
 * Estilos de divisores entre items.
 */
export const DividerStyles: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 32px;">
        <div>
          <h4 style="margin: 0 0 16px 0; color: #666;">Solid (Sólido)</h4>
          <web-list dividerStyle="solid" variant="bordered">
            <web-list-item
              title="React 18.2.0"
              subtitle="Biblioteca JavaScript"
              icon="javascript"
              iconColor="#61dafb">
            </web-list-item>
            <web-list-item
              title="Angular 17.0.0"
              subtitle="Framework TypeScript"
              icon="angular"
              iconColor="#dd0031">
            </web-list-item>
            <web-list-item
              title="Vue 3.3.0"
              subtitle="Framework progressivo"
              icon="vue"
              iconColor="#42b883">
            </web-list-item>
          </web-list>
        </div>

        <div>
          <h4 style="margin: 0 0 16px 0; color: #666;">Dashed (Tracejado)</h4>
          <web-list dividerStyle="dashed" variant="bordered">
            <web-list-item
              title="São Paulo, SP"
              subtitle="Matriz"
              icon="location_on"
              iconColor="#ef4444"
              meta="Principal">
            </web-list-item>
            <web-list-item
              title="Rio de Janeiro, RJ"
              subtitle="Filial"
              icon="location_on"
              iconColor="#007bff"
              meta="Regional">
            </web-list-item>
            <web-list-item
              title="Belo Horizonte, MG"
              subtitle="Filial"
              icon="location_on"
              iconColor="#22c55e"
              meta="Regional">
            </web-list-item>
          </web-list>
        </div>

        <div>
          <h4 style="margin: 0 0 16px 0; color: #666;">Dotted (Pontilhado)</h4>
          <web-list dividerStyle="dotted" variant="bordered">
            <web-list-item
              title="Básico"
              subtitle="R$ 29,90/mês"
              description="Ideal para começar"
              icon="star_border"
              iconColor="#6c757d">
            </web-list-item>
            <web-list-item
              title="Pro"
              subtitle="R$ 79,90/mês"
              description="Para profissionais"
              icon="star_half"
              iconColor="#ffc107"
              badge="Popular"
              badgeColor="#ffc107">
            </web-list-item>
            <web-list-item
              title="Enterprise"
              subtitle="R$ 199,90/mês"
              description="Para empresas"
              icon="star"
              iconColor="#a855f7"
              badge="Premium"
              badgeColor="#a855f7">
            </web-list-item>
          </web-list>
        </div>

        <div>
          <h4 style="margin: 0 0 16px 0; color: #666;">None (Sem divisor)</h4>
          <web-list dividerStyle="none" variant="bordered">
            <web-list-item
              title="Café da manhã"
              subtitle="07:00 - 09:00"
              icon="free_breakfast"
              iconColor="#f97316">
            </web-list-item>
            <web-list-item
              title="Almoço"
              subtitle="12:00 - 14:00"
              icon="restaurant"
              iconColor="#22c55e">
            </web-list-item>
            <web-list-item
              title="Jantar"
              subtitle="19:00 - 21:00"
              icon="dinner_dining"
              iconColor="#007bff">
            </web-list-item>
          </web-list>
        </div>
      </div>
    `
  })
};

/**
 * Caso de uso completo: Lista de notificações.
 */
export const NotificationsList: Story = {
  render: () => ({
    template: `
      <web-list
        title="Notificações"
        subtitle="Você tem 3 não lidas"
        badge="3"
        badgeColor="#ef4444"
        variant="card"
        [hoverable]="true">
        <web-list-item
          title="Nova mensagem de Maria Silva"
          subtitle="Há 5 minutos"
          description="Olá! Podemos conversar sobre o projeto?"
          avatar="https://i.pravatar.cc/150?img=1"
          badge="Novo"
          badgeColor="#22c55e"
          [clickable]="true"
          backgroundColor="#f0fdf4">
        </web-list-item>
        <web-list-item
          title="Atualização de sistema"
          subtitle="Há 1 hora"
          description="Nova versão disponível para download"
          icon="system_update"
          iconColor="#007bff"
          [clickable]="true">
        </web-list-item>
        <web-list-item
          title="Lembrete: Reunião às 15h"
          subtitle="Há 2 horas"
          description="Reunião de planejamento da sprint"
          icon="event"
          iconColor="#ffc107"
          badge="Hoje"
          badgeColor="#ffc107"
          [clickable]="true"
          backgroundColor="#fffbeb">
        </web-list-item>
        <web-list-item
          title="João comentou no seu post"
          subtitle="Ontem"
          description="Ótimo trabalho no artigo!"
          avatar="https://i.pravatar.cc/150?img=2"
          [clickable]="true">
        </web-list-item>
      </web-list>
    `
  })
};

/**
 * Caso de uso: Lista de produtos com preços.
 */
export const ProductsList: Story = {
  render: () => ({
    template: `
      <web-list
        title="Carrinho de Compras"
        subtitle="4 produtos"
        variant="bordered"
        [showFooter]="true"
        footerText="Total: R$ 13.596,00"
        footerBackgroundColor="#f0fdf4"
        footerTextColor="#166534">
        <web-list-item
          title="iPhone 14 Pro"
          subtitle="256GB - Preto Espacial"
          description="Disponível para entrega em 2 dias úteis"
          icon="smartphone"
          iconColor="#1a1a1a"
          meta="R$ 6.999,00"
          metaColor="#166534"
          [actions]="[
            { icon: 'remove', label: 'Remover', color: '#ef4444', action: () => alert('Removido!') }
          ]">
        </web-list-item>
        <web-list-item
          title="AirPods Pro"
          subtitle="2ª Geração - Branco"
          description="Com cancelamento de ruído ativo e áudio espacial"
          icon="headphones"
          iconColor="#1a1a1a"
          meta="R$ 1.899,00"
          metaColor="#166534"
          [actions]="[
            { icon: 'remove', label: 'Remover', color: '#ef4444', action: () => alert('Removido!') }
          ]">
        </web-list-item>
        <web-list-item
          title="Magic Keyboard"
          subtitle="Português BR - Preto"
          description="Com Touch ID e teclado numérico"
          icon="keyboard"
          iconColor="#1a1a1a"
          meta="R$ 899,00"
          metaColor="#166534"
          [actions]="[
            { icon: 'remove', label: 'Remover', color: '#ef4444', action: () => alert('Removido!') }
          ]">
        </web-list-item>
        <web-list-item
          title="Apple Watch Series 9"
          subtitle="45mm - GPS + Celular"
          description="Pulseira esportiva azul-meia-noite"
          icon="watch"
          iconColor="#1a1a1a"
          badge="-10%"
          badgeColor="#22c55e"
          meta="R$ 3.799,00"
          metaColor="#166534"
          [actions]="[
            { icon: 'remove', label: 'Remover', color: '#ef4444', action: () => alert('Removido!') }
          ]">
        </web-list-item>
      </web-list>
    `
  })
};

/**
 * Caso de uso: Lista de tarefas completa.
 */
export const TodoList: Story = {
  render: () => ({
    template: `
      <web-list
        title="Minhas Tarefas"
        subtitle="5 pendentes, 2 concluídas"
        badge="5"
        badgeColor="#f97316"
        variant="bordered"
        [headerActions]="[
          { icon: 'add', label: 'Nova tarefa', action: () => alert('Adicionar') }
        ]">
        <web-list-item
          title="Finalizar apresentação do projeto"
          subtitle="Até amanhã"
          description="Preparar slides para reunião com stakeholders"
          badge="Urgente"
          badgeColor="#ef4444"
          [actions]="[
            { icon: 'check', label: 'Concluir', color: '#22c55e', action: () => alert('Concluído!') },
            { icon: 'edit', label: 'Editar', action: () => alert('Editar') },
            { icon: 'delete', label: 'Deletar', color: '#ef4444', action: () => alert('Deletar') }
          ]">
        </web-list-item>
        <web-list-item
          title="Revisar código do PR #347"
          subtitle="Até sexta-feira"
          description="Verificar implementação do novo sistema de autenticação"
          badge="Alta"
          badgeColor="#f97316"
          [actions]="[
            { icon: 'check', label: 'Concluir', color: '#22c55e', action: () => alert('Concluído!') },
            { icon: 'edit', label: 'Editar', action: () => alert('Editar') }
          ]">
        </web-list-item>
        <web-list-item
          title="Atualizar documentação técnica"
          subtitle="Próxima semana"
          description="Adicionar exemplos de uso da nova API"
          [actions]="[
            { icon: 'check', label: 'Concluir', color: '#22c55e', action: () => alert('Concluído!') },
            { icon: 'edit', label: 'Editar', action: () => alert('Editar') }
          ]">
        </web-list-item>
        <web-list-item
          title="Configurar ambiente de staging"
          subtitle="Este mês"
          description="Deploy do ambiente de testes"
          [actions]="[
            { icon: 'check', label: 'Concluir', color: '#22c55e', action: () => alert('Concluído!') },
            { icon: 'edit', label: 'Editar', action: () => alert('Editar') }
          ]">
        </web-list-item>
        <web-list-item
          title="Participar da daily meeting"
          subtitle="Amanhã 9:00"
          description="Reunião diária da equipe"
          icon="videocam"
          iconColor="#007bff"
          [actions]="[
            { icon: 'check', label: 'Concluir', color: '#22c55e', action: () => alert('Concluído!') }
          ]">
        </web-list-item>
        <web-list-item
          title="Implementar testes unitários"
          subtitle="Concluída"
          description="Cobertura de 85% alcançada"
          icon="check_circle"
          iconColor="#22c55e"
          [selected]="true"
          backgroundColor="#f0fdf4"
          titleColor="#166534">
        </web-list-item>
        <web-list-item
          title="Refatorar módulo de pagamentos"
          subtitle="Concluída"
          description="Código otimizado e documentado"
          icon="check_circle"
          iconColor="#22c55e"
          [selected]="true"
          backgroundColor="#f0fdf4"
          titleColor="#166534">
        </web-list-item>
      </web-list>
    `
  })
};

/**
 * Caso de uso: Lista de emails/mensagens.
 */
export const EmailList: Story = {
  render: () => ({
    template: `
      <web-list
        title="Caixa de Entrada"
        subtitle="12 não lidas"
        badge="12"
        badgeColor="#ef4444"
        variant="card"
        [hoverable]="true"
        [headerActions]="[
          { icon: 'refresh', label: 'Atualizar', action: () => alert('Atualizar') },
          { icon: 'mark_email_read', label: 'Marcar lidas', action: () => alert('Marcar') }
        ]">
        <web-list-item
          title="Relatório Mensal - Janeiro 2024"
          subtitle="contabilidade@empresa.com"
          description="Segue em anexo o relatório consolidado das operações de janeiro..."
          avatar="https://i.pravatar.cc/150?img=5"
          meta="09:30"
          badge="Novo"
          badgeColor="#22c55e"
          [clickable]="true"
          backgroundColor="#f0fdf4">
        </web-list-item>
        <web-list-item
          title="Re: Proposta Comercial - Cliente XYZ"
          subtitle="comercial@cliente.com"
          description="Obrigado pela proposta. Gostaríamos de agendar uma reunião..."
          avatar="https://i.pravatar.cc/150?img=6"
          meta="Ontem"
          badge="Novo"
          badgeColor="#22c55e"
          [clickable]="true"
          backgroundColor="#f0fdf4">
        </web-list-item>
        <web-list-item
          title="Atualização de Sistema - Manutenção Programada"
          subtitle="ti@empresa.com"
          description="Informamos que haverá manutenção programada no sistema..."
          avatar="https://i.pravatar.cc/150?img=7"
          meta="23 Jan"
          icon="info"
          iconColor="#007bff"
          [clickable]="true">
        </web-list-item>
        <web-list-item
          title="Convite: Reunião de Planejamento Q1"
          subtitle="gerencia@empresa.com"
          description="Você foi convidado para participar da reunião de planejamento..."
          avatar="https://i.pravatar.cc/150?img=8"
          meta="22 Jan"
          icon="event"
          iconColor="#ffc107"
          [clickable]="true">
        </web-list-item>
        <web-list-item
          title="Feedback sobre nova funcionalidade"
          subtitle="produto@empresa.com"
          description="Recebemos seu feedback sobre a nova funcionalidade. Obrigado..."
          avatar="https://i.pravatar.cc/150?img=9"
          meta="20 Jan"
          [clickable]="true">
        </web-list-item>
        <web-list-item
          title="Confirmação de Pedido #12345"
          subtitle="vendas@loja.com"
          description="Seu pedido foi confirmado e será enviado em breve..."
          avatar="https://i.pravatar.cc/150?img=10"
          meta="18 Jan"
          [clickable]="true">
        </web-list-item>
      </web-list>
    `
  })
};

/**
 * Caso de uso: Lista de usuários/equipe.
 */
export const TeamList: Story = {
  render: () => ({
    template: `
      <web-list
        title="Equipe de Desenvolvimento"
        subtitle="8 membros ativos"
        variant="bordered"
        [hoverable]="true"
        [headerActions]="[
          { icon: 'person_add', label: 'Adicionar membro', action: () => alert('Adicionar') }
        ]">
        <web-list-item
          title="Ana Carolina Silva"
          subtitle="Tech Lead & Senior Developer"
          description="ana.silva@empresa.com • +55 11 98765-4321"
          avatar="https://i.pravatar.cc/150?img=1"
          badge="Admin"
          badgeColor="#a855f7"
          [clickable]="true"
          [showChevron]="true"
          [actions]="[
            { icon: 'mail', label: 'Email', color: '#007bff', action: () => alert('Email') },
            { icon: 'more_vert', label: 'Mais', action: () => alert('Menu') }
          ]">
        </web-list-item>
        <web-list-item
          title="Bruno Henrique Costa"
          subtitle="Full Stack Developer"
          description="bruno.costa@empresa.com • +55 21 98765-1234"
          avatar="https://i.pravatar.cc/150?img=2"
          [clickable]="true"
          [showChevron]="true"
          [actions]="[
            { icon: 'mail', label: 'Email', color: '#007bff', action: () => alert('Email') },
            { icon: 'more_vert', label: 'Mais', action: () => alert('Menu') }
          ]">
        </web-list-item>
        <web-list-item
          title="Camila Rodrigues"
          subtitle="Frontend Developer"
          description="camila.rodrigues@empresa.com • +55 11 97654-3210"
          avatar="https://i.pravatar.cc/150?img=3"
          [clickable]="true"
          [showChevron]="true"
          [actions]="[
            { icon: 'mail', label: 'Email', color: '#007bff', action: () => alert('Email') },
            { icon: 'more_vert', label: 'Mais', action: () => alert('Menu') }
          ]">
        </web-list-item>
        <web-list-item
          title="Daniel Santos"
          subtitle="Backend Developer"
          description="daniel.santos@empresa.com • +55 11 96543-2109"
          avatar="https://i.pravatar.cc/150?img=4"
          badge="Novo"
          badgeColor="#22c55e"
          [clickable]="true"
          [showChevron]="true"
          [actions]="[
            { icon: 'mail', label: 'Email', color: '#007bff', action: () => alert('Email') },
            { icon: 'more_vert', label: 'Mais', action: () => alert('Menu') }
          ]">
        </web-list-item>
        <web-list-item
          title="Eduarda Lima"
          subtitle="UX/UI Designer"
          description="eduarda.lima@empresa.com • +55 11 95432-1098"
          avatar="https://i.pravatar.cc/150?img=5"
          [clickable]="true"
          [showChevron]="true"
          [actions]="[
            { icon: 'mail', label: 'Email', color: '#007bff', action: () => alert('Email') },
            { icon: 'more_vert', label: 'Mais', action: () => alert('Menu') }
          ]">
        </web-list-item>
        <web-list-item
          title="Fernando Alves"
          subtitle="DevOps Engineer"
          description="fernando.alves@empresa.com • +55 11 94321-0987"
          avatar="https://i.pravatar.cc/150?img=6"
          [clickable]="true"
          [showChevron]="true"
          [actions]="[
            { icon: 'mail', label: 'Email', color: '#007bff', action: () => alert('Email') },
            { icon: 'more_vert', label: 'Mais', action: () => alert('Menu') }
          ]">
        </web-list-item>
        <web-list-item
          title="Gabriela Martins"
          subtitle="QA Engineer"
          description="gabriela.martins@empresa.com • +55 11 93210-9876"
          avatar="https://i.pravatar.cc/150?img=7"
          [clickable]="true"
          [showChevron]="true"
          [actions]="[
            { icon: 'mail', label: 'Email', color: '#007bff', action: () => alert('Email') },
            { icon: 'more_vert', label: 'Mais', action: () => alert('Menu') }
          ]">
        </web-list-item>
        <web-list-item
          title="Henrique Souza"
          subtitle="Product Manager"
          description="henrique.souza@empresa.com • +55 11 92109-8765"
          avatar="https://i.pravatar.cc/150?img=8"
          badge="Admin"
          badgeColor="#a855f7"
          [clickable]="true"
          [showChevron]="true"
          [actions]="[
            { icon: 'mail', label: 'Email', color: '#007bff', action: () => alert('Email') },
            { icon: 'more_vert', label: 'Mais', action: () => alert('Menu') }
          ]">
        </web-list-item>
      </web-list>
    `
  })
};
