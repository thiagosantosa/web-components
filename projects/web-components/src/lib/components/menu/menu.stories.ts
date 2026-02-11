
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { MenuComponent, MenuItem } from './menu.component';

const meta: Meta<MenuComponent> = {
  title: 'Navigation/Menu',
  component: MenuComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `

### ⚠️ Pré-requisito (Ícones)
Este componente utiliza **Material Symbols**.  
Adicione no **index.html** do seu projeto:

<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />

> Caso contrário, os ícones aparecerão como texto (ex: \`homeHome\`).

---

### 1️⃣ Instalação
\`\`\`bash
npm install @web/ui-components
\`\`\`

---

### 2️⃣ Import no seu componente

\`\`\`ts
import { MenuComponent, MenuItem } from '@web/ui-components';

@Component({
  selector: 'app-meu-componente',
  standalone: true,
  imports: [MenuComponent],
  template: \`
    <web-menu [items]="menuItems"></web-menu>
  \`
})
export class MeuComponente {
  menuItems: MenuItem[] = [
    { id: 'home', label: 'Início', icon: 'home' },
    { id: 'about', label: 'Sobre', icon: 'info' },
    { id: 'contact', label: 'Contato', icon: 'mail' }
  ];
}
\`\`\`

---

### 3️⃣ Estrutura de dados (MenuItem)

\`\`\`ts
interface MenuItem {
  id: string;
  label: string;
  icon?: string;
  badge?: string | number;
  disabled?: boolean;
  divider?: boolean;
  children?: MenuItem[];
  route?: string;
  action?: () => void;
}
\`\`\`

---

### 4️⃣ Exemplo básico

\`\`\`html
<web-menu
  [items]="menuItems"
  (itemClicked)="onMenuClick($event)">
</web-menu>
\`\`\`

---

### 5️⃣ Menu com submenu

\`\`\`ts
menuItems: MenuItem[] = [
  {
    id: 'products',
    label: 'Produtos',
    icon: 'inventory',
    children: [
      { id: 'electronics', label: 'Eletrônicos', icon: 'computer' },
      { id: 'books', label: 'Livros', icon: 'book' }
    ]
  }
];
\`\`\`

---

### 6️⃣ Menu com badge

\`\`\`ts
menuItems: MenuItem[] = [
  { id: 'inbox', label: 'Inbox', icon: 'inbox', badge: 5 },
  { id: 'notifications', label: 'Notificações', icon: 'notifications', badge: 12 }
];
\`\`\`

---

### 7️⃣ Menu com separadores

\`\`\`ts
menuItems: MenuItem[] = [
  { id: 'home', label: 'Início', icon: 'home' },
  { id: 'div1', label: '', divider: true },
  { id: 'settings', label: 'Configurações', icon: 'settings' }
];
\`\`\`

---

### 8️⃣ Variantes disponíveis

\`\`\`html
<web-menu variant="default"></web-menu>
<web-menu variant="pills"></web-menu>
<web-menu variant="tabs"></web-menu>
<web-menu variant="navbar"></web-menu>

<web-menu
  variant="sidebar"
  orientation="vertical">
</web-menu>
\`\`\`

---

### 9️⃣ Orientação e alinhamento

\`\`\`html
<web-menu orientation="horizontal" align="left"></web-menu>
<web-menu orientation="vertical"></web-menu>
<web-menu align="center"></web-menu>
<web-menu align="right"></web-menu>
\`\`\`

---

### 🔟 Tamanhos

\`\`\`html
<web-menu size="small"></web-menu>
<web-menu size="medium"></web-menu>
<web-menu size="large"></web-menu>
\`\`\`

---

### 1️⃣1️⃣ Item ativo

\`\`\`html
<web-menu activeItemId="home"></web-menu>
\`\`\`

---

### 1️⃣2️⃣ Eventos

\`\`\`html
<web-menu
  [items]="items"
  (itemClicked)="handleMenuClick($event)">
</web-menu>
\`\`\`

---

### 1️⃣3️⃣ Integração com Angular Router

\`\`\`ts
menuItems: MenuItem[] = [
  { id: 'home', label: 'Início', route: '/home' },
  { id: 'products', label: 'Produtos', route: '/products' }
];
\`\`\`

---

### ❌ Erro comum

- Ícones renderizando como texto → Material Symbols não carregado
- Layout quebrado → CSS interno sem \`display: flex\`

---

💡 **Dica:**  
Este menu foi projetado para **Design Systems enterprise**  
(sidebar, navbar, tabs e navegação complexa).
        `
      }
    }
},
  decorators: [
    moduleMetadata({
      imports: [MenuComponent],
    }),
  ],
};

export default meta;
type Story = StoryObj<MenuComponent>;

// Dados de exemplo
const basicItems: MenuItem[] = [
  { id: 'home', label: 'Início', icon: 'home' },
  { id: 'products', label: 'Produtos', icon: 'shopping_cart' },
  { id: 'services', label: 'Serviços', icon: 'build' },
  { id: 'about', label: 'Sobre', icon: 'info' },
  { id: 'contact', label: 'Contato', icon: 'mail' },
];

const itemsWithBadges: MenuItem[] = [
  { id: 'home', label: 'Início', icon: 'home' },
  { id: 'inbox', label: 'Caixa de Entrada', icon: 'inbox', badge: '5' },
  { id: 'notifications', label: 'Notificações', icon: 'notifications', badge: 12 },
  { id: 'messages', label: 'Mensagens', icon: 'mail', badge: 'novo' },
  { id: 'settings', label: 'Configurações', icon: 'settings' },
];

const itemsWithSubmenu: MenuItem[] = [
  { id: 'home', label: 'Início', icon: 'home' },
  { 
    id: 'products', 
    label: 'Produtos', 
    icon: 'inventory',
    children: [
      { id: 'electronics', label: 'Eletrônicos', icon: 'computer' },
      { id: 'clothing', label: 'Roupas', icon: 'checkroom' },
      { id: 'books', label: 'Livros', icon: 'book' },
      { id: 'toys', label: 'Brinquedos', icon: 'toys' },
    ]
  },
  { 
    id: 'services', 
    label: 'Serviços', 
    icon: 'build',
    children: [
      { id: 'consulting', label: 'Consultoria', icon: 'support_agent' },
      { id: 'support', label: 'Suporte Técnico', icon: 'headset_mic' },
      { id: 'training', label: 'Treinamento', icon: 'school' },
    ]
  },
  { id: 'about', label: 'Sobre', icon: 'info' },
  { id: 'contact', label: 'Contato', icon: 'mail' },
];

const sidebarItems: MenuItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
  { 
    id: 'products', 
    label: 'Produtos', 
    icon: 'inventory',
    badge: '24',
    children: [
      { id: 'products-list', label: 'Listar Produtos' },
      { id: 'products-new', label: 'Novo Produto' },
      { id: 'products-categories', label: 'Categorias' },
    ]
  },
  { id: 'customers', label: 'Clientes', icon: 'people' },
  { id: 'orders', label: 'Pedidos', icon: 'shopping_bag', badge: 8 },
  { id: 'reports', label: 'Relatórios', icon: 'bar_chart' },
  { id: 'div1', label: '', divider: true },
  { id: 'settings', label: 'Configurações', icon: 'settings' },
  { id: 'help', label: 'Ajuda', icon: 'help' },
  { id: 'logout', label: 'Sair', icon: 'logout' },
];

// ========== BASIC ==========

export const Default: Story = {
  args: {
    items: basicItems,
  }
};

export const WithIcons: Story = {
  name: 'Com Ícones',
  args: {
    items: basicItems,
  }
};

export const WithBadges: Story = {
  name: 'Com Badges',
  args: {
    items: itemsWithBadges,
  }
};

export const WithSubmenu: Story = {
  name: 'Com Submenu',
  args: {
    items: itemsWithSubmenu,
  }
};

export const WithDisabled: Story = {
  name: 'Com Itens Desabilitados',
  args: {
    items: [
      { id: 'home', label: 'Início', icon: 'home' },
      { id: 'products', label: 'Produtos', icon: 'inventory' },
      { id: 'premium', label: 'Premium (Em breve)', icon: 'star', disabled: true },
      { id: 'beta', label: 'Beta Features', icon: 'science', disabled: true },
      { id: 'settings', label: 'Configurações', icon: 'settings' },
    ],
  }
};

export const WithDividers: Story = {
  name: 'Com Separadores',
  args: {
    items: [
      { id: 'home', label: 'Início', icon: 'home' },
      { id: 'products', label: 'Produtos', icon: 'inventory' },
      { id: 'div1', label: '', divider: true },
      { id: 'settings', label: 'Configurações', icon: 'settings' },
      { id: 'help', label: 'Ajuda', icon: 'help' },
      { id: 'div2', label: '', divider: true },
      { id: 'logout', label: 'Sair', icon: 'logout' },
    ],
  }
};

// ========== VARIANTS ==========

export const VariantDefault: Story = {
  name: 'Variant: Default',
  args: {
    items: basicItems,
    variant: 'default',
  }
};

export const VariantPills: Story = {
  name: 'Variant: Pills',
  args: {
    items: basicItems,
    variant: 'pills',
  }
};

export const VariantTabs: Story = {
  name: 'Variant: Tabs',
  args: {
    items: basicItems,
    variant: 'tabs',
  }
};

export const VariantSidebar: Story = {
  name: 'Variant: Sidebar',
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; height: 600px; border: 1px solid #e5e7eb;">
        <web-menu
          [items]="items"
          [variant]="variant"
          [orientation]="orientation">
        </web-menu>
        <div style="flex: 1; padding: 2rem; background: #f8f9fa;">
          <h2 style="margin: 0 0 1rem 0; font-family: Montserrat;">Conteúdo Principal</h2>
          <p style="margin: 0; color: #6c757d; font-family: Montserrat;">
            Menu lateral com navegação vertical
          </p>
        </div>
      </div>
    `
  }),
  args: {
    items: sidebarItems,
    variant: 'sidebar',
    orientation: 'vertical',
  }
};

export const VariantNavbar: Story = {
  name: 'Variant: Navbar',
  args: {
    items: basicItems,
    variant: 'navbar',
  }
};

// ========== ORIENTATION ==========

export const Horizontal: Story = {
  args: {
    items: basicItems,
    orientation: 'horizontal',
  }
};

export const Vertical: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="max-width: 300px;">
        <web-menu
          [items]="items"
          [orientation]="orientation">
        </web-menu>
      </div>
    `
  }),
  args: {
    items: basicItems,
    orientation: 'vertical',
  }
};

// ========== ALIGNMENT ==========

export const AlignLeft: Story = {
  name: 'Alinhamento: Esquerda',
  args: {
    items: basicItems,
    align: 'left',
  }
};

export const AlignCenter: Story = {
  name: 'Alinhamento: Centro',
  args: {
    items: basicItems,
    align: 'center',
  }
};

export const AlignRight: Story = {
  name: 'Alinhamento: Direita',
  args: {
    items: basicItems,
    align: 'right',
  }
};

// ========== SIZES ==========

export const Small: Story = {
  args: {
    items: basicItems,
    size: 'small',
  }
};

export const Medium: Story = {
  args: {
    items: basicItems,
    size: 'medium',
  }
};

export const Large: Story = {
  args: {
    items: basicItems,
    size: 'large',
  }
};

