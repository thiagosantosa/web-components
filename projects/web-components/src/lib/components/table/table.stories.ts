import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { TableComponent, TableColumn, TableAction } from './table.component';

const meta: Meta<TableComponent> = {
  title: 'Data table/Table',
  component: TableComponent,
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
import { TableComponent } from '@web/ui-components';

@Component({
  selector: 'app-meu-componente',
  standalone: true,
  imports: [TableComponent],
  template: \`
    <web-table
      [columns]="columns"
      [data]="data">
    </web-table>
  \`
})
export class MeuComponente {
  columns = [
    { key: 'nome', label: 'Nome' },
    { key: 'email', label: 'Email' },
    { key: 'perfil', label: 'Perfil' }
  ];

  data = [
    { nome: 'João', email: 'joao@email.com', perfil: 'Admin' },
    { nome: 'Maria', email: 'maria@email.com', perfil: 'Usuário' }
  ];
}
\`\`\`

3️⃣ USO NO TEMPLATE
-------------------

### Exemplo Básico
\`\`\`html
<web-table
  [columns]="columns"
  [data]="usuarios">
</web-table>
\`\`\`

\`\`\`ts
columns = [
  { key: 'id', label: 'ID' },
  { key: 'nome', label: 'Nome' },
  { key: 'email', label: 'Email' }
];

usuarios = [
  { id: 1, nome: 'Ana', email: 'ana@email.com' },
  { id: 2, nome: 'Carlos', email: 'carlos@email.com' }
];
\`\`\`

4️⃣ DEFININDO COLUNAS
--------------------

\`\`\`ts
columns = [
  { key: 'nome', label: 'Nome' },
  { key: 'email', label: 'Email' },
  { key: 'status', label: 'Status' }
];
\`\`\`

- key → propriedade do objeto de dados
- label → texto exibido no cabeçalho

5️⃣ TABELA COM AÇÕES
--------------------

\`\`\`html
<web-table
  [columns]="columns"
  [data]="usuarios"
  (rowClick)="onRowClick($event)">
</web-table>
\`\`\`

\`\`\`ts
onRowClick(row: any) {
  console.log('Linha clicada:', row);
}
\`\`\`

6️⃣ CUSTOMIZANDO CÉLULAS (CASO COMUM)
------------------------------------

\`\`\`html
<web-table [columns]="columns" [data]="usuarios">
  <ng-template let-row="row" let-column="column">
    <ng-container [ngSwitch]="column.key">

      <span *ngSwitchCase="'status'">
        <strong [style.color]="row.status === 'Ativo' ? 'green' : 'red'">
          {{ row.status }}
        </strong>
      </span>

      <span *ngSwitchDefault>
        {{ row[column.key] }}
      </span>

    </ng-container>
  </ng-template>
</web-table>
\`\`\`

7️⃣ TABELA VAZIA
----------------
\`\`\`html
<web-table
  [columns]="columns"
  [data]="[]"
  emptyMessage="Nenhum registro encontrado">
</web-table>
\`\`\`

8️⃣ PROPRIEDADES PRINCIPAIS
---------------------------

- columns: Array<{ key: string; label: string }>
- data: any[]
- striped: boolean
- bordered: boolean
- hoverable: boolean
- emptyMessage: string

9️⃣ EVENTOS DISPONÍVEIS
-----------------------------------------------

- rowClick → dispara ao clicar em uma linha
- sortChange → mudança de ordenação (se habilitado)

10️⃣ PARA COMPONENTES NÃO-STANDALONE (NgModule)
-----------------------------------------------
\`\`\`ts
import { TableComponent } from '@web/ui-components';

@NgModule({
  declarations: [MeuComponente],
  imports: [
    TableComponent
  ]
})
export class MeuModule {}
\`\`\`

❌ ERRO COMUM
--------------
❌ Passar dados que não batem com as keys das colunas
✅ As propriedades dos objetos devem existir no array data

💡 DICA: Use Table para exibir listas, relatórios e dashboards de forma organizada!
        `
      }
    }
  },
  decorators: [
    moduleMetadata({
      imports: [TableComponent],
    }),
  ],
};

export default meta;
type Story = StoryObj<TableComponent>;

// Dados de exemplo
const users = [
  { id: 1, name: 'João Silva', email: 'joao@example.com', status: 'Ativo', role: 'Admin', salary: 5000, joinDate: '2023-01-15' },
  { id: 2, name: 'Maria Santos', email: 'maria@example.com', status: 'Ativo', role: 'Developer', salary: 4500, joinDate: '2023-02-20' },
  { id: 3, name: 'Pedro Oliveira', email: 'pedro@example.com', status: 'Inativo', role: 'Designer', salary: 4000, joinDate: '2023-03-10' },
  { id: 4, name: 'Ana Costa', email: 'ana@example.com', status: 'Ativo', role: 'Manager', salary: 6000, joinDate: '2023-01-05' },
  { id: 5, name: 'Carlos Souza', email: 'carlos@example.com', status: 'Pendente', role: 'Developer', salary: 4500, joinDate: '2023-04-12' },
  { id: 6, name: 'Juliana Lima', email: 'juliana@example.com', status: 'Ativo', role: 'Developer', salary: 4800, joinDate: '2023-02-28' },
  { id: 7, name: 'Roberto Alves', email: 'roberto@example.com', status: 'Ativo', role: 'Designer', salary: 4200, joinDate: '2023-03-15' },
  { id: 8, name: 'Patricia Ferreira', email: 'patricia@example.com', status: 'Inativo', role: 'HR', salary: 3800, joinDate: '2023-01-20' },
];

const columns: TableColumn[] = [
  { key: 'id', label: 'ID', sortable: true, width: '80px' },
  { key: 'name', label: 'Nome', sortable: true },
  { key: 'email', label: 'E-mail', sortable: true },
  { key: 'role', label: 'Cargo', sortable: true },
  { key: 'status', label: 'Status', sortable: true, template: 'badge' },
];

const actions: TableAction[] = [
  {
    label: 'Editar',
    icon: 'edit',
    color: 'primary',
    onClick: (row: any) => console.log('Editando:', row)
  },
  {
    label: 'Excluir',
    icon: 'delete',
    color: 'danger',
    onClick: (row: any) => console.log('Excluindo:', row)
  }
];

// ========== BASIC ==========

export const Default: Story = {
  args: {
    columns,
    data: users,
  }
};

export const WithTitle: Story = {
  args: {
    title: 'Lista de Usuários',
    subtitle: 'Gerencie os usuários do sistema',
    columns,
    data: users,
  }
};

export const WithSearch: Story = {
  args: {
    title: 'Usuários',
    searchable: true,
    columns,
    data: users,
  }
};

export const WithActions: Story = {
  args: {
    title: 'Gerenciar Usuários',
    columns,
    data: users,
    actions,
    searchable: true,
  }
};

export const Selectable: Story = {
  args: {
    title: 'Selecionar Usuários',
    columns,
    data: users,
    selectable: true,
    searchable: true,
  }
};

// ========== PAGINATION ==========

export const WithPagination: Story = {
  args: {
    title: 'Lista Paginada',
    columns,
    data: users,
    pageable: true,
    pageSize: 5,
  }
};

export const CustomPageSize: Story = {
  args: {
    title: 'Tamanhos de Página Customizados',
    columns,
    data: users,
    pageable: true,
    pageSize: 3,
    pageSizeOptions: [3, 5, 10, 20],
  }
};

// ========== STYLING ==========

export const Striped: Story = {
  args: {
    title: 'Tabela Listrada',
    columns,
    data: users,
    striped: true,
  }
};

export const NoStripes: Story = {
  args: {
    title: 'Sem Listras',
    columns,
    data: users,
    striped: false,
  }
};

export const Bordered: Story = {
  args: {
    title: 'Com Bordas',
    columns,
    data: users,
    bordered: true,
  }
};

export const NoHover: Story = {
  args: {
    title: 'Sem Hover',
    columns,
    data: users,
    hoverable: false,
  }
};

// ========== TEMPLATES ==========

export const WithCurrency: Story = {
  args: {
    title: 'Com Moeda',
    columns: [
      { key: 'name', label: 'Nome', sortable: true },
      { key: 'role', label: 'Cargo' },
      { key: 'salary', label: 'Salário', sortable: true, template: 'currency', align: 'right' },
    ],
    data: users,
  }
};

export const WithDate: Story = {
  args: {
    title: 'Com Data',
    columns: [
      { key: 'name', label: 'Nome', sortable: true },
      { key: 'email', label: 'E-mail' },
      { key: 'joinDate', label: 'Data de Entrada', sortable: true, template: 'date' },
    ],
    data: users,
  }
};

export const WithBadges: Story = {
  args: {
    title: 'Com Badges',
    columns: [
      { key: 'name', label: 'Nome', sortable: true },
      { key: 'role', label: 'Cargo' },
      { key: 'status', label: 'Status', sortable: true, template: 'badge' },
    ],
    data: users,
  }
};

// ========== STATES ==========

export const Loading: Story = {
  args: {
    title: 'Carregando',
    columns,
    data: [],
    loading: true,
  }
};

export const Empty: Story = {
  args: {
    title: 'Sem Dados',
    columns,
    data: [],
    emptyText: 'Nenhum usuário cadastrado',
  }
};

// ========== ADVANCED ==========

export const FullFeatured: Story = {
  name: 'Todos os Recursos',
  args: {
    title: 'Gerenciamento Completo',
    subtitle: 'Buscar, ordenar, selecionar e paginar',
    columns,
    data: users,
    actions,
    searchable: true,
    selectable: true,
    pageable: true,
    striped: true,
    hoverable: true,
    pageSize: 5,
  }
};

export const ConditionalActions: Story = {
  name: 'Ações Condicionais',
  args: {
    title: 'Ações por Status',
    columns,
    data: users,
    actions: [
      {
        label: 'Ativar',
        icon: 'check_circle',
        color: 'success',
        onClick: (row: any) => console.log('Ativando:', row),
        show: (row: any) => row.status !== 'Ativo'
      },
      {
        label: 'Desativar',
        icon: 'cancel',
        color: 'warning',
        onClick: (row: any) => console.log('Desativando:', row),
        show: (row: any) => row.status === 'Ativo'
      },
      {
        label: 'Excluir',
        icon: 'delete',
        color: 'danger',
        onClick: (row: any) => console.log('Excluindo:', row)
      }
    ],
  }
};

export const CustomFormat: Story = {
  name: 'Formatação Customizada',
  args: {
    title: 'Com Formatação',
    columns: [
      { key: 'name', label: 'Nome', sortable: true },
      {
        key: 'email',
        label: 'E-mail',
        format: (value: string) => value.toLowerCase()
      },
      {
        key: 'salary',
        label: 'Salário',
        sortable: true,
        align: 'right',
        format: (value: number) => `R$ ${value.toLocaleString('pt-BR')}`
      },
    ],
    data: users,
  }
};

export const AlignedColumns: Story = {
  name: 'Alinhamento de Colunas',
  args: {
    title: 'Colunas Alinhadas',
    columns: [
      { key: 'id', label: 'ID', sortable: true, width: '80px', align: 'center' },
      { key: 'name', label: 'Nome', sortable: true, align: 'left' },
      { key: 'salary', label: 'Salário', sortable: true, template: 'currency', align: 'right' },
      { key: 'status', label: 'Status', template: 'badge', align: 'center' },
    ],
    data: users,
  }
};

// ========== USE CASES ==========

export const UserManagement: Story = {
  name: 'Gerenciamento de Usuários',
  render: (args) => ({
    props: {
      ...args,
      onRowClick: (row: any) => console.log('Linha clicada:', row),
      onSelectionChange: (rows: any[]) => console.log('Seleção alterada:', rows),
      onSort: (event: any) => console.log('Ordenado:', event),
    },
    template: `
      <web-table
        [title]="title"
        [subtitle]="subtitle"
        [columns]="columns"
        [data]="data"
        [actions]="actions"
        [searchable]="true"
        [selectable]="true"
        [pageable]="true"
        [pageSize]="5"
        (rowClicked)="onRowClick($event)"
        (selectionChanged)="onSelectionChange($event)"
        (sorted)="onSort($event)">
      </web-table>
    `
  }),
  args: {
    title: 'Usuários do Sistema',
    subtitle: 'Gerencie usuários, permissões e acessos',
    columns,
    data: users,
    actions: [
      {
        label: 'Ver Detalhes',
        icon: 'visibility',
        color: 'primary',
        onClick: (row: any) => alert(`Detalhes de ${row.name}`)
      },
      {
        label: 'Editar',
        icon: 'edit',
        color: 'success',
        onClick: (row: any) => alert(`Editando ${row.name}`)
      },
      {
        label: 'Excluir',
        icon: 'delete',
        color: 'danger',
        onClick: (row: any) => {
          if (confirm(`Excluir ${row.name}?`)) {
            alert('Usuário excluído!')
          }
        }
      }
    ],
  }
};

export const ProductCatalog: Story = {
  name: 'Catálogo de Produtos',
  args: {
    title: 'Produtos',
    subtitle: 'Catálogo completo de produtos',
    columns: [
      { key: 'id', label: 'SKU', sortable: true, width: '100px' },
      { key: 'name', label: 'Produto', sortable: true },
      { key: 'category', label: 'Categoria', sortable: true },
      { key: 'price', label: 'Preço', sortable: true, template: 'currency', align: 'right' },
      { key: 'stock', label: 'Estoque', sortable: true, align: 'center' },
      { key: 'status', label: 'Status', template: 'badge', align: 'center' },
    ],
    data: [
      { id: 'PRD001', name: 'Notebook Dell', category: 'Informática', price: 3500, stock: 15, status: 'Ativo' },
      { id: 'PRD002', name: 'Mouse Logitech', category: 'Periféricos', price: 150, stock: 50, status: 'Ativo' },
      { id: 'PRD003', name: 'Teclado Mecânico', category: 'Periféricos', price: 450, stock: 0, status: 'Inativo' },
      { id: 'PRD004', name: 'Monitor LG 27"', category: 'Monitores', price: 1200, stock: 8, status: 'Ativo' },
      { id: 'PRD005', name: 'Headset Gamer', category: 'Áudio', price: 300, stock: 25, status: 'Ativo' },
    ],
    searchable: true,
    pageable: true,
    pageSize: 5,
    actions: [
      {
        label: 'Editar',
        icon: 'edit',
        color: 'primary',
        onClick: (row: any) => console.log('Edit', row)
      },
      {
        label: 'Estoque',
        icon: 'inventory',
        color: 'success',
        onClick: (row: any) => console.log('Stock', row)
      }
    ],
  }
};

export const FinancialReport: Story = {
  name: 'Relatório Financeiro',
  args: {
    title: 'Transações Financeiras',
    subtitle: 'Últimas movimentações da conta',
    columns: [
      { key: 'date', label: 'Data', sortable: true, template: 'date' },
      { key: 'description', label: 'Descrição', sortable: true },
      { key: 'category', label: 'Categoria', sortable: true },
      { key: 'amount', label: 'Valor', sortable: true, template: 'currency', align: 'right' },
      { key: 'status', label: 'Status', template: 'badge', align: 'center' },
    ],
    data: [
      { date: '2024-01-15', description: 'Pagamento de Salário', category: 'Receita', amount: 5000, status: 'Aprovado' },
      { date: '2024-01-14', description: 'Conta de Luz', category: 'Despesa', amount: -200, status: 'Pago' },
      { date: '2024-01-12', description: 'Freelance - Website', category: 'Receita', amount: 1500, status: 'Aprovado' },
      { date: '2024-01-10', description: 'Aluguel', category: 'Despesa', amount: -1200, status: 'Pendente' },
      { date: '2024-01-08', description: 'Supermercado', category: 'Despesa', amount: -350, status: 'Pago' },
    ],
    searchable: true,
    pageable: true,
    striped: true,
    bordered: true,
  }
};
