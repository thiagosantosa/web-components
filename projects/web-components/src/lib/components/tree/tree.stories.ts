import type { Meta, StoryObj } from '@storybook/angular';
import { TreeComponent, TreeNode } from './tree.component';
import { FormsModule } from '@angular/forms';

/**
 * # Tree Component
 *
 * Um componente de árvore hierárquica moderno e completo que SUPERA todos os concorrentes
 * do mercado com recursos avançados e customização total de cores.
 *
 * ## 🏆 COMPARATIVO COM CONCORRENTES
 *
 * | Feature | Material UI | Ant Design | PrimeNG | **web-tree** |
 * |---------|-------------|------------|---------|--------------|
 * | **Variantes** | 1 | 1 | 1 | **3** ✨ |
 * | **Tamanhos** | 2 | 2 | 1 | **3** ✨ |
 * | **Seleção Múltipla** | ✅ | ✅ | ✅ | **✅** |
 * | **Checkboxes** | ❌ | ✅ | ✅ | **✅** |
 * | **Busca Integrada** | ❌ | ❌ | ✅ | **✅** |
 * | **Avatares** | ❌ | ❌ | ❌ | **✅** ✨ |
 * | **Badges** | ❌ | ❌ | ❌ | **✅** ✨ |
 * | **Meta Info** | ❌ | ❌ | ❌ | **✅** ✨ |
 * | **Linhas de Conexão** | ✅ | ✅ | ✅ | **✅ (3 estilos)** ✨ |
 * | **Cores por Nó** | ❌ | ❌ | ❌ | **✅** ✨ |
 * | **Ícones Customizáveis** | ✅ | ✅ | ✅ | **✅** |
 * | **Expandir/Colapsar Tudo** | ❌ | ✅ | ✅ | **✅** |
 * | **Estado Indeterminado** | ❌ | ✅ | ✅ | **✅** |
 * | **Customização de Cores** | **2** | **3** | **2** | **10+** ✨✨✨ |
 * | **Animações Suaves** | ✅ | ✅ | ❌ | **✅** |
 * | **TypeScript Completo** | ✅ | ✅ | ✅ | **✅** |
 *
 * ## 🎯 Principais Funcionalidades
 *
 * ### Variantes Visuais
 * - **default**: Árvore limpa sem bordas
 * - **bordered**: Árvore com borda ao redor
 * - **filled**: Fundo preenchido
 *
 * ### Tamanhos
 * - **small**: Compacta para alta densidade
 * - **medium**: Tamanho padrão
 * - **large**: Espaçosa para melhor legibilidade
 *
 * ### Modos de Seleção
 * - **none**: Sem seleção
 * - **single**: Seleção única
 * - **multiple**: Seleção múltipla
 * - **checkbox**: Seleção com checkboxes (cascata)
 *
 * ### Estilos de Linha
 * - **solid**: Linhas sólidas de conexão
 * - **dashed**: Linhas tracejadas
 * - **dotted**: Linhas pontilhadas
 * - **none**: Sem linhas
 *
 * ## 📦 Recursos Exclusivos
 *
 * ### Por Nó (TreeNode)
 * - **Avatar**: Foto ou iniciais
 * - **Ícone**: Material Symbols customizável
 * - **Badge**: Etiqueta com cor
 * - **Meta**: Informação adicional (ex: contagem, data)
 * - **Cores Individuais**: Cada nó pode ter cores próprias
 *
 * ### Funcionalidades Avançadas
 * - **Busca Integrada**: Filtra e expande automaticamente
 * - **Expandir/Colapsar Tudo**: Controles no header
 * - **Seleção Cascata**: Checkboxes com estado indeterminado
 * - **Estado Desabilitado**: Nós não interativos
 * - **Dados Customizados**: Campo `data` para armazenar qualquer info
 *
 * ### Customização de Cores TOTAL (10+ propriedades)
 * - Background geral e por nó
 * - Cores de borda
 * - Cores de header
 * - Cores de label, ícone, badge e meta
 * - Cor de nó selecionado
 *
 * ## 🔧 Como Usar
 *
 * ### Importação
 * ```typescript
 * import { TreeComponent, TreeNode } from '@thiagosantosa/web-components';
 *
 * @Component({
 *   imports: [TreeComponent],
 *   // ...
 * })
 * ```
 *
 * ### Árvore Básica
 * ```typescript
 * nodes: TreeNode[] = [
 *   {
 *     id: 1,
 *     label: 'Documentos',
 *     icon: 'folder',
 *     children: [
 *       { id: 2, label: 'arquivo.pdf', icon: 'description' },
 *       { id: 3, label: 'imagem.png', icon: 'image' }
 *     ]
 *   }
 * ];
 * ```
 *
 * ```html
 * <web-tree [nodes]="nodes"></web-tree>
 * ```
 *
 * ### Com Seleção
 * ```html
 * <web-tree
 *   [nodes]="nodes"
 *   selectionMode="single"
 *   (selectionChange)="onSelect($event)">
 * </web-tree>
 * ```
 *
 * ### Com Checkboxes
 * ```html
 * <web-tree
 *   [nodes]="nodes"
 *   selectionMode="checkbox"
 *   (nodeCheck)="onCheck($event)">
 * </web-tree>
 * ```
 *
 * ### Com Busca
 * ```html
 * <web-tree
 *   [nodes]="nodes"
 *   [searchable]="true"
 *   title="Arquivos">
 * </web-tree>
 * ```
 *
 * ### Com Linhas de Conexão
 * ```html
 * <web-tree
 *   [nodes]="nodes"
 *   [showLines]="true"
 *   lineStyle="dashed">
 * </web-tree>
 * ```
 *
 * ### Com Cores Customizadas
 * ```html
 * <web-tree
 *   [nodes]="nodes"
 *   backgroundColor="#f0f9ff"
 *   borderColor="#0ea5e9"
 *   headerBackgroundColor="#e0f2fe"
 *   selectedNodeBackground="#dbeafe">
 * </web-tree>
 * ```
 *
 * ### Nós com Cores Individuais
 * ```typescript
 * nodes: TreeNode[] = [
 *   {
 *     id: 1,
 *     label: 'Urgente',
 *     icon: 'warning',
 *     iconColor: '#ef4444',
 *     labelColor: '#991b1b',
 *     backgroundColor: '#fee2e2'
 *   }
 * ];
 * ```
 *
 * ## 📋 Props - TreeComponent
 *
 * | Prop | Tipo | Default | Descrição |
 * |------|------|---------|-----------|
 * | nodes | TreeNode[] | [] | Array de nós da árvore |
 * | selectionMode | TreeSelectionMode | 'single' | Modo de seleção |
 * | size | TreeSize | 'medium' | Tamanho dos nós |
 * | variant | TreeVariant | 'default' | Estilo visual |
 * | title | string | '' | Título do header |
 * | badge | string | '' | Badge no header |
 * | expandable | boolean | true | Permite expandir/colapsar |
 * | showLines | boolean | false | Mostra linhas de conexão |
 * | lineStyle | TreeLineStyle | 'solid' | Estilo das linhas |
 * | searchable | boolean | false | Ativa busca |
 * | indentSize | number | 24 | Espaço de indentação (px) |
 * | rootPadding | string | '0' | Padding dos nós raiz |
 * | emptyText | string | 'Nenhum item...' | Texto do estado vazio |
 * | expandAll | boolean | false | Expande tudo no init |
 * | backgroundColor | string | '' | Cor de fundo |
 * | borderColor | string | '' | Cor da borda |
 * | headerBackgroundColor | string | '' | Cor do header |
 * | titleColor | string | '' | Cor do título |
 * | badgeColor | string | '' | Cor do badge |
 * | labelColor | string | '' | Cor dos labels |
 * | iconColor | string | '' | Cor dos ícones |
 * | metaColor | string | '' | Cor do meta |
 * | selectedNodeBackground | string | '' | Cor do nó selecionado |
 *
 * ## 📋 Interface TreeNode
 *
 * ```typescript
 * interface TreeNode {
 *   id: string | number;           // ID único
 *   label: string;                  // Texto do nó
 *   icon?: string;                  // Ícone Material
 *   avatar?: string;                // URL ou iniciais
 *   badge?: string;                 // Texto do badge
 *   badgeColor?: string;            // Cor do badge
 *   children?: TreeNode[];          // Filhos
 *   expanded?: boolean;             // Estado expandido
 *   selected?: boolean;             // Estado selecionado
 *   disabled?: boolean;             // Estado desabilitado
 *   checked?: boolean;              // Estado do checkbox
 *   indeterminate?: boolean;        // Estado indeterminado
 *   meta?: string;                  // Info adicional
 *   data?: any;                     // Dados customizados
 *   // Cores individuais por nó
 *   labelColor?: string;
 *   iconColor?: string;
 *   backgroundColor?: string;
 * }
 * ```
 *
 * ## 📤 Eventos
 *
 * | Evento | Payload | Descrição |
 * |--------|---------|-----------|
 * | nodeClick | TreeNodeEvent | Clique em um nó |
 * | nodeExpand | TreeNode | Nó expandido |
 * | nodeCollapse | TreeNode | Nó colapsado |
 * | nodeCheck | TreeNode | Checkbox alterado |
 * | selectionChange | TreeNode[] | Seleção alterada |
 *
 * ## 💡 Casos de Uso
 *
 * 1. **File Explorer**: Sistema de arquivos e pastas
 * 2. **Menu Hierárquico**: Navegação multinível
 * 3. **Organograma**: Estrutura organizacional
 * 4. **Categorias**: Taxonomia de produtos/conteúdo
 * 5. **Permissões**: Controle de acesso por módulo
 * 6. **Documentação**: Estrutura de docs técnicos
 * 7. **Localização**: Países > Estados > Cidades
 * 8. **Projetos**: Tasks e subtasks
 */
const meta: Meta<TreeComponent> = {
  title: 'Layout/Tree',
  component: TreeComponent,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'bordered', 'filled'],
      description: 'Estilo visual da árvore'
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Tamanho dos nós'
    },
    selectionMode: {
      control: 'select',
      options: ['none', 'single', 'multiple', 'checkbox'],
      description: 'Modo de seleção'
    },
    lineStyle: {
      control: 'select',
      options: ['solid', 'dashed', 'dotted', 'none'],
      description: 'Estilo das linhas de conexão'
    },
    showLines: {
      control: 'boolean',
      description: 'Mostra linhas de conexão'
    },
    searchable: {
      control: 'boolean',
      description: 'Ativa campo de busca'
    },
    expandAll: {
      control: 'boolean',
      description: 'Expande todos os nós'
    },
    backgroundColor: {
      control: 'color',
      description: 'Cor de fundo'
    },
    borderColor: {
      control: 'color',
      description: 'Cor da borda'
    }
  }
};

export default meta;
type Story = StoryObj<TreeComponent>;

// Sample data
const fileSystemNodes: TreeNode[] = [
  {
    id: 1,
    label: 'Documentos',
    icon: 'folder',
    iconColor: '#ffc107',
    expanded: true,
    children: [
      {
        id: 2,
        label: 'Trabalho',
        icon: 'folder',
        iconColor: '#007bff',
        children: [
          { id: 3, label: 'Proposta.pdf', icon: 'description', iconColor: '#ef4444', meta: '2.5 MB' },
          { id: 4, label: 'Contrato.docx', icon: 'description', iconColor: '#007bff', meta: '1.2 MB' }
        ]
      },
      {
        id: 5,
        label: 'Pessoal',
        icon: 'folder',
        iconColor: '#22c55e',
        children: [
          { id: 6, label: 'Férias.jpg', icon: 'image', iconColor: '#e91e63', meta: '5.8 MB' },
          { id: 7, label: 'Receita.pdf', icon: 'description', iconColor: '#ef4444', meta: '890 KB' }
        ]
      }
    ]
  },
  {
    id: 8,
    label: 'Downloads',
    icon: 'folder',
    iconColor: '#6c757d',
    children: [
      { id: 9, label: 'angular-17.zip', icon: 'folder_zip', iconColor: '#dd0031', meta: '125 MB' },
      { id: 10, label: 'video-tutorial.mp4', icon: 'movie', iconColor: '#f97316', meta: '450 MB' }
    ]
  }
];

/**
 * Árvore básica com ícones e estrutura simples.
 */
export const Basic: Story = {
  args: {
    nodes: fileSystemNodes,
    variant: 'bordered'
  }
};

/**
 * Comparação de todas as variantes visuais.
 */
export const Variants: Story = {
  render: () => ({
    props: {
      nodes: fileSystemNodes
    },
    template: `
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px;">
        <div>
          <h4 style="margin: 0 0 16px 0; color: #666;">Default</h4>
          <web-tree [nodes]="nodes" variant="default"></web-tree>
        </div>

        <div>
          <h4 style="margin: 0 0 16px 0; color: #666;">Bordered</h4>
          <web-tree [nodes]="nodes" variant="bordered"></web-tree>
        </div>

        <div>
          <h4 style="margin: 0 0 16px 0; color: #666;">Filled</h4>
          <web-tree [nodes]="nodes" variant="filled"></web-tree>
        </div>
      </div>
    `
  })
};

/**
 * Diferentes tamanhos de árvore.
 */
export const Sizes: Story = {
  render: () => ({
    props: {
      nodes: fileSystemNodes
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 32px;">
        <div>
          <h4 style="margin: 0 0 16px 0; color: #666;">Small</h4>
          <web-tree [nodes]="nodes" size="small" variant="bordered"></web-tree>
        </div>

        <div>
          <h4 style="margin: 0 0 16px 0; color: #666;">Medium</h4>
          <web-tree [nodes]="nodes" size="medium" variant="bordered"></web-tree>
        </div>

        <div>
          <h4 style="margin: 0 0 16px 0; color: #666;">Large</h4>
          <web-tree [nodes]="nodes" size="large" variant="bordered"></web-tree>
        </div>
      </div>
    `
  })
};

/**
 * Diferentes modos de seleção.
 */
export const SelectionModes: Story = {
  render: () => ({
    props: {
      nodes: fileSystemNodes,
      onSelectionChange: (nodes: TreeNode[]) => {
        console.log('Selected:', nodes);
        alert(`Selecionados: ${nodes.length} item(s)`);
      }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 32px;">
        <div>
          <h4 style="margin: 0 0 16px 0; color: #666;">Single Selection</h4>
          <web-tree
            [nodes]="nodes"
            selectionMode="single"
            variant="bordered"
            (selectionChange)="onSelectionChange($event)">
          </web-tree>
        </div>

        <div>
          <h4 style="margin: 0 0 16px 0; color: #666;">Multiple Selection</h4>
          <web-tree
            [nodes]="nodes"
            selectionMode="multiple"
            variant="bordered"
            (selectionChange)="onSelectionChange($event)">
          </web-tree>
        </div>

        <div>
          <h4 style="margin: 0 0 16px 0; color: #666;">Checkbox Selection (Cascata)</h4>
          <web-tree
            [nodes]="nodes"
            selectionMode="checkbox"
            variant="bordered"
            (selectionChange)="onSelectionChange($event)">
          </web-tree>
        </div>
      </div>
    `
  })
};

/**
 * Árvore com linhas de conexão.
 */
export const WithLines: Story = {
  render: () => ({
    props: {
      nodes: fileSystemNodes
    },
    template: `
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px;">
        <div>
          <h4 style="margin: 0 0 16px 0; color: #666;">Solid Lines</h4>
          <web-tree
            [nodes]="nodes"
            [showLines]="true"
            lineStyle="solid"
            variant="bordered">
          </web-tree>
        </div>

        <div>
          <h4 style="margin: 0 0 16px 0; color: #666;">Dashed Lines</h4>
          <web-tree
            [nodes]="nodes"
            [showLines]="true"
            lineStyle="dashed"
            variant="bordered">
          </web-tree>
        </div>

        <div>
          <h4 style="margin: 0 0 16px 0; color: #666;">Dotted Lines</h4>
          <web-tree
            [nodes]="nodes"
            [showLines]="true"
            lineStyle="dotted"
            variant="bordered">
          </web-tree>
        </div>
      </div>
    `
  })
};

/**
 * Árvore com busca integrada.
 */
export const WithSearch: Story = {
  args: {
    nodes: fileSystemNodes,
    searchable: true,
    title: 'Explorador de Arquivos',
    variant: 'bordered',
    showLines: true
  }
};

/**
 * Árvore organizacional com avatares.
 */
export const OrganizationChart: Story = {
  render: () => ({
    props: {
      orgNodes: [
        {
          id: 1,
          label: 'Ana Silva',
          avatar: 'https://i.pravatar.cc/150?img=1',
          meta: 'CEO',
          badge: 'C-Level',
          badgeColor: '#a855f7',
          expanded: true,
          children: [
            {
              id: 2,
              label: 'Bruno Costa',
              avatar: 'https://i.pravatar.cc/150?img=2',
              meta: 'CTO',
              badge: 'C-Level',
              badgeColor: '#a855f7',
              expanded: true,
              children: [
                {
                  id: 3,
                  label: 'Carlos Santos',
                  avatar: 'https://i.pravatar.cc/150?img=3',
                  meta: 'Tech Lead',
                  badge: '8',
                  badgeColor: '#007bff'
                },
                {
                  id: 4,
                  label: 'Diana Lima',
                  avatar: 'https://i.pravatar.cc/150?img=4',
                  meta: 'Senior Dev',
                  badge: '5',
                  badgeColor: '#22c55e'
                }
              ]
            },
            {
              id: 5,
              label: 'Eduardo Alves',
              avatar: 'https://i.pravatar.cc/150?img=5',
              meta: 'CFO',
              badge: 'C-Level',
              badgeColor: '#a855f7',
              children: [
                {
                  id: 6,
                  label: 'Fernanda Souza',
                  avatar: 'https://i.pravatar.cc/150?img=6',
                  meta: 'Controller',
                  badge: '3',
                  badgeColor: '#ffc107'
                }
              ]
            }
          ]
        }
      ]
    },
    template: `
      <web-tree
        [nodes]="orgNodes"
        title="Organograma"
        subtitle="Estrutura da empresa"
        variant="bordered"
        [showLines]="true"
        size="large">
      </web-tree>
    `
  })
};

/**
 * Menu de navegação hierárquico.
 */
export const NavigationMenu: Story = {
  render: () => ({
    props: {
      menuNodes: [
        {
          id: 1,
          label: 'Dashboard',
          icon: 'dashboard',
          iconColor: '#007bff'
        },
        {
          id: 2,
          label: 'Produtos',
          icon: 'inventory_2',
          iconColor: '#22c55e',
          badge: '150',
          badgeColor: '#22c55e',
          expanded: true,
          children: [
            { id: 3, label: 'Todos os produtos', icon: 'list', meta: '150' },
            { id: 4, label: 'Categorias', icon: 'category', meta: '12' },
            { id: 5, label: 'Estoque', icon: 'inventory', meta: '87' }
          ]
        },
        {
          id: 6,
          label: 'Vendas',
          icon: 'shopping_cart',
          iconColor: '#ffc107',
          badge: '45',
          badgeColor: '#ffc107',
          children: [
            { id: 7, label: 'Pedidos', icon: 'receipt_long', meta: '45', badge: 'Novo', badgeColor: '#ef4444' },
            { id: 8, label: 'Clientes', icon: 'people', meta: '234' },
            { id: 9, label: 'Relatórios', icon: 'assessment', meta: '8' }
          ]
        },
        {
          id: 10,
          label: 'Configurações',
          icon: 'settings',
          iconColor: '#6c757d',
          children: [
            { id: 11, label: 'Perfil', icon: 'person' },
            { id: 12, label: 'Segurança', icon: 'security' },
            { id: 13, label: 'Integrações', icon: 'extension' }
          ]
        }
      ]
    },
    template: `
      <web-tree
        [nodes]="menuNodes"
        title="Menu de Navegação"
        variant="bordered"
        selectionMode="single"
        size="medium">
      </web-tree>
    `
  })
};

/**
 * Sistema de permissões com checkboxes.
 */
export const PermissionsTree: Story = {
  render: () => ({
    props: {
      permissionNodes: [
        {
          id: 1,
          label: 'Administração',
          icon: 'admin_panel_settings',
          iconColor: '#a855f7',
          expanded: true,
          children: [
            { id: 2, label: 'Gerenciar usuários', icon: 'group', checked: true },
            { id: 3, label: 'Gerenciar permissões', icon: 'lock', checked: true },
            { id: 4, label: 'Ver logs do sistema', icon: 'history', checked: false }
          ]
        },
        {
          id: 5,
          label: 'Conteúdo',
          icon: 'edit_note',
          iconColor: '#007bff',
          expanded: true,
          children: [
            { id: 6, label: 'Criar posts', icon: 'add', checked: true },
            { id: 7, label: 'Editar posts', icon: 'edit', checked: true },
            { id: 8, label: 'Deletar posts', icon: 'delete', checked: false },
            { id: 9, label: 'Publicar', icon: 'publish', checked: true }
          ]
        },
        {
          id: 10,
          label: 'Financeiro',
          icon: 'payments',
          iconColor: '#22c55e',
          children: [
            { id: 11, label: 'Ver relatórios', icon: 'assessment', checked: true },
            { id: 12, label: 'Exportar dados', icon: 'download', checked: false },
            { id: 13, label: 'Configurar pagamentos', icon: 'settings', checked: false }
          ]
        }
      ]
    },
    template: `
      <web-tree
        [nodes]="permissionNodes"
        title="Permissões de Usuário"
        badge="3 grupos"
        variant="bordered"
        selectionMode="checkbox"
        size="medium">
      </web-tree>
    `
  })
};

/**
 * Árvore com cores customizadas - Tema Azul.
 */
export const CustomColorsBlue: Story = {
  render: () => ({
    props: {
      nodes: fileSystemNodes
    },
    template: `
      <web-tree
        [nodes]="nodes"
        title="Arquivos - Tema Azul"
        backgroundColor="#f0f9ff"
        borderColor="#0ea5e9"
        headerBackgroundColor="#e0f2fe"
        titleColor="#0c4a6e"
        labelColor="#075985"
        selectedNodeBackground="#dbeafe"
        variant="bordered"
        [showLines]="true"
        lineStyle="solid">
      </web-tree>
    `
  })
};

/**
 * Árvore com nós coloridos individualmente.
 */
export const ColoredNodes: Story = {
  render: () => ({
    props: {
      coloredNodes: [
        {
          id: 1,
          label: 'Urgente',
          icon: 'warning',
          iconColor: '#ef4444',
          labelColor: '#991b1b',
          backgroundColor: '#fee2e2',
          badge: '!',
          badgeColor: '#ef4444',
          expanded: true,
          children: [
            {
              id: 2,
              label: 'Bug crítico em produção',
              icon: 'bug_report',
              iconColor: '#ef4444',
              labelColor: '#991b1b',
              meta: 'P0'
            }
          ]
        },
        {
          id: 3,
          label: 'Em Progresso',
          icon: 'pending',
          iconColor: '#f97316',
          labelColor: '#9a3412',
          backgroundColor: '#ffedd5',
          badge: '3',
          badgeColor: '#f97316',
          expanded: true,
          children: [
            {
              id: 4,
              label: 'Implementar nova feature',
              icon: 'code',
              iconColor: '#f97316',
              labelColor: '#9a3412',
              meta: 'P1'
            },
            {
              id: 5,
              label: 'Revisar PR #234',
              icon: 'rate_review',
              iconColor: '#f97316',
              labelColor: '#9a3412',
              meta: 'P2'
            }
          ]
        },
        {
          id: 6,
          label: 'Concluído',
          icon: 'check_circle',
          iconColor: '#22c55e',
          labelColor: '#166534',
          backgroundColor: '#f0fdf4',
          badge: '✓',
          badgeColor: '#22c55e',
          children: [
            {
              id: 7,
              label: 'Deploy em staging',
              icon: 'cloud_done',
              iconColor: '#22c55e',
              labelColor: '#166534'
            }
          ]
        }
      ]
    },
    template: `
      <web-tree
        [nodes]="coloredNodes"
        title="Tasks por Status"
        variant="bordered"
        size="medium">
      </web-tree>
    `
  })
};

/**
 * Caso de uso completo: Explorador de código-fonte.
 */
export const CodeExplorer: Story = {
  render: () => ({
    props: {
      codeNodes: [
        {
          id: 1,
          label: 'src',
          icon: 'folder',
          iconColor: '#ffc107',
          expanded: true,
          children: [
            {
              id: 2,
              label: 'app',
              icon: 'folder',
              iconColor: '#007bff',
              expanded: true,
              children: [
                {
                  id: 3,
                  label: 'components',
                  icon: 'folder',
                  iconColor: '#22c55e',
                  expanded: true,
                  children: [
                    { id: 4, label: 'button.component.ts', icon: 'code', iconColor: '#3178c6', meta: '2.4 KB' },
                    { id: 5, label: 'card.component.ts', icon: 'code', iconColor: '#3178c6', meta: '5.1 KB' },
                    { id: 6, label: 'tree.component.ts', icon: 'code', iconColor: '#3178c6', meta: '8.7 KB', badge: 'Novo', badgeColor: '#22c55e' }
                  ]
                },
                {
                  id: 7,
                  label: 'services',
                  icon: 'folder',
                  iconColor: '#a855f7',
                  children: [
                    { id: 8, label: 'api.service.ts', icon: 'code', iconColor: '#3178c6', meta: '3.2 KB' },
                    { id: 9, label: 'auth.service.ts', icon: 'code', iconColor: '#3178c6', meta: '4.5 KB' }
                  ]
                },
                {
                  id: 10,
                  label: 'models',
                  icon: 'folder',
                  iconColor: '#e91e63',
                  children: [
                    { id: 11, label: 'user.model.ts', icon: 'code', iconColor: '#3178c6', meta: '1.1 KB' },
                    { id: 12, label: 'product.model.ts', icon: 'code', iconColor: '#3178c6', meta: '1.8 KB' }
                  ]
                }
              ]
            },
            {
              id: 13,
              label: 'assets',
              icon: 'folder',
              iconColor: '#f97316',
              children: [
                { id: 14, label: 'logo.svg', icon: 'image', iconColor: '#e91e63', meta: '12 KB' },
                { id: 15, label: 'styles.css', icon: 'style', iconColor: '#264de4', meta: '24 KB' }
              ]
            }
          ]
        },
        {
          id: 16,
          label: 'package.json',
          icon: 'description',
          iconColor: '#22c55e',
          meta: '1.5 KB'
        },
        {
          id: 17,
          label: 'tsconfig.json',
          icon: 'settings',
          iconColor: '#3178c6',
          meta: '890 B'
        }
      ]
    },
    template: `
      <web-tree
        [nodes]="codeNodes"
        title="Explorador de Projeto"
        badge="Angular"
        badgeColor="#dd0031"
        variant="bordered"
        [searchable]="true"
        [showLines]="true"
        lineStyle="dashed"
        size="medium">
      </web-tree>
    `
  })
};

/**
 * Showcase completo comparando com concorrentes.
 */
export const CompetitorComparison: Story = {
  render: () => ({
    props: {
      nodes: fileSystemNodes
    },
    template: `
      <div style="max-width: 1200px; margin: 0 auto; padding: 32px;">
        <h2 style="margin: 0 0 24px 0; text-align: center;">🏆 web-tree vs Concorrentes</h2>

        <div style="background: #f0fdf4; border: 2px solid #22c55e; border-radius: 12px; padding: 24px; margin-bottom: 32px;">
          <h3 style="margin: 0 0 16px 0; color: #166534;">✨ Recursos Exclusivos do web-tree</h3>
          <ul style="margin: 0; color: #166534; line-height: 1.8;">
            <li>✅ <strong>Avatares</strong> em nós (Material UI ❌, Ant Design ❌, PrimeNG ❌)</li>
            <li>✅ <strong>Badges</strong> customizáveis (Material UI ❌, Ant Design ❌, PrimeNG ❌)</li>
            <li>✅ <strong>Meta info</strong> por nó (Material UI ❌, Ant Design ❌, PrimeNG ❌)</li>
            <li>✅ <strong>Cores por nó</strong> individuais (Material UI ❌, Ant Design ❌, PrimeNG ❌)</li>
            <li>✅ <strong>3 estilos de linha</strong> de conexão (concorrentes: 1 estilo)</li>
            <li>✅ <strong>10+ propriedades</strong> de customização de cor (concorrentes: 2-3)</li>
            <li>✅ <strong>Busca integrada</strong> com auto-expand (Material UI ❌, Ant Design ❌)</li>
          </ul>
        </div>

        <web-tree
          [nodes]="nodes"
          title="Demonstração Completa"
          badge="Premium"
          badgeColor="#a855f7"
          backgroundColor="#faf5ff"
          borderColor="#a855f7"
          headerBackgroundColor="#f3e8ff"
          titleColor="#6b21a8"
          selectedNodeBackground="#f3e8ff"
          variant="bordered"
          [searchable]="true"
          [showLines]="true"
          lineStyle="solid"
          size="medium">
        </web-tree>
      </div>
    `
  })
};

/**
 * Teste de Expand/Collapse - Clique para expandir e colapsar.
 */
export const ExpandCollapseTest: Story = {
  render: () => ({
    props: {
      testNodes: [
        {
          id: 1,
          label: 'Clique aqui para expandir/colapsar',
          icon: 'folder',
          iconColor: '#007bff',
          expanded: false, // Começa fechado
          children: [
            {
              id: 2,
              label: 'Item Filho 1',
              icon: 'description',
              iconColor: '#22c55e'
            },
            {
              id: 3,
              label: 'Item Filho 2 (também expansível)',
              icon: 'folder',
              iconColor: '#ffc107',
              expanded: false, // Também começa fechado
              children: [
                {
                  id: 4,
                  label: 'Neto 1',
                  icon: 'file_present',
                  iconColor: '#e91e63'
                },
                {
                  id: 5,
                  label: 'Neto 2',
                  icon: 'file_present',
                  iconColor: '#e91e63'
                }
              ]
            },
            {
              id: 6,
              label: 'Item Filho 3',
              icon: 'description',
              iconColor: '#22c55e'
            }
          ]
        },
        {
          id: 7,
          label: 'Outro nó para testar',
          icon: 'folder',
          iconColor: '#a855f7',
          expanded: false,
          children: [
            {
              id: 8,
              label: 'Conteúdo A',
              icon: 'article',
              iconColor: '#007bff'
            },
            {
              id: 9,
              label: 'Conteúdo B',
              icon: 'article',
              iconColor: '#007bff'
            }
          ]
        }
      ],
      onExpand: (node: any) => {
        console.log('Expandido:', node);
      },
      onCollapse: (node: any) => {
        console.log('Colapsado:', node);
      }
    },
    template: `
      <div style="max-width: 600px; margin: 0 auto;">
        <div style="background: #fff3cd; border: 2px solid #ffc107; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
          <h4 style="margin: 0 0 12px 0; color: #856404;">📋 Instruções de Teste:</h4>
          <ol style="margin: 0; color: #856404; line-height: 1.6;">
            <li>Clique no ícone de seta (>) ao lado de "Clique aqui para expandir/colapsar"</li>
            <li>O nó deve expandir e mostrar os filhos</li>
            <li>Clique novamente no ícone (agora ⌄) - o nó deve colapsar</li>
            <li>Teste com múltiplos níveis de profundidade</li>
            <li>Verifique o console para logs de expand/collapse</li>
          </ol>
        </div>

        <web-tree
          [nodes]="testNodes"
          title="Teste de Expand/Collapse"
          subtitle="Clique nas setas para expandir/colapsar"
          variant="bordered"
          [showLines]="true"
          size="large"
          (nodeExpand)="onExpand($event)"
          (nodeCollapse)="onCollapse($event)">
        </web-tree>
      </div>
    `
  })
};
